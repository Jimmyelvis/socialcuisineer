    <a href="<?php echo $userLoggedIn; ?>"> <img src="<?php echo $user['profile_pic']; ?>" class="profile-pic"></a>

    <div class="bottomnav">

      <ul class="regwidth">
        <li><a href="index.php" class="bottom-nav-links">Timeline</a></li>
        <li><a href="<?php echo $userLoggedIn; ?>" class="bottom-nav-links">About</a> </li>
        <li>
             <a  href="<?php echo $userLoggedIn; ?>" class="loggedin-user">
                <?php
                echo $user['first_name'] . " " . $user['last_name'];
                 ?>
             </a>
        </li>
        <li><a href="friends.php" class="bottom-nav-links">Friends</a></li>
        <li><a href="messages.php" class="bottom-nav-links">Messages</a></li>
      </ul>

      <div class="mobilewidth">

        <h4><a  href="<?php echo $userLoggedIn; ?>">
           <?php
           echo $user['first_name'] . " " . $user['last_name'];
            ?>
        </a></h4>

        <ul>
          <li><a href="index.php">Timeline</a></li>
          <li><a href="<?php echo $userLoggedIn; ?>">About</a> </li>
          <li><a href="friends.php">Friends</a></li>
          <li><a href="messages.php">Messages</a></li>
        </ul>

      </div>

    </div>

      <script src="assets/js/winwidth.js"></script>
