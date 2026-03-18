# Weka – Sanity Studio + Next.js Frontend

Monorepo with **Sanity Studio** (content CMS) and **Next.js frontend** (from [next-vercel-shadcn](https://github.com/Manik589-weka/next-vercel-shadcn)).

## Structure

- **`studio/`** – Sanity Studio (schema, structure, components). Content for weka.io blog and related types.
- **`frontend/`** – Next.js app (Shadcn, Tailwind). Consumes the same Sanity project/dataset for the blog and optional embedded Studio.

## Prerequisites

- Node.js 20+ (or 22+)
- Same Sanity project for both apps: `ult5g8gw`, dataset `production` (or set in env)

## Setup

1. **Install root dependency** (for running both apps together):
   ```bash
   npm install
   ```

2. **Studio** (already has its own `node_modules` if you moved it; otherwise):
   ```bash
   cd studio && npm install && cd ..
   ```

3. **Frontend** (already ran once; if needed):
   ```bash
   cd frontend && npm install && cd ..
   ```

4. **Environment**
   - `frontend/.env.local` is set with `NEXT_PUBLIC_SANITY_PROJECT_ID=ult5g8gw` and `NEXT_PUBLIC_SANITY_DATASET=production`. Adjust if you use another dataset.
   - Optional: `SANITY_STUDIO_PREVIEW_URL` (e.g. `http://localhost:3000`) so Studio’s Presentation tool points at your local frontend.

## Run

From repo root:

- **Studio only** (default: http://localhost:3333):
  ```bash
  npm run dev:studio
  ```

- **Frontend only** (default: http://localhost:3000):
  ```bash
  npm run dev:frontend
  ```

- **Both** (Studio + Frontend in parallel):
  ```bash
  npm run dev
  ```

## Build

- `npm run build` – build **frontend only** (used by Vercel; avoids building Studio)
- `npm run build:frontend` – build Next.js
- `npm run build:studio` – build Studio
- `npm run build:all` – build both studio and frontend (for local)

## Deploy

- **Studio**: from `studio/`, run `npm run deploy` (or your host’s Sanity deploy).
- **Frontend (Vercel)**  
  So only the Next.js app is built (Studio is a separate app and not deployed to Vercel):
  1. In the Vercel project: **Settings → General → Root Directory** → set to **`frontend`** and Save.
  2. Redeploy. Vercel will run `npm install` and `npm run build` inside `frontend/`; no Studio build runs.
  3. In **Settings → Environment Variables**, set `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and optionally `SANITY_API_READ_TOKEN`.
- **Frontend (other hosts)**: build from the `frontend/` directory and set the same env vars.
