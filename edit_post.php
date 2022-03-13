<?php
include("includes/header.php");

if (isset($_GET['id'])) {

  $post_id = $_GET['id'];
}

// $post_id = 174;

$get_post = mysqli_query($con, "SELECT * FROM posts WHERE deleted='no' AND id='$post_id'");


$row = mysqli_fetch_array($get_post);
$id = $row['id'];
$body = $row['body'];
$heading = $row['heading'];
$added_by = $row['added_by'];
$date_time = $row['date_added'];
$imagePath = $row['image'];


echo $imagePath;

?>



<div class="container">

  <div class="editpostContain">

    <h2 class="heading-2">Edit Post</h2>



    <form action="settings.php" method="POST">

      <div class="inputBox imgPreview" id="imgPreview">

        <!-- <img class='img-preview-image' src="<?php echo $imagePath ?>" alt=""> -->

        <?php
        echo "<img class='img-preview-image' src='$imagePath'>";
        ?>


        <span class="imgPreview-DefaultTxt">
          Upload A Image For Your Profile Header.
        </span>

      </div>

      <div class="file-upload-flexed">
        <input type="file" name="inpFile" id="inpFile" class="inpFile">
        <button class="file-upload-button btn btn-puprle" type="button">Choose File</button>
        <span class="file-upload-label">
        </span>
      </div>

      <h3 class="heading-3 uploadRes"></h3>


      <div class="inputItems">

        <h2 class="heading-2 response"></h2>

        <input type="text" placeholder="Headline" class="inputBox inputHeadline" name="headline" value="<?php echo $heading; ?>" id="editpost_Headline">

        <textarea name="post_text" class="inputBox textArea" rows="10" cols="50" id="summernote">
          <?php echo $body ?>
        </textarea>


      </div>

      <div class="btn-group">

        <a href="post.php?id=<?php echo $id ?>" class="btn btn-teal btn-backtopost">
          Back to post
        </a>

        <input type="submit" name="update_post" id="updatePost" value="Update Post" class="btn btn-puprle btn-editpost">

      </div>




    </form>



  </div>

</div>

<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>

<script>
  var post_id = '<?php echo $id; ?>';
  var imagePath = ' <?php echo $imagePath; ?>'
</script>

<script src="./assets/js/dist/editpost.js"></script>