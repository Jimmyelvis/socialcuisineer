<?php
include("../../config/config.php");
include("../classes/User.php");
include("../classes/Post.php");
include("../classes/Notification.php");
include("../classes/GetDate.php");

// Start output buffering to prevent any unwanted output
ob_start();

$data = json_decode(file_get_contents('php://input'), true);

$userLoggedIn = $data['userLoggedIn'];
$comment_Body = $data['comment_Body'];
$commentToUser = $data['commentToUser'];
$id = $data['comment_id'];

$posts = new Post($con, $userLoggedIn);

$posts->editComment($comment_Body, $commentToUser, $id, $userLoggedIn);

// Clean any output before sending JSON
ob_clean();

// Set JSON content type
header('Content-Type: application/json');

// Return the result as JSON
echo json_encode($result);
exit;
