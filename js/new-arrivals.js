document.addEventListener("DOMContentLoaded", () => {
  /* NEW ARRIVAL PRODUCTS*/

  const newProducts = [
    {
      id: 101,
      name: "Radiant Dew Cream",
      category: "Skincare",
      brand: "EVE Beauty",
      price: 26.99,
      oldPrice: 32.99,
      rating: 4.9,
      reviews: 42,
      image: "assets/images/new-product-1.jpg",
    },

    {
      id: 102,
      name: "Peptide Glow Serum",
      category: "Skincare",
      brand: "EVE Beauty",
      price: 29.99,
      oldPrice: 36.99,
      rating: 4.8,
      reviews: 38,
      image: "assets/images/new-product-2.jpg",
    },

    {
      id: 103,
      name: "Cherry Cloud Blush",
      category: "Makeup",
      brand: "EVE Beauty",
      price: 18.99,
      oldPrice: 22.99,
      rating: 4.9,
      reviews: 51,
      image: "assets/images/new-product-3.jpg",
    },

    {
      id: 104,
      name: "Satin Bloom Eyeshadow",
      category: "Makeup",
      brand: "EVE Beauty",
      price: 31.99,
      oldPrice: 38.99,
      rating: 4.8,
      reviews: 34,
      image: "assets/images/new-product-4.jpg",
    },

    {
      id: 105,
      name: "Glass Skin Essence",
      category: "Skincare",
      brand: "EVE Beauty",
      price: 24.99,
      oldPrice: 29.99,
      rating: 4.7,
      reviews: 29,
      image: "assets/images/new-product-5.jpg",
    },

    {
      id: 106,
      name: "Rose Milk Cleanser",
      category: "Skincare",
      brand: "EVE Beauty",
      price: 17.99,
      oldPrice: 21.99,
      rating: 4.8,
      reviews: 45,
      image: "assets/images/new-product-6.jpg",
    },

    {
      id: 107,
      name: "Velvet Bloom Lip Tint",
      category: "Makeup",
      brand: "EVE Beauty",
      price: 15.99,
      oldPrice: 19.99,
      rating: 4.9,
      reviews: 57,
      image: "assets/images/new-product-7.jpg",
    },

    {
      id: 108,
      name: "Blossom Hair Perfume",
      category: "Haircare",
      brand: "EVE Beauty",
      price: 22.99,
      oldPrice: 27.99,
      rating: 4.7,
      reviews: 31,
      image: "assets/images/new-product-8.jpg",
    },

    {
      id: 109,
      name: "Cloud Silk Hair Oil",
      category: "Haircare",
      brand: "EVE Beauty",
      price: 21.99,
      oldPrice: 26.99,
      rating: 4.8,
      reviews: 36,
      image: "assets/images/new-product-9.jpg",
    },

    {
      id: 110,
      name: "Petal Veil Highlighter",
      category: "Makeup",
      brand: "EVE Beauty",
      price: 23.99,
      oldPrice: 28.99,
      rating: 4.9,
      reviews: 48,
      image: "assets/images/new-product-10.jpg",
    },

    {
      id: 111,
      name: "Blush Blossom Eau",
      category: "Fragrance",
      brand: "EVE Beauty",
      price: 37.99,
      oldPrice: 45.99,
      rating: 4.9,
      reviews: 27,
      image: "assets/images/new-product-11.jpg",
    },

    {
      id: 112,
      name: "Moonlit Petal Mist",
      category: "Fragrance",
      brand: "EVE Beauty",
      price: 28.99,
      oldPrice: 34.99,
      rating: 4.8,
      reviews: 33,
      image: "assets/images/new-product-12.jpg",
    },
  ];

  /* ELEMENTS */

  const productGrid = document.getElementById("arrivalProductsGrid");

  const featuredList = document.getElementById("featuredProductList");

  const categoryCards = document.querySelectorAll(".arrival-category-card");

  const shopAllButton = document.getElementById("shopAllArrivals");

  const newsletterForm = document.getElementById("arrivalNewsletterForm");

  /* SCROLL DIRECTLY TO PRODUCT CARDS*/

  function scrollToProductCards() {
    const productGrid = document.getElementById("arrivalProductsGrid");

    if (!productGrid) return;

    const headerOffset = 90;
    /*THIS SAY THAT WHERE IS THE DISTANCE OF THE PRODUCT GRID FROM THR TOP OF
 THE VIEWPORT TO THE CURRENTLY VISIBLE SCREEN AREA AND window.scrollY SAY TO BROWSER TO SCROLL THE SCREEN*/
    const gridPosition =
      productGrid.getBoundingClientRect().top + window.scrollY;
    /*window.scrollTo SAY TO BROWSER TO SCROLL THE SCREEN*/
    window.scrollTo({
      top: gridPosition - headerOffset,
      behavior: "smooth",
    });
  }

  /* THIS RENDER THE FEATURED PRODUCTS*/

  function renderFeaturedProducts() {
    if (!featuredList) return;
    /*HERE THE ARRAYS GIVE ONLY 3 PRODUCTS*/
    const featuredProducts = newProducts.slice(0, 3);
    /*THIS WILL ERASE THE PERVIOUS PRODUCTS IF EXIST*/
    featuredList.innerHTML = "";
    /*HERE THIS IRRATES ON THE EACH FEATURED PRODUCT */
    featuredProducts.forEach((product) => {
      const item = document.createElement("div");

      item.className = "featured-product-item";
      /*HERE WE PUT HTML INTO DIV*/
      item.innerHTML = `
        <div class="featured-product-image">
          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.style.display='none';"
          />
        </div>

        <div class="featured-product-details">

          <h3>
            ${product.name}
          </h3>

          <strong>
            $${product.price.toFixed(2)}
          </strong>

          <small>
            ★★★★★ (${product.reviews})
          </small>

        </div>
      `;
      /*THIS MEAN THAT PUT THE ITEM  INTO FEATURED LIST*/
      featuredList.appendChild(item);
    });
  }

  /* RENDER ALL PRODUCTS*/

  function renderProducts(products = newProducts) {
    if (!productGrid) return;

    productGrid.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("article");

      card.className = "arrival-product-card";

      card.dataset.productId = product.id;

      const cart = getCart();
      const wishlist = getWishlist();

      const productInCart = cart.some(
        (item) => Number(item.id) === Number(product.id),
      );

      const productInWishlist = wishlist.some(
        (item) => Number(item.id) === Number(product.id),
      );

      card.innerHTML = `
        <div class="arrival-product-image">

          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.style.display='none';"
          />

          <span class="new-badge">
            NEW
          </span>

          <button
  type="button"
  class="arrival-wishlist ${productInWishlist ? "active" : ""}"
  aria-label="${productInWishlist ? "Remove from wishlist" : "Add to wishlist"}"
  aria-pressed="${productInWishlist ? "true" : "false"}"
>
  <i data-lucide="heart"></i>
</button>

        </div>


        <div class="arrival-product-info">

          <p class="arrival-product-brand">
            ${product.brand}
          </p>

          <h3 class="arrival-product-name">
            ${product.name}
          </h3>


          <div class="arrival-product-rating">

            <span>
              ${"★".repeat(Math.round(product.rating))}
            </span>

            <span>
              (${product.reviews})
            </span>

          </div>


          <div class="arrival-product-price">

            <span class="arrival-current-price">
              $${product.price.toFixed(2)}
            </span>

            <span class="arrival-old-price">
              $${product.oldPrice.toFixed(2)}
            </span>

          </div>


          <button
  type="button"
  class="arrival-add-cart ${productInCart ? "in-cart" : ""}"
  aria-label="${productInCart ? "Remove from cart" : "Add to cart"}"
  aria-pressed="${productInCart ? "true" : "false"}"
>
  <i data-lucide="shopping-bag"></i>
  ${productInCart ? "In cart" : "Add to cart"}
</button>

        </div>
      `;

      productGrid.appendChild(card);
    });

    if (window.lucide) {
      lucide.createIcons();
    }

    setupProductButtons();

    updateArrivalProductButtons();
  }

  /* =========================================================
   PRODUCT BUTTONS
   Shared Cart + Wishlist
   Synced with Navbar
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
      console.error("Could not read current user:", error);

      return null;
    }
  }

  /*CART HELPERS */

  function getUserCartKey() {
    const user = getCurrentUser();

    return user ? `eveBeautyCart_${user.id}` : "eveBeautyCart";
  }

  function getCart() {
    try {
      const userCartKey = getUserCartKey();
      const storedCart = localStorage.getItem(userCartKey);

      const cart = JSON.parse(
        storedCart !== null
          ? storedCart
          : localStorage.getItem("eveBeautyCart") || "[]",
      );

      return Array.isArray(cart) ? cart : [];
    } catch (error) {
      console.error("Could not read cart:", error);

      return [];
    }
  }

  function saveCart(cart) {
    try {
      const user = getCurrentUser();

      if (user) {
        localStorage.setItem(`eveBeautyCart_${user.id}`, JSON.stringify(cart));

        localStorage.setItem(
          "eveBeautyCartCurrentUser",
          JSON.stringify({
            userId: user.id,
            items: cart,
            updatedAt: new Date().toISOString(),
          }),
        );
      }

      localStorage.setItem("eveBeautyCart", JSON.stringify(cart));

      window.dispatchEvent(new CustomEvent("eveBeautyCartUpdated"));

      return true;
    } catch (error) {
      console.error("Could not save cart:", error);

      return false;
    }
  }

  /*RETURN ISHLIST HELPERS */

  function getUserWishlistKey() {
    const user = getCurrentUser();

    return user ? `eveBeautyWishlist_${user.id}` : "eveBeautyWishlist";
  }

  function getWishlist() {
    try {
      const userWishlistKey = getUserWishlistKey();
      const storedWishlist = localStorage.getItem(userWishlistKey);

      const wishlist = JSON.parse(
        storedWishlist !== null
          ? storedWishlist
          : localStorage.getItem("eveBeautyWishlist") || "[]",
      );

      return Array.isArray(wishlist) ? wishlist : [];
    } catch (error) {
      console.error("Could not read wishlist:", error);

      return [];
    }
  }

  function saveWishlist(wishlist) {
    try {
      const user = getCurrentUser();

      if (user) {
        localStorage.setItem(
          `eveBeautyWishlist_${user.id}`,
          JSON.stringify(wishlist),
        );
      }

      localStorage.setItem("eveBeautyWishlist", JSON.stringify(wishlist));

      window.dispatchEvent(new CustomEvent("eveBeautyWishlistUpdated"));

      return true;
    } catch (error) {
      console.error("Could not save wishlist:", error);

      return false;
    }
  }

  /* NAVBAR COUNTERS */

  function updateNavbarCounts() {
    /*ARE THE typeof window.updateNavbarCounts IS FUNCTION AND 
    IF THIS IS CORRECT THIS FUNCTION window.updateNavbarCounts() MUST APPLT*/
    if (typeof window.updateNavbarCounts === "function") {
      window.updateNavbarCounts();
    }

    if (typeof window.updateCartCounter === "function") {
      window.updateCartCounter();
    }

    /*
    Fallback FOR Navbar
  */

    const cart = getCart();
    const wishlist = getWishlist();

    const cartQuantity = cart.reduce((total, item) => {
      const quantity = Number(item?.quantity);

      return total + (Number.isFinite(quantity) && quantity > 0 ? quantity : 1);
    }, 0);

    const wishlistCount = wishlist.length;

    document
      .querySelectorAll(
        "#cartCount, #cartBadge, .cart-count, .cart-badge, [data-cart-count]",
      )
      .forEach((element) => {
        element.textContent = cartQuantity > 99 ? "99+" : String(cartQuantity);

        element.style.display = "";
      });

    document
      .querySelectorAll(
        "#favoritelistCount, #wishlistCount, #wishlistBadge, " +
          ".wishlist-count, .wishlist-badge, [data-wishlist-count]",
      )
      .forEach((element) => {
        element.textContent =
          wishlistCount > 99 ? "99+" : String(wishlistCount);

        element.style.display = "";
      });
  }

  /* PRODUCT BUTTON STATE */

  function updateArrivalWishlistButton(button, active) {
    if (!button) return;

    button.classList.toggle("active", active);

    button.setAttribute("aria-pressed", active ? "true" : "false");

    button.setAttribute(
      "aria-label",
      active ? "Remove from wishlist" : "Add to wishlist",
    );

    const icon = button.querySelector("svg");

    if (icon) {
      icon.style.fill = active ? "#faf6f6" : "none";
      icon.style.color = active ? "#aa8386" : "";
    }
  }

  function updateArrivalCartButton(button, active) {
    if (!button) return;

    button.classList.toggle("in-cart", active);

    button.setAttribute("aria-pressed", active ? "true" : "false");

    button.setAttribute(
      "aria-label",
      active ? "Remove from cart" : "Add to cart",
    );

    button.innerHTML = `
    <i data-lucide="shopping-bag"></i>
    ${active ? "In cart" : "Add to cart"}
  `;

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  /* UPDATE ALL PRODUCT BUTTONS */

  function updateArrivalProductButtons() {
    const cart = getCart();
    const wishlist = getWishlist();

    document.querySelectorAll(".arrival-product-card").forEach((card) => {
      const productId = Number(card.dataset.productId);

      const cartButton = card.querySelector(".arrival-add-cart");

      const wishlistButton = card.querySelector(".arrival-wishlist");

      const inCart = cart.some((item) => Number(item.id) === productId);

      const inWishlist = wishlist.some((item) => Number(item.id) === productId);

      updateArrivalCartButton(cartButton, inCart);

      updateArrivalWishlistButton(wishlistButton, inWishlist);
    });
  }

  /* PRODUCT BUTTONS */

  function setupProductButtons() {
    /*WISHLIST*/

    document.querySelectorAll(".arrival-wishlist").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const card = button.closest(".arrival-product-card");

        if (!card) return;

        const productId = Number(card.dataset.productId);

        const product = newProducts.find(
          (item) => Number(item.id) === productId,
        );

        if (!product) return;

        /* THIS CHECK THE LOGIN SIUTUATION */

        const currentUser = getCurrentUser();

        if (!currentUser) {
          localStorage.setItem("eveBeautyLoginRedirect", "new-arrivals.html");

          alert("Please sign in first to add products to your wishlist.");

          window.location.href = "login.html";

          return;
        }

        /* GET WISHLIST */

        const wishlist = getWishlist();

        /*THE findIndex CHECK THAT ARE THE NEW PRODUCT EXIST IN CART ALREADY OR NO*/
        const existingIndex = wishlist.findIndex(
          (item) => Number(item.id) === Number(product.id),
        );

        /*REMOVE*/

        if (existingIndex !== -1) {
          /*THIS REMOVE THE PRODUCT FROM ARRAYS */
          wishlist.splice(existingIndex, 1);

          saveWishlist(wishlist);

          updateArrivalWishlistButton(button, false);

          updateNavbarCounts();

          window.dispatchEvent(new CustomEvent("eveBeautyWishlistChanged"));

          return;
        }

        /* ADDING PRODUCTS INTO CART*/

        wishlist.push({
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          category: product.category,
        });

        if (!saveWishlist(wishlist)) {
          alert("Could not update your wishlist.");

          return;
        }

        updateArrivalWishlistButton(button, true);

        updateNavbarCounts();

        window.dispatchEvent(new CustomEvent("eveBeautyWishlistChanged"));
      });
    });

    /*  CART */

    document.querySelectorAll(".arrival-add-cart").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const card = button.closest(".arrival-product-card");

        if (!card) return;

        const productId = Number(card.dataset.productId);

        const product = newProducts.find(
          (item) => Number(item.id) === productId,
        );

        if (!product) return;

        /* LOGIN CHECK*/

        const currentUser = getCurrentUser();

        if (!currentUser) {
          localStorage.setItem("eveBeautyLoginRedirect", "new-arrivals.html");

          alert("Please sign in first to add products to your cart.");

          window.location.href = "login.html";

          return;
        }

        /* GET CART*/

        const cart = getCart();

        const existingIndex = cart.findIndex(
          (item) => Number(item.id) === Number(product.id),
        );

        /*REMOVE FROM CART*/

        if (existingIndex !== -1) {
          cart.splice(existingIndex, 1);

          saveCart(cart);

          updateArrivalCartButton(button, false);

          updateNavbarCounts();

          window.dispatchEvent(new CustomEvent("eveBeautyCartChanged"));

          return;
        }

        /* ADD TO CART*/

        cart.push({
          id: product.id,
          name: product.name,
          brand: product.brand,
          category: product.category,
          price: product.price,
          oldPrice: product.oldPrice,
          rating: product.rating,
          reviews: product.reviews,
          image: product.image,
          quantity: 1,
          addedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        if (!saveCart(cart)) {
          alert("Could not save the product to your cart.");

          return;
        }

        updateArrivalCartButton(button, true);

        updateNavbarCounts();

        window.dispatchEvent(new CustomEvent("eveBeautyCartChanged"));
      });
    });
  }

  /* CATEGORY BUTTONS */

  categoryCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();

      const category = card.dataset.category;

      const categoryProducts = newProducts.filter(
        (product) => product.category === category,
      );

      renderProducts(categoryProducts);

      requestAnimationFrame(() => {
        scrollToProductCards();
      });
    });
  });

  /* SHOP ALL*/

  if (shopAllButton) {
    shopAllButton.addEventListener("click", () => {
      renderProducts(newProducts);
      /*WE HAVE USED  requestAnimationFrame(() BECAUSE FIRST WE WANT TO MAKE THE NEW CADS 
THEN THE PAGE SCROLL TO THE PART OF PRODUCTS*/
      requestAnimationFrame(() => {
        scrollToProductCards();
      });
    });
  }

  /* NEWSLETTER*/
  /*FIRST THIS CHECK THAT THE FORM MUST EXIST THEN IN THE TIME OF SENDING OF EMAIL THE FUNCTION WILL EXECUTE*/

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("arrivalNewsletterEmail");

      if (!email || !email.value.trim()) {
        return;
      }
      /*THIS WILL FIND THE BUTTON OF FORM THAT EXIST IN IT*/

      const button = newsletterForm.querySelector("button");
      /*THIS WILL STORE THE INNERHTML OF IT THAT WE CAN RESTORE THE BUTTONS ORIDINAL APPEARANCE LATER*/
      const original = button.innerHTML;
      /*DISPLAY OF SUCCESS MESSAGE*/
      button.innerHTML = '<i data-lucide="check"></i> Subscribed';

      if (window.lucide) {
        lucide.createIcons();
      }
      /*THRN TH EMAIL PLACE WILL CLEAR*/
      email.value = "";
      /*THE RESTORING OF BUTTON TO ITS FIRST FORM WILL EXECUTE AFTE 1.8 SECONDS*/
      setTimeout(() => {
        button.innerHTML = original;

        if (window.lucide) {
          lucide.createIcons();
        }
      }, 1800);
    });
  }

  /* INITIALIZE*/
  /*THIS PART RESPONSIBLE TO TO PREPARE THE PRODUCTS AND ICONS FOR EXCUTING OF PAGE*/

  renderFeaturedProducts();
  /*THE MAIN PRODUCTS*/
  renderProducts();

  if (window.lucide) {
    lucide.createIcons();
  }
});

// ==========================================
// EVE BEAUTY - FULL PAGE SCROLL REVEAL
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  /* ANIMATION STYLES */

  if (!document.getElementById("arrival-scroll-animation-style")) {
    const style = document.createElement("style");

    style.id = "arrival-scroll-animation-style";

    style.textContent = `
      .arrival-scroll-reveal {
        opacity: 0;
        transform: translateY(24px);

        transition:
          opacity 0.65s ease,
          transform 0.65s ease;
      }

      .arrival-scroll-reveal.arrival-is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      @media (prefers-reduced-motion: reduce) {
        .arrival-scroll-reveal,
        .arrival-scroll-reveal.arrival-is-visible {
          opacity: 1;
          transform: none;
          transition: none;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /* SCROLL OBSERVER */

  const arrivalObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add("arrival-is-visible");
              } else {
                entry.target.classList.remove("arrival-is-visible");
              }
            });
          },
          {
            threshold: 0.08,
            rootMargin: "0px 0px -25px 0px",
          },
        )
      : null;

  /* ALL PAGE ELEMENTS TO REVEAL */

  const revealSelectors = [
    /* Page headings and text */
    "h1",
    "h2",
    "h3",
    "h4",
    ".arrival-section-heading",
    ".section-title",
    ".section-heading",
    ".section-subtitle",
    ".section-description",

    /* Hero and introductory sections */
    ".arrival-hero",
    ".arrival-hero-content",
    ".arrival-hero-image",
    ".arrival-hero-title",
    ".arrival-hero-description",
    ".arrival-hero-buttons",

    /* Categories */
    ".arrival-category-card",
    ".arrival-category-card img",
    ".arrival-category-card h3",
    ".arrival-category-card p",
    ".arrival-categories",
    ".arrival-categories-grid",

    /* Featured products */
    "#featuredProductList",
    ".featured-product-item",
    ".featured-product-image",
    ".featured-product-image img",
    ".featured-product-details",
    ".featured-product-details h3",
    ".featured-product-details strong",
    ".featured-product-details small",

    /* Main product section */
    "#arrivalProductsGrid",
    ".arrival-product-card",
    ".arrival-product-image",
    ".arrival-product-image img",
    ".arrival-product-info",
    ".arrival-product-brand",
    ".arrival-product-name",
    ".arrival-product-rating",
    ".arrival-product-price",
    ".arrival-current-price",
    ".arrival-old-price",
    ".arrival-add-cart",
    ".arrival-wishlist",
    ".new-badge",

    /* Newsletter */
    "#arrivalNewsletterForm",
    ".arrival-newsletter",
    ".arrival-newsletter-content",
    ".arrival-newsletter-image",
    ".arrival-newsletter h2",
    ".arrival-newsletter p",
    "#arrivalNewsletterEmail",
    "#arrivalNewsletterForm button",

    /* Common supporting elements */
    ".arrival-banner",
    ".arrival-banner-content",
    ".arrival-feature",
    ".arrival-feature-card",
    ".arrival-promo",
    ".arrival-promo-content",
    ".arrival-info-card",
    ".arrival-content",
    ".arrival-image",
    ".arrival-text",
    ".arrival-button",
    ".arrival-link",

    /* Footer content */
    "footer h2",
    "footer h3",
    "footer p",
    "footer li",
    "footer a",
    "footer img",
    "footer .social-links > *",
  ];

  /* SETUP OR REFRESH ANIMATIONS */

  window.setupArrivalScrollAnimations = function (root = document) {
    const elements = root.querySelectorAll(revealSelectors.join(", "));

    elements.forEach(function (element, index) {
      if (element.classList.contains("arrival-scroll-reveal")) {
        return;
      }

      element.classList.add("arrival-scroll-reveal");

      element.style.transitionDelay = `${(index % 4) * 70}ms`;

      if (arrivalObserver) {
        arrivalObserver.observe(element);
      } else {
        element.classList.add("arrival-is-visible");
      }
    });
  };

  /* INITIAL PAGE ANIMATIONS */

  window.setupArrivalScrollAnimations();

  console.log("New Arrivals full-page animations initialized.");
});
