/* =========================================================
   EVE BEAUTY
   EXCLUSIVE PAGE JAVASCRIPT
   js/exclusive.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     ELEMENTS
  ======================================================= */

  const modal = document.getElementById("exclusiveModal");
  const modalTitle = document.getElementById("exclusiveModalTitle");
  const modalEyebrow = document.getElementById("exclusiveModalEyebrow");
  const modalText = document.getElementById("exclusiveModalText");
  const modalContent = document.getElementById("exclusiveModalContent");

  const toast = document.getElementById("exclusiveToast");

  const productsGrid = document.querySelector("[data-products-grid]");

  /* =======================================================
     MODAL
  ======================================================= */

  function openModal({
    eyebrow = "EVE BEAUTY",
    title = "Exclusive",
    text = "",
    content = "",
  }) {
    if (!modal) return;

    modalEyebrow.textContent = eyebrow;
    modalTitle.textContent = title;
    modalText.textContent = text;
    modalContent.innerHTML = content;

    modal.hidden = false;

    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      modal.classList.add("is-open");
    });
  }

  function closeModal() {
    if (!modal) return;

    modal.classList.remove("is-open");

    modal.hidden = true;

    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-modal-close]").forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && !modal.hidden) {
      closeModal();
    }
  });

  /* =======================================================
     TOAST
  ======================================================= */

  let toastTimer;

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }

  /* =======================================================
     EXPLORE EXCLUSIVE
  ======================================================= */

  document.querySelectorAll("[data-exclusive-explore]").forEach((button) => {
    button.addEventListener("click", () => {
      openModal({
        eyebrow: "LIMITED EDITION",

        title: "Explore Exclusive",

        text: "Discover limited beauty collections created for something truly special.",

        content: `
            <div class="exclusive-modal-feature">
              <h3>Limited Edition Beauty</h3>
              <p>
                Explore carefully selected beauty sets, signature fragrances,
                premium skincare and exclusive EVE BEAUTY collections.
              </p>
            </div>

            <div class="exclusive-modal-feature">
              <h3>Members-Only Benefits</h3>
              <p>
                Members receive early access, special offers and access
                to selected limited-edition products.
              </p>
            </div>

            <div class="exclusive-modal-feature">
              <h3>Exclusive Gift Sets</h3>
              <p>
                Discover curated beauty bundles designed for gifting,
                celebrations and unforgettable beauty moments.
              </p>
            </div>

            <button
              type="button"
              class="exclusive-small-btn"
              data-modal-scroll-products
            >
              Explore Beauty Sets →
            </button>
          `,
      });
    });
  });

  /* =======================================================
     SHOP COLLECTION
  ======================================================= */

  document.querySelectorAll("[data-shop-collection]").forEach((button) => {
    button.addEventListener("click", () => {
      openModal({
        eyebrow: "ROSE ÉCLAT",

        title: "Rose Éclat Collection",

        text: "A limited collection inspired by the timeless beauty of roses.",

        content: `
            <div class="exclusive-modal-feature">
              <h3>Rose Éclat</h3>
              <p>
                A refined collection of beauty essentials featuring
                elegant floral-inspired packaging and carefully selected formulas.
              </p>
            </div>

            <div class="exclusive-modal-feature">
              <h3>What's Inside?</h3>
              <p>
                Discover skincare, fragrance and beauty essentials
                curated together as one exclusive collection.
              </p>
            </div>

            <button
              type="button"
              class="exclusive-small-btn"
              data-modal-shop-products
            >
              Shop Exclusive Sets →
            </button>
          `,
      });
    });
  });

  /* =======================================================
     VIEW ALL
     ADD 4 MORE PRODUCTS
  ======================================================= */

  const additionalProducts = [
    {
      id: "rose-elat-perfume",
      name: "Rose Éclat Eau de Parfum",
      brand: "EVE BEAUTY",
      price: "$128.00",
      image: "assets/images/rose-eclat-perfume.jpg",
    },

    {
      id: "diamond-glow-set",
      name: "Diamond Glow Beauty Set",
      brand: "EVE BEAUTY",
      price: "$135.00",
      image: "assets/images/diamond-glow-set.jpg",
    },

    {
      id: "exclusive-night-set",
      name: "Exclusive Night Ritual",
      brand: "EVE BEAUTY",
      price: "$105.00",
      image: "assets/images/exclusive-night-set.jpg",
    },

    {
      id: "rose-luxury-box",
      name: "Rose Luxury Gift Box",
      brand: "EVE BEAUTY",
      price: "$145.00",
      image: "assets/images/rose-luxury-box.jpg",
    },
  ];

  function createAdditionalProducts() {
    if (!productsGrid) return;

    if (productsGrid.dataset.expanded === "true") {
      document.getElementById("exclusive-products")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    additionalProducts.forEach((product) => {
      const article = document.createElement("article");

      article.className = "exclusive-product-card";

      article.dataset.productId = product.id;

      article.dataset.productName = product.name;

      article.dataset.productPrice = product.price.replace("$", "");

      article.dataset.productImage = product.image;

      article.innerHTML = `

        <div class="exclusive-product-image">

          <span class="exclusive-product-badge">
            EXCLUSIVE
          </span>

          <button
            class="exclusive-wishlist"
            type="button"
            aria-label="Add to wishlist"
          >
            ♡
          </button>

          <img
            src="${product.image}"
            alt="${product.name}"
            onerror="this.style.display='none'"
          />

        </div>


        <div class="exclusive-product-info">

          <span class="exclusive-product-brand">
            ${product.brand}
          </span>

          <h3>
            ${product.name}
          </h3>

          <div class="exclusive-rating">
            ★★★★★
            <span>(42)</span>
          </div>

          <div class="exclusive-product-bottom">

            <strong>
              ${product.price}
            </strong>

            <button
              class="exclusive-cart-btn"
              type="button"
              data-add-cart
            >
              <i class="fa-solid fa-cart-shopping"></i>
              <span>Add to Cart</span>
            </button>

          </div>

        </div>

      `;

      productsGrid.appendChild(article);
    });

    productsGrid.dataset.expanded = "true";

    bindProductButtons();

    document.getElementById("exclusive-products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    showToast("Four more exclusive products are now available.");
  }

  document.querySelectorAll("[data-exclusive-view-all]").forEach((button) => {
    button.addEventListener("click", createAdditionalProducts);
  });

  /* =======================================================
     WISHLIST
  ======================================================= */

  function bindWishlistButtons() {
    document.querySelectorAll(".exclusive-wishlist").forEach((button) => {
      if (button.dataset.bound === "true") return;

      button.dataset.bound = "true";

      button.addEventListener("click", () => {
        button.classList.toggle("active");

        if (button.classList.contains("active")) {
          button.textContent = "♥";

          showToast("Added to your wishlist.");
        } else {
          button.textContent = "♡";

          showToast("Removed from your wishlist.");
        }
      });
    });
  }

  /* =======================================================
     CART
  ======================================================= */

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem("eveBeautyCart") || "[]");
    } catch (error) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem("eveBeautyCart", JSON.stringify(cart));
  }

  function bindCartButtons() {
    document.querySelectorAll("[data-add-cart]").forEach((button) => {
      if (button.dataset.bound === "true") return;

      button.dataset.bound = "true";

      button.addEventListener("click", () => {
        const card = button.closest(".exclusive-product-card");

        if (!card) return;

        const id = card.dataset.productId;

        const name = card.dataset.productName;

        const price = Number(card.dataset.productPrice);

        const image = card.dataset.productImage;

        let cart = getCart();

        const existingIndex = cart.findIndex((item) => item.id === id);

        /* REMOVE */

        if (existingIndex !== -1) {
          cart.splice(existingIndex, 1);

          saveCart(cart);

          setCartButtonState(button, false);

          showToast(`${name} removed from cart.`);

          updateNavbarCart();

          return;
        }

        /* ADD */

        cart.push({
          id,
          name,
          price,
          image,
          quantity: 1,
        });

        saveCart(cart);

        setCartButtonState(button, true);

        showToast(`${name} added to cart.`);

        updateNavbarCart();
      });
    });

    restoreCartButtons();
  }

  function setCartButtonState(button, added) {
    if (!button) return;

    const span = button.querySelector("span");

    if (added) {
      button.classList.add("added");

      if (span) {
        span.textContent = "Remove from Cart";
      }

      button.innerHTML = `
        <i class="fa-solid fa-check"></i>
        <span>Remove from Cart</span>
      `;
    } else {
      button.classList.remove("added");

      button.innerHTML = `
        <i class="fa-solid fa-cart-shopping"></i>
        <span>Add to Cart</span>
      `;
    }
  }

  function restoreCartButtons() {
    const cart = getCart();

    document.querySelectorAll(".exclusive-product-card").forEach((card) => {
      const id = card.dataset.productId;

      const button = card.querySelector("[data-add-cart]");

      if (!button) return;

      const exists = cart.some((item) => item.id === id);

      setCartButtonState(button, exists);
    });
  }

  /* =======================================================
     NAVBAR CART COUNT
  ======================================================= */

  function updateNavbarCart() {
    const cart = getCart();

    const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);

    const selectors = [
      "[data-cart-count]",
      ".cart-count",
      ".navbar-cart-count",
      "#cart-count",
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        element.textContent = count;

        element.style.display = count > 0 ? "" : "none";
      });
    });
  }

  /* =======================================================
     MEMBER LOGIN
  ======================================================= */

  function isMemberLoggedIn() {
    return localStorage.getItem("eveMemberLoggedIn") === "true";
  }

  /* =======================================================
     JOIN NOW
  ======================================================= */

  document.querySelectorAll("[data-join-now]").forEach((button) => {
    button.addEventListener("click", () => {
      if (isMemberLoggedIn()) {
        openModal({
          eyebrow: "MEMBERS ONLY",

          title: "Welcome Back",

          text: "You are already signed in as an EVE BEAUTY member.",

          content: `
              <div class="exclusive-modal-feature">
                <h3>Member Access Activated</h3>

                <p>
                  Your member access is active. You can now receive
                  exclusive offers, early access and members-only launches.
                </p>
              </div>

              <button
                type="button"
                class="exclusive-small-btn"
                data-member-continue
              >
                Continue →
              </button>
            `,
        });

        return;
      }

      openModal({
        eyebrow: "MEMBERS ONLY",

        title: "Join EVE BEAUTY",

        text: "Sign in to your member account to access exclusive benefits.",

        content: `
            <form class="exclusive-member-form" id="exclusiveLoginForm">

              <label for="exclusiveEmail">
                Email address
              </label>

              <input
                id="exclusiveEmail"
                type="email"
                placeholder="you@example.com"
                required
              />

              <label for="exclusivePassword">
                Password
              </label>

              <input
                id="exclusivePassword"
                type="password"
                placeholder="Your password"
                required
              />

              <button type="submit">
                Sign In & Join
              </button>

            </form>
          `,
      });
    });
  });

  /* =======================================================
     LOGIN FORM
  ======================================================= */

  document.addEventListener("submit", (event) => {
    if (event.target.id !== "exclusiveLoginForm") {
      return;
    }

    event.preventDefault();

    const email = document.getElementById("exclusiveEmail")?.value.trim();

    const password = document.getElementById("exclusivePassword")?.value;

    if (!email || !password) {
      showToast("Please complete all fields.");

      return;
    }

    localStorage.setItem("eveMemberLoggedIn", "true");

    closeModal();

    showToast("Welcome to EVE BEAUTY Members.");
  });

  /* =======================================================
     EARLY ACCESS
  ======================================================= */

  document.querySelectorAll("[data-early-access]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!isMemberLoggedIn()) {
        openModal({
          eyebrow: "EARLY ACCESS",

          title: "Members Get First Access",

          text: "Sign in to your EVE BEAUTY member account to receive early access.",

          content: `
              <div class="exclusive-modal-feature">
                <h3>Why Join?</h3>

                <p>
                  Members get notified before new arrivals become
                  available to everyone else.
                </p>
              </div>

              <button
                type="button"
                class="exclusive-small-btn"
                data-join-from-early
              >
                Become a Member →
              </button>
            `,
        });

        return;
      }

      openModal({
        eyebrow: "EARLY ACCESS",

        title: "You're In",

        text: "Your member account has early access privileges.",

        content: `
            <div class="exclusive-modal-feature">
              <h3>Early Access Activated</h3>

              <p>
                You will receive early notifications about new arrivals,
                limited editions and exclusive launches.
              </p>
            </div>

            <button
              type="button"
              class="exclusive-small-btn"
              data-modal-close
            >
              Continue Shopping →
            </button>
          `,
      });
    });
  });

  /* =======================================================
     DYNAMIC MODAL BUTTONS
  ======================================================= */

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-modal-scroll-products]");

    if (target) {
      closeModal();

      setTimeout(() => {
        document.getElementById("exclusive-products")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }

    const shopProducts = event.target.closest("[data-modal-shop-products]");

    if (shopProducts) {
      closeModal();

      setTimeout(() => {
        document.getElementById("exclusive-products")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }

    const continueButton = event.target.closest("[data-member-continue]");

    if (continueButton) {
      closeModal();

      showToast("Member access confirmed.");
    }

    const joinFromEarly = event.target.closest("[data-join-from-early]");

    if (joinFromEarly) {
      closeModal();

      setTimeout(() => {
        document.querySelector("[data-join-now]")?.click();
      }, 100);
    }
  });

  /* =======================================================
     INITIALIZE
  ======================================================= */

  bindWishlistButtons();

  bindCartButtons();

  updateNavbarCart();
});
