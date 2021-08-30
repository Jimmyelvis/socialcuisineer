<?php
include("includes/header.php");

$user_data_query = mysqli_query($con, "SELECT first_name, last_name, email, city, state,
                fav_food, profile_header  FROM users WHERE username='$userLoggedIn'");
$row = mysqli_fetch_array($user_data_query);

$first_name = $row['first_name'];
$last_name = $row['last_name'];
$email = $row['email'];
$city = $row['city'];
$state = $row['state'];
$favfood = $row['fav_food'];
$profile_header = $row['profile_header'];


?>

<div class="container">

  <div class="settingsContain">

    <h2 class="heading-2">Account Settings</h2>

    <!-- 
      Paste the code for JCrop Here from upload.php
      file
    -->


    <div class="fileUploadAvatar">

      <input class="fileUploadInputAvatar" type="file" name="image" id="myAvatarFile">

      <button class="avatar" type="button">
        <?php
        echo "<img id='avatarImage' src='" . $user['profile_pic'] . "' class='avatarPreview'>";
        ?>
      </button>

      <span class="fileUploadAvatarLabel"></span>

    </div>





    <h4 class="heading-4">Upload A New Avatar Photo</h4>

    <h3 class="heading-3 uploadRes"></h3>


    <form action="settings.php" method="POST">

      <div class="inputBox imgPreview" id="imgPreview">
        <?php
        echo "<img class='img-preview-image' src='$profile_header'>";
        ?>

        <span class="imgPreview-DefaultTxt">
          Upload A Image For Your Profile Header.
        </span>

      </div>

      <div class="file-upload-flexed">
        <input type="file" name="inpFile" id="inpFile" class="inpFile">
        <button class="file-upload-button btn btn-puprle" type="button">Choose File</button>
        <span class="file-upload-label"></span>
      </div>



      <div class="inputItems">

        <h2 class="heading-2 response"></h2>

        <input type="text" placeholder="First Name" class="inputBox inputHeadline" name="first_name" value="<?php echo $first_name; ?>" id="settings_input_firstname">

        <input type=" text" placeholder="Last Name" class="inputBox inputHeadline" name="last_name" value="<?php echo $last_name; ?>" id="settings_input_lastname">

        <input type=" text" placeholder="Email" class="inputBox inputHeadline" name="email" value="<?php echo $email; ?>" id="settings_input_email">

        <input type="text" placeholder="Fav Food" class="inputBox inputHeadline" name="fav_food" id="settings_input_food" <?php if ($favfood !== ' ') { ?> value="<?php echo $favfood ?>" <?php } else { ?> value="" <?php } ?>>

        <input type="text" placeholder="City" class="inputBox inputHeadline" name="city" id="settings_input_city" <?php if ($city !== ' ') { ?> value="<?php echo $city ?>" <?php } else { ?> value="" <?php } ?>>

        <input type="text" placeholder="State" class="inputBox inputHeadline" name="state" id="settings_input_state" <?php if ($state !== ' ') { ?> value="<?php echo $state ?>" <?php } else { ?> value="" <?php } ?>>

      </div>

      <input type="submit" name="update_details" id="save_details" value="Update Details" class="btn btn-puprle btn-modalSubmit">

    </form>

    <form action="settings.php" method="POST">

      <div id="changePassword" class="inputItems">
        <input type="password" placeholder="Old Password" name="old_password" class="inputBox inputHeadline" id="settings_input_old_password">
        <input type="password" placeholder="New Password" name="new_password_1" class="inputBox inputHeadline" id="settings_input_new_password">
        <input type="password" placeholder="New Password Again" name="new_password_2" class="inputBox inputHeadline" id="settings_input_new_password_again">
      </div>


      <input type="submit" name="update_password" id="savePassword" value="Update Password" class="btn btn-puprle btn-modalSubmit">


    </form>

    <div class="closeAccount">
      <div class="h3 heading-3">
        Close Account
      </div>

      <form action="settings.php" method="POST">
        <input type="submit" name="close_account" id="close_account" value="Close Account" class="btn btn-orange btn-modalSubmit">
      </form>
    </div>


  </div>

</div>

<div class="modal cropperJsModal">


  <div class="modalContent">
    <img src="./assets/img/close-btn-3.svg" class="closeBtn" alt="">

    <div class="modalHeader">
      <h3 class="heading-3">
        Crop Your Avatar Image
      </h3>
    </div>

    <div class="modalBody cropperJsModal-body">

      <div class="imgContainer">
        <img id='croppedAvatarImage' src="" alt="">
      </div>

      <div class="preview"></div>

    </div>

    <div class="modalFooter">
      <button id="avatarCancelcrop" class="btn btn-orange">Cancel</button>
      <button id="avatarCrop" class="btn btn-puprle">Crop</button>
    </div>

  </div>

  <div class="overlay"></div>
</div>

<div class="modal cropperJsProfileHeaderModal">


  <div class="modalContent">

    <div class="modalHeader">
      <h3 class="heading-3">
        Crop Your Profile Header Image
      </h3>
    </div>

    <div class="modalBody cropperJsProfileHeaderModal-body">

      <div class="imgContainer">
        <img id='croppedProfileImage' src="" alt="">
      </div>

      <div class="preview"></div>

    </div>

    <div class="modalFooter">
      <button id="profileHeaderCancelcrop" class="btn btn-orange">Cancel</button>
      <button id="profileHeaderCrop" class="btn btn-puprle">Crop</button>
    </div>

  </div>

  <div class="overlay"></div>
</div>

<script>
  var userLoggedIn = '<?php echo $userLoggedIn; ?>';
  var prevPhoto = '<?php echo $user['profile_pic'] ?>'
</script>

<?php

include("includes/footer.php");

?>