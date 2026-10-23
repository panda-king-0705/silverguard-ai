# Pitch script and run sheet (milestone PO-3, backlog R1, issue #21)

> Draft prepared with AI assistance for the Product Owner; to be reviewed and edited by the team.

23 Oct 2026 · For the 10-minute investor pitch at the Week 13 tutorial (week of Mon 9 Nov 2026) · Speakers are written A to F; the team assigns real people at kickoff.

## At a glance

| Check | Result | Target |
| --- | --- | --- |
| Spoken words | 1277 | none |
| Spoken time at 140 words per minute | **9:07** | 9:00 to 9:45 |
| Demo action time added (3 demos) | 0:30 | none |
| Total with demo actions | **9:37** | 9:00 to 9:45 (and under 10:00) |
| Slack left for handovers and nerves | 0:23 | at least 0:15 |
| Problem section (beats 1 to 4) | 2:23 | 2:00 to 3:00 |

The time comes from a script (a short Python script kept in the AI session scratchpad, not the repo). It strips the source tags, counts every word, and counts numbers as they are spoken ("37,308" is six words, "S$913.1 million" is eight). The two placeholders `[price: team to set]` and `[terms: team to set]` count as two words each. Handovers between speakers are assumed to take no time; the slack above is for them. **A stopwatch rehearsal (R3) replaces these estimates.**

## Decisions the humans must make before rehearsal

- [ ] **Who is Speaker A to F.** The cue cards below balance the load (words per speaker are in the timing section); swap beats if someone is more comfortable with the numbers or the demo.
- [ ] **Price and terms.** Beat 12 says `[price: team to set]` for the family plan; beat 13 says `[terms: team to set]` (what the S$500,000 buys: equity, convertible note or other). The AI did not invent either. See `market-and-revenue.md`.
- [ ] **Live phone alert (decision 19).** It needs the instructor's approval and the 5/5 live test (Sprint 2, before the Thu 5 Nov code freeze). If approval is refused or the test fails, use Telegram Web on the laptop.
- [ ] **"About 80%" figure.** The script says listeners "often" judged an AI clone to be the real person. The repo's problem-statement file cites about 80% to Barrington et al., but the AI could not read the number in the published abstract (it is an image on the page). Check the paper's results, then upgrade the sentence if you want the number (needs quote).
- [ ] **Vendor-quote line.** Beat 13 admits that about 12% of the budget still rests on vendor quotes. Keep it for honesty, or cut it (about 10 seconds) if time runs over.
- [ ] **Opening story.** Beat 1 is a labelled illustration, plus one real case (the CBC grandmother in Canada). Say if you would rather open with the S$913.1 million line.
- [ ] **Poster not final.** "Poster zone" refers to the wireframe in `design/poster-wireframe` (11 zones). Update the screen column after Poster v1 and v2 (P4, P5).
- [ ] **New source.** The 89% smartphone figure (IMDA) is not in `docs/research/source-library-v2.md`. The Researcher should add it and check IMDA's newer table (see "Numbers and sources").

## Run sheet

Time windows include demo action time. Source tags in square brackets (for example [B2]) are not spoken; they are explained in "Numbers and sources". *[demo action]* marks where the speaker stops talking and does the demo step.

| Time window | Beat | Speaker | On screen | Words to say | Words · spoken |
| --- | --- | --- | --- | --- | --- |
| 0:00 to 0:32 | 1. Hook: the 10:42 call (Problem) | A | Poster zone 1 (title and hook: "Scams cost Singapore S$913.1 million in 2025"). Laptop on the Scam Check tab, not yet shown. | It is 10:42 on a weekday morning. Ah Ma's phone rings: an unknown number. The voice is her grandson's, and he sounds frightened. He says it is urgent, he needs money, and she must not tell his parents. This is an illustration, but a version of it nearly cost a grandmother in Canada her savings. Bank staff stopped it, not her. [A9] We are SilverGuard AI, and we protect seniors at exactly this moment. | 74 · 0:32 |
| 0:32 to 0:51 | 2. The scale (Problem) | A | Poster zone 2 (three numbers): S$913.1 million, 37,308 cases. | Scams cost Singapore S$913.1 million in 2025, across 37,308 cases. [B2] That is about S$2.5 million every single day. So who loses the most per person? Not the young. Seniors. | 44 · 0:19 |
| 0:51 to 1:38 | 3. Seniors: fewer cases, bigger losses (Problem) | B | Poster zone 2 (seniors: 14.8%, S$37,053, S$42,347). Point at each number. | People aged 65 and above were 14.8% of victims in 2025, but they lost the most each: S$37,053 on average. [B2] In the first half of 2026 that average rose to S$42,347. [B3] You may ask: isn't the problem shrinking? Fake-friend call scams did fall, from 4,179 cases in 2024 to 1,551 in 2025. [B2] But look closer. Seniors were the only age group whose number of victims rose between 2024 and 2025. [MHA] Fewer cases, bigger losses: the harm is concentrating on seniors. | 110 · 0:47 |
| 1:38 to 2:23 | 4. Why not just detect the voice? (Problem) | C | Poster zone 3 (why today's defences miss it). | Scammers need only a short social-media clip to clone a voice, Singapore's GovTech warns. [A1] So why not build a deepfake detector? Three reasons. First, people cannot do it by ear: in a peer-reviewed study, listeners often judged an AI clone to be the real person. [A10] Second, detectors struggle outside the lab: researchers reported performance dropping by up to one thousand percent on real-world audio. [B8] Third, Google Play bars third-party apps from capturing call audio. [B6] And the scam works through pressure, time pressure and the wish to help family. [A8] So we do not hunt the voice. We read the script: money, secrecy, a new number, urgency. | 105 · 0:45 |
| 2:23 to 2:51 | 5. Three layers, AI on the phone (Features) | D | Poster zone 4 (three layers) and zone 6 (privacy line). Laptop: clickable screens, screen 1 (senior home). | In our story, Ah Ma is the senior and Wei Jie is her family guardian. SilverGuard AI is an Android app with three layers. Before she answers: Guardian Alert. During the scam: Pause and Verify, Scam Check and Family Drill. Before money moves: a cooling-off check with a partner bank. All the AI runs on Ah Ma's phone. Audio, screenshots and chat text never leave it. [DES] | 66 · 0:28 |
| 2:51 to 3:39 | 6. Layer 1 live demo: Guardian Alert (Features) | D + F | LIVE: Guardian Alert page (demo/guardian-alert/index.html) on the laptop; guardian phone held up by F (real phone if the instructor approves, else Telegram Web in a second window). Fallback: clickable screens, screen 6. | D: Layer one. A number that is not in her contacts calls. We silence the ring, we never block it, so she can always answer, and we alert her guardian, Wei Jie. Watch this phone. I press Simulate unknown call. *[demo action]* F (reading the phone): An unknown number rang Mum. She can still answer, and Wei Jie should call her before any money moves. D: Our design target is under 10 seconds. [DES] Android lets an app silence a call but not forward it, so a true transfer needs a telco partner. [B11] | 84 · 0:36 (+12 s wait for the message to arrive) |
| 3:39 to 4:32 | 7. Layer 2 live demo: Scam Check (Features) | E | LIVE: Scam Check page (demo/scam-check-web/index.html). Paste message S04 (Ah Ma, my phone spoil...). Result card: High risk and reasons. Fallback: clickable screens, screen 3. | Layer two. Ah Ma gets a message and is not sure. She shares it with SilverGuard; here I paste it. *[demo action]* High risk, with plain reasons: it asks for money, it says do not tell anyone, it comes from a new number, and it is urgent. We never tell her a message is safe. The levels are High risk, Check with family, and No warning signs found. It scored 15 out of 15 on a 15-message test set we wrote ourselves; real-world accuracy is not yet measured. [SC] This page works offline, and in the app the message never leaves her phone. | 100 · 0:43 (+10 s paste and read result) |
| 4:32 to 5:26 | 8. Layer 2: Pause & Verify and Family Drill (Features) | F | Clickable screens (design/clickable-screens/index.html): keys 2 (Pause & Verify, answer No, No, Yes, then Call Wei Jie now), 4 then 5 (practice call, debrief). | Also in layer two: Pause and Verify. One button: "Is this really them?" It asks three questions aloud. Did they ask for money? Did they say it is urgent or secret? Are they calling from a new number? Any yes turns the screen into one big button, Call Wei Jie now, which dials his saved number, never the caller's. Then Family Drill: practice scam calls, clearly marked as not real, and a debrief that praises the pause. Wei Jie sees alerts and drill progress, never Ah Ma's screen. Every screen has one job and at most two big choices. It works in English, Mandarin, Malay and Tamil. [DES] | 107 · 0:46 (+8 s clicking through the screens) |
| 5:26 to 5:52 | 9. Layer 3: before money moves (Features) | D | Poster zone 4 (layer 3) or docs/diagrams/architecture.png. No live demo: design only. | Layer three, before money moves. The senior links SilverGuard inside the bank's own app. After a High risk check, we send the bank a signal that lasts 24 hours, with no message content. The bank decides whether to add a check, such as holding a first transfer to a new payee. This layer comes later; today we have designed the interface. [DES] | 61 · 0:26 |
| 5:52 to 6:49 | 10. Why it works (Why it works) | C | Poster zone 5 (how the AI decides: cue chips) and zone 6 (privacy line). | Why does this work? Because it matches how scams and families work. Reading the script keeps working as voice clones improve, because voice detection stays an arms race. [B10] Running on the phone means it works offline and nothing private is uploaded. Google's Pixel already shows that on-device scam detection with no audio stored or sent is possible, [B5] but only on Pixel phones, so we build for Android 10 and above. ScamShield cannot block scam calls made over WhatsApp or Telegram, [B12] so the family has to be the check. And we ask little of a senior: press one button, call one person. We also protect independence. A Singapore study found that more support from children can lower older women's quality of life, [B7] so Ah Ma chooses her guardian and can remove him at any time. [DES] | 134 · 0:57 |
| 6:49 to 7:35 | 11. Who uses, who pays, who partners (Business and ask) | B | Poster zone 7 (business case): market line with 20.7%, 2.9, S$913.1M. | Who uses it? Seniors. 20.7% of Singapore citizens were 65 or older in June 2025, up from 13.1% in 2015, [B4] and 89% of residents aged 60 and above owned a smartphone in 2022. [IMDA] Who pays? Their adult children: there are only 2.9 working-age citizens for each senior. [B4] Who partners? Telcos can transfer a call and banks can slow a payment. Deloitte expects generative AI to push US fraud losses from US$12.3 billion in 2023 to US$40 billion by 2027, [B1] which is a business case for banks. | 107 · 0:46 |
| 7:35 to 8:09 | 12. How we earn (Business and ask) | F | Poster zone 7 (revenue line: family plan first, partners later). | How do we earn? We start with a family plan: the adult child pays [price: team to set] a month per parent for guardian alerts, drills and the dashboard. We start there because the family feels the pain today and no partner has to sign first. No partner has signed yet. Once they do, banks and telcos add partner fees. Our average spend is about S$41,000 a month, [BUD] so scale matters, and partners are how we reach it. | 78 · 0:33 |
| 8:09 to 9:09 | 13. The ask: S$500,000 and 3 milestones (Business and ask) | E | Poster zone 7 (what the seed buys, thin timeline strip from docs/diagrams/mvp-timeline.png). | We are asking for S$500,000 [terms: team to set]. It funds twelve months: S$491,534 of budget plus a small buffer. [BUD] About 61% pays our team: two Android engineers and one machine-learning engineer. About 9% is design and co-design with seniors, 6% language and voice data, 6% the pilot, 5% security and privacy review, 9% contingency, and 3% infrastructure and buffer. Three milestones. By about month four, a pilot-ready Android app. From month four to ten, a pilot with 200 households through community centres. By month twelve, results against our gate: catch rate, false alarms and "couldn't check" rate. [BUD] About 12% of the budget still rests on vendor quotes, and we label those lines as estimates. [BUD] | 142 · 1:01 |
| 9:09 to 9:37 | 14. Close (Business and ask) | A | Poster zone 1 (title) and zone 11 (demo QR). Hand over to Q&A. | Seniors lose the most per person, and the average loss keeps rising. A better ear will not fix that. A pause, a family and a phone that keeps its secrets can. Help us put that pause in Ah Ma's hand. We are asking for S$500,000 to turn that pause into a pilot with 200 households. We are SilverGuard AI. Thank you. | 65 · 0:28 |

## Timing check

| Section | Words | Spoken time | Demo actions | Share of 10:00 |
| --- | --- | --- | --- | --- |
| Problem | 333 | 2:23 | 0:00 | 24% |
| Features | 418 | 2:59 | 0:30 | 35% |
| Why it works | 134 | 0:57 | 0:00 | 10% |
| Business and ask | 392 | 2:48 | 0:00 | 28% |
| **Total** | **1277** | **9:07** | **0:30** | **96%** |

The brief asks for 2 to 3 minutes on the problem and the rest on features, why it works, the business model and the ask. Beats 1 to 4 are the problem; beats 5 to 9 the features (with three demos); beat 10 why it works; beats 11 to 14 the business model, the ask and the close.

| Speaker | Beats | Words (approx.) | Spoken time |
| --- | --- | --- | --- |
| A | 1, 2, 14 | 183 | 1:18 |
| B | 3, 11 | 217 | 1:33 |
| C | 4, 10 | 239 | 1:42 |
| D | 5, 6, 9 | 192 | 1:22 |
| E | 7, 13 | 242 | 1:44 |
| F | 6, 8, 12 | 204 | 1:27 |

If the rehearsal runs over: cut in this order: (1) the vendor-quote sentence in beat 13, (2) the independence sentence in beat 10, (3) the Deloitte sentence in beat 11, (4) the Google Pixel sentence in beat 10. If it runs under, show the genuine-message contrast in beat 7 (below).

## Cue cards

Bullets are cues, not prose. Say them in your own words, but keep every number and every level name exactly as written. Source tags are in the run sheet.

### Speaker A: Opener and closer

Beats 1, 2, 14 · about 183 words · about 1:18 of speaking.

- **Beat 1, hook (0:32):** 10:42, Ah Ma's phone, unknown number. Grandson's voice, frightened. Urgent, money, "don't tell his parents". Say: this is an illustration.
- One real case: grandmother in Canada, suspected voice clone, bank staff stopped it.
- Land on: "We protect seniors at exactly this moment."
- **Beat 2, scale (0:19):** S$913.1 million in 2025. 37,308 cases. About S$2.5 million a day. Ask: who loses most per person? Answer: seniors. Hand to B.
- **Beat 14, close (0:28):** seniors lose most; average loss keeps rising. Better ear will not fix it. Pause + family + a phone that keeps its secrets will. Ask: S$500,000, pilot with 200 households. "Thank you." Hand to Q&A.
- Do not say: "the police say voice cloning is rising". SPF briefs never mention voice cloning.

### Speaker B: Seniors, then the market

Beats 3, 11 · about 217 words · about 1:33 of speaking.

- **Beat 3, seniors (0:47):** 14.8% of victims in 2025; S$37,053 average, the highest; S$42,347 in H1 2026. Point at each number on the poster.
- Pre-empt: "Isn't it shrinking?" Fake-friend call scams 4,179 (2024) to 1,551 (2025). But seniors were the only age group whose victim numbers rose. Fewer cases, bigger losses.
- Hand to C: "So why not just detect the voice?"
- **Beat 11, market (0:46):** uses = seniors: 20.7% of citizens 65+ (June 2025), 13.1% in 2015; 89% of residents 60+ own a smartphone (2022). Pays = adult children: 2.9 working-age citizens per senior. Partners = telcos (transfer a call), banks (slow a payment). Deloitte: US$12.3B (2023) to US$40B (2027).
- Hand to F: "How do we earn?"
- Say "65 and above" for the 20.7%, "60 and above" for the 89%: they are different age bands.

### Speaker C: Evidence: why detection fails, why this works

Beats 4, 10 · about 239 words · about 1:42 of speaking.

- **Beat 4 (0:45):** GovTech: a short social-media clip can clone a voice. "Why not a detector?" Three reasons: (1) people cannot tell by ear (often judged the clone real); (2) detectors fail on real-world audio (up to one thousand percent worse); (3) Google Play bars call-audio capture. Plus: scams work by pressure (time, wish to help family).
- Land on: "We do not hunt the voice. We read the script: money, secrecy, a new number, urgency." Hand to D.
- **Beat 10 (0:57):** matches how scams and families work. Script reading survives better clones. On the phone: offline, nothing uploaded. Pixel proves on-device detection, but Pixel-only; we build for Android 10+. ScamShield cannot block WhatsApp or Telegram calls, so the family is the check. One button, one person.
- Independence: Singapore study, more support from children can lower older women's quality of life. So Ah Ma picks her guardian and can remove him any time.
- Hand to B: "Who uses it, who pays, who partners?"
- Never say "voice-clone detector" for our product. Never cite Buse et al. 2024 for seniors being more susceptible (it found no age effect).

### Speaker D: Three layers and the live alert

Beats 5, 6, 9 · about 192 words · about 1:22 of speaking.

- **Beat 5 (0:28):** in our story Ah Ma = senior, Wei Jie = guardian. Three layers: before she answers, during the scam, before money moves. All AI on the phone; audio, screenshots and chat text never leave it.
- **Beat 6, live alert (0:36 + 12 s):** you run the laptop. Unknown number calls; we silence, never block; guardian alerted. Say "Watch this phone", press **Simulate unknown call**, then stop talking. F reads the message. Then: design target under 10 seconds (not yet measured live); Android can silence but not forward, so transfer needs a telco.
- If the alert has not arrived after 12 s: say "it is on its way", switch to the Telegram Web window; if still nothing, show clickable screen 6 and say "this is what the product sends".
- **Beat 9, layer 3 (0:26):** senior links SilverGuard inside the bank's own app; after a High risk check a 24-hour signal, no content; the bank decides. Say plainly: later, interface designed today.
- Hand to E (before beat 7): "Layer two, on the same laptop."

### Speaker E: Scam Check demo and the ask

Beats 7, 13 · about 242 words · about 1:44 of speaking.

- **Beat 7, Scam Check (0:43 + 10 s):** the page is open. Paste message S04. Read the level out loud: **High risk**. Read the plain reasons: money, "don't tell anyone", new number, urgent.
- Levels are exactly: High risk, Check with family, No warning signs found. Never say "safe" as a result.
- Say the accuracy line word for word: "15 out of 15 on a 15-message test set we wrote ourselves; real-world accuracy is not yet measured."
- Page works offline; in the app, the message never leaves her phone. Hand to F.
- **Beat 13, the ask (1:01):** S$500,000 [terms: team to set]; 12 months = S$491,534 + small buffer. Split: team 61%, design 9%, language and voice 6%, pilot 6%, security 5%, contingency 9%, infrastructure and buffer 3%.
- Three milestones: about month 4, pilot-ready Android app; months 4 to 10, pilot with 200 households; month 12, results against the gate (catch rate, false alarms, "couldn't check" rate). About 12% of the budget rests on vendor quotes. Hand to A.

### Speaker F: Pause & Verify, drills, revenue

Beats 6, 8, 12 · about 204 words · about 1:27 of speaking.

- **Beat 6 (your part, about 10 words):** hold the guardian phone up where the room can see it. When it buzzes, read the message aloud: an unknown number rang Mum; she can still answer; call her before any money moves.
- **Beat 8, clickable screens (0:46 + 8 s):** key 2: answer No, No, Yes, then "Call Wei Jie now" (his saved number, never the caller's). Keys 4 then 5: practice call ("this is not a real call"), debrief praises the pause. Wei Jie sees alerts and drill progress, never Ah Ma's screen. Four languages. One job per screen, at most two big choices.
- Hand to C: "Why does it work?"
- **Beat 12, revenue (0:33):** family plan: adult child pays [price: team to set] a month per parent (alerts, drills, dashboard). Why first: the family feels the pain today; no partner has to sign first. No partner has signed yet. Later: bank and telco partner fees. Spend about S$41,000 a month, so scale matters.
- Hand to E: "We are asking for S$500,000."
- Do not promise a price, a partner or a launch date that the team has not set.

## Demo set-up and fallbacks

| Demo | Open before the pitch | Trigger | If it fails |
| --- | --- | --- | --- |
| Live guardian alert (beat 6) | `demo/guardian-alert/index.html` in its own browser window. Mock mode off; type the bot token and chat ID just before the pitch (never in the repo, a slide or a screenshot; the page keeps them in memory only). A real phone with the guardian's Telegram chat open, if the instructor approves. | D presses **Simulate unknown call**; F reads the message from the phone. | 1) Telegram Web (the guardian chat) in a second laptop window. 2) Clickable screen 6 ("this is what the product sends"). Say aloud which fallback you used. |
| Scam Check (beat 7) | `demo/scam-check-web/index.html` from disk (one file, works offline). Message S04 copied to the clipboard: "Ah Ma, my phone spoil, can't talk now, only can send voice note. Very urgent, I need $1,500 for hospital deposit tonight. PayNow to this number ok? Don't tell anyone first." | E pastes it and presses the check button. Expected: High risk (S04 is High risk in the test set). | Clickable screen 3 shows the same High risk card. Re-run `node demo/scam-check-web/evaluate.js` after any Sprint 2 engine change; the expected result must still be High risk. |
| Clickable screens (beat 8) | `design/clickable-screens/index.html`, English selected, "Fit phone to window" on. Keys 1 to 6 jump between screens. | F presses 2, answers No, No, Yes; then 4 and 5. | Screens are a single offline file; if the browser freezes, reload and press 2 again. |

Pre-flight (do 30 minutes before): test the laptop projector at 1366 by 768; check the phone has network and notifications on; run the alert 3 times on the venue network; open the tabs in the order of the run sheet; put Telegram Web in a separate window; silence every other notification.

**Optional extra (beat 7, +8 s):** if the rehearsal has slack, paste the genuine message G02 ("Ah Ma, I kena small accident on the PIE just now...") to show **No warning signs found** next to the High risk result. It shows the checker does not shout at every urgent message.

## Numbers and sources

Every number said in the script, with its source. Tags such as B2 refer to the numbering in `docs/research/source-library-v2.md` (the "source library"). "Opened" means the source library records that the page was opened on 22 or 23 Oct 2026.

| Number said | Beat | Tag | Source and where it is in the repo | Check status |
| --- | --- | --- | --- | --- |
| S$913.1 million lost in 2025; 37,308 cases | 2 | B2 | SPF, Annual scam and cybercrime brief 2025 (source library B2). https://www.police.gov.sg/-/media/SPF/Advisories/Scams/Annual-Scam-and-Cybercrime-Brief-2025.pdf | Opened (source library) |
| About S$2.5 million every day | 2 | B2 | Computed: 913.1 divided by 365 = 2.50 (S$ million per day). Not a published figure. | Computed by the AI |
| 14.8% of 2025 victims were 65+; average loss S$37,053 | 3 | B2 | SPF Annual brief 2025. MHA (2026) gives "about 15%" and "about $37,000" (docs/business/problem-statement-options.md). | Opened (source library) |
| Seniors' average loss S$42,347 in H1 2026 | 3 | B3 | SPF, Mid-year scam and cybercrime brief 2026 (source library B3). https://www.police.gov.sg/-/media/SPF/Media-Room/Statistics/Mid-Year-Scam-and-Cybercrime-Brief-2026/Mid-Year-Scam-and-Cybercrime-Brief-2026.pdf | Opened (source library) |
| Fake-friend call scams 4,179 (2024) to 1,551 (2025) | 3 | B2 | SPF Annual brief 2025; investor framing in docs/process/decision-log.md row 21 and source library section E. | Opened (source library) |
| Seniors the only age group whose victim numbers rose, 2024 to 2025 | 3 | MHA | Ministry of Home Affairs, oral reply, 7 May 2026, quoted in docs/business/problem-statement-options.md (References, notes). https://www.mha.gov.sg/media-room/newsroom/trends-in-scam-cases-involving-seniors-and-measures-to-improve-asset-recovery/ | Recorded in the repo; the AI did not re-open it |
| Scammers can clone a voice from a short social-media clip | 4 | A1 | GovTech Singapore, 25 Nov 2024 (source library A1). https://www.tech.gov.sg/technews/ai-scams-are-everywhere-so-heres-how-you-can-outsmart-them/ | Opened (source library) |
| Listeners often judged an AI clone to be the real person | 4 | A10 | Barrington, Cooper & Farid (2025), Scientific Reports 15, 11004 (source library A10). https://doi.org/10.1038/s41598-025-94170-3 | Opened; the exact percentage needs a quote check (see decisions) |
| Performance down by up to one thousand percent on real-world audio | 4 | B8 | Müller et al. (2022), Interspeech (source library B8): "performance degradation of up to one thousand percent". https://doi.org/10.21437/Interspeech.2022-108 | Opened (source library) |
| Google Play bars third-party call-audio capture | 4 | B6 | Dobberstein (2022), The Register (source library B6). https://www.theregister.com/2022/04/22/google_banning_thirdparty_callrecording_apps/ | Opened (source library) |
| Scams work through time pressure and the wish to help | 4 | A8 | Stajano & Wilson (2011), CACM (source library A8). https://doi.org/10.1145/1897852.1897872 | Opened via Crossref (source library) |
| Three layers; four languages; Android 10 and above; 24-hour bank signal; design target under 10 seconds; the guardian never sees the senior's screen | 5, 6, 8, 9, 10 | DES | docs/prototype-design.md: Summary, Requirements, Feature flows, Partner integrations (Tier 3); decision-log row 17. | Design targets, not measured results |
| A grandmother in Canada; bank staff stopped it | 1 | A9 | CBC News (2025, 20 Mar) (source library A9). https://www.cbc.ca/lite/story/1.7486437 | Opened (source library); page says "suspected" voice cloning |
| Android can silence a call but not forward it | 6 | B11 | Android Developers, Screen calls (source library B11). https://developer.android.com/develop/connectivity/telecom/dialer-app/screen-calls | Brief-verified; not re-opened |
| 15 out of 15 on a 15-message test set the team wrote | 7 | SC | demo/scam-check-web/README.md (results table); decision-log row 20 (wording of the caveat). | Run by the AI on 23 Oct; re-run before the pitch |
| Google Pixel on-device scam detection, no audio stored or sent; Pixel only | 10 | B5 | Google, Use Scam Detection (source library B5). https://support.google.com/phoneapp/answer/15654065?hl=en | Opened (source library) |
| Detection stays an arms race | 10 | B10 | Wang et al. (2026), ASVspoof 5 (source library B10). https://doi.org/10.1016/j.csl.2025.101825 | Opened via Crossref (source library) |
| ScamShield cannot block WhatsApp or Telegram calls | 10 | B12 | Ask Gov, ScamShield (source library B12). https://ask.gov.sg/scamshield/questions/clhpq3amk0008l2087522usmq | Brief-verified; exact title needs verification |
| More support from children can lower older women's quality of life | 10 | B7 | Ang & Malhotra (2022), Social Science & Medicine 303 (source library B7). https://doi.org/10.1016/j.socscimed.2022.114996 | Opened via RePEc (source library) |
| 20.7% of citizens 65+ (June 2025); 13.1% in 2015; 2.9 working-age citizens per senior | 11 | B4 | Population in Brief 2025 (source library B4). https://www.strategygroup.gov.sg/files/population_in_brief_2025.pdf | Opened (source library) |
| 89% of residents aged 60+ owned a smartphone in 2022 | 11 | IMDA | IMDA, Singapore Digital Society Report 2023 ("ownership among seniors has increased (89% in 2022 compared to 74% in 2017)"; seniors = residents aged 60 and above). https://www.imda.gov.sg/-/media/imda/files/infocomm-media-landscape/research-and-statistics/singapore-digital-society-report/singapore-digital-society-report-2023.pdf | NEW source: read as a search excerpt on 23 Oct 2026, not the full report; not yet in the source library; IMDA's Digital Society page lists data to 2025 that the AI could not read |
| US fraud losses US$12.3B (2023) to US$40B (2027) | 11 | B1 | Deloitte Insights (2024) (source library B1). https://www.deloitte.com/us/en/insights/industry/financial-services/deepfake-banking-fraud-risk-on-the-rise.html | Opened (source library); US figure, say so |
| S$500,000 ask; S$491,534 budget; about S$41,000 a month; 200 households; 16 weeks to MVP (about month 4); 6-month pilot; 12 months; about 12% on vendor quotes | 12, 13, 14 | BUD | docs/business/budget-v2.md (Summary; total S$491,533.60; average monthly burn S$40,961.13; needs-quote lines S$58,300 = 11.9%); decision-log row 13. | Computed by script in budget-v2 |
| Use of funds 61% / 9% / 6% / 6% / 5% / 9% / 3% | 13 | BUD | Share of S$500,000, computed from the budget-v2 category totals; table in docs/pitch/market-and-revenue.md. | Computed by the AI; rounded |

Not numbers from a source, but claims to keep honest: "10:42" and the grandson story are an illustration; "Ah Ma" and "Wei Jie" are the design's personas, not real people.

## Say and do not say

- Levels are always **High risk**, **Check with family**, **No warning signs found**. Never call a message or call "safe" as a result.
- Never say SilverGuard detects the cloned voice. It detects the scam script.
- Never attribute voice-clone claims to the Singapore Police Force; SPF briefs do not mention voice cloning. Voice-clone evidence comes from GovTech (A1), CBC (A9) and the research papers.
- Say "our design target" for the 10-second alert and any other target. Say "15 out of 15 on a test set we wrote ourselves" for accuracy.
- Nothing about the demo page implies the product is built: say "demo" and "prototype".
