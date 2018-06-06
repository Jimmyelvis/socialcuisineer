<?php

include("includes/header.php");


if (isset($_GET['id'])) {
    $id = $_GET['id'];
} else {
    $id = 0;
}

 ?>

 <div class="container">

   <div class="user_details">

       <?php
       include("includes/user-header.php");
       ?>

   </div>

   <div class="user_details_left_right column col-md-3">

     <?php
     include("includes/sidebar-left.php");
     ?>

   </div>


  <div class="index_column">

    <div class="container">

        <div class="posts_area">

          <?php
                     $post = new Post($con, $userLoggedIn);
                     $post->getSinglePost($id);
                 ?>

        </div>

    </div>

  </div>




 </div>
