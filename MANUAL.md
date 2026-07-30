# Liquid Code Studios — User Manual

Every place in the site you can personally edit, with the exact file and
line number. Nothing here requires touching HTML structure or CSS layout
unless stated — just changing values.

---

## 1 · `script.js` — the control panel

Almost everything editable lives at the **top of this one file**, lines 8–27.

```
Line 8:   const PAYSTACK_KEY    = 'pk_test_REPLACE_ME';
Line 9:   const CONTACT_EMAIL   = 'wambugusammy99@gmail.com';
Line 14:  const WHATSAPP_NUMBER = '254700000000';
Line 25:  const LIVE_PROJECT_COUNT = 4;
Line 26:  const BIRTHDAY_MONTH = 5;
Line 27:  const BIRTHDAY_DAY   = 22;
```

| Line | What it controls | How to edit |
|---|---|---|
| 8 | Your real Paystack public key | Replace `'pk_test_REPLACE_ME'` with your key from the Paystack dashboard. Shop won't take real payments until this is set. |
| 9 | Fallback email, shown in the contact page sidebar | Already set to `wambugusammy99@gmail.com` |
| 14 | **The contact form's actual send mechanism** | International format, no `+`, no leading `0` — e.g. Kenya `07XX XXX XXX` → `254XXXXXXXXX`. **Currently a placeholder (`254700000000`) — replace this with your real number before the contact form is usable.** |
| 25 | The number on every launch counter | One number, every page updates. **Currently says 4 — but only 2 project cards exist on the homepage (Destiny Garden + Lesella). Fix this first**, either by setting it back to `2` or sending me 2 more real projects to add. |
| 26–27 | Your birthday theme trigger | `5, 22` = May 22, already set. Leave both at `0` to disable. |

---

## 2 · Marquee — the scrolling strip of words

**`script.js`, line 214:**
```js
const items = ['Web Development','Photography','Android Apps',
               'UI Design','Node.js','PostgreSQL','Mombasa, Kenya'];
```
Add, remove, reorder, or rename any string in that list. The `✦` separator
and the seamless-loop duplication happen automatically — don't add those
yourself. Only shows on the homepage right now (the only page with
`id="marquee"`).

**Line 219 — `const REPEATS = 6;`** controls how many times that list
repeats before the loop is obviously noticeable. Raise it for an even
longer strip; the animation speed auto-adjusts to match, so words never
suddenly speed up or slow down when you change this number.

---

## 3 · Role word cycle — under your name in the hero

**`script.js`, line 171:**
```js
const roles = ['Creative', 'Photographer', 'Inquisitive', 'Web developer', 'Designer', 'Problem-solver'];
```
Cycles every 2.4 seconds. Same rule: edit the array, nothing else.

---

## 4 · Seasonal themes — dates

All in `script.js`, inside the `seasonal()` function.

| Theme | Line | Current setting | To change |
|---|---|---|---|
| Birthday | 26–27 | May 22 | Edit the two numbers directly |
| Valentine's | 833 | `inRange(2,10, 2,16)` — a week around Feb 14 | For just the single day: `inRange(2,14, 2,14)` |
| Christmas | 834 | `inRange(12,1, 1,6)` — the whole season | For just Dec 25: `inRange(12,25, 12,25)` |
| Diwali | 837, `DIWALI_DATES` table | 2025–2028 real dates already entered | **Can't be a fixed date** — it moves 11–20 days a year. When 2029 arrives, search "Diwali 2029 date" and add one line to the table |

---

## 4b · Contact form — now WhatsApp, not email

Your site has no backend, so the contact form hands off to WhatsApp instead
of a mail server — same pattern as a serverless shop site.

**Before this works, set your real number** — `script.js`, line 14:
```js
const WHATSAPP_NUMBER = '254700000000';   // ← replace with your real number
```
International format, no `+`, no leading `0`. Kenya `07XX XXX XXX` becomes
`254XXXXXXXXX`.

**What happens when a visitor submits:** their name, email, subject and
message get built into one message and WhatsApp opens in a new tab with
that message already typed in. **It does not auto-send** — they still have
to press send inside WhatsApp themselves. The hint text under the button
(`contact.html`, `.form-hint`) says this explicitly so nobody assumes it
went through when it hasn't.

The email field stays on the form even though WhatsApp is the actual send
mechanism — it's there so you have a fallback way to reply if you'd rather
use email. Its label explains this: "Email address (so I can reply by
email too)."

---

## 4c · Homepage scroll prompt — removed

The "Scroll ↓" hint that used to sit under the hero name is gone. If you
ever want it back, it was a two-line block right before `</main>` in
`index.html`:
```html
<div class="scroll-cue"><span>Scroll</span><span class="scroll-rail"></span></div>
```
The matching CSS (`.scroll-cue`, `.scroll-rail`) is still in `style.css`,
untouched — so pasting that line back in is all it takes to restore it.

---

## 5 · Photos & screenshots — the skeleton shimmer placeholders

Every spot below currently shows a brief shimmer, then settles on an emoji.
Search each file for `data-shot=""` — when you have a real photo, put the
path **inside those empty quotes** and the shimmer will wait for that image
instead of the emoji.

| File | Line(s) | What it's for |
|---|---|---|
| `index.html` | 162–164 | 3 counter Polaroid photos |
| `index.html` | 193, 207 | Destiny Garden / Lesella screenshots |
| `projects.html` | 122–124 | 3 counter Polaroid photos |
| `shop.html` | 136, 152, 168 | 3 shop product thumbnails |

Example — before:
```html
<div class="browser-body skeleton" data-shot="">
```
After:
```html
<div class="browser-body skeleton" data-shot="images/destiny-screenshot.png">
```

---

## 6 · Googly eyes — positioning them on your photo

**`style.css`, lines 1227–1228:**
```css
.eye.left{ left:var(--eye1-x,29%); top:var(--eye1-y,26%); }
.eye.right{ left:var(--eye2-x,43%); top:var(--eye2-y,27%); }
```
Change the two percentages in each line.

**Don't want to guess?** Open any page with `?calibrate` on the end of the
URL — e.g. `index.html?calibrate` — then click directly on each eye in the
greeter photo. The exact position is logged to the console and shown in an
alert. Copy those two numbers in. Remove `?calibrate` from the URL when
you're done; it does nothing without that flag.

---

## 7 · About page — the looping cutout over the "O"

**`style.css`, lines 1465–1466:**
```css
left:var(--letter-x,46%);
top:var(--letter-y,-22%);
```
Same calibration trick as the eyes — load `about.html?calibrate`, click
directly on the letter "O" in "About", copy the two numbers here.

The two photos it cycles between are set in `about.html`:
```html
<span class="flip-cutout" data-img="images/cutout-head.png"
      data-img-back="images/cutout-head-2.png" data-flip-every="2600">
```
`data-flip-every="2600"` is the interval in milliseconds between swaps.

---

## 8 · Images folder — what to shoot and where it goes

Create an `images/` folder (if you haven't) and drop these in with these
**exact filenames**. Nothing breaks while it's empty — every one has an
emoji stand-in until the real file exists.

| Filename | Used for |
|---|---|
| `cutout-head.png` | Menu greeter + About page (first expression) |
| `cutout-head-2.png` | About page (second expression, for the loop) |
| `sticker-camera.png` | Hero sticker |
| `sticker-laptop.png` | Hero sticker + menu sticker |
| `sticker-phone.png` | Hero sticker |
| `sticker-bible.png` | Hero sticker |
| `sticker-headphones.png` | Hero + menu sticker |
| `sticker-coffee.png` | Hero + menu sticker |
| `sticker-book.png` | Quotes page sticker |
| `logo.png` | Browser tab favicon |

---

## 9 · Dark / light mode

Nothing to edit here — it's a toggle button (moon/sun icon, next to the
hamburger) that visitors control themselves. Their choice is remembered via
their browser's local storage.

---

## 10 · Things that are NOT meant to be edited

- **Section header comments** (the `═══` boxes) — cosmetic only, purely for
  navigating the file. Don't worry if numbering looks slightly out of order
  in places; it doesn't affect anything functionally.
- **The SVG filters** (`#sticker-edge`, `#glass-warp`) at the top of every
  HTML file — these generate the torn-paper sticker border and the liquid
  glass effect automatically. Leave them alone.
- **`LICENSE.md`** — states the code is yours and proprietary. No edits
  needed unless your details change.

---

## Quick reference — the whole list in one place

```
script.js  line 8    → Paystack key
script.js  line 9    → Fallback email (shown in contact sidebar)
script.js  line 14   → WhatsApp number ← contact form's real send mechanism
script.js  line 25   → Live project counter number
script.js  line 26–27→ Birthday date
script.js  line 171  → Role words (hero tagline cycle)
script.js  line 214  → Marquee items
script.js  line 219  → Marquee REPEATS (how long before the loop repeats)
script.js  line 833  → Valentine's date range
script.js  line 834  → Christmas date range
script.js  line 837  → Diwali dates table
style.css  line 1227–1228 → Eye positions
style.css  line 1465–1466 → About-page letter cutout position
*.html     data-shot=""   → Real photos, once you have them
```

---

## Bug fixes — this round

**Marquee "no change" was browser caching, not your edit.** Proof: your
edited array didn't contain "Android Apps," "UI Design," "Node.js," or
"PostgreSQL" anywhere — but your screenshot's marquee still showed them.
That's the browser serving an old cached copy of `script.js`.

Fixed two ways:
1. Every page's `<link>`/`<script>` tag now ends in `?v=6`
   (`style.css?v=6`, `script.js?v=6`). **From now on, whenever you edit
   either file, bump that number** (`?v=7`, `?v=8`...) — the changed URL
   forces the browser to treat it as a new file instead of reusing the
   cached one.
2. If you ever see "no change" again before bumping the version: hard
   refresh with **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac), or
   open the page in an incognito/private window to rule out caching
   entirely.

**The stray comma** in your marquee array (`'Livestreaming', ,'SEO...`)
created an empty item — fixed, no trailing comma now.

**Illegible sticker tooltip text — this one was my bug.** In light mode,
`--cream` flips to dark navy (so buttons stay readable), but the sticker
hover tooltip's text was hardcoded to near-black and never got a light-mode
override — so it became near-black text on a now-dark-navy background.
That's the "bar with nothing" you saw: the tooltip was rendering, just with
invisible text. Fixed in `style.css` — search `.sticker[data-say]::after`
inside the `[data-theme="light"]` block.

**Sticker icons looking less colourful in light mode** — the card behind
each emoji was solid dark navy (`#1d2440`). Emoji colour itself is never
touched by CSS, but a heavy dark backdrop was making them read as duller by
contrast, the same way a bright colour looks more muted against black than
against white. Card background is now a light neutral (`#e2e8f2`) with a
thin inset border — search `.sticker .sticker-face` inside the
`[data-theme="light"]` block in `style.css`.
