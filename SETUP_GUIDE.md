# ZCash - Full Stack Setup Guide

## Project Structure

```
ZCash/
├── my-app/                 # React Frontend
│   └── src/
│       ├── context/
│       │   └── AuthContext.jsx (Updated for backend)
│       └── pages/
│           ├── AddFunds.jsx (With payment icons)
│           └── Withdraw.jsx (With payment icons)
│
└── backend/                # PHP Backend
    ├── api/
    ├── config/
    ├── middleware/
    ├── models/
    ├── utils/
    ├── index.php           # Main entry point
    ├── database.sql        # Database schema
    └── README.md           # Backend setup
```

## Backend Setup (PHP)

### 1. Database Setup

```bash
cd backend

# Create the database
mysql -u root -p
CREATE DATABASE zcash;
USE zcash;

# Import schema
mysql -u root -p zcash < database.sql
```

### 2. Install Dependencies

```bash
# Install Composer (if not installed)
# Download from https://getcomposer.org/download/

# Install PHP dependencies
composer install
```

### 3. Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your settings
nano .env
```

Update these values:

- `DB_USER` - Your MySQL username
- `DB_PASSWORD` - Your MySQL password
- `JWT_SECRET` - Generate a secure random string
- `EASYPAISA_API_KEY` - Get from Easypaisa developer portal
- `JAZZCASH_API_KEY` - Get from JazzCash developer portal

### 4. Run Backend Server

```bash
# Using PHP built-in server (development only)
php -S localhost:5000

# Or use Apache/Nginx - point document root to backend folder
```

## Frontend Setup (React)

### 1. Install Dependencies

```bash
cd my-app

npm install
```

### 2. Create .env file

```bash
cp .env.example .env
```

Create `my-app/.env`:

```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Run Frontend

```bash
npm run dev
```

The app will run at `http://localhost:5173` (Vite default)

## API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`

Register a new user

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### POST `/api/auth/login`

Login user

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/verify`

Verify JWT token
Headers: `Authorization: Bearer {token}`

### Funds Endpoints

#### POST `/api/funds/add`

Add funds to wallet

```json
{
  "amount": 10.50,
  "paymentMethod": "easypaisa" | "jazzcash" | "card" | "bank" | "crypto",
  "transactionId": "TRX20240123001" // For mobile payments
}
```

#### POST `/api/funds/withdraw`

Request withdrawal

```json
{
  "amount": 10.50,
  "withdrawMethod": "bank" | "jazzcash" | "crypto"
}
```

#### GET `/api/balance`

Get user balance
Headers: `Authorization: Bearer {token}`

### User Endpoints

#### GET `/api/user/profile`

Get user profile
Headers: `Authorization: Bearer {token}`

#### PUT `/api/user/profile`

Update user profile
Headers: `Authorization: Bearer {token}`

```json
{
  "name": "John Doe",
  "phone": "03001234567",
  "address": "123 Main St",
  "city": "Karachi",
  "country": "Pakistan"
}
```

### Verification Endpoints

#### POST `/api/verify-transaction`

Verify Easypaisa/JazzCash transaction
Headers: `Authorization: Bearer {token}`

```json
{
  "transactionId": "TRX20240123001",
  "paymentMethod": "easypaisa" | "jazzcash",
  "amount": 10.50
}
```

#### GET `/api/transactions`

Get user transaction history
Headers: `Authorization: Bearer {token}`
Query params: `?page=1&limit=50`

## Common Issues

### CORS Errors

The backend is configured to accept CORS requests. If you still get CORS errors:

1. Check that backend is running at correct URL
2. Verify API_BASE_URL in AuthContext.jsx matches your backend URL

### Database Connection Failed

1. Ensure MySQL is running
2. Check DB_HOST, DB_USER, DB_PASSWORD in .env
3. Verify database `zcash` exists

### JWT Token Errors

1. Make sure JWT_SECRET is set in .env
2. Token expires after 24 hours - users need to login again
3. Check Authorization header format: `Bearer {token}`

## Security Checklist

- [ ] Change `JWT_SECRET` to a secure random value
- [ ] Set strong database password
- [ ] Use HTTPS in production
- [ ] Restrict CORS to frontend domain only
- [ ] Add rate limiting to API endpoints
- [ ] Validate all user inputs
- [ ] Use environment variables for secrets
- [ ] Implement proper error handling
- [ ] Add logging and monitoring
- [ ] Regular database backups

## Production Deployment

### Backend

1. Use a proper web server (Apache/Nginx)
2. Enable HTTPS with SSL certificate
3. Set environment variables on server
4. Use a database server (not SQLite)
5. Configure firewalls and security rules

### Frontend

1. Build production bundle: `npm run build`
2. Deploy to CDN or web server
3. Configure environment for production API URL
4. Enable caching and compression

## Support

For issues or questions:

1. Check backend/README.md for backend docs
2. Review error messages in console
3. Check database logs
4. Verify API endpoints with Postman/Insomnia
