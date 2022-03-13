<?php
include("../../config/config.php");
include("../classes/User.php");
include("../classes/Post.php");

$posts = new Post($con, $_REQUEST['userLoggedIn']);


if ( isset($_POST['update_post'])) {

  $post_id = $_POST['post_id'];
  $unchangedFileName = $_POST['headerImage'];

  /**
   * If the user doesn't change to post header image this 
   * part of the code will NOT be ran
   */
  if (isset($_FILES['file']['name'])) {

    $uploadOk = 1;
    $imagePath = $_FILES['file']['name'];
    $imageName = $_FILES['file']['name'];
    $errorMessage = "";

    if ($imagePath != "") {

      $targetDir = $_SERVER['DOCUMENT_ROOT'] . "/Social-Cuisiener-2021/assets/img/posts/";

      // Image Variable for moving the file to the correct folder
      $imagePath = $targetDir . basename($imagePath); 
      $imageFileType = pathinfo($imagePath, PATHINFO_EXTENSION);

      /**
       * (Changed)Image variable for sending filename to DB
       *  If the user changes to header image on the front end this ($imagePathForDB)
       *  will be the image variable that is sent to the backend
       *  */ 
      $imagePathForDB = "assets/img/posts/" . $imageName; 

      if ($_FILES['file']['size'] > 10000000) {
        $errorMessage = "Sorry your file is too large. The File Limit is 1MB";
        $uploadOk = 0;
      }

      if (strtolower($imageFileType) != "jpeg" && strtolower($imageFileType) != "png" && strtolower($imageFileType) != "jpg") {
        $errorMessage = "Sorry, only jpeg, jpg and png files are allowed";
        $uploadOk = 0;
      }

      if ($uploadOk) {
        if (move_uploaded_file($_FILES['file']['tmp_name'], $imagePath)) {
          //image uploaded okay
        } else {
          //image did not upload
          $uploadOk = 0;
        }
      }
    }

    if ($uploadOk) {
      $posts->editPost($_REQUEST, $imagePathForDB);
    } else {
      echo "$errorMessage";
    }

  } else {

    /**
     * If no changes were made to the header image this $unchangedFileName
     * will be the image variable that will be sent to the backend
     *  */ 
    $posts->editPost($_REQUEST, $unchangedFileName);
  }


  

}