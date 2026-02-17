// ========================================
// Mobile Navigation Toggle
// ========================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (isExpanded) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
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
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Active Navigation Highlight on Scroll
// ========================================
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

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
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// ========================================
// Book Card Interaction Enhancements
// ========================================
const bookCards = document.querySelectorAll('.book-card');

bookCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ========================================
// Loading State for PDFs
// ========================================
const pdfLinks = document.querySelectorAll('a[href$=".pdf"]');

pdfLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const btn = this;
        if (!btn.classList.contains('loading')) {
            btn.classList.add('loading');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>⏳</span> डाउनलोड हो रहा है...';
            
            setTimeout(() => {
                btn.classList.remove('loading');
                btn.innerHTML = originalText;
            }, 2000);
        }
    });
});

// ========================================
// Accessibility: Keyboard Navigation Enhancement
// ========================================
document.addEventListener('keydown', (e) => {
    // Focus trap in mobile menu when open
    if (navMenu.classList.contains('active') && e.key === 'Escape') {
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.focus();
    }
});

// ========================================
// Performance: Viewport-Aware Image Loading
// ========================================
// Use IntersectionObserver to preload images slightly before they enter the viewport
(function() {
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // If image has a data-src, swap it in (for deferred images)
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    // Mark as eager once it's near viewport
                    img.loading = 'eager';
                    imgObserver.unobserve(img);
                }
            });
        }, {
            // Start loading 200px before the image enters the viewport
            rootMargin: '200px 0px',
            threshold: 0
        });
        
        // Observe all lazy images
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => { img.loading = 'eager'; });
    }
})();

// ========================================
// Analytics and User Engagement (Optional)
// ========================================
function trackBookInteraction(bookName, action) {
    console.log(`User ${action} on ${bookName}`);
    // Add analytics tracking here if needed
    // Example: gtag('event', action, { book: bookName });
}

document.querySelectorAll('.book-card').forEach(card => {
    const bookName = card.getAttribute('data-book');
    
    card.querySelector('.btn-primary')?.addEventListener('click', () => {
        trackBookInteraction(bookName, 'opened_reader');
    });
    
    card.querySelector('.btn-secondary')?.addEventListener('click', () => {
        trackBookInteraction(bookName, 'downloaded_pdf');
    });
});

// ========================================
// Print Functionality
// ========================================
function setupPrintButton() {
    const printButtons = document.querySelectorAll('[data-print]');
    printButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.print();
        });
    });
}

setupPrintButton();

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
        do {
            index = Math.floor(Math.random() * FEATURED_VERSES.length);
        } while (index === lastIndex && FEATURED_VERSES.length > 1);
        showVerse(index);
    }
    
    // Show a verse based on the day (so same verse throughout the day)
    const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % FEATURED_VERSES.length;
    showVerse(dayIndex);
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', showRandomVerse);
    }
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
                // Stagger the reveal slightly
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

setupScrollReveal();

// ========================================
// Books Carousel - Coverflow with DOM reorder
// ========================================
function setupCarousel() {
    const carousel = document.querySelector('.books-carousel');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!carousel) return;
    
    // Store original order: [geeta=0, bhagwat=1, ramayana=2]
    const allCards = Array.from(carousel.querySelectorAll('.book-card'));
    if (allCards.length < 3) return;
    
    let currentCenter = 0; // index of center card in allCards
    
    function render() {
        const total = allCards.length;
        const leftIdx = (currentCenter - 1 + total) % total;
        const rightIdx = (currentCenter + 1) % total;
        
        // Clear carousel
        while (carousel.firstChild) {
            carousel.removeChild(carousel.firstChild);
        }
        
        // Get the cards
        const leftCard = allCards[leftIdx];
        const centerCard = allCards[currentCenter];
        const rightCard = allCards[rightIdx];
        
        // Remove old classes from ALL cards
        allCards.forEach(c => c.classList.remove('center', 'side', 'carousel-animate'));
        
        // Prioritize center card image, lazy load side cards
        const centerImg = centerCard.querySelector('.book-cover');
        const leftImg = leftCard.querySelector('.book-cover');
        const rightImg = rightCard.querySelector('.book-cover');
        if (centerImg) {
            centerImg.loading = 'eager';
            centerImg.removeAttribute('fetchpriority');
        }
        if (leftImg) leftImg.loading = 'lazy';
        if (rightImg) rightImg.loading = 'lazy';
        
        // Assign classes
        leftCard.classList.add('side');
        centerCard.classList.add('center');
        rightCard.classList.add('side');
        
        // Append in visual order: left, center, right
        carousel.appendChild(leftCard);
        carousel.appendChild(centerCard);
        carousel.appendChild(rightCard);
        
        // Trigger fade-in animation on center card
        requestAnimationFrame(() => {
            centerCard.classList.add('carousel-animate');
        });
        
        // Update indicators
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === currentCenter);
        });
    }
    
    function goNext() {
        currentCenter = (currentCenter + 1) % allCards.length;
        render();
    }
    
    function goPrev() {
        currentCenter = (currentCenter - 1 + allCards.length) % allCards.length;
        render();
    }
    
    // Button handlers
    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (prevBtn) prevBtn.addEventListener('click', goPrev);
    
    // Indicator handlers
    indicators.forEach((ind, i) => {
        ind.addEventListener('click', () => {
            currentCenter = i;
            render();
        });
    });
    
    // Click side card to bring to center
    allCards.forEach((card, i) => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('center')) {
                currentCenter = i;
                render();
            }
        });
    });
    
    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goPrev();
        if (e.key === 'ArrowRight') goNext();
    });
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchStartX - touchEndX;
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) goNext();
            else goPrev();
        }
    }, { passive: true });
    
    // Auto-play (pause on hover/touch)
    let autoplayInterval = setInterval(goNext, 5000);
    
    carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    carousel.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(goNext, 5000);
    });
    carousel.addEventListener('touchstart', () => clearInterval(autoplayInterval), { passive: true });
    
    // Initialize
    render();
}

setupCarousel();

console.log('🕉️ Website initialized successfully');
