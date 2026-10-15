/* EVE BEAUTY — SHARED COMPONENTS*/

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponents();

  /*  NAVBAR*/

  initNavbar();

  /*  FOOTER / NAVBAR ICONS*/

  refreshLucideIcons();

  /* HOME PAGE */
  /*THIS CHECK THAT ARE THE ELEMENTS BY CLASS OF .hero-section IS EXIST OR NOT*/
  /*IF THIS CLASS EXIST THE home.js PAGE WILL LOAD*/

  if (document.querySelector(".hero-section")) {
    loadPageScript("js/home.js");
  }
});

/* LOAD COMPONENTS*/

async function loadComponents() {
  const navbarContainer = document.getElementById("navbar-container");

  const footerContainer = document.getElementById("footer-container");

  /* NAVBAR*/
  /*THIS FUNC LOAD NAVBAR */
  /*IF THE navbarContainer EXIST THE CONDITION WILL EXECUTE OTHERWISE IT WOULDN'T*/
  if (navbarContainer) {
    try {
      const response = await fetch(
        "components/navbar.html",

        {
          cache: "no-cache",
        },
      );
      /*IF THE HTTP ANSWER UNSUCCESSFUL THE ERROR WILL OCCURE*/
      if (!response.ok) {
        throw new Error(`Navbar HTTP error: ${response.status}`);
      }
      /*PUTTING HTML INSIDE OF PAGE*/
      /*FIRST THE response.text() RECIEVES THE TEXT CONTENT OF HTML THEN innerHTML PUT THAT INTO navbarContainer ELEMENT*/
      navbarContainer.innerHTML = await response.text();
    } catch (error) {
      console.error(
        "Navbar Error:",

        error,
      );
    }
  }

  /* FOOTER */
  /*THIS FUNC LOAD FOOTER */
  /*IF THE footerContainer EXIST THE CONDITION WILL EXECUTE OTHERWISE IT WOULDN'T*/
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
      /*PUTTING HTML INSIDE OF PAGE*/
      /*FIRST THE response.text() RECIEVES THE TEXT CONTENT OF HTML THEN innerHTML PUT THAT INTO footerContainer ELEMENT*/
      footerContainer.innerHTML = await response.text();
    } catch (error) {
      console.error(
        "Footer Error:",

        error,
      );
    }
  }
}

/* LOAD PAGE JAVASCRIPT*/

function loadPageScript(src) {
  /*LOAD THE FILE PATH*/
  if (!src) {
    return;
  }
  /*THIS CHECK ARE THE SCRIPT TAG HAS ALREADY ADDED IN THE PAGE BY THIS PATH OR NO*/
  const existingScript = document.querySelector(`script[src="${src}"]`);
  if (existingScript) {
    return;
  }
  /*CREATING SCRIPT TAG*/
  const script = document.createElement("script");
  script.src = src;
  script.defer = true;

  script.onload = () => {
    console.log(`${src} loaded successfully.`);
  };
  script.onerror = () => {
    console.error(`Could not load ${src}`);
  };
  /*ADDING SCRIPT INTO PAGE*/
  document.body.appendChild(script);
}

/*LUCIDE ICONS*/

function refreshLucideIcons() {
  if (
    typeof lucide !== "undefined" &&
    typeof lucide.createIcons === "function"
  ) {
    lucide.createIcons();
  }
}

/* SITTING UP NAVBAR FACILITIES*/

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

/* THEME*/

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

/* SEARCH*/
/*THIS FUNC CREATE THE FACILITIES OF SEARCH SECTION IN NAVBAR*/
function initSearch() {
  /*FINDING SEARCH ELEMENTS IN HTML*/
  const searchButton = document.getElementById("searchButton");
  const searchOverlay = document.getElementById("searchOverlay");
  const closeSearch = document.getElementById("closeSearch");
  const searchInput = document.getElementById("searchInput");
  const searchSubmit = document.getElementById("searchSubmit");
  const searchMessage = document.getElementById("searchMessage");

  if (!searchOverlay || !searchInput) return;

  let resultsContainer = document.getElementById("navbarSearchResults");

  if (!resultsContainer) {
    resultsContainer = document.createElement("div");
    resultsContainer.id = "navbarSearchResults";
    resultsContainer.className = "navbar-search-results";

    const inputWrapper = searchInput.closest(".search-input-wrapper");

    if (inputWrapper) {
      /*THIS PUT THE ELEMENT OF RESULTS AFTER inputWrapper AUTO*/
      inputWrapper.insertAdjacentElement("afterend", resultsContainer);
    } else {
      /*THE RESULTS CONTAINER IS POSITIONED IMMEDIATELY BELOW THE SEARCH BOX ITSELF*/
      searchInput.insertAdjacentElement("afterend", resultsContainer);
    }
  }

  const knownProducts = [
    "Rose Glow Eyeshadow Palette",
    "Long Lasting Foundation",
    "Matte Lipstick",
    "Soft Blush Powder",
    "Volume Mascara",
    "Hydrating Concealer",
    "Nude Lip Gloss",
    "Silk Setting Powder",
    "Precision Eyeliner",
    "Natural Glow Highlighter",
    "Hydrating Face Cream",
    "Vitamin C Serum",
    "Gentle Face Cleanser",
    "Rose Water Toner",
    "Daily SPF 50",
    "Night Repair Cream",
    "Purifying Clay Mask",
    "Eye Repair Serum",
    "Soft Body Lotion",
    "Refreshing Face Mist",
    "Repairing Hair Mask",
    "Silky Hair Shampoo",
    "Nourishing Hair Oil",
    "Volume Conditioner",
    "Scalp Care Treatment",
    "Smooth Hair Serum",
    "Deep Repair Conditioner",
    "Gloss Hair Spray",
    "Keratin Hair Treatment",
    "Daily Hair Mist",
    "Eau de Parfum",
    "Rose Blossom Perfume",
    "Velvet Night Perfume",
    "Fresh Bloom Mist",
    "Elegant Rose Eau",
    "Golden Bloom",
    "Soft Vanilla Perfume",
    "Pure Jasmine",
    "Midnight Rose",
    "EVE Signature Scent",
    "Cica Repair Cream",
    "Vitamin C Glow Serum",
    "Rose Milk Cleanser",
    "Hydra Cream",
    "Fit Me Foundation",
    "Dior Addict Lip Glow",
    "Lash Sensational Mascara",
    "Les Beiges Powder",
    "Radiance Facial Serum",
    "Radiant Dew Cream",
    "Peptide Glow Serum",
    "Cherry Cloud Blush",
    "Satin Bloom Eyeshadow",
    "Glass Skin Essence",
    "Velvet Bloom Lip Tint",
    "Blossom Hair Perfume",
    "Cloud Silk Hair Oil",
    "Petal Veil Highlighter",
    "Blush Blossom Eau",
    "Moonlit Petal Mist",
    "Glow SPF 50",
    "Hyaluronic Acid Serum",
    "Purifying Toner",
    "SuperStay Lip Color",
    "Velvet Matte Lipstick",
    "Soft Glam Eyeshadow",
    "Flawless Foundation",
    "Silk Repair Hair Mask",
    "Glossy Hair Oil",
    "Noiré Eau de Parfum",
    "Rose Essence",
    "EVE Glow Beauty Set",
    "Luxe Skincare Set",
    "Haircare Premium Set",
    "Makeup Essentials Set",
    "Signature Fragrance Set",
  ];

  // New Arrivals products
  const newArrivalsProducts = [
    "Radiant Dew Cream",
    "Peptide Glow Serum",
    "Cherry Cloud Blush",
    "Satin Bloom Eyeshadow",
    "Glass Skin Essence",
    "Rose Milk Cleanser",
    "Velvet Bloom Lip Tint",
    "Blossom Hair Perfume",
    "Cloud Silk Hair Oil",
    "Petal Veil Highlighter",
    "Blush Blossom Eau",
    "Moonlit Petal Mist",
  ];

  // Best Sellers products
  const bestSellersProducts = [
    "Cica Repair Cream",
    "Vitamin C Glow Serum",
    "Hydra Cream",
    "Fit Me Foundation",
    "Dior Addict Lip Glow",
    "Lash Sensational Mascara",
    "Les Beiges Powder",
    "Radiance Facial Serum",
    "Rose Water Toner",
  ];

  // Trending products
  const trendingProducts = [
    "Glow SPF 50",
    "Hyaluronic Acid Serum",
    "Purifying Toner",
    "SuperStay Lip Color",
    "Velvet Matte Lipstick",
    "Soft Glam Eyeshadow",
    "Flawless Foundation",
    "Silk Repair Hair Mask",
    "Glossy Hair Oil",
    "Noiré Eau de Parfum",
    "Rose Essence",
    "EVE Glow Beauty Set",
    "Luxe Skincare Set",
    "Haircare Premium Set",
    "Makeup Essentials Set",
    "Signature Fragrance Set",
  ];

  /*THIS SELECT THE DESTINATION PAGE FOR EACH PRODUCT*/
  function getProductDestination(productName) {
    const name = productName.trim().toLowerCase();

    if (newArrivalsProducts.some((product) => product.toLowerCase() === name)) {
      return "new-arrivals.html";
    }

    if (bestSellersProducts.some((product) => product.toLowerCase() === name)) {
      return "best-sellers.html";
    }

    if (trendingProducts.some((product) => product.toLowerCase() === name)) {
      return "trending.html";
    }

    /* All ANOTHER PRODUCT GO TO SHOP Page*/
    return "shop.html";
  }

  /*FINDING THE NAME OF PRODUCTS FROM 3 DIFFERENT PLACES*/
  function getSearchProducts() {
    const names = [...knownProducts];

    if (window.eveBeautyShop && Array.isArray(window.eveBeautyShop.products)) {
      window.eveBeautyShop.products.forEach((product) => {
        if (product && product.name) {
          names.push(product.name);
        }
      });
    }
    /*FINDING HTML*/

    document
      .querySelectorAll(".product-card, .product-item, [data-product-name]")
      .forEach((card) => {
        const name =
          card.dataset.productName ||
          card
            .querySelector(".product-name, .product-title, h2, h3, h4")
            ?.textContent?.trim();

        if (name) names.push(name);
      });

    return [...new Set(names.map((name) => name.trim()).filter(Boolean))];
  }

  function showResults(query) {
    resultsContainer.replaceChildren();

    const value = query.trim().toLowerCase();

    if (!value) {
      resultsContainer.hidden = true;

      if (searchMessage) searchMessage.textContent = "";

      return;
    }

    const matches = getSearchProducts()
      .filter((name) => name.toLowerCase().includes(value))
      .slice(0, 10);

    /*WHEN SONT FIND ANTRTHING BR SEARCH*/
    if (matches.length === 0) {
      resultsContainer.hidden = true;

      if (searchMessage) {
        searchMessage.textContent = "No matching products found.";
      }

      return;
    }

    if (searchMessage) searchMessage.textContent = "";

    matches.forEach((name) => {
      const item = document.createElement("button");

      item.type = "button";
      item.className = "navbar-search-result-item";
      item.textContent = name;

      item.addEventListener("click", () => {
        const destination = getProductDestination(name);

        window.location.href =
          destination + "?search=" + encodeURIComponent(name);
      });
      //*THE BUTTON ADD THE SHAYKH WANT TO CONTINUE TO CODING*/
      /*THIS ADD THE BUTTON TNTO RESULT CONTAINERS*/
      resultsContainer.appendChild(item);
    });
    /*THE RESULT CONTAINER WILL SHOW*/

    resultsContainer.hidden = false;
  }
  /*THIS FUNC OPEN THE SEARCH WINDOW*/
  function openSearch() {
    searchOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    setTimeout(() => searchInput.focus(), 200);
  }
  /*THIS FUNC CLOSE THE SEARCH BAR*/
  function closeSearchBox() {
    searchOverlay.classList.remove("active");
    document.body.style.overflow = "";
    searchInput.value = "";
    /*ALL THE PERVIOSE RESULT WILL REMOVE*/
    resultsContainer.replaceChildren();
    resultsContainer.hidden = true;
    /*IF THE ELEMENT OF PAGE IS EXIST BUT IT TRY TO CHARGR*/
    if (searchMessage) searchMessage.textContent = "";
  }

  /*THIS FUNCTION USE WHEN THE USER WANT THAT SEARCH THE CONTENT BY SEARCH  BAR*/
  function performSearch() {
    const value = searchInput.value.trim();

    if (!value) {
      if (searchMessage) {
        searchMessage.textContent = "Please enter a product name.";
      }

      return;
    }
    /*THIS SPECIFIES THE CONTENT*/
    const destination = getProductDestination(value);
    /*THE PUT THE SEARCH INTO URL*/
    window.location.href = destination + "?search=" + encodeURIComponent(value);
  }

  searchButton?.addEventListener("click", (event) => {
    event.preventDefault();
    openSearch();
  });

  closeSearch?.addEventListener("click", closeSearchBox);

  searchSubmit?.addEventListener("click", performSearch);
  /*THIS TRY TO SEARCH DURING TYPING*/

  searchInput.addEventListener("input", () => {
    showResults(searchInput.value);
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      performSearch();
    }
  });

  searchOverlay.addEventListener("click", (event) => {
    if (event.target === searchOverlay) closeSearchBox();
  });
  /*CLOSING THE SEARCH OVERLAY WITH ESCAPE KEY*/
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchOverlay.classList.contains("active")) {
      closeSearchBox();
    }
  });
}

/* DROPDOWNS*/
function initDropdowns() {
  /*THIS CHOOSE THE ALL ELEMENTS BY THE CLASSNAME OF DROPDOWN EXCLUDE OF .navbar-account*/
  const dropdowns = document.querySelectorAll(".dropdown:not(.navbar-account)");

  if (!dropdowns.length) {
    return;
  }
  /*THIS FIND THE BUTTON OF MEUE OPENIMG*/
  function getToggle(dropdown) {
    return (
      /*HERE BY USING Scop WE SAY THAT START FROM THIS ELEMENT AND JUST CHOOSE THE DIRECT CHILD*/
      dropdown.querySelector(":scope > .dropdown-toggle") ||
      /*IF THE BUTTON DONT FIND BY FIRST STRUCTURE , 
      THN THIS CONDITION TRY TO FIND A BUTTON THAT IS INSIDE OF .shop-nav-wrapper*/
      dropdown.querySelector(".shop-nav-wrapper > .dropdown-toggle")
    );
  }

  /*THIS IS FOR CLOSING OF SPECIFIC MENU*/
  function closeDropdown(dropdown) {
    /*THIS SAY THAT REMOVE THE OPEN CLASS*/
    dropdown.classList.remove("open");

    const toggle = getToggle(dropdown);
    /*THIS ATTRIBUTE USE FOR ACCESSABILITY AND HELP FOR READERS TO DISTINGUISH THE SITUATION */
    toggle?.setAttribute(
      "aria-expanded",

      "false",
    );
  }
  /*THIS CLOSE THE ALL MENU EXCEPT THE MENU THAT SPECIFIES BECAUSE OF REQUIREMENT*/
  function closeAllDropdowns(except = null) {
    dropdowns.forEach((dropdown) => {
      /*IF THE CURRENT MEN IS THE MENU THAT MUST REMAIN OPEN IT IS PROCESS WILL STOP*/
      if (except && dropdown === except) {
        return;
      }
      /*THIS CLOSE ANOTHER MENU*/
      closeDropdown(dropdown);
    });
  }
  /*OPENING AND CLOSING OF MENU BY CLICK*/
  dropdowns.forEach((dropdown) => {
    const toggle = getToggle(dropdown);

    if (!toggle) {
      return;
    }
    /*HERE BY CLICKING ON BUTTON THE INNER FUNCTION EXECUTE*/
    toggle.addEventListener(
      "click",

      (event) => {
        event.preventDefault();

        event.stopPropagation();
        /*THIS CHECK THAT ARE THE MENU WAS ALREADY OPEN*/
        const isOpen = dropdown.classList.contains("open");
        /*THE ALL MENU WILL CLOSE BUT THE CURRENT USER WILL NOT  OPEN*/
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
      /*THIS CHECK THAT ARE THE CLICLKED ELEMENT OR ANY OF ITS PARENT HAS .dropdown CLASS8*/
      /*IF THE CLICKED ELEMENT BE OUTSIDE OF EACH DROPDOWN THE ALL MENU WILL CLOSE*/
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

/* MOBILE MENU*/

function initMobileMenu() {
  const mobileMenuButton = document.getElementById("mobileMenuButton");

  const mobileMenu = document.getElementById("mobileMenu");

  const mobileClose = document.getElementById("mobileClose");

  if (!mobileMenu || !mobileMenuButton) {
    return;
  }

  /*OPENING OF MOBILE MENU*/
  function openMobileMenu() {
    /*THIS ADD THE ACTIVE CLASS TO MENU*/
    mobileMenu.classList.add("active");

    mobileMenuButton.setAttribute(
      "aria-expanded",

      "true",
    );

    /*THIS UNACTIVE THE THE SCROLL OF MAIN PAGE*/
    document.body.style.overflow = "hidden";
  }
  /*CLOSING OF MOBILE MENU*/
  function closeMobileMenu() {
    mobileMenu.classList.remove("active");

    mobileMenuButton.setAttribute(
      "aria-expanded",

      "false",
    );
    /*THE LIMITATION OF SCROLLING WILLBREMOVE*/
    document.body.style.overflow = "";
    /*THIS FIND THE ALL ELEMENTS THAT HAVE DROPDOWN CLASS*/
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
      /*THIS CHECK THAT ARE THE MENU HAS THE ACTIVE CLASS OR N0*/
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
    /*THIS FIND ALL LINKS EXCEPT THE LINKS THAT HAVE THE .shop-main-link CLASS*/
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

/* ACTIVE NAV*/

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
    /*THIS CHECK THAT ARE THE LINK PAGE IS THE SAME OF CURRENT PAGE*/
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

/*PAGE TRANSITIONS*/

function initPageTransitions() {
  document.body.classList.remove("page-transition-out");

  document.body.classList.add("page-transition-in");

  const links = document.querySelectorAll("a[href]");

  links.forEach((link) => {
    /*HERE THE CODE CHECK THAT ARE THE LINK ALREADY PREPARED FOR ANIMATION OR NO*/
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

        /* SKIP SPECIAL LINKS */

        if (
          href.startsWith("#") ||
          href.startsWith("javascript:") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:")
        ) {
          return;
        }

        /* SKIP NEW TABS*/

        if (
          link.target === "_blank" ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        /* SKIP DOWNLOADS */

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

        /* THE ANIMATION MUST EXECUTE JUST FOR INTERNAL PAGES */
        if (url.origin !== window.location.origin) {
          return;
        }

        /* THE LINK OF SAME PAGE  */

        if (
          url.pathname === window.location.pathname &&
          url.search === window.location.search &&
          url.hash
        ) {
          return;
        }

        /* Don't animate javascript THAT generated special links.*/

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

/*CURRENT USER */

function getEveBeautyCurrentUser() {
  /* NEW LOGIN SYSTEM*/

  const currentUserData = localStorage.getItem("eveBeautyCurrentUser");
  /*THIS CHECK THAT ARE ANY INFO FOUNDED TO USER OR NO*/
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

  /* OLD SYSTEM FOR USER */

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
/* USER-SPECIFIC WISHLIST / CART STORAGE */

function getEveBeautyUserStorageKey(key) {
  const user = getEveBeautyCurrentUser();

  if (!user) {
    return null;
  }

  const userId = getEveBeautyUserIdentifier(user);

  if (!userId || userId === "guest") {
    return null;
  }

  return `${key}_${encodeURIComponent(userId)}`;
}
/*READING OF STORED INFO OF USER*/
function getEveBeautyUserStorageArray(key) {
  const storageKey = getEveBeautyUserStorageKey(key);

  if (!storageKey) {
    return [];
  }

  try {
    const data = JSON.parse(localStorage.getItem(storageKey) || "[]");
    /*THIS CHECK ARE DATA IS ARRAY OR NO*/
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn(`Could not read ${storageKey}:`, error);
    return [];
  }
}

function setEveBeautyUserStorageArray(key, items) {
  const storageKey = getEveBeautyUserStorageKey(key);

  if (!storageKey) {
    return false;
  }

  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify(Array.isArray(items) ? items : []),
    );
    return true;
  } catch (error) {
    console.error(`Could not save ${storageKey}:`, error);
    return false;
  }
}
/* CHECK LOGIN*/
/*THIS CREATE A FUNC TO CHECK ARE THERE IS ANY INFO FOR CURRENT USER*/
function isEveBeautyLoggedIn() {
  return !!getEveBeautyCurrentUser();
}

/* USER IDENTIFIER
 Every account gets its own avatar key. */

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

/*USER AVATAR STORAGE KEY */

function getUserAvatarStorageKey(user) {
  return "eveBeautyProfileImage_" + getEveBeautyUserIdentifier(user);
}

/* GET USER AVATAR */

function getUserAvatar(
  user,

  userName,
) {
  if (!user) {
    return createDefaultAvatar(userName);
  }

  const userAvatarKey = getUserAvatarStorageKey(user);
  /*FIRST: CURRENT USER'S OWN IMAGE*/

  const ownImage = localStorage.getItem(userAvatarKey);

  if (ownImage) {
    return ownImage;
  }

  /* BACKWARD COMPATIBILITY

     If an older version stored one global image,

     assign it to the CURRENT user only and remove

     the old global key.

     This prevents the old image from remaining shared.*/

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

  /*  NO IMAGE */

  return createDefaultAvatar(userName);
}

/* ACCOUNT*/

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

  /* UPDATE ACCOUNT UI*/
  function updateAccountUI() {
    const user = getEveBeautyCurrentUser();

    const loggedIn = !!user;

    /* LOGGED OUT */

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

    /* LOGGED IN */

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

    /* USER NAME */

    const userName =
      user.name || user.fullName || user.username || "Beauty User";

    if (accountGreetingName) {
      accountGreetingName.textContent = userName;
    }

    /*  USER EMAIL */

    const accountEmail = document.getElementById("accountGreetingEmail");

    if (accountEmail) {
      accountEmail.textContent = user.email || "";
    }

    /* USER PROFILE IMAGE*/

    const avatarSource = getUserAvatar(
      user,

      userName,
    );

    /*MAIN NAVBAR AVATAR */

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

    /* DROPDOWN AVATAR */

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

    /* ACCOUNT BUTTON*/

    accountButton.setAttribute(
      "aria-label",

      `My Profile - ${userName}`,
    );

    accountButton.setAttribute(
      "title",

      "My Profile",
    );

    /*COUNTS */

    updateAccountOrderCount();

    updateNavbarCounts();

    refreshLucideIcons();
  }

  /*ACCOUNT BUTTON*/

  accountButton.addEventListener(
    "click",

    (event) => {
      event.preventDefault();

      event.stopPropagation();

      const isOpen = accountParent.classList.contains("open");

      /*CloseTHE USER dropdowns BEFORE THE USER NOT EXIST*/

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

      /* Toggle account dropdown*/

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

  /*  LOGOUT*/

  logoutButton?.addEventListener(
    "click",

    (event) => {
      event.preventDefault();

      /* NEW LOGIN SYSTEM */

      localStorage.removeItem("eveBeautyCurrentUser");

      /*OLD LOGIN SYSTEM  */

      localStorage.removeItem("eveBeautyLoggedIn");

      localStorage.removeItem("eveBeautyUser");

      /*Close dropdown*/

      accountParent.classList.remove("open");

      accountButton.setAttribute(
        "aria-expanded",

        "false",
      );

      /*Update UI immediately */

      updateAccountUI();

      updateNavbarCounts();

      /*Go home*/

      navigateWithPageTransition("index.html");
    },
  );

  /* OUTSIDE CLICK */

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

  /* ESCAPE*/

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

  /* STORAGE */

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
        event.key === "eveBeautyWishlist" ||
        event.key?.startsWith("eveBeautyCart_") ||
        event.key?.startsWith("eveBeautyWishlist_")
      ) {
        updateAccountUI();

        updateNavbarCounts();

        renderWishlistDropdown();

        renderCartDropdown();
      }
    },
  );

  /* CUSTOM EVENT*/

  window.addEventListener(
    "eveBeautyUserChanged",

    () => {
      updateAccountUI();

      updateNavbarCounts();

      renderWishlistDropdown();

      renderCartDropdown();
    },
  );

  /*  PROFILE IMAGE CUSTOM EVENT

     Useful when profile changes image

     in the SAME browser tab. */

  window.addEventListener(
    "eveBeautyProfileImageChanged",

    () => {
      updateAccountUI();
    },
  );

  /* INITIAL ACCOUNT STATE

  ======================================================= */

  updateAccountUI();
}

/* ACCOUNT ORDER COUNT*/

function updateAccountOrderCount() {
  const orderBadge = document.getElementById("accountOrderCount");

  if (!orderBadge) {
    return;
  }

  const user = getEveBeautyCurrentUser();

  if (!user || !isEveBeautyLoggedIn()) {
    orderBadge.textContent = "";
    orderBadge.style.display = "none";
    return;
  }

  const userId = getEveBeautyUserIdentifier(user);

  if (!userId || userId === "guest") {
    orderBadge.textContent = "";
    orderBadge.style.display = "none";
    return;
  }

  const storageKey = "eveBeautyOrders_" + encodeURIComponent(userId);

  let orders = [];

  try {
    const savedOrders = localStorage.getItem(storageKey);
    const parsedOrders = savedOrders ? JSON.parse(savedOrders) : [];
    orders = Array.isArray(parsedOrders) ? parsedOrders : [];
  } catch (error) {
    console.error("Error reading user orders:", error);
    orders = [];
  }

  const count = orders.length;

  orderBadge.textContent = count > 99 ? "99+" : String(count);
  orderBadge.style.display = count > 0 ? "" : "none";
}

/* READ LOCAL STORAGE ARRAY*/

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

/* NUMBER HELPER OF CART */

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

/* PRODUCT NAME HELPER FOR CART*/

function getProductName(product) {
  if (!product) {
    return "Beauty Product";
  }

  return (
    product.name || product.title || product.productName || "Beauty Product"
  );
}

/*  PRODUCT IMAGE HELPER FOR CART */

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

/*FORMAT PRICE */

function formatEveBeautyPrice(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "$0.00";
  }

  return "$" + number.toFixed(2);
}

/* ESCAPE HTML FOR DROPDOWN */

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

/* SAFE PRODUCT IMAGE HTML= */

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

/* WISHLIST DROPDOWN*/

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

      if (!isEveBeautyLoggedIn()) {
        wrapper.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        renderWishlistDropdown();
        alert("Please sign in to view your wishlist.");
        return;
      }

      const isOpen = wrapper.classList.contains("open");
      /*THIS CLOSE ANOTHER DROPDOWNS DURING OPEN OF THIS DROPDOWN*/
      closeAllNavbarActionDropdowns(wrapper);

      document

        .querySelectorAll(".dropdown.open")
        /*THIS CHECK EACH ITEM TO REMOVE OPEN FROM ANOTHER DROPDOWN*/
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

/* RENDER WISHLIST */

function renderWishlistDropdown() {
  const itemsContainer = document.getElementById("wishlistDropdownItems");
  const emptyState = document.getElementById("wishlistDropdownEmpty");

  if (!itemsContainer || !emptyState) return;

  if (!isEveBeautyLoggedIn()) {
    itemsContainer.innerHTML = "";
    itemsContainer.style.display = "none";
    emptyState.style.display = "none";
    return;
  }

  const wishlist = getEveBeautyUserStorageArray("eveBeautyWishlist");

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
      <div class="mini-product-item"
           data-wishlist-index="${index}"
           data-product-id="${escapeHTML(id)}">
        ${createMiniProductImage(product)}

        <div class="mini-product-info">
          <div class="mini-product-name" title="${escapeHTML(name)}">
            ${escapeHTML(name)}
          </div>

          <div class="mini-product-meta">
            <span class="mini-product-price">
              ${formatEveBeautyPrice(price)}
            </span>
          </div>
        </div>

        <button type="button"
                class="mini-product-remove wishlist-remove-button"
                data-wishlist-index="${index}"
                aria-label="Remove ${escapeHTML(name)} from wishlist"
                title="Remove">
          <i data-lucide="x"></i>
        </button>
      </div>
    `;
    })
    .join("");

  itemsContainer
    .querySelectorAll(".wishlist-remove-button")
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!isEveBeautyLoggedIn()) {
          alert("Please sign in to manage your wishlist.");
          return;
        }

        removeWishlistItem(Number(button.dataset.wishlistIndex));
      });
    });

  refreshLucideIcons();
}

/* REMOVE WISHLIST ITEM */

function removeWishlistItem(index) {
  if (!isEveBeautyLoggedIn()) {
    alert("Please sign in to manage your wishlist.");
    return;
  }

  const wishlist = getEveBeautyUserStorageArray("eveBeautyWishlist");

  if (!Number.isInteger(index) || index < 0 || index >= wishlist.length) {
    return;
  }
  /*SPLICE REMOVE THE ELEMENTS OF ARRAY*/
  wishlist.splice(index, 1);

  if (!setEveBeautyUserStorageArray("eveBeautyWishlist", wishlist)) {
    return;
  }

  updateNavbarCounts();
  renderWishlistDropdown();

  window.dispatchEvent(new CustomEvent("eveBeautyWishlistChanged"));
}
/* CART DROPDOWN */

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

      if (!isEveBeautyLoggedIn()) {
        wrapper.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        renderCartDropdown();
        alert("Please sign in to view your cart.");
        return;
      }

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

/*RENDER CART*/

function renderCartDropdown() {
  const itemsContainer = document.getElementById("cartDropdownItems");
  const emptyState = document.getElementById("cartDropdownEmpty");
  const summary = document.getElementById("cartDropdownSummary");
  const subtotalElement = document.getElementById("cartDropdownSubtotal");

  if (!itemsContainer || !emptyState) return;

  if (!isEveBeautyLoggedIn()) {
    itemsContainer.innerHTML = "";
    itemsContainer.style.display = "none";
    emptyState.style.display = "none";
    summary?.classList.remove("has-items");

    if (subtotalElement) {
      subtotalElement.textContent = "$0.00";
    }

    return;
  }

  const cart = getEveBeautyUserStorageArray("eveBeautyCart");

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
      <div class="mini-product-item"
           data-cart-index="${index}"
           data-product-id="${escapeHTML(id)}">
        ${createMiniProductImage(product)}

        <div class="mini-product-info">
          <div class="mini-product-name" title="${escapeHTML(name)}">
            ${escapeHTML(name)}
          </div>

          <div class="mini-product-meta">
            <span class="mini-product-price">
              ${formatEveBeautyPrice(price)}
            </span>

            <span class="mini-product-quantity">× ${quantity}</span>
          </div>
        </div>

        <button type="button"
                class="mini-product-remove cart-remove-button"
                data-cart-index="${index}"
                aria-label="Remove ${escapeHTML(name)} from cart"
                title="Remove">
          <i data-lucide="x"></i>
        </button>
      </div>
    `;
    })
    .join("");

  summary?.classList.add("has-items");

  if (subtotalElement) {
    subtotalElement.textContent = formatEveBeautyPrice(subtotal);
  }

  itemsContainer.querySelectorAll(".cart-remove-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!isEveBeautyLoggedIn()) {
        alert("Please sign in to manage your cart.");
        return;
      }

      removeCartItem(Number(button.dataset.cartIndex));
    });
  });

  refreshLucideIcons();
}
/* REMOVE CART ITEM*/
function removeCartItem(index) {
  if (!isEveBeautyLoggedIn()) {
    alert("Please sign in to manage your cart.");
    return;
  }

  const cart = getEveBeautyUserStorageArray("eveBeautyCart");

  if (!Number.isInteger(index) || index < 0 || index >= cart.length) {
    return;
  }

  cart.splice(index, 1);

  if (!setEveBeautyUserStorageArray("eveBeautyCart", cart)) {
    return;
  }

  updateNavbarCounts();
  renderCartDropdown();

  window.dispatchEvent(new CustomEvent("eveBeautyCartChanged"));
}

/* CLOSE NAVBAR ACTION DROPDOWNS*/

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

/*CART / WISHLIST COUNTS*/

function updateNavbarCounts() {
  const cartCount = document.getElementById("cartCount");
  const favoriteCount = document.getElementById("favoritelistCount");

  const loggedIn = isEveBeautyLoggedIn();

  const cart = loggedIn ? getEveBeautyUserStorageArray("eveBeautyCart") : [];

  const wishlist = loggedIn
    ? getEveBeautyUserStorageArray("eveBeautyWishlist")
    : [];

  const totalQuantity = cart.reduce((total, item) => {
    const quantity = Number(item?.quantity);

    return total + (Number.isFinite(quantity) && quantity > 0 ? quantity : 1);
  }, 0);

  if (cartCount) {
    cartCount.textContent =
      loggedIn && totalQuantity > 0
        ? totalQuantity > 99
          ? "99+"
          : String(totalQuantity)
        : "";

    cartCount.style.display = loggedIn && totalQuantity > 0 ? "" : "none";
  }

  document
    .getElementById("cartButton")
    ?.classList.toggle("has-items", loggedIn && totalQuantity > 0);

  if (favoriteCount) {
    favoriteCount.textContent =
      loggedIn && wishlist.length > 0
        ? wishlist.length > 99
          ? "99+"
          : String(wishlist.length)
        : "";

    favoriteCount.style.display = loggedIn && wishlist.length > 0 ? "" : "none";
  }

  document
    .getElementById("favoritelistButton")
    ?.classList.toggle("has-items", loggedIn && wishlist.length > 0);

  renderWishlistDropdown();
  renderCartDropdown();
}

/* NAVIGATION WITH TRANSITION */

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

/* DEFAULT AVATAR*/

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
