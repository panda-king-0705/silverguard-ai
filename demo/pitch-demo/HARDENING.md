> Draft prepared with AI assistance for Dev 1; to be reviewed and edited by the team.

# Demo hardening (milestone DEV-3, backlog D7, issue #13)

Checked on Fri 6 Nov 2026 by the AI assistant in a sandbox: Node 22, headless Chromium driven by Playwright. **Not yet checked on the real pitch laptop or projector.** A human must run the pre-flight checklist at the end on the actual laptop.

## 1. What was checked

The pitch script's run sheet (`docs/pitch/pitch-script.md`, "Demo set-up and fallbacks") uses three pages, so all three were checked, plus the combined page in this folder:

| Beat | Page the run sheet uses | Checked here |
| --- | --- | --- |
| 6, Guardian Alert | `demo/guardian-alert/index.html` | Yes |
| 7, Scam Check | `demo/scam-check-web/index.html` | Yes |
| 8, Pause & Verify | `design/clickable-screens/index.html` | Loaded offline for the backup video only (not Dev 1's file; not edited) |
| (not in the run sheet) | `demo/pitch-demo/index.html` (combined page) | Yes |

**Decision for the team:** the run sheet uses the two separate pages, not the combined page. Both work. Pick one set and rehearse with it; don't switch on the day.

### Unit tests (`node --test` in each folder)

| Folder | Before DEV-3 | After DEV-3 |
| --- | --- | --- |
| `demo/guardian-alert` | 23/23 pass | 25/25 pass (2 new: `readability.test.js`) |
| `demo/scam-check-web` | 30/30 pass | 30/30 pass (no change) |
| `demo/pitch-demo` | 30/30 pass | 34/34 pass (4 new: `hardening.test.js`) |

Also: `node demo/pitch-demo/build.js --check` says `index.html` is up to date; `node demo/scam-check-web/evaluate.js` still gives 15/15; `node demo/guardian-alert/check-secrets.js` passes.

### Browser check (`browser-check.js`, new)

`node demo/pitch-demo/browser-check.js` opens each page from `file://` in Chromium with **every non-file request aborted**, at **1366×768** (the run sheet's projector size) and **1920×1080**. It is a separate script, not part of `node --test`, because Playwright may not be on every laptop.

| Check | Result after fixes |
| --- | --- |
| Console errors and page errors, Mock mode, all pages, both sizes | **0** |
| Requests to anything other than `file://` | **0** (none were attempted, so none were blocked) |
| Scam Check, S04 (beat 7: "Ah Ma, my phone spoil…") | **High risk**, 4 reasons (money, secrecy, new number or cannot talk, urgency) and the "Still verify…" reminder, on both Scam Check pages |
| Scam Check, S03 ("guess who… changed my number") | **Check with family** |
| Scam Check, family message ("Hi Ma, reached the hospital…") | **No warning signs found** |
| Scam Check, G02 (beat 7's optional extra) | **No warning signs found** |
| "Alert my guardian" (combined page) | Shown for High risk only. Mock alert says "High risk" and contains none of the pasted text |
| Simulate unknown call, Mock mode (guardian-alert page) | Phone shows "Ring silenced. You can still answer." and "Marcus has been told."; the panel shows "Simulated alert done in 0.6 s. Mock mode: no real message was sent."; the mock alert text is shown under "What the guardian receives" |
| Simulate unknown call, Mock mode (combined page) | Same, with "MOCK MODE: nothing is sent" banner, "Mock: not sent" tag on the message to Marcus |
| Smallest visible text | 20 px or more on every page (after fix 2) |
| Horizontal scrolling | None |
| Key controls visible without scrolling at 1366×768 | Yes (after fix 1) |
| **Total** | **78/78 checks pass** |

**Projector readability.** Screenshots at both sizes were looked at. Body text is 20 to 22 px, levels 32 px, buttons 64 px or taller; the level cards use an icon and words, not colour alone. 20 px CSS text on a 1366×768 projector is readable from the middle of a classroom, but this was **not** tested in the real room: ask someone to stand at the back during the run-through and raise the browser zoom (Ctrl +) if they can't read the reasons.

## 2. Fixes made

| # | Problem found | Fix | Test added |
| --- | --- | --- | --- |
| 1 | **Combined page at 1366×768:** "Simulate unknown call" sat under a 520 px phone card, below the first screen. The presenter would have had to scroll before and after pressing it, and the result was off screen. | `demo/pitch-demo/index.html` (page layout only, outside the copied scripts): the button and its status line now sit above the phone; on screens 860 px high or less the phone is compacted and the left column widened. Idle text now says `Press "Simulate unknown call"` instead of "the button below". At 1366×768 the button, the "Mock mode: nothing was sent" line and "Marcus has been told." are all visible without scrolling. | `hardening.test.js` (4 tests) and the browser check "visible without scrolling" |
| 2 | **Guardian-alert page (beat 6):** text as small as 14 px (clock, Decline/Answer labels, footer) and the **mock-mode label was only 15 px**, the one line that tells the room nothing is being sent. | `demo/guardian-alert/index.html` CSS only: every font size raised to at least 20 px (body 20, alert notice and result 22); mode label 20 px, bold and outlined. No logic changed. | `guardian-alert/readability.test.js` (2 tests) and the browser 20 px check |

`build.js` only regenerates the copied scripts; the layout change is outside the markers, and `build.js --check` still passes. No engine, alert or wording logic was changed.

**Not fixed (for a human to decide):**

- The clock on the phone shows the laptop's real time in Singapore time. If you rehearse at night it will say, for example, 23:10, not the script's 10:42. Harmless; mention only if asked.
- Live mode was not tested (no token, by design). Telegram may refuse browser calls from a page opened from disk; the README's fallback is `node demo/guardian-alert/send-alert.js`.

## 3. Mock vs live

| | Mock mode (default on every load) | Live mode |
| --- | --- | --- |
| How to switch | Already on. Reloading the page always switches back to Mock | Open Settings, untick Mock mode, type the token and chat ID |
| Network | None | One request to Telegram per alert |
| On screen | Blue "Mock mode" label; result says nothing was sent | Amber "Live mode" label; result shows Telegram's time |
| Say aloud | "This is mock mode: the alert is simulated, nothing is sent." | Nothing extra |

Decision 26: the live bot is not set up yet. Until a human has run the 5/5 live test, **present in Mock mode** and say so.

## 4. Pre-flight checklist (pitch laptop)

Do it once at the full rehearsal and again 30 minutes before the pitch. Tick and date.

**Open from disk**

- [ ] Copy the whole repo `demo/` folder (and `design/clickable-screens/`) to the laptop's disk and a USB stick.
- [ ] Double-click each page. The address bar starts with `file://`, not `http`.
- [ ] Open the tabs in run-sheet order: guardian alert (beat 6), Scam Check (beat 7), clickable screens (beat 8). Or the combined page if the team chose it.
- [ ] Projector or external screen at 1366×768 (or what the room gives you); browser zoom 100% to start, raise if the back row can't read.

**Wi-Fi-off test**

- [ ] Turn Wi-Fi off (airplane mode). Reload each page. Press "Simulate unknown call": you should see "Mock mode: no real message was sent" (or "nothing was sent" on the combined page).
- [ ] Paste S04 into Scam Check: **High risk** with 4 reasons. Paste the family message: **No warning signs found**.
- [ ] Clickable screens: press 2, answer No, No, Yes; "Call Marcus now" appears.
- [ ] Optional, if Node and Playwright are installed: `node demo/pitch-demo/browser-check.js` prints `78/78 browser checks passed`.
- [ ] Turn Wi-Fi back on only if you are going live.

**Mock vs live switch**

- [ ] If live: a human has passed the 5/5 test (`guardian-alert/README.md`) on this laptop and network. Type the token just before the pitch; never with Settings on the projector.
- [ ] If not live, or unsure: leave Mock mode on. Speaker D says "this is mock mode; the alert is simulated".

**If the live alert fails on stage**

1. Don't retry more than once. Say: "The network isn't with us, so here is the recorded run."
2. Play `demo/pitch-demo/backup-video.mp4` (Beat 6 starts at the timestamp in `BACKUP-VIDEO.md`), **or** tick Mock mode and press the button again, saying "this is mock mode".
3. Carry on with beat 7: Scam Check needs no network.
4. Afterwards, never claim the live alert worked if it didn't.

**Backup video**

- [ ] `backup-video.mp4` plays from the laptop's disk with Wi-Fi off, and from the USB stick.
- [ ] The presenter knows where it is and has watched it once on this laptop.
