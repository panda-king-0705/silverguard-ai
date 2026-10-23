# Budget v2: 12-month seed budget with researched numbers (backlog item B1)

> Draft prepared with AI assistance for the Product Owner; to be reviewed and edited by the team.

23 Oct 2026 · Machine-readable version: [`budget-v2.csv`](budget-v2.csv) · All figures in Singapore dollars (S$)

## Summary

| | S$ |
| --- | --- |
| **Total, 12 months (including 10% contingency)** | **491,533.60** |
| Average monthly burn (total ÷ 12) | 40,961.13 |
| Staff cost per month (3 engineers + 0.5 designer, including employer CPF) | 28,881.45 |
| Lines backed by a published source | 355,983.93 (72.4% of total) |
| Lines that are team estimates | 77,249.67 (15.7%) |
| Lines that need a vendor quote | 58,300.00 (11.9%) |

**What the money buys:** a pilot-ready Android MVP in 16 weeks (about 3.7 months), built by 2 Android engineers, 1 ML engineer and a part-time designer, as in the design doc's build plan. It then funds a 6-month pilot with 200 households through community or senior activity centres. The last 2 months cover evaluating the pilot against its gate (catch rate, false alarms, "couldn't check" rate) and preparing the next funding round.

**Main finding for the team:** salaries at official Singapore median wages put the **product team at S$305,650.80, above the seed skeleton's S$180k–260k range**. The total of S$491,533.60 is near the top of the skeleton's overall range: S$319,000–500,500 including contingency, by script. The decisions this raises are listed under "Decisions for the team" below.

## Line items

All arithmetic was done by `budget.py` (in the AI session scratchpad), which also writes `budget-v2.csv`. The figures below are pasted from its output. Confidence is **sourced** (published price or official statistic), **estimate** (team assumption, no source) or **needs quote** (placeholder until a vendor quotes).

### 1. Product team (seed range S$180,000–260,000) → **S$305,650.80, above range**

| Item | Unit cost | Qty | Months | Subtotal | Confidence | Source |
| --- | --- | --- | --- | --- | --- | --- |
| Android app developer, gross monthly wage | 6,400.00 | 2 | 12 | 153,600.00 | sourced | [MOM Occupational Wages 2025, Table 3](https://stats.mom.gov.sg/iMAS_Tables1/Wages/Wages_2025/mrsd_2025Wages_table3.xlsx): Software developer (SSOC 25121), age 25–29 median gross |
| ML engineer, gross monthly wage | 8,970.00 | 1 | 12 | 107,640.00 | sourced | Same table: AI/Machine learning engineer (SSOC 25143), age 25–29 median gross |
| Employer CPF on developer wages (17%) | 1,088.00 | 2 | 12 | 26,112.00 | sourced | [CPF Board employer rates](https://www.cpf.gov.sg/employer/employer-obligations/how-much-cpf-contributions-to-pay): 17% from 1 Jan 2026, aged 55 and below |
| Employer CPF on ML engineer wage (17%) | 1,524.90 | 1 | 12 | 18,298.80 | sourced | Same; 17% on the full wage is an upper bound (see note) |

### 2. UX research and accessibility (seed range S$30,000–50,000) → **S$45,126.60, within range**

| Item | Unit cost | Qty | Months | Subtotal | Confidence | Source |
| --- | --- | --- | --- | --- | --- | --- |
| Part-time UX/interaction designer (0.5 of S$5,830 median gross) | 2,915.00 | 1 | 12 | 34,980.00 | sourced | MOM Table 3: Interaction designer (SSOC 25124), age 25–29 median gross; 0.5 FTE is a team assumption |
| Employer CPF on designer wage (17%) | 495.55 | 1 | 12 | 5,946.60 | sourced | CPF Board employer rates |
| Co-design thank-you vouchers (8 seniors × 6 sessions) | 50.00 | 48 | 1 | 2,400.00 | estimate | Team assumption |
| Co-design venue, refreshments, printed materials | 300.00 | 6 | 1 | 1,800.00 | estimate | Team assumption |

### 3. Language and voice data (seed range S$25,000–40,000) → **S$30,500.00, within range**

| Item | Unit cost | Qty | Months | Subtotal | Confidence | Source |
| --- | --- | --- | --- | --- | --- | --- |
| Transcription and labelling of the test set (English, Mandarin, Malay, Tamil, dialect samples) | 20,000.00 | 1 | 1 | 20,000.00 | needs quote | Placeholder; ask local transcription vendors |
| Voice actors for drill scenarios (4 languages + 3 dialects) | 1,500.00 | 7 | 1 | 10,500.00 | needs quote | Placeholder per language or dialect; ask voice-actor agencies or studios |

### 4. Community pilot, 200 households (seed range S$30,000–50,000) → **S$30,160.00, within range**

| Item | Unit cost | Qty | Months | Subtotal | Confidence | Source |
| --- | --- | --- | --- | --- | --- | --- |
| Household participation voucher | 50.00 | 200 | 1 | 10,000.00 | estimate | Team assumption |
| Partner fee for community or senior activity centres | 3,000.00 | 4 | 1 | 12,000.00 | estimate | Team assumption; may be in kind |
| Loaner phones for households without a compatible Android phone (Samsung Galaxy A07) | 258.00 | 20 | 1 | 5,160.00 | sourced | [Samsung Singapore online store](https://www.samsung.com/sg/smartphones/all-smartphones/), page dated 16 Oct 2026; 20 loaners (10%) is an assumption |
| Onboarding events and printed guides | 3,000.00 | 1 | 1 | 3,000.00 | estimate | Team assumption |

### 5. Security and PDPA compliance (seed range S$20,000–40,000) → **S$27,000.00, within range**

| Item | Unit cost | Qty | Months | Subtotal | Confidence | Source |
| --- | --- | --- | --- | --- | --- | --- |
| Penetration test of the app and backend | 15,000.00 | 1 | 1 | 15,000.00 | needs quote | Placeholder; get 2–3 vendor quotes |
| Privacy review (data protection impact assessment) and legal advice | 12,000.00 | 1 | 1 | 12,000.00 | needs quote | Placeholder; covers consent wording, breach-response plan, PDPA review |

### 6. Infrastructure (seed range S$5,000–15,000) → **S$8,411.33, within range**

| Item | Unit cost | Qty | Months | Subtotal | Confidence | Source |
| --- | --- | --- | --- | --- | --- | --- |
| Google Play developer registration (US$25, one-time) | 31.94 | 1 | 1 | 31.94 | sourced | [Play Console Help](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en) |
| Firebase Blaze usage | 0.00 | 1 | 12 | 0.00 | sourced | [Firebase pricing](https://firebase.google.com/pricing): no-cost quotas of 20K Firestore writes/day, 50K reads/day and 2M function invocations/month far exceed the pilot's ~600 events/day |
| Cloud usage buffer (Cloud Tasks, logging, overage) | 50.00 | 1 | 12 | 600.00 | estimate | Team assumption |
| WhatsApp utility alerts, 18,000 per month during the 6-month pilot | 0.0256 | 18,000 | 6 | 2,764.80 | estimate | **Needs verification.** [Meta's pricing page](https://developers.facebook.com/docs/whatsapp/pricing) confirms per-message pricing from 1 Jul 2025, but the Singapore rate card could not be opened. US$0.02 is a placeholder, not Meta's price |
| SMS fallback and guardian sign-in codes, about 2,200 per month | 0.0755 | 2,200 | 6 | 996.60 | sourced | [Twilio Singapore SMS pricing](https://www.twilio.com/en-us/sms/pricing/sg): US$0.0591 per segment; volume (10% of alerts + 400 sign-ins) is an assumption |
| Test phone: Samsung Galaxy A07 (×2, entry tier) | 258.00 | 2 | 1 | 516.00 | sourced | Samsung Singapore online store, 16 Oct 2026 |
| Test phone: Samsung Galaxy A27 5G (lower mid tier) | 458.00 | 1 | 1 | 458.00 | sourced | Same |
| Test phone: Samsung Galaxy A37 5G (mid tier) | 548.00 | 1 | 1 | 548.00 | sourced | Same |
| Test phone: Samsung Galaxy A57 5G (upper mid tier) | 678.00 | 1 | 1 | 678.00 | sourced | Same |
| Test phone: Samsung Galaxy S26 FE (premium tier) | 1,017.99 | 1 | 1 | 1,017.99 | sourced | Same |
| Test phones: 2 budget phones from other brands | 400.00 | 2 | 1 | 800.00 | needs quote | Placeholder; the design doc asks for testing on 3 brands |

The two Galaxy A07 test phones are separate lines in the CSV. They are combined here for readability.

### Contingency

| Item | Subtotal | Confidence |
| --- | --- | --- |
| 10% of the pre-contingency subtotal (S$446,848.73) | 44,684.87 | estimate |

## Script output (pasted)

```
CATEGORY TOTALS (S$)                 total        seed range         status
Product team                         305,650.80   180,000-260,000    ABOVE
UX research and accessibility         45,126.60    30,000-50,000     within
Language and voice data               30,500.00    25,000-40,000     within
Community pilot                       30,160.00    30,000-50,000     within
Security and PDPA compliance          27,000.00    20,000-40,000     within
Infrastructure                         8,411.33     5,000-15,000     within
Subtotal before contingency          446,848.73
Contingency 10%                       44,684.87
TOTAL 12 months                      491,533.60
Average monthly burn (total/12)       40,961.13
Monthly staff cost incl. CPF          28,881.45
WhatsApp line 2,764.80; each +US$0.01 per message adds 1,379.71
CHECK lines: 29 | line arithmetic errors: [] | CSV sum: 491,533.60 | equals TOTAL: True
      | lines lacking source or label: [] | confidence values: ['estimate', 'needs quote', 'sourced']
Scenario: product team for 10 months instead of 12: 254,709.00 (saves 50,941.80);
      total with contingency recomputed: 435,497.62
```

## Assumptions and notes

- **Exchange rate:** US$1 = S$1.277506 ([x-rates.com](https://www.x-rates.com/calculator/?from=USD&to=SGD&amount=1); the page showed a 1 Jan 2026 timestamp). Recheck before the pitch. US-dollar lines total under S$4,000, so the effect is small.
- **Salaries:** MOM medians for full-time resident employees aged 25–29, all establishment sizes, gross wages excluding bonuses (June 2025). MOM publishes no "entry-level" column; 25–29 is the youngest age band shown. The Web/Mobile applications developer median (SSOC 25122) is lower at S$5,450 for age 25–29; the budget uses the Software developer median because native Android work is closer to that role. Team to confirm.
- **CPF:** 17% is applied to full wages as an upper bound. The CPF Ordinary Wage ceiling caps contributions for the ML engineer's wage. The ceiling amount was not confirmed on the CPF page and needs verification. Excluded: Skills Development Levy, bonuses, equipment and laptops, office space, insurance, and company registration.
- **Volumes:** 18,000 WhatsApp alerts per month comes from the design doc (200 households × 3 unknown calls a day). Alerts are charged only during the 6 pilot months. Letting guardians choose "alert only after Pause & Verify or a High risk check" would cut this line.
- **iPhone:** no Apple Developer Program fee is included because the MVP is Android-first.

## Decisions for the team (PO to raise at kickoff or Sprint 1 planning)

**Decided 23 Oct 2026 (Yaoyun, for the team):** the pitch asks for **S$500,000**: the 12-month budget of S$491,533.60 plus S$8,466.40 of extra buffer, rounded to a clean number. Team to ratify at kickoff.

- [ ] **The product team is above the seed range.** Options: (a) raise the range in the pitch to about S$305k; (b) fund engineers for 10 months (MVP + pilot) instead of 12, which brings the line to S$254,709.00 and the total to S$435,497.62; (c) hire one engineer at the lower Web/Mobile developer median. The pitch should state one choice.
- [ ] **WhatsApp price:** someone should check Meta's Singapore utility rate in the official rate card and replace the placeholder. Each extra US$0.01 per message adds S$1,379.71.
- [ ] **Needs-quote lines (S$58,300.00):** voice actors, transcription, pen test, privacy and legal review, and two non-Samsung phones. Ask 1–2 vendors for indicative quotes, or keep them labelled as placeholders on the poster.
- [ ] **Pilot partners:** confirm whether centres charge fees or contribute in kind, and agree the voucher amounts.
- [ ] Which budget figure goes on the poster: S$492k (12 months) or S$435k (10-month team)?
