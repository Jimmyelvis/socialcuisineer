<?php
include("includes/header.php");

$user_from = "";

?>

<div class="container">


  <div class="requests">

    <h3 class="heading response"></h3>

    <?php

    $str = "";

    $query = mysqli_query($con, "SELECT * FROM friend_requests WHERE user_to='$userLoggedIn'");

    // $query = mysqli_query($con, "SELECT friend_requests.id, friend_requests.user_to,
    // friend_requests.user_from, users.first_name, users.last_name, .users.profile_pic
    //     FROM friend_requests, users

    // ");

    if (mysqli_num_rows($query) == 0) {

      $str = "
              <h2 class='noRequests heading-2'>
                You have no friend requests at this time!
              </h2>
            ";
      echo $str;
    } else {

      while ($row = mysqli_fetch_array($query)) {

        $user_from = $row['user_from'];

        // $getusersfromQuery = mysqli_query($con, "SELECT * FROM users WHERE username='$user_from'");

        // $userfromrow = mysqli_fetch_array($getusersfromQuery);

        // $profile_pic = $userfromrow['profile_pic'];

        $user_from_obj = new User($con, $user_from);

        $firstLastname = $user_from_obj->getFirstAndLastName();
        $profile_pic = $user_from_obj->getProfilePic();



        $user_from_friend_array = $user_from_obj->getFriendArray();

        // if(isset($_POST['accept_request' . $user_from ])) {

        //     $add_friend_query = mysqli_query($con, "UPDATE users SET friend_array=CONCAT(friend_array, '$user_from,') WHERE username='$userLoggedIn'");

        //     $add_friend_query = mysqli_query($con, "UPDATE users SET friend_array=CONCAT(friend_array, '$userLoggedIn,') WHERE username='$user_from'");

        //     $delete_query = mysqli_query($con, "DELETE FROM friend_requests WHERE user_to='$userLoggedIn' AND user_from='$user_from'");
        // 		echo "You are now friends!";
        // 		header("Location: requests.php");

        // }

        // if(isset($_POST['ignore_request' . $user_from ])) {

        //   $delete_query = mysqli_query($con, "DELETE FROM friend_requests WHERE user_to='$userLoggedIn' AND user_from='$user_from'");
        // 	echo "Request ignored!";
        // 	header("Location: requests.php");

        // }

        $str = "
                <div class='entry' id='$user_from'>
                  <div class='avatar'>
                    <img src='$profile_pic' />
                  </div>

                  <div class='details'>
                    <h3 class='heading-3'>
                      $firstLastname
                    </h3>

                    <p>
                      Sent you a friend request!
                    </p>

                     <form action='requests.php' method='POST'>
                        <input type='submit' class=' acceptButton btn btn-puprle ' name='accept_request-$user_from'  value='Accept'>
                        <input type='submit' class='ignoreButton btn btn-orange' name='ignore_request-$user_from' value='Ignore'>
                    </form>
                  </div>
                </div>
              ";

        echo $str;

    ?>




    <?php

      }
    }

    ?>


  </div>


  <script>
    var userLoggedIn = '<?php echo $userLoggedIn; ?>';
  </script>

  <script src="./assets/js/dist/friendreq.js"></script>


</div>


<?php

include("includes/footer.php");

?>