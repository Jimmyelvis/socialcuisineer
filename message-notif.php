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

            <h3>Message Notifications</h3>

            <div class="row">

              <?php

              if ($num_notifications > 0) {
                  echo '<span class="notification_badge" id="unread_notification">' . $num_notifications . '</span>';
              }

              ?>



            </div>





        </div>

  </div>

</div>
