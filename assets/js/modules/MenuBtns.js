export default class MenuBtns {
  
  constructor() {
    this.events()
    this.sidebarLeft = document.querySelector(".sidebarLeft");
  }

  events() {

    setTimeout(() => {

      if (this.sidebarLeft) {
        this.showNotifications()
        this.showFriendRequests()
      }
    }, 0);
  }

  showNotifications() {
    const notificationsDesktop = document.querySelector(".notificationsDesktop");
    const notificationsBtn = document.getElementById("notificationsBtn");
    const notifyContent = document.querySelector(".notificationsDesktop .content");
    const sideContentClose = document.querySelectorAll(".closeBtn");
    const overlay = document.querySelectorAll(".overlay");



    let notifyContentInside = notifyContent.children;
    let notifyContentInsideArray = Array.from(notifyContentInside);

    notificationsBtn.addEventListener("click", function () {
      notificationsDesktop.style.display = "block";
      body.style.overflowY = "visible";

      window.setTimeout(() => {
        overlay.forEach((element) => {
          element.style.opacity = 0.8;
        });
      }, 300);

      window.setTimeout(() => {
        notifyContent.style.transform = "translateX(0%)";
      }, 1200);

      window.setTimeout(() => {
        notifyContentInsideArray.forEach((elem) => {
          elem.style.opacity = 1;
        });
      }, 1800);
    });

    sideContentClose.forEach((element) => {
      element.addEventListener("click", function () {
        notifyContentInsideArray.forEach((elem) => {
          elem.style.opacity = null;
        });

        window.setTimeout(() => {
          notifyContent.style.transform = null;
        }, 1200);

        window.setTimeout(() => {
          overlay.forEach((element) => {
            element.style.opacity = null;
          });
        }, 1800);

        window.setTimeout(() => {
          notificationsDesktop.style.display = null;
        }, 1900);
      });
    });

  }

  showFriendRequests() {
    const friendsRquBtn = document.getElementById("friendsRquBtn");
    const friendsRequestsDesktop = document.querySelector(
      ".friendsRequestsDesktop"
    );
    const sideContent = document.querySelector(
      ".friendsRequestsDesktop .content"
    );

    const sideContentClose = document.querySelectorAll(".closeBtn");
    const overlay = document.querySelectorAll(".overlay");



     let sideContentInside = sideContent.children;
     let sideContentInsideArray = Array.from(sideContentInside);

     friendsRquBtn.addEventListener("click", function () {
       friendsRequestsDesktop.style.display = "block";
       body.style.overflowY = "visible";

       window.setTimeout(() => {
         overlay.forEach((element) => {
           element.style.opacity = 0.8;
         });
       }, 300);

       window.setTimeout(() => {
         sideContent.style.transform = "translateX(0%)";
       }, 1200);

       window.setTimeout(() => {
         sideContentInsideArray.forEach((elem) => {
           elem.style.opacity = 1;
         });
       }, 1800);
     });

     sideContentClose.forEach((element) => {
       element.addEventListener("click", function () {
         sideContentInsideArray.forEach((elem) => {
           elem.style.opacity = null;
         });

         window.setTimeout(() => {
           sideContent.style.transform = null;
         }, 1200);

         window.setTimeout(() => {
           overlay.forEach((element) => {
             element.style.opacity = null;
           });
         }, 1800);

         window.setTimeout(() => {
           friendsRequestsDesktop.style.display = null;
         }, 1900);
       });
     });

  }
};
