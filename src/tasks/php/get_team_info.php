<?php    
    require_once '../../php/db_connect.php';


    $team_id = $_POST['team_id'];

    $team_info = $db->query("SELECT `name`, `team_description` FROM `teams` WHERE `id` = '$team_id'")->fetch_assoc();

    $response = [
        "team_name" => $team_info['name'],
        "team_description" => $team_info['team_description']
    ];
    
    echo json_encode($response);
?>