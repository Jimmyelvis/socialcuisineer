export const createFriendEntry = (friend) => {

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

