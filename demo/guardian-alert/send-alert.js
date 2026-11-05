#!/usr/bin/env node
// Draft prepared with AI assistance for Dev 2; to be reviewed and edited by the team.
//
// Node fallback for the guardian alert, and a one-command live 5/5 test.
// Uses the same alert.js as the browser pages, so the message text is identical.
//
// The token and chat ID come from environment variables only, never from the
// command line (shell history) and never from a file in the repo:
//   TELEGRAM_BOT_TOKEN   the token BotFather gave you
//   TELEGRAM_CHAT_ID     the guardian's chat ID (find it with --find-chat)
//
// Usage:
//   node send-alert.js --find-chat          list chats that have messaged the bot
//   node send-alert.js                      send one alert
//   node send-alert.js --times 5            live acceptance test: 5 alerts, 3 s apart
//   node send-alert.js --senior "Ah Ma"     change the senior's name in the text

'use strict';

const alert = require('./alert.js');

const PASS_MS = 10000; // acceptance: every alert arrives in under 10 s

function parseArgs(argv) {
  const out = { findChat: false, times: 1, senior: 'Mum', gapMs: 3000 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--find-chat') out.findChat = true;
    else if (a === '--times') out.times = Math.max(1, Math.min(10, parseInt(argv[++i], 10) || 1));
    else if (a === '--senior') out.senior = String(argv[++i] || 'Mum');
    else if (a === '--gap') out.gapMs = Math.max(0, parseInt(argv[++i], 10) || 0);
    else if (a === '--help' || a === '-h') out.help = true;
    else throw new Error('Unknown option: ' + a);
  }
  return out;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run(argv, env, deps) {
  const log = (deps && deps.log) || console.log;
  const fetchImpl = (deps && deps.fetchImpl) || globalThis.fetch;
  const wait = (deps && deps.sleep) || sleep;
  const opts = parseArgs(argv);
  if (opts.help) { log('See the comment at the top of send-alert.js for usage.'); return 0; }

  const token = (env.TELEGRAM_BOT_TOKEN || '').trim();
  if (!token) { log('Set TELEGRAM_BOT_TOKEN first (see README, "Live test from Node").'); return 2; }

  if (opts.findChat) {
    const r = await alert.findChatIds({ token, fetchImpl });
    if (!r.ok) { log('Could not read chats: ' + r.error); return 1; }
    if (!r.chats.length) { log('No chats yet. Send any message to the bot from the guardian account, then run this again.'); return 1; }
    r.chats.forEach((c) => log(`chat ID ${c.id}  (${c.type}${c.name ? ', ' + c.name : ''})`));
    return 0;
  }

  const chatId = (env.TELEGRAM_CHAT_ID || '').trim();
  if (!chatId) { log('Set TELEGRAM_CHAT_ID first (run with --find-chat to get it).'); return 2; }

  const rows = [];
  for (let n = 1; n <= opts.times; n++) {
    const text = alert.buildAlertText({ seniorName: opts.senior, callerNumber: '+6591234567', time: new Date(), timeZone: 'Asia/Singapore' });
    const r = await alert.sendGuardianAlert({ token, chatId, text, fetchImpl });
    const pass = r.ok && r.ms < PASS_MS;
    rows.push({ n, ok: r.ok, ms: r.ms, pass, error: r.error || '' });
    log(`Try ${n}: ${r.ok ? 'sent' : 'FAILED'} in ${(r.ms / 1000).toFixed(2)} s${r.error ? ' (' + r.error + ')' : ''}`);
    if (n < opts.times) await wait(opts.gapMs);
  }
  if (opts.times > 1) {
    const passed = rows.filter((x) => x.pass).length;
    log(`\nResult: ${passed}/${rows.length} under ${PASS_MS / 1000} s. ${passed === rows.length ? 'PASS' : 'FAIL'}`);
    log('Also check the phone: note the time each message appeared. Copy both into the README table.');
    return passed === rows.length ? 0 : 1;
  }
  return rows[0].ok ? 0 : 1;
}

module.exports = { run, parseArgs };

if (require.main === module) {
  run(process.argv.slice(2), process.env).then((code) => { process.exitCode = code; }, (e) => { console.error(e.message); process.exitCode = 2; });
}
