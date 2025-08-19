<?php
include("../../config/config.php");
include("../classes/User.php");
include("../classes/Notification.php");
include("../classes/Post.php");

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request data'
    ]);
    exit;
}

$post_id = $data['post_id'];
$like_value = $data['like_value'];
$userLoggedIn = $data['userLoggedIn'];

if (empty($post_id) || empty($like_value)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Post ID and like value are required'
    ]);
    exit;
}

try {
    $post = new Post($con, $userLoggedIn);
    $result = $post->updateLikes($post_id, $like_value);
    
    echo json_encode($result);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}

?>
