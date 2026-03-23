# Design System: Sacred Modernity

## 1. Overview & Creative North Star

### The Creative North Star: "The Digital Sanctuary"
The objective of this design system is to transcend the utility of a standard literature website and create a "Digital Sanctuary." We are moving away from the rigid, grid-locked structures of traditional archives toward a high-end editorial experience that feels as intentional and revered as the texts it houses. 

By utilizing **Organic Layering** and **Asymmetric Depth**, we break the "template" look. This system treats mobile screens not as a flat canvas, but as a series of tactile, sacred surfaces. We prioritize clear Hindi legibility through generous leading and high-contrast typography, ensuring that the spiritual essence of the content is reflected in the sophistication of the interface.

---

## 2. Colors

The palette is rooted in the traditional saffron, vermilion, and sandalwood tones of Hindi religious literature, but elevated through Material 3 logic to ensure accessibility and tonal depth.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections or containers. Boundaries must be established through background color shifts or tonal transitions.
- Use `surface-container-low` for secondary sections.
- Use `surface-container-highest` for prominent cards.
- Separation is achieved through white space (`spacing-8` or `spacing-12`) rather than visual lines.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper.
- **Base Level:** `surface` (#fff8f3)
- **Primary Content Area:** `surface-container-low` (#fef2e3)
- **Elevated Cards:** `surface-container-lowest` (#ffffff) to create a subtle "pop" against the cream backgrounds.

### The "Glass & Gradient" Rule
To add visual "soul," use subtle linear gradients (e.g., `primary` to `primary-container`) for hero backgrounds. Floating action elements or navigation bars should use **Glassmorphism**: 
- Color: `surface` at 80% opacity.
- Effect: `backdrop-blur: 12px`.

---

## 3. Typography

The typography strategy focuses on the unique vertical rhythm of Devanagari script. We pair the modern, robust **Plus Jakarta Sans** for Latin numerals and accents with the timeless **Noto Sans Devanagari** for primary Hindi text.

*   **Display & Headlines (Plus Jakarta Sans / Noto Sans Devanagari):** Used for mantras, book titles, and section headers. High-contrast scales (e.g., `display-md` at 2.75rem) provide an authoritative, editorial feel.
*   **Body (Be Vietnam Pro / Noto Sans Devanagari):** Optimised for long-form reading. We use a "High-Legibility" setting for Hindi: `line-height: 1.6` and `letter-spacing: 0.02em`.
*   **Labels (Work Sans):** Used for metadata (e.g., Verse numbers, Chapter titles) to provide a clean, functional contrast to the ornate headlines.

---

## 4. Elevation & Depth

We convey hierarchy through **Tonal Layering** rather than traditional drop shadows.

### The Layering Principle
Depth is achieved by stacking surface tokens. A `surface-container-lowest` card placed on a `surface-container-low` background creates a natural lift. This mimics the way light interacts with physical manuscripts.

### Ambient Shadows
Where floating elements (like a FAB or Bottom Nav) require a shadow, use **Ambient Shadows**:
- **Blur:** 24px to 40px.
- **Opacity:** 4%–6%.
- **Tint:** Use a tinted version of `on-surface` (#201b12) to ensure the shadow feels like a natural part of the warm environment, never a "dirty" grey.

### The "Ghost Border" Fallback
If a boundary is required for accessibility, use a **Ghost Border**:
- Token: `outline-variant` at 15% opacity.
- Never use 100% opaque borders.

---

## 5. Components

### Buttons (Sacred Action)
- **Primary:** `primary` (#a3392c) background with a subtle gradient to `primary-container`. `rounded-md` (0.75rem). No shadow.
- **Secondary:** Transparent background with a `Ghost Border`. Use `on-surface` for text.
- **Tertiary:** Text-only with `label-md` styling, used for "Read More" or "View Details."

### Cards (The Manuscript Leaf)
- **Style:** Forbid divider lines within cards. 
- **Structure:** Use `spacing-4` (1rem) internal padding. Use a `surface-container-lowest` background to distinguish from the page.
- **Interaction:** On hover/tap, shift the background to `primary-fixed-dim` at 10% opacity for a soft feedback loop.

### Bottom Navigation
- **Material:** Glassmorphic (`surface` @ 85% opacity with 16px blur).
- **Icons:** Active state uses `primary` (#a3392c) with a subtle `secondary-container` pill background.

### Input Fields
- **Style:** Underline-only or "Soft Box" (using `surface-variant`). 
- **Focus:** Transition the "Ghost Border" from 15% opacity to 60% opacity of the `primary` color.

---

## 6. Do's and Don'ts

### Do
- **Do** use intentional asymmetry. Align a headline to the left but float an ornamental icon (like an Om or Swastika) to the far right.
- **Do** prioritize vertical rhythm. Hindi characters with "Matras" (vowel signs) above and below require 20% more leading than Latin text.
- **Do** use `surface-dim` for inactive or "past" content states to create a sense of temporal depth.

### Don't
- **Don't** use 1px solid black or dark grey lines. They shatter the "Digital Sanctuary" aesthetic.
- **Don't** use "Card Shadows" on every element. Let the background color shifts do the work.
- **Don't** crowd the text. If the user is reading a Sloka (verse), give it at least `spacing-10` (2.5rem) of clear space on all sides.
- **Don't** use pure #000000 for text. Always use `on-surface` (#201b12) for a softer, premium feel.