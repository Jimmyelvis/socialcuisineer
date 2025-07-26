<?php

require '../../config/config.php';
include("../classes/User.php");
include("../classes/Post.php");

$posts = new Post($con, $_REQUEST['userLoggedIn']);


if (isset($_POST['delete_post'])) {

  $posts->deletePost($_REQUEST);
}
