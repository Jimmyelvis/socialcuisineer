export default class RemoveFriend {
  
  constructor() {
    this.events()
    this.removeFriend = document.getElementById("removeFriend");

  }

  events() {

    setTimeout(() => {
      
      if (this.removeFriend) {
        this.remove_friend()
      }
    }, 0);
  }

  remove_friend() {

    let removeFriend = this.removeFriend

    removeFriend.addEventListener("click", function (e) {
      e.preventDefault();

      var bodyFormData = new FormData();

      bodyFormData.append("remove_friend", "remove_friend");
      bodyFormData.append("user_to", profileUsername);
      bodyFormData.append("user_from", userLoggedIn);

      axios({
        method: "post",
        url: "includes/handlers/send_requests.php",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: bodyFormData,
      })
        .then((res) => {
          removeFriend.value = "Friend Removed";
          removeFriend.disabled = true;
        })
        .catch((err) => console.error(err));
    });
  }
};
