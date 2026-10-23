# Market and revenue slide content (milestone PO-4, backlog B2, issue #19)

> Draft prepared with AI assistance for the Product Owner; to be reviewed and edited by the team.

23 Oct 2026 · Feeds pitch beats 11 to 13 in [`pitch-script.md`](pitch-script.md) and poster zone 7 (business case). All money is in Singapore dollars unless marked US$. **Anything marked "team to set" is a number the AI has deliberately not decided.**

## What this page decides and what it leaves to the team

| Item | In this draft | Who decides |
| --- | --- | --- |
| Revenue model to pitch | Family plan first (recommended); bank and telco partner fees as the second line | PO and team |
| Family-plan price | **Team to set** | PO and team |
| What is free and what is paid | **Team to set** (see option 1) | PO and team |
| Terms of the S$500,000 (equity, note, other) | **Team to set** | Team |
| Partner fees (bank, telco) | **Team to set**; the repo shows no partner conversation yet | PO |
| Pilot success thresholds (the "gate") | **Team to set**; the budget names the three measures but no thresholds | PO and Researcher |
| Use of funds | From [`docs/business/budget-v2.md`](../business/budget-v2.md), the 12-month version chosen in decision-log row 13 | Already decided; team to ratify at kickoff |

## 1. Who uses, who pays, who partners

| Role | Who | Why they act | Evidence |
| --- | --- | --- | --- |
| **Uses** | Seniors, aged 65 and above | They lose the most per person: S$37,053 on average in 2025 and S$42,347 in H1 2026. They were 14.8% of 2025 victims. | SPF annual brief 2025 and mid-year brief 2026 (source library B2, B3) |
| **Pays** | Their adult children (the guardians) | They feel the risk and hold the family relationship. There are only 2.9 working-age citizens for each senior. | Population in Brief 2025 (B4). That adult children will pay is **an assumption, not yet tested**; see "What is not proven". |
| **Partners** | Banks (Tier 3), telcos (Tier 2) | Banks can slow a payment; only a telco's network can transfer a call, because Android apps can silence but not forward calls. Deloitte expects US fraud losses driven by generative AI to rise from US$12.3B (2023) to US$40B (2027), which is a business case for banks. | Design doc, Partner integrations; Android Developers (B11); Deloitte (B1) |

## 2. Market-size line (one line for the slide)

> **20.7% of Singapore citizens are aged 65 and above. Scams cost Singapore S$913.1 million in 2025, and seniors lose the most per victim: S$37,053 (2025), S$42,347 (H1 2026).**

Sources: 20.7% (June 2025) from Population in Brief 2025 (B4); S$913.1M and S$37,053 from the SPF annual brief 2025 (B2); S$42,347 from the SPF mid-year brief 2026 (B3). Details and URLs are in the table at the end.

A longer version, if the slide has room: "13.1% in 2015, 20.7% in 2025" (B4) and "89% of residents aged 60 and above owned a smartphone in 2022" (IMDA, see the table at the end).

**What this line is, and is not.** It sizes the problem and the user group. It is not a revenue forecast. The repo has no count of paying households, no estimate of how many seniors use Android 10 or later, and no willingness-to-pay evidence, so the AI has not produced a TAM, SAM or SOM figure. To build one the team would need: (a) the number of citizens aged 65 and above, from Population in Brief 2025 (B4; the AI used only the 20.7% share and has not read the headcount, needs a figure); (b) the share on Android 10 or later (not found); (c) a price (team to set); (d) a take-up rate (no evidence). If the team adds one, label every assumption.

## 3. Revenue options

| # | Option | Who pays | How it earns | Price | Strengths | Risks and what is missing |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | **Family plan** (recommended for the pitch) | The adult child, per parent | Monthly subscription for guardian alerts, Family Drill scheduling and the guardian dashboard. Whether Scam Check and Pause & Verify stay free for the senior is a team decision. | **Team to set** | Needs no partner to sign first. The buyer is the person who feels the worry. Matches decision 1 (investors want who uses, who pays, who partners) and the problem statement's "family plan" language. | No evidence yet that adult children will pay. The 200-household pilot uses vouchers, so it does not test price. The guardian channel may feel like losing independence (Ang & Malhotra 2022, source library B7), which could hurt take-up. |
| 2 | **Bank partnership**: fee for the cooling-off signal (Tier 3) | A partner bank | Per linked customer or per signal, or a licence. The bank owns the extra check; SilverGuard sends only "recent scam risk", valid for 24 hours, with no content. | **Team to set** | Banks have a business case (Deloitte, B1). The CBC case shows bank staff stopping a transfer (A9). | No bank conversation in the repo. Needs the bank to build its side and pass its own approval. Later than the MVP. |
| 3 | **Telco partnership**: guardian transfer or a bundle (Tier 2) | A telco, or the telco's subscribers | Revenue share on a bundled add-on, or a fee per enrolled subscriber. The telco runs the transfer. | **Team to set** | Only a telco's network can redirect a call. Opens distribution to seniors who would never find the app. | No telco conversation in the repo. WhatsApp and Telegram calls never touch the telco's call network, and a spoofed caller ID can look like a saved contact (design doc). |
| 4 | **Community or institutional licence** (senior activity centres, public programmes) | A centre or agency | Licence or grant for group use. | **Team to set** | The pilot already works through community centres. | **Needs verification**: the repo has no source on who funds such programmes or how. Not recommended for the pitch until someone finds one. |

### Recommendation for the pitch (an AI suggestion; the team decides)

**Pitch option 1 as the model, and name options 2 and 3 as the later partner lines.** Reasons: it is the only option the team can start without another organisation's agreement; the pilot partners (community centres) can introduce households; and it keeps the "who uses, who pays, who partners" structure the investors asked for. The pitch script already says this in beat 12: "No partner has signed yet."

### What is not proven (say it before an investor asks)

- **Willingness to pay** is untested. The grandparent sessions (V2) and synthesis (V3) should ask the adult children, not only the seniors.
- **Scale arithmetic.** The average monthly spend is S$40,961.13 (budget-v2). The table shows how many paying households would cover that spend at three **placeholder** prices. It ignores payment fees, partner shares and cancellations, and the prices are **team to set**:

| Placeholder monthly price per household | Households needed to cover S$40,961.13 a month |
| --- | --- |
| S$5 (team to set) | 8,193 |
| S$8 (team to set) | 5,121 |
| S$10 (team to set) | 4,097 |

  The pilot has 200 households, so family-plan revenue alone cannot carry the company at pilot scale. That is why partners matter, and the pitch should say so (beat 12 does).
- **The seed budget has no revenue line.** budget-v2 lists costs only; it does not assume income during the 12 months.

## 4. Use of funds for the S$500,000

From [`docs/business/budget-v2.md`](../business/budget-v2.md) (total S$491,533.60 for 12 months, including 10% contingency) plus the extra buffer from decision-log row 13. Percentages are of S$500,000 and were computed by a script in the AI session scratchpad; the rows add to S$500,000.00.

| Category | S$ | % of the ask | What it buys | How well backed in budget-v2 |
| --- | --- | --- | --- | --- |
| Product team (2 Android engineers, 1 ML engineer, 12 months, with employer CPF) | 305,650.80 | 61.1% | The MVP in 16 weeks, then the pilot build and fixes | Sourced (MOM wages, CPF rate) |
| UX research and accessibility (0.5 designer, co-design with 8 seniors) | 45,126.60 | 9.0% | Screens and co-design sessions with seniors | Mixed: wages sourced, vouchers and venue estimated |
| Language and voice data | 30,500.00 | 6.1% | Transcription, labelling and voice actors for drills in 4 languages and 3 dialects | **Needs vendor quotes** |
| Community pilot, 200 households | 30,160.00 | 6.0% | Vouchers, 4 centre fees, 20 loaner phones, onboarding events | Mostly estimates; phones sourced |
| Security and PDPA compliance | 27,000.00 | 5.4% | Penetration test; privacy review and legal advice | **Needs vendor quotes** |
| Infrastructure | 8,411.33 | 1.7% | Firebase, alerts (WhatsApp and SMS), test phones | Mostly sourced; WhatsApp rate **needs verification** |
| Contingency (10%) | 44,684.87 | 8.9% | Cover for overruns | Estimate |
| Extra buffer to round the ask | 8,466.40 | 1.7% | Rounds S$491,533.60 up to S$500,000 | Decision 13 |
| **Total** | **500,000.00** | **100.0%** | | |

Of the S$491,533.60 budget, 72.4% is backed by a published source, 15.7% is a team estimate and 11.9% (S$58,300) needs a vendor quote (budget-v2 summary). The pitch admits the last figure in beat 13.

**Open budget decisions the pitch depends on** (all in budget-v2, "Decisions for the team"): the product team line is above the seed skeleton's range (the team chose the 12-month version, S$491,533.60; a 10-month version would cost S$435,497.62); the WhatsApp price is a placeholder (each extra US$0.01 per message adds S$1,379.71); and the pilot partners' fees and the voucher amounts are unconfirmed.

## 5. Three milestones the money buys

Month counts follow the budget summary: MVP in 16 weeks (about 3.7 months), then a 6-month pilot, then 2 months of evaluation. The three owners are roles, not people.

| # | Milestone | When | Proof the investors can check | Owner |
| --- | --- | --- | --- | --- |
| 1 | **A pilot-ready Android MVP**: Guardian Alert, Pause & Verify, Scam Check and Family Drill working on real phones in four languages. Text and screenshot Scam Check works by week 5, early enough to show partners. | About month 4 (week 16) | A build seniors can install; testing by seniors from week 13 | Owner: Dev 1 and Dev 2, with the Designer |
| 2 | **A 6-month pilot with 200 households** through 4 community or senior activity centres, with guardians alerted by WhatsApp or SMS | About months 4 to 10 | Households enrolled; alert volume and delay measured against the design targets (guardian alerted within 10 seconds, 95th percentile) | Owner: PO, with the Researcher |
| 3 | **Results against the gate, and the next step**: catch rate, false alarms and "couldn't check" rate, plus the next funding round or a first partner pilot | About months 10 to 12 | A short results report with the gate thresholds (**team to set**) and a clear pass or fail | Owner: PO and Scrum master |

"Partner pilot" in milestone 3 is the AI's suggestion for what a positive gate result could unlock; the budget itself says only "preparing the next funding round". The team decides whether to promise it.

## 6. Slide and poster copy (ready to paste, shortest first)

**Poster zone 7 (22-word budget in the wireframe):**

> Seniors use it, their children pay, banks and telcos partner. S$500,000 buys a pilot-ready app, a 200-household pilot and 12-month results.

**Market slide headline:** "Who uses it, who pays, who partners"

- Uses: seniors. 20.7% of citizens are 65 and above.
- Pays: their adult children, through a family plan at [price: team to set] a month.
- Partners: banks (slow a payment) and telcos (transfer a call).
- Market line: scams cost Singapore S$913.1 million in 2025; seniors lose the most per victim (S$37,053).

**Revenue slide headline:** "Start with the family, scale with partners"

- Now: family plan, [price: team to set].
- Next: bank fee for the cooling-off signal; telco bundle (fees: team to set).
- Honest line: no partner has signed; willingness to pay is not yet tested.

**Ask slide headline:** "S$500,000 for 12 months [terms: team to set]"

- Team 61%, design 9%, language and voice 6%, pilot 6%, security 5%, contingency 9%, infrastructure and buffer 3%.
- Milestones: pilot-ready app (month 4), 200-household pilot (months 4 to 10), gate results (month 12).

## 7. Numbers and sources

Tags refer to [`docs/research/source-library-v2.md`](../research/source-library-v2.md).

| Number | Source | URL | Check status |
| --- | --- | --- | --- |
| 20.7% of citizens 65+ (June 2025); 13.1% in 2015; 2.9 working-age citizens per senior | Population in Brief 2025 (B4) | https://www.strategygroup.gov.sg/files/population_in_brief_2025.pdf | Opened (source library) |
| S$913.1 million lost in 2025; 14.8% of victims 65+; S$37,053 per senior victim | SPF annual brief 2025 (B2) | https://www.police.gov.sg/-/media/SPF/Advisories/Scams/Annual-Scam-and-Cybercrime-Brief-2025.pdf | Opened (source library) |
| S$42,347 seniors' average loss in H1 2026 | SPF mid-year brief 2026 (B3) | https://www.police.gov.sg/-/media/SPF/Media-Room/Statistics/Mid-Year-Scam-and-Cybercrime-Brief-2026/Mid-Year-Scam-and-Cybercrime-Brief-2026.pdf | Opened (source library) |
| 89% of residents aged 60+ owned a smartphone in 2022 (74% in 2017) | IMDA, Singapore Digital Society Report 2023 | https://www.imda.gov.sg/-/media/imda/files/infocomm-media-landscape/research-and-statistics/singapore-digital-society-report/singapore-digital-society-report-2023.pdf | **New source, not in the source library.** Read as a search excerpt on 23 Oct 2026, not the full report. IMDA's Digital Society page lists smartphone ownership by age group to 2025; the AI could not read it, so the Researcher should check for a newer figure. |
| US$12.3B (2023) to US$40B (2027) US fraud losses with generative AI | Deloitte Insights (B1) | https://www.deloitte.com/us/en/insights/industry/financial-services/deepfake-banking-fraud-risk-on-the-rise.html | Opened (source library); a US figure, label it as such |
| Android can silence but not forward calls | Android Developers (B11) | https://developer.android.com/develop/connectivity/telecom/dialer-app/screen-calls | Brief-verified; not re-opened |
| Bank staff stopped a grandparent voice-clone transfer | CBC News (A9) | https://www.cbc.ca/lite/story/1.7486437 | Opened (source library) |
| Help from children and older women's quality of life in Singapore | Ang & Malhotra (2022) (B7) | https://doi.org/10.1016/j.socscimed.2022.114996 | Opened via RePEc (source library) |
| Total S$491,533.60; average monthly burn S$40,961.13; 72.4% sourced, 15.7% estimates, 11.9% needs quote (S$58,300); 10-month alternative S$435,497.62 | Budget v2 | [`docs/business/budget-v2.md`](../business/budget-v2.md) | Computed by script in budget-v2 |
| S$500,000 ask; 16 weeks to MVP; 6-month pilot; 200 households | Decision-log row 13; budget-v2 summary; design doc build plan | [`docs/process/decision-log.md`](../process/decision-log.md) | Team decision, to be ratified at kickoff |
| Break-even households (8,193; 5,121; 4,097) and the use-of-funds percentages | Computed by the AI from budget-v2 | n/a | Computed; prices are placeholders (team to set) |
| Partner designs: telco transfer (Tier 2), bank cooling-off signal valid 24 hours (Tier 3) | Design doc, Partner integrations | [`docs/prototype-design.md`](../prototype-design.md) | Design, not agreements |

## 8. For the humans

- [ ] Set the family-plan price and decide what stays free for the senior.
- [ ] Decide the terms for the S$500,000 and say them in beat 13.
- [ ] Decide whether to promise a "first partner pilot" in milestone 3.
- [ ] Ask the Researcher to (a) add the IMDA source to the library and check for the 2025 figure, (b) read the headcount of citizens aged 65 and above from Population in Brief 2025, and (c) look for a source on who funds community programmes (option 4).
- [ ] Add a willingness-to-pay question for adult children to the interview guide before V2.
- [ ] Set the pilot gate thresholds (catch rate, false alarms, "couldn't check" rate) so milestone 3 has a pass or fail.
- [ ] Add a decision-log row for the revenue model once chosen.
