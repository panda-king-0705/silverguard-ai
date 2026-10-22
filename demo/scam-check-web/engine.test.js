/*
 * Draft prepared with AI assistance for the Dev 1 role; to be reviewed and edited by the team.
 * Run inside demo/scam-check-web with:  node --test
 */
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { assess, detectCues, LEVELS, REMINDER } = require('./engine.js');
const testSet = require('./test-set.json');

const families = (text) => detectCues(text).map((c) => c.family);
const phrases = (text, family) => {
  const cue = detectCues(text).find((c) => c.family === family);
  return cue ? cue.matches : [];
};

// ---------------------------------------------------------------- test set

test('test set has 10 scam and 5 genuine messages with the required fields', () => {
  const required = ['id', 'text', 'language', 'kind', 'expected_level', 'pattern', 'source_url'];
  for (const item of testSet) {
    for (const field of required) assert.ok(field in item, `${item.id} is missing ${field}`);
    assert.ok(['scam', 'genuine'].includes(item.kind), `${item.id} kind`);
    assert.ok(Object.values(LEVELS).includes(item.expected_level), `${item.id} expected_level`);
  }
  assert.equal(testSet.filter((i) => i.kind === 'scam').length, 10);
  assert.equal(testSet.filter((i) => i.kind === 'genuine').length, 5);
  assert.equal(new Set(testSet.map((i) => i.id)).size, testSet.length, 'ids are unique');
});

test('every scam message cites a source URL and no genuine message is expected "High risk"', () => {
  for (const item of testSet.filter((i) => i.kind === 'scam')) {
    assert.match(item.source_url, /^https:\/\//, `${item.id} needs a source URL`);
  }
  for (const item of testSet.filter((i) => i.kind === 'genuine')) {
    assert.notEqual(item.expected_level, LEVELS.HIGH, `${item.id} must not be expected High risk`);
  }
});

test('ACCEPTANCE: at least 8 of 10 scam messages are "High risk"', () => {
  const scams = testSet.filter((i) => i.kind === 'scam');
  const high = scams.filter((i) => assess(i.text).level === LEVELS.HIGH);
  assert.ok(high.length >= 8, `only ${high.length}/10 scams were High risk`);
});

test('ACCEPTANCE: 0 of 5 genuine messages are "High risk"', () => {
  const genuine = testSet.filter((i) => i.kind === 'genuine');
  const falseAlarms = genuine.filter((i) => assess(i.text).level === LEVELS.HIGH).map((i) => i.id);
  assert.deepEqual(falseAlarms, []);
});

// ---------------------------------------------------------------- cue families

test('money request: English, Singlish, Mandarin and Malay', () => {
  assert.ok(families('Can you transfer it to my bank account?').includes('money'));
  assert.ok(families('PayNow me can?').includes('money'));
  assert.ok(families('Buy gift cards and send the codes').includes('money'));
  assert.ok(families('Pay in crypto please').includes('money'));
  assert.ok(phrases('Need $3,000 by Friday', 'money').includes('$3,000'));
  assert.ok(phrases('need 3k leh', 'money').includes('3k'));
  assert.ok(families('send money to me').includes('money'));
  assert.ok(families('请帮我转账').includes('money'));
  assert.ok(families('快点汇款给我').includes('money'));
  assert.ok(families('我需要钱').includes('money'));
  assert.ok(phrases('借我五千块', 'money').includes('五千块'));
  assert.ok(families('Tolong hantar duit').includes('money'));
  assert.ok(families('boleh pindah wang ke akaun ini').includes('money'));
  assert.ok(!families('See you at dinner on Sunday').includes('money'));
});

test('secrecy: English, Singlish, Mandarin and Malay', () => {
  assert.ok(families("Don't tell Mum ok").includes('secrecy'));
  assert.ok(families('Do not tell Dad').includes('secrecy'));
  assert.ok(families('dun tell anyone').includes('secrecy'));
  assert.ok(families('Keep this between us').includes('secrecy'));
  assert.ok(families("Don't let Dad know").includes('secrecy'));
  assert.ok(families('千万别告诉妈妈').includes('secrecy'));
  assert.ok(families('不要让爸爸知道').includes('secrecy'));
  assert.ok(families('Jangan beritahu ayah').includes('secrecy'));
  assert.ok(!families("Don't worry, I'm fine").includes('secrecy'));
});

test('identity switch: English, Singlish, Mandarin and Malay', () => {
  assert.ok(families('This is my new number').includes('identity'));
  assert.ok(families('I lost my phone').includes('identity'));
  assert.ok(families("Can't talk now, voice note only").includes('identity'));
  assert.ok(families('My phone spoil already').includes('identity'));
  assert.ok(families('Guess who?').includes('identity'));
  assert.ok(families('这是我的新号码').includes('identity'));
  assert.ok(families('我手机丢了').includes('identity'));
  assert.ok(families('Ini nombor baru saya').includes('identity'));
  assert.ok(families('telefon saya hilang').includes('identity'));
  assert.ok(!families('Call me on my usual number').includes('identity'));
});

test('urgency: English, Singlish, Mandarin and Malay', () => {
  assert.ok(families('Need it now').includes('urgency'));
  assert.ok(families('Very urgent').includes('urgency'));
  assert.ok(families('Must settle tonight').includes('urgency'));
  assert.ok(families('I am in hospital').includes('urgency'));
  assert.ok(families('Got into an accident').includes('urgency'));
  assert.ok(families('He was arrested').includes('urgency'));
  assert.ok(families('within 2 hours').includes('urgency'));
  assert.ok(families('马上回复我').includes('urgency'));
  assert.ok(families('紧急情况').includes('urgency'));
  assert.ok(families('Tolong segera').includes('urgency'));
});

test('urgency: Singlish "just now" (a moment ago) is not treated as urgent', () => {
  assert.ok(!families('I reached home just now').includes('urgency'));
});

test('authority: English, Mandarin and Malay', () => {
  assert.ok(families('The police will come').includes('authority'));
  assert.ok(families('You must go to court').includes('authority'));
  assert.ok(families('I am a bank officer').includes('authority'));
  assert.ok(families('Call from the government').includes('authority'));
  assert.ok(phrases('MAS has frozen your account', 'authority').includes('MAS'));
  assert.ok(phrases('ICA requires your passport', 'authority').includes('ICA'));
  assert.ok(families('我是警察').includes('authority'));
  assert.ok(families('Pegawai polis akan datang').includes('authority'));
  // Acronyms are case-sensitive so the word "mas" or "Mas" in a name is not authority.
  assert.ok(!families('Selamat pagi Mas').includes('authority'));
});

test('emotional pressure: English, Mandarin and Malay', () => {
  assert.ok(families('I am so scared').includes('emotion'));
  assert.ok(families('please help me').includes('emotion'));
  assert.ok(families('I keep crying').includes('emotion'));
  assert.ok(families('求求你').includes('emotion'));
  assert.ok(families('Saya takut').includes('emotion'));
});

test('detectCues returns label, weight and matched phrases', () => {
  const cues = detectCues('New number. Transfer $500 now!');
  const money = cues.find((c) => c.family === 'money');
  assert.equal(money.weight, 'High');
  assert.equal(money.label, 'Money request');
  assert.ok(money.matches.includes('transfer'));
  assert.ok(money.matches.includes('$500'));
});

// ---------------------------------------------------------------- risk combiner

test('combiner: money plus another High cue is "High risk"', () => {
  assert.equal(assess('New number, PayNow me $200').level, LEVELS.HIGH);
  assert.equal(assess("Transfer $200, don't tell Dad").level, LEVELS.HIGH);
});

test('combiner: money plus a Medium cue is "High risk"', () => {
  assert.equal(assess('Transfer $200 now').level, LEVELS.HIGH);
  assert.equal(assess('The police say you must transfer $200').level, LEVELS.HIGH);
});

test('combiner: one High cue alone is "Check with family"', () => {
  assert.equal(assess('This is my new number').level, LEVELS.CHECK);
  assert.equal(assess('I paid you back $20 by PayNow').level, LEVELS.CHECK);
  assert.equal(assess('Keep this between us').level, LEVELS.CHECK);
});

test('combiner: two High cues without money are "Check with family"', () => {
  assert.equal(assess("New number, don't tell Mum").level, LEVELS.CHECK);
});

test('combiner: Medium and Low cues without a High cue give "No warning signs found"', () => {
  assert.equal(assess('Dad is in hospital now, police took a statement, I am scared').level, LEVELS.NONE);
  assert.equal(assess('See you for dinner').level, LEVELS.NONE);
  assert.equal(assess('').level, LEVELS.NONE);
});

test('assess always gives the verification reminder and plain-word reasons, never "safe"', () => {
  for (const text of ['', 'Hello', 'New number, transfer $100 now']) {
    const result = assess(text);
    assert.equal(result.reminder, REMINDER);
    assert.equal(REMINDER, 'Still verify any request for money by calling family on a number you saved.');
    assert.doesNotMatch(result.level, /safe/i);
  }
  const result = assess("New number. Transfer $100 now, don't tell Mum");
  assert.ok(result.reasons.includes('They asked you to keep it secret'));
  assert.ok(result.reasons.some((r) => /new number/.test(r)));
  assert.ok(result.reasons.some((r) => /money/.test(r)));
});

// ---------------------------------------------------------------- page

test('index.html embeds the current engine.js (run "node sync-page.js" after editing the engine)', () => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const engine = fs.readFileSync(path.join(__dirname, 'engine.js'), 'utf8');
  const start = '/* ENGINE:START */\n';
  const end = '/* ENGINE:END */';
  const a = html.indexOf(start);
  const b = html.indexOf(end);
  assert.ok(a !== -1 && b > a, 'engine markers found in index.html');
  assert.equal(html.slice(a + start.length, b), engine);
  assert.doesNotMatch(html, /<(?:script|link)[^>]+(?:src|href)=["']?https?:/i, 'no external resources');
});
