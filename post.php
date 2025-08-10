<?php

include("includes/header.php");

if (isset($_GET['id'])) {
  $id = $_GET['id'];
} else {
  $id = 0;
}

// Get initial post data
$post = new Post($con, $userLoggedIn);
$postData = $post->getSinglePost($id);

// Check if post exists and is valid
$postExists = ($postData['status'] === 'success');
?>

<!-- Add loading placeholders CSS -->
<link rel="stylesheet" href="assets/css/loading-placeholders.css">

<div class="container">
  <?php if ($postExists): ?>
    <!-- Post detail structure -->
    <div class="detail" data-post-id="<?php echo $id; ?>">
      <!-- Post heading section -->
      <div class="postHeading" id="postHeading">
        <div class="loading-avatar loading-placeholder"></div>
        <div class="loading-heading loading-placeholder"></div>
        <div class="loading-subheading loading-placeholder"></div>
      </div>
      
      <!-- Post body section -->
      <div class="post_body" id="postBody">
        <div class="loading-paragraph loading-placeholder full"></div>
        <div class="loading-paragraph loading-placeholder full"></div>
        <div class="loading-paragraph loading-placeholder medium"></div>
      </div>
      
      <!-- Liked by section -->
      <div class="likedby" id="likedBy">
        <div class="loading-likes">
          <div class="loading-like-icon loading-placeholder"></div>
          <div class="loading-like-text loading-placeholder"></div>
        </div>
      </div>
      
      <!-- Comments section -->
      <div class="comments" id="comments">
        <div class="heading">
          <h3 class="heading-3">
            <span class="commentNumber">0</span>
            Comments
          </h3>
        </div>
        <textarea
          class="inputBox textArea"
          placeholder="Write a comment..."  
          id="comment<?php echo $id; ?>"
        ></textarea>
        <div id="commentBtnContainer">
          <div class="loading-button loading-placeholder"></div>
        </div>
        <div class="commentResponse"></div>
        
        <!-- Comments list -->
        <div id="commentsList">
          <!-- Comment placeholder 1 -->
          <div class="loading-comment">
            <div class="loading-comment-avatar loading-placeholder"></div>
            <div class="loading-comment-content">
              <div class="loading-comment-name loading-placeholder"></div>
              <div class="loading-comment-text loading-placeholder"></div>
              <div class="loading-comment-text loading-placeholder short"></div>
            </div>
          </div>
          
          <!-- Comment placeholder 2 -->
          <div class="loading-comment">
            <div class="loading-comment-avatar loading-placeholder"></div>
            <div class="loading-comment-content">
              <div class="loading-comment-name loading-placeholder"></div>
              <div class="loading-comment-text loading-placeholder"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <?php else: ?>
    <div class="error-message">
      <h2>Post not found</h2>
      <p>The post you're looking for doesn't exist or has been removed.</p>
      <a href="index.php" class="btn btn-puprle">Back to Home</a>
    </div>
  <?php endif; ?>
</div>

<!-- Embed initial data for JavaScript -->
<?php if ($postExists): ?>
<script>
  // Embed initial post data to avoid additional requests
  const initialPostData = <?php echo json_encode($postData['data']); ?>;
  const userLoggedIn = "<?php echo $userLoggedIn; ?>";
  const post_id = "<?php echo $id; ?>";

  document.addEventListener("DOMContentLoaded", function() {
    // Handler when the DOM is fully loaded
    moreLikesContentScroller = new SimpleBar(document.getElementById('moreLikesContent'), {
      autoHide: false,
      forceVisible: true
    })
  });
</script>
<?php endif; ?>

<script src="./assets/js/dist/postdetail.js" defer></script>

<?php
include("includes/footer.php");

?>