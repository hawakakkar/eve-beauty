/* =========================================================
   EVE BEAUTY
   USER DATA SYSTEM
   Cart / Wishlist / Orders / Recently Viewed
========================================================= */

const EVE_USER_DATA_KEY = "eveBeautyUserData";
const EVE_CURRENT_USER_KEY = "eveBeautyCurrentUser";

/* =========================================================
   CURRENT USER
========================================================= */

function eveGetCurrentUser() {
  try {
    const user = localStorage.getItem(EVE_CURRENT_USER_KEY);

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  } catch (error) {
    console.error("Could not read current user:", error);

    return null;
  }
}

/* =========================================================
   ALL USER DATA
========================================================= */

function eveGetAllUserData() {
  try {
    const data = localStorage.getItem(EVE_USER_DATA_KEY);

    if (!data) {
      return {};
    }

    const parsed = JSON.parse(data);

    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.error("Could not read user data:", error);

    return {};
  }
}

function eveSaveAllUserData(data) {
  try {
    localStorage.setItem(EVE_USER_DATA_KEY, JSON.stringify(data));

    return true;
  } catch (error) {
    console.error("Could not save user data:", error);

    return false;
  }
}

/* =========================================================
   GET USER DATA
========================================================= */

function eveGetUserData(userId) {
  if (!userId) {
    return null;
  }

  const allData = eveGetAllUserData();

  if (!allData[userId]) {
    allData[userId] = {
      cart: [],
      wishlist: [],
      orders: [],
      recentlyViewed: [],
      addresses: [],
    };

    eveSaveAllUserData(allData);
  }

  return allData[userId];
}

/* =========================================================
   SAVE USER DATA
========================================================= */

function eveSaveUserData(userId, userData) {
  if (!userId) {
    return false;
  }

  const allData = eveGetAllUserData();

  allData[userId] = {
    cart: userData.cart || [],
    wishlist: userData.wishlist || [],
    orders: userData.orders || [],
    recentlyViewed: userData.recentlyViewed || [],
    addresses: userData.addresses || [],
  };

  return eveSaveAllUserData(allData);
}

/* =========================================================
   ADD TO CART
========================================================= */

function eveAddToCart(product, quantity = 1) {
  const user = eveGetCurrentUser();

  if (!user) {
    alert("Please login first.");

    localStorage.setItem("eveBeautyLoginRedirect", window.location.href);

    window.location.href = "login.html";

    return false;
  }

  const data = eveGetUserData(user.id);

  const existing = data.cart.find(
    (item) => Number(item.productId) === Number(product.id),
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    data.cart.push({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: quantity,
      addedAt: new Date().toISOString(),
    });
  }

  eveSaveUserData(user.id, data);

  return true;
}

/* =========================================================
   ADD TO WISHLIST
========================================================= */

function eveAddToWishlist(product) {
  const user = eveGetCurrentUser();

  if (!user) {
    alert("Please login first.");

    localStorage.setItem("eveBeautyLoginRedirect", window.location.href);

    window.location.href = "login.html";

    return false;
  }

  const data = eveGetUserData(user.id);

  const exists = data.wishlist.some(
    (item) => Number(item.productId) === Number(product.id),
  );

  if (!exists) {
    data.wishlist.push({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      addedAt: new Date().toISOString(),
    });
  }

  eveSaveUserData(user.id, data);

  return true;
}

/* =========================================================
   REMOVE WISHLIST
========================================================= */

function eveRemoveFromWishlist(productId) {
  const user = eveGetCurrentUser();

  if (!user) return;

  const data = eveGetUserData(user.id);

  data.wishlist = data.wishlist.filter(
    (item) => Number(item.productId) !== Number(productId),
  );

  eveSaveUserData(user.id, data);
}

/* =========================================================
   RECENTLY VIEWED
========================================================= */

function eveAddRecentlyViewed(product) {
  const user = eveGetCurrentUser();

  if (!user) {
    return;
  }

  const data = eveGetUserData(user.id);

  /*
    Remove old copy first.
  */

  data.recentlyViewed = data.recentlyViewed.filter(
    (item) => Number(item.productId) !== Number(product.id),
  );

  /*
    Add newest item to beginning.
  */

  data.recentlyViewed.unshift({
    productId: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    viewedAt: new Date().toISOString(),
  });

  /*
    Keep only latest 8 products.
  */

  data.recentlyViewed = data.recentlyViewed.slice(0, 8);

  eveSaveUserData(user.id, data);
}

/* =========================================================
   CREATE ORDER
========================================================= */

function eveCreateOrder(cartItems, total, status = "Processing") {
  const user = eveGetCurrentUser();

  if (!user) {
    alert("Please login first.");

    localStorage.setItem("eveBeautyLoginRedirect", window.location.href);

    window.location.href = "login.html";

    return null;
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return null;
  }

  const data = eveGetUserData(user.id);

  const order = {
    id: "EB-" + String(Date.now()).slice(-6),

    userId: user.id,

    items: cartItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      image: item.image,
      price: Number(item.price),
      quantity: Number(item.quantity || 1),
    })),

    total: Number(total),

    status: status,

    createdAt: new Date().toISOString(),
  };

  data.orders.unshift(order);

  /*
    After successful order,
    empty cart.
  */

  data.cart = [];

  eveSaveUserData(user.id, data);

  return order;
}
