import { parallax } from "../modules/Parallax";
import { RecipeCard } from "../components/recipieCard";
import Confirm from "../modules/Confirm";
import { createFriendEntry } from "./profilepage/createFriendEntry";
import { createFriendReqEntry } from "./profilepage/createFriendReqEntry";
import { isElementInView } from "../modules/isElementInView";
import { accessExtraMenuItems } from "./profilepage/accessExtraMenuItems";
import { profileTabsAccess } from "./profilepage/profileTabsAccess";

class ProfilePage {
  constructor() {
    this.events();
    this.inProgress = false;
    this.profileHeaderNav = document.getElementById("profileHeaderNav");
    this.tabContent = document.querySelector(".tabContent");
    this.processFriendRequest();


    this.nextPageValue = null;
    this.morePosts = true;
    this.moreFriends = true;
    this.activeTab = "timeline";

    document.addEventListener("scroll", () => {
      this.scrollView();
    });
  }

  events() {
    accessExtraMenuItems();
    profileTabsAccess();
    this.processFriendRequest();
    this.loadPosts();
    this.deletePost();
    this.tabActions();
    // this.confirming();
  }

  hydrateFriends() {


    const friendsContainer = document.querySelector("#friendsContainer");


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
        startAt: 10,
        limit: 10,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log("Fetched friends data:", data);

          data.data.friend_array.forEach((friend) => {
            console.log("Loading friend:", friend);
            const friendElement = createFriendEntry(friend);
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

    if (document.querySelector(".posts_area") && this.activeTab === "timeline") {
      let loading = document.querySelector(".loading");
      let recipecards = document.querySelectorAll(".recipe-card");
      let recipecardArr = Array.from(recipecards);

      // isElementInViewport uses getBoundingClientRect(), which requires the HTML DOM object check if the last element is in view

      if (isElementInView(recipecardArr[recipecardArr.length - 1]) && this.morePosts === true) {
        loading.classList.add("active");

        console.log("Last recipe card is in view. Loading more posts...");

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

      if (isElementInView(friendEntryArr[friendEntryArr.length - 1]) && this.moreFriends === true) {
        console.log("Last friend entry is in view. Loading more friends...");

        loading.classList.add("active");

        this.hydrateFriends();
      } else {
        loading.classList.remove("active");
        loading.innerHTML = "";
      }
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
    const friendsRequestsTab = document.getElementById("friendsRequestsTab");
    const friendsRespondTab = document.getElementById("friendsRespondTab");

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

    /*
      This tab is only visible to the profile owner, So if we are on not on the logged in user's profile, the element will be null
    */
    if (friendsRequestsTab) {
      friendsRequestsTab.addEventListener("click", () => {
        this.getFriendRequests();
        this.activeTab = "friendsRequests";
  
        console.log("Active tab is: " + this.activeTab);
      });
    }


    /*
      This tab will only be visible if a logged in user is viewing another user's profile that has sent them a friend request
    */

    if (friendsRespondTab){

      friendsRespondTab.addEventListener("click", () => {
        this.getFriendRequestsFromUser(profileUsername);
        this.activeTab = "friendsRespond";
  
        console.log("Active tab is: " + this.activeTab);
      });
    }

    console.log("Active tab is: " + this.activeTab);
  }

  getFriendRequests() {
    // const requestsDiv = document.querySelector(".requests");
    // const unreadRequests = document.getElementById("unread_requests");

    fetch("includes/handlers/ajax_load_friendReqs.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user:userLoggedIn,
        profileUsername,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          const requestsDiv = document.querySelector("#friendRequestsContainer");

          console.log("Fetched friend requests:", data);

          // Clear loading state
          requestsDiv.innerHTML = "";

          // Populate friend requests
          data.requests.forEach((friend) => {
            const entry = createFriendReqEntry(friend);
            requestsDiv.appendChild(entry);
          });
        } else {
          console.error("Error fetching friend requests:", data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  getFriendRequestsFromUser(userFrom) {
    fetch("includes/handlers/ajax_load_friendReqs.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userFrom: userFrom,
        user:userLoggedIn,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          const requestsDiv = document.querySelector("#friendRequestsContainer");

          console.log("Fetched friend requests:", data);

          // Clear loading state
          requestsDiv.innerHTML = "";

          // Populate friend requests
          data.requests.forEach((friend) => {
            const entry = createFriendReqEntry(friend);
            requestsDiv.appendChild(entry);
          });
        } else {
          console.error("Error fetching friend requests:", data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  processFriendRequest(action, user_from, entryElement) {
    const friendRequestsContainer = document.querySelector("#friendRequestsContainer");
    const requestResponseHeader = document.querySelector(
      ".tabfriend-requests .response "
    );


    friendRequestsContainer.addEventListener("click", function (e) {

  

      if (e.target.classList.contains("acceptButton") || e.target.classList.contains("ignoreButton")) {
        e.preventDefault();

        let userRequestDiv = e.target.closest(".entry");
        let uname = e.target.attributes["name"].value;
        let unameSplit = uname.split("-");
        let bodyFormData = new FormData();

        if(e.target.classList.contains("acceptButton")) {
          bodyFormData.append("accept_request", unameSplit[0]);
          bodyFormData.append("user_from", unameSplit[1]);
          bodyFormData.append("userLoggedIn", userLoggedIn);
        } 

        else if(e.target.classList.contains("ignoreButton")) {
          bodyFormData.append("ignore_request", unameSplit[0]);
          bodyFormData.append("user_from", unameSplit[1]);
          bodyFormData.append("userLoggedIn", userLoggedIn);
        }

        fetch("includes/form_handlers/friends_Requests.php", {
          method: "POST",
          body: bodyFormData,
        })
          .then((response) => response.json())
          .then((data) => {
            userRequestDiv.remove();
            showresponse(data.message);
          
          })
          .catch((error) => console.error("Error:", error));    

      }

        function showresponse(res) {
          requestResponseHeader.innerHTML = res;
          requestResponseHeader.style.display = "block";

          setTimeout(() => {
            requestResponseHeader.style.opacity = 1;
            requestResponseHeader.style.visibility = "visible";
          }, 600);

          setTimeout(() => {
            requestResponseHeader.style.opacity = 0;
            requestResponseHeader.style.visibility = "hidden";
          }, 5000);

          setTimeout(() => {
            requestResponseHeader.style.display = "none";
          }, 6000);
        }
    });
  }



  
}

export const lprofile = new ProfilePage();
