<?php
header('Content-Type: application/json');

require '../../config/config.php';
include("../classes/User.php");

/**
 *  Try if (isset($_POST['accept_request'])) instead to try to check for request type
 * then add $user_from as an incoming variable.
 */

$user = new User($con, $_POST['userLoggedIn']);

if (isset($_POST['accept_request'])) {

 $result = $user->processFriendRequest($_POST['user_from'], 'accept');

 if ($result) {
  echo json_encode($result);
 }

}

if (isset($_POST['ignore_request'])) {

    $result = $user->processFriendRequest($_POST['user_from'], 'ignore');

    if ($result) {
        echo json_encode($result);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to ignore friend request'
        ]);
    }   

}


?>