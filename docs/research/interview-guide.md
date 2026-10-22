> Draft prepared with AI assistance for the Researcher; to be reviewed and edited by the team.

# SilverGuard AI: grandparent conversation guide (V1)

Backlog item V1, prepared for V2 (grandparent sessions, run by humans). Version 0.1, 23 Oct 2026.

## 1. Purpose

We will hold 15–20 minute informal conversations with 2–3 grandparents of team members, between Wed 28 and Sat 31 Oct 2026. We want to test the assumptions behind SilverGuard before we pitch it, not to sell the app.

Each conversation tests these assumptions from the design doc (`docs/prototype-design.md`, "Assumptions to test" and "Open questions"):

| # | Assumption | Question that tests it |
| --- | --- | --- |
| A1 | A senior gets about 3 calls a day from unknown numbers (this sets alert volume and cost) | Q1 |
| A2 | Seniors have no reliable way to check a "family emergency" caller, so they need a prompt to pause | Q2 |
| A3 | Family-emergency and impersonation calls feel real and familiar to seniors | Q3 |
| A4 | Seniors will accept an app that silences unknown calls and alerts family, without feeling watched | Q4 |
| A5 | Seniors will accept practice ("drill") calls, and know how often | Q5 (open question in the design doc) |
| A6 | English, Mandarin, Malay and Tamil cover what seniors need; dialects matter for voice | Q6 |
| A7 | The screens are clear to a senior at first glance | Screen walk-through (section 5) |

**Decisions for the humans before 28 Oct:**
- [ ] Who interviews whom. A grandchild interviewing their own grandparent gets warmth but also polite answers ("of course I would use your app"). If possible, pair the grandchild with a second teammate who asks the questions, while the grandchild only translates and makes the grandparent comfortable.
- [ ] Which language each session runs in, and who translates.
- [ ] Whether sessions are in person (better for showing screens) or by video call.
- [ ] Whether to record audio at all. The default in this guide is **no recording**, notes only.

## 2. Before the session (checklist)

- [ ] Send the recruitment message (section 9) at least two days before.
- [ ] Load the clickable screens (`design/clickable-screens/index.html`, being built by the Designer) on a phone or tablet with large text. Check that it works offline.
- [ ] Print or open the note-taking template (section 8). Assign a participant code (P1, P2, P3). Never write the grandparent's name on the notes.
- [ ] Have the ScamShield Helpline number ready in case it is needed: **1799**, open 24/7, for checking whether something is a scam; for urgent police help call **999** ([ScamShield, "Call our 1799 Helpline to check"](https://www.scamshield.gov.sg/check-for-scams/scamshield-helpline/)).
- [ ] Read the do-not-do list (section 7).

## 3. Verbal consent script (read aloud, in plain words)

Read this before any questions. Translate it in advance, not on the spot. Tick the boxes on the notes sheet as they agree.

> "Thank you for talking with us. We are a group of NTU students working on a school project about phone scams that pretend to be family members. We are thinking about an app that could help, and we want to hear what you really think, good or bad. There are no right or wrong answers, and we are not testing you.
>
> It will take about 15 to 20 minutes.
>
> Taking part is your choice. You can skip any question, take a break, or stop at any time, and nobody will mind.
>
> We will only write notes. We will not record your voice unless you tell us that is OK. [If the team decided to ask: 'Is it OK if we record the sound, only so we don't miss anything? We will delete it after we write our notes.']
>
> We will not write your name. If we use something you say in our school poster or presentation, we will not say who said it, only something like 'a grandmother in her 70s'.
>
> If you say something today and later change your mind, just tell [grandchild's name], and we will take it out.
>
> We will not ask for your bank details, passwords, IC number or any money matters.
>
> Is it OK to start?"

Record on the notes sheet: consent to talk (yes/no), consent to record (yes/no/not asked), consent to quote anonymously (yes/no). If the answer to talking is anything other than a clear yes, thank them and stop.

## 4. Questions (about 12 minutes)

Ask in this order. The main question is in bold; the probes are optional follow-ups. Probes are deliberately neutral. Do not suggest answers, do not mention SilverGuard's features until section 5, and do not correct them if they say something wrong about scams. Note it instead.

**Warm-up (1 minute):** "Do you use your phone mostly for calls, WhatsApp, or something else?"
- Probe: "Is your phone Android or iPhone, do you know?" (It's fine if they don't know; note "unsure". This tests the Android-first assumption.)

**Q1. "How many calls from numbers you don't know do you get in a day?"**
- Probe: "What about in a week?"
- Probe: "What do you usually do when a number you don't know calls?"
- Probe: "Are these normal phone calls, or WhatsApp calls, or both?" (ScamShield cannot block WhatsApp/Telegram calls, so the split matters.)

**Q2. "If someone called saying they were your grandchild in trouble, how would you check it's really them?"**
- Probe: "Can you tell me more about that?"
- Probe: "What would you do first?"
- Probe: "Who, if anyone, would you call?"
- Note: watch for answers like "I would know their voice". Write the exact words if they agree to be quoted. Do not tell them voices can be cloned at this point.

**Q3. "Have you or your friends had calls like that?"**
- Probe: "What happened?" (Only if they are comfortable. If they or a friend lost money, say "I'm sorry that happened" and move on; don't ask for amounts or bank names.)
- Probe: "How did you or your friend realise something was wrong?"
- Probe: "Who did you or they tell afterwards?"

**Q4. "Would you want an app that quietly tells your family when an unknown number calls? What would worry you about it?"**
- Probe: "Who in the family would you want it to tell, if anyone?"
- Probe: "How would you feel if your family could see when you get calls?"
- Probe: "What should your family *not* be able to see?"
- Note: listen for feelings of being watched, being a burden, or loss of independence, as well as relief. Both are useful.

**Q5. "Would you try a practice call?"** Explain first: "This would be a pretend scam call from the app, at a time you agree, so you can practise what to do. Afterwards it shows you what the warning signs were."
- Probe: "What would make you say yes or no?"
- Probe: "How often would be OK? Once a month? Less?"
- Probe: "Would it be OK if it sounded like a family member, or should it be a stranger's voice?" (Tests the design doc's "stock voices, not cloned family voices" decision.)
- Do **not** play or simulate a practice call during the session (see section 7).

**Q6. "Which language would you want it in?"**
- Probe: "For reading on the screen, and for hearing it spoken: same or different?"
- Probe: "Do scam callers ever speak to you in dialect (for example Hokkien, Teochew or Cantonese)?"

**Q7 (if time). "If you could tell the people making this app one thing, what would it be?"**

## 5. Screen walk-through (about 5 minutes)

Show the clickable screens (`design/clickable-screens/index.html`). The Designer is building them now; match this list to the final build before the sessions. The planned set from the design doc is:

1. Senior home screen (with the "Is this really them?" Pause & Verify button)
2. Pause & Verify: the three spoken questions and the "Call Wei Jie now" button
3. A Scam Check result card (risk level, reasons, "Call family" button)
4. A Family Drill screen and its debrief
5. The guardian's alert message (as Wei Jie would see it)

For each screen:
- Hand them the phone and say: **"Take a look. What do you think this screen is for?"** Then stay quiet for a few seconds.
- **"Is anything confusing, or hard to read?"**
- **"What would you press, if anything?"**
- Probe: "What does [the label they point at] mean to you?"

Do not explain the screen before they try it. If they are stuck for more than about 20 seconds, help them, and note "needed help" in the template. Being stuck is a finding about the design, not about them; say so if they look embarrassed ("That's our fault, not yours. That's exactly what we need to know.").

## 6. Closing (1 minute)

> "Thank you, this really helps. If you think of anything later, or want to take back anything you said, just tell [grandchild's name]. If you ever get a call you are unsure about, you can call the ScamShield Helpline on 1799."

Re-check quote permission: "Is it still OK if we use what you said, without your name?"

## 7. Do-not-do list

- **No deception.** Say who we are and why we are asking. Don't pretend the app exists or works already; say "we are thinking about".
- **No realistic scam simulation without consent.** Don't play a scam call, don't phone them pretending to be someone, and don't send fake messages before or after the session. Q5 asks about practice calls; it doesn't run one. Any future drill test needs separate, explicit consent and a human from the team present.
- **No collecting bank or personal details.** Don't ask for or write down bank names, account numbers, amounts lost, NRIC numbers, addresses, passwords or one-time codes. Don't photograph their phone's call log or contacts. If they offer such details, don't write them down.
- **No pressure.** Don't push for a story about being scammed; it can be painful or embarrassing.
- **No advice beyond the helpline.** Don't give financial or legal advice. If they seem to be in an active scam right now, stop the interview, help them call 1799 (or 999 if urgent), and tell their family.
- **No leading questions** ("Wouldn't it be great if…?"), and no correcting their beliefs about scams during the questions.
- **No names in notes,** and no identifiable details in quotes (keep age band, language and gender only if needed).
- **No AI tool for raw notes.** Don't paste raw notes with identifiable details into an AI tool. Anonymise first and keep the notes in the team's private drive, not the public repo.

## 8. Note-taking template

One row per participant. Copy into the team's private drive (not the public GitHub repo, which is public). Fill it in within an hour of the session.

**Session record**

| Field | P1 | P2 | P3 |
| --- | --- | --- | --- |
| Participant code | P1 | P2 | P3 |
| Date, mode (in person/video), interviewer initials | | | |
| Consent: talk / record / quote anonymously (Y/N each) | | | |
| Age band (65–69, 70–74, 75–79, 80+) | | | |
| Language(s) used in session; preferred app language (screen / spoken) | | | |
| Phone type (Android / iPhone / unsure) | | | |
| Unknown calls per day (their words + number if given) | | | |
| Ordinary calls vs WhatsApp calls from unknown numbers | | | |
| How they would verify a "grandchild in trouble" caller | | | |
| Own or friends' experience of such calls (no amounts, no bank names) | | | |
| Reaction to "app quietly tells family" (wants / unsure / against) + main worry | | | |
| Practice call: yes / maybe / no; acceptable frequency; voice preference | | | |
| Dialect callers mentioned? | | | |
| Screen 1 Home: what they thought it was for / confusion / needed help? | | | |
| Screen 2 Pause & Verify | | | |
| Screen 3 Scam Check result | | | |
| Screen 4 Drill + debrief | | | |
| Screen 5 Guardian alert | | | |
| Quotes (exact words, only if quote consent = Y) | | | |
| Surprises (anything that contradicts our assumptions) | | | |
| Follow-ups (for the team or the participant) | | | |

**Assumption check (fill in after all sessions, for V3 synthesis in Sprint 2)**

| Assumption | Supported / mixed / not supported | Evidence (participant codes) |
| --- | --- | --- |
| A1 About 3 unknown calls a day | | |
| A2 No reliable way to verify a family caller | | |
| A3 Family-emergency calls are familiar | | |
| A4 Family alerts are acceptable | | |
| A5 Practice calls are acceptable | | |
| A6 Four languages are enough | | |
| A7 Screens are clear | | |

With 2–3 participants, these are signals, not evidence of what most seniors think. Say so on the poster and in the pitch.

## 9. Recruitment message (for teammates to send to family)

Send in the grandparent's preferred language. **Translate it yourself or with a family member, and have someone who speaks the language check it. Don't send a machine translation unchecked.** Edit the bracketed parts.

> Hi [Ah Ma / Grandpa / name], it's [your name]. For my NTU project, my team is designing a phone app to help older people avoid scam calls that pretend to be family. Could I ask you some questions for about 15–20 minutes, and show you a few app screens on my phone? There are no right or wrong answers, and we won't ask about your bank or money. You can say no or stop anytime. Would [day, 28–31 Oct] at [time] be OK? Thank you!

## 10. Ethics note: informal feedback, not published research

These conversations are informal feedback for a coursework design project (CC0007), used to improve a prototype and a class pitch. They are not designed to produce generalisable knowledge, and the results will not be published.

If the team ever wanted to publish or present this as research, NTU's ethics review process would apply:
- NTU says research involving human subjects "must be reviewed and approved by the NTU's Institutional Review Board (NTU-IRB) before they are conducted", and gives interviews and surveys as examples. Its test is research "designed to develop or contribute to generalizable knowledge" ([NTU IRB, "Do I need IRB approval"](https://www.ntu.edu.sg/research/research-integrity-office/institutional-review-board/guidelines/do-i-need-irb-approval), opened 22 Oct 2026).
- Students doing human-subjects research for coursework apply through their School Ethics Review Committee (for studies in the "Exempt" or "Expedited" risk categories), and students and supervisors need CITI certification first. If there is "any intent to publish the results of your study in academic journals or at conferences", students should contact the listed ethics office before conducting the study ([NTU IRB, "Students conducting human subjects research"](https://www.ntu.edu.sg/research/research-integrity-office/institutional-review-board/guidelines/students-research), opened 22 Oct 2026). NTU-IRB contact: irb@ntu.edu.sg.

**Human decision needed:** The NTU pages do not say outright that informal class-project feedback is exempt. Before 28 Oct, someone should ask the tutor in one line whether these conversations are fine as informal feedback, and record the answer in the decision log (V4). **Needs verification with the tutor.**

Even without IRB review, treat what participants tell us as personal data: keep notes anonymous, store them in the private drive, not the public repo (section 8), and delete any audio after writing notes. (Whether Singapore's PDPA formally applies to a student project like this has not been checked: **needs verification** if it matters for the pitch.)
