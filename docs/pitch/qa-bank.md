> Draft prepared with AI assistance for the scrum master; to be reviewed and edited by the team.

# Q&A bank and risks slide (R2 and B3)

Backlog items R2 [#22](https://github.com/panda-king-0705/silverguard-ai/issues/22) (Q&A bank) and B3 [#20](https://github.com/panda-king-0705/silverguard-ai/issues/20) (risks slide). Drafted early, on 23 Oct 2026, for the Sprint 2 review by the team. The audience is simulated investors, so the questions are what an investor or the professor would ask.

## How to use this

- Each answer is a **30-second answer of about 70 words**. The owner role rewrites it in their own voice and rehearses it. Owners are roles, not names; the team assigns Speakers A–F at planning.
- The first 15 questions are the ones the SM's brief asked for. The professor's actual list is not in the repo, so **the team should check these against the questions the professor really asked** and add any that are missing. Questions 16–20 are extras the AI thought likely.
- Every number comes from a file in this repo, which in turn cites its source. A "Careful" line says what not to overclaim. Anything unverified is marked "needs verification".
- Decisions already made are applied, not reopened: decision 3 (script cues, not voice), 4 (silence, never block), 6 (on-phone AI), 8 (stock voices in drills), 13 (S$500,000), 17 (no screen viewing), 20 (accuracy wording), 21 (fewer cases, bigger losses). See [decision-log.md](../process/decision-log.md).

| # | Question | Owner role |
| --- | --- | --- |
| 1 | How does the AI detect a scam? | Dev 1 |
| 2 | How can the app be in every call? | Dev 2 |
| 3 | Why would WhatsApp expose chats to you? | Dev 2 |
| 4 | What about privacy? | Dev 1 |
| 5 | Isn't scam education enough? | Researcher |
| 6 | What's wrong with ScamShield? | Researcher |
| 7 | Isn't the problem shrinking? | Researcher |
| 8 | Why not build a deepfake detector? | Dev 1 |
| 9 | Who pays? | PO |
| 10 | What if it blocks a real emergency call? | Dev 2 |
| 11 | Isn't routing calls to family paternalistic? | Designer |
| 12 | What if the guardian is the abuser? | Designer |
| 13 | Are cloned-voice drills ethical? | Researcher |
| 14 | How accurate is it? | Dev 1 |
| 15 | Why would a telco partner with you? | PO |
| 16 | Why S$500,000? | PO |
| 17 | Do seniors actually want this? | Researcher |
| 18 | What about iPhone users? | Dev 2 |
| 19 | What about dialects and Tamil? | Designer |
| 20 | What if the scammer's number looks like a saved contact? | Dev 2 |

---

## 1. How does the AI detect a scam?

**Owner:** Dev 1

**30-second answer:** It reads the script, not the voice. A message, voice note or screenshot is turned into text on the phone. Then we look for the six cues that every family-emergency scam needs: a money request, secrecy, a new number or identity switch, urgency, authority and emotional pressure. A money request plus another strong cue gives "High risk". We never say "safe": the lowest level is "No warning signs found", with a reminder to call family.

**Repo source:** [prototype-design.md, Scam Check engine](../prototype-design.md#scam-check-engine); [demo/scam-check-web/README.md](../../demo/scam-check-web/README.md), "How the engine decides".

**Careful:** The demo is rules only. The product design adds a small on-device classifier whose thresholds are set on a held-out test set. Say which one you are showing.

## 2. How can the app be in every call?

**Owner:** Dev 2

**30-second answer:** It can't, and we don't claim it. Android lets a call-screening app see only numbers that are not in the contacts, and it can silence or reject them, not listen to them or forward them. Google Play also bars apps from capturing call audio. So Guardian Alert acts before the senior answers and tells the family. Hearing or transferring a live call needs a telco partner, and WhatsApp or Telegram calls never touch a telco's network.

**Repo source:** [prototype-design.md, Constraints and Telco guardian transfer](../prototype-design.md#constraints); [source-library-v2.md](../research/source-library-v2.md) B6 (The Register) and B11 (Android Developers); decision 5.

**Careful:** Do not promise live call monitoring. Decision 2 calls it a later by-product.

## 3. Why would WhatsApp expose chats to you?

**Owner:** Dev 2

**30-second answer:** It doesn't, and we never ask it to. SilverGuard has no access to WhatsApp. Mum chooses what to check: she long-presses a voice note or screenshot and taps Share, or she pastes text into the app. Only that one item is read, on her phone, and then deleted. One assumption is still untested: that WhatsApp's share option exports voice notes on Android. We will test it before building around it.

**Repo source:** [prototype-design.md, Scam Check (feature flow), Assumptions to test, Open questions](../prototype-design.md#scam-check).

**Careful:** The browser demo takes pasted text only. Voice notes and screenshots are product features, and screenshot reading (D3) is a Sprint 2 stretch.

## 4. What about privacy?

**Owner:** Dev 1

**30-second answer:** Audio, screenshots and chat text are processed in the phone's memory and deleted when the result appears. The cloud holds only who is linked, what they agreed to, and alert events such as type and time, which are kept for 30 days. The guardian sees events, never content. Each permission is a separate consent that the senior can withdraw in two taps. Google's Pixel Scam Detection already shows that on-device detection without storing audio is feasible.

**Repo source:** [prototype-design.md, Data and privacy](../prototype-design.md#data-and-privacy); decision 6; [source-library-v2.md](../research/source-library-v2.md) B5 (Google).

**Careful:** The design is not legal advice on the PDPA. The budget includes a privacy review (S$12,000, needs a quote) before any pilot. The caller's number is shared with the guardian only if the senior allows it.

## 5. Isn't scam education enough?

**Owner:** Researcher

**30-second answer:** Education is our core, but it cannot work alone. In a controlled study, people spotted speech deepfakes only 73% of the time, and hearing examples helped only slightly. Another peer-reviewed study found listeners often took an AI clone for the real person. Under panic, a senior needs a habit and a tool: Pause & Verify, a one-tap call to a saved number, and Family Drill to practise it. The AI backs up the habit.

**Repo source:** [source-library-v2.md](../research/source-library-v2.md) A5 (Mai et al. 2023) and A10 (Barrington et al. 2025); [problem-statement-options.md](../business/problem-statement-options.md), Option C; decision 2.

**Careful:** The 73% figure comes from the Option C text, not from a re-read of the paper. **Needs verification** against Mai et al. (2023) before it is spoken. Option B's "about 80%" for Barrington et al. is also unverified, so say "often".

## 6. What's wrong with ScamShield?

**Owner:** Researcher

**30-second answer:** Nothing. We complement it. ScamShield is Singapore's national tool, but its own help page says it cannot block scam calls made through WhatsApp or Telegram, because those calls are encrypted. Many scams run there. We add what a blocker cannot: a family alert, a Pause & Verify routine and a Scam Check that runs on the phone. Our result screen even offers to open ScamShield so the senior can report the scam.

**Repo source:** [source-library-v2.md](../research/source-library-v2.md) B12 (Ask Gov); [prototype-design.md, Scam Check step 4](../prototype-design.md#scam-check).

**Careful:** B12's exact page title **needs verification**. Do not describe ScamShield's other features unless someone checks them. Never show its logo.

## 7. Isn't the problem shrinking?

**Owner:** Researcher

**30-second answer:** Cases are falling, but the harm is concentrating on seniors. Total losses fell 19% to S$913.1 million in 2025, and fake-friend call scams fell from 4,179 to 1,551. But seniors aged 65 and above lost the most per victim: about S$37,000 in 2025 and S$42,347 in the first half of 2026. They were 14.8% of 2025 victims. Fewer cases with bigger losses is why prevention matters more, not less.

**Repo source:** Decision 21; [source-library-v2.md](../research/source-library-v2.md) B2 (SPF 2025 brief) and B3 (SPF mid-year 2026 brief), and section E.

**Careful:** **Never say SPF links voice cloning to these figures.** The SPF briefs do not mention voice cloning or deepfakes. Voice-clone evidence comes from GovTech (A1), the FTC (A4), FBI IC3 (A7), CBC (A9) and Sobolev (A11). The H1 2026 fake-friend count is 353, down from 1,052 (B3). "About S$37,000" is S$37,053 in B2.

## 8. Why not build a deepfake detector?

**Owner:** Dev 1

**30-second answer:** Because detectors fail where we need them. Benchmarks show that detectors trained on lab audio degrade badly on real-world audio, in one study by "up to one thousand percent", and phone calls are compressed and noisy. Detectors also generalise poorly to new cloning tools, and Google Play bars third-party call-audio capture anyway. A scam script, with its money request, secrecy and urgency, stays the same whichever voice reads it.

**Repo source:** Decision 3; [source-library-v2.md](../research/source-library-v2.md) B8 (Müller et al. 2022), B9 (ASVspoof 2021), B10 (ASVspoof 5), B6; [prototype-design.md, Trade-offs](../prototype-design.md#trade-offs).

**Careful:** B8's phrase is "performance degradation of up to one thousand percent", measured in error. Quote it as the authors' words, and don't call it "detectors are 10 times worse". The design says to revisit if independent benchmarks show detectors hold up.

## 9. Who pays?

**Owner:** PO

**30-second answer:** The buyer is the senior's adult child, who also acts as guardian. The senior is the user. The working idea is a family plan. We have not set a price and have no willingness-to-pay data yet, so we will test it in the 200-household pilot. Partners such as a bank or telco are a possible second source, for the pieces only they can run, but that is untested. The S$500,000 seed pays for building and the pilot.

**Repo source:** [problem-statement-options.md, "What these options must fix", point 3](../business/problem-statement-options.md); [budget-v2.md](../business/budget-v2.md); decision 13; B2 market slide (#19).

**Careful:** There is no price or revenue figure in the repo. Do not invent one. The source library flags the BIZ lens as thin (section D), so a willingness-to-pay source is **needed**. At the placeholder rate (US$0.02, converted to S$0.0256 per message) three alerts a day costs about S$2.30 per household per month. That figure is derived from an unverified placeholder: **needs verification**.

## 10. What if it blocks a real emergency call?

**Owner:** Dev 2

**30-second answer:** It never blocks. An unknown call is silenced, the senior can still answer it, and her guardian is alerted at once. If the phone is offline, the screening service fails or the guardian is removed, calls simply ring as normal. We also test against genuine emergencies: in our test set, none of the five genuine family messages, including a hospital and a road-accident message, was rated High risk.

**Repo source:** Decision 4; [prototype-design.md, Guardian Alert and the failure table](../prototype-design.md#apis-events-and-error-handling); [demo/scam-check-web/README.md, Results](../../demo/scam-check-web/README.md).

**Careful:** Two honest gaps. First, one unseen genuine message ("at the hospital now with Dad, can you bring $50 cash for parking?") was rated High risk, a false alarm the rules cannot avoid. Second, it is untested whether the "Wei Jie has been told" notice shows on the incoming-call screen on all phone brands (open question in the design). Say both if asked.

## 11. Isn't routing calls to family paternalistic?

**Owner:** Designer

**30-second answer:** The senior stays in charge. She chooses her guardian, chooses what the guardian can see, and can remove them at any time. The default is an alert, not a takeover, and she can still answer. The guardian sees events, never her messages or screen: we removed a "See Mum's screen" button for that reason. Singapore research warns that help from more children can lower older women's quality of life, so we test this with grandparents.

**Repo source:** [prototype-design.md, Data and privacy: guarding against misuse by family](../prototype-design.md#data-and-privacy); decision 17; [source-library-v2.md](../research/source-library-v2.md) B7 (Ang & Malhotra 2022).

**Careful:** Call transfer to the guardian is a Tier 2 telco feature that the senior chooses among three modes (alert only, ring both, transfer). B7 is about older women's quality of life in one sample, not about scam alerts. Do not stretch it. Add what the grandparents said in V2/V3 once it exists.

## 12. What if the guardian is the abuser?

**Owner:** Designer

**30-second answer:** It is a real risk, and we have not solved it. The design limits the harm. The guardian never sees content, only alert events. The senior picks the guardian and can remove them, which also switches off silencing. Every guardian action, such as scheduling a drill, is logged and visible to the senior. We have not yet asked elder-protection professionals to review this, and we would do so before any pilot.

**Repo source:** [prototype-design.md, Guarding against misuse by family](../prototype-design.md#data-and-privacy); decision 17.

**Careful:** No expert has reviewed this in the repo's records (**needs confirmation by the team**). Do not claim the design prevents abuse. Do not suggest features not in the design, such as a hidden removal option, unless the team adds them.

## 13. Are cloned-voice drills ethical?

**Owner:** Researcher

**30-second answer:** In version 1, drills use stock actor voices, never a cloned family voice, so nobody hears a loved one in fake distress. Each practice call is labelled "Practice call" and "This is not a real call". The senior agrees to drills during setup, sets quiet hours and can pause them at any time. The guardian sees scores, never audio. Cloned relatives' voices would come only after a consent study. Our demo clip uses a consenting volunteer.

**Repo source:** Decision 8; [prototype-design.md, Family Drill and Trade-offs](../prototype-design.md#family-drill); [design/clickable-screens/README.md](../../design/clickable-screens/README.md); issue [#12](https://github.com/panda-king-0705/silverguard-ai/issues/12).

**Careful:** The volunteer's consent must be recorded before the clip is used (#12 "Done when"). Avoid saying "cloned-voice drills" about version 1: it uses no cloned voice.

## 14. How accurate is it?

**Owner:** Dev 1

**30-second answer:** On a 15-message test set the team wrote itself, the demo rated every message as expected: 15 out of 15. Real-world accuracy is not yet measured. The demo uses simple word rules. The product adds a trained classifier, with thresholds set on a held-out test set of volunteer messages in four languages, and we track catch rate, false alarms and "couldn't check" per language before any pilot goal is set.

**Repo source:** Decision 20; [demo/scam-check-web/README.md, Results and Known misses](../../demo/scam-check-web/README.md); [prototype-design.md, Evaluation](../prototype-design.md#scam-check-engine).

**Careful:** Use decision 20's wording exactly: "15/15 on a 15-message test set the team wrote itself; real-world accuracy not yet measured". The README says the AI assistant wrote the messages and the word lists, so the team should check that "the team wrote itself" is true as stated, and say "with AI help" if asked. The README's "Known misses" table shows that on 10 unseen messages the engine missed several, and one scam got "No warning signs found" (the Sprint 2 demo fixes may have changed this; re-check). Do not call 15/15 a catch rate.

## 15. Why would a telco partner with you?

**Owner:** PO

**30-second answer:** Only a telco's network can redirect a call, because Android apps cannot forward calls. We offer a family-protection feature for the telco's subscribers while keeping call audio and contact lists out of the deal: SilverGuard handles sign-up, consent and the guardian's details, and the telco decides which calls to act on from its own records. We have not signed or approached a telco. Their reasons to join are hypotheses we would test.

**Repo source:** [prototype-design.md, Telco guardian transfer (Tier 2)](../prototype-design.md#telco-guardian-transfer-tier-2); decision 5; [source-library-v2.md](../research/source-library-v2.md) B11.

**Careful:** The repo has no source on telco incentives and no record of any telco conversation. Any claim such as "telcos want fewer scam complaints" **needs verification** with a source before it is said. Say the limit: WhatsApp and Telegram calls never touch the telco's call network, and a spoofed caller ID can look like a saved contact.

## 16. Why S$500,000?

**Owner:** PO

**30-second answer:** Twelve months of costs come to S$491,533.60, including a 10% contingency, and we rounded up to S$500,000. It pays two Android engineers, one ML engineer and a half-time designer to build the MVP in 16 weeks, then runs a 6-month pilot with 200 households and evaluates it against a pilot gate. About 72% of the budget lines have a published source. The rest are team estimates or need vendor quotes.

**Repo source:** Decision 13; [budget-v2.md](../business/budget-v2.md), Summary and "Decisions for the team".

**Careful:** The product team line (S$305,650.80) is above the original seed range. A 10-month option (S$435,497.62) exists, and the team has not decided which figure goes on the poster. The WhatsApp price is a placeholder that needs verification.

## 17. Do seniors actually want this?

**Owner:** Researcher

**30-second answer:** We do not know yet, and we are testing it. Two or three grandparents are trying our clickable screens in informal feedback sessions, and we will report what they said, including what they disliked. Several assumptions are still untested: that our target seniors use Android with data, that they will share a voice note when unsure, and that they will accept practice calls. The 200-household pilot is built to test them.

**Repo source:** [prototype-design.md, Assumptions to test and Open questions](../prototype-design.md#requirements); decision 16; issues [#15](https://github.com/panda-king-0705/silverguard-ai/issues/15) and [#16](https://github.com/panda-king-0705/silverguard-ai/issues/16).

**Careful:** **Fill in the real findings from V3** (three insights) before the pitch and replace this answer's "we do not know yet" where the sessions say otherwise. Quote only approved, anonymised words. Do not call the sessions research.

## 18. What about iPhone users?

**Owner:** Dev 2

**30-second answer:** We start with Android because of what each platform allows. Android lets a call-screening app see unknown numbers. iPhone apps get no live notice of incoming calls. iPhone users would still get Scam Check, Pause & Verify and drills, and their guardians would still get alerts through WhatsApp. They would miss only call screening. A later iPhone version would build around Apple's own call-screening feature.

**Repo source:** [prototype-design.md, Summary decision 4, Constraints and "Revisit as SilverGuard grows"](../prototype-design.md#summary).

**Careful:** The design says an iPhone user gets "everything except call screening". The Apple call-screening claim comes from the design's revisit list and is not sourced in the repo: **needs verification**.

## 19. What about dialects and Tamil?

**Owner:** Designer

**30-second answer:** The design covers English, Mandarin, Malay and Tamil, plus Singlish spellings. Open speech models handle Hokkien and Teochew poorly, so a voice note the app cannot transcribe gets "Couldn't check this; ask family to listen", never a pass. Our demo rules cover English, Singlish, Mandarin and Malay. Tamil text and Tamil screenshot reading are open items, and teammates will check the AI-written Mandarin, Malay and Tamil text.

**Repo source:** [prototype-design.md, Languages](../prototype-design.md#scam-check-engine); decision 18; [demo/scam-check-web/test-set.md](../../demo/scam-check-web/test-set.md).

**Careful:** Do not say Tamil works end to end. It is in the design but not in the demo's test set, and the Tamil OCR engine is an open question. Native-speaker checks are not done yet.

## 20. What if the scammer's number looks like a saved contact?

**Owner:** Dev 2

**30-second answer:** Then the app cannot catch that call, because a spoofed caller ID can look like a saved contact, and we say so. That is why Pause & Verify never dials the caller. Its one big button calls the guardian on the number saved in Mum's phone. The three spoken questions work whatever number is shown: did they ask for money, is it urgent or secret, and is it a new number?

**Repo source:** [prototype-design.md, Pause & Verify and Telco guardian transfer limits](../prototype-design.md#pause--verify).

**Careful:** Do not suggest any layer stops every scam. The pitch says each layer slows the money down and brings in family.

---

## Risks slide

Backlog item B3 ([#20](https://github.com/panda-king-0705/silverguard-ai/issues/20)). Owner: SM. This is the slide's text, then the reasoning and the check against the delivery plan.

### Slide text (draft)

**Title:** Three risks, and what we do about each

| Risk | What we do |
| --- | --- |
| **1. The AI is less accurate in real life than in our demo.** Our 15/15 is on messages we wrote ourselves. | Test on a held-out set of volunteer messages in four languages. Show "Check with family", never "safe". Set pilot targets before launch. |
| **2. Seniors or families don't use it the way we assume.** | Grandparent sessions now. A 200-household pilot with community partners. Seniors choose their guardian and can remove them any time. |
| **3. Personal data leaks or is misused.** | The AI runs on the phone, so content never leaves it. The guardian sees events, never content. A privacy review and a data protection officer before the pilot. |

*Spoken line (about 20 seconds):* "We are honest about three risks: our accuracy is unproven outside our own test set, seniors may not use it as we imagine, and any app near family and money must protect privacy. Each has a test or a design rule behind it."

### Reasoning and evidence

| # | Risk | Likelihood | Impact | Mitigation in detail | Owner | Repo source |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Accuracy not proven on real scams | Medium | High | Decision 20 wording; held-out test set and four per-language numbers (catch rate, false alarms, "couldn't check", time); thresholds set on the test set; three-level wording with no "safe"; fail-open design; report real numbers honestly if short | Dev 1 | [prototype-design.md, Evaluation](../prototype-design.md#scam-check-engine); [demo/scam-check-web/README.md, Known misses](../../demo/scam-check-web/README.md) |
| 2 | Seniors or guardians do not adopt it, or alerts feel like loss of independence | Medium | High | V2 sessions with 2–3 grandparents, V3 turns them into three design changes or confirmed assumptions; 200-household pilot with a gate; the senior chooses and can remove the guardian; alert-only by default; stock-voice drills she can pause | Researcher | [prototype-design.md, Assumptions to test](../prototype-design.md#requirements); [source-library-v2.md](../research/source-library-v2.md) B7 |
| 3 | Privacy failure or misuse by family | Medium | High | On-phone processing and deletion; event-only cloud data kept 30 days; separate consent scopes; guardian actions visible to the senior; privacy review (S$12,000, needs a quote) and DPO before the pilot; for the team repo, raw notes stay private and the bot token never enters the repo | Dev 1, SM | [prototype-design.md, Data and privacy](../prototype-design.md#data-and-privacy); [budget-v2.md](../business/budget-v2.md) section 5 |

### Check against the delivery plan's risk register

The acceptance test for #20 is "Matches the plan's risk register". **The delivery plan is not in this repo, so that check cannot be done by the AI. A human must open the plan and compare.** What the AI could check is [sprint-1-plan.md](../process/sprint-1-plan.md), which lists seven delivery risks. The three slide risks map to them like this:

| Slide risk | Sprint 1 plan risk(s) it matches | Likelihood and impact in that plan |
| --- | --- | --- |
| 1. Accuracy | "D2 misses its target (8 of 10 scams flagged, 0 of 5 genuine flagged)"; "Budget or market figures unsourced" (honesty with numbers) | Medium and High; Medium and Medium |
| 2. Adoption and validation | "Grandparent sessions cannot be arranged for 28–31 Oct" | Medium and High |
| 3. Privacy and misuse | "Personal data ends up in the public repo"; "Bot token leaks into the public repo or a chat" | Medium and High; Low and High |

The other Sprint 1 risks, "Uneven load" and "AI drafts accepted without real review", are team-process risks. They belong in the [Sprint 2 plan](../process/sprint-2-plan.md), not on an investor slide.

### Decisions for the humans

- [ ] **Choose the three.** The AI proposed these three to match the Sprint 1 plan's delivery risks. An investor may ask about two risks that are not in that list: **dependence on Google Play and Android rules** (decision 2, B6, B11) and **needing a telco or bank partner for Tiers 2 and 3** (Q15). The team could add either to the register. Keep them ready in the Q&A, or swap one in.
- [ ] **Compare with the delivery plan's register** and fix any mismatch in likelihood, impact or wording.
- [ ] **Confirm owners** for each risk. The roles above are the AI's proposal.
