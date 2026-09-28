#!/usr/bin/env python3
"""
Telegram Update Manager with MongoDB persistence and automatic offset reset.
No duplicate raw updates are ever stored.
Bot ID is auto‑detected from updates, with fallback to getMe.

All configuration is read from environment variables:
  MONGO_URI                  (default: "mongodb://localhost:27017/")
  MONGO_DB_NAME              (default: "telegram_bot")
  MONGO_RAW_COLLECTION       (default: "raw_updates")
  MONGO_STATE_COLLECTION     (default: "state")
  MONGO_GROUPS_COLLECTION    (default: "groups")
  THRESHOLD                  (default: 200)

Usage: python GetIDTelegram.py YOUR_BOT_TOKEN
Output: same JSON format as original script.
"""

import os
import sys
import json
from datetime import datetime
from typing import List, Dict, Optional, Any

import requests
from pymongo import MongoClient, UpdateOne


# ============================== Configuration ==============================
class Config:
    """Centralized configuration from environment variables."""
    MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/")
    DB_NAME = os.environ.get("MONGO_DB_NAME", "telegram_bot")
    RAW_COLLECTION = os.environ.get("MONGO_RAW_COLLECTION", "raw_updates")
    STATE_COLLECTION = os.environ.get("MONGO_STATE_COLLECTION", "state")
    GROUPS_COLLECTION = os.environ.get("MONGO_GROUPS_COLLECTION", "groups")
    THRESHOLD = int(os.environ.get("THRESHOLD", "200"))


# ============================== Telegram Client ==============================
class TelegramClient:
    """Handles all interactions with the Telegram Bot API."""

    BASE_URL = "https://api.telegram.org/bot{token}"

    def __init__(self, token: str):
        self.token = token

    def fetch_updates(self, offset: int) -> List[Dict[str, Any]]:
        """
        Fetch updates from Telegram using the current offset.
        Returns a list of update objects (empty if none).
        Raises an exception on API error.
        """
        url = f"{self.BASE_URL.format(token=self.token)}/getUpdates"
        params = {"offset": offset, "timeout": 10}
        try:
            resp = requests.get(url, params=params, timeout=15)
            resp.raise_for_status()
            data = resp.json()
            if not data.get("ok"):
                raise RuntimeError(f"API error: {data.get('description', 'unknown')}")
            return data.get("result", [])
        except Exception as e:
            raise RuntimeError(f"Fetch error: {e}")

    def get_me(self) -> Dict[str, Any]:
        """Call getMe to retrieve bot information, including user ID."""
        url = f"{self.BASE_URL.format(token=self.token)}/getMe"
        try:
            resp = requests.get(url, timeout=10)
            resp.raise_for_status()
            data = resp.json()
            if not data.get("ok"):
                raise RuntimeError(f"getMe error: {data.get('description', 'unknown')}")
            return data.get("result", {})
        except Exception as e:
            raise RuntimeError(f"Failed to get bot info via getMe: {e}")

    @staticmethod
    def extract_bot_id(updates: List[Dict[str, Any]]) -> Optional[int]:
        """
        Extract the bot's own user ID from the first update that contains it.
        Returns None if not found.
        """
        for upd in updates:
            # my_chat_member
            member = upd.get("my_chat_member")
            if member:
                new_member = member.get("new_chat_member")
                if new_member and new_member.get("user", {}).get("is_bot"):
                    return new_member["user"]["id"]
            # message participants
            msg = upd.get("message")
            if msg:
                participants = msg.get("new_chat_participants")
                if participants and isinstance(participants, list):
                    for p in participants:
                        if p.get("is_bot"):
                            return p["id"]
                for field in ("new_chat_participant", "new_chat_member"):
                    p = msg.get(field)
                    if p and p.get("is_bot"):
                        return p["id"]
        return None


# ============================== MongoDB Storage ==============================
class Storage:
    """Manages all MongoDB operations: raw updates, state, and groups."""

    def __init__(self, config: Config):
        self.client = MongoClient(config.MONGO_URI)
        self.db = self.client[config.DB_NAME]
        self.raw_collection = config.RAW_COLLECTION
        self.state_collection = config.STATE_COLLECTION
        self.groups_collection = config.GROUPS_COLLECTION

    def get_state(self) -> Dict[str, Any]:
        """Retrieve the persisted bot state (offset and bot_id)."""
        state = self.db[self.state_collection].find_one({"_id": "bot_state"})
        if not state:
            state = {"_id": "bot_state", "last_offset": 0, "bot_id": None}
            self.db[self.state_collection].insert_one(state)
        return state

    def update_state(self, last_offset: int, bot_id: Optional[int] = None) -> None:
        """Persist the current offset and optionally the bot_id."""
        update_data = {"last_offset": last_offset}
        if bot_id is not None:
            update_data["bot_id"] = bot_id
        self.db[self.state_collection].update_one(
            {"_id": "bot_state"},
            {"$set": update_data},
            upsert=True,
        )

    def store_raw_updates(self, updates: List[Dict[str, Any]]) -> None:
        """
        Store raw updates with guaranteed deduplication.
        Uses update_id as _id with upsert – never creates a duplicate row.
        """
        if not updates:
            return

        operations = []
        for upd in updates:
            operations.append(
                UpdateOne(
                    {"_id": upd["update_id"]},
                    {
                        "$set": {
                            "data": upd,
                            "fetched_at": datetime.utcnow(),
                        }
                    },
                    upsert=True,
                )
            )

        if operations:
            self.db[self.raw_collection].bulk_write(operations, ordered=False)

    def update_group(self, filter_query: Dict, update_data: Dict, upsert: bool = True) -> None:
        """Generic helper to update a group document."""
        self.db[self.groups_collection].update_one(filter_query, update_data, upsert=upsert)

    def get_group(self, title: str) -> Optional[Dict[str, Any]]:
        """Retrieve a group document by title."""
        return self.db[self.groups_collection].find_one({"title": title})

    def get_member_groups(self) -> List[Dict[str, Any]]:
        """Return all groups with status == 'member'."""
        return list(self.db[self.groups_collection].find({"status": "member"}))


# ============================== Update Processor ==============================
class UpdateProcessor:
    """
    Processes each Telegram update and updates the group state in MongoDB.
    """

    def __init__(self, storage: Storage):
        self.storage = storage

    def process_update(self, update: Dict[str, Any], bot_id: int) -> None:
        """
        Apply one update to the groups collection.
        Tracks member/left status and collects topics from /start-hko-d2 messages.
        """
        # 1) my_chat_member – track member/left status per group title
        member = update.get("my_chat_member")
        if member:
            self._handle_member_update(member, bot_id)
            return

        # 2) Message with /start-hko-d2 – collect topics
        msg = update.get("message")
        if msg and msg.get("text") == "/start-hko-d2":
            self._handle_command_message(msg, update.get("date"))

    def _handle_member_update(self, member: Dict[str, Any], bot_id: int) -> None:
        """Process a my_chat_member update."""
        from_user = member.get("from")
        if not (from_user and from_user.get("is_bot") is False):
            return

        new_member = member.get("new_chat_member")
        if not (new_member and new_member.get("user", {}).get("id") == bot_id):
            return

        status = new_member.get("status")
        if status not in ("member", "left"):
            return

        chat = member.get("chat")
        if not chat:
            return

        title = chat.get("title")
        if not title:
            return

        date = member.get("date", int(datetime.utcnow().timestamp()))

        # Only update if this event is newer than the stored one
        existing = self.storage.get_group(title)
        if not existing or date > existing.get("last_updated", 0):
            self.storage.update_group(
                {"title": title},
                {
                    "$set": {
                        "status": status,
                        "last_updated": date,
                        "chat_id": chat.get("id"),
                    }
                },
                upsert=True,
            )

    def _handle_command_message(self, msg: Dict[str, Any], msg_date: Optional[int]) -> None:
        """Process a /start-hko-d2 message."""
        chat = msg.get("chat")
        if not chat:
            return
        title = chat.get("title")
        if not title:
            return

        # Skip groups that are currently in 'left' state
        group_doc = self.storage.get_group(title)
        if group_doc and group_doc.get("status") == "left":
            return

        chat_id = chat.get("id")
        thread_id = msg.get("message_thread_id")

        # Extract topic name from reply_to_message or the message itself
        topic_name = None
        reply_to = msg.get("reply_to_message")
        if reply_to and "forum_topic_created" in reply_to:
            topic_info = reply_to["forum_topic_created"]
            if isinstance(topic_info, dict):
                topic_name = topic_info.get("name")
        if not topic_name and "forum_topic_created" in msg:
            topic_info = msg["forum_topic_created"]
            if isinstance(topic_info, dict):
                topic_name = topic_info.get("name")

        # Build the update document
        update_doc = {
            "has_topics": thread_id is not None,
            "latest_chat_id": chat_id,
            "last_updated": msg_date or int(datetime.utcnow().timestamp()),
        }

        if thread_id is not None:
            update_doc[f"topics.{thread_id}"] = topic_name

        # Ensure status is "member" if we see a valid command
        self.storage.update_group(
            {"title": title},
            {"$set": update_doc, "$setOnInsert": {"status": "member"}},
            upsert=True,
        )

    def process_batch(self, updates: List[Dict[str, Any]], bot_id: int) -> None:
        """Process a batch of updates sequentially."""
        for upd in updates:
            self.process_update(upd, bot_id)


# ============================== Output Generator ==============================
class OutputGenerator:
    """Generates the final JSON output from the stored group state."""

    def __init__(self, storage: Storage):
        self.storage = storage

    def generate(self) -> List[Dict[str, Any]]:
        """
        Produce the same JSON structure as the original script:
        [{title, id, type, topics: [{title, id}]}]
        Only includes groups with status == 'member'.
        """
        result = []
        for group in self.storage.get_member_groups():
            title = group["title"]
            chat_id = group.get("latest_chat_id")
            has_topics = group.get("has_topics", False)
            topics_dict = group.get("topics", {})

            topics_list = [
                {"title": name, "id": int(tid)}
                for tid, name in topics_dict.items()
                if name is not None
            ]

            result.append(
                {
                    "title": title,
                    "id": chat_id,
                    "type": "supergroup" if has_topics else "group",
                    "topics": topics_list,
                }
            )
        return result


# ============================== Main Application ==============================
class App:
    """Orchestrates the entire update fetch→store→process→output workflow."""

    def __init__(self, token: str):
        self.token = token
        self.config = Config()
        self.telegram = TelegramClient(token)
        self.storage = Storage(self.config)
        self.processor = UpdateProcessor(self.storage)
        self.output_gen = OutputGenerator(self.storage)

    def run(self) -> None:
        """Main execution flow."""
        # 1. Get current state (offset and bot_id)
        state = self.storage.get_state()
        offset = state.get("last_offset", 0)
        bot_id = state.get("bot_id")

        # 2. Fetch updates from Telegram
        try:
            updates = self.telegram.fetch_updates(offset)
        except RuntimeError as e:
            print(f"Error: {e}", file=sys.stderr)
            sys.exit(1)

        # 3. If no updates, just output current state and exit
        if not updates:
            print(json.dumps(self.output_gen.generate(), indent=2, ensure_ascii=False))
            return

        # 4. Store raw updates (deduplicated) – happens BEFORE any reset
        self.storage.store_raw_updates(updates)

        # 5. Determine bot_id – first from updates, then fallback to getMe
        if bot_id is None:
            bot_id = self.telegram.extract_bot_id(updates)
            if bot_id is None:
                print("Bot ID not found in updates. Falling back to getMe...", file=sys.stderr)
                try:
                    bot_info = self.telegram.get_me()
                    bot_id = bot_info["id"]
                    print(f"Bot ID from getMe: {bot_id}", file=sys.stderr)
                except Exception as e:
                    print(f"Error getting bot ID via getMe: {e}", file=sys.stderr)
                    sys.exit(1)

        # 6. Process updates to incrementally update the groups state
        self.processor.process_batch(updates, bot_id)

        # 7. Compute the new offset = max update_id + 1 (acknowledge all fetched updates)
        max_update_id = max(upd["update_id"] for upd in updates)
        new_offset = max_update_id + 1

        # 8. If threshold reached, log the reset action
        if len(updates) >= self.config.THRESHOLD:
            print(
                f"Threshold reached ({len(updates)} updates). Resetting offset to {new_offset}.",
                file=sys.stderr,
            )

        # 9. Persist the new offset and bot_id
        self.storage.update_state(new_offset, bot_id)

        # 10. Output the final aggregated state
        print(json.dumps(self.output_gen.generate(), indent=2, ensure_ascii=False))


# ============================== Entry Point ==============================
def main():
    if len(sys.argv) < 2:
        print("Usage: python GetIDTelegram.py YOUR_BOT_TOKEN", file=sys.stderr)
        sys.exit(1)

    token = sys.argv[1]
    app = App(token)
    app.run()


if __name__ == "__main__":
    main()