# Deployment and Monitoring Guide

This guide covers the production deployment process for the Adonai NGO Website on Render.

## Deployment on Render

The project is configured for a **Static Site** deployment on Render using the [render.yaml](file:///c:/Users/450/Documents/trae_projects/Adonai%20NGO%20Website/Adonai%20Website%20Backend%20and%20Frontend/render.yaml) file.

### Prerequisites

1.  A GitHub repository with the project code.
2.  A [Render](https://render.com) account.
3.  Supabase project credentials (URL and Anon Key).

### Step-by-Step Deployment

1.  **Connect to GitHub**: In the Render Dashboard, click **New +** and select **Blueprint**.
2.  **Select Repository**: Connect your GitHub account and select the Adonai NGO Website repository.
3.  **Environment Variables**: Render will automatically detect the variables defined in `render.yaml`. You will need to provide the values for:
    -   `VITE_SUPABASE_URL`
    -   `VITE_SUPABASE_ANON_KEY`
    -   `VITE_SUPABASE_SERVICE_ROLE_KEY` (Optional for client-side, but good for backend tasks)
4.  **Deploy**: Render will build the project using `npm run build` and serve the static files from the `dist` directory.

## Environment Variables

| Variable | Type | Description |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | String | Your Supabase Project URL. |
| `VITE_SUPABASE_ANON_KEY` | String | Your Supabase Anonymous Key. |
| `NODE_VERSION` | String | Set to `18.0.0` or higher (configured in `render.yaml`). |

## Monitoring and Logging

-   **Logs**: Access real-time build and runtime logs in the **Logs** tab of your Render service.
-   **Health Checks**: For static sites, Render automatically monitors the availability of the served assets.
-   **Alerts**: Configure email notifications in Render settings for build failures or service interruptions.

## Rollback Procedures

1.  **Instant Rollback**: In the Render Dashboard, go to the **Events** or **Deploys** tab.
2.  **Select Previous Build**: Find a successful previous deployment.
3.  **Rollback**: Click the options menu (three dots) next to the deployment and select **Rollback to this revision**.

## Local Production Testing

To test the production build locally:

```bash
# 1. Build the project
npm run build

# 2. Preview the production build
npm run preview
```
