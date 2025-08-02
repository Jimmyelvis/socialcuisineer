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

// Sanitize the query to prevent SQL injection
$query = mysqli_real_escape_string($con, $query);

$names = explode(" ", $query);
$users_array = [];

// Only proceed if we have a query
if($query != "") {
    // Build the query based on search pattern
    if(strpos($query, '_') !== false) {
        // If query contains an underscore, assume user is searching for usernames
        $usersReturnedQuery = mysqli_query($con, "SELECT * FROM users WHERE username LIKE '$query%' AND user_closed='no' LIMIT 4");
    } else if(count($names) == 2) {
        // If there are two words, assume they are first and last names respectively
        $usersReturnedQuery = mysqli_query($con, "SELECT * FROM users WHERE (first_name LIKE '$names[0]%' AND last_name LIKE '$names[1]%') AND user_closed='no' LIMIT 4");
    } else {
        // If query has one word only, search first names or last names
        $usersReturnedQuery = mysqli_query($con, "SELECT * FROM users WHERE (first_name LIKE '$names[0]%' OR last_name LIKE '$names[0]%') AND user_closed='no' LIMIT 4");
    }

    // Check if query was successful and has results
    if($usersReturnedQuery && mysqli_num_rows($usersReturnedQuery) > 0) {
        // Process results
        while($row = mysqli_fetch_array($usersReturnedQuery)) {
            $user = new User($con, $userLoggedIn);
            $mutual_friends = "";

            if($row['username'] != $userLoggedIn) {
                $mutual_friends = $user->getMutualFriends($row['username']) . " friends in common";
            }

            // Add user data to array
            $users_array[] = [
                'username' => $row['username'],
                'first_name' => $row['first_name'],
                'last_name' => $row['last_name'],
                'profile_pic' => $row['profile_pic'],
                'mutual_friends' => $mutual_friends,
                'url' => $row['username'] // URL to user profile
            ];
        }
        
        // Return success with JSON data
        echo json_encode([
            'status' => 'success',
            'data' => [
                'users' => $users_array,
                'type' => 'users'
            ]
        ]);
    } else {
        // No results found
        echo json_encode([
            'status' => 'No Results Found',
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
