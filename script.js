/* ==========================================================================
   GOPAL KUMAR - PREMIUM DEVELOPER PORTFOLIO JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. PRELOADER LOGIC
     ------------------------------------------------------------------------ */
  const preloader = document.getElementById('preloader');
  const loaderProgress = document.querySelector('.loader-progress');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        if (preloader) preloader.classList.add('loaded');
        initScrollAnimations();
      }, 400);
    }
    if (loaderProgress) {
      loaderProgress.style.width = `${progress}%`;
    }
  }, 100);


  /* ------------------------------------------------------------------------
     2. THEME SWITCHER (DARK / LIGHT)
     ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  const savedTheme = localStorage.getItem('gopal-portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('gopal-portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode!`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    } else {
      themeIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }


  /* ------------------------------------------------------------------------
     3. CUSTOM CURSOR & GLOW TRAIL
     ------------------------------------------------------------------------ */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorBlur = document.querySelector('.cursor-blur');

  if (cursorDot && cursorBlur && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let blurX = 0, blurY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      blurX += (mouseX - blurX) * 0.15;
      blurY += (mouseY - blurY) * 0.15;

      cursorBlur.style.left = `${blurX}px`;
      cursorBlur.style.top = `${blurY}px`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover interactions
    const hoverables = document.querySelectorAll('a, button, .project-card, .service-card, .skill-card');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }


  /* ------------------------------------------------------------------------
     4. NAVBAR SCROLL & MOBILE MENU
     ------------------------------------------------------------------------ */
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const scrollProgressBar = document.querySelector('.scroll-progress-bar');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    // Scroll progress calculation
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgressBar) scrollProgressBar.style.width = `${scrolled}%`;

    // Sticky navbar
    if (window.scrollY > 50) {
      if (navbar) navbar.classList.add('scrolled');
      if (backToTopBtn) backToTopBtn.classList.add('visible');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
      if (backToTopBtn) backToTopBtn.classList.remove('visible');
    }

    // Active Nav Link Update
    updateActiveNavLink();
  });

  // Back to top
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Hamburger menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileNav);
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', toggleMobileNav);
  }

  function toggleMobileNav() {
    if (!hamburger || !mobileNav || !mobileOverlay) return;
    const isActive = mobileNav.classList.contains('active');
    if (isActive) {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      hamburger.classList.add('active');
      mobileNav.classList.add('active');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav && mobileNav.classList.contains('active')) {
        toggleMobileNav();
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && mobileNav && mobileNav.classList.contains('active')) {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }


  /* ------------------------------------------------------------------------
     5. TYPING TEXT ANIMATION
     ------------------------------------------------------------------------ */
  const typedTarget = document.getElementById('typed-text');
  if (typedTarget) {
    const roles = [
      'Frontend Web Developer',
      'UI/UX Enthusiast',
      'Python & Django Learner',
      'Creative Web Builder'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typedTarget.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedTarget.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentRole.length) {
        speed = 1800; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
      }

      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }


  /* ------------------------------------------------------------------------
     6. HERO CANVAS BACKGROUND PARTICLES
     ------------------------------------------------------------------------ */
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 45; i++) {
      particles.push(new Particle());
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.update();
        p.draw();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(renderCanvas);
    }
    renderCanvas();
  }


  /* ------------------------------------------------------------------------
     7. ABOUT SECTION TABS
     ------------------------------------------------------------------------ */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = document.getElementById(btn.getAttribute('data-tab'));
      if (targetTab) targetTab.classList.add('active');
    });
  });


  /* ------------------------------------------------------------------------
     8. SKILLS FILTER & BAR ANIMATIONS
     ------------------------------------------------------------------------ */
  const skillFilterBtns = document.querySelectorAll('.skills-filter .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      triggerSkillBars(); // Ensure skill bars are filled when user interacts with filters
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const matches = filterValue === 'all' || card.getAttribute('data-category') === filterValue;
        if (matches) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          requestAnimationFrame(() => {
            card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  let skillsAnimated = false;
  function triggerSkillBars() {
    if (skillsAnimated) return;
    skillsAnimated = true;

    // Linear Progress Bars
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    skillBars.forEach(bar => {
      const level = bar.getAttribute('data-level');
      if (level) {
        bar.style.width = `${level}%`;
      }
    });

    // Circular Gauge Rings
    const circularBars = document.querySelectorAll('.circular-progress');
    circularBars.forEach(circleWrap => {
      const level = parseInt(circleWrap.getAttribute('data-level') || '0', 10);
      const ring = circleWrap.querySelector('.progress-ring-circle');
      if (ring) {
        const circumference = 113.1;
        const offset = circumference - (level / 100) * circumference;
        ring.style.strokeDashoffset = offset;
      }
    });

    // Number Counters for Skills
    const skillCounters = document.querySelectorAll('.counter-num-skill');
    skillCounters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      let current = 0;
      const duration = 1200;
      const stepTime = 16;
      const steps = duration / stepTime;
      const increment = target / steps;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      updateCounter();
    });
  }


  /* ------------------------------------------------------------------------
     9. PROJECTS FILTER & MODAL POPUP
     ------------------------------------------------------------------------ */
  const projectFilterBtns = document.querySelectorAll('.projects-filter .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Modal Logic
  const modal = document.getElementById('project-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalTechs = document.getElementById('modal-techs');
  const modalLiveBtn = document.getElementById('modal-live');
  const modalGithubBtn = document.getElementById('modal-github');

  const projectDetailsMap = {
    'portfolio': {
      title: 'Personal Developer Portfolio',
      category: 'Web Application',
      desc: 'A world-class, responsive, and animated portfolio website engineered with clean HTML5, modern CSS3, and high-performance Vanilla JavaScript. Features glowing theme switcher, interactive particles canvas, smooth scroll animations, and responsive layout.',
      techs: ['HTML5', 'CSS3', 'JavaScript', 'Canvas', 'SEO'],
      live: '#',
      github: 'https://github.com/gopalkumahto3'
    },
    'salon': {
      title: 'Salon Demo Website',
      category: 'Business Website',
      desc: 'An elegant, high-conversion beauty & hair salon website featuring service menus, interactive appointment booking layout, customer reviews, gallery showcase, and modern glassmorphism aesthetic.',
      techs: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
      live: '#',
      github: 'https://github.com/gopalkumahto3'
    },
    'fashion': {
      title: 'Fashion eCommerce Website',
      category: 'eCommerce UI',
      desc: 'A modern fashion retail store prototype built with responsive grid layouts, interactive product filters, dynamic shopping cart drawer, image zoom on hover, and seamless mobile menu.',
      techs: ['HTML5', 'CSS3', 'JavaScript', 'Flexbox/Grid'],
      live: '#',
      github: 'https://github.com/gopalkumahto3'
    },
    'marketing': {
      title: 'Marketing Conference Landing Page',
      category: 'Landing Page',
      desc: 'A high-impact event landing page featuring animated event countdown timer, speaker lineup grid, ticket pricing plans, registration form, and interactive speaker details.',
      techs: ['HTML5', 'CSS3', 'JavaScript', 'Countdown JS'],
      live: '#',
      github: 'https://github.com/gopalkumahto3'
    }
  };

  const projectDetailBtns = document.querySelectorAll('.view-project-details');
  projectDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const details = projectDetailsMap[projKey];

      if (details && modal) {
        modalTitle.textContent = details.title;
        modalCategory.textContent = details.category;
        modalDesc.textContent = details.desc;
        modalTechs.innerHTML = details.techs.map(t => `<span class="tag-badge">${t}</span>`).join('');
        modalLiveBtn.setAttribute('href', details.live);
        modalGithubBtn.setAttribute('href', details.github);

        modal.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }


  /* ------------------------------------------------------------------------
     10. STATISTICAL COUNTERS ANIMATION
     ------------------------------------------------------------------------ */
  let countersTriggered = false;

  function animateCounters() {
    const counters = document.querySelectorAll('.counter-num');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      let count = 0;
      const speed = target / 50;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.textContent = Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          counter.textContent = target;
        }
      };
      updateCount();
    });
  }


  /* ------------------------------------------------------------------------
     11. TESTIMONIALS CAROUSEL
     ------------------------------------------------------------------------ */
  const track = document.querySelector('.testimonials-track');
  const slides = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('testi-prev');
  const nextBtn = document.getElementById('testi-next');
  let currentSlide = 0;

  if (track && slides.length > 0) {
    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentSlide = index;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));

    // Auto rotate every 6 seconds
    setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 6000);
  }


  /* ------------------------------------------------------------------------
     12. CONTACT FORM SUBMISSION WITH EMAILJS
     ------------------------------------------------------------------------ */
  // EmailJS Credentials Configuration
  const EMAILJS_PUBLIC_KEY = 'T2dSC_nBrcZtERcDC';
  const EMAILJS_SERVICE_ID = 'service_gy16mbo';
  const EMAILJS_TEMPLATE_ID = 'template_pmfsiqd';

  // Initialize EmailJS SDK
  if (typeof emailjs !== 'undefined') {
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    } catch (e) {
      console.warn('EmailJS initialization note:', e);
    }
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Validation
      if (!name) {
        showToast('Please enter your name.', 'error');
        if (nameInput) nameInput.focus();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!message) {
        showToast('Please enter your message.', 'error');
        if (messageInput) messageInput.focus();
        return;
      }

      // EmailJS Template Parameters matching {{name}}, {{email}}, {{message}}
      const templateParams = {
        name: name,
        email: email,
        message: message
      };

      // Loading state
      const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Send Message';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';
        submitBtn.innerHTML = `
          <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2 a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
          <span>Sending...</span>
        `;
      }

      try {
        if (typeof emailjs === 'undefined') {
          throw new Error('EmailJS SDK not loaded.');
        }

        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);

        showToast('✅ Message sent successfully.', 'success');
        contactForm.reset();
      } catch (error) {
        console.error('EmailJS Error:', error);
        showToast('❌ Failed to send message. Please try again.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.style.cursor = 'pointer';
          submitBtn.innerHTML = originalBtnContent;
        }
      }
    });
  }

  // Copy email to clipboard helper
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('gopalkumahto3@gmail.com');
      showToast('Email gopalkumahto3@gmail.com copied to clipboard!');
    });
  }

  // Resume Download Notification
  const downloadBtns = document.querySelectorAll('.download-resume-btn');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Downloading Gopal Kumar Resume (PDF)...');
      setTimeout(() => {
        // Mock download trigger
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'Gopal_Kumar_Resume.pdf';
        link.click();
      }, 800);
    });
  });


  /* ------------------------------------------------------------------------
     13. INTERSECTION OBSERVER FOR SCROLL REVEALS
     ------------------------------------------------------------------------ */
  function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          entry.target.classList.add('active');

          // Trigger skill bars when skill section is visible
          if (entry.target.classList.contains('skills-section')) {
            triggerSkillBars();
          }

          // Trigger counters when stats section is visible
          if (entry.target.classList.contains('stats-section') && !countersTriggered) {
            countersTriggered = true;
            animateCounters();
          }
        }
      });
    }, { threshold: 0.02, rootMargin: '0px 0px -10px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // Fallback visibility check for mobile devices, tall sections, and rapid scrolls
    function checkSkillsVisibility() {
      const skillsSec = document.getElementById('skills');
      if (!skillsSec) return;
      const rect = skillsSec.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        skillsSec.classList.add('active');
        triggerSkillBars();
      }
    }

    window.addEventListener('scroll', checkSkillsVisibility, { passive: true });
    window.addEventListener('resize', checkSkillsVisibility, { passive: true });
    setTimeout(checkSkillsVisibility, 150);
    setTimeout(checkSkillsVisibility, 600);
  }


  /* ------------------------------------------------------------------------
     14. TOAST NOTIFICATION SYSTEM
     ------------------------------------------------------------------------ */
  function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let iconSvg = type === 'error'
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;

    toast.innerHTML = `
      ${iconSvg}
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-30px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

});
