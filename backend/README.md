# PHP Backend Setup Guide

## Installation

```bash
# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Update .env with your database credentials
nano .env
```

## Database Setup

Create a new MySQL database and import the schema:

```sql
-- Create Database
CREATE DATABASE zcash;
USE zcash;

-- Users Table
CREATE TABLE users (
    user_id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    balance DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Transactions Table
CREATE TABLE transactions (
    txn_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    type ENUM('deposit', 'withdrawal', 'transfer') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    external_txn_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    INDEX (user_id),
    INDEX (external_txn_id)
);
```

## Running the Server

```bash
# Using PHP built-in server
php -S localhost:8000 router.php

# Or with Apache/Nginx, point document root to the backend folder
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login user
- `POST /api/auth/signup` - Create new account
- `GET /api/auth/verify` - Verify token

### Funds Management

- `POST /api/funds/add` - Add funds to wallet
- `POST /api/funds/withdraw` - Request withdrawal
- `GET /api/balance` - Get user balance

### User

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Transactions

- `GET /api/transactions` - Get transaction history
- `POST /api/verify-transaction` - Verify payment transaction

## Configuration

Update `.env` file with your settings:

These are example placeholders only. Do not put real secrets in documentation or commit them to git.

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=zcash

JWT_SECRET=replace_with_a_long_random_secret

EASYPAISA_API_KEY=replace_with_provider_key
JAZZCASH_API_KEY=replace_with_provider_key
```

## Security Notes

1. **Change JWT_SECRET** - Generate a secure secret key and keep it only in server env files
2. **Payment Gateway Keys** - Store provider keys on the backend only, never in frontend code
3. **Database** - Use proper user permissions, not root
4. **CORS** - Current setup allows all origins, restrict in production
5. **HTTPS** - Always use HTTPS in production
