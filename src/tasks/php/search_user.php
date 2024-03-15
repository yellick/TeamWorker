<?php
    require_once '../../php/db_connect.php';

    $u_id = $_POST['u_id'];
    $team_id = $_POST['team_id'];


    // поиск человека
    $user = $db->query("SELECT * FROM `users` WHERE `id` = '$u_id'")->fetch_assoc();

    if (count($user) > 0) {

		$response = [
            "status" => true,
            "user_id" => $user['id'],
            "user_name" => $user["name"] . " " . $user["surname"]
        ];

	} else {
		
		$response = [
            "status" => false,
            "error_code" => 1
        ];
		$db->close();
        echo json_encode($response);
        exit;

	}

    
    // проверка на наличие человека в команде
    $result = $db->query("SELECT * FROM `team_composition` WHERE `team_id` = '$team_id' AND `u_id` = '$u_id'")->fetch_assoc();
    if (!empty($result)) {
        $response = [
            "status" => false,
            "error_code" => 2
        ];
    }

    
	$db->close();
    echo json_encode($response);
    
?>