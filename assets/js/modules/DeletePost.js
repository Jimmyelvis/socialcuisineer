class DeletePost {
  constructor() {
    this.init();

    console.log('DeletePost module loaded');
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.events());
    } else {
      this.events();
    }
  }

  events() {
    console.log('Setting up event listeners');
    
    // Use event delegation on the document body for maximum coverage
    document.body.addEventListener('click', (e) => {
      console.log('Click event detected on:', e.target);
      
      // Check if the clicked element or any of its parents has the class card-closeBtn
      const deleteButton = e.target.closest('.card-closeBtn');
      if (deleteButton) {
        e.preventDefault();
        const post_id = deleteButton.id;
        console.log('Delete button clicked, post ID:', post_id);
        this.deletePost(post_id);
      }
    });
  }

  deletePost(post_id) {
    console.log("Attempting to delete post with ID:", post_id);
    
    // Make sure we have a valid post ID
    if (!post_id) {
      console.error('No post ID provided');
      return;
    }
    
    fetch('includes/form_handlers/delete_post.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `post_id=${post_id}`
    })
    .then(response => response.json())
    .then(data => {
      console.log('Server response:', data);
      if (data.status === 'success') {
        alert(data.message);
        // Find and remove the post from the DOM instead of reloading the page
        const postElement = document.querySelector(`[data-postid="${post_id}"]`);
        if (postElement) {
          postElement.remove();
        } else {
          location.reload(); // Fallback if we can't find the element
        }
      } else {
        alert(data.message || 'Error deleting post');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error deleting post');
    });
  }
}

export const deletepost = new DeletePost();
