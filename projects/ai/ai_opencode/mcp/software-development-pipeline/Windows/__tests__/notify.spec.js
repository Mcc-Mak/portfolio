'use strict';

const {
  validateChannel,
  validateConfig,
  escapeHtml,
  buildTelegramMessage,
  IMPLEMENTED_CHANNELS,
  PLANNED_CHANNELS
} = require('../src/notify');

describe('validateChannel', () => {
  it('accepts telegram', () => {
    expect(validateChannel('telegram')).toBe('telegram');
  });

  it('rejects slack and discord as planned-only', () => {
    expect(() => validateChannel('slack')).toThrow(RangeError);
    expect(() => validateChannel('discord')).toThrow(RangeError);
  });

  it('rejects non-string input', () => {
    expect(() => validateChannel(1)).toThrow(TypeError);
  });
});

describe('validateConfig', () => {
  afterEach(() => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
  });

  it('reads credentials from environment only', () => {
    process.env.TELEGRAM_BOT_TOKEN = '123:bot';
    process.env.TELEGRAM_CHAT_ID = '42';
    const config = validateConfig({});
    expect(config.token).toBe('123:bot');
    expect(config.chatId).toBe('42');
    expect(config.channel).toBe('telegram');
  });

  it('throws when the token is missing', () => {
    process.env.TELEGRAM_CHAT_ID = '42';
    expect(() => validateConfig({})).toThrow(TypeError);
  });

  it('throws when the chat id is missing', () => {
    process.env.TELEGRAM_BOT_TOKEN = '123:bot';
    expect(() => validateConfig({})).toThrow(RangeError);
  });
});

describe('escapeHtml', () => {
  it('escapes HTML-significant characters', () => {
    expect(escapeHtml('<a & b>')).toBe('&lt;a &amp; b&gt;');
  });
});

describe('buildTelegramMessage', () => {
  it('builds a title + bulleted, escaped body', () => {
    const message = buildTelegramMessage({ title: 'CMMI <Pipeline>', lines: ['BLOCKED', 'gate: R16'] });
    expect(message.parse_mode).toBe('HTML');
    expect(message.text).toContain('&lt;Pipeline&gt;');
    expect(message.text).toContain('BLOCKED');
    expect(message.text).toContain('&#8226;');
  });

  it('caps lines at MAX_LINES and truncates very long text', () => {
    const longLines = new Array(50).fill('x');
    const message = buildTelegramMessage({ title: 'T', lines: longLines });
    const bulletCount = (message.text.match(/&#8226;/g) || []).length;
    expect(bulletCount).toBe(12);

    const huge = buildTelegramMessage({ title: 'T', lines: ['y'.repeat(10000)] });
    expect(huge.text.length).toBeLessThanOrEqual(4000 + 20);
  });
});

describe('channel registries', () => {
  it('exposes telegram as implemented and slack/discord as planned', () => {
    expect(IMPLEMENTED_CHANNELS).toEqual(['telegram']);
    expect(PLANNED_CHANNELS).toEqual(['slack', 'discord']);
  });
});