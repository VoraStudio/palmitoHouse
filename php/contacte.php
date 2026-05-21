<?php
ob_start();
session_start();

// Carreguem l'autoload de Composer
require_once dirname(__DIR__) . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

// Carreguem les variables d'entorn
$dotenv = Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

error_reporting(0);
header('Content-Type: application/json');

/* ==========================================================================
   CONFIGURACIÓ I SEGURETAT (Palmito House)
   ========================================================================== */
$recaptcha_secret = $_ENV['RECAPTCHA_SECRET_KEY'] ?? '';
$recaptcha_response = $_POST['recaptcha_response'] ?? '';

$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = [
    'secret'   => $recaptcha_secret,
    'response' => $recaptcha_response
];

// Verificació amb cURL (més robust que file_get_contents)
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
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
$csrf_secret = $_ENV['CSRF_TOKEN_SECRET'] ?? '';
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

// 7. CONSTRUCCIÓ I ENVIAMENT AMB PHPMAILER
$mail = new PHPMailer(true);

try {
    // Configuració del servidor
    $mail->isSMTP();
    $mail->Host       = $_ENV['SMTP_HOST'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $_ENV['SMTP_USER'];
    $mail->Password   = $_ENV['SMTP_PASS'];
    $mail->SMTPSecure = $_ENV['SMTP_ENCRYPTION'] === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $_ENV['SMTP_PORT'];
    $mail->CharSet    = 'UTF-8';

    // Destinataris
    $mail->setFrom($_ENV['SMTP_USER'], 'Palmito House Web');
    $mail->addAddress($_ENV['SMTP_USER']);
    $mail->addReplyTo($email, $nombre);

    // Contingut
    $mail->isHTML(false);
    $mail->Subject = 'Nou missatge des de Palmito House';

    $contenido = "Has rebut un nou missatge des del formulari de Palmito House:\n\n";
    $contenido .= "Nom: $nombre\n";
    $contenido .= "Email: $email\n";
    $contenido .= "Telèfon: $phone\n\n";
    $contenido .= "Missatge:\n$mensaje\n";
    $contenido .= "\n---\nL'usuari ha acceptat expressament la política de privacitat.\n";

    $mail->Body = $contenido;

    $mail->send();

    $_SESSION['last_submit_time'] = time();
    echo json_encode(['ok' => true, 'message' => 'Missatge enviat correctament!']);

} catch (Exception $e) {
    echo json_encode(['ok' => false, 'error' => "El missatge no s'ha pogut enviar. Error: {$mail->ErrorInfo}"]);
}
