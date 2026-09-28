'use strict';

const https = require('https');

const IMPLEMENTED_CHANNELS = ['telegram'];
const PLANNED_CHANNELS = ['slack', 'discord'];
const MAX_LINES = 12;
const MAX_TEXT = 4000;
const REQUEST_TIMEOUT = 10000;

function validateChannel(channel) {
  if (typeof channel !== 'string') throw new TypeError('channel must be a string');
  const value = channel.trim().toLowerCase();
  if (IMPLEMENTED_CHANNELS.indexOf(value) === -1) {
    throw new RangeError('channel must be one of: ' + IMPLEMENTED_CHANNELS.join(', ') +
      ' (planned in another project: ' + PLANNED_CHANNELS.join(', ') + ')');
  }
  return value;
}

function validateConfig(config) {
  const c = config || {};
  const channel = validateChannel(c.channel || 'telegram');
  const token = c.token || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = c.chatId || process.env.TELEGRAM_CHAT_ID;
  if (typeof token !== 'string' || token.length === 0) {
    throw new TypeError('TELEGRAM_BOT_TOKEN (env) is required');
  }
  if (typeof chatId !== 'string' || chatId.length === 0) {
    throw new RangeError('TELEGRAM_CHAT_ID (env) is required');
  }
  return { channel, token, chatId };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildTelegramMessage(content) {
  const title = escapeHtml(content.title || 'CMMI Level 4 Pipeline');
  const lines = Array.isArray(content.lines) ? content.lines : [];
  const body = lines
    .map((line) => String(line).replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .slice(0, MAX_LINES)
    .map((line) => '&#8226; ' + escapeHtml(line))
    .join('\n');
  let text = '<b>' + title + '</b>' + (body ? '\n\n' + body : '');
  if (text.length > MAX_TEXT) {
    text = text.slice(0, MAX_TEXT) + '\n... (truncated)';
  }
  return { parse_mode: 'HTML', text };
}

function sendTelegram(token, chatId, text, opts) {
  return new Promise((resolve, reject) => {
    const timeout = opts && opts.timeout ? opts.timeout : REQUEST_TIMEOUT;
    const payload = JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    });
    const req = https.request({
      hostname: 'api.telegram.org',
      path: '/bot' + token + '/sendMessage',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        let ok = res.statusCode >= 200 && res.statusCode < 300;
        try {
          const json = JSON.parse(data);
          ok = ok && json.ok === true;
        } catch (_) {
          ok = false;
        }
        resolve({ ok, statusCode: res.statusCode, body: data.slice(0, 300) });
      });
    });
    req.on('timeout', () => {
      req.destroy(new Error('request timeout'));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

module.exports = {
  IMPLEMENTED_CHANNELS,
  PLANNED_CHANNELS,
  validateChannel,
  validateConfig,
  escapeHtml,
  buildTelegramMessage,
  sendTelegram
};