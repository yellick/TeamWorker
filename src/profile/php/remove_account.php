<?php
    require_once '../../php/db_connect.php';

    $id = $_POST['id'];

    $db->query("DELETE FROM `users` WHERE `id` = '$id'");
    $db->query("DELETE FROM `team_composition` WHERE `u_id` = '$id'");

    $teams = $db->query("SELECT `team_id` FROM `team_composition` WHERE `u_id` = $id AND `role` = 2");

    if (!empty($teams)) {
        while($row = $teams->fetch_assoc()){
            $team_id = $row['team_id'];
            $db->query("DELETE FROM `teams` WHERE `id` = '$team_id'");
            $db->query("DELETE FROM `team_composition` WHERE `team_id` = '$team_id'");
        }
    }

	setcookie('user', "0", time(), "/");

    echo true;
?>