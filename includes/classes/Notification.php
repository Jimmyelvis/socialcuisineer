<?php


class Notification
{
	private $user_obj;
	private $con;

	public function __construct($con, $user)
	{
		$this->con = $con;
		$this->user_obj = new User($con, $user);
	}


	public function getUnreadNumber()
	{
		$userLoggedIn = $this->user_obj->getUsername();

		$query = mysqli_query($this->con, "SELECT * FROM notifications WHERE viewed='no' AND user_to='$userLoggedIn'");

		return mysqli_num_rows($query);
	}


	public function getNotifications($data, $limit)
	{
		// Set default page if not provided
		$page = isset($data['page']) ? $data['page'] : 1;
		$userLoggedIn = $this->user_obj->getUsername();
		
		if ($page == 1)
			$start = 0;
		else
			$start = ($page - 1) * $limit;

		// Mark notifications as viewed
		$set_viewed_query = mysqli_query($this->con, "UPDATE notifications SET viewed='yes' WHERE user_to='$userLoggedIn'");

		// Get notifications with post data
		$query = mysqli_query($this->con, "SELECT notifications.user_to, notifications.user_from, message, link, datetime, 
		post_ID, heading, opened, CONCAT(SUBSTRING(posts.body, 1, 40), '...') AS 'post_body'
				FROM notifications, posts
				WHERE notifications.post_ID = posts.id 
				AND notifications.user_to = '$userLoggedIn' 
				ORDER BY datetime DESC
		");

		// Check if there are any notifications
		if (mysqli_num_rows($query) == 0) {
			return json_encode([
				'has_notifications' => false,
				'message' => 'You have no notifications!'
			]);
		}

		$num_iterations = 0; // Number of messages checked
		$count = 1; // Number of messages posted
		$notifications = []; // Array to store notification data

		while ($row = mysqli_fetch_array($query)) {
			// Skip iterations based on pagination
			if ($num_iterations++ < $start)
				continue;

			// Break if we've reached the limit
			if ($count > $limit)
				break;
			else
				$count++;

			// Get user data for the notification sender
			$user_from = $row['user_from'];
			$user_data_query = mysqli_query($this->con, "SELECT * FROM users WHERE username='$user_from'");
			$user_data = mysqli_fetch_array($user_data_query);

			// Format the timestamp
			$time_message = new GetDate($row['datetime']);
			$time_message->getTheDate($row['datetime']);
			$time_message = $time_message->time_message;

			// Check if notification has been opened
			$opened = $row['opened'];
			$is_new = ($opened == 'no');

			// Create a notification object with all necessary data
			$notifications[] = [
				'user_from' => $user_from,
				'message' => $row['message'],
				'link' => $row['link'],
				'datetime' => $row['datetime'],
				'time_message' => $time_message,
				'post_id' => $row['post_ID'],
				'heading' => $row['heading'],
				'post_body' => $row['post_body'],
				'is_new' => $is_new,
				'profile_pic' => $user_data['profile_pic'],
				'first_name' => $user_data['first_name'],
				'last_name' => $user_data['last_name']
			];
		}

		// Create the response data
		$response = [
			'has_notifications' => true,
			'notifications' => $notifications,
			'pagination' => [
				'current_page' => $page,
				'has_more' => ($count > $limit),
				'next_page' => ($count > $limit) ? $page + 1 : null
			]
		];

		return json_encode($response);
	}



	public function insertNotification($post_id, $user_to, $type)
	{

		$userLoggedIn = $this->user_obj->getUsername();
		$userLoggedInName = $this->user_obj->getFirstAndLastName();

		$date_time = date("Y-m-d H:i:s");


		switch ($type) {
			case 'comment':
				$message = $userLoggedInName . " commented on your post";
				break;
			case 'like':
				$message = $userLoggedInName . " liked your post";
				break;
			case 'profile_post':
				$message = $userLoggedInName . " posted on your profile";
				break;
			case 'comment_non_owner':
				$message = $userLoggedInName . " commented on a post you commented on";
				break;
			case 'profile_comment':
				$message = $userLoggedInName . " commented on your profile post";
				break;
		}

		$link = "post.php?id=" . $post_id;

		$insert_query = mysqli_query($this->con, "INSERT INTO notifications VALUES('', '$user_to', '$userLoggedIn', '$message', '$link', '$date_time', 'no', 'no', '$post_id')");
	}
}
