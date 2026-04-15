<?php

class Transaction {
    private $db;
    
    public function __construct() {
        $this->db = Database::getConnection();
    }
    
    public function create($user_id, $type, $amount, $payment_method, $status = 'completed', $transaction_id = null) {
        $txn_id = uniqid('txn_', true);
        
        $sql = "INSERT INTO transactions 
                (txn_id, user_id, type, amount, payment_method, status, external_txn_id, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('sssdss', $txn_id, $user_id, $type, $amount, $payment_method, $status, $transaction_id);
        
        if (!$stmt->execute()) {
            throw new Exception('Failed to create transaction: ' . $stmt->error);
        }
        
        return $this->findById($txn_id);
    }
    
    public function findById($txn_id) {
        $sql = "SELECT * FROM transactions WHERE txn_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('s', $txn_id);
        $stmt->execute();
        
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }
    
    public function findByExternalId($external_txn_id) {
        $sql = "SELECT * FROM transactions WHERE external_txn_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('s', $external_txn_id);
        $stmt->execute();
        
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }
    
    public function getUserTransactions($user_id, $limit = 50, $offset = 0) {
        $sql = "SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('sii', $user_id, $limit, $offset);
        $stmt->execute();
        
        $result = $stmt->get_result();
        $transactions = [];
        
        while ($row = $result->fetch_assoc()) {
            $transactions[] = $row;
        }
        
        return $transactions;
    }
    
    public function updateStatus($txn_id, $status) {
        $sql = "UPDATE transactions SET status = ? WHERE txn_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('ss', $status, $txn_id);
        
        if (!$stmt->execute()) {
            throw new Exception('Failed to update transaction: ' . $stmt->error);
        }
        
        return $this->findById($txn_id);
    }
}
?>
