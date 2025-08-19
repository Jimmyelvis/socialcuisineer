<?php
include("../../config/config.php");
include("../classes/User.php");
include("../classes/GetDate.php");
include("../classes/Post.php");

header('Content-Type: application/json');

if (!isset($_POST['userLoggedIn'])) {
    echo json_encode([
        'status' => 'error', 
        'message' => 'No user logged in'
    ]);
    exit;
}


$limit = 10; //Number of posts to be loaded per call

$posts = new Post($con, $_REQUEST['userLoggedIn']);

try {
    $result = $posts->loadPostsFriends($_POST, $limit);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
    exit;
}
?>
