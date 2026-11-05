# Automatic guardian alert on a real Android phone (pitch add-on)

> Draft prepared with AI assistance for Dev 2; to be reviewed and edited by the team. Added 6 Nov 2026 (decision 27).

## What this shows

A real call from a number that is **not in the senior's contacts** rings the "senior" phone. With no button press:

1. the senior phone's ringer goes quiet (silenced, never blocked: the call still shows and can be answered), and
2. Marcus's phone gets the guardian alert on Telegram.

That is Layer 1 of SilverGuard working live. In the product, the SilverGuard app does this with Android's call-screening service (`CallScreeningService`), which only sees numbers not in contacts. For the pitch we use **MacroDroid**, a free Android automation app, as a stand-in for the app. **Say so in the pitch:** "For today, an automation tool stands in for our app's call-screening service."

This is an **add-on after the code freeze**. The offline Mock mode and the backup video (`demo/pitch-demo/backup-video.mp4`) stay the fallback.

## You need

- An **Android** phone as the senior's phone ("Mum"), with mobile data or Wi-Fi. (iPhones cannot trigger actions on incoming calls.)
- The guardian phone ("Marcus") with Telegram.
- The Telegram bot already set up and the chat ID found (README, "Live test from Node", steps 1–4).
- A third phone whose number is **not** saved in the senior phone's contacts. This is the "scammer".

## Set up (about 15 minutes, on the senior phone)

MacroDroid menu names can differ slightly between versions.

1. Install **MacroDroid** from Google Play. Allow the permissions it asks for when you add the trigger (phone/call state) and the volume action.
2. **Add Macro**, name it `SilverGuard alert`.
3. **Trigger:** Phone → **Call Incoming** → Select contacts: **Non Contact** (calls from numbers not in contacts). ([MacroDroid wiki: Call Incoming](https://macrodroidforum.com/wiki/index.php/Trigger:_Call_Incoming))
4. **Action 1, silence the ring:** Volume → Volume change → **Ringer 0%** (or Priority mode / Do Not Disturb, if your version names it that way).
5. **Action 2, alert Marcus:** Connectivity → **HTTP Request** ([MacroDroid wiki: HTTP Request](https://macrodroidforum.com/wiki/index.php/Action:_HTTP_Request)):
   - Method: **GET**
   - URL: `https://api.telegram.org/bot<TOKEN>/sendMessage` (paste the real token here on the phone only)
   - Query parameters:
     - `chat_id` = the chat ID from `node send-alert.js --find-chat`
     - `text` = `Unknown number rang Mum. She can still answer. Please call her before any money moves.`
   - Optional: save the HTTP return code to a variable so you can check it shows 200.
6. Save the macro.
7. **Second macro, restore the ringer:** name it `SilverGuard restore`. Trigger: Phone → **Call Ended** (any number). Action: Volume change → Ringer back to your normal level (for example 70%). Save.

## Test (do it 5 times, like the 5/5 test)

1. Make sure the "scammer" phone's number is not in the senior phone's contacts.
2. Call the senior phone from the scammer phone.
3. Pass: the senior phone stops ringing loudly (the call still shows on screen), and Marcus's Telegram shows the alert **within 10 s**.
4. Hang up. Check the ringer volume came back.
5. Call once from a **saved contact**: nothing should happen (normal ring, no alert).

Record the results in the table in `README.md`, with a note "automatic (MacroDroid)".

## On pitch day

- Put the senior phone on the visualiser or hold it up. The speaker for beat 6 holds Marcus's phone.
- The "scammer" teammate rings from their own phone on cue.
- A short first ring may sound before the ringer drops to 0%. Say: "In the app, screening happens before the phone rings."
- If no alert arrives within 10 s: say "this is the recorded run" and play the backup video, or use Mock mode (fallback ladder in `docs/process/rehearsal-kit.md`).

## Safety

- The token lives only inside MacroDroid on the demo phone and in the team's password manager. **Never** put it in this repo, a screenshot or the group chat. Blur the URL field if you screenshot the macro for the AI-usage log.
- After the pitch, disable both macros, or revoke the bot token with @BotFather (`/revoke`).
- Use teammates' own phones only. Don't call real seniors.
