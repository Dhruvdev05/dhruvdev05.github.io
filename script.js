/* ═══════════════════════════════════════════════════
   DHRUV SHARMA — PORTFOLIO SCRIPTS
   Clean, minimal interactions
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── DOM REFS ─── */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');

  /* ═══════════════════════════
     1. HERO ENTRANCE ANIMATION
     ═══════════════════════════ */
  window.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const scrollHint = document.querySelector('.scroll-hint');

    // slight delay so the page paint settles
    setTimeout(() => {
      if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1s cubic-bezier(.16,1,.3,1), transform 1s cubic-bezier(.16,1,.3,1)';

        requestAnimationFrame(() => {
          heroContent.style.opacity = '1';
          heroContent.style.transform = 'translateY(0)';
        });
      }

      if (scrollHint) {
        scrollHint.style.opacity = '0';
        scrollHint.style.transition = 'opacity 1s ease 1.2s';
        requestAnimationFrame(() => { scrollHint.style.opacity = '1'; });
      }
    }, 100);
  });

  /* ═══════════════════════════
     2. MOBILE NAV
     ═══════════════════════════ */
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMobile.classList.toggle('open');
    });

    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMobile.classList.remove('open');
      });
    });
  }

  /* ═══════════════════════════
     3. SCROLL REVEAL
     ═══════════════════════════ */
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));

  /* ═══════════════════════════
     4. SMOOTH SCROLL
     ═══════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // close mobile nav if open
        if (navToggle) navToggle.classList.remove('active');
        if (navMobile) navMobile.classList.remove('open');
      }
    });
  });

  /* ═══════════════════════════
     5. PROJECT CARD HOVER TILT
     ═══════════════════════════ */
  const cards = document.querySelectorAll('.project-card:not(.under-construction)');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * -4;
      const rotateY = (x - 0.5) * 4;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

})();
