<?php
/**
 * Created by PhpStorm.
 * User: Jordan
 * Date: 10/27/2016
 * Time: 2:37 PM
 */
require '../jwtStuff/jwtMain.php';
include '../database.php';
$creds = json_decode(file_get_contents("php://input"), true);
$secretKey = "43432323243";
$jwt = $creds['toke'];


if ($jwt) {
    try {
        /*
         * decode the jwt using the key from config
         */

        $token = JWT::decode($jwt, $secretKey, array('HS512'));

        echo true;



    } catch (Exception $e) {
        header('HTTP/1.0 401 Unauthorized');
        echo false;

    }
}else {
    /*
     * No token was able to be extracted from the authorization header
     */
    header('HTTP/1.0 400 Bad Request');
    echo false;
}
$conn->close();

