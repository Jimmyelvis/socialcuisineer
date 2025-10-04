<?php
include("includes/header.php");


$message_obj = new Message($con, $userLoggedIn);


if (isset($_GET['profile_username'])) {

  $username = $_GET['profile_username'];
  $user_details_query = mysqli_query($con, "SELECT * FROM users WHERE username='$username'");
  $user_array = mysqli_fetch_array($user_details_query);

  $num_friends = (substr_count($user_array['friend_array'], ",")) - 1;
}

// if (isset($_POST['remove_friend'])) {
//   $user = new User($con, $userLoggedIn);
//   $user->removeFriend($username);
// }

// if (isset($_POST['add_friend'])) {
//   $user = new User($con, $userLoggedIn);
//   $user->sendRequest($username);
//   header("Location: $username");
// }

if (isset($_POST['respond_request'])) {
  header("Location: requests.php");
}

if (isset($_POST['post_message'])) {
  if (isset($_POST['message_body'])) {
    $body = mysqli_real_escape_string($con, $_POST['message_body']);
    $date = date("Y-m-d H:i:s");
    $message_obj->sendMessage($username, $body, $date);
  }

  $link = '#profileTabs a[href="#messages_div"]';
  echo "<script>
          $(function() {
              $('" . $link . "').tab('show');
          });
        </script>";
}


?>


<div class="container">


  <?php
  include("includes/profile-user-header.php");
  ?>

  <div class="tabContent">

    <div class="tab tab-timeline show">

      <div class="posts_area">

        <div class="loading">
          <span></span><span></span><span></span>
        </div>
      </div>

    </div>

    <div class="tab tab-about">
      <div class="infobar">

        <ul class="location">
          <li class="label">Location</li>
          <li>
            <?php echo $user_array['city']; ?>
            <?php echo $user_array['state']; ?>
          </li>
        </ul>

        <ul class="favFood">
          <li class="label">Favorite Food</li>
          <li>
            <?php echo $user_array['fav_food']; ?>
          </li>
        </ul>

      </div>

      <div class="bio">

        <?php
        if (!$user_array['bio']) {
          echo "<p style='text-align:center'>" . "User has not created a bio yet" .  " </p>";
        } else {
          echo  $user_array['bio'];
        }
        ?>

      </div>
    </div>


    <div class="tab tab-friends">
      <div class="friends" id="friendsContainer">

        <?php
        //Get username parameter from url
        if (isset($_GET['profile_username'])) {
          $username = $_GET['profile_username'];
        } else {
          $username = $userLoggedIn; //If no username set in url, use user logged in instead
        }

        $user_obj = new User($con, $username);
        $friends = $user_obj->getFriendsList();
        $friends_to_render = array_slice($friends, 0, 10); // Render only the first 5 friends


        // only run this if $friends_to_render is not empty
        if (!empty($friends_to_render)) {

          foreach ($friends_to_render as $friend) {
            $friend_obj = new User($con, $friend);
            $name = $friend_obj->getFirstAndLastName();
            $username = $friend_obj->getUsername();
            $profile_pic = $friend_obj->getProfilePic();
            $mutual_friends = $user_obj->ListMutalFriends($friend);

            if ($friend_obj->getUsername() !== null) {
        ?>
              <div class='entry'>
                <a href='<?php echo $friend; ?>'>
                  <div class='main-avatar'>
                    <img src='<?php echo $profile_pic; ?>' alt='<?php echo $name; ?>' s avatar'>
                  </div>
                  <div class='details'>
                    <h3 class='heading-3 friend-fullname'><?php echo $name; ?></h3>
                    <h4 class='heading-4 username'>@<?php echo $username; ?></h4>
                    <?php if (count($mutual_friends) > 0): ?>
                      <div class='mutual-friends-btn'>
                        <div class='avatars-group'>
                          <?php
                          $shown = 0;
                          foreach ($mutual_friends as $mutual) {
                            if ($shown >= 3) break;
                            echo "<img src='{$mutual['avatar']}' alt='{$mutual['name']}' class='avatar'>";
                            $shown++;
                          }
                          ?>
                        </div>
                        <span class='more'>
                          &amp; <span class='mutual_friends_number'>
                            <?php echo count($mutual_friends); ?>
                          </span> more mutual friends
                        </span>
                      </div>
                    <?php endif; ?>
                  </div>
                </a>
              </div>
        <?php
            }
          }
        } else {
          echo "<p style='text-align:center'>" . $user_obj->getFirstAndLastName() . " has no friends yet" .  " </p>";
        }
        ?>


      </div>
    </div>

    <div class="tab tabfriend-requests">

      <h3 class="heading-3 response">
      </h3>

      <div class="requests" id="friendRequestsContainer">



        <div class="loading">
          <span></span><span></span><span></span>
        </div>



      </div>

    </div>

    <div class="tab tabRespondToRequest">
      <h3 class="heading-3 response">
        Respond to Friend Request
      </h3>

      <div class="requests" id="friendRequestsContainer">



        <div class="loading">
          <span></span><span></span><span></span>
        </div>



      </div>
    </div>

  </div>

  <script>
    (function() {

      /**
       * Converts from PHP varible to JavaScript variable 
       * so we can use it.
       */
      const initialFriendsData = <?php echo json_encode(array_slice($friends, 5)); ?>; // Remaining friends
      let userLoggedIn = '<?php echo $userLoggedIn; ?>';
      let profileUsername = '<?php echo $username; ?>';
      const startingTab = document.querySelector('.posts_area');
      const tabContent = document.querySelector('.tabContent');
    })()
  </script>

  <script src="./assets/js/dist/addfriend.js"></script>
  <script src="./assets/js/dist/removefriend.js"></script>
  <script src="./assets/js/dist/profilepage.js"></script>




  <?php

  include("includes/footer.php");

  ?>