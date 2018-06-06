<?php
include("includes/header.php");

$message_obj = new Message($con, $userLoggedIn);


if(isset($_GET['profile_username'])){

  $username = $_GET['profile_username'];
	$user_details_query = mysqli_query($con, "SELECT * FROM users WHERE username='$username'");
  $user_array = mysqli_fetch_array($user_details_query);

  $num_friends = (substr_count($user_array['friend_array'], ",")) - 1;


}

if(isset($_POST['remove_friend'])) {
	$user = new User($con, $userLoggedIn);
	$user->removeFriend($username);
}

if(isset($_POST['add_friend'])) {
	$user = new User($con, $userLoggedIn);
	$user->sendRequest($username);
  header("Location: $username");
}

if(isset($_POST['respond_request'])) {
	header("Location: requests.php");
}

if(isset($_POST['post_message'])) {
  if(isset($_POST['message_body'])) {
    $body = mysqli_real_escape_string($con, $_POST['message_body']);
    $date = date("Y-m-d H:i:s");
    $message_obj->sendMessage($username, $body, $date);
  }

  $link = '#profileTabs a[href="#messages_div"]';
  echo "<script>
          $(function() {
              $('" . $link ."').tab('show');
          });
        </script>";


}


 ?>


 <div class="container">

   <div class="user_details">

       <?php
       include("includes/user-header.php");
       ?>

   </div>

       <div class="user_details_left_right column col-md-3">

             <ul class="row intro">
              <li><img class="intro-icon" src="assets/images/icons/intro-btn.png"></li>
              <li><h3>Intro</h3></li>
            </ul>

            <div class="row">

                <div class="col-md-6 col-sm-6 col-sm-6 col-xs-6">

                  <ul class="data-label">
                    <li>Posts:</li>
                    <li>Likes:</li>
                  </ul>

                </div>

                <div class="col-md-6 col-sm-6 col-sm-6 col-xs-6">

                  <ul class="data-info">
                    <li><?php echo $user['num_posts']; ?></li>
                    <li><?php echo $user['num_likes']; ?></li>
                  </ul>

                </div>

            </div>

             <form action="<?php echo $username; ?>" method="post">

                <?php
                  $profile_user_obj = new User($con, $username);

                  if($profile_user_obj->isClosed()) {
             				header("Location: user_closed.php");
             			}

                  $logged_in_user_obj = new User($con, $userLoggedIn);

                  if($userLoggedIn != $username) {

                    if($logged_in_user_obj->isFriend($username)) {
             					echo '<input type="submit" name="remove_friend" class="btn-danger btn-remove" value="Remove Friend"><br>';
             				}
                    else if ($logged_in_user_obj->didReceiveRequest($username)) {
             					echo '<input type="submit" name="respond_request" class="warning" value="Respond to Request"><br>';
           				  }
                    else if ($logged_in_user_obj->didSendRequest($username)) {
             					echo '<input type="submit" name="" class="btn-dark-blue" value="Request Sent"><br>';
           				  }
                    else
             					echo '<input type="submit" name="add_friend" class="btn-primary btn-add-friend" value="Add Friend"><br>';
                  }


                 ?>


             </form>

             <input type="submit" class="btn-dark-blue" data-toggle="modal" data-target="#post_form" value="Post Something">

             <?php
                if($userLoggedIn != $username) {
                  echo '<div class="profile_info_bottom">';
                    echo $logged_in_user_obj->getMutualFriends($username) . " Mutual friends";
                  echo '</div>';
                }
              ?>

       </div>


       <div class="index_column">


           <ul class="nav nav-tabs" role="tablist" id="profileTabs">
             <li role="presentation" class="active"><a href="#newsfeed_div" aria-controls="newsfeed_div" role="tab" data-toggle="tab">Newsfeed</a></li>
             <li role="presentation"><a href="#about_div" aria-controls="about_div" role="tab" data-toggle="tab">About</a></li>
             <li role="presentation"><a href="#messages_div" aria-controls="messages_div" role="tab" data-toggle="tab">Messages</a></li>
             <li role="presentation"><a href="#friends_div" aria-controls="friends_div" role="tab"
              data-toggle="tab">Friends</a></li>
           </ul>

           <div class="tab-content">

               <div role="tabpanel" class="tab-pane fade in active" id="newsfeed_div">
                 <div class="posts_area"></div>
                 <img id="loading" src="assets/images/icons/loading.gif">
               </div>

               <div role="tabpanel" class="tab-pane fade" id="about_div">

                 <h3>About <?php echo $user_array['first_name'] . " " .  $user_array['last_name']; ?></h3>

                   <div class="col-md-6">

                     <ul>
                       <li>Posts</li>
                       <li>Likes</li>
                       <li>City</li>
                       <li>State</li>
                       <li>Favorite Food</li>
                     </ul>


                   </div>

                   <div class="right-column-data col-md-6">

                     <ul>
                       <li><?php echo $user_array['num_posts']; ?></li>
                       <li><?php echo $user_array['num_likes']; ?></li>
                       <li><?php echo $user_array['city']; ?></li>
                       <li><?php echo $user_array['state']; ?></li>
                       <li><?php echo $user_array['fav_food']; ?></li>

                     </ul>


                   </div>

               </div>


               <div role="tabpanel" class="tab-pane fade" id="messages_div">
                 <?php

                   echo "<h4>You and <a href='" . $username ."'>" . $profile_user_obj->getFirstAndLastName() . "</a></h4><hr><br>";

                   echo "<div class='loaded_messages' id='scroll_messages'>";
                     echo "<ul>";
                     echo $message_obj->getMessages($username);
                     echo "</ul>";
                   echo "</div>";
                 ?>



                 <div class="message_post">
                   <form action="" method="POST">
                       <textarea name='message_body' id='message_textarea' placeholder='Write your message ...'></textarea>
                       <input type='submit' name='post_message' class='btn-primary btn-message-submit' id='message_submit' value='Send'>
                   </form>

                 </div>

                 <script>
                   var div = document.getElementById("scroll_messages");
                   div.scrollTop = div.scrollHeight;
                 </script>
               </div>

                <div role="tabpanel" class="tab-pane fade" id="friends_div">

                   <h3>Friends of
                     <?php
                     echo $user_array['first_name'] . " " .  $user_array['last_name'];
                      ?>
                   </h3>

                   <?php
                       //Get username parameter from url
                       if(isset($_GET['profile_username'])) {
                       $username = $_GET['profile_username'];
                       }
                       else {
                       $username = $userLoggedIn; //If no username set in url, use user logged in instead
                       }
                    ?>

                    <ul>

                      <?php
                        $user_obj = new User($con, $username);
                        foreach($user_obj->getFriendsList() as $friend) {
                            $friend_obj = new User($con, $friend);

                            echo "
                             <div class='col-md-6'>
                               <li><a href='$friend'>
                                    <img class='profilePicSmall' src='" . $friend_obj->getProfilePic() ."'>"
                                    . $friend_obj->getFirstAndLastName() .
                                "</a></li>
                             </div>
                                ";
                        }
                       ?>

                </div>


         </div>




         <!-- <div class="posts_area"></div> -->
         <!-- <img id="loading" src="assets/images/icons/loading.gif"> -->


     	</div>


      <!-- Modal -->
      <div class="modal fade" id="post_form" tabindex="-1" role="dialog" aria-labelledby="postModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">

              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
                <h4 class="modal-title" id="postModalLabel">Post something</h4>
              </div>

              <div class="modal-body">
              <p>This will appear on their newsfeed for your Colleagues to see. </p>

              <form class="profile_post" action="profile.php" method="POST" enctype="multipart/form-data">
              <div class="form-group">
              <textarea class="form-control" name="post_body"></textarea>
                    <input type="file" name="fileToUpload" id="fileToUpload">
              <input type="hidden" name="user_from" value="<?php echo $userLoggedIn; ?>">
              <input type="hidden" name="user_to" value="<?php echo $username; ?>">
              </div>
              </form>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" name="post_button" id="submit_profile_post">Post</button>
              </div>
            </div>
          </div>
        </div>

</div> <!--   //////////////////// END OF CONTAINER /////////////////////// -->



    <script>
     $(function(){

         var userLoggedIn = '<?php echo $userLoggedIn; ?>';
         var profileUsername = '<?php echo $username; ?>';
         // console.log("profileUsername value: " + profileUsername); //*** ADD THIS LINE ***
         var inProgress = false;

         loadPosts(); //Load first posts

         $(window).scroll(function() {
             var bottomElement = $(".status_post").last();
             var noMorePosts = $('.posts_area').find('.noMorePosts').val();

             // isElementInViewport uses getBoundingClientRect(), which requires the HTML DOM object, not the jQuery object. The jQuery equivalent is using [0] as shown below.
             if (isElementInView(bottomElement[0]) && noMorePosts == 'false') {
                 loadPosts();
             }
         });

         function loadPosts() {
             if(inProgress) { //If it is already in the process of loading some posts, just return
                 return;
             }

             inProgress = true;
             $('#loading').show();

             var page = $('.posts_area').find('.nextPage').val() || 1; //If .nextPage couldn't be found, it must not be on the page yet (it must be the first time loading posts), so use the value '1'

             $.ajax({
                 url: "includes/handlers/ajax_load_profile_posts.php",
                 type: "POST",
                 data: "page=" + page + "&userLoggedIn=" + userLoggedIn + "&profileUsername=" + profileUsername,
                 cache:false,

                 success: function(response) {
                     $('.posts_area').find('.nextPage').remove(); //Removes current .nextpage
                     $('.posts_area').find('.noMorePosts').remove(); //Removes current .nextpage
                     $('.posts_area').find('.noMorePostsText').remove(); //Removes current .nextpage

                     $('#loading').hide();
                     $(".posts_area").append(response);

                     inProgress = false;
                 }
             });
         }

         //Check if the element is in view
         function isElementInView (el) {
               if(el == null) {
                  return;
              }

             var rect = el.getBoundingClientRect();

             return (
                 rect.top >= 0 &&
                 rect.left >= 0 &&
                 rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && //* or $(window).height()
                 rect.right <= (window.innerWidth || document.documentElement.clientWidth) //* or $(window).width()
             );
         }
     });

     </script>




	</div>
</body>
</html>
