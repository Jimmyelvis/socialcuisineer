<?php
include("../../config/config.php");


//Declaring variables to prevent errors
$fname = ""; //First name
$lname = ""; //Last name
$em = ""; //email
$em2 = ""; //email 2
$password = ""; //password
$password2 = ""; //password 2
$date = ""; //Sign up date
$error_array = array(); //Holds error messages

if(isset($_POST['register_button'])){

  //First name
  $fname = strip_tags($_POST['reg_fname']); //Remove html tags
	$fname = str_replace(' ', '', $fname); //remove spaces
	$fname = ucfirst(strtolower($fname)); //Uppercase first letter

  //Last name
	$lname = strip_tags($_POST['reg_lname']); //Remove html tags
	$lname = str_replace(' ', '', $lname); //remove spaces
	$lname = ucfirst(strtolower($lname)); //Uppercase first letter

  //email
	$em = strip_tags($_POST['reg_email']); //Remove html tags
	$em = str_replace(' ', '', $em); //remove spaces
	$em = ucfirst(strtolower($em)); //Uppercase first letter

	//email 2
	$em2 = strip_tags($_POST['reg_email2']); //Remove html tags
	$em2 = str_replace(' ', '', $em2); //remove spaces
	$em2 = ucfirst(strtolower($em2)); //Uppercase first letter

	//Password
	$password = strip_tags($_POST['reg_password']); //Remove html tags
	$password2 = strip_tags($_POST['reg_password2']); //Remove html tags

  $date = date("Y-m-d"); //Current date


  if ($em == $em2) {
    //Check if email is in valid format

    if (filter_var($em, FILTER_VALIDATE_EMAIL)) {

      $em = filter_var($em, FILTER_VALIDATE_EMAIL);

      //Check if email already exists
			$e_check = mysqli_query($con, "SELECT email FROM users WHERE email='$em'");

      //Count the number of rows returned
			$num_rows = mysqli_num_rows($e_check);

      if($num_rows > 0) {
				array_push($error_array, "Email: Email already in use");
			}

    } else{
      array_push($error_array, "Email: Invalid email format");

    }

  }else{
    array_push($error_array, "Email: Emails don't match");
  }

  if(strlen($fname) > 25 || strlen($fname) < 2) {
		array_push($error_array, "First Name: Your first name must be between 2 and 25 characters");
	}

  if(strlen($lname) > 25 || strlen($lname) < 2) {
		array_push($error_array,  "Last Name: Your last name must be between 2 and 25 characters");
	}

  if($password != $password2) {
		array_push($error_array,  "Password: Your passwords do not match");
	}	else {
		if(preg_match('/[^A-Za-z0-9]/', $password)) {
			array_push($error_array, "Password: Your password can only contain english characters or numbers");

		}
	}

  if(strlen($password > 30 || strlen($password) < 5)) {
		array_push($error_array, "Password: Your password must be betwen 5 and 30 characters");
	}

  if(!empty($error_array)) {
    $result_array = array('errors' => $error_array);
    echo json_encode($result_array);
    exit;
  }

  if(empty($error_array)) {
    $password = md5($password); //Encrypt password before sending to database

    //Generate username by concatenating first name and last name
		$username = strtolower($fname . "_" . $lname);
    $check_username_query = mysqli_query($con, "SELECT username FROM users WHERE username='$username'");

    $i = 0;
		//if username exists add number to username
    while(mysqli_num_rows($check_username_query) != 0) {
			$i++; //Add 1 to i
			$username = $username . "_" . $i;
			$check_username_query = mysqli_query($con, "SELECT username FROM users WHERE username='$username'");
		}

    $rand = rand(1, 12); //Random number between 1 and 12

    // if($rand == 1)
		// 	$profile_pic = "assets/img/profile_pics/defaults/head_deep_blue.png";
		// else if($rand == 2)
		// 	$profile_pic = "assets/img/profile_pics/defaults/head_emerald.png";

    switch ($rand) {
      case '1':
        $profile_pic = "assets/img/profile_pics/defaults/head_deep_blue.png";
        break;

      case '2':
        $profile_pic = "assets/img/profile_pics/defaults/head_emerald.png";
        break;

      case '3':
        $profile_pic = "assets/img/profile_pics/defaults/head_carrot.png";
        break;

      case '4':
        $profile_pic = "assets/img/profile_pics/defaults/head_nephritis.png";
        break;

      case '5':
        $profile_pic = "assets/img/profile_pics/defaults/head_pete_river.png";
        break;

      case '6':
        $profile_pic = "assets/img/profile_pics/defaults/head_pumpkin.png";
        break;

      case '7':
        $profile_pic = "assets/img/profile_pics/defaults/head_nephritis.png";
        break;

      case '8':
        $profile_pic = "assets/img/profile_pics/defaults/head_sun_flower.png";
        break;

      case '9':
        $profile_pic = "assets/img/profile_pics/defaults/head_turqoise.png";
        break;

      case '10':
        $profile_pic = "assets/img/profile_pics/defaults/head_wet_asphalt.png";
        break;

      case '11':
        $profile_pic = "assets/img/profile_pics/defaults/head_belize_hole.png";
        break;

      case '12':
        $profile_pic = "assets/img/profile_pics/defaults/head_green_sea.png";
        break;

      default:
          $profile_pic = "assets/img/profile_pics/defaults/head_deep_blue.png";
        break;
    }


    // $query = mysqli_query($con, "INSERT INTO users VALUES ('', '$fname', '$lname', '$username', '$em', '$password', ' ', '$date', '$profile_pic', '', '0', '0', 'no', ',' , ' ', ' ',' ')");

    $query = mysqli_query($con, "INSERT INTO users VALUES ('', '$fname', '$lname', '$username', '$em', '$password', ' ', '$date', '$profile_pic', '', '0', '0', 'no', ',' , ' ', ' ',' ')");

    // array_push($error_array, "<span style='color: #14C800;'>You're all set! Go ahead and login!</span><br>");

    echo "'You're all set! Go ahead and login!'";

  }




}


 ?>
