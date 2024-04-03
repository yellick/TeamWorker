<?php
    require_once '../../php/db_connect.php';

    $u_id = $_POST["u_id"];
    $team_id = $_POST["team_id"];

    $u_role = $db->query("SELECT `role` FROM `team_composition` WHERE `u_id` = '$u_id' AND `team_id` = '$team_id'")->fetch_assoc()['role'];
    
    echo $u_role;
?>