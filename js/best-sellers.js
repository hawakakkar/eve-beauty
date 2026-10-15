/*EVE BEAUTY-- BEST-SELLERS.JS*/

document.addEventListener("DOMContentLoaded", () => {
  /* ELEMENTS */

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

  /*CURRENT USER*/

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

  function getUserCartKey() {
    const user = getCurrentUser();

    return user ? `eveBeautyCart_${user.id}` : "eveBeautyCart";
  }

  function getUserWishlistKey() {
    const user = getCurrentUser();

    return user ? `eveBeautyWishlist_${user.id}` : "eveBeautyWishlist";
  }

  /*GALLERY DATA*/

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

  /*  CART STORAGE*/

  let cartItems = [];

  function loadCart() {
    try {
      const userCartKey = getUserCartKey();
      const savedCart = localStorage.getItem(userCartKey);

      const cart = JSON.parse(
        savedCart !== null
          ? savedCart
          : localStorage.getItem("eveBeautyCart") || "[]",
      );

      return Array.isArray(cart) ? cart : [];
    } catch (error) {
      console.warn("Could not load cart:", error);

      return [];
    }
  }

  cartItems = loadCart();

  /*SAVING CART PRODUCT IN BROWSER UNTIL THE INFO DONT REMOVE DURING REFRESH */

  function saveCart() {
    try {
      const user = getCurrentUser();

      if (user) {
        localStorage.setItem(
          `eveBeautyCart_${user.id}`,
          JSON.stringify(cartItems),
        );

        localStorage.setItem(
          "eveBeautyCartCurrentUser",
          JSON.stringify({
            userId: user.id,
            items: cartItems,
            updatedAt: new Date().toISOString(),
          }),
        );
      }

      localStorage.setItem("eveBeautyCart", JSON.stringify(cartItems));

      window.dispatchEvent(new CustomEvent("eveBeautyCartUpdated"));

      return true;
    } catch (error) {
      console.warn("Could not save cart:", error);

      return false;
    }
  }

  /* TOAST*/

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

  /* GET PRODUCT DATA FROM HTML*/

  function getProductFromCard(card) {
    if (!card) return null;

    return {
      id: card.dataset.productId || "",

      name: card.dataset.productName || "",

      price: Number(card.dataset.productPrice || 0),

      image: card.dataset.productImage || "",
    };
  }

  /* CHECK CART*/

  function isProductInCart(productId) {
    return cartItems.some((item) => String(item.id) === String(productId));
  }

  /* UPDATE CART BUTTON */

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

  /* SYNC CART BUTTONS*/

  function syncCartButtons() {
    cartButtons.forEach((button) => {
      const card = button.closest(".best-product-card");

      const product = getProductFromCard(card);

      if (!product) return;

      updateCartButton(button, isProductInCart(product.id));
    });
  }

  /* ADD / REMOVE CART */

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

      cartItems = loadCart();

      const existingIndex = cartItems.findIndex(
        (item) => String(item.id) === String(product.id),
      );

      // IF THE PRODUCT WAS ALREADY EXIST IT WILL REMOVE*/
      if (existingIndex !== -1) {
        cartItems.splice(existingIndex, 1);

        if (!saveCart()) return;
        /*THIS CHANGE THE BUTTON TO ITS FIRST FORM*/
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

      /*THIS ADD A NEW OBJECT TO CART ITEMS ARRAYS*/
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });

      if (!saveCart()) return;

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

  /* INITIAL CART STATE*/

  syncCartButtons();

  window.addEventListener("eveBeautyCartUpdated", () => {
    cartItems = loadCart();
    syncCartButtons();
  });

  window.addEventListener("eveBeautyCartChanged", () => {
    cartItems = loadCart();
    syncCartButtons();
  });

  window.addEventListener("storage", (event) => {
    if (
      event.key === "eveBeautyCart" ||
      event.key === "eveBeautyCartCurrentUser" ||
      event.key === getUserCartKey()
    ) {
      cartItems = loadCart();
      syncCartButtons();
    }
  });

  /* 
   WISHLIST */

  let wishlistItems = [];

  function loadWishlist() {
    try {
      const userWishlistKey = getUserWishlistKey();
      const savedWishlist = localStorage.getItem(userWishlistKey);

      const wishlist = JSON.parse(
        savedWishlist !== null
          ? savedWishlist
          : localStorage.getItem("eveBeautyWishlist") || "[]",
      );

      return Array.isArray(wishlist) ? wishlist : [];
    } catch (error) {
      console.warn("Could not load wishlist:", error);

      return [];
    }
  }

  wishlistItems = loadWishlist();

  /*SAVE WISHLIST */

  function saveWishlist() {
    try {
      const user = getCurrentUser();

      if (user) {
        localStorage.setItem(
          `eveBeautyWishlist_${user.id}`,
          JSON.stringify(wishlistItems),
        );
      }

      localStorage.setItem("eveBeautyWishlist", JSON.stringify(wishlistItems));

      window.dispatchEvent(new CustomEvent("eveBeautyWishlistUpdated"));

      return true;
    } catch (error) {
      console.warn("Could not save wishlist:", error);

      return false;
    }
  }

  /*CHECK WISHLIST */

  function isProductInWishlist(productId) {
    return wishlistItems.some((item) => String(item.id) === String(productId));
  }

  /*UPDATE WISHLIST BUTTON */

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

  /*SYNC WISHLIST BUTTONS */

  function syncWishlistButtons() {
    wishlistButtons.forEach((button) => {
      const card = button.closest(".best-product-card");

      const product = getProductFromCard(card);

      if (!product || !product.id) return;

      updateWishlistButton(button, isProductInWishlist(product.id));
    });
  }

  /*ADD / REMOVE WISHLIST*/

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

      /*  LOGIN CHECK */

      if (!currentUser) {
        localStorage.setItem("eveBeautyLoginRedirect", "best-sellers.html");

        alert("Please sign in first to add products to your wishlist.");

        window.location.href = "login.html";

        return;
      }

      wishlistItems = loadWishlist();

      /*FIND PRODUCT*/

      const existingIndex = wishlistItems.findIndex(
        (item) => String(item.id) === String(product.id),
      );

      /*REMOVE FROM WISHLIST*/

      if (existingIndex !== -1) {
        wishlistItems.splice(existingIndex, 1);

        if (!saveWishlist()) return;
        /*THIS MAKE THE HEART UNACTIVE*/
        updateWishlistButton(button, false);
        /*THIS CHECK THAT ARE THE updateWishlistButton FUNCTION DEFINED OR NO
        AND IF IT DEFINED THE NAVBAR COUNTS OF WISHLISH WILL CHANGE*/
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

      /* ADD TO WISHLIST*/

      wishlistItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: "Beauty",
      });

      if (!saveWishlist()) return;

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

  /* INITIAL WISHLIST STATE */

  syncWishlistButtons();

  window.addEventListener("eveBeautyWishlistUpdated", () => {
    wishlistItems = loadWishlist();
    syncWishlistButtons();
  });

  window.addEventListener("eveBeautyWishlistChanged", () => {
    wishlistItems = loadWishlist();
    syncWishlistButtons();
  });

  window.addEventListener("storage", (event) => {
    if (
      event.key === "eveBeautyWishlist" ||
      event.key === getUserWishlistKey()
    ) {
      wishlistItems = loadWishlist();
      syncWishlistButtons();
    }
  });

  /* GALLERY */
  /*THIS FUNCTION GIVE NUMBER BYNTHE NAME OF SLIDEINDEX AND IT WILL DISPLAY THAT SLIDES*/
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
      /*THIS GIVE THE ACTIVE FOR THE CHOOSEN SLIDE AND
      THE index === slideIndex CHECK THAT ARE THE CURRENTLY SLIDE FOR DOTS OR NO*/
      dot.classList.toggle("active", index === slideIndex);
    });
  }

  /* GALLERY DOT EVENTS */

  galleryDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const slide = Number(dot.dataset.slide);

      changeGallery(slide);
    });
  });

  /* AUTO CHANGE GALLERY EACH 5 SECOND */

  let currentGallerySlide = 0;
  /*THIS EXECUTE ITS INNER CODE REPETATIVE*/
  setInterval(() => {
    currentGallerySlide++;
    /*IF THE LENGTH REACH TO LAST SLIDE AGAIN IT BECOME 0*/
    if (currentGallerySlide >= gallerySlides.length) {
      currentGallerySlide = 0;
    }

    changeGallery(currentGallerySlide);
  }, 5000);

  /* MODAL PRODUCT DATA*/

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

  /*ESCAPE HTML*/
  /*THIS CHANGE THE ENTER VALUE TO TEXT AND MAKE THE SPECIAL HTML CHARACTERISTICS SAFER*/
  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")

      .replace(/</g, "&lt;")

      .replace(/>/g, "&gt;")

      .replace(/"/g, "&quot;")

      .replace(/'/g, "&#039;");
  }

  /* BUILD MODAL PRODUCTS*/

  function buildModalProducts() {
    if (!modalProducts) return;
    /*THIS MAKE FOR EACH PRODUCT A HTML SNIPPET*/
    modalProducts.innerHTML = modalProductData
      .map((product) => {
        /*THE HTML STRUCTURE PRODUCE AS A STRING BY USING TEMPLATE LITTERAL*/
        /* ${escapeHTML(product.image)} Puts the path of the product image in the src attribute.
         ALSO, escapeHTML() Escapes the path before inserting it into the HTML.*/
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

  /*  OPEN MODAL*/

  function openModal() {
    if (!modal) return;
    /*THIS EXECUTE THE FUNCTION OF buildModalProducts() TILL THE INNER PRODUCTS OF MODAL MAKE AND DISPLAY*/
    buildModalProducts();
    setupBestScrollAnimations(modal);
    /*THIS EXTRACT THE MODAL FROM HIDDEN CONDITION*/
    modal.hidden = false;
    /*THIS SAY THAT THIS FEATURE ISNT HIDE*/
    modal.setAttribute("aria-hidden", "false");
    /*WHEN THE MODAL IS OPEN THE USE CANT SCROLL THE MAIN PAGE*/
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }

  /*CLOSE MODAL*/

  function closeModal() {
    if (!modal) return;
    /*THIS MAKE THE MODAL HIDE*/
    modal.hidden = true;
    /*THIS SAY THAT THIS FEATURE IS HIDE*/
    modal.setAttribute("aria-hidden", "true");
    /*THIS RETURN THE OVERFLOW VALUE TILL THE PAGE SCROLL*/
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }

  /* EXPLORE BUTTON*/

  if (exploreButton) {
    exploreButton.addEventListener("click", openModal);
  }

  /* CLOSE MODAL */

  if (modal) {
    modal.querySelectorAll("[data-modal-close]").forEach((element) => {
      element.addEventListener("click", closeModal);
    });
  }

  /* ESC CLOSE MODAL */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && !modal.hidden) {
      /*IF THREE CONDITION BE TRUE THE BELOW FUNCTION WILL EXECUTE*/
      closeModal();
    }
  });

  /* VIEW ALL*/

  const viewAllButtons = document.querySelectorAll(".best-view-all");

  viewAllButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      /*THE CATEGORY OF PRODUCT WILL GIVE FROM button.dataset.category OR BEAUTY*/
      const category = button.dataset.category || "beauty";

      if (category === "skincare") {
        showToast("Showing our best selling skincare");
      } else if (category === "makeup") {
        showToast("Showing our best selling makeup");
      }
    });
  });

  /* HERO SHOP BUTTON*/

  const heroButton = document.querySelector(".best-hero-button");

  if (heroButton) {
    heroButton.addEventListener("click", () => {
      /*THIS setTimeout(() DELAY THE EXECUTE OF FUNCTION SHORTLY*/
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

  /* INITIAL GALLERY */

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

/* =========================================================
     BEST SELLERS - SCROLL REVEAL ANIMATIONS
  ========================================================= */

// Add animation styles only once
if (!document.getElementById("best-sellers-scroll-style")) {
  const style = document.createElement("style");

  style.id = "best-sellers-scroll-style";

  style.textContent = `
      .best-scroll-reveal {
        opacity: 0;
        transform: translateY(35px);

        transition:
          opacity 0.7s ease,
          transform 0.7s ease;
      }

      .best-scroll-reveal.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      @media (prefers-reduced-motion: reduce) {
        .best-scroll-reveal {
          opacity: 1;
          transform: none;
          transition: none;
        }
      }
    `;

  document.head.appendChild(style);
}

// Observe elements as they enter or leave the viewport
const bestScrollObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        function (entries) {
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
      )
    : null;

// Apply scroll animations to page elements
function setupBestScrollAnimations(root = document) {
  const revealSelectors = [
    ".best-product-card",
    ".best-category-card",
    ".best-feature-card",
    ".best-section",
    ".best-products-grid > *",
    ".best-products-grid",
    ".best-hero-content",
    ".best-hero-image",
    ".best-gallery",
    ".best-gallery-section",
    "#best-products",
    "#best-sellers",
    ".modal-product",
  ];

  const revealElements = root.querySelectorAll(revealSelectors.join(", "));

  revealElements.forEach(function (element, index) {
    // Do not observe the same element twice
    if (element.classList.contains("best-scroll-reveal")) {
      return;
    }

    element.classList.add("best-scroll-reveal");

    // Stagger elements for a natural appearance
    element.style.transitionDelay = `${(index % 4) * 100}ms`;

    if (bestScrollObserver) {
      bestScrollObserver.observe(element);
    } else {
      element.classList.add("is-visible");
    }
  });
}

// Initialize animations for existing page elements
setupBestScrollAnimations();
