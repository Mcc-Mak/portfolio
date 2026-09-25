'use strict';

const MAX_XML_LENGTH = 1024 * 1024;
const FORBIDDEN_MARKERS = [
  '<!DOCTYPE',
  '<!ENTITY',
  '<!ATTLIST',
  '<!ELEMENT',
  '<?xml-stylesheet',
  '<!SYSTEM',
  '<!PUBLIC'
];

function hasUnsafeXmlConstructs(xml) {
  if (typeof xml !== 'string') {
    throw new TypeError('xml must be a string');
  }
  const upper = xml.toUpperCase();
  for (const marker of FORBIDDEN_MARKERS) {
    const normalized = marker.toUpperCase();
    if (upper.includes(normalized)) {
      return true;
    }
  }
  return false;
}

function assertSafeXml(xml, maxLength = MAX_XML_LENGTH) {
  if (typeof xml !== 'string') {
    throw new TypeError('xml must be a string');
  }
  if (typeof maxLength !== 'number') {
    throw new RangeError('maxLength must be a positive integer');
  }
  const limit = maxLength;
  if (!Number.isInteger(limit) || limit <= 0) {
    throw new RangeError('maxLength must be a positive integer');
  }
  if (xml.length > limit) {
    throw new RangeError('xml exceeds maximum length');
  }
  if (hasUnsafeXmlConstructs(xml)) {
    throw new RangeError('xml contains forbidden DOCTYPE or entity constructs');
  }
  return xml;
}

module.exports = { MAX_XML_LENGTH, hasUnsafeXmlConstructs, assertSafeXml };