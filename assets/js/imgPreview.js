class ImgPreview {

  constructor() {

    this.inpFile = document.getElementById("inpFile");
    this.avatarBtn = document.getElementById('myAvatarFile');
    this.avatarPreview = document.querySelector('.avatarPreview');
    this.previewContainer = document.getElementById("imgPreview");
    this.previewImage = document.querySelector('.img-preview-image');
    this.previewDefaultText = document.querySelector('.imgPreview-DefaultTxt');

    this.events();

  }

  events() {
    
    this.inpFile.addEventListener("change", function () {
      const file = this.files[0];

      if (file) {

        const reader = new FileReader();

        this.previewDefaultText.style.display = "none";
        this.previewImage.style.display = "block";

        reader.addEventListener("load", function () {
          this.previewImage.setAttribute("src", this.result)
        })

        reader.readAsDataURL(file)

      } else {
        this.previewDefaultText.style.display = "block";
        this.previewImage.style.display = "none";
        this.previewImage.setAttribute("src", null)
      }
    })

    this.avatarBtn.addEventListener("change", function () {
      const file = this.files[0];

      console.log('yeah man');

      if (file) {

        const reader = new FileReader();

        this.avatarPreview.style.display = "block";

        reader.addEventListener("load", function () {
          console.log(this.result);
          this.avatarPreview.setAttribute("src", this.result)
        })

        reader.readAsDataURL(file)

      } else {
        this.avatarPreview.style.display = "none";
        this.avatarPreview.setAttribute("src", null)
      }
    })

  }




}

export default ImgPreview;