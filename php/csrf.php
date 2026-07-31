<?php
/*
 * CSRF Token Generator (stateless HMAC)
 * Crida des de JS al load del formulari.
 * El mateix secret s'usa a contacte.php per validar.
 */

session_start();
header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate');

// Llegir el CSRF secret des de .env
$secret = '';
$envFile = dirname(__DIR__) . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if (strpos($line, 'CSRF_TOKEN_SECRET=') === 0) {
            $secret = trim(substr($line, strlen('CSRF_TOKEN_SECRET=')), "'\"");
            break;
        }
    }
}

// Fallback per a desenvolupament local
if (!$secret) {
    $secret = 'dev_palmito_house_local_2024';
}

$today = date('Y-m-d');
$token = hash_hmac('sha256', $today, $secret);

echo json_encode(['ok' => true, 'token' => $token]);
