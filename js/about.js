/* =========================================================
   EVE BEAUTY — ABOUT PAGE JS
========================================================= */

/* =========================================================
   LUCIDE ICONS
========================================================= */

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}

/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenuButton = document.getElementById("mobileMenuButton");

const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("open");

    const isOpen = mobileMenu.classList.contains("open");

    mobileMenuButton.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu",
    );
  });
}

/* =========================================================
   CLOSE MOBILE MENU WHEN LINK CLICKED
========================================================= */

if (mobileMenu) {
  const mobileLinks = mobileMenu.querySelectorAll("a");

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
    });
  });
}

/* =========================================================
   DARK MODE
========================================================= */

const themeToggle = document.getElementById("themeToggle");

const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("eveBeautyTheme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");

  if (themeIcon) {
    themeIcon.setAttribute("data-lucide", "sun");
  }
}

/* =========================================================
   UPDATE THEME ICON
========================================================= */

function updateThemeIcon() {
  if (!themeIcon) return;

  if (document.body.classList.contains("dark-mode")) {
    themeIcon.setAttribute("data-lucide", "sun");
  } else {
    themeIcon.setAttribute("data-lucide", "moon");
  }

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

/* =========================================================
   THEME TOGGLE
========================================================= */

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("eveBeautyTheme", isDark ? "dark" : "light");

    updateThemeIcon();
  });
}

/* =========================================================
   ACCOUNT DROPDOWN
========================================================= */

const accountButton = document.getElementById("accountButton");

const accountWrapper = document.querySelector(".account-wrapper");

const signupAccountLink = document.getElementById("signupAccountLink");

const loginAccountLink = document.getElementById("loginAccountLink");

const profileInfo = document.getElementById("profileInfo");

const profileName = document.getElementById("profileName");

const profileEmail = document.getElementById("profileEmail");

const profileLink = document.getElementById("profileLink");

const logoutButton = document.getElementById("logoutButton");

const accountUserIcon = document.getElementById("accountUserIcon");

const profileAvatar = document.getElementById("profileAvatar");

/* =========================================================
   UPDATE ACCOUNT UI
========================================================= */

function updateAccountUI() {
  const isLoggedIn = localStorage.getItem("eveBeautyLoggedIn") === "true";

  const savedUser = localStorage.getItem("eveBeautyUser");

  const savedProfileImage = localStorage.getItem("eveBeautyProfileImage");

  /* DEFAULT */

  if (signupAccountLink) {
    signupAccountLink.style.display = "none";
  }

  if (loginAccountLink) {
    loginAccountLink.style.display = "none";
  }

  if (profileInfo) {
    profileInfo.style.display = "none";
  }

  if (profileLink) {
    profileLink.style.display = "none";
  }

  if (logoutButton) {
    logoutButton.style.display = "none";
  }

  if (profileAvatar) {
    profileAvatar.style.display = "none";
  }

  if (accountUserIcon) {
    accountUserIcon.style.display = "none";
  }

  /* NOT LOGGED IN */

  if (!isLoggedIn || !savedUser) {
    if (signupAccountLink) {
      signupAccountLink.style.display = "block";
    }

    if (loginAccountLink) {
      loginAccountLink.style.display = "block";
    }

    if (accountUserIcon) {
      accountUserIcon.style.display = "block";
    }

    if (accountButton) {
      accountButton.setAttribute("aria-label", "Account");
    }

    return;
  }

  /* READ USER */

  let user;

  try {
    user = JSON.parse(savedUser);
  } catch (error) {
    localStorage.setItem("eveBeautyLoggedIn", "false");

    if (accountUserIcon) {
      accountUserIcon.style.display = "block";
    }

    return;
  }

  /* LOGGED IN */

  if (profileInfo) {
    profileInfo.style.display = "flex";
  }

  if (profileLink) {
    profileLink.style.display = "block";
  }

  if (logoutButton) {
    logoutButton.style.display = "block";
  }

  if (profileName) {
    profileName.textContent = user.name || "Beauty User";
  }

  if (profileEmail) {
    profileEmail.textContent = user.email || "";
  }

  /* PROFILE IMAGE */

  if (savedProfileImage && profileAvatar) {
    profileAvatar.src = savedProfileImage;

    profileAvatar.style.display = "block";
  } else if (accountUserIcon) {
    accountUserIcon.style.display = "block";
  }

  if (accountButton) {
    accountButton.setAttribute("aria-label", "My Profile");
  }
}

/* =========================================================
   ACCOUNT BUTTON
========================================================= */

if (accountButton && accountWrapper) {
  accountButton.addEventListener("click", function (event) {
    event.stopPropagation();

    accountWrapper.classList.toggle("open");
  });
}

/* =========================================================
   CLOSE ACCOUNT DROPDOWN
========================================================= */

document.addEventListener("click", function (event) {
  if (accountWrapper && !accountWrapper.contains(event.target)) {
    accountWrapper.classList.remove("open");
  }
});

/* =========================================================
   LOGOUT
========================================================= */

if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    /*
        Do NOT remove:
        eveBeautyAccount
        eveBeautyProfileImage

        They should remain saved.
      */

    localStorage.setItem("eveBeautyLoggedIn", "false");

    localStorage.removeItem("eveBeautyUser");

    if (accountWrapper) {
      accountWrapper.classList.remove("open");
    }

    updateAccountUI();
  });
}

/* =========================================================
   SEARCH
========================================================= */

const searchButton = document.getElementById("searchButton");

const searchOverlay = document.getElementById("searchOverlay");

const closeSearch = document.getElementById("closeSearch");

const aboutSearchInput = document.getElementById("aboutSearchInput");

const aboutSearchSubmit = document.getElementById("aboutSearchSubmit");

const searchMessage = document.getElementById("searchMessage");

/* OPEN SEARCH */

if (searchButton && searchOverlay) {
  searchButton.addEventListener("click", function () {
    searchOverlay.classList.add("active");

    setTimeout(function () {
      if (aboutSearchInput) {
        aboutSearchInput.focus();
      }
    }, 100);
  });
}

/* CLOSE SEARCH */

if (closeSearch && searchOverlay) {
  closeSearch.addEventListener("click", function () {
    searchOverlay.classList.remove("active");
  });
}

/* CLICK OUTSIDE SEARCH BOX */

if (searchOverlay) {
  searchOverlay.addEventListener("click", function (event) {
    if (event.target === searchOverlay) {
      searchOverlay.classList.remove("active");
    }
  });
}

/* ESCAPE KEY */

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (searchOverlay) {
      searchOverlay.classList.remove("active");
    }

    if (accountWrapper) {
      accountWrapper.classList.remove("open");
    }

    if (mobileMenu) {
      mobileMenu.classList.remove("open");
    }
  }
});

/* SEARCH SUBMIT */

function performSearch() {
  if (!aboutSearchInput) return;

  const value = aboutSearchInput.value.trim();

  if (!searchMessage) return;

  if (!value) {
    searchMessage.textContent = "Please enter something to search.";

    return;
  }

  searchMessage.textContent = 'Searching for "' + value + '"...';
}

if (aboutSearchSubmit) {
  aboutSearchSubmit.addEventListener("click", performSearch);
}

if (aboutSearchInput) {
  aboutSearchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });
}

/* =========================================================
   STORAGE SYNC
========================================================= */

window.addEventListener("storage", function (event) {
  if (
    event.key === "eveBeautyLoggedIn" ||
    event.key === "eveBeautyUser" ||
    event.key === "eveBeautyProfileImage"
  ) {
    updateAccountUI();
  }
});

/* =========================================================
   INITIALIZE
========================================================= */

updateAccountUI();

updateThemeIcon();

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}
