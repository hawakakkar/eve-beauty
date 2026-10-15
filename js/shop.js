/* EVE BEAUTY SHOP.JS */
/*THIS FUNCTION SAY THAT THE HTML MUST APPLY FIRST COMPLETELY THEN APPLY THE CODE OF THIS FUNCTION*/

document.addEventListener("DOMContentLoaded", () => {
  /* STORAGE KEYS*/

  const USERS_KEY = "eveBeautyUsers";

  const CURRENT_USER_KEY = "eveBeautyCurrentUser";

  const CART_KEY = "eveBeautyCart";

  const CART_CURRENT_USER_KEY = "eveBeautyCartCurrentUser";

  const WISHLIST_KEY = "eveBeautyWishlist";

  /* CREATING PRODUCT DATA ARRAYS*/

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

      discount: 25,

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

      price: 90.0,

      oldPrice: 120.99,

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

      price: 59.99,

      oldPrice: 79.99,

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

      price: 60.0,

      oldPrice: 94.99,

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

  /* THE TRUE SHOPPING SETTINGS*/

  const productsPerPage = 12;

  let currentPage = 1;

  let currentView = "grid";

  let filteredProducts = [...products];

  /* ELEMENTS*/

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
  const shopNowButton = document.getElementById("shopNowButton");

  /* THIS RXECUTE CURRENT USER*/

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

  /* WHEN THE USER DIDNT REGISTER CART KEY CANTBE IN  ACESS TO */

  function getUserCartKey() {
    const user = getCurrentUser();

    if (!user) {
      return null;
    }

    return `${CART_KEY}_${user.id}`;
  }

  /* READING CART */

  function getCart() {
    const user = getCurrentUser();

    if (!user) {
      localStorage.setItem(CART_KEY, JSON.stringify([]));
      return [];
    }

    const userCartKey = getUserCartKey();

    if (!userCartKey) {
      localStorage.setItem(CART_KEY, JSON.stringify([]));
      return [];
    }

    try {
      const stored = localStorage.getItem(userCartKey);

      if (!stored) {
        localStorage.setItem(CART_KEY, JSON.stringify([]));
        return [];
      }

      const cart = JSON.parse(stored);

      if (!Array.isArray(cart)) {
        localStorage.setItem(userCartKey, JSON.stringify([]));
        localStorage.setItem(CART_KEY, JSON.stringify([]));
        return [];
      }

      const uniqueCart = [];
      const usedIds = new Set();

      cart.forEach((item) => {
        const productId = Number(item.id);

        if (!Number.isFinite(productId)) {
          return;
        }
        /*THIS ASK ARE THIS ID IS IN CART ALREADY*/
        if (usedIds.has(productId)) {
          return;
        }

        usedIds.add(productId);

        uniqueCart.push({
          ...item,
          id: productId,
          quantity: 1,
        });
      });

      localStorage.setItem(userCartKey, JSON.stringify(uniqueCart));

      localStorage.setItem(CART_KEY, JSON.stringify(uniqueCart));

      return uniqueCart;
    } catch (error) {
      console.error("Error reading cart:", error);

      localStorage.setItem(userCartKey, JSON.stringify([]));
      localStorage.setItem(CART_KEY, JSON.stringify([])); //SHOW THE CART IS WHITE

      return [];
    }
  }

  /*  SAVING CART */

  function saveCart(cart) {
    const user = getCurrentUser();

    if (!user) {
      return;
    }

    const userCartKey = getUserCartKey();

    if (!userCartKey) {
      return;
    }

    const uniqueCart = [];
    const usedIds = new Set();

    cart.forEach((item) => {
      const productId = Number(item.id);

      if (!Number.isFinite(productId)) {
        return;
      }

      if (usedIds.has(productId)) {
        return;
      }

      usedIds.add(productId);

      uniqueCart.push({
        ...item,
        id: productId,
        quantity: 1,
      });
    });

    localStorage.setItem(userCartKey, JSON.stringify(uniqueCart));

    localStorage.setItem(
      CART_CURRENT_USER_KEY,
      JSON.stringify({
        userId: user.id,
        items: uniqueCart,
        updatedAt: new Date().toISOString(),
      }),
    );

    /* Navbar CAN READ THIS*/
    localStorage.setItem(CART_KEY, JSON.stringify(uniqueCart));
  }

  /* CART QUANTITY*/
  /*THIS COUNT ALLQUANTITY OF ITEMS*/

  function getCartQuantity(cart = getCart()) {
    return cart.reduce((total, item) => {
      return total + Number(item.quantity || 0);
    }, 0);
  }

  /* CART TOTAL  COUNT*/

  function getCartTotal(cart = getCart()) {
    return cart.reduce((total, item) => {
      return total + Number(item.price || 0) * Number(item.quantity || 0);
    }, 0);
  }

  /* UPDATE CART COUNTER IN NAVBAR */

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
        element.style.display = "";
      });
    });

    /*THIS WANT TRANFORMATION OF EVENT IN WINDOW*/
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

  ========================================================= */

  function showCartMessage(message) {
    let toast = document.getElementById("eveBeautyCartToast");

    if (!toast) {
      toast = document.createElement("div");

      toast.id = "eveBeautyCartToast";
      toast.style.position = "fixed";
      toast.style.right = "24px";
      toast.style.bottom = "300px";
      toast.style.left = "auto";
      toast.style.top = "auto";
      toast.style.transform = "translateY(20px)";
      toast.style.zIndex = "999999";
      toast.style.background = "#aa8386";
      toast.style.color = "#ffffff";
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
      toast.style.maxWidth = "calc(100vw - 32px)";
      toast.style.overflow = "hidden";
      toast.style.textOverflow = "ellipsis";

      document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    // اسکرول صفحه به پایین
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });

    clearTimeout(window.eveBeautyToastTimer);

    window.eveBeautyToastTimer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
    }, 2200);
  }

  /* THIS CHECK THAT ARE THE PRODUCT IS IN CART*/

  function isProductInCart(productId) {
    const cart = getCart();
    /*THIS CHECK THAT ARE ID OF CART IS EXACTLY EQUAL TO THE ID WE SEARCH*/
    return cart.some((item) => Number(item.id) === Number(productId));
  }

  /*ADD TO CART*/
  /*HERE, THIS FUNCTION TRY TO ADD PRODUCT TO CART*/
  function addToCart(productId) {
    /*CHEKING THE ACTIVE USER*/
    const currentUser = getCurrentUser();

    if (!currentUser) {
      localStorage.setItem("eveBeautyLoginRedirect", "shop.html");

      Swal.fire({
        icon: "warning",
        title: "Sign in required",
        text: "Please sign in first to add products to your cart.",
        confirmButtonText: "Sign in",
      }).then(() => {
        window.location.href = "login.html";
      });

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

    const existingIndex = cart.findIndex(
      (item) => Number(item.id) === Number(product.id),
    );
    /*IF THE PRODUCT EXIST*/
    if (existingIndex !== -1) {
      return removeFromCart(product.id);
    }
    /*IF PRODUCT DONT BE INTO CARD THIS WILL CREATE A NEW OBJECT FOR CART*/
    const newProduct = {
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
    };

    cart.push(newProduct);

    /*FINDING CART LOCALLSTORAGE KEY*/
    const userCartKey = getUserCartKey();

    if (!userCartKey) {
      return false;
    }

    try {
      localStorage.setItem(userCartKey, JSON.stringify(cart));

      localStorage.setItem(
        CART_CURRENT_USER_KEY,
        JSON.stringify({
          userId: currentUser.id,
          items: cart,
          updatedAt: new Date().toISOString(),
        }),
      );

      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Could not save product to cart:", error);

      return false;
    }

    updateCartCounter();

    updateAllCartButtons();

    window.dispatchEvent(
      new CustomEvent("eveBeautyCartChanged", {
        detail: {
          cart: cart,
          quantity: getCartQuantity(cart),
        },
      }),
    );

    showCartMessage("Product added to cart.");

    return true;
  }

  /* REMOVing product FROM CART*/

  function removeFromCart(productId) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      return false;
    }

    const cart = getCart();

    const newCart = cart.filter(
      (item) => Number(item.id) !== Number(productId),
    );
    /*IF THE LENGHT OF OLD PRODUCT AND NEW PRODUCT AFTER REMOVE WAS EQUAL IT MEAN NOT PRODUCT REMOVED*/
    if (newCart.length === cart.length) {
      return false;
    }

    const userCartKey = getUserCartKey();

    if (!userCartKey) {
      return false;
    }

    try {
      localStorage.setItem(userCartKey, JSON.stringify(newCart));

      localStorage.setItem(
        CART_CURRENT_USER_KEY,
        JSON.stringify({
          userId: currentUser.id,
          items: newCart,
          updatedAt: new Date().toISOString(),
        }),
      );

      localStorage.setItem(CART_KEY, JSON.stringify(newCart));
    } catch (error) {
      console.error("Could not remove product from cart:", error);

      return false;
    }

    updateCartCounter();
    updateAllCartButtons();

    window.dispatchEvent(
      new CustomEvent("eveBeautyCartChanged", {
        /*THE DETAILS THAT TRANSFORM WITH EVENT*/
        detail: {
          cart: newCart,
          quantity: getCartQuantity(newCart),
        },
      }),
    );

    showCartMessage("Product removed from cart.");

    return true;
  }

  /*  HERE CHANGE THE CART QUANTITY*/

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
    /*IT SAVE THE NEW CART IN LOCAL STORAGE*/
    saveCart(cart);

    updateCartCounter();

    updateAllCartButtons();
  }

  /* THIS CHECK THE FILTER VALUES OF SHOP*/

  function getCheckedValues(selector) {
    return [...document.querySelectorAll(selector + ":checked")].map(
      (input) => input.value,
    );
  }

  /* CREATING CATAGORY THAT CHOSING PRODUCTS FROM IT BY EXISTING PAGE URL/
  /*THIS FUNCTION SAY GO AND CHECK THAT USER CHECKED WHICH CATAGORY*/

  function applyCategoryFromURL() {
    /*GIVE THE CURRENTLY ADDRESS QUERY AND MAKE A TOOLS FOR READING IT*/
    const params = new URLSearchParams(window.location.search);
    /*HERE THE CONST SAY THAT GIVE THE KEY THAT ITS NAME IS CATEGORY*/
    const categoryFromURL = params.get("category");

    if (!categoryFromURL) {
      return false;
    }
    /*FIND THE ALL ELEMENTS OF HTML THAT HAVE SELECTOR BY NAME OF .catagory-filter*/
    const categoryInput = [
      ...document.querySelectorAll(".category-filter"),
      /*CHECK THE CATEGORY FILTER AND FINAD AN INPUT THAT ITS VALUE BE EQUAL TO URL OF CATAGORY*/
    ].find(
      (input) => input.value.toLowerCase() === categoryFromURL.toLowerCase(),
    );

    if (!categoryInput) {
      return false;
    }
    /*FIND THE ALL CATEGORY FILTER*/
    document
      .querySelectorAll(".category-filter")
      /*WORK ON EACH CATEGORY FILTER AND PUT THE CURRENTLY CATEGORY INTO INPUT CONST*/
      .forEach((input) => {
        input.checked = false;
      });

    categoryInput.checked = true;
    /*FIND THE CLOSEST ELEMENT THAT HAVE THE FILTER-GROUP CLASS*/
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

  /* THIS WILL TRANFORM THE PAGE INTO PART OF PRODUCTS  BY CLICKING INTO SHOP NOW BUTTON*/

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
        /*THIS DONT PREVENT TO REACH THE QUANTITY INTO "-" QUANTITY*/
        top: Math.max(top, 0),

        behavior: "smooth",
      });
    }, 350);
  }
  if (shopNowButton) {
    shopNowButton.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToProducts();
    });
  }
  /* THIS FUNCTION TRY TO APPLY FILTERS*/

  function applyFilters() {
    const categories = getCheckedValues(".category-filter");

    const brands = getCheckedValues(".brand-filter");

    const prices = getCheckedValues(".price-filter");

    const skins = getCheckedValues(".skin-filter");

    const types = getCheckedValues(".type-filter");

    /*CHECK THE ALL PRODUCTS ONE BY ONE AND JUST KEEP THE PRODUCTS THAT ACCEPT THE CONDITIONS*/
    filteredProducts = products.filter((product) => {
      /*IF THE USER HASNT CHOSEN THE CATEGORY ACCEPT IT BUT IF HE ACCEPTED THE PRODUCTS CATEGORYMUST CHOOSE*/
      const categoryMatch =
        categories.length === 0 || categories.includes(product.category);

      const brandMatch = brands.length === 0 || brands.includes(product.brand);

      const skinMatch = skins.length === 0 || skins.includes(product.skin);

      const typeMatch = types.length === 0 || types.includes(product.type);

      /*SUPPOSE THAT THE QUANTITY IS CORRECT*/
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
    /*THIS MAKE THE PRODUCTS REGULAR AFTER FILTER*/
    sortProducts();

    currentPage = 1;

    renderProducts();

    /*THIS MAKE THE NUMBER OF PAGE AGAIN*/
    renderPagination();

    /*THIS SHOW THE FILTERS THAT CHOOSEN USER IN ACTIVE FILTER*/
    renderActiveFilters();
  }

  /* SORT PRODUCTS*/

  function sortProducts() {
    /*IF SORT SELECT EXIST GIVE THE SORT SELECT VALUE QUANTITY OTHERWISE USE FEATURED AS AN AUTO*/
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

  /*RENDER PRODUCTS INSIDE THE HTML PAGE*/

  function renderProducts() {
    if (!productsGrid) {
      return;
    }
    /*THE INSIDE OF IT WILL BE EMPTY*/
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

            aria-pressed="false"

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

    setupShopScrollAnimations();
  }
  /* UPDATE CART BUTTONS*/

  function updateAllCartButtons() {
    const cart = getCart();

    document.querySelectorAll(".add-cart-button").forEach((button) => {
      const productId = Number(button.dataset.productId);

      const exists = cart.some((item) => Number(item.id) === productId);

      button.classList.toggle("in-cart", exists);

      button.innerHTML = `
        <i data-lucide="shopping-bag"></i>
        ${exists ? "In cart" : "Add to cart"}
      `;

      button.setAttribute("aria-pressed", exists ? "true" : "false");
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }
  /*  PRODUCT COUNT*/

  function updateProductsCount() {
    if (!productsCount) {
      return;
    }
    /*GIVING ALL FILTERED PRODUCTS*/
    const total = filteredProducts.length;

    if (total === 0) {
      productsCount.textContent = "Showing 0 products";

      return;
    }
    /*HERE, THIS START THE PAGE FROM 1 THEN 13..*/

    const start = (currentPage - 1) * productsPerPage + 1;

    const end = Math.min(
      currentPage * productsPerPage,

      total,
    );

    productsCount.textContent = `Showing ${start}–${end} of ${total} products`;
  }

  /* PAGINATION*/

  function renderPagination() {
    if (!pagination) {
      return;
    }
    /*ERASE ALL ALREADY THINGS OF PAGENATION*/

    pagination.innerHTML = "";

    /*COUNT OF TOTAL PAGES*/

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (totalPages <= 1) {
      return;
    }

    const previous = document.createElement("button");

    previous.className = "pagination-button";

    previous.innerHTML = '<i data-lucide="chevron-left"></i>';

    previous.disabled = currentPage === 1;

    previous.addEventListener(
      "click",

      () => {
        if (currentPage > 1) {
          currentPage--;

          renderProducts();

          renderPagination();

          scrollToProducts();
        }
      },
    );

    /*PUT THE PERVIOUSE BUTTON INTO PAGINATION ELEMENT*/
    pagination.appendChild(previous);
    /*START FROM PAGE 1 AND GO UNTIL LAST PAGE*/
    for (let page = 1; page <= totalPages; page++) {
      const button = document.createElement("button");

      button.className = "pagination-button";

      if (page === currentPage) {
        button.classList.add("active");
      }
      /*PUTING THE PAGE NUMBER FOR EX IF PAGE BE 3 THE TEXTCONTENT OF BUTTON WILL BECOM 3*/
      button.textContent = page;

      button.addEventListener(
        "click",

        () => {
          currentPage = page;

          renderProducts();

          renderPagination();

          scrollToProducts();
        },
      );
      /*ADDING NUMBER OF BUTTON INTO PAGINATION*/
      pagination.appendChild(button);
    }

    const next = document.createElement("button");

    next.className = "pagination-button";

    next.innerHTML = '<i data-lucide="chevron-right"></i>';

    next.disabled = currentPage === totalPages;

    next.addEventListener(
      "click",

      () => {
        if (currentPage < totalPages) {
          currentPage++;

          renderProducts();

          renderPagination();

          scrollToProducts();
        }
      },
    );

    pagination.appendChild(next);

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  /* ACTIVE FILTERS */

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
      document

        .querySelectorAll(selector)

        .forEach((input) => {
          const chip = document.createElement("div");

          chip.className = "filter-chip";
          /*SHOW THE QUANTITY OF INPUT*/
          chip.innerHTML = `
         
            ${input.value}

            <button

              type="button"

              aria-label="Remove filter"

            >

              ×

            </button>

          `;

          chip

            .querySelector("button")

            .addEventListener(
              "click",

              () => {
                /*EXIT THIS CHECKBOX FROM CHOOSEN SITUATION*/
                input.checked = false;

                applyFilters();
              },
            );
          /*PUT THIS CHIP INTO ACTIVEFILTERS*/
          activeFilters.appendChild(chip);
        });
    });
  }

  /* WISHLIST */

  function getWishlistKey() {
    const user = getCurrentUser();

    if (!user) {
      return null;
    }

    /*

      Wishlist will store separately for every logged-in user

    */

    return `${WISHLIST_KEY}_${user.id}`;
  }

  /* READ WISHLIST*/

  function getWishlist() {
    /*THIS TRY TO READ THE WISHLIST FROM CURRENT USER LOCALSTORAGE*/
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
      console.error(
        "Could not read wishlist:",

        error,
      );

      return [];
    }
  }

  /* SYNC WISHLIST WITH NAVBAR*/

  function syncWishlistWithNavbar(wishlist = getWishlist()) {
    try {
      /*

        Navbar can read this common key.

        The real user-specific Wishlist

        remains in eveBeautyWishlist_USER_ID.

      */

      localStorage.setItem(
        WISHLIST_KEY,

        JSON.stringify(wishlist),
      );
    } catch (error) {
      console.error(
        "Could not sync wishlist with navbar:",

        error,
      );
    }

    /* storage events do not fire in the

      same browser tab that changed localStorage.

      Therefore IT send our own event.

    */

    window.dispatchEvent(
      new CustomEvent(
        "eveBeautyWishlistUpdated",

        {
          detail: {
            wishlist: wishlist,

            count: wishlist.length,
          },
        },
      ),
    );
  }

  /*  SAVE WISHLIST*/

  function saveWishlist(wishlist) {
    const key = getWishlistKey();

    if (!key) {
      return false;
    }

    try {
      /*

        Main user-specific Wishlist

      */

      localStorage.setItem(
        key,

        JSON.stringify(wishlist),
      );

      /*

        Sync Navbar

      */

      syncWishlistWithNavbar(wishlist);

      return true;
    } catch (error) {
      console.error(
        "Could not save wishlist:",

        error,
      );

      return false;
    }
  }

  /*  UPDATE NAVBAR WISHLIST UI */

  function updateNavbarWishlistUI(wishlist = getWishlist()) {
    const count = wishlist.length;

    /*

      Main Navbar badge

    */

    const badgeSelectors = [
      "#favoritelistCount",

      "#wishlistCount",

      "#wishlistBadge",

      ".wishlist-count",

      ".wishlist-badge",

      "[data-wishlist-count]",
    ];

    badgeSelectors.forEach((selector) => {
      document

        .querySelectorAll(selector)

        .forEach((element) => {
          element.textContent = count;

          /*

              Keep badge visible even at zero

              if the original Navbar expects it.

            */

          element.style.display = "";
        });
    });

    /*

      Dropdown count

    */

    const dropdownCount = document.getElementById("wishlistDropdownCount");

    if (dropdownCount) {
      dropdownCount.textContent = count;
    }

    /*

      Dropdown list

    */

    const dropdownList = document.getElementById("wishlistDropdownList");

    const dropdownEmpty = document.getElementById("wishlistDropdownEmpty");

    if (!dropdownList) {
      return;
    }

    /*

      Empty Wishlist

    */
    dropdownList.innerHTML = "";

    if (wishlist.length === 0) {
      if (dropdownEmpty) {
        dropdownEmpty.style.display = "";
      }

      return;
    }

    /*

      Wishlist has products

    */

    if (dropdownEmpty) {
      dropdownEmpty.style.display = "none";
    }

    wishlist.forEach((item) => {
      const row = document.createElement("div");

      row.className = "quick-dropdown-item wishlist-dropdown-item";

      /*

        PRODUCT IMAGE

      */

      const imageWrapper = document.createElement("div");

      imageWrapper.className = "quick-dropdown-item-image";

      if (item.image) {
        const image = document.createElement("img");

        image.src = item.image;

        image.alt = item.name || "Wishlist product";

        image.loading = "lazy";

        image.onerror = () => {
          image.remove();

          imageWrapper.textContent = String(item.name || "P")
            .charAt(0)

            .toUpperCase();
        };
        /*PUT THE IMAGE ELEMENT INTO IMAGEWRAPPER*/
        imageWrapper.appendChild(image);
      } else {
        imageWrapper.textContent = String(item.name || "P")
          .charAt(0)

          .toUpperCase();
      }

      /*

        PRODUCT INFORMATION

      */

      const info = document.createElement("div");
      /*PUT THE NAME INTO INFO PLACE*/

      info.className = "quick-dropdown-item-info";

      const name = document.createElement("strong");

      name.textContent = item.name || "Product";

      info.appendChild(name);

      /*

        BRAND

      */

      if (item.brand) {
        const brand = document.createElement("small");

        brand.textContent = item.brand;

        info.appendChild(brand);
      }

      /*

        PRICE

      */
      /*IF THE PRICE DONT BE UNDEFINED AND NULL*/
      if (item.price !== undefined && item.price !== null) {
        const price = document.createElement("span");

        const numericPrice = Number(item.price);

        price.textContent = Number.isFinite(numericPrice)
          ? `$${numericPrice.toFixed(2)}`
          : String(item.price);

        info.appendChild(price);
      }

      row.appendChild(imageWrapper);

      row.appendChild(info);

      dropdownList.appendChild(row);
    });
  }

  /* TOGGLE WISHLIST */

  function toggleWishlist(productId) {
    const user = getCurrentUser();

    /*

      User must be logged in.

    */

    if (!user) {
      localStorage.setItem(
        "eveBeautyLoginRedirect",

        "shop.html",
      );

      alert("Please sign in first.");

      window.location.href = "login.html";

      return;
    }

    const wishlist = getWishlist();
    /*FINDING TNE FIRST PRODUCT INTO WISHLIST*/
    const index = wishlist.findIndex(
      (item) => Number(item.id) === Number(productId),
    );

    /*

      REMOVE

    */

    if (index !== -1) {
      wishlist.splice(index, 1);
    } else {
      /*

      ADD

    */
      const product = products.find(
        (item) => Number(item.id) === Number(productId),
      );

      if (!product) {
        console.error(
          "Wishlist product not found:",

          productId,
        );

        return;
      }

      /*THIS ADD AN ELEMENT IN THE END OF ARRAYS*/
      wishlist.push({
        id: product.id,

        name: product.name,

        brand: product.brand,

        price: product.price,

        image: product.image,

        category: product.category,

        addedAt: new Date().toISOString(),
      });
    }

    /*

      SAVE

    */

    const saved = saveWishlist(wishlist);

    if (!saved) {
      return;
    }

    /*

      Update product hearts

    */

    updateWishlistButtons();

    /*

      Update Navbar immediately

    */

    updateNavbarWishlistUI(wishlist);

    /*

      Send event again so Navbar

      can react immediately.

    */

    window.dispatchEvent(
      new CustomEvent(
        "eveBeautyWishlistUpdated",

        {
          detail: {
            wishlist: wishlist,

            count: wishlist.length,
          },
        },
      ),
    );

    console.log(
      "EVE BEAUTY WISHLIST UPDATED:",

      wishlist,
    );
  }

  /*  UPDATE WISHLIST BUTTONS */

  function updateWishlistButtons() {
    const wishlist = getWishlist();

    document

      .querySelectorAll(".wishlist-button")

      .forEach((button) => {
        const productId = Number(button.dataset.productId);

        const exists = wishlist.some((item) => Number(item.id) === productId);

        button.classList.toggle(
          "active",

          exists,
        );

        button.setAttribute(
          "aria-label",

          exists ? "Remove from wishlist" : "Add to wishlist",
        );

        button.setAttribute(
          "aria-pressed",

          exists ? "true" : "false",
        );
      });
  }

  /*  PRODUCT BUTTONS */

  function setupProductButtons() {
    if (!productsGrid) {
      return;
    }

    /*
    Remove the old click handler from productsGrid
    before adding a new one.

    This prevents duplicate events when products
    are rendered again after filtering/pagination.
  */
    if (productsGrid._eveBeautyClickHandler) {
      productsGrid.removeEventListener(
        "click",
        productsGrid._eveBeautyClickHandler,
      );
    }

    const clickHandler = (event) => {
      const wishlistButton = event.target.closest(".wishlist-button");

      if (wishlistButton && productsGrid.contains(wishlistButton)) {
        event.preventDefault();
        event.stopPropagation();

        const productId = Number(wishlistButton.dataset.productId);

        toggleWishlist(productId);

        return;
      }

      const cartButton = event.target.closest(".add-cart-button");

      if (cartButton && productsGrid.contains(cartButton)) {
        event.preventDefault();
        event.stopPropagation();

        const productId = Number(cartButton.dataset.productId);

        const exists = isProductInCart(productId);

        if (exists) {
          removeFromCart(productId);
        } else {
          addToCart(productId);
        }
      }
    };

    productsGrid._eveBeautyClickHandler = clickHandler;

    productsGrid.addEventListener("click", clickHandler);

    updateWishlistButtons();
    updateAllCartButtons();

    updateNavbarWishlistUI(getWishlist());
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
      input.addEventListener(
        "change",

        applyFilters,
      );
    });

  /* SORT EVENT*/

  if (sortSelect) {
    sortSelect.addEventListener(
      "change",

      () => {
        sortProducts();

        currentPage = 1;

        renderProducts();

        renderPagination();
      },
    );
  }

  /*  CLEAR FILTERS */

  if (clearFilters) {
    clearFilters.addEventListener(
      "click",

      () => {
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

        window.history.replaceState(
          {},

          "",

          cleanURL,
        );

        applyFilters();
      },
    );
  }

  /*FILTER GROUP COLLAPSE*/

  document

    .querySelectorAll("[data-filter-toggle]")

    .forEach((button) => {
      button.addEventListener(
        "click",

        () => {
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
        },
      );
    });

  /* MOBILE FILTER */

  if (mobileFilterButton) {
    mobileFilterButton.addEventListener(
      "click",

      () => {
        if (sidebar) {
          sidebar.classList.add("open");
        }
      },
    );
  }

  if (filterMobileClose) {
    filterMobileClose.addEventListener(
      "click",

      () => {
        if (sidebar) {
          sidebar.classList.remove("open");
        }
      },
    );
  }

  /* GRID / LIST VIEW */

  if (gridView) {
    gridView.addEventListener(
      "click",

      () => {
        currentView = "grid";

        if (productsGrid) {
          productsGrid.classList.remove("list-view");
        }

        gridView.classList.add("active");

        if (listView) {
          listView.classList.remove("active");
        }
      },
    );
  }

  if (listView) {
    listView.addEventListener(
      "click",

      () => {
        currentView = "list";

        if (productsGrid) {
          productsGrid.classList.add("list-view");
        }

        listView.classList.add("active");

        if (gridView) {
          gridView.classList.remove("active");
        }
      },
    );
  }

  /* CART UPDATE EVENT */

  window.addEventListener(
    "eveBeautyCartUpdated",

    () => {
      updateCartCounter();

      updateAllCartButtons();
    },
  );

  /* =========================================================

     WISHLIST UPDATE EVENT

  ========================================================= */

  window.addEventListener(
    "eveBeautyWishlistUpdated",
    /*THE INFO WILL FIND THE EVENT*/
    (event) => {
      const wishlist = event.detail?.wishlist || getWishlist();

      updateWishlistButtons();

      updateNavbarWishlistUI(wishlist);
    },
  );

  /* STORAGE EVENT*/

  window.addEventListener(
    "storage",

    (event) => {
      const currentUser = getCurrentUser();

      if (!currentUser) {
        return;
      }

      const userCartKey = `${CART_KEY}_${currentUser.id}`;

      const userWishlistKey = `${WISHLIST_KEY}_${currentUser.id}`;

      /*

        CART

      */

      if (
        event.key === userCartKey ||
        event.key === CART_KEY ||
        event.key === CART_CURRENT_USER_KEY
      ) {
        updateCartCounter();

        updateAllCartButtons();
      }

      /*

        WISHLIST

      */

      if (event.key === userWishlistKey || event.key === WISHLIST_KEY) {
        const wishlist = getWishlist();

        updateWishlistButtons();

        updateNavbarWishlistUI(wishlist);
      }
    },
  );

  /*  INITIALIZE*/
  /*FIRST CHECK ARE ANY URL INCLUDE IN CATEGORY OR NO*/

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

  /*

    Load saved Wishlist immediately.

  */

  updateWishlistButtons();

  updateNavbarWishlistUI(getWishlist());

  if (window.lucide) {
    lucide.createIcons();
  }

  /* GLOBAL DEBUG HELPERS */
  /*THIS MAKE AN OBJECT IN WINDOW*/
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

    getWishlist,

    saveWishlist,

    toggleWishlist,

    updateWishlistButtons,

    updateNavbarWishlistUI,

    products,
  };

  console.log("=================================");

  console.log("EVE BEAUTY SHOP READY");

  console.log(
    "Current User:",

    getCurrentUser(),
  );

  console.log(
    "Current Cart:",

    getCart(),
  );

  console.log(
    "Current Wishlist:",

    getWishlist(),
  );

  console.log("=================================");
});

/* ==========================================
   EVE BEAUTY - SHOP SCROLL ANIMATIONS
========================================== */

// Add animation styles only once
if (!document.getElementById("shop-scroll-animation-style")) {
  const style = document.createElement("style");

  style.id = "shop-scroll-animation-style";

  style.textContent = `
    .shop-scroll-reveal {
      opacity: 0;
      transform: translateY(30px);
      transition:
        opacity 0.7s ease,
        transform 0.7s ease;
      will-change: opacity, transform;
    }

    .shop-scroll-reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
      .shop-scroll-reveal {
        opacity: 1;
        transform: none;
        transition: none;
        will-change: auto;
      }
    }
  `;

  document.head.appendChild(style);
}

// Create the observer only when the browser supports it
const shopScrollObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");

              // Animate once and stop observing this element
              shopScrollObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -25px 0px",
        },
      )
    : null;

// Apply scroll animations to shop page elements
function setupShopScrollAnimations(root = document) {
  const revealSelectors = [
    // Main page areas
    "main > *",
    "main section",
    "main article",
    "main aside",

    // Shop introduction and headings
    "h1",
    "h2",
    "h3",
    ".breadcrumb",
    ".page-header",

    // Shop controls and filters
    "#shopSidebar",
    ".filter-group",
    "#mobileFilterButton",
    ".shop-toolbar",
    "#productsCount",
    "#sortSelect",
    "#gridView",
    "#listView",
    "#activeFilters",
    "#clearFilters",

    // Products and pagination
    "#productsGrid .product-card",
    "#productsGrid .no-products",
    "#shopPagination",

    // Common content sections
    ".shop-banner",
    ".shop-category-card",
    ".shop-newsletter",
    "footer > *",
  ];

  const elements = new Set();

  revealSelectors.forEach(function (selector) {
    root.querySelectorAll(selector).forEach(function (element) {
      elements.add(element);
    });
  });

  if (
    root instanceof Element &&
    revealSelectors.some(function (selector) {
      return root.matches(selector);
    })
  ) {
    elements.add(root);
  }

  elements.forEach(function (element, index) {
    if (element.classList.contains("shop-scroll-reveal")) {
      return;
    }

    element.classList.add("shop-scroll-reveal");

    element.style.transitionDelay = `${(index % 4) * 70}ms`;

    if (shopScrollObserver) {
      shopScrollObserver.observe(element);
    } else {
      element.classList.add("is-visible");
    }
  });
}

// Initialize animations after the page has loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    setupShopScrollAnimations();
  });
} else {
  setupShopScrollAnimations();
}
