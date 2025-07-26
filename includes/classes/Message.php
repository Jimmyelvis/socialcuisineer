<?php
class Message {
		private $user_obj;
		private $con;

		public function __construct($con, $user){
			$this->con = $con;
			$this->user_obj = new User($con, $user);
		}

		public function getMostRecentUser() {
			$userLoggedIn = $this->user_obj->getUsername();

			$query = mysqli_query($this->con, "SELECT user_to, user_from FROM messages WHERE user_to='$userLoggedIn' OR user_from='$userLoggedIn' ORDER BY id DESC LIMIT 1");

			if (mysqli_num_rows($query) == 0)
				return false;

			$row = mysqli_fetch_array($query);
			$user_to = $row['user_to'];
			$user_from = $row['user_from'];

			if ($user_to != $userLoggedIn)
				return $user_to;
			else
				return $user_from;
		}

		public function sendMessage($user_to, $body, $date) {

			if ($body != "") {
				$userLoggedIn = $this->user_obj->getUsername();
				$query = mysqli_query($this->con, "INSERT INTO messages VALUES('', '$user_to', '$userLoggedIn', '$body', '$date', 'no', 'no', 'no')");
			}
		}

		public function getLatestMessage($userLoggedIn, $user2){

			/*
					Get the latest Message Between two users
			*/

			$details_array = array();

			$query = mysqli_query($this->con, "SELECT body, user_to, date FROM messages WHERE (user_to='$userLoggedIn' AND user_from='$user2') OR (user_to='$user2' AND user_from='$userLoggedIn') ORDER BY id DESC LIMIT 1");

			$row = mysqli_fetch_array($query);
			$sent_by = ($row['user_to'] == $userLoggedIn) ? "They said: " : "You said: ";

			//Timeframe
			$date_time_now = date("Y-m-d H:i:s");
			$start_date = new DateTime($row['date']); //Time of post
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

			array_push($details_array, $sent_by);
			array_push($details_array, $row['body']);
			array_push($details_array, $time_message);

			return $details_array;
		}

		public function getMessages($otherUser){

			$userLoggedIn = $this->user_obj->getUsername();
			$data = "";

			$query = mysqli_query($this->con, "UPDATE messages SET opened='yes' WHERE user_to='$userLoggedIn' AND user_from='$otherUser'");


			/*
					Get all messages between myself and a particular user ($otherUser)
			*/
			$get_messages_query = mysqli_query($this->con, "SELECT * FROM messages WHERE (user_to='$userLoggedIn' AND user_from='$otherUser') OR (user_from='$userLoggedIn' AND user_to='$otherUser')");

			// $get_messages_query = mysqli_query($this->con, "SELECT messages.id, user_to, user_from
			// 	body, users.id, users.username, profile_pic
			// 		FROM 	messages, posts
			// 		WHERE user_to = users.username
			// 		OR user_from = users.username
			// ");

			while ($row = mysqli_fetch_array($get_messages_query)) {
				$user_to = $row['user_to'];
				$user_from = $row['user_from'];
				$body = $row['body'];

				/*
					A list item containing the message is being created here. $div_top is the 
					opening li tag. The id it receives is depended on the value of $user_to
					$div_top is concatenated with $body variable, and the closing li tag
					to create a complete li element 
				*/
				$div_top = ($user_to == $userLoggedIn) ? 
				"<div class='message to'>" : 
				"<div class='message from'>";
				$data = $data . 
				$div_top .
					" <div class='comment'> " .
					"<p>"	. $body . "</p>" .
					"</div>" . 
				"</div>";
			}

			return $data;
		}

		public function getConvos(){
			$userLoggedIn = $this->user_obj->getUsername();
			$return_string = "";
			$convos = array();

			$query = mysqli_query($this->con, "SELECT user_to, user_from FROM messages WHERE user_to='$userLoggedIn' OR user_from='$userLoggedIn' ORDER BY id DESC");

			while ($row = mysqli_fetch_array($query)) {
				/*
					Get all users that I communicated with and push them into the $convos array.
				*/
				$user_to_push = ($row['user_to'] != $userLoggedIn) ? $row['user_to'] : $row['user_from'];

				if (!in_array($user_to_push, $convos)) {
					array_push($convos, $user_to_push);
				}
			}

			foreach ($convos as $username) {
				$user_found_obj = new User($this->con, $username);
				$latest_message_details = $this->getLatestMessage($userLoggedIn, $username);

				$dots = (strlen($latest_message_details[1]) >= 12) ? "..." : "";
				$split = str_split($latest_message_details[1], 12);
				$split = $split[0] . $dots;

				$return_string .= "<a href='messages.php?u=$username'> <div class='user_found_messages'>
							<img src='" . $user_found_obj->getProfilePic() . "' '>
							<span class='convo-name'> " . $user_found_obj->getFirstAndLastName() . "</span>
							<span class='timestamp_smaller' id='grey'> " . $latest_message_details[2] . "</span>
							<p id='grey' style='margin: 0;'>" . $latest_message_details[0] . $split . " </p>
							</div>
							</a>";
			}

			return $return_string;
		}

		public function getConvosDropdown($data, $limit) {

			$page = $data['page'];
			$userLoggedIn = $this->user_obj->getUsername();
			$return_string = "";
			$convos = array(); // Will contain a list of users I(user logged in) communicated with

			if ($page == 1)
				$start = 0;
			else
				$start = ($page - 1) * $limit;

			$set_viewed_query = mysqli_query($this->con, "UPDATE messages SET viewed='yes' WHERE user_to='$userLoggedIn'");

			
			// Select all messages that involve me whether I'm sending or receiving
			
			// $query = mysqli_query($this->con, "SELECT user_to, user_from FROM messages WHERE user_to='$userLoggedIn' OR user_from='$userLoggedIn' ORDER BY id DESC");

		$query = mysqli_query($this->con, "SELECT user_to, user_from FROM messages WHERE user_to='$userLoggedIn'  ORDER BY id DESC");



			
			// Loop through the array that's created from the query above
			// Then with each entry, filter out the user that is NOT me(the user that's logged in)
			// ie .... ($user_to_push), then check to make sure the user is not already
			// in the $convos array. If they are not in then push ($user_to_push), in the $convos array
			// until the loop completes.
			while ($row = mysqli_fetch_array($query)) {

				$user_to_push = ($row['user_to'] != $userLoggedIn) ? $row['user_to'] : $row['user_from'];

			if (!in_array($user_to_push, $convos)) {
				array_push($convos, $user_to_push);
			}

			// array_push($convos, $user_to_push);

			}

			$num_iterations = 0; //Number of messages checked
			$count = 1; //Number of messages posted

			foreach ($convos as $username) {

				if ($num_iterations++ < $start)
					continue;

				if ($count > $limit)
					break;
				else
					$count++;


				
				// Select all messages sent to me from a particular user in the $convos array
				// This will ONLY get the latest msg from each user, in the $convos
				$is_unread_query = mysqli_query($this->con, "SELECT opened FROM messages WHERE user_to='$userLoggedIn' AND user_from='$username' ORDER BY id DESC");

				// $is_unread_query = mysqli_query($this->con, "SELECT opened FROM messages WHERE (user_to='$userLoggedIn' AND user_from='$username') OR (user_FROM='$userLoggedIn' AND user_to='$username') ORDER BY id DESC");


				$row = mysqli_fetch_array($is_unread_query);
				$style = (isset($row['opened']) && $row['opened'] == 'no') ? "display: none;" : "border: none;";


				$user_found_obj = new User($this->con, $username);


			//Get only the latest message between me and a particular user
			// $latest_message_details = $this->getLatestMessage($userLoggedIn, $username);

			$latest_message_details = $this->getLatestReceivedMessage($userLoggedIn, $username);


				$dots = (strlen($latest_message_details[1]) >= 12) ? "..." : "";
				$split = str_split($latest_message_details[1], 12);
				$split = $split[0] . $dots;

				$return_string .=
					"<a class='entry user_found_messages'  href='messages.php?u=$username'>
									<img class='checkmark' style='" . $style . "' src='./assets/img/checkmark.svg'>
									<img src='" . $user_found_obj->getProfilePic() . "'>
										<h3 class='heading-3'>" . $user_found_obj->getFirstAndLastName() . "</h3>
									<h4 class='heading-4'> " . $latest_message_details[2] . "</h4>
									<p>" . $latest_message_details[0] . $split . " </p>
							</a>";
			}


			//If posts were loaded
			if ($count > $limit)
			$return_string .= "<input type='hidden' class='nextPageDropdownData' value='" . ($page + 1) . "'><input type='hidden' class='noMoreDropdownData' value='false'>";
			else
			$return_string .= "<input type='hidden' class='noMoreDropdownData' value='true'> <p class='noMoreMsgs' style='text-align: center; width: 100%;'>No more messages to load!</p>";


			return $return_string;

		
		}

		public function getUnreadNumber(){
			$userLoggedIn = $this->user_obj->getUsername();
			$query = mysqli_query($this->con, "SELECT * FROM messages WHERE viewed='no' AND user_to='$userLoggedIn'");
			return mysqli_num_rows($query);
		}

		public function getLatestReceivedMessage($userLoggedIn, $user2)	{

			/*
						Get the latest Message Received from  $user2
				*/

			$details_array = array();

			$query = mysqli_query($this->con, "SELECT body, user_to, user_from, date FROM messages WHERE (user_to='$userLoggedIn' AND user_from='$user2') ORDER BY id DESC LIMIT 1");

			$row = mysqli_fetch_array($query);
			// $sent_by = ($row['user_to'] == $userLoggedIn) ? "They said: " : "You said: ";

			$sent_by = "They said:";

			//Timeframe
			$date_time_now = date("Y-m-d H:i:s");
			$start_date = new DateTime($row['date']); //Time of post
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

			array_push($details_array, $sent_by);
			array_push($details_array, $row['body']);
			array_push($details_array, $time_message);

			return $details_array;
		}

 
}

?>