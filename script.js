/* SpikeList – script.js */

// ── Nav scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── Mobile drawer
const hamburger = document.querySelector('.hamburger');
const drawer = document.querySelector('.mob-drawer');
if (hamburger && drawer) {
  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    hamburger.textContent = isOpen ? '✕' : '☰';
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.textContent = '☰';
    });
  });
}

// ── Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mob-drawer a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

// ── Scroll reveal
const revObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

// ── Animated bar fills
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-width]').forEach(bar => {
        const target = bar.dataset.width;
        bar.style.transition = 'width 1.1s cubic-bezier(0.4,0,0.2,1)';
        bar.style.width = '0%';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { bar.style.width = target; });
        });
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.feat-full-viz, .viz-box').forEach(el => barObs.observe(el));

// ── Animated counter
function animateCounter(el) {
  const end = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = end * eased;
    el.textContent = (val % 1 === 0 ? Math.floor(val) : val.toFixed(1)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = 'true';
      e.target.querySelectorAll('[data-count]').forEach(animateCounter);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-block, .kpi-strip').forEach(el => countObs.observe(el));

// ── Static contact form
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ MESSAGE SENT';
    btn.style.background = 'rgba(0,230,118,0.15)';
    btn.style.borderColor = 'rgba(0,230,118,0.3)';
    btn.style.color = 'var(--green)';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.cssText = '';
      btn.disabled = false;
      contactForm.reset();
    }, 4000);
  });
}
