<?php
session_start();
// Require login
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$userId = $_SESSION['user_id'];
$username = $_SESSION['username'];

// Database connection
$conn = new mysqli('localhost', 'root', '', 'myproject');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch current email from users table
$stmt = $conn->prepare("SELECT email FROM users WHERE id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$stmt->bind_result($currentEmail);
$stmt->fetch();
$stmt->close();

// Fetch profile data if exists
$stmt = $conn->prepare("SELECT name, age, client, address, work FROM profiles WHERE user_id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$stmt->bind_result($name, $age, $client, $address, $work);
$hasProfile = $stmt->fetch();
$stmt->close();

// Initialize variables
$name = $hasProfile ? $name : "";
$age = $hasProfile ? $age : "";
$client = $hasProfile ? $client : "";
$address = $hasProfile ? $address : "";
$work = $hasProfile ? $work : "";

// Handle form submission
if (isset($_POST['submit'])) {
    // Get POST data
    $newName = trim($_POST['name']);
    $newAge = trim($_POST['age']);
    $newEmail = trim($_POST['email']);
    $newPassword = $_POST['password'];
    $newClient = trim($_POST['client']);
    $newAddress = trim($_POST['address']);
    $newWork = trim($_POST['work']);

    // Update email if changed
    if ($newEmail !== $currentEmail) {
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
        $stmt->bind_param("si", $newEmail, $userId);
        $stmt->execute();
        if ($stmt->fetch()) {
            $updateError = "Email is already taken by another account.";
        } else {
            $stmt->close();
            $stmt = $conn->prepare("UPDATE users SET email = ? WHERE id = ?");
            $stmt->bind_param("si", $newEmail, $userId);
            $stmt->execute();
            $stmt->close();
            $currentEmail = $newEmail;
        }
    }

    // Update password if provided
    if (!empty($newPassword)) {
        $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
        $stmt->bind_param("si", $newPasswordHash, $userId);
        $stmt->execute();
        $stmt->close();
    }

    // Insert or update profile data
    if ($hasProfile) {
        $stmt = $conn->prepare("UPDATE profiles SET name = ?, age = ?, client = ?, address = ?, work = ? WHERE user_id = ?");
        $stmt->bind_param("sisssi", $newName, $newAge, $newClient, $newAddress, $newWork, $userId);
    } else {
        $stmt = $conn->prepare("INSERT INTO profiles (name, age, client, address, work, user_id) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sisssi", $newName, $newAge, $newClient, $newAddress, $newWork, $userId);
    }
    $stmt->execute();
    $stmt->close();
    $success = "Profile updated successfully.";

    // Update variables for display
    $name = $newName;
    $age = $newAge;
    $client = $newClient;
    $address = $newAddress;
    $work = $newWork;
    $hasProfile = true;
}
$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="container">
    <h2>Welcome, <?= htmlspecialchars($username) ?></h2>
    <p><a href="logout.php">Logout</a></p>

    <?php if (isset($updateError)): ?>
        <p class="error"><?= $updateError ?></p>
    <?php elseif (isset($success)): ?>
        <p class="success"><?= $success ?></p>
    <?php endif; ?>

    <form method="post" action="">
        <table class="table">
            <tr>
                <th>Name</th>
                <td><input type="text" name="name" value="<?= htmlspecialchars($name) ?>"></td>
            </tr>
            <tr>
                <th>Age</th>
                <td><input type="number" name="age" value="<?= htmlspecialchars($age) ?>"></td>
            </tr>
            <tr>
                <th>Email</th>
                <td><input type="email" name="email" value="<?= htmlspecialchars($currentEmail) ?>" required></td>
            </tr>
            <tr>
                <th>New Password</th>
                <td><input type="password" name="password" placeholder="(leave blank to keep current)"></td>
            </tr>
            <tr>
                <th>Client</th>
                <td><input type="text" name="client" value="<?= htmlspecialchars($client) ?>"></td>
            </tr>
            <tr>
                <th>Address</th>
                <td><input type="text" name="address" value="<?= htmlspecialchars($address) ?>"></td>
            </tr>
            <tr>
                <th>Work</th>
                <td><input type="text" name="work" value="<?= htmlspecialchars($work) ?>"></td>
            </tr>
            <tr>
                <td colspan="2">
                    <button type="submit" name="submit">Save Profile</button>
                </td>
            </tr>
        </table>
    </form>
</div>
</body>
</html>
