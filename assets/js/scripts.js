const navbarAvatarImg = document.getElementById("navbarAvatarImg");
const body = document.querySelector("body");

// const inpFile = document.getElementById("inpFile");
// const previewContainer = document.getElementById("imgPreview");
// const previewImage = document.querySelector(".img-preview-image");
// const previewDefaultText = document.querySelector(".imgPreview-DefaultTxt");

// /**
//  * TODO Place this in its own class file, or in the homepage class file
//  */

// if (inpFile) {

//   Array.prototype.forEach.call(
//     document.querySelectorAll(".file-upload-button"),
//     function (button) {
//       const hiddenInput = button.parentElement.querySelector(".inpFile");
  
//       const label = button.parentElement.querySelector(".file-upload-label");
//       const defaultLabelText = "No file selected";
  
//       // Set default text for label
//       label.textContent = defaultLabelText;
//       label.title = defaultLabelText;
  
//       button.addEventListener("click", function () {
//         hiddenInput.click();
//       });
  
//       hiddenInput.addEventListener("change", function () {
//         const filenameList = Array.prototype.map.call(
//           hiddenInput.files,
//           function (file) {
//             return file.name;
//           }
//         );
  
//         label.textContent = filenameList.join(", ") || defaultLabelText;
//         label.title = label.textContent;
//       });
//     }
//   );

//   let prevPhoto = previewImage.getAttribute("src");

//   console.log("==================prevPhoto==================");
//   console.log(prevPhoto);
//   console.log("====================================");

//   if (previewImage.getAttribute("src") == "") {
//     previewImage.setAttribute("src", null);
//   } else {
//     previewImage.style.display = "block";
//     previewDefaultText.style.display = "none";
//   }

//   inpFile.addEventListener("change", function () {
//     const file = this.files[0];

//     if (file) {
//       const reader = new FileReader();

//       previewDefaultText.style.display = "none";
//       previewImage.style.display = "block";

//       reader.addEventListener("load", function () {
//         previewImage.setAttribute("src", this.result);

//         getCroppedImage("src", this.result);
//       });

//       reader.readAsDataURL(file);
//     } else {
//       previewDefaultText.style.display = "block";
//       previewImage.style.display = "none";

//       if (previewImage.getAttribute("src") == "") {
//         previewImage.setAttribute("src", null);
//       }
//     }
//   });


// }
