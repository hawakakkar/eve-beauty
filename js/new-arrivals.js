document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     NEW ARRIVAL PRODUCTS
  ========================================================= */

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

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const productGrid = document.getElementById("arrivalProductsGrid");

  const featuredList = document.getElementById("featuredProductList");

  const categoryCards = document.querySelectorAll(".arrival-category-card");

  const shopAllButton = document.getElementById("shopAllArrivals");

  const newsletterForm = document.getElementById("arrivalNewsletterForm");

  /* =========================================================
     SCROLL DIRECTLY TO PRODUCT CARDS
  ========================================================= */

  function scrollToProductCards() {
    const productGrid = document.getElementById("arrivalProductsGrid");

    if (!productGrid) return;

    /*
      فاصله برای Navbar / Header ثابت
      اگر کارت کمی زیر Navbar رفت، این عدد را افزایش بده.
    */
    const headerOffset = 90;

    const gridPosition =
      productGrid.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: gridPosition - headerOffset,
      behavior: "smooth",
    });
  }

  /* =========================================================
     RENDER FEATURED PRODUCTS
  ========================================================= */

  function renderFeaturedProducts() {
    if (!featuredList) return;

    const featuredProducts = newProducts.slice(0, 3);

    featuredList.innerHTML = "";

    featuredProducts.forEach((product) => {
      const item = document.createElement("div");

      item.className = "featured-product-item";

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

      featuredList.appendChild(item);
    });
  }

  /* =========================================================
     RENDER ALL PRODUCTS
  ========================================================= */

  function renderProducts(products = newProducts) {
    if (!productGrid) return;

    productGrid.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("article");

      card.className = "arrival-product-card";

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
            class="arrival-wishlist"
            aria-label="Add to wishlist"
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
            class="arrival-add-cart"
          >
            <i data-lucide="shopping-bag"></i>
            Add to cart
          </button>

        </div>
      `;

      productGrid.appendChild(card);
    });

    if (window.lucide) {
      lucide.createIcons();
    }

    setupProductButtons();
  }

  /* =========================================================
     PRODUCT BUTTONS
  ========================================================= */

  function setupProductButtons() {
    document.querySelectorAll(".arrival-wishlist").forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.toggle("active");

        const icon = button.querySelector("svg");

        if (icon) {
          icon.style.fill = button.classList.contains("active")
            ? "#aa8386"
            : "none";
        }
      });
    });

    document.querySelectorAll(".arrival-add-cart").forEach((button) => {
      button.addEventListener("click", () => {
        const original = button.innerHTML;

        button.innerHTML = '<i data-lucide="check"></i> Added';

        button.style.background = "#806064";

        if (window.lucide) {
          lucide.createIcons();
        }

        setTimeout(() => {
          button.innerHTML = original;

          button.style.background = "";

          if (window.lucide) {
            lucide.createIcons();
          }
        }, 1200);
      });
    });
  }

  /* =========================================================
     CATEGORY BUTTONS
  ========================================================= */

  categoryCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();

      const category = card.dataset.category;

      const categoryProducts = newProducts.filter(
        (product) => product.category === category,
      );

      /*
        اول محصولات دسته انتخاب‌شده رندر می‌شوند
      */
      renderProducts(categoryProducts);

      /*
        بعد از ساخته شدن کارت‌ها،
        مستقیماً روی خود کارت‌ها اسکرول می‌کنیم.
      */
      requestAnimationFrame(() => {
        scrollToProductCards();
      });
    });
  });

  /* =========================================================
     SHOP ALL
  ========================================================= */

  if (shopAllButton) {
    shopAllButton.addEventListener("click", () => {
      /*
        نمایش تمام محصولات
      */
      renderProducts(newProducts);

      /*
        بعد از رندر کارت‌ها،
        مستقیم روی کارت‌های محصولات برو.
      */
      requestAnimationFrame(() => {
        scrollToProductCards();
      });
    });
  }

  /* =========================================================
     NEWSLETTER
  ========================================================= */

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("arrivalNewsletterEmail");

      if (!email || !email.value.trim()) {
        return;
      }

      const button = newsletterForm.querySelector("button");

      const original = button.innerHTML;

      button.innerHTML = '<i data-lucide="check"></i> Subscribed';

      if (window.lucide) {
        lucide.createIcons();
      }

      email.value = "";

      setTimeout(() => {
        button.innerHTML = original;

        if (window.lucide) {
          lucide.createIcons();
        }
      }, 1800);
    });
  }

  /* =========================================================
     INITIALIZE
  ========================================================= */

  renderFeaturedProducts();

  renderProducts();

  if (window.lucide) {
    lucide.createIcons();
  }
});
