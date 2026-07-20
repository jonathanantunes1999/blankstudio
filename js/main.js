/* ============================================
   BLANK STUDIO v2 - JAVASCRIPT
   Vrrb-inspired interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initSplashscreen();
    initHamburgerMenu();
    initNavbarScroll();
    initScrollReveal();
    initFAQ();
    initPortfolioFilter();
    initCookieBanner();
    initBackToTop();
    initFormValidation();
    initCounters();
    initParallax();
    initProjectsSlider();
    initQuoteSlider();
    initCursorDot();
});

/* ===== CURSOR DOT - VRRB STYLE ===== */
function initCursorDot() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
    document.body.classList.add('has-cursor-dot');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let isVisible = false;

    const interactiveSelector = 'a, button, input, textarea, select, [role="button"]';

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isVisible) {
            dotX = mouseX;
            dotY = mouseY;
            isVisible = true;
            dot.classList.add('visible');
        }
    });

    document.addEventListener('mouseleave', () => {
        isVisible = false;
        dot.classList.remove('visible');
    });
    document.addEventListener('mouseenter', () => {
        isVisible = true;
        dot.classList.add('visible');
    });

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelector)) dot.classList.add('hover');
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveSelector)) dot.classList.remove('hover');
    });
    document.addEventListener('mousedown', () => dot.classList.add('pressed'));
    document.addEventListener('mouseup', () => dot.classList.remove('pressed'));

    let lastTime = performance.now();

    function render(now) {
        const dt = Math.min(now - lastTime, 50); // clamp to avoid jumps after tab is backgrounded
        lastTime = now;
        // Frame-rate independent smoothing: ~0.55 catch-up per 16.7ms frame
        const ease = 1 - Math.pow(1 - 0.55, dt / 16.7);
        dotX += (mouseX - dotX) * ease;
        dotY += (mouseY - dotY) * ease;
        dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

/* ===== SPLASHSCREEN ===== */
function initSplashscreen() {
    const splash = document.querySelector('.splashscreen');
    if (!splash) return;

    const MIN_DISPLAY_MS = 650;
    const shownAt = Date.now();

    function hide() {
        const elapsed = Date.now() - shownAt;
        const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
        setTimeout(() => splash.classList.add('hidden'), wait);
    }

    if (document.readyState === 'complete') {
        hide();
    } else {
        window.addEventListener('load', hide, { once: true });
    }
}

/* ===== HAMBURGER MENU - VRRB STYLE ===== */
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.menu-overlay');
    const menuItems = document.querySelectorAll('.menu-item');

    if (!hamburger || !overlay) return;

    function setMenu(open) {
        hamburger.classList.toggle('active', open);
        overlay.classList.toggle('active', open);
        document.body.classList.toggle('menu-open', open);
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    // Toggle on hamburger click
    hamburger.addEventListener('click', function() {
        setMenu(!hamburger.classList.contains('active'));
    });

    // Close on menu item click
    menuItems.forEach(item => {
        item.addEventListener('click', () => setMenu(false));
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            setMenu(false);
        }
    });
}

/* ===== NAVBAR SCROLL ===== */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
}

/* ===== FAQ ===== */
function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });
}

/* ===== PORTFOLIO FILTER ===== */
function initPortfolioFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;

            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            items.forEach(item => {
                const cat = item.dataset.category;
                if (filter === 'all' || cat === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/* ===== COOKIE BANNER ===== */
function initCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    const acceptBtn = document.querySelector('.cookie-accept');
    const declineBtn = document.querySelector('.cookie-decline');

    if (!banner) return;

    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => banner.classList.add('show'), 1000);
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            banner.classList.remove('show');
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'false');
            banner.classList.remove('show');
        });
    }
}

/* ===== BACK TO TOP ===== */
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
}

/* ===== FORM VALIDATION ===== */
function initFormValidation() {
    document.querySelectorAll('form[data-validate]').forEach(form => {
        form.addEventListener('submit', function(e) {
            let valid = true;
            form.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.style.borderColor = '#ef4444';
                    field.addEventListener('input', function() {
                        if (this.value.trim()) this.style.borderColor = '';
                    }, { once: true });
                }
            });

            const email = form.querySelector('input[type="email"]');
            if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                valid = false;
                email.style.borderColor = '#ef4444';
            }

            if (!valid) e.preventDefault();
        });
    });
}

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const inc = target / (duration / 16);
    function update() {
        start += inc;
        if (start < target) {
            el.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(update);
        } else {
            el.textContent = target.toLocaleString();
        }
    }
    update();
}

function initCounters() {
    document.querySelectorAll('[data-counter]').forEach(counter => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target, parseInt(entry.target.dataset.counter));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(counter);
    });
}

/* ===== PARALLAX ===== */
function initParallax() {
    const items = document.querySelectorAll('[data-parallax]');
    if (!items.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;

    function update() {
        const viewportH = window.innerHeight;
        items.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.1;
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const offset = (viewportH / 2 - center) * speed;
            el.style.transform = `translateY(${offset}px)`;
        });
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
}

/* ===== FEATURED PROJECTS SLIDER ===== */
function initProjectsSlider() {
    const track = document.querySelector('.projects-track');
    const dotsContainer = document.querySelector('.projects-slider .slider-nav');
    if (!track || !dotsContainer) return;

    const slides = Array.from(track.querySelectorAll('.project-slide'));
    if (!slides.length) return;

    dotsContainer.innerHTML = '';
    const dots = slides.map((slide, i) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Ir para o projeto ${i + 1}`);
        dot.addEventListener('click', () => {
            slide.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        });
        dotsContainer.appendChild(dot);
        return dot;
    });

    function setActiveFromScroll() {
        const trackRect = track.getBoundingClientRect();
        let closestIndex = 0;
        let closestDist = Infinity;
        slides.forEach((slide, i) => {
            const dist = Math.abs(slide.getBoundingClientRect().left - trackRect.left);
            if (dist < closestDist) { closestDist = dist; closestIndex = i; }
        });
        dots.forEach((d, i) => d.classList.toggle('active', i === closestIndex));
    }

    let ticking = false;
    track.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => { setActiveFromScroll(); ticking = false; });
            ticking = true;
        }
    }, { passive: true });
}

/* ===== TESTIMONIAL / QUOTE SLIDER ===== */
function initQuoteSlider() {
    const wrapper = document.querySelector('.quote-slider');
    if (!wrapper) return;

    const slides = Array.from(wrapper.querySelectorAll('.quote-slide'));
    const dotsContainer = wrapper.querySelector('.quote-dots');
    if (!slides.length || !dotsContainer) return;

    let index = 0;
    let timer = null;
    const AUTOPLAY_MS = 6000;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    dotsContainer.innerHTML = '';
    const dots = slides.map((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'quote-dot' + (i === 0 ? ' active' : '');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Testemunho ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
        return dot;
    });

    function goTo(i) {
        slides[index].classList.remove('active');
        dots[index].classList.remove('active');
        index = (i + slides.length) % slides.length;
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function next() { goTo(index + 1); }

    function start() {
        if (reducedMotion || slides.length < 2) return;
        stop();
        timer = setInterval(next, AUTOPLAY_MS);
    }
    function stop() {
        if (timer) clearInterval(timer);
        timer = null;
    }

    wrapper.addEventListener('mouseenter', stop);
    wrapper.addEventListener('mouseleave', start);
    wrapper.addEventListener('focusin', stop);
    wrapper.addEventListener('focusout', start);

    start();
}
