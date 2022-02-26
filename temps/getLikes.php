	public function getLikes($post_id)
	{
	$likes_for_post = "";
	$like_unlike_form = "";
	$avatars = "";


	$userLoggedIn = $this->user_obj->getUsername();


	$get_likes = mysqli_query($this->con, "SELECT likes, added_by FROM posts WHERE id='$post_id'");

	$row = mysqli_fetch_array($get_likes);
	$total_likes = $row['likes'];
	$user_liked = $row['added_by'];

	$user_details_query = mysqli_query($this->con, "SELECT * FROM users WHERE username='$user_liked'");
	$row = mysqli_fetch_array($user_details_query);
	$total_user_likes = $row['num_likes'];

	// $get_liked_by = mysqli_query($con, "SELECT username FROM likes WHERE post_id='$post_id' LIMIT 3");

	$get_liked_by = mysqli_query($this->con, "SELECT likes.username, likes.post_id, likes.id, users.first_name,
	users.last_name, users.profile_pic, users.username
	FROM likes, users
	WHERE users.username = likes.username
	AND likes.post_id = '$post_id'
	ORDER BY likes.id DESC
	");

	$sub_total = $total_likes - 3;

	if ($sub_total < 0) { $sub_total=0; } //Like button if (isset($_POST['like_button'])) { $total_likes++; $query=mysqli_query($this->con, "UPDATE posts SET likes='$total_likes' WHERE id='$post_id'");
	  $total_user_likes++;
	  $user_likes = mysqli_query($this->con, "UPDATE users SET num_likes='$total_user_likes' WHERE username='$user_liked'");
	  $insert_user = mysqli_query($this->con, "INSERT INTO likes VALUES('', '$userLoggedIn', '$post_id')");

	  //Insert Notification
	  if ($user_liked != $userLoggedIn) {
	  $notification = new Notification($this->con, $userLoggedIn);
	  $notification->insertNotification($post_id, $user_liked, "like");
	  }
	  }

	  //Unlike button
	  if (isset($_POST['unlike_button'])) {
	  $total_likes--;
	  $query = mysqli_query($this->con, "UPDATE posts SET likes='$total_likes' WHERE id='$post_id'");
	  $total_user_likes--;
	  $user_likes = mysqli_query($this->con, "UPDATE users SET num_likes='$total_user_likes' WHERE username='$user_liked'");
	  $insert_user = mysqli_query($this->con, "DELETE FROM likes WHERE username='$userLoggedIn' AND post_id='$post_id'");
	  }

	  //Check for previous likes
	  $check_query = mysqli_query($this->con, "SELECT * FROM likes WHERE username='$userLoggedIn' AND post_id='$post_id'");
	  $num_rows = mysqli_num_rows($check_query);
	  $like = 1;
	  $unLike = 2;


	  if ($num_rows > 0) {
	  $like_unlike_form .= "
	  <div class='likedForm'>

	    <div class='likeHolder'>
	      <input type='submit' class='btnUnlike' name='unlike_button' value='' onclick='updateLike($post_id, $unLike)'>
	    </div>

	    <h3 class='heading-3'>
	      Liked By:
	    </h3>



	  </div>
	  ";
	  } else {
	  $like_unlike_form .= "
	  <div class='likedForm'>

	    <div class='likeHolder'>
	      <input type='submit' class='btnlike' name='like_button' value='' onclick='updateLike($post_id, $like)'>
	    </div>

	    <h3 class='heading-3'>
	      Liked By:
	    </h3>



	  </div>
	  ";
	  }


	  $count = 0;
	  $str = "";

	  while (($likesrow = mysqli_fetch_array($get_liked_by)) && $count < 3) { $count++; $profilepic=$likesrow['profile_pic']; $likedId=$likesrow['id']; $str="
          '<div class='avatar likeId-$count'>
                 <img src=' $profilepic '>
               </div>
        " ; $avatars .=$str; } if ($total_likes> 3) {
	    $likes_for_post = "
	    $like_unlike_form
	    <div class='avatars'>
	      $avatars
	    </div>
	    <h3 class='heading-3 likeByNumber'>& $sub_total More</h3>
	    ";
	    } else {
	    $likes_for_post = "
	    $like_unlike_form
	    <div class='avatars'>
	      $avatars
	    </div>
	    ";
	    }




	    return $likes_for_post;
	    }