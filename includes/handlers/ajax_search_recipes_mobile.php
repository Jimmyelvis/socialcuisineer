<?php
include("../../config/config.php");
include("../../includes/classes/User.php");
include("../../includes/classes/Post.php");


$query = $_POST['query'];
$userLoggedIn = $_POST['userLoggedIn'];




  	// $postsReturnedQuery = mysqli_query($con, "SELECT * FROM users WHERE (first_name LIKE '$names[0]%' OR last_name LIKE '$names[0]%') AND user_closed='no' LIMIT 4");

    $postsReturnedQuery = mysqli_query($con, "SELECT posts.id, posts.heading, posts.added_by, posts.image, users.username, users.first_name, users.last_name, users.profile_pic FROM posts, users WHERE posts.added_by = users.username AND posts.heading LIKE '%$query%' LIMIT 4");

    


if($query != ""){

  	while($row = mysqli_fetch_array($postsReturnedQuery)) {

      // $post_id = $row['posts.id'];
      // $post_image = $row['posts.image'];
      // $post_id = $row['posts.id'];
      // $post_id = $row['posts.id'];
      // $post_id = $row['posts.id'];

      $link = 'post.php?id=';

      echo "
        <a href='" . $link . $row['id'] . "' class='posts-entry'>
            <div class='post-pic'>
              <img src='" . $row['image'] . "'>
            </div>

            <div class='post-info'>
              <h3 class='heading-3 headline'>
                " . $row['heading'] . "
              </h3>
              <div class='userInfo'>
             
                <div class='author'>
                  <h3 class='heading-3 name'>
                    By:  " . $row['first_name'] . " " . $row['last_name'] . "
                  </h3>

                  <h3 class='heading-4 username'>
                    @" . $row['username'] . "
                  </h3>
                </div>
              </div>
            </div>


          </a>
      ";


    }

}



?>
