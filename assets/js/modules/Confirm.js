const Confirm = {
  open(options) {
    /**
     * Default Options
     */
    options = Object.assign(
      {},
      {
        title: "",
        message: "",
        okText: "OK",
        cancelText: "Cancel",
        onok: function () {},
        oncancel: function () {},
      },
      options
    );

    /*html */
    const html = `
    <div class="confirm">
        <div class="confirmWindow">
            <div class="confirmTitlebar">
                <span class="confirmTitle">${options.title}</span>
                <button class="confirmBtnClose">&times;</button>
            </div>
            <div class="confirmContent">${options.message}</div>
            <div class="confirmButtons">
                <button class="btn confirmButtonOk btn-puprle">${options.okText}</button>
                <button class="btn confirmButtonCancel btn-orange">${options.cancelText}</button>
            </div>
        </div>
    </div>
    `;

    const template = document.createElement("template");
    template.innerHTML = html;

    /**
     * Use below to access the document fragment,
     * then we can get elements such as confirm and cancel
     * btns and add event listners to them
     */
    //  template.content

    // Elements
    const confirmBgOverlay = template.content.querySelector(".confirm");
    const confirmWindow = template.content.querySelector(".confirmWindow");
    const btnClose = template.content.querySelector(".confirmBtnClose");
    const btnOk = template.content.querySelector(".confirmButtonOk");
    const btnCancel = template.content.querySelector(
      ".confirmButtonCancel"
    );

    document.body.appendChild(template.content);

    confirmBgOverlay.addEventListener("click", (e) => {
      if (e.target === confirmBgOverlay) {
        options.oncancel();
        this._close(confirmBgOverlay, confirmWindow);
      }
    });

    btnOk.addEventListener("click", () => {
      options.onok();
      this._close(confirmBgOverlay, confirmWindow);
    });

    [btnCancel, btnClose].forEach((el) => {
      el.addEventListener("click", () => {
        options.oncancel();
        this._close(confirmBgOverlay, confirmWindow);
      });
    });

    console.log(template);

    // document.body.appendChild(template.content);
  },

  _close(confirmBgOverlay, confirmWindow) {
    confirmBgOverlay.classList.add("confirmCloseAnimation");
    // confirmWindow.classList.add("confirmCloseAnimation");

    /**
     * This get triggered when the animation ends
     */

    confirmBgOverlay.addEventListener("animationend", () => {
      confirmBgOverlay.classList.add("confirmCloseAnimation");
      document.body.removeChild(confirmBgOverlay);
    });
  },
};

export default Confirm;
