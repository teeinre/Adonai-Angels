# Railway Deployment Guide

This project is configured for deployment on Railway.com.

## Infrastructure

- **Platform**: Railway.com
- **Database**: External PostgreSQL (Railway)
- **Primary Database URL**: `postgresql://postgres:HWoQFlPllARlTTTfWbQhecSquRBwrXaa@tramway.proxy.rlwy.net:48715/railway`

## Configuration

The deployment is managed via a root-level `railway.json` and a root-level `package.json`. This structure ensures that Railway's Nixpacks builder correctly identifies the project as a Node.js application even though the main code is in a subdirectory.

### Build and Deploy Pipeline

1. **Detection**: Railway sees `package.json` in the root and installs Node.js.
2. **Build**: The root `package.json` runs `npm run build`, which delegates to the `Adonai Website Backend and Frontend` subdirectory.
3. **Pre-deploy**: The application's `prestart` hook runs migrations on the Railway PostgreSQL database.
4. **Start**: The root `package.json` runs `npm start`, which launches the Express server in the subdirectory.

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
