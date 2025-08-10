<?php
class Post {
    private $user_obj;
    private $con;

    public function __construct($con, $user) {
        $this->con = $con;
        $this->user_obj = new User($con, $user);
    }

    public function submitPost($body, $user_to, $imageName, $heading) {
        $body = mysqli_real_escape_string($this->con, $body);
        $heading = strip_tags($heading);
        $heading = mysqli_real_escape_string($this->con, $heading);
        $check_empty = preg_replace('/\s+/', '', $body);

        if ($check_empty == "") {
            return [
                'status' => 'error',
                'message' => 'Post content cannot be empty'
            ];
        }

        $date_added = date("Y-m-d H:i:s");
        $added_by = $this->user_obj->getUsername();
        $user_to = ($user_to == $added_by) ? "none" : $user_to;

        $query = mysqli_query($this->con, "INSERT INTO posts VALUES('', '$body', '$heading','$added_by', '$user_to', '$date_added', 'no', 'no', '0', '$imageName')");
        
        if (!$query) {
            return [
                'status' => 'error',
                'message' => 'Database error while creating post'
            ];
        }

        $returned_id = mysqli_insert_id($this->con);
        $num_posts = $this->user_obj->getNumPosts();
        $num_posts++;
        mysqli_query($this->con, "UPDATE users SET num_posts='$num_posts' WHERE username='$added_by'");

        return [
            'status' => 'success',
            'message' => 'Post created successfully',
            'data' => [
                'post_id' => $returned_id,
                'body' => $body,
                'heading' => $heading,
                'added_by' => $added_by,
                'date_added' => $date_added,
                'image' => $imageName
            ]
        ];
    }

    /**
     * Loads posts from friends for the news feed with pagination
     * 
     * This method retrieves posts created by the user's friends and formats them for display
     * in the news feed. It implements pagination to load posts in batches and includes
     * detailed information about each post including author details, post content,
     * likes, comments, and permissions.
     * 
     * @param array $data An array containing pagination parameters, must include 'page'
     * @param int $limit Maximum number of posts to return per page (default: 10)
     * @return array Structured array with post data and pagination information
     */
    public function loadPostsFriends($data, $limit = 10) {
        // Extract the requested page number from input data
        $page = $data['page'];
        
        // Get the currently logged-in username
        $userLoggedIn = $this->user_obj->getUsername();
        
        // Calculate the starting position for pagination
        // For page 1, start at 0; for subsequent pages, calculate offset
        $start = ($page == 1) ? 0 : ($page - 1) * $limit;

        // Initialize empty array to store post data
        $posts = [];
        
        // Query to fetch all non-deleted posts, ordered by newest first
        // Note: This fetches ALL posts initially, filtering happens in PHP
        $data_query = mysqli_query($this->con, "SELECT * FROM posts WHERE deleted='no' ORDER BY id DESC");

        if (mysqli_num_rows($data_query) > 0) {
            // Counter for tracking how many results we've processed
            $num_iterations = 0; 
            
            // Counter for how many posts we've actually added to the result
            $count = 1;

            // Process each post from the database
            while ($row = mysqli_fetch_array($data_query)) {
                // Extract basic post data
                $id = $row['id'];
                $body = $row['body'];
                $heading = $row['heading'];
                $added_by = $row['added_by']; // Username of post author
                $date_time = $row['date_added'];
                $imagePath = $row['image'];

                // Check if post author's account is closed/deactivated
                // If so, skip this post entirely
                $added_by_obj = new User($this->con, $added_by);
                if ($added_by_obj->isClosed()) {
                    continue;
                }

                // Check if current user is friends with the post author
                // This is the main filtering mechanism - only show posts from friends
                $user_logged_obj = new User($this->con, $userLoggedIn);
                if ($user_logged_obj->isFriend($added_by)) {
                    // Pagination logic: Skip posts before our starting point
                    if ($num_iterations++ < $start) continue;
                    
                    // Break once we've collected enough posts for this page
                    if ($count > $limit) break;
                    
                    // Increment count of posts added to results
                    $count++;

                    // Get additional details about the post author
                    $user_details_query = mysqli_query($this->con, "SELECT first_name, last_name, profile_pic FROM users WHERE username='$added_by'");
                    $user_row = mysqli_fetch_array($user_details_query);

                    // Handle user_to information (for posts directed to specific users)
                    // If post is directed to a specific user, get their info
                    $user_to_info = null;
                    if ($row['user_to'] != "none") {
                        $user_to_obj = new User($this->con, $row['user_to']);
                        $user_to_info = [
                            'username' => $row['user_to'],
                            'full_name' => $user_to_obj->getFirstAndLastName()
                        ];
                    }

                    // Create a truncated version of the post body for preview
                    // This removes HTML tags and limits text to 500 characters
                    $body_truncated = strip_tags($body);
                    if (strlen($body_truncated) > 500) {
                        // Cut at 500 characters, then find the last space to avoid cutting words
                        $stringCut = substr($body_truncated, 0, 500);
                        $endPoint = strrpos($stringCut, ' ');
                        $body_truncated = $endPoint ? substr($stringCut, 0, $endPoint) . '...' : substr($stringCut, 0) . '...';
                    }

                    $get_date_format = new GetDate();
                    $time_message = $get_date_format->getTheDate($date_time);

                    // Build a structured array with all post data
                    // This will be converted to JSON for the frontend
                    $posts[] = [
                        'id' => $id,
                        'body' => $body,                        // Full post content with HTML
                        'body_truncated' => $body_truncated,    // Truncated plain text for previews
                        'heading' => $heading,
                        'added_by' => [                         // Post author information
                            'username' => $added_by,
                            'first_name' => $user_row['first_name'],
                            'last_name' => $user_row['last_name'],
                            'profile_pic' => $user_row['profile_pic']
                        ],
                        'user_to' => $user_to_info,             // Target user info (if applicable)
                        'time_message' => $time_message, // Formatted time (e.g., "2 hours ago")
                        'image' => $imagePath ? $imagePath : null, // Post image if exists
                        'likes' => $this->getLikes($id),        // Number of likes
                        'comments_count' => count($this->getComments($id)), // Number of comments
                        'can_delete' => $added_by === $userLoggedIn, // Permission check for deletion
                        'link' => 'post.php?id=' . $id         // Direct link to full post
                    ];
                }
            }
        }

        // Get total count of non-deleted posts for pagination calculations
        $total_query = mysqli_query($this->con, "SELECT COUNT(*) as total FROM posts WHERE deleted='no'");
        $total_row = mysqli_fetch_array($total_query);
        $total = (int)$total_row['total'];
        
        // Determine if there are more posts available beyond this page
        // This is used by the frontend to know whether to show "load more" functionality
        $has_more = ($start + $count) < $total;
        
        // Return a structured response with status, posts data, and pagination info
        return [
            'status' => 'success',
            'data' => [
                'posts' => $posts,                // Array of post data
                'has_more' => $has_more,          // Boolean flag for more posts
                'next_page' => $page + 1,         // Next page number for pagination
                'total' => $total                 // Total post count
            ]
        ];
    }

    public function loadHighLightPosts($data)
	{

		// $page = $data['page'];


		$str = ""; //String to return
		$data_query = mysqli_query($this->con, "SELECT * FROM posts WHERE deleted='no' ORDER BY likes DESC LIMIT 6");

		while ($row = mysqli_fetch_array($data_query)) {
		     // Extract basic post data
             $id = $row['id'];
             $body = $row['body'];
             $heading = $row['heading'];
             $added_by = $row['added_by']; // Username of post author
             $date_time = $row['date_added'];
             $imagePath = $row['image'];

            // Create a truncated version of the post body for preview
            // This removes HTML tags and limits text to 500 characters
            $body_truncated = strip_tags($body);
            if (strlen($body_truncated) > 500) {
                // Cut at 500 characters, then find the last space to avoid cutting words
                $stringCut = substr($body_truncated, 0, 500);
                $endPoint = strrpos($stringCut, ' ');
                $body_truncated = $endPoint ? substr($stringCut, 0, $endPoint) . '...' : substr($stringCut, 0) . '...';
            }

			$user_details_query = mysqli_query($this->con, "SELECT first_name, last_name, profile_pic FROM users WHERE username='$added_by'");
			$user_row = mysqli_fetch_array($user_details_query);
			$first_name = $user_row['first_name'];
			$last_name = $user_row['last_name'];
			$profile_pic = $user_row['profile_pic'];

			$comments_check = mysqli_query($this->con, "SELECT * FROM comments WHERE post_id='$id' AND removed='no'");
			$comments_check_num = mysqli_num_rows($comments_check);


			$get_date_format = new GetDate();
			$time_message = $get_date_format->getTheDate($date_time);

              // Build a structured array with all post data
            // This will be converted to JSON for the frontend

            $posts[] = [
                'id' => $id,
                'body' => $body,
                'body_truncated' => $body_truncated,
                'heading' => $heading,
                'added_by' => [
                    'username' => $added_by,
                    'first_name' => $user_row['first_name'],
                    'last_name' => $user_row['last_name'],
                    'profile_pic' => $user_row['profile_pic']
                ],
                'time_message' => $time_message,
                'image' => $imagePath ? $imagePath : null,
                'likes' => $this->getLikes($id),
                'comments_count' => count($this->getComments($id)),
                'link' => 'post.php?id=' . $id
            ];

	


		} //End while loop

		return [
			'status' => 'success',
			'data' => $posts
		];
	}

    private function getTime($datetime) {
        $timestamp = strtotime($datetime);
        $timeAgo = time() - $timestamp;

        if ($timeAgo < 60) {
            return "Just now";
        } else if ($timeAgo < 3600) {
            $minutes = floor($timeAgo / 60);
            return $minutes . " minute" . ($minutes > 1 ? "s" : "") . " ago";
        } else if ($timeAgo < 86400) {
            $hours = floor($timeAgo / 3600);
            return $hours . " hour" . ($hours > 1 ? "s" : "") . " ago";
        } else if ($timeAgo < 604800) {
            $days = floor($timeAgo / 86400);
            return $days . " day" . ($days > 1 ? "s" : "") . " ago";
        } else {
            return date("F j, Y", $timestamp);
        }
    }

    private function getLikes($post_id) {
        $query = mysqli_query($this->con, "SELECT COUNT(*) as count FROM likes WHERE post_id='$post_id'");
        $row = mysqli_fetch_array($query);
        return $row['count'];
    }

    public function getLikedBy($post_id)
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

        $liked_by = [];
       while ($row = mysqli_fetch_array($get_liked_by)) {
           $id = $row['id'];
           $username = $row['username'];
           $first_name = $row['first_name'];
           $last_name = $row['last_name'];
           $profile_pic = $row['profile_pic'];
           $liked_by[] = [
               'id' => $id,
               'username' => $username,
               'first_name' => $first_name,
               'last_name' => $last_name,
               'profile_pic' => $profile_pic
           ];
       }

		return $liked_by;
	}

    private function getComments($post_id, $added_by = null) {
        $get_comments = mysqli_query($this->con, "SELECT * FROM comments WHERE post_id='$post_id' AND removed='no' ORDER BY id ASC");
        $comments = [];

        while($comment = mysqli_fetch_array($get_comments)) {
            $comment_body = $comment['post_body'];
            $posted_to = $comment['posted_to'];
            $posted_by = $comment['posted_by'];
            $date_added = $comment['date_added'];
            $removed = $comment['removed'];
            $comment_id = $comment['id'];

            // Get comment author details
            $user_obj = new User($this->con, $posted_by);
            $full_name = $user_obj->getFirstAndLastName();
            $prof_pic = $user_obj->getProfilePic();
            $loggedUser = $this->user_obj->getUsername();

            $get_date_format = new GetDate();
            $date_added = $get_date_format->getTheDate($date_added);

            // Determine if user can edit/delete the comment
            $showEditBtn = '';
            $response = '';

            if($loggedUser == $posted_by) {
                $showEditBtn = '
                <button class="heading-3 commentStateBtn editCommentbtn">Edit</button>
                <button class="heading-3 commentStateBtn deleteCommentbtn">Delete</button>
                <button class="heading-3 commentStateBtn saveCommentbtn">Save</button>
                <button class="heading-3 commentStateBtn cancelCommentbtn">Cancel</button>
                ';
                $response = '<li class="response"></li>';
            }

            $comments[] = [
                'id' => $comment_id,
                'body' => $comment_body,
                'posted_to' => $posted_to,
                'posted_by' => [
                    'username' => $posted_by,
                    'full_name' => $full_name,
                    'profile_pic' => $prof_pic
                ],
                'date_added' => $date_added,
                'removed' => $removed,
                'show_edit_btn' => $showEditBtn,
                'response' => $response,
                'can_edit' => $loggedUser == $posted_by
            ];
        }

        return $comments;
    }

    public function calculateTrend($term) {
        if (empty($term)) {
            return false;
        }

        // Sanitize the term to prevent SQL injection
        $term = mysqli_real_escape_string($this->con, trim($term));

        try {
            // Check if trend exists
            $query = mysqli_query($this->con, "SELECT hits FROM trends WHERE title='$term' LIMIT 1");
            if (!$query) {
                throw new Exception(mysqli_error($this->con));
            }

            if (mysqli_num_rows($query) == 0) {
                // Insert new trend
                $insert_query = mysqli_query($this->con, "INSERT INTO trends (title, hits) VALUES ('$term', 1)");
                if (!$insert_query) {
                    throw new Exception(mysqli_error($this->con));
                }
            } else {
                // Update existing trend
                $update_query = mysqli_query($this->con, "UPDATE trends SET hits = hits + 1 WHERE title='$term'");
                if (!$update_query) {
                    throw new Exception(mysqli_error($this->con));
                }
            }

            return true;
        } catch (Exception $e) {
            // Log error - in a production environment, use proper error logging
            error_log("Error in calculateTrend: " . $e->getMessage());
            return false;
        }
    }

    public function loadProfilePosts($data, $limit = 10) {
        $page = isset($data['page']) ? (int)$data['page'] : 1;
        $profileUser = mysqli_real_escape_string($this->con, $data['profileUsername']);
        $userLoggedIn = $this->user_obj->getUsername();
        $start = ($page == 1) ? 0 : ($page - 1) * $limit;

        try {
            // Get posts either created by profile user or directed to them
            $data_query = mysqli_query($this->con, "
                SELECT p.*, u.first_name, u.last_name, u.profile_pic 
                FROM posts p
                INNER JOIN users u ON p.added_by = u.username
                WHERE p.deleted='no' 
                AND ((p.added_by='$profileUser' AND p.user_to='none') 
                    OR p.user_to='$profileUser')
                ORDER BY p.id DESC
                LIMIT $start, $limit
            ");

            if (!$data_query) {
                throw new Exception(mysqli_error($this->con));
            }

            $posts = [];
            while ($row = mysqli_fetch_array($data_query)) {
                $id = $row['id'];
                $body = $row['body'];
                $heading = $row['heading'];
                $added_by = $row['added_by'];
                $date_time = $row['date_added'];
                $imagePath = $row['image'];

                // Truncate body text
                $body_truncated = strip_tags($body);
                if (strlen($body_truncated) > 500) {
                    $stringCut = substr($body_truncated, 0, 500);
                    $endPoint = strrpos($stringCut, ' ');
                    $body_truncated = $endPoint ? substr($stringCut, 0, $endPoint) . '...' : substr($stringCut, 0) . '...';
                }

                // Handle user_to info
                $user_to_info = null;
                if ($row['user_to'] != "none") {
                    $user_to_obj = new User($this->con, $row['user_to']);
                    $user_to_info = [
                        'username' => $row['user_to'],
                        'full_name' => $user_to_obj->getFirstAndLastName()
                    ];
                }

                $get_date_format = new GetDate();
                $time_message = $get_date_format->getTheDate($date_time);

                $posts[] = [
                    'id' => $id,
                    'body' => $body,
                    'body_truncated' => $body_truncated,
                    'heading' => $heading,
                    'added_by' => [
                        'username' => $added_by,
                        'first_name' => $row['first_name'],
                        'last_name' => $row['last_name'],
                        'profile_pic' => $row['profile_pic']
                    ],
                    'user_to' => $user_to_info,
                    'time_message' => $time_message,
                    'image' => $imagePath ? '/uploads/posts/' . $imagePath : null,
                    'likes' => $this->getLikes($id),
                    'comments_count' => count($this->getComments($id)),
                    'can_delete' => $added_by === $userLoggedIn,
                    'link' => '/post.php?id=' . $id
                ];
            }

            // Get total count for pagination
            $total_query = mysqli_query($this->con, "
                SELECT COUNT(*) as total 
                FROM posts 
                WHERE deleted='no' 
                AND ((added_by='$profileUser' AND user_to='none') 
                    OR user_to='$profileUser')
            ");

            if (!$total_query) {
                throw new Exception(mysqli_error($this->con));
            }

            $total_row = mysqli_fetch_array($total_query);
            $total = $total_row['total'];

            return [
                'status' => 'success',
                'data' => [
                    'posts' => $posts,
                    'has_more' => ($total > ($start + $limit)),
                    'next_page' => $page + 1,
                    'total' => $total
                ]
            ];

        } catch (Exception $e) {
            error_log("Error in loadProfilePosts: " . $e->getMessage());
            return [
                'status' => 'error',
                'message' => 'An error occurred while loading posts.'
            ];
        }
    }

    public function sendComment($post_author, $commentText, $post_id, $user_to) {
        try {
            // Input validation
            if (empty($post_author) || empty($post_id)) {
                throw new Exception('Missing required parameters');
            }

            $userLoggedIn = $this->user_obj->getUsername();
            
            // Sanitize and format comment text
            $body = strip_tags($commentText);
            if (empty($body)) {
                return [
                    'status' => 'error',
                    'message' => 'Comment text cannot be empty'
                ];
            }

            // Clean and format the text
            $body = mysqli_real_escape_string($this->con, $body);
            $body = str_replace('\r\n', "\n", $body);
            $body = nl2br($body);

            // Sanitize other inputs
            $post_id = (int)$post_id;
            $post_author = mysqli_real_escape_string($this->con, $post_author);
            $user_to = mysqli_real_escape_string($this->con, $user_to);

            // Insert comment
            $insert_query = mysqli_query($this->con, "INSERT INTO comments (post_body, posted_by, posted_to, date_added, removed, post_id) 
                VALUES ('$body', '$userLoggedIn', '$post_author', NOW(), 'no', '$post_id')
            ");

            if (!$insert_query) {
                throw new Exception(mysqli_error($this->con));
            }

            // Handle notifications
            try {
                $notification = new Notification($this->con, $userLoggedIn);

                // Notify post author if different from commenter
                if ($post_author !== $userLoggedIn) {
                    $notification->insertNotification($post_id, $post_author, "comment");
                }

                // Notify user_to if applicable
                if ($user_to !== 'none' && $user_to !== $userLoggedIn) {
                    $notification->insertNotification($post_id, $user_to, "profile_comment");
                }

                // Notify other commenters
                $get_commenters = mysqli_query($this->con, "SELECT DISTINCT posted_by FROM comments WHERE post_id=? AND removed='no'");
                if (!$get_commenters) {
                    throw new Exception(mysqli_error($this->con));
                }

                $notified_users = [$post_author, $user_to, $userLoggedIn];
                while ($row = mysqli_fetch_array($get_commenters)) {
                    $commenter = $row['posted_by'];
                    if (!in_array($commenter, $notified_users)) {
                        $notification->insertNotification($post_id, $commenter, "comment_non_owner");
                        $notified_users[] = $commenter;
                    }
                }
            } catch (Exception $e) {
                // Log notification errors but don't fail the comment submission
                error_log("Error sending notifications: " . $e->getMessage());
            }

            // Get the newly created comment, which will be the last comment in the array
             $comment = $this->getComments($post_id)[count($this->getComments($post_id)) - 1] ?? null;

            return [
                'status' => 'success',
                'message' => 'Comment posted successfully',
                'data' => $comment
            ];

        } catch (Exception $e) {
            error_log("Error in sendComment: " . $e->getMessage());
            return [
                'status' => 'error',
                'message' => $e->getMessage(),
                'error_data' => $e->getMessage()
            ];
        }
    }

    public function editComment($data) {
        try {
            // Validate required fields
            $required_fields = ['comment_Body', 'commentToUser', 'post_id', 'comment_id', 'userLoggedIn'];
            foreach ($required_fields as $field) {
                if (!isset($data[$field]) || empty($data[$field])) {
                    throw new Exception("Missing required field: {$field}");
                }
            }

            // Extract and sanitize inputs
            $body = strip_tags($data['comment_Body']);
            $comment_id = (int)$data['comment_id'];
            $post_id = (int)$data['post_id'];
            $posted_by = mysqli_real_escape_string($this->con, $data['userLoggedIn']);
            $posted_to = mysqli_real_escape_string($this->con, $data['commentToUser']);

            // Verify the user has permission to edit this comment
            $verify_query = mysqli_query($this->con, "
                SELECT posted_by 
                FROM comments 
                WHERE id = $comment_id 
                AND removed = 'no'
            ");

            if (!$verify_query) {
                throw new Exception(mysqli_error($this->con));
            }

            $comment_data = mysqli_fetch_array($verify_query);
            if (!$comment_data) {
                return [
                    'status' => 'error',
                    'message' => 'Comment not found or has been removed'
                ];
            }

            if ($comment_data['posted_by'] !== $posted_by) {
                return [
                    'status' => 'error',
                    'message' => 'You do not have permission to edit this comment'
                ];
            }

            // Clean and format the text
            $body = mysqli_real_escape_string($this->con, $body);
            $body = str_replace('\r\n', "\n", $body);
            $body = nl2br($body);

            // Update the comment
            $query = mysqli_query($this->con, "
                UPDATE comments 
                SET post_body = '$body',
                    date_added = NOW()
                WHERE id = $comment_id 
                AND posted_by = '$posted_by'
            ");

            if (!$query) {
                throw new Exception(mysqli_error($this->con));
            }

            // // Get the updated comment
            // $updated_comment = $this->getComments($post_id, $posted_by);
            // $comment = array_filter($updated_comment, function($c) use ($comment_id) {
            //     return $c['id'] == $comment_id;
            // });

            return [
                'status' => 'success',
                'message' => 'Comment updated successfully',
                // 'data' => !empty($comment) ? reset($comment) : null
            ];

        } catch (Exception $e) {
            error_log("Error in sendComment: " . $e->getMessage());
            return [
                'status' => 'error',
                'message' => $e->getMessage(),
                'error_data' => $e->getMessage()
            ];
        }
    }

    public function deleteComment($data) {
        try {
            // Validate required fields
            if (!isset($data['comment_id']) || !isset($data['userLoggedIn'])) {
                throw new Exception('Missing required fields');
            }

            // Extract and sanitize inputs
            $comment_id = (int)$data['comment_id'];
            $posted_by = mysqli_real_escape_string($this->con, $data['userLoggedIn']);

            // Verify the comment exists and user has permission to delete it
            $verify_query = mysqli_query($this->con, "
                SELECT c.posted_by, c.post_id, p.added_by 
                FROM comments c
                LEFT JOIN posts p ON c.post_id = p.id
                WHERE c.id = $comment_id 
                AND c.removed = 'no'
            ");

            if (!$verify_query) {
                throw new Exception(mysqli_error($this->con));
            }

            $comment_data = mysqli_fetch_array($verify_query);
            if (!$comment_data) {
                return [
                    'status' => 'error',
                    'message' => 'Comment not found or already removed'
                ];
            }

            // Check if user has permission (either comment author or post author)
            if ($comment_data['posted_by'] !== $posted_by && $comment_data['added_by'] !== $posted_by) {
                return [
                    'status' => 'error',
                    'message' => 'You do not have permission to delete this comment'
                ];
            }

            // Soft delete the comment
            $query = mysqli_query($this->con, "
                UPDATE comments 
                SET removed = 'yes' 
                WHERE id = $comment_id
            ");

            if (!$query) {
                throw new Exception(mysqli_error($this->con));
            }

            return [
                'status' => 'success',
                'message' => 'Comment deleted successfully',
                'data' => [
                    'comment_id' => $comment_id,
                    'post_id' => $comment_data['post_id']
                ]
            ];

        } catch (Exception $e) {
            error_log("Error in deleteComment: " . $e->getMessage());
            return [
                'status' => 'error',
                'message' => 'An error occurred while deleting the comment' . $e->getMessage()
            ];
        }
    }

    public function getAllLikes($post_id) {
        try {
            // Validate and sanitize input
            $post_id = (int)$post_id;
            if ($post_id <= 0) {
                throw new Exception('Invalid post ID');
            }

            $userLoggedIn = $this->user_obj->getUsername();

            // Get post info
            $get_likes = mysqli_query($this->con, "
                SELECT likes, added_by 
                FROM posts 
                WHERE id = $post_id
            ");

            if (!$get_likes) {
                throw new Exception(mysqli_error($this->con));
            }

            $row = mysqli_fetch_array($get_likes);
            if (!$row) {
                return [
                    'status' => 'error',
                    'message' => 'Post not found'
                ];
            }

            // Get detailed like information
            $get_liked_by = mysqli_query($this->con, "
                SELECT 
                    l.id as like_id,
                    u.username,
                    u.first_name,
                    u.last_name,
                    u.profile_pic
                FROM likes l
                INNER JOIN users u ON u.username = l.username
                WHERE l.post_id = $post_id
                ORDER BY l.id DESC
            ");

            if (!$get_liked_by) {
                throw new Exception(mysqli_error($this->con));
            }

            $likes = [];
            while ($like = mysqli_fetch_array($get_liked_by)) {
                $likes[] = [
                    'id' => (int)$like['like_id'],
                    'username' => $like['username'],
                    'first_name' => $like['first_name'],
                    'last_name' => $like['last_name'],
                    'full_name' => $like['first_name'] . ' ' . $like['last_name'],
                    'profile_pic' => $like['profile_pic'],
                    'profile_url' => '/profile.php?profile_username=' . $like['username']
                ];
            }

            return [
                'status' => 'success',
                'data' => [
                    'post_id' => $post_id,
                    'total_likes' => (int)$row['likes'],
                    'added_by' => $row['added_by'],
                    'likes' => $likes
                ]
            ];

        } catch (Exception $e) {
            error_log("Error in getAllLikes: " . $e->getMessage());
            return [
                'status' => 'error',
                'message' => 'An error occurred while fetching likes'
            ];
        }
    }

    public function updateLikes($post_id, $value) {
        try {
            // Validate inputs
            $post_id = (int)$post_id;
            $value = (int)$value;
            
            if ($post_id <= 0) {
                throw new Exception('Invalid post ID');
            }
            
            if ($value !== 1 && $value !== 2) { // 1 = like, 2 = unlike
                throw new Exception('Invalid like action');
            }

            $userLoggedIn = $this->user_obj->getUsername();
            
            // Get current post info
            $get_likes = mysqli_query($this->con, "
                SELECT p.likes, p.added_by, u.num_likes 
                FROM posts p
                INNER JOIN users u ON p.added_by = u.username
                WHERE p.id = $post_id
            ");

            if (!$get_likes) {
                throw new Exception(mysqli_error($this->con));
            }

            $row = mysqli_fetch_array($get_likes);
            if (!$row) {
                return [
                    'status' => 'error',
                    'message' => 'Post not found'
                ];
            }

            $total_likes = (int)$row['likes'];
            $user_liked = $row['added_by'];
            $total_user_likes = (int)$row['num_likes'];

            // Start transaction
            mysqli_begin_transaction($this->con);

            try {
                if ($value === 1) { // Like
                    // Update post likes
                    $total_likes++;
                    $query = mysqli_query($this->con, "UPDATE posts SET likes = $total_likes WHERE id = $post_id");
                    if (!$query) throw new Exception(mysqli_error($this->con));

                    // Update user total likes
                    $total_user_likes++;
                    $user_likes = mysqli_query($this->con, "UPDATE users SET num_likes = $total_user_likes WHERE username = '$user_liked'");
                    if (!$user_likes) throw new Exception(mysqli_error($this->con));

                    // Insert like record
                    $insert_user = mysqli_query($this->con, "INSERT INTO likes (username, post_id) VALUES ('$userLoggedIn', $post_id)");
                    if (!$insert_user) throw new Exception(mysqli_error($this->con));

                    // Send notification
                    if ($user_liked !== $userLoggedIn) {
                        $notification = new Notification($this->con, $userLoggedIn);
                        $notification->insertNotification($post_id, $user_liked, "like");
                    }
                } else { // Unlike
                    // Update post likes
                    $total_likes--;
                    $query = mysqli_query($this->con, "UPDATE posts SET likes = $total_likes WHERE id = $post_id");
                    if (!$query) throw new Exception(mysqli_error($this->con));

                    // Update user total likes
                    $total_user_likes--;
                    $user_likes = mysqli_query($this->con, "UPDATE users SET num_likes = $total_user_likes WHERE username = '$user_liked'");
                    if (!$user_likes) throw new Exception(mysqli_error($this->con));

                    // Remove like record
                    $delete_user = mysqli_query($this->con, "DELETE FROM likes WHERE username = '$userLoggedIn' AND post_id = $post_id");
                    if (!$delete_user) throw new Exception(mysqli_error($this->con));
                }

                // Get updated likes info
                $recent_likers = mysqli_query($this->con, "
                    SELECT 
                        l.id as like_id,
                        u.username,
                        u.first_name,
                        u.last_name,
                        u.profile_pic
                    FROM likes l
                    INNER JOIN users u ON u.username = l.username
                    WHERE l.post_id = $post_id
                    ORDER BY l.id DESC
                    LIMIT 3
                ");

                if (!$recent_likers) throw new Exception(mysqli_error($this->con));

                $likers = [];
                while ($liker = mysqli_fetch_array($recent_likers)) {
                    $likers[] = [
                        'id' => (int)$liker['like_id'],
                        'username' => $liker['username'],
                        'first_name' => $liker['first_name'],
                        'last_name' => $liker['last_name'],
                        'profile_pic' => $liker['profile_pic']
                    ];
                }

                mysqli_commit($this->con);

                return [
                    'status' => 'success',
                    'data' => [
                        'post_id' => $post_id,
                        'total_likes' => $total_likes,
                        'action' => $value === 1 ? 'liked' : 'unliked',
                        'recent_likers' => $likers,
                        'remaining_likes' => max(0, $total_likes - 3),
                        'is_liked' => $value === 1
                    ]
                ];

            } catch (Exception $e) {
                mysqli_rollback($this->con);
                throw $e;
            }

        } catch (Exception $e) {
            error_log("Error in updateLikes: " . $e->getMessage());
            return [
                'status' => 'error',
                'message' => 'An error occurred while updating likes'
            ];
        }
    }

    public function getSinglePost($post_id) {
        $userLoggedIn = $this->user_obj->getUsername();

        // Mark notifications as read
        mysqli_query($this->con, "UPDATE notifications SET opened='yes' WHERE user_to='$userLoggedIn' AND link LIKE '%=$post_id'");

        $data_query = mysqli_query($this->con, "SELECT * FROM posts WHERE deleted='no' AND id='$post_id'");

        if (mysqli_num_rows($data_query) > 0) {
            $row = mysqli_fetch_array($data_query);
            $id = $row['id'];
            $body = $row['body'];
            $heading = $row['heading'];
            $added_by = $row['added_by'];
            $date_time = $row['date_added'];
            $imagePath = $row['image'];
            $user_to = $row['user_to'];

            // Handle user_to formatting
            $user_to_info = null;
            if ($user_to != "none") {
                $user_to_obj = new User($this->con, $user_to);
                $user_to_name = $user_to_obj->getFirstAndLastName();
                $user_to_info = [
                    'username' => $user_to,
                    'name' => $user_to_name
                ];
            }

            // Check if post author's account is closed
            $added_by_obj = new User($this->con, $added_by);
            if ($added_by_obj->isClosed()) {
                return [
                    'status' => 'error',
                    'message' => 'This post is not available'
                ];
            }

            // Get post author details
            $user_details_query = mysqli_query($this->con, "SELECT first_name, last_name, profile_pic FROM users WHERE username='$added_by'");
            $user_row = mysqli_fetch_array($user_details_query);

            // Get comments count
            $comments_check = mysqli_query($this->con, "SELECT * FROM comments WHERE post_id='$id' AND removed='no'");
            $comments_count = mysqli_num_rows($comments_check);

            // Get time message
            // $time_message = new GetDate($date_time);
            // $time_message->getTheDate($date_time);

            $get_date_format = new GetDate();
            $time_message = $get_date_format->getTheDate($date_time);

            return [
                'status' => 'success',
                'data' => [
                    'id' => $id,
                    'body' => $body,
                    'heading' => $heading,
                    'added_by' => [
                        'username' => $added_by,
                        'first_name' => $user_row['first_name'],
                        'last_name' => $user_row['last_name'],
                        'profile_pic' => $user_row['profile_pic']
                    ],
                    'user_to' => $user_to_info,
                    'date_added' => $date_time,
                    'time_message' => $time_message,
                    'image' => $imagePath ? $imagePath : null,
                    'can_edit' => $userLoggedIn == $added_by,
                    'can_delete' => $userLoggedIn == $added_by,
                    'likes' => $this->getLikes($id),
                    'liked_by' => $this->getLikedBy($id),
                    'comments_count' => $comments_count,
                    'comments' => $this->getComments($id, $added_by)
                ]
            ];
        }

        return [
            'status' => 'error',
            'post_id tried' => $post_id,
            'message' => 'Post not found. If you clicked a link, it may be broken.'
        ];
    }

    public function deletePost($data)
	{
		// Handle both array and direct value parameters
		$post_id = is_array($data) ? $data['post_id'] : $data;

		// Make sure we have a valid post ID
		if (!$post_id) {
			return false;
		}

		$query = mysqli_query($this->con, "UPDATE posts SET deleted='yes' WHERE id='$post_id'");

		return $query ? true : false;
	}

    
}
