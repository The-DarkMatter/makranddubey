// pdf-reader.js
// Custom PDF.js inline reader for geeta.html

import { getDocument, GlobalWorkerOptions } from './pdfjs/build/pdf.mjs';

GlobalWorkerOptions.workerSrc = new URL('./pdfjs/build/pdf.worker.mjs', import.meta.url).toString();

const PDF_URL = document.body?.dataset?.pdfSrc || 'HindiGeeta/book.pdf';

const canvas = document.getElementById('pdf-canvas');
const loader = document.getElementById('pdf-loader');
const pageInput = document.getElementById('pdf-page-input');
const pageCountSpan = document.getElementById('pdf-page-count');
const prevBtn = document.getElementById('pdf-prev');
const nextBtn = document.getElementById('pdf-next');
const zoomInBtn = document.getElementById('pdf-zoom-in');
const zoomOutBtn = document.getElementById('pdf-zoom-out');
const fitWidthBtn = document.getElementById('pdf-fit-width');
const fullscreenBtn = document.getElementById('pdf-fullscreen');
const wrapper = document.querySelector('.pdf-canvas-wrapper');
const container = document.querySelector('.pdf-reader-container');

let pdfDoc = null;
let currentPage = 1;
let scale = 1.2;
let fitWidth = false;

function showLoader(show, message) {
    if (!loader) return;
    loader.style.display = show ? 'flex' : 'none';
    if (message) {
        const text = loader.querySelector('.pdf-loader-text');
        if (text) text.textContent = message;
    }
}

function setControlsEnabled(enabled) {
    [prevBtn, nextBtn, zoomInBtn, zoomOutBtn, fitWidthBtn, fullscreenBtn, pageInput].forEach(btn => {
        if (btn) btn.disabled = !enabled;
    });
}

function getFitScale(page) {
    const baseViewport = page.getViewport({ scale: 1 });
    if (!wrapper) return 1;
    return wrapper.clientWidth / baseViewport.width;
}

function renderPage(pageNum) {
    if (!pdfDoc) return;
    showLoader(true);
    pdfDoc.getPage(pageNum).then(page => {
        if (fitWidth) {
            scale = getFitScale(page);
        }
        const renderViewport = page.getViewport({ scale });
        canvas.width = renderViewport.width;
        canvas.height = renderViewport.height;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const renderTask = page.render({ canvasContext: ctx, viewport: renderViewport });
        renderTask.promise.then(() => {
            showLoader(false);
        }).catch(() => {
            showLoader(true, 'रेंडर करने में समस्या आई। कृपया पुनः प्रयास करें।');
        });
    }).catch(() => {
        showLoader(true, 'पृष्ठ लोड नहीं हो पाया।');
    });
    if (pageInput) pageInput.value = pageNum;
    currentPage = pageNum;
    updateControls();
}

function updateControls() {
    if (!pdfDoc) return;
    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= pdfDoc.numPages;
    if (pageCountSpan) pageCountSpan.textContent = pdfDoc.numPages;
}

function loadPDF() {
    showLoader(true, 'पुस्तक लोड हो रही है...');
    setControlsEnabled(false);
    getDocument({ url: PDF_URL, withCredentials: false }).promise.then(doc => {
        pdfDoc = doc;
        setControlsEnabled(true);
        renderPage(currentPage);
        updateControls();
    }).catch(() => {
        showLoader(true, 'PDF लोड नहीं हुआ। कृपया पेज रीफ्रेश करें।');
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) renderPage(currentPage - 1);
    });
}
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (pdfDoc && currentPage < pdfDoc.numPages) renderPage(currentPage + 1);
    });
}
if (pageInput) {
    pageInput.addEventListener('change', () => {
        const val = parseInt(pageInput.value);
        if (pdfDoc && val >= 1 && val <= pdfDoc.numPages) renderPage(val);
    });
    pageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const val = parseInt(pageInput.value);
            if (pdfDoc && val >= 1 && val <= pdfDoc.numPages) renderPage(val);
        }
    });
}
if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
        scale = Math.min(scale + 0.2, 3);
        fitWidth = false;
        renderPage(currentPage);
    });
}
if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
        scale = Math.max(scale - 0.2, 0.5);
        fitWidth = false;
        renderPage(currentPage);
    });
}
if (fitWidthBtn) {
    fitWidthBtn.addEventListener('click', () => {
        fitWidth = true;
        renderPage(currentPage);
    });
}
if (fullscreenBtn && container) {
    fullscreenBtn.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            container.requestFullscreen();
        }
    });
}

document.addEventListener('fullscreenchange', () => {
    if (fitWidth) renderPage(currentPage);
});

window.addEventListener('resize', () => {
    if (fitWidth) renderPage(currentPage);
});

if (canvas && loader && pageInput && pageCountSpan && prevBtn && nextBtn && zoomInBtn && zoomOutBtn && fitWidthBtn) {
    loadPDF();
} else {
    showLoader(true, 'रीडर प्रारंभ नहीं हो सका।');
}
