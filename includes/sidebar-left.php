

      <ul class="row intro">
        <li><img class="intro-icon" src="assets/images/icons/intro-btn.png"></li>
        <li><h3>Intro</h3></li>
      </ul>

      <div class="row">

        <div class="col-md-6 col-sm-6 col-xs-6">

          <ul class="data-label">
            <li>Posts:</li>
            <li>Likes:</li>
          </ul>

        </div>

        <div class="col-md-6 col-sm-6 col-xs-6">

          <ul class="data-info">
            <li><?php echo $user['num_posts']; ?></li>
            <li><?php echo $user['num_likes']; ?></li>
          </ul>

        </div>

      </div>

      <div class="row friends">
        <h4>Friends</h4>

        <?php
            //Get username parameter from url
            if(isset($_GET['username'])) {
            $username = $_GET['username'];
            }
            else {
            $username = $userLoggedIn; //If no username set in url, use user logged in instead
            }
         ?>

         <ul>

           <?php
             $user_obj = new User($con, $username);
             $i = 0;
             foreach($user_obj->getFriendsList() as $friend) {
                 $friend_obj = new User($con, $friend);
                 $i++;

                 echo "
                  <div class='col-md-6 col-sm-6 col-xs-6'>
                    <li><a href='$friend'>
                         <img class='profilePicSmall' src='" . $friend_obj->getProfilePic() ."'>"
                         . $friend_obj->getFirstAndLastName() .
                     "</a></li>
                  </div>
                     ";

                  if(++$i > 6) break;

             }
            ?>

         </ul>



       </div>

      <div class="row trends">

        <h4>Popular</h4>

        <?php

           $query = mysqli_query($con, "SELECT * FROM trends ORDER BY hits DESC LIMIT 9");

             foreach ($query as $row) {

               $word = $row['title'];
               $word_dot = strlen($word) >= 14 ? "..." : "";

               $trimmed_word = str_split($word, 14);
               $trimmed_word = $trimmed_word[0];

               echo "<li>";
               echo $trimmed_word . $word_dot;
               echo "</li>";

             }

          ?>
      </div>
