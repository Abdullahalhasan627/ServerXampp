<?php
session_start();
if (isset($_SESSION['user_id'])) {
    // Already logged in
    header("Location: dashboard.php");
    exit();
}

if (isset($_POST['login'])) {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    if (empty($email) || empty($password)) {
        $error = "Please enter both email and password.";
    } else {
        // Connect to database
        $conn = new mysqli('localhost', 'root', '', 'myproject');
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        // Look up user by email
        $stmt = $conn->prepare("SELECT id, username, password, is_verified FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($id, $username, $hash, $is_verified);
        if ($stmt->fetch()) {
            if (!$is_verified) {
                $error = "Please verify your email before logging in.";
            } elseif (password_verify($password, $hash)) {
                // Password correct
                $_SESSION['user_id'] = $id;
                $_SESSION['username'] = $username;
                header("Location: dashboard.php");
                exit();
            } else {
                $error = "Incorrect password.";
            }
        } else {
            $error = "No account found with that email.";
        }
        $stmt->close();
        $conn->close();
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<div class="container">
    <h2>Login</h2>
    <?php if (isset($error)): ?>
        <p class="error"><?= $error ?></p>
    <?php endif; ?>
    <form method="post" action="">
        <label>Email:</label>
        <input type="email" name="email" required>

        <label>Password:</label>
        <input type="password" name="password" required>

        <button type="submit" name="login">Log In</button>
    </form>
    <p>Don't have an account? <a href="signup.php">Sign up here</a>.</p>
</div>
</body>
</html>
