<?php
include("../../config/config.php");
include("../../includes/classes/User.php");
include("../../includes/classes/Post.php");

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

// Initialize recipes array
$recipes_array = [];

// Only proceed if we have a query
if($query != "") {
    // Sanitize the query to prevent SQL injection
    $query = mysqli_real_escape_string($con, $query);
    
    // Query the database for matching posts
    $postsReturnedQuery = mysqli_query($con, 
        "SELECT posts.id, posts.heading, posts.added_by, posts.image, 
                users.username, users.first_name, users.last_name, users.profile_pic 
         FROM posts, users 
         WHERE posts.added_by = users.username 
         AND posts.heading LIKE '%$query%' 
         LIMIT 4"
    );
    
    // Check if query was successful and has results
    if($postsReturnedQuery && mysqli_num_rows($postsReturnedQuery) > 0) {
        // Process results
        while($row = mysqli_fetch_array($postsReturnedQuery)) {
            // Add recipe data to array
            $recipes_array[] = [
                'id' => $row['id'],
                'heading' => $row['heading'],
                'image' => $row['image'],
                'link' => 'post.php?id=' . $row['id'],
                'author' => [
                    'username' => $row['username'],
                    'first_name' => $row['first_name'],
                    'last_name' => $row['last_name'],
                    'profile_pic' => $row['profile_pic']
                ]
            ];
        }
        
        // Return success with JSON data
        echo json_encode([
            'status' => 'success',
            'data' => [
                'recipes' => $recipes_array,
                'type' => 'recipes'
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
