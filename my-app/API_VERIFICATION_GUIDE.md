# Transaction Verification Security Guide

This note exists to prevent an unsafe implementation.

## Never expose provider secrets

Do not place any of these in React code, Vite env files that ship to the browser, localStorage, or public GitHub docs:

- Easypaisa API keys
- JazzCash API keys
- Merchant passwords
- Signature keys
- Backend JWT secrets

The frontend must never call the payment provider directly with secret credentials.

## Safe flow

1. The frontend collects user input such as `transactionId`, `amount`, and `paymentMethod`.
2. The frontend sends that data to your own backend endpoint: `POST /api/verify-transaction`.
3. The backend loads payment credentials from server-side environment variables.
4. The backend calls Easypaisa or JazzCash.
5. The backend checks the transaction before crediting the wallet.

## What the backend must verify

- The transaction exists
- The amount matches the expected amount
- The receiver or merchant account matches your account
- The transaction status is completed
- The transaction is recent enough
- The transaction has not already been claimed

## Required backend protections

- Rate limit verification attempts
- Log every verification request
- Block duplicate transaction IDs
- Flag repeated failures for manual review
- Return generic error messages to users

## Example request from frontend to your backend

```javascript
await fetch(`${API_BASE_URL}/verify-transaction`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    transactionId,
    paymentMethod,
    amount,
  }),
});
```

## Backend-only rule

If a value can be used to call Easypaisa, JazzCash, your database, or JWT signing directly, it belongs on the backend only.
