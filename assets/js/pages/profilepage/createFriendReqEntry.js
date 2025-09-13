export const createFriendReqEntry = (friend) => {
  const { user_from, user_from_fullname, user_pic, mutual_friends, mutual_friends_list } = friend;

  console.log('====================================');
  console.log("friend:", friend);
  console.log('====================================');

  const calcMutualFriends = (mutual_friends) => {
    if (mutual_friends > 0) {
      return mutual_friends - 3;
    }
    return 0;
  };

  const entry = document.createElement("div");
  entry.classList.add("entry");
  entry.setAttribute("data-user-id", user_from);

  entry.innerHTML = /*html*/ `

        <div class="main-avatar">
          <img src="${user_pic}" alt="${user_from_fullname}'s avatar">
        </div>

        <div class="details">
            <h3 class="heading-3 friend-fullname">${user_from_fullname}</h3>
            <h4 class="heading-4 username">@${user_from}</h4>
            <p>Sent you a friend request</p>

           

            ${
              mutual_friends > 0
                ? /*html*/ `
                    <div class="mutual-friends-btn">
                        <div class="avatars-group">
    
                        ${mutual_friends_list
                        .slice(0, 3)
                        .map(
                            (friend) => `
                            <img src="${friend.avatar}" alt="${friend.user_fullname}'s avatar" class="avatar">
                        `
                        )
                        .join("")}
    
                        </div>
    
                        <span class="more">
                            &amp; <span class="mutual_friends_number">
                            ${calcMutualFriends(mutual_friends)}
                            </span> more mutual friends
                        </span>
                    </div>
                `
                : ""
            }

             <div class="btn-group">
                <button 
                  class="acceptButton btn btn-puprle"
                  name="accept_request-${user_from}">
                  Accept
                </button>
                <button 
                  class="ignoreButton btn btn-orange"
                  name="ignore_request-${user_from}">
                  Decline
               </button> 
            </div>
        </div>



      
    `;

  return entry;
};
