/* =========================================================

   EVE BEAUTY — SHARED COMPONENTS

   Navbar + Footer + Account + Wishlist + Cart

   + Shared Functions

   IMPORTANT:

   Login system uses:

   eveBeautyCurrentUser

   This file supports the new login system and also

   keeps backward compatibility with the old storage keys.

   SEARCH LOGIC HAS BEEN LEFT UNCHANGED.

========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponents();

  /* =======================================================

     NAVBAR

  ======================================================= */

  initNavbar();

  /* =======================================================

     FOOTER / NAVBAR ICONS

  ======================================================= */

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
      const response = await fetch(
        "components/navbar.html",

        {
          cache: "no-cache",
        },
      );

      if (!response.ok) {
        throw new Error(`Navbar HTTP error: ${response.status}`);
      }

      navbarContainer.innerHTML = await response.text();
    } catch (error) {
      console.error(
        "Navbar Error:",

        error,
      );
    }
  }

  /* =======================================================

     FOOTER

  ======================================================= */

  if (footerContainer) {
    try {
      const response = await fetch(
        "components/footer.html",

        {
          cache: "no-cache",
        },
      );

      if (!response.ok) {
        throw new Error(`Footer HTTP error: ${response.status}`);
      }

      footerContainer.innerHTML = await response.text();
    } catch (error) {
      console.error(
        "Footer Error:",

        error,
      );
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

  initWishlistDropdown();

  initCartDropdown();

  initActiveNav();

  initPageTransitions();

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

  themeToggle.addEventListener(
    "click",

    () => {
      document.body.classList.toggle("dark-mode");

      const isDark = document.body.classList.contains("dark-mode");

      localStorage.setItem(
        "eve-theme",

        isDark ? "dark" : "light",
      );
    },
  );
}

/* =========================================================

   SEARCH

   INTENTIONALLY UNCHANGED.

   Full product filtering will be added later.

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

  searchButton?.addEventListener(
    "click",

    openSearch,
  );

  closeSearch?.addEventListener(
    "click",

    closeSearchBox,
  );

  searchSubmit?.addEventListener(
    "click",

    performSearch,
  );

  searchOverlay.addEventListener(
    "click",

    (event) => {
      if (event.target === searchOverlay) {
        closeSearchBox();
      }
    },
  );

  searchInput?.addEventListener(
    "keydown",

    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        performSearch();
      }
    },
  );

  document.addEventListener(
    "keydown",

    (event) => {
      if (
        event.key === "Escape" &&
        searchOverlay.classList.contains("active")
      ) {
        closeSearchBox();
      }
    },
  );
}

/* =========================================================

   DROPDOWNS

   Account / Wishlist / Cart are handled separately.

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

    toggle?.setAttribute(
      "aria-expanded",

      "false",
    );
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

    toggle.addEventListener(
      "click",

      (event) => {
        event.preventDefault();

        event.stopPropagation();

        const isOpen = dropdown.classList.contains("open");

        closeAllDropdowns(dropdown);

        if (!isOpen) {
          dropdown.classList.add("open");

          toggle.setAttribute(
            "aria-expanded",

            "true",
          );
        }
      },
    );
  });

  document.addEventListener(
    "click",

    (event) => {
      if (!event.target.closest(".dropdown")) {
        closeAllDropdowns();
      }
    },
  );

  document.addEventListener(
    "keydown",

    (event) => {
      if (event.key === "Escape") {
        closeAllDropdowns();
      }
    },
  );
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

    mobileMenuButton.setAttribute(
      "aria-expanded",

      "true",
    );

    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("active");

    mobileMenuButton.setAttribute(
      "aria-expanded",

      "false",
    );

    document.body.style.overflow = "";

    mobileMenu

      .querySelectorAll(".dropdown.open")

      .forEach((dropdown) => {
        dropdown.classList.remove("open");

        const toggle = dropdown.querySelector(".dropdown-toggle");

        toggle?.setAttribute(
          "aria-expanded",

          "false",
        );
      });
  }

  mobileMenuButton.addEventListener(
    "click",

    (event) => {
      event.preventDefault();

      event.stopPropagation();

      const isOpen = mobileMenu.classList.contains("active");

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    },
  );

  mobileClose?.addEventListener(
    "click",

    closeMobileMenu,
  );

  mobileMenu

    .querySelectorAll("a:not(.shop-main-link)")

    .forEach((link) => {
      link.addEventListener(
        "click",

        () => {
          closeMobileMenu();
        },
      );
    });

  const shopMainLinks = mobileMenu.querySelectorAll(".shop-main-link");

  shopMainLinks.forEach((link) => {
    link.addEventListener(
      "click",

      () => {
        closeMobileMenu();
      },
    );
  });

  document.addEventListener(
    "keydown",

    (event) => {
      if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
        closeMobileMenu();
      }
    },
  );
}

/* =========================================================

   ACTIVE NAV

========================================================= */

function initActiveNav() {
  const navLinks = document.querySelectorAll(".navbar-link");

  if (!navLinks.length) {
    return;
  }

  let currentPage = window.location.pathname

    .split("/")

    .pop();

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

    const linkPage = cleanHref

      .split("/")

      .pop();

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

/* =========================================================

   PAGE TRANSITIONS

   Gives internal page navigation a smooth fade.

========================================================= */

function initPageTransitions() {
  document.body.classList.remove("page-transition-out");

  document.body.classList.add("page-transition-in");

  const links = document.querySelectorAll("a[href]");

  links.forEach((link) => {
    if (link.dataset.eveTransitionReady === "true") {
      return;
    }

    link.dataset.eveTransitionReady = "true";

    link.addEventListener(
      "click",

      (event) => {
        const href = link.getAttribute("href");

        if (!href) {
          return;
        }

        /* Skip special links */

        if (
          href.startsWith("#") ||
          href.startsWith("javascript:") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:")
        ) {
          return;
        }

        /* Skip new tabs */

        if (
          link.target === "_blank" ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        /* Skip downloads */

        if (link.hasAttribute("download")) {
          return;
        }

        let url;

        try {
          url = new URL(
            href,

            window.location.href,
          );
        } catch (error) {
          return;
        }

        /* Only internal pages */

        if (url.origin !== window.location.origin) {
          return;
        }

        /* Same page */

        if (
          url.pathname === window.location.pathname &&
          url.search === window.location.search &&
          url.hash
        ) {
          return;
        }

        /*

           * Don't animate javascript

           * generated special links.

           */

        if (href.trim() === "") {
          return;
        }

        event.preventDefault();

        document.body.classList.remove("page-transition-in");

        document.body.classList.add("page-transition-out");

        setTimeout(
          () => {
            window.location.href = url.href;
          },

          280,
        );
      },
    );
  });
}

/* =========================================================

   CURRENT USER

========================================================= */

function getEveBeautyCurrentUser() {
  /* =======================================================

     NEW LOGIN SYSTEM

  ======================================================= */

  const currentUserData = localStorage.getItem("eveBeautyCurrentUser");

  if (currentUserData) {
    try {
      const user = JSON.parse(currentUserData);

      if (user && typeof user === "object") {
        return user;
      }
    } catch (error) {
      console.error(
        "Invalid eveBeautyCurrentUser:",

        error,
      );
    }
  }

  /* =======================================================

     OLD SYSTEM

  ======================================================= */

  const oldUserData = localStorage.getItem("eveBeautyUser");

  const oldLoggedIn = localStorage.getItem("eveBeautyLoggedIn") === "true";

  if (oldLoggedIn && oldUserData) {
    try {
      const user = JSON.parse(oldUserData);

      if (user && typeof user === "object") {
        return user;
      }
    } catch (error) {
      console.error(
        "Invalid old eveBeautyUser:",

        error,
      );
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

   USER IDENTIFIER

   Every account gets its own avatar key.

========================================================= */

function getEveBeautyUserIdentifier(user) {
  if (!user) {
    return "guest";
  }

  const identifier =
    user.id ||
    user.userId ||
    user.email ||
    user.username ||
    user.name ||
    user.fullName ||
    "guest";

  return String(identifier)
    .trim()

    .toLowerCase()

    .replace(
      /\s+/g,

      "_",
    );
}

/* =========================================================

   USER AVATAR STORAGE KEY

========================================================= */

function getUserAvatarStorageKey(user) {
  return "eveBeautyProfileImage_" + getEveBeautyUserIdentifier(user);
}

/* =========================================================

   GET USER AVATAR

========================================================= */

function getUserAvatar(
  user,

  userName,
) {
  if (!user) {
    return createDefaultAvatar(userName);
  }

  const userAvatarKey = getUserAvatarStorageKey(user);

  /* =======================================================

     FIRST: CURRENT USER'S OWN IMAGE

  ======================================================= */

  const ownImage = localStorage.getItem(userAvatarKey);

  if (ownImage) {
    return ownImage;
  }

  /* =======================================================

     BACKWARD COMPATIBILITY

     If an older version stored one global image,

     assign it to the CURRENT user only and remove

     the old global key.

     This prevents the old image from remaining shared.

  ======================================================= */

  const oldGlobalImage = localStorage.getItem("eveBeautyProfileImage");

  if (oldGlobalImage) {
    try {
      localStorage.setItem(
        userAvatarKey,

        oldGlobalImage,
      );

      localStorage.removeItem("eveBeautyProfileImage");

      return oldGlobalImage;
    } catch (error) {
      console.warn(
        "Could not migrate old profile image:",

        error,
      );

      return oldGlobalImage;
    }
  }

  /* =======================================================

     NO IMAGE

  ======================================================= */

  return createDefaultAvatar(userName);
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
      loggedInAccountMenu?.style.setProperty(
        "display",

        "none",

        "important",
      );

      loggedOutAccountMenu?.style.setProperty(
        "display",

        "block",

        "important",
      );

      /* MAIN AVATAR */

      if (profileAvatar) {
        profileAvatar.style.display = "none";

        profileAvatar.removeAttribute("src");

        profileAvatar.removeAttribute("alt");
      }

      if (accountUserIcon) {
        accountUserIcon.style.display = "block";
      }

      /* GREETING */

      if (accountGreetingName) {
        accountGreetingName.textContent = "Beauty User";
      }

      /* DROPDOWN AVATAR */

      if (accountDropdownAvatar) {
        accountDropdownAvatar.style.display = "none";

        accountDropdownAvatar.removeAttribute("src");
      }

      if (accountDropdownDefaultIcon) {
        accountDropdownDefaultIcon.style.display = "block";
      }

      accountButton.setAttribute(
        "aria-label",

        "Account",
      );

      accountButton.setAttribute(
        "title",

        "Sign in / Sign up",
      );

      updateAccountOrderCount();

      refreshLucideIcons();

      return;
    }

    /* =====================================================

       LOGGED IN

    ===================================================== */

    loggedInAccountMenu?.style.setProperty(
      "display",

      "block",

      "important",
    );

    loggedOutAccountMenu?.style.setProperty(
      "display",

      "none",

      "important",
    );

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

       USER PROFILE IMAGE

    ===================================================== */

    const avatarSource = getUserAvatar(
      user,

      userName,
    );

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

    accountButton.setAttribute(
      "aria-label",

      `My Profile - ${userName}`,
    );

    accountButton.setAttribute(
      "title",

      "My Profile",
    );

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

  accountButton.addEventListener(
    "click",

    (event) => {
      event.preventDefault();

      event.stopPropagation();

      const isOpen = accountParent.classList.contains("open");

      /*

       * Close other dropdowns

       */

      closeAllNavbarActionDropdowns(accountParent);

      document

        .querySelectorAll(".dropdown.open")

        .forEach((dropdown) => {
          if (dropdown !== accountParent) {
            dropdown.classList.remove("open");

            const toggle = dropdown.querySelector(".dropdown-toggle");

            toggle?.setAttribute(
              "aria-expanded",

              "false",
            );
          }
        });

      /*

       * Toggle account dropdown

       */

      if (isOpen) {
        accountParent.classList.remove("open");

        accountButton.setAttribute(
          "aria-expanded",

          "false",
        );
      } else {
        accountParent.classList.add("open");

        accountButton.setAttribute(
          "aria-expanded",

          "true",
        );
      }
    },
  );

  /* =======================================================

     LOGOUT

  ======================================================= */

  logoutButton?.addEventListener(
    "click",

    (event) => {
      event.preventDefault();

      /*

       * NEW LOGIN SYSTEM

       */

      localStorage.removeItem("eveBeautyCurrentUser");

      /*

       * OLD LOGIN SYSTEM

       */

      localStorage.removeItem("eveBeautyLoggedIn");

      localStorage.removeItem("eveBeautyUser");

      /*

       * Close dropdown

       */

      accountParent.classList.remove("open");

      accountButton.setAttribute(
        "aria-expanded",

        "false",
      );

      /*

       * Update UI immediately

       */

      updateAccountUI();

      updateNavbarCounts();

      /*

       * Go home

       */

      navigateWithPageTransition("index.html");
    },
  );

  /* =======================================================

     OUTSIDE CLICK

  ======================================================= */

  document.addEventListener(
    "click",

    (event) => {
      if (!event.target.closest(".navbar-account")) {
        accountParent.classList.remove("open");

        accountButton.setAttribute(
          "aria-expanded",

          "false",
        );
      }
    },
  );

  /* =======================================================

     ESCAPE

  ======================================================= */

  document.addEventListener(
    "keydown",

    (event) => {
      if (event.key === "Escape") {
        accountParent.classList.remove("open");

        accountButton.setAttribute(
          "aria-expanded",

          "false",
        );
      }
    },
  );

  /* =======================================================

     STORAGE

  ======================================================= */

  window.addEventListener(
    "storage",

    (event) => {
      if (
        event.key === "eveBeautyCurrentUser" ||
        event.key === "eveBeautyLoggedIn" ||
        event.key === "eveBeautyUser" ||
        event.key === "eveBeautyProfileImage" ||
        event.key?.startsWith("eveBeautyProfileImage_") ||
        event.key === "eveBeautyOrders" ||
        event.key === "eveBeautyCart" ||
        event.key === "eveBeautyWishlist"
      ) {
        updateAccountUI();

        updateNavbarCounts();

        renderWishlistDropdown();

        renderCartDropdown();
      }
    },
  );

  /* =======================================================

     CUSTOM EVENT

  ======================================================= */

  window.addEventListener(
    "eveBeautyUserChanged",

    () => {
      updateAccountUI();

      updateNavbarCounts();

      renderWishlistDropdown();

      renderCartDropdown();
    },
  );

  /* =======================================================

     PROFILE IMAGE CUSTOM EVENT

     Useful when profile-page.js changes image

     in the SAME browser tab.

  ======================================================= */

  window.addEventListener(
    "eveBeautyProfileImageChanged",

    () => {
      updateAccountUI();
    },
  );

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

   READ LOCAL STORAGE ARRAY

========================================================= */

function getEveBeautyStorageArray(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key));

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn(
      `Could not read ${key}:`,

      error,
    );

    return [];
  }
}

/* =========================================================

   NUMBER HELPER

========================================================= */

function getProductPrice(product) {
  if (!product) {
    return 0;
  }

  const possiblePrices = [
    product.price,

    product.salePrice,

    product.currentPrice,

    product.amount,
  ];

  for (const value of possiblePrices) {
    const number = Number(
      String(value ?? "").replace(
        /[^0-9.-]+/g,

        "",
      ),
    );

    if (Number.isFinite(number)) {
      return number;
    }
  }

  return 0;
}

/* =========================================================

   PRODUCT NAME HELPER

========================================================= */

function getProductName(product) {
  if (!product) {
    return "Beauty Product";
  }

  return (
    product.name || product.title || product.productName || "Beauty Product"
  );
}

/* =========================================================

   PRODUCT IMAGE HELPER

========================================================= */

function getProductImage(product) {
  if (!product) {
    return "";
  }

  const image =
    product.image ||
    product.imageUrl ||
    product.img ||
    product.thumbnail ||
    product.photo ||
    product.productImage ||
    "";

  return String(image || "");
}

/* =========================================================

   FORMAT PRICE

========================================================= */

function formatEveBeautyPrice(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "$0.00";
  }

  return "$" + number.toFixed(2);
}

/* =========================================================

   ESCAPE HTML FOR DROPDOWN

========================================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replace(
      /&/g,

      "&amp;",
    )

    .replace(
      /</g,

      "&lt;",
    )

    .replace(
      />/g,

      "&gt;",
    )

    .replace(
      /"/g,

      "&quot;",
    )

    .replace(
      /'/g,

      "&#039;",
    );
}

/* =========================================================

   SAFE PRODUCT IMAGE HTML

========================================================= */

function createMiniProductImage(product) {
  const image = getProductImage(product);

  const name = getProductName(product);

  if (image) {
    return `

      <div class="mini-product-image">

        <img

          src="${escapeHTML(image)}"

          alt="${escapeHTML(name)}"

          loading="lazy"

          onerror="

            this.style.display='none';

            this.parentElement.classList.add('mini-product-image-fallback');

            this.parentElement.innerHTML='♡';

          "

        />

      </div>

    `;
  }

  return `

    <div class="mini-product-image mini-product-image-fallback">

      ♡

    </div>

  `;
}

/* =========================================================

   WISHLIST DROPDOWN

========================================================= */

function initWishlistDropdown() {
  const wrapper = document.getElementById("wishlistWrapper");

  const button = document.getElementById("favoritelistButton");

  const dropdown = document.getElementById("wishlistDropdown");

  if (!wrapper || !button || !dropdown) {
    return;
  }

  button.addEventListener(
    "click",

    (event) => {
      event.preventDefault();

      event.stopPropagation();

      const isOpen = wrapper.classList.contains("open");

      closeAllNavbarActionDropdowns(wrapper);

      document

        .querySelectorAll(".dropdown.open")

        .forEach((item) => {
          item.classList.remove("open");

          const toggle = item.querySelector(".dropdown-toggle");

          toggle?.setAttribute(
            "aria-expanded",

            "false",
          );
        });

      if (isOpen) {
        wrapper.classList.remove("open");

        button.setAttribute(
          "aria-expanded",

          "false",
        );
      } else {
        wrapper.classList.add("open");

        button.setAttribute(
          "aria-expanded",

          "true",
        );

        renderWishlistDropdown();
      }
    },
  );

  document.addEventListener(
    "click",

    (event) => {
      if (!event.target.closest("#wishlistWrapper")) {
        wrapper.classList.remove("open");

        button.setAttribute(
          "aria-expanded",

          "false",
        );
      }
    },
  );

  document.addEventListener(
    "keydown",

    (event) => {
      if (event.key === "Escape") {
        wrapper.classList.remove("open");

        button.setAttribute(
          "aria-expanded",

          "false",
        );
      }
    },
  );

  renderWishlistDropdown();
}

/* =========================================================

   RENDER WISHLIST

========================================================= */

function renderWishlistDropdown() {
  const itemsContainer = document.getElementById("wishlistDropdownItems");

  const emptyState = document.getElementById("wishlistDropdownEmpty");

  if (!itemsContainer || !emptyState) {
    return;
  }

  const wishlist = getEveBeautyStorageArray("eveBeautyWishlist");

  if (!wishlist.length) {
    itemsContainer.innerHTML = "";

    itemsContainer.style.display = "none";

    emptyState.style.display = "flex";

    refreshLucideIcons();

    return;
  }

  emptyState.style.display = "none";

  itemsContainer.style.display = "block";

  itemsContainer.innerHTML = wishlist

    .map((product, index) => {
      const name = getProductName(product);

      const price = getProductPrice(product);

      const id = product.id ?? product.productId ?? index;

      return `

            <div

              class="mini-product-item"

              data-wishlist-index="${index}"

              data-product-id="${escapeHTML(id)}"

            >

              ${createMiniProductImage(product)}

              <div class="mini-product-info">

                <div

                  class="mini-product-name"

                  title="${escapeHTML(name)}"

                >

                  ${escapeHTML(name)}

                </div>

                <div class="mini-product-meta">

                  <span class="mini-product-price">

                    ${formatEveBeautyPrice(price)}

                  </span>

                </div>

              </div>

              <button

                type="button"

                class="mini-product-remove wishlist-remove-button"

                data-wishlist-index="${index}"

                aria-label="Remove ${escapeHTML(name)} from wishlist"

                title="Remove"

              >

                <i data-lucide="x"></i>

              </button>

            </div>

          `;
    })

    .join("");

  itemsContainer

    .querySelectorAll(".wishlist-remove-button")

    .forEach((button) => {
      button.addEventListener(
        "click",

        (event) => {
          event.preventDefault();

          event.stopPropagation();

          const index = Number(button.dataset.wishlistIndex);

          removeWishlistItem(index);
        },
      );
    });

  refreshLucideIcons();
}

/* =========================================================

   REMOVE WISHLIST ITEM

========================================================= */

function removeWishlistItem(index) {
  const wishlist = getEveBeautyStorageArray("eveBeautyWishlist");

  if (index < 0 || index >= wishlist.length) {
    return;
  }

  wishlist.splice(
    index,

    1,
  );

  localStorage.setItem(
    "eveBeautyWishlist",

    JSON.stringify(wishlist),
  );

  updateNavbarCounts();

  renderWishlistDropdown();

  window.dispatchEvent(new CustomEvent("eveBeautyWishlistChanged"));
}

/* =========================================================

   CART DROPDOWN

========================================================= */

function initCartDropdown() {
  const wrapper = document.getElementById("cartWrapper");

  const button = document.getElementById("cartButton");

  const dropdown = document.getElementById("cartDropdown");

  if (!wrapper || !button || !dropdown) {
    return;
  }

  button.addEventListener(
    "click",

    (event) => {
      event.preventDefault();

      event.stopPropagation();

      const isOpen = wrapper.classList.contains("open");

      closeAllNavbarActionDropdowns(wrapper);

      document

        .querySelectorAll(".dropdown.open")

        .forEach((item) => {
          item.classList.remove("open");

          const toggle = item.querySelector(".dropdown-toggle");

          toggle?.setAttribute(
            "aria-expanded",

            "false",
          );
        });

      if (isOpen) {
        wrapper.classList.remove("open");

        button.setAttribute(
          "aria-expanded",

          "false",
        );
      } else {
        wrapper.classList.add("open");

        button.setAttribute(
          "aria-expanded",

          "true",
        );

        renderCartDropdown();
      }
    },
  );

  document.addEventListener(
    "click",

    (event) => {
      if (!event.target.closest("#cartWrapper")) {
        wrapper.classList.remove("open");

        button.setAttribute(
          "aria-expanded",

          "false",
        );
      }
    },
  );

  document.addEventListener(
    "keydown",

    (event) => {
      if (event.key === "Escape") {
        wrapper.classList.remove("open");

        button.setAttribute(
          "aria-expanded",

          "false",
        );
      }
    },
  );

  renderCartDropdown();
}

/* =========================================================

   RENDER CART

========================================================= */

function renderCartDropdown() {
  const itemsContainer = document.getElementById("cartDropdownItems");

  const emptyState = document.getElementById("cartDropdownEmpty");

  const summary = document.getElementById("cartDropdownSummary");

  const subtotalElement = document.getElementById("cartDropdownSubtotal");

  if (!itemsContainer || !emptyState) {
    return;
  }

  const cart = getEveBeautyStorageArray("eveBeautyCart");

  if (!cart.length) {
    itemsContainer.innerHTML = "";

    itemsContainer.style.display = "none";

    emptyState.style.display = "flex";

    summary?.classList.remove("has-items");

    if (subtotalElement) {
      subtotalElement.textContent = "$0.00";
    }

    refreshLucideIcons();

    return;
  }

  emptyState.style.display = "none";

  itemsContainer.style.display = "block";

  let subtotal = 0;

  itemsContainer.innerHTML = cart

    .map((product, index) => {
      const name = getProductName(product);

      const price = getProductPrice(product);

      let quantity = Number(product.quantity);

      if (!Number.isFinite(quantity) || quantity < 1) {
        quantity = 1;
      }

      subtotal += price * quantity;

      const id = product.id ?? product.productId ?? index;

      return `

            <div

              class="mini-product-item"

              data-cart-index="${index}"

              data-product-id="${escapeHTML(id)}"

            >

              ${createMiniProductImage(product)}

              <div class="mini-product-info">

                <div

                  class="mini-product-name"

                  title="${escapeHTML(name)}"

                >

                  ${escapeHTML(name)}

                </div>

                <div class="mini-product-meta">

                  <span class="mini-product-price">

                    ${formatEveBeautyPrice(price)}

                  </span>

                  <span class="mini-product-quantity">

                    × ${quantity}

                  </span>

                </div>

              </div>

              <button

                type="button"

                class="mini-product-remove cart-remove-button"

                data-cart-index="${index}"

                aria-label="Remove ${escapeHTML(name)} from cart"

                title="Remove"

              >

                <i data-lucide="x"></i>

              </button>

            </div>

          `;
    })

    .join("");

  if (summary) {
    summary.classList.add("has-items");
  }

  if (subtotalElement) {
    subtotalElement.textContent = formatEveBeautyPrice(subtotal);
  }

  itemsContainer

    .querySelectorAll(".cart-remove-button")

    .forEach((button) => {
      button.addEventListener(
        "click",

        (event) => {
          event.preventDefault();

          event.stopPropagation();

          const index = Number(button.dataset.cartIndex);

          removeCartItem(index);
        },
      );
    });

  refreshLucideIcons();
}

/* =========================================================

   REMOVE CART ITEM

========================================================= */

function removeCartItem(index) {
  const cart = getEveBeautyStorageArray("eveBeautyCart");

  if (index < 0 || index >= cart.length) {
    return;
  }

  cart.splice(
    index,

    1,
  );

  localStorage.setItem(
    "eveBeautyCart",

    JSON.stringify(cart),
  );

  updateNavbarCounts();

  renderCartDropdown();

  window.dispatchEvent(new CustomEvent("eveBeautyCartChanged"));
}

/* =========================================================

   CLOSE NAVBAR ACTION DROPDOWNS

========================================================= */

function closeAllNavbarActionDropdowns(except = null) {
  document

    .querySelectorAll(".navbar-action-dropdown.open")

    .forEach((wrapper) => {
      if (except && wrapper === except) {
        return;
      }

      wrapper.classList.remove("open");

      const button = wrapper.querySelector(".notification-button");

      button?.setAttribute(
        "aria-expanded",

        "false",
      );
    });

  const account = document.querySelector(".navbar-account");

  if (account && account !== except) {
    account.classList.remove("open");

    const accountButton = document.getElementById("accountButton");

    accountButton?.setAttribute(
      "aria-expanded",

      "false",
    );
  }
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
    const cart = getEveBeautyStorageArray("eveBeautyCart");

    const totalQuantity = cart.reduce(
      (total, item) => {
        const quantity = Number(item?.quantity);

        return (
          total + (Number.isFinite(quantity) && quantity > 0 ? quantity : 1)
        );
      },

      0,
    );

    cartCount.textContent = totalQuantity > 99 ? "99+" : String(totalQuantity);

    const cartButton = document.getElementById("cartButton");

    cartButton?.classList.toggle(
      "has-items",

      totalQuantity > 0,
    );
  }

  /* =======================================================

     WISHLIST

  ======================================================= */

  if (favoriteCount) {
    const wishlist = getEveBeautyStorageArray("eveBeautyWishlist");

    const count = wishlist.length;

    favoriteCount.textContent = count > 99 ? "99+" : String(count);

    const wishlistButton = document.getElementById("favoritelistButton");

    wishlistButton?.classList.toggle(
      "has-items",

      count > 0,
    );
  }

  /* =======================================================

     KEEP DROPDOWNS UPDATED

  ======================================================= */

  renderWishlistDropdown();

  renderCartDropdown();
}

/* =========================================================

   NAVIGATION WITH TRANSITION

========================================================= */

function navigateWithPageTransition(href) {
  if (!href) {
    return;
  }

  const url = new URL(
    href,

    window.location.href,
  );

  if (url.origin !== window.location.origin) {
    window.location.href = url.href;

    return;
  }

  document.body.classList.remove("page-transition-in");

  document.body.classList.add("page-transition-out");

  setTimeout(
    () => {
      window.location.href = url.href;
    },

    280,
  );
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
