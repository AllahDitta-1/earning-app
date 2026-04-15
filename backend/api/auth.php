<?php

function handleLogin() {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['email']) || !isset($data['password'])) {
        Response::validationError(['email' => 'Email required', 'password' => 'Password required']);
    }
    
    $user_model = new User();
    $user = $user_model->findByEmail($data['email']);
    
    if (!$user || !password_verify($data['password'], $user['password'])) {
        Response::error('Invalid email or password', 401);
    }
    
    $token = Auth::generateToken($user['user_id']);
    
    Response::success([
        'user' => [
            'id' => $user['user_id'],
            'email' => $user['email'],
            'name' => $user['name'],
            'balance' => floatval($user['balance'])
        ],
        'token' => $token
    ], 'Login successful');
}

function handleSignup() {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $errors = [];
    
    if (!$data || !isset($data['email']) || empty($data['email'])) {
        $errors['email'] = 'Email is required';
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format';
    }
    
    if (!isset($data['password']) || empty($data['password'])) {
        $errors['password'] = 'Password is required';
    } elseif (strlen($data['password']) < 6) {
        $errors['password'] = 'Password must be at least 6 characters';
    }
    
    if (!isset($data['name']) || empty($data['name'])) {
        $errors['name'] = 'Name is required';
    }
    
    if (!empty($errors)) {
        Response::validationError($errors);
    }
    
    $user_model = new User();
    
    // Check if email already exists
    $existing_user = $user_model->findByEmail($data['email']);
    if ($existing_user) {
        Response::error('Email already registered', 400);
    }
    
    try {
        $user_id = $user_model->create($data['email'], $data['password'], $data['name']);
        $user = $user_model->findById($user_id);
        $token = Auth::generateToken($user_id);
        
        Response::success([
            'user' => [
                'id' => $user['user_id'],
                'email' => $user['email'],
                'name' => $user['name'],
                'balance' => floatval($user['balance'])
            ],
            'token' => $token
        ], 'Account created successfully', 201);
    } catch (Exception $e) {
        Response::error($e->getMessage(), 400);
    }
}

function handleVerify() {
    $auth_user = Auth::requireAuth();
    $user_model = new User();
    $user = $user_model->findById($auth_user->user_id);
    
    if (!$user) {
        Response::unauthorized('User not found');
    }
    
    Response::success([
        'user' => [
            'id' => $user['user_id'],
            'email' => $user['email'],
            'name' => $user['name'],
            'balance' => floatval($user['balance'])
        ]
    ], 'Token valid');
}
?>
