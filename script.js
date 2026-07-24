document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('in-view'), i * 60);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Contact form (front-end only) ---------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      note.textContent = 'تم استلام طلبكم، سيتواصل فريقنا معكم في أقرب وقت ممكن.';
      form.reset();
    });
  }

  /* ---------- Ambient ember particles (restrained) ---------- */
  const canvas = document.getElementById('embers');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let W, H, particles;
    const COUNT = 26;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function makeParticle() {
      return {
        x: Math.random() * W,
        y: H + Math.random() * 100,
        r: 1 + Math.random() * 2.4,
        speed: 0.3 + Math.random() * 0.7,
        drift: (Math.random() - 0.5) * 0.4,
        alpha: 0.15 + Math.random() * 0.35,
        hueMix: Math.random()
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: COUNT }, makeParticle);
    }

    function colorFor(mix, alpha) {
      // interpolate orange -> red
      const r = Math.round(247 + (237 - 247) * mix);
      const g = Math.round(148 + (28 - 148) * mix);
      const b = Math.round(29 + (36 - 29) * mix);
      return `rgba(${r},${g},${b},${alpha})`;
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -20) {
          Object.assign(p, makeParticle(), { y: H + 20 });
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = colorFor(p.hueMix, p.alpha);
        ctx.shadowColor = colorFor(p.hueMix, 0.6);
        ctx.shadowBlur = 6;
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }

    window.addEventListener('resize', resize, { passive: true });
    init();
    requestAnimationFrame(tick);
  }
});

const hero = document.getElementById("hero");
const link = document.getElementById("rd");

window.addEventListener("scroll", () => {
    if (window.scrollY >= hero.offsetHeight) {
        link.classList.add("show");
    } else {
        link.classList.remove("show");
    }
});