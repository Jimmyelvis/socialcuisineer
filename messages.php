<?php
include("includes/header.php");

  $message_obj = new Message($con, $userLoggedIn);

  if(isset($_GET['u']))
  	$user_to = $_GET['u'];
  else{
      $user_to = $message_obj->getMostRecentUser();
    if($user_to == false)
      $user_to = 'new';
  }

  if($user_to != "new")
  	$user_to_obj = new User($con, $user_to);


    if(isset($_POST['post_message'])) {

    	if(isset($_POST['message_body'])) {
    		$body = mysqli_real_escape_string($con, $_POST['message_body']);
    		$date = date("Y-m-d H:i:s");
    		$message_obj->sendMessage($user_to, $body, $date);
    	}

  }




 ?>




<div class="container">

  <div class="user_details">

      <?php
      include("includes/user-header.php");
      ?>

  </div>

  <div class="row">


       <div class="conversations col-md-3 col-sm-12 col-xs-12 column" id="conversations">
           <h4>Conversations</h4>

           <div class="loaded_conversations">
             <?php echo $message_obj->getConvos(); ?>
           </div>
           <br>
           <a class="btn-primary btn-new-message" href="messages.php?u=new">New Message</a>

      </div>


      <div class="messages_column col-md-8 col-md-offset-1 column col-sm-12 col-xs-12">

          <?php
            if($user_to != "new"){
              echo "<h4>You and <a href='$user_to'>" . $user_to_obj->getFirstAndLastName() . "</a></h4><hr><br>";
              echo "<div class='loaded_messages' id='scroll_messages'>";
                echo $message_obj->getMessages($user_to);
              echo "</div>";
            }
            else {
               echo "<h4>New Message</h4>";
            }
           ?>

            <div class="message_post">

               <form action="" method="POST">
                 <?php
               if($user_to == "new") {
                 echo "<h5>Select the friend you would like to message</h5> <br><br>";
                 ?>
                 To: <input type='text' onkeyup='getUsers(this.value, "<?php echo $userLoggedIn; ?>")' name='q' placeholder='Name' autocomplete='off' id='seach_text_input'>

                 <?php
                 echo "<div class='results'></div>";
               }
               else {
                 echo "<textarea name='message_body' id='message_textarea' placeholder='Write your message ...'></textarea>";
                 echo "<input type='submit' name='post_message' class='btn-primary btn-message-submit' id='message_submit' value='Send'>";
               }

               ?>

               </form>

             </div>

             <script>
                var div = document.getElementById("scroll_messages");
                if(div != null) {
                    div.scrollTop = div.scrollHeight;
                }
             </script>

      </div>

  </div>


  <!-- //below here -->

</div>
