/* =========================================================
   EVE BEAUTY
   SIGN UP - LOCAL STORAGE DATABASE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     ELEMENTS
  ======================================================= */

  const createAccountForm = document.getElementById("createAccountForm");

  const signupName = document.getElementById("signupName");

  const signupEmail = document.getElementById("signupEmail");

  const signupPassword = document.getElementById("signupPassword");

  const signupPasswordToggle = document.getElementById("signupPasswordToggle");

  const signupMessage = document.getElementById("signupMessage");

  const lightModeBtn = document.getElementById("lightModeBtn");

  const darkModeBtn = document.getElementById("darkModeBtn");

  /* =======================================================
     STORAGE
  ======================================================= */

  const USERS_KEY = "eveBeautyUsers";
  const CURRENT_USER_KEY = "eveBeautyCurrentUser";
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
    if (!signupMessage) return;

    signupMessage.textContent = message;

    signupMessage.classList.remove("success", "error");

    signupMessage.classList.add(type);
  }

  function clearMessage() {
    if (!signupMessage) return;

    signupMessage.textContent = "";

    signupMessage.classList.remove("success", "error");
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

  signupPasswordToggle?.addEventListener("click", () => {
    if (!signupPassword) return;

    const isPassword = signupPassword.type === "password";

    signupPassword.type = isPassword ? "text" : "password";

    signupPasswordToggle.setAttribute(
      "aria-label",
      isPassword ? "Hide password" : "Show password",
    );
  });

  /* =======================================================
     SIGN UP
  ======================================================= */

  createAccountForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    clearMessage();

    const name = signupName?.value.trim() || "";

    const email = normalizeEmail(signupEmail?.value);

    const password = signupPassword?.value || "";

    /* ---------------------------------------------------
         VALIDATION
      --------------------------------------------------- */

    if (!name) {
      showMessage("Please enter your full name.");

      signupName?.focus();

      return;
    }

    if (!email) {
      showMessage("Please enter your email address.");

      signupEmail?.focus();

      return;
    }

    if (!validEmail(email)) {
      showMessage("Please enter a valid email address.");

      signupEmail?.focus();

      return;
    }

    if (!password) {
      showMessage("Please create a password.");

      signupPassword?.focus();

      return;
    }

    if (password.length < 6) {
      showMessage("Password must be at least 6 characters.");

      signupPassword?.focus();

      return;
    }

    /* ---------------------------------------------------
         GET DATABASE
      --------------------------------------------------- */

    const users = getUsers();

    /* ---------------------------------------------------
         CHECK DUPLICATE EMAIL
      --------------------------------------------------- */

    const existingUser = users.find(
      (user) => normalizeEmail(user.email) === email,
    );

    if (existingUser) {
      showMessage("An account with this email already exists.");

      return;
    }

    /* ---------------------------------------------------
         CREATE USER
      --------------------------------------------------- */

    const account = {
      id: "user_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),

      name,

      email,

      password,

      provider: "local",

      createdAt: new Date().toISOString(),

      updatedAt: new Date().toISOString(),
    };

    /* ---------------------------------------------------
         SAVE USER
      --------------------------------------------------- */

    users.push(account);

    const saved = saveUsers(users);

    if (!saved) {
      showMessage("Could not create your account. Please try again.");

      return;
    }

    /* ---------------------------------------------------
         REMOVE OLD / INCONSISTENT STORAGE
      --------------------------------------------------- */

    localStorage.removeItem("eveBeautyAccount");

    localStorage.removeItem("eveBeautyUser");

    localStorage.removeItem("eveBeautyLoggedIn");

    /* ---------------------------------------------------
         SUCCESS
      --------------------------------------------------- */

    showMessage("Account created successfully! Redirecting...", "success");

    /* ---------------------------------------------------
         REDIRECT TO LOGIN
      --------------------------------------------------- */

    setTimeout(() => {
      window.location.href = "login.html?registered=1";
    }, 800);
  });

  /* =======================================================
     INITIALIZATION
  ======================================================= */

  loadTheme();
});
