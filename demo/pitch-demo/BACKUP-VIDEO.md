> Draft prepared with AI assistance for Dev 1; to be reviewed and edited by the team.

# Backup video of the demo (milestone DEV-4)

**File:** `demo/pitch-demo/backup-video.mp4`: 83 s, 1366×768, H.264 (High profile), yuv420p, 25 fps, faststart, no sound, about 1.6 MB. Plays offline in any browser or video player.

**Honesty line (say it if you play the video):** "This is the recorded run: an automated recording of our mock demo, with no network. The alert is simulated; nothing was sent." The video says the same on its title card, in a corner tag on every frame ("Recorded run — mock alert, no network") and on its end card. It was recorded by a script driving the demo pages, not by a person, and nothing in it is a live Telegram message (decision 26).

## What it shows, in the pitch script's order

Timestamps checked frame by frame (one frame a second) on 6 Nov 2026.

| Time | Beat in `docs/pitch/pitch-script.md` | On screen | Caption |
| --- | --- | --- | --- |
| 0:00–0:06 | Title | Title card | "SilverGuard AI: demo backup. Recorded run of the offline demo… Mock mode: no alert is really sent. No network." |
| 0:06–0:30 | **Beat 6, Guardian Alert** (`demo/guardian-alert/index.html`) | 0:11 "Simulate unknown call" pressed; phone shows Unknown number +65 9XXX XX67, "Ring silenced. You can still answer.", "Marcus has been told."; 0:12 panel shows "Mock mode: no real message was sent" and the alert text "Unknown number +65 9XXX XX67 rang Mum at 10:42…" | "Layer 1, before she answers…", "The ring is silenced, never blocked…", "Guardian Marcus is alerted (mock alert: nothing was sent).", "…Design target: under 10 s (not yet measured live)." |
| 0:30–0:59 | **Beat 7, Scam Check** (`demo/scam-check-web/index.html`) | 0:34–0:41 message S04 typed in ("Ah Ma, my phone spoil…"); 0:42 **High risk** with 4 reasons, the phrases noticed and the reminder | "Layer 2, during the scam…", "It reads the scam script, not the voice…", "High risk, with plain reasons…", "It never says "safe"…", "Works offline; in the app the message never leaves her phone." |
| 0:59–1:20 | **Beat 8, Pause & Verify** (`design/clickable-screens/index.html`, opened read-only) | Home screen; 1:03 key 2: question 1 of 3; answers No, No, Yes; 1:13 "Stop. Call Marcus first." and "Call Marcus now, saved number +65 •••• 4821" | "Pause & Verify: one button…", "Three questions, read aloud…", "Any yes: one big button. It calls Marcus's saved number, never the caller's." |
| 1:20–1:23 | End | End card | "This was a recorded run of the mock demo. Automated recording, no network. The alert was simulated: nothing was sent. Scam Check is a simplified rules demo: 15/15 on a 15-message test set our team wrote with AI assistance. Real-world accuracy is not yet measured." |

Not in the video: Family Drill (beat 8's second half), Layer 3 (design only) and the "Check with family" / "No warning signs found" contrast. Add them by re-recording if the team wants them.

**Things a viewer might notice:**

- The phone clocks show **10:42** because the recording fixes the page clock to 10:42 Singapore time to match the script's illustration. Nothing else is faked: the mock alert's 0.6 s delay is the page's real timer.
- Messages are typed at a steady speed rather than pasted, so the audience can follow.
- The clickable screens show their own "Draft prepared with AI assistance" note at the top; that is the Designer's page as it is.

Still frames used for the check are in `backup-stills/` (6 small JPEGs, about 180 KB in total; delete them if not wanted).

## How to re-record

Re-record after any change to `engine.js`, the alert page, the clickable screens or the captions.

1. Needs Node 18+, Playwright with Chromium already installed, and ffmpeg. If `require('playwright')` fails, run with `NODE_PATH="$(npm root -g)"`.
2. From the repo root: `node demo/pitch-demo/record-backup.js` (about 2 minutes). It overwrites `backup-video.mp4` and prints approximate beat times. They can run up to about 3 s early, so check them against the video and update the table above.
3. It exits with an error if any page error happens or any network request is attempted (all are blocked).
4. Captions and title text are in `record-backup.js` (search for `caption:`). They are injected while recording only; no demo file is changed. Keep decision 20's wording for the accuracy line.
5. Check: `ffprobe backup-video.mp4` shows h264 and about 80–90 s; watch it once, full screen, on the pitch laptop.

## Before the pitch (a human)

- [ ] Watch it once on the pitch laptop, full screen, with Wi-Fi off.
- [ ] Copy it to the laptop's disk, the USB stick and a phone (`PITCH-DEMO.md` section 2).
- [ ] Decide who presses play, and at which point (beat 6 starts at 0:06, beat 7 at 0:30, beat 8 at 0:59).
- [ ] Decide whether you also want the human-recorded, narrated version described in `../scam-check-web/PITCH-DEMO.md` section 3. This automated one has no voice.
