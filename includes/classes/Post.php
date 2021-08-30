<?php
class Post
{
	private $user_obj;
	private $con;

	public function __construct($con, $user)
	{
		$this->con = $con;
		$this->user_obj = new User($con, $user);
	}

	public function submitPost($body, $user_to, $imageName, $heading)
	{
		$body = mysqli_real_escape_string($this->con, $body);
		$heading = strip_tags($heading); //removes html tags
		$heading = mysqli_real_escape_string($this->con, $heading);
		$check_empty = preg_replace('/\s+/', '', $body); //Deltes all spaces

		if ($check_empty != "") {

			//reg x
			$body_array = preg_split("/\s+/", $body);

			//For Posting youtube links
			foreach ($body_array as $key => $value) {

				if (strpos($value, "www.youtube.com/watch?v=") !== false) {

					$link = preg_split("!&!", $value);
					$value = preg_replace("!watch\?v=!", "embed/", $link[0]);
					$value = "<br><iframe width=\'420\' height=\'315\' src=\'" . $value . "\'></iframe><br>";
					$body_array[$key] = $value;
				}
			}

			$body = implode(" ", $body_array);

			//Current date and time
			$date_added = date("Y-m-d H:i:s");
			//Get username
			$added_by = $this->user_obj->getUsername();

			//If user is on own profile, user_to is 'none'
			if ($user_to == $added_by) {
				$user_to = "none";
			}

			//insert post
			$query = mysqli_query($this->con, "INSERT INTO posts VALUES('', '$body', '$heading','$added_by', '$user_to', '$date_added', 'no', 'no', '0', '$imageName')");
			$returned_id = mysqli_insert_id($this->con);

			//Insert notification
			if ($user_to != 'none') {
				$notification = new Notification($this->con, $added_by);
				$notification->insertNotification($returned_id, $user_to, "profile_post");
			}


			//Update post count for user
			$num_posts = $this->user_obj->getNumPosts();
			$num_posts++;
			$update_query = mysqli_query($this->con, "UPDATE users SET num_posts='$num_posts' WHERE username='$added_by'");

			$stopWords = "a about above across after again against all almost alone along already
			 also although always among am an and another any anybody anyone anything anywhere are
			 area areas around as ask asked asking asks at away b back backed backing backs be became
			 because become becomes been before began behind being beings best better between big
			 both but by c came can cannot case cases certain certainly clear clearly come could
			 d did differ different differently do does done down down downed downing downs during
			 e each early either end ended ending ends enough even evenly ever every everybody
			 everyone everything everywhere f face faces fact facts far felt few find finds first
			 for four from full fully further furthered furthering furthers g gave general generally
			 get gets give given gives go going good goods got great greater greatest group grouped
			 grouping groups h had has have having he her here herself hi high high high higher
				 highest him himself his how however i im if important in interest interested interesting
			 interests into is it its itself j just k keep keeps kind knew know known knows
			 large largely last later latest least less let lets like likely long longer
			 longest m made make making man many may me member members men might more most
			 mostly mr mrs much must my myself n necessary need needed needing needs never
			 new new newer newest next no nobody non noone not nothing now nowhere number
			 numbers o of off often old older oldest on once one only open opened opening
			 opens or order ordered ordering orders other others our out over p part parted
			 parting parts per perhaps place places point pointed pointing points possible
			 present presented presenting presents problem problems put puts q quite r
			 rather really right right room rooms s said same saw say says second seconds
			 see seem seemed seeming seems sees several shall she should show showed
			 showing shows side sides since small smaller smallest so some somebody
			 someone something somewhere state states still still such sure t take
			 taken than that the their them then there therefore these they thing
			 things think thinks this those though thought thoughts three through
					 thus to today together too took toward turn turned turning turns two
			 u under until up upon us use used uses v very w want wanted wanting
			 wants was way ways we well wells went were what when where whether
			 which while who whole whose why will with within without work
			 worked working works would x y year years yet you young younger
			 youngest your yours z lol haha omg hey ill iframe wonder else like
						 hate sleepy reason for some little yes bye choose";

			//Convert stop words into array - split at white space
			$stopWords = preg_split("/[\s,]+/", $stopWords);


			//Remove all punctionation
			$no_punctuation = preg_replace("/[^a-zA-Z 0-9]+/", "", $body);

			//Predict whether user is posting a url. If so, do not check for trending words
			if (
				strpos($no_punctuation, "height") === false && strpos($no_punctuation, "width") === false
				&& strpos($no_punctuation, "http") === false
			) {

				$no_punctuation = preg_split("/[\s,]+/", $no_punctuation);


				foreach ($stopWords as $value) {
					foreach ($no_punctuation as $key => $value2) {

						if (strtolower($value) == strtolower($value2))
							$no_punctuation[$key] = "";
					}
				}
				foreach ($no_punctuation as $value) {
					$this->calculateTrend(ucfirst($value));
				}
			}
		}
	}

	public function calculateTrend($term)
	{

		if ($term != '') {
			$query = mysqli_query($this->con, "SELECT * FROM trends WHERE title='$term'");

			if (mysqli_num_rows($query) == 0)
				$insert_query = mysqli_query($this->con, "INSERT INTO trends(title,hits) VALUES('$term','1')");
			else
				$insert_query = mysqli_query($this->con, "UPDATE trends SET hits=hits+1 WHERE title='$term'");
		}
	}

	public function loadPostsFriends($data, $limit)
	{

		$page = $data['page'];
		$userLoggedIn = $this->user_obj->getUsername();

		if ($page == 1)
			$start = 0;
		else
			$start = ($page - 1) * $limit;


		$str = ""; //String to return
		$data_query = mysqli_query($this->con, "SELECT * FROM posts WHERE deleted='no' ORDER BY id DESC");

		if (mysqli_num_rows($data_query) > 0) {


			$num_iterations = 0; //Number of results checked (not necessarily posted)
			$count = 1;

			while ($row = mysqli_fetch_array($data_query)) {
				$id = $row['id'];
				$body = $row['body'];
				$heading = $row['heading'];
				$added_by = $row['added_by'];
				$date_time = $row['date_added'];
				$imagePath = $row['image'];
				$likes = $row['likes'];



				//Trucate Body text for better viewing
				$body2 =  $body;
				$body2 = strip_tags($body2);

				if (strlen($body2) > 500) {

					// truncate string
					$stringCut = substr($body2, 0, 500);
					$endPoint = strrpos($stringCut, ' ');

					//if the string doesn't contain any space then it will cut without word basis.
					$body2 = $endPoint ? substr($stringCut, 0, $endPoint) : substr($stringCut, 0);
				}


				//Prepare user_to string so it can be included even if not posted to a user
				if ($row['user_to'] == "none") {
					$user_to = "";
				} else {
					// Connection variable, and username for the User object
					$user_to_obj = new User($this->con, $row['user_to']);
					$user_to_name = $user_to_obj->getFirstAndLastName();
					$user_to = "to <a href='" . $row['user_to'] . "'>" . $user_to_name . "</a>";
				}

				//Check if user who posted, has their account closed
				// Connection variable, and username for the User object
				$added_by_obj = new User($this->con, $added_by);
				if ($added_by_obj->isClosed()) {

					// If true then it will take us right back to the start of the loop
					continue;
				}

				$user_logged_obj = new User($this->con, $userLoggedIn);
				if ($user_logged_obj->isFriend($added_by)) {


					if ($num_iterations++ < $start)
						continue;


					//Once 10 posts have been loaded, break
					if ($count > $limit) {
						break;
					} else {
						$count++;
					}

					if ($userLoggedIn == $added_by)
						$delete_button = "<button class='delete_button btn-danger' id='post$id'>X</button>";
					else
						$delete_button = "";


					$user_details_query = mysqli_query($this->con, "SELECT first_name, last_name, profile_pic FROM users WHERE username='$added_by'");
					$user_row = mysqli_fetch_array($user_details_query);
					$first_name = $user_row['first_name'];
					$last_name = $user_row['last_name'];
					$profile_pic = $user_row['profile_pic'];



					$comments_check = mysqli_query($this->con, "SELECT * FROM comments WHERE post_id='$id'");
					$comments_check_num = mysqli_num_rows($comments_check);


					//Timeframe
					$date_time_now = date("Y-m-d H:i:s");
					$start_date = new DateTime($date_time); //Time of post
					$end_date = new DateTime($date_time_now); //Current time
					$interval = $start_date->diff($end_date); //Difference between dates
					if ($interval->y >= 1) {
						if ($interval->y == 1)
							$time_message = $interval->y . " year ago "; //1 year ago
						else
							$time_message = $interval->y . " years ago "; //1+ year ago
					} else if ($interval->m >= 1) {
						if ($interval->d == 0) {
							$days = " ago";
						} else if ($interval->d == 1) {
							$days = $interval->d . " day ago ";
						} else {
							$days = $interval->d . " days ago ";
						}


						if ($interval->m == 1) {
							$time_message = $interval->m . " month " . $days;
						} else {
							$time_message = $interval->m . " months " . $days;
						}
					} else if ($interval->d >= 1) {
						if ($interval->d == 1) {
							$time_message = "Yesterday";
						} else {
							$time_message = $interval->d . " days ago ";
						}
					} else if ($interval->h >= 1) {
						if ($interval->h == 1) {
							$time_message = $interval->h . " hour ago ";
						} else {
							$time_message = $interval->h . " hours ago ";
						}
					} else if ($interval->i >= 1) {
						if ($interval->i == 1) {
							$time_message = $interval->i . " minute ago ";
						} else {
							$time_message = $interval->i . " minutes ago ";
						}
					} else {
						if ($interval->s < 30) {
							$time_message = "Just now";
						} else {
							$time_message = $interval->s . " seconds ago ";
						}
					}


					if ($imagePath != "") {
						$imageDiv = "	<img src='$imagePath' class='card-bg'>";
					} else {
						$imageDiv = "";
					}

					$link = "post.php?id=" . $id;

					$str .= "<div class='card recipe-card' onClick='javascript:toggle$id()'>

									 <div class='card-userImage'>
											<img src='$profile_pic' alt=''>
										</div>

										<div class='card-info'>

											<div class='card-desc'>

												<div class='block'></div>

												<div class='card-headings'>

													<h2 class='heading-2'>
														<a href='$link'>
															$heading
														</a>
													</h2>

													<h3 class='heading-3'>
														$first_name $last_name 
													</h3>

													<h4 class='heading-4'>
														$time_message
													</h4>

												</div>

											</div>


											<div class='card-stats'>

												<div class='likes'>
													<h4 class='heading-4'>$likes</h4>
													<img src='./assets/img/like-v2.svg' alt=''>
												</div>

												<div class='comments'>
													<h4 class='heading-4'>$comments_check_num</h4>
													<img src='./assets/img/comments-v2.svg' alt=''>
												</div>

											</div>
										</div>

										<div class='overlay'></div>
										$imageDiv


									</div>

							
										";
				}

?>

				<script type="text/javascript">
					$(document).ready(function() {

						$('#post<?php echo $id; ?>').on('click', function() {
							bootbox.confirm("Are you sure you want to delete this post?", function(result) {

								$.post("includes/form_handlers/delete_post.php?post_id=<?php echo $id; ?>", {
									result: result
								});

								if (result)
									location.reload();

							});

						});

					});
				</script>


			<?php


			} //End while loop

			if ($count > $limit)
				$str .= "<input type='hidden' class='nextPage' value='" . ($page + 1) . "'>
							<input type='hidden' class='noMorePosts' value='false'>";
			else
				$str .= "<input type='hidden' class='noMorePosts' value='true'><p class='noMorePosts column'> No more posts to show! </p>";
		}

		echo $str;
	}


	public function loadProfilePosts($data, $limit)
	{

		$page = $data['page'];
		$profileUser = $data['profileUsername'];
		$userLoggedIn = $this->user_obj->getUsername();

		if ($page == 1)
			$start = 0;
		else
			$start = ($page - 1) * $limit;


		$str = ""; //String to return
		$data_query = mysqli_query($this->con, "SELECT * FROM posts WHERE deleted='no' AND ((added_by='$profileUser' AND user_to='none') OR user_to='$profileUser')  ORDER BY id DESC");


		if (mysqli_num_rows($data_query) > 0) {


			$num_iterations = 0; //Number of results checked (not necasserily posted)
			$count = 1;

			while ($row = mysqli_fetch_array($data_query)) {
				$id = $row['id'];
				$body = $row['body'];
				$heading = $row['heading'];
				$added_by = $row['added_by'];
				$date_time = $row['date_added'];
				$imagePath = $row['image'];
				$likes = $row['likes'];


				if ($num_iterations++ < $start)
					continue;


				//Trucate Body text for better viewing
				$body2 =  $body;
				$body2 = strip_tags($body2);


				if (strlen($body2) > 500) {

					// truncate string
					$stringCut = substr($body2, 0, 500);
					$endPoint = strrpos($stringCut, ' ');

					//if the string doesn't contain any space then it will cut without word basis.
					$body2 = $endPoint ? substr($stringCut, 0, $endPoint) : substr($stringCut, 0);
				}



				//Once 10 posts have been loaded, break
				if ($count > $limit) {
					break;
				} else {
					$count++;
				}

				if ($userLoggedIn == $added_by)
					$delete_button = "<button  id='post$id'>
								<img src='./assets/img/close-btn-v2.svg' alt=''>
					</button>";
				else
					$delete_button = "";


				$user_details_query = mysqli_query($this->con, "SELECT first_name, last_name, profile_pic FROM users WHERE username='$added_by'");
				$user_row = mysqli_fetch_array($user_details_query);
				$first_name = $user_row['first_name'];
				$last_name = $user_row['last_name'];
				$profile_pic = $user_row['profile_pic'];

			?>

				<?php

				$comments_check = mysqli_query($this->con, "SELECT * FROM comments WHERE post_id='$id'");
				$comments_check_num = mysqli_num_rows($comments_check);


				//Timeframe
				$date_time_now = date("Y-m-d H:i:s");
				$start_date = new DateTime($date_time); //Time of post
				$end_date = new DateTime($date_time_now); //Current time
				$interval = $start_date->diff($end_date); //Difference between dates
				if ($interval->y >= 1) {
					if ($interval->y == 1)
						$time_message = $interval->y . " year ago"; //1 year ago
					else
						$time_message = $interval->y . " years ago"; //1+ year ago
				} else if ($interval->m >= 1) {
					if ($interval->d == 0) {
						$days = " ago";
					} else if ($interval->d == 1) {
						$days = $interval->d . " day ago";
					} else {
						$days = $interval->d . " days ago";
					}


					if ($interval->m == 1) {
						$time_message = $interval->m . " month" . $days;
					} else {
						$time_message = $interval->m . " months" . $days;
					}
				} else if ($interval->d >= 1) {
					if ($interval->d == 1) {
						$time_message = "Yesterday";
					} else {
						$time_message = $interval->d . " days ago";
					}
				} else if ($interval->h >= 1) {
					if ($interval->h == 1) {
						$time_message = $interval->h . " hour ago";
					} else {
						$time_message = $interval->h . " hours ago";
					}
				} else if ($interval->i >= 1) {
					if ($interval->i == 1) {
						$time_message = $interval->i . " minute ago";
					} else {
						$time_message = $interval->i . " minutes ago";
					}
				} else {
					if ($interval->s < 30) {
						$time_message = "Just now";
					} else {
						$time_message = $interval->s . " seconds ago";
					}
				}


				if ($imagePath != "") {
					$imageDiv = "	<img src='$imagePath' class='card-bg'>";
				} else {
					$imageDiv = "";
				}

				$link = "post.php?id=" . $id;


				$str .= "<div class='card recipe-card' onClick='javascript:toggle$id()'>

									 <div class='card-userImage'>
											<img src='$profile_pic' alt=''>
										</div>


										<div class='card-info'>

											<div class='card-desc'>

												<div class='block'></div>

												<div class='card-headings'>

													<h2 class='heading-2'>
														<a href='$link'>
															$heading
														</a>
													</h2>

													<h3 class='heading-3'>
														$first_name $last_name 
													</h3>

													<h4 class='heading-4'>
														$time_message
													</h4>

												</div>

											</div>


											<div class='card-stats'>

												<div class='likes'>
													<h4 class='heading-4'>$likes</h4>
													<img src='./assets/img/like-v2.svg' alt=''>
												</div>

												<div class='comments'>
													<h4 class='heading-4'>$comments_check_num</h4>
													<img src='./assets/img/comments-v2.svg' alt=''>
												</div>

											</div>
										</div>

										<div class='overlay'></div>
										$imageDiv


									</div>

							<div class='post_comment' id='toggleComment$id' style='display:none;'>

								<div class='comments_area'>
									<textarea id='comment$id' placeholder='Post a comment...'></textarea>
									<input type='button' onclick='sendComment($id)' value='Send'>
								</div>

								<div class='comment_section'>"
									. $this->getComments($id) .
								"</div>

							</div>	";

				?>

				<script type="text/javascript">
					$(document).ready(function() {

						/**
						 * TODO: Have to figure out how to revamp this the es6 way
						 * 
						 */

						$('#post<?php echo $id; ?>').on('click', function() {
							alert("Are you sure you want to delete this post?", function(result) {


								$.post("includes/form_handlers/delete_post.php?post_id=<?php echo $id; ?>", {
									result: result
								});

								if (result)
									location.reload();

							});

						});

					});
				</script>


			<?php


			} //End while loop

			if ($count > $limit)
				$str .= "<input type='hidden' class='nextPage' value='" . ($page + 1) . "'>
							<input type='hidden' class='noMorePosts' value='false'>";
			else
				$str .= "<input type='hidden' class='noMorePosts' value='true'><p class='noMorePosts column'> No more posts to show! </p>";
		}

		echo $str;
	}

	public function getSinglePost($post_id)
	{

		$userLoggedIn = $this->user_obj->getUsername();

		$opened_query = mysqli_query($this->con, "UPDATE notifications SET opened='yes' WHERE user_to='$userLoggedIn' AND link LIKE '%=$post_id'");

		$str = ""; //String to return
		$data_query = mysqli_query($this->con, "SELECT * FROM posts WHERE deleted='no' AND id='$post_id'");

		if (mysqli_num_rows($data_query) > 0) {


			$row = mysqli_fetch_array($data_query);
			$id = $row['id'];
			$body = $row['body'];
			$heading = $row['heading'];
			$added_by = $row['added_by'];
			$date_time = $row['date_added'];
			$imagePath = $row['image'];

			//Prepare user_to string so it can be included even if not posted to a user
			if ($row['user_to'] == "none") {
				$user_to = "";
			} else {
				$user_to_obj = new User($this->con, $row['user_to']);
				$user_to_name = $user_to_obj->getFirstAndLastName();
				$user_to = "to <a href='" . $row['user_to'] . "'>" . $user_to_name . "</a>";
			}

			//Check if user who posted, has their account closed
			$added_by_obj = new User($this->con, $added_by);
			if ($added_by_obj->isClosed()) {
				return;
			}

			$user_logged_obj = new User($this->con, $userLoggedIn);
	


				if ($userLoggedIn == $added_by)
					$delete_button = "<button class='delete_button btn-danger' id='post$id'>X</button>";
				else
					$delete_button = "";


				$user_details_query = mysqli_query($this->con, "SELECT first_name, last_name, profile_pic FROM users WHERE username='$added_by'");
				$user_row = mysqli_fetch_array($user_details_query);
				$first_name = $user_row['first_name'];
				$last_name = $user_row['last_name'];
				$profile_pic = $user_row['profile_pic'];


			?>
		
				<?php

				$comments_check = mysqli_query($this->con, "SELECT * FROM comments WHERE post_id='$id'");
				$comments_check_num = mysqli_num_rows($comments_check);


				//Timeframe
				$date_time_now = date("Y-m-d H:i:s");
				$start_date = new DateTime($date_time); //Time of post
				$end_date = new DateTime($date_time_now); //Current time
				$interval = $start_date->diff($end_date); //Difference between dates
				if ($interval->y >= 1) {
					if ($interval->y == 1)
						$time_message = $interval->y . " year ago"; //1 year ago
					else
						$time_message = $interval->y . " years ago"; //1+ year ago
				} else if ($interval->m >= 1) {
					if ($interval->d == 0) {
						$days = " ago";
					} else if ($interval->d == 1) {
						$days = $interval->d . " day ago";
					} else {
						$days = $interval->d . " days ago";
					}


					if ($interval->m == 1) {
						$time_message = $interval->m . " month " . $days;
					} else {
						$time_message = $interval->m . " months " . $days;
					}
				} else if ($interval->d >= 1) {
					if ($interval->d == 1) {
						$time_message = "Yesterday";
					} else {
						$time_message = $interval->d . " days ago";
					}
				} else if ($interval->h >= 1) {
					if ($interval->h == 1) {
						$time_message = $interval->h . " hour ago";
					} else {
						$time_message = $interval->h . " hours ago";
					}
				} else if ($interval->i >= 1) {
					if ($interval->i == 1) {
						$time_message = $interval->i . " minute ago";
					} else {
						$time_message = $interval->i . " minutes ago";
					}
				} else {
					if ($interval->s < 30) {
						$time_message = "Just now";
					} else {
						$time_message = $interval->s . " seconds ago";
					}
				}

				if ($imagePath != "") {
					$imageDiv = "<img class='detailBg scroll' src='$imagePath'
							data-rate='0.6' data-direction='vertical'>	";
				} else {
					$imageDiv = "";
				}



				$str .= "
				<div class='detail'>

						<div class='postHeading'>
							<div class='avatar'>
								<a href='$added_by'>
									<img src='$profile_pic' class='post-profile-pic'>
								</a>
							</div>

							<div class='details'>
								<h2 class='heading-2'>$heading</h2>
								<h3 class='heading-3'>By: $first_name $last_name 
									<span class='timeMsg'>$time_message</span>			
								</h3>
							</div>
						
							<div class='overlay'></div>
							<div class='imagebg'>
								$imageDiv
							</div>
						</div>

						<div class='likedby'>
							"	. $this->getLikes($id) . "
						</div>

						<div id='post_body'>
								<p> $body</p>
						</div>

						<div class='comments'>
						
							<div class='heading'>
								<h3 class='heading-3'>
									$comments_check_num Comments
								</h3>
							</div>

							<textarea class='inputBox textArea' id='comment$id' placeholder='Post a comment...'></textarea>
							<input class='btn btn-puprle' type='button' onclick='sendComment($id)' value='Send'>

							". $this->getComments($id) ."
						
						</div>

					</div>	";

				?>

<?php
			
		} else {
			echo "<p>No post found. If you clicked a link, it may be broken.</p>";
			return;
		}

		echo $str;
	}


	public function loadAllPosts($data)
	{

		// $page = $data['page'];


		$str = ""; //String to return
		$data_query = mysqli_query($this->con, "SELECT * FROM posts WHERE deleted='no' ORDER BY likes DESC LIMIT 6");

		while ($row = mysqli_fetch_array($data_query)) {
			$id = $row['id'];
			$body = $row['body'];
			$heading = $row['heading'];
			$added_by = $row['added_by'];
			$date_time = $row['date_added'];
			$imagePath = $row['image'];
			$likes = $row['likes'];

			//Trucate Body text for better viewing
			$body2 =  $body;
			$body2 = strip_tags($body2);

			if (strlen($body2) > 500) {

				// truncate string
				$stringCut = substr($body2, 0, 500);
				$endPoint = strrpos($stringCut, ' ');

				//if the string doesn't contain any space then it will cut without word basis.
				$body2 = $endPoint ? substr($stringCut, 0, $endPoint) : substr($stringCut, 0);
			}

			$user_details_query = mysqli_query($this->con, "SELECT first_name, last_name, profile_pic FROM users WHERE username='$added_by'");
			$user_row = mysqli_fetch_array($user_details_query);
			$first_name = $user_row['first_name'];
			$last_name = $user_row['last_name'];
			$profile_pic = $user_row['profile_pic'];

			$comments_check = mysqli_query($this->con, "SELECT * FROM comments WHERE post_id='$id'");
			$comments_check_num = mysqli_num_rows($comments_check);


			//Timeframe
			$date_time_now = date("Y-m-d H:i:s");
			$start_date = new DateTime($date_time); //Time of post
			$end_date = new DateTime($date_time_now); //Current time
			$interval = $start_date->diff($end_date); //Difference between dates
			if ($interval->y >= 1) {
				if ($interval->y == 1)
					$time_message = $interval->y . " year ago"; //1 year ago
				else
					$time_message = $interval->y . " years ago"; //1+ year ago
			} else if ($interval->m >= 1) {
				if ($interval->d == 0) {
					$days = " ago";
				} else if ($interval->d == 1) {
					$days = $interval->d . " day ago";
				} else {
					$days = $interval->d . " days ago";
				}


				if ($interval->m == 1) {
					$time_message = $interval->m . " month" . $days;
				} else {
					$time_message = $interval->m . " months" . $days;
				}
			} else if ($interval->d >= 1) {
				if ($interval->d == 1) {
					$time_message = "Yesterday";
				} else {
					$time_message = $interval->d . " days ago";
				}
			} else if ($interval->h >= 1) {
				if ($interval->h == 1) {
					$time_message = $interval->h . " hour ago";
				} else {
					$time_message = $interval->h . " hours ago";
				}
			} else if ($interval->i >= 1) {
				if ($interval->i == 1) {
					$time_message = $interval->i . " minute ago";
				} else {
					$time_message = $interval->i . " minutes ago";
				}
			} else {
				if ($interval->s < 30) {
					$time_message = "Just now";
				} else {
					$time_message = $interval->s . " seconds ago";
				}
			}


			if ($imagePath != "") {
				$imageDiv = "	<img src='$imagePath' class='card-bg'>";
			} else {
				$imageDiv = "";
			}

			$link = "post.php?id=" . $id;

			$str .= "
				<div class='card recipe-card'>

					<div class='card-userImage'>
						<img src='$profile_pic' alt=''>
					</div>

					<div class='card-info'>

							<div class='card-desc'>

								<div class='block'></div>

								<div class='card-headings'>

									<h2 class='heading-2'>
										<a href='$link'>
											$heading
										</a>
									</h2>

									<h3 class='heading-3'>
										$first_name $last_name 
									</h3>

									<h4 class='heading-4'>
										$time_message
									</h4>

								</div>

							</div>

							<div class='card-stats'>

								<div class='likes'>
									<h4 class='heading-4'>$likes</h4>
									<img src='./assets/img/like-v2.svg' alt=''>
								</div>

								<div class='comments'>
									<h4 class='heading-4'>$comments_check_num</h4>
									<img src='./assets/img/comments-v2.svg' alt=''>
								</div>

							</div>

					</div>

					<div class='overlay'></div>
					$imageDiv
				
				</div>
			";
		} //End while loop

		echo $str;
	}


	public function sendComment($post_author, $commentText, $id, $user_to)
	{

		$userLoggedIn = $this->user_obj->getUsername();
		$body = strip_tags($commentText);
		$body = mysqli_real_escape_string($this->con, $body);
		$body = str_replace('\r\n', "\n", $body);
		$body = nl2br($body);

		if ($body === "") {
			echo "No text";
			return;
		}

		// $date = date("Y-m-d");

		$insert_comment = mysqli_query($this->con, "INSERT INTO comments VALUES('', '$body', '$userLoggedIn', '$post_author', NOW(), 'no', '$id')");

		/* Alt Version
		$insert_comment = mysqli_query($this->con, "INSERT INTO comments VALUES('', '$body', '$userLoggedIn', '$post_author', '$date', 'no', '$id')");
		*/

		if ($post_author !== $userLoggedIn) {
			$notification = new Notification($this->con, $userLoggedIn);
			$notification->insertNotification($id, $post_author, "comment");
		}

		if ($user_to !== 'none' && $user_to !== $userLoggedIn) {
			$notification = new Notification($this->con, $userLoggedIn);
			$notification->insertNotification($id, $user_to, "profile_comment");
		}

		$get_commenters = mysqli_query($this->con, "SELECT * FROM comments WHERE post_id='$id'");
		$notified_users = array();
		while ($row = mysqli_fetch_array($get_commenters)) {

			if (
				$row['posted_by'] !== $post_author && $row['posted_by'] !== $user_to
				&& $row['posted_by'] !== $userLoggedIn && !in_array($row['posted_by'], $notified_users)
			) {
				$notification = new Notification($this->con, $userLoggedIn);
				$notification->insertNotification($id, $row['posted_by'], "comment_non_owner");

				array_push($notified_users, $row['posted_by']);
			}
		}
	}

	public function getComments($id, $get_only_last_comment = false)
	{

		if ($get_only_last_comment) {

			$get_comments = mysqli_query($this->con, "SELECT * FROM comments WHERE post_id='$id' ORDER BY id DESC LIMIT 1");
		} else {

			$get_comments = mysqli_query($this->con, "SELECT * FROM comments WHERE post_id='$id' ORDER BY id ASC");
		}


		$count = mysqli_num_rows($get_comments);

		$commment_from_db = "";

		if ($count !== 0) {

			while ($comment = mysqli_fetch_array($get_comments)) {

				$comment_body = $comment['post_body'];
				$posted_to = $comment['posted_to'];
				$posted_by = $comment['posted_by'];
				$date_added = $comment['date_added'];
				$removed = $comment['removed'];

				//Timeframe
				$date_time_now = date("Y-m-d H:i:s");
				$start_date = new DateTime($date_added); //Time of post
				$end_date = new DateTime($date_time_now); //Current time
				$interval = $start_date->diff($end_date); //Difference between dates 
				if ($interval->y >= 1) {
					if ($interval->y == 1)
						$time_message = $interval->y . " year ago"; //1 year ago
					else
						$time_message = $interval->y . " years ago"; //1+ year ago
				} else if ($interval->m >= 1) {
					if ($interval->d == 0) {
						$days = " ago";
					} else if ($interval->d == 1) {
						$days = $interval->d . " day ago";
					} else {
						$days = $interval->d . " days ago";
					}


					if ($interval->m == 1) {
						$time_message = $interval->m . " month" . $days;
					} else {
						$time_message = $interval->m . " months" . $days;
					}
				} else if ($interval->d >= 1) {
					if ($interval->d == 1) {
						$time_message = "Yesterday";
					} else {
						$time_message = $interval->d . " days ago";
					}
				} else if ($interval->h >= 1) {
					if ($interval->h == 1) {
						$time_message = $interval->h . " hour ago";
					} else {
						$time_message = $interval->h . " hours ago";
					}
				} else if ($interval->i >= 1) {
					if ($interval->i == 1) {
						$time_message = $interval->i . " minute ago";
					} else {
						$time_message = $interval->i . " minutes ago";
					}
				} else {
					if ($interval->s < 30) {
						$time_message = "Just now";
					} else {
						$time_message = $interval->s . " seconds ago";
					}
				}

				$user_obj = new User($this->con, $posted_by);

				$prof_pic = $user_obj->getProfilePic();

				$names = $user_obj->getFirstAndLastName();


				$commment_from_db .= "
				  <div class='commentEntry'>

						<div class='avatar'>
							<img src='$prof_pic' alt='' title='$posted_by'>
						</div>

						<div class='nameTime'>
							<li class='name'>$names</li>
							<li class='time'>$time_message</li>
						</div>

						<p>$comment_body</p>

					</div> ";
			}
		} else {

			$commment_from_db = "<div id='noComment$id' class='no_comments'>No comments to show</div>";
		}

		return $commment_from_db;
	}

	public function getLikes($post_id)
	{
		$likes_for_post = "";
		$like_unlike_form  = "";
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

		if ($sub_total < 0) {
			$sub_total = 0;
		}

		//Like button
		if (isset($_POST['like_button'])) {
			$total_likes++;
			$query = mysqli_query($this->con, "UPDATE posts SET likes='$total_likes' WHERE id='$post_id'");
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
                        <input 
													type='submit' 
													class='btnUnlike' 
													name='unlike_button' 
													value=''
													onclick='updateLike($post_id, $unLike)'
												>
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
                        <input 
													type='submit' 
													class='btnlike' 
													name='like_button' 
													value=''
													onclick='updateLike($post_id, $like)'
												>
                     </div>

                     <h3 class='heading-3'>
                      Liked By:
                     </h3>

                   

                    </div>
									 ";
		}


		$count = 0;
		$str = "";

		while (($likesrow = mysqli_fetch_array($get_liked_by)) && $count < 3) {

			$count++;

			$profilepic = $likesrow['profile_pic'];
			$likedId = $likesrow['id'];

			$str = "
          '<div class='avatar likeId-$count'>
                 <img src=' $profilepic '>
               </div>
        ";

			$avatars .= $str;
		}

		if ($total_likes > 3) {
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

	public function getAllLikes($post_id) {

		$liked = "";

		$userLoggedIn = $this->user_obj->getUsername();

		$get_likes = mysqli_query($this->con, "SELECT likes, added_by FROM posts WHERE id='$post_id'");

		$row = mysqli_fetch_array($get_likes);
		$total_likes = $row['likes'];
		$user_liked = $row['added_by'];

		$get_liked_by = mysqli_query($this->con, "SELECT likes.username, likes.post_id, likes.id, users.first_name, 
          users.last_name, users.profile_pic, users.username 
          FROM likes, users 
          WHERE users.username = likes.username
          AND likes.post_id = '$post_id'
          ORDER BY likes.id DESC
        ");


while ($likesrow = mysqli_fetch_array($get_liked_by)) {
	
			$fullname = $likesrow['first_name'] . ' ' . $likesrow['last_name'];
			$profilepic = $likesrow['profile_pic'];
			$username = $likesrow['username'];

			$str = "
          <div class='like'>
							<img src=' $profilepic ' class='avatar'>
							<a href='$username' class='heading-3'>$fullname</a>
						</div>
        ";

			$liked .= $str;
		}

		return $liked;
	}

	public function updateLikes ($post_id, $value) {

		/*
			Add all the variables from getLikes function however instead of
			using if (isset($_POST['like_button'])) to determine what get displayed
			use the if statement below. What we return from this function will be
			used by the ajax function to dynamically update the dom

		*/

		$likes_for_post = "";
		$like_unlike_form  = "";
		$avatars = "";
		$like = 1;
		$unLike = 2;

		
		$userLoggedIn = $this->user_obj->getUsername();

		$get_likes = mysqli_query($this->con, "SELECT likes, added_by FROM posts WHERE id='$post_id'");

		$row = mysqli_fetch_array($get_likes);
		$total_likes = $row['likes'];
		$user_liked = $row['added_by'];

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

		if ($sub_total < 0) {
			$sub_total = 0;
		}

		if ($value == 1) {

					$like_unlike_form .= "
												<div class='likedForm'>

												<div class='likeHolder'>
														<input 
															type='submit' 
															class='btnUnlike' 
															name='unlike_button' 
															value=''
															onclick='updateLike($post_id, $unLike)'
														>
												</div>

												<h3 class='heading-3'>
												Liked By: 
												</h3>

											

												</div>
						";

						$count = 0;
						$str = "";

						while (($likesrow = mysqli_fetch_array($get_liked_by)) && $count < 3) {

							$count++;

							$profilepic = $likesrow['profile_pic'];
							$likedId = $likesrow['id'];

							$str = "
								'<div class='avatar likeId-$count'>
											<img src=' $profilepic '>
										</div>
							";

							$avatars .= $str;
						}

						if ($total_likes > 3) {
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
										<input 
											type='submit' 
											class='btnlike' 
											name='like_button' 
											value=''
											onclick='updateLike($post_id, $like)'
										>
									</div>

									<h3 class='heading-3'>
									Liked By:
									</h3>

								

								</div>
						";

						$count = 0;
						$str = "";

						while (($likesrow = mysqli_fetch_array($get_liked_by)) && $count < 3) {

							$count++;

							
							
							$profilepic = $likesrow['profile_pic'];
							$likedId = $likesrow['id'];

							$str = "
								'<div class='avatar likeId-$count'>
											<img src=' $profilepic '>
										</div>
							";

							$avatars .= $str;
						}

						if ($total_likes > 3) {
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






}

?>