<?php

class User
{
    private $user;
    private $con;

    public function __construct($con, $user)
    {
        //   $this->con = $con;
        //   $user_details_query = mysqli_query($con, "SELECT * FROM users WHERE username='$user'");
        //   $this->user = mysqli_fetch_array($user_details_query);

        $this->con = $con;
        $user_details_query = mysqli_query($con, "SELECT * FROM users WHERE username='$user'");
        if ($user_details_query) {
            $this->user = mysqli_fetch_array($user_details_query);
            if ($this->user === null || $this->user === false) {
                // Handle the case where no user is found or query failed
                $this->user = []; // Set to an empty array or handle differently based on your application logic
            }
        } else {
            // Query failed to execute
            $this->user = []; // Set to an empty array or handle differently based on your application logic
            // Optionally, log this error or handle it as required
        }
    }

    //   public function getUsername()
    //   {
    //       return $this->user['username'];
    //   }

    public function getUsername()
    {
        // Check if 'username' key exists and is not null
        if (isset($this->user['username'])) {
            return $this->user['username'];
        } else {
            return null; // Return null or some default value if 'username' key does not exist
        }
    }


    public function getNumberOfFriendRequests()
    {
        $username = $this->user['username'];
        $query = mysqli_query($this->con, "SELECT * FROM friend_requests WHERE user_to='$username'");
        return mysqli_num_rows($query);
    }

    public function getFriendsRequests()
    {
        $username = $this->user['username'];
        $theReqs = [];
        $response = [];


        try {
          
        $query = mysqli_query($this->con, "SELECT * FROM friend_requests WHERE user_to='$username'");


        if (mysqli_num_rows($query) == 0) {
            $list = [
                'status' => 'success',
                'message' => 'You have no friend requests at this time!'
            ];
        } else {

            while ($row = mysqli_fetch_array($query)) {
                $user_from = $row['user_from'];

                $user_from_fullname = $this->getFullnameForReqs($user_from);

                if (!in_array($user_from, $theReqs)) {
                    array_push($theReqs, $user_from);
                }
            }

            foreach ($theReqs as $req) {

                $user_pic = $this->getProfilePicForReqs($req);
                $user_from_fullname = $this->getFullnameForReqs($req);
                $user_from = $req;


                $list[] = [
                    'user_from' => $user_from,
                    'user_from_fullname' => $user_from_fullname,
                    'user_pic' => $user_pic,
                    'mutual_friends' => $this->getMutualFriends($req),
                    'mutual_friends_list' => $this->ListMutalFriends($req)
                ];
            }
        }
        $response = [
            'status' => 'success',
            'requests' => $list
        ];
        return $response;

        } catch (Exception $e) {
            error_log("Error in getFriendsRequests: " . $e->getMessage());
            return json_encode([
                'status' => 'error',
                'message' => 'An error occurred while fetching friend requests.',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function processFriendRequest($user_from, $action)
    {
        $user_to = $this->user['username'];

        $response = [];

        if ($action === 'accept') {
            // Add each other as friends
            $add_friend_query1 = mysqli_query($this->con, "UPDATE users SET friend_array=CONCAT(friend_array, '$user_from,') WHERE username='$user_to'");
            $add_friend_query2 = mysqli_query($this->con, "UPDATE users SET friend_array=CONCAT(friend_array, '$user_to,') WHERE username='$user_from'");

            if (!$add_friend_query1 || !$add_friend_query2) {
                return false; // Return false if either query fails
            }

            $response = [
                'status' => 'success',
                'message' => 'You and ' . $user_from . ' are now friends'
            ];
        }

        if ($action === 'ignore') {
            $response = [
                'status' => 'success',
                'message' => 'Friend request from ' . $user_from . ' ignored'
            ];
        }

        // Delete the friend request
        $delete_query = mysqli_query($this->con, "DELETE FROM friend_requests WHERE user_to='$user_to' AND user_from='$user_from'");

        if ($delete_query) {
            return $response;
        } else {
            return false;
        }
    }

    public function getNumPosts()
    {
        $username = $this->user['username'];
        $query = mysqli_query($this->con, "SELECT num_posts FROM users WHERE username='$username'");
        $row = mysqli_fetch_array($query);
        return $row['num_posts'];
    }



    public function getFirstAndLastName()
    {
        // Check if 'username' key exists and is not null
        if (isset($this->user['username'])) {
            $query = mysqli_query($this->con, "SELECT first_name, last_name FROM users WHERE username='" . $this->user['username'] . "'");
            $row = mysqli_fetch_array($query);
            return $row['first_name'] . " " . $row['last_name'];
        } else {
            return ""; // Return an empty string or some default value if 'username' key does not exist
        }
    }

    public function getFullnameForReqs($userSentReq)
    {
        $query = mysqli_query($this->con, "SELECT first_name, last_name FROM users WHERE username='$userSentReq'");
        $row = mysqli_fetch_array($query);
        return $row['first_name'] . " " . $row['last_name'];
    }


    public function getProfilePic()
    {
        $username = $this->user['username'];
        $query = mysqli_query($this->con, "SELECT profile_pic FROM users WHERE username='$username'");
        $row = mysqli_fetch_array($query);
        return $row['profile_pic'];
    }

    public function getProfilePicForReqs($userSentReq)
    {
        $query = mysqli_query($this->con, "SELECT profile_pic FROM users WHERE username='$userSentReq'");
        $row = mysqli_fetch_array($query);
        return $row['profile_pic'];
    }

    public function getFriendArray($page = 1, $startAt = 0, $limit = 5)
    {
        $username = $this->user['username'];

        try {
            // Fetch the entire friend_array string for the user
            $query = mysqli_query($this->con, "
                SELECT friend_array
                FROM users
                WHERE username='$username'
            ");


            if (!$query) {
                throw new Exception("Database query failed: " . mysqli_error($this->con));
            }

            $row = mysqli_fetch_array($query);
            $friend_array_string = $row['friend_array'];

            // Split the friend_array string into an array
            $friend_array = explode(",", trim($friend_array_string, ","));

            $nextStartAt = $startAt * ($page - 1);
            // Paginate the array using array_slice
            $friends = array_slice($friend_array, $nextStartAt, $limit);

            // Build the response
            $friend_objects = [];
            foreach ($friends as $friend) {
                $entry = new User($this->con, $friend);
                $friend_objects[] = [
                    'username' => $friend,
                    'name' => $entry->getFirstAndLastName(),
                    'profile_pic' => $entry->getProfilePic()
                ];
            }

            $friend_count = count($friend_array);
            return [
                'status' => 'success',
                'data' => [
                    'friend_array' => $friend_objects,
                    'has_more' => ($startAt + 5 < $friend_count),
                    'next_page' => $page + 1,
                    'friends_total' => $friend_count
                ]
            ];
        } catch (Exception $e) {
            error_log("Error in getFriendArray: " . $e->getMessage());
            return [
                'status' => 'error',
                'message' => 'An error occurred while loading friends.',
                'error' => $e->getMessage()
            ];
        }
    }


    public function getFriendsList()
    {
        // Check if 'friend_array' key exists and is not null
        if (isset($this->user['friend_array'])) {
            $friend_array_string = $this->user['friend_array']; // Get friend array string from table
            $friend_array_string = trim($friend_array_string, ","); // Remove first and last comma
            return explode(",", $friend_array_string); // Split to array at each comma
        } else {
            return []; // Return an empty array if 'friend_array' key does not exist
        }
    }


    public function isClosed()
    {
        $username = $this->user['username'];
        $query = mysqli_query($this->con, "SELECT user_closed FROM users WHERE username='$username'");
        $row = mysqli_fetch_array($query);

        if ($row['user_closed'] == 'yes') {
            return true;
        } else {
            return false;
        }
    }

    public function isfriend($username_to_check)
    {
        $usernameComma = "," . $username_to_check . ",";

        if ((strstr($this->user['friend_array'], $usernameComma) || $username_to_check ==            $this->user['username'])) {
            return true;
        }
    }

    public function didReceiveRequest($user_from)
    {
        $user_to = $this->user['username'];
        $check_request_query = mysqli_query($this->con, "SELECT * FROM friend_requests WHERE user_to='$user_to' AND user_from='$user_from'");
        if (mysqli_num_rows($check_request_query) > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function didSendRequest($user_to)
    {
        $user_from = $this->user['username'];
        $check_request_query = mysqli_query($this->con, "SELECT * FROM friend_requests WHERE user_to='$user_to' AND user_from='$user_from'");
        if (mysqli_num_rows($check_request_query) > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function removeFriend($user_to_remove)
    {
        $logged_in_user = $this->user['username'];

        $query = mysqli_query($this->con, "SELECT friend_array FROM users WHERE username='$user_to_remove'");
        $row = mysqli_fetch_array($query);
        $friend_array_username = $row['friend_array'];

        $new_friend_array = str_replace($user_to_remove . ",", "", $this->user['friend_array']);
        $remove_friend = mysqli_query($this->con, "UPDATE users SET friend_array='$new_friend_array' WHERE username='$logged_in_user'");

        $new_friend_array = str_replace($this->user['username'] . ",", "", $friend_array_username);
        $remove_friend = mysqli_query($this->con, "UPDATE users SET friend_array='$new_friend_array' WHERE username='$user_to_remove'");
    }

    public function sendRequest($user_to)
    {
        $user_from = $this->user['username'];
        $query = mysqli_query($this->con, "INSERT INTO friend_requests VALUES('', '$user_to', '$user_from')");
    }


    public function getMutualFriends($user_to_check)
    {
        $mutualFriends = 0;
        $user_array = $this->user['friend_array'];
        $user_array_explode = explode(",", $user_array);

        $query = mysqli_query($this->con, "SELECT friend_array FROM users WHERE username='$user_to_check'");
        $row = mysqli_fetch_array($query);
        $user_to_check_array = $row['friend_array'];
        $user_to_check_array_explode = explode(",", $user_to_check_array);

        foreach ($user_array_explode as $i) {
            foreach ($user_to_check_array_explode as $j) {
                if ($i == $j && $i != "") {
                    $mutualFriends++;
                }
            }
        }
        return $mutualFriends;
    }

    public function ListMutalFriends($user_to_check)
    {
        $mutualFriends = [];
        $user_array = $this->user['friend_array'];
        $user_array_explode = explode(",", $user_array);

        $query = mysqli_query($this->con, "SELECT friend_array FROM users WHERE username='$user_to_check'");
        $row = mysqli_fetch_array($query);
        $user_to_check_array = $row['friend_array'];
        $user_to_check_array_explode = explode(",", $user_to_check_array);

        // echo "user_array_explode " . print_r($user_array_explode, true) . "\n";
        // echo "user_to_check_array_explode " . print_r($user_to_check_array_explode, true) . "\n";

        foreach ($user_array_explode as $i) {
            foreach ($user_to_check_array_explode as $j) {
                if ($i == $j && $i != "") {

                    $friendObj = new User($this->con, $i);
                    $friendName = $friendObj->getFirstAndLastName();
                    $avatar = $friendObj->getProfilePic();

                    array_push($mutualFriends, [
                        'username' => $i,
                        'name' => $friendName,
                        'avatar' => $avatar
                    ]);
                }
            }
        }
        return $mutualFriends;
    }
}   
