<?php
// Simple router for PHP built-in server: serve static files if they exist,
// otherwise route everything to index.php.

header('X-Router: yes');
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$fullPath = __DIR__ . $path;

if ($path !== '/' && file_exists($fullPath) && !is_dir($fullPath)) {
    return false;
}

require __DIR__ . '/index.php';
