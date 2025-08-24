<?php
include("../../config/config.php");
include("../classes/User.php");
include("../classes/GetDate.php");
include("../classes/Post.php");

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    echo json_encode([
        'status' => 'error',
        'message' => 'No data received man'
    ]);
    exit;
}

if (!isset($data['userLoggedIn'])) {
    echo json_encode([
        'status' => 'error', 
        'message' => 'No user logged in man'
    ]);
    exit;
}


$limit = 4; //Number of posts to be loaded per call
$userLoggedIn = $data['userLoggedIn'];



try {
    $posts = new Post($con, $userLoggedIn);
    $result = $posts->loadProfilePosts($data, $limit);

    echo json_encode($result);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
    exit;
}
?>
