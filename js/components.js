/* =========================================================
   EVE BEAUTY — SHARED COMPONENTS
   Navbar + Footer + Account + Shared Functions

   IMPORTANT:
   Login system uses:
   eveBeautyCurrentUser

   This file supports the new login system and also
   keeps backward compatibility with the old storage keys.
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponents();

  /* Navbar */
  initNavbar();

  /* Footer / Navbar icons */
  refreshLucideIcons();

  /* =======================================================
     HOME PAGE
  ======================================================= */

  if (document.querySelector(".hero-section")) {
    loadPageScript("js/home.js");
  }

  /* =======================================================
     PROFILE PAGE
  ======================================================= */

  if (document.querySelector(".profile-page")) {
    loadPageScript("js/profile-page.js");
  }
});

/* =========================================================
   LOAD COMPONENTS
========================================================= */

async function loadComponents() {
  const navbarContainer = document.getElementById("navbar-container");
  const footerContainer = document.getElementById("footer-container");

  /* =======================================================
     NAVBAR
  ======================================================= */

  if (navbarContainer) {
    try {
      const response = await fetch("components/navbar.html", {
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error(`Navbar HTTP error: ${response.status}`);
      }

      navbarContainer.innerHTML = await response.text();
    } catch (error) {
      console.error("Navbar Error:", error);
    }
  }

  /* =======================================================
     FOOTER
  ======================================================= */

  if (footerContainer) {
    try {
      const response = await fetch("components/footer.html", {
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error(`Footer HTTP error: ${response.status}`);
      }

      footerContainer.innerHTML = await response.text();
    } catch (error) {
      console.error("Footer Error:", error);
    }
  }
}

/* =========================================================
   LOAD PAGE JAVASCRIPT
========================================================= */

function loadPageScript(src) {
  if (!src) {
    return;
  }

  const existingScript = document.querySelector(`script[src="${src}"]`);

  if (existingScript) {
    return;
  }

  const script = document.createElement("script");

  script.src = src;
  script.defer = true;

  script.onload = () => {
    console.log(`${src} loaded successfully.`);
  };

  script.onerror = () => {
    console.error(`Could not load ${src}`);
  };

  document.body.appendChild(script);
}

/* =========================================================
   LUCIDE ICONS
========================================================= */

function refreshLucideIcons() {
  if (
    typeof lucide !== "undefined" &&
    typeof lucide.createIcons === "function"
  ) {
    lucide.createIcons();
  }
}

/* =========================================================
   NAVBAR
========================================================= */

function initNavbar() {
  initTheme();
  initSearch();
  initDropdowns();
  initMobileMenu();
  initAccount();
  initActiveNav();
  updateNavbarCounts();

  refreshLucideIcons();
}

/* =========================================================
   THEME
========================================================= */

function initTheme() {
  const themeToggle = document.getElementById("themeToggle");

  if (!themeToggle) {
    return;
  }

  const savedTheme = localStorage.getItem("eve-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("eve-theme", isDark ? "dark" : "light");
  });
}

/* =========================================================
   SEARCH
========================================================= */

function initSearch() {
  const searchButton = document.getElementById("searchButton");
  const searchOverlay = document.getElementById("searchOverlay");
  const closeSearch = document.getElementById("closeSearch");
  const searchInput = document.getElementById("searchInput");
  const searchSubmit = document.getElementById("searchSubmit");
  const searchMessage = document.getElementById("searchMessage");

  if (!searchOverlay) {
    return;
  }

  function openSearch() {
    searchOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

    setTimeout(() => {
      searchInput?.focus();
    }, 200);
  }

  function closeSearchBox() {
    searchOverlay.classList.remove("active");

    document.body.style.overflow = "";

    if (searchInput) {
      searchInput.value = "";
    }

    if (searchMessage) {
      searchMessage.textContent = "";
    }
  }

  function performSearch() {
    if (!searchInput) {
      return;
    }

    const value = searchInput.value.trim();

    if (!value) {
      if (searchMessage) {
        searchMessage.textContent = "Please enter a product name.";
      }

      return;
    }

    window.location.href = `shop.html?search=${encodeURIComponent(value)}`;
  }

  searchButton?.addEventListener("click", openSearch);

  closeSearch?.addEventListener("click", closeSearchBox);

  searchSubmit?.addEventListener("click", performSearch);

  searchOverlay.addEventListener("click", (event) => {
    if (event.target === searchOverlay) {
      closeSearchBox();
    }
  });

  searchInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      performSearch();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchOverlay.classList.contains("active")) {
      closeSearchBox();
    }
  });
}

/* =========================================================
   DROPDOWNS
   Account is handled separately.
========================================================= */

function initDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown:not(.navbar-account)");

  if (!dropdowns.length) {
    return;
  }

  function getToggle(dropdown) {
    return (
      dropdown.querySelector(":scope > .dropdown-toggle") ||
      dropdown.querySelector(".shop-nav-wrapper > .dropdown-toggle")
    );
  }

  function closeDropdown(dropdown) {
    dropdown.classList.remove("open");

    const toggle = getToggle(dropdown);

    toggle?.setAttribute("aria-expanded", "false");
  }

  function closeAllDropdowns(except = null) {
    dropdowns.forEach((dropdown) => {
      if (except && dropdown === except) {
        return;
      }

      closeDropdown(dropdown);
    });
  }

  dropdowns.forEach((dropdown) => {
    const toggle = getToggle(dropdown);

    if (!toggle) {
      return;
    }

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = dropdown.classList.contains("open");

      closeAllDropdowns(dropdown);

      if (!isOpen) {
        dropdown.classList.add("open");

        toggle.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".dropdown")) {
      closeAllDropdowns();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllDropdowns();
    }
  });
}

/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {
  const mobileMenuButton = document.getElementById("mobileMenuButton");

  const mobileMenu = document.getElementById("mobileMenu");

  const mobileClose = document.getElementById("mobileClose");

  if (!mobileMenu || !mobileMenuButton) {
    return;
  }

  function openMobileMenu() {
    mobileMenu.classList.add("active");

    mobileMenuButton.setAttribute("aria-expanded", "true");

    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("active");

    mobileMenuButton.setAttribute("aria-expanded", "false");

    document.body.style.overflow = "";

    mobileMenu.querySelectorAll(".dropdown.open").forEach((dropdown) => {
      dropdown.classList.remove("open");

      const toggle = dropdown.querySelector(".dropdown-toggle");

      toggle?.setAttribute("aria-expanded", "false");
    });
  }

  mobileMenuButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = mobileMenu.classList.contains("active");

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileClose?.addEventListener("click", closeMobileMenu);

  mobileMenu.querySelectorAll("a:not(.shop-main-link)").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  const shopMainLinks = mobileMenu.querySelectorAll(".shop-main-link");

  shopMainLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMobileMenu();
    }
  });
}

/* =========================================================
   ACTIVE NAV
========================================================= */

function initActiveNav() {
  const navLinks = document.querySelectorAll(".navbar-link");

  if (!navLinks.length) {
    return;
  }

  let currentPage = window.location.pathname.split("/").pop();

  if (!currentPage) {
    currentPage = "index.html";
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");

    const href = link.getAttribute("href");

    if (!href || href === "#") {
      return;
    }

    const cleanHref = href.split("?")[0];

    const linkPage = cleanHref.split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

/* =========================================================
   CURRENT USER
   NEW LOGIN SYSTEM
========================================================= */

function getEveBeautyCurrentUser() {
  /*
   * NEW SYSTEM
   * login.js stores the logged-in user here.
   */

  const currentUserData = localStorage.getItem("eveBeautyCurrentUser");

  if (currentUserData) {
    try {
      const user = JSON.parse(currentUserData);

      if (user && typeof user === "object") {
        return user;
      }
    } catch (error) {
      console.error("Invalid eveBeautyCurrentUser:", error);
    }
  }

  /*
   * OLD SYSTEM
   * Keep compatibility with previous version.
   */

  const oldUserData = localStorage.getItem("eveBeautyUser");

  const oldLoggedIn = localStorage.getItem("eveBeautyLoggedIn") === "true";

  if (oldLoggedIn && oldUserData) {
    try {
      const user = JSON.parse(oldUserData);

      if (user && typeof user === "object") {
        return user;
      }
    } catch (error) {
      console.error("Invalid old eveBeautyUser:", error);
    }
  }

  return null;
}

/* =========================================================
   CHECK LOGIN
========================================================= */

function isEveBeautyLoggedIn() {
  return !!getEveBeautyCurrentUser();
}

/* =========================================================
   ACCOUNT
========================================================= */

function initAccount() {
  const accountButton = document.getElementById("accountButton");

  const accountDropdown = document.getElementById("accountDropdown");

  const accountUserIcon = document.getElementById("accountUserIcon");

  const profileAvatar = document.getElementById("profileAvatar");

  const loggedInAccountMenu = document.getElementById("loggedInAccountMenu");

  const loggedOutAccountMenu = document.getElementById("loggedOutAccountMenu");

  const accountGreetingName = document.getElementById("accountGreetingName");

  const accountDropdownAvatar = document.getElementById(
    "accountDropdownAvatar",
  );

  const accountDropdownDefaultIcon = document.getElementById(
    "accountDropdownDefaultIcon",
  );

  const logoutButton = document.getElementById("logoutButton");

  if (!accountButton || !accountDropdown) {
    console.warn("Account elements not found.");

    return;
  }

  const accountParent = accountButton.closest(".navbar-account");

  if (!accountParent) {
    console.warn("Account parent not found.");

    return;
  }

  /* =======================================================
     UPDATE ACCOUNT UI
  ======================================================= */

  function updateAccountUI() {
    const user = getEveBeautyCurrentUser();

    const loggedIn = !!user;

    /* =====================================================
       LOGGED OUT
    ===================================================== */

    if (!loggedIn) {
      loggedInAccountMenu?.style.setProperty("display", "none", "important");

      loggedOutAccountMenu?.style.setProperty("display", "block", "important");

      /*
       * Navbar main avatar
       */

      if (profileAvatar) {
        profileAvatar.style.display = "none";

        profileAvatar.removeAttribute("src");

        profileAvatar.removeAttribute("alt");
      }

      if (accountUserIcon) {
        accountUserIcon.style.display = "block";
      }

      /*
       * Greeting
       */

      if (accountGreetingName) {
        accountGreetingName.textContent = "Beauty User";
      }

      /*
       * Dropdown avatar
       */

      if (accountDropdownAvatar) {
        accountDropdownAvatar.style.display = "none";

        accountDropdownAvatar.removeAttribute("src");
      }

      if (accountDropdownDefaultIcon) {
        accountDropdownDefaultIcon.style.display = "block";
      }

      accountButton.setAttribute("aria-label", "Account");

      accountButton.setAttribute("title", "Sign in / Sign up");

      updateAccountOrderCount();

      refreshLucideIcons();

      return;
    }

    /* =====================================================
       LOGGED IN
    ===================================================== */

    loggedInAccountMenu?.style.setProperty("display", "block", "important");

    loggedOutAccountMenu?.style.setProperty("display", "none", "important");

    /* =====================================================
       USER NAME
    ===================================================== */

    const userName =
      user.name || user.fullName || user.username || "Beauty User";

    if (accountGreetingName) {
      accountGreetingName.textContent = userName;
    }

    /* =====================================================
       USER EMAIL
    ===================================================== */

    const accountEmail = document.getElementById("accountGreetingEmail");

    if (accountEmail) {
      accountEmail.textContent = user.email || "";
    }

    /* =====================================================
       PROFILE IMAGE
    ===================================================== */

    const savedImage = localStorage.getItem("eveBeautyProfileImage");

    /*
     * If user has uploaded a profile image,
     * use it.
     *
     * Otherwise create a beautiful default
     * avatar using the first letter of the name.
     */

    const avatarSource = savedImage || createDefaultAvatar(userName);

    /* =====================================================
       MAIN NAVBAR AVATAR
    ===================================================== */

    if (profileAvatar) {
      profileAvatar.src = avatarSource;

      profileAvatar.alt = `${userName}'s profile`;

      profileAvatar.style.display = "block";

      if (accountUserIcon) {
        accountUserIcon.style.display = "none";
      }
    } else {
      /*
       * If the navbar does not contain
       * profileAvatar, keep normal user icon.
       */

      if (accountUserIcon) {
        accountUserIcon.style.display = "block";
      }
    }

    /* =====================================================
       DROPDOWN AVATAR
    ===================================================== */

    if (accountDropdownAvatar) {
      accountDropdownAvatar.src = avatarSource;

      accountDropdownAvatar.alt = `${userName}'s profile`;

      accountDropdownAvatar.style.display = "block";

      if (accountDropdownDefaultIcon) {
        accountDropdownDefaultIcon.style.display = "none";
      }
    } else {
      if (accountDropdownDefaultIcon) {
        accountDropdownDefaultIcon.style.display = "block";
      }
    }

    /* =====================================================
       ACCOUNT BUTTON
    ===================================================== */

    accountButton.setAttribute("aria-label", `My Profile - ${userName}`);

    accountButton.setAttribute("title", "My Profile");

    /* =====================================================
       COUNTS
    ===================================================== */

    updateAccountOrderCount();

    updateNavbarCounts();

    refreshLucideIcons();
  }

  /* =======================================================
     ACCOUNT BUTTON
  ======================================================= */

  accountButton.addEventListener("click", (event) => {
    event.preventDefault();

    event.stopPropagation();

    const isOpen = accountParent.classList.contains("open");

    /*
     * Close other dropdowns
     */

    document.querySelectorAll(".dropdown.open").forEach((dropdown) => {
      if (dropdown !== accountParent) {
        dropdown.classList.remove("open");

        const toggle = dropdown.querySelector(".dropdown-toggle");

        toggle?.setAttribute("aria-expanded", "false");
      }
    });

    /*
     * Toggle account dropdown
     */

    if (isOpen) {
      accountParent.classList.remove("open");

      accountButton.setAttribute("aria-expanded", "false");
    } else {
      accountParent.classList.add("open");

      accountButton.setAttribute("aria-expanded", "true");
    }
  });

  /* =======================================================
     LOGOUT
  ======================================================= */

  logoutButton?.addEventListener("click", (event) => {
    event.preventDefault();

    /*
     * NEW LOGIN SYSTEM
     */

    localStorage.removeItem("eveBeautyCurrentUser");

    /*
     * OLD LOGIN SYSTEM
     * Remove these too for clean logout.
     */

    localStorage.removeItem("eveBeautyLoggedIn");

    localStorage.removeItem("eveBeautyUser");

    /*
     * Close dropdown
     */

    accountParent.classList.remove("open");

    accountButton.setAttribute("aria-expanded", "false");

    /*
     * Update UI immediately
     */

    updateAccountUI();

    updateNavbarCounts();

    /*
     * Go home
     */

    window.location.href = "index.html";
  });

  /* =======================================================
     OUTSIDE CLICK
  ======================================================= */

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".navbar-account")) {
      accountParent.classList.remove("open");

      accountButton.setAttribute("aria-expanded", "false");
    }
  });

  /* =======================================================
     ESCAPE
  ======================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      accountParent.classList.remove("open");

      accountButton.setAttribute("aria-expanded", "false");
    }
  });

  /* =======================================================
     STORAGE
  ======================================================= */

  window.addEventListener("storage", (event) => {
    if (
      event.key === "eveBeautyCurrentUser" ||
      event.key === "eveBeautyLoggedIn" ||
      event.key === "eveBeautyUser" ||
      event.key === "eveBeautyProfileImage" ||
      event.key === "eveBeautyOrders" ||
      event.key === "eveBeautyCart" ||
      event.key === "eveBeautyWishlist"
    ) {
      updateAccountUI();

      updateNavbarCounts();
    }
  });

  /* =======================================================
     CUSTOM EVENT
     Allows other scripts to refresh account
     without refreshing the page.
  ======================================================= */

  window.addEventListener("eveBeautyUserChanged", () => {
    updateAccountUI();

    updateNavbarCounts();
  });

  /* =======================================================
     INITIAL ACCOUNT STATE
  ======================================================= */

  updateAccountUI();
}

/* =========================================================
   ACCOUNT ORDER COUNT
========================================================= */

function updateAccountOrderCount() {
  const orderBadge = document.getElementById("accountOrderCount");

  if (!orderBadge) {
    return;
  }

  let orders = [];

  try {
    orders = JSON.parse(localStorage.getItem("eveBeautyOrders")) || [];
  } catch (error) {
    orders = [];
  }

  const count = Array.isArray(orders) ? orders.length : 0;

  orderBadge.textContent = count > 99 ? "99+" : String(count);
}

/* =========================================================
   CART / WISHLIST COUNTS
========================================================= */

function updateNavbarCounts() {
  const cartCount = document.getElementById("cartCount");

  const favoriteCount = document.getElementById("favoritelistCount");

  /* =======================================================
     CART
  ======================================================= */

  if (cartCount) {
    let cart = [];

    try {
      cart = JSON.parse(localStorage.getItem("eveBeautyCart")) || [];
    } catch (error) {
      cart = [];
    }

    if (Array.isArray(cart)) {
      const totalQuantity = cart.reduce((total, item) => {
        const quantity = Number(item?.quantity) || 1;

        return total + quantity;
      }, 0);

      cartCount.textContent =
        totalQuantity > 99 ? "99+" : String(totalQuantity);
    } else {
      cartCount.textContent = "0";
    }
  }

  /* =======================================================
     WISHLIST
  ======================================================= */

  if (favoriteCount) {
    let wishlist = [];

    try {
      wishlist = JSON.parse(localStorage.getItem("eveBeautyWishlist")) || [];
    } catch (error) {
      wishlist = [];
    }

    const count = Array.isArray(wishlist) ? wishlist.length : 0;

    favoriteCount.textContent = count > 99 ? "99+" : String(count);
  }
}

/* =========================================================
   DEFAULT AVATAR
========================================================= */

function createDefaultAvatar(name) {
  const firstLetter = String(name || "U")
    .trim()
    .charAt(0)
    .toUpperCase();

  const safeLetter = escapeHTML(firstLetter);

  const svg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 80 80"
    >
      <rect
        width="80"
        height="80"
        rx="40"
        fill="#ead1d5"
      />

      <text
        x="40"
        y="51"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="30"
        font-weight="600"
        fill="#7f2639"
      >
        ${safeLetter}
      </text>
    </svg>
  `;

  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
