<?php
    require_once '../../php/db_connect.php';

    $u_id = $_POST["u_id"];
    $team_id = $_POST["team_id"];

    $db->query("DELETE FROM `team_composition` WHERE `u_id` = '$u_id' AND `team_id` = '$team_id'");
    
    echo true;
?>