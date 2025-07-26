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

// Initialize HTML output
$html_output = '';

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
            $link = 'post.php?id=';
            
            $html_output .= "
            <a href='" . $link . $row['id'] . "' class='posts-entry'>
                <div class='post-pic'>
                  <img src='" . $row['image'] . "'>
                </div>

                <div class='post-info'>
                  <h3 class='heading-3 headline'>
                    " . $row['heading'] . "
                  </h3>
                  <div class='userInfo'>
                    <div class='avatar'>
                      <img src='" . $row['profile_pic'] . "'>
                    </div>

                    <div class='author'>
                      <h3 class='heading-3 name'>
                        By:  " . $row['first_name'] . " " . $row['last_name'] . "
                      </h3>

                      <h3 class='heading-4 username'>
                        @" . $row['username'] . "
                      </h3>
                    </div>
                  </div>
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
