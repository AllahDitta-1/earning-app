<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Auth {
    public static function generateToken($user_id) {
        $issued_at = time();
        $expire = $issued_at + (24 * 60 * 60); // 24 hours
        
        $payload = array(
            'user_id' => $user_id,
            'iat' => $issued_at,
            'exp' => $expire
        );
        
        return JWT::encode($payload, JWT_SECRET, 'HS256');
    }
    
    public static function verifyToken() {
        $headers = getallheaders();
        $auth_header = $headers['Authorization'] ?? '';
        
        if (empty($auth_header)) {
            return null;
        }
        
        $parts = explode(' ', $auth_header);
        if (count($parts) !== 2 || $parts[0] !== 'Bearer') {
            return null;
        }
        
        $token = $parts[1];
        
        try {
            $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
            return $decoded;
        } catch (Exception $e) {
            return null;
        }
    }
    
    public static function requireAuth() {
        $user = self::verifyToken();
        
        if (!$user) {
            Response::unauthorized('Token missing or invalid');
        }
        
        return $user;
    }
}

// Polyfill for getallheaders if not available
if (!function_exists('getallheaders')) {
    function getallheaders() {
        $headers = [];
        foreach ($_SERVER as $name => $value) {
            if (substr($name, 0, 5) == 'HTTP_') {
                $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
            }
        }
        return $headers;
    }
}
?>
