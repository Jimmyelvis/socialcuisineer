class SettingPage {
  constructor() {
    this.events();
    this.settingsContain = document.querySelector(".settingsContain");
  }

  events() {
    setTimeout(() => {
      if (this.settingsContain) {
        this.addAvatarImg();
        this.addProfileHeaderImg();
        this.saveDetails();
        this.changePassword();
      }
    }, 0);
  }

  addAvatarImg() {
    let file;

    const avatarBtn = document.getElementById("myAvatarFile");
    const avatarPreview = document.querySelector(".avatarPreview");
    const avatarImage = document.getElementById("avatarImage");
    const cropperJsModal = document.querySelector(".cropperJsModal");
    const avatarCrop = document.getElementById("avatarCrop");
    const avatarCancelcrop = document.getElementById("avatarCancelcrop");
    const cropperJsModalClose = document.querySelector(
      ".cropperJsModal .modalContent .closeBtn"
    );
    const croppedAvatarImage = document.getElementById("croppedAvatarImage");
    const croppedAvatarPreview = document.querySelector(
      ".cropperJsModal .preview"
    );
    const uploadRes = document.querySelector(".uploadRes");

    avatarBtn.addEventListener("change", function () {
      file = this.files[0];

      if (file) {
        const reader = new FileReader();

        avatarPreview.style.display = "block";

        reader.addEventListener("load", function () {
          avatarPreview.setAttribute("src", this.result);

          getCroppedImage("src", this.result);
        });

        reader.readAsDataURL(file);
      } else {
        avatarPreview.style.display = "none";
        avatarPreview.setAttribute("src", null);
      }
    });

    function getCroppedImage(src, result) {
      let cropper;
      let canvas;

      croppedAvatarImage.setAttribute(src, result);

      cropperJsModal.classList.add("active");

      cropper = new Cropper(croppedAvatarImage, {
        // aspectRatio: 1,
        viewMode: 3,
        preview: croppedAvatarPreview,
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

            bodyFormData.append("changeAvatar", "changeAvatar");
            bodyFormData.append("profile_id", userLoggedIn);
            bodyFormData.append("image", blob, base64data);

            axios({
              method: "post",
              url: "includes/form_handlers/settings_handler.php",
              headers: {
                "Content-Type": "multipart/form-data",
              },
              data: bodyFormData,
            })
              .then((res) => {
                cropper.destroy();
                cropper = null;
                canvas = null;
                avatarPreview.setAttribute("src", base64data);
                console.log(res.data);
                showMsg(res.data);
                cropperJsModal.classList.remove("active");
                navbarAvatarImg.setAttribute("src", base64data);
                prevPhoto = base64data;
              })
              .catch((err) => console.error(err));
          };
        });
      });

      function showMsg(res) {
        uploadRes.innerHTML = res;
        uploadRes.style.display = "block";

        setTimeout(() => {
          uploadRes.style.opacity = 1;
          uploadRes.style.visibility = "visible";
        }, 600);

        setTimeout(() => {
          uploadRes.style.opacity = 0;
          uploadRes.style.visibility = "hidden";
        }, 5000);

        setTimeout(() => {
          uploadRes.style.display = "none";
        }, 6000);
      }

      avatarCancelcrop.addEventListener("click", function () {
        cropperJsModal.classList.remove("active");
        cropper.destroy();
        cropper = null;
        avatarPreview.setAttribute("src", prevPhoto);
      });
    }

    Array.prototype.forEach.call(
      document.querySelectorAll(".avatar"),
      function (button) {
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
      }
    );
  }

  addProfileHeaderImg() {
    let file;

    const inpFile = document.getElementById("inpFile");
    const previewContainer = document.getElementById("imgPreview");
    const previewImage = document.querySelector(".img-preview-image");
    const previewDefaultText = document.querySelector(".imgPreview-DefaultTxt");
    const croppedProfileImage = document.getElementById("croppedProfileImage");

    const cropperJsProfileHeaderModal = document.querySelector(
      ".cropperJsProfileHeaderModal"
    );
    const croppedProfileHeaderPreview = document.querySelector(
      ".cropperJsProfileHeaderModal .preview"
    );

    const profileHeaderCrop = document.getElementById("profileHeaderCrop");
    const profileHeaderCancelcrop = document.getElementById(
      "profileHeaderCancelcrop"
    );

    const uploadRes = document.querySelector(".uploadRes");

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

          getCroppedImage("src", this.result);
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

    function getCroppedImage(src, result) {
      let cropper;
      let canvas;

      croppedProfileImage.setAttribute(src, result);

      cropperJsProfileHeaderModal.classList.add("active");

      cropper = new Cropper(croppedProfileImage, {
        // aspectRatio: 1,
        viewMode: 3,
        preview: croppedProfileHeaderPreview,
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

            bodyFormData.append("changeProfileHeader", "changeProfileHeader");
            bodyFormData.append("profile_id", userLoggedIn);
            bodyFormData.append("inpFile", blob, base64data);

            axios({
              method: "post",
              url: "includes/form_handlers/settings_handler.php",
              headers: {
                "Content-Type": "multipart/form-data",
              },
              data: bodyFormData,
            })
              .then((res) => {
                cropper.destroy();
                cropper = null;
                canvas = null;
                previewImage.setAttribute("src", base64data);
                console.log(res.data);
                showMsg(res.data);
                cropperJsProfileHeaderModal.classList.remove("active");
                prevPhoto = base64data;

                console.log("==================prevPhoto-2==================");
                console.log(prevPhoto);
                console.log("====================================");
              })
              .catch((err) => console.error(err));
          };
        });
      });

      function showMsg(res) {
        uploadRes.innerHTML = res;
        uploadRes.style.display = "block";

        setTimeout(() => {
          uploadRes.style.opacity = 1;
          uploadRes.style.visibility = "visible";
        }, 600);

        setTimeout(() => {
          uploadRes.style.opacity = 0;
          uploadRes.style.visibility = "hidden";
        }, 5000);

        setTimeout(() => {
          uploadRes.style.display = "none";
        }, 6000);
      }

      profileHeaderCancelcrop.addEventListener("click", function () {
        cropperJsProfileHeaderModal.classList.remove("active");
        cropper.destroy();
        cropper = null;
        previewImage.setAttribute("src", prevPhoto);
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
  }

  saveDetails() {
    const saveDetails = document.getElementById("save_details");
    const responseDiv = document.querySelector(".response");
    const uploadAvatarBtn = document.querySelector(".uploadAvatarBtn");
    const uploadRes = document.querySelector(".uploadRes");
    const save_Password = document.getElementById("savePassword");


    saveDetails.addEventListener("click", function (e) {
      e.preventDefault();


      var bodyFormData = new FormData();

      bodyFormData.append(
        "first_name",
        document.getElementById("settings_input_firstname").value
      );
      bodyFormData.append(
        "last_name",
        document.getElementById("settings_input_lastname").value
      );
      bodyFormData.append(
        "email",
        document.getElementById("settings_input_email").value
      );
      bodyFormData.append(
        "city",
        document.getElementById("settings_input_city").value
      );
      bodyFormData.append(
        "state",
        document.getElementById("settings_input_state").value
      );
      bodyFormData.append(
        "fav_food",
        document.getElementById("settings_input_food").value
      );
      bodyFormData.append("userLoggedIn", userLoggedIn);

      bodyFormData.append("update_details", "update_details");

      function showresponse(res) {
        responseDiv.innerHTML = res;
        responseDiv.style.display = "block";

        setTimeout(() => {
          responseDiv.style.opacity = 1;
          responseDiv.style.visibility = "visible";
        }, 600);

        setTimeout(() => {
          responseDiv.style.opacity = 0;
          responseDiv.style.visibility = "hidden";
        }, 5000);

        setTimeout(() => {
          responseDiv.style.display = "none";
        }, 6000);
      }

      axios({
        method: "post",
        url: "includes/form_handlers/settings_handler.php",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: bodyFormData,
      })
        .then((res) => showresponse(res.data))
        .catch((err) => console.error(err));
    });
  }

  changePassword() {
    const changePassword = document.getElementById("changePassword");
    const save_Password = document.getElementById("savePassword");
    const responseDiv = document.querySelector(".response");



     savePassword.addEventListener("click", function (e) {
       e.preventDefault();

       var bodyFormData = new FormData();

       bodyFormData.append(
         "old_password",
         document.getElementById("settings_input_old_password").value
       );
       bodyFormData.append(
         "new_password_1",
         document.getElementById("settings_input_new_password").value
       );
       bodyFormData.append(
         "new_password_2",
         document.getElementById("settings_input_new_password_again").value
       );
       bodyFormData.append("userLoggedIn", userLoggedIn);

       bodyFormData.append("update_password", "update_password");

       axios({
         method: "post",
         url: "includes/form_handlers/settings_handler.php",
         headers: {
           "Content-Type": "multipart/form-data",
         },
         data: bodyFormData,
       })
         .then((res) => showresponse(res.data))
         .catch((err) => console.error(err));

       function showresponse(res) {
         responseDiv.innerHTML = res;
         responseDiv.style.display = "block";

         setTimeout(() => {
           responseDiv.style.opacity = 1;
           responseDiv.style.visibility = "visible";
         }, 600);

         setTimeout(() => {
           responseDiv.style.opacity = 0;
           responseDiv.style.visibility = "hidden";
         }, 5000);

         setTimeout(() => {
           responseDiv.style.display = "none";
         }, 6000);
       }
     });

  }
}

export const settingspage = new SettingPage();

