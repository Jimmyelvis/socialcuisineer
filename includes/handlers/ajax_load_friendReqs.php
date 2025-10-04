<?php
include("../../config/config.php");
include("../classes/User.php");

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    echo json_encode([
        'status' => 'error',
        'message' => 'No data received'
    ]);
    exit;
}

// // Set default values if not provided
// if (!isset($data['page'])) {
//     $data['page'] = 1;
// }

// $limit = 7; //Number of messages to load

if (!isset($data['user'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'User not provided'
    ]);
    exit;
}

// if(isset($data['userFrom'])) {
//     $user_from = $data['userFrom'];
  
// }

$userLoggedIn = $data['user'];

try {
    $friendReqUser = new User($con, $userLoggedIn);

    if(isset($data['userFrom'])) {
        $user_from = $data['userFrom'];
       $results = $friendReqUser->getSingleFriendRequestFromUser($user_from);
    } else{
        $results = $friendReqUser->getFriendsRequests();
    }

    
    
    echo json_encode($results);
    
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}

?>
