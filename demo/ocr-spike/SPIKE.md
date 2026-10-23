> Draft prepared with AI assistance for Dev 2; to be reviewed and edited by the team.

# Screenshot OCR spike (issue #9, backlog D3 stretch)

**Question:** can the pitch demo read a chat screenshot offline, in the browser, and feed the text to the Scam Check engine? Options compared on licence, size on disk, speed, accuracy for chat screenshots, and the no-CDN rule.

## Recommendation: NO-GO for the pitch demo

Do not build screenshot OCR into the pitch demo. Reasons, strongest first:

1. **It will not work from a double-clicked file.** Our demo pages are opened from disk. tesseract.js needs a Web Worker script, a WebAssembly core and a language data file, all fetched at run time. Browsers commonly block that from `file://` pages (needs verification in the browser used on the day). The fixes are a small local web server (one more thing to fail on stage) or packing everything into one very large HTML file. Either costs hours and changes how the team runs every demo.
2. **It adds a second accuracy unknown.** The team quotes "15/15 on a 15-message test set the team wrote itself; real-world accuracy not yet measured". Chat screenshots add OCR errors on top. A misread keyword makes the engine score a scam lower, which is the dangerous direction, and we have no numbers to show how often that happens.
3. **It is not evidence for the product.** The design doc chooses Google ML Kit's on-device text recognition on Android (`docs/prototype-design.md`, "Turn it into text, on the phone"). A tesseract.js demo would be a stand-in, and the Tamil engine is still an open question there.
4. **Realistic effort is 12 to 15 hours, not the 4 hours in the sprint plan** (see below). `docs/process/sprint-2-plan.md` already says the team is over capacity and "drop D3 first", with a go or no-go by end of Tue 3 Nov.

**What to do instead:** paste-text Scam Check stays the live demo. For screenshots, show the Designer's clickable screens (D5) and say in one sentence that screenshot reading is designed (on-device text recognition) and **not built in the demo**. That claim is honest and matches `demo/scam-check-web/README.md` ("Text only").

**What would flip this to GO** (all four): the live alert test has passed; D7 demo hardening is done; at least 12 hours of Dev 2 time remain before the code freeze (Thu 5 Nov); and a teammate has agreed to run the demo from a local server. Even then, show OCR as a clearly labelled extra after the main demo, never as the main path.

## What was and was not verified

The brief allowed 2 web lookups. Results:

| Lookup | Result |
| --- | --- |
| [tesseract.js local-installation guide](https://github.com/naptha/tesseract.js/blob/master/docs/local-installation.md) | Fetched. Facts used below are marked **(verified)**. It does not state the licence or any file sizes. |
| GitHub file listing of `tesseract-ocr/tessdata_fast` (for language file sizes) | **Failed** (the fetch returned an error). Language file sizes are therefore unverified. |

The sandbox could not reach the npm registry (`ENOTFOUND registry.npmjs.org`), so **nothing was installed, nothing was prototyped, and no size or speed was measured**. There is no `node_modules` and no vendored file in this folder. Everything marked **(needs verification)** comes from general knowledge and must be checked before the team quotes it.

## Options compared

| Option | Licence | Size on disk | Speed | Chat-screenshot accuracy | No-CDN fit | Effort to demo |
| --- | --- | --- | --- | --- | --- | --- |
| **tesseract.js, vendored from npm** (English + Simplified Chinese data) | Believed Apache-2.0 for tesseract.js, the Tesseract engine and the "fast" language data (needs verification: read the LICENSE files in the npm package and the data repo before vendoring) | Roughly 20 to 40 MB for worker, four core files and two language files (needs verification; see the table below) | Seconds per screenshot on a laptop, slower on a phone browser (needs measurement) | Fair on clean, large text; weak on dark mode, small text and mixed languages (see concerns) | Works if all three paths are local (verified); blocked on `file://` pages (needs verification) | 12 to 15 h end to end |
| PaddleOCR-style models run with onnxruntime-web | Believed Apache-2.0 (needs verification) | Probably 10 to 30 MB of models plus the runtime (needs verification) | Needs measurement | Likely better on Chinese and mixed text (needs verification) | Same `file://` problem, plus more setup | Higher: no ready-made browser package known to the author (needs verification), so more of our own code |
| Browser built-in text detection (`TextDetector` from the Shape Detection API) | Part of the browser | Nothing to ship | Fast | Unknown | Offline in principle | Not an option: believed to be experimental and missing in common desktop browsers (needs verification), so it cannot be relied on at the pitch |
| Cloud OCR (any hosted vision API) | Vendor terms | None | Network round trip | Good | **Breaks the rule** that screenshots never leave the phone, and the no-CDN rule | Excluded |
| Google ML Kit text recognition on Android (the product choice) | Google SDK terms (needs verification) | Part of the app | Design target: screenshot under 5 s on a mid-range phone | Covers Latin and Chinese scripts per the design doc; Tamil not covered | Native app, not a web page | Out of scope for the web demo; belongs to the Android build |
| Hand-typed "OCR" of prepared screenshots | n/a | n/a | n/a | n/a | n/a | **Excluded as dishonest.** Do not show a screenshot and a pre-written result as if it were read live |

### tesseract.js: what the guide says (verified)

- Options are passed to `createWorker`: `workerPath` (the guide's example is `dist/worker.min.js`), `corePath` and `langPath`.
- `corePath` should point to a **directory** holding all four files: `tesseract-core.wasm.js`, `tesseract-core-simd.wasm.js`, `tesseract-core-lstm.wasm.js`, `tesseract-core-simd-lstm.wasm.js`. Pointing at a single `.js` file loads that file whatever the device supports, and the guide discourages it.
- Language data is fetched as `langPath + langCode + '.traineddata.gz'`, so the files must be gzipped and named that way.
- The guide's default core is tesseract.js-core v5.0.0, and its example `langPath` points at a third-party host. Defaults therefore point at remote hosts (needs verification of which). **We must set all three paths and prove it with the network off**, or the page could silently download from the internet at run time.
- In Node, usually only `langPath` needs changing.

### Size on disk (all needs verification: the lookup for sizes failed)

| Piece | Rough expectation | How to verify |
| --- | --- | --- |
| Worker script | Under 1 MB | `ls -l` after `npm install` |
| Four tesseract-core files | A few MB each, perhaps 15 to 20 MB together | `du -sh node_modules/tesseract.js-core` |
| English "fast" data, gzipped | Roughly 2 to 4 MB | Check the language data package or the data repo listing |
| Simplified Chinese "fast" data, gzipped | Roughly 1.5 to 3 MB | Same |
| "Best" (more accurate) data | Several times larger than "fast" | Same |

Committing 20 to 40 MB of binaries to the **public** repo would bloat it for good. Suggested decision for the team: keep vendored files out of git (`.gitignore` here already ignores `vendor/`, `*.traineddata*`, `*.wasm`), and document a one-off "download once on a machine with internet" step, with the licence files kept alongside.

## Accuracy concerns for chat screenshots

These are risks to test, not measured results.

- **Small or compressed text.** Phone screenshots are often scaled down and re-compressed by the chat app.
- **Dark mode and coloured bubbles.** Light text on dark backgrounds usually needs inversion or contrast clean-up first.
- **Who said what.** The design wants the speaker from each bubble's position. Tesseract returns line positions, so this is possible, but it is extra code and needs testing.
- **Interface clutter.** Timestamps, ticks, battery icons and "typing..." lines add noise lines. Emoji and stickers add nothing readable.
- **Mixed English, Singlish and Chinese in one message.** Loading both languages is slower, and mixed lines are harder (needs measurement).
- **Chinese spacing.** Tesseract is commonly reported to put spaces between Chinese characters (needs verification). The engine's Chinese patterns, such as the amount pattern for "五千块", would then miss unless spaces between Chinese characters are removed before `assess()`. This would need a fix, either in Dev 1's engine or in a pre-processing step.
- **Amounts and numbers.** `0` and `O`, `1` and `l`, and `S$` and `$` confusions matter because the money cue is the engine's strongest signal.
- **One misread keyword can lower the level.** Mitigation: show the recognised text for the senior to correct before checking; if recognition confidence is low, answer "Couldn't read this clearly; ask family" (the design doc's rule for input the engine cannot read), never a pass; keep the "never say safe" wording.
- **Tamil and Malay.** Malay uses Latin letters, so English data may cope (needs testing). Tamil data exists for Tesseract (needs verification) but quality on screenshots is unknown. `docs/pitch/qa-bank.md` already says not to claim Tamil works end to end; that stays true.

## The no-CDN rule

- Every file the page loads must be in the repo or on the laptop: worker, all four core files, and each `.traineddata.gz`. Test with the browser's Network panel and with the network switched off, and check that the page makes zero requests to other hosts.
- **`file://` is the blocker.** If the page is opened from disk, the Worker and the fetches for the core and language files may be refused (needs verification in the pitch browser). Options:
  1. **Local server.** `node serve.js` or `python3 -m http.server` in the demo folder, then open `http://localhost:...`. Simple, but the team's rule of "open the single file" no longer holds.
  2. **Single HTML file.** Embed everything as text (base64 adds about a third to the size, so 15 MB or more) and start the Worker from a Blob URL. Needs verification that tesseract.js accepts language data this way. Heavy and brittle.
- Either way, the demo's one-file story and the rebuild flow (`demo/pitch-demo/build.js`) would need extending.

## Effort if the team still chooses GO (hours)

| Step | Hours |
| --- | --- |
| Vendor files, licence check, local server, load a made-up screenshot in a page in this folder | 2 |
| Test set of 5 made-up chat screenshots (English, Singlish, Chinese, dark mode, cropped) and a table of time and cue recall | 2 |
| Pre-processing (contrast, Chinese spacing), "show recognised text and let the user fix it", low-confidence message | 3 to 4 |
| Wire into a demo page, then the guardian alert; tests with a mocked recogniser | 3 to 4 |
| Offline and network-off check on the pitch laptop, README, rehearsal | 2 |
| **Total** | **12 to 15** (the sprint plan's 4 h covers only the first two rows) |

Use made-up chats only. Do not use real family conversations or real people's screenshots, even for testing.

## Decisions for the humans

1. **Go or no-go.** This draft recommends no-go. Owner: Dev 2 with the Scrum master. Deadline in the sprint plan: end of Tue 3 Nov.
2. **What to say about screenshots in the pitch.** Suggested: "Screenshot reading is designed with on-device text recognition; this demo reads pasted text." The Researcher or PO should check the wording against the Q&A bank.
3. **If GO: commit vendored OCR files or not.** Suggested: not. Also who runs the local server on the pitch laptop.
4. **Product engine.** The design doc's open question (which engine reads Tamil screenshots on the phone) is untouched by this spike.

## Sources

- tesseract.js, [local installation guide](https://github.com/naptha/tesseract.js/blob/master/docs/local-installation.md), fetched 23 Oct 2026. Used for the option names, the four core files and the language file naming. The page does not state a licence or sizes.
- Repo documents: `docs/prototype-design.md` (ML Kit on the phone; Tamil open question), `docs/process/sprint-2-plan.md` (D3 stretch, over capacity, go or no-go by Tue 3 Nov), `docs/pitch/qa-bank.md` (Tamil caution), `demo/scam-check-web/README.md` ("Text only").
- Issue #9 itself was not read; check that its acceptance criteria match this note.
