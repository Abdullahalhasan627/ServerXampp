<?php
session_start();
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// الاتصال بقاعدة البيانات
$conn = new mysqli("localhost", "root", "", "myproject");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$error = '';
$success = '';

if (isset($_POST['verify'])) {
    $code = trim($_POST['code']);
    $email = $_SESSION['temp_email'] ?? null;

    if (!$email) {
        $error = "Session expired. Please register again.";
    } else {
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ? AND verification_code = ? AND is_verified = 0");
        $stmt->bind_param("ss", $email, $code);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows == 1) {
            $update = $conn->prepare("UPDATE users SET is_verified = 1 WHERE email = ?");
            $update->bind_param("s", $email);
            $update->execute();
            $success = "Account verified successfully! You can now log in.";
            unset($_SESSION['temp_email']);
        } else {
            $error = "Invalid verification code.";
        }
    }
}

// === إعادة إرسال الكود الجديد مع تأخير ===
if (isset($_POST['resend'])) {
    $email = $_SESSION['temp_email'] ?? null;

    if (!$email) {
        $error = "Session expired. Please register again.";
    } elseif (isset($_SESSION['last_resend_time']) && time() - $_SESSION['last_resend_time'] < 30) {
        $error = "Please wait before requesting another code.";
    } else {
        $stmt = $conn->prepare("SELECT username FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($username);
        if ($stmt->fetch()) {
            $newCode = rand(100000, 999999);
            $updateCode = $conn->prepare("UPDATE users SET verification_code = ? WHERE email = ?");
            $updateCode->bind_param("ss", $newCode, $email);
            $updateCode->execute();

            // إرسال الكود الجديد
            $mail = new PHPMailer(true);
            try {
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->Username = 'alhas.work.25@gmail.com';
                $mail->Password = 'tnxk pawt etny pxuj';
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;

                $mail->setFrom('alhas.work.25@gmail.com', 'New Jersey Int.');
                $mail->addAddress($email, $username);
                $mail->isHTML(false);
                $mail->Subject = 'New Verification Code';
                $mail->Body = "Hello $username,\n\nYour new verification code is: $newCode";
                $mail->SMTPOptions = [
                    'ssl' => [
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                        'allow_self_signed' => true,
                    ]
                ];
                $mail->send();
                $success = "A new verification code has been sent to your email.";
                $_SESSION['last_resend_time'] = time();
            } catch (Exception $e) {
                $error = "Mailer Error: " . $mail->ErrorInfo;
            }
        } else {
            $error = "Email not found.";
        }
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Email Verification</title>
    <link rel="stylesheet" href="Backend/assets/css/style-index.css">
</head>
<body>
<div class="container">
    <h2>Email Verification</h2>
    <?php if (!empty($error)): ?>
        <p class="error"><?= $error ?></p>
    <?php elseif (!empty($success)): ?>
        <p class="success"><?= $success ?></p>
    <?php endif; ?>
    <form method="post" action="">
        <label>Enter verification code:</label>
        <input type="text" name="code" required>
        <button type="submit" name="verify">Verify</button>
    </form>

    <!-- زر إعادة إرسال الكود -->
    <form method="post" action="" style="margin-top: 10px;">
        <button type="submit" name="resend">Resend Verification Code</button>
    </form>
</div>
</body>
</html>
