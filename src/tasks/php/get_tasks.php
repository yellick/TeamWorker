<?php    
    require_once '../../php/db_connect.php';


    $team_id = $_POST['team_id'];
    //$team_id = 24;
    $response = [];

    $teams = $db->query("SELECT * FROM `tasks` WHERE team_id = '$team_id'");

    while($row = $teams->fetch_assoc()){
        $exe_id = $row['executor_id'];

        if ($exe_id != 0) {  

            $exec = $db->query("SELECT DISTINCT * FROM `users` WHERE `id` = '$exe_id'")->fetch_assoc();

            $row = [
                'id' => $row['id'],
                'task_text' => $row['task_text'],
                'task_status' => $row['task_status'],
                'team_id' => $row['team_id'],
                'executor_id' => $exe_id,
                'exe_name' => $exec['name'] . ' ' . $exec['surname']
            ];

        } else {
            $row = [
                'id' => $row['id'],
                'task_text' => $row['task_text'],
                'task_status' => $row['task_status'],
                'team_id' => $row['team_id'],
                'executor_id' => $exe_id,
                'exe_name' => ''
            ];
        }

        
        array_push($response, $row, "xDW8Nzmf");
    }

    echo json_encode($response);
?>