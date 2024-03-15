<?php
	$db = new mysqli('localhost','root','','teamworker_db');
	mysqli_set_charset($db, 'utf8mb4');

    if($db->connect_error){
        die("Ошибка: " . $db->connect_error);
    }
?>