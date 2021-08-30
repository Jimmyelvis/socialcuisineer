<?php
include("../../config/config.php");
include("../classes/User.php");

$limit = 7; //Number of messages to load

$friendReqUser = new User($con, $_REQUEST['userLoggedIn']);
echo $friendReqUser->getFriendsRequests($_REQUEST, $limit);

?>
