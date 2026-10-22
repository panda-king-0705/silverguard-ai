> Draft prepared with AI assistance for Dev 2; to be reviewed and edited by the team.

# Guardian alert demo (backlog item D4)

A "Simulate unknown call" page for the pitch. An unknown number rings the senior, the ring is silenced (never blocked), and the guardian gets a chat message within seconds. This is the class-demo version of the Guardian Alert flow in [`docs/prototype-design.md`](../../docs/prototype-design.md#guardian-alert). The product would send a WhatsApp utility message from the backend. The demo uses a Telegram bot instead, as the design doc says.

| File | What it is |
| --- | --- |
| `index.html` | The demo page. Open it straight from disk; it needs no server and no internet in Mock mode. It loads only `alert.js` from this folder. |
| `alert.js` | The alert module. It works in the browser (`window.SilverGuardAlert`) and in Node (`require('./alert.js')`). |
| `alert.test.js` | Unit tests with a mocked `fetch`: success, a Telegram error reply, network failure, timeout, and number masking. |
| `check-secrets.js` | Scans the repo for bot tokens and API keys. CI runs it, and you can run it locally. |
| `INTEGRATION.md` | How Dev 1's Scam Check page will use `alert.js` in Sprint 2. |

## Quick start

- **Demo:** double-click `index.html`. Mock mode is on by default. It sends nothing, waits about 600 ms and shows the result, so the team can rehearse without a bot.
- **Tests:** `cd demo/guardian-alert && node --test` (Node 18 or later).
- **Secrets check:** from the repo root, run `node demo/guardian-alert/check-secrets.js`.

## The message

`buildAlertText()` produces, for example:

> Unknown number +65 9XXX XX67 rang Mum at 10:42. She can still answer. Please call her before any money moves.

By default the middle digits are hidden. The design doc lists sharing the caller's number as its own consent scope, so the full number appears only when `maskNumber: false` is passed. The time is shown in Singapore time. The number in the demo is made up.

## How the alert is sent (Telegram Bot API)

`sendGuardianAlert({ token, chatId, text, fetchImpl, timeoutMs = 10000 })` returns `{ ok, ms, error }` and never throws.

- It sends a POST to `https://api.telegram.org/bot<token>/sendMessage` with the parameters `chat_id` and `text`.
- Requests use the form `https://api.telegram.org/bot<token>/METHOD_NAME`. GET and POST are both supported. `application/x-www-form-urlencoded` is one of four documented ways to pass parameters, and is the one `alert.js` uses. Every reply has a Boolean `ok` field; on failure, `description` explains the error and an `error_code` is returned whose "contents are subject to change in the future". Source: [Telegram Bot API, Making requests](https://core.telegram.org/bots/api#making-requests), checked 22 Oct 2026. The page's "Recent changes" listed Bot API 10.3 (24 Aug 2026) as the latest version.
- The message text can be 1 to 4096 characters. Source: [Telegram bot tutorial](https://core.telegram.org/bots/tutorial).
- **Needs verification:** the exact `sendMessage` parameter table at https://core.telegram.org/bots/api#sendmessage. The AI's sandbox could not load that part of the page. A teammate should open it and confirm that `chat_id` and `text` are still the required parameters, then tick here: [ ]
- `ms` is measured from the call until Telegram's reply. It shows when Telegram **accepted** the message, not when it appeared on the guardian's phone. The live test below measures both.
- Errors are shown in plain words, for example "The chat ID is wrong, or the guardian has not opened the bot and pressed Start yet." The token is removed from every error message.
- **Needs verification (live test):** in live mode the browser calls `api.telegram.org` directly. This only works if Telegram allows cross-origin requests from a page opened from disk. The first live try will show this. If it fails with a network error while the internet is working, tell Dev 2. The fallback is to send the alert from a small Node script instead, since `alert.js` also runs in Node.

## Set up the demo bot (one-off, about 10 minutes)

**Decision for the team:** whose Telegram account plays the guardian ("Wei Jie") during the pitch. A team demo account keeps personal chats off the projector.

1. **Create the bot.** In Telegram, open a chat with **@BotFather** (check the username is exactly that) and send `/newbot`. Choose a display name, then a username. Usernames are 5 to 32 characters, may only use Latin letters, numbers and underscores, and must end in "bot". BotFather then gives you the bot's token. Sources: [Telegram Bot Features, "Creating a new bot"](https://core.telegram.org/bots/features); [Bots: An introduction for developers](https://core.telegram.org/bots).
2. **Store the token safely.** Telegram says to "treat it like a password and don't share it with anyone" ([tutorial](https://core.telegram.org/bots/tutorial)), and that the token "can be used by anyone to control your bot" ([features](https://core.telegram.org/bots/features)). Keep it in one teammate's password manager. Never put it in the repo, a chat, slides or a screenshot.
3. **The guardian starts the bot.** "Bots can't start conversations with users. A user must either add them to a group or send them a message first" ([Bots introduction](https://core.telegram.org/bots)). The guardian searches for the bot's username (or opens `t.me/<bot_username>`), presses Start and sends "hi".
4. **Find the chat ID.** Open `index.html`, turn Mock mode off, paste the token, and press **Find chat ID**. The page calls the Bot API method `getUpdates` ([reference](https://core.telegram.org/bots/api#getupdates); "This method will not work if an outgoing webhook is set up", which a new bot does not have) and lists the chats that have messaged the bot. Click the guardian's entry. This is safer than typing the `getUpdates` web address into the browser's address bar, which would save the token in the browser history. *Needs verification:* the page reads each update's `message.chat.id`. Confirm those field names against the Update and Chat sections of the Bot API reference.
5. Write the chat ID down. Unlike the token, it is not a secret that controls the bot, but treat it as personal data and keep it out of the repo.

## Live acceptance test (needs a human)

Target from the design doc: guardian alerted within 10 s of the call ringing.

**Who:** Dev 2 at the presentation laptop, plus the teammate holding the guardian's phone. Run it on the network you will use at the pitch if you can (venue Wi-Fi or the planned hotspot).

1. Open `index.html` on the presentation laptop. Turn Mock mode off and enter the token and chat ID.
2. Press **Simulate unknown call** 5 times, waiting for each result before the next.
3. For each try, record the time the page shows. The guardian records whether the message arrived and, with a stopwatch started on the click, roughly how long it took.
4. Copy the times before reloading: the page keeps them in memory only.

**Pass:** all 5 messages arrive, and all 5 are under 10 s on the page and on the stopwatch.

| Try | Date and time | Page time (s) | Arrived on phone? | Stopwatch to phone (s) | Network | Pass? |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

Tester: ________ Guardian phone: ________ Result: PASS / FAIL

Status: **not yet run (needs a human)**. Record the result and any failures in the team's decision and AI-usage log (V4).

## Security notes

- **The token is never committed.** No token is in this folder. The page holds the token only in the input box (page memory). It does not use `localStorage` or cookies, does not log the token, and clears it on reload. This was checked in a headless browser: after a reload both boxes were empty and storage was empty. Errors from `alert.js` replace the token with `<bot token hidden>`.
- **Run the secrets check before every commit:** `node demo/guardian-alert/check-secrets.js`. CI runs it on every push and pull request.
- **If the token leaks** (committed, pasted in a chat or seen on screen), revoke it in @BotFather straight away. The tutorial says each token "can also be revoked at any time via @BotFather" ([tutorial](https://core.telegram.org/bots/tutorial)). The features page says to use the `/token` command to generate a new token if the old one is compromised or lost ([features](https://core.telegram.org/bots/features)). *Needs verification:* the exact BotFather menu steps in the app. The repo is public, so assume a committed token was copied at once. Deleting the file does not remove it from git history, so revoke first, then clean up.
- **Demo only:** in live mode, anyone using the laptop's browser developer tools could see the token while the page is open. The product would keep the token on the server (the Cloud Function that sends alerts). It never sits in the senior's app.

## Phones during the pitch

The course rule is that phones may be used during the pitch only with instructor approval.

- **Ask the instructor before the pitch.** Decision for the PO or Scrum master: who asks, and by when (Sprint 2, before the code freeze on Thu 5 Nov).
- **Fallback (no approval, or as a backup):** on the presentation laptop, keep the guardian's chat open in Telegram's web version (Telegram Web) in a second window. The audience then sees the alert arrive on the projector. Log in and test this before the pitch, and use the team demo account so no personal chats are shown.
- If the network fails on the day, switch Mock mode on and say so out loud: the alert is simulated, not sent.

## Limits to say honestly in the pitch

- Mock mode simulates the delay. It does not measure real delivery.
- The demo sends the alert from the browser with a Telegram bot. The product design uses WhatsApp utility messages from the backend, with SMS as the fallback.
- The real phone-side silencing uses Android's call-screening role, which this web page does not show.
