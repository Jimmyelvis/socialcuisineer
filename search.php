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

     <?php

         if (isset($_GET['q'])) {
             $query = $_GET['q'];
         } else {
             $query = "";
         }

         if (isset($_GET['type'])) {
             $type = $_GET['type'];
         } else {
             $type = "name";
         }

      ?>

   	  <?php
               if ($query == "") {
                   echo "You must enter something in the search box.";
               } else {

                    //If query contains an underscore, assume user is searching for usernames
                   if ($type == "username") {
                       $usersReturnedQuery = mysqli_query($con, "SELECT * FROM users WHERE username LIKE '$query%' AND user_closed='no' LIMIT 8");
                   } else {
                       $names = explode(" ", $query);

                       //If there are two words, assume they are first and last names respectively
                       if (count($names) == 3) {
                           $usersReturnedQuery = mysqli_query($con, "SELECT * FROM users WHERE (first_name LIKE '$names[0]%' AND last_name LIKE '$names[2]%') AND user_closed='no'");
                       }

                       //If query has one word only, search first names or last names
                       elseif (count($names) == 2) {
                           $usersReturnedQuery = mysqli_query($con, "SELECT * FROM users WHERE (first_name LIKE '$names[0]%' AND last_name LIKE '$names[1]%') AND user_closed='no'");
                       } else {
                           $usersReturnedQuery = mysqli_query($con, "SELECT * FROM users WHERE (first_name LIKE '$names[0]%' OR last_name LIKE '$names[0]%') AND user_closed='no'");
                       }
                   }

                   //Check if results were found

                   if (mysqli_num_rows($usersReturnedQuery) == 0) {
                       echo "We can't find anyone with a " . $type . " like: " .$query;
                   } else {
                       echo mysqli_num_rows($usersReturnedQuery) . " results found: <br> <br>";
                   }

                   echo "<p id='grey'>Try searching for:</p>";

                   echo "<a href='search.php?q=" . $query ."&type=name'>Names</a>, <a href='search.php?q=" . $query ."&type=username'>Usernames</a><br><br><hr id='search_hr'>";

                   while ($row = mysqli_fetch_array($usersReturnedQuery)) {
                       $user_obj = new User($con, $user['username']);


                       $button = "";
                       $mutual_friends = "";

                       if ($user['username'] != $row['username']) {
                           //Generate button depending on friendship status
                           if ($user_obj->isFriend($row['username'])) {
                               $button = "<input type='submit' name='" . $row['username'] . "' class='danger' value='Remove Friend'>";
                           } elseif ($user_obj->didReceiveRequest($row['username'])) {
                               $button = "<input type='submit' name='" . $row['username'] . "' class='warning' value='Respond to request'>";
                           } elseif ($user_obj->didSendRequest($row['username'])) {
                               $button = "<input type='submit' class='btn-dark-blue btn-request-sent' value='Request Sent'>";
                           } else {
                               $button = "<input type='submit' name='" . $row['username'] . "' class='btn-primary btn-add-friend' value='Add Friend'>";
                           }

                           $mutual_friends = $user_obj->getMutualFriends($row['username']) . " friends in common";

                           //Button forms

                           if (isset($_POST[$row['username']])) {
                               if ($user_obj->isFriend($row['username'])) {
                                   $user_obj->removeFriend($row['username']);
                                   header("Location: http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
                               }
                                elseif ($user_obj->didReceiveRequest($row['username'])) {
                                   header("Location: requests.php");
                               }
                               elseif ($user_obj->didSendRequest($row['username'])) {
                               }
                               else {
                                   $user_obj->sendRequest($row['username']);
                                   header("Location: http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
                               }
                           }
                       }

                       echo "<div class='search_result'>
   											<div class='searchPageFriendButtons'>
   												<form action='' method='POST'>
   													" . $button . "
   													<br>
   												</form>
   											</div>

   										<div class='result_profile_pic'>
   											<a href='" . $row['username'] ."'><img src='". $row['profile_pic'] ."' style='height: 100px;'></a>
   										</div>

   										<a href='" . $row['username'] ."'> " . $row['first_name'] . " " . $row['last_name'] . "
   										<p id='grey'> " . $row['username'] ."</p>
   										</a>
   										<br>
   					        	" . $mutual_friends ."<br>

   										</div>
   										<hr id='search_hr'>";
                   } //End while
               }

           ?>



    </div>





 </div>
