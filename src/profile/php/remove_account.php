<?php
    require_once '../../php/db_connect.php';

    $id = $_POST['id'];

    $db->query("DELETE FROM `users` WHERE `id` = '$id'");
    $db->query("SELECT * FROM `team_composition` WHERE `u_id` = '$id'");
    $db->query("DELETE FROM `users_tasks` WHERE `u_id` = '$id'");

	setcookie('user', "0", time(), "/");

    echo true;
?>