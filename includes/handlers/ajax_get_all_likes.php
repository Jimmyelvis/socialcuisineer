<?php
include("../../config/config.php");
include("../classes/User.php");
include("../classes/Notification.php");
include("../classes/Post.php");

$userLoggedIn = $_GET['userLoggedIn'];
$post_id = $_GET['post_id'];


$post = new Post($con, $userLoggedIn);
echo $post->getAllLikes($post_id);

?>
