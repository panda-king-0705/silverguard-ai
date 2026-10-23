> Draft prepared with AI assistance for the Dev 1 role; to be reviewed and edited by the team.

# Scam Check web demo (backlog D1 and D2)

A paste-text Scam Check page for the Week 13 pitch. It runs a simplified, rules-only version of the Scam Check engine in [`docs/prototype-design.md`](../../docs/prototype-design.md): it looks for the scam *script* (money, secrecy, a new number, urgency, authority, emotional pressure), not the voice, and gives one of three levels: **High risk**, **Check with family** or **No warning signs found**. It never says "safe".

## How to run

- **The page:** open `index.html` in any browser (double-click it). It is one file with no external resources, so it works offline, including on a phone.
- **The tests:** in this folder, run `node --test` (Node 18 or later; checked with Node 22).
- **The results tables:** `node evaluate.js` for the 15-message test set and `node evaluate-heldout.js` for the 12-message held-out set (both accept `--markdown`).
- **After editing `engine.js`:** run `node sync-page.js` to copy the engine into `index.html`. A test fails if the two differ.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page: paste a message, see the level with an icon and words, the reasons, the phrases noticed and the reminder. Has a disabled "Alert my guardian" button (Sprint 2, Dev 2) |
| `engine.js` | Pure functions, browser and Node: `detectCues(text)` returns the cue families found with matched phrases; `assess(text)` returns `{ level, reasons, cues, ignored, reminder }`; `normaliseForMatching(text)` shows the text after clean-up |
| `engine.test.js` | `node:test` tests (30): the acceptance checks on the test set, unit tests per cue family in English, Singlish, Mandarin and Malay, the risk combiner, the clean-up, negation and bare-amount rules, the held-out set, and that the page embeds the current engine |
| `evaluate.js`, `evaluate-heldout.js` | Print the results tables below (test set; held-out set) |
| `sync-page.js` | Copies `engine.js` into `index.html` |
| `test-set.json`, `test-set.md` | 10 scam and 5 genuine messages, with sources and how they were built |
| `held-out-set.json` | 8 scam and 4 genuine messages written before the DEV1-3 fixes (see "Held-out set" below) |
| `PITCH-DEMO.md` | 60-second pitch demo script, offline checklist and backup-video shot list (DEV1-4) |

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

The word lists are general patterns. Nothing is special-cased for the test-set or held-out sentences.

### General techniques added in DEV1-3 (23 Oct 2026)

| Technique | What it does | What it deliberately does not do |
| --- | --- | --- |
| Text clean-up | Before matching, swaps inside words are undone (`p@ynow`, `tr4nsfer`, `Googl3 Pl@y c@rds`), three or more repeated letters shrink to one (`pleaseee`), and a short shorthand map expands whole words (`pls`, `u`, `acc`/`acct`, `tmr`, `fren`, `urgnt`) | Leaves amounts and times alone (`RM5k`, `3k`, `10pm`). Does not fix random typos: only listed shorthand and swaps. "bro", "sis", "lah" are not cues |
| Negation window | A money, urgency or emotion cue is ignored only when a negation word is followed by at most four light words ("asking", "for", "any", "you", "to"...) and then the cue, with no comma or other word between. "I'm NOT asking for money" cancels "money" | "I'm not able to talk, transfer $500 now" and "Not asking for myself, send 3k" still count. Secrecy and identity cues are never cancelled (they already contain "don't" and "can't"). Ignored phrases are returned in `ignored`, not hidden |
| Bare amounts near money verbs | English and Malay: pay, send, give, lend, bank in, top up, bayar, hantar... plus up to three words plus a 3 to 6 digit number. Mandarin: 转, 汇, 借, 给, 要... plus a number with 百, 千 or 万 (转两万, 借我五千), or 转/汇/借 plus 3 or more digits | Counts and times are not money (六口, 十二点, 三百年, 打110, "pay 2 people", "2000 hrs") |
| Plain money phrases | "to this account", "account" plus a long number, "bank in", 保释 (bail), 赎金 (ransom) | A bare "account" is not a money request |

Matched phrases shown on the page come from the cleaned text, so a message with `tr4nsfer` shows "transfer".

## Results on the test set (23 Oct 2026, after DEV1-3)

The 15-message test set gives the same table before and after the DEV1-3 changes (every row, every cue family identical):

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
- Engine level equals the expected level on **15/15, before and after**.

**Read this result with care.** The same AI assistant wrote the messages and the word lists, so 15/15 is optimistic and says little about real scams. It shows the demo works as designed, not how accurate the product would be.

## Held-out set (DEV1-3, 23 Oct 2026)

`held-out-set.json` has 12 new messages (8 scam, 4 genuine), written by the AI assistant **before** any engine change. The aim was to see how the engine copes with typos and symbol swaps, shorthand, negation, Mandarin amounts without 块/元 and the known parking false alarm. The results were recorded first, then the engine was changed with general techniques only (table above).

| | Before the changes | After the changes |
| --- | --- | --- |
| Scams rated "High risk" | 3/8 (6/8 flagged at any level) | **8/8** |
| Genuine messages rated "High risk" | 2/4 (H09 negation, H10 parking) | **1/4** (H10 parking, kept on purpose) |
| Engine level equals expected level | 5/12 | **11/12** |

After the changes:

| ID | Kind | Lang | Expected | Engine | Match | Cues found |
| --- | --- | --- | --- | --- | --- | --- |
| H01 | scam | en | High risk | High risk | yes | money, urgency |
| H02 | scam | en-SG | High risk | High risk | yes | money, identity, emotion |
| H03 | scam | zh | High risk | High risk | yes | money, secrecy, identity, urgency |
| H04 | scam | zh | High risk | High risk | yes | money, secrecy, authority |
| H05 | scam | en | High risk | High risk | yes | money, urgency, authority |
| H06 | scam | ms | High risk | High risk | yes | money, secrecy, identity, urgency |
| H07 | scam | en-SG | High risk | High risk | yes | money, secrecy, identity, urgency |
| H08 | scam | en-SG | High risk | High risk | yes | money, identity, urgency |
| H09 | genuine | en | No warning signs found | No warning signs found | yes | urgency |
| H10 | genuine | en | Check with family | High risk | **no** | money, urgency |
| H11 | genuine | zh | No warning signs found | No warning signs found | yes | - |
| H12 | genuine | en-SG | No warning signs found | No warning signs found | yes | - |

How to read this honestly:

- **It is no longer a held-out set.** The messages were unseen when the "before" numbers were taken. But the same AI assistant then read the failures and designed the fixes with those failure types in mind, so the "after" numbers are a fix-up check, **not** an unbiased accuracy figure. Do not quote 11/12 or 8/8 as accuracy. The honest "before" figure (5/12; 3 of 8 scams at High risk) shows how fragile the first version was.
- One message (H07, gift cards with `Googl3 Pl@y c@rds`) was already caught before, partly by luck (the `$100` amount and "Dun tell"), and now also through the cleaned-up words. H06 (Malay) and H08 were caught before and after.
- **To get a fair "after" number,** a teammate who has not read the engine should write 12 fresh messages (ideally from real SPF/ScamShield examples or consented family messages) and run `node evaluate-heldout.js` on them without changing the engine first. Owner: Dev 1 (writing the messages is better done by someone else).

## Known misses and false alarms (after DEV1-3)

Eight earlier test messages (listed in the first version of this README, shortened here) were re-run. These were seen while building the fixes, so they are known misses, not a fresh test.

| Message (shortened) | Should be | Engine now gives | Status |
| --- | --- | --- | --- |
| "Its me lah, urgnt, pls p@ynow 2000 to 9123 4567" | High risk | High risk | Fixed (clean-up: `urgnt`, `p@ynow`, `pls`) |
| "I am NOT asking for money, dont worry" (genuine) | No warning signs found | No warning signs found | Fixed (negation window) |
| "Ma pls transfer 500 to this acc, I explain later" | High risk | Check with family | Still missed: money is found, but nothing else in the message is a cue |
| "Mum it is me, can lend me some cash? Will return Friday" | High risk | Check with family | Still missed: "it is me" is not an identity-switch phrase; no urgency word |
| "Grandpa I in trouble, need u to buy Google Play cards… send me the codes" | High risk | Check with family | Still missed: "in trouble" is not an urgency word (the gift-card request is found) |
| "妈，帮我打两千过去这个户口…" (transfer 2,000 to this account) | High risk | Check with family if there is no urgency word | Partly fixed: "打两千" is now read as an amount, but a second cue is still needed for High risk |
| "Ma, at the hospital now with Dad, can you bring $50 cash for parking?" (genuine) | Check with family | **High risk** | Kept on purpose, **team decision** (below) |
| "Pa, CPF statement came, I transfer the money into your account already" (genuine) | No warning signs found | Check with family | Still wrong: the rules cannot tell "I paid you" from "please pay me" |

Other remaining misses and quirks:

- A single typo that is not a listed swap or shorthand ("transferr", "urgnet") is not matched. A fuzzy matcher could help but would add false matches; not attempted.
- "Money request alone is only Check with family" means a short, calm message such as "pls transfer 500 to this acc" never reaches High risk. That is the design rule; the team may want it reviewed.
- "help me" inside "can you help me transfer" counts as emotional pressure; the word "money" in "money laundering" counts as a money cue (the second is harmless because the same message usually has authority cues too).
- The negation window is English, Mandarin and Malay only, and only for money, urgency and emotion cues. "Didn't ask you to transfer" (no "I") is wrongly cancelled; this should be rare.
- Bare Chinese amounts need 百, 千 or 万 ("转五十" is not read as money). 打 plus plain digits is not read as money (it would catch "打110").

## Hospital parking: how the false alarm is handled (team decision)

**What happens now.** "Dad is stable, I am at the hospital, can you bring $50 cash for the car park?" is **High risk**, because the design rule says a money request plus any other High or Medium cue (here: urgency from "hospital") is High risk. It is a real family message, so this is a false alarm. DEV1-3 did **not** change the rule. The held-out file marks H10 as expected "Check with family" and the engine still gives High risk; the tests state this on purpose.

**Why it is not simply fixed.** Real scams also ask for small sums (gift-card scams ask for several $100 cards; a first "loan" can be $50), and a scam message can also mention a hospital. A rule that lowers risk for small amounts or hospital words would let scams through.

**Options for the team (pick one; none is applied):**

| Option | What changes | Cost |
| --- | --- | --- |
| A. Keep the rule (recommended for the demo) | Nothing. A false alarm costs one phone call to family, which the reminder already asks for. Say so in the pitch: "we would rather ask you to call than miss a scam" | Genuine hospital messages that ask for money will always say High risk |
| B. Small-amount carve-out | Amount under about S$100 and no secrecy, identity or authority cue gives "Check with family" | Lets small first-stage scam requests and gift-card scams through; the S$100 limit is a guess with no evidence behind it |
| C. Use context (product, not this demo) | If the message comes from a saved contact and the only High cue is money, show "Check with family". The page cannot do this: it does not know who sent the message | Needs the real app and its contact list; a hacked or cloned contact would be under-warned |
| D. Reword, do not re-grade | Keep the level, but add a plain line when the only strong cue is urgency from "hospital": "If this is a real hospital visit, call family on a saved number to confirm" | Wording only; the risk word still scares |

Suggested owner: Product owner decides A to D with Dev 1; the decision goes in `docs/process/decision-log.md`.

## Limits

- **Rules only.** The product design adds a small on-device classifier and sets thresholds on a held-out test set; this demo has neither. The poster should say so in one honest line, as the design suggests.
- **Text only.** No voice notes or screenshots (screenshot OCR is D3, Dev 2, Sprint 2 stretch). No Tamil, Hokkien or Teochew.
- **Spelling-sensitive.** Common symbol swaps and shorthand are handled; other typos and new slang still slip through.
- **No context.** It does not know who sent the message, whether the number is saved, or earlier messages in the chat.
- **Small, self-written test sets.** The 15-message set and the 12-message held-out set were both written by the AI assistant. They are not evidence of a catch rate. For the pitch, quote only: "15/15 on a 15-message test set our team wrote with AI assistance; real-world accuracy not yet measured" (decision 20).
- **Read aloud** uses the browser's built-in voice where available (English voice only).

## For the humans to decide

- [ ] Is "Check with family" right for an innocent money mention (G03) and a genuine new number (G05), or should the rules be loosened? Loosening raises the risk of missed scams.
- [ ] Should a genuine emergency that also asks for a small sum (the $50 parking example) be "High risk"? The design's rule says yes. See options A to D under "Hospital parking" (team decision).
- [ ] Someone who has not read the engine writes 12 fresh messages for an honest second held-out run (the current held-out set was used to guide fixes).
- [ ] Native Mandarin and Malay speakers to check the new amount rules (转两万, 借我五千, 保释) and the negation words.
- [ ] Native Mandarin and Malay speakers to review the word lists and test messages.
- [ ] Replace the invented genuine messages with consented, anonymised real ones before any numbers go on the poster.
- [ ] The page has no "Call Wei Jie" button from the design flow yet. Decide whether it belongs here (Sprint 2) or only in the clickable screens (D5).
