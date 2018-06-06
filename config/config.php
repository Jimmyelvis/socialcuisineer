<?php
ob_start(); //Turns on output buffering
session_start();
// require 'config/keys.php';

$timezone = date_default_timezone_set("America/Denver");

// $con = mysqli_connect("localhost", "root", "", "swirl"); //Connection variable
$con = mysqli_connect("sql9.freemysqlhosting.net", "sql9241732", "aZRMPi3MXU", "sql9241732");

if(mysqli_connect_errno())
{
	echo "Failed to connect: " . mysqli_connect_errno();
}

?>
