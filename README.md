# हिन्दी धार्मिक ग्रन्थ | Hindi Religious Texts

A modern, responsive website showcasing Hindi translations of sacred Hindu texts by **Pandit Govind Makrand Dubey**.

## 📚 Featured Books

1. **हिन्दी-गीता (Hindi Geeta)** - Bhagavad Gita in Hindi verse with original Sanskrit
2. **हिन्दी भागवत (Hindi Bhagwat)** - Bhagavat Purana in Hindi translation
3. **हिन्दी रामायण (Hindi Ramayana)** - Ramayana in Hindi verse
4. **Upcoming Release** - New translation coming soon

## 🎨 Design Features

### Color Palette
- **Primary**: Saffron/Orange (#FF9933)
- **Secondary**: Deep Red (#DC143C)
- **Accent**: Gold (#FFD700)
- **Background**: Soft Yellow (#FFF9E6) and White (#FFFFFF)
- **Text**: Dark Brown (#4A2C2A)

### Visual Elements
- Clean, minimalist layout with traditional Hindu aesthetics
- Responsive design (mobile-first approach)
- Smooth animations and transitions
- Om (ॐ) and lotus motifs as decorative elements
- Traditional border patterns inspired by temple architecture

## 🚀 Features

### Homepage
- Hero section with translator introduction
- Equal prominence grid for all 4 books (2x2 on desktop, stacked on mobile)
- Animated book cards with hover effects
- About preview section
- Comprehensive footer

### Book Reader Pages
- **Reading Controls**:
  - Font size adjustment (80%-150%)
  - Dual-column view (Sanskrit + Hindi)
  - Hindi-only view
  - Bookmark functionality
  - Print support
  
- **Navigation**:
  - Chapter-wise navigation
  - Smooth scrolling
  - Reading progress indicator
  - Scroll-to-top button

- **Features**:
  - Auto-save reading position
  - Keyboard shortcuts (Ctrl/Cmd + Plus/Minus for font size)
  - Responsive layout for all devices

### Additional Pages
- **About Page**: Detailed biography of the translator
- **Contact Page**: Feedback form and publisher information

## 🛠️ Technical Stack

- **HTML5**: Semantic markup with proper ARIA labels
- **CSS3**: 
  - CSS Grid and Flexbox for layouts
  - CSS Variables for theming
  - Responsive media queries
  - CSS animations and transitions
  
- **JavaScript (Vanilla)**:
  - Mobile navigation toggle
  - Smooth scroll enhancement
  - Reading controls (font size, view mode)
  - Bookmark system (localStorage)
  - Intersection Observer for animations
  - Form handling

- **Fonts**:
  - Noto Sans Devanagari (for Hindi/Sanskrit)
  - Poppins (for English and mixed content)
  - Mukta (fallback)

## 📱 Responsive Design

- **Desktop**: Full-featured experience with 2-column layouts
- **Tablet**: Adjusted grid layouts, simplified navigation
- **Mobile**: Single-column layouts, hamburger menu, optimized touch targets

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- High contrast ratios (4.5:1 minimum)
- Focus indicators for interactive elements
- Alt text for all images
- Screen reader friendly

## 📂 Project Structure

```
makranddubey/
├── index.html              # Homepage
├── geeta.html             # Bhagavad Gita reader
├── bhagwat.html           # Bhagavat Purana reader
├── ramayana.html          # Ramayana reader
├── about.html             # About the translator
├── contact.html           # Contact and feedback
├── styles.css             # Main stylesheet
├── reader.css             # Reader-specific styles
├── script.js              # Main JavaScript
├── reader.js              # Reader functionality
├── HindiGeeta/
│   ├── Cover.jpg
│   └── book.pdf
├── HindiBhagwat/
│   ├── Cover.jpg
│   └── book.pdf
├── HindiRamayana/
│   ├── Cover.jpg
│   └── book.pdf
└── README.md
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Key Interactions

### Book Cards
- Hover effect with lift animation and golden glow
- Overlay with "और जानें" (Learn More) text
- Smooth image zoom on hover
- Equal visual weight for all books

### Navigation
- Sticky header that hides on scroll down, shows on scroll up
- Active section highlighting
- Mobile hamburger menu with smooth transitions

### Reader Features
- Font size controls with visual feedback
- View mode toggle (Sanskrit+Hindi / Hindi only)
- One-click bookmark saving with notification
- Auto-save reading position on scroll
- Chapter navigation with active state

## 📖 Usage

### Running Locally

1. Clone the repository
2. Open `index.html` in a web browser
3. No build process required - pure HTML/CSS/JS

### Deploying

- Can be deployed to any static hosting service:
  - GitHub Pages
  - Netlify
  - Vercel
  - Traditional web hosting

## 👤 Translator Information

**Pandit Govind Makrand Dubey**
- Sanskrit scholar and Hindi poet
- Dedicated to translating ancient texts into accessible Hindi
- Published by Pathey Prakashan, Jabalpur, M.P.

## 📄 License

© 2026 Pandit Govind Makrand Dubey. All rights reserved.

## 🙏 Acknowledgments

- **Publisher**: Pathey Prakashan, Jabalpur, Madhya Pradesh
- **Fonts**: Google Fonts (Noto Sans Devanagari, Poppins, Mukta)

---

**ॐ सनातन धर्म की सेवा में ॐ**

*In service of Sanatan Dharma*
