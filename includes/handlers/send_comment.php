<?php

require_once("../../config/config.php");
require_once("../classes/User.php");
require_once("../classes/Post.php");
require_once("../classes/Notification.php");
include("../classes/GetDate.php");


// Start output buffering to prevent any unwanted output
ob_start();

$data = json_decode(file_get_contents('php://input'), true);

$userLoggedIn = $data['userLoggedIn'];
$commentText = $data['commentText'];
$id = $data['id'];

$get_added_by = mysqli_query($con, "SELECT added_by, user_to FROM posts WHERE id='$id'");

$find_users = mysqli_fetch_array($get_added_by);
$post_author = $find_users['added_by'];
$user_to = $find_users['user_to'];

$post = new Post($con, $userLoggedIn);
$result = $post->sendComment($post_author, $commentText, $id, $user_to);

// Clean any output before sending JSON
ob_clean();

// Set JSON content type
header('Content-Type: application/json');

// Return the result as JSON
echo json_encode($result);
exit;
