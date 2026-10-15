/* =========================================================
   TRENDING PAGE
   js/trending.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =======================================================
     PRODUCT DATA
  ======================================================= */

  const products = {
    skincare: [
      {
        id: "glow-spf-50",
        name: "Glow SPF 50",
        brand: "EVE BEAUTY",
        price: 32,
        oldPrice: null,
        rating: 4.8,
        reviews: 72,
        badge: "TRENDING",
        image: "assets/images/product-glow-spf-50.jpg",
      },

      {
        id: "hyaluronic-acid-serum",
        name: "Hyaluronic Acid Serum",
        brand: "LUMIÈRE",
        price: 46,
        oldPrice: null,
        rating: 4.9,
        reviews: 84,
        badge: "VIRAL",
        image: "assets/images/hyaluronic-acid-serum.jpg",
      },

      {
        id: "cica-repair-cream",
        name: "Cica Repair Cream",
        brand: "EVE BEAUTY",
        price: 38,
        oldPrice: null,
        rating: 4.8,
        reviews: 176,
        badge: "BEST SELLER",
        image: "assets/images/product-cicapair-cream.jpg",
      },

      {
        id: "purifying-toner",
        name: "Purifying Toner",
        brand: "CAUDALIE",
        price: 28,
        oldPrice: null,
        rating: 4.7,
        reviews: 67,
        badge: "NEW",
        image: "assets/images/product-17.jpg",
      },

      {
        id: "rose-milk-cleanser",
        name: "Rose Milk Cleanser",
        brand: "EVE BEAUTY",
        price: 28,
        oldPrice: null,
        rating: 4.7,
        reviews: 108,
        badge: "TRENDING",
        image: "assets/images/product-rose-milk-cleanser.jpg",
      },

      {
        id: "radiance-facial-serum",
        name: "Radiance Facial Serum",
        brand: "EVE BEAUTY",
        price: 42,
        oldPrice: 49,
        rating: 4.9,
        reviews: 88,
        badge: "-15%",
        image: "assets/images/product-radiance-serum.jpg",
      },

      {
        id: "hydra-cream",
        name: "Hydra Cream",
        brand: "EVE BEAUTY",
        price: 36,
        oldPrice: null,
        rating: 4.8,
        reviews: 95,
        badge: "FAVORITE",
        image: "assets/images/product-hydra-cream.jpg",
      },

      {
        id: "vitamin-c-glow-serum",
        name: "Vitamin C Glow Serum",
        brand: "EVE BEAUTY",
        price: 42,
        oldPrice: null,
        rating: 4.9,
        reviews: 126,
        badge: "VIRAL",
        image: "assets/images/product-vitamin-c-glow-serum.jpg",
      },
    ],

    makeup: [
      {
        id: "lash-sensational-mascara",
        name: "Lash Sensational Mascara",
        brand: "MAYBELLINE",
        price: 16,
        oldPrice: null,
        rating: 4.8,
        reviews: 93,
        badge: "VIRAL",
        image: "assets/images/product-lash-sensational.jpg",
      },

      {
        id: "fit-me-foundation",
        name: "Fit Me Foundation",
        brand: "MAYBELLINE",
        price: 20,
        oldPrice: null,
        rating: 4.7,
        reviews: 149,
        badge: "TRENDING",
        image: "assets/images/product-fit-me-foundation.jpg",
      },

      {
        id: "dior-addict-lip-glow",
        name: "Dior Addict Lip Glow",
        brand: "DIOR",
        price: 42,
        oldPrice: null,
        rating: 4.9,
        reviews: 171,
        badge: "ICONIC",
        image: "assets/images/product-dior-addict.jpg",
      },

      {
        id: "superstay-lip-color",
        name: "SuperStay Lip Color",
        brand: "MAYBELLINE",
        price: 18,
        oldPrice: null,
        rating: 4.6,
        reviews: 82,
        badge: "NEW",
        image: "assets/images/superstay-lip-color.jpg",
      },

      {
        id: "velvet-matte-lipstick",
        name: "Velvet Matte Lipstick",
        brand: "EVE BEAUTY",
        price: 24,
        oldPrice: null,
        rating: 4.8,
        reviews: 96,
        badge: "BEST SELLER",
        image: "assets/images/product-3.jpg",
      },

      {
        id: "soft-glam-eyeshadow",
        name: "Soft Glam Eyeshadow",
        brand: "EVE BEAUTY",
        price: 39,
        oldPrice: null,
        rating: 4.9,
        reviews: 112,
        badge: "FAVORITE",
        image: "assets/images/soft-glam-eyeshadow.jpg",
      },

      {
        id: "les-beiges-powder",
        name: "Les Beiges Powder",
        brand: "CHANEL",
        price: 64,
        oldPrice: null,
        rating: 4.8,
        reviews: 69,
        badge: "LUXURY",
        image: "assets/images/product-les-beiges.jpg",
      },

      {
        id: "flawless-foundation",
        name: "Flawless Foundation",
        brand: "EVE BEAUTY",
        price: 50,
        oldPrice: 70,
        rating: 4.7,
        reviews: 76,
        badge: "-20%",
        image: "assets/images/product-2.jpg",
      },
    ],

    haircare: [
      {
        id: "silk-repair-mask",
        name: "Silk Repair Hair Mask",
        brand: "EVE BEAUTY",
        price: 38,
        oldPrice: null,
        rating: 4.8,
        reviews: 74,
        badge: "TRENDING",
        image: "assets/images/product-21.jpg",
      },

      {
        id: "glossy-hair-oil",
        name: "Glossy Hair Oil",
        brand: "LUMIÈRE",
        price: 35,
        oldPrice: null,
        rating: 4.9,
        reviews: 91,
        badge: "VIRAL",
        image: "assets/images/product-24.jpg",
      },
    ],

    fragrance: [
      {
        id: "noire-eau-de-parfum",
        name: "Noiré Eau de Parfum",
        brand: "NOIRÉ",
        price: 250,
        oldPrice: 270,
        rating: 4.9,
        reviews: 128,
        badge: "BEST SELLER",
        image: "assets/images/noire-eau-de-parfum.jpg",
      },

      {
        id: "rose-essence",
        name: "Rose Essence",
        brand: "EVE BEAUTY",
        price: 90,
        oldPrice: 120,
        rating: 4.8,
        reviews: 64,
        badge: "NEW",
        image: "assets/images/rose-essence.jpg",
      },
    ],

    sets: [
      {
        id: "eve-glow-set",
        name: "EVE Glow Beauty Set",
        brand: "EVE BEAUTY",
        price: 799,
        oldPrice: 999,
        rating: 4.9,
        reviews: 87,
        badge: "LIMITED",
        image: "assets/images/eve-glow-set.jpg",
      },
      {
        id: "luxe-skincare-set",
        name: "Luxe Skincare Set",
        brand: "EVE BEAUTY",
        price: 699,
        oldPrice: 899,
        rating: 4.6,
        reviews: 80,
        badge: "LIMITED",
        image: "assets/images/luxe-skincare-set.jpg",
      },
      {
        id: "haircare-premium-set",
        name: "Haircare Premium Set",
        brand: "EVE BEAUTY",
        price: 600,
        oldPrice: 900,
        rating: 4.2,
        reviews: 90,
        badge: "LIMITED",
        image: "assets/images/haircare-premium-set.jpg",
      },
      {
        id: "makeup-essentials-set",
        name: "Makeup Essentials Set",
        brand: "EVE BEAUTY",
        price: 900,
        oldPrice: 1200,
        rating: 4.8,
        reviews: 95,
        badge: "LIMITED",
        image: "assets/images/makeup-essentials-set.jpg",
      },
      {
        id: "signature-fragrance-set",
        name: "Signature Fragrance Set",
        brand: "EVE BEAUTY",
        price: 1099,
        oldPrice: 1290,
        rating: 4.9,
        reviews: 87,
        badge: "LIMITED",
        image: "assets/images/signature-fragrance-set.jpg",
      },
    ],
  };

  /* STORAGE */
  /* CURRENT USER */

  function getCurrentUser() {
    try {
      const stored = localStorage.getItem("eveBeautyCurrentUser");

      if (!stored) return null;

      const user = JSON.parse(stored);

      if (!user || !user.id) return null;

      return user;
    } catch (error) {
      console.warn("Could not read current user:", error);
      return null;
    }
  }

  /* Use the same user identifier and key format as components.js. */

  function getStorageUserIdentifier(user) {
    if (!user) return null;

    if (typeof window.getEveBeautyUserIdentifier === "function") {
      return window.getEveBeautyUserIdentifier(user);
    }

    const identifier =
      user.id ||
      user.userId ||
      user.email ||
      user.username ||
      user.name ||
      user.fullName ||
      "guest";

    return String(identifier).toLowerCase().replace(/\s+/g, "_");
  }

  function getUserStorageKey(key) {
    const user = getCurrentUser();

    if (!user) return key;

    const userId = getStorageUserIdentifier(user);

    if (!userId) return key;

    return `${key}_${encodeURIComponent(userId)}`;
  }

  /* CART STORAGE */

  function loadStoredItems(key) {
    try {
      const storageKey = getUserStorageKey(key);
      const savedValue = localStorage.getItem(storageKey);

      // Use the public key only when no user is signed in.
      // This prevents one user's cart from appearing in another user's account.
      const saved =
        savedValue !== null
          ? JSON.parse(savedValue)
          : getCurrentUser()
            ? []
            : JSON.parse(localStorage.getItem(key) || "[]");

      return Array.isArray(saved) ? saved : [];
    } catch (error) {
      console.warn(`Could not load ${key}:`, error);
      return [];
    }
  }

  function getProductDetails(productId) {
    return getAllProducts().find(
      (product) => String(product.id) === String(productId),
    );
  }

  function normalizeCartItems(items) {
    return items.map((item) => {
      // Support old Trending data, where cart items were product ID strings.
      if (typeof item === "string") {
        const product = getProductDetails(item);

        return product
          ? {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1,
            }
          : { id: item, quantity: 1 };
      }

      return item;
    });
  }

  function normalizeWishlistItems(items) {
    return items.map((item) => {
      // Support old Trending data, where wishlist items were product ID strings.
      if (typeof item === "string") {
        const product = getProductDetails(item);

        return product
          ? {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              category: "Beauty",
            }
          : { id: item, category: "Beauty" };
      }

      return item;
    });
  }

  let cart = normalizeCartItems(loadStoredItems("eveBeautyCart"));

  let wishlist = normalizeWishlistItems(loadStoredItems("eveBeautyWishlist"));

  function isProductInCart(productId) {
    return cart.some((item) => String(item.id) === String(productId));
  }

  function isProductInWishlist(productId) {
    return wishlist.some((item) => String(item.id) === String(productId));
  }

  function saveCart() {
    try {
      const user = getCurrentUser();
      const storageKey = getUserStorageKey("eveBeautyCart");
      const cartJSON = JSON.stringify(cart);

      localStorage.setItem(storageKey, cartJSON);

      if (user) {
        localStorage.setItem(
          "eveBeautyCartCurrentUser",
          JSON.stringify({
            userId: getStorageUserIdentifier(user),
            items: cart,
            updatedAt: new Date().toISOString(),
          }),
        );
      }

      // Keep the public mirror for compatibility with older page scripts.
      localStorage.setItem("eveBeautyCart", cartJSON);

      window.dispatchEvent(new CustomEvent("eveBeautyCartChanged"));
      window.dispatchEvent(new CustomEvent("eveBeautyCartUpdated"));

      return true;
    } catch (error) {
      console.warn("Could not save cart:", error);
      return false;
    }
  }

  function saveWishlist() {
    try {
      const storageKey = getUserStorageKey("eveBeautyWishlist");
      const wishlistJSON = JSON.stringify(wishlist);

      localStorage.setItem(storageKey, wishlistJSON);

      // Keep the public mirror for compatibility with older page scripts.
      localStorage.setItem("eveBeautyWishlist", wishlistJSON);

      window.dispatchEvent(new CustomEvent("eveBeautyWishlistChanged"));
      window.dispatchEvent(new CustomEvent("eveBeautyWishlistUpdated"));

      return true;
    } catch (error) {
      console.warn("Could not save wishlist:", error);
      return false;
    }
  }

  // Save migrated data in the same format as Best Sellers.
  saveCart();
  saveWishlist();

  /* ELEMENTS*/

  const skincareContainer = document.getElementById("skincare-products");

  const makeupContainer = document.getElementById("makeup-products");

  const modal = document.getElementById("trendingModal");

  const modalProducts = document.getElementById("trendingModalProducts");

  const modalTitle = document.getElementById("trendingModalTitle");

  const toast = document.getElementById("trendingCartToast");

  /* RENDER PRODUCT */

  function createProductCard(product) {
    /*THIS MAKE NEW HTML ELEMENT BY THE NAME OF ARTICLE*/
    const article = document.createElement("article");

    article.className = "trending-product-card";
    /*THIS LINE TRY TO ADD PRODUCTID ON CARD BY USING THE DATASET FEATURES*/
    article.dataset.productId = product.id;
    /*THIS CHECK THAT ARE THE CART ARRAY HAVE THE QUANTITY OF PRODUCTID OR NO*/
    const isInCart = isProductInCart(product.id);
    const isWishlisted = isProductInWishlist(product.id);

    const oldPriceHTML = product.oldPrice
      ? `<del>$${product.oldPrice.toFixed(2)}</del>`
      : "";
    /*THIS FOCUS THAT THAT THE INNER HTML MUST PUT INTO ARTICLE ELEMENTS*/
    /*IF THE PRODUCTS EXIST THE SPAN ELEMENT WILL CREATE AND DISPLAY THE BAGE OF PRODUCTS*/
    article.innerHTML = `

      <div class="trending-product-image">

        ${
          product.badge
            ? `<span class="trending-product-badge">
                ${product.badge}
              </span>`
            : ""
        }

        <button
  type="button"
  class="trending-wishlist ${isWishlisted ? "active" : ""}"
  data-wishlist="${product.id}"
  aria-label="${isWishlisted ? "Remove from wishlist" : "Add to wishlist"}"
  aria-pressed="${isWishlisted ? "true" : "false"}"
>
  <i
    data-lucide="heart"
    style="width: 15px; height: 15px; ${
      isWishlisted ? "fill: currentColor;" : "fill: none;"
    }"
  ></i>
</button>

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        />

      </div>


      <div class="trending-product-info">

        <span class="trending-product-brand">
          ${product.brand}
        </span>

        <h3 class="trending-product-name">
          ${product.name}
        </h3>

        <div class="trending-rating">
          ${"★".repeat(5)}
          <span>
            ${product.rating} (${product.reviews})
          </span>
        </div>


        <div class="trending-product-bottom">

          <div class="trending-price">
            $${product.price.toFixed(2)}
            ${oldPriceHTML}
          </div>


          <button
            type="button"
            class="trending-add-cart ${isInCart ? "added" : ""}"
            data-cart="${product.id}"
          >

            <i
  data-lucide="${isInCart ? "check" : "shopping-bag"}"
  style="width: 15px; height: 15px;"
></i>

            ${isInCart ? "Remove" : "Add to Cart"}

          </button>

        </div>

      </div>
    `;

    return article;
  }

  /* RENDER INITIAL PRODUCTS */

  function renderMainProducts() {
    if (skincareContainer) {
      /*THIS FIND THAT ARE THE HTML ELEMENT DEPENDING TO PRODUCTS EXIST OR NO */
      skincareContainer.innerHTML = "";
      /*IN THIS PLACE JUST 4 FIRST PRODUCTS WILL DISPLAY*/
      products.skincare.slice(0, 4).forEach((product) => {
        /*THIS MAKE HTML CARD FOR CURRENTLY PRODUCT AND ADD THEM TO PART OF SKINCARE PRODUCTS*/
        skincareContainer.appendChild(createProductCard(product));
      });
    }
    /*CHECK ARE THE makeupContainer HAVE THE VALID AND EXIST HTML ELEMENT OR NO*/
    if (makeupContainer) {
      makeupContainer.innerHTML = "";

      products.makeup.slice(0, 4).forEach((product) => {
        makeupContainer.appendChild(createProductCard(product));
      });
    }

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }

    setupTrendingScrollAnimations();
  }

  /*MAKING ALL PRODUCTS IN AN ARRAYS */

  function getAllProducts() {
    return [
      ...products.skincare,
      ...products.makeup,
      ...products.haircare,
      ...products.fragrance,
      ...products.sets,
    ];
  }

  /*  MODAL PRODUCT CARD*/

  function createModalProduct(product) {
    /*CHECK THAT ARE THE PPRODUCT IN ARRAY OF CARTS*/
    const isInCart = isProductInCart(product.id);

    const article = document.createElement("article");

    article.className = "modal-trending-card";

    article.innerHTML = `

      <div class="modal-trending-image">

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        />

      </div>


      <div class="modal-trending-info">

        <span class="modal-trending-brand">
          ${product.brand}
        </span>

        <h3 class="modal-trending-name">
          ${product.name}
        </h3>

        <div class="modal-trending-price">
          $${product.price.toFixed(2)}
        </div>

        <button
          type="button"
          class="modal-add-cart ${isInCart ? "added" : ""}"
          data-cart="${product.id}"
        >

          ${isInCart ? "✓ Remove from Cart" : "＋ Add to Cart"}

        </button>

      </div>
    `;

    return article;
  }

  /* OPEN MODAL */

  function openModal(filter = "all", title = "Trending Now") {
    const allProducts = getAllProducts();

    let selectedProducts = allProducts;

    if (filter !== "all") {
      selectedProducts = products[filter] || [];
    }

    modalTitle.textContent = title;
    /*THIS ERASE THE PERVIOUS CARTS TILL NEW PRODUCTS DISPLAY*/
    modalProducts.innerHTML = "";
    /*MAKE CART FOR EACH PRODUCT AND ADD THEM INTO MODAL*/
    selectedProducts.forEach((product) => {
      modalProducts.appendChild(createModalProduct(product));
    });
    setupTrendingScrollAnimations(modalProducts);

    /*IF button.dataset.modalFilter BE EQUAL TO filter THE ACTIVE CLASS WILL ADD TO IT AND OTHERWISE IT WILL REMOVE*/
    document.querySelectorAll(".modal-filter-btn").forEach((button) => {
      button.classList.toggle("active", button.dataset.modalFilter === filter);
    });
    /*THIS EXIST MODAL FROM HIDE*/
    modal.hidden = false;
    /*THIS ANNOUNCE TO TECH HELPER THAT MODAL IS HIDE*/
    modal.setAttribute("aria-hidden", "false");

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    /*THIS REMOVE THE MAIN PAGE SCROLL UNTIL WHEN THE MODAL IS OPEN THE SCROLL OF MAIN PAGE DONT SCROLL*/
    document.body.style.overflow = "hidden";
  }

  /* CLOSE MODAL*/

  function closeModal() {
    modal.hidden = true;

    modal.setAttribute("aria-hidden", "true");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";

    window.scrollTo(0, trendingScrollPosition);
  }

  /* TOAST */

  let toastTimer;

  function showToast(message) {
    /*THIS MAKE THE TEXT CONTENT OF MESSAGE*/
    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }

  /* CART */
  /*THIS ADD THE PRODUCTS INTO CARTS OR REMOVE*/

  /* CART */

  function toggleCart(productId) {
    const product = getProductDetails(productId);

    if (!product) return;

    const currentUser = getCurrentUser();

    if (!currentUser) {
      localStorage.setItem("eveBeautyLoginRedirect", "trending.html");

      alert("Please sign in first to add products to your cart.");

      window.location.href = "login.html";
      return;
    }

    // Reload the current user's cart before changing it.
    cart = normalizeCartItems(loadStoredItems("eveBeautyCart"));

    const existingIndex = cart.findIndex(
      (item) => String(item.id) === String(productId),
    );

    if (existingIndex !== -1) {
      cart.splice(existingIndex, 1);

      if (!saveCart()) return;

      refreshCartButtons(productId);

      if (typeof updateNavbarCounts === "function") {
        updateNavbarCounts();
      }

      if (typeof renderCartDropdown === "function") {
        renderCartDropdown();
      }

      window.dispatchEvent(new CustomEvent("eveBeautyCartChanged"));

      showToast(`${product.name} removed from cart`);

      return;
    }

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    if (!saveCart()) return;

    refreshCartButtons(productId);

    if (typeof updateNavbarCounts === "function") {
      updateNavbarCounts();
    }

    if (typeof renderCartDropdown === "function") {
      renderCartDropdown();
    }

    window.dispatchEvent(new CustomEvent("eveBeautyCartChanged"));

    showToast(`${product.name} added to cart`);
  }

  /* REFRESH WISHLIST BUTTONS */

  function refreshWishlistButtons(productId) {
    document.querySelectorAll("[data-wishlist]").forEach((button) => {
      if (String(button.dataset.wishlist) !== String(productId)) {
        return;
      }

      const active = isProductInWishlist(productId);

      button.classList.toggle("active", active);

      button.setAttribute(
        "aria-label",
        active ? "Remove from wishlist" : "Add to wishlist",
      );

      button.setAttribute("aria-pressed", active ? "true" : "false");

      // Recreate the Lucide heart icon.
      button.innerHTML = `
        <i
          data-lucide="heart"
          style="
            width: 20px;
            height: 20px;
            fill: ${active ? "currentColor" : "none"};
          "
        ></i>
      `;
    });

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  /* WISHLIST */

  function toggleWishlist(productId) {
    const product = getProductDetails(productId);

    if (!product) return;

    const currentUser = getCurrentUser();

    if (!currentUser) {
      localStorage.setItem("eveBeautyLoginRedirect", "trending.html");

      alert("Please sign in first to add products to your wishlist.");

      window.location.href = "login.html";
      return;
    }

    // Reload the current user's wishlist before changing it.
    wishlist = normalizeWishlistItems(loadStoredItems("eveBeautyWishlist"));

    const existingIndex = wishlist.findIndex(
      (item) => String(item.id) === String(productId),
    );

    if (existingIndex !== -1) {
      wishlist.splice(existingIndex, 1);

      if (!saveWishlist()) return;

      refreshWishlistButtons(productId);

      if (typeof updateNavbarCounts === "function") {
        updateNavbarCounts();
      }

      if (typeof renderWishlistDropdown === "function") {
        renderWishlistDropdown();
      }

      window.dispatchEvent(new CustomEvent("eveBeautyWishlistChanged"));

      showToast(`${product.name} removed from your wishlist`);

      return;
    }

    wishlist.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: "Beauty",
    });

    if (!saveWishlist()) return;

    refreshWishlistButtons(productId);

    if (typeof updateNavbarCounts === "function") {
      updateNavbarCounts();
    }

    if (typeof renderWishlistDropdown === "function") {
      renderWishlistDropdown();
    }

    window.dispatchEvent(new CustomEvent("eveBeautyWishlistChanged"));

    showToast(`${product.name} added to your wishlist`);
  }

  /* REFRESH WISHLIST BUTTONS */

  /* REFRESH CART BUTTONS */

  function refreshCartButtons(productId) {
    document
      .querySelectorAll(`[data-cart="${productId}"]`)
      .forEach((button) => {
        const added = isProductInCart(productId);

        button.classList.toggle("added", added);

        button.setAttribute(
          "aria-label",
          added ? "Remove from cart" : "Add to cart",
        );

        button.setAttribute("aria-pressed", added ? "true" : "false");

        if (button.classList.contains("trending-add-cart")) {
          // Keep the original Lucide icon system.
          button.innerHTML = `
          <i
            data-lucide="${added ? "check" : "shopping-bag"}"
            style="width: 15px; height: 15px;"
          ></i>
          ${added ? "Remove" : "Add to Cart"}
        `;
        } else {
          button.textContent = added ? "✓ Remove from Cart" : "＋ Add to Cart";
        }
      });

    // Re-render newly inserted Lucide icons.
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  /* EVENT DELEGATION*/

  document.addEventListener("click", (event) => {
    /*event.target IS THE ELEMENT THAT USER HAS CLICKED ON IT AND
    closest("[data-cart]") TRY TO FIND THE CLOSEST ELEMENT THAT HAVE data-cart FEATURE
    EVEN THE USER CLICKED ON INNER ICON OF BUTTON */
    const cartButton = event.target.closest("[data-cart]");
    /*IF THE BUTTON FIND THE PRODUCT ID WILL GIVE FROM dataset.cart AND IT WILL SENT TO toggleCart()*/
    if (cartButton) {
      toggleCart(cartButton.dataset.cart);

      return;
    }

    const wishlistButton = event.target.closest("[data-wishlist]");

    if (wishlistButton) {
      toggleWishlist(wishlistButton.dataset.wishlist);

      return;
    }

    const openTrendingButton = event.target.closest("[data-open-trending]");

    if (openTrendingButton) {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });

      openModal("all", "Trending Now");

      return;
    }

    const closeButton = event.target.closest("[data-close-modal]");

    if (closeButton) {
      closeModal();

      return;
    }

    const viewAllButton = event.target.closest("[data-view-all]");

    if (viewAllButton) {
      const category = viewAllButton.dataset.viewAll;

      const title =
        category === "skincare" ? "Trending Skincare" : "Trending Makeup";
      /*THE MODAL OPEN ACCORDING TO ITS CATAGORY AND TITLE*/
      openModal(category, title);

      return;
    }

    const scrollButton = event.target.closest("[data-scroll-skincare]");

    if (scrollButton) {
      const skincare = document.getElementById("trending-skincare");

      if (skincare) {
        skincare.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    const categoryButton = event.target.closest("[data-category]");

    if (categoryButton) {
      const category = categoryButton.dataset.category;

      if (category === "skincare" || category === "makeup") {
        const target = document.getElementById(`trending-${category}`);

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else {
        openModal(
          category,
          `${category.charAt(0).toUpperCase() + category.slice(1)} Trending`,
        );
      }

      return;
    }
  });

  /* MODAL FILTERS */

  document.addEventListener("click", (event) => {
    const filterButton = event.target.closest("[data-modal-filter]");

    if (!filterButton) {
      return;
    }

    const filter = filterButton.dataset.modalFilter;

    let title = "Trending Now";

    if (filter !== "all") {
      title = `Trending ${filter.charAt(0).toUpperCase() + filter.slice(1)}`;
    }

    openModal(filter, title);
  });

  /* ESCAPE*/

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  /* KEEP CART AND WISHLIST IN SYNC WITH OTHER PAGE SCRIPTS */

  function reloadCartAndWishlist() {
    cart = normalizeCartItems(loadStoredItems("eveBeautyCart"));
    wishlist = normalizeWishlistItems(loadStoredItems("eveBeautyWishlist"));

    renderMainProducts();

    if (modal && !modal.hidden && modalProducts) {
      const activeFilter =
        document.querySelector(".modal-filter-btn.active")?.dataset
          .modalFilter || "all";

      const activeTitle = modalTitle.textContent || "Trending Now";

      modalProducts.innerHTML = "";

      const selectedProducts =
        activeFilter === "all"
          ? getAllProducts()
          : products[activeFilter] || [];

      selectedProducts.forEach((product) => {
        modalProducts.appendChild(createModalProduct(product));
      });

      modalTitle.textContent = activeTitle;

      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    }

    if (typeof updateNavbarCounts === "function") {
      updateNavbarCounts();
    }

    if (typeof renderCartDropdown === "function") {
      renderCartDropdown();
    }

    if (typeof renderWishlistDropdown === "function") {
      renderWishlistDropdown();
    }
  }

  window.addEventListener("eveBeautyCartUpdated", reloadCartAndWishlist);
  window.addEventListener("eveBeautyCartChanged", reloadCartAndWishlist);
  window.addEventListener("eveBeautyWishlistUpdated", reloadCartAndWishlist);
  window.addEventListener("eveBeautyWishlistChanged", reloadCartAndWishlist);

  window.addEventListener("storage", (event) => {
    const cartKey = getUserStorageKey("eveBeautyCart");
    const wishlistKey = getUserStorageKey("eveBeautyWishlist");

    if (
      event.key === cartKey ||
      event.key === wishlistKey ||
      event.key === "eveBeautyCart" ||
      event.key === "eveBeautyWishlist" ||
      event.key === "eveBeautyCurrentUser"
    ) {
      reloadCartAndWishlist();
    }
  });

  /* INITIAL RENDER*/

  renderMainProducts();

  /* LUCIDE*/

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});

/* =========================================================
     TRENDING - FULL PAGE SCROLL REVEAL ANIMATIONS
  ========================================================= */

if (!document.getElementById("trending-scroll-reveal-style")) {
  const style = document.createElement("style");

  style.id = "trending-scroll-reveal-style";

  style.textContent = `
      .trending-scroll-reveal {
        opacity: 0;
        transform: translateY(30px);
        transition:
          opacity 0.7s ease,
          transform 0.7s ease;
        will-change: opacity, transform;
      }

      .trending-scroll-reveal.is-visible {
        opacity: 1;
        transform: translateY(0);
        will-change: auto;
      }

      @media (prefers-reduced-motion: reduce) {
        .trending-scroll-reveal,
        .trending-scroll-reveal.is-visible {
          opacity: 1;
          transform: none;
          transition: none;
          will-change: auto;
        }
      }
    `;

  document.head.appendChild(style);
}

const trendingScrollObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
            } else {
              entry.target.classList.remove("is-visible");
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -25px 0px",
        },
      )
    : null;

function setupTrendingScrollAnimations(root = document) {
  const revealSelectors = [
    /* Main page sections */
    "section",
    "header",
    "footer",
    "main",

    /* Headings and text */
    "h1",
    "h2",
    "h3",
    ".section-title",
    ".section-heading",
    ".section-subtitle",
    ".section-description",
    ".trending-title",
    ".trending-subtitle",

    /* Hero area */
    ".hero",
    ".hero-content",
    ".hero-title",
    ".hero-description",
    ".hero-image",
    ".hero-buttons",
    ".hero-button",

    /* Trending sections */
    "#trending-skincare",
    "#trending-makeup",
    "#skincare-products",
    "#makeup-products",

    /* Product cards and images */
    ".trending-product-card",
    ".trending-product-image",
    ".trending-product-info",
    ".trending-product-brand",
    ".trending-product-name",
    ".trending-rating",
    ".trending-product-bottom",

    /* Category cards and controls */
    ".category-card",
    ".trending-category",
    ".trending-category-card",
    ".trending-banner",
    ".trending-feature",
    ".trending-feature-card",
    ".trending-content",
    ".trending-image",
    ".trending-text",
    ".trending-button",
    ".trending-link",
    "[data-category]",
    "[data-view-all]",
    "[data-scroll-skincare]",
    "[data-open-trending]",

    /* Modal content */
    ".modal-content",
    ".modal-header",
    ".modal-title",
    ".modal-filter-btn",
    ".modal-trending-card",
    ".modal-trending-image",
    ".modal-trending-info",

    /* Other common page elements */
    ".container > *",
    ".section-header",
    ".section-content",
    ".products-grid",
    ".product-grid",
    ".category-grid",
    ".trending-grid",
    ".banner-content",
    ".banner-image",
  ];

  const elements = root.querySelectorAll(revealSelectors.join(", "));

  elements.forEach((element, index) => {
    if (element.classList.contains("trending-scroll-reveal")) {
      return;
    }

    element.classList.add("trending-scroll-reveal");

    element.style.transitionDelay = `${(index % 4) * 80}ms`;

    if (trendingScrollObserver) {
      trendingScrollObserver.observe(element);
    } else {
      element.classList.add("is-visible");
    }
  });
}

/* Initialize animations for existing page elements */
setupTrendingScrollAnimations();
