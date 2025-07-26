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

$commentId = $data['comment_id'] ?? '';
$commentBody = $data['comment_Body'] ?? '';
$commentToUser = $data['commentToUser'] ?? '';
$userLoggedIn = $data['userLoggedIn'] ?? '';

if (empty($commentId) || empty($commentBody)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing required fields'
    ]);
    exit;
}

try {
    $result = $post->editComment($commentId, $commentBody, $userLoggedIn);
    
    if ($result['success']) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Comment updated successfully',
            'data' => [
                'comment_id' => $commentId,
                'comment_body' => $commentBody,
                'updated_at' => date('Y-m-d H:i:s')
            ]
        ]);
        
        // Create notification for comment edit if needed
        if ($userLoggedIn != $commentToUser) {
            $notification = new Notification($con, $commentToUser);
            $notification->insertNotification($commentId, $commentToUser, "comment_edited");
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => $result['message'] ?? 'Error updating comment'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}
?>
