<?php
include("includes/header.php");
?>



<div class="container">

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

        <div class="friends container">

            <div class="row">

              <?php

                  $userLoggedIn = $_SESSION['username'];

                  $userLoggedIn = new User($con, $userLoggedIn);
                  $rez = array();
                  $rez = $userLoggedIn->getFriendArray();
                  $friend_array_string = trim($rez, ","); //Remove first and last comma

                 if ($friend_array_string != "") {
                     $no_commas = explode(",", $friend_array_string);
                     echo ' <h3>Friends</h3> ';


                  foreach ($no_commas as $key => $value) {
                      $friend = mysqli_query($con, "SELECT first_name, last_name, username, profile_pic FROM users WHERE username='$value'");
                      $row = mysqli_fetch_assoc($friend);
                      echo "
                          <div class='friendsrow col-md-6 col-sm-6 col-xs-6'>
                      <a href='" . $row['username'] . "'><img class='frndprofpic' src='" . $row['profile_pic'] . "'></a>

                     <a href='" . $row['username'] . "'>" . $row['first_name'] . " " . $row['last_name'] . "
                          </div>
                     ";
                  }
                 } else {
                     echo "<br><h4>You have no friends. Please add someone</h4>";
                 }

              ?>



            </div>





        </div>

  </div>

</div>
