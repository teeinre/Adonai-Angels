# Adonai Angels Co - NGO Website

Complete multi-page website with payment integration, donor portal, and content management for Nigerian NGO.

---

## ✨ Features

### 🌐 Public Website
- **6 Pages**: Home, About, Programs, Impact, Get Involved, Contact
- **Responsive Design**: Mobile-first, works on all devices
- **Modern UI**: Purple-pink gradient theme, smooth animations
- **SEO Ready**: Proper meta tags, semantic HTML

### 💳 Payment Processing
- **Dual Gateways**: Paystack & Flutterwave integration
- **Multiple Payment Methods**: Cards, bank transfers, USSD, mobile money
- **Test & Live Modes**: Safe development testing
- **Automatic Verification**: Server-side payment confirmation
- **Custom Amounts**: Preset amounts + custom input

### 👤 Donor Management
- **Authentication**: Secure login/signup with Supabase Auth
- **Donor Dashboard**: Track all donations, download receipts
- **Donation History**: View all past contributions
- **Anonymous Donations**: No account required to donate

### 🎉 Post-Payment Experience
- **Thank You Page**: Beautiful confirmation page
- **Receipt Download**: PDF receipt generation
- **Social Sharing**: Share donations on social media
- **Impact Display**: Show how donations help

### 🔧 Admin Panel
- **Payment Configuration**: Manage API keys for both gateways
- **Test/Live Toggle**: Easy mode switching
- **Gateway Control**: Enable/disable payment methods
- **Secure Storage**: Keys stored in database, not code

---

## 📁 Project Structure

```
adonai-angels-website/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── Home.tsx, About.tsx, Programs.tsx, etc.
│   │   │   ├── Donate.tsx                    # NEW: Donation page
│   │   │   ├── ThankYou.tsx                  # NEW: Success page
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx                 # NEW: Donor login
│   │   │   │   └── Signup.tsx                # NEW: Donor signup
│   │   │   ├── donor/
│   │   │   │   └── Dashboard.tsx             # NEW: Donor portal
│   │   │   └── admin/
│   │   │       └── AdminPanel.tsx            # NEW: Admin settings
│   │   ├── components/
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   └── routes.tsx
│   ├── lib/
│   │   ├── supabase.ts                       # NEW: Database client
│   │   └── paymentService.ts                 # NEW: Payment logic
│   └── styles/
│       ├── theme.css
│       └── fonts.css
├── supabase-schema.sql                       # NEW: Database schema
├── .env.example                              # NEW: Environment template
├── SETUP_GUIDE.md                            # NEW: Complete setup instructions
├── BACKEND_FEATURES.md                       # NEW: Features documentation
├── DESIGN_SPECIFICATION.md                   # Design system
├── COMPONENT_LIBRARY.md                      # Component specs
└── PAGE_BREAKDOWNS.md                        # Page layouts
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Setup Supabase
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Run `supabase-schema.sql` in SQL Editor
4. Copy project URL and anon key

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env and add your Supabase credentials
```

### 4. Run Development Server
```bash
pnpm dev
```

### 5. Configure Payment Gateways
1. Visit `http://localhost:5173/admin`
2. Add Paystack & Flutterwave API keys
3. Enable test mode
4. Save configuration

### 6. Test Donation
1. Visit `http://localhost:5173/donate`
2. Use test card numbers (see SETUP_GUIDE.md)
3. Complete payment
4. View in donor dashboard

---

## 📖 Documentation

| File | Description |
|------|-------------|
| **SETUP_GUIDE.md** | Step-by-step setup instructions |
| **BACKEND_FEATURES.md** | Complete feature list & workflows |
| **DESIGN_SPECIFICATION.md** | Colors, typography, spacing |
| **COMPONENT_LIBRARY.md** | Reusable component specs |
| **PAGE_BREAKDOWNS.md** | Page-by-page layouts |

---

## 🎯 Key Pages

| Route | Purpose |
|-------|---------|
| `/` | Home page with hero, stats, programs |
| `/donate` | **NEW** Donation form with payment |
| `/auth/login` | **NEW** Donor authentication |
| `/auth/signup` | **NEW** Create donor account |
| `/donor/dashboard` | **NEW** View donation history |
| `/thank-you` | **NEW** Post-payment confirmation |
| `/admin` | **NEW** Configure payment gateways |
| `/about` | Organization info, team, mission |
| `/programs` | Detailed program information |
| `/impact` | Success stories, metrics |
| `/get-involved` | Volunteer forms |
| `/contact` | Contact form, location |

---

## 🔐 Environment Variables

Required in `.env`:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Payment keys (configured via `/admin`):
- Paystack Public Key & Secret Key
- Flutterwave Public Key & Secret Key

---

## 🗄️ Database Tables

Created by `supabase-schema.sql`:

- **donors** - Donor profiles
- **donations** - Donation records
- **payment_config** - Gateway settings
- **volunteer_applications** - Volunteer forms
- **contact_submissions** - Contact messages
- **site_content** - Dynamic content (for future CMS)

---

## 💰 Payment Flow

```
1. Donor visits /donate
2. Selects amount & payment method (Paystack or Flutterwave)
3. Enters name, email, phone
4. Clicks "Complete Donation"
5. Redirected to payment gateway
6. Completes payment on gateway site
7. Redirected to /thank-you
8. Payment verified automatically
9. Donation saved to database
10. Receipt available for download
```

---

## 🧪 Testing

### Test Cards

**Paystack:**
```
Card: 4084084084084081
CVV: 408
PIN: 0000
OTP: 123456
```

**Flutterwave:**
```
Card: 5531886652142950
CVV: 564
PIN: 3310
OTP: 12345
```

### Test Flow
1. Enable test mode in `/admin`
2. Use test cards on `/donate`
3. Verify donation in `/donor/dashboard`
4. Check Supabase table: `donations`

---

## 📊 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Backend**: Supabase (PostgreSQL + Auth)
- **Payments**: Paystack + Flutterwave APIs
- **Icons**: Lucide React
- **Build**: Vite

---

## 🌍 Deployment

### Recommended Platforms
- Netlify (easiest)
- Vercel
- Cloudflare Pages

### Steps
1. Push code to GitHub
2. Connect repository to hosting platform
3. Add environment variables in dashboard
4. Deploy!
5. Visit `your-domain.com/admin`
6. Switch to live mode & add production keys

---

## 🔒 Security

✅ Payment keys stored server-side  
✅ No secrets in frontend code  
✅ HTTPS required in production  
✅ Row Level Security (RLS) enabled  
✅ Supabase Auth for authentication  
✅ Password hashing automatic  
✅ SQL injection protection  

---

## 📈 Future Enhancements

### Planned Features
- Email notifications on donations
- PDF receipt generation
- Recurring monthly donations
- Donation campaigns
- Volunteer management dashboard
- Full CMS for content editing
- Social login (Google, Facebook)
- Impact calculator
- Donor leaderboard
- SMS notifications

---

## 🤝 Support

### Common Issues

**Payment not working?**
- Check `/admin` - are gateways active?
- Verify API keys are correct
- Ensure test mode matches test cards

**Can't login?**
- Check Supabase Auth is enabled
- Verify email in Supabase dashboard
- Try password reset

**Database errors?**
- Ensure `supabase-schema.sql` ran successfully
- Check Supabase project is active
- Verify environment variables

---

## 📞 Contact

For setup help or questions:
- Email: info@adonaiangels.org
- Docs: See SETUP_GUIDE.md
- Issues: Check BACKEND_FEATURES.md

---

## 📄 License

Copyright © 2026 Adonai Angels Co. All rights reserved.

---

## 🎉 Ready to Launch!

Your complete NGO website with payment processing is ready. Follow these steps:

1. ✅ Read SETUP_GUIDE.md
2. ✅ Setup Supabase project
3. ✅ Configure payment gateways
4. ✅ Test in development
5. ✅ Deploy to production
6. ✅ Start receiving donations!

**Built with ❤️ for making a difference in Nigerian communities**
