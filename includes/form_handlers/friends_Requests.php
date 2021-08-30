<?php
include("../../config/config.php");

/**
 *  Try if (isset($_POST['accept_request'])) instead to try to check for request type
 * then add $user_from as an incoming variable.
 */

if (isset($_POST['accept_request'])) {

  $user_from = $_POST['user_from'];
  $userLoggedIn = $_POST['userLoggedIn'];


  $add_friend_query = mysqli_query($con, "UPDATE users SET friend_array=CONCAT(friend_array, '$user_from,') WHERE username='$userLoggedIn'");

  $add_friend_query = mysqli_query($con, "UPDATE users SET friend_array=CONCAT(friend_array, '$userLoggedIn,') WHERE username='$user_from'");

  $delete_query = mysqli_query($con, "DELETE FROM friend_requests WHERE user_to='$userLoggedIn' AND user_from='$user_from'");

  $query = mysqli_query($con, "SELECT * FROM friend_requests WHERE user_to='$userLoggedIn'");

  echo "You and " . $user_from . " are now friends";
  
}

if (isset($_POST['ignore_request'])) {


  $user_from = $_POST['user_from'];
  $userLoggedIn = $_POST['userLoggedIn'];

  $delete_query = mysqli_query($con, "DELETE FROM friend_requests WHERE user_to='$userLoggedIn' AND user_from='$user_from'");

  echo  $user_from ."'s ". "Request has been ignored!";
}



?>