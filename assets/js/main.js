/* ═══════════════════════════════════════════════
   ROHAN NEGI PORTFOLIO — main.js
   Handles: nav, scroll reveal, skill bars, mobile
   ═══════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // ── Sticky header ──────────────────────────────
    const header = document.getElementById('header');
    if (header) {
        const handleScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // ── Active nav link ────────────────────────────
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');

    const setActiveNav = () => {
        let current = '';
        sections.forEach(sec => {
            const top = sec.getBoundingClientRect().top;
            if (top <= 120) current = sec.id;
        });
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${current}`);
        });
    };

    window.addEventListener('scroll', setActiveNav, { passive: true });
    setActiveNav();

    // ── Mobile menu ────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        const toggleMenu = (forceClose = false) => {
            const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
            const shouldOpen = forceClose ? false : !isOpen;

            hamburger.setAttribute('aria-expanded', shouldOpen);
            mobileMenu.hidden = !shouldOpen;
            document.body.style.overflow = shouldOpen ? 'hidden' : '';
        };

        hamburger.addEventListener('click', () => toggleMenu());

        // Close on mobile link click
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => toggleMenu(true));
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target)) toggleMenu(true);
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') toggleMenu(true);
        });
    }

    // ── Scroll reveal ──────────────────────────────
    const revealEls = document.querySelectorAll(
        '.project-card, .edu-card, .cert-card, .timeline-item, ' +
        '.skill-category, .about-grid, .skills-bar-section, ' +
        '.quick-fact, .hero-stats, .more-projects, .contact-card, ' +
        '.recruiter-strip, .resume-cta'
    );

    revealEls.forEach((el, i) => {
        el.classList.add('reveal');
        // Stagger within parent groups
        const siblings = el.parentElement.querySelectorAll('.reveal');
        siblings.forEach((sib, j) => {
            if (j < 4) sib.classList.add(`reveal-delay-${j + 1}`);
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));

    // ── Skill bars animation ───────────────────────
    const skillBars = document.querySelectorAll('.sb-fill');

    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Small delay to ensure the reveal animation ran first
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, 200);
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => barObserver.observe(bar));

    // ── Smooth scroll for anchor links ────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ── Typing effect for hero title ──────────────
    // Subtle: no cursor blink spam, just a clean underline reveal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.setProperty('--reveal', '1');
    }

    // ── Project card hover tilt (subtle, no gyro) ─
    const projectCards = document.querySelectorAll('.project-card');
    const MAX_TILT = 2; // degrees

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);

            const rotX = -dy * MAX_TILT;
            const rotY = dx * MAX_TILT;

            card.style.transform =
                `translateY(-2px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), ' +
                                    'border-color 220ms ease, box-shadow 220ms ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.12s ease-out, ' +
                                    'border-color 220ms ease, box-shadow 220ms ease';
        });
    });

    // ── Respect reduced motion ─────────────────────
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
        // Immediately show all reveal items
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('visible');
        });
        // Animate bars immediately
        skillBars.forEach(bar => bar.classList.add('animate'));
        // Disable tilt
        projectCards.forEach(card => {
            card.removeEventListener('mousemove', () => {});
        });
    }

});
