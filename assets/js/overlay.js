class Overlay {

  constructor() {

    this.openButton = document.querySelector('.addPostBtn');
    this.closeButton = document.querySelector('.closeOverlay');
    this.overlay = document.querySelector('.modalOverlay');

    // Make sure the event listeners gets added to the page right away
    this.events();
  }

   // 2. events
  events() {
    this.openButton.addEventListener('click', () => this.openOverlay());
    this.closeButton.addEventListener('click', () => this.closeOverlay());
    
  }

  openOverlay() {
    this.overlay.classList.add("modalOverlay--active");

    // adds css property overflow:hidden
    document.body.classList.add("body-no-scroll");

  }

  closeOverlay() {
    this.overlay.classList.remove("modalOverlay--active");
    document.body.classList.remove("body-no-scroll");
  }




}

export default Overlay;
