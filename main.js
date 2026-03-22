// Novodisk Revonvirg – main.js

// ── Hamburger-meny ──
const toggle = document.querySelector('.nav-toggle');
const nav    = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    const ic = toggle.querySelector('.material-icons');
    if (ic) ic.textContent = open ? 'close' : 'menu';
  });
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      const ic = toggle.querySelector('.material-icons');
      if (ic) ic.textContent = 'menu';
    }
  });
}

// ── Header scrolled-klass ──
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 15);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Fade-in via IntersectionObserver ──
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    'article, .portfolio-card, .value-item, .stats-grid div, .product-card, .gallery-grid figure'
  ).forEach(el => { el.classList.add('anim'); obs.observe(el); });
}

// ── Räknare på stats ──
function animCount(el, target, suffix) {
  let start = null;
  const dur = 1500;
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    el.textContent = Math.floor(p * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}
const statNums = document.querySelectorAll('.stats-grid strong');
if (statNums.length) {
  const sObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const txt = e.target.textContent.trim();
        if (txt.endsWith('+')) animCount(e.target, parseInt(txt), '+');
        else if (txt.endsWith('%')) animCount(e.target, parseInt(txt), '%');
        sObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => sObs.observe(el));
}
