# Adonai Angels Co - Design Specification

Complete design documentation for recreating the website in Figma and converting to Elementor via UIchemy.

---

## 1. COLOR PALETTE

### Primary Colors
- **Purple Primary**: `#7C3AED` (rgb: 124, 58, 237)
- **Pink Primary**: `#EC4899` (rgb: 236, 72, 153)
- **Gradient Primary**: Linear gradient from Purple (#7C3AED) to Pink (#EC4899)

### Secondary Colors
- **White**: `#FFFFFF`
- **Black/Primary Text**: `#030213` (rgb: 3, 2, 19)

### Grayscale
- **Gray 900**: `#111827` (Dark backgrounds, footer)
- **Gray 700**: `#374151` (Body text)
- **Gray 600**: `#4B5563` (Secondary text)
- **Gray 300**: `#D1D5DB` (Borders, dividers)
- **Gray 200**: `#E5E7EB` (Light borders)
- **Gray 100**: `#F3F4F6` (Light backgrounds)
- **Gray 50**: `#F9FAFB` (Subtle backgrounds)

### Accent Colors
- **Blue**: `#2563EB` (Education program)
- **Cyan**: `#06B6D4` (Water program)
- **Red**: `#DC2626` (Healthcare program)
- **Pink**: `#EC4899` (Women empowerment)
- **Orange**: `#EA580C` (Youth development)
- **Green**: `#059669` (Agriculture program)
- **Emerald**: `#10B981` (Donations)

### Special Colors
- **Purple 50**: `#FAF5FF` (Light purple background)
- **Pink 50**: `#FDF2F8` (Light pink background)
- **Purple 400**: `#A78BFA` (Lighter purple for gradients)
- **Pink 400**: `#F472B6` (Lighter pink for gradients)

---

## 2. TYPOGRAPHY

### Font Family
- **Primary Font**: System fonts (San Francisco on Mac, Segoe UI on Windows, -apple-system, BlinkMacSystemFont)
- **Fallback**: "Helvetica Neue", Arial, sans-serif

### Font Sizes
- **6XL**: 60px / 3.75rem (Hero titles on desktop)
- **5XL**: 48px / 3rem (Page hero titles)
- **4XL**: 36px / 2.25rem (Section titles)
- **3XL**: 30px / 1.875rem (Large headings)
- **2XL**: 24px / 1.5rem (Card titles)
- **XL**: 20px / 1.25rem (Subheadings)
- **LG**: 18px / 1.125rem (Large body text)
- **Base**: 16px / 1rem (Body text)
- **SM**: 14px / 0.875rem (Small text)
- **XS**: 12px / 0.75rem (Captions, labels)

### Font Weights
- **Normal**: 400 (Body text)
- **Medium**: 500 (Labels, some headings)
- **Semibold**: 600 (Buttons, emphasis)
- **Bold**: 700 (Headings, titles)

### Line Heights
- **Tight**: 1.25 (For large headings)
- **Normal**: 1.5 (Default)
- **Relaxed**: 1.625 (For body text)
- **Loose**: 2 (For spacious layouts)

---

## 3. SPACING SYSTEM

### Base Unit: 4px

### Spacing Scale
- **0**: 0px
- **1**: 4px (0.25rem)
- **2**: 8px (0.5rem)
- **3**: 12px (0.75rem)
- **4**: 16px (1rem)
- **5**: 20px (1.25rem)
- **6**: 24px (1.5rem)
- **8**: 32px (2rem)
- **10**: 40px (2.5rem)
- **12**: 48px (3rem)
- **16**: 64px (4rem)
- **20**: 80px (5rem)
- **24**: 96px (6rem)

### Common Patterns
- **Section Padding (Mobile)**: 48px top/bottom, 16px left/right
- **Section Padding (Desktop)**: 80px top/bottom, 64px left/right
- **Card Padding**: 24px - 32px
- **Button Padding**: 12px vertical, 32px horizontal
- **Form Input Padding**: 12px vertical, 16px horizontal
- **Grid Gap**: 32px (2rem)

---

## 4. LAYOUT & GRID

### Container
- **Max Width**: 1280px (max-w-7xl)
- **Padding**: 16px mobile, 24px tablet, 32px desktop

### Responsive Breakpoints
- **SM (Mobile)**: 640px
- **MD (Tablet)**: 768px
- **LG (Desktop)**: 1024px
- **XL (Large Desktop)**: 1280px

### Grid System
- **Columns**: 12-column grid
- **Gap**: 32px (2rem)
- **Common Layouts**:
  - 2 columns on tablet (md:grid-cols-2)
  - 3 columns on desktop (lg:grid-cols-3)
  - 4 columns for stats/cards (lg:grid-cols-4)

---

## 5. BORDER RADIUS

- **None**: 0px
- **SM**: 4px (0.25rem)
- **Default**: 8px (0.5rem)
- **MD**: 12px (0.75rem)
- **LG**: 16px (1rem)
- **XL**: 20px (1.25rem)
- **2XL**: 24px (1.5rem)
- **Full (Pills/Circles)**: 9999px

### Common Uses
- **Buttons**: 9999px (pill shape)
- **Cards**: 16px - 24px (xl - 2xl)
- **Form Inputs**: 8px - 12px (default - lg)
- **Images**: 16px - 24px (xl - 2xl)
- **Icons**: 8px - 16px (default - xl)

---

## 6. SHADOWS

### Shadow Levels
- **SM**: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- **Default**: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
- **MD**: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
- **LG**: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
- **XL**: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
- **2XL**: 0 25px 50px -12px rgba(0, 0, 0, 0.25)

### Usage
- **Cards**: shadow-lg
- **Buttons (Hover)**: shadow-xl
- **Modals**: shadow-2xl
- **Images**: shadow-2xl
- **Navigation**: shadow-sm

---

## 7. ANIMATIONS & TRANSITIONS

### Transition Durations
- **Fast**: 150ms
- **Base**: 300ms
- **Slow**: 500ms
- **Slower**: 800ms

### Common Transitions
- **Hover Effects**: 300ms ease
- **Color Changes**: 300ms ease
- **Transform**: 500ms ease
- **Opacity**: 300ms ease

### Motion Library (Framer Motion)
- **Fade In**: opacity: 0 → 1
- **Slide Up**: y: 20-40px → 0
- **Slide Left**: x: -30px → 0
- **Slide Right**: x: 30px → 0
- **Scale**: scale: 0.8 → 1
- **Duration**: 0.6-0.8s
- **Stagger Delay**: 0.1s per item

---

## 8. ICONS

### Icon Library
- **Lucide React** (lucide-react package)

### Icon Sizes
- **XS**: 16px (w-4 h-4)
- **SM**: 20px (w-5 h-5)
- **MD**: 24px (w-6 h-6)
- **LG**: 32px (w-8 h-8)
- **XL**: 48px (w-12 h-12)
- **2XL**: 64px (w-16 h-16)

### Common Icons Used
- Heart (Logo)
- Users, Users2 (Community)
- GraduationCap (Education)
- Droplet (Water)
- Heart (Healthcare, Women)
- Briefcase (Youth)
- Sprout (Agriculture)
- DollarSign (Donations)
- Calendar (Events)
- Mail, Phone, MapPin (Contact)
- Facebook, Twitter, Instagram, Linkedin (Social)
- Menu, X (Mobile navigation)
- ArrowRight (CTAs)
- Quote (Testimonials)
- TrendingUp (Growth)
- Award (Achievements)
- Send (Forms)

---

## 9. BUTTONS

### Primary Button
- **Background**: Gradient from purple-600 to pink-600
- **Text Color**: White
- **Padding**: 16px vertical, 32px horizontal
- **Border Radius**: Full (pill shape)
- **Font Weight**: 600 (Semibold)
- **Hover**: Shadow-xl
- **Transition**: 300ms

### Secondary Button
- **Background**: White with 10% opacity + backdrop blur
- **Border**: 2px solid white
- **Text Color**: White
- **Padding**: 16px vertical, 32px horizontal
- **Border Radius**: Full
- **Hover**: Background 20% opacity

### Tertiary Button
- **Background**: Gray-100
- **Text Color**: Gray-900
- **Border Radius**: lg (12px)
- **Hover**: Gray-200

### Button Sizes
- **Small**: py-2 px-6 (8px x 24px)
- **Medium**: py-3 px-8 (12px x 32px)
- **Large**: py-4 px-8 (16px x 32px)

---

## 10. FORMS

### Form Inputs
- **Border**: 1px solid gray-300
- **Border Radius**: 8px - 12px
- **Padding**: 12px vertical, 16px horizontal
- **Font Size**: 16px (base)
- **Focus State**:
  - Ring: 2px purple-600
  - Border: Transparent
- **Background**: White
- **Placeholder Color**: Gray-400

### Form Labels
- **Font Size**: 14px (sm)
- **Font Weight**: 600 (Semibold)
- **Color**: Gray-900
- **Margin Bottom**: 8px

### Select Dropdowns
- Same styling as inputs
- Include down arrow icon

### Textareas
- Same as inputs
- Disable resize (resize-none)
- Min rows: 4-6

---

## 11. CARDS

### Basic Card
- **Background**: White
- **Border Radius**: 16px - 24px (xl - 2xl)
- **Padding**: 32px (8)
- **Shadow**: lg
- **Hover**: shadow-xl transition

### Program Card
- **Image Height**: 256px (h-64)
- **Image Overlay**: Gradient overlay with program color at 60% opacity
- **Border Radius**: 12px (xl)
- **Hover**: Image scale(1.1), duration 500ms

### Stat Card
- **Background**: White
- **Border Radius**: 16px (2xl)
- **Padding**: 32px
- **Shadow**: lg
- **Icon**: 64px gradient circle
- **Number Size**: 48px - 60px

### Testimonial Card
- **Background**: Gradient from purple-50 to pink-50
- **Border Radius**: 16px (2xl)
- **Padding**: 32px
- **Quote Icon**: 48px, purple-200

---

## 12. IMAGES

### Hero Images
- **Height**: 600px mobile, 700px desktop
- **Overlay**: Gradient from black/70 via black/50 to black/30
- **Object Fit**: Cover
- **Border Radius**: None (full width)

### Program Images
- **Aspect Ratio**: 16:9 or fixed height 256-400px
- **Border Radius**: 16px - 24px
- **Object Fit**: Cover
- **Hover**: Scale 1.1, duration 500ms

### Team Images
- **Aspect Ratio**: Square (1:1)
- **Border Radius**: 12px (xl) or Full (circle)
- **Object Fit**: Cover
- **Hover**: Scale 1.1, duration 500ms

### Testimonial Images
- **Size**: 64px (w-16 h-16)
- **Border Radius**: Full (circle)
- **Object Fit**: Cover

---

## 13. GRADIENTS

### Primary Gradient
- **Direction**: Left to right (or top to bottom)
- **From**: #7C3AED (purple-600)
- **To**: #EC4899 (pink-600)

### Program-Specific Gradients
- **Education**: Blue-600 to Cyan-600
- **Healthcare**: Red-600 to Pink-600
- **Water**: Cyan-600 to Blue-600
- **Women**: Purple-600 to Pink-600
- **Youth**: Orange-600 to Red-600
- **Agriculture**: Green-600 to Emerald-600

### Background Gradients
- **Hero Overlays**: Purple-900/80 to Pink-900/80
- **Light Backgrounds**: Purple-50 to Pink-50 (subtle)

---

## 14. COMPONENT SPECIFICATIONS

### Navigation Bar
- **Height**: 64px (h-16)
- **Background**: White
- **Shadow**: sm
- **Position**: Sticky top
- **Z-index**: 50
- **Logo**: Heart icon in gradient box + text
- **Desktop Links**: Horizontal, gap 32px
- **Mobile**: Hamburger menu, full-width dropdown

### Footer
- **Background**: Gray-900
- **Text Color**: Gray-300
- **Padding**: 48px vertical
- **Grid**: 4 columns on desktop, 1 on mobile
- **Border Top**: Gray-800
- **Social Icons**: 20px, hover purple-400

### Hero Section
- **Height**: 600px - 700px
- **Background**: Full-width image with gradient overlay
- **Content**: Max-width container, left-aligned
- **Title**: 48px - 60px, white
- **Subtitle**: 20px, gray-200
- **Buttons**: 2 buttons, stacked on mobile, horizontal on desktop

### Stats Section
- **Background**: Gray-50
- **Grid**: 2 columns mobile, 4 columns desktop
- **Icon**: 64px gradient circle
- **Number**: 48px - 60px gradient text
- **Label**: 16px gray-600

### CTA Section
- **Background**: Gradient purple-600 to pink-600
- **Text Color**: White
- **Padding**: 80px vertical
- **Max Width**: 1024px (max-w-4xl)
- **Centered**: text-center

---

## 15. RESPONSIVE BEHAVIOR

### Mobile (< 768px)
- Single column layouts
- Stacked buttons
- Hamburger navigation
- Reduced padding (16px - 24px)
- Smaller font sizes
- Hero height: 600px

### Tablet (768px - 1024px)
- 2 column layouts
- Side-by-side buttons
- Increased padding (24px - 32px)
- Medium font sizes

### Desktop (> 1024px)
- 3-4 column layouts
- Full navigation bar
- Maximum padding (64px - 80px)
- Full font sizes
- Hero height: 700px

---

## 16. ACCESSIBILITY

### Color Contrast
- All text meets WCAG AA standards
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text

### Interactive Elements
- Focus states: 2px ring purple-600
- Hover states: Color transitions 300ms
- Button text: Semibold (600) for clarity
- Form labels: Visible and properly associated

---

## 17. BRAND ELEMENTS

### Logo
- Heart icon filled white
- Background: Gradient purple-600 to pink-600
- Border radius: 8px (lg)
- Padding: 8px
- Text: "Adonai Angels" + "Transforming Lives" tagline

### Tagline
- "Transforming Lives"
- Font size: 12px (xs)
- Color: Gray-600

### Brand Voice
- Compassionate
- Professional
- Hopeful
- Action-oriented

---

This specification provides everything needed to recreate the design in Figma with pixel-perfect accuracy.
