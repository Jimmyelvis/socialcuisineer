<?php
include("../../config/config.php");
include("../../includes/classes/User.php");

header('Content-Type: application/json');

// Get JSON data from the request
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

// Check if JSON data was successfully decoded
if ($data === null) {
    echo json_encode([
        'status' => 'error', 
        'message' => 'Invalid JSON data'
    ]);
    exit;
}

// Extract data from the decoded JSON
$query = isset($data['query']) ? $data['query'] : '';
$userLoggedIn = isset($data['userLoggedIn']) ? $data['userLoggedIn'] : '';

// Initialize HTML output
$html_output = '';

$names = explode(" ", $query);
$mutual_friends = "";



//If query contains an underscore, assume user is searching for usernames
if(strpos($query, '_') !== false)
	$usersReturnedQuery = mysqli_query($con, "SELECT * FROM users WHERE username LIKE '$query%' AND user_closed='no' LIMIT 4");

//If there are two words, assume they are first and last names respectively
else if(count($names) == 2)
	$usersReturnedQuery = mysqli_query($con, "SELECT * FROM users WHERE (first_name LIKE '$names[0]%' AND last_name LIKE '$names[1]%') AND user_closed='no' LIMIT 4");

  //If query has one word only, search first names or last names
  else
  	$usersReturnedQuery = mysqli_query($con, "SELECT * FROM users WHERE (first_name LIKE '$names[0]%' OR last_name LIKE '$names[0]%') AND user_closed='no' LIMIT 4");


// Only proceed if we have a query
if($query != "") {
    // Check if query was successful and has results
    if($usersReturnedQuery && mysqli_num_rows($usersReturnedQuery) > 0) {
        // Process results
        while($row = mysqli_fetch_array($usersReturnedQuery)) {
            $user = new User($con, $userLoggedIn);

            if($row['username'] != $userLoggedIn)
                $mutual_friends = $user->getMutualFriends($row['username']) . " friends in common";
            else
                $mutual_friends = "";

            $html_output .= "
            <a href='" . $row['username'] . "' class='users-entry'>
                <div class='avatar'>
                  <img src='" . $row['profile_pic'] . "'>
                </div>

                <div class='userInfo'>
                  <h3 class='heading-3 name'>
                    " . $row['first_name'] . " " . $row['last_name'] . "
                  </h3>
                  <h4 class='heading-4 username'>
                    " . $row['username'] . "
                  </h4>
      
                  <span class='common'>
                    " . $mutual_friends . "
                  </span>
                </div>

                <div class='block'></div>
            </a>";
        }
        
        // Return success with HTML
        echo json_encode([
            'status' => 'success',
            'data' => [
                'html' => $html_output
            ]
        ]);
    } else {
        // No results found
        echo json_encode([
            'status' => 'error',
            'message' => 'No results found'
        ]);
    }
} else {
    // Empty query
    echo json_encode([
        'status' => 'error',
        'message' => 'Empty search query'
    ]);
}
?>
