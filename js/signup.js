/* =========================================================
   EVE BEAUTY - SIGN UP
   ========================================================= */


/* =========================================================
   THEME
   ========================================================= */

const lightModeBtn = document.getElementById("lightModeBtn");
const darkModeBtn = document.getElementById("darkModeBtn");

function setTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");

    if (darkModeBtn) {
      darkModeBtn.classList.add("active");
    }

    if (lightModeBtn) {
      lightModeBtn.classList.remove("active");
    }

    localStorage.setItem("eve-login-theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");

    if (lightModeBtn) {
      lightModeBtn.classList.add("active");
    }

    if (darkModeBtn) {
      darkModeBtn.classList.remove("active");
    }

    localStorage.setItem("eve-login-theme", "light");
  }
}


if (lightModeBtn) {
  lightModeBtn.addEventListener("click", function () {
    setTheme("light");
  });
}


if (darkModeBtn) {
  darkModeBtn.addEventListener("click", function () {
    setTheme("dark");
  });
}


/* Load saved theme */

const savedTheme = localStorage.getItem("eve-login-theme");

if (savedTheme === "dark") {
  setTheme("dark");
} else {
  setTheme("light");
}


/* =========================================================
   PASSWORD SHOW / HIDE
   ========================================================= */

const signupPassword = document.getElementById("signupPassword");
const signupPasswordToggle = document.getElementById(
  "signupPasswordToggle"
);

if (signupPassword && signupPasswordToggle) {
  signupPasswordToggle.addEventListener("click", function () {

    if (signupPassword.type === "password") {
      signupPassword.type = "text";

      signupPasswordToggle.setAttribute(
        "aria-label",
        "Hide password"
      );
    } else {
      signupPassword.type = "password";

      signupPasswordToggle.setAttribute(
        "aria-label",
        "Show password"
      );
    }

  });
}


/* =========================================================
   SIGN UP
   ========================================================= */

const createAccountForm =
  document.getElementById("createAccountForm");

const signupName =
  document.getElementById("signupName");

const signupEmail =
  document.getElementById("signupEmail");

const signupMessage =
  document.getElementById("signupMessage");


if (createAccountForm) {

  createAccountForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name = signupName.value.trim();
    const email = signupEmail.value.trim().toLowerCase();
    const password = signupPassword.value;


    /* Clear old message */

    signupMessage.textContent = "";


    /* Validation */

    if (!name || !email || !password) {

      signupMessage.textContent =
        "Please fill in all fields.";

      return;
    }


    if (password.length < 6) {

      signupMessage.textContent =
        "Password must be at least 6 characters.";

      return;
    }


    /* =====================================================
       CREATE ACCOUNT OBJECT
       ===================================================== */

    const account = {
      name: name,
      email: email,
      password: password
    };


    /* =====================================================
       SAVE ACCOUNT
       ===================================================== */

    localStorage.setItem(
      "eveBeautyAccount",
      JSON.stringify(account)
    );


    /* Save user's basic profile information too */

    localStorage.setItem(
      "eveBeautyUser",
      JSON.stringify({
        name: name,
        email: email
      })
    );


    /* User is NOT logged in yet */

    localStorage.setItem(
      "eveBeautyLoggedIn",
      "false"
    );


    /* Success message */

    signupMessage.textContent =
      "Account created successfully!";


    /* =====================================================
       GO TO LOGIN PAGE
       ===================================================== */

    setTimeout(function () {

      window.location.href = "login.html";

    }, 800);

  });

}