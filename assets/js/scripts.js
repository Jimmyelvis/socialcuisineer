// Login Page
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const loginBox = document.querySelector('.loginBox');
const signInSubmit = document.getElementById('signInSubmit');
const signUpSubmit = document.getElementById('signUpSubmit');
const signupErrorsSide = document.querySelector('.signupErrorsSide');
const signupErrors = document.querySelector('.signupErrors');
const closeSignupErrors = document.querySelector('.closeSignupErrors');
const signinErrorsSide = document.querySelector('.signinErrorsSide');
const signinErrors = document.querySelector('.signinErrors');
const closeSigninErrors = document.querySelector('.closeSigninErrors');
const signInresponse = document.querySelector('.signInresponse');
const signUpMobile = document.getElementById('signUpMobile');
const signInMobile = document.getElementById('signInMobile');
const signUpSubmitMobile = document.getElementById('signUpSubmitMobile');
const signInSubmitMobile = document.getElementById('signInSubmitMobile');
const welcomeFormMobile = document.getElementById('welcomeFormMobile');
const signupformMobile = document.getElementById('signupformMobile');
const signinformMobile = document.getElementById('signinformMobile');
const signUpCancel = document.getElementById('signUpCancel');
const signInCancel = document.getElementById('signInCancel');







const navbarAvatarImg = document.getElementById("navbarAvatarImg");
const body = document.querySelector('body')

// Profile Header Preview And Upload
const inpFile = document.getElementById("inpFile")
const previewContainer = document.getElementById("imgPreview")
const previewImage = document.querySelector(".img-preview-image")
const previewDefaultText = document.querySelector(".imgPreview-DefaultTxt")
const croppedProfileImage = document.getElementById('croppedProfileImage');


// Avatar Button And Upload
const avatarBtn = document.getElementById('myAvatarFile');
const avatarPreview = document.querySelector('.avatarPreview');
const avatarImage = document.getElementById('avatarImage');
const cropperJsModal = document.querySelector('.cropperJsModal')
const cropperJsModalClose = document.querySelector('.cropperJsModal .modalContent .closeBtn')


// Cropping Modal
const croppedAvatarImage = document.getElementById('croppedAvatarImage');
const croppedAvatarPreview = document.querySelector('.cropperJsModal .preview');
const cropperJsProfileHeaderModal = document.querySelector(".cropperJsProfileHeaderModal");
const croppedProfileHeaderPreview = document.querySelector('.cropperJsProfileHeaderModal .preview');
const avatarCrop = document.getElementById('avatarCrop');
const avatarCancelcrop = document.getElementById('avatarCancelcrop');
const profileHeaderCrop = document.getElementById('profileHeaderCrop');
const profileHeaderCancelcrop = document.getElementById('profileHeaderCancelcrop');
const uploadRes = document.querySelector('.uploadRes');

// Save Details
const saveDetails = document.getElementById('save_details');
const responseDiv = document.querySelector('.response');
const uploadAvatarBtn = document.querySelector('.uploadAvatarBtn');

// Change Password
const changePassword = document.getElementById('changePassword');
const savePassword = document.getElementById('savePassword');

// Friends Requests alerts
const friendsRequestsDesktop = document.querySelector(".friendsRequestsDesktop")
const sideContent = document.querySelector(".friendsRequestsDesktop .content")

if (sideContent) {
  // let sideContentInside = sideContent.children
  // let sideContentInsideArray = Array.from(sideContentInside)
}

const overlay = document.querySelectorAll(".overlay")
const friendsRquBtn = document.getElementById("friendsRquBtn")
const sideContentClose = document.querySelectorAll(".closeBtn")

// Notifications alerts
const notificationsDesktop = document.querySelector(".notificationsDesktop")
const notificationsBtn = document.getElementById("notificationsBtn")
const notifyContent = document.querySelector(".notificationsDesktop .content")

if (notifyContent) {
  // let notifyContentInside = notifyContent.children
  // let notifyContentInsideArray = Array.from(notifyContentInside)
}


// Messages alerts
const messagesDesktop = document.querySelector(".messagesDesktop")
const messagesBtn = document.getElementById("messagesBtn")
const messagesContent = document.querySelector(".messagesDesktop .content")

if (messagesContent) {
  // let messagesContentInside = messagesContent.children
  // let messagesContentInsideArray = Array.from(messagesContentInside)
}


// Tabs
const contents = document.querySelectorAll('.tab')
const listItems = document.querySelectorAll('.linkTab')
const tabContent = document.querySelector('.tabContent');
const startingTab = document.querySelector('.posts_area');
const tabAbout = document.querySelector('.tab-about');
const tabMessages = document.querySelector('.tab-messages');
const tabfriends = document.querySelector('.tab-friends');

// Index Page
const indexBtns = document.querySelector('.indexBtns');
const tabIndex = document.querySelectorAll('.tabIndex');
const btnTrends = document.getElementById('btnTrends');
const btnAddPosts = document.getElementById('btnAddPosts');
const btnTimeline = document.getElementById('btnTimeline');
const tabTimeline = document.querySelector('.tabTimeline');
const tabAddPosts = document.querySelector('.tabAddPosts');
const tabTrends = document.querySelector('.tabTrends');

// Post-Detail Page
const likedBy = document.querySelector('.likedby')
const likeByNumberBtn = document.querySelector('.likeByNumber');
const moreLikesOverlay = document.querySelector('.moreLikesOverlay');
const closeLikesModal = document.querySelector('.closeModal');
const likesModalOverlay = document.querySelector('.likesModalOverlay');
const moreLikesContent = document.querySelector('.moreLikesContent');
const likes = document.querySelector('.likes');

// Parallax
const scroll = document.querySelector('.scroll');

// Friends Requests
const requestsDiv = document.querySelector('.requests');
const requestResponseHeader = document.querySelector('.requests .response ');
const unreadRequests = document.getElementById('unread_requests');

// Profile Header
const profileHeaderNav = document.getElementById('profileHeaderNav');
const firstOptions = document.querySelector('.firstOptions');
const secondOptions = document.querySelector('.secondOptions');
const etc = document.querySelectorAll('.etc');
let addFriend = document.getElementById('addFriend');
const removeFriend = document.getElementById('removeFriend');


if (loginBox) {
  signUpButton.addEventListener('click', () => {
    loginBox.classList.add("right-panel-active");
  });

  signInButton.addEventListener('click', () => {
    loginBox.classList.remove("right-panel-active");
  });

  signUpSubmit.addEventListener("click", function (e) {
    e.preventDefault()

    signupErrors.innerHTML = "";

    var bodyFormData = new FormData();

    bodyFormData.append('reg_fname', document.getElementById('regFname').value);
    bodyFormData.append('reg_lname', document.getElementById('regLname').value);
    bodyFormData.append('reg_email', document.getElementById('regEmail').value);
    bodyFormData.append('reg_email2', document.getElementById('regEmail2').value);
    bodyFormData.append('reg_password', document.getElementById('regPassword').value);
    bodyFormData.append('reg_password2', document.getElementById('regPassword2').value);
    bodyFormData.append('register_button', 'register_button');

     axios({
        method: 'post',
        url: 'includes/form_handlers/register_handler.php',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: bodyFormData
      })
      .then(res => showSignIn(res.data))
      .catch(err => console.error(err));

      function showSignIn(res) {
       
        if (res.errors) {
   

            let errArray = res.errors;

            errArray.forEach(err => {
              const li = document.createElement('li');
              li.className = 'errItem';
              li.appendChild(document.createTextNode(err));
              signupErrors.appendChild(li);
            });

            signupErrorsSide.style.display = 'flex';
            setTimeout(() => {
              signupErrorsSide.style.opacity = 0.94;
            }, 300);

        } else {

          /**
           * TODO: Clear form on successful submition, which means I will have to paste back in all the session form values that I removed.
           */

          loginBox.classList.remove("right-panel-active");
          signInresponse.innerHTML = res;

        }
        
      }


  })

  closeSignupErrors.addEventListener("click", function () {
    signupErrorsSide.style.opacity = 0;
    setTimeout(() => {
      signupErrorsSide.style.display = null;
    }, 300);
  })

  signInSubmit.addEventListener("click", function (e) {
    e.preventDefault();

    signinErrors.innerHTML = "";


    var bodyFormData = new FormData();


    bodyFormData.append('login_button', 'login_button');
    bodyFormData.append('log_email', document.getElementById('logEmail').value);
    bodyFormData.append('log_password', document.getElementById('logPass').value);

     axios({
        method: 'post',
        url: 'includes/form_handlers/login_handler.php',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: bodyFormData
      })
      .then(res => {
        showSignIn(res.data)
        console.log(res.data)
      
      })
      .catch(err => console.error(err));

       function showSignIn(res) {
       
        if (res.errors) {
     

            let errArray = res.errors;
         
            errArray.forEach(err => {
              const li = document.createElement('li');
              li.className = 'errItem';
              li.appendChild(document.createTextNode(err));
              signinErrors.appendChild(li);
            });

            signinErrorsSide.style.display = 'flex';
            setTimeout(() => {
              signinErrorsSide.style.opacity = 0.94;
            }, 300);

        } else {
          window.location.href = 'index.php';
        }
        
      }

  })

  closeSigninErrors.addEventListener("click", function () {
    signinErrorsSide.style.opacity = 0;
    setTimeout(() => {
      signinErrorsSide.style.display = null;
    }, 300);
  })

  signUpMobile.addEventListener("click", function () {

    welcomeFormMobile.style.opacity=0;

    setTimeout(() => {
      welcomeFormMobile.style.display='none'
      signupformMobile.style.display='flex'

      setTimeout(() => {
        signupformMobile.style.opacity=1;
      }, 800);

    }, 300);

  })

  signInMobile.addEventListener("click", function () {

    welcomeFormMobile.style.opacity=0;

    setTimeout(() => {
      welcomeFormMobile.style.display='none'
      signinformMobile.style.display='flex'

      setTimeout(() => {
        signinformMobile.style.opacity=1;
      }, 800);

    }, 300);

  })

  signUpCancel.addEventListener("click", function (e) {
    e.preventDefault();

    signupformMobile.style.opacity=0;

    setTimeout(() => {
      signupformMobile.style.display='none'
      welcomeFormMobile.style.display='flex'

      setTimeout(() => {
        welcomeFormMobile.style.opacity=1;
      }, 800);
      
    }, 300);
  })

  signInCancel.addEventListener("click", function (e) {
    e.preventDefault();

    signinformMobile.style.opacity=0;

    setTimeout(() => {
      signinformMobile.style.display='none'
      welcomeFormMobile.style.display='flex'

      setTimeout(() => {
        welcomeFormMobile.style.opacity=1;
      }, 800);
      
    }, 300);
  })

  signUpSubmitMobile.addEventListener("click", function (e) {
    e.preventDefault()

    document.querySelector('.f_name').innerHTML = "";
    document.querySelector('.l_name').innerHTML = "";
    document.querySelector('.email_orig').innerHTML = "";
    document.querySelector('.email_con').innerHTML = "";
    document.querySelector('.pass_orig').innerHTML = "";
    document.querySelector('.pass_con').innerHTML = "";

    var bodyFormData = new FormData();

    bodyFormData.append('reg_fname', document.getElementById('regFnameMobile').value);
    bodyFormData.append('reg_lname', document.getElementById('regLnameMobile').value);
    bodyFormData.append('reg_email', document.getElementById('regEmailMobile').value);
    bodyFormData.append('reg_email2', document.getElementById('regEmail2Mobile').value);
    bodyFormData.append('reg_password', document.getElementById('regPasswordMobile').value);
    bodyFormData.append('reg_password2', document.getElementById('regPassword2Mobile').value);
    bodyFormData.append('register_button', 'register_button');

     axios({
        method: 'post',
        url: 'includes/form_handlers/register_handler_mobile.php',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: bodyFormData
      })
      .then(res => {
        showSignIn(res.data)

        let { data } = res;

        
        if (data.errors) {

          if (data.errors.find(elem => elem.includes("First Name: "))) {
            firstname = data.errors.find(elem => elem.includes("First Name: "))
            firstname = firstname.replace("First Name: ", "")
            document.querySelector('.f_name').innerHTML = firstname;
          }

          if (data.errors.find(elem => elem.includes("Last Name: "))) {
            lastname = data.errors.find(elem => elem.includes("Last Name: "))
            lastname = lastname.replace("Last Name: ", "")
            document.querySelector('.l_name').innerHTML = lastname;
          }

          if (data.errors.find(elem => elem.includes("Email: "))) {
            email = data.errors.find(elem => elem.includes("Email: "))
            email = email.replace("Email: ", "")
            document.querySelector('.email_orig').innerHTML = email;
            document.querySelector('.email_con').innerHTML = email;
          }

          if (data.errors.find(elem => elem.includes("Password: "))) {
            pass = data.errors.find(elem => elem.includes("Password: "))
            pass = pass.replace("Password: ", "")
            document.querySelector('.pass_orig').innerHTML = pass;
            document.querySelector('.pass_con').innerHTML = pass;
          }

        }


      

      
      })
      .catch(err => console.error(err));

      function showSignIn(res) {
       
          signupformMobile.style.opacity=0

          setTimeout(() => {
            signupformMobile.style.display=null;
                signinformMobile.style.display="flex";

              setTimeout(() => {
                document.querySelector('.signInresponseMobile').innerHTML = res;
                signinformMobile.style.opacity=1;
              }, 800);


          }, 300);
      }


  })

  signInSubmitMobile.addEventListener("click", function (e) {

    e.preventDefault()

  

      var bodyFormData = new FormData();

      bodyFormData.append('log_email', document.getElementById('logEmailMobile').value);
      bodyFormData.append('log_password', document.getElementById('logPassMobile').value);

      bodyFormData.append('login_button', 'login_button');

      axios({
        method: 'post',
        url: 'includes/form_handlers/login_handler_mobile.php',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: bodyFormData
      })
      .then(res => {
        if (res.data.errors) {

           const signInresponseMobile = document.querySelector('.signInresponseMobile');

           signInresponseMobile.innerHTML = res.data.errors;

            console.log('====================================');
            console.log(res.data.errors);
            console.log('====================================');

        } else {
          window.location.href = 'index.php';
        }
        
      })
  })
}



if (scroll) {
      window.addEventListener('scroll', function(e) {


    const target = document.querySelectorAll('.scroll');


    var index = 0,
      length = target.length;
    for (index; index < length; index++) {
      var pos = window.pageYOffset * target[index].dataset.rate;

      if (target[index].dataset.direction === 'vertical') {
        target[index].style.transform = 'translate3d(0px,' + pos + 'px, 0px)';
      } else {
        var posX = window.pageYOffset * target[index].dataset.ratex;
        var posY = window.pageYOffset * target[index].dataset.ratey;

        target[index].style.transform = 'translate3d(' + posX + 'px, ' + posY + 'px, 0px)';
      }
    }


  });


}



if (inpFile) {
  
  let prevPhoto = previewImage.getAttribute("src")

  console.log('==================prevPhoto==================');
  console.log(prevPhoto);
  console.log('====================================');

  if (previewImage.getAttribute("src") == "") {
      previewImage.setAttribute("src", null)
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
        previewImage.setAttribute("src", this.result)

        getCroppedImage("src", this.result)

      })

      reader.readAsDataURL(file)

    } else {
      previewDefaultText.style.display = "block";
      previewImage.style.display = "none";

      if (previewImage.getAttribute("src") == "") {
      previewImage.setAttribute("src", null)
      }
    }
  })

   function getCroppedImage(src, result) {

    let cropper;
    let canvas;

     croppedProfileImage.setAttribute(src, result)
        
        cropperJsProfileHeaderModal.classList.add('active');
        
        cropper = new Cropper(croppedProfileImage, {
            // aspectRatio: 1,
            viewMode: 3,
            preview: croppedProfileHeaderPreview
        });

        profileHeaderCrop.addEventListener("click", function (e) {
          e.preventDefault();

          canvas = cropper.getCroppedCanvas({
            width: 2000,
            height: 700,
        });

          canvas.toBlob(function (blob) {
            src = URL.createObjectURL(blob);
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
              let base64data = reader.result;

              var bodyFormData = new FormData();

              bodyFormData.append('changeProfileHeader', 'changeProfileHeader');
              bodyFormData.append('profile_id', userLoggedIn);
              bodyFormData.append('inpFile', blob, base64data);

              
              axios({
                  method: 'post',
                  url: 'includes/form_handlers/settings_handler.php',
                  headers: {
                    "Content-Type": "multipart/form-data"
                  },
                  data: bodyFormData
                })
                .then(res => {
                  cropper.destroy();
                  cropper = null;
                  canvas = null;
                  previewImage.setAttribute("src", base64data)
                  console.log(res.data)
                  showMsg(res.data)
                  cropperJsProfileHeaderModal.classList.remove('active');
                  prevPhoto = base64data;

                    console.log('==================prevPhoto-2==================');
                    console.log(prevPhoto);
                    console.log('====================================');

                })
                .catch(err => console.error(err));
            }

          })
        })

        function showMsg(res) {
          uploadRes.innerHTML = res;
          uploadRes.style.display = 'block'

          setTimeout(() => {
            uploadRes.style.opacity = 1;
            uploadRes.style.visibility = 'visible'
          }, 600);

          setTimeout(() => {
            uploadRes.style.opacity = 0;
            uploadRes.style.visibility = 'hidden'
          }, 5000);

          setTimeout(() => {
            uploadRes.style.display = 'none'
          }, 6000);

        }

        profileHeaderCancelcrop.addEventListener("click", function () {
          cropperJsProfileHeaderModal.classList.remove('active');
          cropper.destroy();
          cropper = null;
          previewImage.setAttribute("src", prevPhoto)
       })
  }
}


if (avatarBtn) {

  let file;
  

  avatarBtn.addEventListener("change", function () {
    file = this.files[0];

    if (file) {

      const reader = new FileReader();

      avatarPreview.style.display = "block";

      reader.addEventListener("load", function () {

        
        avatarPreview.setAttribute("src", this.result)

        getCroppedImage("src", this.result)

      })

      reader.readAsDataURL(file)

    } else {
      avatarPreview.style.display = "none";
      avatarPreview.setAttribute("src", null)
    }
  })

  function getCroppedImage(src, result) {

    let cropper;
    let canvas;

     croppedAvatarImage.setAttribute(src, result)

        cropperJsModal.classList.add('active');
        
        cropper = new Cropper(croppedAvatarImage, {
            // aspectRatio: 1,
            viewMode: 3,
            preview: croppedAvatarPreview
        });

        avatarCrop.addEventListener("click", function () {

          canvas = cropper.getCroppedCanvas({
            width: 512,
            height: 512,
        });

          canvas.toBlob(function (blob) {
            src = URL.createObjectURL(blob);
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
              let base64data = reader.result;

              var bodyFormData = new FormData();

              bodyFormData.append('changeAvatar', 'changeAvatar');
              bodyFormData.append('profile_id', userLoggedIn);
              bodyFormData.append('image', blob, base64data);

              
              axios({
                  method: 'post',
                  url: 'includes/form_handlers/settings_handler.php',
                  headers: {
                    "Content-Type": "multipart/form-data"
                  },
                  data: bodyFormData
                })
                .then(res => {
                  cropper.destroy();
                  cropper = null;
                  canvas = null;
                  avatarPreview.setAttribute("src", base64data)
                  console.log(res.data)
                  showMsg(res.data)
                  cropperJsModal.classList.remove('active');
                  navbarAvatarImg.setAttribute("src", base64data);
                  prevPhoto = base64data;


                })
                .catch(err => console.error(err));
            }

          })
        })

        function showMsg(res) {
          uploadRes.innerHTML = res;
          uploadRes.style.display = 'block'

          setTimeout(() => {
            uploadRes.style.opacity = 1;
            uploadRes.style.visibility = 'visible'
          }, 600);

          setTimeout(() => {
            uploadRes.style.opacity = 0;
            uploadRes.style.visibility = 'hidden'
          }, 5000);

          setTimeout(() => {
            uploadRes.style.display = 'none'
          }, 6000);

        }

       avatarCancelcrop.addEventListener("click", function () {
          cropperJsModal.classList.remove('active');
          cropper.destroy();
          cropper = null;
          avatarPreview.setAttribute("src", prevPhoto)
       })
  }


}

if (saveDetails) {

  saveDetails.addEventListener("click", function(e) {
    e.preventDefault();


    var bodyFormData = new FormData();

    bodyFormData.append('first_name', document.getElementById('settings_input_firstname').value);
    bodyFormData.append('last_name', document.getElementById('settings_input_lastname').value);
    bodyFormData.append('email', document.getElementById('settings_input_email').value);
    bodyFormData.append('city', document.getElementById('settings_input_city').value);
    bodyFormData.append('state', document.getElementById('settings_input_state').value);
    bodyFormData.append('fav_food', document.getElementById('settings_input_food').value);
    bodyFormData.append('userLoggedIn', userLoggedIn);

    bodyFormData.append('update_details', 'update_details');

    function showresponse(res) {
      responseDiv.innerHTML = res;
      responseDiv.style.display = 'block'

      setTimeout(() => {
        responseDiv.style.opacity = 1;
        responseDiv.style.visibility = 'visible'
      }, 600);

      setTimeout(() => {
        responseDiv.style.opacity = 0;
        responseDiv.style.visibility = 'hidden'
      }, 5000);

      setTimeout(() => {
        responseDiv.style.display = 'none'
      }, 6000);

    }



    axios({
        method: 'post',
        url: 'includes/form_handlers/settings_handler.php',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: bodyFormData
      })
      .then(res => showresponse(res.data))
      .catch(err => console.error(err));


  })

}

Array.prototype.forEach.call(document.querySelectorAll(".file-upload-button"), function (button) {

  const hiddenInput = button.parentElement.querySelector(
    ".inpFile"
  );

  const label = button.parentElement.querySelector(".file-upload-label");
  const defaultLabelText = "No file selected";

  // Set default text for label
  label.textContent = defaultLabelText;
  label.title = defaultLabelText;

  button.addEventListener("click", function () {
    hiddenInput.click();
  });

  hiddenInput.addEventListener("change", function () {
    const filenameList = Array.prototype.map.call(hiddenInput.files, function (
      file
    ) {
      return file.name;
    });

    label.textContent = filenameList.join(", ") || defaultLabelText;
    label.title = label.textContent;
  });
});


Array.prototype.forEach.call(document.querySelectorAll(".avatar"), function (button) {

  const hiddenInput = document.querySelector(".fileUploadInputAvatar");

  const label = document.querySelector(".fileUploadAvatarLabel");
  const defaultLabelText = "No file selected";

  if (label) {
    // Set default text for label
    label.textContent = defaultLabelText;
    label.title = defaultLabelText;
  }


  button.addEventListener("click", function () {
    hiddenInput.click();
  });

  if (hiddenInput) {

    hiddenInput.addEventListener("change", function () {
      const filenameList = Array.prototype.map.call(hiddenInput.files, function (file) {
        return file.name;
      });

      label.textContent = filenameList.join(", ") || defaultLabelText;
      label.title = label.textContent;
    });
  }

});

if (friendsRquBtn) {
  let sideContentInside = sideContent.children
  let sideContentInsideArray = Array.from(sideContentInside)

  friendsRquBtn.addEventListener("click", function () {


    friendsRequestsDesktop.style.display = "block";
    body.style.overflowY = "visible";


    window.setTimeout(() => {
      overlay.forEach(element => {
        element.style.opacity = 0.8;
      });
    }, 300)

    window.setTimeout(() => {
      sideContent.style.transform = "translateX(0%)";
    }, 1200)


    window.setTimeout(() => {
      sideContentInsideArray.forEach((elem) => {
        elem.style.opacity = 1;
      })
    }, 1800)

  })

  sideContentClose.forEach(element => {
    element.addEventListener("click", function () {

      sideContentInsideArray.forEach((elem) => {
        elem.style.opacity = null;
      })

      window.setTimeout(() => {
        sideContent.style.transform = null;
      }, 1200)

      window.setTimeout(() => {

        overlay.forEach(element => {
          element.style.opacity = null;
        });
      }, 1800)

      window.setTimeout(() => {
        friendsRequestsDesktop.style.display = null;
      }, 1900)

    })
  });

}

if (notificationsBtn) {

  let notifyContentInside = notifyContent.children
  let notifyContentInsideArray = Array.from(notifyContentInside)

  notificationsBtn.addEventListener("click", function () {


    notificationsDesktop.style.display = "block";
    body.style.overflowY = "visible";


    window.setTimeout(() => {

      overlay.forEach(element => {
        element.style.opacity = 0.8;
      });
    }, 300)

    window.setTimeout(() => {
      notifyContent.style.transform = "translateX(0%)";
    }, 1200)


    window.setTimeout(() => {
      notifyContentInsideArray.forEach((elem) => {
        elem.style.opacity = 1;
      })
    }, 1800)

  })

  sideContentClose.forEach(element => {

    element.addEventListener("click", function () {

      notifyContentInsideArray.forEach((elem) => {
        elem.style.opacity = null;
      })

      window.setTimeout(() => {
        notifyContent.style.transform = null;
      }, 1200)


      window.setTimeout(() => {

        overlay.forEach(element => {
          element.style.opacity = null;
        });
      }, 1800)

      window.setTimeout(() => {
        notificationsDesktop.style.display = null;
      }, 1900)
    })

  })


}


if (messagesBtn) {

  let messagesContentInside = messagesContent.children
  let messagesContentInsideArray = Array.from(messagesContentInside)
  
  messagesBtn.addEventListener("click", function () {


    messagesDesktop.style.display = "block";
    body.style.overflowY = "visible";


    window.setTimeout(() => {

      overlay.forEach(element => {
        element.style.opacity = 0.8;
      });
    }, 300)

    window.setTimeout(() => {
      messagesContent.style.transform = "translateX(0%)";
    }, 1200)


    window.setTimeout(() => {
      messagesContentInsideArray.forEach((elem) => {
        elem.style.opacity = 1;
      })
    }, 1800)

  })

  sideContentClose.forEach(element => {

    element.addEventListener("click", function () {

      messagesContentInsideArray.forEach((elem) => {
        elem.style.opacity = null;
      })

      window.setTimeout(() => {
        messagesContent.style.transform = null;
      }, 1200)


      window.setTimeout(() => {

        overlay.forEach(element => {
          element.style.opacity = null;
        });
      }, 1800)

      window.setTimeout(() => {
        messagesDesktop.style.display = null;
      }, 1900)
    })

  })


}

if (tabContent) {

  hideNonstartingTabs()

  listItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      hideAllContents()
      hideAllItems()

      item.classList.add('active')

      setTimeout(() => {
        contents[idx].style.display = null;
        tabContent.style.minHeight = contents[idx].offsetHeight;

        setTimeout(() => {
          contents[idx].classList.add('show')
        }, 600);

      }, 500);

    })
  })

  function hideAllContents() {

    contents.forEach((content) => {
      content.classList.remove('show')

      setTimeout(() => {
        content.style.display = "none";
      }, 400);

    })
  }


  function hideAllItems() {
    listItems.forEach(item => item.classList.remove('active'))
  }

  function hideNonstartingTabs() {
    tabAbout.style.display = "none";
    // tabMessages.style.display = "none";
    tabfriends.style.display = "none";

  }
}

/**
 * TODO: Make sure the IDs and classnames match and make sure the order 
 * matches in the array
 */

if (indexBtns) {

  hideNonstartingTabsIndex()

  let indextabslinks = [
    btnTimeline, btnAddPosts, btnTrends
  ]

  let indextabs = [
    tabTimeline, tabAddPosts, tabTrends
  ]

  if (indextabslinks) {

    indextabslinks.forEach((item, idx) => {
      item.addEventListener('click', () => {

        hideAllTabs()

        // item.classList.add('active')

        setTimeout(() => {
          indextabs[idx].style.display = null;
          // tabIndex.style.minHeight = indextabs[idx].offsetHeight;

          setTimeout(() => {
            indextabs[idx].classList.add('show')
          }, 600);

        }, 500);

      })
    })

  }


  function hideAllTabs() {

    indextabs.forEach((indextab) => {
      indextab.classList.remove('show')

      setTimeout(() => {
        indextab.style.display = "none";
      }, 400);

    })
  }

  function hideNonstartingTabsIndex() {

    if (tabAddPosts && tabTrends) {
      tabAddPosts.style.display = "none";
      tabTrends.style.display = "none";
    }
  }

}

if (likedBy) {



  likedBy.addEventListener("click", function (e) {

    if (e.target.classList.contains('likeByNumber')) {

      axios({
          method: 'get',
          url: 'includes/handlers/ajax_get_all_likes.php',
          params: {
            post_id: post_id,
            userLoggedIn: userLoggedIn
          }
        })
        .then(res => showOutput(res.data))
        .catch(err => console.error(err));

      moreLikesOverlay.classList.add('active');
      // body.style.overflow="hidden";

      window.setTimeout(() => {
        likesModalOverlay.style.opacity = 0.8;
      }, 300)

      window.setTimeout(() => {
        moreLikesContent.style.opacity = 1;
      }, 1200)
    }

  })

  function showOutput(res) {

    likes.innerHTML = res;

  }

  closeLikesModal.addEventListener("click", function () {

    moreLikesContent.style.opacity = null;

    window.setTimeout(() => {
      likesModalOverlay.style.opacity = null;
    }, 800)

    window.setTimeout(() => {
      moreLikesOverlay.classList.remove('active');
    }, 1200)

    // body.style.overflow=null;
  })

  likesModalOverlay.addEventListener("click", function () {

    moreLikesContent.style.opacity = null;

    window.setTimeout(() => {
      likesModalOverlay.style.opacity = null;
    }, 800)

    window.setTimeout(() => {
      moreLikesOverlay.classList.remove('active');
    }, 1200)

    // body.style.overflow=null;
  })



}

if (changePassword) {

  savePassword.addEventListener("click", function (e) {
    e.preventDefault();

        var bodyFormData = new FormData();

        bodyFormData.append('old_password',  document.getElementById('settings_input_old_password').value);
        bodyFormData.append('new_password_1',  document.getElementById('settings_input_new_password').value);
        bodyFormData.append('new_password_2',  document.getElementById('settings_input_new_password_again').value);
        bodyFormData.append('userLoggedIn', userLoggedIn);


        bodyFormData.append('update_password', 'update_password');

         axios({
             method: 'post',
             url: 'includes/form_handlers/settings_handler.php',
             headers: {
               "Content-Type": "multipart/form-data"
             },
             data: bodyFormData
           })
           .then(res => showresponse(res.data))
           .catch(err => console.error(err));

           function showresponse(res) {
            responseDiv.innerHTML = res;
            responseDiv.style.display = 'block'

            setTimeout(() => {
              responseDiv.style.opacity = 1;
              responseDiv.style.visibility = 'visible'
            }, 600);

            setTimeout(() => {
              responseDiv.style.opacity = 0;
              responseDiv.style.visibility = 'hidden'
            }, 5000);

            setTimeout(() => {
              responseDiv.style.display = 'none'
            }, 6000);

          }


  })
}

if (requestsDiv) {

  requestsDiv.addEventListener("click", function (e) {
    
    if (e.target.classList.contains('acceptButton')) {
      e.preventDefault();

      let uname = e.target.attributes["name"].value;
      let unameSplit = uname.split("-");

      let greatgrandParent = e.target.parentElement.parentElement.parentElement;

    
      var bodyFormData = new FormData();
  
  
      bodyFormData.append('accept_request', unameSplit[0])
      bodyFormData.append('user_from', unameSplit[1])
      bodyFormData.append('userLoggedIn', userLoggedIn);


      
 
  
       axios({
          method: 'post',
          url: 'includes/form_handlers/friends_Requests.php',
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: bodyFormData
        })
        .then(res => {
          greatgrandParent.remove();
         showresponse(res.data)
          console.log(res.data)
          console.log('=================unreadRequests===================');
          console.log(unreadRequests.innerText);
          console.log('====================================');
        })
        .catch(err => console.error(err));

         function showresponse(res) {
            requestResponseHeader.innerHTML = res;
            requestResponseHeader.style.display = 'block'

            setTimeout(() => {
              requestResponseHeader.style.opacity = 1;
              requestResponseHeader.style.visibility = 'visible'
            }, 600);

            setTimeout(() => {
              requestResponseHeader.style.opacity = 0;
              requestResponseHeader.style.visibility = 'hidden'
            }, 5000);

            setTimeout(() => {
              requestResponseHeader.style.display = 'none'
            }, 6000);

          }
      
    }

    if(e.target.classList.contains('ignoreButton')) {
        e.preventDefault();

        let uname = e.target.attributes["name"].value;
        let unameSplit = uname.split("-");

        let greatgrandParent = e.target.parentElement.parentElement.parentElement;

        var bodyFormData = new FormData();
  
  
        bodyFormData.append('ignore_request', unameSplit[0])
        bodyFormData.append('user_from', unameSplit[1])
        bodyFormData.append('userLoggedIn', userLoggedIn);

        
  
       axios({
          method: 'post',
          url: 'includes/form_handlers/friends_Requests.php',
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: bodyFormData
        })
        .then(res => {
          greatgrandParent.remove();
         showresponse(res.data)
          console.log(res.data)
        })
        .catch(err => console.error(err));

         function showresponse(res) {
            requestResponseHeader.innerHTML = res;
            requestResponseHeader.style.display = 'block'

            setTimeout(() => {
              requestResponseHeader.style.opacity = 1;
              requestResponseHeader.style.visibility = 'visible'
            }, 600);

            setTimeout(() => {
              requestResponseHeader.style.opacity = 0;
              requestResponseHeader.style.visibility = 'hidden'
            }, 5000);

            setTimeout(() => {
              requestResponseHeader.style.display = 'none'
            }, 6000);

          }


    }


  })


  
}

if (profileHeaderNav) {

  profileHeaderNav.addEventListener("click", function (e) {
    if (!e.target.matches('.etc')) return

    let options = [ firstOptions, secondOptions]

    options.forEach(option => {
      option.classList.contains('active') ? option.classList.remove('active') :
      option.classList.add('active')
    })
    
  })

  if (addFriend) {
    
    addFriend.addEventListener("click", function (e) {
      e.preventDefault();
  
       var bodyFormData = new FormData();
    
    
        bodyFormData.append('add_friend', 'add_friend')
        bodyFormData.append('user_to', profileUsername)
        bodyFormData.append('user_from', userLoggedIn)
  
  
        axios({
            method: 'post',
            url: 'includes/handlers/send_requests.php',
            headers: {
              "Content-Type": "multipart/form-data"
            },
            data: bodyFormData
          })
          .then(res => {
            addFriend.value = "Request Sent";
            addFriend.disabled = true;
            console.log(res.data)
          })
          .catch(err => console.error(err));
  
  
    })
  
  }

  if (removeFriend) {
    
    removeFriend.addEventListener("click", function (e) {
      e.preventDefault();
  
       var bodyFormData = new FormData();
    
    
        bodyFormData.append('remove_friend', 'remove_friend')
        bodyFormData.append('user_to', profileUsername)
        bodyFormData.append('user_from', userLoggedIn)
  
  
        axios({
            method: 'post',
            url: 'includes/handlers/send_requests.php',
            headers: {
              "Content-Type": "multipart/form-data"
            },
            data: bodyFormData
          })
          .then(res => {
            removeFriend.value = "Friend Removed";
            removeFriend.disabled = true;
  
          })
          .catch(err => console.error(err));
  
  
    })
 
  }


  
  
}
