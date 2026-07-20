/* ============================================
   BLANK STUDIO v2 - JAVASCRIPT
   Vrrb-inspired interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initHamburgerMenu();
    initNavbarScroll();
    initScrollReveal();
    initFAQ();
    initPortfolioFilter();
    initCookieBanner();
    initBackToTop();
    initFormValidation();
    initCounters();
});

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

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
