<?php    
    require_once '../../php/db_connect.php';


    $team_id = $_POST['team_id'];
    //$team_id = 24;
    $response = [];

    $teams = $db->query("SELECT users.name, users.surname, users.id, team_composition.role FROM `team_composition`
	                        INNER JOIN users ON team_composition.u_id = users.id
                            WHERE team_id = '$team_id'");

    while($row = $teams->fetch_assoc()){
        $row = [
            'name' => $row['name'],
            'surname' => $row['surname'],
            'id' => $row['id'],
            'role' => $row['role']
        ];
        array_push($response, $row, "xDW8Nzmf");
    }

    echo json_encode($response);
    
?>