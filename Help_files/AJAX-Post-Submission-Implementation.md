# AJAX Post Submission with File Upload Implementation Guide

This document outlines all the steps required to implement AJAX-based post submission with file upload functionality, preventing page reload while maintaining full form functionality.

## 🎯 Objective

Transform a traditional form submission into an AJAX-based submission that:
- Prevents page reload on form submission
- Supports file uploads seamlessly
- Provides proper user feedback
- Updates the UI dynamically after successful submission

## 🔧 Technical Requirements

- **Frontend**: JavaScript (ES6+), Fetch API, FormData API
- **Backend**: PHP with JSON response support
- **File Handling**: PHP file upload validation and processing
- **UI Framework**: Any (this example uses custom CSS/HTML)

## 📋 Implementation Steps

### Step 1: JavaScript - Set Up AJAX Form Submission

**File**: `assets/js/pages/HomePage.js`

```javascript
// Get form elements
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
        alert("Post created successfully!");
        
        // Switch to timeline tab to see the new post
        document.getElementById("btnTimeline").click();
        
        // Reload posts
        this.loadPosts(true); // true = clear existing posts first
      } else if (data && data.error) {
        alert(data.error);
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
```

### Step 2: PHP - Modify Backend to Handle AJAX Requests

**File**: `index.php`

```php
<?php

// Start output buffering to catch any unwanted HTML
ob_start();

include("includes/header.php");

if (isset($_POST['post'])) {
    // Clear any output that might have been generated
    ob_clean();

    $uploadOk = 1;
    $imageName = $_FILES['inpFile']['name'];
    $errorMessage = "";

    // File upload validation
    if ($imageName != "") {
        $targetDir = "assets/img/posts/";
        $imageName = $targetDir . uniqid() . basename($imageName);
        $imageFileType = pathinfo($imageName, PATHINFO_EXTENSION);

        if ($_FILES['inpFile']['size'] > 10000000) {
            $errorMessage = "Sorry your file is too large";
            $uploadOk = 0;
        }

        if (strtolower($imageFileType) != "jpeg" && strtolower($imageFileType) != "png" && strtolower($imageFileType) != "jpg") {
            $errorMessage = "Sorry, only jpeg, jpg and png files are allowed";
            $uploadOk = 0;
        }

        if ($uploadOk) {
            if (move_uploaded_file($_FILES['inpFile']['tmp_name'], $imageName)) {
                //image uploaded okay
            } else {
                //image did not upload
                $uploadOk = 0;
            }
        }
    }

    if ($uploadOk) {
        $post = new Post($con, $userLoggedIn);
        $post->submitPost($_POST['post_text'], 'none', $imageName, $_POST['post_heading']);
        
        // Check if this is an AJAX request
        if ((!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
            strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') || 
            isset($_POST['ajax_request'])) {
            // Return JSON response for AJAX
            header('Content-Type: application/json');
            echo json_encode(['success' => true]);
            exit;
        } else {
            // Traditional redirect for non-AJAX
            // header("Location: index.php");
        }
    } else {
        // Check if this is an AJAX request
        if ((!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
            strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') || 
            isset($_POST['ajax_request'])) {
            // Return JSON response for AJAX
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'error' => $errorMessage]);
            exit;
        } else {
            // Traditional HTML response for non-AJAX
            echo "<div style='text-align:center;' class='alert alert-danger'>
                $errorMessage
            </div>";
        }
    }
}

// If we reach here, it's a normal page request, so output the buffered content
ob_end_flush();

?>
```

### Understanding Output Buffering in AJAX Responses

Output buffering was a critical part of fixing the AJAX functionality. Here's why each function was necessary:

#### `ob_start()`

**Purpose**: Starts output buffering at the beginning of the script.

**Why it's needed**: When PHP includes files (like `header.php`), they might output HTML content immediately. This HTML would be sent to the browser before your JSON response, causing the response to be invalid JSON (mixed with HTML). 

**Example problem**: Without `ob_start()`, the response might look like:
```
<!DOCTYPE html><html>...</html>{"success":true}
```
This is not valid JSON and causes parsing errors in JavaScript.

#### `ob_clean()`

**Purpose**: Clears (discards) any content that has been captured in the output buffer so far.

**Why it's needed**: After including files like `header.php` that might output HTML, we need to clear that buffered HTML before sending our JSON response. This ensures only the JSON is sent to the browser.

**Example**: When an AJAX request is detected, we clear any HTML that might have been generated by included files, then output only our clean JSON response.

#### `ob_end_flush()`

**Purpose**: Sends the current buffer contents to the browser and ends output buffering.

**Why it's needed**: For normal (non-AJAX) page requests, we want to display the regular HTML page. This function outputs the buffered HTML content that was captured by `ob_start()` but not cleared by `ob_clean()`.

**Example**: When a user visits the page normally in their browser, we want to show the full HTML page with header, navigation, etc.

#### The Complete Flow

1. `ob_start()` - Begin capturing all output
2. Include header.php - This outputs HTML which gets captured in the buffer
3. If AJAX request:
   - `ob_clean()` - Clear the HTML from the buffer
   - Output JSON response
   - `exit` - End script execution
4. If normal request:
   - `ob_end_flush()` - Output the buffered HTML
   - Continue with the rest of the page

Without this output buffering system, AJAX responses would contain HTML mixed with JSON, causing JavaScript parsing errors and preventing the AJAX functionality from working properly.

### Step 3: Update Post Loading Method (Optional Enhancement)

**File**: `assets/js/pages/HomePage.js`

```javascript
loadPosts(afterPost = false) {
  // Prevent multiple simultaneous AJAX requests
  if (this.inProgress === true) {
    return;
  }

  // Clear posts area if this is after a new post
  if (afterPost === true) {
    postsArea.innerHTML = ""; 
  }

  // Rest of your existing loadPosts logic...
}
```

## 🔍 Key Technical Solutions

### Problem 1: Page Reloading Instead of AJAX Submission
**Solution**: The form wasn't triggering the PHP handler because the `post` field (submit button name) wasn't included in FormData.
```javascript
formData.append('post', 'Post'); // Critical fix
```

### Problem 2: PHP Returning HTML Instead of JSON
**Solution**: Added output buffering to prevent any HTML output before JSON response.
```php
ob_start(); // At the beginning
ob_clean(); // Before AJAX handling
```

### Problem 3: AJAX Detection Not Working
**Solution**: Implemented dual detection method:
```php
if ((!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
    strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') || 
    isset($_POST['ajax_request'])) {
```

### Problem 4: File Uploads Not Working with AJAX
**Solution**: Used FormData API which automatically handles file inputs:
```javascript
const formData = new FormData(postForm); // Includes files automatically
```

## 🧪 Testing Checklist

- [ ] Form submits without page reload
- [ ] File uploads work correctly
- [ ] Large files are rejected with proper error message
- [ ] Invalid file types are rejected
- [ ] Success message appears after submission
- [ ] Form clears after successful submission
- [ ] Timeline updates with new post
- [ ] Error handling works for network issues
- [ ] Traditional form submission still works (fallback)

## 🚨 Common Pitfalls

1. **FormData doesn't include submit button**: Must manually add the `post` field
2. **HTML output before JSON**: Use output buffering to prevent mixed responses
3. **Missing AJAX detection**: Implement both header and POST field detection
4. **File validation**: Ensure both client and server-side validation
5. **Error handling**: Always provide user feedback for both success and failure

## 🔧 Dependencies

- **Native JavaScript**: Fetch API, FormData API
- **PHP**: File upload handling, JSON encoding
- **Server**: Proper MIME type support for JSON responses

## 📝 Notes

- This implementation maintains backward compatibility with traditional form submission
- File uploads are handled transparently through FormData API
- Output buffering ensures clean JSON responses
- Dual AJAX detection provides reliable request identification
- Error handling covers both client and server-side issues

## 🎉 Result

A fully functional AJAX post submission system that:
- ✅ Prevents page reload
- ✅ Supports file uploads
- ✅ Provides user feedback
- ✅ Updates UI dynamically
- ✅ Handles errors gracefully
- ✅ Maintains backward compatibility

---

*This implementation was successfully tested and deployed in the Social-Cuisiener-2025 project.*
