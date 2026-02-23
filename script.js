// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks && navLinks.classList.remove('open');
  });
});

// Contact form submit handler (static — no backend)
function handleSubmit() {
  const email = document.getElementById('email');
  const firstName = document.getElementById('firstName');

  if (!email || !email.value.includes('@')) {
    alert('Please enter a valid work email address.');
    return;
  }

  const name = firstName ? firstName.value : '';
  const btn = document.querySelector('button[onclick="handleSubmit()"]');
  if (btn) {
    btn.textContent = '✓ Request Sent — We\'ll be in touch!';
    btn.style.background = '#16a34a';
    btn.style.boxShadow = '0 2px 8px rgba(22,163,74,0.25)';
    btn.disabled = true;
  }
}

// Scroll-reveal for feature cards
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
