import { parallax } from "../modules/Parallax";
import Confirm from "../modules/Confirm"

class ProfilePage {
  constructor() {
    this.events();
    this.inProgress = false;
    this.profileHeaderNav = document.getElementById("profileHeaderNav");
    this.tabContent = document.querySelector(".tabContent");

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
    // this.confirming();
  }

  loadPosts() {
    if (this.inProgress === true) {
      //If it is already in the process of loading some posts, just return

      return;
    }

    this.inProgress = true;

    // $("#loading").show();

    //If .nextPage couldn't be found, it must not be on the page yet (it must be the first time loading posts), so use the value '1'

    let nextPageValue = document
      .querySelector(".posts_area")
      .querySelector(".nextPage");

    let page = nextPageValue ? nextPageValue.value : 1;

    $.ajax({
      url: "includes/handlers/ajax_load_profile_posts.php",
      type: "POST",
      data:
        "page=" +
        page +
        "&userLoggedIn=" +
        userLoggedIn +
        "&profileUsername=" +
        profileUsername,
      cache: false,

      success: function (response) {
        $(".posts_area").find(".nextPage").remove(); //Removes current .nextpage
        $(".posts_area").find(".noMorePosts").remove(); //Removes current .nextpage
        $(".posts_area").find(".noMorePostsText").remove(); //Removes current .nextpage

        $("#loading").hide();
        $(".posts_area").append(response);

        this.inProgress = false;
      },
    });
  }

  scrollView() {
    if (document.querySelector(".posts_area")) {
      let noMorePosts = document
        .querySelector(".posts_area")
        .querySelector(".noMorePosts").value;

      let recipecards = document.querySelectorAll(".recipe-card");
      let recipecardArr = Array.from(recipecards);

      // isElementInViewport uses getBoundingClientRect(), which requires the HTML DOM object
      if (this.isElementInView(recipecardArr[0]) && noMorePosts == "false") {
        this.loadPosts();
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
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) && //* or $(window).height()
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
        option.classList.contains("active")
          ? option.classList.remove("active")
          : option.classList.add("active");
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
        let currentPost =
          e.target.parentElement.parentElement.getAttribute("data-postid");

        bodyFormData.append("post_id", currentPost);
        bodyFormData.append("userLoggedIn", userLoggedIn);
        bodyFormData.append("delete_post", "delete_post");

  
        Confirm.open({
          title: 'Confirm Delete',
          message: 'Are you sure you want to delete this post?',
          okText: "Sure",
          cancelText: "No",
          onok: () => {
            axios({
              method: "post",
              url: "includes/form_handlers/delete_post.php",
              headers: {
                "Content-Type": "multipart/form-data",
              },
              data: bodyFormData,
            })
              .then((res) => {
                console.log(res.data);
                e.target.parentElement.parentElement.remove();
              })
              .catch((err) => console.error(err));

          },
          oncancel: () => console.log('You pressed cancel')
        })

      }
    })



  }


}

export const lprofile = new ProfilePage();
