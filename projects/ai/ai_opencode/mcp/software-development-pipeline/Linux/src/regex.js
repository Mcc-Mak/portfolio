'use strict';

const MAX_PATTERN_LENGTH = 1024;
const MAX_REASONS = 3;

function requirePatternSource(pattern) {
  if (typeof pattern !== 'string' || pattern.length === 0) {
    throw new TypeError('pattern must be a non-empty string');
  }
  if (pattern.length > MAX_PATTERN_LENGTH) {
    throw new RangeError('pattern exceeds maximum length');
  }
  if (pattern.includes('\u0000')) {
    throw new RangeError('pattern must not contain null bytes');
  }
  return pattern;
}

function stripEscapes(source) {
  return source.replace(/\\./g, '');
}

function detectQuantifiedBackReference(source) {
  return /\\[1-9][0-9]?[+*]/.test(source) ? 'quantified_backreference' : null;
}

function detectNestedQuantifier(source) {
  return /\([^()]*[+*?{][^()]*\)[+*]/.test(source) ? 'nested_quantifier' : null;
}

function detectAmbiguousAlternation(source) {
  let start = source.indexOf('(');
  while (start !== -1) {
    const close = source.indexOf(')', start);
    if (close === -1) {
      break;
    }
    const inner = source.slice(start + 1, close);
    if (!inner.includes('(') && !inner.includes(')')) {
      const quant = source[close + 1];
      if (quant === '+' || quant === '*') {
        const alternatives = inner.split('|');
        if (alternatives.length >= 2) {
          const leads = alternatives.map((alt) => alt.trim().charAt(0));
          if (new Set(leads).size < leads.length) {
            return 'ambiguous_alternation';
          }
        }
      }
    }
    start = source.indexOf('(', start + 1);
  }
  return null;
}

function analyzeRegex(pattern) {
  requirePatternSource(pattern);
  const reasons = [];
  const backref = detectQuantifiedBackReference(pattern);
  if (backref) {
    reasons.push(backref);
  }
  const stripped = stripEscapes(pattern);
  const nested = detectNestedQuantifier(stripped);
  if (nested) {
    reasons.push(nested);
  }
  const ambiguous = detectAmbiguousAlternation(stripped);
  if (ambiguous) {
    reasons.push(ambiguous);
  }
  return { risk: reasons.length > 0, reasons: reasons.slice(0, MAX_REASONS) };
}

function assertSafeRegex(pattern) {
  const { risk, reasons } = analyzeRegex(pattern);
  if (risk) {
    throw new RangeError('regex is vulnerable to ReDoS: ' + reasons.join(', '));
  }
  let compiled;
  try {
    compiled = new RegExp(pattern);
  } catch (err) {
    throw new RangeError('regex does not compile');
  }
  return compiled;
}

module.exports = {
  MAX_PATTERN_LENGTH,
  analyzeRegex,
  assertSafeRegex
};