import { parallax } from "../modules/Parallax";

class PostDetail {
  constructor() {
    this.events();
    this.post_detail = document.querySelector(".detail");

    console.log('PostDetail module loaded');
  }

  events() {
    this.getAllLikes();
    this.sendComment();
    this.editComment();
  }

  async getAllLikes() {
    const likedBy = document.querySelector(".likedby");
    const likeByNumberBtn = document.querySelector(".likeByNumber");
    const moreLikesOverlay = document.querySelector(".moreLikesOverlay");
    const closeLikesModal = document.querySelector(".closeModal");
    const likesModalOverlay = document.querySelector(".likesModalOverlay");
    const moreLikesContent = document.querySelector(".moreLikesContent");
    const likes = document.querySelector(".likes");

    likedBy?.addEventListener("click", async function (e) {
      if (e.target.classList.contains("likeByNumber")) {
        try {
          const response = await fetch("includes/handlers/ajax_get_all_likes.php", {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              post_id: post_id,
              userLoggedIn: userLoggedIn
            })
          });

          const data = await response.json();
          
          if (data.status === 'success') {
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
          console.error('Error:', error);
        }
      }
    });

    function showLikes(likes) {
      const likesContainer = document.querySelector('.likes');
      if (!likesContainer) return;

      const likesList = likes.map(like => `
        <div class="like">
          <img src="${like.profile_pic}" class="avatar">
          <a href="${like.username}" class="heading-3">${like.first_name} ${like.last_name}</a>
        </div>
      `).join('');

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

  async sendComment() {
    const commentBtn = document.getElementById('commentBtn');
    if (!commentBtn) return;

    commentBtn.addEventListener('click', async () => {
      const postId = commentBtn.getAttribute('name');
      const commentText = document.getElementById(`comment${postId}`).value;

      try {
        const response = await fetch('includes/handlers/ajax_submit_comment.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            post_author: post_author,
            commentText: commentText,
            id: postId,
            user_to: userLoggedIn
          })
        });

        const data = await response.json();

        if (data.status === 'success') {
          // Clear comment input
          document.getElementById(`comment${postId}`).value = '';
          
          // Update comment count
          const commentCount = document.querySelector('.commentNumber');
          if (commentCount) {
            commentCount.textContent = parseInt(commentCount.textContent) + 1;
          }

          // Add new comment to list
          const commentSection = document.querySelector('.commentResponse');
          if (commentSection && data.data.comment_html) {
            commentSection.insertAdjacentHTML('afterbegin', data.data.comment_html);
          }
        } else {
          alert(data.message || 'Error posting comment');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error posting comment');
      }
    });
  }

  async editComment() {
    const commentSection = document.querySelector('.comments');
    if (!commentSection) return;

    commentSection.addEventListener('click', async (e) => {
      const target = e.target;
      
      if (target.classList.contains('editCommentbtn')) {
        const commentEntry = target.closest('.commentEntry');
        if (!commentEntry) return;

        const commentBody = commentEntry.querySelector('.commentbody');
        const originalText = commentBody.textContent;
        
        // Make comment editable
        commentBody.contentEditable = true;
        commentBody.focus();
        
        // Show save/cancel buttons
        commentEntry.querySelector('.saveCommentbtn').style.display = 'inline-block';
        commentEntry.querySelector('.cancelCommentbtn').style.display = 'inline-block';
        target.style.display = 'none';
      }
      
      if (target.classList.contains('saveCommentbtn')) {
        const commentEntry = target.closest('.commentEntry');
        if (!commentEntry) return;

        const [commentId, commentTo] = commentEntry.dataset.req.split(',');
        const newText = commentEntry.querySelector('.commentbody').textContent;

        try {
          const response = await fetch('includes/handlers/ajax_edit_comment.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              comment_id: commentId,
              comment_Body: newText,
              commentToUser: commentTo,
              userLoggedIn: userLoggedIn
            })
          });

          const data = await response.json();

          if (data.status === 'success') {
            // Update UI
            commentEntry.querySelector('.commentbody').contentEditable = false;
            target.style.display = 'none';
            commentEntry.querySelector('.cancelCommentbtn').style.display = 'none';
            commentEntry.querySelector('.editCommentbtn').style.display = 'inline-block';
            
            // Show success message
            const response = commentEntry.querySelector('.response');
            if (response) {
              response.textContent = 'Comment updated successfully';
              setTimeout(() => response.textContent = '', 3000);
            }
          } else {
            alert(data.message || 'Error updating comment');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Error updating comment');
        }
      }
    });
  }
}

export const postdetail = new PostDetail();
