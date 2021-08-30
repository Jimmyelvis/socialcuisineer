<?php
include("../../config/config.php");
include("../classes/User.php");
include("../classes/Post.php");


$posts = new Post($con, $_REQUEST['userLoggedIn']);
$posts->loadAllPosts($_REQUEST);
?>
