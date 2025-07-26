<?php
include("../../config/config.php");
include("../classes/User.php");
include("../classes/Notification.php");
include("../classes/Post.php");

$userLoggedIn = $_POST['userLoggedIn'];
$post_id = $_POST['post_id'];
$like_value = $_POST['like_value'];


$post = new Post($con, $userLoggedIn);
echo $post->updateLikes($post_id, $like_value);

?>
