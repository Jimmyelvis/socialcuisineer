<html>

<head>
  <title></title>
  <!-- <link rel="stylesheet" type="text/css" href="assets/css/style.css"> -->
  <link rel="stylesheet" type="text/css" href="assets/css/like.css">

</head>

<body>

  <?php
  require 'config/config.php';
  include("includes/classes/User.php");
  include("includes/classes/Post.php");
  include("includes/classes/Notification.php");

  if (isset($_SESSION['username'])) {
    $userLoggedIn = $_SESSION['username'];
    $user_details_query = mysqli_query($con, "SELECT * FROM users WHERE username='$userLoggedIn'");
    $user = mysqli_fetch_array($user_details_query);
  } else {
    header("Location: register.php");
  }

  //Get id of post
  if (isset($_GET['post_id'])) {
    $post_id = $_GET['post_id'];
  }

  $get_likes = mysqli_query($con, "SELECT likes, added_by FROM posts WHERE id='$post_id'");
  $row = mysqli_fetch_array($get_likes);
  $total_likes = $row['likes'];
  $user_liked = $row['added_by'];

  $user_details_query = mysqli_query($con, "SELECT * FROM users WHERE username='$user_liked'");
  $row = mysqli_fetch_array($user_details_query);
  $total_user_likes = $row['num_likes'];


  // $get_liked_by = mysqli_query($con, "SELECT username FROM likes WHERE post_id='$post_id' LIMIT 3");

  $get_liked_by = mysqli_query($con, "SELECT likes.username, likes.post_id, likes.id, users.first_name, 
          users.last_name, users.profile_pic, users.username 
          FROM likes, users 
          WHERE users.username = likes.username
          AND likes.post_id = '$post_id'
          ORDER BY likes.id DESC
        ");


  $sub_total = $total_likes - 3;

  if ($sub_total < 0) {
    $sub_total = 0;
  }

  //Like button
  if (isset($_POST['like_button'])) {
    $total_likes++;
    $query = mysqli_query($con, "UPDATE posts SET likes='$total_likes' WHERE id='$post_id'");
    $total_user_likes++;
    $user_likes = mysqli_query($con, "UPDATE users SET num_likes='$total_user_likes' WHERE username='$user_liked'");
    $insert_user = mysqli_query($con, "INSERT INTO likes VALUES('', '$userLoggedIn', '$post_id')");

    //Insert Notification
    if ($user_liked != $userLoggedIn) {
      $notification = new Notification($con, $userLoggedIn);
      $notification->insertNotification($post_id, $user_liked, "like");
    }
  }

  //Unlike button
  if (isset($_POST['unlike_button'])) {
    $total_likes--;
    $query = mysqli_query($con, "UPDATE posts SET likes='$total_likes' WHERE id='$post_id'");
    $total_user_likes--;
    $user_likes = mysqli_query($con, "UPDATE users SET num_likes='$total_user_likes' WHERE username='$user_liked'");
    $insert_user = mysqli_query($con, "DELETE FROM likes WHERE username='$userLoggedIn' AND post_id='$post_id'");
  }

  ?>



  <div class="likedby">


    <?php



    //Check for previous likes
    $check_query = mysqli_query($con, "SELECT * FROM likes WHERE username='$userLoggedIn' AND post_id='$post_id'");
    $num_rows = mysqli_num_rows($check_query);
    $unLike = "<img src='./assets/img/btn-liked.svg'>";

    if ($num_rows > 0) {
      echo '
                     <form action="like.php?post_id=' . $post_id . '" method="POST" class="likedForm">

                     <div class="likeHolder">
                        <input type="submit" class="btnUnlike" name="unlike_button" value="">
                     </div>

                     <h3 class="heading-3">
                      Liked By:
                     </h3>

                   

                    </form>
									 ';
    } else {
      echo '<form action="like.php?post_id=' . $post_id . '" method="POST" class="likedForm">

                     <div class="likeHolder">
                      <input type="submit" class="btnlike" name="like_button" value="">
                     </div>

                     <h3 class="heading-3">
                      Liked By:
                     </h3>
             
									 </form>
								 ';
    }

    ?>



    <div class="avatars">
      <?php

      $str = "";

      $count = 0;
      while (($likesrow = mysqli_fetch_array($get_liked_by)) && $count < 3) {


        $count++;

        $profilepic = $likesrow['profile_pic'];
        $likedId = $likesrow['id'];

        $str = "
          '<div class='avatar likeId-$count'>
                 <img src=' $profilepic '>
               </div>
        ";

        echo $str;
      }
      ?>

    </div>

    <div class="col-md-3 and-more">
      <p> and <span class="liked-count"><?php echo $sub_total; ?></span> more liked this</p>
    </div>

  </div>





</body>

</html>