> Draft prepared with AI assistance for the scrum master; to be reviewed and edited by the team.

# Sprint 3 plan (Release + Pitch)

| | |
| --- | --- |
| Sprint | Sprint 3 (Release + Pitch) |
| Dates | Fri 6 Nov 2026 to the team's Week 13 pitch (pitch on **Thu 12 Nov**, decision 30) |
| Release | Poster PDF due Sun 8 Nov (owned by a teammate, decision 22); pitch in the Week 13 tutorial |
| Sprint goal | **A 10-minute investor pitch that cannot fail: tight script, failure-proof demo with a backup video, rehearsed Q&A.** |
| Board | GitHub issues, milestones "Sprint 2", "Release" and "Week 13 and after" ([all open issues](https://github.com/panda-king-0705/silverguard-ai/issues)) |

This plan was drafted on Fri 6 Nov from the [Sprint 2 plan](sprint-2-plan.md), the [decision log](decision-log.md) (rows 1–26; updated for rows 27–29 on 6 Nov), the [pitch script](../pitch/pitch-script.md), the [Q&A bank](../pitch/qa-bank.md), the [guardian alert README](../../demo/guardian-alert/README.md) and the GitHub backlog. Nothing here is agreed until the team confirms it at Sprint 3 planning (Fri 6 Nov, straight after the Sprint 2 review and retro). The AI proposed every priority, hour estimate and owner split; the product owner confirms them. The plan names roles, not people.

Decisions applied, not reopened: 22 (poster belongs to a teammate), 23 (deck built by a teammate, AI writes the brief and reviews the deck), 24 (S$8 a month per parent), 25 (seed terms open: "S$500,000 for 12 months", no equity, valuation or instrument), 26 (live alert not yet set up; mock mode and a backup video must carry the demo). The guardian persona is **Marcus**.

## What the repo can and cannot tell the AI

Every backlog issue except C4 [#27](https://github.com/panda-king-0705/silverguard-ai/issues/27) is still **open** on GitHub (checked Fri 6 Nov through the GitHub REST API). That does not mean the work is undone: nobody has closed issues during Sprint 2. So for each issue the table below says what the repo shows (a file exists, a decision row exists) and writes **"state unknown"** where only a human can say whether the "Done when" list is met. The SM should go through this table at planning and either close the issue with a link or confirm the carry-over.

## Sprint 2 issues: carried over, done or dropped

Acceptance check for this plan: every open Sprint 2 issue (milestone "Sprint 2", plus the earlier items that moved into Sprint 2 by decision 15 or the Sprint 2 plan) appears here once.

| Issue | Item | Milestone on GitHub | What the repo shows | Sprint 3 status |
| --- | --- | --- | --- | --- |
| [#10](https://github.com/panda-king-0705/silverguard-ai/issues/10) | D4 live alert, 5/5 test | Sprint 2 | Sender and `send-alert.js --times 5` built; results table in the README is empty; decision 26 says no bot exists yet | **Carried over (P0)** |
| [#13](https://github.com/panda-king-0705/silverguard-ai/issues/13) | D7 demo hardening and backup video | Sprint 2 | Combined page `demo/pitch-demo/`, runbook `demo/scam-check-web/PITCH-DEMO.md`; no video in the repo (videos may live off-repo: state unknown) | **Carried over (P0)** |
| [#21](https://github.com/panda-king-0705/silverguard-ai/issues/21) | R1 script and run sheet | Sprint 2 | `docs/pitch/pitch-script.md` drafted; price and terms being filled in by the PO's AI on 6 Nov; two speakers plus silent helpers decided (decision 29), names not yet on the cards | **Carried over (P0)**: final cut, names on the cards; deck (decision 23) tracked here |
| [#22](https://github.com/panda-king-0705/silverguard-ai/issues/22) | R2 Q&A bank | Sprint 2 | 20 AI-drafted answers in `docs/pitch/qa-bank.md`; no sign of owner rewrites | **Carried over (P0)**: owners rewrite in their own words |
| [#20](https://github.com/panda-king-0705/silverguard-ai/issues/20) | B3 risks slide | Sprint 2 | Slide text in `qa-bank.md`; the check against the delivery plan's risk register is a human step, state unknown | **Carried over (P1)**: finished as one deck slide |
| [#19](https://github.com/panda-king-0705/silverguard-ai/issues/19) | B2 market and revenue slide | Sprint 2 | `docs/pitch/market-and-revenue.md`; price set by decision 24 | **Done in the repo, pending close-out**: PO checks the S$8 line is in, then closes. Slide itself goes into the deck |
| [#24](https://github.com/panda-king-0705/silverguard-ai/issues/24) | C1 Gemini Notebook updated | Sprint 2 | Nothing in the repo (the Notebook is outside it): state unknown | **Carried over (P2)**: after Sun 8 Nov if time is short |
| [#2](https://github.com/panda-king-0705/silverguard-ai/issues/2) | P2 source library v2 review | Sprint 2 | `docs/research/source-library-v2.md` exists; human spot-check state unknown | **Carried over, narrowed (P1)**: Researcher checks only the sources behind numbers spoken in the pitch |
| [#3](https://github.com/panda-king-0705/silverguard-ai/issues/3) | P3 poster wireframe | Sprint 2 | Wireframe exists and poster v1 was built on it | **Dropped (superseded)**: poster v1 and the Canva rebuild replaced it; the poster owner closes it (decision 22) |
| [#4](https://github.com/panda-king-0705/silverguard-ai/issues/4) | P4 poster v1 | Sprint 2 | `design/poster-v1/` and a Canva rebuild handed over (decision 22) | **Done in the repo, pending close-out** by the poster owner |
| [#5](https://github.com/panda-king-0705/silverguard-ai/issues/5) | P5 poster v2 | Sprint 2 | Owned by a teammate (decision 22) | **Tracked, not planned by the AI** (see "Poster") |
| [#9](https://github.com/panda-king-0705/silverguard-ai/issues/9) | D3 screenshot OCR (stretch) | Sprint 2 | `demo/ocr-spike/SPIKE.md` only | **Dropped**: the code freeze (Thu 5 Nov) has passed and the pitch script does not use it. Say "screenshots are a product feature, not in the demo" if asked (Q3) |
| [#12](https://github.com/panda-king-0705/silverguard-ai/issues/12) | D6 drill clip | Sprint 2 | `design/drill-clip/script.md`; recording and volunteer consent state unknown | **Dropped from the pitch**: beat 8 shows Family Drill with clickable screens 4 and 5, which needs no clip. If a consented clip already exists, it may go in the backup video only |
| [#16](https://github.com/panda-king-0705/silverguard-ai/issues/16) | V3 insight synthesis | Sprint 2 | No session notes or quotes in the repo (sprint brief: none exist) | **Carried over (P1) only if V2 sessions happened**; otherwise dropped, and Q17 is answered as "not yet tested". Never invent quotes |
| [#11](https://github.com/panda-king-0705/silverguard-ai/issues/11) | D5 clickable screens (moved in: native-speaker string fixes) | Sprint 1 | Screens exist; native-speaker checks state unknown | **Done (screens) / carried over (P2, strings)**: if the zh, ms, ta checks are not done by Sat 7 Nov, present in English and say the other three are "AI draft, unchecked" |
| [#8](https://github.com/panda-king-0705/silverguard-ai/issues/8) | D2 Scam Check page | Sprint 1 | Page, engine, tests and evaluation scripts exist | **Done in the repo, pending close-out** (Dev 1) |
| [#7](https://github.com/panda-king-0705/silverguard-ai/issues/7) | D1 demo test set | Sprint 1 | `test-set.json`, `held-out-set.json` | **Done in the repo, pending close-out** (Dev 1) |
| [#18](https://github.com/panda-king-0705/silverguard-ai/issues/18) | B1 budget v2 | Sprint 1 | `docs/business/budget-v2.md`; decision 13 | **Done in the repo, pending close-out** (PO) |
| [#15](https://github.com/panda-king-0705/silverguard-ai/issues/15) | V2 grandparent sessions | Sprint 1 | Nothing in the repo (raw notes must stay private): state unknown | **Researcher to confirm**: held (then close and feed V3) or not held (then close as dropped with that reason) |
| [#14](https://github.com/panda-king-0705/silverguard-ai/issues/14) | V1 interview guide | Sprint 0 | `docs/research/interview-guide.md` | **Done in the repo, pending close-out** |
| [#1](https://github.com/panda-king-0705/silverguard-ai/issues/1) | P1 problem statement | Sprint 0 | Decision 11 | **Done, pending close-out** |
| [#17](https://github.com/panda-king-0705/silverguard-ai/issues/17) | V4 decision and AI-usage log | Release | Log has rows 1–26 | **Continues (P0)** to the pitch |
| [#23](https://github.com/panda-king-0705/silverguard-ai/issues/23) | R3 rehearsals | Release | Rehearsal kit: [rehearsal-kit.md](rehearsal-kit.md) | **Planned this sprint (P0)** |
| [#6](https://github.com/panda-king-0705/silverguard-ai/issues/6) | P6 final A3 PDF | Release | Labelled `role:sm` on GitHub, but decision 22 gives the poster to a teammate | **Tracked, not planned by the AI**. The SM's only job: confirm the upload happened on Sun 8 Nov |
| [#25](https://github.com/panda-king-0705/silverguard-ai/issues/25), [#26](https://github.com/panda-king-0705/silverguard-ai/issues/26) | C2 peer evaluation, C3 individual reflection | Week 13 and after | Not drafted, by design | **Human-only** (see below) |

**Board tidy-up for the SM (not done by the AI, which does not edit issues):** close the "done, pending close-out" issues with a link to the file; close #3, #9 and #12 with the reasons above; move #10, #13, #21, #22 to the "Release" milestone if the team wants one board for Sprint 3.

## Team roles

Members write their own names in. The AI has not assigned anyone, and does not know which teammate owns the poster or builds the deck.

| Role | Member | Sprint 3 focus |
| --- | --- | --- |
| Product owner (PO) | _to fill_ | R1 final cut and names for Speaker 1, Speaker 2 and Helpers L, P, S on the cards (decision 29), Q&A answers 9, 15, 16 (and the price and terms answers), backup-video sign-off |
| Scrum master (SM) | _to fill_ | Runs planning, rehearsals and the stopwatch; V4 log; B3 slide text into the deck; board tidy-up; confirms P6 upload |
| Dev 1 | _to fill_ | D7 offline checks on the pitch laptop, backup video, Q&A answers 1, 4, 8, 14 |
| Dev 2 | _to fill_ | #10 bot set-up and 5/5 test, Telegram Web fallback, Q&A answers 2, 3, 10, 18, 20 |
| Designer | _to fill_ | Deck (proposed; decision 23 says only "a teammate"), Q&A answers 11, 12, 19 |
| Researcher | _to fill_ | Spot-check spoken numbers (P2, narrowed), Q&A answers 5, 6, 7, 13, 17, C1 |

## Capacity

Sprint 3 is four days, two of them a weekend. The AI assumes about 8 h a person (48 h for six), planned to 80% (about 38 h). **Each person should say their real weekend availability at planning**; this is the number most likely to be wrong.

| Role | Proposed load (h) | Items (hours) |
| --- | --- | --- |
| PO | 6.25 | R1 (1.5), R2 (0.75), R3 (3), deck review follow-up (0.5), backup-video review (0.5) |
| SM | 6 | V4 (1), B3 into deck (0.5), board tidy-up (0.5), R3 incl. running the stopwatch (3), Q&A drill set-up (0.5), planning and review (0.5) |
| Dev 1 | 6.25 | D7 (2.5), R2 (0.75), R3 (3) |
| Dev 2 | 6.5 | #10 (2), mock fallback check (0.5), R2 (1), R3 (3) |
| Designer | 6.5 | Deck build (3), R2 (0.5), R3 (3) |
| Researcher | 6 | P2 spot-check (1), R2 (1), C1 (1), R3 (3) |
| **Team** | **37.5** | 78% of 48 h |

**For the team to decide at planning:**

- **Who owns the poster and who builds the deck.** If the same teammate does both, that person carries poster v2 plus 3 h of deck on the weekend the poster is due. Move the deck to someone else, or have the PO take R2 answers off them.
- **Not counted:** C2 and C3 (each person's own time, after the pitch), poster v2 and P6 (owned by a teammate, decision 22), and the zh, ms, ta string checks (optional now).
- **Cut order if over capacity:** C1 first (it can follow the pitch), then the P2 spot-check down to the four headline numbers (S$913.1 million, 14.8%, S$37,053, S$42,347). Never cut the rehearsals, the backup video or the mock fallback check.

## Sprint backlog

Priority: **P0** must, **P1** should, **P2** only if time allows. Hours are the AI's estimate of human time.

| Issue | Item | Priority | Owner role | h | Done when |
| --- | --- | --- | --- | --- | --- |
| [#10](https://github.com/panda-king-0705/silverguard-ai/issues/10) | **Live alert set-up and 5/5 test (human only, decision 26).** Create the bot with @BotFather, guardian (team demo account) presses Start, find the chat ID, run `node send-alert.js --times 5` on the pitch laptop and network | P0 | Dev 2, with Helper P (holds Marcus's phone) | 2 | `5/5 under 10 s. PASS` printed **and** all 5 messages seen on the phone; times copied into the README's results table; token only in one password manager; `node demo/guardian-alert/check-secrets.js` clean; result logged in V4. If not passed by **Sun 8 Nov, 6 pm**, the pitch runs on mock (below) and nobody retries on the day |
| [#10](https://github.com/panda-king-0705/silverguard-ai/issues/10) | **Mock fallback** (always needed) | P0 | Dev 2 | 0.5 | `demo/pitch-demo/index.html` opened from disk with Wi-Fi off shows the blue "MOCK MODE: nothing is sent" banner and the alert in "What Marcus receives"; Speaker 2 has said the mock line aloud in a rehearsal and Helper L has switched Mock mode on in one |
| [#13](https://github.com/panda-king-0705/silverguard-ai/issues/13) | **D7 hardening and backup video review** | P0 | Dev 1; PO reviews the video | 2.5 + 0.5 | Offline checklist in `PITCH-DEMO.md` section 2 ticked on the pitch laptop; final `node build.js --check` and `node --test` pass in `demo/pitch-demo`; backup video of 90 s or less, captions burned in, no token, no real number or name, accuracy line in decision 20's words; copies on laptop, USB stick and phone; the PO has watched it and signed it off |
| [#21](https://github.com/panda-king-0705/silverguard-ai/issues/21) | **R1 final script cut; names on the cue cards** | P0 | PO; whole team agrees the names | 1.5 | Script says S$8 a month per parent (beat 12) and "S$500,000 for 12 months" with no equity, valuation or instrument (beat 13); names filled in for Speaker 1, Speaker 2 and Helpers L, P and S on the cards (decision 29); first timed run is 9:00–9:45; cut order agreed; cue cards printed (see [rehearsal-kit.md](rehearsal-kit.md)) |
| [#21](https://github.com/panda-king-0705/silverguard-ai/issues/21) | **Deck built by a teammate, then AI review** (decision 23) | P0 | Designer (proposed); PO acts on the review | 3 + 0.5 | Deck follows `docs/pitch/deck-brief.md` (now in the repo); uploaded by **Sat 7 Nov, noon** so the AI can review it against the brief; every number matches the script; no third-party logos or brand UI; exported as PDF as a fallback |
| [#22](https://github.com/panda-king-0705/silverguard-ai/issues/22) | **R2 Q&A: owners rewrite answers in their own words** | P0 | Every owner role in `qa-bank.md` | 4 total | Each owner has rewritten each of their answers (not just read the AI's), kept every number and "Careful" line, and answered it aloud in 30 s in the drill. New answers for price (S$8, pilot uses vouchers so it does not test price, decision 24) and terms (open, decision 25; PO to approve the wording) are in the bank |
| [#23](https://github.com/panda-king-0705/silverguard-ai/issues/23) | **R3 rehearsals** | P0 | Everyone; SM runs the stopwatch | 3 each | At least **two full timed run-throughs** with the deck and the demo, plus **one run with a mock-investor Q&A** (two drill rounds, see the kit); one run uses the fallback ladder on purpose; times recorded on the stopwatch sheet; final run between 9:00 and 9:45 |
| [#17](https://github.com/panda-king-0705/silverguard-ai/issues/17) | **V4 log rows for every AI draft this sprint** | P0 | SM | 1 | One row each for this plan, the rehearsal kit and cue cards, the deck brief and AI deck review, the price and terms script changes, and any other Sprint 3 AI draft; each says what the humans changed; overrides in the "Overrides" table; screenshot evidence saved |
| [#20](https://github.com/panda-king-0705/silverguard-ai/issues/20) | B3 risks slide into the deck | P1 | SM | 0.5 | Three risks chosen; compared with the delivery plan's risk register by a human; on the deck |
| [#2](https://github.com/panda-king-0705/silverguard-ai/issues/2) | P2 spot-check of spoken numbers | P1 | Researcher | 1 | Every number in the script's "Numbers and sources" table opened at its source or marked "needs verification"; the "about 80%" and "73%" figures stay unspoken unless checked |
| [#16](https://github.com/panda-king-0705/silverguard-ai/issues/16) | V3 synthesis, only if V2 happened | P1 | Researcher, PO | 1 | Q17 answer updated with approved, anonymised findings; otherwise issue closed as dropped |
| [#11](https://github.com/panda-king-0705/silverguard-ai/issues/11) | Native-speaker string checks | P2 | Three reviewers | not counted | zh, ms, ta screens checked, or labelled "AI draft, unchecked" |
| [#24](https://github.com/panda-king-0705/silverguard-ai/issues/24) | C1 Gemini Notebook | P2 | Researcher | 1 | Notebook has the final script, Q&A bank and poster |

**Poster (tracked, not planned by the AI, decision 22).** P5 [#5](https://github.com/panda-king-0705/silverguard-ai/issues/5) and P6 [#6](https://github.com/panda-king-0705/silverguard-ai/issues/6) belong to the poster owner. The SM only asks at each stand-up "is the poster on track for Sun 8 Nov?" and checks the upload. If the poster changes a number, the script and deck must change to match.

**C2 and C3: human only.** Peer evaluation [#25](https://github.com/panda-king-0705/silverguard-ai/issues/25) and individual reflection [#26](https://github.com/panda-king-0705/silverguard-ai/issues/26) are written by each person, never drafted, outlined, edited or "polished" by AI. The decision log and the retro notes are evidence each person may cite.

## Human-only list

The AI cannot and must not do these:

- Create the Telegram bot, hold the token, run the 5/5 live test, log in to Telegram Web on the laptop (decision 26).
- Ask the instructor for phone approval if still wanted, and confirm the pitch slot.
- Record or approve the backup video; sign off that it contains no token, number or real name.
- Build the deck and the poster (decisions 22, 23).
- Fill in names for Speaker 1, Speaker 2 and Helpers L, P and S on the cue cards (decision 29), rewrite Q&A answers in their own words, rehearse, and present.
- Approve the seed-terms answer wording (decision 25) and the price answer (decision 24).
- Close issues; add V4 rows and screenshots.
- Write C2 peer evaluation and C3 individual reflection.
- Supply any grandparent quote (none in the repo; keep "[quote needed]").

## Risks

| Risk | Likelihood | Impact | Mitigation | Owner |
| --- | --- | --- | --- | --- |
| Live alert never set up, or fails 5/5 | High (decision 26: no bot yet) | Medium now (mock exists) | Go or no-go at Wed 11 Nov, 6 pm; mock mode rehearsed as the default; fallback ladder in the rehearsal kit; say "this is the recorded run" if the video is used | Dev 2 |
| Backup video not checked on the pitch laptop | Medium | High (the last rung of the ladder) | Already recorded: `demo/pitch-demo/backup-video.mp4` (83 s); team watches it on the pitch laptop and signs off by Wed 11 Nov | Dev 1, PO |
| Script, deck and poster disagree on a number (price, S$500,000, the four headline figures) | Medium | High (investors notice) | One source: the script's "Numbers and sources" table; cue cards print the exact numbers; AI deck review checks them; the poster owner flags any change | PO |
| Seed-terms or price questions answered off the cuff (equity %, valuation, "will people pay S$8?") | High | Medium | Q&A drill fires these at the PO first; answer stays on decisions 24 and 25: terms agreed with the lead investor after the pilot plan is reviewed; the pilot uses vouchers so it does not test price | PO |
| Pitch runs over 10 minutes | Medium | High | Stopwatch sheet per beat; agreed cut order; run 2 must finish by 9:45 | SM |
| Bot token shown on the projector or committed | Low | High | Type the token before the audience arrives; never on a slide or in a video; `check-secrets.js` before every commit; revoke at once if seen | Dev 2 |
| Weekend availability lower than planned | Medium | Medium | Confirm hours at planning; rehearsal times fixed on Fri; cut C1 first | SM |
| AI drafts presented without real ownership (Q&A answers read out as written) | Medium | High (graded process) | Owners rewrite answers; V4 rows for every Sprint 3 AI draft; overrides logged | SM |
| Six days between rehearsal 1 and the pitch: the team loses momentum | Medium | Low | Rehearsals spread over Sat–Wed; dress rehearsal the day before | SM |

## Definition of Done

Same as Sprint 2, with three pitch items added. An item is done when:

1. Every box in its "Done when" above (and in the issue) is ticked.
2. A teammate who did not make it has reviewed it. For an AI draft, the reviewer has read all of it and edited it.
3. Each fact, number or quote has a source link or is marked "needs verification" or "needs quote". No invented quotes.
4. No secrets and no personal data.
5. Demo pages work offline from one file; only the live alert needs the network; no third-party logos or brand UI.
6. AI help is logged in [decision-log.md](decision-log.md) with what the team changed.
7. The issue is closed with a link to the file or evidence.
8. **Pitch items:** the numbers match the script (S$8 a month per parent; "S$500,000 for 12 months", no equity, valuation or instrument; "15 out of 15 on a test set we wrote ourselves; real-world accuracy not yet measured").
9. **Demo items:** proven on the pitch laptop with Wi-Fi off, and the fallback has been used once in rehearsal.
10. **Rehearsal:** at least two full timed runs and one Q&A run are recorded on the stopwatch sheet.

## Key dates

| Date | Event |
| --- | --- |
| Fri 6 Nov | Sprint 2 review and retro, then Sprint 3 planning (30 min): names for Speaker 1, Speaker 2 and Helpers L, P, S on the cards (decision 29), poster and deck owners, weekend hours, board tidy-up. Dev 2 starts the bot set-up. Q&A owners start rewriting |
| Sat 7 Nov | **Rehearsal 1** (full timed run, scripts allowed). Deck uploaded for AI review by the evening. Bot set-up and the 5/5 test (button and, on the Android senior phone, the automatic alert from decision 27) |
| Sun 8 Nov | **Poster PDF due** (poster owner submits; SM confirms the upload). Rehearsal 2: full timed run with deck and demo, no scripts, one planned fallback; Q&A drill round 1 |
| Mon 9 – Tue 10 Nov | Deck fixes from the AI review. Rehearsal 3: full run plus mock-investor Q&A (drill round 2). Test the automatic alert again on the network you will use on the day |
| Wed 11 Nov | **Dress rehearsal** on the pitch laptop and, if possible, the room's projector. **6 pm: live-alert go or no-go** (automatic real call, button, or mock + backup video). Backup video copied to three places |
| **Thu 12 Nov** | **Pitch** (Week 13 tutorial, decision 30). Pre-flight checklist 30 min before; pitch; post-pitch retro the same day (questions in the rehearsal kit) |
| After the pitch | C2 peer evaluation and C3 individual reflection (each human writes their own); close the remaining issues; final V4 rows |

The rehearsal kit (stopwatch sheet, pre-flight checklist, fallback decision tree, Q&A drill, retro questions) is in [rehearsal-kit.md](rehearsal-kit.md), and printable cue cards are in [cue-cards/](cue-cards/). Stand-up and retro formats are in [standup-and-retro.md](standup-and-retro.md).
