<?php    
    require_once '../../php/db_connect.php';


    $u_id = $_POST['u_id'];
    $team_id = $_POST['team_id'];

    $user_role = $db->query("SELECT `role` FROM `team_composition` WHERE `u_id` = '$u_id' AND `team_id` = '$team_id'")->fetch_assoc()['role'];

    if ($user_role != 0) {
        $ti = $_POST["ti"];
        $tt = $_POST["tt"];
        $te = $_POST["te"];
        
        $db->query("UPDATE `tasks` SET `task_text`= '$tt', `executor_id` = '$te' WHERE `id` = '$ti'");

        $response = [
            'status' => true,
            'ti' => $ti,
            'tt' => $tt,
            'te' => $te
        ];
        
    } else {
        $response = [
            'status' => false,
            'error_type' => 1
        ];
    }

    
    echo json_encode($response);
?>