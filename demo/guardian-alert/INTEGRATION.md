> Draft prepared with AI assistance for Dev 2; to be reviewed and edited by the team.

# Integration plan: guardian alert in the Scam Check page (Sprint 2)

How Dev 1's Scam Check page (`demo/scam-check-web/index.html`) will use `alert.js` to make its **Alert my guardian** button work. Today that button is disabled, with the note "Coming in Sprint 2 (Dev 2's alert module)". It sits in `<div class="guardian">` directly under the result card (`<section id="result">`). Nothing here has been changed in Dev 1's folder yet; Dev 1 and Dev 2 should make the change together in Sprint 2, before the code freeze on Thu 5 Nov.

## Functions available today (`alert.js`)

```js
SilverGuardAlert.sendGuardianAlert({ token, chatId, text, fetchImpl = globalThis.fetch, timeoutMs = 10000 })
  // -> Promise<{ ok: boolean, ms: number, error: string | null }>. Never throws; the token is never in `error`.
SilverGuardAlert.simulateGuardianAlert({ delayMs = 600, fail })
  // -> Promise<{ ok, ms, error, mock: true }>. Mock mode: no network.
SilverGuardAlert.buildAlertText({ seniorName = 'Mum', callerNumber, time, maskNumber = true, pronoun = 'she' })
  // -> 'Unknown number +65 9XXX XX67 rang Mum at 10:42. She can still answer. Please call her before any money moves.'
SilverGuardAlert.maskPhoneNumber(raw)          // '+6591234567' -> '+65 9XXX XX67'
SilverGuardAlert.findChatIds({ token })        // setup helper: chats that have messaged the bot
```

## Proposed for Sprint 2: a Scam Check message

`buildAlertText()` describes an unknown call. A Scam Check alert needs its own wording. Proposed signature (not built yet):

```js
SilverGuardAlert.buildScamCheckAlertText({ seniorName = 'Mum', level, cueLabels = [], time })
  // e.g. 'Mum checked a message in SilverGuard at 10:44: High risk (money request, secrecy). Please call her before any money moves.'
```

**Rule: never send the pasted message.** The design doc keeps chat text on the phone; the guardian sees events, not content. The alert carries the level, the time and, at most, cue names such as "money request". It never carries quoted phrases from the message, so it must not use the "We noticed: …" lines either.

**Decisions for the team:**

- Should cue names be sent at all, or only the level?
- Should the button show for every level or only for "High risk" and "Check with family"? The design doc says a High risk result alerts the guardian "if the senior allowed it".

## Where the button goes and what it does

1. Keep the button where it is, under the result card, and hide it until a result is shown.
2. On click, build the text from the **result**, not from the pasted message: `level` and the cue labels.
3. Mock mode (the default): call `simulateGuardianAlert()`. Live mode: call `sendGuardianAlert()` with the token and chat ID from a settings panel like the one in `demo/guardian-alert/index.html`.
4. While waiting, disable the button and show "Telling Wei Jie…" in the existing `#status` live region. On success, show "Wei Jie has been told" and the time in seconds. On failure, show the plain-words `error` and offer "Call Wei Jie now". This matches the design doc's failure rule: keep a person in the loop.

```js
// Sketch for Dev 1's page script (Sprint 2). Assumes alert.js is inlined, as below.
async function alertGuardian(result) {
  var text = SilverGuardAlert.buildScamCheckAlertText({ level: result.level, cueLabels: result.cues.map(function (c) { return c.label; }) });
  var r = settings.mock
    ? await SilverGuardAlert.simulateGuardianAlert({ delayMs: 600 })
    : await SilverGuardAlert.sendGuardianAlert({ token: settings.token, chatId: settings.chatId, text: text });
  $('status').textContent = r.ok
    ? 'Wei Jie has been told (' + (r.ms / 1000).toFixed(1) + ' s).' + (r.mock ? ' Mock mode: nothing was sent.' : '')
    : 'Wei Jie could not be reached. ' + r.error;
}
```

## Keeping the page a single offline file

Dev 1's page stays a single file by copying `engine.js` between the `/* ENGINE:START */` and `/* ENGINE:END */` markers with `sync-page.js`. Use the same pattern for the alert module: add an `/* ALERT:START */ … /* ALERT:END */` block in a second `<script>` and extend `sync-page.js` (Dev 1's file) to copy `../guardian-alert/alert.js` into it. `alert.js` has no dependencies and exposes `window.SilverGuardAlert` when it is not loaded by Node, so inlining needs no changes. The tests stay in `demo/guardian-alert/alert.test.js`, and CI already runs both folders.

## Mock mode and live mode

| | Mock mode (default) | Live mode |
| --- | --- | --- |
| Network | None | One POST to the Telegram Bot API `sendMessage` method |
| Needs | Nothing | Bot token and the guardian's chat ID, typed in at the start of the pitch |
| Time shown | Simulated (about 600 ms), labelled "Mock mode" | Measured until Telegram accepts the message |
| Use for | Rehearsals, CI, a network failure on the day | The live acceptance test and the pitch |

Mock mode must say on screen that nothing was sent, so the pitch never presents a simulated time as a real one.

## Why no token ever appears in source

- **The repo is public.** Anyone who reads a committed bot token can send messages as the bot until it is revoked, and deleting the file does not remove it from git history.
- **So the token is typed in at run time.** It goes into a password field, stays in page memory only (no `localStorage`, no cookies, no logging) and is cleared on reload. `alert.js` removes it from every error message.
- **CI backs this up.** It runs `node demo/guardian-alert/check-secrets.js` on every push and pull request, and fails the build if a bot token or common API key pattern appears anywhere in the repo.
- **In the product,** the token would never reach the phone at all. The senior app posts an event (`POST /v1/events`), and a backend Cloud Function sends the WhatsApp message with credentials kept on the server, as in the design doc's "Alert delivery" steps.
