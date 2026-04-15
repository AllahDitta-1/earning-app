# ZCash Earning App

ZCash Earning App is a full-stack earning and wallet management project with a React frontend and a PHP backend. It includes authentication, balance tracking, transaction history, investment plans, referrals, and deposit or withdrawal flows designed for a local development setup.

## What is included

- React 19 + Vite frontend in `my-app/`
- PHP 8 backend API in `backend/`
- JWT-based authentication
- Wallet, balance, and transaction endpoints
- Investment plan, goals, and referral views
- MySQL schema in `backend/database.sql`

## Tech stack

- Frontend: React, Vite, React Router, Tailwind CSS, Lucide icons
- Backend: PHP, Composer, `firebase/php-jwt`, `vlucas/phpdotenv`, Guzzle
- Database: MySQL

## Project structure

```text
Earning app/
|-- my-app/              React frontend
|-- backend/             PHP API and database schema
|-- SETUP_GUIDE.md       Extended setup notes
|-- README.md            Repository overview
```

## Quick start

### 1. Backend setup

```bash
cd backend
composer install
copy .env.example .env
```

Update `backend/.env` with your database credentials and JWT secret, then import the schema from `backend/database.sql`.

Run the backend on port `8000`:

```bash
php -S localhost:8000 router.php
```

On Windows, you can also use:

```bash
run-server.bat
```

### 2. Frontend setup

```bash
cd my-app
npm install
copy .env.example .env
```

Set:

```env
VITE_API_URL=http://localhost:8000/api
```

Then start the frontend:

```bash
npm run dev
```

The Vite dev server runs on `http://localhost:5173`.

## Main application areas

- Authentication: sign up, login, token verification
- Dashboard: balance cards, activity, earnings overview
- Wallet: add funds, withdraw, and review balance state
- Transactions: inspect previous account activity
- Profile and security: manage account details
- Investment plans, goals, and referrals

## API overview

The backend currently exposes routes for:

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/verify`
- `POST /api/funds/add`
- `POST /api/funds/withdraw`
- `GET /api/balance`
- `GET /api/user/profile`
- `PUT /api/user/profile`
- `GET /api/transactions`
- `POST /api/verify-transaction`

## Notes

- `backend/.env` is ignored by git and is not committed.
- The backend currently allows all CORS origins for development.
- Before deploying, replace the example secrets and restrict production CORS settings.

## Additional docs

- Backend notes: `backend/README.md`
- Setup guide: `SETUP_GUIDE.md`
