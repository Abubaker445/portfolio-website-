document.addEventListener('DOMContentLoaded', () => {
  // ─────────────────────────────────────────────
  // 15. PRELOAD — remove .preload class from body
  // ─────────────────────────────────────────────
  setTimeout(() => {
    document.body.classList.remove('preload');
  }, 100);

  // ─────────────────────────────────────────────
  // 1. SMOOTH SCROLL NAVIGATION
  // ─────────────────────────────────────────────
  const NAV_HEIGHT = 70;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const top = target.offsetTop - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ─────────────────────────────────────────────
  // 2. MOBILE NAVIGATION
  // ─────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const navbar = document.getElementById('navbar');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNav.classList.toggle('active');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
        mobileNav.classList.remove('active');
      }
    });
  }

  // Navbar scrolled class
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ─────────────────────────────────────────────
  // 3. INTERSECTION OBSERVER ANIMATIONS
  // ─────────────────────────────────────────────
  const animObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // 10. EXPERIENCE CARD — stagger bullet points
        if (entry.target.classList.contains('exp-card')) {
          const bullets = entry.target.querySelectorAll('.exp-bullet');
          bullets.forEach((bullet, i) => {
            bullet.style.transitionDelay = `${(i + 1) * 120}ms`;
          });
        }

        // 11. PROJECT TECH PILLS — rubber-band animation
        if (entry.target.classList.contains('project-card')) {
          const pills = entry.target.querySelectorAll('.tech-pill');
          pills.forEach((pill, i) => {
            pill.style.animationDelay = `${i * 100}ms`;
            pill.classList.add('rubber-band');
          });
        }

        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '-50px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    animObserver.observe(el);
  });

  // ─────────────────────────────────────────────
  // 4. LANDING ANIMATIONS (setTimeout chain)
  // ─────────────────────────────────────────────
  const landingTimings = [
    { selector: '.landing-name', delay: 300 },
    { selector: '.landing-designation', delay: 500 },
    { selector: '.landing-intro', delay: 700 },
    { selector: '.cta-buttons', delay: 1000 }
  ];

  landingTimings.forEach(({ selector, delay }) => {
    setTimeout(() => {
      const el = document.querySelector(selector);
      if (el) el.classList.add('visible');
    }, delay);
  });

  setTimeout(() => {
    const icons = document.querySelectorAll('.social-icon');
    icons.forEach((icon, i) => {
      setTimeout(() => {
        icon.classList.add('visible');
      }, i * 150);
    });
  }, 1300);

  // ─────────────────────────────────────────────
  // 5. SKILL PROGRESS BARS
  // ─────────────────────────────────────────────
  let skillsAnimated = false;

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
          skillsAnimated = true;

          const fills = document.querySelectorAll('.progress-fill');
          fills.forEach(fill => {
            const pct = fill.getAttribute('data-percentage');
            fill.style.width = pct + '%';
          });

          const skillCards = document.querySelectorAll('.skill-card');
          skillCards.forEach(card => {
            const fill = card.querySelector('.progress-fill');
            const numEl = card.querySelector('.percentage-number');
            if (fill && numEl) {
              const pct = parseInt(fill.getAttribute('data-percentage')) || 0;
              animateCount(numEl, 0, pct, 1500, '%');
            }
          });

          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    skillsObserver.observe(skillsSection);
  }

  /**
   * Animate a number from `start` to `end` over `duration` ms.
   */
  function animateCount(el, start, end, duration, suffix = '') {
    const startTime = performance.now();
    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(start + (end - start) * eased);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = end + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  // ─────────────────────────────────────────────
  // 6. STAT COUNTERS (Achievements section)
  // ─────────────────────────────────────────────
  let statsAnimated = false;

  const achievementsSection = document.getElementById('achievements');
  if (achievementsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;

          const statNumbers = document.querySelectorAll('.stat-number');
          statNumbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            const originalText = el.textContent.trim();
            const hasPlusSuffix = originalText.includes('+');
            const suffix = hasPlusSuffix ? '+' : '';
            animateCount(el, 0, target, 2000, suffix);
          });

          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    statsObserver.observe(achievementsSection);
  }

  // ─────────────────────────────────────────────
  // 7. CONTACT FORM
  // ─────────────────────────────────────────────
  // ─────────────────────────────────────────────
  // 7. CONTACT FORM WITH BACKEND
  // ─────────────────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;

      const submitBtn = contactForm.querySelector('.send-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const backendUrl = window.location.origin;
        
        const response = await fetch(`${backendUrl}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, subject, message })
        });

        if (response.ok) {
          const successMsg = document.getElementById('form-success');
          if (successMsg) {
            successMsg.classList.add('show');
            contactForm.reset();
            document.querySelectorAll('.form-group').forEach(group => {
              group.classList.remove('focused');
            });
            setTimeout(() => {
              successMsg.classList.remove('show');
            }, 4000);
          }
        } else {
          throw new Error('Failed to send email');
        }
      } catch (error) {
        console.error('Error:', error);
        const errorMsg = document.getElementById('form-error');
        if (errorMsg) {
          errorMsg.classList.add('show');
          setTimeout(() => {
            errorMsg.classList.remove('show');
          }, 4000);
        }
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }



  // ─────────────────────────────────────────────
  // 8. FORM FIELD INTERACTIONS
  // ─────────────────────────────────────────────
  document.querySelectorAll('.form-group').forEach(group => {
    const input = group.querySelector('input, textarea');
    if (!input) return;

    input.addEventListener('focusin', () => {
      group.classList.add('focused');
    });

    input.addEventListener('focusout', () => {
      if (input.value.trim() === '') {
        group.classList.remove('focused');
      }
    });
  });

  // ─────────────────────────────────────────────
  // 9. CERTIFICATION CARD TILT
  // ─────────────────────────────────────────────
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const tiltX = ((mouseX - centerX) / (rect.width / 2)) * 4;
      const tiltY = -((mouseY - centerY) / (rect.height / 2)) * 4;

      card.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // ─────────────────────────────────────────────
  // 12. ACTIVE SECTION TRACKING (throttled)
  // ─────────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navbar a[href^="#"], #mobile-nav a[href^="#"]');
  let scrollTicking = false;

  function updateActiveSection() {
    const scrollPos = window.scrollY + 200;

    let currentSection = '';
    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });

    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(updateActiveSection);
      scrollTicking = true;
    }
  }, { passive: true });

  // ─────────────────────────────────────────────
  // 13. BACK TO TOP BUTTON
  // ─────────────────────────────────────────────
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─────────────────────────────────────────────
  // 14. EDUCATION TYPEWRITER
  // ─────────────────────────────────────────────
  const educationSection = document.getElementById('education');
  if (educationSection) {
    const eduObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lines = educationSection.querySelectorAll('.typewriter-line');
          lines.forEach((line, i) => {
            setTimeout(() => {
              line.classList.add('visible');
            }, i * 300);
          });
          eduObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    eduObserver.observe(educationSection);
  }
});
