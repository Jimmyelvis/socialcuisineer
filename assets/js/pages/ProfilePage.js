import { parallax } from "../modules/Parallax";
import { RecipeCard } from "../components/recipieCard";
import Confirm from "../modules/Confirm";

class ProfilePage {
  constructor() {
    this.events();
    this.inProgress = false;
    this.profileHeaderNav = document.getElementById("profileHeaderNav");
    this.tabContent = document.querySelector(".tabContent");

    this.nextPageValue = null;
    this.morePosts = true;
    this.moreFriends = true;
    this.activeTab = "timeline";
    // this.startAt = 5;

    /**
     * Add an event listener for the window object to detect
     * a scroll event
     *  */

    document.addEventListener("scroll", () => {
      this.scrollView();
    });
  }

  events() {
    this.loadPosts();
    this.accessExtraMenuItems();
    this.profileTabsAccess();
    this.deletePost();
    this.tabActions();
    // this.confirming();
  }

  hydrateFriends() {

    const moreFriendsContainer = document.querySelector(".moreFriendsContainer");

    const friendsContainer = document.querySelector("#friendsContainer");

    console.log("friendsContainer:", friendsContainer);

    if (this.inProgress === true) {
      return;
    }

    this.inProgress = true;

    let page = this.nextPageValue ? this.nextPageValue : 1;

    console.log("Fetching friends for page:", page);

    fetch("includes/handlers/ajax_getUsers_friends.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userLoggedIn,
        profileUsername,
        page,
        startAt: 5,
        limit: 10,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log("Fetched friends data:", data);

          data.data.friend_array.forEach((friend) => {
            console.log("Loading friend:", friend);
            const friendElement = this.createFriendEntry(friend);
            friendsContainer.appendChild(friendElement);
          });

          if (data.data.has_more === true) {
            this.nextPageValue = data.data.next_page;
            this.moreFriends = true;
          } else {
            this.moreFriends = false;
          }
        } else {
          console.error("Error loading friends:", data.message);
          this.moreFriends = false;
        }
      })
      .catch((error) => {
        console.error("Error loading friends:", error);
      })
      .finally(() => {
        this.inProgress = false;
      });
  }

  createFriendEntry(friend) {

    console.log("Creating friend entry for:", friend);

    const entry = document.createElement("div");
    entry.className = "entry";
    entry.innerHTML = `
      <a href="${friend.username}">
        <img src="${friend.profile_pic}" alt="${friend.name} ${friend.last_name}">
        <h4 class="heading-4">${friend.name}</h4>
      </a>
    `;
    return entry;
  }

  loadPosts() {
    if (this.inProgress === true) {
      //If it is already in the process of loading some posts, just return

      return;
    }

    this.inProgress = true;

    // $("#loading").show();

    //If .nextPage couldn't be found, it must not be on the page yet (it must be the first time loading posts), so use the value '1'

    // let nextPageValue;

    let page = this.nextPageValue ? this.nextPageValue : 1;

    fetch("includes/handlers/ajax_load_profile_posts.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page,
        userLoggedIn,
        profileUsername,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          const postsArea = document.querySelector(".posts_area");
          const nextPage = postsArea.querySelector(".nextPage");
          const noMorePosts = postsArea.querySelector(".noMorePosts");
          const loading = postsArea.querySelector(".loading");

          // if (nextPage) nextPage.remove();
          // if (noMorePosts) noMorePosts.remove();
          // if (loading) loading.style.display = 'none';

          data.data.posts.forEach((post) => {
            const postElement = RecipeCard({ post });

            postsArea.appendChild(postElement);
          });

          if (data.data.has_more === true) {
            this.nextPageValue = data.data.next_page;
            this.morePosts = true;
          } else {
            this.morePosts = false;
          }
        } else {
          this.morePosts = false;
          console.error("Error loading posts:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error loading posts:", error);
      })
      .finally(() => {
        this.inProgress = false;
      });
  }

  scrollView() {

    console.log({
      "next page": this.nextPageValue,
      "more posts": this.morePosts,
      "in progress": this.inProgress,
      "more friends": this.moreFriends
    });
    

    if (document.querySelector(".posts_area") && this.activeTab === "timeline") {
      let loading = document.querySelector(".loading");
      let recipecards = document.querySelectorAll(".recipe-card");
      let recipecardArr = Array.from(recipecards);

      // isElementInViewport uses getBoundingClientRect(), which requires the HTML DOM object check if the last element is in view

      if (this.isElementInView(recipecardArr[recipecardArr.length - 1]) && this.morePosts === true) {
        loading.classList.add("active");

        this.loadPosts();
      } else {
        loading.classList.remove("active");
        loading.innerHTML = "";
      }
    } else if (this.activeTab === "friends") {
      let loading = document.querySelector(".loading");
      let friendEntries = document.querySelectorAll(".entry");
      let friendEntryArr = Array.from(friendEntries);

      // console.log("Friend entries:", friendEntryArr);
      // console.log("this.moreFriends:", this.moreFriends);

      if (this.isElementInView(friendEntryArr[friendEntryArr.length - 1]) && this.moreFriends === true) {
        console.log("Last friend entry is in view. Loading more friends...");

        loading.classList.add("active");

        this.hydrateFriends();
      } else {
        loading.classList.remove("active");
        loading.innerHTML = "";
      }
    }
  }

  isElementInView(el) {
    if (el == null) {
      return;
    }

    var rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && //* or $(window).height()
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) //* or $(window).width()
    );
  }

  accessExtraMenuItems() {
    /**
     * Gives access to extra menu items when the ... is clicked
     */

    const firstOptions = document.querySelector(".firstOptions");
    const secondOptions = document.querySelector(".secondOptions");
    const etc = document.querySelectorAll(".etc");
    const profileHeaderNav = document.getElementById("profileHeaderNav");

    profileHeaderNav.addEventListener("click", function (e) {
      if (!e.target.matches(".etc")) return;

      let options = [firstOptions, secondOptions];

      options.forEach((option) => {
        option.classList.contains("active") ? option.classList.remove("active") : option.classList.add("active");
      });
    });
  }

  profileTabsAccess() {
    /**
     * Gives access to tabs items such as timeline, about, friends
     */
    const contents = document.querySelectorAll(".tab");
    const listItems = document.querySelectorAll(".linkTab");
    const startingTab = document.querySelector(".posts_area");
    const tabAbout = document.querySelector(".tab-about");
    const tabMessages = document.querySelector(".tab-messages");
    const tabfriends = document.querySelector(".tab-friends");

    hideNonstartingTabs();

    listItems.forEach((item, idx) => {
      item.addEventListener("click", () => {
        hideAllContents();
        hideAllItems();

        item.classList.add("active");

        setTimeout(() => {
          contents[idx].style.display = null;
          this.tabContent.style.minHeight = contents[idx].offsetHeight;

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
    }
  }

  deletePost() {
    let bodyFormData = new FormData();

    /**
     * Get the parent element to add the click event on
     * use event delegation
     */
    let postsArea = document.querySelector(".posts_area");

    postsArea.addEventListener("click", function (e) {
      if (e.target.parentElement.classList.contains("card-closeBtn")) {
        let currentPost = e.target.parentElement.parentElement.getAttribute("data-postid");

        bodyFormData.append("post_id", currentPost);
        bodyFormData.append("userLoggedIn", userLoggedIn);
        bodyFormData.append("delete_post", "delete_post");

        Confirm.open({
          title: "Confirm Delete",
          message: "Are you sure you want to delete this post?",
          okText: "Sure",
          cancelText: "No",
          onok: () => {
            fetch("includes/form_handlers/delete_post.php", {
              method: "POST",
              body: bodyFormData,
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.status === "success") {
                  e.target.parentElement.parentElement.remove();
                } else {
                  console.error("Error deleting post:", data.message);
                }
              })
              .catch((error) => console.error("Error:", error));
          },
          oncancel: () => console.log("You pressed cancel"),
        });
      }
    });
  }

  tabActions() {
    const timelineTab = document.getElementById("timelineTab");
    const aboutTab = document.getElementById("aboutTab");
    const friendsTab = document.getElementById("friendsTab");

    timelineTab.addEventListener("click", () => {
      // this.hydrateTimeline()
      this.activeTab = "timeline";

      console.log("Active tab is: " + this.activeTab);
    });

    friendsTab.addEventListener("click", () => {
      this.hydrateFriends();
      this.activeTab = "friends";

      console.log("Active tab is: " + this.activeTab);
    });

    aboutTab.addEventListener("click", () => {
      this.activeTab = "about";

      console.log("Active tab is: " + this.activeTab);
    });

    console.log("Active tab is: " + this.activeTab);
  }
}

export const lprofile = new ProfilePage();
