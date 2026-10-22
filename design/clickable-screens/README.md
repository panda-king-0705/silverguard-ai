# Clickable screens (backlog item D5)

> Draft prepared with AI assistance for the Designer; to be reviewed and edited by the team.

`index.html` is a click-through prototype of SilverGuard AI inside a phone frame (390 × 844 screen). It is one self-contained file: no CDNs, web fonts, images or network requests, so it works offline. Open it in Chrome, Edge, Safari or Firefox.

## Screens

| # | Screen | What it shows | Buttons lead to |
| --- | --- | --- | --- |
| 1 | Senior home | Two very large buttons, "Is this really them?" (Pause & Verify) and "Check a message" (Scam Check); small line "Guardian: Wei Jie" | 2, 3 |
| 2 | Pause & Verify | Three questions, one at a time, with big Yes / No buttons and "Read aloud". Any Yes turns into one big "Call Wei Jie now" button showing his saved number, masked (+65 •••• 4821). Three No answers show "No warning signs found", never "safe" | Calling state, home |
| 3 | Scam Check result | "High risk" in words, with a warning icon and red (never colour alone); three reasons; "Call Wei Jie"; "Report to ScamShield" (text only, no logo); "This stayed on your phone" | Calling state; an explanation sheet for ScamShield |
| 4 | Family Drill | Practice incoming call, labelled "Practice call" and "This is not a real call", with the script the senior hears; "Is this really them?" and "Hang up" | 5 (both buttons) |
| 5 | Drill debrief | "Well done for pausing", which button they chose, the four red flags, "3 drills this month" | 1 (Done), 4 (Practise again) |
| 6 | Guardian's phone | Generic notification and chat bubble from SilverGuard: "Unknown number rang Mum at 10:42. She can still answer. Please call her before any money moves." with "Call Mum" | Calling state, 1 |

A shared **calling** state ("Calling Wei Jie…" or "Calling Mum…", with "Prototype: no real call is made.") stands in for the phone dialler, and "End call" returns to where you came from.

## Flows to demo

1. **Pause & Verify:** 1 → "Is this really them?" → answer No, No, Yes → "Call Wei Jie now" → calling → End call → home.
2. **Scam Check:** 1 → "Check a message" → High risk + three reasons → "Call Wei Jie" or "Report to ScamShield".
3. **Family Drill:** picker 4 → "Is this really them?" or "Hang up" → debrief → Done.
4. **Guardian Alert:** picker 6 → "Call Mum". This pairs with the live Telegram alert demo (D4): show this screen as what the product sends, then trigger the real alert.

The flows follow `docs/prototype-design.md` (Feature flows). The prototype goes straight from "Check a message" to the result; the real app first receives a shared voice note or screenshot and shows "Checking. This stays on your phone."

## How to present it

- The screen picker (left, or above on a narrow window) jumps to any screen. Keys **1–6** do the same.
- **Fit phone to window** (on by default) scales the phone so it fits a 1366 × 768 projector. Untick it to show actual size.
- The language buttons (EN / 中文 / Melayu / தமிழ்) switch screens 1–5. Screen 6 stays in English because it is the guardian's phone.
- "Read aloud" uses the browser's built-in speech voices. Whether Chinese, Malay or Tamil voices exist depends on the laptop; if none exists, the screen says so. Test on the pitch laptop beforehand. In the real app every prompt is spoken automatically.
- Suggested script line: "Every screen has one job and at most two big choices. Nothing on these screens leaves Mum's phone except the alert to Wei Jie."

## Accessibility choices

| Requirement | What the prototype does | How it was checked |
| --- | --- | --- |
| Body text ≥ 20px | Phone text is 20–34px (base 22px); smallest is 20px | Browser check measures every visible text node in every screen, state and language |
| Primary buttons ≥ 64px | Every button inside the phone is at least 64px tall; home buttons are at least 220px, Yes/No 110px, "Call Wei Jie now" 140px | Browser check measures every visible button (layout height) |
| Contrast ≥ 4.5:1 | Lowest text pair is 6.54:1 (white on hang-up red) | Token check (table below) and a computed-style check of every visible text node |
| Not colour alone | Risk level is the words "High risk" plus a warning icon plus red; flags use a flag icon; Yes/No are words | Visual review |
| Visible keyboard focus | 4px blue ring (#0B4FD6) with 3px offset; yellow (#FFD24A) on the dark practice-call screen; ring contrast at least 5.56:1 against every background | Browser check reads the focus outline |
| Keyboard reachable | All controls are real `<button>`s in a logical order; focus moves to each new screen's heading; Enter and Space work | Browser check tabs to both home buttons and presses Enter |
| Reduced motion | Screen fade-in and ringing pulse are switched off under `prefers-reduced-motion` | Browser check with reduced motion emulated |
| Screen readers | `lang` set per screen (en, zh-Hans, ms, ta), headings on every screen, decorative icons hidden, a live caption announces the screen | Code review only. **Not yet tested with TalkBack or VoiceOver** |
| Font | System fonts only, with fallbacks for Chinese and Tamil script | |

Contrast of the colour pairs (WCAG relative-luminance formula, output of `checks/check_static.py`):

| Pair | Used for | Ratio |
| --- | --- | --- |
| #1C1E21 on #FFFBF4 | Body text | 16.19:1 |
| #4B5058 on #FFFBF4 | Secondary text | 7.87:1 |
| White on #0E4F54 (teal) | Pause & Verify, Done | 9.27:1 |
| White on #2F3B73 (indigo) | Check a message | 10.53:1 |
| White on #17643A (green) | Call buttons | 7.19:1 |
| White on #1C1E21 | Yes, OK | 16.71:1 |
| #8E1B13 on #FBE9E7 | High risk card, red flags | 7.73:1 |
| White on #B3261E (red) | Hang up, End call | 6.54:1 |
| #1C1E21 on #F2C14E (amber) | "Practice call" label, drill pause button | 9.95:1 |
| White on #14232B | Practice call text | 16.09:1 |
| #C9D3D9 on #14232B | Practice call secondary text | 10.58:1 |
| #1D5E33 on #E7F3EA | No warning signs card | 6.81:1 |
| #1D5E33 on #FFFBF4 | "This stayed on your phone" | 7.54:1 |
| White on #2E3A46 | Messaging header | 11.60:1 |
| #1C1E21 on #E9ECEF | Chat text | 14.09:1 |
| #4B5058 on #E9ECEF | Chat secondary text | 6.84:1 |
| #4B5058 on white | Notification text, bubble time | 8.12:1 |
| #1C1E21 / #4B5058 on #EFE8DC | Presenter page text / notes | 13.72:1 / 6.67:1 |
| Focus #0B4FD6 on screen, page, chat backgrounds | Focus ring (needs 3:1) | 6.56 / 5.56 / 5.71:1 |
| Focus #FFD24A on #14232B | Focus ring on dark screens (needs 3:1) | 11.16:1 |

Visual direction: warm off-white and sand backgrounds, deep teal and indigo for the two main actions, green only for calling family, red only for danger and hang-up, amber only for "practice". There are no illustrations or mascots, so it reads as calm and adult rather than childish.

## Translation caveat (must do before the pitch)

**The Chinese (Simplified), Malay and Tamil strings are AI drafts. A native speaker must check every one before the pitch.** The page says so beside the language buttons.

- All strings are in the `I18N` object near the end of `index.html` (58 keys per language). Give the checker that block, or the four-language list shown on screen.
- Points to check: tone for an older reader (polite but not stiff); whether "Pause & Verify" and "Scam Check" should be translated or kept as English feature names; the Chinese Yes/No ("有 / 是", "没有 / 不是") cover both "did they…" and "are they…" questions, so a native speaker should choose the most natural pair; Tamil and Malay length (both make the Scam Check and debrief screens scroll, and the action bar stays pinned so the buttons are always visible).
- Names are not translated: "Wei Jie" appears as saved in the senior's contacts.
- Dialects (Hokkien, Teochew, Cantonese) are not covered; the design doc limits dialect audio to drills.

## Sample data and limits

- "Wei Jie", "Mum", the masked numbers (+65 •••• 4821, +65 •••• 3307), the 10:42 time and "3 drills this month" are made-up sample data, not real people or results.
- Nothing is analysed. The Scam Check result is a fixed example; the working rules engine is D2 (Dev 1).
- "Report to ScamShield" shows an explanation instead of linking out. No third-party logos or brand UI are drawn. Screen 6 is a generic messaging app, deliberately not styled like WhatsApp or Telegram.

## Checks (rerun after any edit)

```
python3 checks/check_static.py     # target ids, translation keys, no external resources, contrast
python3 checks/check_browser.py    # click-through flows, language toggle, sizes, contrast, keyboard, reduced motion, offline
```

`check_browser.py` uses the Playwright and Chromium already installed on the build machine and downloads nothing. Last run (23 Oct 2026): both PASS. That covers 67 id references with 0 missing; all 58 keys present in 4 languages; 0 external requests and 0 JavaScript errors; every flow above clicked through; and minimum text 20px, minimum button 64px and minimum computed contrast 6.54:1 across 10 screen states × 4 languages.

## Decisions for the team

- [ ] Native-speaker review of the zh, ms and ta strings (who, and by when?).
- [ ] Keep the feature names "Pause & Verify" and "Scam Check" in English inside other languages, or translate them?
- [ ] Should "Hang up" in the drill also count as a good outcome? The draft praises both responses.
- [ ] Use the real teammate's name instead of "Wei Jie" for the live demo?
- [ ] Try the screens with 2–3 grandparents (V2) and note where they hesitate.
