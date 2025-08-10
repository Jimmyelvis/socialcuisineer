<?php

require '../../config/config.php';
include("../classes/User.php");
include("../classes/Post.php");

// Start output buffering to prevent any unwanted output
ob_start();

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
$commentToUser = $data['commentToUser'] ?? '';
$userLoggedIn = $data['userLoggedIn'] ?? '';

if (empty($commentId) || empty($commentToUser) || empty($userLoggedIn)) {
    ob_clean();
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing required fields: ' . 
                    (empty($commentId) ? 'comment_id ' : '') . 
                    (empty($commentToUser) ? 'commentToUser ' : '') . 
                    (empty($userLoggedIn) ? 'userLoggedIn' : '')
    ]);
    exit;
}


$post = new Post($con, $userLoggedIn);

// Create the data array expected by the deleteComment method
$commentData = [
  'comment_id' => $commentId,
  'userLoggedIn' => $userLoggedIn,
];

try {
$result = $post->deleteComment($commentData);

   // Clean any output before sending JSON
   ob_clean();
   header('Content-Type: application/json');
   
   if ($result['status'] === 'success') {
       echo json_encode([
           'status' => 'success',
           'message' => 'Comment deleted successfully'
       ]);
   }

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
