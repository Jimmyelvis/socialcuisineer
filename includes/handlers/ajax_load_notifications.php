<?php
include("../../config/config.php");
include("../classes/User.php");
include("../classes/GetDate.php");
include("../classes/Notification.php");

header('Content-Type: application/json');

// Get JSON data from request
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

// Set default values if not provided
if (!isset($data['page'])) {
    $data['page'] = 1;
}

$limit = 7; //Number of messages to load

if (!isset($data['user'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'User not provided'
    ]);
    exit;
}

try {
    $notification = new Notification($con, $data['user']);
    $notificationData = $notification->getNotifications($data, $limit);
    
    // The notification data is already JSON encoded, so decode it first
    $decodedData = json_decode($notificationData, true);
    
    echo json_encode([
        'status' => 'success',
        'data' => $decodedData
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>
