<?php

	session_start();
	require_once 'db_connect.php';

	$email = $_POST['email'];
	$password = md5($_POST['pass']);

	$user = $db->query("SELECT * FROM `users` WHERE `email` = '$email' AND `password` = '$password'")->fetch_assoc();
	
	if (count($user) > 0) {

		$response = [ "status" => true ];
		$db->close();
		echo json_encode($response);

		setcookie('user', $user['id'], time() + 60*60*24*30, "/");

	} else {
		
		$response = [ "status" => false ];
		$db->close();
		echo json_encode($response);

	}
?>