<?php

function handleAddFunds() {
    $auth_user = Auth::requireAuth();
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['amount']) || !isset($data['paymentMethod'])) {
        Response::validationError(['amount' => 'Amount required', 'paymentMethod' => 'Payment method required']);
    }
    
    $amount = floatval($data['amount']);
    $payment_method = $data['paymentMethod'];
    $transaction_id = $data['transactionId'] ?? null;
    
    if ($amount < 2) {
        Response::error('Minimum deposit is $2', 400);
    }
    
    try {
        $user_model = new User();
        $transaction_model = new Transaction();
        
        // For mobile payments, require transaction verification
        if (in_array($payment_method, ['easypaisa', 'jazzcash'])) {
            if (!$transaction_id) {
                Response::error('Transaction ID required for ' . $payment_method, 400);
            }
            
            // Check if transaction already used
            $existing = $transaction_model->findByExternalId($transaction_id);
            if ($existing) {
                Response::error('This transaction has already been used', 400);
            }
        }
        
        // Add funds to user
        $new_balance = $user_model->addBalance($auth_user->user_id, $amount);
        
        // Record transaction
        $transaction_model->create(
            $auth_user->user_id,
            'deposit',
            $amount,
            $payment_method,
            'completed',
            $transaction_id
        );
        
        Response::success([
            'balance' => $new_balance,
            'amount' => $amount,
            'paymentMethod' => $payment_method
        ], 'Funds added successfully', 201);
        
    } catch (Exception $e) {
        Response::error($e->getMessage(), 400);
    }
}

function handleWithdraw() {
    $auth_user = Auth::requireAuth();
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['amount']) || !isset($data['withdrawMethod'])) {
        Response::validationError(['amount' => 'Amount required', 'withdrawMethod' => 'Withdrawal method required']);
    }
    
    $amount = floatval($data['amount']);
    $withdraw_method = $data['withdrawMethod'];
    $account_info = $data['accountInfo'] ?? null;
    
    if ($amount < 5) {
        Response::error('Minimum withdrawal is $5', 400);
    }
    
    try {
        $user_model = new User();
        $transaction_model = new Transaction();
        
        // Check balance
        $balance = $user_model->getBalance($auth_user->user_id);
        if ($balance < $amount) {
            Response::error('Insufficient balance', 400);
        }
        
        // Subtract from balance (pending approval)
        $user_model->subtractBalance($auth_user->user_id, $amount);
        
        // Record transaction as pending
        $transaction_model->create(
            $auth_user->user_id,
            'withdrawal',
            $amount,
            $withdraw_method,
            'pending',
            null
        );
        
        Response::success([
            'message' => 'Withdrawal request submitted',
            'amount' => $amount,
            'withdrawMethod' => $withdraw_method,
            'status' => 'pending'
        ], 'Withdrawal request submitted for review', 201);
        
    } catch (Exception $e) {
        Response::error($e->getMessage(), 400);
    }
}

function handleGetBalance() {
    $auth_user = Auth::requireAuth();
    
    try {
        $user_model = new User();
        $balance = $user_model->getBalance($auth_user->user_id);
        
        Response::success([
            'balance' => $balance
        ], 'Balance retrieved');
        
    } catch (Exception $e) {
        Response::error($e->getMessage(), 400);
    }
}
?>
