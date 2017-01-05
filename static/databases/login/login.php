<?php
/**
 * Created by PhpStorm.
 * User: Jordan
 * Date: 10/24/2016
 * Time: 6:23 PM
 */
require '../jwtStuff/jwtMain.php';
include '../database.php';
$creds = json_decode(file_get_contents("php://input"), true);


$match = false;

$passWord = $creds['password'];
$userName = $creds['email'];


$token = array();


$sql = "SELECT * FROM users";
$result = $conn->query($sql);
$realUser = "";
$realPass = "";

$data = array();

if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        $realUser = $row['username'];
        $realPass = $row["password"];
        //$data[] = $row;
        //echo "Comparing: ".$realUser." To: ". $userName;
        if ($userName === $realUser && $passWord === $realPass) {

            $match = true;
            
            $tokenId = base64_encode(mcrypt_create_iv(32, MCRYPT_DEV_URANDOM));

            $token = [
                'jti' => $tokenId
            ];
            $jwt = JWT::encode(
                $token,
                $secretKey,
                'HS512'
            );

            $unencodedArray = ['jwt' => $jwt, 'user' => $userName];

            echo json_encode($unencodedArray);
        } 
        
    }
if(!$match){
    echo "failed";
}

} else {
    echo"failed";
}





