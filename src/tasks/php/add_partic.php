<?php
    require_once '../../php/db_connect.php';

    
    $u_id = $_POST['u_id'];
    $team_id = $_POST['team_id'];
    $role = $_POST['role'];


    // добавление
    $db->query("INSERT INTO `team_composition`(`team_id`, `u_id`, `role`) VALUES ('$team_id', '$u_id', '$role')");

    echo true;
?>