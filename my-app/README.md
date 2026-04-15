# Frontend

This folder contains the React frontend for the ZCash Earning App. It is built with Vite and uses React Router for page navigation.

## Features

- Login and signup flows
- Protected dashboard routes
- Wallet, transactions, and profile pages
- Investment plans, goals, and referral views
- API integration through `VITE_API_URL`

## Local development

```bash
npm install
copy .env.example .env
npm run dev
```

Use this environment variable in `.env`:

```env
VITE_API_URL=http://localhost:8000/api
```

## Scripts

- `npm run dev` starts the Vite development server
- `npm run build` creates the production build
- `npm run preview` serves the built app locally
- `npm run lint` runs ESLint
