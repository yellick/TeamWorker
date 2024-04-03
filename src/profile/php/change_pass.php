<?php
    require_once '../../php/db_connect.php';

    $id = $_POST['id'];
    $pass = md5($_POST['pass']);
    $new_pass = md5($_POST['new_pass']);

    $user = $db->query("SELECT * FROM `users` WHERE `id` = '$id' AND `password` = '$pass'")->fetch_assoc();

    if (empty($user)) {
        $response = [
            "status" => false,
            "error_type" => 1
        ];

    } else {
        
        $db->query("UPDATE `users` SET `password` = '$new_pass' WHERE `users`.`id` = $id");
        
        $password = $db->query("SELECT `password` FROM `users` WHERE `id` = '$id'")->fetch_assoc()['password'];

        if ($password == $new_pass) {
            $response = [
                "status" => true,
            ];
        } else {
            $response = [
                "status" => false,
                "error_type" => 2
            ];
        }
    }
    
    echo json_encode($response);
    exit();
?>