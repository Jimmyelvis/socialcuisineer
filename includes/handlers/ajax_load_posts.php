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

$limit = 10; // Number of posts to be loaded per call
$userLoggedIn = $_POST['userLoggedIn'];
$page = isset($_POST['page']) ? (int)$_POST['page'] : 1;

try {
    $posts = new Post($con, $userLoggedIn);
    $result = $posts->loadPostsFriends(['page' => $page], $limit);
    
    // Just pass through the result directly - it already has the correct structure
    echo json_encode($result);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error', 
        'message' => $e->getMessage()
    ]);
}
