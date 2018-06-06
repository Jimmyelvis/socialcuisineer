<?php
require 'config/config.php';
require 'includes/form_handlers/register_handler.php';
require 'includes/form_handlers/login_handler.php';
?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Welcome To Swirl Feed</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="assets/css/register_styles.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="assets/js/register.js"></script>
</head>
<body>

  <?php

if(isset($_POST['register_button'])) {
  echo '
  <script>

  $(document).ready(function() {
    $("#first").hide();
    $("#second").show();
  });

  </script>

  ';
}


?>


  <div class="wrapper">

      <div class="welcome-text">

        <h1>Welcome to Social Cuisiner</h1>

        <p>Social Cuisiner is the ultimate cooking social community, where recipes come to life. By joining us you will join a robust foodie community and where you will get to share your recipes and food ideas with hundreds of other like-minded members.

        You will also get a chance to win awesome prizes, make new friends and share delicious recipes.</p>

      </div>

  		<div class="login_box">

  			<div class="login_header row">

          <div class="col-md-2 login-logo">
              <img src="assets/images/icons/logo-login-small.png">
          </div>

          <div class="col-md-8">
            <h2>WELCOME TO  </h2>
    				<h1> <span class="gold-italic">Social</span> Cuisiner</h1>
          </div>

  			</div>
  			<br>
  			<div id="first">

  				<form action="register.php" method="POST">
  					<input type="email" name="log_email" placeholder="Email Address" value="<?php
  					if(isset($_SESSION['log_email'])) {
  						echo $_SESSION['log_email'];
  					}
  					?>" required>
  					<br>
  					<input type="password" name="log_password" placeholder="Password">
  					<br>
  					<?php if(in_array("Email or password was incorrect<br>", $error_array)) echo  "Email or password was incorrect<br>"; ?>
  					<input type="submit" name="login_button" value="LOGIN">
  					<br>
  					<a href="#" id="signup" class="signup">Need and account? Register here!</a>

  				</form>

  			</div>

  			<div id="second">

          <?php if(in_array("<span style='color: #14C800;'>You're all set! Go ahead and login!</span><br>", $error_array)) echo "<h3><span class='allset'>You're all set! Go ahead and login!</span><br></h3>"; ?>

  				<form action="register.php" method="POST">
  					<input type="text" name="reg_fname" placeholder="First Name" value="<?php
  					if(isset($_SESSION['reg_fname'])) {
  						echo $_SESSION['reg_fname'];
  					}
  					?>" required>
  					<br>
  					<?php if(in_array("Your first name must be between 2 and 25 characters<br>", $error_array)) echo "Your first name must be between 2 and 25 characters<br>"; ?>




  					<input type="text" name="reg_lname" placeholder="Last Name" value="<?php
  					if(isset($_SESSION['reg_lname'])) {
  						echo $_SESSION['reg_lname'];
  					}
  					?>" required>
  					<br>
  					<?php if(in_array("Your last name must be between 2 and 25 characters<br>", $error_array)) echo "Your last name must be between 2 and 25 characters<br>"; ?>

  					<input type="email" name="reg_email" placeholder="Email" value="<?php
  					if(isset($_SESSION['reg_email'])) {
  						echo $_SESSION['reg_email'];
  					}
  					?>" required>
  					<br>

  					<input type="email" name="reg_email2" placeholder="Confirm Email" value="<?php
  					if(isset($_SESSION['reg_email2'])) {
  						echo $_SESSION['reg_email2'];
  					}
  					?>" required>
  					<br>
  					<?php if(in_array("Email already in use<br>", $error_array)) echo "Email already in use<br>";
  					else if(in_array("Invalid email format<br>", $error_array)) echo "Invalid email format<br>";
  					else if(in_array("Emails don't match<br>", $error_array)) echo "Emails don't match<br>"; ?>


  					<input type="password" name="reg_password" placeholder="Password" required>
  					<br>
  					<input type="password" name="reg_password2" placeholder="Confirm Password" required>
  					<br>
  					<?php if(in_array("Your passwords do not match<br>", $error_array)) echo "Your passwords do not match<br>";
  					else if(in_array("Your password can only contain english characters or numbers<br>", $error_array)) echo "Your password can only contain english characters or numbers<br>";
  					else if(in_array("Your password must be betwen 5 and 30 characters<br>", $error_array)) echo "Your password must be betwen 5 and 30 characters<br>"; ?>


  					<input type="submit" name="register_button" value="Register">
  					<br>


  					<a href="#" id="signin" class="signin">Already have an account? Sign in here!</a>
  				</form>
  			</div>

  		</div>

  	</div>


</body>
</html>
