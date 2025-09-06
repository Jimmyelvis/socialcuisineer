<?php
include("../../config/config.php");
include("../classes/User.php");
include("../classes/GetDate.php");
include("../classes/Post.php");

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    echo json_encode([
        'status' => 'error',
        'message' => 'No data received'
    ]);
    exit;
}

if (!isset($data['userLoggedIn'])) {
    echo json_encode([
        'status' => 'error', 
        'message' => 'No user logged in man'
    ]);
    exit;
}

$userLoggedIn = $data['userLoggedIn'];
$profileUsername = $data['profileUsername'];
$page = $data['page'];
$startAt = $data['startAt'];
$limit = $data['limit'] ?? 5; // Default limit to 5 if not provided

try {
    $user = new User($con, $userLoggedIn);
    $results = $user->getFriendArray($page, $startAt);

    echo json_encode($results);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
    exit;
}