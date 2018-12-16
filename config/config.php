<?php
ob_start(); //Turns on output buffering
session_start();
// require 'config/keys.php';

$timezone = date_default_timezone_set("America/Denver");

// $con = mysqli_connect("localhost", "root", "", "swirl"); //Connection variable
$con = mysqli_connect("db4free.net", "jinjoe", "panther69", "social");
// $con = mysqli_connect("mlmontheweb.com", "jinjoe", "Panther69!", "social-2");


if(mysqli_connect_errno())
{
	echo "Failed to connect: " . mysqli_connect_errno();
}

?>
