<div class="profileHeader ">

  <div class="profileHeader-imgBg">

    <div class="profileNametag">
      <h2 class="heading-2">
        <?php
        echo $user_array['first_name'] . " " . $user_array['last_name'];
        ?>
      </h2>

      <div class="posts-likes">

        <div class="posts">
          <img src="./assets/img/post-in-a-circle-wht.svg" alt="">
          <h3 class="heading-3"><?php echo $user_array['num_posts']; ?></h3>
        </div>

        <div class="likes">
          <img src="./assets/img/like-in-a-circle-wht.svg" alt="">
          <h3 class="heading-3"><?php echo $user_array['num_likes']; ?></h3>
        </div>
      </div>
    </div>

    <div class="avatar">
      <img src="<?php echo $user_array['profile_pic']; ?>">
    </div>

    <div class=" overlay">
    </div>

    <div class="imagebg ">
      <img src="<?php echo $user_array['profile_header']; ?>" alt="" class="imagebg scroll" data-rate="0.6" data-direction="vertical">
    </div>

  </div>


  <div id="profileHeaderNav" class="profileHeader-nav">
    <ul class="firstOptions active">
      <li class="linkTab active" id="timelineTab">
        Posts
      </li>
      <li class="linkTab" id="aboutTab">
        About
      </li>
      <!-- <li class="linkTab">
        Messages
      </li> -->
      <li class="linkTab" id="friendsTab">
        Friends
      </li>
      <li class="etc">
        ...
      </li>
    </ul>

    <ul class="secondOptions">
      <li>
        <?php
        $profile_user_obj = new User($con, $username);

        if ($profile_user_obj->isClosed()) {
          header("Location: user_closed.php");
        }

        $logged_in_user_obj = new User($con, $userLoggedIn);

        if ($userLoggedIn != $username) {

          if ($logged_in_user_obj->isFriend($username)) {
            echo '<input id="removeFriend" type="submit" name="remove_friend" class="btnText btnText-orange" value="Remove Friend"><br>';
          } else if ($logged_in_user_obj->didReceiveRequest($username)) {
            echo '<input type="submit" name="respond_request" class="btnText btnText-purple" value="Respond to Request"><br>';
          } else if ($logged_in_user_obj->didSendRequest($username)) {
            echo '<input type="submit" name="" class="btnText btnText-purple" value="Request Sent"><br>';
          } else
            echo '<input id="addFriend" type="submit" name="add_friend" class="btnText btnText-purple" value="Add Friend"><br>';
        }
        ?>

      </li>

      <?php if ($userLoggedIn == $username): ?>

        <li class="linkTab" id="friendsRequestsTab">
          Friends Requests
        </li>
      <?php endif ?>
      <li class="etc">
        ...
      </li>
    </ul>
  </div>

  <script>
    var profileUsername = '<?php echo $username; ?>';
  </script>

</div>