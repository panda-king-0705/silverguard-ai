// Draft prepared with AI assistance for Dev 2; to be reviewed and edited by the team.
// Run: cd demo/guardian-alert && node --test
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const {
  sendGuardianAlert, simulateGuardianAlert, buildAlertText, maskPhoneNumber, findChatIds
} = require('./alert.js');

// A made-up value with the shape of a bot token, built at run time so the
// secrets check never sees a token-like string in this file.
const FAKE_TOKEN = ['000000', 'TEST-not-a-real-token'].join(':');
const CHAT_ID = '123456789';

function jsonResponse(status, body) {
  return { status, ok: status >= 200 && status < 300, json: async () => body };
}

function recordingFetch(response) {
  const calls = [];
  const fn = async (url, init) => { calls.push({ url, init }); return response; };
  fn.calls = calls;
  return fn;
}

test('success: POSTs chat_id and text to sendMessage and returns ok', async () => {
  const fetchImpl = recordingFetch(jsonResponse(200, { ok: true, result: { message_id: 42 } }));
  const r = await sendGuardianAlert({ token: FAKE_TOKEN, chatId: CHAT_ID, text: 'Test alert', fetchImpl });
  assert.equal(r.ok, true);
  assert.equal(r.error, null);
  assert.equal(typeof r.ms, 'number');
  assert.ok(r.ms >= 0);
  assert.equal(fetchImpl.calls.length, 1);
  const { url, init } = fetchImpl.calls[0];
  assert.equal(url, `https://api.telegram.org/bot${FAKE_TOKEN}/sendMessage`);
  assert.equal(init.method, 'POST');
  const params = new URLSearchParams(init.body);
  assert.equal(params.get('chat_id'), CHAT_ID);
  assert.equal(params.get('text'), 'Test alert');
});

test('Telegram error response: chat not found is explained in plain words', async () => {
  const fetchImpl = recordingFetch(jsonResponse(400, { ok: false, error_code: 400, description: 'Bad Request: chat not found' }));
  const r = await sendGuardianAlert({ token: FAKE_TOKEN, chatId: CHAT_ID, text: 'x', fetchImpl });
  assert.equal(r.ok, false);
  assert.match(r.error, /error 400/);
  assert.match(r.error, /chat not found/);
  assert.match(r.error, /pressed Start/);
});

test('Telegram error response: 401 points at the token and never shows it', async () => {
  const fetchImpl = recordingFetch(jsonResponse(401, { ok: false, error_code: 401, description: `Unauthorized ${FAKE_TOKEN}` }));
  const r = await sendGuardianAlert({ token: FAKE_TOKEN, chatId: CHAT_ID, text: 'x', fetchImpl });
  assert.equal(r.ok, false);
  assert.match(r.error, /token is wrong or has been revoked/);
  assert.ok(!r.error.includes(FAKE_TOKEN), 'token must be redacted');
});

test('reply that is not JSON is reported, not thrown', async () => {
  const fetchImpl = async () => ({ status: 502, json: async () => { throw new SyntaxError('bad json'); } });
  const r = await sendGuardianAlert({ token: FAKE_TOKEN, chatId: CHAT_ID, text: 'x', fetchImpl });
  assert.equal(r.ok, false);
  assert.match(r.error, /could not read \(HTTP 502\)/);
});

test('network failure: returns a plain-words error with the token hidden', async () => {
  const fetchImpl = async (url) => { throw new TypeError(`fetch failed for ${url}`); };
  const r = await sendGuardianAlert({ token: FAKE_TOKEN, chatId: CHAT_ID, text: 'x', fetchImpl });
  assert.equal(r.ok, false);
  assert.match(r.error, /Could not reach Telegram \(network error\)/);
  assert.ok(!r.error.includes(FAKE_TOKEN), 'token must be redacted');
});

test('timeout: aborts a request that never answers', async () => {
  let aborted = false;
  const fetchImpl = (url, init) => new Promise((resolve, reject) => {
    init.signal.addEventListener('abort', () => {
      aborted = true;
      const e = new Error('aborted'); e.name = 'AbortError'; reject(e);
    });
  });
  const r = await sendGuardianAlert({ token: FAKE_TOKEN, chatId: CHAT_ID, text: 'x', fetchImpl, timeoutMs: 50 });
  assert.equal(r.ok, false);
  assert.match(r.error, /timed out/);
  assert.ok(aborted, 'request should be aborted');
  assert.ok(r.ms >= 40 && r.ms < 2000, `ms was ${r.ms}`);
});

test('timeout: still returns when fetch ignores the abort signal', async () => {
  const fetchImpl = () => new Promise(() => {});
  const r = await sendGuardianAlert({ token: FAKE_TOKEN, chatId: CHAT_ID, text: 'x', fetchImpl, timeoutMs: 30 });
  assert.equal(r.ok, false);
  assert.match(r.error, /within 0\.03 s \(timed out\)/);
});

test('missing token or chat ID: no request is made', async () => {
  const fetchImpl = recordingFetch(jsonResponse(200, { ok: true }));
  const a = await sendGuardianAlert({ token: '', chatId: CHAT_ID, text: 'x', fetchImpl });
  const b = await sendGuardianAlert({ token: FAKE_TOKEN, chatId: '', text: 'x', fetchImpl });
  const c = await sendGuardianAlert({ token: FAKE_TOKEN, chatId: CHAT_ID, text: 'y'.repeat(4097), fetchImpl });
  assert.match(a.error, /token is missing/);
  assert.match(b.error, /chat ID is missing/);
  assert.match(c.error, /longer than 4096/);
  assert.equal(fetchImpl.calls.length, 0);
});

test('masking: alert text matches the agreed example', () => {
  const text = buildAlertText({ callerNumber: '+6591234567', time: '10:42' });
  assert.equal(text, 'Unknown number +65 9XXX XX67 rang Mum at 10:42. She can still answer. Please call her before any money moves.');
});

test('masking: phone number formats', () => {
  assert.equal(maskPhoneNumber('+65 9123 4567'), '+65 9XXX XX67');
  assert.equal(maskPhoneNumber('+65-8123-4567'), '+65 8XXX XX67');
  assert.equal(maskPhoneNumber('9123 4567'), '9XXX XX67');
  assert.equal(maskPhoneNumber('+447700900123'), '+44XX XXXX XX23');
  assert.equal(maskPhoneNumber('123'), 'XXX');
  assert.equal(maskPhoneNumber(''), '');
  for (const n of ['+6591234567', '+447700900123', '91234567']) {
    assert.ok(!maskPhoneNumber(n).includes('1234'), `${n} middle digits must be hidden`);
  }
});

test('alert text: options for name, pronoun, unmasked number, hidden caller and Date time', () => {
  assert.equal(
    buildAlertText({ seniorName: 'Ah Gong', pronoun: 'he', callerNumber: '+6591234567', time: '09:05', maskNumber: false }),
    'Unknown number +6591234567 rang Ah Gong at 09:05. He can still answer. Please call him before any money moves.'
  );
  assert.match(buildAlertText({ callerNumber: '', time: '10:42' }), /^An unknown caller \(number hidden\) rang Mum at 10:42\./);
  assert.match(buildAlertText({ callerNumber: '91234567', time: new Date('2026-11-02T10:42:07+08:00') }), / at 10:42\. /);
});

test('mock mode: no network, about the requested delay', async () => {
  const waited = [];
  const r = await simulateGuardianAlert({ delayMs: 600, sleep: async (ms) => { waited.push(ms); } });
  assert.equal(r.ok, true);
  assert.equal(r.mock, true);
  assert.deepEqual(waited, [600]);
  const f = await simulateGuardianAlert({ delayMs: 0, fail: 'Simulated failure' });
  assert.equal(f.ok, false);
  assert.equal(f.error, 'Simulated failure');
});

test('findChatIds: lists unique chats from getUpdates', async () => {
  const fetchImpl = recordingFetch(jsonResponse(200, {
    ok: true,
    result: [
      { update_id: 1, message: { chat: { id: 111, type: 'private', first_name: 'Wei', last_name: 'Jie' } } },
      { update_id: 2, message: { chat: { id: 111, type: 'private', first_name: 'Wei', last_name: 'Jie' } } },
      { update_id: 3, message: { chat: { id: -222, type: 'group', title: 'Family' } } }
    ]
  }));
  const r = await findChatIds({ token: FAKE_TOKEN, fetchImpl });
  assert.equal(r.ok, true);
  assert.deepEqual(r.chats, [
    { id: 111, type: 'private', name: 'Wei Jie' },
    { id: -222, type: 'group', name: 'Family' }
  ]);
  assert.equal(fetchImpl.calls[0].url, `https://api.telegram.org/bot${FAKE_TOKEN}/getUpdates`);
});
