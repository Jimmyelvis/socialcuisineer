<?php
include("../../config/config.php");
include("../classes/User.php");
include("../classes/Post.php");
include("../classes/GetDate.php");



try {
    $posts = new Post($con, $_POST['userLoggedIn']);
    $result = $posts->loadHighLightPosts($_POST);
    echo json_encode($result);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error', 
        'message' => $e->getMessage()
    ]);
}   
?>
