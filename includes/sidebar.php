<?php
require 'config/config.php';

require "src/HotReloader.php";
new HotReloader\HotReloader('//localhost/Social-Cuisiener-2021/includes/phrwatcher.php');

include("includes/classes/User.php");
include("includes/classes/Post.php");
include("includes/classes/Message.php");
include("includes/classes/Notification.php");

if (isset($_SESSION['username'])) {
  $userLoggedIn = $_SESSION['username'];
  $user_details_query = mysqli_query($con, "SELECT * FROM users WHERE username='$userLoggedIn'");
  $user = mysqli_fetch_array($user_details_query);

  // echo '<pre>'; print_r($user); echo '</pre>';
} else {
  header("Location: register.php");
}


?>

<div class="left-sidebar">

    <div class="logo"></div>

    <ul class="nav">
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
    </ul>

    <ul class="friends">
      <li>Friends Icon</li>

      <li class="friend"></li>
      <li class="friend"></li>
      <li class="friend"></li>
      <li class="friend"></li>
    </ul>

</div>