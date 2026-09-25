'use strict';

const { escapeHtml, escapeAttribute, escapeJsString, stripControlChars, containsHtmlMarkup } = require('../src/xss');

describe('escapeHtml', () => {
  it('escapes HTML metacharacters', () => {
    expect(escapeHtml('<script>alert("x")</script>')).toBe('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
  });

  it('misuses brackets safely', () => {
    expect(escapeHtml('a&b')).toBe('a&amp;b');
  });

  it('returns plain text unchanged', () => {
    expect(escapeHtml('hello world')).toBe('hello world');
  });

  it('rejects non-strings', () => {
    expect(() => escapeHtml(42)).toThrow(TypeError);
  });
});

describe('escapeAttribute', () => {
  it('escapes quotes and backticks', () => {
    expect(escapeAttribute('"onclick=1`')).toBe('&quot;onclick=1&#x60;');
  });

  it('escapes angle brackets', () => {
    expect(escapeAttribute('<x>')).toBe('&lt;x&gt;');
  });
});

describe('escapeJsString', () => {
  it('escapes quotes and backslashes', () => {
    expect(escapeJsString("'\\\"")).toBe("\\'\\\\\\\"");
  });

  it('escapes control characters as unicode escapes', () => {
    expect(escapeJsString('a\u0001b')).toBe('a\\u0001b');
  });

  it('leaves safe characters alone', () => {
    expect(escapeJsString('hello')).toBe('hello');
  });
});

describe('stripControlChars', () => {
  it('removes control and format characters', () => {
    expect(stripControlChars('a\u0000b\u001fc\u007f')).toBe('abc');
  });

  it('rejects non-strings', () => {
    expect(() => stripControlChars(1)).toThrow(TypeError);
  });
});

describe('containsHtmlMarkup', () => {
  it('detects script tags', () => {
    expect(containsHtmlMarkup('<script>alert(1)</script>')).toBe(true);
  });

  it('detects closing and entity-encoded tags', () => {
    expect(containsHtmlMarkup('</div>')).toBe(true);
    expect(containsHtmlMarkup('&lt;b&gt;')).toBe(true);
  });

  it('returns false for plain text', () => {
    expect(containsHtmlMarkup('just text')).toBe(false);
  });
});