# Transaction ID Verification Guide

## ⚠️ SECURITY - How to Prevent Fraud

### Problem:

Users can potentially enter any random 8-digit numbers and claim it's a valid transaction.

### Solution:

You MUST verify against the actual payment provider's database/API.

---

## 🔐 Multi-Layer Verification System

### Layer 1: Format Validation (Frontend)

✅ Already implemented

- Check length: 8-20 characters
- Check format: Alphanumeric only
- Prevents invalid/malicious characters

### Layer 2: API Verification (Backend) - REQUIRED

❌ Currently mocked, MUST implement

Call Easypaisa/JazzCash API to verify:

**POST /api/verify-transaction**

```javascript
{
  transactionId: "TRX20240123001",
  paymentMethod: "easypaisa" | "jazzcash",
  amount: 10.50,
  phoneNumber: "03431103523",
  expectedAmount: 10.50,
  timestamp: "2024-01-23T10:30:00Z"
}
```

**What to Check:**

1. **Transaction Exists?**
   - Query Easypaisa/JazzCash API
   - If NOT found → REJECT ❌
2. **Amount Matches?**
   - DB has: ₨2,925 (for $10.50)
   - User claims: $10.50
   - If mismatch → REJECT ❌
3. **Phone Number Matches?**
   - Transaction receiver: 03431103523
   - Form receiver: 03431103523
   - If mismatch → REJECT ❌
4. **Already Used?**
   - Check your database: Has this txn_id been used before?
   - If yes → REJECT (duplicate/fraud) ❌
5. **Recent Transaction?**
   - Transaction date: Today
   - If older than 1 hour → Ask user why?
   - Mark for manual review

6. **Not In Pending Payments?**
   - Some txns stay "pending" for security
   - Check status = "completed"
   - If still pending → Ask user to wait

---

## 📝 Backend Implementation Example

### Using Node.js/Express:

```javascript
// Backend API endpoint
app.post("/api/verify-transaction", async (req, res) => {
  const { transactionId, paymentMethod, amount, phoneNumber, expectedAmount } =
    req.body;

  try {
    // 1. Call Easypaisa/JazzCash API
    const easyPaisaAPI = `https://api.easypaisa.com.pk/v2/transactions/${transactionId}`;
    const easyPaisaResponse = await fetch(easyPaisaAPI, {
      headers: {
        Authorization: `Bearer ${process.env.EASYPAISA_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const txnData = await easyPaisaResponse.json();

    // 2. Validate transaction exists
    if (!easyPaisaResponse.ok || !txnData.success) {
      return res.status(400).json({
        valid: false,
        reason: "not_found",
        message: "Transaction ID not found in Easypaisa system",
      });
    }

    // 3. Verify amount matches (convert PKR to USD)
    const expectedAmountInPKR = expectedAmount * 278; // Exchange rate
    if (Math.abs(txnData.amount - expectedAmountInPKR) > 100) {
      // 100 PKR tolerance
      return res.status(400).json({
        valid: false,
        reason: "amount_mismatch",
        message: "Transaction amount does not match",
        expectedAmount: expectedAmountInPKR,
        actualAmount: txnData.amount,
      });
    }

    // 4. Verify receiver phone matches
    if (txnData.receiverPhone !== phoneNumber) {
      return res.status(400).json({
        valid: false,
        reason: "phone_mismatch",
        message: "Receiver phone does not match",
      });
    }

    // 5. Check if already claimed
    const existingClaim = await db.collection("transactions").findOne({
      transactionId: transactionId,
      status: "completed",
    });

    if (existingClaim) {
      return res.status(400).json({
        valid: false,
        reason: "already_used",
        message: "This transaction has already been claimed",
      });
    }

    // 6. Check if transaction is recent (within 24 hours)
    const txnDate = new Date(txnData.timestamp);
    const now = new Date();
    const hoursDiff = (now - txnDate) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
      return res.status(400).json({
        valid: false,
        reason: "expired",
        message:
          "Transaction is older than 24 hours. Please use recent transactions only.",
      });
    }

    // 7. Check transaction status
    if (txnData.status !== "completed" && txnData.status !== "success") {
      return res.status(400).json({
        valid: false,
        reason: "pending_status",
        message: `Transaction status is ${txnData.status}. Please wait for completion.`,
      });
    }

    // ✅ ALL CHECKS PASSED
    return res.json({
      valid: true,
      message: "Transaction verified successfully",
      data: {
        amount: txnData.amount,
        date: txnData.timestamp,
        status: txnData.status,
      },
    });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({
      valid: false,
      message: "Verification service temporarily unavailable",
    });
  }
});
```

---

## 🛡️ Additional Security Measures

### 1. Whitelist Trusted Phone Numbers

```javascript
const trustedPhones = {
  easypaisa: ["03431103523", "03001234567"],
  jazzcash: ["03001234567"],
};
```

### 2. Rate Limiting (Prevent Brute Force)

```javascript
// Limit attempts: Max 10 verifications per hour per user
const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: 'Too many verification attempts'
});
app.post('/api/verify-transaction', rateLimiter, ...);
```

### 3. Log All Verification Attempts

```javascript
await db.collection("verification_logs").insertOne({
  userId: req.user.id,
  transactionId: req.body.transactionId,
  timestamp: new Date(),
  result: "valid" | "invalid",
  reason: error.reason,
  ipAddress: req.ip,
});
```

### 4. Manual Review for Suspicious Attempts

```javascript
// If multiple failed attempts from same user
if (failedAttempts > 5) {
  // Flag account for review
  await db
    .collection("users")
    .updateOne({ _id: userId }, { $set: { requiresManualReview: true } });
}
```

---

## 📋 Checklist - What to Implement

- [ ] Get Easypaisa API credentials (contact them for developer API)
- [ ] Get JazzCash API credentials
- [ ] Create backend endpoint /api/verify-transaction
- [ ] Implement all 6 validation checks
- [ ] Add rate limiting
- [ ] Add verification logging
- [ ] Add database duplicate check
- [ ] Test with real transactions
- [ ] Set up alerts for suspicious patterns
- [ ] Document API keys securely

---

## 🔑 Getting API Access

### Easypaisa (Pakistan)

- Website: https://www.easypaisa.com.pk
- Developer Portal: https://developer.easypaisa.com.pk
- Contact: api-support@easypaisa.com.pk
- You need: Merchant ID, API Key, API Secret

### JazzCash (Pakistan)

- Website: https://www.jazzcash.com.pk
- Integration: https://sandbox.jazzcash.com.pk
- Contact: integration@jazzcash.com.pk
- You need: Merchant ID, Password, Signature Key

---

## ✅ Final Security Note

**DO NOT trust frontend validation alone!**

Frontend validation is for UX. The REAL security happens on your backend when you verify against the actual payment provider's system.

Users with technical knowledge can bypass frontend checks. Backend verification is impossible to bypass.
