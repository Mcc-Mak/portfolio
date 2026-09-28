// ================================================================
// R18: Pipeline Notification (Telegram)
// Sends pipeline result notifications to Telegram via the Bot API.
// Credentials come from env (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID) -
// never from CLI args or source (R7). Slack/Discord channels are
// planned for a separate project; the src/notify.js channel registry
// is the extension point.
//   node notify.js --title "..." --body "..."
// ================================================================

'use strict';

const {
  validateConfig,
  buildTelegramMessage,
  sendTelegram
} = require('../src/notify');

function valueFor(argv, flag) {
  let value;
  while (argv.length > 0) {
    if (argv[0] === flag && argv.length > 1) {
      value = argv[1];
      break;
    }
    argv.shift();
  }
  return value;
}

function parseArgs(argv) {
  return {
    title: valueFor(argv, '--title'),
    body: valueFor(argv, '--body'),
    channel: valueFor(argv, '--channel')
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  let config;
  try {
    config = validateConfig({ channel: args.channel });
  } catch (err) {
    console.error('[FAIL] Notification not configured:', err.message);
    console.error('[HINT] Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID (R7: env only)');
    process.exit(1);
  }

  const message = buildTelegramMessage({
    title: args.title || 'CMMI Level 4 Pipeline',
    lines: (args.body || '').split('\n')
  });

  sendTelegram(config.token, config.chatId, message.text).then((result) => {
    if (result.ok) {
      console.log('[OK] Telegram notification sent (channel: ' + config.channel + ')');
      process.exit(0);
    }
    console.error('[FAIL] Telegram API rejected (' + result.statusCode + '): ' + result.body);
    process.exit(1);
  }, (err) => {
    console.error('[FAIL] Telegram notification error:', err.message);
    process.exit(1);
  });
}

if (require.main === module) {
  main();
}