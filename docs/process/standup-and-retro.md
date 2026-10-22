> Draft prepared with AI assistance for the scrum master; to be reviewed and edited by the team.

# Stand-up, review, retro and AI-usage logging

## Daily async stand-up (group chat)

Post once a day by a time the team agrees at planning. It takes about 2 minutes to write. Use the same three lines every time:

```
[Role] dd Mon
Done: what I finished since my last post (issue #)
Next: what I'll do before my next post (issue #)
Blocked: what stops me, and who can help ("none" if nothing)
```

Example (made up, for format only):

```
[Dev 1] 27 Oct
Done: rules for money-request and secrecy cues (#8)
Next: plain-word reasons on the result card (#8)
Blocked: need the 5 genuine messages from D1 (#7), Researcher
```

Rules:

- Name the issue number so the board stays the single source of truth.
- A blocker gets a reply from the SM the same day, even if it's only "on it".
- Never post tokens, passwords, phone numbers or interview notes in the chat.
- If you used AI for the work, add "AI: yes" and log it (see below).

## Sprint review (30 min, Sun 1 Nov)

| Time | What | Who |
| --- | --- | --- |
| 0–3 min | Sprint goal: did "a rough version of everything" happen? | SM |
| 3–20 min | Demo each finished item against its "Done when" list (about 2 min each) | Item owners |
| 20–25 min | Unfinished items: carry over, re-size or drop | PO |
| 25–30 min | Update the backlog and the Sprint 2 milestone; note any new decisions for the log | PO, SM |

Only items that meet the Definition of Done in [sprint-1-plan.md](sprint-1-plan.md#definition-of-done) count as done.

## Retro (15 min, straight after the review)

| Time | What |
| --- | --- |
| 0–5 min | Everyone writes notes silently under **Keep** (worked well), **Drop** (stop doing) and **Try** (do differently next sprint) |
| 5–12 min | Read them out; group similar notes |
| 12–15 min | Pick at most 2 "Try" actions, each with an owner, for Sprint 2 |

Record the 2 actions in the decision log. Include at least one note about how the team used AI: what helped, and what the team had to fix.

## Logging AI usage

This evidence supports the poster's AI-usage criterion and each person's own reflection. The reflection itself must be written by each person, never by AI.

**When to log:** any time AI shaped a decision, drafted something we kept, or got something wrong that we fixed.

**How (about 2 minutes):**

1. Take a screenshot of the key prompt and reply. Crop out names, phone numbers and anything private.
2. Save it as `docs/process/evidence/YYYY-MM-DD-short-topic.png` (create the folder on the first use), or in the team's private drive if it contains instructor feedback or personal data.
3. Add a row to [decision-log.md](decision-log.md): what the AI suggested, what we kept, what we changed and why.
4. If you overrode the AI, add a row to the "Overrides" table. Those rows matter most.

**Good entry (made-up example):** "AI suggested a 2-minute stand-up limit; we chose 3 lines with no limit, because people skipped it when timed. Screenshot: evidence/2026-10-27-standup-format.png."
**Weak entry:** "Used ChatGPT for research."
