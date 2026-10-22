> Draft prepared with AI assistance for the Dev 1 role; to be reviewed and edited by the team.

# Scam Check demo test set (backlog D1)

15 short messages for the browser Scam Check demo: 10 scam scripts and 5 genuine family messages. The machine-readable copy is [`test-set.json`](test-set.json); `engine.test.js` and `evaluate.js` read it.

## How it was built

1. **Patterns from public advisories.** Each scam message is modelled on a pattern described in a Singapore Police Force (SPF) advisory or a ScamShield explainer page, checked on the web on 22 Oct 2026. The messages are written in our own words; no advisory text was copied. One URL per pattern is in the table and in `source_url`.
2. **Focus.** Family-emergency and "new number" scripts (S01–S05, S08–S10), plus two official or bank impersonation variants (S06, S07).
3. **Languages.** 7 English or Singlish scams, 2 Mandarin (S08, S09), 1 Malay (S10). Genuine messages: 3 English or Singlish, 1 Mandarin, 1 Malay. Non-English entries carry an English `gloss` field for reviewers. Language codes: `en` English, `en-SG` Singlish, `zh` Mandarin, `ms` Malay.
4. **Genuine messages** are written by the AI assistant to imitate ordinary family texts. They include two genuine emergencies with no money or secrecy (G01 hospital, G02 road accident with police present), one innocent money mention (G03) and one genuine new number (G05).
5. **Expected levels** were set by applying the design's rules to each message by hand, before the engine was written:
   - **High risk**: a money request plus any other High cue (secrecy, identity switch) or Medium cue (urgency, authority).
   - **Check with family**: one High cue alone, including money alone.
   - **No warning signs found**: everything else.
   - A genuine message is never expected "High risk".

## The messages

| ID | Kind | Lang | Message (gloss for non-English) | Expected | Pattern | Source |
| --- | --- | --- | --- | --- | --- | --- |
| S01 | scam | en | Hi Ma, it's Wei Jie. I lost my phone so this is my new number, please save it. Can you help me transfer $2,800 to my friend's bank account today? I'll pay you back next week. | High risk | Lost phone / new number, then a loan to a third-party bank account | [SPF, 29 Aug 2022](https://www.police.gov.sg/media-hub/news/2022/20220829_police_advisory_on_the_trend_of_scams_involving_scammers_pretending_to_be_friends) |
| S02 | scam | en-SG | Eh Auntie, guess who? I changed number already lah. My supplier chasing me, need to borrow 3k urgently. Can PayNow me or not? Tomorrow I return you. | High risk | "Guess who" call, loan to pay a supplier via PayNow | [ScamShield: Fake Friend Call Scams](https://www.scamshield.gov.sg/learn-about-scams/learn-to-recognise-scams/fake-friend-call-scams/) |
| S03 | scam | en-SG | Hello Uncle, guess who? I changed my number, please save this one and delete the old one ok. Next time contact me here. | Check with family | First stage only: update contact details; money is asked days later | [SPF, 30 Aug 2023](https://www.police.gov.sg/media-hub/news/2023/20230830_police_advisory_on_persistent_scam_variant_involving_fake_friends) |
| S04 | scam | en-SG | Ah Ma, my phone spoil, can't talk now, only can send voice note. Very urgent, I need $1,500 for hospital deposit tonight. PayNow to this number ok? Don't tell anyone first. | High risk | Impersonated contact claims an emergency, urgent PayNow loan | [SPF, 8 May 2026](https://www.police.gov.sg/media-hub/news/2026/05/20260508_police_advisory_on_social_media_impersonation_scams) |
| S05 | scam | en | We have your son. If you want him to come home safe, send $20,000 within 2 hours. Do not call the police and do not tell anybody. | High risk | Claimed kidnap of a loved one, ransom | [SPF, 1 Jun 2020](https://www.police.gov.sg/Media-Room/News/20200601_OTHERS_POLICE_ADVISORY_ON_MESSAGES_CLAIMING_KIDNAP_OF_LOVED_ONES) |
| S06 | scam | en | This is Officer Tan from your bank's fraud team. We detected an unauthorised transaction of $5,000 on your account. To protect your savings you must transfer the balance to a safety account now. Please keep this confidential while we investigate. | High risk | Bank officer impersonation, transfer to a "safety account" | [SPF and MAS, 27 Jul 2024](https://www.police.gov.sg/Media-Hub/News/2024/20240727_joint_advisory_on_uptick_in_government_official_impersonation_scam_variant) |
| S07 | scam | en | Singapore Police Force here. Your bank account is linked to a money laundering case and a warrant will be issued for your arrest. Move your money to the government safe account for investigation. Do not discuss this case with your family. | High risk | Police impersonation, "safe account" | [ScamShield: Government Officials Impersonation Scams](https://scamshield.gov.sg/i-want-protection-from-scams/learn-to-recognise-scams/government-officials-impersonation-scams/) |
| S08 | scam | zh | 妈，我是伟杰，我换了新号码…我现在急需用钱，你可以先帮我转账五千块吗？ (Mum, it's Wei Jie, I changed to a new number… I urgently need money now, can you transfer 5,000 for me first?) | High risk | New number, then an urgent transfer | [SPF, 29 Aug 2022](https://www.police.gov.sg/media-hub/news/2022/20220829_police_advisory_on_the_trend_of_scams_involving_scammers_pretending_to_be_friends) |
| S09 | scam | zh | 奶奶，我出事了，现在在警察局…马上汇款三千元才能保释我。千万别告诉爸爸妈妈，求求你。 (Grandma, I'm in trouble, at the police station… remit 3,000 immediately for bail. Don't tell Dad and Mum, I'm begging you.) | High risk | Relative in "trouble with the law" asks for money | [SPF, 29 Aug 2022](https://www.police.gov.sg/media-hub/news/2022/20220829_police_advisory_on_the_trend_of_scams_involving_scammers_pretending_to_be_friends) |
| S10 | scam | ms | Mak, ini nombor baru saya, telefon lama hilang… perlu bayar hospital segera. Tolong hantar duit $1,800 melalui PayNow… Jangan beritahu ayah dulu ya. (Mum, this is my new number, old phone lost… need to pay the hospital urgently. Please send $1,800 by PayNow… Don't tell Dad yet.) | High risk | Lost phone / new number, urgent PayNow | [ScamShield: Fake Friend Call Scams](https://www.scamshield.gov.sg/learn-about-scams/learn-to-recognise-scams/fake-friend-call-scams/) |
| G01 | genuine | ms | Mak, ayah terjatuh di rumah pagi tadi. Kami di hospital sekarang… (Mum, Dad fell at home this morning. We're at the hospital now, only a sprained wrist. I'll call this afternoon.) | No warning signs found | Genuine hospital emergency | — |
| G02 | genuine | en-SG | Ah Ma, I kena small accident on the PIE just now, only the bumper scratched, nobody hurt. Police came to take statement already. Going home now, tonight I call you ok? | No warning signs found | Genuine road accident, police present | — |
| G03 | genuine | en | Hi Mum, thanks for dinner on Sunday! I've paid back the $50 you lent me through PayNow, you can check your bank app later. | Check with family | Innocent money mention | — |
| G04 | genuine | zh | 妈，爸爸今天在医院做检查，医生说没什么大问题… (Mum, Dad is having a check-up at the hospital today, nothing serious. Home this afternoon, don't worry.) | No warning signs found | Genuine hospital update | — |
| G05 | genuine | en | Hi Ma, it's Mei Ling. My company gave me a work phone, so this is my new number for office hours. My old number still works, you can call it anytime to check it's me. | Check with family | Genuine new number | — |

## What the advisories say and what we added

Being clear about this matters, because the poster may cite these sources.

- **No Singapore advisory we found describes a grandchild-in-an-accident or voice-clone family script word for word.** SPF's fake-friend advisories describe people posing as *friends or acquaintances* who say they lost their phone or changed number and later ask for a loan (29 Aug 2022 also mentions "trouble with the law"). We moved that script onto a family member (son, grandchild) because that is SilverGuard's target scenario. The Researcher should look for a local source on family or voice-clone impersonation; until then, treat the family framing as **our adaptation, needs verification**.
- **Secrecy** ("don't tell Mum", "keep this confidential") is **not** described in the fake-friend, bank or government-official advisories we read. We added it to S04–S07, S09 and S10 because it is one of the design's cue families. The 28 Oct 2022 SPF advisory on staged kidnappings does describe a victim told to cut off contact with family, but we did not cite it for a specific message.
- **"Can't talk, voice note only"** (S04) is our addition, taken from the design's cue table, not from an advisory.
- **Bank officer to police "safety account"** (S06) follows the 27 Jul 2024 SPF/MAS advisory. **Police "safe account"** (S07) follows ScamShield's government-officials page.
- Kidnap ransom (S05) follows SPF's 1 Jun 2020 advisory about SMS messages claiming a loved one was kidnapped.

## For the humans to decide or do

- [ ] A native Mandarin speaker and a native Malay speaker should check S08, S09, S10, G01 and G04 for natural wording (they were drafted by the AI assistant).
- [ ] The design calls for genuine messages "from volunteers". These five are invented. Replace or add real (consented, anonymised) family messages before quoting any false-alarm number in the pitch.
- [ ] Decide whether G03 (innocent money mention) *should* get "Check with family". Under the current rules it does; a team may prefer "No warning signs found", which would need a rule that tells "I paid you" from "please pay me".
- [ ] Tamil is in the design but not in this set; add Tamil messages if the demo should show it.
- [ ] Fifteen messages are enough to demo, not to claim accuracy. Do not present the results as a catch rate.
