<?php
    require_once '../../php/db_connect.php';

    $id = $_POST['id'];
    $pass = md5($_POST['pass']);


    $result = $db->query("SELECT * FROM `users` WHERE `id` = '$id' AND `password` = '$pass'")->fetch_assoc();


    if (!empty($result)){
        $response = [
            "status" => true
        ];
    } else {
        $response = [
            "status" => false,
            "error_type" => 1
        ];
    }
    
    echo json_encode($response);
    exit();
?>