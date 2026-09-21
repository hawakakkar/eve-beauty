/* =========================================================
   EVE BEAUTY
   ACCOUNT / PROFILE SYSTEM
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     ELEMENTS
     ======================================================= */

  const accountButton = document.getElementById("accountButton");

  const accountUserIcon = document.getElementById("accountUserIcon");

  const profileAvatar = document.getElementById("profileAvatar");

  const accountDropdown = document.getElementById("accountDropdown");

  const signupAccountLink = document.getElementById("signupAccountLink");

  const loginAccountLink = document.getElementById("loginAccountLink");

  const profileInfo = document.getElementById("profileInfo");

  const profileName = document.getElementById("profileName");

  const profileEmail = document.getElementById("profileEmail");

  const profileLink = document.getElementById("profileLink");

  const logoutButton = document.getElementById("logoutButton");

  /* =======================================================
     HIDE ELEMENT
     ======================================================= */

  function hide(element) {
    if (element) {
      element.style.setProperty("display", "none", "important");
    }
  }

  /* =======================================================
     SHOW ELEMENT
     ======================================================= */

  function show(element, displayType = "block") {
    if (element) {
      element.style.setProperty("display", displayType, "important");
    }
  }

  /* =======================================================
     UPDATE ACCOUNT UI
     ======================================================= */

  function updateAccountUI() {
    const isLoggedIn = localStorage.getItem("eveBeautyLoggedIn") === "true";

    const savedUser = localStorage.getItem("eveBeautyUser");

    const savedProfileImage = localStorage.getItem("eveBeautyProfileImage");

    /* =====================================================
       HIDE EVERYTHING FIRST
       ===================================================== */

    hide(signupAccountLink);
    hide(loginAccountLink);
    hide(profileInfo);
    hide(profileLink);
    hide(logoutButton);
    hide(profileAvatar);
    hide(accountUserIcon);

    /* =====================================================
       NOT LOGGED IN
       ===================================================== */

    if (!isLoggedIn || !savedUser) {
      show(signupAccountLink);
      show(loginAccountLink);
      show(accountUserIcon);

      if (accountButton) {
        accountButton.setAttribute("aria-label", "Account");
      }

      return;
    }

    /* =====================================================
       READ USER
       ===================================================== */

    let user;

    try {
      user = JSON.parse(savedUser);
    } catch (error) {
      console.error("Invalid user data in localStorage.");

      localStorage.setItem("eveBeautyLoggedIn", "false");

      show(accountUserIcon);

      return;
    }

    /* =====================================================
       LOGGED IN
       ===================================================== */

    show(profileInfo, "flex");
    show(profileLink);
    show(logoutButton);

    /* =====================================================
       USER NAME
       ===================================================== */

    if (profileName) {
      profileName.textContent = user.name || "Beauty User";
    }

    /* =====================================================
       USER EMAIL
       ===================================================== */

    if (profileEmail) {
      profileEmail.textContent = user.email || "";
    }

    /* =====================================================
       PROFILE IMAGE
       ===================================================== */

    if (savedProfileImage && profileAvatar) {
      profileAvatar.src = savedProfileImage;

      show(profileAvatar);
    } else {
      show(accountUserIcon);
    }

    /* =====================================================
       ACCOUNT BUTTON
       ===================================================== */

    if (accountButton) {
      accountButton.setAttribute("aria-label", "My Profile");
    }
  }

  /* =======================================================
     LOGOUT
     ======================================================= */

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      /*
          فقط Login Status را خاموش می‌کنیم.
          
          Account و Profile Image
          حذف نمی‌شوند.
        */

      localStorage.setItem("eveBeautyLoggedIn", "false");

      localStorage.removeItem("eveBeautyUser");

      updateAccountUI();
    });
  }

  /* =======================================================
     INITIAL UPDATE
     ======================================================= */

  updateAccountUI();

  /* =======================================================
     STORAGE CHANGE
     ======================================================= */

  window.addEventListener("storage", (event) => {
    if (
      event.key === "eveBeautyLoggedIn" ||
      event.key === "eveBeautyUser" ||
      event.key === "eveBeautyProfileImage"
    ) {
      updateAccountUI();
    }
  });
});
