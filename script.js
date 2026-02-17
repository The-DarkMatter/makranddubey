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
// Intersection Observer for Fade-in Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe book cards for staggered fade-in
bookCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
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
// Performance: Lazy Loading Enhancement
// ========================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

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

console.log('🕉️ Website initialized successfully');
