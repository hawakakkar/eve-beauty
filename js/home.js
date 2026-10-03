/* Eve Beauty JavaScript Codes */

function initHomePage() {
  /* =========================
     Shared Cart & Wishlist
     Synced with Navbar + best-sellers.js
  ========================= */

  const CART_KEY = "eveBeautyCart";
  const WISHLIST_KEY = "eveBeautyWishlist";

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
     Cart
  ========================= */

  let cartItems = readArray(CART_KEY);

  function saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));

      return true;
    } catch (error) {
      console.error("Could not save cart:", error);

      return false;
    }
  }

  /* =========================
     Wishlist
  ========================= */

  let wishlistItems = readArray(WISHLIST_KEY);

  function saveWishlist() {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistItems));

      return true;
    } catch (error) {
      console.error("Could not save wishlist:", error);

      return false;
    }
  }

  /* =========================
     Product Data
  ========================= */

  function getProductId(product) {
    return product?.id ?? product?.productId ?? product?._id ?? product?.sku;
  }

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

    const price =
      Number((priceElement?.textContent || "$0.00").replace(/[^0-9.]/g, "")) ||
      0;

    const oldPrice =
      Number((oldPriceElement?.textContent || "").replace(/[^0-9.]/g, "")) ||
      null;

    const id =
      card.querySelector(".wishlist-button")?.dataset.productId ||
      card.querySelector(".add-cart-button")?.dataset.productId ||
      card.dataset.productId ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const badge =
      card.querySelector(".product-badge")?.textContent.trim() ||
      card.querySelector(".discount-badge")?.textContent.trim() ||
      "";

    const ratingText = card.querySelector(".rating")?.textContent || "";

    const reviewsMatch = ratingText.match(/\((\d+)\)/);

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
  /* =========================
     Cart Quantity
  ========================= */

  function getCartQuantity() {
    return cartItems.reduce((total, item) => {
      const quantity = Number(item?.quantity);

      return total + (Number.isFinite(quantity) && quantity > 0 ? quantity : 1);
    }, 0);
  }

  /* =========================
     Cart Total
  ========================= */

  function getCartTotal() {
    return cartItems.reduce((total, item) => {
      const price = Number(item?.price) || 0;

      const quantity = Number(item?.quantity);

      const safeQuantity =
        Number.isFinite(quantity) && quantity > 0 ? quantity : 1;

      return total + price * safeQuantity;
    }, 0);
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

  /* =========================
     Toast
  ========================= */

  function showCartMessage(message) {
    let toast = document.getElementById("eveBeautyCartToast");

    if (!toast) {
      toast = document.createElement("div");

      toast.id = "eveBeautyCartToast";

      Object.assign(toast.style, {
        position: "fixed",
        right: "24px",
        bottom: "24px",
        zIndex: "999999",
        background: "#8f5f5f",
        color: "#ffffff",
        padding: "7px 12px",
        borderRadius: "7px",
        fontSize: "12px",
        fontWeight: "500",
        lineHeight: "1.3",
        whiteSpace: "nowrap",
        boxShadow: "0 4px 14px rgba(0,0,0,0.16)",
        opacity: "0",
        pointerEvents: "none",
        transform: "translateY(20px)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
      });

      document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.style.opacity = "1";

    toast.style.transform = "translateY(0)";

    clearTimeout(window.eveBeautyToastTimer);

    window.eveBeautyToastTimer = setTimeout(() => {
      toast.style.opacity = "0";

      toast.style.transform = "translateY(20px)";
    }, 2200);
  }

  /* =========================
     Cart Actions
  ========================= */

  function isProductInCart(productId) {
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

    // مهم: هیچ رنگ inline نگذار
    button.style.removeProperty("color");
  }

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

    // SHOPPING BAG ICON
    button.innerHTML = '<i data-lucide="shopping-bag"></i>';

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function updateAllCartButtons() {
    document.querySelectorAll(".add-cart-button").forEach((button) => {
      const productId = button.dataset.productId;

      updateCartButton(button, isProductInCart(productId));
    });
  }

  function updateAllCartButtons() {
    document.querySelectorAll(".add-cart-button").forEach((button) => {
      const productId = button.dataset.productId;

      updateCartButton(button, isProductInCart(productId));
    });
  }

  function addToCart(product) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      localStorage.setItem("eveBeautyLoginRedirect", "index.html");

      alert("Please sign in first to add products to your cart.");

      window.location.href = "login.html";

      return false;
    }

    const productId = getProductId(product);

    if (productId == null) {
      return false;
    }

    const existingIndex = cartItems.findIndex((item) =>
      sameProductId(getProductId(item), productId),
    );

    /* =========================
       Already in cart = REMOVE
    ========================= */

    if (existingIndex !== -1) {
      cartItems.splice(existingIndex, 1);

      saveCart();

      updateNavbarCounters();
      updateAllCartButtons();

      showCartMessage(`${product.name} removed from cart`);

      window.dispatchEvent(new CustomEvent("eveBeautyCartChanged"));

      return true;
    }

    /* =========================
       Add to cart
    ========================= */

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

    window.dispatchEvent(new CustomEvent("eveBeautyCartChanged"));

    return true;
  }

  /* =========================
     Wishlist Actions
  ========================= */

  function isProductInWishlist(productId) {
    return wishlistItems.some((item) =>
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

    button.style.color = active ? "#e63956" : "";

    const heart = button.querySelector("svg");

    if (heart) {
      heart.style.fill = active ? "currentColor" : "none";
    }
  }

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

  function toggleWishlist(product) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      localStorage.setItem("eveBeautyLoginRedirect", "index.html");

      alert("Please sign in first to add products to your wishlist.");

      window.location.href = "login.html";

      return false;
    }

    const productId = getProductId(product);

    if (productId == null) {
      return false;
    }

    const existingIndex = wishlistItems.findIndex((item) =>
      sameProductId(getProductId(item), productId),
    );

    /* =========================
       Already in wishlist = REMOVE
    ========================= */

    if (existingIndex !== -1) {
      wishlistItems.splice(existingIndex, 1);

      saveWishlist();

      updateNavbarCounters();
      updateWishlistButtons();

      showCartMessage(`${product.name} removed from your wishlist`);
    } else {
      /* =========================
       Add to wishlist
    ========================= */
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

  /* =========================
     Product Buttons
  ========================= */

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

  /* =========================
     Initial State
  ========================= */

  updateWishlistButtons();
  updateAllCartButtons();
  updateNavbarCounters();

  /* =========================
     Same Page Cart Sync
  ========================= */

  window.addEventListener("eveBeautyCartChanged", () => {
    cartItems = readArray(CART_KEY);

    updateCartCounter();
    updateAllCartButtons();
  });

  /* =========================
     Same Page Wishlist Sync
  ========================= */

  window.addEventListener("eveBeautyWishlistChanged", () => {
    wishlistItems = readArray(WISHLIST_KEY);

    updateWishlistCounter();
    updateWishlistButtons();
  });

  /* =========================
     Other Tabs Sync
  ========================= */

  window.addEventListener("storage", (event) => {
    if (event.key === CART_KEY) {
      cartItems = readArray(CART_KEY);

      updateCartCounter();
      updateAllCartButtons();
    }

    if (event.key === WISHLIST_KEY) {
      wishlistItems = readArray(WISHLIST_KEY);

      updateWishlistCounter();
      updateWishlistButtons();
    }
  });
  /* =========================
     Product Slider
  ========================= */

  const productsGrid = document.getElementById("productsGrid");

  const productNext = document.querySelector(".product-next");

  const productPrev = document.querySelector(".product-prev");

  productNext?.addEventListener("click", () => {
    window.location.href = "shop.html";
  });

  productPrev?.addEventListener("click", () => {
    window.location.href = "shop.html";
  });

  /*
    If collection navigation uses
    buttons directly inside the section,
    remove arrow buttons too.
  */

  document.querySelectorAll(".collection-section button").forEach((button) => {
    const icon = button.querySelector("[data-lucide]");

    const text = button.textContent.trim();

    if (
      icon &&
      (icon.getAttribute("data-lucide") === "chevron-left" ||
        icon.getAttribute("data-lucide") === "chevron-right")
    ) {
      button.remove();

      return;
    }

    if (text === "<" || text === ">" || text === "‹" || text === "›") {
      button.remove();
    }
  });

  /* =========================
     Collection
     Only 3 Collections
  ========================= */

  const collectionCards = document.querySelectorAll(
    ".collection-section .collection-card",
  );

  collectionCards.forEach((card) => {
    const title =
      card
        .querySelector(".collection-details span")
        ?.textContent.trim()
        .toLowerCase() || "";

    const allowed = ["best sellers", "trending", "exclusive"].includes(title);

    if (!allowed) {
      card.remove();
    }
  });

  /* =========================
     Discount Links
  ========================= */

  document
    .querySelectorAll('a[href="offers.html"], a[href="#"]')
    .forEach((link) => {
      const text = link.textContent.trim().toLowerCase();

      if (text.includes("view all discounts")) {
        link.setAttribute("href", "discount.html");
      }
    });

  /* =========================
     Newsletter
  ========================= */

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

  /* =========================
     Initial Counters
  ========================= */

  updateNavbarCounters();

  /* =========================
     Same Page Cart Sync
  ========================= */

  window.addEventListener("eveBeautyCartUpdated", () => {
    updateCartCounter();

    updateAllCartButtons();
  });

  /* =========================
     Same Page Wishlist Sync
  ========================= */

  window.addEventListener("eveBeautyWishlistUpdated", () => {
    updateWishlistCounter();

    updateWishlistButtons();
  });

  /* =========================
     Other Tabs / Pages Sync
  ========================= */

  window.addEventListener("storage", (event) => {
    const user = getCurrentUser();

    if (!user) {
      return;
    }

    const userCartKey = `${CART_KEY}_${user.id}`;

    const userWishlistKey = `${WISHLIST_KEY}_${user.id}`;

    if (
      event.key === userCartKey ||
      event.key === CART_KEY ||
      event.key === CART_CURRENT_USER_KEY
    ) {
      updateCartCounter();

      updateAllCartButtons();
    }

    if (event.key === userWishlistKey || event.key === WISHLIST_KEY) {
      updateWishlistCounter();

      updateWishlistButtons();
    }
  });

  /* =========================
     Image Error Handling
  ========================= */

  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-error");
    });
  });

  /* =========================
     Lucide Icons
  ========================= */

  if (window.lucide) {
    lucide.createIcons();
  }
}
initHomePage();

/* =========================
   Beauty Journal Read More Modal
========================= */

document.addEventListener(
  "click",
  function (event) {
    const link = event.target.closest(
      ".beauty-journal-card .beauty-journal-content a",
    );

    if (!link) {
      return;
    }

    /* Stop the # link from doing anything else */
    event.preventDefault();
    event.stopImmediatePropagation();

    const card = link.closest(".beauty-journal-card");

    if (!card) {
      return;
    }

    const category =
      card
        .querySelector(".beauty-journal-content > span")
        ?.textContent.trim() || "";

    const title =
      card.querySelector(".beauty-journal-content h3")?.textContent.trim() ||
      "";

    const description =
      card.querySelector(".beauty-journal-content p")?.textContent.trim() || "";

    const image =
      card.querySelector(".beauty-journal-image img")?.getAttribute("src") ||
      "";

    const currentScrollY = window.scrollY;

    /* Remove old modal if it exists */

    const oldModal = document.getElementById("beautyJournalModal");

    if (oldModal) {
      oldModal.remove();
    }

    /* Create modal */

    const modal = document.createElement("div");

    modal.id = "beautyJournalModal";
    modal.className = "beauty-journal-modal";

    modal.innerHTML = `
      <div
        class="beauty-journal-modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="beautyJournalModalTitle"
      >

        <button
          type="button"
          class="beauty-journal-modal-close"
          aria-label="Close"
        >
          <i data-lucide="x"></i>
        </button>

        <div class="beauty-journal-modal-image">
          <img
            src="${image}"
            alt="${title}"
          />
        </div>

        <div class="beauty-journal-modal-content">

          <span class="beauty-journal-modal-category">
            ${category}
          </span>

          <h3 id="beautyJournalModalTitle">
            ${title}
          </h3>

          <div class="beauty-journal-modal-text">

            <p>
              ${description}
            </p>

            <p>
              Discover simple beauty ideas and everyday tips
              designed to make your beauty routine easier,
              more enjoyable, and more effective.
            </p>

          </div>

        </div>

      </div>
    `;

    document.body.appendChild(modal);

    /* Force modal visible */

    modal.style.opacity = "1";
    modal.style.visibility = "visible";
    modal.style.pointerEvents = "auto";

    const modalBox = modal.querySelector(".beauty-journal-modal-box");

    if (modalBox) {
      modalBox.style.opacity = "1";
      modalBox.style.visibility = "visible";
      modalBox.style.transform = "none";
    }

    if (window.lucide) {
      lucide.createIcons();
    }

    /* Lock page */

    document.documentElement.style.overflow = "hidden";

    document.body.style.position = "fixed";
    document.body.style.top = `-${currentScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    /* =========================
       Close Modal
    ========================= */

    const closeModal = () => {
      document.documentElement.style.overflow = "";

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo(0, currentScrollY);

      modal.remove();

      document.removeEventListener("keydown", closeWithEscape);
    };

    /* Close button */

    const closeButton = modal.querySelector(".beauty-journal-modal-close");

    closeButton?.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      closeModal();
    });

    /* Click outside */

    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });

    /* Escape */

    const closeWithEscape = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", closeWithEscape);
  },
  true,
);
