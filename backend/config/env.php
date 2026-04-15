<?php
// Load .env file
if (file_exists(__DIR__ . '/../.env')) {
    $env_file = file_get_contents(__DIR__ . '/../.env');
    $lines = explode("\n", $env_file);
    
    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line) || substr($line, 0, 1) === '#') {
            continue;
        }
        
        if (strpos($line, '=') !== false) {
            [$key, $value] = explode('=', $line, 2);
            $_ENV[trim($key)] = trim($value, '\'"');
        }
    }
}

// Default values if .env not found
defined('DB_HOST') or define('DB_HOST', $_ENV['DB_HOST'] ?? 'localhost');
defined('DB_USER') or define('DB_USER', $_ENV['DB_USER'] ?? 'root');
defined('DB_PASSWORD') or define('DB_PASSWORD', $_ENV['DB_PASSWORD'] ?? '');
defined('DB_NAME') or define('DB_NAME', $_ENV['DB_NAME'] ?? 'earning_app');

defined('JWT_SECRET') or define('JWT_SECRET', $_ENV['JWT_SECRET'] ?? 'your_secret_key');
defined('USD_TO_PKR') or define('USD_TO_PKR', floatval($_ENV['USD_TO_PKR'] ?? 278));

defined('EASYPAISA_API_KEY') or define('EASYPAISA_API_KEY', $_ENV['EASYPAISA_API_KEY'] ?? '');
defined('JAZZCASH_API_KEY') or define('JAZZCASH_API_KEY', $_ENV['JAZZCASH_API_KEY'] ?? '');

defined('APP_URL') or define('APP_URL', $_ENV['APP_URL'] ?? 'http://localhost:3000');
defined('API_URL') or define('API_URL', $_ENV['API_URL'] ?? 'http://localhost:8000');
?>
