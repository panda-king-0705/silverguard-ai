// Draft prepared with AI assistance for Dev 2; to be reviewed and edited by the team.
// Fake secrets are assembled at run time so this file itself passes the secrets check.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { scanText, scanDir, IGNORE_MARKER } = require('./check-secrets.js');

const join = (...parts) => parts.join('');
const FAKE = {
  telegram: join('12345678', ':', 'AbCdEfGhIjKlMnOpQrStUvWxYz012345678'), // 35 chars after the colon
  aws: join('AKIA', 'ABCDEFGHIJKLMNOP'),
  google: join('AIza', 'x'.repeat(35)),
  github: join('ghp', '_', 'a'.repeat(36)),
  sk: join('sk', '-', 'proj', '-', 'b'.repeat(30)),
  pem: join('-----BEGIN ', 'RSA ', 'PRIVATE KEY-----')
};

test('finds each kind of secret and reports the line', () => {
  const text = ['ok line', `const t = "${FAKE.telegram}";`, FAKE.aws, FAKE.google, FAKE.github, FAKE.sk, FAKE.pem].join('\n');
  const kinds = scanText(text).map((f) => `${f.line}:${f.kind}`);
  assert.deepEqual(kinds, [
    '2:Telegram bot token', '3:AWS access key ID', '4:Google API key', '5:GitHub token',
    '6:OpenAI or Anthropic style key', '7:Private key block'
  ]);
});

test('never prints the full secret', () => {
  const [f] = scanText(FAKE.telegram);
  assert.ok(!f.preview.includes(FAKE.telegram.slice(5)));
  assert.match(f.preview, /hidden/);
});

test('ignores normal text: times, IDs, URLs, masked numbers', () => {
  const text = [
    'Unknown number +65 9XXX XX67 rang Mum at 10:42.',
    '"occurredAt": "2026-11-02T10:42:07+08:00"',
    '"eventId": "7f3c2a9e-0d41-4b8e-9a52-1c6e2f0b7d13"',
    'https://api.telegram.org/bot<token>/sendMessage',
    'chat_id=123456789'
  ].join('\n');
  assert.deepEqual(scanText(text), []);
});

test('ignore marker skips a line', () => {
  assert.deepEqual(scanText(`${FAKE.aws} // ${IGNORE_MARKER}`), []);
});

test('scanDir skips .git and node_modules and reports file paths', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sg-secrets-'));
  try {
    fs.mkdirSync(path.join(dir, '.git'));
    fs.mkdirSync(path.join(dir, 'node_modules'));
    fs.mkdirSync(path.join(dir, 'src'));
    fs.writeFileSync(path.join(dir, '.git', 'config'), FAKE.aws);
    fs.writeFileSync(path.join(dir, 'node_modules', 'x.js'), FAKE.aws);
    fs.writeFileSync(path.join(dir, 'src', 'a.js'), `line one\nconst k = '${FAKE.github}';\n`);
    fs.writeFileSync(path.join(dir, 'img.bin'), Buffer.from([0, 1, 2, 0]));
    const { findings } = scanDir(dir);
    assert.deepEqual(findings.map((f) => `${f.file}:${f.line}:${f.kind}`), [`${path.join('src', 'a.js')}:2:GitHub token`]);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
