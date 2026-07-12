# Deployment Guide

This repository is optimized for a modular cloud deployment.

## Frontend Deployment (Vercel)
1. Push this repository to GitHub.
2. Log into Vercel and select "Import Project".
3. Select the `frontend` directory as the Root Directory.
4. Framework Preset: `Vite`.
5. Add the Environment Variables from `frontend/.env.example`.
6. Click Deploy. Vercel will automatically use `vercel.json` for React Router rewrites.

## Backend Deployment (Render)
1. In Render, select "New Web Service".
2. Connect your GitHub repository.
3. Root Directory: `backend`
4. Environment: `Native Java`
5. Build Command: `./mvnw clean package -DskipTests`
6. Start Command: `java -jar target/backend-0.0.1-SNAPSHOT.jar`
7. Add the Environment Variables from `backend/.env.example`.
8. *Alternatively, use Blueprint*: Render will auto-detect the `render.yaml` file in the backend directory.

## Database (MySQL / PlanetScale / AWS RDS)
1. Provision a MySQL database.
2. Execute `database/schema.sql` to initialize tables.
3. Execute `database/sample-data.sql` to seed the admin account.
4. Update Render's `DB_URL` environment variable with your production connection string.
