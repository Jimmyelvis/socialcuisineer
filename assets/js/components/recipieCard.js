export const RecipeCard = ({ post }) => {


  const postElement = document.createElement("div");

  // Create container element for the post
  postElement.className = "recipe-card card"; // CSS classes for styling
  postElement.dataset.postid = post.id; // Store post ID as data attribute

  // Build post HTML structure using template literals
  // This creates the complete card with user image, content, and stats
  /*html*/



  postElement.innerHTML = /*html*/ `
      <div class="card-userImage">
        <img src="${post.added_by.profile_pic}" alt="">
      </div>

      <button id='post${post.id}' class='card-closeBtn'>
          <img src='./assets/img/close-btn-v2.svg' alt=''>
      </button>

        <div class="card-info">
          <div class="card-desc">
            <div class="block"></div>
            <div class="card-headings">
              <h2 class="heading-2">
                <a href="${post.link}">${post.heading}</a>
              </h2>
              <h3 class="heading-3">
                ${post.added_by.first_name} ${post.added_by.last_name}
              </h3>
              <h4 class="heading-4">
                ${post.time_message}
              </h4>
            </div>
          </div>
          
          <div class="card-stats">
            <div class="likes">
              <h4 class="heading-4">${post.likes}</h4>
              <img src="./assets/img/like-v2.svg" alt="">
            </div>
            <div class="comments">
              <h4 class="heading-4">${post.comments_count}</h4>
              <img src="./assets/img/comments-v2.svg" alt="">
            </div>
          </div>
        </div>
        
        <div class="overlay"></div>
        ${post.image ? `<img src="${post.image}" class="card-bg">` : ""}
      `;
      
  return postElement;
};
