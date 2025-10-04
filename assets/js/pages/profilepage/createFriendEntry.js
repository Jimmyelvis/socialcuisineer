export const createFriendEntry = (friend) => {
  // console.log("Creating friend entry for:", friend);

  const { name, username, profile_pic, mutual_friends, mutual_friends_list } = friend;

  const entry = document.createElement("div");
  entry.className = "entry";
  entry.setAttribute("data-user-id", username);

  const link = document.createElement("a");
  link.href = username;

  entry.appendChild(link);
  const limit = 3;

  const calcMutualFriends = (mutual_friends) => {


    if (mutual_friends > limit) {
      return mutual_friends - limit;
    }
    return 0;
  };

  link.innerHTML = /*html*/ `

        <div class="main-avatar">
          <img src="${profile_pic}" alt="${name}'s avatar">
        </div>

        <div class="details">
            <h3 class="heading-3 friend-fullname">${name}</h3>
            <h4 class="heading-4 username">@${username}</h4>
           

            ${
              mutual_friends > 0
                ? /*html*/ `
                    <div class="mutual-friends-btn">
                        <div class="avatars-group">
    
                        ${mutual_friends_list
                          .slice(0, limit)
                          .map(
                            (friend) => `
                            <img src="${friend.avatar}" alt="${friend.user_fullname}'s avatar" class="avatar">
                        `
                          )
                          .join("")}
    
                        </div>
    
                        ${
                          mutual_friends > limit
                            ? /*html*/ `
                            <span class="more">
                                &amp; <span class="mutual_friends_number">
                                ${calcMutualFriends(mutual_friends)}
                                </span> 

                                ${mutual_friends > limit + 1 ? "more mutual friends" : "more mutual friend"}
                            </span>
                          `
                            : ""
                        }


                    </div>
                `
                : ""
            }

       
        </div>



      
    `;

  return entry;
};

// export const createFriendEntry = (friend) => {

//     console.log("Creating friend entry for:", friend);

//     const entry = document.createElement("div");
//     entry.className = "entry";
//     entry.innerHTML = `
//       <a href="${friend.username}">
//         <img src="${friend.profile_pic}" alt="${friend.name} ${friend.last_name}">
//         <h4 class="heading-4">${friend.name}</h4>
//       </a>
//     `;
//     return entry;
//   }
