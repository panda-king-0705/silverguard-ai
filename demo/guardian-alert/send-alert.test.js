// Draft prepared with AI assistance for Dev 2; to be reviewed and edited by the team.
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { run, parseArgs } = require('./send-alert.js');

const FAKE = 'fake-token-for-tests';
const okFetch = async (url) => ({
  ok: true, status: 200,
  json: async () => (String(url).includes('getUpdates')
    ? { ok: true, result: [{ update_id: 1, message: { chat: { id: 42, type: 'private', first_name: 'Marcus' } } }] }
    : { ok: true, result: { message_id: 1 } })
});
const collect = () => { const lines = []; return { lines, log: (s) => lines.push(String(s)) }; };

test('parseArgs reads options and caps --times at 10', () => {
  assert.deepStrictEqual(parseArgs(['--times', '50', '--senior', 'Ah Ma']).times, 10);
  assert.strictEqual(parseArgs(['--senior', 'Ah Ma']).senior, 'Ah Ma');
  assert.throws(() => parseArgs(['--token', 'x']), /Unknown option/);
});

test('refuses to run without a token in the environment', async () => {
  const c = collect();
  assert.strictEqual(await run([], {}, { log: c.log, fetchImpl: okFetch }), 2);
  assert.match(c.lines.join('\n'), /TELEGRAM_BOT_TOKEN/);
});

test('--find-chat lists chat IDs', async () => {
  const c = collect();
  assert.strictEqual(await run(['--find-chat'], { TELEGRAM_BOT_TOKEN: FAKE }, { log: c.log, fetchImpl: okFetch }), 0);
  assert.match(c.lines.join('\n'), /chat ID 42/);
});

test('--times 5 sends five alerts and reports PASS, never printing the token', async () => {
  const c = collect();
  const code = await run(['--times', '5'], { TELEGRAM_BOT_TOKEN: FAKE, TELEGRAM_CHAT_ID: '42' }, { log: c.log, fetchImpl: okFetch, sleep: async () => {} });
  assert.strictEqual(code, 0);
  const out = c.lines.join('\n');
  assert.match(out, /5\/5 under 10 s\. PASS/);
  assert.ok(!out.includes(FAKE));
});

test('a failed send makes the run fail', async () => {
  const bad = async () => ({ ok: false, status: 401, json: async () => ({ ok: false, error_code: 401, description: 'Unauthorized' }) });
  const c = collect();
  const code = await run(['--times', '2'], { TELEGRAM_BOT_TOKEN: FAKE, TELEGRAM_CHAT_ID: '42' }, { log: c.log, fetchImpl: bad, sleep: async () => {} });
  assert.strictEqual(code, 1);
  assert.match(c.lines.join('\n'), /FAIL/);
});
