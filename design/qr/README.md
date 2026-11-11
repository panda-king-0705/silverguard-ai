# QR code: try the prototype on your own phone

> Prepared with AI assistance; to be reviewed by the team. Updated 11 Nov 2026 (decision 31).

Both images open **https://panda-king-0705.github.io/silverguard-ai/app/**, the phone version of the clickable prototype (`app/index.html`, a copy of `design/clickable-screens/app.html`) served as a plain web page by GitHub Pages. No Claude login needed. Each scan opens a separate copy on that visitor's phone.

- `try-silverguard-qr.png`: card with title and "Scan with your phone camera" (slide or printout).
- `prototype-qr.png`: bare code, 1036 × 1036 px, error correction M (poster). Print at least 2.5 cm wide.

Both were decoded back with OpenCV to confirm the link.

**One-time setup (repo owner):** GitHub → repository Settings → Pages → Source "Deploy from a branch", branch `main`, folder `/ (root)` → Save. The page is live a minute or two later. The empty `.nojekyll` file makes GitHub serve the files as they are.

**After changing the prototype:** edit `design/clickable-screens/index.html`, run `python3 design/clickable-screens/build_app.py design/clickable-screens/index.html design/clickable-screens/app.html`, copy `app.html` to `app/index.html` and to `index.html` at the repo root, commit and push.
