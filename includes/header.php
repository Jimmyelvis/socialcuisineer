<?php
require 'config/config.php';
include("includes/classes/User.php");
include("includes/classes/Post.php");
include("includes/classes/Message.php");
include("includes/classes/Notification.php");

if (isset($_SESSION['username'])) {
    $userLoggedIn = $_SESSION['username'];
    $user_details_query = mysqli_query($con, "SELECT * FROM users WHERE username='$userLoggedIn'");
    $user = mysqli_fetch_array($user_details_query);

// echo '<pre>'; print_r($user); echo '</pre>';
} else {
    header("Location: register.php");
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">


	<!-- Javascript -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
		<script src="assets/js/bootbox.min.js"></script>
	<script src="assets/js/swirlfeed.js"></script>
	<script src="assets/js/jcrop.js"></script>
  <script src="assets/js/jcrop_bits.js"></script>
  <script src="assets/js/slidemenu.js"></script>



<!-- CSS -->
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="assets/css/style-updated-2.css">
<link rel="stylesheet" href="assets/css/jquery.Jcrop.css" type="text/css" />

  <title>Welcome To Social Cuisener</title>

</head>
<body>

<div class="top_bar">

      <div class="container">

        <div class="row">


          <div class="logo col-md-1 col-sm-1 col-xs-1">
             <a href="index.php"><img src="assets/images/icons/logo-home-btn.png" alt=""></a>
         </div>

          <div class="col-md-4 col-md-offset-2 col-sm-4 col-sm-offset-1 col-xs-5">

            <div class="search">

                  <form class="" action="search.php" method="GET" name="search_form">

                    <div class="col-md-6 col-sm-6 col-xs-6">

                        <input type="text" onkeyup="getLiveSearchUsers(this.value, '<?php echo $userLoggedIn; ?>')" name="q" placeholder="Search..." autocomplete="off" id="search_text_input">

                    </div>

                    <div class="button_holder col-md-2 col-sm-2 col-xs-2">

                          <img src="assets/images/icons/magnifier.png">

                    </div>

                  </form>

                  <div class="search_results">

                  </div>

                  <div class="search_results_footer_empty">
                  </div>

            </div>


          </div>

          <div class="open-slide col-md-3 col-md-offset-1 col-sm-3 col-sm-offset-1 col-xs-3 col-xs-offset-1">

              <div class="row">

                <div class="mobile-profile-link col-sm-6 col-xs-6">
                  <a href="<?php echo $userLoggedIn; ?>">
                    <?php echo $user['first_name']; ?>
                  </a>
                </div>

                <div class="hambuger-menu col-sm-6 col-xs-6">
                  <a href="#" onclick="openSlideMenu()">
                    <svg>
                        <path d="M0,5 30,5" stroke="#469ce7" stroke-width="5"/>
                        <path d="M0,14 30,14" stroke="#469ce7" stroke-width="5"/>
                        <path d="M0,23 30,23" stroke="#469ce7" stroke-width="5"/>
                    </svg>
                  </a>

                </div>

              </div>


          </div>

          <nav id="nav" class="col-md-4 pull-right">

    				<?php
                        //Unread messages
                        $messages = new Message($con, $userLoggedIn);
                        $num_messages = $messages->getUnreadNumber();

                                            //Unread notifications
                                $notifications = new Notification($con, $userLoggedIn);
                                $num_notifications = $notifications->getUnreadNumber();

                                //Unread notifications
                                $user_obj = new User($con, $userLoggedIn);
                                $num_requests = $user_obj->getNumberOfFriendRequests();


              ?>


    		      <a href="<?php echo $userLoggedIn; ?>" class="profile-link">
    						<?php echo $user['first_name']; ?>
    					</a>
    					<a href="index.php">
    						<img src="assets/images/icons/house.png" alt="">
    					</a>
    					<a href="javascript:void(0);" onclick="getDropdownData('<?php echo $userLoggedIn; ?>', 'message')">
    						<img src="assets/images/icons/chat.png" alt="">
    						<?php
                  if ($num_messages > 0) {
                      echo '<span class="notification_badge" id="unread_message">' . $num_messages . '</span>';
                  }
               ?>
    					</a>
    					<a href="javascript:void(0);" onclick="getDropdownData('<?php echo $userLoggedIn; ?>', 'notification')">
    						<img src="assets/images/icons/bell.png" alt="">
    						<?php
                                if ($num_notifications > 0) {
                                    echo '<span class="notification_badge" id="unread_notification">' . $num_notifications . '</span>';
                                }
                                ?>
    					</a>
    					<a href="requests.php">
    						<img src="assets/images/icons/friends-icon.png" alt="">
                <?php
                                if ($num_requests > 0) {
                                    echo '<span class="notification_badge" id="unread_requests">' . $num_requests . '</span>';
                                }
                            ?>
    					</a>
    					<a href="Settings.php">
    						<img src="assets/images/icons/gear.png" alt="">
    					</a>
    					<a href="includes/handlers/logout.php">
    						<img src="assets/images/icons/login.png" alt="">
    					</a>

    		  </nav>


          <div id="side-menu" class="side-nav">

            <a href="#" class="btn-close" onclick="closeSlideMenu()">&times;</a>

              <div class="row">

                  <div class="mobile-icon-list col-sm-4 col-xs-4">

                    <ul>
                      <li>
                          <a href="index.php">
                            <img src="assets/images/icons/house.png" alt="">
                          </a>
                      </li>
                      <li>
                          <a href="javascript:void(0);" onclick="getDropdownData('<?php echo $userLoggedIn; ?>', 'message')">
                						<img src="assets/images/icons/chat.png" alt="">
                						<?php
                              if ($num_messages > 0) {
                                  echo '<span class="notification_badge" id="unread_message">' . $num_messages . '</span>';
                              }
                           ?>
                					</a>
                      </li>
                      <li>
                          <a href="javascript:void(0);" onclick="getDropdownData('<?php echo $userLoggedIn; ?>', 'notification')">
                						<img src="assets/images/icons/bell.png" alt="">
                						<?php
                                            if ($num_notifications > 0) {
                                                echo '<span class="notification_badge" id="unread_notification">' . $num_notifications . '</span>';
                                            }
                                            ?>
                					</a>
                      </li>
                      <li>
                          <a href="requests.php">
                            <img src="assets/images/icons/friends-icon.png" alt="">
                            <?php
                                            if ($num_requests > 0) {
                                                echo '<span class="notification_badge" id="unread_requests">' . $num_requests . '</span>';
                                            }
                                        ?>
                          </a>
                      </li>
                      <li>
                          <a href="Settings.php">
                            <img src="assets/images/icons/gear.png" alt="">
                          </a>
                      </li>
                      <li>
                          <a href="includes/handlers/logout.php">
                            <img src="assets/images/icons/login.png" alt="">
                          </a>
                      </li>
                    </ul>


                  </div>
                  <div class="mobile-link-list col-sm-8 col-xs-8">

                      <ul>
                        <li><a href="index.php">HOME</a></li>

                        <li><a href="javascript:void(0);" onclick="getDropdownData('<?php echo $userLoggedIn; ?>', 'message')">
                          <?php
                            if ($num_messages > 0) {
                                echo '<span class="notification_badge" id="unread_message">' . $num_messages . '</span>';
                            }
                         ?>

                          MESSAGES</a>

                        </li>

                        <li><a href="javascript:void(0);" onclick="getDropdownData('<?php echo $userLoggedIn; ?>', 'notification')">

                          <?php
                              if ($num_notifications > 0) {
                                  echo '<span class="notification_badge" id="unread_notification">' . $num_notifications . '</span>';
                              }
                              ?>


                          NOTIFICATIONS</a></li>


                        <li><a href="requests.php">FRIEND REQUESTS</a></li>
                        <li><a href="Settings.php">SETTINGS</a></li>
                        <li><a href="includes/handlers/logout.php">LOG OUT</a></li>
                      </ul>

                  </div>

              </div>

          </div>



        </div>




      </div>







			<div class="dropdown_data_window" style="height:0px; border:none;"></div>
      <input type="hidden" id="dropdown_data_type" value="">

</div>

<script>
	var userLoggedIn = '<?php echo $userLoggedIn; ?>';

	$(document).ready(function() {

		$('.dropdown_data_window').scroll(function() {
			var inner_height = $('.dropdown_data_window').innerHeight(); //Div containing data
			var scroll_top = $('.dropdown_data_window').scrollTop();
			var page = $('.dropdown_data_window').find('.nextPageDropdownData').val();
			var noMoreData = $('.dropdown_data_window').find('.noMoreDropdownData').val();

			if ((scroll_top + inner_height >= $('.dropdown_data_window')[0].scrollHeight) && noMoreData == 'false') {

				var pageName; //Holds name of page to send ajax request to
				var type = $('#dropdown_data_type').val();


				if(type == 'notification')
					pageName = "ajax_load_notifications.php";
				else if(type == 'message')
					pageName = "ajax_load_messages.php"


				var ajaxReq = $.ajax({
					url: "includes/handlers/" + pageName,
					type: "POST",
					data: "page=" + page + "&userLoggedIn=" + userLoggedIn,
					cache:false,

					success: function(response) {
						$('.dropdown_data_window').find('.nextPageDropdownData').remove(); //Removes current .nextpage
						$('.dropdown_data_window').find('.noMoreDropdownData').remove(); //Removes current .nextpage


						$('.dropdown_data_window').append(response);
					}
				});

			} //End if

			return false;

		}); //End (window).scroll(function())


	});

	</script>
