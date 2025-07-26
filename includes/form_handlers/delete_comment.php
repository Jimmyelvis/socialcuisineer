<?php

require '../../config/config.php';
include("../classes/User.php");
include("../classes/Post.php");

$posts = new Post($con, $_REQUEST['userLoggedIn']);


if (isset($_POST['delete_comment'])) {

  $posts->deleteComment($_REQUEST);
}



 ?>
