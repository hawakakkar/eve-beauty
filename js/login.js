/* =========================================================
   EVE BEAUTY - LOGIN
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

/* Light mode */

if (lightModeBtn) {
  lightModeBtn.addEventListener("click", function () {
    setTheme("light");
  });
}

/* Dark mode */

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

const loginPassword = document.getElementById("loginPassword");

const loginPasswordToggle = document.getElementById("loginPasswordToggle");

if (loginPassword && loginPasswordToggle) {
  loginPasswordToggle.addEventListener("click", function () {
    if (loginPassword.type === "password") {
      loginPassword.type = "text";

      loginPasswordToggle.setAttribute("aria-label", "Hide password");
    } else {
      loginPassword.type = "password";

      loginPasswordToggle.setAttribute("aria-label", "Show password");
    }
  });
}

/* =========================================================
   LOGIN
   ========================================================= */

const signInForm = document.getElementById("signInForm");

const loginEmail = document.getElementById("loginEmail");

const loginMessage = document.getElementById("loginMessage");

const rememberMe = document.getElementById("rememberMe");

if (signInForm) {
  signInForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = loginEmail.value.trim().toLowerCase();

    const password = loginPassword.value;

    loginMessage.textContent = "";

    /* =====================================================
         GET SAVED ACCOUNT
         ===================================================== */

    const savedAccount = localStorage.getItem("eveBeautyAccount");

    if (!savedAccount) {
      loginMessage.textContent = "No account found. Please sign up first.";

      return;
    }

    let account;

    try {
      account = JSON.parse(savedAccount);
    } catch (error) {
      loginMessage.textContent =
        "Account data is invalid. Please sign up again.";

      return;
    }

    /* =====================================================
         CHECK EMAIL
         ===================================================== */

    if (email !== account.email) {
      loginMessage.textContent = "Email address is incorrect.";

      return;
    }

    /* =====================================================
         CHECK PASSWORD
         ===================================================== */

    if (password !== account.password) {
      loginMessage.textContent = "Password is incorrect.";

      return;
    }

    /* =====================================================
         LOGIN SUCCESS
         ===================================================== */

    const user = {
      name: account.name,

      email: account.email,
    };

    /* Save logged-in user's information */

    localStorage.setItem("eveBeautyUser", JSON.stringify(user));

    /* Save login status */

    localStorage.setItem("eveBeautyLoggedIn", "true");

    /* Remember email */

    if (rememberMe && rememberMe.checked) {
      localStorage.setItem("eveBeautyRememberEmail", email);
    } else {
      localStorage.removeItem("eveBeautyRememberEmail");
    }

    /* Success message */

    loginMessage.textContent = "Login successful!";

    /* =====================================================
         GO TO HOME
         ===================================================== */

    setTimeout(function () {
      window.location.href = "index.html";
    }, 700);
  });
}

/* =========================================================
   LOAD REMEMBERED EMAIL
   ========================================================= */

const rememberedEmail = localStorage.getItem("eveBeautyRememberEmail");

if (rememberedEmail && loginEmail) {
  loginEmail.value = rememberedEmail;
}

/* =========================================================
   FORGOT PASSWORD
   ========================================================= */

const forgotPassword = document.getElementById("forgotPassword");

if (forgotPassword) {
  forgotPassword.addEventListener("click", function () {
    if (loginMessage) {
      loginMessage.textContent =
        "Please contact support to reset your password.";
    }
  });
}
