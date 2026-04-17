// ─── SHARED NAV ───────────────────────────────────────────────────────────────
const navHTML = `
<nav>
  <div class="container nav-inner">
    <a href="index.html" class="logo">
      <img src="SpikeList_logo.png" alt="SpikeList" height="50" style="display:block;">
    </a>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html">Home</a></li>
      <li><a href="features.html">Features</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
    <div class="nav-cta">
      <a href="contact.html" class="btn btn-secondary btn-sm">Request Demo</a>
      <a href="contact.html" class="btn btn-primary btn-sm">Get Started</a>
    </div>
    <div class="nav-toggle" id="navToggle">
      <span></span><span></span><span></span>
    </div>
  </div>
</nav>
`;

// ─── SHARED FOOTER ────────────────────────────────────────────────────────────
const footerHTML = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="logo">
          <img src="SpikeList_logo.png" alt="SpikeList" height="32" style="display:block;">
        </a>
        <p>Catalog automation and feed management for eCommerce businesses operating at scale. Connect vendors, sync inventory, publish everywhere.</p>
      </div>
      <div class="footer-col">
        <h4>Platform</h4>
        <ul>
          <li><a href="features.html">Features</a></li>
          <li><a href="features.html#catalog">Catalog Engine</a></li>
          <li><a href="features.html#pricing">Price Automation</a></li>
          <li><a href="features.html#marketplace">Marketplace Feeds</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Connect</h4>
        <ul>
          <li><a href="mailto:info@spikelist.com">info@spikelist.com</a></li>
          <li><a href="#">LinkedIn</a></li>
          <li><a href="#">Twitter / X</a></li>
          <li><span>Pune, India</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 SpikeList. All rights reserved.</span>
      <span>Built for eCommerce operations at scale.</span>
    </div>
  </div>
</footer>
`;

// ─── INJECT & ACTIVATE ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // Inject nav and footer
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // Highlight active nav link based on current page
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) link.classList.add('active');
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks && navLinks.classList.remove('open'));
  });

  // Scroll-reveal for cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .value-card, .step, .val-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
  });

});

// Contact form handler
function handleSubmit() {
  const email = document.getElementById('email');
  if (!email || !email.value.includes('@')) {
    alert('Please enter a valid work email address.');
    return;
  }
  const btn = document.querySelector('button[onclick="handleSubmit()"]');
  if (btn) {
    btn.textContent = '✓ Request Sent — We\'ll be in touch!';
    btn.style.background = '#16a34a';
    btn.style.boxShadow = '0 2px 8px rgba(22,163,74,0.25)';
    btn.disabled = true;
  }
}
