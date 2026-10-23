> Draft prepared with AI assistance for the scrum master; to be reviewed and edited by the team.

# Sprint 2 plan

| | |
| --- | --- |
| Sprint | Sprint 2 |
| Dates | Mon 2 – Fri 6 Nov 2026 (code freeze Thu 5 Nov) |
| Release | Sat 7 – Sun 8 Nov 2026 (poster PDF due Sun 8 Nov, before the Week 13 tutorial) |
| Sprint goal | **A finished poster, a demo that cannot fail on the day, and a team that can answer investors' questions.** |
| Board | GitHub issues, milestone "Sprint 2" ([list](https://github.com/panda-king-0705/silverguard-ai/issues?q=is%3Aissue+milestone%3A%22Sprint+2%22)) |

This plan was drafted early, on Fri 23 Oct (Sprint 0), from the Sprint 1 plan, the decision log (rows 11–21) and the GitHub backlog. Nothing here is agreed until the team confirms it at sprint planning on Mon 2 Nov. The AI proposed every priority, hour estimate and owner split below, and the product owner confirms them. Roles are not yet assigned to people, so the plan names roles only.

## What the AI has already drafted

Most Sprint 2 documents already have an AI first draft. **For these items the human time is review, correction and ownership, not writing.** That is why the hours below are lower than the issue sizes. The estimates are the AI's guess and have not been tested; each owner should say at planning whether they are realistic.

| Item | Early AI draft | Where to find it | What the humans still do |
| --- | --- | --- | --- |
| R1 [#21](https://github.com/panda-king-0705/silverguard-ai/issues/21) pitch script | Drafted | Path to confirm when merged (not in the repo when this plan was written) | Cut to 10 minutes with 2–3 on the problem, assign Speakers A–F, make cue cards, rehearse |
| B2 [#19](https://github.com/panda-king-0705/silverguard-ai/issues/19) market and revenue slide | Drafted | Path to confirm when merged | Check every figure against its source; decide the pricing wording |
| R2 [#22](https://github.com/panda-king-0705/silverguard-ai/issues/22) Q&A bank | Drafted: 20 questions | [docs/pitch/qa-bank.md](../pitch/qa-bank.md) | Each owner rewrites their answers in their own words and rehearses them |
| B3 [#20](https://github.com/panda-king-0705/silverguard-ai/issues/20) risks slide | Drafted | Same file, section "Risks slide" | Check against the delivery plan's risk register, which is not in the repo |
| P4 [#4](https://github.com/panda-king-0705/silverguard-ai/issues/4) poster v1 | Drafted | Path to confirm when merged | Lay out, fit about 276 words, cite every figure, add the honest demo line |
| D6 [#12](https://github.com/panda-king-0705/silverguard-ai/issues/12) drill script | Script drafted | Path to confirm when merged | Review the 60-second script, record the volunteer's consent, record the clip |
| D7 [#13](https://github.com/panda-king-0705/silverguard-ai/issues/13) and D2 fixes | Demo fixes drafted (unseen-message misses, a held-out set) | `demo/scam-check-web/` (a held-out set and evaluation script have appeared; check they are part of this work) | Review the code changes, re-run the tests, record the 90-second backup video |
| Combined pitch demo | Drafted | `demo/pitch-demo/` (Scam Check page plus the alert button in one page) | Run it on the pitch laptop, offline, and on the pitch network for the alert |

Not drafted by AI, by design: **C2 peer evaluation and C3 individual reflection** (each human writes their own). V2 grandparent sessions and V3 synthesis need real people's words, so the AI cannot draft V3. The live alert test needs a human with a bot token.

## Team roles

Members write their own names in at planning. The AI has not assigned anyone.

| Role | Member | Sprint 2 focus |
| --- | --- | --- |
| Product owner (PO) | _to fill_ | P4 copy and figures, P5 edits, B2 market slide, R1 script, V3 |
| Scrum master (SM) | _to fill_ | B3 risks slide, R2 Q&A bank, D6 volunteer and consent, V4 log, runs ceremonies and Release (P6) |
| Dev 1 | _to fill_ | D7 hardening and backup video, D2 unseen-message fixes |
| Dev 2 | _to fill_ | #10 live alert test, D5 string fixes, C1 uploads; D3 only if time allows |
| Designer | _to fill_ | P3 review, P4 and P5 poster layout |
| Researcher | _to fill_ | P2 review, V3 synthesis, C1 Notebook |

## Capacity

Six people at about 8 h a week gives 48 h. We plan to about 80% (about 38 h). The other 20% covers stand-ups, planning, review, retro and surprises. The proposed split below tries to keep every role at or under 6.5 h.

| Role | Available (h) | Planned at 80% (h) | Proposed load (h) | Items (hours) |
| --- | --- | --- | --- | --- |
| PO | 8 | 6.4 | 6 | P4 (1), P5 (1), V3 (1), B2 (1), R1 (2) |
| SM | 8 | 6.4 | 6 | P4 (1), P5 (1), D6 (1), B3 (1), R2 (1), V4 (1) |
| Dev 1 | 8 | 6.4 | 5.5 | D2 fixes (2), D7 (2), P5 (0.5), D6 (0.5), R2 (0.5) |
| Dev 2 | 8 | 6.4 | 6.5 | #10 live test (2), D5 string fixes (2), D6 (1), C1 (1), R2 (0.5) |
| Designer | 8 | 6.4 | 6.5 | P3 review (2), P4 (2), P5 (1.5), D6 (0.5), R2 (0.5) |
| Researcher | 8 | 6.4 | 6.5 | P2 review (4), V3 (1), C1 (1), R2 (0.5) |
| Native-speaker checks | – | – | 3 | 3 members who speak Mandarin, Malay and Tamil, about 1 h each (not yet named) |
| **Team** | **48** | **38.4** | **40** | 83% of 48 h |

**For the team to decide at planning:**

- **The total is 1.6 h over the 80% line.** The three native-speaker hours fall on three people not yet known, so they will push those people above 6.5 h. If PO or SM are the reviewers, they reach about 7 h. Options if the team wants to cut: R2 from 3 h to 2 h, P4 review time if the AI poster draft turns out clean, or the D6 clip polish. Do not cut V3 or the live alert test.
- **The poster stream is Designer-heavy** in the issues (P3, P4, P5, D6 and D5 fixes all name the Designer, which would be about 14 h). The split above moves copy, citations and outsider testing to PO and SM, string edits to Dev 2, and clip wiring to Dev 2 and Dev 1. The Designer must agree to this.
- **D3 screenshot OCR (stretch, 4 h) is not counted.** Start it only if the live alert test passes on Mon 2 or Tue 3 Nov and Dev 2 has real time left. Decide by Tue 3 Nov end of day; otherwise drop it so it does not threaten the freeze. Anyone building it keeps the Thu 5 Nov code freeze.
- **Real availability this week is not known yet.** Each person should say theirs at planning.

### Moved in from Sprint 1 (decision 15, 23 Oct)

Roles are not assigned, so the Sprint 1 overflow (12 h) moved here. The hours below are what the AI proposes now that drafts exist.

| Moved item | Issue | Decision 15 hours | Proposed hours | Note |
| --- | --- | --- | --- | --- |
| P2 Source library v2 review | [#2](https://github.com/panda-king-0705/silverguard-ai/issues/2) | 4 | 4 | Review the AI's source library and spot-check at least the five sources the poster will quote |
| P3 Poster wireframe review | [#3](https://github.com/panda-king-0705/silverguard-ai/issues/3) | 2 | 2 | Feeds P4; do it first |
| D2 fixes for unseen messages (typos, "acc", negation), inside D7 | [#13](https://github.com/panda-king-0705/silverguard-ai/issues/13) | 4 | 2 | The AI has drafted fixes; humans review and re-test. Back to 4 h if the review finds problems |
| D5 non-English string fixes after the native-speaker check, inside D5 | [#11](https://github.com/panda-king-0705/silverguard-ai/issues/11) | 2 | 2 | Comes after the native-speaker checks below |

## Sprint backlog

Priority: **P0** must, **P1** should, **P2** stretch. Size is the issue's own estimate (S ≈ 2 h, M ≈ 4 h, L ≈ 8 h). "Proposed h" is the AI's estimate of human time with the early AI draft in hand.

| Issue | Item | Priority | Issue size | Proposed h | Owner | Depends on |
| --- | --- | --- | --- | --- | --- | --- |
| [#10](https://github.com/panda-king-0705/silverguard-ai/issues/10) | **Live alert test, 5 of 5 within 10 s** (D4; decision 19; needs-human: bot token) | P0 | M (4, built in Sprint 1) | 2 | Dev 2 | D4 built; the instructor's approval for a real phone |
| [#13](https://github.com/panda-king-0705/silverguard-ai/issues/13) | D7 Demo hardening and backup video, with the D2 fixes | P0 | S (2) + 4 | 2 + 2 | Dev 1 | #8, #10, #11, #12; #9 only if built |
| [#4](https://github.com/panda-king-0705/silverguard-ai/issues/4) | P4 Poster v1 with real content | P0 | L (8) | 4 | Designer, PO | #1, #2, #3, #18, #11 |
| [#5](https://github.com/panda-king-0705/silverguard-ai/issues/5) | P5 Poster v2 after feedback | P0 | M (4) | 4 | Designer | #4; Week 12 tutorial feedback |
| [#21](https://github.com/panda-king-0705/silverguard-ai/issues/21) | R1 Script and run sheet | P0 | M (4) | 2 | PO | #4, #19, #20 (soft) |
| [#22](https://github.com/panda-king-0705/silverguard-ai/issues/22) | R2 Q&A bank | P0 | M (4) | 3 | Everyone | — |
| [#2](https://github.com/panda-king-0705/silverguard-ai/issues/2) | P2 Source library v2 review (moved in) | P1 | M (4) | 4 | Researcher | — |
| [#3](https://github.com/panda-king-0705/silverguard-ai/issues/3) | P3 Poster wireframe review (moved in) | P1 | S (2) | 2 | Designer | #1 (soft) |
| [#11](https://github.com/panda-king-0705/silverguard-ai/issues/11) | D5 string fixes after native-speaker checks (moved in) | P1 | S (2) | 2 | Designer owns; Dev 2 applies | Native-speaker checks |
| — | **Native-speaker checks** for Mandarin, Malay, Tamil text (decision 18) | P1 | — | 3 | Three reviewers, to be named at kickoff | Strings in `design/clickable-screens` and `demo/scam-check-web/test-set.json` |
| [#12](https://github.com/panda-king-0705/silverguard-ai/issues/12) | D6 Drill clip | P1 | M (4) | 3 | Designer, with one voice volunteer | #11 |
| [#16](https://github.com/panda-king-0705/silverguard-ai/issues/16) | V3 Insight synthesis | P1 | S (2) | 2 | Researcher, PO | #15 V2 sessions |
| [#19](https://github.com/panda-king-0705/silverguard-ai/issues/19) | B2 Market and revenue slide | P1 | S (2) | 1 | PO | #18, #2 (soft) |
| [#20](https://github.com/panda-king-0705/silverguard-ai/issues/20) | B3 Risks slide | P1 | S (2) | 1 | SM | The delivery plan's risk register |
| [#24](https://github.com/panda-king-0705/silverguard-ai/issues/24) | C1 Gemini Notebook updated | P1 | S (2) | 2 | Researcher | #2 |
| [#17](https://github.com/panda-king-0705/silverguard-ai/issues/17) | V4 Decision and AI-usage log (runs to Release) | P1 | about 1 h | 1 | SM | — |
| [#9](https://github.com/panda-king-0705/silverguard-ai/issues/9) | D3 Screenshot OCR, only if the live test passes early | P2 | M (4), not counted | 0 | Dev 2 | #8 |

Sprint 2 total: 40 h proposed (37 h of items, including V4, plus 3 h of native-speaker checks). Each issue's "Done when" checklist is its acceptance test.

**Notes on specific items**

- **#10 live alert test.** The issue says "5 of 5 tries within 10 s", and the test procedure and results table are in [demo/guardian-alert/README.md](../../demo/guardian-alert/README.md). Run it on the network the pitch will use. The README lists two things still to verify: whether a page opened from disk can call Telegram from the browser (if not, send from a small Node script), and the exact `sendMessage` parameters. The board shows #10 under "Sprint 1" while decision 19 puts the test in Sprint 2; the PO or SM can fix the milestone, because the AI does not edit issues. If the instructor has not approved a real phone by Wed 4 Nov, use Telegram Web on the laptop (decision 19) and say so in the pitch.
- **#13 D7.** "Runs without venue Wi-Fi except the alert" means the combined pitch demo must be tested with Wi-Fi off, in mock mode. Save the 90-second backup recording before the freeze on Thu 5 Nov.
- **#4 P4 and #5 P5.** The poster is about 276 words at 20pt body text (decision 12). The headline is "Scams cost Singapore S$913.1 million in 2025" (decision 11). The poster must carry one honest line: the demo uses a simplified rules engine and the product runs a trained model on the phone. P5 cannot start until the Week 12 tutorial feedback exists. **The date of the Week 12 tutorial is not in the repo: the team should confirm it at planning.**
- **#21 R1.** Ten minutes with 2–3 on the problem, a speaker for every beat (Speaker A–F) and cue cards, no phones.
- **#22 R2.** The [Q&A bank](../pitch/qa-bank.md) has 20 questions, each with a 30-second answer and an owner role. Reassign owners at planning.
- **#16 V3.** V2 sessions run in Sprint 1 (28–31 Oct). Only anonymised, approved quotes may go in the repo (Definition of Done, item 4).
- **Investor answers fixed by decisions.** Seed ask S$500,000 (decision 13). Accuracy is quoted as "15/15 on a 15-message test set the team wrote itself; real-world accuracy not yet measured" (decision 20). The "isn't the problem shrinking?" answer is "fewer cases, bigger losses" (decision 21). Never say SPF links voice cloning to its figures.

**Sprint 1 items that must be finished before Sprint 2 starts (due Sun 1 Nov):** [#8](https://github.com/panda-king-0705/silverguard-ai/issues/8) D2, [#10](https://github.com/panda-king-0705/silverguard-ai/issues/10) D4 built, [#11](https://github.com/panda-king-0705/silverguard-ai/issues/11) D5 (so P4 and D6 have screens), [#15](https://github.com/panda-king-0705/silverguard-ai/issues/15) V2 (so V3 has input) and [#18](https://github.com/panda-king-0705/silverguard-ai/issues/18) B1 (so B2 and P4 have the budget). Anything unfinished carries over at planning and is re-estimated.

## Risks

These risks are AI-proposed. The delivery plan's risk register is not in the repo, so check these against it before using them for B3 ([#20](https://github.com/panda-king-0705/silverguard-ai/issues/20)). The three investor-facing risks on the Risks slide are in the [Q&A bank](../pitch/qa-bank.md#risks-slide).

| Risk | Likelihood | Impact | Mitigation | Owner |
| --- | --- | --- | --- | --- |
| Week 12 tutorial feedback arrives late in the week, squeezing P5 | Medium | High (poster v2 is the graded artefact) | Confirm the tutorial date at planning; have P4 ready before it; keep Thu–Fri for P5 | Designer, SM |
| The live alert fails the 5/5 test, or the instructor has not approved a real phone | Medium | High (Layer 1 is the headline demo) | Test Mon 2 or Tue 3 Nov, not later; Telegram Web on the laptop as the fallback; 90-second backup recording (D7) | Dev 2 |
| Bot token leaks into the public repo or a chat | Low | High | Token in one person's password manager; run `node demo/guardian-alert/check-secrets.js` before each commit; revoke and reissue at once if exposed | Dev 2 |
| Team over capacity (40 h against 38.4 h), with the Designer stream the heaviest | High | Medium | Use the split above; drop D3 first; agree cuts at planning | SM |
| AI drafts accepted without real review (almost every Sprint 2 document starts as an AI draft) | Medium | High (the course grades a documented human-AI process) | A named reviewer per document; each Q&A owner rewrites their answers; every override goes in the decision log; spot-check the five sources the poster quotes | SM |
| Mandarin, Malay or Tamil text is wrong, or no Tamil speaker is on the team | Medium | Medium | Name the three reviewers at kickoff; if no teammate speaks Tamil, ask a family member or friend; mark unchecked text as "AI draft, unchecked" on the demo | SM |
| Figures on the poster or slides are unsourced or stale | Medium | Medium | Every figure has a source link or "needs verification"; open items include the WhatsApp price placeholder and the 10-month versus 12-month budget choice | PO |
| The pitch demo fails on venue Wi-Fi | Medium | High | Everything offline except the alert; run on the pitch laptop; 90-second fallback video | Dev 1 |
| Personal data (grandparent quotes, names, phone numbers, screenshots) reaches the public repo through V3 | Medium | High | Raw notes stay in the private team space; only approved, anonymised quotes in the repo | Researcher, SM |

## Definition of Done

An item is done when all of these are true:

1. Every box in the issue's "Done when" list is ticked.
2. At least one teammate who did not make it has reviewed it. For an AI draft, the reviewer is a human who has read the whole document and edited it.
3. Each fact, number or quote has a source link, or is marked "needs verification" or "needs quote".
4. It holds no secrets (tokens, keys) and no personal data. Quotes are approved and anonymised.
5. Demo pages work offline as single files (only the live alert needs the network) and use no third-party logos or brand UI.
6. AI help is logged in [decision-log.md](decision-log.md) with a screenshot, including what the team changed or overrode.
7. The issue is closed with a link to the file or evidence.
8. Poster items also pass the reading test: two people outside the team can explain the solution from the poster alone (P5).

**For the SM's V4 log in Sprint 2:** add a row for each early AI draft above (R1, R2, B2, B3, P4, D6, D7 and the combined demo), saying what the humans changed. The AI did not edit the decision log. Also record any reviewer who is named for the native-speaker checks.

## Key dates

| Date | Event |
| --- | --- |
| Sun 1 Nov | Sprint 1 review and retro; Sprint 1 items due |
| Mon 2 Nov | Sprint 2 planning (30 min); confirm roles, hours, the Week 12 tutorial date and the native-speaker reviewers. Suggested: run the live alert test by Tue 3 Nov |
| Tue 3 Nov | Suggested: native-speaker checks done; D3 go or no-go by end of day |
| Week 12 tutorial (date to confirm) | Suggested: bring P4 poster v1 for feedback; P5 starts after it |
| Wed 4 Nov | Mid-sprint check (15 min, or async in the group chat); instructor approval for a real phone settled |
| Thu 5 Nov | **Code freeze.** Backup video saved |
| Fri 6 Nov | Sprint review (30 min), then retro (15 min); poster v2 ready for final checks |
| Sat 7 Nov | Release: R3 [#23](https://github.com/panda-king-0705/silverguard-ai/issues/23) rehearsals; P6 [#6](https://github.com/panda-king-0705/silverguard-ai/issues/6) final PDF (SM) |
| Sun 8 Nov | **Poster PDF due.** Submit and check the upload |
| Mon 9 Nov onward | Week 13 tutorial and pitch; C2 peer evaluation and C3 individual reflection (each human writes their own) |

The stand-up, review and retro formats are in [standup-and-retro.md](standup-and-retro.md).
