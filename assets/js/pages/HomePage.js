import axios from "axios";
import Confirm from "../modules/Confirm.js";



class Homepage {
  constructor() {
    this.events();
    this.highLights = document.querySelector(".highLights");
    this.summerNote = document.getElementById("summernote");
    this.inProgress = false;

    this.indexBtns = document.querySelector(".indexBtns");

    /**
     * Add an event listener for the window object to detect
     * a scroll event
     *  */
    document.addEventListener("scroll", () => {
      if (this.indexBtns) {
        this.scrollView();
      }
    });

    console.log('Homepage module loaded');
  }

  events() {
    this.loadPosts();
    this.LoadhighLights();
    this.summerNoteInit();
    this.addPost();
    this.indexTabs();
  }

  indexTabs() {
    const tabIndex = document.querySelectorAll(".tabIndex");
    const btnTrends = document.getElementById("btnTrends");
    const btnAddPosts = document.getElementById("btnAddPosts");
    const btnTimeline = document.getElementById("btnTimeline");
    const tabTimeline = document.querySelector(".tabTimeline");
    const tabAddPosts = document.querySelector(".tabAddPosts");
    const tabTrends = document.querySelector(".tabTrends");

    // Initialize tabs - only hide non-active ones
    hideNonstartingTabsIndex();

    let indextabslinks = [btnTimeline, btnAddPosts, btnTrends];
    let indextabs = [tabTimeline, tabAddPosts, tabTrends];

    indextabslinks.forEach((item, idx) => {
      item.addEventListener("click", () => {
        // First, find currently active tab
        const activeTabIndex = indextabs.findIndex(tab => 
          tab.classList.contains("show") && tab.style.display !== "none");
        
        if (activeTabIndex === idx) return; // Don't do anything if clicking the active tab
        
        // Hide current active tab
        if (activeTabIndex !== -1) {
          indextabs[activeTabIndex].classList.remove("show");
          
          setTimeout(() => {
            indextabs[activeTabIndex].style.display = "none";
            
            // Show the new tab
            indextabs[idx].style.display = null;
            
            // Force a reflow to ensure the display change is applied
            void indextabs[idx].offsetHeight;
            
            // Add the show class to trigger the transition
            indextabs[idx].classList.add("show");
          }, 300); 
        } else {
          // No active tab found, just show the selected one
          indextabs[idx].style.display = null;
          setTimeout(() => {
            indextabs[idx].classList.add("show");
          }, 50);
        }
      });
    });

    function hideNonstartingTabsIndex() {
      if (tabAddPosts && tabTrends) {
        tabAddPosts.style.display = "none";
        tabTrends.style.display = "none";
      }
    }
  }

  /**
   * Loads posts from the server with pagination support
   * 
   * This method handles fetching posts from the server via AJAX, rendering them
   * in the DOM, and managing pagination markers for infinite scrolling. It includes
   * safeguards against concurrent requests and provides user feedback during loading.
   * 
   * The method is triggered in two scenarios:
   * 1. Initial page load to display the first set of posts
   * 2. When the user scrolls near the bottom of the page (via scrollView method)
   */
  loadPosts(afterPost = false) {
    // Prevent multiple simultaneous AJAX requests
    // This is critical for infinite scrolling to avoid duplicate posts
    if (this.inProgress === true) {
      return;
    }

    // Set flag to indicate a request is in progress
    this.inProgress = true;

    // Get the container where posts will be displayed
    const postsArea = document.querySelector('.posts_area');
    if (!postsArea) {
      // Exit if the posts container doesn't exist in the DOM
      this.inProgress = false;
      return;
    }

    // clear postArea

    if (afterPost === true) {
      postsArea.innerHTML = ""; 
    }

    // Determine which page to load
    // For initial load, page=1; for subsequent loads, get page from hidden input
    const nextPageElement = postsArea.querySelector('.nextPage');
    const page = nextPageElement ? nextPageElement.value : 1;

    // Clean up any existing pagination markers before adding new content
    // This prevents duplicate markers that could interfere with infinite scrolling
    const paginationElements = postsArea.querySelectorAll('.nextPage, .noMorePosts');
    paginationElements.forEach(el => el.remove());

    // Create and display a loading indicator to provide user feedback
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.textContent = 'Loading posts...';
    postsArea.appendChild(loadingIndicator);

    // Make AJAX request to the server to fetch posts
    // Uses fetch API with POST method to send pagination parameters
    fetch('includes/handlers/ajax_load_posts.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `page=${page}&userLoggedIn=${userLoggedIn}`
    })
    .then(response => response.json()) // Parse JSON response
    .then(data => {
      // Remove loading indicator once response is received
      loadingIndicator.remove();

      // Process successful response from server
      if (data.status === 'success' && data.data) {
        const responseData = data.data;
        const posts = responseData.posts;
        
        if (posts && posts.length > 0) {
          // Render each post in the DOM
          posts.forEach(post => {
            // Create container element for the post
            const postElement = document.createElement('div');
            postElement.className = 'recipe-card card'; // CSS classes for styling
            postElement.dataset.postid = post.id;       // Store post ID as data attribute
            
            // Build post HTML structure using template literals
            // This creates the complete card with user image, content, and stats
            /*html*/
            postElement.innerHTML = `
              <div class="card-userImage">
                <img src="${post.added_by.profile_pic}" alt="">
              </div>
              

              
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
              ${post.image ? `<img src="${post.image}" class="card-bg">` : ''}
            `;
            
            // Add the completed post element to the posts container
            postsArea.appendChild(postElement);
          });
          
          // Handle pagination based on server response
          if (responseData.has_more) {
            // If more posts exist, add hidden input with next page number
            // This will be used by scrollView to load the next batch
            const nextPageInput = document.createElement('input');
            nextPageInput.type = 'hidden';
            nextPageInput.className = 'nextPage';
            nextPageInput.value = responseData.next_page;
            postsArea.appendChild(nextPageInput);
          } else {
            // If no more posts exist, add marker to prevent further requests
            const noMorePostsInput = document.createElement('input');
            noMorePostsInput.type = 'hidden';
            noMorePostsInput.className = 'noMorePosts';
            noMorePostsInput.value = 'true';
            postsArea.appendChild(noMorePostsInput);
            
            // Also add visible message indicating end of content
            const noMorePostsMessage = document.createElement('p');
            noMorePostsMessage.className = 'noMorePosts column';
            noMorePostsMessage.textContent = 'No more posts to show!';
            postsArea.appendChild(noMorePostsMessage);
          }
        } else {
          // Handle case where no posts were returned (empty array)
          const noPostsMessage = document.createElement('p');
          noPostsMessage.className = 'no-posts-message';
          noPostsMessage.textContent = 'No posts to show.';
          postsArea.appendChild(noPostsMessage);
          
          // Add marker to prevent further requests
          const noMorePostsInput = document.createElement('input');
          noMorePostsInput.type = 'hidden';
          noMorePostsInput.className = 'noMorePosts';
          noMorePostsInput.value = 'true';
          postsArea.appendChild(noMorePostsInput);
        }
      } else {
        // Handle error response from server
        console.error('Error loading posts:', data.message || 'Unknown error');
      }
    })
    .catch(error => {
      // Handle network errors or JSON parsing failures
      console.error('Error loading posts:', error);
      loadingIndicator.remove();
    })
    .finally(() => {
      // Reset progress flag regardless of success or failure
      // This allows future requests to be made
      this.inProgress = false;
    });
  }

  LoadhighLights() {
    fetch('includes/handlers/ajax_load_highlight_posts.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `userLoggedIn=${userLoggedIn}`
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success' && data.data) {
        
        const posts = data.data;

        if (posts.length > 0) {

          // Render each post in the DOM
          posts.forEach(post => {
            // Create container element for the post
            const postElement = document.createElement('div');
            postElement.className = 'recipe-card card'; // CSS classes for styling
            postElement.dataset.postid = post.id;       // Store post ID as data attribute
            
            // Build post HTML structure using template literals
            // This creates the complete card with user image, content, and stats
            /*html*/
            postElement.innerHTML = `
              <div class="card-userImage">
                <img src="${post.added_by.profile_pic}" alt="">
              </div>

              
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
              ${post.image ? `<img src="${post.image}" class="card-bg">` : ''}
            `;
            
            // Add the completed post element to the posts container
            this.highLights.appendChild(postElement);
          });

     
        }
     
      } else if (data.status === 'error') {
        console.error('Error loading highlights:', data.message);
      }
    })
    .catch(error => {
      console.error('Error loading highlights:', error);
    });
  }

  scrollView() {
    // Check if posts area exists
    const postsArea = document.querySelector(".posts_area");
    if (!postsArea) return;
    
    // Check if we've reached the end of posts
    const noMorePostsElement = postsArea.querySelector(".noMorePosts");
    if (noMorePostsElement && noMorePostsElement.value === "true") return;
    
    // Get all recipe cards
    const recipecards = document.querySelectorAll(".recipe-card");
    if (recipecards.length === 0) return;
    
    // Check if we're near the bottom of the page
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // If we're within 200px of the bottom, load more posts
    if (scrollPosition + windowHeight >= documentHeight - 200) {
      this.loadPosts();
    }
  }

  isElementInView(el) {
    if (el == null) {
      return;
    }

    var rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) && //* or $(window).height()
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) //* or $(window).width()
    );
  }

  summerNoteInit() {
    $("#summernote").summernote({
      height: 400,
      placeholder: "write here...",
    });
  }

  addPost() {
    const inpFile = document.getElementById("inpFile");
    const previewContainer = document.getElementById("imgPreview");
    const previewImage = document.querySelector(".img-preview-image");
    const previewDefaultText = document.querySelector(".imgPreview-DefaultTxt");
    const postForm = document.querySelector(".tabAddPosts form");
    const postButton = document.getElementById("post_button");

   

    // Set up AJAX form submission
    if (postForm && postButton) {
      // Prevent form from submitting traditionally
      postForm.addEventListener('submit', (e) => {
        e.preventDefault();
      });
      
      postButton.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent traditional form submission
        
        // Get form data (this automatically includes file inputs)
        const formData = new FormData(postForm);
        
        // Validate form fields before submission
        const postHeading = formData.get('post_heading');
        const postText = formData.get('post_text');
        const fileInput = document.querySelector('input[name="inpFile"]');
        const hasFile = fileInput && fileInput.files && fileInput.files.length > 0;
        
        // Collect validation errors
        const errors = [];

        if (!hasFile) {
          errors.push('Please select an image for your post');
        }
        
        
        if (!postHeading || postHeading.trim() === '') {
          errors.push('Please enter a headline for your post');
        }
        
        if (!postText || postText.trim() === '' || postText === '<p><br></p>') {
          errors.push('Please enter some content for your post');
        }
        
        // Show validation errors if any
        if (errors.length > 0) {
          Confirm.open({
            title: "Form Validation Error",
            message: errors.join('<br>'),
            okText: "OK",
            cancelText: "Cancel",
            onok: () => {
              return;
            },
            oncancel: () => {
              return;
            }
          });
          return; // Stop form submission
        }
        
        // Add the post field to trigger PHP handler (submit button name)
        formData.append('post', 'Post');
        
        // Add a field to indicate this is an AJAX request
        formData.append('ajax_request', '1');
        
        // Show loading indicator
        const originalText = postButton.value;
        postButton.value = "Posting...";
        postButton.disabled = true;
        
        // Add header to indicate this is an AJAX request
        const headers = new Headers();
        headers.append('X-Requested-With', 'XMLHttpRequest');

        
        // Submit via AJAX
        fetch('index.php', {
          method: 'POST',
          headers: headers,
          body: formData // This includes the file data
        })
        .then(response => {
          // Check if the response is JSON
          const contentType = response.headers.get("content-type");
          
          if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json();
          } else {
            // Get the text response to see what we're actually getting
            return response.text().then(text => {
              throw new Error('Expected JSON response but got: ' + contentType);
            });
          }
        })
        .then(data => {
          if (data && data.success) {
            // Clear form
            postForm.reset();
            
            // Reset preview
            previewImage.setAttribute("src", "");
            previewDefaultText.style.display = "block";
            previewImage.style.display = "none";
            
            // Reset summernote editor if it exists
            if (window.jQuery && $('#summernote').length) {
              $('#summernote').summernote('reset');
            }
            
            // Show success message
            // alert("Post created successfully!");

            Confirm.open({
              title: "Post created successfully!",
              message: "Do you want to see the new posts?",
              okText: "See the new posts",
              cancelText: "Stay Here",
              onok: () => {
                // Switch to timeline tab to see the new post
                document.getElementById("btnTimeline").click();
              },
              oncancel: () => {
               return
              }
            });
            
          
            
            // Reload posts
            let afterPost = true; 

            // window smooth scroll to the top when switching tabs
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });

            this.loadPosts(afterPost);
          } else if (data && data.error) {
           
            Confirm.open({
              title: "Error",
              message: data.error,
              okText: "OK",
              cancelText: "Cancel",
              onok: () => {
                return;
              },
              oncancel: () => {
                return;
              }
            });
          }
          
          // Reset button
          postButton.value = originalText;
          postButton.disabled = false;
        })
        .catch(error => {
          console.error('Error:', error);
          alert("Error creating post"); 
          
          // Reset button
          postButton.value = originalText;
          postButton.disabled = false;
        });
      });
    }

    Array.prototype.forEach.call(
      document.querySelectorAll(".file-upload-button"),
      function (button) {
        const hiddenInput = button.parentElement.querySelector(".inpFile");

        const label = button.parentElement.querySelector(".file-upload-label");
        const defaultLabelText = "No file selected";

        // Set default text for label
        label.textContent = defaultLabelText;
        label.title = defaultLabelText;

        button.addEventListener("click", function () {
          hiddenInput.click();
        });

        hiddenInput.addEventListener("change", function () {
          const filenameList = Array.prototype.map.call(
            hiddenInput.files,
            function (file) {
              return file.name;
            }
          );

          label.textContent = filenameList.join(", ") || defaultLabelText;
          label.title = label.textContent;
        });
      }
    );

    let prevPhoto = previewImage.getAttribute("src");

    if (previewImage.getAttribute("src") == "") {
      previewImage.setAttribute("src", null);
    } else {
      previewImage.style.display = "block";
      previewDefaultText.style.display = "none";
    }

    inpFile.addEventListener("change", function () {
      const file = this.files[0];

      if (file) {
        const reader = new FileReader();

        previewDefaultText.style.display = "none";
        previewImage.style.display = "block";

        reader.addEventListener("load", function () {
          previewImage.setAttribute("src", this.result);

          // getCroppedImage("src", this.result);
        });

        reader.readAsDataURL(file);
      } else {
        previewDefaultText.style.display = "block";
        previewImage.style.display = "none";

        if (previewImage.getAttribute("src") == "") {
          previewImage.setAttribute("src", null);
        }
      }
    });
  }

}

export const homepage = new Homepage();
