'use strict';

const {
  ALLOWED_PROTOCOLS,
  ipv4ToInt,
  isPrivateIpv4,
  isPrivateIpv6,
  isPublicIpAddress,
  assertSafeHostname,
  resolveAddresses,
  assertSafeUrl
} = require('../src/ssrf');

describe('ipv4ToInt', () => {
  it('converts dotted quad to integer', () => {
    expect(ipv4ToInt('127.0.0.1')).toBe(0x7f000001);
    expect(ipv4ToInt('0.0.0.0')).toBe(0);
  });

  it('rejects malformed input', () => {
    expect(ipv4ToInt('127.0.0')).toBeNull();
    expect(ipv4ToInt('abc')).toBeNull();
    expect(ipv4ToInt(127)).toBeNull();
  });
});

describe('isPrivateIpv4', () => {
  it('flags private and reserved ranges', () => {
    expect(isPrivateIpv4('10.0.0.1')).toBe(true);
    expect(isPrivateIpv4('172.16.0.1')).toBe(true);
    expect(isPrivateIpv4('192.168.1.1')).toBe(true);
    expect(isPrivateIpv4('127.0.0.1')).toBe(true);
    expect(isPrivateIpv4('169.254.169.254')).toBe(true);
    expect(isPrivateIpv4('0.0.0.0')).toBe(true);
  });

  it('accepts public ranges', () => {
    expect(isPrivateIpv4('8.8.8.8')).toBe(false);
    expect(isPrivateIpv4('1.1.1.1')).toBe(false);
  });
});

describe('isPrivateIpv6', () => {
  it('flags loopback, link-local and unique-local', () => {
    expect(isPrivateIpv6('::1')).toBe(true);
    expect(isPrivateIpv6('fe80::1')).toBe(true);
    expect(isPrivateIpv6('fd00::1')).toBe(true);
    expect(isPrivateIpv6('::ffff:127.0.0.1')).toBe(true);
  });

  it('accepts public v6', () => {
    expect(isPrivateIpv6('2606:4700:4700::1111')).toBe(false);
  });
});

describe('isPublicIpAddress', () => {
  it('accepts public addresses', () => {
    expect(isPublicIpAddress('8.8.8.8')).toBe(true);
  });

  it('rejects private addresses and junk', () => {
    expect(isPublicIpAddress('10.0.0.1')).toBe(false);
    expect(isPublicIpAddress('999.1.1.1')).toBe(false);
    expect(isPublicIpAddress('not-an-ip')).toBe(false);
  });
});

describe('assertSafeHostname', () => {
  it('returns a valid hostname', () => {
    expect(assertSafeHostname('example.com')).toBe('example.com');
  });

  it('rejects bad hostnames', () => {
    expect(() => assertSafeHostname('')).toThrow(RangeError);
    expect(() => assertSafeHostname('a\u0000b')).toThrow(RangeError);
    expect(() => assertSafeHostname('x'.repeat(300))).toThrow(RangeError);
  });
});

describe('resolveAddresses', () => {
  it('short-circuits raw IP literals without DNS', async () => {
    await expect(resolveAddresses('8.8.8.8')).resolves.toEqual(['8.8.8.8']);
  });

  it('resolves localhost to a non-public address', async () => {
    const addresses = await resolveAddresses('localhost');
    expect(Array.isArray(addresses)).toBe(true);
    expect(addresses.length).toBeGreaterThan(0);
    for (const addr of addresses) {
      expect(isPublicIpAddress(addr)).toBe(false);
    }
  });
});

describe('assertSafeUrl', () => {
  it('accepts a public https URL', async () => {
    const result = await assertSafeUrl('https://8.8.8.8/path');
    expect(result.protocol).toBe('https:');
  });

  it('rejects non-http protocols', async () => {
    await expect(assertSafeUrl('file:///etc/passwd')).rejects.toThrow(RangeError);
    await expect(assertSafeUrl('ftp://example.com/x')).rejects.toThrow(RangeError);
  });

  it('rejects private and loopback targets', async () => {
    await expect(assertSafeUrl('http://127.0.0.1/x')).rejects.toThrow(RangeError);
    await expect(assertSafeUrl('http://169.254.169.254/latest/meta-data')).rejects.toThrow(RangeError);
    await expect(assertSafeUrl('http://192.168.1.10/admin')).rejects.toThrow(RangeError);
  });

  it('rejects localhost resolution', async () => {
    await expect(assertSafeUrl('http://localhost:8080/admin')).rejects.toThrow(RangeError);
  });

  it('rejects malformed input', async () => {
    await expect(assertSafeUrl('')).rejects.toThrow(RangeError);
    await expect(assertSafeUrl('not a url')).rejects.toThrow(RangeError);
    await expect(assertSafeUrl(42)).rejects.toThrow(RangeError);
  });

  it('exposes only http/https in allowed protocols', () => {
    expect([...ALLOWED_PROTOCOLS].sort()).toEqual(['http:', 'https:']);
  });
});