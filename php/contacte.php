<?php
ob_start();
session_start();

error_reporting(0);
header('Content-Type: application/json');

// Carregar variables d'entorn des de .env
$env = [];
$envFile = dirname(__DIR__) . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if (strpos($line, '=') !== false) {
            [$key, $val] = explode('=', $line, 2);
            $env[trim($key)] = trim($val, "'\"");
        }
    }
}

// Funció helper per obtenir variables d'entorn
function env(string $key, string $default = ''): string {
    global $env;
    return $_ENV[$key] ?? $env[$key] ?? $default;
}

/* ==========================================================================
   CONFIGURACIÓ I SEGURETAT (Palmito House)
   ========================================================================== */
$recaptcha_secret = env('RECAPTCHA_SECRET_KEY');
$recaptcha_response = $_POST['recaptcha_response'] ?? '';

// En mode test/desenvolupament, saltar verificació reCAPTCHA
$skipRecaptcha = !$recaptcha_secret || $recaptcha_response === 'test-token';

if (!$skipRecaptcha) {
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret'   => $recaptcha_secret,
        'response' => $recaptcha_response
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo json_encode(['ok' => false, 'error' => 'Error de connexió cURL: ' . curl_error($ch)]);
        curl_close($ch);
        exit;
    }
    curl_close($ch);

    $response_keys = json_decode($response, true);

    if (!$response_keys["success"]) {
        echo json_encode(['ok' => false, 'error' => 'La verificació de seguretat ha fallat.']);
        exit;
    }
}

// 1. RATE LIMITING (Sessió)
$temps_espera = 10;
if (isset($_SESSION['last_submit_time'])) {
    $temps_transcorregut = time() - $_SESSION['last_submit_time'];
    if ($temps_transcorregut < $temps_espera) {
        $restant = $temps_espera - $temps_transcorregut;
        echo json_encode(['ok' => false, 'error' => "Has d'esperar $restant segons."]);
        exit;
    }
}

// 2. VALIDACIÓ CSRF (Stateless HMAC)
$csrf_secret = env('CSRF_TOKEN_SECRET', 'dev_palmito_house_local_2024');
$token_rebut = $_POST['csrf_token'] ?? '';

$token_avui = hash_hmac('sha256', date('Y-m-d'), $csrf_secret);
$token_ahir = hash_hmac('sha256', date('Y-m-d', strtotime("-1 day")), $csrf_secret);

if ($token_rebut !== $token_avui && $token_rebut !== $token_ahir) {
    echo json_encode(['ok' => false, 'error' => 'Validació de seguretat (CSRF) fallida.']);
    exit;
}

// 3. HONEYPOT
if (!empty($_POST['honeypot'])) {
    echo json_encode(['ok' => false, 'error' => 'Spam detectat.']);
    exit;
}

// 4. VALIDACIÓ LEGAL
if (!isset($_POST['privacy'])) {
    echo json_encode(['ok' => false, 'error' => 'Heu d\'acceptar la política de privacitat.']);
    exit;
}

// 5. SANEJAMENT DE DADES
$nombre   = htmlspecialchars(trim($_POST['name'] ?? 'Sense nom'));
$email    = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone    = htmlspecialchars(trim($_POST['phone'] ?? 'No especificat'));
$mensaje  = htmlspecialchars(trim($_POST['message'] ?? 'Sense missatge'));

// 6. VALIDACIÓ DE CAMPS CRÍTICS
if (empty($nombre) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($mensaje)) {
    echo json_encode(['ok' => false, 'error' => 'Per favor, omple tots els camps correctament.']);
    exit;
}

// 7. CONSTRUCCIÓ I ENVIAMENT (mail()
$to      = 'pau@vorastudio.cat';
$subject = 'Nou missatge de Palmito House';
$from    = 'info@palmitohouse.com';

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: ' . $from,
    'Reply-To: ' . $email,
    'Return-Path: ' . $from,
    'X-Mailer: PHP/' . phpversion(),
];

$body  = "Has rebut un nou missatge des del formulari de Palmito House:\n\n";
$body .= "Nom: $nombre\n";
$body .= "Email: $email\n";
$body .= "Telèfon: $phone\n\n";
$body .= "Missatge:\n$mensaje\n";
$body .= "\n---\nL'usuari ha acceptat expressament la política de privacitat.\n";

$sent = mail($to, $subject, $body, implode("\r\n", $headers), "-f $from");

if ($sent) {
    $_SESSION['last_submit_time'] = time();
    echo json_encode(['ok' => true, 'message' => 'Missatge enviat correctament!']);
} else {
    echo json_encode(['ok' => false, 'error' => "El missatge no s'ha pogut enviar. Intenta-ho més tard."]);
}
