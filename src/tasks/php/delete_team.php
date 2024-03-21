<?php    
    require_once '../../php/db_connect.php';


    $u_id = $_POST['u_id'];
    $team_id = $_POST['team_id'];

    $user_role = $db->query("SELECT `role` FROM `team_composition` WHERE `u_id` = '$u_id' AND `team_id` = '$team_id'")->fetch_assoc()['role'];

    if ($user_role == 2) {
        
        $db->query("DELETE FROM `teams` WHERE `id` = '$team_id'");
        $db->query("DELETE FROM `team_composition` WHERE `team_id` = '$team_id'");
        $db->query("DELETE FROM `tasks` WHERE `team_id` = '$team_id'");
        $db->query("DELETE FROM `users_tasks` WHERE `team_id` = '$team_id'");

        $response = [
            'status' => true
        ];
        
    } else {
        $response = [
            'status' => false,
            'error_type' => 1
        ];
    }

    
    echo json_encode($response);
?>