export const profileTabsAccess = () => {
    /**
     * Gives access to tabs items such as timeline, about, friends
     */
    const contents = document.querySelectorAll(".tab");
    const listItems = document.querySelectorAll(".linkTab");
    const startingTab = document.querySelector(".posts_area");
    const tabAbout = document.querySelector(".tab-about");
    const tabMessages = document.querySelector(".tab-messages");
    const tabfriends = document.querySelector(".tab-friends");
    const tabContent = document.querySelector(".tabContent");
    const tabFriendRequests = document.querySelector(".tabfriend-requests");


    hideNonstartingTabs();

    listItems.forEach((item, idx) => {
      item.addEventListener("click", () => {
        hideAllContents();
        hideAllItems();

        item.classList.add("active");

        setTimeout(() => {
          contents[idx].style.display = null;
          tabContent.style.minHeight = contents[idx].offsetHeight;

          setTimeout(() => {
            contents[idx].classList.add("show");
          }, 600);
        }, 500);
      });
    });

    function hideAllContents() {
      contents.forEach((content) => {
        content.classList.remove("show");

        setTimeout(() => {
          content.style.display = "none";
        }, 400);
      });
    }

    function hideAllItems() {
      listItems.forEach((item) => item.classList.remove("active"));
    }

    function hideNonstartingTabs() {
      tabAbout.style.display = "none";
      // tabMessages.style.display = "none";
      tabfriends.style.display = "none";
      tabFriendRequests.style.display = "none";
    }
  }