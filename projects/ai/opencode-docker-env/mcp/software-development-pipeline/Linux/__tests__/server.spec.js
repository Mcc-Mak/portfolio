'use strict';

const http = require('http');
const server = require('../src/backend/server');

describe('demo API requestHandler', () => {
  let bound;
  let port;

  beforeAll(() => {
    bound = server.startServer(0);
    return new Promise((resolve) => {
      bound.on('listening', () => {
        port = bound.address().port;
        resolve();
      });
    });
  });

  afterAll(() => {
    bound.close();
  });

  function request(method, path, body) {
    return new Promise((resolve, reject) => {
      const req = http.request({
        host: '127.0.0.1',
        port,
        method,
        path,
        headers: body ? { 'Content-Type': 'application/json' } : {}
      }, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
      });
      req.on('error', reject);
      if (body) {
        req.write(JSON.stringify(body));
      }
      req.end();
    });
  }

  it('serves the index page on GET /', async () => {
    const res = await request('GET', '/');
    expect(res.status).toBe(200);
    expect(res.body).toContain('CMMI Level 4 Demo API');
  });

  it('reports health on GET /health', async () => {
    const res = await request('GET', '/health');
    expect(res.status).toBe(200);
    expect(JSON.parse(res.body)).toEqual({ status: 'ok' });
  });

  it('returns 404 for unknown routes', async () => {
    const res = await request('GET', '/nope');
    expect(res.status).toBe(404);
    expect(JSON.parse(res.body)).toEqual({ error: 'not found' });
  });

  it('validates email and escapes HTML in name', async () => {
    const res = await request('POST', '/api/validate', {
      name: '<script>alert(1)</script>',
      email: 'a@b.com'
    });
    expect(res.status).toBe(200);
    const payload = JSON.parse(res.body);
    expect(payload.status).toBe('valid');
    expect(payload.name).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('rejects an invalid email', async () => {
    const res = await request('POST', '/api/validate', {
      name: 'x',
      email: 'not-an-email'
    });
    expect(res.status).toBe(400);
  });

  it('issues a CSRF token on GET /api/csrf', async () => {
    const res = await request('GET', '/api/csrf');
    expect(res.status).toBe(200);
    const payload = JSON.parse(res.body);
    expect(typeof payload.token).toBe('string');
    expect(payload.token.split('.').length).toBe(3);
  });

  it('returns a session token on POST /api/session', async () => {
    const res = await request('POST', '/api/session');
    expect(res.status).toBe(200);
    const payload = JSON.parse(res.body);
    expect(payload.token.length).toBeGreaterThan(0);
    expect(payload.expiresAt).toBeGreaterThan(payload.issuedAt);
  });

  it('rejects a dangerous upload extension', async () => {
    const res = await request('POST', '/api/upload', {
      filename: '../../evil.sh',
      bytes: 10
    });
    expect(res.status).toBe(400);
    expect(JSON.parse(res.body)).toEqual({ error: 'file extension is not allowed' });
  });

  it('accepts an allowed upload', async () => {
    const res = await request('POST', '/api/upload', {
      filename: 'report.pdf',
      bytes: 4096
    });
    expect(res.status).toBe(200);
    const payload = JSON.parse(res.body);
    expect(payload.status).toBe('accepted');
    expect(payload.filename).toBe('report.pdf');
  });

  it('returns 400 for malformed JSON bodies', async () => {
    const res = await new Promise((resolve, reject) => {
      const req = http.request({
        host: '127.0.0.1',
        port,
        method: 'POST',
        path: '/api/validate',
        headers: { 'Content-Type': 'application/json' }
      }, (r) => {
        let data = '';
        r.on('data', (chunk) => { data += chunk; });
        r.on('end', () => resolve({ status: r.statusCode, body: data }));
      });
      req.on('error', reject);
      req.write('{not json');
      req.end();
    });
    expect(res.status).toBe(400);
  });

  it('authenticates a viewer role on POST /api/auth', async () => {
    const res = await request('POST', '/api/auth');
    expect(res.status).toBe(200);
    const payload = JSON.parse(res.body);
    expect(payload.authenticated).toBe(true);
  });
});