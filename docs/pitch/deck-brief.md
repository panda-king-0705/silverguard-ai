# Pitch deck content brief (milestone PO-4, decision 23, issue #21)

> Draft prepared with AI assistance for the Product Owner; to be reviewed and edited by the team.

6 Nov 2026 · For the teammate who builds the pitch deck (decision 23: a teammate builds the deck; the AI writes this brief and later reviews the uploaded deck). One section per slide, in the beat order of [`pitch-script.md`](pitch-script.md) (run sheet updated 6 Nov, 9:42 with demo actions). Speakers are A to F; real names are never used. Personas: senior = "Ah Ma" / "Mum", guardian = **Marcus**.

**How to read each section.** *Headline* is the slide title, word for word. *On screen* describes the visual. *Figures* are the only numbers allowed on that slide, each with its source tag and URL. Tags refer to [`docs/research/source-library-v2.md`](../research/source-library-v2.md) (A1, B2 and so on) or to [`market-and-revenue.md`](market-and-revenue.md) (MR). Repo files are public at https://github.com/panda-king-0705/silverguard-ai. *Not on this slide* lists what the speaker says but the slide must not show.

**Decisions for the humans (the AI has not made these):**

- [ ] Slide count. This brief has 14 slides for 14 beats plus 2 backup slides. Merging beats 1 and 2, or 11 and 12, is fine if the speakers agree; keep the beat order.
- [ ] Colour scheme and typeface. Suggest reusing the poster's, so the deck and poster look like one project (the poster belongs to a teammate, decision 22; ask them).
- [ ] Whether the deck runs on the same laptop as the demos (recommended: yes, so the "switch to browser" moments are one keyboard shortcut).
- [ ] The QR code target on the close slide (repo, a demo page or nothing).

---

## Slide 1: Hook

- **Beat / speaker / time:** beat 1, Speaker A, 0:00 to 0:32.
- **Headline:** "10:42 on a weekday morning"
- **On screen:** a simple drawn phone (generic outline, no brand) showing an incoming call: "Unknown number" and the time 10:42. A small label in the corner: "Illustration". Below the phone, in smaller type: "A real case: bank staff stopped a grandmother's transfer after a suspected voice-clone call (Canada, 2025)."
- **Figures:** none apart from the clock time (part of the illustration, not a statistic). Source line for the real case: CBC News, 20 Mar 2025 [A9] https://www.cbc.ca/lite/story/1.7486437
- **Not on this slide:** a photo of a real senior or of the CBC grandmother; the CBC logo; the word "deepfake" in large type; any statistic (they come on slide 2).

## Slide 2: The scale

- **Beat / speaker / time:** beat 2, Speaker A, 0:32 to 0:51.
- **Headline:** "Scams cost Singapore S$913.1 million in 2025"
- **On screen:** one giant number, S$913.1 million, with "37,308 cases" underneath in about half the size. Plain background.
- **Figures:** S$913.1 million and 37,308 cases in 2025 [B2] SPF Annual Scam and Cybercrime Brief 2025, https://www.police.gov.sg/-/media/SPF/Advisories/Scams/Annual-Scam-and-Cybercrime-Brief-2025.pdf
- **Not on this slide:** "about S$2.5 million a day" (the speaker says it; it is a calculation, not a published figure); the 19% fall; the SPF crest or logo; any line linking these numbers to voice cloning (SPF briefs never mention voice cloning).

## Slide 3: Fewer cases, bigger losses

- **Beat / speaker / time:** beat 3, Speaker B, 0:51 to 1:38.
- **Headline:** "Fewer cases, bigger losses"
- **On screen:** two side-by-side panels. Left, a falling arrow: "Fake-friend call scams: 4,179 (2024) → 1,551 (2025)". Right, a rising arrow: "Average loss per senior victim (65+): S$37,053 (2025) → S$42,347 (H1 2026)". A small line under both: "Seniors 65+: 14.8% of 2025 victims". If a chart is wanted, use two tiny two-bar charts, one per panel; do not put the two panels on one axis (different units).
- **Figures:**
  - 4,179 and 1,551 fake-friend call scams; 14.8% of victims; S$37,053 average loss [B2] https://www.police.gov.sg/-/media/SPF/Advisories/Scams/Annual-Scam-and-Cybercrime-Brief-2025.pdf
  - S$42,347 average loss, H1 2026 [B3] https://www.police.gov.sg/-/media/SPF/Media-Room/Statistics/Mid-Year-Scam-and-Cybercrime-Brief-2026/Mid-Year-Scam-and-Cybercrime-Brief-2026.pdf
- **Not on this slide:** "seniors were the only age group whose victim numbers rose" (spoken only; its MHA source is not in the source library or MR yet); a bar chart comparing age groups (the repo has no other groups' figures); the 2024 share of 8.4%; any mention of voice cloning next to SPF figures.

## Slide 4: Why not just detect the voice?

- **Beat / speaker / time:** beat 4, Speaker C, 1:38 to 2:23.
- **Headline:** "We read the script, not the voice"
- **On screen:** three numbered icons in a row, each with three to five words: (1) an ear with a question mark: "People can't tell by ear"; (2) a lab flask versus a phone: "Detectors fail on real-world audio"; (3) a padlock over a phone: "Apps can't capture call audio". Below them, four plain chips: "money · secrecy · new number · urgency".
- **Figures:** "up to one thousand percent" worse on real-world audio, optional, as a small quote under icon 2 [B8] Müller et al. 2022, https://doi.org/10.21437/Interspeech.2022-108. Small source line for the others: GovTech 2024 [A1] https://www.tech.gov.sg/technews/ai-scams-are-everywhere-so-heres-how-you-can-outsmart-them/ ; Barrington et al. 2025 [A10] https://doi.org/10.1038/s41598-025-94170-3 ; The Register 2022 [B6] https://www.theregister.com/2022/04/22/google_banning_thirdparty_callrecording_apps/
- **Not on this slide:** "about 80%" for listeners fooled (not verified; the speaker says "often"); "10 times worse"; any claim that SPF reports voice cloning; Google Play or Android logos.

## Slide 5: Three layers, AI on the phone

- **Beat / speaker / time:** beat 5, Speaker D, 2:23 to 2:51.
- **Headline:** "Three layers of protection"
- **On screen:** a left-to-right timeline with three blocks: "Before she answers: Guardian Alert", "During the scam: Pause & Verify · Scam Check · Family Drill", "Before money moves: bank cooling-off check (later)". Under it, a band with a phone outline: "AI runs on Ah Ma's phone. Audio, screenshots and chat text never leave it." Optional: the persona pair, drawn not photographed: Ah Ma (senior) and Marcus (guardian).
- **Figures:** none. Source line: SilverGuard design document [DES], https://github.com/panda-king-0705/silverguard-ai (docs/prototype-design.md).
- **Not on this slide:** feature descriptions in sentences (the next three slides cover them); "voice-clone detector"; "safe".

## Slide 6: Layer 1 demo, Guardian Alert (SWITCH TO BROWSER)

- **Beat / speaker / time:** beat 6, Speaker D (laptop) and Speaker F (reads the alert), 2:51 to 3:38, including about 12 s waiting for the alert.
- **Headline:** "Layer 1: Guardian Alert"
- **On screen (slide, shown for 2 to 3 seconds before the switch and again after):** a simple diagram: unknown number → phone silenced, "never blocked" → message to Marcus. One caption: "Design target: guardian alerted in under 10 seconds (not yet measured)".
- **Switch to browser:** combined demo page `demo/pitch-demo/index.html` (decision 28). If the automatic real-call alert passed its test (decision 27), a teammate rings the senior phone instead. **Mock mode is the default** (decision 26: the bot is not set up yet). Live alert and real phone only if a human has passed the 5/5 test (and, for a real phone, the instructor approved). Fallbacks in order: Mock mode, clickable screen 6, the backup video ("this is the recorded run").
- **Figures:** under 10 seconds is a design target [MR section 5, from DES] https://github.com/panda-king-0705/silverguard-ai (docs/pitch/market-and-revenue.md). Android can silence but not forward calls [B11] https://developer.android.com/develop/connectivity/telecom/dialer-app/screen-calls
- **Not on this slide:** a screenshot of a messaging app's chat UI or its logo (use the generic demo page); the bot token or chat ID, ever; a real phone number (use a masked one such as "+65 •••• 4321"); "blocks scam calls".

## Slide 7: Layer 2 demo, Scam Check (SWITCH TO BROWSER)

- **Beat / speaker / time:** beat 7, Speaker E, 3:38 to 4:35, including about 10 s to paste and read.
- **Headline:** "Layer 2: Scam Check"
- **On screen (before the switch):** the three result levels as three large coloured labels, left to right: **High risk**, **Check with family**, **No warning signs found**. No fourth level. **After the demo (return slide):** the same three labels plus one honest line: "Demo: simplified word rules. Product: a trained model on the phone."
- **Switch to browser:** the same combined demo page, Scam Check panel (works offline). Paste message S04 ("Ah Ma, my phone spoil..."), expected **High risk**. Fallbacks: clickable screen 3, then the backup video.
- **Figures:** none on the slide. The accuracy line (15 out of 15 on a 15-message test set our team wrote with AI assistance; real-world accuracy not yet measured, decision 20) is spoken, not shown, because its source is the demo README rather than MR or the source library.
- **Not on this slide:** "safe", "accurate", "catch rate" or any percentage; a screenshot of a real chat app (the demo page is generic and fine); the word "detects cloned voices".

## Slide 8: Pause & Verify and Family Drill (SWITCH TO BROWSER)

- **Beat / speaker / time:** beat 8, Speaker F, 4:35 to 5:28, including about 8 s of clicking.
- **Headline:** "Pause, ask, call Marcus"
- **On screen (before the switch, 2 to 3 seconds):** the button text "Is this really them?" and three short questions as a checklist: "Asked for money?", "Urgent or secret?", "New number?". Small label: "English · Mandarin · Malay · Tamil".
- **Switch to browser:** clickable screens `design/clickable-screens/index.html`, English, "Fit phone to window" on. Key 2 (Pause & Verify: No, No, Yes, then "Call Marcus now"), then keys 4 and 5 (practice call, debrief).
- **Figures:** none. Source line: [DES] https://github.com/panda-king-0705/silverguard-ai (docs/prototype-design.md).
- **Not on this slide:** a cloned family voice or the claim that drills use one (version 1 uses stock actor voices); any screen showing the guardian viewing Ah Ma's screen (removed, decision 17).

## Slide 9: Layer 3, before money moves

- **Beat / speaker / time:** beat 9, Speaker D, 5:28 to 5:54.
- **Headline:** "Layer 3: before money moves"
- **On screen:** the architecture diagram `docs/diagrams/architecture.png`, cropped to the bank-signal part, or a three-box flow: "High risk check" → "signal to the bank, 24 hours, no message content" → "the bank decides". A corner tag: "Designed, not built".
- **Figures:** 24-hour signal [MR section 3, from DES] https://github.com/panda-king-0705/silverguard-ai (docs/pitch/market-and-revenue.md).
- **Not on this slide:** any bank's name, logo or app screen; "partner bank" as if one had signed.

## Slide 10: Why it works

- **Beat / speaker / time:** beat 10, Speaker C, 5:54 to 6:52.
- **Headline:** "Why it works"
- **On screen:** four short rows, each with an icon: "Scripts don't change when voices improve" · "On the phone: works offline, nothing uploaded" · "Covers calls a blocker can't see" · "Ah Ma chooses her guardian, and can remove him". Small source line.
- **Figures:** none. Source line: ASVspoof 5 [B10] https://doi.org/10.1016/j.csl.2025.101825 ; Google Scam Detection [B5] https://support.google.com/phoneapp/answer/15654065?hl=en ; ScamShield help page [B12] https://ask.gov.sg/scamshield/questions/clhpq3amk0008l2087522usmq ; Ang & Malhotra 2022 [B7] https://doi.org/10.1016/j.socscimed.2022.114996
- **Not on this slide:** the ScamShield, Google or Pixel logo or app screens; "ScamShield doesn't work" (we complement it); the full independence study finding (the speaker says it).

## Slide 11: Who uses, who pays, who partners

- **Beat / speaker / time:** beat 11, Speaker B, 6:52 to 7:39.
- **Headline:** "Who uses it, who pays, who partners"
- **On screen:** three columns with one drawn icon each. Uses: "Seniors · 20.7% of citizens are 65+". Pays: "Their adult children · 2.9 working-age citizens per senior". Partners: "Telcos and banks". One small line under the columns: "89% of residents aged 60+ owned a smartphone (2022)".
- **Figures:**
  - 20.7% of citizens 65+ (June 2025); 13.1% in 2015 (optional); 2.9 working-age citizens per senior [B4] https://www.strategygroup.gov.sg/files/population_in_brief_2025.pdf
  - 89% of residents aged 60+ owned a smartphone in 2022 [MR, IMDA] https://www.imda.gov.sg/-/media/imda/files/infocomm-media-landscape/research-and-statistics/singapore-digital-society-report/singapore-digital-society-report-2023.pdf (label "60+", not "65+"; not yet in the source library, Researcher to add)
  - Optional, small: US fraud losses with generative AI US$12.3B (2023) to US$40B (2027), labelled "US figure" [B1] https://www.deloitte.com/us/en/insights/industry/financial-services/deepfake-banking-fraud-risk-on-the-rise.html
- **Not on this slide:** a TAM/SAM/SOM figure (none exists); telco or bank logos; any partner named as if signed.

## Slide 12: How we earn

- **Beat / speaker / time:** beat 12, Speaker F, 7:39 to 8:14.
- **Headline:** "Start with the family, scale with partners"
- **On screen:** a big "S$8 a month per parent" in a single box labelled "Family plan (now)". To its right, a smaller grey box: "Bank and telco partner fees (later; none signed)". Under the boxes: "About 5,100 paid subscriptions cover our average monthly spend". Bottom line in small type: "Willingness to pay not yet tested; the pilot uses vouchers."
- **Figures:**
  - S$8 a month per parent [MR, decision 24] https://github.com/panda-king-0705/silverguard-ai (docs/pitch/market-and-revenue.md, section 3)
  - About 5,100 paid subscriptions (one per parent) (5,121 = S$40,961.13 ÷ S$8, rounded up; before payment fees, partner shares and cancellations) [MR scale table, from budget-v2] same URL
- **Not on this slide:** the S$5 and S$10 comparison prices; partner fee amounts (not set); what is free versus paid (not decided); "5,100 customers" or any forecast; a revenue chart.

## Slide 13: The ask

- **Beat / speaker / time:** beat 13, Speaker E, 8:14 to 9:14.
- **Headline:** "S$500,000 for 12 months"
- **On screen:** left half, a horizontal stacked bar (not a pie) of the use of funds with seven labelled segments: team 61%, design and co-design 9%, language and voice data 6%, pilot 6%, security and privacy 5%, contingency 9%, infrastructure and buffer 3%. Right half, the milestone strip from `docs/diagrams/mvp-timeline.png` or three boxes: "Month 4: pilot-ready Android app" → "Months 4–10: pilot, 200 households" → "Month 12: results against the gate". Small footnote: "Percentages rounded; about 12% of the budget still rests on vendor quotes."
- **Figures:** S$500,000; S$491,533.60 budget (optional, small); the seven percentages; months 4, 4–10 and 12; 200 households; about 12% (11.9%, S$58,300) on vendor quotes [MR sections 4 and 5, from budget-v2 and decision 13] https://github.com/panda-king-0705/silverguard-ai (docs/pitch/market-and-revenue.md)
- **Not on this slide:** any equity percentage, valuation, SAFE, convertible note or other instrument (decision 25); gate thresholds (not set); "first partner pilot" as a promise (team undecided); the full budget table.

## Slide 14: Close

- **Beat / speaker / time:** beat 14, Speaker A, 9:14 to 9:42, then hand over to Q&A.
- **Headline:** "Put the pause in Ah Ma's hand"
- **On screen:** project name "SilverGuard AI", the line "S$500,000 · 200-household pilot · 12 months", and (if the team agrees) a QR code. Leave this slide up during Q&A.
- **Figures:** S$500,000, 200 households, 12 months [MR] https://github.com/panda-king-0705/silverguard-ai (docs/pitch/market-and-revenue.md)
- **Not on this slide:** new numbers; team members' real names unless the team chooses to show them; "safe".

---

## Backup slides (after the close; show only if asked)

### Backup A: Three risks

- **Use with:** Q&A, risk questions (qa-bank risks slide, B3).
- **Headline:** "Three risks, and what we do about each"
- **On screen:** the three-row table from [`qa-bank.md`](qa-bank.md) "Risks slide": accuracy, adoption, privacy, each with one short mitigation.
- **Figures:** 200-household pilot [MR]. Do **not** show 15/15 here (see slide 7).

### Backup B: Recorded run

- **Use with:** beats 6 to 8 if the laptop, the page or the projector fails (decision 26).
- **On screen:** the backup video (83 seconds, `demo/pitch-demo/backup-video.mp4`) embedded or linked to a local file, not a streaming link. Title card text: "This is the recorded run."

---

## Deck rules

1. **Words:** at most **25 words per slide**, not counting the source line. Headlines at most 8 words. If a sentence is needed, the speaker says it.
2. **Type size for a 1366 × 768 projector:** headline 40 pt or more; body 28 pt or more; nothing below 24 pt except the source line. Big numbers 72 pt or more. Use a plain sans-serif typeface and high contrast (dark text on light, or the reverse). Test the deck on the venue projector or any 1366 × 768 screen from the back of the room.
3. **Sources:** every number has a small source line on the same slide (12 to 14 pt, bottom left): short name plus year, for example "SPF Annual Brief 2025". Full URLs live in this brief and the script, not on the slide. A slide with no number needs no source line.
4. **Voice cloning and SPF:** never put a voice-clone claim next to an SPF source or logo. SPF briefs do not mention voice cloning (decision 21). Voice-clone evidence is GovTech [A1], CBC [A9] and the research papers.
5. **Never "safe".** The only result levels are High risk, Check with family, No warning signs found.
6. **Honest demo line:** wherever the Scam Check appears, the deck says or implies "simplified rules engine in the demo; the product would run a trained model on the phone". Call it a demo or prototype, never "our app".
7. **Personas:** senior = Ah Ma (or Mum); guardian = **Marcus**. No other names, and never teammates' real names in a scenario.
8. **No third-party logos or brand UI:** no logos or look-alike screens of messaging apps, banks, telcos, ScamShield, Google or SPF. Describe them in words; use the generic demo pages.
9. **No secrets on screen:** no bot token, chat ID or real phone number in any slide or screenshot.
10. **Price and terms:** S$8 a month per parent is the only price; "S$500,000 for 12 months" with use of funds is the only ask; no equity, valuation or instrument (decisions 24 and 25).
11. **Order:** slides follow the script beats 1 to 14. Mark slides 6, 7 and 8 in the speaker notes as "SWITCH TO BROWSER".

## Review checklist (the AI will use this when the deck is uploaded)

Answer each with yes or no. Any "no" goes back to the deck owner with the slide number.

1. Is there one slide (or one agreed merged slide) for each of the 14 beats, in script order?
2. Does each slide headline match this brief, or has the team recorded a change?
3. Is every slide at or under 25 words, not counting the source line?
4. Is all body text 24 pt or larger, and are headlines 40 pt or larger?
5. Is the deck readable at 1366 × 768 (checked on that resolution)?
6. Does every number on every slide appear in this brief's "Figures" for that slide?
7. Does every slide with a number carry a small source line?
8. Is "S$913.1 million" written exactly that way (not "S$913M" or "S$0.9B")?
9. Is "S$8 a month per parent" the only price shown?
10. Does the ask slide say "S$500,000 for 12 months" with no equity share, valuation or instrument?
11. Do the use-of-funds percentages match: 61, 9, 6, 6, 5, 9, 3?
12. Does the revenue slide say willingness to pay is untested (or the pilot uses vouchers)?
13. Is the word "safe" absent from every slide (other than in "never say safe" style notes, which should not be on slides)?
14. Are the three levels written exactly as High risk, Check with family, No warning signs found?
15. Is there no voice-clone claim attributed to SPF?
16. Is there no "about 80%" or other unverified figure (Barrington et al.)?
17. Is there no accuracy percentage or "catch rate" anywhere?
18. Does the Scam Check slide carry the honest demo line (simplified rules; product runs a trained model on the phone)?
19. Is the guardian called Marcus everywhere, and is no teammate's real name used in a scenario?
20. Are there no third-party logos or brand UI (messaging apps, banks, telcos, ScamShield, Google, SPF)?
21. Are there no tokens, chat IDs or real phone numbers in any slide or screenshot?
22. Are slides 6, 7 and 8 marked "SWITCH TO BROWSER" in the speaker notes, with the fallback order (Mock mode, clickable screens, backup video)?
23. Is the backup video slide (or file) present and does it work offline?
24. Is the 89% figure labelled "60+" (not 65+)?
25. Is the Deloitte figure labelled as a US figure, if shown?
26. Is the bank layer labelled as designed, not built, with no bank named?
27. Is there no photo of a real senior, real victim or real person presented as a scam victim?
28. Does slide 1 label the 10:42 story as an illustration?
