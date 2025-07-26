  <!-- <?php

        $user_likes_total_query = mysqli_query($con, "SELECT SUM(likes) FROM `posts` WHERE `added_by` = '$userLoggedIn'");


        $total_likes = mysqli_fetch_row($user_likes_total_query);

        ?> -->


  <div class="profileHeader">

    <div class="profileHeader-imgBg">

      <div class="profileNametag">
        <h2 class="heading-2">
          <a href="<?php echo $userLoggedIn; ?>" class="loggedin-user">
            <?php
            echo $user['first_name'] . " " . $user['last_name'];
            ?>
          </a>
        </h2>



        <div class="posts-likes">

          <div class="posts">
            <img src="./assets/img/post-in-a-circle-wht.svg" alt="">
            <h3 class="heading-3"><?php echo $user['num_posts']; ?></h3>
          </div>

          <div class="likes">
            <img src="./assets/img/like-in-a-circle-wht.svg" alt="">
            <h3 class="heading-3"><?php echo $user['num_likes']; ?></h3>
          </div>
        </div>
      </div>

      <div class="avatar">
        <a href="<?php echo $userLoggedIn; ?>"> <img src="<?php echo $user['profile_pic']; ?>" class="profile-pic"></a>
      </div>

      <div class="overlay"></div>
      <img src="./img/apricot-food-fruit-7961.jpg" alt="" class="imagebg">
    </div>


    <div class="profileHeader-nav">
      <ul>
        <li><a href="index.php">Timeline</a></li>
        <li><a href="<?php echo $userLoggedIn; ?>" class="bottom-nav-links">About</a> </li>
        <li><a href="friends.php" class="bottom-nav-links">Friends</a></li>
        <li><a href="messages.php" class="bottom-nav-links">Messages</a></li>
      </ul>
    </div>

  </div>




  <!-- <script src="assets/js/winwidth.js"></> -->