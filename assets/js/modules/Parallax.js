export default class Parallax {
  constructor() {
    this.scroll = document.querySelector(".scroll");

    /**
     * Add an event listener for the window object to detect
     * a scroll event
     *  */
    document.addEventListener("scroll", (e) => {
      setTimeout(() => {
        if (this.scroll) {
          this.addParallaxScrolling(e);
        }
      }, 0);
    });
  }


  addParallaxScrolling(e) {
    const target = document.querySelectorAll(".scroll");

    var index = 0,
      length = target.length;
    for (index; index < length; index++) {
      var pos = window.pageYOffset * target[index].dataset.rate;

      if (target[index].dataset.direction === "vertical") {
        target[index].style.transform = "translate3d(0px," + pos + "px, 0px)";
      } else {
        var posX = window.pageYOffset * target[index].dataset.ratex;
        var posY = window.pageYOffset * target[index].dataset.ratey;

        target[index].style.transform =
          "translate3d(" + posX + "px, " + posY + "px, 0px)";
      }
    }
  }
}
