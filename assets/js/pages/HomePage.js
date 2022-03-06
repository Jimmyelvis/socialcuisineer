import axios from "axios";


class Homepage {
  constructor() {
    this.events();
    this.highLights = document.querySelector(".highLights");
    this.summerNote = document.getElementById("summernote");
    this.inProgress = false;

    this.indexBtns = document.querySelector(".indexBtns");

    /**
     * Add an event listener for the window object to detect
     * a scroll event
     *  */
    document.addEventListener("scroll", () => {
      if (this.indexBtns) {
        this.scrollView();
      }
    });
  }

  events() {
    this.loadPosts();
    this.LoadhighLights();
    this.summerNoteInit();
    this.addPost();
    this.indexTabs();
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
        this.inProgress = false;
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

  addPost() {
    const inpFile = document.getElementById("inpFile");
    const previewContainer = document.getElementById("imgPreview");
    const previewImage = document.querySelector(".img-preview-image");
    const previewDefaultText = document.querySelector(".imgPreview-DefaultTxt");

    Array.prototype.forEach.call(
      document.querySelectorAll(".file-upload-button"),
      function (button) {
        const hiddenInput = button.parentElement.querySelector(".inpFile");

        const label = button.parentElement.querySelector(".file-upload-label");
        const defaultLabelText = "No file selected";

        // Set default text for label
        label.textContent = defaultLabelText;
        label.title = defaultLabelText;

        button.addEventListener("click", function () {
          hiddenInput.click();
        });

        hiddenInput.addEventListener("change", function () {
          const filenameList = Array.prototype.map.call(
            hiddenInput.files,
            function (file) {
              return file.name;
            }
          );

          label.textContent = filenameList.join(", ") || defaultLabelText;
          label.title = label.textContent;
        });
      }
    );

    let prevPhoto = previewImage.getAttribute("src");

    if (previewImage.getAttribute("src") == "") {
      previewImage.setAttribute("src", null);
    } else {
      previewImage.style.display = "block";
      previewDefaultText.style.display = "none";
    }

    inpFile.addEventListener("change", function () {
      const file = this.files[0];

      if (file) {
        const reader = new FileReader();

        previewDefaultText.style.display = "none";
        previewImage.style.display = "block";

        reader.addEventListener("load", function () {
          previewImage.setAttribute("src", this.result);

          getCroppedImage("src", this.result);
        });

        reader.readAsDataURL(file);
      } else {
        previewDefaultText.style.display = "block";
        previewImage.style.display = "none";

        if (previewImage.getAttribute("src") == "") {
          previewImage.setAttribute("src", null);
        }
      }
    });
  }
}

export const homepage = new Homepage();
