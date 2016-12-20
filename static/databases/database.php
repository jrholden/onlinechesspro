<?php
/**
 * Created by PhpStorm.
 * User: Jordan
 * Date: 10/24/2016
 * Time: 6:22 PM
 */

$dbhost = "45.79.155.147";
$dbuser = "root";
$dbpass = "Google92@";
$dataBase = "ONLINE_CHESS";
$secretKey = "43432323243";
// Create connection
$conn = new mysqli($dbhost, $dbuser, $dbpass, $dataBase);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
