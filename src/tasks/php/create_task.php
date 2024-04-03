<?php    
    require_once '../../php/db_connect.php';


    $u_id = $_POST['u_id'];
    $team_id = $_POST['team_id'];
    $tt = $_POST['tt'];

    $db->query("INSERT INTO `tasks`(`task_text`, `task_status`, `team_id`, `executor_id`) 
                    VALUES ('$tt', 0, '$team_id', '$u_id')");
    
    echo true;
?>