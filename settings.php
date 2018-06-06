<?php
include("includes/header.php");
include("includes/form_handlers/settings_handler.php");
?>



<div class="settings container">

      <div class="user_details">

          <?php
          include("includes/user-header.php");
          ?>

      </div>

      <div class="user_details_left_right column col-md-3">
      
          <?php
          include("includes/sidebar-left.php");
          ?>

      </div>

      <div class="index_column column">

   		 	<div class="container">

          <h2>Account Settings</h2>

          <?php
              echo "<img src='" . $user['profile_pic'] ."' class='small_profile_pic'>";
           ?>

           <br>
           <a href="upload.php">Upload new profile picture</a> <br><br><br>


           <?php
               $user_data_query = mysqli_query($con, "SELECT first_name, last_name, email, city, state,
                fav_food  FROM users WHERE username='$userLoggedIn'");
               $row = mysqli_fetch_array($user_data_query);

               $first_name = $row['first_name'];
               $last_name = $row['last_name'];
               $email = $row['email'];
               $city = $row['city'];
               $state = $row['state'];
               $favfood = $row['fav_food'];
           ?>

           <div class="col-md-6">

             <form action="settings.php" method="POST">

               <h4>First Name: </h4>
               <input type="text" name="first_name" value="<?php echo $first_name; ?>" id="settings_input"><br>
               <h4>Last Name: </h4>
               <input type="text" name="last_name" value="<?php echo $last_name; ?>" id="settings_input"><br>
               <h4>Email: </h4>
               <input type="text" name="email" value="<?php echo $email; ?>" id="settings_input"><br>
               <h4>City: </h4>
               <input type="text" name="city" value="<?php echo $city; ?>" id="settings_input"><br>
               <h4>State: </h4>
               <input type="text" name="state" value="<?php echo $state; ?>" id="settings_input"><br>
               <h4>Favorite Food: </h4>
               <input type="text" name="fav_food" value="<?php echo $favfood; ?>" id="settings_input"><br>

               <?php echo $message; ?>

               <input type="submit" name="update_details" id="save_details" value="Update Details" class="btn-primary btn-save_details"><br>
             </form>


           </div>

           <div class="col-md-6">

               <form action="settings.php" method="POST">

                 <h4>Old Password: </h4><input type="password" name="old_password" id="settings_input"><br>
                 <h4>New Password: </h4><input type="password" name="new_password_1" id="settings_input"><br>
                 <h4>New Password Again: </h4><input type="password" name="new_password_2" id="settings_input"><br>

                   <?php echo $password_message; ?>

                 <input type="submit" name="update_password" id="save_details" value="Update Password" class="btn-primary btn-save_details"><br>

               </form>

               <h3>Close Account</h3>
             <form action="settings.php" method="POST">
               <input type="submit" name="close_account" id="close_account" value="Close Account" class="btn-danger btn-settings_close">
             </form>


           </div>









   		 	</div>

      </div>




</div>
