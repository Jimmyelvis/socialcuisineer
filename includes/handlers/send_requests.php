<?php
include("../../config/config.php");


require_once("../../config/config.php");
require_once("../classes/User.php");
require_once("../classes/Notification.php");

if (isset($_POST['add_friend'])) {

  $user_to = $_POST['user_to'];
  $userLoggedIn = $_POST['user_from'];

  $user = new User($con, $userLoggedIn);
  $user->sendRequest($user_to);

}

if (isset($_POST['remove_friend'])) {

  $user_to = $_POST['user_to'];
  $userLoggedIn = $_POST['user_from'];

  $user = new User($con, $userLoggedIn);
  $user->removeFriend($user_to);
}