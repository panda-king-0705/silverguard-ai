# Poster wireframe (backlog item P3)

> Draft prepared with AI assistance for the Designer; to be reviewed and edited by the team.

`index.html` is an A3 portrait wireframe (297 × 420 mm) for the Assignment 2 poster. It is one offline file with no CDNs, fonts or images. It has 11 labelled grey zones in reading order, each with its job, word budget, type size, diagram to reuse and open items (red flags). It feeds P4 Poster v1 (Sprint 2).

## How to use it

- **Content notes** (default) shows what goes in each zone, sources, and items still to verify.
- **Density test** fills every zone with its budgeted number of placeholder words at real print size, with the body size you choose (16–28 pt). Zones that overflow get a red outline. Use it to see what a word count costs before writing copy.
- **Print** (Ctrl/Cmd+P) gives one A3 page at true size. Choose A3 and 100% scale, then print or save as PDF and hold it at 1–2 m to judge it.

## Zones and why this order

| # | Zone | Words | Reuse |
| --- | --- | --- | --- |
| 1 | Title + one-line hook | 11 | — |
| 2 | The problem: three numbers + sources strip | 30 | — |
| 3 | Why today's defences miss it | 22 | — |
| 4 | The solution: three layers | 30 | `docs/diagrams/guardian-alert-flow.png` (simplified to its 4 bottom boxes) + 3 phone shots from `design/clickable-screens` (home, High risk, Practice call) |
| 5 | How the AI decides | 28 | Cue table from `docs/prototype-design.md`, redrawn as chips |
| 6 | The privacy line (full-width band) | 13 | `docs/diagrams/architecture.png`, cropped to phone → privacy line → cloud |
| 7 | Business case | 22 | `docs/diagrams/mvp-timeline.png` as a thin strip ("what the seed buys") |
| 8 | How our thinking evolved | 24 | — (three-step arrow) |
| 9 | What grandparents told us | 24 | — |
| 10 | Risks and how we limit them | 24 | — |
| 11 | Sources · AI-usage note · demo QR | 48 | — |
| | **Total** | **276** | |

Reasoning for the order:

1. **Hook, then cost, then gap (1 → 3).** An investor needs the stakes in seconds: the title and the three numbers are the only text readable from beyond 2 m. Zone 3 then explains why the money is still lost despite existing tools, which sets up the value-add.
2. **Answer, then mechanism, then promise (4 → 6).** The three layers are the largest zone, at the visual centre, ordered by time (before answering, during, before money moves). "How it decides" sits beside the solution, so the AI claim is explained where it is made. The privacy line runs as a full-width band because it is the claim judges should remember and the one that differs from cloud tools.
3. **Viability and honesty last (7 → 11).** Business case and evolution answer the A1 feedback (missing business lens). Then come the human evidence (quotes) and the limits (risks), with sources and the AI note in the footer, where readers expect them.
4. Reading runs left to right, top to bottom, in seven rows; the numbered badges make the path explicit. In the four rows with two zones, the left zone is read first.

## Word budget: 276 recommended, 450 is only a ceiling

The density test measured how many words each zone holds with the planned diagrams:

| Body size | Words that fit (all zones) | Body readable to* |
| --- | --- | --- |
| 14 pt | about 520 | 0.74 m |
| 16 pt | about 420 | 0.84 m |
| 20 pt | about 300 (budget set to 276, leaving slack) | 1.05 m |
| 24 pt | about 215 (zone 2 no longer fits) | 1.26 m |

So **450 words on an A3 page with three diagrams would need about 15 pt body text**, readable only from about 0.8 m. The budgets above keep body text at 20 pt (readable at 1 m) and stay well inside the 450 cap. The team decides the trade-off (see open decisions).

Counting rule: everything printed on the poster except the QR code, including headings, diagram labels and the sources strip.

## Type scale for A3 read at 1–2 m

| Role | Size | Readable to* |
| --- | --- | --- |
| Title | 72 pt | 3.8 m |
| Stat numbers | 48 pt | 2.5 m |
| Hook, zone headings, privacy line | 32 pt | 1.7 m |
| Layer names, diagram labels | 28 pt | 1.5 m |
| Body, quotes | 20 pt | 1.05 m |
| Sources strip, AI note | 12 pt | 0.6 m (read close up) |

\*Distance at which the letters' x-height subtends 0.2° of visual angle. That is the consensus critical print size for normally sighted readers, below which reading slows (Legge & Bigelow 2011, "Does print size matter for reading?", *Journal of Vision* 11(5):8, [PDF](https://legge.dl8.umn.edu/sites/legge.psych.umn.edu/files/2020-08/Legge%20Bigelow%202011%20Does%20size%20matter%20for%20reading%3F%20A%20review%20of%20findings%20from%20vision%20science%20and%20typography.pdf)). The distances assume x-height is 0.52 of the font size, typical of system sans fonts, so treat them as a guide. Rule of thumb: about 38 pt for 2 m and 19 pt for 1 m. Older judges or poor lighting need more margin, which is another reason to keep the word count low.

Use one sans family throughout, sentence case, and at most two weights. Colour should follow the clickable screens: teal for protection, red only for risk and always paired with words and an icon.

## Diagram reuse notes

- The PNGs in `docs/diagrams/` are 1344 px wide. That is about 360 ppi at the planned 95 mm width in zone 4, which is fine, but only about 120 ppi if stretched across the full poster. Ask whoever made them for a larger or vector export if any is used wider than about 110 mm.
- Simplify rather than shrink: zone 4 needs only the "Ring silenced → Guardian alerted → Senior can still answer → Guardian follows up" boxes, and zone 6 needs only the privacy-line band of the architecture diagram.
- Phone shots: capture them from `design/clickable-screens/index.html` once the translations are checked.

## Rubric mapping (Assignment 2)

Rubric wording below follows the task brief; **check it against the official Assignment 2 rubric** before Poster v1.

| Rubric item | Zone(s) | How the zone answers it |
| --- | --- | --- |
| Problem identification | 2, 1, 3 | Three sourced numbers on cost and who is exposed; the hook names the person and moment; zone 3 shows the gap |
| Critical thinking: STEM lens | 3, 5 | Why ears and acoustic detectors fail; detecting the script, not the voice; on-device AI; the honest demo-vs-product line |
| Critical thinking: business / governance lens | 7, 6, 10 | Who uses, pays and partners, and the seed ask; PDPA and consent (data stays on the phone); misuse controls |
| Critical thinking: social-science lens | 3, 4, 9 | Human limits in spotting cloned voices; family in the loop (local household and filial context needs a source from P2); grandparents' reactions |
| Problem solving: logic | 4, 5 | Three layers ordered by time; how the verdict is reached; no "safe" level |
| Problem solving: value-add over existing solutions | 3, 4 | ScamShield cannot see app calls and people cannot hear clones; SilverGuard works on the script and brings family in before money moves |
| Problem solving: limits | 10, 5 | Risks and mitigations; rules-engine demo line; dialects; iPhone and app-call limits |
| Organisation: flow | 1–11 | Numbered reading order, seven rows, largest zone at the centre |
| Organisation: standalone | 1, 2, 6 | Hook, numbers and privacy line make sense without a presenter; plain words, no jargon |
| Organisation: visuals | 2, 4, 6, 7 | Stat numbers, flow diagram + phone shots, privacy crop, timeline strip |
| Organisation: citations | 2, 11 | Sources strip under the numbers; numbered short references in the footer |
| Organisation: AI usage | 11 | One or two lines on how AI was used and checked, from the decision and AI-usage log (V4) |

## Facts on the wireframe and their status

| Fact | Status | Source |
| --- | --- | --- |
| S$913.1M lost to scams in Singapore in 2025; 85.2% of victims under 65 | Verified in team brief | [Malay Mail, 26 Feb 2026](https://www.malaymail.com/news/singapore/2026/02/26/singapore-police-scam-cases-drop-248pc-in-2025-losses-fall-to-s913m-but-youths-remain-most-affected/210482); [SPF summary](https://www.police.gov.sg/media-hub/police-life/2026/02/scams-and-cybercrime-fell-by-almost-a-quarter-in-2025) |
| Elderly victims had the highest average loss per victim in 2024 | Verified on SPF page (it says "the elderly" and gives no age cut-off) | [SPF, Feb 2025](https://www.police.gov.sg/media-hub/police-life/2025/02/five-things-you-should-know-about-the-annual-scams-and-cybercrime-brief-2024) |
| "65 and over" were 8.4% of 2024 victims | **Secondary source only: verify against the SPF brief PDF** | [daibieunhandan.vn, 26 Feb 2025](https://en.daibieunhandan.vn/print/10369277.html) |
| 20.7% of citizens aged 65+ in June 2025 | Verified in team brief | [Population in Brief 2025](https://www.strategygroup.gov.sg/files/population_in_brief_2025.pdf) |
| ScamShield cannot block WhatsApp/Telegram calls | Verified in team brief | [ask.gov.sg](https://ask.gov.sg/scamshield/questions/clhpq3amk0008l2087522usmq) |
| People cannot reliably detect cloned speech | A1 library (Mai et al. 2023, PLOS ONE; Barrington, Cooper & Farid 2024, arXiv); **quote the exact finding** | A1 source library |
| Detectors weak on phone audio and new clones | Design-doc claim; **needs a specific finding** (Yi et al. 2023 survey or Researcher's P2 pick) | A1 source library |

The wireframe deliberately says S$913.1M covers all scam types, not only voice clones, and that most 2025 victims were under 65. The honest framing is that "seniors lose the most per case".

## Open decisions for the team

- [ ] **Word count:** keep 276 words at 20 pt body (recommended), go up to about 420 at 16 pt, or use the full 450 at about 15 pt (readable only close up)?
- [ ] **Hook wording** (zone 1). The draft "When a cloned voice says 'Ma, it's me', family hears first." is only a starting point.
- [ ] **Second stat:** use the 2024 "highest average loss" stat once SPF confirms the 65+ cut-off, or the H1 2025 government-impersonation average (about S$71,842 per victim, also from a secondary source)?
- [ ] **Business numbers:** who pays, and the seed ask, from B1 Budget v2 (PO).
- [ ] **A1 position:** one line on what Assignment 1 argued (zone 8). The AI did not guess this.
- [ ] **Existing solutions:** name Google Pixel's on-device Scam Detection in zone 3 as an honest comparison? Its availability in Singapore needs verification.
- [ ] **Quotes:** only real, consented, anonymised quotes from V2 sessions; leave zone 9 empty rather than paraphrase.
- [ ] **QR target:** the public repo or a hosted demo page (links to C4 repo visibility).
- [ ] **AI-usage note** wording, from the SM's V4 log.
- [ ] **Diagram exports** at print resolution if any diagram is used wider than about 110 mm.

## Checks

```
python3 checks/check_poster.py              # add --capacity to re-measure words per zone
```

This uses the locally installed Playwright and Chromium and downloads nothing. It checks:
- no external resources or network requests;
- the A3 aspect ratio;
- 11 zones in reading order;
- a total of 450 words or fewer;
- every zone fits in density mode at 20 pt;
- printing gives exactly one A3 page;
- every rubric row above maps to zones that exist.

Last run (23 Oct 2026): PASS.
