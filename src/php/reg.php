<?php   
    session_start();
    require_once 'db_connect.php';

    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $email = $_POST['email'];
    $password = md5($_POST['pass']);
    
    // check email
    $result = $db->query("SELECT * FROM `users` WHERE `email` = '$email'");
    $result = $result->fetch_assoc();

    if (count($result) != 0) {
        
        $response = [ 
            "status" => false,
            "message" => "A user with such an email already exists",
            "error_type" => 1
        ];
        
        echo json_encode($response);
        $db->close();
        exit();

    }

    // registration
    $db->query("INSERT INTO `users`(`name`, `password`, `email`, `surname`) 
    VALUES ('$name', '$password', '$email', '$surname')");

    // check registration
    $result = $db->query("SELECT * FROM `users` WHERE `email` = '$email'");
	$user = $result->fetch_assoc();
	
	if (count($user) > 0) {

		$response = [ 
            "status" => true,
            "message" => "Registration was successful"
        ];
        
		$db->close();
		echo json_encode($response);

	} else {
		
		$response = [ 
            "status" => false,
            "message" => "Registration error",
            "error_type" => 2,
            "user" => $user,
            "email" => $email
        ];
        
		$db->close();
		echo json_encode($response);

	}
?>  