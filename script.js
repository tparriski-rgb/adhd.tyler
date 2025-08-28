// Small helper script:
// - mobile nav toggle
// - reveal-on-scroll using IntersectionObserver
// - active nav link highlighting

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');

  navToggle && navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    // simple toggle for mobile: show/hide
    if (nav.classList.contains('open')) {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
    } else {
      nav.style.display = '';
      nav.style.flexDirection = '';
      nav.style.gap = '';
    }
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // optionally unobserve for performance
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => obs.observe(el));

  // Active nav link based on section in view
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link && link.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -40% 0px' });

  sections.forEach(s => sectionObserver.observe(s));
});