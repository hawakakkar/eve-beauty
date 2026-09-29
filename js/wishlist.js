/* =========================================================
   EVE BEAUTY
   WISHLIST.JS
   LOCAL STORAGE VERSION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     STORAGE KEYS
  ========================================================= */

  const WISHLIST_KEY = "eveBeautyWishlist";

  const CURRENT_USER_KEY = "eveBeautyCurrentUser";

  const CART_KEY = "eveBeautyCart";

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const wishlistGrid = document.getElementById("wishlistGrid");

  const wishlistCount = document.getElementById("wishlistCount");

  const clearWishlist = document.getElementById("clearWishlist");

  /* =========================================================
     CURRENT USER
  ========================================================= */

  function getCurrentUser() {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);

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

  /* =========================================================
     WISHLIST KEY
  ========================================================= */

  function getWishlistKey() {
    const user = getCurrentUser();

    if (!user) {
      return null;
    }

    return `${WISHLIST_KEY}_${user.id}`;
  }

  /* =========================================================
     GET WISHLIST
  ========================================================= */

  function getWishlist() {
    const key = getWishlistKey();

    if (!key) {
      return [];
    }

    try {
      const stored = localStorage.getItem(key);

      if (!stored) {
        return [];
      }

      const wishlist = JSON.parse(stored);

      return Array.isArray(wishlist) ? wishlist : [];
    } catch (error) {
      console.error("Could not read wishlist:", error);

      return [];
    }
  }

  /* =========================================================
     SAVE WISHLIST
  ========================================================= */

  function saveWishlist(wishlist) {
    const key = getWishlistKey();

    if (!key) {
      return false;
    }

    try {
      localStorage.setItem(key, JSON.stringify(wishlist));

      return true;
    } catch (error) {
      console.error("Could not save wishlist:", error);

      return false;
    }
  }

  /* =========================================================
     CART
  ========================================================= */

  function getCart() {
    const user = getCurrentUser();

    if (!user) {
      return [];
    }

    try {
      const stored = localStorage.getItem(`${CART_KEY}_${user.id}`);

      if (!stored) {
        return [];
      }

      const cart = JSON.parse(stored);

      return Array.isArray(cart) ? cart : [];
    } catch (error) {
      console.error("Could not read cart:", error);

      return [];
    }
  }

  /* =========================================================
     SAVE CART
  ========================================================= */

  function saveCart(cart) {
    const user = getCurrentUser();

    if (!user) {
      return false;
    }

    try {
      localStorage.setItem(`${CART_KEY}_${user.id}`, JSON.stringify(cart));

      localStorage.setItem(CART_KEY, JSON.stringify(cart));

      localStorage.setItem(
        "eveBeautyCartCurrentUser",
        JSON.stringify({
          userId: user.id,
          items: cart,
          updatedAt: new Date().toISOString(),
        }),
      );

      return true;
    } catch (error) {
      console.error("Could not save cart:", error);

      return false;
    }
  }

  /* =========================================================
     TOAST
  ========================================================= */

  function showToast(message) {
    let toast = document.getElementById("eveBeautyWishlistToast");

    if (!toast) {
      toast = document.createElement("div");

      toast.id = "eveBeautyWishlistToast";

      Object.assign(toast.style, {
        position: "fixed",
        right: "24px",
        bottom: "24px",
        zIndex: "999999",

        background: "#8f5f5f",
        color: "#ffffff",

        padding: "8px 12px",

        borderRadius: "7px",

        fontSize: "12px",

        opacity: "0",

        transform: "translateY(20px)",

        transition: "opacity .25s ease, transform .25s ease",

        pointerEvents: "none",
      });

      document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.style.opacity = "1";

    toast.style.transform = "translateY(0)";

    clearTimeout(window.eveWishlistToastTimer);

    window.eveWishlistToastTimer = setTimeout(() => {
      toast.style.opacity = "0";

      toast.style.transform = "translateY(20px)";
    }, 2200);
  }

  /* =========================================================
     REMOVE ITEM
  ========================================================= */

  function removeFromWishlist(productId) {
    const wishlist = getWishlist();

    const newWishlist = wishlist.filter(
      (item) => Number(item.id) !== Number(productId),
    );

    saveWishlist(newWishlist);

    renderWishlist();

    showToast("Product removed from wishlist.");
  }

  /* =========================================================
     ADD TO CART
  ========================================================= */

  function addToCart(item) {
    const user = getCurrentUser();

    if (!user) {
      localStorage.setItem("eveBeautyLoginRedirect", "wishlist.html");

      alert("Please sign in first to add products to your cart.");

      window.location.href = "login.html";

      return;
    }

    const cart = getCart();

    const existingItem = cart.find(
      (cartItem) => Number(cartItem.id) === Number(item.id),
    );

    if (existingItem) {
      existingItem.quantity = Number(existingItem.quantity || 0) + 1;
    } else {
      cart.push({
        id: item.id,

        name: item.name,

        brand: item.brand,

        price: item.price,

        image: item.image,

        quantity: 1,

        addedAt: new Date().toISOString(),

        updatedAt: new Date().toISOString(),
      });
    }

    const saved = saveCart(cart);

    if (!saved) {
      alert("Could not save the product to your cart.");

      return;
    }

    window.dispatchEvent(
      new CustomEvent("eveBeautyCartUpdated", {
        detail: {
          cart: cart,
        },
      }),
    );

    showToast("Product added to cart.");
  }

  /* =========================================================
     RENDER WISHLIST
  ========================================================= */

  function renderWishlist() {
    const user = getCurrentUser();

    /* =======================================================
       NOT LOGGED IN
    ======================================================= */

    if (!user) {
      wishlistCount.textContent = "Sign in to view your wishlist";

      wishlistGrid.innerHTML = `
        <div class="empty-wishlist">

          <i data-lucide="heart-off"></i>

          <h3>
            Your wishlist is waiting
          </h3>

          <p>
            Please sign in to see the products
            you saved.
          </p>

          <a href="login.html">
            Sign in
          </a>

        </div>
      `;

      if (window.lucide) {
        lucide.createIcons();
      }

      return;
    }

    /* =======================================================
       GET DATA
    ======================================================= */

    const wishlist = getWishlist();

    wishlistCount.textContent = `${wishlist.length} ${
      wishlist.length === 1 ? "product" : "products"
    }`;

    /* =======================================================
       EMPTY
    ======================================================= */

    if (wishlist.length === 0) {
      wishlistGrid.innerHTML = `
        <div class="empty-wishlist">

          <i data-lucide="heart"></i>

          <h3>
            Your wishlist is empty
          </h3>

          <p>
            Save products from the shop
            and they will appear here.
          </p>

          <a href="shop.html">
            Continue shopping
          </a>

        </div>
      `;

      if (window.lucide) {
        lucide.createIcons();
      }

      return;
    }

    /* =======================================================
       CARDS
    ======================================================= */

    wishlistGrid.innerHTML = wishlist
      .map(
        (item) => `
            <article class="wishlist-card">

              <div class="wishlist-image">

                <img
                  src="${item.image || ""}"
                  alt="${item.name || "Product"}"
                  onerror="this.style.display='none'"
                >

                <button
                  class="remove-wishlist"
                  data-remove="${item.id}"
                  type="button"
                  aria-label="Remove from wishlist"
                >
                  <i data-lucide="x"></i>
                </button>

              </div>


              <div class="wishlist-info">

                <p class="wishlist-brand">
                  ${item.brand || ""}
                </p>

                <h3 class="wishlist-name">
                  ${item.name || "Product"}
                </h3>

                <p class="wishlist-price">
                  $${Number(item.price || 0).toFixed(2)}
                </p>


                <div class="wishlist-actions">

                  <button
                    class="add-to-cart"
                    data-cart="${item.id}"
                    type="button"
                  >
                    Add to cart
                  </button>

                  <button
                    class="remove-button"
                    data-remove="${item.id}"
                    type="button"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </article>
          `,
      )
      .join("");

    /* =======================================================
       REMOVE BUTTONS
    ======================================================= */

    wishlistGrid.querySelectorAll("[data-remove]").forEach((button) => {
      button.addEventListener("click", () => {
        removeFromWishlist(Number(button.dataset.remove));
      });
    });

    /* =======================================================
       CART BUTTONS
    ======================================================= */

    wishlistGrid.querySelectorAll("[data-cart]").forEach((button) => {
      button.addEventListener("click", () => {
        const item = wishlist.find(
          (product) => Number(product.id) === Number(button.dataset.cart),
        );

        if (item) {
          addToCart(item);
        }
      });
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  /* =========================================================
     CLEAR WISHLIST
  ========================================================= */

  if (clearWishlist) {
    clearWishlist.addEventListener("click", () => {
      const wishlist = getWishlist();

      if (wishlist.length === 0) {
        return;
      }

      const confirmed = confirm("Clear your entire wishlist?");

      if (!confirmed) {
        return;
      }

      saveWishlist([]);

      renderWishlist();

      showToast("Wishlist cleared.");
    });
  }

  /* =========================================================
     STORAGE EVENT
  ========================================================= */

  window.addEventListener("storage", () => {
    renderWishlist();
  });

  /* =========================================================
     INITIALIZE
  ========================================================= */

  renderWishlist();
});
