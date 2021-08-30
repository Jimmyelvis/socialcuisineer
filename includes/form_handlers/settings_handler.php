<?php
include("../../config/config.php");



if ( isset($_POST['update_details'])) {

  
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $favfood = $_POST['fav_food'];
    $userLoggedIn = $_POST['userLoggedIn'];

    $email_check = mysqli_query($con, "SELECT * FROM users WHERE email='$email'");
    $row = mysqli_fetch_array($email_check);
    $matched_user = $row['username'];

    if ($matched_user == "" || $matched_user == $userLoggedIn) {
        $message = "Details updated!<br><br>";

        $query = mysqli_query($con, "UPDATE users SET first_name='$first_name', last_name='$last_name', email='$email', city='$city', state='$state', fav_food='$favfood'  WHERE username='$userLoggedIn'");
    } else {
        $message = "That email is already in use!<br><br>";
    }

  echo 'Your Details Has Been Successfully Updated';
}
else
	$message = "All Good";



if(isset($_POST['changeAvatar'])) {


    if (isset($_FILES['image']['name'])) {

      $ImageName = $_FILES['image']['name'];
      $ImageSize = $_FILES['image']['size'];
      $ImageTempName = $_FILES['image']['tmp_name'];
      $profile_id = $_POST['profile_id'];

      //Get File Ext
      $ImageType = @explode('/', $_FILES['image']['type']);
      $type = $ImageType[1]; //file type
      //Set Upload directory
      $uploaddir = $_SERVER['DOCUMENT_ROOT'] . '/Social-Cuisiener-2021/assets/img/profile_pics';
      //Set File name
      $file_temp_name = $profile_id . '_original.' . md5(time()) . 'n' . $type; //the temp file name
      $fullpath = $uploaddir . "/" . $file_temp_name; // the temp file path

      // $file_name = $profile_id . '_temp.jpeg'; //profile_id.'_temp.'.$type; // for the final resized image

      $file_name = $profile_id . '.jpeg'; //$profile_id.'_temp.'.$type; // for the final resized image

      $fullpath_2 = $uploaddir . "/" . $file_name; //for the final resized image
      //Move the file to correct location
      $move = move_uploaded_file($ImageTempName, $fullpath_2);

      $result_path = "assets/img/profile_pics/" . $file_name ;


      $insert_pic_query = mysqli_query($con, "UPDATE users SET profile_pic='$result_path' WHERE username='$profile_id'");


      if (!$insert_pic_query) {
        die('Problems saving to database');

      }


      // chmod($fullpath, 0777);
      //Check for valid uplaod
      if (!$move) {
        die('File didnt upload');
      } else {
        $imgSrc = "assets/images/profile_pics/" . $file_name; // the image to display in crop area
        $msg = "Upload Complete!";    //message to page
        $src = $file_name;       //the file name to post from cropping form to the resize

        echo $msg;
      }


    }


}
  
if(isset($_POST['changeProfileHeader'])) {


  if (isset($_FILES['inpFile']['name'])) {

    $ImageName = $_FILES['inpFile']['name'];
    $ImageSize = $_FILES['inpFile']['size'];
    $ImageTempName = $_FILES['inpFile']['tmp_name'];
    $profile_id = $_POST['profile_id'];

    //Get File Ext
    $ImageType = @explode('/', $_FILES['inpFile']['type']);
    $type = $ImageType[1]; //file type
    //Set Upload directory
    $uploaddir = $_SERVER['DOCUMENT_ROOT'] . '/Social-Cuisiener-2021/assets/img/profile_headers';
    //Set File name
    $file_temp_name = $profile_id . '_original.' . md5(time()) . 'n' . $type; //the temp file name
    $fullpath = $uploaddir . "/" . $file_temp_name; // the temp file path

    // $file_name = $profile_id . '_temp.jpeg'; //profile_id.'_temp.'.$type; // for the final resized image

    $file_name = $profile_id .  '_profile_header' . '.jpeg'; //$profile_id.'_temp.'.$type; // for the final resized image

    $fullpath_2 = $uploaddir . "/" . $file_name; //for the final resized image
    //Move the file to correct location
    $move = move_uploaded_file($ImageTempName, $fullpath_2);

    $result_path = "assets/img/profile_headers/" . $file_name;


    $insert_pic_query = mysqli_query($con, "UPDATE users SET profile_header='$result_path' WHERE username='$profile_id'");


    if (!$insert_pic_query) {
      die('Problems saving to database');
    }


    // chmod($fullpath, 0777);
    //Check for valid uplaod
    if (!$move) {
      die('File didnt upload');
    } else {
      $imgSrc = "assets/images/profile_pics/" . $file_name; // the image to display in crop area
      $msg = "Upload Complete For Profile Header!";    //message to page
      $src = $file_name;       //the file name to post from cropping form to the resize

      echo $msg;
    }
  }

}

if(isset($_POST['update_password'])) {


  $old_password = strip_tags($_POST['old_password']);
  $new_password_1 = strip_tags($_POST['new_password_1']);
  $new_password_2 = strip_tags($_POST['new_password_2']);
  $userLoggedIn = $_POST['userLoggedIn'];


  $password_query = mysqli_query($con, "SELECT password FROM users WHERE username='$userLoggedIn'");
  $row = mysqli_fetch_array($password_query);
  $db_password = $row['password'];

  	if(md5($old_password) == $db_password) {

  			if($new_password_1 == $new_password_2) {

          if(strlen($new_password_1) <= 4) {
            $password_message = "Sorry, your password must be greater than 4 characters<br><br>";
          }
          else{
            $new_password_md5 = md5($new_password_1);
    				$password_query = mysqli_query($con, "UPDATE users SET password='$new_password_md5' WHERE username='$userLoggedIn'");
            $password_message = "Password has been changed!<br><br>";
          }

        }else{
          $password_message = "Your two new passwords need to match!<br><br>";
        }

    }else{
      $password_message = "The old password is incorrect! <br><br>";
    }

    echo $password_message;

}
else {
	$password_message = "";
}

if(isset($_POST['close_account'])) {
	header("Location: close_account.php");
}

?>
