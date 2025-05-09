<?php
session_start();

// Import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Database configuration
$host = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'myproject';
$conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the signup form was submitted
if (isset($_POST['signup'])) {
    // Get and sanitize form inputs
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    // Basic validation
    if (empty($username) || empty($email) || empty($password)) {
        $error = "All fields are required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email format.";
    } else {
        // Check if username or email already exists
        $stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
        $stmt->bind_param("ss", $username, $email);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $error = "Username or email already in use.";
        } else {
            // Generate a 6-digit verification code
            $verificationCode = rand(100000, 999999);  // e.g. 123456 :contentReference[oaicite:10]{index=10}

            // Hash the password securely
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);  // bcrypt by default:contentReference[oaicite:11]{index=11}

            // Insert new user with is_verified=0
            $insert = $conn->prepare("INSERT INTO users (username, email, password, verification_code, is_verified) VALUES (?, ?, ?, ?, 0)");
            $insert->bind_param("ssss", $username, $email, $passwordHash, $verificationCode);
            if ($insert->execute()) {
                // Send verification code via email

                $mail = new PHPMailer(true);
                try {
                    // Server settings for Gmail SMTP
                    $mail->isSMTP();
                    $mail->Host       = 'smtp.gmail.com';
                    $mail->SMTPAuth   = true;
                    $mail->Username   = 'alhas.work.25@gmail.com';        // TODO: replace with your Gmail
                    $mail->Password   = 'wfpw brwi hyzd fzjh';         // TODO: replace with your Gmail password or App Password
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                    $mail->Port       = 587;

                    // Sender and recipient
                    $mail->setFrom('alhas.work.25@gmail.com', 'New Jersey Int.');
                    $mail->addAddress($email, $username);

                    // Email content
                    $mail->isHTML(false);
                    $mail->Subject = 'Email Verification';
                    $mail->Body    = "Hello $username,\n\nYour verification code is: $verificationCode";
                    $mail->SMTPOptions = [
                    'ssl' => [
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                        'allow_self_signed' => true,
                        ]
                    ];

                    $mail->send();
                    // On success, save email in session and redirect to verification page
                    $_SESSION['temp_email'] = $email;
                    header('Location: verify.php');
                    exit();
                } catch (Exception $e) {
                    $error = "Failed to send verification email. Mailer Error: " . $mail->ErrorInfo;
                }
            } else {
                $error = "Database error: Unable to register.";
            }
        }
        $stmt->close();
    }
    $conn->close();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Sign Up</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<div class="container">
    <h2>Sign Up</h2>
    <?php if (isset($error)): ?>
        <p class="error"><?= $error ?></p>
    <?php endif; ?>
    <form method="post" action="">
        <label>Username:</label>
        <input type="text" name="username" required>

        <label>Email:</label>
        <input type="email" name="email" required>

        <label>Password:</label>
        <input type="password" name="password" required>

        <button type="submit" name="signup">Sign Up</button>
    </form>
    <p>Already have an account? <a href="login.php">Log in here</a>.</p>
</div>
</body>
</html>
