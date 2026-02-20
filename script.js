/* SpikeList – script.js */

// ── Nav stuck state
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 10);
}, { passive: true });

// ── Mobile drawer
const hamburger = document.querySelector('.hamburger');
const drawer = document.querySelector('.mobile-drawer');
if (hamburger && drawer) {
  hamburger.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    hamburger.textContent = open ? '✕' : '☰';
    hamburger.setAttribute('aria-expanded', open);
  });
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.textContent = '☰';
    });
  });
}

// ── Active nav link
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-drawer a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// ── Scroll reveal
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Contact form UX (static – no backend)
const form = document.querySelector('#contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Message sent ✓';
    btn.style.background = '#16A34A';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 4000);
  });
}

// ── Animated bar fills on scroll
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar-fill, .ch-bar').forEach(bar => {
        bar.style.transition = 'width 1s cubic-bezier(0.4,0,0.2,1)';
        const w = bar.style.width;
        bar.style.width = '0';
        requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.width = w; }));
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.feat-viz, .visual-panel').forEach(el => barObs.observe(el));
