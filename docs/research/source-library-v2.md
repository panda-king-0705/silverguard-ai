> Draft prepared with AI assistance for the Researcher; to be reviewed and edited by the team.

# SilverGuard AI: source library v2 (P2)

Version 0.1, 23 Oct 2026. Replaces the Assignment 1 library. It answers the instructor's feedback: it adds a BUSINESS lens, gives a reason for every dual label, swaps vendor and preprint sources for peer-reviewed ones, gives each source a "role" line, and adds local sources (filial piety, Singapore victim data).

**How to read the tables**
- **Lens**: STEM (science and technology), BIZ (business and markets), GOV (government, law, policy, platform rules), SSH (social sciences and humanities). A dual label always has a one-line reason.
- **Role**: what we could not claim without this source (max 30 words).
- **Verified**: "Opened" means the AI assistant opened that page or record on 22–23 Oct 2026 and checked the citation details. "Brief" means the orchestrator verified it in the Sprint 1 brief and it was not re-opened. Anything else is marked **needs verification**.
- Humans should spot-check at least the five sources the poster will actually quote.

## A. Assignment 1 sources: keep (role lines rewritten)

| # | Citation (APA 7) | Lens | Role ("Without this we couldn't claim …") | Verified URL or DOI |
| --- | --- | --- | --- | --- |
| A1 | Government Technology Agency of Singapore. (2024, November 25). *AI scams are everywhere, so here's how you can outsmart them*. | GOV | …that a Singapore government agency itself warns that scammers clone voices from short social-media clips to pressure family into sending money quickly. | https://www.tech.gov.sg/technews/ai-scams-are-everywhere-so-heres-how-you-can-outsmart-them/ (opened) |
| A2 | Balcombe, L. (2025). The mental health impacts of internet scams. *International Journal of Environmental Research and Public Health, 22*(6), 938. | SSH | …that scam harm goes beyond money, to depression, shame and isolation that last longest after large losses. Note: a "Perspective" article, so it argues rather than measures. | https://doi.org/10.3390/ijerph22060938 (opened) |
| A3 | Fischer, P., Lea, S. E. G., & Evans, K. M. (2013). Why do individuals respond to fraudulent scam communications and lose money? The psychological determinants of scam compliance. *Journal of Applied Social Psychology, 43*(10), 2060–2072. | SSH | …that scam compliance comes from predictable psychological pressure, which justifies detecting the script's pressure cues instead of the voice. | https://doi.org/10.1111/jasp.12158 (opened via Crossref record) |
| A4 | Federal Trade Commission. (2024, April 8). *Approaches to address AI-enabled voice cloning*. | GOV | …that a national regulator treats AI voice cloning as a consumer-fraud problem needing technical and policy responses, not only public awareness. | https://www.ftc.gov/policy/advocacy-research/tech-at-ftc/2024/04/approaches-address-ai-enabled-voice-cloning (listing opened; post itself not re-read) |
| A5 | Mai, K. T., Bray, S., Davies, T., & Griffin, L. D. (2023). Warning: Humans cannot reliably detect speech deepfakes. *PLOS ONE, 18*(8), e0285333. | STEM | …that people cannot be trained to reliably hear a fake voice, so "listen carefully" advice is not enough. | https://doi.org/10.1371/journal.pone.0285333 (opened via Crossref record) |
| A6 | Singapore Police Force, Monetary Authority of Singapore, & Cyber Security Agency of Singapore. (2025, March 12). *Joint advisory on scams involving digital manipulation*. | GOV | …that Singapore agencies already advise verifying requests through separate, established channels, which is the behaviour Pause & Verify builds in. Note: it targets businesses and video calls. | https://www.police.gov.sg/media-hub/news/2025/03/20250312_joint_advisory_on_scams_involving_digital_manipulation (opened) |
| A7 | Federal Bureau of Investigation, Internet Crime Complaint Center. (2026). *2025 IC3 annual report*. | GOV | …that a national crime agency records "distress" scams using voice cloning, and that over-60s lost US$7.748 billion in 2025, up 59%. | https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf (opened). Release date: **needs verification** (coverage dated 16 Apr 2026). |
| A8 | Stajano, F., & Wilson, P. (2011). Understanding scam victims: Seven principles for systems security. *Communications of the ACM, 54*(3), 70–75. | SSH / STEM | …that scam psychology (distraction, social compliance, need and greed) should shape system design. **Dual because** it turns behavioural research into design rules for engineers. | https://doi.org/10.1145/1897852.1897872 (opened via Crossref record) |
| A9 | CBC News. (2025, March 20). *Her grandson's voice said he was under arrest. This senior was almost scammed with suspected AI voice cloning* [Marketplace]. | SSH | …a concrete grandparent voice-clone case. Bank staff, not the senior, stopped it, which supports our "before money moves" bank layer. | https://www.cbc.ca/lite/story/1.7486437 (opened). The page credits Marketplace/CBC News; author names "Vellani & Common" from Assignment 1 **need verification** on the full page. |
| A10 | Barrington, S., Cooper, E. A., & Farid, H. (2025). People are poorly equipped to detect AI-powered voice clones. *Scientific Reports, 15*, Article 11004. | STEM | …that listeners often judge an AI clone to be the real person (peer-reviewed, 604 participants), so family members cannot rely on recognising a voice. | https://doi.org/10.1038/s41598-025-94170-3 (opened, PMC11958761). **Now peer-reviewed:** replace the 2024 arXiv citation. |
| A11 | Sobolev, A. (2025). The last call for authenticity: AI reshaping voice fraud landscape. *Journal of Cyber Policy, 10*(2), 182–202. | GOV | …that cyber-policy scholarship sees synthetic voice fraud as a more immediate threat than other deepfakes, which justifies a voice-first focus. | https://doi.org/10.1080/23738871.2025.2597191 (opened; paywalled) |
| A12 | Buse, J. H. M., Fong, C., & Tripathi, S. (2024). The interplay of social behaviour and demographics in cyber scam susceptibility: A Singapore study. *Open Journal of Business and Management, 12*(5), 2949–2964. | SSH | …local survey evidence (n = 300) that social engagement did not protect Singapore residents from scams. Use cautiously: small online sample, and age was not significant for residents. | https://doi.org/10.4236/ojbm.2024.125151 (opened) |
| A13 | Singh, S., & Dhumane, A. (2025). Unmasking digital deceptions: An integrative review of deepfake detection, multimedia forensics, and cybersecurity challenges. *MethodsX, 15*, 103632. | STEM | …a recent peer-reviewed overview of deepfake detection methods across media. Optional: the ASVspoof papers (B9–B10) make the audio point more directly. | https://doi.org/10.1016/j.mex.2025.103632 (opened via Crossref record; full title differs from Assignment 1, so update it) |
| A14 | Yi, J., Wang, C., Tao, J., Zhang, X., Zhang, C. Y., & Zhao, Y. (2023). *Audio deepfake detection: A survey* (arXiv:2308.14970) [Preprint]. arXiv. | STEM | …a broad map of audio deepfake datasets and detectors. **Demote:** use only for background; cite B8–B10 for any claim. | https://arxiv.org/abs/2308.14970 (opened). **No peer-reviewed version found**: the arXiv page shows no journal reference and searches found none (23 Oct 2026). |

## B. New sources

| # | Citation (APA 7) | Lens | Role ("Without this we couldn't claim …") | Verified URL or DOI |
| --- | --- | --- | --- | --- |
| B1 | Lalchand, S., Srinivas, V., Maggiore, B., & Henderson, J. (2024, May 29). *Generative AI is expected to magnify the risk of deepfakes and other fraud in banking*. Deloitte Insights. | BIZ | …that generative AI could push US fraud losses from US$12.3B (2023) to US$40B by 2027, 32% a year. That gives banks a business case to pay for prevention partners. | https://www.deloitte.com/us/en/insights/industry/financial-services/deepfake-banking-fraud-risk-on-the-rise.html (opened) |
| B2 | Singapore Police Force. (2026a). *Annual scam and cybercrime brief 2025*. | GOV | …Singapore's 2025 baseline: 37,308 cases and S$913.1M lost. Seniors 65+ were 14.8% of victims but lost the most per victim (S$37,053). | https://www.police.gov.sg/-/media/SPF/Advisories/Scams/Annual-Scam-and-Cybercrime-Brief-2025.pdf (opened; dated 25 Feb 2026) |
| B3 | Singapore Police Force. (2026b). *Mid-year scam and cybercrime brief 2026*. | GOV | …the latest trend: H1 2026 seniors' average loss rose to S$42,347, while fake-friend call scams fell to 353 cases (from 1,052). | https://www.police.gov.sg/-/media/SPF/Media-Room/Statistics/Mid-Year-Scam-and-Cybercrime-Brief-2026/Mid-Year-Scam-and-Cybercrime-Brief-2026.pdf (opened; dated 26 Aug 2026) |
| B4 | National Population and Talent Division, Singapore Department of Statistics, Ministry of Home Affairs, Immigration & Checkpoints Authority, & Ministry of Manpower. (2025). *Population in brief 2025*. | GOV | …that 20.7% of citizens were 65+ in June 2025 (13.1% in 2015), and only 2.9 working-age citizens support each senior. Our users are a growing group. | https://www.strategygroup.gov.sg/files/population_in_brief_2025.pdf (opened; Sept 2025) |
| B5 | Google. (n.d.). *Use Scam Detection*. Phone app Help. Retrieved October 22, 2026. | STEM / BIZ | …that on-device scam detection with no audio stored or sent is technically feasible. **Dual because** it is also the incumbent: Pixel-only, off by default, limited countries. | https://support.google.com/phoneapp/answer/15654065?hl=en (opened) |
| B6 | Dobberstein, L. (2022, April 22). Google bans third-party call-recording apps from Play Store. *The Register*. | GOV / BIZ | …that Play Store rules bar third-party apps from capturing call audio. **Dual because** a platform rule (governance) directly limits what our product can do and sell. | https://www.theregister.com/2022/04/22/google_banning_thirdparty_callrecording_apps/ (opened) |
| B7 | Ang, S., & Malhotra, R. (2022). The filial piety paradox: Receiving social support from children can be negatively associated with quality of life. *Social Science & Medicine, 303*. | SSH | …that in Singapore (n = 2,887 older adults), help from more children can lower older women's quality of life. Guardian alerts must protect independence, not signal dependence. | https://doi.org/10.1016/j.socscimed.2022.114996 (opened via RePEc record; sample confirmed on the Duke-NUS page) |
| B8 | Müller, N., Czempin, P., Diekmann, F., Froghyar, A., & Böttinger, K. (2022). Does audio deepfake detection generalize? In *Proceedings of Interspeech 2022* (pp. 2783–2787). ISCA. | STEM | …that detectors trained on lab data perform poorly on real-world deepfakes, with "performance degradation of up to one thousand percent". That is why voice scores don't decide our verdict. | https://doi.org/10.21437/Interspeech.2022-108 (opened on ISCA Archive) |
| B9 | Liu, X., Wang, X., Sahidullah, M., Patino, J., Delgado, H., Kinnunen, T., Todisco, M., Yamagishi, J., Evans, N., Nautsch, A., & Lee, K. A. (2023). ASVspoof 2021: Towards spoofed and deepfake speech detection in the wild. *IEEE/ACM Transactions on Audio, Speech, and Language Processing, 31*, 2507–2522. | STEM | …a peer-reviewed benchmark showing that spoof and deepfake detection is harder "in the wild" (compressed, channel-degraded audio, like phone calls) than in the lab. | https://doi.org/10.1109/TASLP.2023.3285283 (opened via Crossref record) |
| B10 | Wang, X., Delgado, H., Tak, H., Jung, J., Shim, H., Todisco, M., Kukanov, I., Liu, X., Sahidullah, M., Kinnunen, T., Evans, N., Lee, K. A., Yamagishi, J., Jeong, M., Zhu, G., Zang, Y., Zhang, Y., Maiti, S., Lux, F., . . . Singh, V. (2026). ASVspoof 5: Design, collection and validation of resources for spoofing, deepfake, and adversarial attack detection using crowdsourced speech. *Computer Speech & Language, 95*, Article 101825. | STEM | …the newest peer-reviewed benchmark, which adds adversarial attacks and many cloning tools. Deepfake detection remains an arms race, not a solved problem. | https://doi.org/10.1016/j.csl.2025.101825 (opened via Crossref record; CC BY 4.0). Author list from Crossref: check the final author on the article page. |
| B11 | Android Developers. (n.d.). *Screen calls*. | STEM | …that Android call screening sees only numbers not in contacts and can silence but not forward calls. That is why transfer needs a telco partner. | https://developer.android.com/develop/connectivity/telecom/dialer-app/screen-calls (brief) |
| B12 | Ask Gov. (n.d.). [ScamShield question on WhatsApp/Telegram calls]. | GOV | …that ScamShield cannot block scam calls over encrypted apps like WhatsApp and Telegram, which leaves a gap. Exact page title **needs verification**. | https://ask.gov.sg/scamshield/questions/clhpq3amk0008l2087522usmq (brief) |

**Pairing Pindrop with peer-reviewed benchmarks (instructor feedback).** Keep Pindrop (2025) only as **BIZ** evidence that a commercial market for voice-deepfake detection exists, and never as proof that detection works. Every technical claim about detection goes to B8 (generalisation failure), B9 (in-the-wild benchmark) and B10 (latest benchmark). Pindrop's exact title and URL from Assignment 1: **needs verification** (not re-opened).

## C. Drop or justify

| Source | Recommendation | Why |
| --- | --- | --- |
| Foster (2026), *The Money Overview* | **Drop** | A content or finance-tips site, mislabelled GOV in Assignment 1. Every fact it could support now has a primary source (B2, B3, A7). |
| Recorded Future (2024), political deepfakes | **Drop** | It covers election and political deepfakes, a different harm, victim group and channel. It doesn't support any SilverGuard claim. |
| ASIC (2026), AI investment scams | **Drop**, or keep only with a justification | Australian regulator, investment scams, not family impersonation. Keep only if the pitch argues "regulators worldwide see AI scams rising", and label it GOV with that one-line role. |
| Pindrop (2025) | **Keep as BIZ only**, paired with B8–B10 | See note above. |
| Yi et al. (2023) | **Demote to background** | Still a preprint (see A14). |
| Barrington et al. (2024, arXiv) | **Replace** with A10 (Scientific Reports, 2025) | A peer-reviewed version now exists. |

These are recommendations. **The team decides** what goes in the final reference list.

## D. Lens coverage

| Lens | Sources | Gap |
| --- | --- | --- |
| STEM | A5, A10, A13, A14, B5, B8, B9, B10, B11 (+A8) | None |
| BIZ | B1, B5, B6, Pindrop | **Thin.** B2 (market slide, Sprint 2) should add a market-sizing or willingness-to-pay source, e.g. smartphone use among Singapore seniors. |
| GOV | A1, A4, A6, A7, A11, B2, B3, B4, B6, B12 | None |
| SSH | A2, A3, A8, A9, A12, B7 | Dialect and household data are still missing (see section F). |

## E. Findings the PO and pitch team should know

1. **Use the 2025 age figures, not 2024.** In 2025 seniors 65+ were 14.8% of victims and had the highest average loss, S$37,053 (B2). The brief's "8.4% in 2024" is older.
2. **Investor question to prepare (R2 Q&A bank):** SPF's fake-friend call scams fell sharply: 1,551 cases in 2025 (from 4,179) and 353 in H1 2026 (from 1,052) (B2, B3). Expect "isn't this problem shrinking?" A possible answer: seniors' losses per victim keep rising (S$42,347 in H1 2026), and government-impersonation calls hit seniors too (23.0% of elderly victims in H1 2026, B3). **A human should decide the framing.**
3. **SPF's briefs don't mention voice cloning or deepfakes used by scammers** (B2, B3). Don't write "SPF says AI voice-clone scams are rising in Singapore". The voice-clone evidence comes from GovTech (A1), the FTC (A4), the FBI IC3 (A7), CBC (A9) and Sobolev (A11).
4. **The CBC case (A9) was stopped by bank staff,** a good story for Layer 3 (bank cooling-off).
5. **The filial piety paradox (B7)** matches interview question Q4: alerts to family may feel like losing independence. The interviews should listen for this.

## F. Still missing (human follow-up, not verified here)

- **Dialect use among seniors** (for the language decision): look for Census of Population 2020 tables on language most frequently spoken at home by age group (SingStat). **Needs verification.**
- **Household data** (seniors living alone or with children): SingStat or a peer-reviewed source. **Needs verification.**
- **A BIZ market source** (see section D).

## G. Gemini Notebook upload list (prep for C1)

Open-access only. Download each PDF from the link and upload it to the team's Gemini Notebook. Paywalled items (A3, A8, A11, B7, B9 publisher version) need NTU library access; don't upload copies from unofficial sites.

| Upload | Where to download | Notes |
| --- | --- | --- |
| B2 SPF Annual Scam and Cybercrime Brief 2025 | https://www.police.gov.sg/-/media/SPF/Advisories/Scams/Annual-Scam-and-Cybercrime-Brief-2025.pdf | Direct PDF |
| B3 SPF Mid-Year Scam and Cybercrime Brief 2026 | https://www.police.gov.sg/-/media/SPF/Media-Room/Statistics/Mid-Year-Scam-and-Cybercrime-Brief-2026/Mid-Year-Scam-and-Cybercrime-Brief-2026.pdf | Direct PDF |
| B4 Population in Brief 2025 | https://www.strategygroup.gov.sg/files/population_in_brief_2025.pdf | Direct PDF |
| A7 FBI IC3 2025 report | https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf | Direct PDF |
| A10 Barrington et al. (Scientific Reports) | https://doi.org/10.1038/s41598-025-94170-3, then "Download PDF" | Open access |
| A5 Mai et al. (PLOS ONE) | https://doi.org/10.1371/journal.pone.0285333, then "Download PDF" | Open access |
| A2 Balcombe (IJERPH) | https://doi.org/10.3390/ijerph22060938, then "Download PDF" | Open access (MDPI) |
| A12 Buse et al. (OJBM) | https://doi.org/10.4236/ojbm.2024.125151, then PDF link | CC BY 4.0 |
| B8 Müller et al. (Interspeech 2022) | https://www.isca-archive.org/interspeech_2022/muller22_interspeech.pdf | ISCA Archive, open |
| B9 ASVspoof 2021 | https://arxiv.org/pdf/2210.02437 | Author's open-access copy (arXiv) of the TASLP paper |
| B10 ASVspoof 5 | https://doi.org/10.1016/j.csl.2025.101825, then "Download PDF" | CC BY 4.0 |
| B1 Deloitte | Web page above; use the browser's "Print, then Save as PDF" | Web article, not a PDF |
| B5 Google Scam Detection | Web page above; use the browser's "Print, then Save as PDF" | Help page changes over time; note the date saved |
| A8 Stajano & Wilson | https://www.cl.cam.ac.uk/~fms27/papers/2011-StajanoWil-scam.pdf | Author's own copy, found in search but **not opened**: check it loads |

**Human decision:** Gemini Notebook has an upload limit. If space runs out, prioritise B2, B3, B4, A10 and B8.
