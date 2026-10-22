> Draft prepared with AI assistance for the Dev 1 role; to be reviewed and edited by the team.

# Scam Check web demo (backlog D1 and D2)

A paste-text Scam Check page for the Week 13 pitch. It runs a simplified, rules-only version of the Scam Check engine in [`docs/prototype-design.md`](../../docs/prototype-design.md): it looks for the scam *script* (money, secrecy, a new number, urgency, authority, emotional pressure), not the voice, and gives one of three levels: **High risk**, **Check with family** or **No warning signs found**. It never says "safe".

## How to run

- **The page:** open `index.html` in any browser (double-click it). It is one file with no external resources, so it works offline, including on a phone.
- **The tests:** in this folder, run `node --test` (Node 18 or later; checked with Node 22).
- **The results table:** `node evaluate.js` (or `node evaluate.js --markdown`).
- **After editing `engine.js`:** run `node sync-page.js` to copy the engine into `index.html`. A test fails if the two differ.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page: paste a message, see the level with an icon and words, the reasons, the phrases noticed and the reminder. Has a disabled "Alert my guardian" button (Sprint 2, Dev 2) |
| `engine.js` | Pure functions, browser and Node: `detectCues(text)` returns the cue families found with matched phrases; `assess(text)` returns `{ level, reasons, cues, reminder }` |
| `engine.test.js` | `node:test` tests: the acceptance checks on the test set, unit tests per cue family in English, Singlish, Mandarin and Malay, the risk combiner, and that the page embeds the current engine |
| `evaluate.js` | Prints the results table below |
| `sync-page.js` | Copies `engine.js` into `index.html` |
| `test-set.json`, `test-set.md` | 10 scam and 5 genuine messages, with sources and how they were built |

## How the engine decides

| Cue family | Weight | Examples it looks for |
| --- | --- | --- |
| Money request | High | transfer, PayNow, bank account, safe account, gift card, crypto, borrow, loan, $3,000, 3k; 转账, 汇款, 钱, 五千块; hantar duit, pindah wang, akaun, bayar |
| Secrecy | High | don't tell Mum, keep this between us, confidential, don't call the police; 别告诉, 不要让…知道, 保密; jangan beritahu |
| Identity switch | High | new number, changed number, lost my phone, phone spoil, can't talk, voice note only, guess who; 新号码, 手机丢了; nombor baru, telefon hilang |
| Urgency | Medium | now (not Singlish "just now"), urgent, tonight, today, within 2 hours, hospital, accident, arrested; 马上, 紧急, 现在, 医院; segera, sekarang, kemalangan |
| Authority | Medium | police, court, warrant, bank officer, officer, government, investigation, MAS, ICA, SPF; 警察, 法院, 政府; polis, mahkamah, kerajaan |
| Emotional pressure | Low | crying, scared, please help, help me; 害怕, 求求你; takut, tolong saya |

- **High risk:** a money request plus any other High or Medium cue.
- **Check with family:** any High cue without that combination (money alone counts).
- **No warning signs found:** everything else. Low cues add a reason but never change the level.
- Every result shows: "Still verify any request for money by calling family on a number you saved."

The word lists are general patterns. Nothing is special-cased for the test-set sentences.

## Results on the test set (23 Oct 2026)

| ID | Kind | Lang | Expected | Engine | Match | Cues found |
| --- | --- | --- | --- | --- | --- | --- |
| S01 | scam | en | High risk | High risk | yes | money, identity, urgency, emotion |
| S02 | scam | en-SG | High risk | High risk | yes | money, identity, urgency |
| S03 | scam | en-SG | Check with family | Check with family | yes | identity |
| S04 | scam | en-SG | High risk | High risk | yes | money, secrecy, identity, urgency |
| S05 | scam | en | High risk | High risk | yes | money, secrecy, urgency, authority |
| S06 | scam | en | High risk | High risk | yes | money, secrecy, urgency, authority |
| S07 | scam | en | High risk | High risk | yes | money, secrecy, urgency, authority |
| S08 | scam | zh | High risk | High risk | yes | money, identity, urgency |
| S09 | scam | zh | High risk | High risk | yes | money, secrecy, urgency, authority, emotion |
| S10 | scam | ms | High risk | High risk | yes | money, secrecy, identity, urgency |
| G01 | genuine | ms | No warning signs found | No warning signs found | yes | urgency |
| G02 | genuine | en-SG | No warning signs found | No warning signs found | yes | urgency, authority |
| G03 | genuine | en | Check with family | Check with family | yes | money |
| G04 | genuine | zh | No warning signs found | No warning signs found | yes | urgency |
| G05 | genuine | en | Check with family | Check with family | yes | identity |

- Scam messages rated "High risk": **9/10** (S03 is a first-stage message with no money request, so "Check with family" is the expected result; 10/10 scams were flagged at some level).
- Genuine messages rated "High risk": **0/5**. Two genuine messages get "Check with family" (G03 mentions PayNow, G05 has a real new number), as the rules intend.
- Engine level equals the expected level on 15/15.

**Read this result with care.** The same AI assistant wrote the messages and the word lists, so 15/15 is optimistic and says little about real scams. It shows the demo works as designed, not how accurate the product would be.

## Known misses and false alarms

We tried ten new messages the engine had not seen (not added to the test set and not used to tune it). Results:

| Message (shortened) | Should be | Engine gave | Why |
| --- | --- | --- | --- |
| "Ma pls transfer 500 to this acc, I explain later" | High risk | Check with family | "acc" and a bare "500" are not matched, so only one cue is found |
| "Mum it is me, can lend me some cash? Will return Friday" | High risk | Check with family | "It is me" is not an identity-switch phrase; no urgency word |
| "Grandpa I in trouble, need u to buy Google Play cards… send me the codes" | High risk | Check with family | "in trouble" is not an urgency word |
| "妈，帮我打两千过去这个户口…" (transfer 2,000 to this account) | High risk | Check with family | "两千" without 块/元 is not read as an amount; no urgency word |
| "Its me lah, urgnt, pls p@ynow 2000 to 9123 4567" | High risk | **No warning signs found** | Misspellings and symbol swaps defeat the word lists |
| "Ma, at the hospital now with Dad, can you bring $50 cash for parking?" (genuine) | Check with family | **High risk** | Real emergency plus a real small money request: a false alarm the rules cannot avoid |
| "Pa, CPF statement came, I transfer the money into your account already" (genuine) | No warning signs found | Check with family | The rules cannot tell "I paid you" from "please pay me" |
| "I am NOT asking for money, dont worry" (genuine) | No warning signs found | Check with family | No handling of negation |

Smaller quirks: "help me" inside "can you help me transfer" counts as emotional pressure; the word "money" in "money laundering" counts as a money cue.

## Limits

- **Rules only.** The product design adds a small on-device classifier and sets thresholds on a held-out test set; this demo has neither. The poster should say so in one honest line, as the design suggests.
- **Text only.** No voice notes or screenshots (screenshot OCR is D3, Dev 2, Sprint 2 stretch). No Tamil, Hokkien or Teochew.
- **Spelling-sensitive.** Typos, symbol swaps and new slang slip through.
- **No context.** It does not know who sent the message, whether the number is saved, or earlier messages in the chat.
- **Small, self-written test set.** Not evidence of a catch rate. Do not quote these numbers as accuracy.
- **Read aloud** uses the browser's built-in voice where available (English voice only).

## For the humans to decide

- [ ] Is "Check with family" right for an innocent money mention (G03) and a genuine new number (G05), or should the rules be loosened? Loosening raises the risk of missed scams.
- [ ] Should a genuine emergency that also asks for a small sum (the $50 parking example) be "High risk"? The design's rule says yes.
- [ ] Native Mandarin and Malay speakers to review the word lists and test messages.
- [ ] Replace the invented genuine messages with consented, anonymised real ones before any numbers go on the poster.
- [ ] The page has no "Call Wei Jie" button from the design flow yet. Decide whether it belongs here (Sprint 2) or only in the clickable screens (D5).
