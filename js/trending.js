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
        price: 16,
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
        price: 14,
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
        price: 28,
        oldPrice: 35,
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
        price: 31,
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
        price: 29,
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
        price: 89,
        oldPrice: null,
        rating: 4.9,
        reviews: 128,
        badge: "BEST SELLER",
        image: "assets/images/noire-eau-de-parfum.jpg",
      },

      {
        id: "rose-essence",
        name: "Rose Essence",
        brand: "EVE BEAUTY",
        price: 76,
        oldPrice: null,
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
        price: 79,
        oldPrice: 98,
        rating: 4.9,
        reviews: 87,
        badge: "LIMITED",
        image: "assets/images/eve-glow-set.jpg",
      },
    ],
  };

  /* =======================================================
     STORAGE
  ======================================================= */

  let cart = JSON.parse(localStorage.getItem("eveBeautyCart") || "[]");

  let wishlist = JSON.parse(localStorage.getItem("eveBeautyWishlist") || "[]");

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const skincareContainer = document.getElementById("skincare-products");

  const makeupContainer = document.getElementById("makeup-products");

  const modal = document.getElementById("trendingModal");

  const modalProducts = document.getElementById("trendingModalProducts");

  const modalTitle = document.getElementById("trendingModalTitle");

  const toast = document.getElementById("trendingCartToast");

  /* =======================================================
     RENDER PRODUCT
  ======================================================= */

  function createProductCard(product) {
    const article = document.createElement("article");

    article.className = "trending-product-card";

    article.dataset.productId = product.id;

    const isInCart = cart.includes(product.id);

    const isWishlisted = wishlist.includes(product.id);

    const oldPriceHTML = product.oldPrice
      ? `<del>$${product.oldPrice.toFixed(2)}</del>`
      : "";

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
          aria-label="Add to wishlist"
        >
          ${isWishlisted ? "♥" : "♡"}
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

            <i class="fa-solid ${
              isInCart ? "fa-check" : "fa-cart-shopping"
            }"></i>

            ${isInCart ? "Remove" : "Add to Cart"}

          </button>

        </div>

      </div>
    `;

    return article;
  }

  /* =======================================================
     RENDER INITIAL PRODUCTS
  ======================================================= */

  function renderMainProducts() {
    if (skincareContainer) {
      skincareContainer.innerHTML = "";

      products.skincare.slice(0, 4).forEach((product) => {
        skincareContainer.appendChild(createProductCard(product));
      });
    }

    if (makeupContainer) {
      makeupContainer.innerHTML = "";

      products.makeup.slice(0, 4).forEach((product) => {
        makeupContainer.appendChild(createProductCard(product));
      });
    }
  }

  /* =======================================================
     ALL PRODUCTS
  ======================================================= */

  function getAllProducts() {
    return [
      ...products.skincare,
      ...products.makeup,
      ...products.haircare,
      ...products.fragrance,
      ...products.sets,
    ];
  }

  /* =======================================================
     MODAL PRODUCT CARD
  ======================================================= */

  function createModalProduct(product) {
    const isInCart = cart.includes(product.id);

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

  /* =======================================================
     OPEN MODAL
  ======================================================= */

  function openModal(filter = "all", title = "Trending Now") {
    const allProducts = getAllProducts();

    let selectedProducts = allProducts;

    if (filter !== "all") {
      selectedProducts = products[filter] || [];
    }

    modalTitle.textContent = title;

    modalProducts.innerHTML = "";

    selectedProducts.forEach((product) => {
      modalProducts.appendChild(createModalProduct(product));
    });

    document.querySelectorAll(".modal-filter-btn").forEach((button) => {
      button.classList.toggle("active", button.dataset.modalFilter === filter);
    });

    modal.hidden = false;

    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  function closeModal() {
    modal.hidden = true;

    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }

  /* =======================================================
     TOAST
  ======================================================= */

  let toastTimer;

  function showToast(message) {
    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }

  /* =======================================================
     CART
  ======================================================= */

  function toggleCart(productId) {
    const index = cart.indexOf(productId);

    const product = getAllProducts().find((item) => item.id === productId);

    if (index === -1) {
      cart.push(productId);

      showToast(`${product.name} added to your cart.`);
    } else {
      cart.splice(index, 1);

      showToast(`${product.name} removed from your cart.`);
    }

    localStorage.setItem("eveBeautyCart", JSON.stringify(cart));

    refreshCartButtons(productId);
  }

  /* =======================================================
     REFRESH CART BUTTONS
  ======================================================= */

  function refreshCartButtons(productId) {
    document
      .querySelectorAll(`[data-cart="${productId}"]`)
      .forEach((button) => {
        const added = cart.includes(productId);

        button.classList.toggle("added", added);

        if (button.classList.contains("trending-add-cart")) {
          button.innerHTML = `

            <i class="fa-solid ${added ? "fa-check" : "fa-cart-shopping"}"></i>

            ${added ? "Remove" : "Add to Cart"}

          `;
        } else {
          button.textContent = added ? "✓ Remove from Cart" : "＋ Add to Cart";
        }
      });
  }

  /* =======================================================
     WISHLIST
  ======================================================= */

  function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);

    if (index === -1) {
      wishlist.push(productId);

      showToast("Product added to your wishlist.");
    } else {
      wishlist.splice(index, 1);

      showToast("Product removed from your wishlist.");
    }

    localStorage.setItem("eveBeautyWishlist", JSON.stringify(wishlist));

    document
      .querySelectorAll(`[data-wishlist="${productId}"]`)
      .forEach((button) => {
        const active = wishlist.includes(productId);

        button.classList.toggle("active", active);

        button.textContent = active ? "♥" : "♡";
      });
  }

  /* =======================================================
     EVENT DELEGATION
  ======================================================= */

  document.addEventListener("click", (event) => {
    const cartButton = event.target.closest("[data-cart]");

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

  /* =======================================================
     MODAL FILTERS
  ======================================================= */

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

  /* =======================================================
     ESCAPE
  ======================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  /* =======================================================
     INITIAL RENDER
  ======================================================= */

  renderMainProducts();

  /* =======================================================
     LUCIDE
  ======================================================= */

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});
