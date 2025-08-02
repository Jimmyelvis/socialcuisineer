<?php
header('Content-Type: application/json');

require '../../config/config.php';
include("../classes/User.php");
include("../classes/Post.php");

// Make sure we have a logged in user
if (!isset($_SESSION['username'])) {
  echo json_encode([
    'status' => 'error',
    'message' => 'User not logged in'
  ]);
  exit;
}

$userLoggedIn = $_SESSION['username'];
$posts = new Post($con, $userLoggedIn);

// Check if post_id is set in the request
if (isset($_POST['post_id'])) {
  $post_id = $_POST['post_id'];
  
  // Call the deletePost method and get the result
  $result = $posts->deletePost($post_id);
  
  if ($result) {
    echo json_encode([
      'status' => 'success',
      'message' => 'Post deleted successfully'
    ]);
  } else {
    echo json_encode([
      'status' => 'error',
      'message' => 'Failed to delete post'
    ]);
  }
} else {
  echo json_encode([
    'status' => 'error',
    'message' => 'No post ID provided'
  ]);
}
