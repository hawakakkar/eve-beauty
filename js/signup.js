/*EVE BEAUTY SIGN UP LOCAL STORAGE DATABASE*/

document.addEventListener("DOMContentLoaded", () => {
  /* ELEMENTS*/

  const createAccountForm = document.getElementById("createAccountForm");

  const signupName = document.getElementById("signupName");

  const signupEmail = document.getElementById("signupEmail");

  const signupPassword = document.getElementById("signupPassword");

  const signupPasswordToggle = document.getElementById("signupPasswordToggle");

  const signupConfirmPassword = document.getElementById(
    "signupConfirmPassword",
  );

  const signupConfirmPasswordToggle = document.getElementById(
    "signupConfirmPasswordToggle",
  );

  const signupMessage = document.getElementById("signupMessage");

  const lightModeBtn = document.getElementById("lightModeBtn");

  const darkModeBtn = document.getElementById("darkModeBtn");

  /* THE SAVING INFO IN LOCALSTORAGE*/

  const USERS_KEY = "eveBeautyUsers";
  const CURRENT_USER_KEY = "eveBeautyCurrentUser";
  const THEME_KEY = "eveBeautyTheme";

  /* CONTROL OF USERS DATABASE */
  /*THIS FUNCTION WILL READ THE LIST OF USERS THAT SAVED IN LOCALSTORAGE*/
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

  /*SAVING USERS*/
  function saveUsers(users) {
    try {
      /*THIS CHANGE THE ARRAYS OR OBJECT OF JS TO JSON STRING THEN SAVE THIS STRING BY USER KEY IN LOCALSTORAGE*/
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      return true;
    } catch (error) {
      console.error("Could not save users:", error);

      return false;
    }
  }

  /* PASSWORD HASHING USING PBKDF2 AND SHA-256 */

  const HASH_ITERATIONS = 600000;

  /* THIS CONVERTS BINARY DATA INTO HEXADECIMAL TEXT */

  function toHex(buffer) {
    return Array.from(new Uint8Array(buffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  /* THIS HASHES PASSWORDS */

  async function hashSecret(secret) {
    if (!window.crypto?.subtle || !window.crypto?.getRandomValues) {
      throw new Error("Secure hashing is unavailable.");
    }

    const salt = window.crypto.getRandomValues(new Uint8Array(16));

    const key = await window.crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      "PBKDF2",
      false,
      ["deriveBits"],
    );

    const result = await window.crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt,
        iterations: HASH_ITERATIONS,
        hash: "SHA-256",
      },
      key,
      256,
    );

    return `pbkdf2$${HASH_ITERATIONS}$${toHex(salt)}$${toHex(result)}`;
  }

  /* HELPERS FUNCTIONS */

  function normalizeEmail(email) {
    return String(email || "")
      .trim()
      .toLowerCase();
  }

  /*CHECKING THE VALIDATION OF EMAIL*/
  function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /*THIS SHOWING THE MESSAGE TO USER*/
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

  /* THIS CHANGE THE THEME OF SITE */

  function setTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);

    lightModeBtn?.classList.toggle("active", !isDark);

    darkModeBtn?.classList.toggle("active", isDark);

    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }

  /*THIS FUNCTION IS FOR THE THEME THAT ALREADY HAS BEEN STORED*/
  function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);

    setTheme(savedTheme === "dark" ? "dark" : "light");
  }

  lightModeBtn?.addEventListener("click", () => setTheme("light"));

  darkModeBtn?.addEventListener("click", () => setTheme("dark"));

  /* HIDING AND SHOWING ICON FOR PASSWORD */

  signupPasswordToggle?.addEventListener("click", () => {
    if (!signupPassword) return;

    const isPassword = signupPassword.type === "password";

    signupPassword.type = isPassword ? "text" : "password";

    signupPasswordToggle.setAttribute(
      "aria-label",
      isPassword ? "Hide password" : "Show password",
    );
  });

  /* HIDING AND SHOWING ICON FOR CONFIRM PASSWORD */

  signupConfirmPasswordToggle?.addEventListener("click", () => {
    if (!signupConfirmPassword) return;

    const isPassword = signupConfirmPassword.type === "password";

    signupConfirmPassword.type = isPassword ? "text" : "password";

    signupConfirmPasswordToggle.setAttribute(
      "aria-label",
      isPassword ? "Hide password" : "Show password",
    );
  });

  /* THIS CHECKS IF SECURE HASHING IS AVAILABLE */

  function secureHashingAvailable() {
    return Boolean(window.crypto?.subtle && window.crypto?.getRandomValues);
  }

  /* STARTING SIGN UP METHOD*/

  createAccountForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    clearMessage();

    const name = signupName?.value.trim() || "";

    const email = normalizeEmail(signupEmail?.value);

    const password = signupPassword?.value || "";

    const confirmPassword = signupConfirmPassword?.value || "";

    /* THE VALIDATION INFO */

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

    /* THIS CHECKS THAT BOTH PASSWORDS ARE THE SAME */

    if (!confirmPassword) {
      showMessage("Please confirm your password.");

      signupConfirmPassword?.focus();

      return;
    }

    if (password !== confirmPassword) {
      showMessage("Passwords do not match.");

      signupConfirmPassword?.focus();

      return;
    }

    /* THIS CHECKS SECURE HASHING SUPPORT */

    if (!secureHashingAvailable()) {
      showMessage("Secure hashing requires HTTPS or localhost.");

      return;
    }

    /* THIS EXECUTE THE GETUSERS() AND STORE THE LIST OF USERS*/

    const users = getUsers();

    /* CHECK DUPLICATE EMAIL */

    const existingUser = users.find(
      (user) => normalizeEmail(user.email) === email,
    );

    if (existingUser) {
      showMessage("An account with this email already exists.");

      return;
    }

    /* HASHING PASSWORD BEFORE SAVING */

    let passwordHash;

    try {
      passwordHash = await hashSecret(password);
    } catch (error) {
      console.error("Could not hash account password:", error);

      showMessage("Could not securely create your account.");

      return;
    }

    /* CREATING USER*/

    const account = {
      id: "user_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),

      name,

      email,

      password: passwordHash,

      provider: "local",

      createdAt: new Date().toISOString(),

      updatedAt: new Date().toISOString(),
    };

    /* SAVING USER */

    users.push(account);

    const saved = saveUsers(users);

    if (!saved) {
      showMessage("Could not create your account. Please try again.");

      return;
    }

    /*  REMOVE OLD / INCONSISTENT STORAGE */

    localStorage.removeItem("eveBeautyAccount");

    localStorage.removeItem("eveBeautyUser");

    localStorage.removeItem("eveBeautyLoggedIn");

    /*SUCCESS */

    showMessage("Account created successfully! Redirecting...", "success");

    /*REDIRECT TO LOGIN PAGE */

    setTimeout(() => {
      window.location.href = "login.html?registered=1";
    }, 800);
  });

  /* THIS CLEARS OLD VALIDATION MESSAGES */

  signupConfirmPassword?.addEventListener("input", clearMessage);

  signupPassword?.addEventListener("input", clearMessage);

  /* INITIALIZATION */

  loadTheme();
});
