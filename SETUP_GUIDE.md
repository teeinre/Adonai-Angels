# Adonai Angels Co - Setup Guide

Complete guide to set up your NGO website with payment processing and donor management.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Supabase

#### A. Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" (free tier available)
3. Create a new organization and project
4. Wait for database to provision (~2 minutes)

#### B. Run Database Schema
1. In your Supabase project, go to **SQL Editor**
2. Copy the contents of `supabase-schema.sql` (in project root)
3. Paste and click **Run**
4. Verify tables were created in **Table Editor**

#### C. Configure Environment Variables
1. In Supabase, go to **Settings** → **API**
2. Copy your **Project URL** and **anon/public key**
3. Create `.env` file in project root:

```bash
cp .env.example .env
```

4. Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Configure Payment Gateways

#### A. Get API Keys

**Paystack:**
1. Sign up at [https://paystack.com](https://paystack.com)
2. Go to Dashboard → Settings → API Keys
3. Copy your **Public Key** and **Secret Key**

**Flutterwave:**
1. Sign up at [https://flutterwave.com](https://flutterwave.com)
2. Go to Dashboard → Settings → API
3. Copy your **Public Key** and **Secret Key**

#### B. Configure in Admin Panel
1. Start your development server:
```bash
pnpm dev
```

2. Navigate to `/admin` in your browser
3. Enter your payment gateway keys:
   - **Public Key**: Used for frontend initialization
   - **Secret Key**: Used for server-side verification
4. Toggle **Test Mode** for development
5. Enable gateways by checking **Active**
6. Click **Save Configuration**

---

## 🔐 Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` file to version control
- Keep secret keys private
- Use test mode during development
- Enable live mode only in production
- Payment keys are stored in Supabase, not in code

---

## 📱 Features Overview

### Public Pages
- **Home** (`/`) - Hero, stats, programs overview
- **About** (`/about`) - Organization story, mission, team
- **Programs** (`/programs`) - Detailed program information
- **Impact** (`/impact`) - Success stories, timeline, metrics
- **Get Involved** (`/get-involved`) - Volunteer forms, donation info
- **Contact** (`/contact`) - Contact form, location, FAQ
- **Donate** (`/donate`) - Payment form with Paystack/Flutterwave

### Donor Portal
- **Login** (`/auth/login`) - Donor authentication
- **Signup** (`/auth/signup`) - New donor registration
- **Dashboard** (`/donor/dashboard`) - View donation history
- **Thank You** (`/thank-you`) - Post-payment confirmation

### Admin
- **Admin Panel** (`/admin`) - Manage payment keys

---

## 💳 Payment Flow

1. **Donor visits** `/donate`
2. **Selects amount** and payment method (Paystack or Flutterwave)
3. **Enters details** (name, email, phone)
4. **Redirected** to payment gateway
5. **Completes payment** on gateway site
6. **Redirected back** to `/thank-you` with transaction reference
7. **Payment verified** automatically
8. **Receipt shown** with download option

---

## 👤 Donor Authentication

### How it Works
- Uses **Supabase Auth** for secure authentication
- Email/password authentication
- Donors can create accounts to track donations
- Dashboard shows total donations and history
- Each donation linked to donor account (optional)

### Guest Donations
- Donors can donate without creating an account
- Anonymous donations are supported
- Can register later to view all past donations

---

## 📊 Database Tables

### donors
- Stores donor profile information
- Links to Supabase Auth users
- Fields: id, email, full_name, phone

### donations
- Tracks all donations
- Fields: amount, currency, gateway, status, reference
- Links to donors (optional)

### payment_config
- Stores payment gateway configuration
- Fields: gateway, public_key, secret_key, is_active, test_mode

### volunteer_applications
- Stores volunteer form submissions
- Fields: full_name, email, area_of_interest, status

### contact_submissions
- Stores contact form submissions
- Fields: first_name, last_name, email, subject, message

### site_content (for future CMS)
- Stores dynamic content
- Fields: page, section, key, value, type

---

## 🧪 Testing

### Test Mode
1. Enable **Test Mode** in Admin Panel
2. Use test payment credentials:

**Paystack Test Cards:**
```
Card: 4084084084084081
CVV: 408
PIN: 0000
OTP: 123456
```

**Flutterwave Test Cards:**
```
Card: 5531886652142950
CVV: 564
PIN: 3310
OTP: 12345
```

### Verify Payments
- Check Supabase Table Editor → donations
- Status should change from "pending" to "successful"
- View in donor dashboard after login

---

## 🎨 Content Management

The site currently uses hardcoded content. To make it dynamic:

1. **Add content to `site_content` table** in Supabase
2. **Update components** to fetch from database
3. **Example:**

```typescript
const { data } = await supabase
  .from('site_content')
  .select('*')
  .eq('page', 'home')
  .eq('section', 'hero');
```

---

## 🌐 Deployment

### Netlify / Vercel
1. Connect your GitHub repository
2. Add environment variables in dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy!

### Update Payment Keys
1. After deployment, visit `your-domain.com/admin`
2. Switch from test mode to live mode
3. Enter production API keys
4. Save configuration

---

## 📞 Support

### Common Issues

**Payment not processing:**
- Check Admin Panel - are gateways active?
- Verify API keys are correct
- Check browser console for errors
- Ensure test mode matches test credentials

**Login not working:**
- Check Supabase Auth is enabled
- Verify email confirmation settings
- Check browser console for errors

**Database errors:**
- Ensure `supabase-schema.sql` was run completely
- Check Row Level Security policies
- Verify Supabase project is active

---

## 📝 Next Steps

1. ✅ Set up Supabase project
2. ✅ Run database schema
3. ✅ Configure environment variables
4. ✅ Add payment gateway keys
5. ✅ Test donations in test mode
6. ✅ Deploy to production
7. ✅ Switch to live mode
8. 🎉 Start receiving donations!

---

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Paystack API Docs](https://paystack.com/docs/api)
- [Flutterwave API Docs](https://developer.flutterwave.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Built with ❤️ for Adonai Angels Co**
