import { parallax } from "../modules/Parallax";

class PostDetail {
  constructor() {
    this.events();
    this.post_detail = document.querySelector(".detail");
  }

  events() {
    this.getAllLikes();
    this.sendComment();
    this.editComment();
  }

  getAllLikes() {
    /**
     *  Gets all the likes for a given post which is then
     * displayed in a pop-up model
     */
    const likedBy = document.querySelector(".likedby");
    const likeByNumberBtn = document.querySelector(".likeByNumber");
    const moreLikesOverlay = document.querySelector(".moreLikesOverlay");
    const closeLikesModal = document.querySelector(".closeModal");
    const likesModalOverlay = document.querySelector(".likesModalOverlay");
    const moreLikesContent = document.querySelector(".moreLikesContent");
    const likes = document.querySelector(".likes");

    likedBy.addEventListener("click", function (e) {
      if (e.target.classList.contains("likeByNumber")) {
        axios({
          method: "get",
          url: "includes/handlers/ajax_get_all_likes.php",
          params: {
            post_id: post_id,
            userLoggedIn: userLoggedIn,
          },
        })
          .then((res) => showOutput(res.data))
          .catch((err) => console.error(err));

        moreLikesOverlay.classList.add("active");
        // body.style.overflow="hidden";

        window.setTimeout(() => {
          likesModalOverlay.style.opacity = 0.8;
        }, 300);

        window.setTimeout(() => {
          moreLikesContent.style.opacity = 1;
        }, 1200);
      }
    });

    function showOutput(res) {
      likes.innerHTML = res;
    }

    if (closeLikesModal) {
      closeLikesModal.addEventListener("click", function () {
        moreLikesContent.style.opacity = null;

        window.setTimeout(() => {
          likesModalOverlay.style.opacity = null;
        }, 800);

        window.setTimeout(() => {
          moreLikesOverlay.classList.remove("active");
        }, 1200);

        // body.style.overflow=null;
      });
    }

    if (moreLikesOverlay) {
      likesModalOverlay.addEventListener("click", function () {
        moreLikesContent.style.opacity = null;

        window.setTimeout(() => {
          likesModalOverlay.style.opacity = null;
        }, 800);

        window.setTimeout(() => {
          moreLikesOverlay.classList.remove("active");
        }, 1200);

        // body.style.overflow=null;
      });
    }
  }

  updateLike() {
    const likeHolder = document.querySelector(".likedForm");
    const likedBy = document.querySelector(".likedby");
    var bodyFormData = new FormData();

    /**
     * For whatever reason the ajax call is preventing this function from
     * being called mulltiple times. For now the best solution is probably just
     * stick with the previuos onClick/Jquery aproach for now
     */

    // likeHolder.addEventListener("click", function (e) {

    //   if (e.target.classList.contains("btnlike")) {
    //     let getNameVaribles = e.target.attributes["name"].value;
    //     let getNameVariblesArray = getNameVaribles.split("-");

    //     let post_id = getNameVariblesArray[1];
    //     let likevalue = getNameVariblesArray[2];

    //     bodyFormData.append("post_id", post_id);
    //     bodyFormData.append("like_value", likevalue);
    //     bodyFormData.append("userLoggedIn", userLoggedIn);

    //     // axios({
    //     //   method: "post",
    //     //   url: "includes/handlers/ajax_update_likes.php",
    //     //   headers: {
    //     //     "Content-Type": "multipart/form-data",
    //     //   },
    //     //   data: bodyFormData,
    //     // })
    //     //   .then((res) => {
    //     //     likedBy.innerHTML = res.data;
    //     //     // console.log(res.data);
    //     //   })
    //     //   .catch((err) => console.error(err));
    //   }

    //    if (e.target.classList.contains("btnUnlike")) {

    //       let getNameVaribles = e.target.attributes["name"].value;
    //       let getNameVariblesArray = getNameVaribles.split("-");

    //       let post_id = getNameVariblesArray[1];
    //       let likevalue = getNameVariblesArray[2];

    //       bodyFormData.append("post_id", post_id);
    //       bodyFormData.append("like_value", likevalue);
    //       bodyFormData.append("userLoggedIn", userLoggedIn);

    //       // axios({
    //       //   method: "post",
    //       //   url: "includes/handlers/ajax_update_likes.php",
    //       //   headers: {
    //       //     "Content-Type": "multipart/form-data",
    //       //   },
    //       //   data: bodyFormData,
    //       // })
    //       //   .then((res) => {
    //       //     likedBy.innerHTML = res.data;
    //       //     // console.log(res.data);

    //       //   })
    //       //   .catch((err) => console.error(err));
    //     }
    // });
  }

  sendComment() {
    const commentBtn = document.getElementById("commentBtn");
    const commentResponse = document.querySelector(".commentResponse");

    commentBtn.addEventListener("click", function (e) {
      const id = e.target.name;
      const commentText = document.getElementById(
        "comment" + e.target.name
      ).value;

      if (commentText === "") {
        alert("Please enter some text first");
        return;
      }

      const sendComment = $.post(
        "includes/handlers/send_comment.php",
        { userLoggedIn: userLoggedIn, commentText: commentText, id: id },
        function (response) {
          if (response !== "No text") {
            const loadComment = $.post(
              "includes/handlers/load_comment.php",
              { id: id, userLoggedIn: userLoggedIn },
              function (newComment) {
                $("#comment" + id).val("");
                // const noComment = $("#toggleComment" + id).find(
                //   "#noComment" + id
                // );

                if (document.getElementById("noComment" + id)) {
                  const noComment = document.getElementById("noComment" + id);

                  if (noComment.length !== 0) {
                    noComment.remove();
                  }
                }

                let commentsCountTxt = document.querySelector(".commentNumber");
                let commentsCount = parseInt(commentsCountTxt.textContent, 10);

                commentsCount++;
                commentsCount.toString();
                commentsCountTxt.textContent = commentsCount;

                commentResponse.innerHTML = "Comment Successfully Added";
                commentResponse.style.display = "block";

                setTimeout(() => {
                  commentResponse.style.opacity = 1;
                  commentResponse.style.visibility = "visible";
                }, 800);

                setTimeout(() => {
                  commentResponse.style.opacity = 0;
                  commentResponse.style.visibility = "hidden";
                }, 5000);

                setTimeout(() => {
                  commentResponse.style.display = "none";
                }, 6000);

                $(".comments").append(newComment);
              }
            );
          } else {
            alert("Something went wrong. Please try again");
          }
        }
      );
    });
  }

  editComment() {
    const comments = document.querySelector(".comments");
    const commentbody = document.querySelectorAll(".commentbody");
    const editstatebtns = document.querySelectorAll(".editstatebtns");
    const editCommentbtn = document.querySelectorAll(".editCommentbtn");

    /**
     * Use event delegation to add a click event listner
     * to a comment
     */
    comments.addEventListener("click", function (e) {
      // console.log('yeah man');

      // if (!e.target.matches(".editCommentbtn")) return;

      if (e.target.matches(".editCommentbtn")) {
        /**
         * Use the data attribute that is set on each comment entry
         * to get some of the data that is neccessary to edit the
         * comment such as the comment ID, and the user that the
         * comment is being posted to, which in the case is the author
         * of this post.
         */
        let commentData = e.target.parentElement.parentElement
          .getAttribute("data-req")
          .split(",");

        let commentId = commentData[0];
        let commentToUser = commentData[1];

        /**
         * We need to get the correct comment to apply the
         * edit state styling on. We do that by first getting the parentElement
         * then getting the previous sibling
         */
        let selectedCommentBody = e.target.parentElement.previousElementSibling;

        /**
         * Get the buttons to apply the necessary styling on
         */
        let currentBtn = e.target;
        let deleteCommentbtn = e.target.nextElementSibling;
        let saveCommentbtn = e.target.nextElementSibling.nextElementSibling;
        let cancelCommentbtn =
          e.target.nextElementSibling.nextElementSibling.nextElementSibling;

        selectedCommentBody.classList.add("editState");
        selectedCommentBody.contentEditable = true;
        currentBtn.style.display = "none";
        deleteCommentbtn.style.display = "none";
        saveCommentbtn.style.display = "block";
        cancelCommentbtn.style.display = "block";

        setTimeout(() => {
          saveCommentbtn.style.opacity = 1;
          cancelCommentbtn.style.opacity = 1;
          saveCommentbtn.style.visibility = "visible";
          cancelCommentbtn.style.visibility = "visible";
        }, 600);
      } else if (e.target.matches(".saveCommentbtn")) {
        let bodyFormData = new FormData();

        /**
         * Use the data attribute that is set on each comment entry
         * to get some of the data that is neccessary to edit the
         * comment such as the comment ID, and the user that the
         * comment is being posted to, which in the case is the author
         * of this post.
         */
        let commentData = e.target.parentElement.parentElement
          .getAttribute("data-req")
          .split(",");

        /**
         * We need to get the correct comment to apply the
         * edit state styling on. We do that by first getting the parentElement
         * then getting the previous sibling
         */
        let selectedCommentBody = e.target.parentElement.previousElementSibling;
        let responseText =
          e.target.parentElement.previousElementSibling.previousElementSibling
            .lastElementChild;

        let commentId = commentData[0];
        let commentToUser = commentData[1];
        let commentBody = selectedCommentBody.innerHTML;

        bodyFormData.append("comment_id", commentId);
        bodyFormData.append("commentToUser", commentToUser);
        bodyFormData.append("comment_Body", commentBody);
        bodyFormData.append("userLoggedIn", userLoggedIn);
        bodyFormData.append("post_id", post_id);
        bodyFormData.append("edit_comment", "edit_comment");

        axios({
          method: "post",
          url: "includes/form_handlers/edit_comment_handler.php",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: bodyFormData,
        })
          .then((res) => showresponse(res.data))
          .catch((err) => console.error(err));

        /**
         * Get the buttons to apply the necessary styling on
         */
        let currentBtn = e.target;
        let editCommentbtn =
          e.target.previousElementSibling.previousElementSibling;
        let deleteCommentbtn = e.target.previousElementSibling;
        let cancelCommentbtn = e.target.nextElementSibling;

        currentBtn.style.opacity = 0;
        cancelCommentbtn.style.opacity = 0;
        currentBtn.style.visibility = "hidden";
        cancelCommentbtn.style.visibility = "hidden";

        setTimeout(() => {
          selectedCommentBody.classList.remove("editState");
          currentBtn.style.display = "none";
          cancelCommentbtn.style.display = "none";
          editCommentbtn.style.display = "block";
          deleteCommentbtn.style.display = "block";
        }, 600);

        function showresponse(res) {
          responseText.innerHTML = res;
          responseText.style.display = "block";

          setTimeout(() => {
            responseText.style.opacity = 1;
            responseText.style.visibility = "visible";
          }, 800);

          setTimeout(() => {
            responseText.style.opacity = 0;
            responseText.style.visibility = "hidden";
          }, 5000);

          setTimeout(() => {
            responseText.style.display = "none";
          }, 6000);
        }
      } else if (e.target.matches(".cancelCommentbtn")) {
        /**
         * We need to get the correct comment to apply the
         * edit state styling on. We do that by first getting the parentElement
         * then getting the previous sibling
         */
        let selectedCommentBody = e.target.parentElement.previousElementSibling;

        let currentBtn = e.target;
        let editCommentbtn =
          e.target.previousElementSibling.previousElementSibling
            .previousElementSibling;
        let deleteCommentbtn =
          e.target.previousElementSibling.previousElementSibling;
        let saveCommentbtn = e.target.previousElementSibling;

        currentBtn.style.opacity = 0;
        saveCommentbtn.style.opacity = 0;
        currentBtn.style.visibility = "hidden";
        saveCommentbtn.style.visibility = "hidden";

        setTimeout(() => {
          selectedCommentBody.classList.remove("editState");
          currentBtn.style.display = "none";
          saveCommentbtn.style.display = "none";
          editCommentbtn.style.display = "block";
          deleteCommentbtn.style.display = "block";
        }, 600);
      } else if (e.target.matches(".deleteCommentbtn")) {
        let bodyFormData = new FormData();

        /**
         * Use the data attribute that is set on each comment entry
         * to get some of the data that is neccessary to edit the
         * comment such as the comment ID, and the user that the
         * comment is being posted to, which in the case is the author
         * of this post.
         */
        let commentData = e.target.parentElement.parentElement
          .getAttribute("data-req")
          .split(",");

        let commentId = commentData[0];
        bodyFormData.append("comment_id", commentId);
        bodyFormData.append("userLoggedIn", userLoggedIn);
        bodyFormData.append("post_id", post_id);
        bodyFormData.append("delete_comment", "delete_comment");

        // let commentEntries = document.querySelectorAll(".commentEntry");
        // let commentsParent = document.querySelector(".comments")

        let currentCommentEntry = e.target.parentElement.parentElement;

        axios({
          method: "post",
          url: "includes/form_handlers/delete_comment.php",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: bodyFormData,
        })
          .then((res) => {
            let commentsCountTxt = document.querySelector(".commentNumber");
            let commentsCount = parseInt(commentsCountTxt.textContent, 10);
            commentsCount--;
            commentsCount.toString();
            commentsCountTxt.textContent = commentsCount;
            currentCommentEntry.style.opacity = 0;
            setTimeout(() => {
              currentCommentEntry.remove();
            }, 700);
          })
          .catch((err) => console.error(err));
      } else {
        return false;
      }
    });
  }
}

export const postdetail = new PostDetail();
