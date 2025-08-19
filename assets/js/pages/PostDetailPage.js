import { parallax } from "../modules/Parallax";
import { button } from "../components/buttons";
import Confirm from "../modules/Confirm.js";

class PostDetail {
  constructor() {
    this.post_detail = document.querySelector(".detail");
    this.events();
    this.setupCommentEventHandlers();
    
    // Check if we have initial data embedded
    if (typeof initialPostData !== 'undefined') {
      console.log("✅ Using embedded data for hydration (hybrid approach)");
      console.log("Initial post data:", initialPostData);
      this.hydrateFromInitialData(initialPostData);
    } else {
      console.log("⚠️ No embedded data found, falling back to AJAX request");
      this.getSinglePost();
    }
    
  }

  events() {

    this.getAllLikes();
    this.updateLike();  
  }
  
  //  use embedded data
  hydrateFromInitialData(data) {
    console.log("🔄 Starting hydration process with embedded data");
    
    // Hydrate each section with the initial data
    console.log("  → Hydrating post heading");
    this.renderPostHeading(data);
    
    console.log("  → Hydrating likes section");
    this.renderLikedBy(data);
    
    console.log("  → Hydrating post body");
    this.renderPostBody(data);
    
    console.log("  → Hydrating comments section");
    this.renderComments(data);
    
    // Initialize parallax effect
    console.log("  → Initializing parallax effect");
    parallax();
    
    console.log("✅ Hydration complete! Page is now interactive");
    
    // Add a performance marker
    if (window.performance) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`📊 Page loaded and hydrated in ${pageLoadTime}ms`);
    }
  }

  getAllLikes() {
    const likedBy = document.querySelector(".likedby");
    const likeByNumberBtn = document.querySelector(".likeByNumber");
    const moreLikesOverlay = document.querySelector(".moreLikesOverlay");
    const closeLikesModal = document.querySelector(".closeModal");
    const likesModalOverlay = document.querySelector(".likesModalOverlay");
    const moreLikesContent = document.querySelector(".moreLikesContent");
    const likes = document.querySelector(".likes");

    likedBy.addEventListener("click", async function (e) {
      if (e.target.classList.contains("likeByNumber")) {
        console.log("likeByNumber clicked");
        
        // Get post_id from the closest post container or data attribute
        const postContainer = e.target.closest(".detail");
        const post_id = postContainer ? postContainer.dataset.postId : null;
        
        console.log("Post container:", postContainer);
        console.log("Post ID:", post_id);
        
        try {
          const response = await fetch(
            "includes/handlers/ajax_get_all_likes.php",
            {
              method: "POST", // Changed from GET to POST
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                post_id: post_id,
                userLoggedIn: userLoggedIn,
              }),
            }
          );

          const data = await response.json();

          if (data.status === "success") {
            showLikes(data.data.likes);

            moreLikesOverlay.classList.add("active");

            setTimeout(() => {
              likesModalOverlay.style.opacity = 0.8;
            }, 300);

            setTimeout(() => {
              moreLikesContent.style.opacity = 1;
            }, 1200);
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    });

    function showLikes(likes) {
      const likesContainer = document.querySelector(".likes");
      if (!likesContainer) return;

      const likesList = likes
        .map(
          (like) => `
        <div class="like">
          <img src="${like.profile_pic}" class="avatar">
          <a href="${like.username}" class="heading-3">${like.first_name} ${like.last_name}</a>
        </div>
      `
        )
        .join("");

      likesContainer.innerHTML = likesList;
    }

    // Modal close handlers
    closeLikesModal?.addEventListener("click", closeModal);
    likesModalOverlay?.addEventListener("click", closeModal);

    function closeModal() {
      moreLikesContent.style.opacity = null;

      setTimeout(() => {
        likesModalOverlay.style.opacity = null;
      }, 800);

      setTimeout(() => {
        moreLikesOverlay.classList.remove("active");
      }, 1200);
    }
  }

  async updateLike() {

    const likedBy = document.querySelector("#likedBy");
    likedBy.addEventListener("click", async (e) => {

      if (e.target.classList.contains("btnlike")) {
        console.log("btnlike clicked");

        console.log("status ",e.target.name);

        // TODO: Send the value of e.target.name to the server

        let likeValue;

        switch (e.target.name) {
          case "likedByCurrentUser":
            likeValue = 'removing_like';
            break;
          case "notLikedByCurrentUserYet":
            likeValue = 'adding_like';
            break;
          default:
            likeValue = 0;
        }

        console.log("likeValue ",likeValue);

        try {
          const response = await fetch("includes/handlers/ajax_update_likes.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              post_id: post_id,
              like_value: likeValue,
              userLoggedIn: userLoggedIn,
            }),
          });

          const data = await response.json();

          if (data.status === "success") {
            console.log(
              {
                liked_by: data.data.recent_likers
              }
            ); 

            /* 
            We need to renderLikedBy and pass in the recent Likers array
            so it can rehydrate with the latest data
            */
            this.renderLikedBy({
              liked_by: data.data.recent_likers
            });

        

          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Error:", error);
        } 
      }

    });

    
  } 

  async sendComment({ postId, commentText, userLoggedIn }) {
    console.log("commentBtn clicked");
    const commentResponse = document.querySelector(".commentResponse");

    console.log({
      postId: postId,
      commentText: commentText,
      userLoggedIn: userLoggedIn,
    });

    try {
      const response = await fetch("includes/handlers/send_comment.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentText: commentText,
          id: postId,
          userLoggedIn: userLoggedIn,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        if (commentResponse) {
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
        }

        // Clear comment input
        document.getElementById(`comment${postId}`).value = "";

        // Update comment count
        const commentCount = document.querySelector(".commentNumber");
        if (commentCount) {
          commentCount.textContent = parseInt(commentCount.textContent) + 1;
        }

        // Add new comment to list
        const commentSection = document.querySelector("#commentsList");
        if (commentSection && data.data) {
          let newComment = data.data;

          /*html*/
          newComment = `
          <div class='commentEntry new-entry'
            data-commentid='${newComment.id}' data-commentto='${newComment.posted_to}'
          >
            <div class='avatar'>
              <img src='${newComment.posted_by.profile_pic}' class='post-profile-pic'>
            </div>

            <div class='nameTime'>
              <li class='name'>
                <a href='${newComment.posted_by.username}'>
                  ${newComment.posted_by.full_name} 
                </a>
              </li>
              <li class='time'>${newComment.date_added}</li>
              <li class='response'></li>

            </div>
          
            <p class='commentBody'>${newComment.body}</p>

            ${newComment.can_edit ? /*html*/ `
              <div class='editstatebtns'>
                <button class="heading-3 commentStateBtn editCommentbtn">Edit</button>
                <button class="heading-3 commentStateBtn deleteCommentbtn">Delete</button>
                <button class="heading-3 commentStateBtn saveCommentbtn">Save</button>
                <button class="heading-3 commentStateBtn cancelCommentbtn">Cancel</button>
              </div>
              ` : ""}
        </div>
          `;

          commentSection.insertAdjacentHTML("afterbegin", newComment);
        }
      } else {
        alert(data.message || "Error posting the comment");
      }
    } catch (error) {
      console.error("Error details:", error);
      console.log("Response status:", error.response?.status);
      console.log("Response text:", await error.response?.text());
      console.log("Error data:", error.data);
      alert(error.error_data);
    }
  }

  async editComment({commentId, newText, userLoggedIn, commentToUser, commentEntryDataId}) {

    console.log({
      "commentId": commentId,
      "newText":newText,
      "userLoggedIn":userLoggedIn,
      "commentToUser":commentToUser,
      "commentEntryDataId":commentEntryDataId,
    });

    try {
      const response = await fetch(
        "includes/handlers/ajax_edit_comment.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment_id: commentId,
            comment_Body: newText,
            commentToUser: commentToUser,
            userLoggedIn: userLoggedIn,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
   
        // Show success message, find the commentEntry class that has a data-commentid attribute that matches the commentEntryDataId
        const commentEntry = document.querySelector(`.commentEntry[data-commentid="${commentEntryDataId}"]`);
        
        // Log the selector we're using and all commentEntry elements for debugging
        console.log("Selector used:", `.commentEntry[data-commentid="${commentEntryDataId}"]`);
        console.log("All commentEntries:", document.querySelectorAll('.commentEntry'));
        console.log("commentEntry found:", commentEntry);

        if (commentEntry) {
          const response = commentEntry.querySelector(".response");
          response.style.display = "block";

          setTimeout(() => {
            response.style.opacity = 1;
            response.style.visibility = "visible";
          }, 800);

          response.textContent = "Comment updated successfully";
          
          setTimeout(() => {
            response.style.opacity = 0;
            response.style.visibility = "hidden";
          }, 5000);

          setTimeout(() => {
            response.style.display = "none";
          }, 6000);
        }
      } else {
        alert(data.message || "Error updating comment fro some reason");
      }
    } catch (error) {
      console.log("Error:", error);
      alert(error);
    }

 
  }

  async deleteComment({commentId, userLoggedIn,   commentToUser, commentEntryDataId}) {

    console.log({
      commentId: commentId,
      userLoggedIn: userLoggedIn,
      commentToUser: commentToUser,
      commentEntryDataId: commentEntryDataId,
    });
    
    try {
      const response = await fetch(
        "includes/form_handlers/delete_comment.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment_id: commentId,
            userLoggedIn: userLoggedIn,
            commentToUser: commentToUser,
            commentEntryDataId: commentEntryDataId,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        let commentsCountTxt = document.querySelector(".commentNumber");
        let commentsCount = parseInt(commentsCountTxt.textContent, 10);
        commentsCountTxt.textContent = commentsCount - 1;
        
        commentsCount--;
        commentsCount.toString();
        commentsCountTxt.textContent = commentsCount;

        const commentEntry = document.querySelector(`.commentEntry[data-commentid="${commentEntryDataId}"]`);

        commentEntry.style.opacity = 0;
        
        setTimeout(() => {
          commentEntry.remove();
        }, 700);

      } else {
        alert(data.message || "Error deleting comment");
      }
    } catch (error) {
      console.log("Error:", error);
      alert(error);
    }
  }

  async getSinglePost() {
    // get id from url

    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get("id");
    const userLoggedIn = urlParams.get("userLoggedIn");

    console.log("⚙️ Fallback AJAX request initiated");
    console.log("  → post_id:", post_id);
    console.log("  → userLoggedIn:", userLoggedIn);
    
    try {
      console.log("  → Sending AJAX request to ajax_getSingle_post.php");
      const startTime = performance.now();
      
      const response = await fetch(
        "includes/handlers/ajax_getSingle_post.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: post_id,
            userLoggedIn: userLoggedIn,
          }),
        }
      );

      const data = await response.json();
      const endTime = performance.now();
      console.log(`  → AJAX request completed in ${Math.round(endTime - startTime)}ms`);

      if (data.status === "success") {
        console.log("✅ AJAX request successful, rendering post");
        console.log("Post data:", data.data);
        this.renderPost(data.data);
      } else {
        console.error("❌ AJAX request failed:", data.message);
      }
    } catch (error) {
      console.error("❌ Error during AJAX request:", error);
    }
  }

  renderPost(data) {
    this.renderPostHeading(data);
    this.renderLikedBy(data);
    this.renderPostBody(data);
    this.renderComments(data);
  }

  renderPostHeading(data) {
    const postHeading = document.getElementById("postHeading");
    
    // Clear loading placeholder
    postHeading.innerHTML = '';
    
    // Add content
    postHeading.innerHTML = /*html*/ `
      <div class='avatar'>
        <a href='${data.added_by.username}'>
          <img src='${data.added_by.profile_pic}' class='post-profile-pic'>
        </a>
      </div>

      ${
        data.added_by.username === userLoggedIn
          ? `
      <a class='edit' href='edit_post.php?id=${data.id}'>
        <img src='assets/img/edit-btn.png' class='edit-btn'>
      </a>
      `
          : ""
      }

      <div class='details'>
        <h2 class='heading-2'>${data.heading}</h2>
        <h3 class='heading-3'>By: 
          <a href='${data.added_by.username}'>
            ${data.added_by.first_name} ${data.added_by.last_name} 
          </a>
          <span class='timeMsg'>${data.time_message}</span>			
        </h3>
      </div>

      <div class='overlay'></div>
      <div class='imagebg'>
        <img class='detailBg scroll zoom-effect' src='${
          data.image
        }' data-rate='0.6' data-direction='vertical'>  
      </div>
    `;
  }

  renderLikedBy(data) {
    const likedBy = document.getElementById("likedBy");
    
    // Clear loading placeholder
    likedBy.innerHTML = '';

    const likesTotal = data.liked_by.length;
    const avatarLimit = 3;
    const andMoreDisplayNumber = likesTotal - avatarLimit;

    console.log({
      likesTotal: likesTotal,
      avatarLimit: avatarLimit,
      andMoreDisplayNumber: andMoreDisplayNumber,
      likedBy: data.liked_by
    });

    /*html*/
    likedBy.innerHTML = `
    <div class='likedForm'>
       <div class='likeHolder'>
           <input 
             type='submit' 
             class='btnlike ${data.liked_by.some((like) => like.username === userLoggedIn) ? 
              "btnThumbFilled" : "btnThumbNotFilled"}'
             value=''
             name='${data.liked_by.some((like => like.username === userLoggedIn)) ? "likedByCurrentUser" : "notLikedByCurrentUserYet"}'
           >
        </div>

        <h3 class='heading-3'>Liked By</h3>
     </div>
  
     <div class='avatars'>
      
        ${data.liked_by
          .sort((a, b) => b.id - a.id)
          .slice(0, avatarLimit)
          .map((like) => {
            return `
            <div class=avatar'>
              <a href='${like.username}'>
                <img src='${like.profile_pic}' class='avatar'>
              </a>
            </div>
          `;
          })}
      </div>

      ${
        andMoreDisplayNumber > 0
          ? `<h3 class='heading-3 likeByNumber'>and ${andMoreDisplayNumber} more</h3>`
          : ""
      }
    </div>
    `;
  }

  renderPostBody(data) {
    const postBody = document.getElementById("postBody");
    
    // Clear loading placeholder
    postBody.innerHTML = '';
    
    /*html*/
    postBody.innerHTML = `
    <p>${data.body}</p>
    `;
  }

  renderComments(data) {
    const comments = document.getElementById("comments");
    const commentsList = document.getElementById("commentsList");
    const commentBtnContainer = document.getElementById("commentBtnContainer");
    
    // Update comment count
    const commentCount = comments.querySelector(".commentNumber");
    commentCount.textContent = data.comments.length;
    
    // Clear loading placeholder
    commentsList.innerHTML = '';
    
    // Add comments
    commentsList.innerHTML = data.comments
      .map((comment) => {

        /*html*/
        return `
          <div class='commentEntry' data-commentid='${comment.id}' data-commentto='${comment.posted_to}'>
            <div class='avatar'>
              <img src='${comment.posted_by.profile_pic}' class='post-profile-pic'>
            </div>

            <div class='nameTime'>
              <li class='name'>
                <a href='${comment.posted_by.username}'>
                  ${comment.posted_by.full_name} 
                </a>
              </li>
              <li class='time'>${comment.date_added}</li>
              <li class='response'></li>
            </div>
          
            <p class='commentBody'>${comment.body}</p>

            ${comment.can_edit ? /*html*/ `
            <div class='editstatebtns'>
              <button class="heading-3 commentStateBtn editCommentbtn">Edit</button>
              <button class="heading-3 commentStateBtn deleteCommentbtn">Delete</button>
              <button class="heading-3 commentStateBtn saveCommentbtn">Save</button>
              <button class="heading-3 commentStateBtn cancelCommentbtn">Cancel</button>
            </div>
            ` : ""}
          </div>
        `;
      })
      .join("");
      
    // Add comment button
    commentBtnContainer.innerHTML = button({
      name: `${data.id}`,
      id: "commentBtn",
      value: "Send",
      btnType: "primary",
    });
    
    // Add event listener to comment button
    const commentBtn = document.getElementById("commentBtn");
    commentBtn.addEventListener("click", () => {
      this.sendComment({
        postId: data.id,
        commentText: document.getElementById(`comment${data.id}`).value,
        userLoggedIn: userLoggedIn,
      });
    });
  }
  /**
   * Sets up all comment-related event handlers using event delegation
   * This centralizes all comment event handling in one place
   */
  setupCommentEventHandlers() {

    console.log("Setting up comment event handlers");


    // Single event handler for all comment buttons using event delegation
    document.addEventListener("click", (e) => {
      const target = e.target;
      const commentEntry = target.closest(".commentEntry");
      
      // Skip if not within a comment entry or not one of our action buttons
      if (!commentEntry) return;
      if (!target.classList.contains("editCommentbtn") && 
          !target.classList.contains("deleteCommentbtn") && 
          !target.classList.contains("saveCommentbtn") && 
          !target.classList.contains("cancelCommentbtn")) return;
      
      // Common elements needed for all button types
      const commentBody = commentEntry.querySelector(".commentBody");
      const thisEditBtn = commentEntry.querySelector(".editCommentbtn");
      const thisDeleteBtn = commentEntry.querySelector(".deleteCommentbtn");
      const thisSaveBtn = commentEntry.querySelector(".saveCommentbtn");
      const thisCancelBtn = commentEntry.querySelector(".cancelCommentbtn");
      
      // Handle different button types
      if (target.classList.contains("editCommentbtn")) {
        // Edit button clicked
        commentBody.contentEditable = true;
        commentBody.classList.add("editState");
        commentBody.focus();  
        thisEditBtn.style.display = "none";
        thisDeleteBtn.style.display = "none";
        thisSaveBtn.style.display = "block";
        thisCancelBtn.style.display = "block";

        setTimeout(() => {
          thisSaveBtn.style.visibility = "visible";
          thisSaveBtn.style.opacity = "1";
          thisSaveBtn.style.pointerEvents = "auto";
          thisCancelBtn.style.visibility = "visible";
          thisCancelBtn.style.opacity = "1";
          thisCancelBtn.style.pointerEvents = "auto";
        }, 300);
      } 
      else if (target.classList.contains("cancelCommentbtn")) {
        // Cancel button clicked
        const originalText = commentBody.getAttribute("data-original-text") || commentBody.textContent;
        
        commentBody.contentEditable = false;
        commentBody.classList.remove("editState");
        commentBody.textContent = originalText;
        thisEditBtn.style.display = "block";
        thisDeleteBtn.style.display = "block";
        thisSaveBtn.style.display = "none";
        thisCancelBtn.style.display = "none";
      } 
      else if (target.classList.contains("saveCommentbtn")) {
        // Save button clicked
        const newText = commentBody.textContent;
        
        commentBody.contentEditable = false;
        commentBody.classList.remove("editState");
        thisEditBtn.style.display = "block";
        thisDeleteBtn.style.display = "block";
        thisSaveBtn.style.display = "none";
        thisCancelBtn.style.display = "none";

        this.editComment({
          commentId: commentEntry.dataset.commentid,
          newText: newText,
          userLoggedIn: userLoggedIn,
          commentToUser: commentEntry.dataset.commentto,
          commentEntryDataId: commentEntry.dataset.commentid,
        });
      } 
      else if (target.classList.contains("deleteCommentbtn")) {
        // Delete button clicked - show confirmation dialog

        Confirm.open({
          title: "Delete Comment",  
          message: "Are you sure you want to delete this comment? This action cannot be undone.",
          okText: "OK",
          cancelText: "Cancel",
          onok: () => {
            this.deleteComment({
              commentId: commentEntry.dataset.commentid,
              userLoggedIn: userLoggedIn,
              commentToUser: commentEntry.dataset.commentto,
              commentEntryDataId: commentEntry.dataset.commentid,
            });
            return;
          },
          oncancel: () => {
            return;
          }
        });

    
      }
      
      // Store original text when entering edit mode for potential cancel
      if (target.classList.contains("editCommentbtn")) {
        commentBody.setAttribute("data-original-text", commentBody.textContent);
      }
    });
  }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".detail")) {
    new PostDetail();
  }
});

export default PostDetail;
