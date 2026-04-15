<?php

function handleVerifyTransaction() {
    $auth_user = Auth::requireAuth();
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        Response::error('Invalid request data', 400);
    }
    
    $transaction_id = $data['transactionId'] ?? null;
    $payment_method = $data['paymentMethod'] ?? null;
    $amount = floatval($data['amount'] ?? 0);
    
    // Validation
    $errors = [];
    
    if (!$transaction_id || strlen($transaction_id) < 8) {
        $errors['transactionId'] = 'Invalid transaction ID format';
    }
    
    if (!in_array($payment_method, ['easypaisa', 'jazzcash'])) {
        $errors['paymentMethod'] = 'Invalid payment method';
    }
    
    if ($amount < 2) {
        $errors['amount'] = 'Minimum amount is $2';
    }
    
    if (!empty($errors)) {
        Response::validationError($errors);
    }
    
    try {
        $transaction_model = new Transaction();
        
        // Step 1: Check if transaction ID already used
        $existing_txn = $transaction_model->findByExternalId($transaction_id);
        if ($existing_txn) {
            Response::error('This transaction ID has already been claimed', 400, [
                'reason' => 'already_used'
            ]);
        }
        
        // Step 2: Verify with payment gateway
        $verified = verifyWithPaymentGateway($payment_method, $transaction_id, $amount);
        
        if (!$verified) {
            Response::error('Transaction ID not found in payment system', 400, [
                'reason' => 'not_found'
            ]);
        }
        
        // Step 3: Record the verification
        Response::success([
            'valid' => true,
            'transactionId' => $transaction_id,
            'amount' => $amount,
            'verified' => true
        ], 'Transaction verified successfully');
        
    } catch (Exception $e) {
        Response::error($e->getMessage(), 400);
    }
}

function verifyWithPaymentGateway($method, $transaction_id, $amount) {
    // TODO: Implement actual payment gateway verification
    // This is a placeholder for the actual API calls to Easypaisa/JazzCash
    
    // For now, accept transactions with valid format
    // In production, call the actual payment provider API
    
    if ($method === 'easypaisa') {
        // Call Easypaisa API
        // $api_url = 'https://api.easypaisa.com.pk/v2/transactions/' . $transaction_id;
        // ... verify using EASYPAISA_API_KEY
        
        return true; // Demo mode
    } elseif ($method === 'jazzcash') {
        // Call JazzCash API
        // $api_url = 'https://api.jazzcash.com.pk/v2/transactions/' . $transaction_id;
        // ... verify using JAZZCASH_API_KEY
        
        return true; // Demo mode
    }
    
    return false;
}
?>
