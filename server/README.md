# Portfolio Backend (local)

This is a minimal Node.js + Express backend used to make the portfolio site dynamic.

Features
- POST `/api/contact` to save submissions to local SQLite DB and send notification/autoreply via SMTP
- GET `/api/admin/contacts` (requires `Authorization: Bearer <ADMIN_TOKEN>`) to list recent contacts

Quick start

1. Install dependencies

```powershell
cd server
npm install
```

2. Create `.env` from `.env.example` and fill values (especially `ADMIN_TOKEN` and SMTP credentials)

3. Start server

```powershell
npm run dev
```

4. Frontend: run your Vite dev server (existing project uses `npm run dev` at repo root)

5. Update frontend API URL if you deploy the backend (default local port 4000)

Notes
- The database file is created in `server/data/db.sqlite` automatically.
- If you don't want to configure SMTP, the server will still save submissions to the SQLite DB but won't send emails.
- For production, use proper secrets management and consider using a hosted DB and email provider.

Apps Script proxy option
- Set `APPS_SCRIPT_URL` in your `server/.env` to your Google Apps Script web app URL (for example `https://script.google.com/macros/s/AKfycbx.../exec`). When set, the backend will forward each submission to that URL (as urlencoded form data) after saving to the local DB. This lets you keep using your existing Google Sheet handling while adding a dynamic backend/proxy layer.

Example `.env` addition:

```
APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxCZeBhwxsfp8vg-S7CTkqQMPG5g89UVSyLDKGV5H26iZo9Oirgd9Whxpdvpq2VDm8aCQ/exec
```

After updating `.env`, restart the server for changes to take effect.
