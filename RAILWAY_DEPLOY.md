# Railway Deployment Guide

This project is configured for deployment on Railway.com.

## Infrastructure

- **Platform**: Railway.com
- **Database**: External PostgreSQL (Railway)
- **Primary Database URL**: `postgresql://postgres:HWoQFlPllARlTTTfWbQhecSquRBwrXaa@tramway.proxy.rlwy.net:48715/railway`

## Configuration

The deployment is managed via `railway.json`. It uses **Nixpacks** to automatically detect the environment and build the application.

### Build and Deploy Pipeline

1. **Build**: `npm run build` generates the static assets in the `dist` folder.
2. **Pre-deploy**: `npm run migrate` is executed automatically (via `prestart`) to apply the `supabase-schema.sql` to the Railway PostgreSQL database.
3. **Start**: `npm start` runs `server.js`, a lightweight Express server that:
   - Serves static files.
   - Handles SPA routing.
   - Provides a `/health` endpoint for Railway monitoring.

## Required Environment Variables

Ensure these are set in your Railway project settings:

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | The PostgreSQL connection string. |
| `PORT` | The port the server will listen on (automatically set by Railway). |
| `VITE_SUPABASE_URL` | Your Supabase project URL. |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key. |

## Database Migrations

Migrations are automatically run before each deployment starts. You can also run them manually:

```bash
npm run migrate
```

## Monitoring

- **Health Checks**: Railway monitors the `/health` endpoint.
- **Logs**: Real-time logs are available in the Railway dashboard.
- **SSL**: Railway automatically provides SSL certificates for your custom domain or the default `.up.railway.app` domain.
