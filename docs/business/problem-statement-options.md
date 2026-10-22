# Problem statement options (prep for backlog item P1)

> Draft prepared with AI assistance for the Product Owner; to be reviewed and edited by the team.

23 Oct 2026 · For the Sprint 1 kickoff (Mon 26 Oct). The team chooses one option, or merges two, at kickoff.

## What these options must fix

The instructor's feedback on the Assignment 1 problem statement asked for four changes. Every option below addresses all four:

1. **Formal, evidence-backed wording** in "How might we…" (HMW) form. Each option drops the informal phrases ("Globally the numbers are big too", "Two things stood out to us", "That is the gap we want to look into"), and every factual claim carries a citation.
2. **Solution type:** every option names a combined **technology and education** solution: an education and verification routine at the core, with AI that runs on the phone.
3. **Target audience:** the **primary user is seniors** (aged 65 and above). The **buyer is their adult children**, who pay and act as guardians. The product is not aimed at everyone.
4. **Psychology linked to technical limits:** each option ties seniors' vulnerability (time pressure, the urge to help family) to the reason a real-time audio classifier cannot solve the problem on consumer phones and networks.

Rules for the text: each option is a problem statement of 2–3 sentences plus one HMW question, with a limit of 90 words excluding parenthetical citations. The counts in the table under "Checks" come from a script, not a hand count.

---

## Option A: Why detecting the voice is not enough

*Emphasis: links psychological vulnerability directly to the technical limits (feedback point 4).*

> In 2025, Singapore residents aged 65 and above made up about 15% of scam victims but lost the most per person, about S$37,000 on average (Ministry of Home Affairs [MHA], 2026; Singapore Police Force [SPF], 2026). Voice-clone "family emergency" calls exploit time pressure and the willingness to help (Stajano & Wilson, 2011), reinforced by family-reciprocity norms among older Singaporeans (Verbrugge & Ang, 2018). Real-time audio classifiers cannot reliably intervene: Google Play bars third-party call recording, and detectors degrade sharply on real-world audio (Dobberstein, 2022; Müller et al., 2022).
>
> **HMW:** How might we give seniors, with their adult children as buyers, an education-and-verification routine backed by on-phone AI that flags scam scripts rather than voices?

## Option B: The family as the verification channel

*Emphasis: the buyer and the business case; why the check must happen inside the family.*

> Scams cost Singapore S$913.1 million in 2025, and victims aged 65 and above lost the most per person, about S$37,000 on average (SPF, 2026; MHA, 2026). Listeners judge an AI voice clone to be the real person about 80% of the time (Barrington et al., 2024), and scam scripts exploit the willingness to help (Stajano & Wilson, 2011). Because encrypted app calls bypass network-level blocking (ScamShield, n.d.), verification must happen within the family.
>
> **HMW:** How might we offer adult children a family plan that alerts them to unknown calls and gives their senior parents an offline, on-phone scam check and verification routine?

## Option C: Building a habit, not training the ear

*Emphasis: education and behaviour change; why awareness of fake voices alone does not work.*

> Seniors aged 65 and above were the only age group whose number of scam victims rose between 2024 and 2025 (MHA, 2026). Scam compliance is driven partly by visceral, emotional processing and trust in the message (Fischer et al., 2013), and listeners spotted speech deepfakes only 73% of the time, with examples improving accuracy only slightly (Mai et al., 2023). Teaching seniors to recognise a fake voice is therefore insufficient.
>
> **HMW:** How might we build a pause-and-call-back habit in seniors through family drills and on-phone AI scam-script checks that their adult children, as buyers, schedule and monitor?

---

## Comparison

| | Option A: Why detecting the voice is not enough | Option B: The family as the verification channel | Option C: Building a habit, not training the ear |
| --- | --- | --- | --- |
| What it emphasises | Seniors' vulnerability (time pressure, urge to help, family reciprocity) and why audio classifiers cannot act on live calls | Size of losses, the adult child as buyer, and why the network cannot do the check | Behaviour change: drills and a practised pause, since people cannot hear the fake |
| Solution type stated | Technology and education (routine plus on-phone AI) | Technology and education (alerts, scam check, verification routine) | Education led, supported by on-phone AI |
| Primary user / buyer | Seniors / adult children | Senior parents / adult children | Seniors / adult children |
| Investor concern it answers best | "Why not just build a deepfake detector?" (technical defensibility) | "Who pays, and how big is the problem?" (market and willingness to pay) | "Will seniors actually change behaviour?" (adoption and impact) |
| Weakness to watch | Says least about who pays | Thinnest on the psychological evidence | Weakest on the technology argument; looks like an awareness campaign |
| Feedback point covered most strongly | 4 (psychology linked to technical limits) | 3 (audience and buyer) | 2 (education side of the solution) |

## Recommendation: Team decision at kickoff

**This is an AI suggestion only. The PO and Researcher decide at kickoff (backlog item P1).**

Option A is the strongest base because it answers the instructor's fourth feedback point most directly and pre-empts the obvious investor question ("why not a deepfake detector?"). Its gap is the business case. The team could borrow Option B's first sentence (S$913.1 million in 2025) for the poster headline and keep Option A as the problem statement.

Questions for the team at kickoff:

- [ ] Which option, or which merge, becomes the final P1 statement?
- [ ] Do we keep Verbrugge and Ang (2018) as the local family-norms source, or does the Researcher have a stronger Singapore source on filial piety and scams for Source library v2 (P2)?
- [ ] Do we say "Singapore residents aged 65 and above" or "seniors" on the poster? (The MHA reply uses "seniors aged 65 and above".)
- [ ] Is "family plan" (Option B) the pricing language we want before the market slide (B2) is done?

## Checks (acceptance criteria)

Word counts were computed with `count_words.py` (kept in the AI session scratchpad, not the repo). The script strips every parenthetical citation that contains a year or "n.d.", then counts the words in the statement plus the HMW question.

| Option | Sentences in statement | Words excluding citations | Limit | Result |
| --- | --- | --- | --- | --- |
| A | 3 | 88 | 90 | Pass |
| B | 3 | 87 | 90 | Pass |
| C | 3 | 86 | 90 | Pass |

The same script also searched the three options for the informal phrases from the feedback ("numbers are big", "stood out to us", "the gap we want"). Result: none found. It also confirmed that each HMW question begins "How might we".

Sources marked "new" below are not in the Assignment 1 library. The Researcher should decide whether to add them to Source library v2 (P2).

## References

Barrington, S., Cooper, E. A., & Farid, H. (2024). *People are poorly equipped to detect AI-powered voice clones* (arXiv:2410.03791). arXiv. https://arxiv.org/abs/2410.03791 (Assignment 1 library)

Buse, J. H. M., Fong, C., & Tripathi, S. (2024). The interplay of social behaviour and demographics in cyber scam susceptibility: A Singapore study. *Open Journal of Business and Management, 12*(5), 2949–2964. https://doi.org/10.4236/ojbm.2024.125151 (Assignment 1 library; not cited in the options; see note below)

Dobberstein, L. (2022, April 22). Google bans third-party call-recording apps from Play Store. *The Register*. https://www.theregister.com/2022/04/22/google_banning_thirdparty_callrecording_apps/ (new)

Fischer, P., Lea, S. E. G., & Evans, K. M. (2013). Why do individuals respond to fraudulent scam communications and lose money? The psychological determinants of scam compliance. *Journal of Applied Social Psychology, 43*(10), 2060–2072. https://doi.org/10.1111/jasp.12158 (Assignment 1 library)

Mai, K. T., Bray, S., Davies, T., & Griffin, L. D. (2023). Warning: Humans cannot reliably detect speech deepfakes. *PLOS ONE, 18*(8), Article e0285333. https://doi.org/10.1371/journal.pone.0285333 (Assignment 1 library)

Ministry of Home Affairs. (2026, May 7). *Trends in scam cases involving seniors and measures to improve asset recovery* [Oral reply to parliamentary questions by Goh Pei Ming, Minister of State]. https://www.mha.gov.sg/media-room/newsroom/trends-in-scam-cases-involving-seniors-and-measures-to-improve-asset-recovery/ (new; reports SPF's 2025 figures for seniors aged 65 and above)

Müller, N. M., Czempin, P., Dieckmann, F., Froghyar, A., & Böttinger, K. (2022). *Does audio deepfake detection generalize?* (arXiv:2203.16263) [Paper presentation]. Interspeech 2022. https://arxiv.org/abs/2203.16263 (new)

ScamShield. (n.d.). *Why do I still receive scam calls or messages, after I have installed the ScamShield app?* AskGov. Retrieved October 23, 2026, from https://ask.gov.sg/scamshield/questions/clhpq3amk0008l2087522usmq (new)

Singapore Police Force. (2026, February 25). *Scams and cybercrime fell by almost a quarter in 2025* [Article by E. Sng]. Police Life. https://www.police.gov.sg/media-hub/police-life/2026/02/scams-and-cybercrime-fell-by-almost-a-quarter-in-2025 (new)

Stajano, F., & Wilson, P. (2011). Understanding scam victims: Seven principles for systems security. *Communications of the ACM, 54*(3), 70–75. https://doi.org/10.1145/1897852.1897872 (Assignment 1 library)

Verbrugge, L. M., & Ang, S. (2018). Family reciprocity of older Singaporeans. *European Journal of Ageing, 15*, 287–299. https://doi.org/10.1007/s10433-017-0452-1 (new)

## Notes on how each source is used (for the Researcher)

- **SPF (2026)** gives S$913.1 million lost in 2025 and "$37,053 per elderly victim", the highest of any age group. The page does not define "elderly" by age. **MHA (2026)** gives the 65-and-above definition: "about 15% of all scam victims", "about $37,000 on average, the highest among all age groups", and "the only age group to register an increase in the number of victims between 2024 and 2025". Use both together.
- **Do not use the brief's "8.4% of victims aged 65+" figure for 2025.** That figure is for 2024. The 2025 share is about 15% (MHA, 2026).
- **Stajano and Wilson (2011)** set out seven principles, including the Time principle (under time pressure people use a different decision strategy) and the Kindness principle ("People are fundamentally nice and willing to help").
- **Fischer et al. (2013)** found victims differed mainly in their response to very high-value incentives, with positive emotion and trust in the message as other factors; the authors call the first two "visceral processing". This work studied mass-marketed scams, not voice-clone calls, so it is cited for the general mechanism only.
- **Verbrugge and Ang (2018)** used the Panel on Health and Aging of Singaporean Elderly (2011, aged 62+, N = 3,103). They found older Singaporeans reciprocate help received from family, including money and grandchild care. It is a local family-norms source, **not** a study of scams. A Singapore source linking filial piety to scam compliance is still missing (needs a source).
- **Buse et al. (2024)** is listed but not cited in the options. Its survey (n = 300, of whom about 12 were over 60) found that social engagement did not significantly predict victimisation, and found no significant age effect among Singapore residents. **It does not show that seniors are more susceptible, so do not cite it for that claim.**
- **Barrington et al. (2024)** is an arXiv preprint and **Müller et al. (2022)** an arXiv version of an Interspeech paper. Prefer the peer-reviewed versions if the Researcher can locate them; the Interspeech page numbers need verification.
