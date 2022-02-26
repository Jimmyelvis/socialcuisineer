export default class PostDetail {
  constructor() {
    this.events();
    this.post_detail = document.querySelector(".detail");
  }

  events() {
    setTimeout(() => {
      if (this.post_detail) {
        this.getAllLikes();
        this.sendComment();
        // this.updateLike();
      }
    }, 0);
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
    //   console.log("====================================");
    //   console.log("fuuuuucccccccccccck");
    //   console.log("====================================");


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
                const noComment = $("#toggleComment" + id).find(
                  "#noComment" + id
                );

                if (noComment.length !== 0) {
                  noComment.remove();
                }

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
}
