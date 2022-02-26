	public function updateLikes ($post_id, $value) {



	/*

	Add all the variables from getLikes function however instead of

	using if (isset($_POST['like_button'])) to determine what get displayed

	use the if statement below. What we return from this function will be

	used by the ajax function to dynamically update the dom



	*/



	$likes_for_post = "";

	$like_unlike_form = "";

	$avatars = "";

	$like = 1;

	$unLike = 2;





	$userLoggedIn = $this->user_obj->getUsername();



	$get_likes = mysqli_query($this->con, "SELECT likes, added_by FROM posts WHERE id='$post_id'");



	$row = mysqli_fetch_array($get_likes);

	$total_likes = $row['likes'];

	$user_liked = $row['added_by'];


// get all the info for the current user who liked the post aka $user_liked 
	$user_details_query = mysqli_query($this->con, "SELECT * FROM users WHERE username='$user_liked'");

	$row = mysqli_fetch_array($user_details_query);

	$total_user_likes = $row['num_likes'];



	if ($value == 1) {

	$total_likes++;

	$query = mysqli_query($this->con, "UPDATE posts SET likes='$total_likes' WHERE id='$post_id'");

	$total_user_likes++;

	$user_likes = mysqli_query($this->con, "UPDATE users SET num_likes='$total_user_likes' WHERE username='$user_liked'");

	$insert_user = mysqli_query($this->con, "INSERT INTO likes VALUES('', '$userLoggedIn', '$post_id')");



	$get_liked_by = mysqli_query($this->con, "SELECT likes.username, likes.post_id, likes.id, users.first_name,

	users.last_name, users.profile_pic, users.username

	FROM likes, users

	WHERE users.username = likes.username

	AND likes.post_id = '$post_id'

	ORDER BY likes.id DESC

	");



	$getPostAuthor = mysqli_query($this->con, "SELECT * FROM posts WHERE id='$post_id'");

	$row = mysqli_fetch_array($getPostAuthor);

	$postAuthor = $row['added_by'];



	$notification = new Notification($this->con, $userLoggedIn);

	$notification->insertNotification($post_id, $postAuthor, "like");





	} else {

	$total_likes--;

	$query = mysqli_query($this->con, "UPDATE posts SET likes='$total_likes' WHERE id='$post_id'");

	$total_user_likes--;

	$user_likes = mysqli_query($this->con, "UPDATE users SET num_likes='$total_user_likes' WHERE username='$user_liked'");

	$delete_user = mysqli_query($this->con, "DELETE FROM likes WHERE username='$userLoggedIn' AND post_id='$post_id'");



	$get_liked_by = mysqli_query($this->con, "SELECT likes.username, likes.post_id, likes.id, users.first_name,

	users.last_name, users.profile_pic, users.username

	FROM likes, users

	WHERE users.username = likes.username

	AND likes.post_id = '$post_id'

	ORDER BY likes.id DESC

	");



	}





	$sub_total = $total_likes - 3;



	if ($sub_total < 0) { $sub_total=0; } if ($value==1) { $like_unlike_form .="

												<div class='likedForm'>



												<div class='likeHolder'>

														<input 

															type='submit' 

															class='btnUnlike' 

															name='$unLike' 

															value='$post_id'

														>

												</div>



												<h3 class='heading-3'>

												Liked By: 

												</h3>



											



												</div>

						" ; $count=0; $str="" ; while (($likesrow=mysqli_fetch_array($get_liked_by)) && $count < 3) { $count++; $profilepic=$likesrow['profile_pic']; $likedId=$likesrow['id']; $str="

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









	  } else {

	  $like_unlike_form .= "

	  <div class='likedForm'>



	    <div class='likeHolder'>

	      <input type='submit' class='btnlike' name='$unLike' value='$post_id'>

	    </div>



	    <h3 class='heading-3'>

	      Liked By:

	    </h3>







	  </div>

	  ";



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



	    }







	    return $likes_for_post;



	    }