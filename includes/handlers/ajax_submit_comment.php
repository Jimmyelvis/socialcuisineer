<?php
require_once("../../config/config.php");
require_once("../classes/User.php");
require_once("../classes/Post.php");
require_once("../classes/Notification.php");

$post = new Post($con, $_POST['userLoggedIn']);
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request data'
    ]);
    exit;
}

$commentText = $data['commentText'] ?? '';
$postId = $data['id'] ?? '';
$userTo = $data['user_to'] ?? '';
$postAuthor = $data['post_author'] ?? '';

if (empty($commentText)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Comment text cannot be empty'
    ]);
    exit;
}

try {
    $result = $post->submitComment($postId, $userTo, $commentText);
    
    if ($result['success']) {
        // Get the newly created comment's HTML
        $commentHtml = $post->getCommentHtml($result['comment_id']);
        
        // Create notification
        if ($postAuthor != $userTo) {
            $notification = new Notification($con, $userTo);
            $notification->insertNotification($postId, $userTo, "comment");
        }
        
        echo json_encode([
            'status' => 'success',
            'message' => 'Comment added successfully',
            'data' => [
                'comment_id' => $result['comment_id'],
                'comment_html' => $commentHtml
            ]
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => $result['message'] ?? 'Error submitting comment'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}
?>
