<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Load environment variables
require_once __DIR__ . '/config/env.php';
require_once __DIR__ . '/config/Database.php';
require_once __DIR__ . '/middleware/Auth.php';
require_once __DIR__ . '/utils/Response.php';
require_once __DIR__ . '/models/User.php';
require_once __DIR__ . '/models/Transaction.php';

// Get request path
$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$request_path = str_replace('/backend', '', $request_uri);

// Route handler
try {
    switch ($request_path) {
        // Authentication Routes
        case '/api/auth/login':
            if ($request_method === 'POST') {
                require_once __DIR__ . '/api/auth.php';
                handleLogin();
            }
            break;

        case '/api/auth/signup':
            if ($request_method === 'POST') {
                require_once __DIR__ . '/api/auth.php';
                handleSignup();
            }
            break;

        case '/api/auth/verify':
            if ($request_method === 'GET') {
                require_once __DIR__ . '/api/auth.php';
                handleVerify();
            }
            break;

        // Transaction Verification
        case '/api/verify-transaction':
            if ($request_method === 'POST') {
                require_once __DIR__ . '/api/verify-transaction.php';
                handleVerifyTransaction();
            }
            break;

        // Funds Management
        case '/api/funds/add':
            if ($request_method === 'POST') {
                require_once __DIR__ . '/api/funds.php';
                handleAddFunds();
            }
            break;

        case '/api/funds/withdraw':
            if ($request_method === 'POST') {
                require_once __DIR__ . '/api/funds.php';
                handleWithdraw();
            }
            break;

        case '/api/balance':
            if ($request_method === 'GET') {
                require_once __DIR__ . '/api/funds.php';
                handleGetBalance();
            }
            break;

        // User Routes
        case '/api/user/profile':
            if ($request_method === 'GET') {
                require_once __DIR__ . '/api/user.php';
                handleGetProfile();
            } elseif ($request_method === 'PUT') {
                require_once __DIR__ . '/api/user.php';
                handleUpdateProfile();
            }
            break;

        // Transactions History
        case '/api/transactions':
            if ($request_method === 'GET') {
                require_once __DIR__ . '/api/transactions.php';
                handleGetTransactions();
            }
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Server error',
        'message' => $e->getMessage()
    ]);
}
?>
