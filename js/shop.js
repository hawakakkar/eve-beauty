/* =========================================================
   EVE BEAUTY
   SHOP.JS
   PRODUCTS + FILTERS + CART + WISHLIST
   LOCAL STORAGE VERSION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     STORAGE KEYS
  ========================================================= */

  const USERS_KEY = "eveBeautyUsers";
  const CURRENT_USER_KEY = "eveBeautyCurrentUser";

  const CART_KEY = "eveBeautyCart";
  const CART_CURRENT_USER_KEY = "eveBeautyCartCurrentUser";

  const WISHLIST_KEY = "eveBeautyWishlist";

  /* =========================================================
     PRODUCT DATA
  ========================================================= */

  const products = [
    /* ===================== MAKEUP ===================== */

    {
      id: 1,
      name: "Rose Glow Eyeshadow Palette",
      category: "Makeup",
      brand: "EVE Beauty",
      type: "Eyes",
      skin: "Normal",
      price: 29.99,
      oldPrice: 39.99,
      discount: 20,
      rating: 4.8,
      reviews: 124,
      newest: 40,
      image: "assets/images/product-1.jpg",
    },

    {
      id: 2,
      name: "Long Lasting Foundation",
      category: "Makeup",
      brand: "EVE Beauty",
      type: "Face",
      skin: "Combination",
      price: 24.99,
      oldPrice: 29.99,
      discount: 15,
      rating: 4.7,
      reviews: 87,
      newest: 39,
      image: "assets/images/product-2.jpg",
    },

    {
      id: 3,
      name: "Matte Lipstick",
      category: "Makeup",
      brand: "EVE Beauty",
      type: "Lips",
      skin: "Normal",
      price: 16.99,
      oldPrice: 20.99,
      discount: 18,
      rating: 4.8,
      reviews: 98,
      newest: 38,
      image: "assets/images/product-3.jpg",
    },

    {
      id: 4,
      name: "Soft Blush Powder",
      category: "Makeup",
      brand: "Maybelline",
      type: "Face",
      skin: "Normal",
      price: 18.99,
      oldPrice: 23.99,
      discount: 21,
      rating: 4.6,
      reviews: 74,
      newest: 37,
      image: "assets/images/product-4.jpg",
    },

    {
      id: 5,
      name: "Volume Mascara",
      category: "Makeup",
      brand: "L'Oréal",
      type: "Eyes",
      skin: "Normal",
      price: 17.99,
      oldPrice: 21.99,
      discount: 18,
      rating: 4.7,
      reviews: 115,
      newest: 36,
      image: "assets/images/product-5.jpg",
    },

    {
      id: 6,
      name: "Hydrating Concealer",
      category: "Makeup",
      brand: "Estée Lauder",
      type: "Face",
      skin: "Dry",
      price: 27.99,
      oldPrice: 34.99,
      discount: 20,
      rating: 4.9,
      reviews: 132,
      newest: 35,
      image: "assets/images/product-6.jpg",
    },

    {
      id: 7,
      name: "Nude Lip Gloss",
      category: "Makeup",
      brand: "EVE Beauty",
      type: "Lips",
      skin: "Normal",
      price: 14.99,
      oldPrice: 18.99,
      discount: 21,
      rating: 4.5,
      reviews: 63,
      newest: 34,
      image: "assets/images/product-7.jpg",
    },

    {
      id: 8,
      name: "Silk Setting Powder",
      category: "Makeup",
      brand: "Maybelline",
      type: "Face",
      skin: "Oily",
      price: 19.99,
      oldPrice: 24.99,
      discount: 20,
      rating: 4.6,
      reviews: 91,
      newest: 33,
      image: "assets/images/product-8.jpg",
    },

    {
      id: 9,
      name: "Precision Eyeliner",
      category: "Makeup",
      brand: "L'Oréal",
      type: "Eyes",
      skin: "Normal",
      price: 13.99,
      oldPrice: 17.99,
      discount: 22,
      rating: 4.4,
      reviews: 57,
      newest: 32,
      image: "assets/images/product-9.jpg",
    },

    {
      id: 10,
      name: "Natural Glow Highlighter",
      category: "Makeup",
      brand: "EVE Beauty",
      type: "Face",
      skin: "Dry",
      price: 22.99,
      oldPrice: 28.99,
      discount: 21,
      rating: 4.8,
      reviews: 102,
      newest: 31,
      image: "assets/images/product-10.jpg",
    },

    /* ===================== SKINCARE ===================== */

    {
      id: 11,
      name: "Hydrating Face Cream",
      category: "Skincare",
      brand: "EVE Beauty",
      type: "Face",
      skin: "Dry",
      price: 19.99,
      oldPrice: 24.99,
      discount: 20,
      rating: 4.9,
      reviews: 156,
      newest: 30,
      image: "assets/images/product-11.jpg",
    },

    {
      id: 12,
      name: "Vitamin C Serum",
      category: "Skincare",
      brand: "EVE Beauty",
      type: "Face",
      skin: "Normal",
      price: 22.99,
      oldPrice: 29.99,
      discount: 23,
      rating: 4.8,
      reviews: 73,
      newest: 29,
      image: "assets/images/product-12.jpg",
    },

    {
      id: 13,
      name: "Gentle Face Cleanser",
      category: "Skincare",
      brand: "L'Oréal",
      type: "Face",
      skin: "Combination",
      price: 15.99,
      oldPrice: 18.99,
      discount: 16,
      rating: 4.6,
      reviews: 69,
      newest: 28,
      image: "assets/images/product-13.jpg",
    },

    {
      id: 14,
      name: "Rose Water Toner",
      category: "Skincare",
      brand: "EVE Beauty",
      type: "Face",
      skin: "Dry",
      price: 17.99,
      oldPrice: 21.99,
      discount: 18,
      rating: 4.7,
      reviews: 88,
      newest: 27,
      image: "assets/images/product-14.jpg",
    },

    {
      id: 15,
      name: "Daily SPF 50",
      category: "Skincare",
      brand: "Estée Lauder",
      type: "Face",
      skin: "Oily",
      price: 25.99,
      oldPrice: 31.99,
      discount: 19,
      rating: 4.9,
      reviews: 142,
      newest: 26,
      image: "assets/images/product-15.jpg",
    },

    {
      id: 16,
      name: "Night Repair Cream",
      category: "Skincare",
      brand: "EVE Beauty",
      type: "Face",
      skin: "Dry",
      price: 28.99,
      oldPrice: 35.99,
      discount: 19,
      rating: 4.8,
      reviews: 118,
      newest: 25,
      image: "assets/images/product-16.jpg",
    },

    {
      id: 17,
      name: "Purifying Clay Mask",
      category: "Skincare",
      brand: "Maybelline",
      type: "Face",
      skin: "Oily",
      price: 18.99,
      oldPrice: 23.99,
      discount: 21,
      rating: 4.5,
      reviews: 65,
      newest: 24,
      image: "assets/images/product-17.jpg",
    },

    {
      id: 18,
      name: "Eye Repair Serum",
      category: "Skincare",
      brand: "Estée Lauder",
      type: "Face",
      skin: "Normal",
      price: 31.99,
      oldPrice: 39.99,
      discount: 20,
      rating: 4.9,
      reviews: 127,
      newest: 23,
      image: "assets/images/product-18.jpg",
    },

    {
      id: 19,
      name: "Soft Body Lotion",
      category: "Skincare",
      brand: "EVE Beauty",
      type: "Body",
      skin: "Dry",
      price: 21.99,
      oldPrice: 26.99,
      discount: 19,
      rating: 4.7,
      reviews: 82,
      newest: 22,
      image: "assets/images/product-19.jpg",
    },

    {
      id: 20,
      name: "Refreshing Face Mist",
      category: "Skincare",
      brand: "L'Oréal",
      type: "Face",
      skin: "Combination",
      price: 14.99,
      oldPrice: 18.99,
      discount: 21,
      rating: 4.5,
      reviews: 59,
      newest: 21,
      image: "assets/images/product-20.jpg",
    },

    /* ===================== HAIRCARE ===================== */

    {
      id: 21,
      name: "Repairing Hair Mask",
      category: "Haircare",
      brand: "EVE Beauty",
      type: "Body",
      skin: "Dry",
      price: 18.99,
      oldPrice: 22.99,
      discount: 17,
      rating: 4.8,
      reviews: 61,
      newest: 20,
      image: "assets/images/product-21.jpg",
    },

    {
      id: 22,
      name: "Silky Hair Shampoo",
      category: "Haircare",
      brand: "L'Oréal",
      type: "Body",
      skin: "Normal",
      price: 16.99,
      oldPrice: 20.99,
      discount: 19,
      rating: 4.6,
      reviews: 78,
      newest: 19,
      image: "assets/images/product-22.jpg",
    },

    {
      id: 23,
      name: "Nourishing Hair Oil",
      category: "Haircare",
      brand: "EVE Beauty",
      type: "Body",
      skin: "Dry",
      price: 23.99,
      oldPrice: 29.99,
      discount: 20,
      rating: 4.8,
      reviews: 93,
      newest: 18,
      image: "assets/images/product-23.jpg",
    },

    {
      id: 24,
      name: "Volume Conditioner",
      category: "Haircare",
      brand: "Maybelline",
      type: "Body",
      skin: "Normal",
      price: 15.99,
      oldPrice: 19.99,
      discount: 20,
      rating: 4.5,
      reviews: 54,
      newest: 17,
      image: "assets/images/product-24.jpg",
    },

    {
      id: 25,
      name: "Scalp Care Treatment",
      category: "Haircare",
      brand: "Estée Lauder",
      type: "Body",
      skin: "Oily",
      price: 27.99,
      oldPrice: 34.99,
      discount: 20,
      rating: 4.7,
      reviews: 72,
      newest: 16,
      image: "assets/images/product-25.jpg",
    },

    {
      id: 26,
      name: "Smooth Hair Serum",
      category: "Haircare",
      brand: "EVE Beauty",
      type: "Body",
      skin: "Combination",
      price: 20.99,
      oldPrice: 25.99,
      discount: 19,
      rating: 4.6,
      reviews: 68,
      newest: 15,
      image: "assets/images/product-26.jpg",
    },

    {
      id: 27,
      name: "Deep Repair Conditioner",
      category: "Haircare",
      brand: "L'Oréal",
      type: "Body",
      skin: "Dry",
      price: 18.99,
      oldPrice: 23.99,
      discount: 21,
      rating: 4.7,
      reviews: 81,
      newest: 14,
      image: "assets/images/product-27.jpg",
    },

    {
      id: 28,
      name: "Gloss Hair Spray",
      category: "Haircare",
      brand: "Maybelline",
      type: "Body",
      skin: "Normal",
      price: 17.99,
      oldPrice: 21.99,
      discount: 18,
      rating: 4.4,
      reviews: 49,
      newest: 13,
      image: "assets/images/product-28.jpg",
    },

    {
      id: 29,
      name: "Keratin Hair Treatment",
      category: "Haircare",
      brand: "Estée Lauder",
      type: "Body",
      skin: "Dry",
      price: 32.99,
      oldPrice: 39.99,
      discount: 18,
      rating: 4.9,
      reviews: 111,
      newest: 12,
      image: "assets/images/product-29.jpg",
    },

    {
      id: 30,
      name: "Daily Hair Mist",
      category: "Haircare",
      brand: "EVE Beauty",
      type: "Body",
      skin: "Normal",
      price: 14.99,
      oldPrice: 18.99,
      discount: 21,
      rating: 4.5,
      reviews: 47,
      newest: 11,
      image: "assets/images/product-30.jpg",
    },

    /* ===================== FRAGRANCE ===================== */

    {
      id: 31,
      name: "Eau de Parfum",
      category: "Fragrance",
      brand: "EVE Beauty",
      type: "Body",
      skin: "Normal",
      price: 34.99,
      oldPrice: 43.99,
      discount: 20,
      rating: 4.9,
      reviews: 112,
      newest: 10,
      image: "assets/images/product-31.jpg",
    },

    {
      id: 32,
      name: "Rose Blossom Perfume",
      category: "Fragrance",
      brand: "EVE Beauty",
      type: "Body",
      skin: "Normal",
      price: 39.99,
      oldPrice: 49.99,
      discount: 20,
      rating: 4.8,
      reviews: 96,
      newest: 9,
      image: "assets/images/product-32.jpg",
    },

    {
      id: 33,
      name: "Velvet Night Perfume",
      category: "Fragrance",
      brand: "Estée Lauder",
      type: "Body",
      skin: "Normal",
      price: 44.99,
      oldPrice: 54.99,
      discount: 18,
      rating: 4.9,
      reviews: 131,
      newest: 8,
      image: "assets/images/product-33.jpg",
    },

    {
      id: 34,
      name: "Fresh Bloom Mist",
      category: "Fragrance",
      brand: "L'Oréal",
      type: "Body",
      skin: "Normal",
      price: 21.99,
      oldPrice: 27.99,
      discount: 21,
      rating: 4.6,
      reviews: 63,
      newest: 7,
      image: "assets/images/product-34.jpg",
    },

    {
      id: 35,
      name: "Elegant Rose Eau",
      category: "Fragrance",
      brand: "EVE Beauty",
      type: "Body",
      skin: "Normal",
      price: 36.99,
      oldPrice: 45.99,
      discount: 20,
      rating: 4.8,
      reviews: 84,
      newest: 6,
      image: "assets/images/product-35.jpg",
    },

    {
      id: 36,
      name: "Golden Bloom",
      category: "Fragrance",
      brand: "Maybelline",
      type: "Body",
      skin: "Normal",
      price: 29.99,
      oldPrice: 36.99,
      discount: 19,
      rating: 4.5,
      reviews: 58,
      newest: 5,
      image: "assets/images/product-36.jpg",
    },

    {
      id: 37,
      name: "Soft Vanilla Perfume",
      category: "Fragrance",
      brand: "EVE Beauty",
      type: "Body",
      skin: "Normal",
      price: 31.99,
      oldPrice: 39.99,
      discount: 20,
      rating: 4.7,
      reviews: 77,
      newest: 4,
      image: "assets/images/product-37.jpg",
    },

    {
      id: 38,
      name: "Pure Jasmine",
      category: "Fragrance",
      brand: "L'Oréal",
      type: "Body",
      skin: "Normal",
      price: 27.99,
      oldPrice: 34.99,
      discount: 20,
      rating: 4.6,
      reviews: 66,
      newest: 3,
      image: "assets/images/product-38.jpg",
    },

    {
      id: 39,
      name: "Midnight Rose",
      category: "Fragrance",
      brand: "Estée Lauder",
      type: "Body",
      skin: "Normal",
      price: 42.99,
      oldPrice: 52.99,
      discount: 19,
      rating: 4.9,
      reviews: 108,
      newest: 2,
      image: "assets/images/product-39.jpg",
    },

    {
      id: 40,
      name: "EVE Signature Scent",
      category: "Fragrance",
      brand: "EVE Beauty",
      type: "Body",
      skin: "Normal",
      price: 49.99,
      oldPrice: 59.99,
      discount: 17,
      rating: 5,
      reviews: 145,
      newest: 1,
      image: "assets/images/product-40.jpg",
    },
  ];

  /* =========================================================
     SETTINGS
  ========================================================= */

  const productsPerPage = 12;

  let currentPage = 1;
  let currentView = "grid";

  let filteredProducts = [...products];

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const productsGrid = document.getElementById("productsGrid");

  const productsCount = document.getElementById("productsCount");

  const pagination = document.getElementById("shopPagination");

  const sortSelect = document.getElementById("sortSelect");

  const activeFilters = document.getElementById("activeFilters");

  const clearFilters = document.getElementById("clearFilters");

  const sidebar = document.getElementById("shopSidebar");

  const mobileFilterButton = document.getElementById("mobileFilterButton");

  const filterMobileClose = document.getElementById("filterMobileClose");

  const gridView = document.getElementById("gridView");

  const listView = document.getElementById("listView");

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
     CART KEY
  ========================================================= */

  function getUserCartKey() {
    const user = getCurrentUser();

    if (!user) {
      return null;
    }

    return `${CART_KEY}_${user.id}`;
  }

  /* =========================================================
     READ CART
  ========================================================= */

  function getCart() {
    const user = getCurrentUser();

    if (!user) {
      return [];
    }

    const userCartKey = getUserCartKey();

    if (!userCartKey) {
      return [];
    }

    try {
      const stored = localStorage.getItem(userCartKey);

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

    const userCartKey = getUserCartKey();

    if (!userCartKey) {
      return false;
    }

    try {
      localStorage.setItem(userCartKey, JSON.stringify(cart));

      localStorage.setItem(
        CART_CURRENT_USER_KEY,
        JSON.stringify({
          userId: user.id,
          items: cart,
          updatedAt: new Date().toISOString(),
        }),
      );

      localStorage.setItem(CART_KEY, JSON.stringify(cart));

      return true;
    } catch (error) {
      console.error("Could not save cart:", error);

      return false;
    }
  }

  /* =========================================================
     CART QUANTITY
  ========================================================= */

  function getCartQuantity(cart = getCart()) {
    return cart.reduce((total, item) => {
      return total + Number(item.quantity || 0);
    }, 0);
  }

  /* =========================================================
     CART TOTAL
  ========================================================= */

  function getCartTotal(cart = getCart()) {
    return cart.reduce((total, item) => {
      return total + Number(item.price || 0) * Number(item.quantity || 0);
    }, 0);
  }

  /* =========================================================
     CART COUNTER
  ========================================================= */

  function updateCartCounter() {
    const cart = getCart();

    const quantity = getCartQuantity(cart);

    const selectors = [
      "#cartCount",
      "#cartBadge",
      ".cart-count",
      ".cart-badge",
      "[data-cart-count]",
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        element.textContent = quantity;

        element.style.display = quantity > 0 ? "" : "none";
      });
    });

    window.dispatchEvent(
      new CustomEvent("eveBeautyCartUpdated", {
        detail: {
          cart: cart,
          quantity: quantity,
          total: getCartTotal(cart),
        },
      }),
    );
  }

  /* =========================================================
     CART TOAST MESSAGE
     
     FIXED:
     پیام حالا پایین سمت راست صفحه می‌آید.
  ========================================================= */

  function showCartMessage(message) {
    let toast = document.getElementById("eveBeautyCartToast");

    if (!toast) {
      toast = document.createElement("div");

      toast.id = "eveBeautyCartToast";

      /*
        مهم‌ترین تغییر:

        قبلاً:
        left: 50%

        حالا:
        right: 24px
      */

      toast.style.position = "fixed";

      toast.style.right = "24px";

      toast.style.bottom = "24px";

      toast.style.left = "auto";

      toast.style.top = "auto";

      /*
        حرکت پیام از پایین
        بدون translateX
      */

      toast.style.transform = "translateY(20px)";

      toast.style.zIndex = "999999";

      toast.style.background = "#8f5f5f";

      toast.style.color = "#ffffff";

      /*
        کمی کوچک‌تر از قبل
      */

      toast.style.padding = "7px 12px";

      toast.style.borderRadius = "7px";

      toast.style.fontSize = "12px";

      toast.style.fontWeight = "500";

      toast.style.lineHeight = "1.3";

      toast.style.whiteSpace = "nowrap";

      toast.style.boxShadow = "0 4px 14px rgba(0,0,0,0.16)";

      toast.style.opacity = "0";

      toast.style.pointerEvents = "none";

      toast.style.transition = "opacity 0.25s ease, transform 0.25s ease";

      /*
        برای اینکه در موبایل
        از صفحه بیرون نزند
      */

      toast.style.maxWidth = "calc(100vw - 32px)";

      toast.style.overflow = "hidden";

      toast.style.textOverflow = "ellipsis";

      document.body.appendChild(toast);
    }

    /*
      متن پیام
    */

    toast.textContent = message;

    /*
      نمایش پیام
    */

    toast.style.opacity = "1";

    toast.style.transform = "translateY(0)";

    /*
      تایمر قبلی را پاک می‌کنیم
    */

    clearTimeout(window.eveBeautyToastTimer);

    /*
      بعد از 2.2 ثانیه مخفی شود
    */

    window.eveBeautyToastTimer = setTimeout(() => {
      toast.style.opacity = "0";

      toast.style.transform = "translateY(20px)";
    }, 2200);
  }

  /* =========================================================
     IS PRODUCT IN CART
  ========================================================= */

  function isProductInCart(productId) {
    const cart = getCart();

    return cart.some((item) => Number(item.id) === Number(productId));
  }

  /* =========================================================
     ADD TO CART
  ========================================================= */

  function addToCart(productId) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      localStorage.setItem("eveBeautyLoginRedirect", "shop.html");

      alert("Please sign in first to add products to your cart.");

      window.location.href = "login.html";

      return false;
    }

    const product = products.find(
      (item) => Number(item.id) === Number(productId),
    );

    if (!product) {
      console.error("Product not found:", productId);

      return false;
    }

    const cart = getCart();

    const existingItem = cart.find(
      (item) => Number(item.id) === Number(productId),
    );

    if (existingItem) {
      return removeFromCart(productId);
    }

    cart.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      type: product.type,
      skin: product.skin,
      price: product.price,
      oldPrice: product.oldPrice,
      discount: product.discount,
      rating: product.rating,
      reviews: product.reviews,
      image: product.image,
      quantity: 1,
      addedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const saved = saveCart(cart);

    if (!saved) {
      alert("Could not save the product to your cart.");

      return false;
    }

    updateCartCounter();

    updateAllCartButtons();

    /*
      پیام پایین سمت راست
    */

    showCartMessage("Product added to cart.");

    console.log("EVE BEAUTY CART UPDATED:", cart);

    return true;
  }

  /* =========================================================
     REMOVE FROM CART
  ========================================================= */

  function removeFromCart(productId) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      return false;
    }

    const cart = getCart();

    const exists = cart.some((item) => Number(item.id) === Number(productId));

    if (!exists) {
      return false;
    }

    const newCart = cart.filter(
      (item) => Number(item.id) !== Number(productId),
    );

    const saved = saveCart(newCart);

    if (!saved) {
      alert("Could not update your cart.");

      return false;
    }

    updateCartCounter();

    updateAllCartButtons();

    /*
      پیام پایین سمت راست
    */

    showCartMessage("Product removed from cart.");

    console.log("PRODUCT REMOVED:", productId);

    return true;
  }

  /* =========================================================
     CHANGE CART QUANTITY
  ========================================================= */

  function changeCartQuantity(productId, amount) {
    const cart = getCart();

    const item = cart.find(
      (product) => Number(product.id) === Number(productId),
    );

    if (!item) {
      return;
    }

    item.quantity = Number(item.quantity || 0) + Number(amount);

    if (item.quantity <= 0) {
      removeFromCart(productId);

      return;
    }

    item.updatedAt = new Date().toISOString();

    saveCart(cart);

    updateCartCounter();

    updateAllCartButtons();
  }

  /* =========================================================
     CHECKED FILTER VALUES
  ========================================================= */

  function getCheckedValues(selector) {
    return [...document.querySelectorAll(selector + ":checked")].map(
      (input) => input.value,
    );
  }

  /* =========================================================
     CATEGORY FROM URL
  ========================================================= */

  function applyCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);

    const categoryFromURL = params.get("category");

    if (!categoryFromURL) {
      return false;
    }

    const categoryInput = [
      ...document.querySelectorAll(".category-filter"),
    ].find(
      (input) => input.value.toLowerCase() === categoryFromURL.toLowerCase(),
    );

    if (!categoryInput) {
      return false;
    }

    document.querySelectorAll(".category-filter").forEach((input) => {
      input.checked = false;
    });

    categoryInput.checked = true;

    const categoryGroup = categoryInput.closest(".filter-group");

    if (categoryGroup) {
      categoryGroup.classList.remove("closed");

      const toggle = categoryGroup.querySelector("[data-filter-toggle]");

      const icon = toggle?.querySelector("svg");

      if (icon) {
        icon.style.transform = "rotate(180deg)";
      }
    }

    return true;
  }

  /* =========================================================
     SCROLL
  ========================================================= */

  function scrollToProducts() {
    const productsSection =
      document.querySelector(".shop-products-area") ||
      document.querySelector(".products-area") ||
      document.querySelector("#products") ||
      document.querySelector(".shop-main");

    if (!productsSection) {
      return;
    }

    setTimeout(() => {
      const navbarHeight = 100;

      const top =
        productsSection.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      window.scrollTo({
        top: Math.max(top, 0),
        behavior: "smooth",
      });
    }, 350);
  }

  /* =========================================================
     APPLY FILTERS
  ========================================================= */

  function applyFilters() {
    const categories = getCheckedValues(".category-filter");

    const brands = getCheckedValues(".brand-filter");

    const prices = getCheckedValues(".price-filter");

    const skins = getCheckedValues(".skin-filter");

    const types = getCheckedValues(".type-filter");

    filteredProducts = products.filter((product) => {
      const categoryMatch =
        categories.length === 0 || categories.includes(product.category);

      const brandMatch = brands.length === 0 || brands.includes(product.brand);

      const skinMatch = skins.length === 0 || skins.includes(product.skin);

      const typeMatch = types.length === 0 || types.includes(product.type);

      let priceMatch = true;

      if (prices.length > 0) {
        priceMatch = prices.some((range) => {
          if (range === "under20") {
            return product.price < 20;
          }

          if (range === "20to30") {
            return product.price >= 20 && product.price <= 30;
          }

          if (range === "over30") {
            return product.price > 30;
          }

          return true;
        });
      }

      return (
        categoryMatch && brandMatch && skinMatch && typeMatch && priceMatch
      );
    });

    sortProducts();

    currentPage = 1;

    renderProducts();

    renderPagination();

    renderActiveFilters();
  }

  /* =========================================================
     SORT PRODUCTS
  ========================================================= */

  function sortProducts() {
    const sort = sortSelect ? sortSelect.value : "featured";

    if (sort === "low-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      filteredProducts.sort((a, b) => b.rating - a.rating);
    } else if (sort === "newest") {
      filteredProducts.sort((a, b) => b.newest - a.newest);
    } else {
      filteredProducts.sort((a, b) => a.id - b.id);
    }
  }

  /* =========================================================
     RENDER PRODUCTS
  ========================================================= */

  function renderProducts() {
    if (!productsGrid) {
      return;
    }

    productsGrid.innerHTML = "";

    const start = (currentPage - 1) * productsPerPage;

    const end = start + productsPerPage;

    const pageProducts = filteredProducts.slice(start, end);

    if (pageProducts.length === 0) {
      productsGrid.innerHTML = `
        <div class="no-products">
          <i data-lucide="search-x"></i>
          <h3>No products found</h3>
          <p>Try changing your filters.</p>
        </div>
      `;

      if (window.lucide) {
        lucide.createIcons();
      }

      updateProductsCount();

      return;
    }

    pageProducts.forEach((product) => {
      const card = document.createElement("article");

      card.className = "product-card";

      const productAlreadyInCart = isProductInCart(product.id);

      card.innerHTML = `
          <div class="product-image">

            <img
              src="${product.image}"
              alt="${product.name}"
              loading="lazy"
              onerror="this.style.display='none';"
            />

            <span class="discount-badge">
              -${product.discount}%
            </span>

            <button
              type="button"
              class="wishlist-button"
              data-product-id="${product.id}"
              aria-label="Add to wishlist"
            >
              <i data-lucide="heart"></i>
            </button>

          </div>

          <div class="product-info">

            <p class="product-brand">
              ${product.brand}
            </p>

            <h3 class="product-name">
              ${product.name}
            </h3>

            <div class="product-rating">

              <span>
                ${"★".repeat(Math.round(product.rating))}
              </span>

              <span>
                (${product.reviews})
              </span>

            </div>

            <div class="product-price">

              <span class="current-price">
                $${product.price.toFixed(2)}
              </span>

              <span class="old-price">
                $${product.oldPrice.toFixed(2)}
              </span>

            </div>

            <button
              type="button"
              class="add-cart-button ${productAlreadyInCart ? "in-cart" : ""}"
              data-product-id="${product.id}"
            >

              <i
                data-lucide="${productAlreadyInCart ? "check" : "shopping-bag"}"
              ></i>

              ${productAlreadyInCart ? "In cart" : "Add to cart"}

            </button>

          </div>
        `;

      productsGrid.appendChild(card);
    });

    if (window.lucide) {
      lucide.createIcons();
    }

    updateProductsCount();

    setupProductButtons();
  }

  /* =========================================================
     UPDATE CART BUTTONS
  ========================================================= */

  function updateAllCartButtons() {
    const cart = getCart();

    document.querySelectorAll(".add-cart-button").forEach((button) => {
      const productId = Number(button.dataset.productId);

      const exists = cart.some((item) => Number(item.id) === productId);

      if (exists) {
        button.classList.add("in-cart");

        button.innerHTML = `
              <i data-lucide="check"></i>
              In cart
            `;
      } else {
        button.classList.remove("in-cart");

        button.innerHTML = `
              <i data-lucide="shopping-bag"></i>
              Add to cart
            `;
      }
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  /* =========================================================
     PRODUCT COUNT
  ========================================================= */

  function updateProductsCount() {
    if (!productsCount) {
      return;
    }

    const total = filteredProducts.length;

    if (total === 0) {
      productsCount.textContent = "Showing 0 products";

      return;
    }

    const start = (currentPage - 1) * productsPerPage + 1;

    const end = Math.min(currentPage * productsPerPage, total);

    productsCount.textContent = `Showing ${start}–${end} of ${total} products`;
  }

  /* =========================================================
     PAGINATION
  ========================================================= */

  function renderPagination() {
    if (!pagination) {
      return;
    }

    pagination.innerHTML = "";

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (totalPages <= 1) {
      return;
    }

    const previous = document.createElement("button");

    previous.className = "pagination-button";

    previous.innerHTML = '<i data-lucide="chevron-left"></i>';

    previous.disabled = currentPage === 1;

    previous.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;

        renderProducts();

        renderPagination();

        scrollToProducts();
      }
    });

    pagination.appendChild(previous);

    for (let page = 1; page <= totalPages; page++) {
      const button = document.createElement("button");

      button.className = "pagination-button";

      if (page === currentPage) {
        button.classList.add("active");
      }

      button.textContent = page;

      button.addEventListener("click", () => {
        currentPage = page;

        renderProducts();

        renderPagination();

        scrollToProducts();
      });

      pagination.appendChild(button);
    }

    const next = document.createElement("button");

    next.className = "pagination-button";

    next.innerHTML = '<i data-lucide="chevron-right"></i>';

    next.disabled = currentPage === totalPages;

    next.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;

        renderProducts();

        renderPagination();

        scrollToProducts();
      }
    });

    pagination.appendChild(next);

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  /* =========================================================
     ACTIVE FILTERS
  ========================================================= */

  function renderActiveFilters() {
    if (!activeFilters) {
      return;
    }

    activeFilters.innerHTML = "";

    const selectors = [
      ".category-filter:checked",
      ".brand-filter:checked",
      ".price-filter:checked",
      ".skin-filter:checked",
      ".type-filter:checked",
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((input) => {
        const chip = document.createElement("div");

        chip.className = "filter-chip";

        chip.innerHTML = `
                ${input.value}

                <button
                  type="button"
                  aria-label="Remove filter"
                >
                  ×
                </button>
              `;

        chip.querySelector("button").addEventListener("click", () => {
          input.checked = false;

          applyFilters();
        });

        activeFilters.appendChild(chip);
      });
    });
  }

  /* =========================================================
     WISHLIST
  ========================================================= */

  function getWishlistKey() {
    const user = getCurrentUser();

    if (!user) {
      return null;
    }

    return `${WISHLIST_KEY}_${user.id}`;
  }

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

  function saveWishlist(wishlist) {
    const key = getWishlistKey();

    if (!key) {
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(wishlist));
    } catch (error) {
      console.error("Could not save wishlist:", error);
    }
  }

  function toggleWishlist(productId) {
    const user = getCurrentUser();

    if (!user) {
      localStorage.setItem("eveBeautyLoginRedirect", "shop.html");

      alert("Please sign in first.");

      window.location.href = "login.html";

      return;
    }

    const wishlist = getWishlist();

    const index = wishlist.findIndex(
      (item) => Number(item.id) === Number(productId),
    );

    if (index !== -1) {
      wishlist.splice(index, 1);
    } else {
      const product = products.find(
        (item) => Number(item.id) === Number(productId),
      );

      if (product) {
        wishlist.push({
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          addedAt: new Date().toISOString(),
        });
      }
    }

    saveWishlist(wishlist);

    updateWishlistButtons();
  }

  function updateWishlistButtons() {
    const wishlist = getWishlist();

    document.querySelectorAll(".wishlist-button").forEach((button) => {
      const productId = Number(button.dataset.productId);

      const exists = wishlist.some((item) => Number(item.id) === productId);

      button.classList.toggle("active", exists);
    });
  }

  /* =========================================================
     PRODUCT BUTTONS
  ========================================================= */

  function setupProductButtons() {
    /*
      WISHLIST
    */

    document.querySelectorAll(".wishlist-button").forEach((button) => {
      button.addEventListener("click", () => {
        const productId = Number(button.dataset.productId);

        toggleWishlist(productId);
      });
    });

    /*
      CART
    */

    document.querySelectorAll(".add-cart-button").forEach((button) => {
      button.addEventListener("click", () => {
        const productId = Number(button.dataset.productId);

        const exists = isProductInCart(productId);

        if (exists) {
          removeFromCart(productId);
        } else {
          addToCart(productId);
        }
      });
    });

    updateWishlistButtons();

    updateAllCartButtons();
  }

  /* =========================================================
     FILTER EVENTS
  ========================================================= */

  document
    .querySelectorAll(
      `
      .category-filter,
      .brand-filter,
      .price-filter,
      .skin-filter,
      .type-filter
      `,
    )
    .forEach((input) => {
      input.addEventListener("change", applyFilters);
    });

  /* =========================================================
     SORT EVENT
  ========================================================= */

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      sortProducts();

      currentPage = 1;

      renderProducts();

      renderPagination();
    });
  }

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  if (clearFilters) {
    clearFilters.addEventListener("click", () => {
      document
        .querySelectorAll(
          `
            .category-filter,
            .brand-filter,
            .price-filter,
            .skin-filter,
            .type-filter
            `,
        )
        .forEach((input) => {
          input.checked = false;
        });

      if (sortSelect) {
        sortSelect.value = "featured";
      }

      const cleanURL = window.location.pathname;

      window.history.replaceState({}, "", cleanURL);

      applyFilters();
    });
  }

  /* =========================================================
     FILTER GROUP COLLAPSE
  ========================================================= */

  document.querySelectorAll("[data-filter-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest(".filter-group");

      if (!group) {
        return;
      }

      group.classList.toggle("closed");

      const icon = button.querySelector("svg");

      if (icon) {
        icon.style.transform = group.classList.contains("closed")
          ? "rotate(0deg)"
          : "rotate(180deg)";
      }
    });
  });

  /* =========================================================
     MOBILE FILTER
  ========================================================= */

  if (mobileFilterButton) {
    mobileFilterButton.addEventListener("click", () => {
      if (sidebar) {
        sidebar.classList.add("open");
      }
    });
  }

  if (filterMobileClose) {
    filterMobileClose.addEventListener("click", () => {
      if (sidebar) {
        sidebar.classList.remove("open");
      }
    });
  }

  /* =========================================================
     GRID / LIST VIEW
  ========================================================= */

  if (gridView) {
    gridView.addEventListener("click", () => {
      currentView = "grid";

      if (productsGrid) {
        productsGrid.classList.remove("list-view");
      }

      gridView.classList.add("active");

      if (listView) {
        listView.classList.remove("active");
      }
    });
  }

  if (listView) {
    listView.addEventListener("click", () => {
      currentView = "list";

      if (productsGrid) {
        productsGrid.classList.add("list-view");
      }

      listView.classList.add("active");

      if (gridView) {
        gridView.classList.remove("active");
      }
    });
  }

  /* =========================================================
     CART UPDATE EVENT
  ========================================================= */

  window.addEventListener("eveBeautyCartUpdated", () => {
    updateCartCounter();
    updateAllCartButtons();
  });

  /* =========================================================
     STORAGE EVENT
  ========================================================= */

  window.addEventListener("storage", (event) => {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      return;
    }

    const userCartKey = `${CART_KEY}_${currentUser.id}`;

    if (
      event.key === userCartKey ||
      event.key === CART_KEY ||
      event.key === CART_CURRENT_USER_KEY
    ) {
      updateCartCounter();

      updateAllCartButtons();
    }
  });

  /* =========================================================
     INITIALIZE
  ========================================================= */

  const hasURLCategory = applyCategoryFromURL();

  sortProducts();

  if (hasURLCategory) {
    applyFilters();

    setTimeout(() => {
      scrollToProducts();
    }, 450);
  } else {
    renderProducts();

    renderPagination();

    renderActiveFilters();
  }

  /*
    Load saved cart immediately.
  */

  updateCartCounter();

  updateAllCartButtons();

  updateWishlistButtons();

  if (window.lucide) {
    lucide.createIcons();
  }

  /* =========================================================
     GLOBAL DEBUG HELPERS
  ========================================================= */

  window.eveBeautyShop = {
    getCurrentUser,
    getCart,
    saveCart,
    addToCart,
    removeFromCart,
    changeCartQuantity,
    getCartQuantity,
    getCartTotal,
    showCartMessage,
    products,
  };

  console.log("=================================");

  console.log("EVE BEAUTY SHOP READY");

  console.log("Current User:", getCurrentUser());

  console.log("Current Cart:", getCart());

  console.log("=================================");
});
