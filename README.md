# Liquid Code Studios

Samuel Wambugu · Mombasa,Nairobi Kenya

## Folder structure

```
my-website-v4/
├── index.html          ← hero, editorial, counter, featured, quote
├── projects.html       ← counter + filterable project rows
├── about.html          ← "a curious human" editorial
├── quotes.html         ← big feature quote + card grid
├── shop.html           ← 3 products + Paystack modal
├── contact.html        ← "Let's / Build" editorial + form
├── style.css           ← all styles (1041 lines)
├── script.js           ← all behaviour (493 lines)
└── images/             ← create this, drop your cut-outs in
```

## Two things to change before going live

Open `script.js`, lines 8–9:

```js
const PAYSTACK_KEY  = 'pk_test_REPLACE_ME';   ← your Paystack public key
const CONTACT_EMAIL = 'your@email.com';       ← where the form sends
```

## Cut-outs

Create an `images/` folder and drop these in. **Nothing breaks if they're
missing** — the emoji stand-ins stay until a real PNG loads.

| File | What |
|---|---|
| `cutout-head.png` | Your head, neutral — menu greeter |
| `sticker-camera.png` | Your camera |
| `sticker-laptop.png` | Laptop, open, 3/4 angle |
| `sticker-phone.png` | Phone running the Gate Access scanner |
| `sticker-bible.png` | Your Bible |
| `sticker-headphones.png` | Headphones |
| `sticker-coffee.png` | Coffee |
| `sticker-book.png` | A book |
| `logo.png` | Favicon |

Shoot on a plain wall, even light. Cut out in Photoshop (Select Subject →
Refine Edge) or Photopea. Export PNG-24 with transparency, under ~400 KB each.

**You don't need to add the white torn border.** The `#sticker-edge` SVG filter
generates it at runtime — `feTurbulence` roughens the alpha, `feMorphology`
grows it outward, `feFlood` fills it cream. Tune it in the `<defs>` block at the
top of any page: `scale="7"` = how torn, `radius="5"` = how thick.

## What's animating

**Hero scroll** — the name scales to 1.18× and blurs to 18px as you scroll,
pushing "into" the screen. Stickers parallax at 35% of scroll speed. The topbar
name fades in once the hero name is halfway gone.

**Nav** — outlined `=` pill and cream CTA sit side by side. Click the `=` and it
morphs into a filled pink circle with `✕`.

**Menu** — charcoal `#1f1f22`, cut-out pinned bottom-left, numbered list with
thin rules, items stagger in 70ms apart. Footer lives inside the panel.

**Editorial** — every word wrapped and revealed 45ms apart on scroll.

**Page wipe** — navy panel slides up on link click, slides away on the next
page load.

**Stickers** — draggable on mouse and touch. "Reset stickers" appears once
you've moved one.

## Design tokens

Structure lifted from trevornoah.com, brand colour kept as yours.

```
--navy        #1d2440    page canvas
--navy-deep   #171e39    cards, surfaces
--cream       #f9fcf4    buttons, sticker paper
--text        #f9fcf4    headings, body
--para        #dde3f9    paragraph blue-tint (not grey)
--accent      #6CABDD    your Man City blue — primary
--pink        #ff9bb4    active menu states only
--live        #52d36a    status dot
```

Type is a fluid clamp scale: `--text-h1` through `--text-body`.
Spacing runs on a 1rem gap with a `clamp(1.25rem, 4vw, 4rem)` container.
Radius: `50px` for pills, `20px` for cards.

---

## V5 additions

**Editable everything, in one place** — top of `script.js`:
```js
const LIVE_PROJECT_COUNT = 2;   // drives every counter on every page
const BIRTHDAY_MONTH = 0;       // set both to your real date to enable
const BIRTHDAY_DAY   = 0;       // the birthday theme — 0 keeps it off
```
Copyright year is now `<span class="js-year">` — it reads `new Date().getFullYear()` on load and never needs touching again.

**Menu** — opens via `clip-path: circle()` expanding from the exact screen position of the `=` button (tracked live via `getBoundingClientRect`), not a flat fade. Small stickers pop in around the greeter with a spring bounce, staggered 120ms apart. The `=` button and its footer bar carry a subtle liquid-glass backdrop blur.

**Googly eyes** — any element with `class="eyes-track"` containing `.eye > .pupil` pairs is tracked automatically; currently wired to the menu greeter. Add the same three lines of markup anywhere else you want the gag.

**Dark/light toggle** — new moon/sun button next to the hamburger. Preference saved to `localStorage`, survives reloads. Brand blue and pink stay identical in both modes; only navy/cream surfaces invert.

**Curtain wipe** — page transitions are now 6 vertical strips staggering left→right (inspired by motion.dev's curtain-stagger-wipe, rebuilt in plain CSS/JS since the site stays framework-free — no external animation library added).

**3D tilt on hover** — the two live-project cards on the homepage rotate toward your cursor (the Africaptions-style effect). Add `class="tilt-card"` to any other card to get the same behaviour.

**Seasonal themes** — auto-detected by today's date, fully additive:
| Theme | Window | What shows |
|---|---|---|
| Holiday | Dec 1 – Jan 6 | Twinkling light strand under the nav + gentle snowfall |
| Valentine's | Feb 10–16 | Drifting hearts |
| Birthday | your set date | Confetti + a floating banner |

Nothing renders if no window matches — the site looks completely normal 350 days a year.

---

## Skeleton shimmer (motion.dev-inspired)

Every placeholder that's genuinely waiting on a real asset — the two project
screenshots, the shop thumbnails, the three Polaroid counter photos — now
shimmers briefly before settling on its emoji stand-in. It's an overlay, not
a background swap, so it never fights the card's existing gradient.

**When you add a real screenshot:** find the element in the HTML (search for
`data-shot=""`) and put the image path inside the quotes:
```html
<div class="browser-body skeleton" data-shot="images/destiny-screenshot.png">
  <span class="skeleton-content">🏫</span>
</div>
```
The shimmer will then wait for that specific image to load before revealing
it — same mechanism, just pointed at a real file instead of a timer.
