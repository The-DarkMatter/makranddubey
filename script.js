// ========================================
// Mobile Navigation Toggle (new structure)
// ========================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenuMobile = document.querySelector('.nav-menu-mobile');
const navMenuDesktop = document.querySelector('ul.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = navMenuMobile && !navMenuMobile.classList.contains('hidden');
        if (navMenuMobile) {
            navMenuMobile.classList.toggle('hidden');
        }
        const expanded = navMenuMobile && !navMenuMobile.classList.contains('hidden');
        mobileMenuToggle.setAttribute('aria-expanded', expanded);

        // Animate hamburger
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (expanded) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-menu-mobile .nav-link, .nav-menu-mobile .lang-toggle-btn').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenuMobile) navMenuMobile.classList.add('hidden');
        mobileMenuToggle?.setAttribute('aria-expanded', 'false');
        const spans = mobileMenuToggle?.querySelectorAll('span');
        if (spans) spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
});

// ========================================
// Smooth Scroll Enhancement
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            // Close mobile menu if open
            if (navMenuMobile && !navMenuMobile.classList.contains('hidden')) {
                navMenuMobile.classList.add('hidden');
                mobileMenuToggle?.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

// ========================================
// Header Hide/Show on Scroll
// ========================================
let lastScrollTop = 0;
const header = document.querySelector('.site-header');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > scrollThreshold) {
        if (scrollTop > lastScrollTop) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

// ========================================
// Bottom Navigation Active State
// ========================================
function setupBottomNav() {
    const bottomNav = document.getElementById('bottomNav');
    if (!bottomNav) return;

    const path = window.location.pathname;
    const tabs = bottomNav.querySelectorAll('[data-nav]');

    let activeTab = 'home';
    if (path.includes('geeta-videos')) activeTab = 'videos';
    else if (path.includes('contact')) activeTab = 'contact';
    else if (path.includes('about')) activeTab = 'contact'; // fallback
    else if (path.includes('geeta') || path.includes('bhagwat') || path.includes('ramayana')) activeTab = 'books';
    else if (path === '/' || path.endsWith('index.html') || path === '') activeTab = 'home';

    tabs.forEach(tab => {
        const nav = tab.getAttribute('data-nav');
        if (nav === activeTab) {
            tab.classList.add('bg-saffron/10', 'text-deep-red');
            tab.classList.remove('text-dark-brown/50');
            tab.setAttribute('aria-current', 'page');
            const icon = tab.querySelector('.material-symbols-outlined');
            if (icon) icon.style.fontVariationSettings = "'FILL' 1";
        } else {
            tab.classList.remove('bg-saffron/10', 'text-deep-red');
            tab.classList.add('text-dark-brown/50');
            tab.removeAttribute('aria-current');
            const icon = tab.querySelector('.material-symbols-outlined');
            if (icon) icon.style.fontVariationSettings = "'FILL' 0";
        }
    });
}
setupBottomNav();

// ========================================
// Loading State for PDF downloads
// ========================================
document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
    link.addEventListener('click', function () {
        const btn = this;
        if (!btn.classList.contains('loading')) {
            btn.classList.add('loading');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span class="material-symbols-outlined text-lg animate-spin">hourglass_top</span> डाउनलोड हो रहा है...';
            setTimeout(() => {
                btn.classList.remove('loading');
                btn.innerHTML = originalText;
            }, 2000);
        }
    });
});

// ========================================
// Accessibility: Escape closes mobile menu
// ========================================
document.addEventListener('keydown', (e) => {
    if (navMenuMobile && !navMenuMobile.classList.contains('hidden') && e.key === 'Escape') {
        navMenuMobile.classList.add('hidden');
        mobileMenuToggle?.setAttribute('aria-expanded', 'false');
        mobileMenuToggle?.focus();
        const spans = mobileMenuToggle?.querySelectorAll('span');
        if (spans) spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
});

// ========================================
// Viewport-Aware Image Loading
// ========================================
(function () {
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.loading = 'eager';
                    imgObserver.unobserve(img);
                }
            });
        }, { rootMargin: '200px 0px', threshold: 0 });
        document.querySelectorAll('img[loading="lazy"]').forEach(img => imgObserver.observe(img));
    }
})();

// ========================================
// Analytics Placeholder
// ========================================
function trackBookInteraction(bookName, action) {
    console.log(`User ${action} on ${bookName}`);
}
document.querySelectorAll('.book-card, [data-book]').forEach(card => {
    const bookName = card.getAttribute('data-book');
    if (!bookName) return;
    card.querySelector('a[href$=".html"]')?.addEventListener('click', () => trackBookInteraction(bookName, 'opened_reader'));
    card.querySelector('a[href$=".pdf"]')?.addEventListener('click', () => trackBookInteraction(bookName, 'downloaded_pdf'));
});

// ========================================
// Featured Verse
// ========================================
function setupFeaturedVerse() {
    const sanskritEl = document.getElementById('verse-sanskrit');
    const hindiEl = document.getElementById('verse-hindi');
    const sourceEl = document.getElementById('verse-source');
    const refreshBtn = document.getElementById('verse-refresh');

    if (!sanskritEl || !hindiEl || !sourceEl) return;
    if (typeof FEATURED_VERSES === 'undefined' || !FEATURED_VERSES.length) return;

    let lastIndex = -1;

    function showVerse(index) {
        const verse = FEATURED_VERSES[index];
        sanskritEl.textContent = verse.sanskrit;
        hindiEl.textContent = verse.hindi;
        sourceEl.textContent = '— ' + verse.source;
        lastIndex = index;
    }

    function showRandomVerse() {
        let index;
        do { index = Math.floor(Math.random() * FEATURED_VERSES.length); }
        while (index === lastIndex && FEATURED_VERSES.length > 1);
        showVerse(index);
    }

    const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % FEATURED_VERSES.length;
    showVerse(dayIndex);

    if (refreshBtn) refreshBtn.addEventListener('click', showRandomVerse);
}
setupFeaturedVerse();

// ========================================
// Scroll Reveal Animations
// ========================================
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('revealed'), index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
}
setupScrollReveal();

// ========================================
// Back to Top Button
// ========================================
(function () {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 400) {
                    backToTop.classList.add('!opacity-100', '!visible', '!translate-y-0');
                } else {
                    backToTop.classList.remove('!opacity-100', '!visible', '!translate-y-0');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ========================================
// Copy Link Button
// ========================================
document.querySelectorAll('.copy-link').forEach(btn => {
    btn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<span class="material-symbols-outlined text-sm">check</span> कॉपी हुआ!';
            btn.style.color = '#25D366';
            setTimeout(() => { btn.innerHTML = originalHTML; btn.style.color = ''; }, 2000);
        } catch (err) {
            const textarea = document.createElement('textarea');
            textarea.value = window.location.href;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    });
});

// ========================================
// Horizontal scroll indicator dots (books)
// ========================================
(function () {
    const scrollContainer = document.querySelector('#books .scrollbar-hide');
    const dots = document.querySelectorAll('#books .flex.justify-center span');
    if (!scrollContainer || !dots.length) return;

    scrollContainer.addEventListener('scroll', () => {
        const scrollLeft = scrollContainer.scrollLeft;
        const cardWidth = scrollContainer.firstElementChild?.offsetWidth || 300;
        const gap = 20;
        const index = Math.round(scrollLeft / (cardWidth + gap));
        dots.forEach((dot, i) => {
            dot.classList.toggle('bg-saffron', i === index);
            dot.classList.toggle('bg-saffron/30', i !== index);
        });
    }, { passive: true });
})();

console.log('🕉️ Website initialized successfully');
