# ParkIntent

ParkIntent is a web application that helps users assess parking pressure before
travelling to a busy destination and record their eventual parking outcome.

Built for BUS4012 Assignment 3.

---

## Technology Stack

| Layer      | Technology                           |
|------------|--------------------------------------|
| Frontend   | React, Vite                          |
| Backend    | Python 3, Flask                      |
| Database   | Supabase (PostgreSQL)                |
| Deployment | Vercel (Services: frontend + backend)|

---

## Folder Structure

```
parkintent-app/
├── frontend/                # React + Vite application
│   ├── src/
│   │   ├── components/      # Reusable UI: PrimaryButton, FormField, SectionCard, Badge
│   │   ├── screens/         # Login, PlanTrip, Flexibility, Confidence, Outcome, Success
│   │   ├── services/        # api.js — fetch wrapper for /api calls
│   │   ├── data/            # mockData.js — prototype options and mock parking logic
│   │   ├── App.jsx          # Screen router and state management
│   │   └── main.jsx         # React entry point
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                 # Python Flask API
│   ├── app.py               # Flask app with /api/trips routes
│   └── requirements.txt     # flask, supabase, python-dotenv
│
├── vercel.json              # Vercel Services routing configuration
├── .env.example             # Template for required environment variables
└── README.md
```

---

## Data Flow

```
React (browser)
  ── fetch POST /api/trips ──►  Flask backend (app.py)
                                  ├── validates required fields
                                  ├── inserts row into Supabase "trips" table
                                  └── returns { success: true, trip: {...} }

  ◄── on success: navigate to Success screen
  ◄── on failure: stay on Outcome screen, show error message


React (Success screen, on mount)
  ── fetch GET /api/trips ──►  Flask backend
                                 └── selects 10 most recent rows from Supabase

  ◄── renders "Previously Saved Trips" list
```

The frontend never connects directly to Supabase. All database access
goes through the Flask backend.

---

## Environment Variables

| Variable              | Purpose                   |
|-----------------------|---------------------------|
| `SUPABASE_URL`        | Supabase project URL      |
| `SUPABASE_SECRET_KEY` | Supabase secret API key   |

**Never commit real credentials to Git.** The `.env` file is listed in
`.gitignore`. Use `.env.example` as a template with placeholder values only.

For local development, create a `.env` file in the project root:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SECRET_KEY=your-supabase-secret-key
```

For Vercel deployment, set both variables in the Vercel dashboard under
Project > Settings > Environment Variables.

---

## Local Development

### Prerequisites

- Node.js
- Python 3
- A Supabase project with a `trips` table

### Install dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
pip install -r requirements.txt
```

### Run locally

Open two terminals:

**Terminal 1** — Flask backend (from the project root):

```bash
python backend/app.py
```

**Terminal 2** — Vite dev server:

```bash
cd frontend
npm run dev
```

> **Windows note:** If PowerShell blocks `npm.ps1`, use `npm.cmd run dev` instead.

The Vite dev server proxies `/api` requests to `http://localhost:5000`.

Open `http://localhost:5173` in your browser.

---

## Deployment

The project deploys to Vercel using Services, which runs the frontend
and backend as independently built units on a shared domain.

`vercel.json` declares two services:

- **frontend** (`frontend/`) — Vite static build, served at `/`
- **backend** (`backend/`) — Flask WSGI app, receives `/api/*` requests

Rewrite rules route `/api` and `/api/*` to the backend service, and
all other paths to the frontend service.

To deploy:

1. Push the repository to GitHub.
2. Import the repository in the Vercel dashboard.
3. Set `SUPABASE_URL` and `SUPABASE_SECRET_KEY` in Vercel Environment Variables.
4. Deploy. Vercel builds both services automatically.

---

## Supabase Table

The application uses a single `trips` table:

```sql
CREATE TABLE trips (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination      TEXT NOT NULL,
  trip_date        DATE NOT NULL,
  arrival_time     TEXT NOT NULL,
  flexibility      TEXT NOT NULL,
  preferred_area   TEXT,
  pressure         TEXT NOT NULL,
  recommended_area TEXT NOT NULL,
  parking_duration TEXT NOT NULL,
  what_happened    TEXT NOT NULL,
  created_at       TIMESTAMPTZ DEFAULT now()
);
```

---

## Important Notes

- **Login is cosmetic only.** The email and password are validated
  client-side but are never sent to the backend or stored anywhere.

- **Parking-confidence data is prototype/mock logic.** The pressure
  estimates in `mockData.js` are based on simple time-of-day patterns.
  They are not real parking predictions and do not represent actual
  Chadstone Shopping Centre data.

- **Only trip and outcome data is persisted.** The fields saved to
  Supabase are: destination, date, arrival time, flexibility level,
  preferred parking area, pressure estimate, recommended area, parking
  duration, and what happened.

---

## GitHub

This repository contains the complete source code for the BUS4012
Assignment 3 ParkIntent application. It is intended for academic
assessment purposes.
