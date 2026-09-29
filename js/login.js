/* =========================================================
   EVE BEAUTY
   LOGIN - LOCAL STORAGE DATABASE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     ELEMENTS
  ======================================================= */

  const signInForm = document.getElementById("signInForm");

  const emailInput = document.getElementById("loginEmail");

  const passwordInput = document.getElementById("loginPassword");

  const passwordToggle = document.getElementById("loginPasswordToggle");

  const rememberMe = document.getElementById("rememberMe");

  const loginMessage = document.getElementById("loginMessage");

  const forgotPassword = document.getElementById("forgotPassword");

  const lightModeBtn = document.getElementById("lightModeBtn");

  const darkModeBtn = document.getElementById("darkModeBtn");

  const socialButtons = document.querySelectorAll(".social-buttons button");

  /* =======================================================
     STORAGE KEYS
  ======================================================= */

  const USERS_KEY = "eveBeautyUsers";

  const CURRENT_USER_KEY = "eveBeautyCurrentUser";

  const REMEMBERED_EMAIL_KEY = "eveBeautyRememberedEmail";

  const THEME_KEY = "eveBeautyTheme";

  /* =======================================================
     USERS DATABASE
  ======================================================= */

  function getUsers() {
    try {
      const stored = localStorage.getItem(USERS_KEY);

      if (!stored) {
        return [];
      }

      const users = JSON.parse(stored);

      return Array.isArray(users) ? users : [];
    } catch (error) {
      console.error("Could not read users:", error);

      return [];
    }
  }

  function saveUsers(users) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      return true;
    } catch (error) {
      console.error("Could not save users:", error);

      return false;
    }
  }

  /* =======================================================
     CURRENT USER
  ======================================================= */

  function saveCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }

  function getCurrentUser() {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);

      if (!stored) {
        return null;
      }

      return JSON.parse(stored);
    } catch (error) {
      return null;
    }
  }

  /* =======================================================
     HELPERS
  ======================================================= */

  function normalizeEmail(email) {
    return String(email || "")
      .trim()
      .toLowerCase();
  }

  function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showMessage(message, type = "error") {
    if (!loginMessage) return;

    loginMessage.textContent = message;

    loginMessage.classList.remove("success", "error");

    loginMessage.classList.add(type);
  }

  function clearMessage() {
    if (!loginMessage) return;

    loginMessage.textContent = "";

    loginMessage.classList.remove("success", "error");
  }

  /* =======================================================
     THEME
  ======================================================= */

  function setTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);

    lightModeBtn?.classList.toggle("active", !isDark);

    darkModeBtn?.classList.toggle("active", isDark);

    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);

    setTheme(savedTheme === "dark" ? "dark" : "light");
  }

  lightModeBtn?.addEventListener("click", () => setTheme("light"));

  darkModeBtn?.addEventListener("click", () => setTheme("dark"));

  /* =======================================================
     PASSWORD SHOW / HIDE
  ======================================================= */

  passwordToggle?.addEventListener("click", () => {
    if (!passwordInput) return;

    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";

    passwordToggle.setAttribute(
      "aria-label",
      isPassword ? "Hide password" : "Show password",
    );
  });

  /* =======================================================
     REMEMBER EMAIL
  ======================================================= */

  function loadRememberedEmail() {
    const rememberedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY);

    if (rememberedEmail && emailInput) {
      emailInput.value = rememberedEmail;

      if (rememberMe) {
        rememberMe.checked = true;
      }
    }
  }

  /* =======================================================
     REGISTERED MESSAGE
  ======================================================= */

  const params = new URLSearchParams(window.location.search);

  if (params.get("registered") === "1") {
    showMessage("Account created successfully. Please sign in.", "success");

    window.history.replaceState({}, document.title, "login.html");
  }

  /* =======================================================
     LOGIN
  ======================================================= */

  signInForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    clearMessage();

    const email = normalizeEmail(emailInput?.value);

    const password = passwordInput?.value || "";

    /* ---------------------------------------------------
         VALIDATION
      --------------------------------------------------- */

    if (!email) {
      showMessage("Please enter your email address.");

      emailInput?.focus();

      return;
    }

    if (!validEmail(email)) {
      showMessage("Please enter a valid email address.");

      emailInput?.focus();

      return;
    }

    if (!password) {
      showMessage("Please enter your password.");

      passwordInput?.focus();

      return;
    }

    /* ---------------------------------------------------
         GET USERS
      --------------------------------------------------- */

    const users = getUsers();

    if (!users.length) {
      showMessage("No account was found. Please sign up first.");

      return;
    }

    /* ---------------------------------------------------
         FIND USER
      --------------------------------------------------- */

    const user = users.find((item) => normalizeEmail(item.email) === email);

    if (!user) {
      showMessage("No account found with this email.");

      return;
    }

    /* ---------------------------------------------------
         PASSWORD
      --------------------------------------------------- */

    if (String(user.password) !== String(password)) {
      showMessage("Incorrect password. Please try again.");

      passwordInput?.focus();

      return;
    }

    /* ---------------------------------------------------
         REMEMBER ME
      --------------------------------------------------- */

    if (rememberMe?.checked) {
      localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
    } else {
      localStorage.removeItem(REMEMBERED_EMAIL_KEY);
    }

    /* ---------------------------------------------------
         CURRENT USER
      --------------------------------------------------- */

    const currentUser = {
      id: user.id,

      name: user.name,

      email: user.email,

      provider: user.provider || "local",

      loginAt: new Date().toISOString(),
    };

    saveCurrentUser(currentUser);

    /* ---------------------------------------------------
         UPDATE USER LAST LOGIN
      --------------------------------------------------- */

    const userIndex = users.findIndex((item) => item.id === user.id);

    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],

        lastLoginAt: new Date().toISOString(),
      };

      saveUsers(users);
    }

    /* ---------------------------------------------------
         SUCCESS
      --------------------------------------------------- */

    showMessage("Login successful. Welcome back!", "success");

    /* ---------------------------------------------------
         BUTTON
      --------------------------------------------------- */

    const submitButton = signInForm.querySelector(".main-btn");

    if (submitButton) {
      submitButton.disabled = true;

      const text = submitButton.querySelector("span:first-child");

      if (text) {
        text.textContent = "Signing In...";
      }
    }

    /* ---------------------------------------------------
         REDIRECT
      --------------------------------------------------- */

    const redirectPath =
      localStorage.getItem("eveBeautyLoginRedirect") || "index.html";

    setTimeout(() => {
      window.location.href = redirectPath;
    }, 700);
  });

  /* =======================================================
     FORGOT PASSWORD
  ======================================================= */

  forgotPassword?.addEventListener("click", () => {
    const email = normalizeEmail(emailInput?.value);

    if (!email) {
      showMessage("Enter your email first.");

      emailInput?.focus();

      return;
    }

    if (!validEmail(email)) {
      showMessage("Please enter a valid email address.");

      emailInput?.focus();

      return;
    }

    const users = getUsers();

    const user = users.find((item) => normalizeEmail(item.email) === email);

    if (!user) {
      showMessage("No account was found with this email.");

      return;
    }

    /*
     * Without a backend/email server,
     * real password-reset email is impossible.
     *
     * For local version we provide
     * a simple local reset flow.
     */

    const newPassword = window.prompt(
      "Enter your new password (minimum 6 characters):",
    );

    if (newPassword === null) {
      return;
    }

    if (newPassword.length < 6) {
      showMessage("Password must be at least 6 characters.");

      return;
    }

    const index = users.findIndex((item) => item.id === user.id);

    if (index === -1) {
      return;
    }

    users[index].password = newPassword;

    users[index].updatedAt = new Date().toISOString();

    saveUsers(users);

    showMessage(
      "Password changed successfully. You can now sign in.",
      "success",
    );
  });

  /* =======================================================
     SOCIAL / PROVIDER LOGIN
  ======================================================= */

  socialButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const provider = getProviderFromButton(button);

      /*
       * Real Google/Facebook/Apple OAuth
       * requires an OAuth provider/backend.
       *
       * Since this project is local-only,
       * we create/use a local provider account.
       */

      localProviderLogin(provider);
    });
  });

  function getProviderFromButton(button) {
    const label = (button.getAttribute("aria-label") || "").toLowerCase();

    if (label.includes("google")) {
      return "google";
    }

    if (label.includes("apple")) {
      return "apple";
    }

    if (label.includes("facebook")) {
      return "facebook";
    }

    return "social";
  }

  function localProviderLogin(provider) {
    const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);

    const email = window.prompt(
      `${providerName} local demo\n\nEnter your email:`,
    );

    if (!email) {
      return;
    }

    const normalizedEmail = normalizeEmail(email);

    if (!validEmail(normalizedEmail)) {
      showMessage("Please enter a valid email address.");

      return;
    }

    const users = getUsers();

    let user = users.find(
      (item) => normalizeEmail(item.email) === normalizedEmail,
    );

    /* ---------------------------------------------------
       CREATE PROVIDER ACCOUNT
    --------------------------------------------------- */

    if (!user) {
      const name = window.prompt("Enter your name:");

      if (!name) {
        return;
      }

      user = {
        id: "user_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),

        name: name.trim(),

        email: normalizedEmail,

        password: null,

        provider: provider,

        createdAt: new Date().toISOString(),

        lastLoginAt: new Date().toISOString(),
      };

      users.push(user);

      saveUsers(users);
    } else {
      user.lastLoginAt = new Date().toISOString();

      user.provider = user.provider || provider;

      saveUsers(users);
    }

    /* ---------------------------------------------------
       SESSION
    --------------------------------------------------- */

    saveCurrentUser({
      id: user.id,

      name: user.name,

      email: user.email,

      provider: user.provider || provider,

      loginAt: new Date().toISOString(),
    });

    showMessage(`Signed in with ${providerName}.`, "success");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 700);
  }

  /* =======================================================
     INPUT EVENTS
  ======================================================= */

  emailInput?.addEventListener("input", clearMessage);

  passwordInput?.addEventListener("input", clearMessage);

  /* =======================================================
     INITIALIZATION
  ======================================================= */

  loadRememberedEmail();

  loadTheme();

  /* =======================================================
     EXISTING SESSION
  ======================================================= */

  const currentUser = getCurrentUser();

  if (currentUser) {
    console.log("Current Eve Beauty user:", currentUser);
  }
});
