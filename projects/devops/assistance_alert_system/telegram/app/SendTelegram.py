#!/usr/bin/env python3
"""
Telegram 訊息發送腳本（支援群組主題）－命令列參數版，含格式檢查

用法：
  python3 SendTelegram.py "TELEGRAM_TOKEN=<您的Bot Token>" \\
                              "TELEGRAM_GROUP_ID=<群組Chat ID>" \\
                              "TELEGRAM_TOPIC_ID=<主題ID>" \\
                              "SEND_MESSAGE=<要發送的訊息>"

說明：
  - 四個參數的順序可任意調換
  - TELEGRAM_TOPIC_ID 若為空字串，則發送至 #General 主聊天（等同不指定主題）
  - 若指定數字，則發送至對應主題 ID
  - 格式檢查：
      TELEGRAM_TOKEN    -> 數字:任意字元
      TELEGRAM_GROUP_ID -> 可選負號 + 數字
      TELEGRAM_TOPIC_ID -> 空字串 或 純數字
"""

import sys
import re
import requests

def validate_params(params):
    """檢查必要參數是否存在且格式正確"""
    token = params.get("TELEGRAM_TOKEN")
    group_id = params.get("TELEGRAM_GROUP_ID")
    topic = params.get("TELEGRAM_TOPIC_ID", "")  # 若未提供，視為空字串
    message = params.get("SEND_MESSAGE")

    # 檢查必要參數是否都有提供
    if not token or not group_id or not message:
        print("❌ 缺少必要參數：TELEGRAM_TOKEN、TELEGRAM_GROUP_ID、SEND_MESSAGE 都必須提供")
        return False, None, None, None, None

    # 檢查 TELEGRAM_TOKEN 格式：數字:任意字元
    token_pattern = re.compile(r'^[0-9]+:.+$')
    if not token_pattern.match(token):
        print(f"❌ TELEGRAM_TOKEN 格式錯誤：應為「數字:字串」，實際為「{token}」")
        return False, None, None, None, None

    # 檢查 TELEGRAM_GROUP_ID 格式：可選負號 + 數字
    group_pattern = re.compile(r'^-?[0-9]+$')
    if not group_pattern.match(group_id):
        print(f"❌ TELEGRAM_GROUP_ID 格式錯誤：應為數字（可含前導負號），實際為「{group_id}」")
        return False, None, None, None, None

    # 檢查 TELEGRAM_TOPIC_ID：空字串 或 純數字
    topic_id = None
    if topic.strip() != "":
        topic_pattern = re.compile(r'^[0-9]+$')
        if not topic_pattern.match(topic):
            print(f"❌ TELEGRAM_TOPIC_ID 格式錯誤：應為空字串或純數字，實際為「{topic}」")
            return False, None, None, None, None
        topic_id = int(topic)  # 轉為整數
    # 若為空字串，topic_id 保持 None，表示發送至 #General 主聊天

    return True, token, group_id, message, topic_id

def send_message(token, chat_id, text, topic_id=None):
    """發送訊息至 Telegram"""
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    data = {"chat_id": chat_id, "text": text}
    if topic_id is not None:
        data["message_thread_id"] = topic_id
        print(f"📨 嘗試發送至主題 ID: {topic_id}")
    else:
        print("📨 嘗試發送至主聊天（即 #General 主題）")   # 明確提示

    try:
        resp = requests.post(url, data=data, timeout=10)
        result = resp.json()
        if result.get("ok"):
            msg_id = result['result']['message_id']
            print(f"✅ 傳送成功 (訊息ID: {msg_id})")
            if topic_id is not None:
                print("   ⚠️ 請確認訊息是否出現在對應主題中；若未出現，請檢查主題ID是否正確。")
        else:
            error_desc = result.get('description', '未知錯誤')
            print(f"❌ 失敗: {error_desc}")
    except Exception as e:
        print(f"❌ 請求異常: {e}")

def print_usage():
    print("用法：")
    print("  python3 SendTelegram.py \"TELEGRAM_TOKEN=<Token>\" \\")
    print("                            \"TELEGRAM_GROUP_ID=<Chat ID>\" \\")
    print("                            \"TELEGRAM_TOPIC_ID=<主題ID>\" \\")
    print("                            \"SEND_MESSAGE=<訊息內容>\"")
    print()
    print("  - 四個參數順序可任意調換")
    print("  - TELEGRAM_TOPIC_ID 若為空字串，則發送至 #General 主聊天（等同不指定主題）")
    print("  - 若指定數字，則發送至對應主題 ID")
    print("  - 格式要求：")
    print("      TELEGRAM_TOKEN     -> 數字:任意字元")
    print("      TELEGRAM_GROUP_ID  -> 可選負號 + 數字")
    print("      TELEGRAM_TOPIC_ID  -> 空字串 或 純數字")

def parse_arguments():
    """解析命令列參數，返回字典"""
    params = {}
    for arg in sys.argv[1:]:
        if '=' in arg:
            key, value = arg.split('=', 1)
            params[key.strip()] = value.strip()
    return params

if __name__ == "__main__":
    params = parse_arguments()
    valid, token, chat_id, message, topic_id = validate_params(params)
    if not valid:
        print_usage()
        sys.exit(1)

    send_message(token, chat_id, message, topic_id)