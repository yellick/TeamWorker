<?php    
    require_once '../../php/db_connect.php';


    $u_id = $_POST['u_id'];
    $response = [];

    $teams = $db->query("SELECT teams.id, name FROM `teams`
                            INNER JOIN team_composition ON teams.id = team_composition.team_id
                            WHERE team_composition.u_id = '$u_id'");

    while($row = $teams->fetch_assoc()){
        $count_users = $db->query("SELECT COUNT(id) FROM `team_composition` WHERE team_id = '$row[id]'")->fetch_assoc();
        $row = [
            "id" => $row['id'],
            "name" => $row['name'],
            "count_users" => $count_users['COUNT(id)']
        ];
        array_push($response, $row, "xDW8Nzmf");
    }

    echo json_encode($response);
?>