<?php
$host = 'srv1924.hstgr.io';
$dbname = 'u274988421_pianotiles';
$username = 'u274988421_admin';
$password = 'TP#b)d3BN5oY0SxoKByg*tG(';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?> 