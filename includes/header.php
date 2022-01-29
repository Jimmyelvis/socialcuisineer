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


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome To Social Cuisener</title>


  <!-- Javascript -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
  <script src="assets/js/bootbox.min.js"></script>
  <script src="assets/js/ajaxcalls.js"></script>
  <script src="assets/js/jcrop.js"></script>
  <script src="assets/js/jcrop_bits.js"></script>
  <script src="assets/js/slidemenu.js"></script>
  <script src="https://unpkg.com/simplebar@latest/dist/simplebar.min.js"></script>

  <!-- CSS -->
  <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"> -->

  <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/simplebar@latest/dist/simplebar.css" />
  <link rel="stylesheet" href="assets/css/jquery.Jcrop.css" type="text/css" />
  <link rel="stylesheet" href="assets/css/cropper.min.css" type="text/css" />


  <link rel="stylesheet" href="assets/css/style.css">

  <style>

  </style>


</head>

<body>

  <div class="checkboxcontain">

    <input type="checkbox" autocomplete="off" class="checkbox" id="navi-toggle">

    <label for="navi-toggle" class="button">
      <span class="icon">&nbsp;</span>
    </label>
  </div>


  <header>

    <nav class="nav">

      <div class="nav-searchbox">

        <form action="search.php" method="GET" name="search_form">
          <input type="text" placeholder="Search..." class="searchBox" onkeyup="getLiveSearchUsers(this.value, '<?php echo $userLoggedIn; ?>')" name="q" autocomplete="off" id="search_text_input">
        </form>

        <!-- 
          Results from the search will be displayed here 
        -->
        <div class="searchResultsbox">
        </div>

        <div class="search_results_footer_empty">
        </div>

      </div>

      <div class="nav-loggedinUser">

        <a href="<?php echo $userLoggedIn; ?>">
          <?php echo $user['first_name'], ' ', $user['last_name']; ?>
        </a>

        <div class="avatar">
          <img src=<?php echo $user['profile_pic']; ?> alt="" id="navbarAvatarImg">
        </div>

      </div>

    </nav>

    <input type="hidden" id="dropdown_data_type" value="">

  </header>

  <div class="sidebarLeft">

    <ul class="side-nav">

      <li class="logo">
        <a href="index.php">
          <img src="./assets/img/logo-2021-version.svg" alt="">
        </a>
      </li>

      <li>
        <a href="index.php">
          <img src="./assets/img/home.svg" alt="" class="links">
        </a>
      </li>

      <li>
        <a href="settings.php">
          <img src="./assets/img/gears.svg" alt="" class="links">
        </a>
      </li>

      <!-- <li>
        <img src="./assets/img/messages.svg" alt="" class="links" id="messagesBtn" onclick="getDropdownData('<?php echo $userLoggedIn; ?>', 'message')">
        <?php
        if ($num_messages > 0) {
          echo '<span class="notification_badge" id="unread_message">' . $num_messages . '</span>';
        }
        ?>
      </li> -->


      <li>
        <img src=" ./assets/img/friends.svg" alt="" class="links" id="friendsRquBtn" onclick="getDropdownData('<?php echo $userLoggedIn; ?>', 'friendReqs')">
        <?php
        if ($num_requests > 0) {
          echo '<span class="notification_badge" id="unread_requests">' . $num_requests . '</span>';
        }
        ?>
      </li>

      <li>
        <img src="./assets/img/bell.svg" alt="" class="links" id="notificationsBtn" onclick="getDropdownData('<?php echo $userLoggedIn; ?>', 'notification')">
        <?php
        if ($num_notifications > 0) {
          echo '<span class="notification_badge" id="unread_notification">' . $num_notifications . '</span>';
        }
        ?>
      </li>

      <li>
        <a href=" includes/handlers/logout.php">
          <img src="./assets/img/log-out.svg" alt="" class="links">
        </a>
      </li>



    </ul>

  </div>

  <div class="friendsRequestsDesktop">

    <div class="content">

      <img src="./assets/img/close-btn-4.svg" alt="" class="closeBtn">

      <ul class="menu">
        <img src="./assets/img/friends-v2-no-bg.svg" alt="" class="reqIcon">

        <h3 class="heading-3">Friends Requests</h3>
      </ul>

      <ul class="entries" id="friendsDiv">
      </ul>

    </div>

    <div class="overlay" id="overlay"></div>

  </div>

  <div class="notificationsDesktop">

    <div class="content">

      <img src="./assets/img/close-btn-4.svg" alt="" class="closeBtn">

      <ul class="menu">
        <img src="./assets/img/Notifcations.svg" alt="" class="reqIcon">

        <h3 class="heading-3">Notifcations</h3>
      </ul>

      <div class="entries" id="notificationsEntries">
      </div>

    </div>

    <div class="overlay" id="overlay"></div>

  </div>

  <div class="messagesDesktop">

    <div class="content">

      <img src="./assets/img/close-btn-4.svg" alt="" class="closeBtn">

      <ul class="menu">
        <img src="./assets/img/Notifcations.svg" alt="" class="reqIcon">

        <h3 class="heading-3">Messages Received</h3>
      </ul>

      <ul class="entries" id="msgEntries">

      </ul>

    </div>

    <div class="overlay" id="overlay"></div>
    <input type="hidden" id="dropdown_data_type" value="">


  </div>

  <nav class="mobilemenu">

    <img src="./assets/img/close-btn-4.svg" alt="" class="mobileClose">

    <!-- <div class="avatar">
      <img src=<?php echo $user['profile_pic']; ?> alt="">
    </div> -->

    <ul class="sidenav">

      <li>
        <a href="index.php">
          <img src="./assets/img/home icon.svg" alt="" class="links">
          Home
        </a>
      </li>

      <li>
        <a href="settings.php">
          <img src="./assets/img/gears icon.svg" alt="" class="links">
          Settings
        </a>
      </li>

      <li id="requests" onclick="getDropdownDataMobile('<?php echo $userLoggedIn; ?>', 'friendReqs')">
        <img src="./assets/img/friends-v2-gold.svg" alt="" class="links">

        Friends Requests

        <?php
        if ($num_requests > 0) {
          echo '<span class="notification_badge" id="unread_requests">' . $num_requests . '</span>';
        }
        ?>
      </li>

      <li id="notifications" onclick="getDropdownDataMobile('<?php echo $userLoggedIn; ?>', 'notification')">
        <img src="./assets/img/Notifcations.svg" alt="" class="links">

        Notifications

        <?php
        if ($num_notifications > 0) {
          echo '<span class="notification_badge" id="unread_notification">' . $num_notifications . '</span>';
        }
        ?>
      </li>

      <!-- <li id="messages" onclick="getDropdownDataMobile('<?php echo $userLoggedIn; ?>', 'message')">
        <img src="./assets/img/comments icon.svg" alt="" class="links">

        Messages

        <?php
        if ($num_messages > 0) {
          echo '<span class="notification_badge" id="unread_message">' . $num_messages . '</span>';
        }
        ?>
      </li> -->

      <li id="searchLink">
        <img src="./assets/img/search-gold.svg" alt="" class="links">

        Search
      </li>

      <li>
        <a href=" includes/handlers/logout.php">
          <img src="./assets/img/log-out-v2.svg" alt="" class="links">
          Log Out
        </a>
      </li>

    </ul>

    <div class="friendsRequests">

      <ul class="menu">
        <li class="back">
          <img src="./assets/img/backv2.svg" alt="" class="backArrow">
        </li>

        <h3 class="heading-3">Friends Requests</h3>
      </ul>

      <ul class="friends" id="friendsEntriesMobile">
      </ul>

    </div>

    <div class="notifications">

      <ul class="menu">
        <li class="back">
          <img src="./assets/img/backv2.svg" alt="" class="backArrow">
        </li>

        <h3 class="heading-3">Notifications</h3>
      </ul>

      <div class="entries" id="notificationsEntriesMobile">

      </div>

    </div>

    <div class="messages">

      <ul class="menu">
        <li class="back">
          <img src="./assets/img/backv2.svg" alt="" class="backArrow">
        </li>

        <h3 class="heading-3">Messages</h3>
      </ul>

      <div class="entries" id="messagesEntriesMobile">

      </div>

    </div>


    <div class="searchSection">

      <ul class="menu">
        <li class="back">
          <img src="./assets/img/backv2.svg" alt="" class="backArrow">
        </li>

        <h3 class="heading-3">Main Menu</h3>
      </ul>

      <form action="search.php" method="GET" name="search_form">
        <input type="text" placeholder="Search..." class="searchBox" onkeyup="getLiveSearchUsersMobile(this.value, '<?php echo $userLoggedIn; ?>')" name="q" autocomplete="off" id="search_text_inputMobile">
      </form>

      <div class="searchResultsbox">
      </div>

      <div class="search_results_footer_empty">
      </div>


    </div>

  </nav>

  <script>
    var userLoggedIn = '<?php echo $userLoggedIn; ?>';



    $(document).ready(function() {

      /**
       * Notifications Menus Desktop and Mobile versions
       */
      notificationsEntries = new SimpleBar(document.getElementById('notificationsEntries'), {
        autoHide: false,
        forceVisible: true
      });

      const notificationsMobile = document.getElementById('notificationsEntriesMobile');

      notificationsEntries.getScrollElement().addEventListener('scroll', function(event) {

        var noMoreData = $('.notificationsDesktop .content .entries .simplebar-content').find('.noMoreDropdownData').val();
        var page = $('.notificationsDesktop .content .entries .simplebar-content').find('.nextPageDropdownData').val();

        if (event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight && noMoreData == 'false') {
          var type = $('#dropdown_data_type').val();
          var pageName; //Holds name of page to send ajax request to


          if (type == 'notification') {
            innerDiv = ".notificationsDesktop .content .entries .simplebar-content";
            pageName = "ajax_load_notifications.php";

            var ajaxReq = $.ajax({
              url: "includes/handlers/" + pageName,
              type: "POST",
              data: "page=" + page + "&userLoggedIn=" + userLoggedIn, //the Request that sent
              cache: false,

              success: function(response) {
                $(innerDiv).find('.nextPageDropdownData').remove(); //Removes current .nextpage
                $(innerDiv).find('.noMoreDropdownData').remove(); //Removes current .nextpage


                $(innerDiv).append(response);
              }
            });
          }
        }

        return false;

      });

      notificationsMobile.addEventListener('scroll', function(event) {

        var noMoreData = $('.notifications .entries').find('.noMoreDropdownData').val();
        var page = $('.notifications .entries').find('.nextPageDropdownData').val();

        if (event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight && noMoreData == 'false') {
          var type = $('#dropdown_data_type').val();
          var pageName; //Holds name of page to send ajax request to

          if (type == 'notification') {
            innerDiv = ".notifications .entries";
            pageName = "ajax_load_notifications.php";

            var ajaxReq = $.ajax({
              url: "includes/handlers/" + pageName,
              type: "POST",
              data: "page=" + page + "&userLoggedIn=" + userLoggedIn, //the Request that sent
              cache: false,

              success: function(response) {
                $(innerDiv).find('.nextPageDropdownData').remove(); //Removes current .nextpage
                $(innerDiv).find('.noMoreDropdownData').remove(); //Removes current .nextpage
                $(innerDiv).append(response);
              }
            });
          }


        }

        return false;

      });

      /**
       * Messages Menus Desktop and Mobile versions
       */
      msgEntries = new SimpleBar(document.getElementById('msgEntries'), {
        autoHide: false,
        forceVisible: true
      });

      msgEntries.getScrollElement().addEventListener('scroll', function(event) {

        var noMoreData = $('.messagesDesktop .content .entries .simplebar-content').find('.noMoreDropdownData').val();
        var page = $('.messagesDesktop .content .entries .simplebar-content').find('.nextPageDropdownData').val();

        if (event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight && noMoreData == 'false') {
          var type = $('#dropdown_data_type').val();
          var pageName; //Holds name of page to send ajax request to


          if (type == 'message') {
            innerDiv = ".messagesDesktop .content .entries .simplebar-content";
            pageName = "ajax_load_messages.php";

            var ajaxReq = $.ajax({
              url: "includes/handlers/" + pageName,
              type: "POST",
              data: "page=" + page + "&userLoggedIn=" + userLoggedIn, //the Request that sent
              cache: false,

              success: function(response) {
                $(innerDiv).find('.nextPageDropdownData').remove(); //Removes current .nextpage
                $(innerDiv).find('.noMoreDropdownData').remove(); //Removes current .nextpage


                $(innerDiv).append(response);
              }
            });
          }
        }

        return false;

      });

      messagesEntriesMobile.addEventListener('scroll', function(event) {

        var noMoreData = $('.messages .entries').find('.noMoreDropdownData').val();
        var page = $('.messages .entries').find('.nextPageDropdownData').val();

        if (event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight && noMoreData == 'false') {
          var type = $('#dropdown_data_type').val();
          var pageName; //Holds name of page to send ajax request to

          if (type == 'message') {
            innerDiv = ".messages .entries";
            pageName = "ajax_load_messages.php";

            var ajaxReq = $.ajax({
              url: "includes/handlers/" + pageName,
              type: "POST",
              data: "page=" + page + "&userLoggedIn=" + userLoggedIn, //the Request that sent
              cache: false,

              success: function(response) {
                $(innerDiv).find('.nextPageDropdownData').remove(); //Removes current .nextpage
                $(innerDiv).find('.noMoreDropdownData').remove(); //Removes current .nextpage
                $(innerDiv).append(response);
              }
            });
          }


        }

        return false;

      });


      /**
       * Friends Requests Menus Desktop and Mobile versions
       */
      friendsEntries = new SimpleBar(document.getElementById('friendsDiv'), {
        autoHide: false,
        forceVisible: true
      });


    })
  </script>