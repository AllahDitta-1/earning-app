<?php

class User {
    private $db;
    
    public function __construct() {
        $this->db = Database::getConnection();
    }
    
    public function create($email, $password, $name) {
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        $user_id = uniqid('user_', true);
        
        $sql = "INSERT INTO users (user_id, email, password, name, balance, created_at) 
                VALUES (?, ?, ?, ?, 0, NOW())";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('ssss', $user_id, $email, $hashed_password, $name);
        
        if (!$stmt->execute()) {
            throw new Exception('Failed to create user: ' . $stmt->error);
        }
        
        return $user_id;
    }
    
    public function findByEmail($email) {
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('s', $email);
        $stmt->execute();
        
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }
    
    public function findById($user_id) {
        $sql = "SELECT * FROM users WHERE user_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('s', $user_id);
        $stmt->execute();
        
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }
    
    public function getBalance($user_id) {
        $sql = "SELECT balance FROM users WHERE user_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('s', $user_id);
        $stmt->execute();
        
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        
        return $user ? floatval($user['balance']) : 0;
    }
    
    public function addBalance($user_id, $amount) {
        $sql = "UPDATE users SET balance = balance + ? WHERE user_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('ds', $amount, $user_id);
        
        if (!$stmt->execute()) {
            throw new Exception('Failed to add balance: ' . $stmt->error);
        }
        
        return $this->getBalance($user_id);
    }
    
    public function subtractBalance($user_id, $amount) {
        $sql = "UPDATE users SET balance = balance - ? WHERE user_id = ? AND balance >= ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('dss', $amount, $user_id, $amount);
        
        if (!$stmt->execute()) {
            throw new Exception('Failed to subtract balance: ' . $stmt->error);
        }
        
        if ($stmt->affected_rows === 0) {
            throw new Exception('Insufficient balance');
        }
        
        return $this->getBalance($user_id);
    }
    
    public function update($user_id, $data) {
        $allowed_fields = ['name', 'phone', 'address', 'city', 'country'];
        $updates = [];
        $types = '';
        $values = [];
        
        foreach ($data as $field => $value) {
            if (in_array($field, $allowed_fields)) {
                $updates[] = "$field = ?";
                $types .= 's';
                $values[] = $value;
            }
        }
        
        if (empty($updates)) {
            return $this->findById($user_id);
        }
        
        $values[] = $user_id;
        $types .= 's';
        
        $sql = "UPDATE users SET " . implode(', ', $updates) . " WHERE user_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param($types, ...$values);
        
        if (!$stmt->execute()) {
            throw new Exception('Failed to update user: ' . $stmt->error);
        }
        
        return $this->findById($user_id);
    }
}
?>
