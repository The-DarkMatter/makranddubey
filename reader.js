// ========================================
// Reader Page Functionality
// ========================================

// Font Size Control
let currentFontSize = 100;
const MIN_FONT_SIZE = 80;
const MAX_FONT_SIZE = 150;
const FONT_STEP = 10;

const increaseFontBtn = document.getElementById('increase-font');
const decreaseFontBtn = document.getElementById('decrease-font');
const fontSizeDisplay = document.getElementById('font-size-display');
const readingArea = document.getElementById('reading-area');

function updateFontSize(newSize) {
    currentFontSize = Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, newSize));
    if (readingArea) {
        readingArea.style.fontSize = `${currentFontSize}%`;
    }
    if (fontSizeDisplay) {
        fontSizeDisplay.textContent = `${currentFontSize}%`;
    }
    
    // Save to localStorage
    localStorage.setItem('readerFontSize', currentFontSize);
}

if (increaseFontBtn) {
    increaseFontBtn.addEventListener('click', () => {
        updateFontSize(currentFontSize + FONT_STEP);
    });
}

if (decreaseFontBtn) {
    decreaseFontBtn.addEventListener('click', () => {
        updateFontSize(currentFontSize - FONT_STEP);
    });
}

// Load saved font size
const savedFontSize = localStorage.getItem('readerFontSize');
if (savedFontSize) {
    updateFontSize(parseInt(savedFontSize));
}

// ========================================
// View Mode Toggle (Dual Column / Hindi Only)
// ========================================
const dualViewBtn = document.getElementById('dual-view');
const hindiOnlyBtn = document.getElementById('hindi-only');

if (dualViewBtn && hindiOnlyBtn) {
    dualViewBtn.addEventListener('click', () => {
        document.querySelectorAll('.verse-container').forEach(container => {
            container.classList.add('dual-column');
        });
        document.querySelectorAll('.sanskrit-text').forEach(el => {
            el.style.display = 'block';
        });
        dualViewBtn.classList.add('active');
        hindiOnlyBtn.classList.remove('active');
        localStorage.setItem('readerViewMode', 'dual');
    });

    hindiOnlyBtn.addEventListener('click', () => {
        document.querySelectorAll('.verse-container').forEach(container => {
            container.classList.remove('dual-column');
        });
        document.querySelectorAll('.sanskrit-text').forEach(el => {
            el.style.display = 'none';
        });
        hindiOnlyBtn.classList.add('active');
        dualViewBtn.classList.remove('active');
        localStorage.setItem('readerViewMode', 'hindi');
    });

    // Load saved view mode
    const savedViewMode = localStorage.getItem('readerViewMode');
    if (savedViewMode === 'hindi') {
        hindiOnlyBtn.click();
    }
}

// ========================================
// Bookmark Functionality
// ========================================
const bookmarkBtn = document.getElementById('bookmark-btn');

function saveBookmark() {
    const currentChapter = document.querySelector('.chapter-link.active');
    if (currentChapter) {
        const chapterNum = currentChapter.getAttribute('data-chapter');
        const chapterName = currentChapter.querySelector('.chapter-name').textContent;
        const bookName = document.querySelector('.book-main-title').textContent;
        
        const bookmark = {
            book: bookName,
            chapter: chapterNum,
            chapterName: chapterName,
            timestamp: new Date().toISOString(),
            scrollPosition: window.scrollY
        };
        
        localStorage.setItem('currentBookmark', JSON.stringify(bookmark));
        
        // Show feedback
        showNotification('बुकमार्क सहेजा गया! 🔖');
    }
}

if (bookmarkBtn) {
    bookmarkBtn.addEventListener('click', saveBookmark);
}

// ========================================
// Load Bookmark on Page Load
// ========================================
function loadBookmark() {
    const savedBookmark = localStorage.getItem('currentBookmark');
    if (savedBookmark) {
        const bookmark = JSON.parse(savedBookmark);
        const currentBook = document.querySelector('.book-main-title')?.textContent;
        
        if (currentBook === bookmark.book) {
            // Scroll to saved position
            setTimeout(() => {
                window.scrollTo({
                    top: bookmark.scrollPosition,
                    behavior: 'smooth'
                });
            }, 500);
            
            // Highlight saved chapter
            const chapterLink = document.querySelector(`[data-chapter="${bookmark.chapter}"]`);
            if (chapterLink) {
                document.querySelectorAll('.chapter-link').forEach(link => {
                    link.classList.remove('active');
                });
                chapterLink.classList.add('active');
            }
        }
    }
}

// Load bookmark when page loads
window.addEventListener('load', loadBookmark);

// ========================================
// Chapter Navigation
// ========================================
const chapterLinks = document.querySelectorAll('.chapter-link');

chapterLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Update active state
        chapterLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Auto-save bookmark when changing chapters
        setTimeout(saveBookmark, 300);
    });
});

// ========================================
// Reading Progress Indicator
// ========================================
function updateReadingProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    
    // Create or update progress bar
    let progressBar = document.getElementById('reading-progress-bar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'reading-progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #FF9933, #DC143C);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateReadingProgress);
updateReadingProgress();

// ========================================
// Notification System
// ========================================
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #FF9933, #DC143C);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Keyboard Shortcuts
// ========================================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Plus: Increase font size
    if ((e.ctrlKey || e.metaKey) && e.key === '=') {
        e.preventDefault();
        increaseFontBtn?.click();
    }
    
    // Ctrl/Cmd + Minus: Decrease font size
    if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        decreaseFontBtn?.click();
    }
    
    // Ctrl/Cmd + B: Bookmark
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        bookmarkBtn?.click();
    }
    
    // Ctrl/Cmd + P: Print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        // Allow default print behavior
    }
});

// ========================================
// Auto-save Reading Position
// ========================================
let savePositionTimeout;

window.addEventListener('scroll', () => {
    clearTimeout(savePositionTimeout);
    savePositionTimeout = setTimeout(() => {
        saveBookmark();
    }, 2000); // Save after 2 seconds of no scrolling
});

// ========================================
// Smooth Scroll to Top Button
// ========================================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'ऊपर जाएं');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF9933, #DC143C);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.pointerEvents = 'all';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.pointerEvents = 'none';
    }
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
});

console.log('📖 Reader initialized successfully');
