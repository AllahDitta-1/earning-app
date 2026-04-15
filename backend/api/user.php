<?php

function handleGetProfile() {
    $auth_user = Auth::requireAuth();
    
    try {
        $user_model = new User();
        $user = $user_model->findById($auth_user->user_id);
        
        if (!$user) {
            Response::error('User not found', 404);
        }
        
        Response::success([
            'id' => $user['user_id'],
            'email' => $user['email'],
            'name' => $user['name'],
            'phone' => $user['phone'],
            'address' => $user['address'],
            'city' => $user['city'],
            'country' => $user['country'],
            'balance' => floatval($user['balance']),
            'created_at' => $user['created_at']
        ], 'Profile retrieved');
        
    } catch (Exception $e) {
        Response::error($e->getMessage(), 400);
    }
}

function handleUpdateProfile() {
    $auth_user = Auth::requireAuth();
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        Response::error('Invalid request data', 400);
    }
    
    try {
        $user_model = new User();
        $user = $user_model->update($auth_user->user_id, $data);
        
        Response::success([
            'id' => $user['user_id'],
            'email' => $user['email'],
            'name' => $user['name'],
            'phone' => $user['phone'],
            'address' => $user['address'],
            'city' => $user['city'],
            'country' => $user['country'],
            'balance' => floatval($user['balance'])
        ], 'Profile updated successfully');
        
    } catch (Exception $e) {
        Response::error($e->getMessage(), 400);
    }
}
?>
