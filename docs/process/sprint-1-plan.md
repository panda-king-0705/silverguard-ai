> Draft prepared with AI assistance for the scrum master; to be reviewed and edited by the team.

# Sprint 1 plan

| | |
| --- | --- |
| Sprint | Sprint 1 |
| Dates | Mon 26 Oct – Sun 1 Nov 2026 |
| Sprint goal | **A rough version of everything exists.** |
| Board | GitHub issues, milestone "Sprint 1" ([list](https://github.com/panda-king-0705/silverguard-ai/milestone/2)) |

AI drafts of this plan, the backlog and the decision log were started early, on Thu 22 Oct (Sprint 0). They still need human review. Nothing here is agreed until the team confirms it at sprint planning on Mon 26 Oct. The AI proposed every priority, owner split and dependency below, and the product owner confirms them.

## Team roles

Members write their own names in. The AI has not assigned anyone.

| Role | Member | Sprint 1 focus |
| --- | --- | --- |
| Product owner (PO) | _to fill_ | Orders the backlog, confirms priorities, owns B1 budget |
| Scrum master (SM) | _to fill_ | Runs planning, the mid-sprint check, review and retro; keeps V4 log |
| Dev 1 | _to fill_ | D2 Scam Check page; D1 with the Researcher |
| Dev 2 | _to fill_ | D4 "Simulate unknown call" alert |
| Designer | _to fill_ | D5 clickable screens; P3 poster wireframe |
| Researcher | _to fill_ | P2 source library; D1 test set; leads V2 grandparent sessions |

## Capacity

Six people at about 8 h a week gives 48 h. We plan to about 80% (about 38 h). The other 20% covers stand-ups, planning, review, retro and surprises.

| Role | Available (h) | Planned at 80% (h) | Proposed load (h) | Items |
| --- | --- | --- | --- | --- |
| PO | 8 | 6.4 | 5 | B1 (4), V2 helper (1) |
| SM | 8 | 6.4 | 2 | V4 (1), V2 helper (1), plus running ceremonies |
| Dev 1 | 8 | 6.4 | 10 | D2 (8), D1 (2) |
| Dev 2 | 8 | 6.4 | 4 | D4 (4) |
| Designer | 8 | 6.4 | 10 | D5 (8), P3 (2) |
| Researcher | 8 | 6.4 | 8 | P2 (4), D1 (2), V2 (2) |
| **Team** | **48** | **38.4** | **39** | |

**For the team to decide at planning:** the team total fits, but Dev 1, the Designer and the Researcher are over 6.4 h while Dev 2, the PO and the SM have room. Options the AI suggests:

- Dev 2 takes the result card and plain-word reasons on D2 (about 3 h), so Dev 1 drops to about 7 h and Dev 2 rises to about 7 h.
- The PO or SM links the D5 screens or writes their on-screen text (about 2 h).
- The two V2 helpers are the PO and the SM. The brief says "any 2 members", so the team picks.

Real availability this week is not known yet; each person should say theirs at planning.

## Sprint backlog

Priority: **P0** must, **P1** should, **P2** stretch. Estimate: S ≈ 2 h, M ≈ 4 h, L ≈ 8 h.

| Issue | Item | Priority | Size (h) | Owner | Depends on |
| --- | --- | --- | --- | --- | --- |
| [#7](https://github.com/panda-king-0705/silverguard-ai/issues/7) | D1 Demo test set | P0 | M (4) | Researcher, Dev 1 | — |
| [#8](https://github.com/panda-king-0705/silverguard-ai/issues/8) | D2 Paste-text Scam Check page | P0 | L (8) | Dev 1 | #7 D1 |
| [#10](https://github.com/panda-king-0705/silverguard-ai/issues/10) | D4 "Simulate unknown call" Telegram alert (needs-human: bot token) | P0 | M (4) | Dev 2 | #8 D2 (soft) |
| [#11](https://github.com/panda-king-0705/silverguard-ai/issues/11) | D5 Clickable screens | P0 | L (8) | Designer | — |
| [#15](https://github.com/panda-king-0705/silverguard-ai/issues/15) | V2 Grandparent sessions (needs-human) | P0 | M (4) | Researcher + 2 members | #14 V1, #11 D5 (soft) |
| [#18](https://github.com/panda-king-0705/silverguard-ai/issues/18) | B1 Budget v2 with researched numbers | P1 | M (4) | PO | — |
| [#2](https://github.com/panda-king-0705/silverguard-ai/issues/2) | P2 Source library v2 | P1 | M (4) | Researcher | — |
| [#3](https://github.com/panda-king-0705/silverguard-ai/issues/3) | P3 Poster wireframe | P1 | S (2) | Designer | #1 P1 (soft) |
| [#17](https://github.com/panda-king-0705/silverguard-ai/issues/17) | V4 Decision and AI-usage log (runs to Release) | P1 | about 1 h this sprint | SM | — |
| [#9](https://github.com/panda-king-0705/silverguard-ai/issues/9) | D3 Screenshot OCR, pulled forward only if D4 is done early | P2 | M (4), not counted | Dev 2 | #8 D2 |

Sprint 1 total: 38 h plus about 1 h for V4. Each issue's "Done when" checklist is its acceptance test.

**Sprint 0 items that must be finished first (due Sun 25 Oct):** [#1](https://github.com/panda-king-0705/silverguard-ai/issues/1) P1 problem statement, [#14](https://github.com/panda-king-0705/silverguard-ai/issues/14) V1 interview guide (V2 cannot start without it), [#27](https://github.com/panda-king-0705/silverguard-ai/issues/27) C4 repo visibility. Anything unfinished carries over at planning and is re-estimated.

## Risks

These risks are AI-proposed. Check them against the risk register in the delivery plan, which was not available while this draft was written, before using them for B3.

| Risk | Likelihood | Impact | Mitigation | Owner |
| --- | --- | --- | --- | --- |
| Grandparent sessions cannot be arranged for 28–31 Oct | Medium | High (no real validation for the pitch) | Finish V1 by Sun 25 Oct; line up 3–4 possible grandparents; allow phone sessions | Researcher |
| D2 misses its target (8 of 10 scams flagged, 0 of 5 genuine flagged) | Medium | High | D1 test set ready by Wed 28 Oct; check at mid-sprint Thu 29 Oct; report real numbers honestly if short | Dev 1 |
| Bot token leaks into the public repo or a chat | Low | High | Token kept in a local, git-ignored file; never pasted anywhere; revoke and reissue at once if exposed | Dev 2 |
| Uneven load (Dev 1, Designer, Researcher over capacity) | High | Medium | Rebalance at planning (see Capacity) | SM |
| Personal data (names, phone numbers, interview notes, chat screenshots) ends up in the public repo | Medium | High | Raw notes stay in a private team space; only approved, anonymised quotes in the repo; C4 decision settles visibility | Researcher, SM |
| AI drafts accepted without real review | Medium | Medium (grading rewards a documented human-AI process) | A named reviewer per document; overrides go in the decision log | SM |
| Budget or market figures unsourced | Medium | Medium | Every B1 line has a source or says "needs verification" | PO |

## Definition of Done

An item is done when all of these are true:

1. Every box in the issue's "Done when" list is ticked.
2. At least one teammate who did not make it has reviewed it.
3. Each fact, number or quote has a source link, or is marked "needs verification" or "needs quote".
4. It holds no secrets (tokens, keys) and no personal data. Quotes are approved and anonymised.
5. Demo pages work offline as single files (only the live alert needs the network) and use no third-party logos or brand UI.
6. AI help is logged in [decision-log.md](decision-log.md) with a screenshot, including what the team changed or overrode.
7. The issue is closed with a link to the file or evidence.

## Key dates

| Date | Event |
| --- | --- |
| Sun 25 Oct | End of Sprint 0: P1, V1, C4 due |
| Mon 26 Oct | Sprint 1 planning (30 min; time to agree) |
| Wed 28 Oct | Suggested: D1 test set ready so D2 can be tested |
| Wed 28 – Sat 31 Oct | Grandparent sessions (V2) |
| Thu 29 Oct | Mid-sprint check (15 min, or async in the group chat) |
| Sun 1 Nov | Sprint review (30 min), then retro (15 min) |
| Mon 2 Nov | Sprint 2 starts (code freeze Thu 5 Nov; poster PDF due Sun 8 Nov) |

The stand-up, review and retro formats are in [standup-and-retro.md](standup-and-retro.md).
