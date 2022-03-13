class EditPost {
  constructor() {
    this.events();
    this.inpFile = document.getElementById("inpFile"); 

     

  }

  events() {
    this.addPostHeaderImg();
    this.summerNoteInit();
    this.updatePost();

    // document.addEventListener("DOMContentLoaded", (event) => {

    //   console.log('====================================');
    //   console.log('yeah man damn');
    //   console.log('====================================');

    //   this.inpFile.addEventListener("DOMContentLoaded", () => {
    //     file = this.files[0];

    //     console.log("==================file==================");
    //     console.log(file);
    //     console.log("====================================");
    //   });
    // });

    

  }

  addPostHeaderImg() {
    let file;


    const inpFile = document.getElementById("inpFile");
    const previewContainer = document.getElementById("imgPreview");
    const previewImage = document.querySelector(".img-preview-image");
    const previewDefaultText = document.querySelector(".imgPreview-DefaultTxt");
    const inpFilepic = document.getElementById("inpFile").files;


    let prevPhoto = previewImage.getAttribute("src");

    if (previewImage.getAttribute("src") == "") {
      previewImage.setAttribute("src", null);
    } else {
      previewImage.style.display = "block";
      previewDefaultText.style.display = "none";
    }

    inpFile.addEventListener("change", function () {
       file = this.files[0];


      if (file) {
        const reader = new FileReader();

        console.log(file);

        previewDefaultText.style.display = "none";
        previewImage.style.display = "block";

        reader.addEventListener("load", function () {
          previewImage.setAttribute("src", this.result);

          //  getCroppedImage("src", this.result);
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

    Array.prototype.forEach.call(
      document.querySelectorAll(".file-upload-button"),
      function (button) {
        const hiddenInput = button.parentElement.querySelector(".inpFile");

        const label = button.parentElement.querySelector(".file-upload-label");

        if (imagePath !== "") {
          var defaultLabelText = imagePath;
        } else {
          var defaultLabelText = "No file selected";
        }
        

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

  updatePost() {
    const updateBtn = document.getElementById("updatePost");
    const headerImage = document.querySelector(".file-upload-label");
    const inpFile = document.getElementById("inpFile");
    const uploadRes = document.querySelector(".uploadRes");

  
    updateBtn.addEventListener("click", function (e) {
      e.preventDefault();

      var bodyFormData = new FormData();

      bodyFormData.append(
        "headline",
        document.getElementById("editpost_Headline").value
      );
      bodyFormData.append("body", document.getElementById("summernote").value);
      bodyFormData.append("userLoggedIn", userLoggedIn);
      bodyFormData.append("update_post", "update_post");
      bodyFormData.append("post_id", post_id);
      bodyFormData.append("headerImage", headerImage.innerHTML);


      /**
       * Detect whether user changed the header photo
       */
      if (inpFile.files[0]) {
        bodyFormData.append("file", inpFile.files[0]);
      } 

      axios({
        method: "post",
        url: "includes/form_handlers/edit_post_handler.php",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: bodyFormData,
      })
        .then((res) => showMsg(res.data))
        .catch((err) => console.error(err));

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
    });
  }

  summerNoteInit() {
    $("#summernote").summernote({
      height: 400,
    });
  }
}

export const editpost = new EditPost();
