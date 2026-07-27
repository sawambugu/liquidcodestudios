/* © 2026 Samuel Wambugu. All rights reserved. See LICENSE.md. */
/* ═══════════════════════════════════════════════════
   LIQUID CODE STUDIOS — script.js
   Samuel Wambugu · Kenya
═══════════════════════════════════════════════════ */
const PAYSTACK_KEY  = 'pk_test_REPLACE_ME';
const CONTACT_EMAIL = 'wambugusammy99@gmail.com';
const WHATSAPP_NUMBER = '254745487698';

function waLink(text){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
const LIVE_PROJECT_COUNT = 3;
const BIRTHDAY_MONTH = 5;   
const BIRTHDAY_DAY   = 22;   
document.addEventListener('DOMContentLoaded', () => {
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const heroName = $('#hero-name');
const heroWrap = $('#hero-wrap');
if (heroName) {
  setTimeout(() => {
    heroName.classList.add('in');
    heroWrap && heroWrap.classList.add('in');
  }, 120);
}
(function heroScroll(){
  const brandName    = $('#brand-name');
  const stickerLayer = $('#sticker-layer');
  if (!heroWrap && !brandName) return;

  let ticking = false;

  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y    = scrollY;
      const prog = Math.min(y / (innerHeight * 0.7), 1);   // 0→1 over first 70vh

      if (!REDUCED && heroWrap) {
        heroWrap.style.transform = `scale(${1 + prog * 0.18})`;   // → 1.18×
        heroWrap.style.filter    = `blur(${prog * 18}px)`;        // → 18px
        heroWrap.style.opacity   = 1 - prog;
      }
      if (!REDUCED && stickerLayer) {
        stickerLayer.style.transform = `translateY(${y * 0.35}px)`;  // 35% parallax
        stickerLayer.style.opacity   = 1 - prog * 0.6;
      }

      if (brandName) brandName.classList.toggle('show', prog > 0.5);

      ticking = false;
    });
  }

  if (!heroWrap && brandName) brandName.classList.add('show');

  addEventListener('scroll', onScroll, { passive:true });
  onScroll();
})();
$$('.sticker, .greeter').forEach(el => {
  const src = el.dataset.img;
  if (!src) return;
  const probe = new Image();
  probe.onload = () => {
    const face = el.querySelector('.sticker-face');
    const img  = Object.assign(document.createElement('img'),
                               { src, alt:'', draggable:false });
    if (face) face.replaceWith(img);
  };
  probe.src = src;
});

(function drag(){
  const items = $$('.sticker, .counter-shot');
  if (!items.length) return;
  let zTop = 90;

  items.forEach(el => {
    if (!el.dataset.home) el.dataset.home = el.getAttribute('style') || '';
    let sx = 0, sy = 0, bx = 0, by = 0;

    el.addEventListener('pointerdown', e => {
      if (e.button) return;
      const p = (el.offsetParent || el.parentElement).getBoundingClientRect();
      const r = el.getBoundingClientRect();
      bx = r.left - p.left;
      by = r.top  - p.top;
      el.style.left = bx + 'px';
      el.style.top  = by + 'px';
      sx = e.clientX; sy = e.clientY;
      el.classList.add('dragging', 'moved');
      el.style.zIndex = ++zTop;
      el.setPointerCapture(e.pointerId);
      $$('.sticker-reset').forEach(b => b.classList.add('show'));
    });

    el.addEventListener('pointermove', e => {
      if (!el.classList.contains('dragging')) return;
      el.style.left = (bx + e.clientX - sx) + 'px';
      el.style.top  = (by + e.clientY - sy) + 'px';
    });

    const end = e => {
      el.classList.remove('dragging');
      try { el.releasePointerCapture(e.pointerId); } catch(_) {}
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  });

  $$('.sticker-reset').forEach(btn => {
    btn.addEventListener('click', () => {
      items.forEach(el => {
        el.setAttribute('style', el.dataset.home || '');
        el.classList.remove('moved', 'dragging');
      });
      btn.classList.remove('show');
    });
  });
})();
(function roleWord(){
  const el = $('#role-word');
  if (!el || REDUCED) return;
  const roles = ['Creative', 'Photographer', 'Livestreamer', 'Web developer', 'Designer', 'Problem-solver', 'Student', 'Entrepreneur', 'Content creator', 'Video editor', 'Motion graphics artist'];
  let i = 0;
  setInterval(() => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(-7px)';
    setTimeout(() => {
      i = (i + 1) % roles.length;
      el.textContent     = roles[i];
      el.style.opacity   = '1';
      el.style.transform = 'none';
    }, 300);
  }, 2400);
})();

(function menu(){
  const btn   = $('#menu-btn');
  const panel = $('#menu-panel');
  const close = $('#menu-close');
  if (!btn || !panel) return;

  const set = open => {
    btn.classList.toggle('open', open);
    panel.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  btn.addEventListener('click', () => set(!panel.classList.contains('open')));
  close && close.addEventListener('click', () => set(false));
  addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
})();



(function marquee(){
  const mq = $('#marquee');
  if (!mq) return;
  const items = ['Web Development','Photography','Graphic Design','Video Editing','Motion Graphics','Social Media Management',
                 'OBS', 'Livestreaming','Affinity','Lightroom','SEO Optimization'];

  const REPEATS = 7;
  const half = Array(REPEATS).fill(items).flat();
  mq.innerHTML = [...half, ...half]
    .map(t => `<span>${t}</span><span class="mx">✦</span>`).join('');
  mq.style.animationDuration = (30 * REPEATS) + 's';
})();
(function wordSplit(){
  const head = $('#ed-head');
  if (!head) return;

  (function walk(node){
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {                                  // text node
        const frag = document.createDocumentFragment();
        n.textContent.split(/\s+/).filter(Boolean).forEach(word => {
          const s = document.createElement('span');
          s.className   = 'w';
          s.textContent = word;
          frag.append(s, document.createTextNode(' '));
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) {                           // element
        walk(n);
        n.classList.add('w');                                  // animate it too
      }
    });
  })(head);

  head.querySelectorAll('.w').forEach((w, i) => {
    w.style.transitionDelay = (i * 0.045) + 's';
  });
})();

(function reveal(){
  const targets = $$([
    '.editorial-headline', '.eyebrow', '.editorial-body p', '.stat',
    '.quote-feature blockquote', '.page-kicker', '.page-title', '.page-sub',
    '.drag-hint', '.split-line', '.proj-row', '.live-projects', '.featured',
    '.quote-card', '.shop-card', '.fcard',
    '.contact-headline', '.contact-sub'
  ].join(','));
  if (!targets.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
    });
  }, { threshold:0.15, rootMargin:'0px 0px -50px 0px' });

  targets.forEach(el => io.observe(el));
})();

(function counter(){
  const blocks = $$('[data-count-to]');
  if (!blocks.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      run(en.target);
      io.unobserve(en.target);
    });
  }, { threshold:0.4 });

  blocks.forEach(b => io.observe(b));

  function run(block){

    const target = LIVE_PROJECT_COUNT;
    const digits = parseInt(block.dataset.countDigits || '3', 10);
    const out    = block.querySelector('.counter-digits');
    const dur    = REDUCED ? 200 : 1800;
    let t0 = null;

    const paint = v => {
      out.textContent = String(Math.floor(v)).padStart(digits, '0');
    };

    function step(ts){
      if (t0 === null) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      paint(target * (1 - Math.pow(1 - p, 3)));       // easeOutCubic
      if (p < 1) requestAnimationFrame(step);
      else paint(target);
    }
    paint(0);
    requestAnimationFrame(step);

    block.querySelectorAll('.counter-shot').forEach((s, i) =>
      setTimeout(() => s.classList.add('in'), 300 + i * 140));
  }
})();
(function filters(){
  const list = $('#proj-list');
  if (!list) return;

  const rows    = $$('.proj-row', list);
  const groups  = $$('[data-filter-group]');
  const countEl = $('#filter-count');
  const empty   = $('#empty-state');
  const state   = {};
  groups.forEach(g => state[g.dataset.filterGroup] = 'all');

  function apply(){
    let shown = 0;
    rows.forEach(row => {
      const ok = Object.keys(state).every(k =>
        state[k] === 'all' || row.dataset[k] === state[k]);
      row.classList.toggle('hidden', !ok);
      if (ok) shown++;
    });
    if (countEl) countEl.textContent = shown === 1 ? '1 project' : `${shown} projects`;
    if (empty)   empty.style.display = shown ? 'none' : 'block';
  }

  groups.forEach(group => {
    group.addEventListener('click', e => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;
      $$('.filter-pill', group).forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state[group.dataset.filterGroup] = pill.dataset.filter;
      apply();
    });
  });

  apply();
})();


/* ═══════════════════════════════════════════════════
   12 · SHOP + PAYSTACK
═══════════════════════════════════════════════════ */
(function shop(){
  const modal = $('#pay-modal');
  if (!modal) return;

  const nameEl  = $('#modal-product');
  const priceEl = $('#modal-price');
  const emailEl = $('#buyer-email');
  let current   = null;

  const open = p => {
    current = p;
    nameEl.textContent  = p.name;
    priceEl.textContent = 'KES ' + p.price.toLocaleString();
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    setTimeout(() => emailEl && emailEl.focus(), 60);
  };
  const close = () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  };

  $$('.buy-btn').forEach(btn =>
    btn.addEventListener('click', () => open({
      id:    btn.dataset.product,
      name:  btn.dataset.name,
      price: parseInt(btn.dataset.price, 10)
    })));

  $('#modal-close') && $('#modal-close').addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  $('#pay-btn') && $('#pay-btn').addEventListener('click', () => {
    const email = (emailEl.value || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailEl.style.borderColor = '#f62d00';
      emailEl.focus();
      return;
    }
    emailEl.style.borderColor = '';

    if (typeof PaystackPop === 'undefined') {
      alert('Payment library did not load. Check your connection.');
      return;
    }
    if (PAYSTACK_KEY.includes('REPLACE_ME')) {
      alert('Add your Paystack public key at the top of script.js first.');
      return;
    }

    PaystackPop.setup({
      key:      PAYSTACK_KEY,
      email,
      amount:   current.price * 100,
      currency: 'KES',
      ref:      'LCS_' + Date.now(),
      metadata: { product_id: current.id, product_name: current.name },
      callback: res => {
        close();
        alert(`Payment received. Reference ${res.reference}.\nDownload link on its way to ${email}.`);
      },
      onClose: () => {}
    }).openIframe();
  });
})();
(function contact(){
  const submit = $('#c-submit');
  if (!submit) return;
  const ok = $('#c-ok');

  submit.addEventListener('click', () => {
    const v = id => ($('#' + id)?.value || '').trim();
    const name = v('c-name'), email = v('c-email'),
          subject = v('c-subject'), message = v('c-message');

    if (!name || !email || !message) {
      if (ok) {
        ok.classList.remove('show');
        ok.classList.add('error', 'show');
        ok.textContent = 'Add your name, email and a message so I can reply.';
      }
      return;
    }

    const text =
      `Hi Samuel, this is ${name} (${email}).` +
      (subject ? `\nSubject: ${subject}` : '') +
      `\n\n${message}`;

    window.open(waLink(text), '_blank', 'noopener');

    if (ok) {
      ok.classList.remove('error');
      ok.textContent = 'Opening WhatsApp so this reaches me directly…';
      ok.classList.add('show');
    }

    ['c-name','c-email','c-subject','c-message'].forEach(id => {
      const el = $('#' + id);
      if (el) el.value = '';
    });

    submit.textContent = 'Sent ✓';
    setTimeout(() => { submit.textContent = 'Send message →'; }, 2500);
  });
})();
(function toTop(){
  const btn = $('#to-top');
  if (!btn) return;
  btn.addEventListener('click', () => scrollTo({ top:0, behavior:'smooth' }));
  addEventListener('scroll', () => {
    btn.classList.toggle('show', scrollY > 400);
  }, { passive:true });
})();
(function curtainWipe(){
  const STRIPS = 6;
  const wrap = document.createElement('div');
  wrap.className = 'curtain-wrap';
  for (let i = 0; i < STRIPS; i++) {
    const s = document.createElement('div');
    s.className = 'curtain-strip';
    s.style.setProperty('--i', i);
    wrap.appendChild(s);
  }
  document.body.appendChild(wrap);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    wrap.classList.add('out');
    setTimeout(() => wrap.classList.remove('out'), 900);
  }));


  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href ||
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.startsWith('mailto') ||
        a.target === '_blank') return;

    e.preventDefault();
    wrap.classList.add('in');
    setTimeout(() => location.href = href, 800);
  });
})();

(function copyrightYear(){
  const year = new Date().getFullYear();
  $$('.js-year').forEach(el => el.textContent = year);
})();

(function themeToggle(){
  const KEY = 'lcs-theme';
  const saved = localStorage.getItem(KEY);
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');

  $$('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem(KEY, 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem(KEY, 'light');
      }
    });
  });
})();


/* ═══════════════════════════════════════════════════
STILL BUGGED....WORK IN PROGRESS
═══════════════════════════════════════════════════ */
(function googlyEyes(){
  const hosts = $$('.eyes-track');
  if (!hosts.length || REDUCED) return;

  const MAX_SHIFT = 5;   // px the pupil can travel from centre

  addEventListener('pointermove', e => {
    hosts.forEach(host => {
      $$('.eye', host).forEach(eye => {
        const r  = eye.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const shift = Math.min(MAX_SHIFT, dist / 12);
        const pupil = eye.querySelector('.pupil');
        if (pupil) {
          pupil.style.transform =
            `translate(${(dx / dist) * shift}px, ${(dy / dist) * shift}px)`;
        }
      });
    });
  }, { passive:true });
})();


/* ═══════════════════════════════════════════════════
   18b · CALIBRATOR — a tool, not a feature
   Visit any page with ?calibrate on the URL, then click
   directly on the eyes (menu greeter) or the About-page
   letter — the exact % position is logged to the console
   (and shown in an alert). Copy those numbers into
   style.css: eyes → .eye.left/.eye.right, About letter →
   --letter-x/--letter-y on .flip-cutout.
   Remove ?calibrate from the URL when you're done — it
   does nothing unless that flag is present.
═══════════════════════════════════════════════════ */
(function calibrator(){
  if (!location.search.includes('calibrate')) return;

  $$('.eyes-track, .about-hero-word').forEach(host => {
    host.style.cursor = 'crosshair';
    host.title = 'Click directly on the spot you want to position — the % gets logged';

    host.addEventListener('click', e => {
      const r = host.getBoundingClientRect();
      const x = (((e.clientX - r.left) / r.width)  * 100).toFixed(1);
      const y = (((e.clientY - r.top)  / r.height) * 100).toFixed(1);
      const msg = `Position: ${x}%  /  ${y}%`;
      console.log(msg);
      alert(msg + '\n\nEyes → style.css .eye.left/.eye.right\nLetter cutout → --letter-x / --letter-y on .flip-cutout');
    });
  });

  console.log('Calibrator active — click the eyes or the About-page letter to read its position.');
})();


/* ═══════════════════════════════════════════════════
   18c · FRAME LOOP CUTOUTS —   Markup:
   <div class="flip-cutout"
        data-frames="images/head-loop-1.png,images/head-loop-2.png,images/head-loop-3.png,images/head-loop-4.png"
        data-flip-every="700">
     <span class="sticker-face">🙂</span>   ← emoji fallback, shown until frames load
   </div>

═══════════════════════════════════════════════════ */
(function frameLoopCutouts(){
  $$('.flip-cutout').forEach(el => {
    const raw = el.dataset.frames;
    if (!raw) return;                     // no frames configured — leave the emoji alone

    const urls = raw.split(',').map(s => s.trim()).filter(Boolean);
    if (!urls.length) return;

    const every = parseInt(el.dataset.flipEvery || '700', 10);
    let loaded  = [];
    let pending = urls.length;
    urls.forEach((src, i) => {
      const probe = new Image();
      probe.onload = () => {
        const img = Object.assign(document.createElement('img'), {
          src, alt: '', draggable: false, className: 'frame'
        });
        img.dataset.order = i;
        el.appendChild(img);
        loaded.push(img);
        settle();
      };
      probe.onerror = settle;
      probe.src = src;
    });

    function settle(){
      pending--;
      if (pending > 0) return;             
      if (!loaded.length) return;       

      loaded.sort((a, b) => a.dataset.order - b.dataset.order);
      const face = el.querySelector('.sticker-face');
      if (face) face.remove();

      loaded[0].classList.add('active');
      if (loaded.length < 2 || REDUCED) return;   

      let cur = 0;
      setInterval(() => {
        loaded[cur].classList.remove('active');
        cur = (cur + 1) % loaded.length;
        loaded[cur].classList.add('active');
      }, every);
    }
  });
})();

(function menuOrigin(){
  const btn   = $('#menu-btn');
  const panel = $('#menu-panel');
  if (!btn || !panel) return;

  function setOrigin(){
    const r = btn.getBoundingClientRect();
    panel.style.setProperty('--ox', `${r.left + r.width / 2}px`);
    panel.style.setProperty('--oy', `${r.top  + r.height / 2}px`);
  }
  btn.addEventListener('click', setOrigin);
  addEventListener('resize', setOrigin);
  setOrigin();
})();



(function menuStickerImages(){
  $$('.menu-sticker').forEach(el => {
    const src = el.dataset.img;
    if (!src) return;
    const probe = new Image();
    probe.onload = () => {
      const face = el.querySelector('.sticker-face');
      const img  = Object.assign(document.createElement('img'),
                                 { src, alt:'', draggable:false, style:'width:100%' });
      if (face) face.replaceWith(img);
    };
    probe.src = src;
  });
})();
(function skeletons(){
  $$('.skeleton').forEach(el => {
    const src = el.dataset.shot;
    const reveal = () => el.classList.add('loaded');

    if (src) {
      const img = new Image();
      img.onload = () => {
        const content = el.querySelector('.skeleton-content');
        const real = Object.assign(document.createElement('img'), {
          src, alt: '',
          style: 'width:100%;height:100%;object-fit:cover;position:relative;z-index:1;'
        });
        if (content) content.replaceWith(real); else el.appendChild(real);
        reveal();
      };
      img.onerror = () => setTimeout(reveal, 500);   
      img.src = src;
    } else {
  
      setTimeout(reveal, 500 + Math.random() * 400);
    }
  });
})();
(function tiltCards(){
  if (REDUCED) return;
  const MAX_TILT = 3;   // degrees

  $$('.tilt-card').forEach(card => {
    card.style.perspective = '900px';

    card.addEventListener('pointermove', e => {
      const r  = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;   
      const py = (e.clientY - r.top)  / r.height;
      const rotY = (px - 0.5) *  MAX_TILT * 2;
      const rotX = (0.5 - py) *  MAX_TILT * 2;
      card.classList.add('tilting');
      card.style.transform =
        `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.015)`;
    });

    card.addEventListener('pointerleave', () => {
      card.classList.remove('tilting');
      card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
    });
  });
})();
(function seasonal(){
  if (REDUCED) return;

  const now   = new Date();
  const month = now.getMonth() + 1;   // 1-12
  const day   = now.getDate();
  const year  = now.getFullYear();

  const inRange = (m1,d1, m2,d2) => {
    // handles ranges that cross the year boundary (e.g. Dec→Jan)
    const val = month * 100 + day, lo = m1*100 + d1, hi = m2*100 + d2;
    return lo <= hi ? (val >= lo && val <= hi) : (val >= lo || val <= hi);
  };

  const isBirthday  = BIRTHDAY_MONTH && BIRTHDAY_DAY &&
                       month === BIRTHDAY_MONTH && day === BIRTHDAY_DAY;
  const isValentine = inRange(2,10, 2,16);
  const isHoliday    = inRange(12,1, 1,6);


  const DIWALI_DATES = {
    2025: [10, 20],
    2026: [11, 8],
    2027: [10, 29],
    2028: [10, 17],
  
  };
  let isDiwali = false;
  const diwaliEntry = DIWALI_DATES[year];
  if (diwaliEntry) {
    const mainDay = new Date(year, diwaliEntry[0] - 1, diwaliEntry[1]);
    const start   = new Date(mainDay); start.setDate(start.getDate() - 1);
    const end     = new Date(mainDay); end.setDate(end.getDate() + 1);
    const today   = new Date(year, now.getMonth(), day);
    isDiwali = today >= start && today <= end;
  }

  function makeLayer(className, symbols, count, fallSpeed){
    const layer = document.createElement('div');
    layer.className = className;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = className === 'birthday-confetti' ? 'confetti-p'
                  : className === 'valentine-hearts'   ? 'heart-p'
                  : className === 'diwali-sparkle'     ? 'sparkle-p' : 'flake';
      p.style.left = Math.random() * 100 + '%';
      p.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
      p.style.animationDuration = (fallSpeed + Math.random() * fallSpeed) + 's';
      p.style.animationDelay = (Math.random() * fallSpeed) + 's';
      p.style.fontSize = (14 + Math.random() * 14) + 'px';
      if (className === 'birthday-confetti') {
        const hues = ['#ff9bb4','#8FC6EF','#52d36a','#f9fcf4'];
        p.style.background = hues[i % hues.length];
        p.style.borderRadius = Math.random() > .5 ? '50%' : '2px';
      } else {
        p.textContent = symbols[i % symbols.length];
      }
      layer.appendChild(p);
    }
    document.body.appendChild(layer);
  }

  if (isBirthday) {
    const banner = document.createElement('div');
    banner.className = 'birthday-banner';
    banner.textContent = '🎉 Happy Birthday, Samuel Wambugu! 🎉';
    document.body.appendChild(banner);
    makeLayer('birthday-confetti', [], 40, 4);

  } else if (isValentine) {
    makeLayer('valentine-hearts', ['❤','💕','💖','🩷'], 24, 9);

  } else if (isDiwali) {
    const diyas = document.createElement('div');
    diyas.className = 'diwali-lights';
    for (let i = 0; i < 20; i++) {
      const d = document.createElement('span');
      d.className = 'diya';
      d.textContent = '🪔';
      d.style.animationDelay = (Math.random() * 2.2) + 's';
      diyas.appendChild(d);
    }
    document.body.appendChild(diyas);
    makeLayer('diwali-sparkle', ['✨','🎇','🪔'], 22, 8);

  } else if (isHoliday) {
    const lights = document.createElement('div');
    lights.className = 'holiday-lights';
    for (let i = 0; i < 24; i++) {
      const b = document.createElement('span');
      b.className = 'bulb';
      b.style.animationDelay = (Math.random() * 1.8) + 's';
      lights.appendChild(b);
    }
    document.body.appendChild(lights);
    makeLayer('snowfall', ['❄','❅','❆'], 30, 10);
  }
})();

});
