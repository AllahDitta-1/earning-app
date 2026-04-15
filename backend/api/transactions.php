<?php

function handleGetTransactions() {
    $auth_user = Auth::requireAuth();
    
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 50;
    $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
    $offset = ($page - 1) * $limit;
    
    try {
        $transaction_model = new Transaction();
        $transactions = $transaction_model->getUserTransactions($auth_user->user_id, $limit, $offset);
        
        Response::success([
            'transactions' => $transactions,
            'page' => $page,
            'limit' => $limit
        ], 'Transactions retrieved');
        
    } catch (Exception $e) {
        Response::error($e->getMessage(), 400);
    }
}
?>
