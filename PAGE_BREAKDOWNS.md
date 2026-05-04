# Page-by-Page Layout Breakdown

Detailed component structure for each page of the Adonai Angels Co website.

---

## GLOBAL COMPONENTS

### Navigation (All Pages)
**Height**: 64px
**Structure**:
```
├── Container (max-w-7xl, padding x-4)
    ├── Logo Section (flex, gap-2)
    │   ├── Icon Box (gradient, rounded-lg, p-2)
    │   │   └── Heart Icon (24px, white, filled)
    │   └── Text Stack
    │       ├── "Adonai Angels" (text-xl, bold)
    │       └── "Transforming Lives" (text-xs, gray-600)
    │
    ├── Desktop Nav (hidden on mobile, flex, gap-8)
    │   ├── Link: Home
    │   ├── Link: About
    │   ├── Link: Programs
    │   ├── Link: Impact
    │   ├── Link: Get Involved
    │   ├── Link: Contact
    │   └── CTA Button: "Donate" (gradient, rounded-full)
    │
    └── Mobile Menu Button (visible on mobile)
        └── Hamburger/Close Icon (24px)
```

### Footer (All Pages)
**Background**: Gray-900
**Structure**:
```
├── Container (max-w-7xl, py-12)
    ├── Grid (4 columns desktop, 1 mobile, gap-8)
    │   ├── Column 1: About
    │   │   ├── Logo (same as nav)
    │   │   ├── Description Text (sm)
    │   │   └── Social Icons (4 icons, 20px each)
    │   │
    │   ├── Column 2: Quick Links
    │   │   ├── Heading "Quick Links" (white, semibold)
    │   │   └── Links List (5 items)
    │   │
    │   ├── Column 3: Our Programs
    │   │   ├── Heading "Our Programs" (white, semibold)
    │   │   └── Program List (5 items)
    │   │
    │   └── Column 4: Contact Info
    │       ├── Heading "Contact Us" (white, semibold)
    │       └── Contact Details (Address, Phone, Email with icons)
    │
    └── Bottom Bar (border-top, pt-8, centered)
        └── Copyright Text (sm, gray-300)
```

---

## PAGE 1: HOME

### Section 1: Hero
**Height**: 600px mobile, 700px desktop
**Background**: Full-width image with gradient overlay

```
├── Background Image (full height, object-cover)
├── Gradient Overlay (black/70 → black/50 → black/30)
└── Content Container (max-w-7xl, flex items-center)
    └── Content Box (max-w-2xl)
        ├── Title (text-4xl md:text-6xl, white, bold)
        │   ├── "Transforming Lives,"
        │   └── "Building Hope" (gradient purple-400 to pink-400)
        ├── Subtitle (text-xl, gray-200, mb-8)
        └── Button Group (flex, gap-4)
            ├── Primary Button: "Get Involved" (with arrow icon)
            └── Secondary Button: "Our Programs"
```

### Section 2: Stats
**Background**: Gray-50
**Padding**: py-16

```
├── Container (max-w-7xl)
└── Grid (2 cols mobile, 4 cols desktop, gap-8)
    ├── Stat Card 1: "50,000+ Lives Impacted"
    ├── Stat Card 2: "15,000+ Students Educated"
    ├── Stat Card 3: "25,000+ Clean Water Access"
    └── Stat Card 4: "500+ Volunteers"

Each Stat Card:
├── Icon Circle (64px, gradient purple-pink, centered)
│   └── Icon (32px, white)
├── Number (text-4xl, gray-900, bold)
└── Label (text-base, gray-600)
```

### Section 3: Mission
**Padding**: py-20
**Background**: White

```
├── Container (max-w-7xl)
└── Grid (2 cols desktop, gap-12)
    ├── Left Column
    │   ├── Heading "Our Mission" (text-4xl, bold)
    │   ├── Paragraph 1 (text-lg, gray-600, leading-relaxed)
    │   ├── Paragraph 2 (text-lg, gray-600, leading-relaxed)
    │   └── Link: "Learn More About Us" (purple-600, with arrow)
    │
    └── Right Column
        ├── Image (rounded-2xl, shadow-2xl)
        └── Overlay Badge (absolute, bottom-left, gradient)
            ├── Icon: TrendingUp (32px)
            ├── Number: "12+" (text-2xl, bold)
            └── Text: "Years of Impact" (text-sm)
```

### Section 4: Programs
**Background**: Gray-50
**Padding**: py-20

```
├── Container (max-w-7xl)
    ├── Header (text-center, mb-12)
    │   ├── Title "Our Programs" (text-4xl, bold)
    │   └── Subtitle (text-lg, gray-600)
    │
    ├── Grid (2 cols desktop, gap-8)
    │   ├── Program Card 1: Education Initiative
    │   ├── Program Card 2: Healthcare Access
    │   ├── Program Card 3: Clean Water Project
    │   └── Program Card 4: Women Empowerment
    │
    └── CTA Button (centered, mt-12)
        └── "View All Programs" (gradient, with arrow)

Each Program Card:
├── Image Container (h-64, rounded-xl)
│   ├── Image (full size, hover:scale-110)
│   ├── Gradient Overlay (program color, 60% opacity)
│   └── Title Overlay (bottom, p-6, white, text-2xl, bold)
└── Description (text-gray-600, mt-4)
```

### Section 5: CTA
**Background**: Gradient purple-600 to pink-600
**Padding**: py-20
**Text Color**: White

```
├── Container (max-w-4xl, centered)
    ├── Title "Together, We Can Make a Difference" (text-4xl, bold)
    ├── Subtitle (text-xl, mb-8, opacity-90)
    └── Button Group (flex, gap-4, centered)
        ├── Primary Button: "Donate Now" (white bg, purple text)
        └── Secondary Button: "Contact Us" (white/10 bg, white text)
```

---

## PAGE 2: ABOUT

### Section 1: Hero
**Height**: 400px
**Background**: Team image with purple-pink gradient overlay

```
├── Background Image + Gradient Overlay
└── Container
    └── Content
        ├── Title "About Adonai Angels" (text-5xl, white)
        └── Subtitle (text-xl, gray-200)
```

### Section 2: Our Story
**Padding**: py-20
**Background**: White

```
├── Container
└── Grid (2 cols desktop, gap-12)
    ├── Left Column
    │   ├── Heading "Our Story" (text-4xl, bold)
    │   ├── Paragraph 1 (text-gray-600, leading-relaxed)
    │   ├── Paragraph 2
    │   ├── Paragraph 3
    │   └── Paragraph 4
    │
    └── Right Column
        └── Image (rounded-2xl, shadow-2xl)
```

### Section 3: Mission & Vision
**Background**: Gray-50
**Padding**: py-20

```
├── Container
└── Grid (2 cols desktop, gap-8)
    ├── Mission Card
    │   ├── Icon Circle (64px, gradient, Target icon)
    │   ├── Title "Our Mission" (text-2xl, bold)
    │   └── Description (text-gray-600)
    │
    └── Vision Card
        ├── Icon Circle (64px, gradient, Eye icon)
        ├── Title "Our Vision" (text-2xl, bold)
        └── Description (text-gray-600)

Each card: white bg, p-8, rounded-2xl, shadow-lg
```

### Section 4: Core Values
**Padding**: py-20
**Background**: White

```
├── Container
    ├── Header (centered, mb-12)
    │   ├── Title "Our Core Values" (text-4xl, bold)
    │   └── Subtitle
    │
    └── Grid (4 cols desktop, gap-8)
        ├── Value 1: Compassion
        ├── Value 2: Excellence
        ├── Value 3: Collaboration
        └── Value 4: Sustainability

Each Value:
├── Icon Circle (64px, purple-100 to pink-100, centered)
│   └── Icon (32px, purple-600)
├── Title (text-xl, bold, gray-900)
└── Description (text-gray-600)
```

### Section 5: Team
**Background**: Gray-50
**Padding**: py-20

```
├── Container
    ├── Header (centered, mb-12)
    │   ├── Title "Meet Our Team"
    │   └── Subtitle
    │
    └── Grid (4 cols desktop, gap-8)
        └── Team Member Cards (4 total)

Each Team Card:
├── Image (square aspect, rounded-xl top, hover:scale-110)
└── Info Section (p-6, centered, white bg)
    ├── Name (text-xl, bold, gray-900)
    └── Role (purple-600)

Card: rounded-xl, shadow-lg, hover:shadow-xl
```

### Section 6: Impact Numbers
**Background**: Gradient purple-600 to pink-600
**Padding**: py-20
**Text**: White

```
├── Container
    ├── Header (centered, mb-12)
    │   ├── Title "12 Years of Impact" (text-4xl, bold)
    │   └── Subtitle (text-xl, opacity-90)
    │
    └── Grid (4 cols desktop, gap-8, centered)
        ├── "50,000+ Lives Transformed"
        ├── "15,000+ Students Educated"
        ├── "100+ Communities Served"
        └── "500+ Active Volunteers"

Each stat: text-5xl number, text-lg label
```

---

## PAGE 3: PROGRAMS

### Section 1: Hero
**Height**: 400px
**Background**: Image with gradient overlay

```
├── Background + Overlay
└── Container
    └── Content
        ├── Title "Our Programs" (text-5xl, white)
        └── Subtitle (text-xl, gray-200)
```

### Section 2: Programs Detail
**Padding**: py-20
**Background**: White

```
├── Container
└── Stack (space-y-20)
    ├── Program 1: Education Initiative
    ├── Program 2: Healthcare Access
    ├── Program 3: Clean Water Project
    ├── Program 4: Women Empowerment
    ├── Program 5: Youth Development
    └── Program 6: Agricultural Support

Each Program Block (alternating left/right layout):
├── Grid (2 cols desktop)
    ├── Column 1 (order changes on alternating items)
    │   └── Image Container (h-400px, rounded-2xl)
    │       ├── Image (hover:scale-110)
    │       └── Gradient Overlay (program color, 40%)
    │
    └── Column 2
        ├── Icon Box (64px, gradient with program color)
        ├── Title (text-3xl, bold)
        ├── Description (text-lg, gray-600)
        ├── "What We Do:" Section
        │   └── Bullet List (5 items with colored dots)
        └── Impact Badge (gradient bg, white text, rounded-full)
            └── Impact stat (e.g., "15,000+ students educated")
```

### Section 3: CTA
**Background**: Gradient
**Padding**: py-20

```
└── Container (centered, text-center)
    ├── Title "Want to Support Our Programs?" (text-4xl)
    ├── Subtitle (text-xl, opacity-90)
    └── Button: "Get Involved Today" (white bg, purple text)
```

---

## PAGE 4: IMPACT

### Section 1: Hero
**Height**: 400px

```
├── Background + Overlay
└── Content
    ├── Title "Our Impact" (text-5xl)
    └── Subtitle "Real stories, real change"
```

### Section 2: Impact Metrics
**Background**: Gray-50
**Padding**: py-20

```
├── Container
    ├── Header (centered, mb-12)
    │   ├── Title "Impact by Numbers"
    │   └── Subtitle
    │
    └── Grid (3 cols desktop, gap-8)
        ├── Metric Card 1: "50,000+ Lives Transformed"
        ├── Metric Card 2: "15,000+ Students Educated"
        ├── Metric Card 3: "25,000+ Clean Water Access"
        ├── Metric Card 4: "100+ Communities Served"
        ├── Metric Card 5: "500+ Active Volunteers"
        └── Metric Card 6: "₦2.5B Programs Investment"

Each Metric Card (white bg, p-8, rounded-2xl, shadow-lg):
├── Number (text-5xl, gradient text, bold)
├── Label (gray-900, semibold)
└── Change Indicator (green-600, with TrendingUp icon)
    └── e.g., "+15% this year"
```

### Section 3: Success Stories
**Padding**: py-20
**Background**: White

```
├── Container
    ├── Header (centered, mb-12)
    │   ├── Title "Success Stories"
    │   └── Subtitle
    │
    └── Grid (2 cols desktop, gap-8)
        └── Story Cards (4 total)

Each Story Card (gradient purple-50 to pink-50, p-8, rounded-2xl):
├── Quote Icon (48px, purple-200, absolute top-right)
├── Profile Section (flex, gap-4)
│   ├── Profile Image (64px, circle)
│   └── Info
│       ├── Name (bold, gray-900)
│       ├── Location (sm, gray-600)
│       └── Program Badge (xs, gradient bg, white text, rounded-full)
│
└── Story Text (gray-700, italic, leading-relaxed)
```

### Section 4: Timeline
**Background**: Gray-50
**Padding**: py-20

```
├── Container
    ├── Header (centered, mb-12)
    │   ├── Title "Our Journey"
    │   └── Subtitle
    │
    ├── Timeline Line (absolute, center, gradient vertical line)
    │
    └── Stack (space-y-12)
        ├── Achievement 1: 2014 - Foundation Established
        ├── Achievement 2: 2016 - First School Built
        ├── Achievement 3: 2018 - Healthcare Initiative Launched
        ├── Achievement 4: 2020 - Clean Water Milestone
        ├── Achievement 5: 2022 - Women Empowerment Expansion
        └── Achievement 6: 2026 - 50,000 Lives Impacted

Each Achievement (alternating left/right):
├── Grid (3 cols: content-1 | icon | content-2)
│   ├── Left/Right Content (white card, p-6, rounded-xl, shadow-lg)
│   │   ├── Year (text-2xl, gradient text, bold)
│   │   ├── Title (text-xl, bold)
│   │   └── Description (gray-600)
│   │
│   ├── Center Icon (64px, gradient circle, Award icon)
│   │
│   └── Empty Space
```

### Section 5: CTA
**Background**: Gradient
**Padding**: py-20

```
└── Container
    ├── Title "Be Part of Our Impact Story"
    ├── Subtitle
    └── Button: "Get Involved Today"
```

---

## PAGE 5: GET INVOLVED

### Section 1: Hero
**Height**: 400px

```
├── Background + Overlay
└── Content
    ├── Title "Get Involved"
    └── Subtitle "Join us in our mission"
```

### Section 2: Ways to Help
**Padding**: py-20
**Background**: White

```
├── Container
    ├── Header (centered, mb-12)
    │   ├── Title "Ways to Help"
    │   └── Subtitle
    │
    └── Grid (2 cols desktop, gap-8)
        ├── Way 1: Make a Donation
        ├── Way 2: Volunteer Your Time
        ├── Way 3: Partner With Us
        └── Way 4: Fundraise for Us

Each Way Card (gradient bg gray-50 to white, p-8, rounded-2xl, border):
├── Icon Box (64px, gradient with theme color)
├── Title (text-2xl, bold)
├── Description (gray-600, mb-6)
├── Action List (bullet points with colored dots)
└── Button "Learn More" (gradient bg, white text, rounded-lg, full-width)
```

### Section 3: Donation Levels
**Background**: Gray-50
**Padding**: py-20

```
├── Container
    ├── Header (centered, mb-12)
    │   ├── Title "Donation Levels"
    │   └── Subtitle
    │
    └── Grid (4 cols desktop, gap-6)
        ├── Level 1: "₦10,000 - Hope Builder"
        ├── Level 2: "₦50,000 - Change Maker" (FEATURED)
        ├── Level 3: "₦100,000 - Life Transformer"
        └── Level 4: "Custom - Partner"

Each Level Card (white bg, rounded-2xl, p-6):
├── Featured Badge (if featured, gradient, xs, rounded-full)
├── Amount (text-3xl, gradient text, bold)
├── Title (text-xl, bold)
├── Description (gray-600, mb-6)
├── Benefits List (with Heart icons, sm)
└── Button "Donate Now" (gradient if featured, gray if not)

Featured card: ring-2 ring-purple-600, shadow-xl, scale-105
```

### Section 4: Volunteer Form
**Padding**: py-20
**Background**: White

```
├── Container (max-w-4xl)
└── Form Card (gradient purple-50 to pink-50, p-12, rounded-2xl)
    ├── Header (centered, mb-8)
    │   ├── Icon Circle (64px, gradient, Calendar icon)
    │   ├── Title "Become a Volunteer"
    │   └── Subtitle
    │
    └── Form (space-y-6)
        ├── Row 1: Full Name | Email
        ├── Row 2: Phone | State (dropdown)
        ├── Area of Interest (dropdown)
        ├── Motivation (textarea, 4 rows)
        └── Submit Button (gradient, full-width, py-4)

Each Input:
- Border: 1px gray-300
- Border radius: lg (12px)
- Padding: py-3 px-4
- Focus: ring-2 purple-600
```

### Section 5: Corporate Partnership CTA
**Background**: Gradient
**Padding**: py-20

```
└── Container (centered, text-center)
    ├── Handshake Icon (64px, white)
    ├── Title "Corporate Partnership Opportunities"
    ├── Subtitle
    └── Link Button: "Discuss Partnership" (white bg, purple text)
```

---

## PAGE 6: CONTACT

### Section 1: Hero
**Height**: 400px

```
├── Background + Overlay
└── Content
    ├── Title "Contact Us"
    └── Subtitle "We'd love to hear from you"
```

### Section 2: Contact Info Cards
**Background**: Gray-50
**Padding**: py-20

```
├── Container
└── Grid (4 cols desktop, gap-6)
    ├── Card 1: Visit Us (MapPin icon, address)
    ├── Card 2: Call Us (Phone icon, numbers)
    ├── Card 3: Email Us (Mail icon, emails)
    └── Card 4: Office Hours (Clock icon, hours)

Each Card (white bg, p-6, rounded-xl, shadow-lg, centered):
├── Icon Circle (56px, gradient)
├── Title (bold, gray-900, mb-3)
└── Details (text-sm, gray-600, multiple lines)
```

### Section 3: Contact Form & Map
**Padding**: py-20
**Background**: White

```
├── Container
└── Grid (2 cols desktop, gap-12)
    ├── Left Column: Contact Form
    │   ├── Header
    │   │   ├── Title "Send Us a Message"
    │   │   └── Description
    │   │
    │   └── Form (space-y-6)
    │       ├── Row: First Name | Last Name
    │       ├── Email Address
    │       ├── Phone Number
    │       ├── Subject (dropdown)
    │       ├── Message (textarea, 6 rows)
    │       └── Submit Button (gradient, with Send icon)
    │
    └── Right Column
        ├── Header
        │   ├── Title "Find Us"
        │   └── Description
        │
        ├── Map Placeholder (h-400px, rounded-xl, gray-200 bg)
        │   └── Centered MapPin icon with address
        │
        └── Social Media Card (gradient purple-50 to pink-50, p-8, rounded-xl)
            ├── Title "Connect With Us" (centered, bold)
            ├── Social Icons Row (4 icons, 48px circles, centered)
            │   ├── Facebook
            │   ├── Twitter
            │   ├── Instagram
            │   └── LinkedIn
            └── Description (centered, sm, gray-600)
```

### Section 4: FAQ
**Background**: Gray-50
**Padding**: py-20

```
├── Container (max-w-4xl)
    ├── Header (centered, mb-12)
    │   ├── Title "Frequently Asked Questions"
    │   └── Subtitle
    │
    └── Stack (space-y-6)
        └── FAQ Items (5 total)

Each FAQ Card (white bg, p-6, rounded-xl, shadow-md):
├── Question (bold, gray-900, mb-2)
└── Answer (gray-600)
```

### Section 5: CTA
**Background**: Gradient
**Padding**: py-20

```
└── Container (centered)
    ├── Title "Ready to Make a Difference?"
    ├── Subtitle
    └── Button: "Get Involved Today"
```

---

## RESPONSIVE NOTES

### Mobile (<768px)
- All grids collapse to single column
- Hero height: 600px
- Section padding: py-12 (48px)
- Font sizes reduce by 25-30%
- Buttons stack vertically
- Images full-width
- Navigation shows hamburger menu

### Tablet (768px - 1024px)
- 2 column grids
- Hero height: 650px
- Section padding: py-16 (64px)
- Medium font sizes
- Buttons can be side-by-side

### Desktop (>1024px)
- Full multi-column layouts (3-4 cols)
- Hero height: 700px
- Section padding: py-20 (80px)
- Full font sizes
- All elements at maximum size
