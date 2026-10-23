> Draft prepared with AI assistance for the Dev 1 role; to be reviewed and edited by the team.

# Pitch demo notes (backlog D7, issue #13)

Owner: Dev 1. Speakers are "Speaker A" to "Speaker F" until roles are assigned. This file covers the Scam Check part of the pitch: a 60-second live script, an offline checklist and a 90-second backup-video shot list. The live alert (Guardian Alert, Dev 2) is only mentioned where it touches the Scam Check script; its own test procedure is in [`../guardian-alert/README.md`](../guardian-alert/README.md).

Page used: [`index.html`](index.html) in this folder, opened from disk. If the team uses the combined page in `demo/pitch-demo/`, the same three messages work there; check that page once before relying on it.

**Humans must decide** (nothing here is decided for you):

- [ ] Who is Speaker A (talks) and who is Speaker B (hands on the laptop). Two people is safer than one.
- [ ] Whether the audience may try their own message live (not recommended in the 60 seconds; see "If an investor offers a message").
- [ ] Whether the alert clip goes in the backup video (it depends on the live test in issue #10 and on the instructor's approval of a real phone, decision 19).
- [ ] Which browser and display mode (light or dark) you will present in. Pick one, rehearse in it.

## 1. The 60-second live script

**Before you start:** the page is open and scrolled to the top, the box is empty, browser zoom is 125% or more, notifications are off, and the three messages below are in a plain text file on the desktop so Speaker B can copy and paste without typing. The page's two example buttons are the fallback.

**Order and why:** a scam first (the impact), then a "guess who" first-stage message (the grading is not on or off), then a genuine family message (it does not cry wolf, and it never says "safe").

| Time | Speaker B does | Speaker A says | What the page should show |
| --- | --- | --- | --- |
| 0:00 to 0:08 | Nothing yet | "Mum gets a message and is not sure. In the app she shares it with Scam Check. It looks for the scam script, not the voice: money, secrecy, a new number, urgency. Here is the demo version." | Empty Scam Check page |
| 0:08 to 0:30 | Paste **message 1**, press "Check this message" | "A message to Ah Ma: phone spoil, cannot talk, urgent, hospital, PayNow, do not tell anyone. Scam Check says High risk, and tells her why in plain words: asked for money, asked for secrecy, new number or cannot talk, rushing her. And the line at the bottom: still verify any request for money by calling family on a number you saved." | "High risk" with a warning icon, four reasons, the phrases it noticed, the reminder |
| 0:30 to 0:45 | Clear, paste **message 2**, press Check | "Now the first stage of a fake-friend scam. No money yet, just 'guess who, save my new number'. This is not High risk, it is 'Check with family'. Three levels, not on or off." | "Check with family", one reason (new number) |
| 0:45 to 0:55 | Clear, paste **message 3**, press Check | "And an ordinary message from a son at the hospital with his father. 'No warning signs found'. We never say 'safe'. The reminder is still there." | "No warning signs found", the reminder |
| 0:55 to 1:00 | Hands off the keyboard | "This is a simplified rules demo. The product runs a trained model on the phone, and nothing leaves the phone. Over to [Speaker C]." | Last result still on screen |

### The three messages (copy exactly; they are `S04`, `S03` and a family message in `test-set.json`)

1. **Scam, expected "High risk"** (S04):
   `Ah Ma, my phone spoil, can't talk now, only can send voice note. Very urgent, I need $1,500 for hospital deposit tonight. PayNow to this number ok? Don't tell anyone first.`
2. **First-stage scam, expected "Check with family"** (S03):
   `Hello Uncle, guess who? I changed my number, please save this one and delete the old one ok. Next time contact me here.`
3. **Genuine, expected "No warning signs found"** (the page's own "Try a family example" text):
   `Hi Ma, reached the hospital with Pa for his check-up. Doctor says all fine, we will be home by 5. Call you later.`

These results were checked with the engine on 23 Oct 2026. **Re-check after any change to `engine.js`:** open the page and paste all three. Messages 1 and 2 are S04 and S03 in the test set, so `node evaluate.js` also shows them; message 3 is only on the page.

### The accuracy line (decision 20)

Say it only if asked, or in the last 10 seconds if there is spare time. Use these words exactly:

> "On a 15-message test set our team wrote with AI assistance, the demo rated all 15 as expected. Real-world accuracy is not yet measured."

Wording rules:

- Do **not** say "accurate", "catch rate", "percent", "98%" or "100% accurate". 15/15 is a result on a small set we wrote ourselves, not a measured rate.
- Do **not** say "the team wrote it itself". The set was drafted with AI assistance (decision 20, wording corrected 23 Oct).
- Do **not** say the demo detects cloned voices. It reads pasted text; the voice-clone threat is why we look at the script. Do not attribute any voice-clone claim to SPF (decision 21: SPF briefs never mention voice cloning).
- If pressed: "The honest next step is to test on real, consented messages in four languages. The demo's own held-out check, 12 new messages, went from 5 of 12 correct to 11 of 12 after we fixed what it missed, but we fixed it after seeing the failures, so we do not quote that either." (See [`README.md`](README.md), "Held-out set".)

### Messages NOT to use live

| Message | Why not |
| --- | --- |
| Hospital car-park request (held-out H10, "bring $50 cash for the car park") | Genuine message that gets High risk. Known false alarm; the team has not decided how to handle it (README, "Hospital parking") |
| "Mum it is me, can lend me some cash?" / "I in trouble… Google Play cards" / "Ma pls transfer 500 to this acc" | Known misses: only "Check with family" |
| "Pa, I transfer the money into your account already" | Genuine, gets "Check with family" (cannot tell "I paid you" from "pay me") |
| Anything from an investor in the audience | Unknown result in front of the room |

### If an investor offers a message

In the 60 seconds, politely decline: "Happy to try yours in the Q&A." In the Q&A, paste it. If the result is wrong, say: "That is a miss, and exactly why we are collecting real messages before we set any target. This demo is word rules only." Never argue with the result and never say the product "would" catch it.

### If something goes wrong

| Problem | What to do |
| --- | --- |
| The page does not open | Open the copy on the USB stick or phone; or play the backup video (section 3) and say so |
| A level differs from the table | Say: "This demo is simple word rules, so the wording matters. The product adds a trained model." Move on; do not retype |
| Nothing happens on "Check" | Press "Clear", paste again once; if still nothing, switch to the backup video |
| Projector too small to read | Zoom the browser; the reasons are in plain words and large type |
| Over 60 seconds | Drop message 2 (the middle row) and keep 1 and 3 |

## 2. Offline checklist

Do this on the actual presentation laptop, with Wi-Fi off, at least once before the code freeze (Thu 5 Nov) and again on the morning of the pitch. Tick and date each item.

**The Scam Check page**

- [ ] `index.html` opens by double-click from the laptop's disk (address bar starts with `file://`), not from the internet.
- [ ] Wi-Fi and Bluetooth off (or airplane mode). The page still works: all three messages give the expected levels.
- [ ] No spinner, broken image or missing font. The page loads no external resources (a test checks this), so nothing should change offline.
- [ ] `node --test` in this folder passes, and `node sync-page.js` has been run after the last engine change (a test fails if `index.html` and `engine.js` differ).
- [ ] The "Read result aloud" button: it only shows if the browser has a built-in voice, and the voice is English only. Decide whether to use it; if not, do not mention it.
- [ ] Tested in the browser you will present with, and in one backup browser.
- [ ] Browser zoom set (125% or more); other tabs closed; notifications and "do not disturb" on; bookmarks bar and browser history do not show anything personal.
- [ ] The three messages are in a plain text file for pasting.

**Hardware and copies**

- [ ] Laptop charger, HDMI or USB-C adapter and a spare, tested with the room's projector or a similar one.
- [ ] Copy of the whole `demo/scam-check-web` folder on a USB stick and on a phone; the backup video on the laptop, the USB stick and the phone.
- [ ] Screen mirroring works and the page is readable from the back of the room (ask a teammate to stand there).

**The alert (needs internet; mock mode does not)**

- [ ] Say clearly in the plan which parts need internet: only the real Telegram alert. In mock mode the alert page needs no network.
- [ ] The bot token is never on a slide, in the repo, on screen or in a screenshot. If any recording shows a token, delete the recording and revoke the token.
- [ ] Fallback if there is no venue Wi-Fi: mock mode plus the backup video (decision 19 also has Telegram Web on the laptop as the live fallback).

**Timing**

- [ ] Rehearse the 60 seconds with a stopwatch at least three times with the same two people; write the final times here: ____ ____ ____

## 3. The 90-second backup video

A human records this (the AI cannot). It is for the case where the laptop, the projector or the venue network fails, and it should be playable with no internet. Record it before the code freeze and save it in three places (laptop, USB stick, phone).

**Recording set-up:** 1080p screen recording of the laptop with the page at 125% zoom or more; Wi-Fi off and the airplane icon visible in shot 2; a clear voice-over recorded separately or live; captions burned in (the room may have no sound). No real phone numbers, no real names, no bot token in shot. Use "Mum" or "Ah Ma" as the senior and "Wei Jie" as the guardian, as in the design.

| Shot | Time | On screen | Voice-over | Notes |
| --- | --- | --- | --- | --- |
| 1 | 0:00 to 0:10 | Title card: "Scams cost Singapore S$913.1 million in 2025" with the source in small type: SPF Annual Scam and Cybercrime Brief 2025, reported by Malay Mail, 26 Feb 2026 | "Scams cost Singapore S$913.1 million in 2025. Our app protects seniors at three moments: before they answer, during the scam, and before money moves." | The figure and source are in the shared brief and the poster headline (decision 11). Use no other statistic unless the Researcher confirms it |
| 2 | 0:10 to 0:20 | Laptop with Wi-Fi off (airplane icon visible); double-click `index.html`; the empty Scam Check page opens | "This works with no internet. The checking happens on the device, and the message never leaves it." | Shows the offline claim. In the demo the engine is in the page itself, so this is literally true; in the product, the on-phone model |
| 3 | 0:20 to 0:42 | Paste message 1, press Check; hold on "High risk" and the reasons; point at the reminder line | Same as the live script, row 2 | Slow down; hold the result 3 seconds so captions can be read |
| 4 | 0:42 to 0:57 | Clear; paste message 2; "Check with family" | "A first-stage message with no money yet is 'Check with family'. Three levels, not on or off." | |
| 5 | 0:57 to 1:07 | Clear; paste message 3; "No warning signs found" | "A normal family message shows no warning signs. We never say 'safe'." | |
| 6 | 1:07 to 1:20 | Optional, only if the alert passed its test: the Guardian Alert page, "Simulate unknown call", then the guardian's phone showing the message | "And before she answers: an unknown number rings, the call is silenced, never blocked, and her guardian gets a message." | If not recorded, extend shots 3 to 5 by 3 seconds each and end at 1:20 |
| 7 | 1:20 to 1:30 | The three levels on screen, then the honest line as a caption | "This is a simplified demo: on 15 messages our team wrote with AI assistance it rated all 15 as expected. Real-world accuracy is not yet measured." | Use decision 20's words exactly; no percentage |

**After recording (a human checks):**

- [ ] Plays from the USB stick with no internet; captions readable; no token, no real number, no real name on screen.
- [ ] Length 90 seconds or less (the pitch has 10 minutes in total).
- [ ] Spoken text matches decision 20's wording exactly.
- [ ] File name includes the date, for example `silverguard-demo-backup-2026-11-04.mp4`.
- [ ] The Speaker who presents knows where to click play and has watched it once on the pitch laptop.
