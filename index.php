<?php

include("includes/header.php");

if (isset($_POST['post'])) {

	$uploadOk = 1;
	$imageName = $_FILES['inpFile']['name'];
	$errorMessage = "";

	if ($imageName != "") {
		$targetDir = "assets/img/posts/";
		$imageName = $targetDir . uniqid() . basename($imageName);
		$imageFileType = pathinfo($imageName, PATHINFO_EXTENSION);

		if ($_FILES['inpFile']['size'] > 10000000) {
			$errorMessage = "Sorry your file is too large";
			$uploadOk = 0;
		}

		if (strtolower($imageFileType) != "jpeg" && strtolower($imageFileType) != "png" && strtolower($imageFileType) != "jpg") {
			$errorMessage = "Sorry, only jpeg, jpg and png files are allowed";
			$uploadOk = 0;
		}

		if ($uploadOk) {
			if (move_uploaded_file($_FILES['inpFile']['tmp_name'], $imageName)) {
				//image uploaded okay
			} else {
				//image did not upload
				$uploadOk = 0;
			}
		}
	}

	if ($uploadOk) {
		$post = new Post($con, $userLoggedIn);
		$post->submitPost($_POST['post_text'], 'none', $imageName, $_POST['post_heading']);
		header("Location: index.php");
	} else {
		echo "<div style='text-align:center;' class='alert alert-danger'>
				$errorMessage
			</div>";
	}
}


?>


<div class="container indexpg">

	<div class="indexBtns">
		<img src="./assets/img/timeline.svg" alt="" id="btnTimeline">
		<img src="./assets/img/add post.svg" alt="" id="btnAddPosts">
		<img src="./assets/img/trends.svg" alt="" id="btnTrends">
	</div>

	<div class="tabIndex tabTimeline show">
		<div class="posts_area"></div>

	</div>

	<div class="tabIndex tabAddPosts">

		<form action="index.php" method="POST" enctype="multipart/form-data">

			<div class="inputBox imgPreview" id="imgPreview">
				<img src="" class="img-preview-image">
				<span class="imgPreview-DefaultTxt">
					Upload A Image For Your Post.
				</span>

			</div>

			<div class="file-upload-flexed">
				<input type="file" name="inpFile" id="inpFile" class="inpFile">
				<button class="file-upload-button btn btn-puprle" type="button">Choose File</button>
				<span class="file-upload-label"></span>
			</div>


			<input type="text" placeholder="Headline" name="post_heading" class="inputBox inputHeadline">
			<textarea name="post_text" class="inputBox textArea" rows="10" cols="50" id="summernote" placeholder="Post Something..."></textarea>

			<input class="btn btn-puprle btn-modalSubmit" type="submit" name="post" id="post_button" value="Post">


			<!-- <button class="btn btn-puprle btn-modalSubmit">
				Submit
			</button> -->

		</form>

	</div>

	<div class="tabIndex tabTrends">

		<div class="secheading indexHeading">

			<h2 class="heading-2">
				Popular Posts
			</h2>

			<p>
				Top trending posts based on the most likes
				a post has received. Are yours among them?
			</p>
		</div>

		<div class="highLights"></div>
	</div>


</div>
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>

<script>
	$(function() {

		const highLights = document.querySelector('.highLights');

		var inProgress = false;


		LoadhighLights();
		loadPosts();


		function LoadhighLights() {

			if (inProgress) { //If it is already in the process of loading some posts, just return
				return;
			}

			inProgress = true;
			$('#loading').show();

			$.ajax({
				url: "includes/handlers/ajax_load_highlight_posts.php",
				type: "POST",
				data: "&userLoggedIn=" + userLoggedIn,
				cache: false,

				success: function(response) {
					$(".highLights").html(response);
					inProgress = false;
					loadPosts();

				}
			})


		}


		$(window).scroll(function() {
			var bottomElement = $(".recipe-card").last();
			var noMorePosts = $('.posts_area').find('.noMorePosts').val();

			// isElementInViewport uses getBoundingClientRect(), which requires the HTML DOM object, not the jQuery object. The jQuery equivalent is using [0] as shown below.
			if (isElementInView(bottomElement[0]) && noMorePosts == 'false') {
				loadPosts();
			}

		})

		function loadPosts() {


			if (inProgress) { //If it is already in the process of loading some posts, just return
				return;
			}

			inProgress = true;
			$('#loading').show();

			var page = $('.posts_area').find('.nextPage').val() || 1; //If .nextPage couldn't be found, it must not be on the page yet (it must be the first time loading posts), so use the value '1'

			$.ajax({
				url: "includes/handlers/ajax_load_posts.php",
				type: "POST",
				data: "page=" + page + "&userLoggedIn=" + userLoggedIn,
				cache: false,

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
		function isElementInView(el) {
			if (el == null) {
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

		$('#summernote').summernote({
			height: 400,
			placeholder: 'write here...'
		});

	})
</script>

<?php

include("includes/footer.php");

?>