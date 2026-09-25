'use strict';

const { MAX_XML_LENGTH, hasUnsafeXmlConstructs, assertSafeXml } = require('../src/xml');

describe('hasUnsafeXmlConstructs', () => {
  it('detects DOCTYPE declarations', () => {
    expect(hasUnsafeXmlConstructs('<?xml version="1.0"?><!DOCTYPE foo>')).toBe(true);
  });

  it('detects entity declarations case-insensitively', () => {
    expect(hasUnsafeXmlConstructs('<!entity x SYSTEM "file:///etc/passwd">')).toBe(true);
  });

  it('detects ATTLIST, ELEMENT, SYSTEM and PUBLIC references', () => {
    expect(hasUnsafeXmlConstructs('<!ATTLIST x>')).toBe(true);
    expect(hasUnsafeXmlConstructs('<!ELEMENT x ANY>')).toBe(true);
    expect(hasUnsafeXmlConstructs('<!SYSTEM "http://evil.example">')).toBe(true);
    expect(hasUnsafeXmlConstructs('<!PUBLIC "-//W3C//DTD XHTML 1.0//EN">')).toBe(true);
  });

  it('accepts plain XML without declarations', () => {
    expect(hasUnsafeXmlConstructs('<root><child>safe</child></root>')).toBe(false);
  });

  it('rejects non-string input', () => {
    expect(() => hasUnsafeXmlConstructs(null)).toThrow(TypeError);
  });
});

describe('assertSafeXml', () => {
  it('returns the xml when safe', () => {
    const input = '<root>ok</root>';
    expect(assertSafeXml(input)).toBe(input);
  });

  it('throws on entity-based attacks', () => {
    expect(() => assertSafeXml('<root>&xxe;</root><DOCTYPE evildata [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>')).toThrow(RangeError);
  });

  it('throws when the payload exceeds the size limit', () => {
    expect(() => assertSafeXml('<r>x</r>'.repeat(100), 32)).toThrow(RangeError);
  });

  it('honours the default maximum length', () => {
    expect(() => assertSafeXml('<r/>'.padEnd(MAX_XML_LENGTH + 1, ' '))).toThrow(RangeError);
  });

  it('rejects invalid maxLength arguments', () => {
    expect(() => assertSafeXml('x', 0)).toThrow(RangeError);
    expect(() => assertSafeXml('x', '16')).toThrow(RangeError);
  });

  it('rejects non-string xml', () => {
    expect(() => assertSafeXml(123)).toThrow(TypeError);
  });
});