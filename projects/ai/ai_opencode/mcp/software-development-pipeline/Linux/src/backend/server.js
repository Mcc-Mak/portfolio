'use strict';

const http = require('http');
const crypto = require('crypto');
const validate = require('../validate');
const xss = require('../xss');
const rate = require('../rate');
const session = require('../session');
const csrf = require('../csrf');
const encrypt = require('../encrypt');
const access = require('../access');
const upload = require('../upload');

const HOST = '0.0.0.0';
const PORT = Number(process.env.BACKEND_PORT) || 8080;
const MAX_BODY_BYTES = 64 * 1024;
const CSRF_SECRET = crypto.randomBytes(32).toString('hex');
const SESSION_EXPIRY_MS = 12 * 60 * 60 * 1000;

const limiter = rate.createRateLimiter({ windowMs: 60000, max: 120 });

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store'
  });
  res.end(payload);
}

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new RangeError('request body too large'));
        req.removeAllListeners('data');
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      const buf = Buffer.concat(chunks);
      if (buf.length === 0) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(buf.toString('utf8')));
      } catch (err) {
        reject(new SyntaxError('invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function checkRate(req, res) {
  const key = req.socket.remoteAddress || 'unknown';
  const result = limiter.check(key);
  if (!result.allowed) {
    sendJson(res, 429, { error: 'rate limit exceeded' });
    return false;
  }
  return true;
}

function routeIndex(res) {
  const html = '<!doctype html><html><head><title>CMMI demo API</title></head>' +
    '<body><h1>CMMI Level 4 Demo API</h1>' +
    '<p>Endpoints: /health /api/validate /api/csrf /api/session /api/encrypt /api/upload /api/auth</p>' +
    '</body></html>';
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store'
  });
  res.end(html);
}

async function routeValidate(req, res) {
  let body;
  try {
    body = await readBody(req, MAX_BODY_BYTES);
  } catch (err) {
    sendJson(res, 400, { error: 'invalid request body' });
    return;
  }
  const name = typeof body.name === 'string' ? validate.sanitizeString(body.name) : '';
  const email = typeof body.email === 'string' ? body.email : '';
  if (validate.isValidEmail(email)) {
    sendJson(res, 200, {
      status: 'valid',
      name: xss.escapeHtml(name),
      email
    });
  } else {
    sendJson(res, 400, { error: 'invalid email address', name: xss.escapeHtml(name) });
  }
}

function routeCsrf(req, res) {
  const token = csrf.generateCsrfToken(CSRF_SECRET);
  sendJson(res, 200, { token });
}

function routeSession(req, res) {
  const token = session.generateSessionToken();
  const issuedAt = Date.now();
  const hash = session.hashSessionToken(token);
  sendJson(res, 200, {
    token,
    issuedAt,
    expiresAt: issuedAt + SESSION_EXPIRY_MS,
    hash
  });
}

async function routeEncrypt(req, res) {
  let body;
  try {
    body = await readBody(req, MAX_BODY_BYTES);
  } catch (err) {
    sendJson(res, 400, { error: 'invalid request body' });
    return;
  }
  const plaintext = typeof body.message === 'string' && body.message.length > 0
    ? validate.sanitizeString(body.message)
    : '';
  if (plaintext.length === 0) {
    sendJson(res, 400, { error: 'message is required' });
    return;
  }
  try {
    const ciphertext = encrypt.encrypt(plaintext);
    sendJson(res, 200, { ciphertext });
  } catch (err) {
    sendJson(res, 500, { error: 'encryption failed' });
  }
}

async function routeUpload(req, res) {
  let body;
  try {
    body = await readBody(req, MAX_BODY_BYTES);
  } catch (err) {
    sendJson(res, 400, { error: 'invalid request body' });
    return;
  }
  const filename = typeof body.filename === 'string' ? body.filename : '';
  const bytes = typeof body.bytes === 'number' ? Math.trunc(body.bytes) : 0;
  let safeBase;
  try {
    safeBase = upload.sanitizeFilename(filename);
  } catch (err) {
    sendJson(res, 400, { error: 'invalid filename' });
    return;
  }
  if (!upload.isAllowedExtension(safeBase)) {
    sendJson(res, 400, { error: 'file extension is not allowed' });
    return;
  }
  try {
    upload.assertAllowedUpload(safeBase, bytes);
  } catch (err) {
    sendJson(res, 400, { error: 'file rejected' });
    return;
  }
  sendJson(res, 200, {
    status: 'accepted',
    filename: safeBase,
    bytes
  });
}

function routeAuth(req, res) {
  const roles = ['viewer'];
  try {
    access.assertRole(roles, 'viewer');
    sendJson(res, 200, { authenticated: true, roles });
  } catch (err) {
    sendJson(res, 403, { error: 'forbidden' });
  }
}

function requestHandler(req, res) {
  const parsed = new URL(req.url, 'http://invalid.local');
  const pathname = parsed.pathname;

  if (req.method === 'GET' && pathname === '/') {
    routeIndex(res);
    return;
  }
  if (req.method === 'GET' && pathname === '/health') {
    sendJson(res, 200, { status: 'ok' });
    return;
  }
  if (!checkRate(req, res)) {
    return;
  }
  if (req.method === 'POST' && pathname === '/api/validate') {
    routeValidate(req, res);
    return;
  }
  if (req.method === 'GET' && pathname === '/api/csrf') {
    routeCsrf(req, res);
    return;
  }
  if (req.method === 'POST' && pathname === '/api/session') {
    routeSession(req, res);
    return;
  }
  if (req.method === 'POST' && pathname === '/api/encrypt') {
    routeEncrypt(req, res);
    return;
  }
  if (req.method === 'POST' && pathname === '/api/upload') {
    routeUpload(req, res);
    return;
  }
  if (req.method === 'POST' && pathname === '/api/auth') {
    routeAuth(req, res);
    return;
  }
  sendJson(res, 404, { error: 'not found' });
}

function startServer(port = PORT) {
  const server = http.createServer(requestHandler);
  server.listen(port, HOST);
  return server;
}

module.exports = {
  HOST,
  PORT,
  requestHandler,
  startServer,
  routeValidate,
  routeCsrf,
  routeSession,
  routeEncrypt,
  routeUpload,
  routeAuth,
  routeIndex
};

if (require.main === module) {
  const server = startServer();
  server.on('listening', () => {
    const addr = server.address();
    console.log('[demo-api] listening on http://' + addr.address + ':' + addr.port);
  });
}