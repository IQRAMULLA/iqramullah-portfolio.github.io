/* ============================================================
   IQRAMULLAH A — Portfolio Scripts
   File: script.js
   ============================================================ */

/* ── TYPED TEXT EFFECT ── */
const phrases = [
  'Software Engineer',
  'Python Developer',
  'Backend Specialist',
  'Data Analytics',
  'Django Developer'
];

let pIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const phrase = phrases[pIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++cIdx);
    if (cIdx === phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = phrase.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 55 : 90);
}

type();

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal, .timeline-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── NAV SCROLL SHADOW ── */
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 50
    ? '0 4px 30px rgba(0,0,0,0.5)'
    : 'none';
});

/* ── CONTACT FORM — Formspree AJAX ── */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const submitLabel = document.getElementById('submitLabel');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    submitBtn.disabled = true;
    submitLabel.textContent = 'Sending…';

    try {
      const data = new FormData(contactForm);
      const res  = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
      } else {
        submitLabel.textContent = 'Failed — Try Again';
        submitBtn.disabled = false;
      }
    } catch (err) {
      submitLabel.textContent = 'Network Error — Retry';
      submitBtn.disabled = false;
    }
  });
}

/* ── SKILL TAG RIPPLE ── */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', function () {
    this.style.background = 'rgba(240,165,0,0.15)';
    setTimeout(() => { this.style.background = ''; }, 300);
  });
});

/* ── VIDEO OVERLAY PLAY BUTTON ── */
const videoOverlay = document.getElementById('videoOverlay');
const videoPlayBtn = document.getElementById('videoPlayBtn');
const aboutVideo   = document.querySelector('.about-video');

if (videoOverlay && aboutVideo) {
  videoOverlay.addEventListener('click', function () {
    aboutVideo.play();
    videoOverlay.classList.add('hidden');
  });

  // Show overlay again if video is paused manually
  aboutVideo.addEventListener('pause', function () {
    videoOverlay.classList.remove('hidden');
  });

  // Keep overlay hidden while playing
  aboutVideo.addEventListener('play', function () {
    videoOverlay.classList.add('hidden');
  });
}