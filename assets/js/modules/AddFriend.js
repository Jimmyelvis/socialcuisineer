class AddFriend {
  
  constructor() {
    this.events()
  }

  events() {
    
    this.add_friend()

  }

  add_friend() {

    const addFriend = document.getElementById("addFriend");

    if (addFriend) {
      addFriend.addEventListener("click", function (e) {
        e.preventDefault();
  
        var bodyFormData = new FormData();
  
        bodyFormData.append("add_friend", "add_friend");
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
            addFriend.value = "Request Sent";
            addFriend.disabled = true;
          })
          .catch((err) => console.error(err));
      });
    }

   
  }
};

export const addfriend = new AddFriend();