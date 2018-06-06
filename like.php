<html>
<head>
	<title></title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
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


    $get_liked_by = mysqli_query($con, "SELECT username FROM likes WHERE post_id='$post_id' LIMIT 2");


		$sub_total = $total_likes - 2;

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

			<div class="container">

				<div class="row">

					<div class="col-md-3">

							<?php

								//Check for previous likes
								 $check_query = mysqli_query($con, "SELECT * FROM likes WHERE username='$userLoggedIn' AND post_id='$post_id'");
								 $num_rows = mysqli_num_rows($check_query);

								 if ($num_rows > 0) {
										 echo '<form action="like.php?post_id=' . $post_id . '" method="POST" class="likedForm">
										 <input type="submit" class="comment_like" name="unlike_button" value="Unlike">
										 <div class="like_value">
											'. $total_likes .' Likes
										 </div>
									 </form>
									 ';
								 } else {
										 echo '<form action="like.php?post_id=' . $post_id . '" method="POST" class="likedForm">
										 <input type="submit" class="comment_like" name="like_button" value="Like">
										 <div class="like_value">
											 <h3>'. $total_likes .' Likes</h3>
										 </div>
									 </form>
								 ';
								 }

						 ?>

			 </div>

					<div class="col-md-4 get-like-by">
						<?php
								while ($likesrow = mysqli_fetch_array($get_liked_by)) {
										echo '<li>' . $likesrow['username'] .  '</li>';
								}
						 ?>

					</div>

					<div class="col-md-3 and-more">
						<p> and <span class="liked-count"><?php echo $sub_total; ?></span>  more liked this</p>
					</div>

				</div>

			</div>





	</div>





</body>
</html>
