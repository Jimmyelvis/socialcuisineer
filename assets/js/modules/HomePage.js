class Homepage {
  constructor() {
    this.events();
    this.highLights = document.querySelector(".highLights");
    this.summerNote = document.getElementById("summernote");

    this.indexBtns = document.querySelector(".indexBtns");
    this.inProgress = false;

    /**
     * Add an event listener for the window object to detect
     * a scroll event
     *  */
    document.addEventListener("scroll", () => {
      this.scrollView();
    });
  }

  events() {
    setTimeout(() => {
      if (this.indexBtns) {
        this.loadPosts();
        this.LoadhighLights();
        this.summerNoteInit();
        this.indexTabs();
      }
    }, 0);
  }

  indexTabs() {
    const tabIndex = document.querySelectorAll(".tabIndex");
    const btnTrends = document.getElementById("btnTrends");
    const btnAddPosts = document.getElementById("btnAddPosts");
    const btnTimeline = document.getElementById("btnTimeline");
    const tabTimeline = document.querySelector(".tabTimeline");
    const tabAddPosts = document.querySelector(".tabAddPosts");
    const tabTrends = document.querySelector(".tabTrends");

    hideNonstartingTabsIndex();

    let indextabslinks = [btnTimeline, btnAddPosts, btnTrends];
    let indextabs = [tabTimeline, tabAddPosts, tabTrends];

    indextabslinks.forEach((item, idx) => {
      item.addEventListener("click", () => {
        hideAllTabs();

        // item.classList.add('active')

        setTimeout(() => {
          indextabs[idx].style.display = null;
          // tabIndex.style.minHeight = indextabs[idx].offsetHeight;

          setTimeout(() => {
            indextabs[idx].classList.add("show");
          }, 600);
        }, 500);
      });
    });

    function hideAllTabs() {
      indextabs.forEach((indextab) => {
        indextab.classList.remove("show");

        setTimeout(() => {
          indextab.style.display = "none";
        }, 400);
      });
    }

    function hideNonstartingTabsIndex() {
      if (tabAddPosts && tabTrends) {
        tabAddPosts.style.display = "none";
        tabTrends.style.display = "none";
      }
    }
  }

  loadPosts() {
    if (this.inProgress) {
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
      url: "includes/handlers/ajax_load_posts.php",
      type: "POST",
      data: "page=" + page + "&userLoggedIn=" + userLoggedIn,
      cache: false,

      success: function (response) {
        $(".posts_area").find(".nextPage").remove(); //Removes current .nextpage
        $(".posts_area").find(".noMorePosts").remove(); //Removes current .nextpage
        $(".posts_area").find(".noMorePostsText").remove(); //Removes current .nextpage

        $("#loading").hide();
        $(".posts_area").append(response);
      },
    });
  }

  LoadhighLights() {
    axios({
      method: "post",
      url: "includes/handlers/ajax_load_highlight_posts.php",
      data: "&userLoggedIn=" + userLoggedIn,
    }).then((res) => {
      if (this.highLights) {
        this.highLights.innerHTML = res.data;
      }
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
        console.log('nooooooooooooooooooooooooooooooooo');
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

  summerNoteInit() {
    $("#summernote").summernote({
      height: 400,
      placeholder: "write here...",
    });
  }
}

export default Homepage;
