<?php

include("includes/header.php");
if (isset($_GET['q'])) {
  $query = $_GET['q'];
} else {
  $query = "";
}



?>

<div class="container resultsContainer">

  <?php

  $header = "";


  if ($query == "") {

    $header = "
        <div class='resultsHeading'>
            <h3 class='heading-3'>
                You must enter something in the search box.
            </h3>
        </div>";

    echo $header;
  } else {

    $postsReturnedQuery = mysqli_query($con, "SELECT posts.id, posts.heading, posts.added_by, posts.image, posts.likes, posts.date_added, users.username, users.first_name, users.last_name, users.profile_pic FROM posts, users WHERE posts.added_by = users.username AND posts.heading LIKE '%$query%'");

    //Check if results were found

    if (mysqli_num_rows($postsReturnedQuery) == 0) {
      $header = "
                <div class='resultsHeading'>
                    <h3 class='heading-3'>
                        We can't find any recipies similar:  $query
                    </h3>
                </div>";
      echo $header;
    } else {
      $number = mysqli_num_rows($postsReturnedQuery);

      $header = "
                <div class='resultsHeading'>
                    <h3 class='heading-3 resultsFound'>
                        $number Results Found
                    </h3>
                </div>";

      echo $header;
    }


  ?>


    <div class="queryResultsPosts">

      <?php while ($row = mysqli_fetch_array($postsReturnedQuery)) { ?>

        <?php
        $id = $row['id'];
        $link = "post.php?id=" . $id;

        $comments_check = mysqli_query($con, "SELECT * FROM comments WHERE post_id='$id'");
        $comments_check_num = mysqli_num_rows($comments_check);

        $date_time = $row['date_added'];

        // Get Time Stamp Fromm GetDate Class
        $time_message = new GetDate($date_time);
        $time_message->getTheDate($date_time);
        $time_message = $time_message->time_message;

        ?>

        <div class="card recipe-card">

          <div class='card-userImage'>
            <img src="<?php echo $row['profile_pic'] ?>" alt="">
          </div>

          <div class="card-info">

            <div class="card-desc">
              <div class='block'></div>

              <div class="card-headings">

                <h2 class='heading-2'>
                  <a href="<?php echo $link ?>">
                    <?php echo $row['heading']  ?>
                  </a>
                </h2>

                <h3 class='heading-3'>
                  <?php echo $row['first_name'] . " " .  $row['last_name']  ?>
                </h3>

                <h4 class='heading-4'>
                  <?php echo $time_message ?>
                </h4>

              </div>
            </div>

            <div class='card-stats'>

              <div class='likes'>
                <h4 class='heading-4'>
                  <?php echo $row['likes'] ?>
                </h4>
                <img src='./assets/img/like-v2.svg' alt=''>
              </div>

              <div class='comments'>
                <h4 class='heading-4'>
                  <?php echo $comments_check_num  ?>
                </h4>
                <img src='./assets/img/comments-v2.svg' alt=''>
              </div>

            </div>

          </div>
          <div class='overlay'></div>

          <img src='<?php echo $row['image'] ?>' class='card-bg'>

        </div>

    <?php }
    }

    ?>

    </div>




</div>

<?php

include("includes/footer.php");

?>