document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     ELEMENTS
  ========================================================= */

  const cartButtons = document.querySelectorAll("[data-add-cart]");

  const wishlistButtons = document.querySelectorAll(".best-wishlist");

  const exploreButton = document.getElementById("exploreBestSellers");

  const modal = document.getElementById("bestSellersModal");

  const modalProducts = document.getElementById("bestModalProducts");

  const toast = document.getElementById("bestCartToast");

  const galleryDots = document.querySelectorAll(".gallery-dot");

  const galleryImage1 = document.getElementById("galleryImage1");

  const galleryImage2 = document.getElementById("galleryImage2");

  const galleryImage3 = document.getElementById("galleryImage3");

  /* =========================================================
   CURRENT USER
========================================================= */

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
      console.warn("Could not read current user:", error);

      return null;
    }
  }
  /* =========================================================
     GALLERY DATA

     هر نقطه = سه عکس جدید
  ========================================================= */

  const gallerySlides = [
    [
      "assets/images/product-cicapair-cream.jpg",
      "assets/images/product-vitamin-c-glow-serum.jpg",
      "assets/images/product-rose-milk-cleanser.jpg",
    ],

    [
      "assets/images/product-11.jpg",
      "assets/images/product-fit-me-foundation.jpg",
      "assets/images/product-dior-addict.jpg",
    ],

    [
      "assets/images/product-lash-sensational.jpg",
      "assets/images/product-les-beiges.jpg",
      "assets/images/product-radiance-serum.jpg",
    ],

    [
      "assets/images/product-glow-spf-50.jpg",
      "assets/images/product-4.jpg",
      "assets/images/product-5.jpg",
    ],
  ];

  /* =========================================================
     CART STORAGE
  ========================================================= */

  let cartItems = [];

  try {
    const savedCart = localStorage.getItem("eveBeautyCart");

    if (savedCart) {
      cartItems = JSON.parse(savedCart);
    }

    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }
  } catch (error) {
    console.warn("Could not load cart:", error);

    cartItems = [];
  }

  /* =========================================================
     SAVE CART
  ========================================================= */

  function saveCart() {
    try {
      localStorage.setItem("eveBeautyCart", JSON.stringify(cartItems));
    } catch (error) {
      console.warn("Could not save cart:", error);
    }
  }

  /* =========================================================
     TOAST
  ========================================================= */

  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 1800);
  }

  /* =========================================================
     GET PRODUCT DATA
  ========================================================= */

  function getProductFromCard(card) {
    if (!card) return null;

    return {
      id: card.dataset.productId || "",

      name: card.dataset.productName || "",

      price: Number(card.dataset.productPrice || 0),

      image: card.dataset.productImage || "",
    };
  }

  /* =========================================================
     CHECK CART
  ========================================================= */

  function isProductInCart(productId) {
    return cartItems.some((item) => item.id === productId);
  }

  /* =========================================================
     UPDATE CART BUTTON
  ========================================================= */

  function updateCartButton(button, added) {
    if (!button) return;

    const icon = button.querySelector("i");
    const text = button.querySelector("span");

    if (added) {
      button.classList.add("added");

      if (icon) {
        icon.className = "fa-solid fa-cart-shopping";
      }

      if (text) {
        text.textContent = "Remove";
      }

      button.setAttribute("aria-label", "Remove from cart");
      button.setAttribute("aria-pressed", "true");
    } else {
      button.classList.remove("added");

      if (icon) {
        icon.className = "fa-solid fa-cart-shopping";
      }

      if (text) {
        text.textContent = "Add to Cart";
      }

      button.setAttribute("aria-label", "Add to cart");
      button.setAttribute("aria-pressed", "false");
    }
  }

  /* =========================================================
     SYNC CART BUTTONS
  ========================================================= */

  function syncCartButtons() {
    cartButtons.forEach((button) => {
      const card = button.closest(".best-product-card");

      const product = getProductFromCard(card);

      if (!product) return;

      updateCartButton(button, isProductInCart(product.id));
    });
  }

  /* =========================================================
     ADD / REMOVE CART
  ========================================================= */

  cartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const card = button.closest(".best-product-card");
      const product = getProductFromCard(card);

      if (!product || !product.id) return;

      const currentUser = getCurrentUser();

      if (!currentUser) {
        localStorage.setItem("eveBeautyLoginRedirect", "best-sellers.html");

        alert("Please sign in first to add products to your cart.");

        window.location.href = "login.html";
        return;
      }

      const existingIndex = cartItems.findIndex(
        (item) => String(item.id) === String(product.id),
      );

      // اگر قبلاً در Cart است → حذف شود
      if (existingIndex !== -1) {
        cartItems.splice(existingIndex, 1);

        saveCart();

        updateCartButton(button, false);

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

      // اگر در Cart نیست → اضافه شود
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });

      saveCart();

      updateCartButton(button, true);

      if (typeof updateNavbarCounts === "function") {
        updateNavbarCounts();
      }

      if (typeof renderCartDropdown === "function") {
        renderCartDropdown();
      }

      window.dispatchEvent(new CustomEvent("eveBeautyCartChanged"));

      showToast(`${product.name} added to cart`);
    });
  });

  /* =========================================================
     INITIAL CART STATE
  ========================================================= */

  syncCartButtons();

  /* =========================================================
   WISHLIST
========================================================= */

  let wishlistItems = [];

  try {
    const savedWishlist = localStorage.getItem("eveBeautyWishlist");

    if (savedWishlist) {
      wishlistItems = JSON.parse(savedWishlist);
    }

    if (!Array.isArray(wishlistItems)) {
      wishlistItems = [];
    }
  } catch (error) {
    console.warn("Could not load wishlist:", error);

    wishlistItems = [];
  }

  /* =========================================================
   SAVE WISHLIST
========================================================= */

  function saveWishlist() {
    try {
      localStorage.setItem("eveBeautyWishlist", JSON.stringify(wishlistItems));
    } catch (error) {
      console.warn("Could not save wishlist:", error);
    }
  }

  /* =========================================================
   CHECK WISHLIST
========================================================= */

  function isProductInWishlist(productId) {
    return wishlistItems.some((item) => String(item.id) === String(productId));
  }

  /* =========================================================
   UPDATE WISHLIST BUTTON
========================================================= */

  function updateWishlistButton(button, active) {
    if (!button) return;

    button.classList.toggle("active", active);

    button.setAttribute(
      "aria-label",
      active ? "Remove from wishlist" : "Add to wishlist",
    );

    button.setAttribute("aria-pressed", active ? "true" : "false");

    const icon = button.querySelector("i");

    if (icon) {
      if (active) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");

        icon.style.color = "#aa8386";
      } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");

        icon.style.color = "";
      }
    }
  }
  /* =========================================================
   SYNC WISHLIST BUTTONS
========================================================= */

  function syncWishlistButtons() {
    wishlistButtons.forEach((button) => {
      const card = button.closest(".best-product-card");

      const product = getProductFromCard(card);

      if (!product || !product.id) return;

      updateWishlistButton(button, isProductInWishlist(product.id));
    });
  }

  /* =========================================================
   ADD / REMOVE WISHLIST
========================================================= */

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const card = button.closest(".best-product-card");

      const product = getProductFromCard(card);

      if (!product || !product.id) {
        console.warn("Could not find product data for wishlist button.");
        return;
      }

      const currentUser = getCurrentUser();

      /* =====================================================
       LOGIN CHECK
    ===================================================== */

      if (!currentUser) {
        localStorage.setItem("eveBeautyLoginRedirect", "best-sellers.html");

        alert("Please sign in first to add products to your wishlist.");

        window.location.href = "login.html";

        return;
      }

      /* =====================================================
       FIND PRODUCT
    ===================================================== */

      const existingIndex = wishlistItems.findIndex(
        (item) => String(item.id) === String(product.id),
      );

      /* =====================================================
       REMOVE FROM WISHLIST
    ===================================================== */

      if (existingIndex !== -1) {
        wishlistItems.splice(existingIndex, 1);

        saveWishlist();

        updateWishlistButton(button, false);

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

      /* =====================================================
       ADD TO WISHLIST
    ===================================================== */

      wishlistItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: "Beauty",
      });

      saveWishlist();

      updateWishlistButton(button, true);

      if (typeof updateNavbarCounts === "function") {
        updateNavbarCounts();
      }

      if (typeof renderWishlistDropdown === "function") {
        renderWishlistDropdown();
      }

      window.dispatchEvent(new CustomEvent("eveBeautyWishlistChanged"));

      showToast(`${product.name} added to your wishlist`);
    });
  });

  /* =========================================================
   INITIAL WISHLIST STATE
========================================================= */

  syncWishlistButtons();

  /* =========================================================
     GALLERY
  ========================================================= */

  function changeGallery(slideIndex) {
    if (
      !gallerySlides[slideIndex] ||
      !galleryImage1 ||
      !galleryImage2 ||
      !galleryImage3
    ) {
      return;
    }

    const images = gallerySlides[slideIndex];

    /* fade out */

    [galleryImage1, galleryImage2, galleryImage3].forEach((image) => {
      image.style.opacity = "0";
    });

    setTimeout(() => {
      galleryImage1.src = images[0];

      galleryImage2.src = images[1];

      galleryImage3.src = images[2];

      galleryImage1.style.opacity = "1";
      galleryImage2.style.opacity = "1";
      galleryImage3.style.opacity = "1";
    }, 160);

    /* active dot */

    galleryDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === slideIndex);
    });
  }

  /* =========================================================
     GALLERY DOT EVENTS
  ========================================================= */

  galleryDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const slide = Number(dot.dataset.slide);

      changeGallery(slide);
    });
  });

  /* =========================================================
     AUTO GALLERY
     
     هر 5 ثانیه خودش تغییر می‌کند
  ========================================================= */

  let currentGallerySlide = 0;

  setInterval(() => {
    currentGallerySlide++;

    if (currentGallerySlide >= gallerySlides.length) {
      currentGallerySlide = 0;
    }

    changeGallery(currentGallerySlide);
  }, 5000);

  /* =========================================================
     MODAL PRODUCT DATA
  ========================================================= */

  const modalProductData = [
    {
      id: "cica-repair-cream",
      name: "Cica Repair Cream",
      brand: "EVE BEAUTY",
      price: "$38.00",
      image: "assets/images/product-cicapair-cream.jpg",
    },

    {
      id: "vitamin-c-glow-serum",
      name: "Vitamin C Glow Serum",
      brand: "EVE BEAUTY",
      price: "$42.00",
      image: "assets/images/product-vitamin-c-glow-serum.jpg",
    },

    {
      id: "rose-milk-cleanser",
      name: "Rose Milk Cleanser",
      brand: "EVE BEAUTY",
      price: "$28.00",
      image: "assets/images/product-rose-milk-cleanser.jpg",
    },

    {
      id: "hydra-cream",
      name: "Hydra Cream",
      brand: "EVE BEAUTY",
      price: "$36.00",
      image: "assets/images/product-11.jpg",
    },

    {
      id: "fit-me-foundation",
      name: "Fit Me Foundation",
      brand: "MAYBELLINE",
      price: "$16.00",
      image: "assets/images/product-fit-me-foundation.jpg",
    },

    {
      id: "dior-addict-lip-glow",
      name: "Dior Addict Lip Glow",
      brand: "DIOR",
      price: "$42.00",
      image: "assets/images/product-dior-addict.jpg",
    },

    {
      id: "lash-sensational-mascara",
      name: "Lash Sensational Mascara",
      brand: "MAYBELLINE",
      price: "$18.00",
      image: "assets/images/product-lash-sensational.jpg",
    },

    {
      id: "les-beiges-powder",
      name: "Les Beiges Powder",
      brand: "CHANEL",
      price: "$64.00",
      image: "assets/images/product-les-beiges.jpg",
    },
    {
      id: "radiance-facial-serum",
      name: "Radiance Facial Serum",
      brand: "EVE BEAUTY",
      price: "$46.00",
      image: "assets/images/product-radiance-serum.jpg",
    },

    {
      id: "rose-water-toner",
      name: "Rose Water Toner",
      brand: "EVE BEAUTY",
      price: "$32.00",
      image: "assets/images/product-14.jpg",
    },
  ];

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

  /* =========================================================
     BUILD MODAL PRODUCTS
  ========================================================= */

  function buildModalProducts() {
    if (!modalProducts) return;

    modalProducts.innerHTML = modalProductData
      .map((product) => {
        return `

            <article class="modal-product">

              <div class="modal-product-image">

                <img
                  src="${escapeHTML(product.image)}"
                  alt="${escapeHTML(product.name)}"
                  onerror="this.style.display='none'"
                />

              </div>

              <div class="modal-product-info">

                <span class="modal-product-brand">
                  ${escapeHTML(product.brand)}
                </span>

                <h3>
                  ${escapeHTML(product.name)}
                </h3>

                <strong class="modal-product-price">
                  ${escapeHTML(product.price)}
                </strong>

              </div>

            </article>

          `;
      })
      .join("");
  }

  /* =========================================================
     OPEN MODAL
  ========================================================= */

  function openModal() {
    if (!modal) return;

    buildModalProducts();

    modal.hidden = false;

    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  function closeModal() {
    if (!modal) return;

    modal.hidden = true;

    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }

  /* =========================================================
     EXPLORE BUTTON
  ========================================================= */

  if (exploreButton) {
    exploreButton.addEventListener("click", openModal);
  }

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  if (modal) {
    modal.querySelectorAll("[data-modal-close]").forEach((element) => {
      element.addEventListener("click", closeModal);
    });
  }

  /* =========================================================
     ESC CLOSE MODAL
  ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && !modal.hidden) {
      closeModal();
    }
  });

  /* =========================================================
     VIEW ALL
  ========================================================= */

  const viewAllButtons = document.querySelectorAll(".best-view-all");

  viewAllButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const category = button.dataset.category || "beauty";

      if (category === "skincare") {
        showToast("Showing our best selling skincare");
      } else if (category === "makeup") {
        showToast("Showing our best selling makeup");
      }
    });
  });

  /* =========================================================
     HERO SHOP BUTTON
  ========================================================= */

  const heroButton = document.querySelector(".best-hero-button");

  if (heroButton) {
    heroButton.addEventListener("click", () => {
      setTimeout(() => {
        const products = document.getElementById("best-products");

        if (products) {
          products.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 20);
    });
  }

  /* =========================================================
     INITIAL GALLERY
  ========================================================= */

  changeGallery(0);

  /* =========================================================
     LUCIDE
  ========================================================= */

  if (typeof lucide !== "undefined") {
    lucide.createIcons();

    syncWishlistButtons();
    syncCartButtons();
  }
});
