<?php    
    require_once '../../php/db_connect.php';


    $task_id = $_POST['task_id'];
    
    $db->query("UPDATE `tasks` SET `task_status` = 1 WHERE `id` = '$task_id'");
    
    echo true;
?>