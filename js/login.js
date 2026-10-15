/* EVE BEAUTY
   LOGIN - LOCAL STORAGE DATABASE */

document.addEventListener("DOMContentLoaded", () => {
  /*  ELEMENTS */

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
  const RESET_KEY = "eveBeautyPasswordReset";

  /* STORAGE KEYS*/

  const USERS_KEY = "eveBeautyUsers";

  const CURRENT_USER_KEY = "eveBeautyCurrentUser";

  const REMEMBERED_EMAIL_KEY = "eveBeautyRememberedEmail";

  const THEME_KEY = "eveBeautyTheme";

  /* PASSWORD HASHING USING PBKDF2 AND SHA-256 */

  const HASH_ITERATIONS = 600000;

  /* STORING USERS DATABASE IN LOCALSTORAGE*/

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

  /* SAVING OF CURRENT USER*/

  function saveCurrentUser(user) {
    try {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

      return true;
    } catch (error) {
      console.error("Could not save current user:", error);

      return false;
    }
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

  /*  HELPER */
  /*THIS FUNCTION MAKE THE EMAIL STANDARD*/

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
    /*THIS PUT THE MESSAGE IN HTML*/

    loginMessage.textContent = message;

    loginMessage.classList.remove("success", "error");

    loginMessage.classList.add(type);
  }

  function clearMessage() {
    if (!loginMessage) return;

    loginMessage.textContent = "";

    loginMessage.classList.remove("success", "error");
  }

  /* THIS CONVERTS BINARY DATA INTO HEXADECIMAL TEXT */

  function toHex(buffer) {
    return Array.from(new Uint8Array(buffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  /* THIS CONVERTS HEXADECIMAL TEXT INTO BINARY DATA */

  function fromHex(hex) {
    if (
      typeof hex !== "string" ||
      hex.length === 0 ||
      hex.length % 2 !== 0 ||
      !/^[0-9a-f]+$/i.test(hex)
    ) {
      throw new Error("Invalid stored hash.");
    }

    const bytes = new Uint8Array(hex.length / 2);

    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
    }

    return bytes;
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

  /* THIS CHECKS A PASSWORD AGAINST ITS STORED HASH */

  async function verifySecret(secret, storedHash) {
    if (!window.crypto?.subtle) {
      throw new Error("Secure hashing is unavailable.");
    }

    const parts = String(storedHash || "").split("$");

    if (parts.length !== 4 || parts[0] !== "pbkdf2") {
      return false;
    }

    const iterations = Number(parts[1]);

    if (
      !Number.isSafeInteger(iterations) ||
      iterations < 1 ||
      iterations > 1000000
    ) {
      return false;
    }

    const salt = fromHex(parts[2]);
    const expectedHash = fromHex(parts[3]);

    if (salt.length !== 16 || expectedHash.length !== 32) {
      return false;
    }

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
        iterations,
        hash: "SHA-256",
      },
      key,
      256,
    );

    const actualHash = new Uint8Array(result);

    let difference = 0;

    for (let i = 0; i < expectedHash.length; i++) {
      difference |= actualHash[i] ^ expectedHash[i];
    }

    return difference === 0;
  }

  /* THIS CHECKS IF SECURE HASHING IS AVAILABLE */

  function secureHashingAvailable() {
    return Boolean(window.crypto?.subtle && window.crypto?.getRandomValues);
  }

  /* THEME */

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

  /* PASSWORD SHOW / HIDE */

  passwordToggle?.addEventListener("click", () => {
    if (!passwordInput) return;

    const isPassword = passwordInput.type === "password";

    /*IF IT BE PASSWORD IT CAN CHANGE INTO TEXT TO BECOME VISIBLE OR 
    IF IT BE TEXT IT CAN CHANGE INTO PASSWORD TO BECOME UNVISIBLE*/
    passwordInput.type = isPassword ? "text" : "password";

    passwordToggle.setAttribute(
      "aria-label",
      isPassword ? "Hide password" : "Show password",
    );
  });

  /* REMEMBER EMAIL*/

  function loadRememberedEmail() {
    const rememberedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY);

    if (rememberedEmail && emailInput) {
      emailInput.value = rememberedEmail;

      if (rememberMe) {
        rememberMe.checked = true;
      }
    }
  }

  /*  REGISTERED MESSAGE*/

  const params = new URLSearchParams(window.location.search);

  if (params.get("registered") === "1") {
    showMessage("Account created successfully. Please sign in.", "success");

    window.history.replaceState({}, document.title, "login.html");
  }

  /* LOGIN */

  signInForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    clearMessage();

    const email = normalizeEmail(emailInput?.value);

    const password = passwordInput?.value || "";

    /* ---------------------------------------------------
         VALIDATION
      --------------------------------------------------- */

    if (!email) {
      showMessage("Please enter your email address.");

      /*THIS WIll TRANSFORM THE CURSOR INTO EMAIL INPUT*/
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

    if (!secureHashingAvailable()) {
      showMessage("Secure sign in requires HTTPS or localhost.");

      return;
    }

    /* GET USERS FROM LOCAL STORAGE*/

    const users = getUsers();

    if (!users.length) {
      showMessage("No account was found. Please sign up first.");

      return;
    }

    /* FIND USER */

    const userIndex = users.findIndex(
      (item) => normalizeEmail(item.email) === email,
    );

    if (userIndex === -1) {
      showMessage("No account found with this email.");

      return;
    }

    const user = users[userIndex];

    /* THIS COMPRISON THE SAVED PASSWORD WITH EMTERED PASSWORD*/

    let passwordIsCorrect = false;

    try {
      if (
        typeof user.password === "string" &&
        user.password.startsWith("pbkdf2$")
      ) {
        passwordIsCorrect = await verifySecret(password, user.password);
      } else if (
        typeof user.password === "string" &&
        user.password.length > 0
      ) {
        /* THIS UPGRADES AN OLD PLAIN-TEXT PASSWORD AFTER SUCCESSFUL LOGIN */

        passwordIsCorrect = user.password === password;

        if (passwordIsCorrect) {
          user.password = await hashSecret(password);

          user.updatedAt = new Date().toISOString();

          users[userIndex] = user;

          if (!saveUsers(users)) {
            showMessage("Could not update your account securely.");

            return;
          }
        }
      }
    } catch (error) {
      console.error("Could not verify password:", error);

      showMessage("Could not verify your password. Please try again.");

      return;
    }

    if (!passwordIsCorrect) {
      showMessage("Incorrect password. Please try again.");

      passwordInput?.focus();

      return;
    }

    /* REMEMBER ME*/

    if (rememberMe?.checked) {
      localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
    } else {
      localStorage.removeItem(REMEMBERED_EMAIL_KEY);
    }

    /* CURRENT USER */

    const currentUser = {
      id: user.id,

      name: user.name,

      email: user.email,

      provider: user.provider || "local",

      loginAt: new Date().toISOString(),
    };

    if (!saveCurrentUser(currentUser)) {
      showMessage("Could not save your sign-in session.");

      return;
    }

    /* UPDATE USER LAST LOGIN*/
    /*THIS TRY TO FIND TO PUT THE PLACE OF USER INTO ARRAY*/

    users[userIndex] = {
      ...users[userIndex],

      lastLoginAt: new Date().toISOString(),
    };

    saveUsers(users);

    /* SUCCESS MESSAGE*/

    showMessage("Login successful. Welcome back!", "success");

    /* BUTTON*/

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

  /*FORGOT PASSWORD*/

  forgotPassword?.addEventListener("click", async () => {
    clearMessage();

    if (typeof Swal === "undefined") {
      showMessage("SweetAlert2 is not loaded. Please check your script.");
      return;
    }

    if (!secureHashingAvailable()) {
      await Swal.fire({
        title: "Security Error",
        text: "Secure password recovery requires HTTPS or localhost.",
        icon: "error",
        customClass: {
          popup: "eve-swal-popup",
          title: "eve-swal-title",
          htmlContainer: "eve-swal-html",
          confirmButton: "eve-swal-confirm",
          cancelButton: "eve-swal-cancel",
          icon: "eve-swal-icon",
        },
        buttonsStyling: false,
      });
      return;
    }

    const swalStyle = {
      customClass: {
        popup: "eve-swal-popup",
        title: "eve-swal-title",
        htmlContainer: "eve-swal-html",
        input: "eve-swal-input",
        confirmButton: "eve-swal-confirm",
        cancelButton: "eve-swal-cancel",
        icon: "eve-swal-icon",
      },
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonText: "Continue",
      cancelButtonText: "Cancel",
    };

    try {
      /* ASK FOR ACCOUNT EMAIL */

      const emailResult = await Swal.fire({
        ...swalStyle,
        title: "Forgot Password?",
        text: "Enter your registered email address.",
        input: "email",
        inputPlaceholder: "Enter your email",
        inputValidator: (value) => {
          if (!value || !validEmail(normalizeEmail(value))) {
            return "Please enter a valid email address.";
          }
        },
      });

      if (!emailResult.isConfirmed) return;

      const email = normalizeEmail(emailResult.value);

      /* FIND ACCOUNT */

      const users = getUsers();

      const userIndex = users.findIndex(
        (user) => normalizeEmail(user.email) === email,
      );

      if (userIndex === -1) {
        await Swal.fire({
          ...swalStyle,
          title: "Account Not Found",
          text: "No account was found with this email address.",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
        return;
      }

      /* GENERATE A SIX-DIGIT DEMO VERIFICATION CODE */

      const randomValues = new Uint32Array(1);

      window.crypto.getRandomValues(randomValues);

      const verificationCode = String(randomValues[0] % 1000000).padStart(
        6,
        "0",
      );

      /* STORE ONLY THE HASHED CODE */

      const resetData = {
        email,
        codeHash: await hashSecret(verificationCode),
        expiresAt: Date.now() + 10 * 60 * 1000,
        attempts: 0,
      };

      localStorage.setItem(RESET_KEY, JSON.stringify(resetData));

      /* DEMO ONLY: DISPLAY CODE INSTEAD OF SENDING AN EMAIL */

      await Swal.fire({
        ...swalStyle,
        title: "Demo Verification Code",
        text:
          `Your verification code is: ${verificationCode}\n\n` +
          "This is a local demo. No email was sent. " +
          "The code expires in 10 minutes.",
        icon: "info",
        showCancelButton: false,
        confirmButtonText: "Enter Code",
      });

      /* VERIFY CODE */

      let codeIsCorrect = false;

      for (let attempt = 0; attempt < 5; attempt++) {
        const savedReset = JSON.parse(
          localStorage.getItem(RESET_KEY) || "null",
        );

        if (
          !savedReset ||
          savedReset.email !== email ||
          Date.now() > savedReset.expiresAt
        ) {
          localStorage.removeItem(RESET_KEY);

          await Swal.fire({
            ...swalStyle,
            title: "Code Expired",
            text: "Please start the password recovery process again.",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "OK",
          });

          return;
        }

        const codeResult = await Swal.fire({
          ...swalStyle,
          title: "Verify Your Code",
          text: `Enter the six-digit code. Attempt ${attempt + 1} of 5.`,
          input: "text",
          inputPlaceholder: "000000",
          inputAttributes: {
            maxlength: "6",
            inputmode: "numeric",
            autocomplete: "one-time-code",
            "aria-label": "Six-digit verification code",
          },
          confirmButtonText: "Verify",
          inputValidator: (value) => {
            if (!/^\d{6}$/.test(value || "")) {
              return "Please enter a valid six-digit code.";
            }
          },
        });

        if (!codeResult.isConfirmed) return;

        try {
          codeIsCorrect = await verifySecret(
            codeResult.value.trim(),
            savedReset.codeHash,
          );
        } catch (error) {
          console.error("Could not verify recovery code:", error);

          await Swal.fire({
            ...swalStyle,
            title: "Verification Failed",
            text: "Could not verify the code. Please try again.",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "OK",
          });

          return;
        }

        if (codeIsCorrect) break;

        savedReset.attempts = attempt + 1;

        if (savedReset.attempts >= 5) {
          localStorage.removeItem(RESET_KEY);

          await Swal.fire({
            ...swalStyle,
            title: "Too Many Attempts",
            text: "Please start the recovery process again.",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "OK",
          });

          return;
        }

        localStorage.setItem(RESET_KEY, JSON.stringify(savedReset));

        await Swal.fire({
          ...swalStyle,
          title: "Incorrect Code",
          text: `You have ${5 - savedReset.attempts} attempts remaining.`,
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "Try Again",
        });
      }

      if (!codeIsCorrect) return;

      /* ASK FOR NEW PASSWORD */

      const passwordResult = await Swal.fire({
        ...swalStyle,
        title: "Create New Password",
        text: "Your password must contain at least 6 characters.",
        input: "password",
        inputPlaceholder: "New password",
        inputAttributes: {
          autocomplete: "new-password",
          minlength: "6",
          "aria-label": "New password",
        },
        inputValidator: (value) => {
          if (!value || value.length < 6) {
            return "Your password must contain at least 6 characters.";
          }
        },
      });

      if (!passwordResult.isConfirmed) return;

      const newPassword = passwordResult.value;

      /* CONFIRM NEW PASSWORD */

      const confirmResult = await Swal.fire({
        ...swalStyle,
        title: "Confirm Password",
        text: "Enter your new password again.",
        input: "password",
        inputPlaceholder: "Confirm new password",
        inputAttributes: {
          autocomplete: "new-password",
          "aria-label": "Confirm new password",
        },
        confirmButtonText: "Reset Password",
        inputValidator: (value) => {
          if (!value) {
            return "Please confirm your new password.";
          }

          if (value !== newPassword) {
            return "Passwords do not match.";
          }
        },
      });

      if (!confirmResult.isConfirmed) return;

      /* CHECK CODE EXPIRATION AGAIN */

      const finalReset = JSON.parse(localStorage.getItem(RESET_KEY) || "null");

      if (
        !finalReset ||
        finalReset.email !== email ||
        Date.now() > finalReset.expiresAt
      ) {
        localStorage.removeItem(RESET_KEY);

        await Swal.fire({
          ...swalStyle,
          title: "Code Expired",
          text: "Please start the recovery process again.",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });

        return;
      }

      /* HASH NEW PASSWORD AND UPDATE ACCOUNT */

      const newPasswordHash = await hashSecret(newPassword);

      const latestUsers = getUsers();

      const latestUserIndex = latestUsers.findIndex(
        (user) => normalizeEmail(user.email) === email,
      );

      if (latestUserIndex === -1) {
        localStorage.removeItem(RESET_KEY);

        await Swal.fire({
          ...swalStyle,
          title: "Account Not Found",
          text: "Please check your account and try again.",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });

        return;
      }

      latestUsers[latestUserIndex].password = newPasswordHash;
      latestUsers[latestUserIndex].updatedAt = new Date().toISOString();

      if (!saveUsers(latestUsers)) {
        await Swal.fire({
          ...swalStyle,
          title: "Save Failed",
          text: "Could not save your new password.",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });

        return;
      }

      /* REMOVE USED RECOVERY CODE */

      localStorage.removeItem(RESET_KEY);

      if (passwordInput) {
        passwordInput.value = "";
      }

      showMessage(
        "Password reset successfully. You can now sign in.",
        "success",
      );

      await Swal.fire({
        ...swalStyle,
        title: "Password Reset Successfully!",
        text: "You can now sign in using your new password.",
        icon: "success",
        showCancelButton: false,
        confirmButtonText: "Go to Login",
      });
    } catch (error) {
      console.error("Password recovery failed:", error);

      await Swal.fire({
        title: "Something Went Wrong",
        text: "Password recovery failed. Please try again.",
        icon: "error",
        customClass: {
          popup: "eve-swal-popup",
          title: "eve-swal-title",
          htmlContainer: "eve-swal-html",
          confirmButton: "eve-swal-confirm",
          cancelButton: "eve-swal-cancel",
          icon: "eve-swal-icon",
        },
        buttonsStyling: false,
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    }
  });

  /*SOCIAL / PROVIDER LOGIN*/

  socialButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const provider = getProviderFromButton(button);

      localProviderLogin(provider);
    });
  });

  function getProviderFromButton(button) {
    const label = (
      button.getAttribute("aria-label") ||
      button.textContent ||
      ""
    ).toLowerCase();

    if (label.includes("google") || label.trim() === "g") {
      return "google";
    }

    if (label.includes("apple") || label.includes("")) {
      return "apple";
    }

    if (label.includes("facebook") || label.trim() === "f") {
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

    /* CREATE PROVIDER ACCOUNT*/

    if (!user) {
      const name = window.prompt("Enter your name:");

      if (!name || !name.trim()) {
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

      if (!saveUsers(users)) {
        showMessage("Could not save your account.");

        return;
      }
    } else {
      user.lastLoginAt = new Date().toISOString();

      user.provider = user.provider || provider;

      if (!saveUsers(users)) {
        showMessage("Could not update your account.");

        return;
      }
    }

    /* THIS SESSION HAS LINK WITH SHOP PAGE AND ANOTHER PAGE THAT SHOPPING AN WISHLIST OPTION*/

    const sessionSaved = saveCurrentUser({
      id: user.id,

      name: user.name,

      email: user.email,

      provider: user.provider || provider,

      loginAt: new Date().toISOString(),
    });

    if (!sessionSaved) {
      showMessage("Could not save your sign-in session.");

      return;
    }

    showMessage(`Signed in with ${providerName} local demo.`, "success");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 700);
  }

  /* INPUT EVENTS*/

  emailInput?.addEventListener("input", clearMessage);

  passwordInput?.addEventListener("input", clearMessage);

  /* INITIALIZATION*/

  loadRememberedEmail();

  loadTheme();

  /* EXISTING SESSION */

  const currentUser = getCurrentUser();

  if (currentUser) {
    console.log("Current Eve Beauty user:", currentUser);
  }
});
