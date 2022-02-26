export default class Login {
  
  constructor() {
    this.events()
    this.loginBox = document.querySelector(".loginBox");

  }

  events() {

    setTimeout(() => {
      if (this.loginBox) {
        this.showSignUpForm()
        this.showSignUpMobileForm();
        this.showSignInForm()
        this.showSignInMobileForm()
        this.signUpAndSubmit()
        this.signUpAndSubmitMobile();
        this.signInAndSubmit()
        this.signInAndSubmitMobile();
        this.clearSignupErrors()
        this.clearSigninErrors()
        this.cancelSignUpMobile()
        this.cancelSignInMobile()
      }
    }, 0);

  }

  showSignUpForm() {
    const signUpButton = document.getElementById("signUp");

    signUpButton.addEventListener("click", () => {
      this.loginBox.classList.add("right-panel-active");
    });

  }

  showSignInForm() {
    const signInButton = document.getElementById("signIn");

    signInButton.addEventListener("click", () => {
      this.loginBox.classList.remove("right-panel-active");
    });
  }

  signUpAndSubmit() {
    const signUpSubmit = document.getElementById("signUpSubmit");
    const signupErrors = document.querySelector(".signupErrors");
    const signupErrorsSide = document.querySelector(".signupErrorsSide");
    const signInresponse = document.querySelector(".signInresponse");


      signUpSubmit.addEventListener("click", function (e) {
        e.preventDefault();

        signupErrors.innerHTML = "";

        var bodyFormData = new FormData();

        bodyFormData.append(
          "reg_fname",
          document.getElementById("regFname").value
        );
        bodyFormData.append(
          "reg_lname",
          document.getElementById("regLname").value
        );
        bodyFormData.append(
          "reg_email",
          document.getElementById("regEmail").value
        );
        bodyFormData.append(
          "reg_email2",
          document.getElementById("regEmail2").value
        );
        bodyFormData.append(
          "reg_password",
          document.getElementById("regPassword").value
        );
        bodyFormData.append(
          "reg_password2",
          document.getElementById("regPassword2").value
        );
        bodyFormData.append("register_button", "register_button");

        axios({
          method: "post",
          url: "includes/form_handlers/register_handler.php",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: bodyFormData,
        })
          .then((res) => showSignIn(res.data))
          .catch((err) => console.error(err));

        function showSignIn(res) {
          if (res.errors) {
            let errArray = res.errors;

            errArray.forEach((err) => {
              const li = document.createElement("li");
              li.className = "errItem";
              li.appendChild(document.createTextNode(err));
              signupErrors.appendChild(li);
            });

            signupErrorsSide.style.display = "flex";
            setTimeout(() => {
              signupErrorsSide.style.opacity = 0.94;
            }, 300);
          } else {
            /**
             * TODO: Clear form on successful submition, which means I will have to paste back in all the session form values that I removed.
             */

            loginBox.classList.remove("right-panel-active");
            signInresponse.innerHTML = res;
          }
        }
      });

  }

  signInAndSubmit() {
    const signInSubmit = document.getElementById("signInSubmit");
    const signinErrorsSide = document.querySelector(".signinErrorsSide");
    const signinErrors = document.querySelector(".signinErrors");

      signInSubmit.addEventListener("click", function (e) {
        e.preventDefault();

        signinErrors.innerHTML = "";

        var bodyFormData = new FormData();

        bodyFormData.append("login_button", "login_button");
        bodyFormData.append(
          "log_email",
          document.getElementById("logEmail").value
        );
        bodyFormData.append(
          "log_password",
          document.getElementById("logPass").value
        );

        axios({
          method: "post",
          url: "includes/form_handlers/login_handler.php",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: bodyFormData,
        })
          .then((res) => {
            showSignIn(res.data);
            console.log(res.data);
          })
          .catch((err) => console.error(err));

        function showSignIn(res) {
          if (res.errors) {
            let errArray = res.errors;

            errArray.forEach((err) => {
              const li = document.createElement("li");
              li.className = "errItem";
              li.appendChild(document.createTextNode(err));
              signinErrors.appendChild(li);
            });

            signinErrorsSide.style.display = "flex";
            setTimeout(() => {
              signinErrorsSide.style.opacity = 0.94;
            }, 300);
          } else {
            window.location.href = "index.php";
          }
        }
      });

  }

  clearSignupErrors() {
    const closeSignupErrors = document.querySelector(".closeSignupErrors");
    const signupErrorsSide = document.querySelector(".signupErrorsSide");

    closeSignupErrors.addEventListener("click", function () {
      signupErrorsSide.style.opacity = 0;
      setTimeout(() => {
        signupErrorsSide.style.display = null;
      }, 300);
    });

  }

  clearSigninErrors() {
    const closeSigninErrors = document.querySelector(".closeSigninErrors");
    const signinErrorsSide = document.querySelector(".signinErrorsSide");

    closeSigninErrors.addEventListener("click", function () {
      signinErrorsSide.style.opacity = 0;
      setTimeout(() => {
        signinErrorsSide.style.display = null;
      }, 300);
    });



  }

  showSignUpMobileForm() {
    const signUpMobile = document.getElementById("signUpMobile");
    const welcomeFormMobile = document.getElementById("welcomeFormMobile");
    const signupformMobile = document.getElementById("signupformMobile");

     signUpMobile.addEventListener("click", function () {
       welcomeFormMobile.style.opacity = 0;

       setTimeout(() => {
         welcomeFormMobile.style.display = "none";
         signupformMobile.style.display = "flex";

         setTimeout(() => {
           signupformMobile.style.opacity = 1;
         }, 800);
       }, 300);
     });

  }

  showSignInMobileForm() {
    const signInMobile = document.getElementById("signInMobile");
    const welcomeFormMobile = document.getElementById("welcomeFormMobile");
    const signinformMobile = document.getElementById("signinformMobile");


    signInMobile.addEventListener("click", function () {
      welcomeFormMobile.style.opacity = 0;

      setTimeout(() => {
        welcomeFormMobile.style.display = "none";
        signinformMobile.style.display = "flex";

        setTimeout(() => {
          signinformMobile.style.opacity = 1;
        }, 800);
      }, 300);
    });


  }

  cancelSignUpMobile() {
    const signUpCancel = document.getElementById("signUpCancel");
    const welcomeFormMobile = document.getElementById("welcomeFormMobile");
    const signupformMobile = document.getElementById("signupformMobile");

    signUpCancel.addEventListener("click", function (e) {
      e.preventDefault();

      signupformMobile.style.opacity = 0;

      setTimeout(() => {
        signupformMobile.style.display = "none";
        welcomeFormMobile.style.display = "flex";

        setTimeout(() => {
          welcomeFormMobile.style.opacity = 1;
        }, 800);
      }, 300);
    });

  }

  cancelSignInMobile() {
    const signinformMobile = document.getElementById("signinformMobile");
    const welcomeFormMobile = document.getElementById("welcomeFormMobile");

    signInCancel.addEventListener("click", function (e) {
      e.preventDefault();

      signinformMobile.style.opacity = 0;

      setTimeout(() => {
        signinformMobile.style.display = "none";
        welcomeFormMobile.style.display = "flex";

        setTimeout(() => {
          welcomeFormMobile.style.opacity = 1;
        }, 800);
      }, 300);
    });
  }

  signUpAndSubmitMobile() {
    const signUpSubmitMobile = document.getElementById("signUpSubmitMobile");
    const signinformMobile = document.getElementById("signinformMobile");


     signUpSubmitMobile.addEventListener("click", function (e) {
       e.preventDefault();

       document.querySelector(".f_name").innerHTML = "";
       document.querySelector(".l_name").innerHTML = "";
       document.querySelector(".email_orig").innerHTML = "";
       document.querySelector(".email_con").innerHTML = "";
       document.querySelector(".pass_orig").innerHTML = "";
       document.querySelector(".pass_con").innerHTML = "";

       var bodyFormData = new FormData();

       bodyFormData.append(
         "reg_fname",
         document.getElementById("regFnameMobile").value
       );
       bodyFormData.append(
         "reg_lname",
         document.getElementById("regLnameMobile").value
       );
       bodyFormData.append(
         "reg_email",
         document.getElementById("regEmailMobile").value
       );
       bodyFormData.append(
         "reg_email2",
         document.getElementById("regEmail2Mobile").value
       );
       bodyFormData.append(
         "reg_password",
         document.getElementById("regPasswordMobile").value
       );
       bodyFormData.append(
         "reg_password2",
         document.getElementById("regPassword2Mobile").value
       );
       bodyFormData.append("register_button", "register_button");

       axios({
         method: "post",
         url: "includes/form_handlers/register_handler_mobile.php",
         headers: {
           "Content-Type": "multipart/form-data",
         },
         data: bodyFormData,
       })
         .then((res) => {
           let { data } = res;

           if (data.errors) {
             if (data.errors.find((elem) => elem.includes("First Name: "))) {
               let firstname = data.errors.find((elem) =>
                 elem.includes("First Name: ")
               );
               firstname = firstname.replace("First Name: ", "");
               document.querySelector(".f_name").innerHTML = firstname;
             }

             if (data.errors.find((elem) => elem.includes("Last Name: "))) {
               let lastname = data.errors.find((elem) =>
                 elem.includes("Last Name: ")
               );
               lastname = lastname.replace("Last Name: ", "");
               document.querySelector(".l_name").innerHTML = lastname;
             }

             if (data.errors.find((elem) => elem.includes("Email: "))) {
               let email = data.errors.find((elem) => elem.includes("Email: "));
               email = email.replace("Email: ", "");
               document.querySelector(".email_orig").innerHTML = email;
               document.querySelector(".email_con").innerHTML = email;
             }

             if (data.errors.find((elem) => elem.includes("Password: "))) {
               let pass = data.errors.find((elem) =>
                 elem.includes("Password: ")
               );
               pass = pass.replace("Password: ", "");
               document.querySelector(".pass_orig").innerHTML = pass;
               document.querySelector(".pass_con").innerHTML = pass;
             }
           } else {

             showSignIn(res.data);
           }

         })
         .catch((err) => console.error(err));

       function showSignIn(res) {
         signupformMobile.style.opacity = 0;

         setTimeout(() => {
           signupformMobile.style.display = null;
           signinformMobile.style.display = "flex";

           setTimeout(() => {
             document.querySelector(".signInresponseMobile").innerHTML = res;
             signinformMobile.style.opacity = 1;
           }, 800);
         }, 300);
       }
     });

  }

  signInAndSubmitMobile() {

    signInSubmitMobile.addEventListener("click", function (e) {
      e.preventDefault();

      var bodyFormData = new FormData();

      bodyFormData.append(
        "log_email",
        document.getElementById("logEmailMobile").value
      );
      bodyFormData.append(
        "log_password",
        document.getElementById("logPassMobile").value
      );

      bodyFormData.append("login_button", "login_button");

      axios({
        method: "post",
        url: "includes/form_handlers/login_handler_mobile.php",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: bodyFormData,
      }).then((res) => {
        if (res.data.errors) {
          const signInresponseMobile = document.querySelector(
            ".signInresponseMobile"
          );

          signInresponseMobile.innerHTML = res.data.errors;

          console.log("====================================");
          console.log(res.data.errors);
          console.log("====================================");
        } else {
          window.location.href = "index.php";
        }
      });
    });
  }

};
