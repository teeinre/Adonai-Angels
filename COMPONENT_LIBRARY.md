# Component Library & Visual Guide

Detailed specifications for all reusable components in the Adonai Angels Co website.

---

## 1. LOGO COMPONENT

### Specifications
- **Container**: Flex row, gap 8px (gap-2), items-center
- **Icon Box**:
  - Size: 40px × 40px
  - Background: Gradient (purple-600 to pink-600)
  - Border radius: 8px (lg)
  - Padding: 8px
  - Icon: Heart, 24px, white, filled
- **Text Stack**: Flex column
  - **Primary Text**: "Adonai Angels"
    - Font size: 20px (xl)
    - Font weight: 700 (bold)
    - Color: Gray-900
  - **Tagline**: "Transforming Lives"
    - Font size: 12px (xs)
    - Color: Gray-600

### Usage
- Navigation bar (top left)
- Footer (repeated)
- Mobile menu

---

## 2. NAVIGATION LINKS

### Desktop Navigation
- **Container**: Flex row, gap 32px (gap-8)
- **Each Link**:
  - Font size: 16px (base)
  - Font weight: 400 (normal)
  - Color: Gray-700 (default), Purple-600 (active)
  - Hover: Purple-600
  - Transition: 300ms
  - Active Indicator: 2px bottom border, purple-600, full width

### Mobile Navigation
- **Container**: Dropdown panel, full width
- **Each Link**:
  - Display: Block
  - Padding: 8px 16px (py-2 px-4)
  - Border radius: 8px (lg)
  - Background: Purple-50 (active), transparent (default)
  - Hover: Gray-50

---

## 3. BUTTON COMPONENTS

### Primary Button (Gradient)
```
Specifications:
- Background: Linear gradient purple-600 → pink-600
- Text color: White
- Font size: 16px (base)
- Font weight: 600 (semibold)
- Padding: 16px vertical, 32px horizontal (py-4 px-8)
- Border radius: 9999px (full/pill)
- Shadow: Default
- Hover: Shadow-xl
- Transition: All 300ms
- Optional: Icon (20px) with 8px gap

Example text:
"Donate Now", "Get Involved", "View All Programs"
```

### Secondary Button (Outline/Ghost)
```
Specifications:
- Background: White with 10% opacity + backdrop blur
- Border: 2px solid white
- Text color: White
- Font size: 16px (base)
- Font weight: 600 (semibold)
- Padding: 16px vertical, 32px horizontal
- Border radius: 9999px (full)
- Hover: Background 20% opacity
- Transition: All 300ms

Example text:
"Our Programs", "Contact Us", "Learn More"
```

### Tertiary Button (Solid)
```
Specifications:
- Background: Gray-100
- Text color: Gray-900
- Font size: 16px (base)
- Font weight: 600 (semibold)
- Padding: 12px vertical, 32px horizontal (py-3 px-8)
- Border radius: 12px (lg)
- Hover: Gray-200
- Transition: Background 300ms

Example text:
"Learn More", "View Details"
```

### Icon Button
```
Specifications:
- Size: 48px × 48px
- Background: White (or transparent)
- Border radius: 9999px (full)
- Icon: 20px, centered
- Shadow: md
- Hover: Gradient background, white icon
- Transition: All 300ms

Used for: Social media icons
```

---

## 4. CARD COMPONENTS

### Basic Info Card
```
Specifications:
- Background: White
- Border radius: 16px (xl) or 24px (2xl)
- Padding: 32px (p-8)
- Shadow: lg
- Hover: shadow-xl, transition 300ms

Structure:
├── Icon Circle (optional)
│   └── 64px circle, gradient background
├── Title (text-2xl, bold, gray-900)
├── Description (text-base, gray-600, leading-relaxed)
└── Optional action button/link

Usage: Mission/Vision cards, Contact info cards
```

### Program Card
```
Specifications:
- Container: Rounded-xl (12px)
- Overflow: Hidden

Structure:
├── Image Container
│   ├── Height: 256px (h-64)
│   ├── Image: Full size, object-cover
│   │   └── Hover: scale(1.1), duration 500ms
│   ├── Gradient Overlay
│   │   └── Program-specific color, 60% opacity
│   └── Title Overlay (absolute bottom)
│       └── Padding: 24px (p-6)
│           └── Text: 24px (text-2xl), white, bold
│
└── Description Section
    └── Padding-top: 16px (pt-4)
        └── Text: Gray-600, base size

Usage: Homepage programs grid, Programs page featured items
```

### Stat Card
```
Specifications:
- Background: White
- Border radius: 24px (2xl)
- Padding: 32px (p-8)
- Shadow: lg
- Text align: Center

Structure:
├── Icon Circle
│   ├── Size: 64px (w-16 h-16)
│   ├── Background: Gradient purple-600 to pink-600
│   ├── Border radius: Full
│   ├── Icon: 32px (w-8 h-8), white
│   └── Margin bottom: 16px (mb-4)
│
├── Number
│   ├── Font size: 48px-60px (text-4xl to text-5xl)
│   ├── Font weight: 700 (bold)
│   ├── Color: Gray-900 or gradient text
│   └── Margin bottom: 8px (mb-2)
│
├── Label
│   ├── Font size: 16px (base)
│   └── Color: Gray-600
│
└── Change Indicator (optional)
    ├── Color: Green-600
    ├── Font size: 14px (sm)
    ├── Icon: TrendingUp (16px)
    └── Text: "+15% this year"

Usage: Stats sections, Impact metrics
```

### Testimonial Card
```
Specifications:
- Background: Gradient purple-50 to pink-50
- Border radius: 24px (2xl)
- Padding: 32px (p-8)
- Position: Relative

Structure:
├── Quote Icon (absolute, top-right)
│   ├── Size: 48px (w-12 h-12)
│   ├── Color: Purple-200
│   └── Position: top-4, right-4
│
├── Profile Section (flex, gap-4, items-start)
│   ├── Image
│   │   ├── Size: 64px (w-16 h-16)
│   │   ├── Border radius: Full (circle)
│   │   └── Object fit: Cover
│   │
│   └── Info Stack
│       ├── Name (bold, gray-900)
│       ├── Location (sm, gray-600)
│       └── Program Badge
│           ├── Background: Gradient
│           ├── Text: White, xs
│           ├── Padding: 4px 12px (py-1 px-3)
│           └── Border radius: Full
│
└── Story Text
    ├── Font style: Italic
    ├── Color: Gray-700
    ├── Line height: Relaxed (1.625)
    └── Margin top: 16px (mt-4)

Usage: Impact page success stories
```

### Team Member Card
```
Specifications:
- Background: White
- Border radius: 16px (xl)
- Overflow: Hidden
- Shadow: lg
- Hover: shadow-xl

Structure:
├── Image Container
│   ├── Aspect ratio: Square (1:1)
│   ├── Overflow: Hidden
│   └── Image
│       ├── Full size, object-cover
│       └── Hover: scale(1.1), duration 500ms
│
└── Info Section
    ├── Padding: 24px (p-6)
    ├── Text align: Center
    ├── Name
    │   ├── Font size: 20px (xl)
    │   ├── Font weight: 700 (bold)
    │   ├── Color: Gray-900
    │   └── Margin bottom: 4px (mb-1)
    │
    └── Role
        ├── Font size: 16px (base)
        └── Color: Purple-600

Usage: About page team section
```

### Donation Level Card
```
Specifications:
- Background: White
- Border radius: 24px (2xl)
- Padding: 24px (p-6)
- Shadow: Default (or xl if featured)
- Border: None (or 2px purple-600 if featured)

Structure:
├── Featured Badge (conditional)
│   ├── Background: Gradient purple-600 to pink-600
│   ├── Text: "MOST POPULAR", white, xs, semibold
│   ├── Padding: 4px 12px (py-1 px-3)
│   ├── Border radius: Full
│   └── Margin bottom: 16px (mb-4)
│
├── Amount
│   ├── Font size: 30px (text-3xl)
│   ├── Font weight: 700 (bold)
│   ├── Color: Gradient text (purple-600 to pink-600)
│   └── Margin bottom: 8px (mb-2)
│
├── Title
│   ├── Font size: 20px (xl)
│   ├── Font weight: 700 (bold)
│   ├── Color: Gray-900
│   └── Margin bottom: 8px (mb-2)
│
├── Description
│   ├── Font size: 16px (base)
│   ├── Color: Gray-600
│   └── Margin bottom: 24px (mb-6)
│
├── Benefits List
│   ├── Space between items: 8px (space-y-2)
│   └── Each item:
│       ├── Flex row, gap 8px (gap-2)
│       ├── Icon: Heart, 16px, purple-600
│       └── Text: 14px (sm), gray-700
│
└── Button
    ├── Full width (w-full)
    ├── Padding: 12px vertical (py-3)
    ├── Border radius: 12px (lg)
    ├── If featured: Gradient background, white text
    └── If not: Gray-100 background, gray-900 text

Usage: Get Involved page donation tiers
```

---

## 5. FORM ELEMENTS

### Text Input
```
Specifications:
- Width: Full (w-full)
- Padding: 12px vertical, 16px horizontal (py-3 px-4)
- Border: 1px solid gray-300
- Border radius: 12px (lg)
- Font size: 16px (base)
- Font weight: 400 (normal)
- Background: White
- Placeholder color: Gray-400

Focus State:
- Border: Transparent
- Ring: 2px purple-600
- Outline: None

Disabled State:
- Background: Gray-100
- Cursor: not-allowed
- Opacity: 0.6
```

### Select Dropdown
```
Specifications:
Same as text input, plus:
- Arrow icon on right side
- Padding right: 40px (for icon space)
- Appearance: None (custom styling)
```

### Textarea
```
Specifications:
Same as text input, plus:
- Min rows: 4-6
- Resize: None (resize-none)
- Line height: 1.5
```

### Label
```
Specifications:
- Display: Block
- Font size: 14px (sm)
- Font weight: 600 (semibold)
- Color: Gray-900
- Margin bottom: 8px (mb-2)
- Required indicator: Red asterisk (*)
```

### Form Layout
```
Common patterns:
- Full width fields: Single column
- Two-column fields: Grid with 2 cols, gap-6
- Field spacing: space-y-6
- Submit button: Full width at bottom
```

---

## 6. SECTION HEADERS

### Centered Section Header
```
Specifications:
- Container: text-center, margin-bottom 48px (mb-12)

Structure:
├── Title
│   ├── Font size: 36px-48px (text-4xl)
│   ├── Font weight: 700 (bold)
│   ├── Color: Gray-900
│   └── Margin bottom: 16px (mb-4)
│
└── Subtitle
    ├── Font size: 18px (lg)
    ├── Color: Gray-600
    └── Max width: 768px (max-w-2xl)
        └── Centered (mx-auto)

Usage: All major section dividers
```

### Left-Aligned Section Header
```
Specifications:
- Container: text-left, margin-bottom 24px (mb-6)

Structure:
├── Title
│   ├── Font size: 36px-48px (text-4xl)
│   ├── Font weight: 700 (bold)
│   ├── Color: Gray-900
│   └── Margin bottom: 16px (mb-4)
│
└── Description (optional)
    ├── Font size: 18px (lg)
    ├── Color: Gray-600
    └── Line height: Relaxed

Usage: Two-column sections, detail pages
```

---

## 7. HERO SECTIONS

### Page Hero (Standard)
```
Specifications:
- Height: 400px
- Position: Relative
- Overflow: Hidden

Structure:
├── Background Layer (absolute, inset-0)
│   ├── Image
│   │   ├── Full size (w-full h-full)
│   │   └── Object fit: Cover
│   │
│   └── Gradient Overlay
│       ├── Purple-900/80 to Pink-900/80
│       └── Direction: Left to right
│
└── Content Layer (relative)
    └── Container (max-w-7xl, full height, flex items-center)
        └── Content Box
            ├── Title
            │   ├── Font size: 48px-60px (text-5xl)
            │   ├── Font weight: 700 (bold)
            │   ├── Color: White
            │   └── Margin bottom: 16px (mb-4)
            │
            └── Subtitle
                ├── Font size: 20px (xl)
                ├── Color: Gray-200
                └── Max width: 768px (max-w-2xl)

Animation: Fade up
- Initial: opacity 0, translateY 30px
- Animate: opacity 1, translateY 0
- Duration: 800ms
```

### Homepage Hero (Extended)
```
Specifications:
- Height: 600px mobile, 700px desktop
- Everything else same as Page Hero, plus:

Additional Elements:
└── Button Group (below subtitle)
    ├── Margin top: 32px (mt-8)
    ├── Layout: Flex column (mobile), row (desktop)
    ├── Gap: 16px (gap-4)
    ├── Primary Button + Secondary Button
    └── Optional: Icon (ArrowRight, 20px)

Gradient Text in Title:
- Specific line: "Building Hope"
- Background: Clip-text
- Gradient: Purple-400 to Pink-400
```

---

## 8. ICON CIRCLES

### Small Icon Circle
```
Specifications:
- Size: 48px (w-12 h-12)
- Background: Gradient purple-600 to pink-600
- Border radius: Full
- Display: Inline-flex
- Align: items-center, justify-center
- Icon: 24px (w-6 h-6), white
```

### Medium Icon Circle
```
Specifications:
- Size: 64px (w-16 h-16)
- Same as small, with:
- Icon: 32px (w-8 h-8), white
```

### Large Icon Circle (for stats)
```
Specifications:
- Size: 64px (w-16 h-16)
- Background: Gradient purple-600 to pink-600
- Border radius: Full
- Icon: 32px (w-8 h-8), white
- Shadow: Default
- Margin bottom: 16px (mb-4)
```

### Light Icon Circle (for values)
```
Specifications:
- Size: 64px (w-16 h-16)
- Background: Gradient purple-100 to pink-100
- Border radius: Full
- Icon: 32px (w-8 h-8), purple-600 (not white)
- Display: Inline-flex, centered
```

---

## 9. BADGES & PILLS

### Program Badge
```
Specifications:
- Background: Gradient (program-specific color)
- Text: White
- Font size: 12px (xs)
- Font weight: 600 (semibold)
- Padding: 4px 12px (py-1 px-3)
- Border radius: 9999px (full)
- Display: Inline-block
```

### Impact Badge
```
Specifications:
- Background: Gradient (program-specific color)
- Text: White
- Font size: 16px (base)
- Font weight: 600 (semibold)
- Padding: 12px 24px (py-3 px-6)
- Border radius: 9999px (full)
- Display: Inline-block
```

### Featured Badge
```
Specifications:
- Background: Gradient purple-600 to pink-600
- Text: "MOST POPULAR" or "FEATURED"
- Color: White
- Font size: 12px (xs)
- Font weight: 600 (semibold)
- Padding: 4px 12px (py-1 px-3)
- Border radius: 9999px (full)
- Letter spacing: Wider
```

---

## 10. TIMELINE COMPONENT

### Timeline Structure (Desktop)
```
Container:
- Position: Relative
- Max width: max-w-7xl
- Padding: py-20

Timeline Line:
- Position: Absolute
- Left: 50%
- Transform: translateX(-50%)
- Width: 4px (w-1)
- Height: Full
- Background: Gradient purple-600 to pink-600 (vertical)
- Hidden on mobile

Achievement Items:
- Layout: Stack with 48px spacing (space-y-12)
- Alternate left/right positioning
- Each item:
  ├── Grid (3 columns: content | icon | empty)
  │
  ├── Content Card (max-w-md)
  │   ├── Background: White
  │   ├── Padding: 24px (p-6)
  │   ├── Border radius: 16px (xl)
  │   ├── Shadow: lg
  │   ├── Text align: Right (if left) or Left (if right)
  │   │
  │   ├── Year
  │   │   ├── Font size: 24px (text-2xl)
  │   │   ├── Font weight: 700 (bold)
  │   │   ├── Gradient text
  │   │   └── Margin bottom: 8px (mb-2)
  │   │
  │   ├── Title
  │   │   ├── Font size: 20px (xl)
  │   │   ├── Font weight: 700 (bold)
  │   │   ├── Color: Gray-900
  │   │   └── Margin bottom: 8px (mb-2)
  │   │
  │   └── Description
  │       ├── Font size: 16px (base)
  │       └── Color: Gray-600
  │
  ├── Center Icon
  │   ├── Size: 64px (w-16 h-16)
  │   ├── Background: Gradient purple-600 to pink-600
  │   ├── Border radius: Full
  │   ├── Icon: Award, 32px, white
  │   └── Z-index: 10
  │
  └── Empty column (for spacing)

Mobile Layout:
- Remove timeline line
- Single column
- Hide center icon
- Left-align all cards
```

---

## 11. ANIMATIONS

### Fade In Up
```
Initial state:
- Opacity: 0
- Transform: translateY(20px to 40px)

Animate state:
- Opacity: 1
- Transform: translateY(0)

Settings:
- Duration: 600ms - 800ms
- Viewport: once (trigger only once when in view)
- Stagger delay: 100ms between items
```

### Fade In Left/Right
```
Initial state:
- Opacity: 0
- Transform: translateX(-30px) or translateX(30px)

Animate state:
- Opacity: 1
- Transform: translateX(0)

Settings:
- Duration: 600ms
- Viewport: once
```

### Scale In
```
Initial state:
- Opacity: 0
- Transform: scale(0.8)

Animate state:
- Opacity: 1
- Transform: scale(1)

Settings:
- Duration: 600ms
- Viewport: once
- Use for: Stats, icons
```

### Image Hover
```
Default state:
- Transform: scale(1)

Hover state:
- Transform: scale(1.1)

Settings:
- Duration: 500ms
- Timing: ease
- Overflow: hidden (on parent container)
```

---

## 12. SOCIAL MEDIA ICONS

### Footer Social Icons
```
Specifications:
- Size: 20px (w-5 h-5)
- Color: Gray-300
- Hover color: Purple-400
- Spacing: gap-3 (12px)
- Transition: Color 300ms
- Background: None
```

### Contact Page Social Icons
```
Specifications:
- Container: 48px circle (w-12 h-12)
- Background: White
- Border radius: Full
- Icon: 20px (w-5 h-5), gray-700
- Shadow: md
- Display: Flex, centered
- Hover:
  - Background: Gradient purple-600 to pink-600
  - Icon color: White
  - Shadow: lg
- Transition: All 300ms
```

---

## 13. GRADIENT TEXT

### Usage
```
Classes:
- text-transparent
- bg-clip-text
- bg-gradient-to-r
- from-purple-600
- to-pink-600

Common uses:
- Hero title accents
- Large numbers in stats
- Donation amounts
- Year markers in timeline
```

---

## 14. CONTAINER PATTERNS

### Standard Section Container
```
<section className="py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Content */}
  </div>
</section>
```

### Gray Background Section
```
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Content */}
  </div>
</section>
```

### Gradient CTA Section
```
<section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* Content */}
  </div>
</section>
```

---

This component library provides all the building blocks needed to recreate the design in Figma with complete accuracy.
