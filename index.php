<?php

// Start output buffering to catch any unwanted HTML
ob_start();

include("includes/header.php");

if (isset($_POST['post'])) {
	// Clear any output that might have been generated
	ob_clean();

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
		
		// Check if this is an AJAX request
		if ((!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
		    strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') || 
		    isset($_POST['ajax_request'])) {
		    // Return JSON response for AJAX
		    header('Content-Type: application/json');
		    echo json_encode(['success' => true]);
		    exit;
		} else {
		    // Traditional redirect for non-AJAX
		    // header("Location: index.php");
		}
	} else {
		// Check if this is an AJAX request
		if ((!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
		    strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') || 
		    isset($_POST['ajax_request'])) {
		    // Return JSON response for AJAX
		    header('Content-Type: application/json');
		    echo json_encode(['success' => false, 'error' => $errorMessage]);
		    exit;
		} else {
		    // Traditional HTML response for non-AJAX
		    echo "<div style='text-align:center;' class='alert alert-danger'>
				$errorMessage
			</div>";
		}
	}
}

// If we reach here, it's a normal page request, so output the buffered content
ob_end_flush();

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

		<form action="" method="POST" enctype="multipart/form-data">

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


			<input 
				type="text" 
				placeholder="Headline" 
				name="post_heading" 
				class="inputBox inputHeadline"
			>
			<textarea name="post_text" class="inputBox textArea" rows="10" cols="50" id="summernote" placeholder="Post Something..."></textarea>


			<div class="btn-group">
				<input type="reset" value="Reset" class="btn btn-orange btn-modalSubmit" id="reset_button">
				<input class="btn btn-puprle btn-modalSubmit" type="submit" name="post" id="post_button" value="Post">
			</div>

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


<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js" ></script>
<script src="./assets/js/dist/home.js"></script>


<?php

include("includes/footer.php");

?>