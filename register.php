<?php
require 'config/config.php';
// require 'includes/form_handlers/login_handler.php';
?>


<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Welcome To Social Cuisiner</title>
	<link rel="stylesheet" type="text/css" href="assets/css/style.css">
</head>

<body>



	<div class="wrapper">

		<div class="loginBox">


			<div class="form-container sign-in-container">

				<h3 class="heading-3 signInresponse"></h3>

				<h2 class="heading-2">Sign In</h2>

				<form action="register.php" method="POST">

					<div class="inputField">
						<img src="./assets/img/Icon material-email.svg" alt="" class="inputIcon">
						<input type="email" name="log_email" placeholder="Email Address" id="logEmail" value="" required>
					</div>

					<div class="inputField">
						<img src="./assets/img/Icon awesome-key.svg" alt="" class="inputIcon">
						<input type="password" name="log_password" placeholder="Password" id="logPass" autocomplete="new-password">

					</div>

					<button type="submit" id="signInSubmit" name="login_button" class="btn btn-puprle btn-login">
						Sign In
					</button>

				</form>

			</div>

			<div class="form-container sign-up-container">

				<h2 class="heading-2">Sign Up</h2>




				<form action="register.php" method="POST">

					<div class="inputField">

						<img src="./assets/img/Icon ionic-md-person.svg" class="inputIcon" />
						<input type="text" id="regFname" name="reg_fname" placeholder="First Name" value="" required>
					</div>


					<div class="inputField">

						<img src="./assets/img/Icon ionic-md-person.svg" class="inputIcon" />

						<input type="text" id="regLname" name="reg_lname" placeholder="Last Name" value="" required>
					</div>

					<div class="inputField">

						<img src="./assets/img/Icon material-email.svg" alt="" class="inputIcon">

						<input type="email" id="regEmail" name="reg_email" placeholder="Email" value="" required>

					</div>

					<div class="inputField">

						<img src="./assets/img/Icon material-email.svg" alt="" class="inputIcon">


						<input type="email" id="regEmail2" name="reg_email2" placeholder="Confirm Email" value="" required>
					</div>


					<div class="inputField">

						<img src="./assets/img/Icon awesome-key.svg" alt="" class="inputIcon">
						<input type="password" id="regPassword" name="reg_password" placeholder="Password" required>

					</div>

					<div class="inputField">

						<img src="./assets/img/Icon awesome-key.svg" alt="" class="inputIcon">

						<input type="password" id="regPassword2" name="reg_password2" placeholder="Confirm Password" required>
					</div>

					<button type="submit" id="signUpSubmit" name="register_button" class="btn btn-puprle btn-login">
						Sign Up
					</button>

				</form>
			</div>

			<div class="overlay-container">
				<div class="overlay">

					<div class="overlay-panel overlay-left">
						<h2 class="heading-2">Welcome Back!</h2>
						<p>To keep connected with us please login with your personal info</p>
						<button class="btn btn-ghost" id="signIn">Sign In</button>

						<div class="errors signupErrorsSide">
							<img src="./assets/img/close-btn-3.svg" alt="" class="closeSignupErrors">
							<ul class="signupErrors"></ul>
						</div>
					</div>

					<div class="overlay-panel overlay-right">
						<h2 class="heading-2">Welcome to The Social Cuisiner </h2>
						<p>The Social Cuisiner is the ultimate cooking social community where recipes come to life. By joining us you will join a robust foodie community and where you will get to share your recipes and food ideas with hundreds of other like-minded members.</p>
						<button class="btn btn-ghost" id="signUp">Sign Up</button>

						<div class="errors signinErrorsSide">
							<img src="./assets/img/close-btn-3.svg" alt="" class="closeSigninErrors">
							<ul class="signinErrors"></ul>
						</div>
					</div>

				</div>
			</div>

			<div class="form-container-mobile">
				<div class="welcome" id="welcomeFormMobile">

					<img src="./assets/img/logo-2021-version.svg" alt="" class="logo">

					<h2 class="heading-2">Welcome to The Social Cuisiner </h2>
					<p>The Social Cuisiner is the ultimate cooking social community where recipes come to life. By joining us you will join a robust foodie community and where you will get to share your recipes and food ideas with hundreds of other like-minded members.</p>
					<button class="btn btn-ghost" id="signUpMobile">Sign Up</button>
					<button class="btn btn-ghost" id="signInMobile">Sign In</button>

				</div>

				<div class="signup" id="signupformMobile">
					<h2 class="heading-2">Sign Up</h2>

					<form action="register.php" method="POST">

						<div class="inputField">

							<img src="./assets/img/Icon ionic-md-person.svg" class="inputIcon" />
							<input type="text" id="regFnameMobile" name="reg_fname" placeholder="First Name" value="" required>
						</div>

						<span class="error f_name"></span>

						<div class="inputField">

							<img src="./assets/img/Icon ionic-md-person.svg" class="inputIcon" />

							<input type="text" id="regLnameMobile" name="reg_lname" placeholder="Last Name" value="" required>
						</div>

						<span class="error l_name"></span>

						<div class="inputField">

							<img src="./assets/img/Icon material-email.svg" alt="" class="inputIcon">

							<input type="email" id="regEmailMobile" name="reg_email" placeholder="Email" value="" required>
						</div>

						<span class="error email_orig"></span>

						<div class="inputField">

							<img src="./assets/img/Icon material-email.svg" alt="" class="inputIcon">


							<input type="email" id="regEmail2Mobile" name="reg_email2" placeholder="Confirm Email" value="" required>

						</div>

						<span class="error email_con"></span>

						<div class="inputField">

							<img src="./assets/img/Icon awesome-key.svg" alt="" class="inputIcon">
							<input type="password" id="regPasswordMobile" name="reg_password" placeholder="Password" required>

						</div>

						<span class="error pass_orig"></span>

						<div class="inputField">

							<img src="./assets/img/Icon awesome-key.svg" alt="" class="inputIcon">

							<input type="password" id="regPassword2Mobile" name="reg_password2" placeholder="Confirm Password" required>

						</div>

						<span class="error pass_con"></span>


						<div class="btn-group">

							<button type="submit" id="signUpSubmitMobile" name="register_button" class="btn btn-puprle btn-login">
								Sign Up
							</button>

							<button id="signUpCancel" class="btn btn-cancel">
								Cancel
							</button>

						</div>


					</form>

				</div>

				<div class="signin" id="signinformMobile">

					<h3 class="heading-3 signInresponseMobile"></h3>

					<h2 class="heading-2">Sign In</h2>

					<form action="register.php" method="POST">

						<div class="inputField">
							<img src="./assets/img/Icon material-email.svg" alt="" class="inputIcon">
							<input type="email" name="log_email" placeholder="Email Address" id="logEmailMobile" value="" required>
						</div>


						<div class="inputField">
							<img src="./assets/img/Icon awesome-key.svg" alt="" class="inputIcon">
							<input type="password" name="log_password" placeholder="Password" id="logPassMobile" autocomplete="new-password">

						</div>


						<div class="btn-group">

							<button type="submit" id="signInSubmitMobile" name="login_button" class="btn btn-puprle btn-login">
								Sign In
							</button>

							<button id="signInCancel" class="btn btn-cancel">
								Cancel
							</button>
						</div>


					</form>

				</div>
			</div>

		</div>

	</div>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js"></script>

	<script src="./assets/js/scripts.js"></script>
	<script src="./assets/js/dist/login.js"></script>


</body>

</html>