<?php
    require_once '../../php/db_connect.php';

	$name = $_POST['name'];
    $description = $_POST['description'];
    $author_id = $_POST['author_id'];


    // Добавление команды и её создателя в таблицы
    $db->query("INSERT INTO `teams`(`name`, `team_description`) VALUES ('$name', '$description')");

    $team_id = mysqli_insert_id($db);

    $db->query("INSERT INTO `team_composition`(`team_id`, `u_id`, `role`) VALUES ('$team_id', '$author_id', '2')");

    if (empty($name)) {
        $db->query("UPDATE `teams` SET `name` = '$team_id' WHERE `teams`.`id` = '$team_id'"); 
    }


    // Проверка добавления
    $team = $db->query("SELECT * FROM `teams` WHERE id = '$team_id'")->fetch_assoc();

    if (!empty($team)) {
        $response = [
            "status" => true,
            "message" => "successful"
        ];
    } else {
        $response = [
            "status" => false,
            "message" => "error",
            "message_type" => 1
        ];
    }

    echo json_encode($response);

    $db->close();
    exit();
?>