<?php
require_once("../../config/config.php");
require_once("../classes/User.php");
require_once("../classes/Notification.php");
require_once("../classes/Post.php");

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request data'
    ]);
    exit;
}

$userLoggedIn = $data['userLoggedIn'] ?? '';
$postId = $data['post_id'] ?? '';

if (empty($postId)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Post ID is required'
    ]);
    exit;
}

try {
    $post = new Post($con, $userLoggedIn);
    $likes = $post->getAllLikes($postId);
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Likes retrieved successfully',
        'data' => [
            'likes' => $likes,
            'total_count' => count($likes)
        ]
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}
?>
