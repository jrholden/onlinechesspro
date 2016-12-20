<?php
/**
 * Created by PhpStorm.
 * User: Jordan
 * Date: 10/24/2016
 * Time: 6:25 PM
 */
require '../jwtStuff/jwtMain.php';
include '../database.php';

$creds = json_decode(file_get_contents("php://input"), true);
$token = array();

$username = $conn->real_escape_string($creds['username']);
$password = $conn->real_escape_string($creds['password']);

$sql = "INSERT INTO users " .
    "(password, username)" .
    "VALUES" .
    "('$password', '$username')";

$retval = mysqli_query($conn, $sql);

if (!$retval) {
    echo "Failed adding user to DB";
}else {
    $tokenId = base64_encode(mcrypt_create_iv(32, MCRYPT_DEV_URANDOM));

    $token = [
        'jti' => $tokenId
    ];
    $jwt = JWT::encode(
        $token,
        $secretKey,
        'HS512'
    );

    $unencodedArray = ['jwt' => $jwt];

    echo json_encode($unencodedArray);
}