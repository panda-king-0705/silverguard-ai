> Draft prepared with AI assistance for Dev 2; to be reviewed and edited by the team.

# Combined pitch demo (backlog items D4 + D2 together, milestone DEV2-3)

One offline file, `index.html`, for the pitch laptop. It tells the Layer 1 and Layer 2 story in one place:

1. **Simulate unknown call.** A phone-style card shows an unknown number, the ring silenced (never blocked), and the guardian alert going out. Uses `alert.js` from `demo/guardian-alert/`.
2. **Scam Check.** Paste a message and get a level and plain-language reasons. Uses `engine.js` from `demo/scam-check-web/`.
3. **Alert my guardian.** Shown only when the result is **High risk**. It sends a *separate* alert message built from the level and the names of the warning signs. It never includes the pasted text.

A panel called "What Wei Jie receives" lists every alert as it is sent, so the audience can see that the Scam Check alert contains no message content.

| File | What it is |
| --- | --- |
| `index.html` | The demo. Open it from disk. No server, no internet in Mock mode, no CDNs, no logos. |
| `build.js` | Copies the current `engine.js`, `alert.js` and `scamcheck-alert.js` into `index.html` between marker comments. |
| `scamcheck-alert.js` | Wording of the Scam Check alert, plus the check that no pasted text leaked into it. Kept here because `alert.js` belongs to another folder (see "Decisions for the team"). |
| `pitch-demo.test.js` | `node:test` checks: embedded copies match the sources, offline and accessibility rules, the alert never contains the pasted text, and the page script runs end to end in a fake DOM. |

## How to run

- **Demo:** double-click `index.html`. Mock mode is on and the page works with no internet.
- **Tests:** `cd demo/pitch-demo && node --test` (Node 18 or later; written and run on Node 22).

## Rebuild after engine changes

`index.html` stays one file by holding **copies** of three scripts, between these markers:

```
/* ENGINE:START */ ... /* ENGINE:END */          copy of ../scam-check-web/engine.js
/* ALERT:START */ ... /* ALERT:END */            copy of ../guardian-alert/alert.js
/* SCAMALERT:START */ ... /* SCAMALERT:END */    copy of ./scamcheck-alert.js
```

Never edit inside the markers. After Dev 1 changes `engine.js`, or anyone changes `alert.js`:

```
node demo/pitch-demo/build.js          # rewrites index.html
node demo/pitch-demo/build.js --check  # changes nothing; exit 1 if index.html is out of date
cd demo/pitch-demo && node --test      # confirms the copies match
```

If you forget, the test "index.html embeds an exact copy of engine.js" fails and says to run `node build.js`. That is deliberate: the pitch laptop must never run an old engine. **Do a final rebuild after the code freeze (Thu 5 Nov), commit `index.html`, and copy that exact file to the pitch laptop.** `build.js` stops with a message if a source contains `</script` or `<!--`, which would break the inline script.

The page's own code (layout and logic) sits outside the markers, at the bottom of `index.html`, and is edited by hand.

## Mock mode and live mode

| | Mock mode (default) | Live mode |
| --- | --- | --- |
| Network | None | One POST to the Telegram Bot API `sendMessage` per alert |
| Needs | Nothing | Bot token and the guardian's chat ID, typed in at the start of the pitch |
| Time shown | Simulated (about 0.6 s), labelled "Mock mode: nothing was sent" | Measured until Telegram accepts the message |
| Banner at the top | Blue: "MOCK MODE: nothing is sent" | Amber: "LIVE MODE: sends real messages" |
| Use for | Rehearsals, a network failure on the day | The live test and the pitch |

Set up the bot, find the chat ID and run the live acceptance test as described in [`../guardian-alert/README.md`](../guardian-alert/README.md). The Settings panel at the bottom of the page works the same way (token, chat ID, "Find chat ID", "Clear token and chat ID"). If the network fails during the pitch, switch Mock mode on and say so out loud: the alert is simulated, not sent.

## What the Scam Check alert says

Example, for a High risk result:

> Mum checked a message in SilverGuard at 10:44: High risk (money request, secrecy). Please call her before any money moves.

- Built from the **level** and **cue names** only (for example "money request"). `buildScamCheckAlertText()` has no parameter for the message.
- The page passes only cue names that come from the engine's own list of warning signs.
- Before sending, the page checks that no run of 16 or more characters of the pasted message appears in the alert. If one does, nothing is sent.
- The tests check this with made-up messages, including one with a unique marker string, and again through the page in both modes.
- The "We noticed: ..." quotes on the result card stay on the senior's screen. They are never part of the alert.

## Security notes

- **No token in the repo.** The token is typed into a password field, lives in page memory only (no `localStorage`, `sessionStorage`, cookies or logging; a test checks this), and is cleared on reload, including when the browser restores the page from its cache.
- **The token never appears on screen.** `alert.js` replaces it with `<bot token hidden>` in every error message. Tests check the page text after a successful and a failed live send, using a made-up token.
- **Run `node demo/guardian-alert/check-secrets.js` before every commit.** CI runs it too. If a token is ever shown or committed, revoke it in BotFather first (see the guardian-alert README).
- **Do not show the Settings panel on the projector** while a token is in the box. Click "Show" only if no one else can see the screen.
- **Offline by design:** no scripts, fonts, images or styles are loaded from anywhere. A test fails if the page references a web address outside the copied scripts. The only network call is the Telegram request in live mode.
- **Demo only:** in live mode anyone with the laptop's browser developer tools could read the token while the page is open. The product keeps credentials on a server.

## Accessibility and the pitch room

- Body text is 22 px; nothing is smaller than 20 px. All buttons are at least 64 px tall. A test fails if either rule breaks.
- Level cards use an icon and the words, not colour alone.
- The result and status lines are announced by screen readers (`role="status"`).

## Decisions for the team

1. **Which levels show "Alert my guardian"?** Built as the brief says: High risk only. The design doc says High risk alerts the guardian "if the senior allowed it". Say if "Check with family" should show it too (two places in the page script: `check()` and `alertGuardian()`).
2. **Cue names in the alert, or the level only?** Default is to name the warning signs; untick "Name the warning signs..." in Settings to send the level only. The team should pick one for the pitch.
3. **Where `buildScamCheckAlertText` lives.** `INTEGRATION.md` proposes it for `alert.js`. It is in this folder (`scamcheck-alert.js`) so that `alert.js` and Dev 1's page were not changed. Once the team agrees, move it into `alert.js`, update the markers, and delete this file. Dev 1's Scam Check page still shows its disabled button.
4. **Who plays the guardian's Telegram account** and whether a real phone is allowed on stage: unchanged from the guardian-alert README.

## Checked, and not checked

- **Checked by `node --test` (30 tests):** embedded copies match their sources; `build.js` refuses unsafe sources; no external resources; type and button sizes; no storage APIs; alert text never contains pasted text; the page script in a fake DOM: Mock mode start, simulate call, High risk shows the alert step and other levels do not, editing hides stale results, mock and live alerts, live URL and body, failure messages, reload clearing credentials.
- **Not checked:** how the page looks in a real browser and on the pitch projector (no browser was run for this draft), real Telegram delivery, and the 5-try live acceptance test. A human should open `index.html` in the browser used on the day, check the layout at the projector's resolution and zoom level, and run the live test.
