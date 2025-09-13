export const accessExtraMenuItems = () => {
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
      option.classList.contains("active") ? option.classList.remove("active") : option.classList.add("active");
    });
  });
};