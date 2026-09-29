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
     GALLERY DATA

     هر نقطه = سه عکس جدید
  ========================================================= */

  const gallerySlides = [
    [
      "assets/images/cica-repair-cream.jpg",
      "assets/images/vitamin-c-glow-serum.jpg",
      "assets/images/rose-milk-cleanser.jpg",
    ],

    [
      "assets/images/hydra-cream.jpg",
      "assets/images/fit-me-foundation.jpg",
      "assets/images/dior-addict-lip-glow.jpg",
    ],

    [
      "assets/images/lash-sensational-mascara.jpg",
      "assets/images/les-beiges-powder.jpg",
      "assets/images/radiance-facial-serum.jpg",
    ],

    [
      "assets/images/best-sellers-hero.jpg",
      "assets/images/cica-repair-cream.jpg",
      "assets/images/vitamin-c-glow-serum.jpg",
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
        icon.className = "fa-solid fa-check";
      }

      if (text) {
        text.textContent = "Added — Remove";
      }

      button.setAttribute("aria-label", "Remove from cart");
    } else {
      button.classList.remove("added");

      if (icon) {
        icon.className = "fa-solid fa-cart-shopping";
      }

      if (text) {
        text.textContent = "Add to Cart";
      }

      button.setAttribute("aria-label", "Add to cart");
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
    button.addEventListener("click", () => {
      const card = button.closest(".best-product-card");

      const product = getProductFromCard(card);

      if (!product || !product.id) {
        return;
      }

      const existingIndex = cartItems.findIndex(
        (item) => item.id === product.id,
      );

      /* ===============================================
         SECOND CLICK = REMOVE
      =============================================== */

      if (existingIndex !== -1) {
        cartItems.splice(existingIndex, 1);

        saveCart();

        updateCartButton(button, false);

        showToast(`${product.name} removed from cart`);

        return;
      }

      /* ===============================================
         FIRST CLICK = ADD
      =============================================== */

      cartItems.push(product);

      saveCart();

      updateCartButton(button, true);

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

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");

      if (button.classList.contains("active")) {
        button.textContent = "♥";

        showToast("Added to your wishlist");
      } else {
        button.textContent = "♡";

        showToast("Removed from your wishlist");
      }
    });
  });

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
      image: "assets/images/cica-repair-cream.jpg",
    },

    {
      id: "vitamin-c-glow-serum",
      name: "Vitamin C Glow Serum",
      brand: "EVE BEAUTY",
      price: "$42.00",
      image: "assets/images/vitamin-c-glow-serum.jpg",
    },

    {
      id: "rose-milk-cleanser",
      name: "Rose Milk Cleanser",
      brand: "EVE BEAUTY",
      price: "$28.00",
      image: "assets/images/rose-milk-cleanser.jpg",
    },

    {
      id: "hydra-cream",
      name: "Hydra Cream",
      brand: "EVE BEAUTY",
      price: "$36.00",
      image: "assets/images/hydra-cream.jpg",
    },

    {
      id: "fit-me-foundation",
      name: "Fit Me Foundation",
      brand: "MAYBELLINE",
      price: "$16.00",
      image: "assets/images/fit-me-foundation.jpg",
    },

    {
      id: "dior-addict-lip-glow",
      name: "Dior Addict Lip Glow",
      brand: "DIOR",
      price: "$42.00",
      image: "assets/images/dior-addict-lip-glow.jpg",
    },

    {
      id: "lash-sensational-mascara",
      name: "Lash Sensational Mascara",
      brand: "MAYBELLINE",
      price: "$18.00",
      image: "assets/images/lash-sensational-mascara.jpg",
    },

    {
      id: "les-beiges-powder",
      name: "Les Beiges Powder",
      brand: "CHANEL",
      price: "$64.00",
      image: "assets/images/les-beiges-powder.jpg",
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
  }
});
