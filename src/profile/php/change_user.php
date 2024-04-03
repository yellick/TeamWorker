<?php
    require_once '../../php/db_connect.php';

    $id = $_POST['id'];
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $email = $_POST['email'];


    $result = $db->query("SELECT `email` FROM `users` WHERE `id` = '$id'");
    $old_email = $result->fetch_assoc()['email'];

    if ($email == $old_email) {

        // изменение записи в таблице
        $result = $db->query("UPDATE `users` SET 
            `name`='$name',
            `surname`='$surname',
            `email`='$email' 
            WHERE `id` = '$id'
        ");
        
    } else {

        // проверка: свободна ли почта?
        $result = $db->query("SELECT * FROM `users` WHERE `email` = '$email'");
        $result = $result->fetch_assoc();

        if (count($result) != 0) {

            $response = [
                "status" => false,
                "message" => "A user with such email already exists",
                "error_type" => 1
            ];

            echo json_encode($response);
            exit();

        } else {

            // изменение записи в таблице
            $result = $db->query("UPDATE `users` SET 
                `name`='$name',
                `surname`='$surname',
                `email`='$email' 
                WHERE `id` = '$id'
            ");
        }
    }


    $result = $db->query("SELECT * FROM `users` WHERE `email` = '$email' AND `id` = '$id'");
    $result = $result->fetch_assoc();

    if (count($result) != 0) {
    	$response = [
    		"status" => true,
    		"message" => "Successful"
    	];
    } else {
        $response = [
            "status" => false,
            "message" => "Unknown error",
            "error_type" => 2
        ];
    }

    
    echo json_encode($response);
    exit();
?>