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

    <!-- <div class="tab tab-messages">

      <div class="messagesBox">

        <div class="messageToLabel">
          <h3 class="heading-3">
            You and
            <span class="person">
              <?php

              $profile_user_obj = new User($con, $username);

              echo "<a href='" . $username . "'>"
                . $profile_user_obj->getFirstAndLastName() . "
                  </a>";

              ?>
            </span>
          </h3>
        </div>

        <div class="messages loaded_messages" id='scroll_messages'>

          <?php
          echo $message_obj->getMessages($username);
          ?>

        </div>

        <form action="" method="POST">
          <textarea name='message_body' id='message_textarea' cols="30" rows="10" placeholder="Post Something..." class="textArea"></textarea>
          <input type='submit' name='post_message' class='btn btn-puprle btn-modalSubmit' id='message_submit' value='Submit'>
        </form>

      </div>

    </div> -->

    <div class="tab tab-friends">
      <div class="friends">

        <?php
        //Get username parameter from url
        if (isset($_GET['profile_username'])) {
          $username = $_GET['profile_username'];
        } else {
          $username = $userLoggedIn; //If no username set in url, use user logged in instead
        }
        ?>

        <?php
        $user_obj = new User($con, $username);
        foreach ($user_obj->getFriendsList() as $friend) {
          $friend_obj = new User($con, $friend);
          $name = $friend_obj->getFirstAndLastName();

          if ($friend_obj->getUsername() !== null) {
            echo "
            <div class='entry'>
                <a href='$friend'>
                    <img src='" . $friend_obj->getProfilePic() . "'>
                    <h4 class='heading-4'> $name </h4>
                </a>
            </div>";
          }
        }
        ?>


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