<?php

include("includes/header.php");


if (isset($_GET['id'])) {
  $id = $_GET['id'];
} else {
  $id = 0;
}

?>

<div class="container">




  <?php
  $post = new Post($con, $userLoggedIn);
  $post->getSinglePost($id);
  ?>


</div>

<script>
  var userLoggedIn = '<?php echo $userLoggedIn; ?>';
  var post_id = '<?php echo $id ?>';

  document.addEventListener("DOMContentLoaded", function() {
    // Handler when the DOM is fully loaded
    moreLikesContentScroller = new SimpleBar(document.getElementById('moreLikesContent'), {
      autoHide: false,
      forceVisible: true
    })
  });

</script>

<?php

include("includes/footer.php");

?>