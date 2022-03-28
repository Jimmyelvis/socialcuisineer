function updateLike(post_id, value) {
  const sendLike = $.post(
    "includes/handlers/ajax_update_likes.php",
    {
      userLoggedIn: userLoggedIn,
      post_id: post_id,
      like_value: value,
    },
    function (response) {
      $(".likedby").html(response);
    }
  );
}
