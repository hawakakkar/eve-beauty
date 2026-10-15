/* Eve Beauty JavaScript Codes */

function initHomePage() {
  /* =========================
     MAKING CONST FOR BOTH ICONS BY THEIR ID'S
  ========================= */

  const CART_KEY = "eveBeautyCart";
  const WISHLIST_KEY = "eveBeautyWishlist";
  const CART_CURRENT_USER_KEY = "eveBeautyCartCurrentUser";

  /* =========================
     Storage Helpers
  ========================= */

  function readArray(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");

      return Array.isArray(value) ? value : [];
    } catch (error) {
      console.error(`Could not read ${key}:`, error);

      return [];
    }
  }

  /* =========================
     SSAVING CART BAG
  ========================= */

  function getCurrentUser() {
    try {
      const stored = localStorage.getItem("eveBeautyCurrentUser");

      if (!stored) {
        return null;
      }

      const user = JSON.parse(stored);

      if (!user || !user.id) {
        return null;
      }

      return user;
    } catch (error) {
      console.error("Could not read current user:", error);

      return null;
    }
  }

  function getUserCartKey() {
    const user = getCurrentUser();

    if (!user) {
      return null;
    }

    return `${CART_KEY}_${user.id}`;
  }

  function getUserWishlistKey() {
    const user = getCurrentUser();

    if (!user) {
      return null;
    }

    return `${WISHLIST_KEY}_${user.id}`;
  }

  let cartItems = readArray(getUserCartKey());

  function saveCart() {
    const user = getCurrentUser();
    const userCartKey = getUserCartKey();

    if (!user || !userCartKey) {
      return false;
    }

    try {
      localStorage.setItem(userCartKey, JSON.stringify(cartItems));

      localStorage.setItem(
        CART_CURRENT_USER_KEY,
        JSON.stringify({
          userId: user.id,
          items: cartItems,
          updatedAt: new Date().toISOString(),
        }),
      );

      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));

      window.dispatchEvent(
        new CustomEvent("eveBeautyCartChanged", {
          detail: { cart: cartItems },
        }),
      );

      window.dispatchEvent(
        new CustomEvent("eveBeautyCartUpdated", {
          detail: { cart: cartItems },
        }),
      );

      return true;
    } catch (error) {
      console.error("Could not save cart:", error);

      return false;
    }
  }

  /* =========================
     SAVING WISHLIST
  ========================= */

  let wishlistItems = readArray(getUserWishlistKey());

  function saveWishlist() {
    const userWishlistKey = getUserWishlistKey();

    if (!getCurrentUser() || !userWishlistKey) {
      return false;
    }

    try {
      localStorage.setItem(userWishlistKey, JSON.stringify(wishlistItems));

      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistItems));

      window.dispatchEvent(
        new CustomEvent("eveBeautyWishlistChanged", {
          detail: { wishlist: wishlistItems },
        }),
      );

      window.dispatchEvent(
        new CustomEvent("eveBeautyWishlistUpdated", {
          detail: {
            wishlist: wishlistItems,
            count: wishlistItems.length,
          },
        }),
      );

      return true;
    } catch (error) {
      console.error("Could not save wishlist:", error);

      return false;
    }
  }

  /* =========================
     GIVING OBJECT PRODUCT ID
  ========================= */

  function getProductId(product) {
    return product?.id ?? product?.productId ?? product?._id ?? product?.sku;
  }

  /* =========================
     CHANGE A AND B TO STRING 
  ========================= */
  function sameProductId(a, b) {
    return String(a ?? "") === String(b ?? "");
  }

  function getProductFromCard(card) {
    const name =
      card.querySelector(".product-information h3")?.textContent.trim() ||
      "Beauty Product";

    const size = card.querySelector(".product-size")?.textContent.trim() || "";

    const image =
      card.querySelector(".product-pic img")?.getAttribute("src") || "";

    const priceElement = card.querySelector(".product-bottom strong");

    const oldPriceElement = card.querySelector(".product-bottom del");

    /*CHANGING PRODUCT PRICE TO NUMBER*/

    const price =
      Number((priceElement?.textContent || "$0.00").replace(/[^0-9.]/g, "")) ||
      0;

    /*CHANGING OLD PRODUCT PRICE TO NUMBER*/

    const oldPrice =
      Number((oldPriceElement?.textContent || "").replace(/[^0-9.]/g, "")) ||
      null;

    /*FINDING PRODUCT ID FOR EACH ELEMENT */

    const id =
      card.querySelector(".wishlist-button")?.dataset
        .productId /*TRY TO FIND WISHLIST BUTTON BY ITS DATASET PRODUCT ID*/ ||
      card.querySelector(".add-cart-button")?.dataset
        .productId /*TRY TO FIND CART BUTTON BY ITS DATASET PRODUCT ID*/ ||
      card.dataset.productId ||
      name /*TRY TO MAKE ID FRMO THE PRODUCT NAME*/
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    /*FINDING THE CONST OF BADGE*/
    const badge =
      card.querySelector(".product-badge")?.textContent.trim() ||
      card.querySelector(".discount-badge")?.textContent.trim() ||
      "";

    const ratingText = card.querySelector(".rating")?.textContent || "";

    const reviewsMatch =
      ratingText.match(
        /\((\d+)\)/,
      ); /*TRY TO FIND ARE THE RATING TEXT HAS ANY NUMBER INSIDE "" OR NO*/

    /*HERE, JS TRY TO RETURN THE INFO OF ALL PRODUCTS BY OBJECT FORM*/
    return {
      id,
      name,
      brand: "EVE Beauty",
      category: "Beauty",
      type: "Beauty Product",
      skin: "",
      price,
      oldPrice,
      discount: badge,
      rating: 5,
      reviews: reviewsMatch ? Number(reviewsMatch[1]) : 0,
      image,
      size,
    };
  }

  /* =========================
     Cart Quantity
  ========================= */

  /*RETURNING THE TOTAL AMOUNT OF ALL ITEMS CARD*/

  function getCartQuantity() {
    return cartItems.reduce((total, item) => {
      const quantity = Number(item?.quantity);

      return total + (Number.isFinite(quantity) && quantity > 0 ? quantity : 1);
    }, 0);
  }

  /* =========================
     THIS TRY TO FIND THE Cart Total
  ========================= */

  function getCartTotal() {
    return cartItems.reduce((total, item) => {
      const price = Number(item?.price) || 0;

      const quantity = Number(item?.quantity);

      const safeQuantity =
        Number.isFinite(quantity) && quantity > 0 ? quantity : 1;

      return total + price * safeQuantity;
    }, 0); /*THE ADDITION MUST START FROM 0*/
  }

  /* =========================
     Update Cart Counter
  ========================= */

  function updateCartCounter() {
    const quantity = getCartQuantity();

    document
      .querySelectorAll(
        "#cartCount, #cartBadge, .cart-count, .cart-badge, [data-cart-count]",
      )
      .forEach((element) => {
        element.textContent = quantity > 99 ? "99+" : String(quantity);

        element.style.display = "";
      });

    const cartButton = document.getElementById("cartButton");

    cartButton?.classList.toggle("has-items", quantity > 0);
  }

  /* =========================
     Update Wishlist Counter
  ========================= */

  function updateWishlistCounter() {
    const count = wishlistItems.length;

    document
      .querySelectorAll(
        "#favoritelistCount, #wishlistCount, #wishlistBadge, " +
          ".wishlist-count, .wishlist-badge, [data-wishlist-count]",
      )
      .forEach((element) => {
        element.textContent = count > 99 ? "99+" : String(count);

        element.style.display = "";
      });

    const dropdownCount = document.getElementById("wishlistDropdownCount");

    if (dropdownCount) {
      dropdownCount.textContent = count > 99 ? "99+" : String(count);
    }

    const wishlistButton = document.getElementById("favoritelistButton");

    wishlistButton?.classList.toggle("has-items", count > 0);
  }

  /* =========================
     Update Both Navbar Counts
  ========================= */

  function updateNavbarCounters() {
    updateCartCounter();
    updateWishlistCounter();
  }

  function showCartMessage(message) {
    let toast = document.getElementById("eveBeautyCartToast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "eveBeautyCartToast";

      Object.assign(toast.style, {
        position: "fixed",
        left: "50%",
        bottom: "3050px",
        top: "auto",
        right: "auto",
        transform: "translateX(-50%)",
        zIndex: "999999",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 20px",
        background: "#fffaf8",
        color: "#493539",
        border: "1px solid #eadbd8",
        borderRadius: "12px",
        boxShadow: "0 8px 30px rgba(73, 53, 57, 0.14)",
        fontFamily: "Inter, sans-serif",
        fontSize: "13px",
        opacity: "1",
        visibility: "visible",
      });

      const icon = document.createElement("span");
      icon.textContent = "✓";

      Object.assign(icon.style, {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        background: "#a7797d",
        color: "#ffffff",
        flexShrink: "0",
      });

      const text = document.createElement("span");
      text.id = "eveBeautyCartToastText";

      toast.append(icon, text);
      document.body.appendChild(toast);
    }

    const text = toast.querySelector("#eveBeautyCartToastText");

    if (text) {
      text.textContent = message;
    }

    clearTimeout(window.eveBeautyToastTimer);

    window.eveBeautyToastTimer = setTimeout(() => {
      toast.remove();
    }, 2500);
  }
  /* =========================
    ANALYZE OF PRODUCTS IN CART THAT ARE IT EXIST IN CART OR NO
  ========================= */

  function isProductInCart(productId) {
    /*SOME ANALYZE THE PRODUCTS THAT IS IN CART BAG*/
    return cartItems.some((item) =>
      sameProductId(getProductId(item), productId),
    );
  }

  function updateWishlistButton(button, active) {
    if (!button) return;

    button.classList.toggle("active", active);

    button.setAttribute(
      "aria-label",
      active ? "Remove from wishlist" : "Add to wishlist",
    );

    button.setAttribute("aria-pressed", active ? "true" : "false");

    button.style.removeProperty("color");
  }

  /*THIS FIND THE WISHLIST BUTTONS AND TRY TO CHECK THEIR SITUATION*/
  function updateWishlistButtons() {
    document.querySelectorAll(".wishlist-button").forEach((button) => {
      const productId = button.dataset.productId;

      updateWishlistButton(button, isProductInWishlist(productId));
    });
  }

  function updateCartButton(button, added) {
    if (!button) return;

    button.classList.toggle("in-cart", added);

    button.setAttribute(
      "aria-label",
      added ? "Remove from cart" : "Add to cart",
    );

    button.setAttribute("aria-pressed", added ? "true" : "false");

    button.innerHTML = '<i data-lucide="shopping-bag"></i>';

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  /*THIS ANALYZE THE CONDITIONS OF ALL ADD BUTTONS AND WILL UPDATE THE*/
  function updateAllCartButtons() {
    document.querySelectorAll(".add-cart-button").forEach((button) => {
      const productId = button.dataset.productId;

      updateCartButton(button, isProductInCart(productId));
    });
  }

  /*ADDING PRODUCT TO CART BY LOGIN AND WITHOUT IT IT CANT ADD*/
  function addToCart(product) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      localStorage.setItem("eveBeautyLoginRedirect", "index.html");

      Swal.fire({
        icon: "warning",
        title: "Sign in required",
        text: "Please sign in first to add products to your cart.",
        confirmButtonText: "Sign in",
      }).then(() => {
        window.location.href = "login.html";
      });

      return false;
    }

    const productId = getProductId(product);

    if (productId == null) {
      return false;
    }

    const existingIndex = cartItems.findIndex((item) =>
      sameProductId(getProductId(item), productId),
    );

    if (existingIndex !== -1) {
      cartItems.splice(existingIndex, 1);

      if (!saveCart()) {
        return false;
      }

      updateNavbarCounters();
      updateAllCartButtons();

      showCartMessage(`${product.name} removed from cart`);

      window.dispatchEvent(new CustomEvent("eveBeautyCartChanged"));

      return true;
    }

    cartItems.push({
      ...product,
      id: productId,
      quantity: 1,
    });

    if (!saveCart()) {
      alert("Could not save the product to your cart.");

      return false;
    }

    updateNavbarCounters();
    updateAllCartButtons();

    showCartMessage(`${product.name} added to cart`);
    console.log(
      "Toast element:",
      document.getElementById("eveBeautyCartToast"),
    );
    console.log(
      "Toast styles:",
      document.getElementById("eveBeautyCartToast")?.getAttribute("style"),
    );
    window.dispatchEvent(new CustomEvent("eveBeautyCartChanged"));

    return true;
  }

  /* THIS FUNCTION CHECK THAT ARE THE PRODUCT EXIST IN WISHLISH  */

  function isProductInWishlist(productId) {
    return wishlistItems.some((item) =>
      sameProductId(getProductId(item), productId),
    );
  }

  /*THIS CHANGE THE COLOR OF HEART*/
  function updateWishlistButton(button, active) {
    if (!button) return;

    button.classList.toggle("active", active);

    button.setAttribute(
      "aria-label",
      active ? "Remove from wishlist" : "Add to wishlist",
    );

    button.setAttribute("aria-pressed", active ? "true" : "false");

    button.style.color = active ? "#aa8386" : "";

    const heart = button.querySelector("svg");

    if (heart) {
      heart.style.fill = active ? "currentColor" : "none";
    }
  }

  /*update of all heart buttons*/
  function updateWishlistButtons() {
    document.querySelectorAll(".wishlist-button").forEach((button) => {
      const productId = button.dataset.productId;

      updateWishlistButton(button, isProductInWishlist(productId));
    });

    if (window.lucide) {
      window.lucide.createIcons();

      document
        .querySelectorAll(".wishlist-button.active svg")
        .forEach((heart) => {
          heart.style.fill = "currentColor";
        });
    }
  }

  /*ACTIVING OF WISHLIST AND CART BUTTON BY LOGGED IN USER AND WITHOUT LOGGED IN IT MUST NOT WORK*/
  function toggleWishlist(product) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      localStorage.setItem("eveBeautyLoginRedirect", "index.html");

      Swal.fire({
        icon: "warning",
        title: "Sign in required",
        text: "Please sign in first to add products to your wishlist.",
        confirmButtonText: "Sign in",
      }).then(() => {
        window.location.href = "login.html";
      });

      return false;
    }

    const productId = getProductId(product);

    if (productId == null) {
      return false;
    }

    const existingIndex = wishlistItems.findIndex((item) =>
      sameProductId(getProductId(item), productId),
    );

    if (existingIndex !== -1) {
      wishlistItems.splice(existingIndex, 1);

      if (!saveWishlist()) {
        return false;
      }

      updateNavbarCounters();
      updateWishlistButtons();

      showCartMessage(`${product.name} removed from your wishlist`);
    } else {
      wishlistItems.push({
        id: productId,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        category: product.category,
      });

      if (!saveWishlist()) {
        alert("Could not update your wishlist.");

        return false;
      }

      updateNavbarCounters();
      updateWishlistButtons();

      showCartMessage(`${product.name} added to your wishlist`);
    }

    window.dispatchEvent(new CustomEvent("eveBeautyWishlistChanged"));

    return true;
  }

  /* THIS LINE FIND THE PRODUCTS CARDS */

  document.querySelectorAll(".product-card").forEach((card) => {
    const product = getProductFromCard(card);

    const wishlistButton = card.querySelector(".wishlist-button");

    const cartButton = card.querySelector(".add-cart-button");

    wishlistButton?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      toggleWishlist(product);
    });

    cartButton?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      addToCart(product);
    });
  });

  /*Initial State*/

  updateWishlistButtons();
  updateAllCartButtons();
  updateNavbarCounters();

  /* THIS WIL SYNC THE Same Page Car */

  window.addEventListener("eveBeautyCartChanged", () => {
    cartItems = readArray(getUserCartKey());

    updateCartCounter();
    updateAllCartButtons();
  });

  /* Same Page Wishlist Sync */

  window.addEventListener("eveBeautyWishlistChanged", () => {
    wishlistItems = readArray(getUserWishlistKey());

    updateWishlistCounter();
    updateWishlistButtons();
  });

  /* THIS WILL SYNC THE CART PRODUCT INFO FROM STORAGE */

  window.addEventListener("storage", (event) => {
    const userCartKey = getUserCartKey();
    const userWishlistKey = getUserWishlistKey();

    if (
      event.key === userCartKey ||
      event.key === CART_KEY ||
      event.key === CART_CURRENT_USER_KEY
    ) {
      cartItems = readArray(getUserCartKey());

      updateCartCounter();
      updateAllCartButtons();
    }

    if (event.key === userWishlistKey || event.key === WISHLIST_KEY) {
      wishlistItems = readArray(getUserWishlistKey());

      updateWishlistCounter();
      updateWishlistButtons();
    }
  });

  /* THE NEWSLETTER PLACE */

  const newsletterForm = document.getElementById("newsletterForm");

  const emailInput = document.getElementById("emailInput");

  const newsletterMessage = document.getElementById("newsletterMessage");

  newsletterForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!emailInput || !newsletterMessage) {
      return;
    }

    const email = emailInput.value.trim();

    if (!email) {
      newsletterMessage.textContent = "Please enter your email.";

      return;
    }

    newsletterMessage.textContent = "Thank you! You are now subscribed.";

    emailInput.value = "";
  });

  /* INITIAL COUNTERS */

  updateNavbarCounters();

  /* SAME PAGE CART SYNC */

  window.addEventListener("eveBeautyCartUpdated", () => {
    cartItems = readArray(getUserCartKey());

    updateCartCounter();

    updateAllCartButtons();
  });

  /*SAME PAGE WISHLIST COUNTER*/

  window.addEventListener("eveBeautyWishlistUpdated", () => {
    wishlistItems = readArray(getUserWishlistKey());

    updateWishlistCounter();

    updateWishlistButtons();
  });

  /* OTHER TABS PAGE SYNC */

  window.addEventListener("storage", (event) => {
    const user = getCurrentUser();

    if (!user) {
      return;
    }

    const userCartKey = getUserCartKey();

    const userWishlistKey = getUserWishlistKey();

    if (
      event.key === userCartKey ||
      event.key === CART_KEY ||
      event.key === CART_CURRENT_USER_KEY
    ) {
      cartItems = readArray(getUserCartKey());

      updateCartCounter();

      updateAllCartButtons();
    }

    if (event.key === userWishlistKey || event.key === WISHLIST_KEY) {
      wishlistItems = readArray(getUserWishlistKey());

      updateWishlistCounter();

      updateWishlistButtons();
    }
  });

  /*  Image Error Handling */

  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-error");
    });
  });

  /* Lucide Icons*/

  if (window.lucide) {
    lucide.createIcons();
  }
}
/* =========================
     BEAUTY JOURNAL MODAL
  ========================= */

const journalModal = document.getElementById("journalModal");
const journalModalClose = document.getElementById("journalModalClose");
const journalModalDone = document.getElementById("journalModalDone");

const journalModalImage = document.getElementById("journalModalImage");
const journalModalCategory = document.getElementById("journalModalCategory");
const journalModalTitle = document.getElementById("journalModalTitle");
const journalModalDescription = document.getElementById(
  "journalModalDescription",
);
const journalModalExtra = document.getElementById("journalModalExtra");

let previousJournalFocus = null;

/* FULL INFORMATION FOR EACH ARTICLE */

const journalArticles = {
  "Simple Steps for Beautiful Skin": {
    description:
      "Beautiful-looking skin starts with a consistent routine. You do not need dozens of products to care for your skin. Focus on gentle cleansing, hydration, sun protection, and choosing products that suit your skin's needs.",
    heading: "Your Everyday Skincare Routine",
    tips: [
      "Cleanse your face gently in the morning and evening.",
      "Apply a moisturizer suitable for your skin type.",
      "Use broad-spectrum SPF 30 or higher during the day.",
      "Introduce new skincare products one at a time.",
    ],
  },

  "Everyday Makeup Made Easy": {
    description:
      "An everyday makeup look can be simple, elegant, and effortless. Start with moisturized skin, choose lightweight products, and build coverage gradually. A few carefully selected essentials can help you create a fresh look for any occasion.",
    heading: "Create Your Everyday Look",
    tips: [
      "Prepare your skin with moisturizer and sunscreen.",
      "Use foundation or concealer only where you need coverage.",
      "Add blush and softly define your brows.",
      "Finish with mascara and your favorite lip color.",
    ],
  },

  "Little Beauty Secrets": {
    description:
      "Small beauty habits can make your daily routine feel more enjoyable. From keeping your makeup tools clean to finding shades that complement your personal style, the best beauty routine is one that feels comfortable and works for you.",
    heading: "Little Habits, Lovely Results",
    tips: [
      "Clean makeup brushes regularly.",
      "Keep your skincare routine simple and consistent.",
      "Choose makeup shades that make you feel confident.",
      "Remove makeup gently before going to bed.",
    ],
  },
};

/* OPEN MODAL */

function openJournalModal(card) {
  if (!journalModal || !card) return;

  const title =
    card.querySelector("h3")?.textContent.trim() || "Beauty Journal";

  const category =
    card.querySelector(".beauty-journal-content > span")?.textContent.trim() ||
    "BEAUTY TIPS";

  const image = card.querySelector(".beauty-journal-image img");

  const article = journalArticles[title];

  if (journalModalImage) {
    journalModalImage.src = image?.getAttribute("src") || "";
    journalModalImage.alt = image?.getAttribute("alt") || title;
  }

  if (journalModalCategory) {
    journalModalCategory.textContent = category;
  }

  if (journalModalTitle) {
    journalModalTitle.textContent = title;
  }

  if (journalModalDescription) {
    journalModalDescription.textContent =
      article?.description ||
      card.querySelector("p")?.textContent.trim() ||
      "Discover more beauty tips and inspiration from EVE Beauty.";
  }

  /* BUILD THE ARTICLE TIPS SAFELY */

  if (journalModalExtra) {
    journalModalExtra.replaceChildren();

    if (article) {
      const heading = document.createElement("h3");
      heading.textContent = article.heading;

      const list = document.createElement("ul");

      article.tips.forEach((tip) => {
        const item = document.createElement("li");
        item.textContent = tip;
        list.appendChild(item);
      });

      journalModalExtra.append(heading, list);
    }
  }

  previousJournalFocus = document.activeElement;

  journalModal.classList.add("is-open");
  journalModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
  if (window.lucide) {
    window.lucide.createIcons();
  }

  journalModalClose?.focus();
}

/* CLOSE MODAL */

function closeJournalModal() {
  if (!journalModal || !journalModal.classList.contains("is-open")) {
    return;
  }

  journalModal.classList.remove("is-open");
  journalModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";

  if (previousJournalFocus instanceof HTMLElement) {
    previousJournalFocus.focus();
  }
}

/* HANDLE ALL READ MORE LINKS */

document.querySelectorAll(".beauty-journal-card").forEach((card) => {
  const readMoreLink = card.querySelector("a");

  readMoreLink?.addEventListener("click", (event) => {
    event.preventDefault();
    openJournalModal(card);
  });
});

/* CLOSE BUTTONS */

journalModalClose?.addEventListener("click", closeJournalModal);

journalModalDone?.addEventListener("click", closeJournalModal);

/* CLOSE WHEN CLICKING THE BACKDROP */

journalModal?.addEventListener("click", (event) => {
  if (event.target === journalModal) {
    closeJournalModal();
  }
});

/* CLOSE WITH ESCAPE KEY */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && journalModal?.classList.contains("is-open")) {
    closeJournalModal();
  }
});

// ==========================================
// EVE BEAUTY - HOME PAGE SCROLL ANIMATIONS
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  // Select elements that should appear on scroll
  const revealElements = document.querySelectorAll(`
    .hero-content,
    .hero-image,
    .benefit,
    .category-item,
    .about-eve-image,
    .about-eve-content,
    .section-heading,
    .collection-card,
    .product-card,
    .special-occasions-content,
    .special-occasions-visual,
    .occasion-card,
    .large-benefit,
    .why-choose-heading,
    .why-choose-item,
    .beauty-journal-heading,
    .beauty-journal-card,
    .newsletter-pic,
    .newsletter-details
  `);

  // Avoid adding the same animation styles more than once
  if (!document.getElementById("home-scroll-animation-style")) {
    const style = document.createElement("style");

    style.id = "home-scroll-animation-style";

    style.textContent = `
      .home-page .scroll-reveal {
        opacity: 0;
        transform: translateY(35px);
        transition:
          opacity 0.7s ease,
          transform 0.7s ease;
      }

      .home-page .scroll-reveal.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      @media (prefers-reduced-motion: reduce) {
        .home-page .scroll-reveal {
          opacity: 1;
          transform: none;
          transition: none;
        }
      }
    `;

    document.head.appendChild(style);
  }

  // Check browser support
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });

    return;
  }

  // Reveal elements when they enter the viewport
  const observer = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },

    {
      threshold: 0.1,

      rootMargin: "0px 0px -30px 0px",
    },
  );

  revealElements.forEach(function (element, index) {
    element.classList.add("scroll-reveal");

    // Stagger cards slightly for a natural effect
    if (
      element.matches(
        ".category-item, .collection-card, .product-card, " +
          ".occasion-card, .large-benefit, .why-choose-item, " +
          ".beauty-journal-card",
      )
    ) {
      element.style.transitionDelay = `${(index % 4) * 100}ms`;
    }

    observer.observe(element);
  });

  console.log(
    "Home scroll animations initialized:",
    revealElements.length,
    "elements",
  );
});

initHomePage();
