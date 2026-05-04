# Supabase Setup Guide

This project uses Supabase for authentication, database, and real-time subscriptions. Follow these steps to set up your local development environment.

## Environment Variables

Copy the `.env.example` file to `.env` and fill in your Supabase credentials.

```bash
cp .env.example .env
```

### Required Variables

| Variable | Description | Source |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Your Supabase Project URL | Project Settings > API |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase Anonymous Key | Project Settings > API |
| `VITE_SUPABASE_SERVICE_ROLE_KEY` | Your Supabase Service Role Key | Project Settings > API (Keep Secret!) |

**Note:** Only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are exposed to the frontend. The `VITE_SUPABASE_SERVICE_ROLE_KEY` should only be used in server-side contexts or administrative scripts.

## Database Schema

The database schema is defined in `supabase-schema.sql`. You can run this in the Supabase SQL Editor to set up the necessary tables and policies.

## Features Implemented

### 1. Authentication
- Sign up with email/password and full name.
- Sign in with email/password.
- Session persistence and auto-refresh.
- Sign out.

### 2. Database Services
- Site content management (fetch by page/section).
- Volunteer application submission.
- Contact form submission.
- Donor donation history retrieval.

### 3. Real-time Subscriptions
- Listen for site content updates.
- Listen for donation status changes (e.g., from 'pending' to 'successful').

## Client Initialization

The Supabase client is initialized in `src/lib/supabase.ts` with:
- Error handling for missing environment variables.
- Fetch error logging.
- Connection validation helper function `validateConnection()`.
