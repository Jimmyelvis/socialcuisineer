export default class FriendRequests {

  constructor() {
    this.events()
    this.requestsDiv = document.querySelector(".requests");

  }
  

  events() {
    setTimeout(() => {
      if (this.requestsDiv) {
        this.friendsResponse()
      }
    }, 0);
  }

  friendsResponse() {
    const requestResponseHeader = document.querySelector(
      ".requests .response "
    );
    const unreadRequests = document.getElementById("unread_requests");

    /**
     * Place a click event on the parent div that contains all the
     * friend requests. Then delegate that event down to friend request
     * divs
     */
    this.requestsDiv.addEventListener("click", function (e) {

      /**
       * TODO: Break out into separate functions
       */
      
      if (e.target.classList.contains("acceptButton")) {
        e.preventDefault();

        /**
         * The friends-request.php form handler will look to for isset($_POST['accept_request'])
         * the name attribute value  on the acceptButton contains
         * (name='accept_request-$user_from') so we need to split them up
         * at the "-" and send as two separate variables to the back end.
         */
        let uname = e.target.attributes["name"].value;
        let unameSplit = uname.split("-");

        /**
         * The Entry Div thats contains all the info of the user
         * that sent the friend request. Such as avatar, name etc.
         */
        let greatgrandParent =
          e.target.parentElement.parentElement.parentElement;

        var bodyFormData = new FormData();

        bodyFormData.append("accept_request", unameSplit[0]);
        bodyFormData.append("user_from", unameSplit[1]);
        bodyFormData.append("userLoggedIn", userLoggedIn);

        axios({
          method: "post",
          url: "includes/form_handlers/friends_Requests.php",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: bodyFormData,
        })
          .then((res) => {
            greatgrandParent.remove();
            showresponse(res.data);
   
          })
          .catch((err) => console.error(err));

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
      }

      if (e.target.classList.contains("ignoreButton")) {
        e.preventDefault();

        /**
         * The same process as above with the acceptbutton
         */
        let uname = e.target.attributes["name"].value;
        let unameSplit = uname.split("-");

        let greatgrandParent =
          e.target.parentElement.parentElement.parentElement;

        var bodyFormData = new FormData();

        bodyFormData.append("ignore_request", unameSplit[0]);
        bodyFormData.append("user_from", unameSplit[1]);
        bodyFormData.append("userLoggedIn", userLoggedIn);

        axios({
          method: "post",
          url: "includes/form_handlers/friends_Requests.php",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: bodyFormData,
        })
          .then((res) => {
            greatgrandParent.remove();
            showresponse(res.data);
            console.log(res.data);
          })
          .catch((err) => console.error(err));

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
      }
    });
  }
};
