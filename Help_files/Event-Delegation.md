# Event Delegation in PostDetailPage.js

This document explains how to refactor event handlers in the Social-Cuisiener-2025 project using event delegation, with a focus on the comment editing functionality in PostDetailPage.js.

## 🎯 Objectives

- Improve performance by reducing the number of event listeners
- Handle dynamically added elements automatically
- Maintain clean, maintainable code
- Prevent memory leaks
- Standardize event handling across the application

## 🔧 Technical Approach

The refactoring involves two key changes:

1. **Moving event handlers out of the `renderComments()` method** into a dedicated setup method
2. **Using event delegation** instead of attaching listeners to individual elements

## 📋 Implementation Guide

### Step 1: Create a Dedicated Event Handler Setup Method

Add a new method to the `PostDetail` class to set up all comment-related event handlers:

```javascript
setupCommentEventHandlers() {
  // Store reference to this for use in event handlers
  const self = this;
  
  // Comment button handler
  document.addEventListener("click", function(e) {
    if (e.target.id === "commentBtn") {
      const postId = document.querySelector(".detail").dataset.postId;
      const commentText = document.getElementById(`comment${postId}`).value;
      
      self.sendComment({
        postId: postId,
        commentText: commentText,
        userLoggedIn: userLoggedIn
      });
    }
  });
  
  // Edit button handler
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("editCommentbtn")) {
      const commentEntry = e.target.closest(".commentEntry");
      const commentBody = commentEntry.querySelector(".commentBody");
      const originalText = commentBody.textContent;

      // Get the specific buttons for this comment entry
      const thisEditBtn = commentEntry.querySelector(".editCommentbtn");
      const thisDeleteBtn = commentEntry.querySelector(".deleteCommentbtn");
      const thisSaveBtn = commentEntry.querySelector(".saveCommentbtn");
      const thisCancelBtn = commentEntry.querySelector(".cancelCommentbtn");

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
  });
  
  // Cancel button handler
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("cancelCommentbtn")) {
      const commentEntry = e.target.closest(".commentEntry");
      const commentBody = commentEntry.querySelector(".commentBody");
      const originalText = commentBody.textContent;

      const thisEditBtn = commentEntry.querySelector(".editCommentbtn");
      const thisDeleteBtn = commentEntry.querySelector(".deleteCommentbtn");
      const thisSaveBtn = commentEntry.querySelector(".saveCommentbtn");
      const thisCancelBtn = commentEntry.querySelector(".cancelCommentbtn");

      commentBody.classList.remove("editState");
      commentBody.textContent = originalText;
      thisEditBtn.style.display = "block";
      thisDeleteBtn.style.display = "block";
      thisSaveBtn.style.display = "none";
      thisCancelBtn.style.display = "none";
    }
  });
  
  // Save button handler
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("saveCommentbtn")) {
      const commentEntry = e.target.closest(".commentEntry");
      const commentBody = commentEntry.querySelector(".commentBody");
      const originalText = commentBody.textContent;

      const thisEditBtn = commentEntry.querySelector(".editCommentbtn");
      const thisDeleteBtn = commentEntry.querySelector(".deleteCommentbtn");
      const thisSaveBtn = commentEntry.querySelector(".saveCommentbtn");
      const thisCancelBtn = commentEntry.querySelector(".cancelCommentbtn");

      commentBody.classList.remove("editState");
      commentBody.textContent = originalText;
      thisEditBtn.style.display = "block";
      thisDeleteBtn.style.display = "block";
      thisSaveBtn.style.display = "none";
      thisCancelBtn.style.display = "none";

      self.editComment({
        commentId: commentEntry.dataset.commentid,
        newText: commentBody.textContent,
        userLoggedIn: userLoggedIn,
        commentToUser: commentEntry.dataset.commentto,
        commentEntryDataId: commentEntry.dataset.commentid,
      });
    }
  });
  
  // Delete button handler
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("deleteCommentbtn")) {
      const commentEntry = e.target.closest(".commentEntry");
      const commentBody = commentEntry.querySelector(".commentBody");
      const originalText = commentBody.textContent;

      const thisEditBtn = commentEntry.querySelector(".editCommentbtn");
      const thisDeleteBtn = commentEntry.querySelector(".deleteCommentbtn");
      const thisSaveBtn = commentEntry.querySelector(".saveCommentbtn");
      const thisCancelBtn = commentEntry.querySelector(".cancelCommentbtn");

      commentBody.classList.remove("editState");
      commentBody.textContent = originalText;
      thisEditBtn.style.display = "block";
      thisDeleteBtn.style.display = "block";
      thisSaveBtn.style.display = "none";
      thisCancelBtn.style.display = "none";

      self.deleteComment({
        commentId: commentEntry.dataset.commentid,
        userLoggedIn: userLoggedIn,
        commentToUser: commentEntry.dataset.commentto,
        commentEntryDataId: commentEntry.dataset.commentid,
      });
    }
  });
}
```

### Step 2: Update the Constructor to Call the Setup Method

Modify the constructor to call the new setup method once during initialization:

```javascript
constructor() {
  this.post_detail = document.querySelector(".detail");
  console.log("PostDetail module loaded");
  
  // Check if we have initial data embedded
  if (typeof initialPostData !== 'undefined') {
    console.log("✅ Using embedded data for hydration (hybrid approach)");
    console.log("Initial post data:", initialPostData);
    this.hydrateFromInitialData(initialPostData);
  } else {
    console.log("⚠️ No embedded data found, falling back to AJAX request");
    this.getSinglePost();
  }
  
  this.setupCommentEventHandlers(); // Add this line
  this.events();
  console.log("PostDetail module loaded");
}
```

### Step 3: Update the `renderComments()` Method

Remove the event handlers from the `renderComments()` method, keeping only the HTML rendering logic:

```javascript
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
          
          <div class='commentInfo'>
            <div class='commentMeta'>
              <li class='name'>
                <a href='${comment.posted_by.username}'>
                  ${comment.posted_by.first_name} ${comment.posted_by.last_name}
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
        </div>
      `;
    })
    .join("");
  
  // Add comment form
  commentBtnContainer.innerHTML = button({
    name: `${data.id}`,
    id: "commentBtn",
    value: "Send",
    btnType: "primary",
  });
}
```

### Step 4: Update the `events()` Method

Remove the `editComment()` call from the `events()` method since we're now handling it through event delegation:

```javascript
events() {
  this.getAllLikes();
  // this.editComment(); // Remove this line
}
```

## 🔍 Key Benefits

### 1. Performance Improvements

**Before:**
- One event listener per button (could be hundreds on a popular post)
- New listeners needed to be attached whenever new comments were added

**After:**
- Only 4 event listeners total (one per action type)
- No need to attach new listeners when comments are added

### 2. Memory Usage

**Before:**
- Each listener consumes memory
- Potential for memory leaks if listeners aren't properly removed

**After:**
- Minimal memory footprint
- No risk of memory leaks from orphaned event listeners

### 3. Dynamic Content Support

**Before:**
- New comments required manual attachment of event listeners
- Easy to miss attaching listeners to dynamically added content

**After:**
- New comments work automatically with existing listeners
- No special handling needed for dynamic content

### 4. Code Organization

**Before:**
- Event handling logic mixed with rendering logic
- Duplicate code across different event handlers

**After:**
- Clear separation between rendering and event handling
- Event handling centralized in one dedicated method

## 🧪 Testing the Refactored Code

After implementing these changes, test the following scenarios:

1. **Loading existing comments**: Verify that edit/delete buttons work on page load
2. **Adding new comments**: Verify that edit/delete buttons work on newly added comments
3. **Editing comments**: Verify the full edit flow works (edit → save/cancel)
4. **Deleting comments**: Verify deletion works and UI updates correctly
5. **Multiple users**: Test with different user accounts to verify permissions work correctly

## 🔄 Potential Further Improvements

1. **Single Event Handler**: Combine all button handlers into a single event handler using a switch statement
2. **State Management**: Implement a cleaner state management approach for comment editing states
3. **Accessibility**: Add keyboard navigation support for comment editing
4. **Animation**: Improve transitions between edit states
5. **Error Handling**: Add more robust error handling and user feedback

## 📚 References

- [MDN Web Docs: Event Delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_delegation)
- [DOM_Elements.md](./DOM_Elements.md) - Our project documentation on DOM traversal
- [JavaScript.info: Event Delegation](https://javascript.info/event-delegation)
