class Addpost {


  constructor() {
    this.openButton = document.querySelector('.addPostBtn');
    this.closeButton = document.querySelector('.closeOverlay');
    this.recipes = document.querySelector('.recipes');
    this.addPostsContain = document.querySelector('.addPostsContain');
    


    this.events();
  }

  events() {
    
    if (this.openButton || this.closeButton) {
      this.closeButton.addEventListener('click', () => this.closeOverlay());
      this.openButton.addEventListener('click', () => this.openOverlay());
    }

  }

   openOverlay() {
    this.recipes.style.display = "none";
    this.addPostsContain.style.display = "flex";
    this.openButton.style.display = "none";
  }

  closeOverlay() {
    this.recipes.style.display = "grid";
    this.addPostsContain.style.display = "none";
    this.openButton.style.display = "block";
  }


}

export default Addpost;