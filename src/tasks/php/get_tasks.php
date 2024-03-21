<?php    
    require_once '../../php/db_connect.php';


    $team_id = $_POST['team_id'];
    //$team_id = 24;
    $response = [];

    $teams = $db->query("SELECT * FROM `tasks` WHERE team_id = '$team_id'");

    while($row = $teams->fetch_assoc()){
        array_push($response, $row, "xDW8Nzmf");
    }

    echo json_encode($response);
    
?>