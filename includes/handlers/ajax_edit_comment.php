<?php
require_once("../../config/config.php");
require_once("../classes/User.php");
require_once("../classes/Post.php");
require_once("../classes/Notification.php");
include("../classes/GetDate.php");

// Start output buffering to prevent any unwanted output
ob_start();

// Ensure this is only processed for POST requests with JSON content
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || 
    !isset($_SERVER['CONTENT_TYPE']) || 
    strpos($_SERVER['CONTENT_TYPE'], 'application/json') === false) {
    ob_clean();
    header('HTTP/1.1 400 Bad Request');
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method or content type']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    ob_clean();
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid JSON data'
    ]);
    exit;
}

$commentId = $data['comment_id'] ?? '';
$commentBody = $data['comment_Body'] ?? '';
$commentToUser = $data['commentToUser'] ?? '';
$userLoggedIn = $data['userLoggedIn'] ?? '';

if (empty($commentId) || empty($commentBody) || empty($userLoggedIn)) {
    ob_clean();
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing required fields: ' . 
                    (empty($commentId) ? 'comment_id ' : '') . 
                    (empty($commentBody) ? 'comment_Body ' : '') . 
                    (empty($userLoggedIn) ? 'userLoggedIn' : '')
    ]);
    exit;
}

$post = new Post($con, $userLoggedIn);

// Create the data array expected by the editComment method
$commentData = [
    'comment_Body' => $commentBody,
    'commentToUser' => $commentToUser,
    'comment_id' => $commentId,
    'userLoggedIn' => $userLoggedIn,
    'post_id' => $data['post_id'] ?? 0 // This might need to be fetched from the database if not provided
];

// Get the post_id if not provided
if (empty($commentData['post_id'])) {
    $query = mysqli_query($con, "SELECT post_id FROM comments WHERE id = '$commentId' LIMIT 1");
    if ($query && $row = mysqli_fetch_array($query)) {
        $commentData['post_id'] = $row['post_id'];
    }
}

try {
    $result = $post->editComment($commentData);
    
    // Clean any output before sending JSON
    ob_clean();
    header('Content-Type: application/json');
    
    if ($result['status'] === 'success') {
        // Create notification for comment edit if needed
        if ($userLoggedIn != $commentToUser) {
            $notification = new Notification($con, $commentToUser);
            $notification->insertNotification($commentId, $commentToUser, "comment_edited");
        }
    }
    
    // Return the result from editComment
    echo json_encode($result);
    
} catch (Exception $e) {
    ob_clean();
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'error',
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}

exit;
?>
