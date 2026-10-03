/* =========================================================
   EVE BEAUTY — DASHBOARD

   Single Page Dashboard

   USER SYSTEM
   ---------------------------------------------------------
   New:
   eveBeautyCurrentUser

   Backward compatibility:
   eveBeautyUser
   eveBeautyLoggedIn

   PROFILE IMAGE
   ---------------------------------------------------------
   eveBeautyProfileImage_<user-id>

   DASHBOARD PAGES
   ---------------------------------------------------------
   dashboard
   orders
   wishlist
   addresses
   settings
   cart
   checkout

   SHOP
   ---------------------------------------------------------
   shop.html

   CART / CHECKOUT FLOW
   ---------------------------------------------------------
   Product
      ↓
   Add to Cart
      ↓
   eveBeautyCart
      ↓
   Cart
      ↓
   Checkout
      ├── Shipping Information
      ├── Payment Method
      │      ├── COD
      │      └── Card
      │             ↓
      │        Card Information
      │             ↓
      │        Demo Validation
      │             ↓
      │        Payment Successful
      │             ↓
      └──────── Place Order
                   ↓
            eveBeautyOrders
                   ↓
              Orders Page

   IMPORTANT
   ---------------------------------------------------------
   Full card number and CVV are NEVER saved to localStorage.
   Only payment status and cardLast4 are stored with the order.
========================================================= */

let cardPaymentVerified = false;

let currentCardLast4 = "";

/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initializeStorage();

  initializeNavigation();
  initializeUser();
  initializeDashboard();
  initializeSettings();
  initializeAddresses();
  initializeNotifications();
  initializeLogout();
  initializeSearch();
  initializeCart();
  initializeCheckout();

  refreshIcons();

  openDashboardPageFromURL();
});

/* =========================================================
   STORAGE
========================================================= */

function readStorage(key, fallback = []) {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error("Storage error:", key, error);

    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));

    return true;
  } catch (error) {
    console.error("Unable to save to localStorage:", key, error);

    alert("There was a problem saving your information. Please try again.");

    return false;
  }
}

function initializeStorage() {
  if (!localStorage.getItem("eveBeautyWishlist")) {
    writeStorage("eveBeautyWishlist", []);
  }

  if (!localStorage.getItem("eveBeautyCart")) {
    writeStorage("eveBeautyCart", []);
  }

  if (!localStorage.getItem("eveBeautyAddresses")) {
    writeStorage("eveBeautyAddresses", []);
  }

  if (!localStorage.getItem("eveBeautyOrders")) {
    writeStorage("eveBeautyOrders", []);
  }

  if (!localStorage.getItem("eveBeautyRecentlyViewed")) {
    writeStorage("eveBeautyRecentlyViewed", []);
  }
}

/* =========================================================
   NAVIGATION
========================================================= */

function initializeNavigation() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-page]");

    if (!button) {
      return;
    }

    event.preventDefault();

    const page = button.dataset.page;

    openPage(page);
  });
}

/* =========================================================
   OPEN DASHBOARD PAGE FROM URL
========================================================= */

function openDashboardPageFromURL() {
  const params = new URLSearchParams(window.location.search);

  const page = params.get("page");

  if (!page) {
    return;
  }

  const allowedPages = [
    "dashboard",
    "orders",
    "wishlist",
    "addresses",
    "settings",
    "cart",
    "checkout",
  ];

  if (!allowedPages.includes(page)) {
    return;
  }

  openPage(page);
}

/* =========================================================
   OPEN DASHBOARD PAGE
========================================================= */

function openPage(page) {
  if (!page) {
    return;
  }

  document.querySelectorAll(".dashboard-page").forEach((section) => {
    section.classList.remove("active-page");
  });

  const target = document.getElementById(`page-${page}`);

  if (!target) {
    console.warn(`Dashboard page not found: page-${page}`);

    return;
  }

  target.classList.add("active-page");

  document.querySelectorAll(".sidebar-link").forEach((link) => {
    link.classList.remove("active");

    if (link.dataset.page === page) {
      link.classList.add("active");
    }
  });

  if (page === "dashboard") {
    initializeDashboard();
  }

  if (page === "orders") {
    renderOrdersPage();
  }

  if (page === "wishlist") {
    renderWishlist();
  }

  if (page === "addresses") {
    renderAddresses();
  }

  if (page === "settings") {
    loadSettings();
  }

  if (page === "cart") {
    renderCart();
  }

  if (page === "checkout") {
    renderCheckout();
    initializeCardPaymentUI();
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  refreshIcons();
}
/* =========================================================
   CURRENT USER
========================================================= */

function getCurrentUser() {
  const currentUserData = localStorage.getItem("eveBeautyCurrentUser");

  if (currentUserData) {
    try {
      const user = JSON.parse(currentUserData);

      if (user && typeof user === "object") {
        return user;
      }
    } catch (error) {
      console.error("Invalid eveBeautyCurrentUser:", error);
    }
  }

  const oldUserData = localStorage.getItem("eveBeautyUser");

  const oldLoggedIn = localStorage.getItem("eveBeautyLoggedIn") === "true";

  if (oldLoggedIn && oldUserData) {
    try {
      const user = JSON.parse(oldUserData);

      if (user && typeof user === "object") {
        return user;
      }
    } catch (error) {
      console.error("Invalid eveBeautyUser:", error);
    }
  }

  return {
    name: "Beauty User",
    email: "beauty@example.com",
  };
}

/* =========================================================
   SAVE USER
========================================================= */

function saveUser(user) {
  if (!user || typeof user !== "object") {
    return;
  }

  const data = JSON.stringify(user);

  localStorage.setItem("eveBeautyCurrentUser", data);

  localStorage.setItem("eveBeautyUser", data);

  localStorage.setItem("eveBeautyLoggedIn", "true");

  window.dispatchEvent(new Event("eveBeautyUserChanged"));
}

/* =========================================================
   USER
========================================================= */

function initializeUser() {
  const user = getCurrentUser();

  const name = user.name || user.fullName || user.username || "Beauty User";

  const email = user.email || user.emailAddress || "beauty@example.com";

  const initial = String(name).trim().charAt(0).toUpperCase() || "U";

  setText("welcomeUserName", name);

  setText("dashboardProfileName", name);

  setText("dashboardProfileEmail", email);

  setText("dashboardProfileInitial", initial);

  setText("headerProfileInitial", initial);

  updateDashboardProfileImage();
}

/* =========================================================
   PER USER PROFILE IMAGE
========================================================= */

function getUserStorageId(user = getCurrentUser()) {
  if (!user || typeof user !== "object") {
    return "guest";
  }

  const identifier =
    user.id ||
    user.userId ||
    user.email ||
    user.emailAddress ||
    user.username ||
    user.name ||
    "guest";

  return String(identifier)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "_");
}

function getProfileImageStorageKey(user = getCurrentUser()) {
  return `eveBeautyProfileImage_${getUserStorageId(user)}`;
}

/* =========================================================
   PROFILE IMAGE
========================================================= */

function updateDashboardProfileImage() {
  const user = getCurrentUser();

  const imageKey = getProfileImageStorageKey(user);

  const image = localStorage.getItem(imageKey);

  const dashboardImage = document.getElementById("dashboardProfileImage");

  const dashboardInitial = document.getElementById("dashboardProfileInitial");

  const headerImage = document.getElementById("headerProfileImage");

  const headerInitial = document.getElementById("headerProfileInitial");

  if (image) {
    if (dashboardImage) {
      dashboardImage.src = image;

      dashboardImage.style.display = "block";
    }

    if (dashboardInitial) {
      dashboardInitial.style.display = "none";
    }

    if (headerImage) {
      headerImage.src = image;

      headerImage.style.display = "block";
    }

    if (headerInitial) {
      headerInitial.style.display = "none";
    }

    return;
  }

  if (dashboardImage) {
    dashboardImage.removeAttribute("src");

    dashboardImage.style.display = "none";
  }

  if (dashboardInitial) {
    dashboardInitial.style.display = "flex";
  }

  if (headerImage) {
    headerImage.removeAttribute("src");

    headerImage.style.display = "none";
  }

  if (headerInitial) {
    headerInitial.style.display = "flex";
  }
}

/* =========================================================
   DASHBOARD
========================================================= */

function initializeDashboard() {
  initializeUser();

  updateStatistics();

  renderRecentOrders();

  renderRecentlyViewed();
}

/* =========================================================
   STATISTICS
========================================================= */

function updateStatistics() {
  const orders = readStorage("eveBeautyOrders", []);

  const wishlist = readStorage("eveBeautyWishlist", []);

  const cart = readStorage("eveBeautyCart", []);

  const addresses = readStorage("eveBeautyAddresses", []);

  const cartCount = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)
    : 0;

  setText("totalOrders", Array.isArray(orders) ? orders.length : 0);

  setText("wishlistItems", Array.isArray(wishlist) ? wishlist.length : 0);

  setText("cartItems", cartCount);

  setText("savedAddresses", Array.isArray(addresses) ? addresses.length : 0);

  setText(
    "headerWishlistCount",
    formatCount(Array.isArray(wishlist) ? wishlist.length : 0),
  );

  setText("headerCartCount", formatCount(cartCount));
}

/* =========================================================
   RECENT ORDERS
========================================================= */

function renderRecentOrders() {
  const container = document.getElementById("recentOrders");

  const empty = document.getElementById("ordersEmpty");

  if (!container) {
    return;
  }

  const orders = readStorage("eveBeautyOrders", []);

  container.innerHTML = "";

  if (!Array.isArray(orders) || orders.length === 0) {
    if (empty) {
      empty.hidden = false;
    }

    return;
  }

  if (empty) {
    empty.hidden = true;
  }

  orders
    .slice()
    .sort(compareOrders)
    .slice(0, 5)
    .forEach((order) => {
      container.appendChild(createOrderRow(order));
    });

  refreshIcons();
}

/*=========================================================
   ORDERS PAGE
========================================================= */

function renderOrdersPage() {
  const container = document.getElementById("ordersPageList");

  const empty = document.getElementById("ordersPageEmpty");

  if (!container) {
    return;
  }

  const orders = readStorage("eveBeautyOrders", []);

  container.innerHTML = "";

  if (!Array.isArray(orders) || orders.length === 0) {
    if (empty) {
      empty.hidden = false;
    }

    return;
  }

  if (empty) {
    empty.hidden = true;
  }

  orders
    .slice()
    .sort(compareOrders)
    .forEach((order) => {
      container.appendChild(createLargeOrder(order));
    });

  refreshIcons();
}

function createLargeOrder(order) {
  const item = getFirstOrderItem(order);

  const product = item?.product || item || {};

  const name = getProductName(product);

  const image = getProductImage(product);

  const status = capitalizeWords(
    order.status || order.orderStatus || "Processing",
  );

  const total = getOrderTotal(order);

  const paymentMethod =
    order.paymentMethod === "card"
      ? "Card Payment"
      : order.paymentMethod === "cod"
        ? "Cash on Delivery"
        : "Not selected";

  const paymentStatus = order.paymentStatus || "Pending";

  const wrapper = document.createElement("div");

  wrapper.className = "dashboard-card order-page-card";

  wrapper.style.padding = "18px";

  wrapper.innerHTML = `
    <div style="
      display:flex;
      align-items:center;
      gap:15px;
      flex-wrap:wrap;
    ">

      <div class="order-product-image">
        ${
          image
            ? `
              <img
                src="${escapeHTML(image)}"
                alt="${escapeHTML(name)}"
              >
            `
            : `
              <i data-lucide="package"></i>
            `
        }
      </div>

      <div style="flex:1;min-width:180px">

        <strong>
          #${escapeHTML(String(order.orderNumber || order.id || "Order"))}
        </strong>

        <div class="order-meta">
          ${getOrderDate(order)}
          •
          ${escapeHTML(name)}
        </div>

        <div class="order-meta">
          Payment:
          ${escapeHTML(paymentMethod)}
        </div>

        <div class="order-meta">
          Payment Status:
          ${escapeHTML(capitalizeWords(paymentStatus))}
        </div>

      </div>

      <span
        class="order-status ${getStatusClass(status)}"
      >
        ${escapeHTML(status)}
      </span>

      <strong>
        ${formatCurrency(total)}
      </strong>

    </div>
  `;

  return wrapper;
}

/* =========================================================
   WISHLIST
========================================================= */

function renderWishlist() {
  const grid = document.getElementById("wishlistGrid");

  const empty = document.getElementById("wishlistEmpty");

  if (!grid) {
    return;
  }

  const wishlist = readStorage("eveBeautyWishlist", []);

  grid.innerHTML = "";

  if (!Array.isArray(wishlist) || wishlist.length === 0) {
    if (empty) {
      empty.style.display = "flex";
    }

    refreshIcons();

    return;
  }

  if (empty) {
    empty.style.display = "none";
  }

  wishlist.forEach((product) => {
    grid.appendChild(createProductCard(product, true));
  });

  refreshIcons();
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product, wishlistMode = false) {
  const card = document.createElement("article");

  card.className = "product-card";

  const name = getProductName(product);

  const image = getProductImage(product);

  const price = Number(product?.price ?? product?.salePrice ?? 0);

  const productId = getProductId(product);

  card.innerHTML = `
    <div class="product-card-image">

      ${
        image
          ? `
            <img
              src="${escapeHTML(image)}"
              alt="${escapeHTML(name)}"
            >
          `
          : `
            <i data-lucide="sparkles"></i>
          `
      }

    </div>

    <div class="product-card-body">

      <h3>
        ${escapeHTML(name)}
      </h3>

      <div class="product-price">
        ${formatCurrency(price)}
      </div>

      <div class="product-card-actions">

        ${
          wishlistMode
            ? `
              <button
                type="button"
                class="primary-button"
                data-action="cart"
                data-id="${escapeHTML(productId)}"
              >
                Add to Cart
              </button>

              <button
                type="button"
                class="remove-button"
                data-action="remove-wishlist"
                data-id="${escapeHTML(productId)}"
              >
                Remove
              </button>
            `
            : `
              <button
                type="button"
                class="primary-button"
                data-action="cart"
                data-id="${escapeHTML(productId)}"
              >
                Add to Cart
              </button>
            `
        }

      </div>

    </div>
  `;

  card.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");

    if (!actionButton) {
      return;
    }

    const action = actionButton.dataset.action;

    const id = actionButton.dataset.id;

    if (action === "remove-wishlist") {
      removeWishlist(id);
    }

    if (action === "cart") {
      addToCart(product);
    }
  });

  return card;
}

/* =========================================================
   WISHLIST ACTIONS
========================================================= */

function removeWishlist(id) {
  let wishlist = readStorage("eveBeautyWishlist", []);

  if (!Array.isArray(wishlist)) {
    wishlist = [];
  }

  wishlist = wishlist.filter((item) => getProductId(item) !== String(id));

  writeStorage("eveBeautyWishlist", wishlist);

  updateStatistics();

  renderWishlist();

  window.dispatchEvent(new Event("eveBeautyWishlistChanged"));
}

function addToWishlist(product) {
  let wishlist = readStorage("eveBeautyWishlist", []);

  if (!Array.isArray(wishlist)) {
    wishlist = [];
  }

  const id = getProductId(product);

  const exists = wishlist.some((item) => getProductId(item) === id);

  if (!exists) {
    wishlist.push(product);

    writeStorage("eveBeautyWishlist", wishlist);
  }

  updateStatistics();

  window.dispatchEvent(new Event("eveBeautyWishlistChanged"));
}

/* =========================================================
   CART
========================================================= */

function addToCart(product) {
  let cart = readStorage("eveBeautyCart", []);

  if (!Array.isArray(cart)) {
    cart = [];
  }

  const id = getProductId(product);

  const existing = cart.find((item) => getProductId(item) === id);

  if (existing) {
    existing.quantity = (Number(existing.quantity) || 1) + 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  writeStorage("eveBeautyCart", cart);

  updateStatistics();

  window.dispatchEvent(new Event("eveBeautyCartChanged"));

  alert("Product added to cart successfully.");
}

/* =========================================================
   CART SHIPPING
========================================================= */

function getCartShipping() {
  return 0;
}

/* =========================================================
   CART RENDER
========================================================= */

function renderCart() {
  const container = document.getElementById("cartPageList");

  const empty = document.getElementById("cartEmpty");

  const summary = document.getElementById("cartPageSummary");

  const subtotalElement = document.getElementById("cartSubtotal");

  const shippingElement = document.getElementById("cartShipping");

  const totalElement = document.getElementById("cartTotal");

  if (!container) {
    return;
  }

  const cart = readStorage("eveBeautyCart", []);

  container.innerHTML = "";

  if (!Array.isArray(cart) || cart.length === 0) {
    if (empty) {
      empty.hidden = false;
      empty.style.display = "flex";
    }

    if (summary) {
      summary.hidden = true;
    }

    refreshIcons();

    return;
  }

  if (empty) {
    empty.hidden = true;
    empty.style.display = "none";
  }

  if (summary) {
    summary.hidden = false;
  }

  let subtotal = 0;

  cart.forEach((item) => {
    const row = document.createElement("div");

    row.className = "cart-row";

    const image = getProductImage(item);

    const name = getProductName(item);

    const price =
      Number(item.price ?? item.salePrice ?? item.productPrice ?? 0) || 0;

    const quantity = Number(item.quantity) || 1;

    const itemTotal = price * quantity;

    subtotal += itemTotal;

    row.innerHTML = `
      <div class="cart-row-image">

        ${
          image
            ? `
              <img
                src="${escapeHTML(image)}"
                alt="${escapeHTML(name)}"
              >
            `
            : `
              <i data-lucide="sparkles"></i>
            `
        }

      </div>

      <div class="cart-row-info">
        <h3>
          ${escapeHTML(name)}
        </h3>

        <p>
          ${formatCurrency(price)}
        </p>
      </div>

      <div class="quantity-control">

        <button
          type="button"
          data-cart-action="minus"
          aria-label="Decrease quantity"
        >
          −
        </button>

        <span>
          ${quantity}
        </span>

        <button
          type="button"
          data-cart-action="plus"
          aria-label="Increase quantity"
        >
          +
        </button>

      </div>

      <strong class="cart-row-total">
        ${formatCurrency(itemTotal)}
      </strong>

      <button
        type="button"
        class="cart-remove-button"
        data-cart-action="remove"
        aria-label="Remove ${escapeHTML(name)}"
      >
        <i data-lucide="trash-2"></i>
      </button>
    `;

    row.querySelectorAll("[data-cart-action]").forEach((button) => {
      button.addEventListener("click", () => {
        changeCartQuantity(getProductId(item), button.dataset.cartAction);
      });
    });

    container.appendChild(row);
  });

  const shipping = getCartShipping();

  const total = subtotal + shipping;

  if (subtotalElement) {
    subtotalElement.textContent = formatCurrency(subtotal);
  }

  if (shippingElement) {
    shippingElement.textContent = formatCurrency(shipping);
  }

  if (totalElement) {
    totalElement.textContent = formatCurrency(total);
  }

  refreshIcons();
}

/* =========================================================
   CART QUANTITY
========================================================= */

function changeCartQuantity(id, action) {
  let cart = readStorage("eveBeautyCart", []);

  if (!Array.isArray(cart)) {
    cart = [];
  }

  const item = cart.find((product) => getProductId(product) === String(id));

  if (!item) {
    return;
  }

  let quantity = Number(item.quantity) || 1;

  if (action === "plus") {
    quantity++;
  }

  if (action === "minus") {
    quantity--;
  }

  if (action === "remove") {
    const index = cart.indexOf(item);

    if (index >= 0) {
      cart.splice(index, 1);
    }
  } else if (quantity <= 0) {
    const index = cart.indexOf(item);

    if (index >= 0) {
      cart.splice(index, 1);
    }
  } else {
    item.quantity = quantity;
  }

  writeStorage("eveBeautyCart", cart);

  updateStatistics();

  renderCart();

  window.dispatchEvent(new Event("eveBeautyCartChanged"));
}

/* =========================================================
   CART INITIALIZATION
========================================================= */

function initializeCart() {
  const checkoutButton = document.getElementById("proceedToCheckoutBtn");

  checkoutButton?.addEventListener("click", () => {
    const cart = readStorage("eveBeautyCart", []);

    if (!Array.isArray(cart) || cart.length === 0) {
      alert("Your cart is empty.");

      return;
    }

    openPage("checkout");
  });
}

/* =========================================================
   CHECKOUT INITIALIZATION
========================================================= */

function initializeCheckout() {
  const form = document.getElementById("checkoutForm");

  if (!form) {
    return;
  }

  form.addEventListener("submit", handleCheckoutSubmit);

  initializeCardPaymentUI();
}

/* =========================================================
   CARD PAYMENT UI
========================================================= */

function initializeCardPaymentUI() {
  const cardRadio = document.querySelector(
    'input[name="paymentMethod"][value="card"]',
  );

  const codRadio = document.querySelector(
    'input[name="paymentMethod"][value="cod"]',
  );

  const fields = document.getElementById("cardPaymentFields");

  const payButton = document.getElementById("payByCardBtn");

  const success = document.getElementById("cardPaymentSuccess");

  const message = document.getElementById("cardPaymentMessage");

  const placeOrderButton = document.getElementById("placeOrderBtn");

  const cardholderName = document.getElementById("cardholderName");

  const cardNumber = document.getElementById("cardNumber");

  const cardExpiry = document.getElementById("cardExpiry");

  const cardCvv = document.getElementById("cardCvv");

  const cardInputs = [cardholderName, cardNumber, cardExpiry, cardCvv].filter(
    Boolean,
  );

  if (!cardRadio && !codRadio) {
    return;
  }

  const resetVerification = () => {
    cardPaymentVerified = false;

    currentCardLast4 = "";

    if (success) {
      success.hidden = true;
    }

    if (message) {
      message.textContent = "";

      message.className = "card-payment-message";
    }

    if (payButton) {
      payButton.disabled = false;

      payButton.innerHTML = `
          <i data-lucide="credit-card"></i>
          Pay by Card
        `;
    }

    refreshIcons();
  };

  const updatePaymentUI = () => {
    const cardSelected = Boolean(cardRadio?.checked);

    if (fields) {
      fields.hidden = !cardSelected;
    }

    cardInputs.forEach((input) => {
      input.disabled = !cardSelected;

      input.required = cardSelected;
    });

    if (!cardSelected) {
      resetVerification();

      if (placeOrderButton) {
        placeOrderButton.disabled = false;
      }

      return;
    }

    resetVerification();

    if (placeOrderButton) {
      placeOrderButton.disabled = true;
    }
  };

  cardRadio?.addEventListener("change", updatePaymentUI);

  codRadio?.addEventListener("change", updatePaymentUI);

  payButton?.addEventListener("click", processDemoCardPayment);

  /* =====================================================
     CARD NUMBER FORMAT
  ====================================================== */

  cardNumber?.addEventListener("input", () => {
    const digits = cardNumber.value.replace(/\D/g, "").slice(0, 16);

    cardNumber.value = digits.replace(/(.{4})/g, "$1 ").trim();

    resetVerification();

    if (placeOrderButton) {
      placeOrderButton.disabled = true;
    }
  });

  /* =====================================================
     EXPIRY FORMAT
  ====================================================== */

  cardExpiry?.addEventListener("input", () => {
    const digits = cardExpiry.value.replace(/\D/g, "").slice(0, 4);

    cardExpiry.value =
      digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;

    resetVerification();

    if (placeOrderButton) {
      placeOrderButton.disabled = true;
    }
  });

  /* =====================================================
     CVV
  ====================================================== */

  cardCvv?.addEventListener("input", () => {
    cardCvv.value = cardCvv.value.replace(/\D/g, "").slice(0, 4);

    resetVerification();

    if (placeOrderButton) {
      placeOrderButton.disabled = true;
    }
  });

  cardholderName?.addEventListener("input", () => {
    resetVerification();

    if (placeOrderButton) {
      placeOrderButton.disabled = true;
    }
  });

  updatePaymentUI();
}

/* =========================================================
   DEMO CARD PAYMENT
========================================================= */

function processDemoCardPayment() {
  const cardholderName = document.getElementById("cardholderName");

  const cardNumber = document.getElementById("cardNumber");

  const cardExpiry = document.getElementById("cardExpiry");

  const cardCvv = document.getElementById("cardCvv");

  const success = document.getElementById("cardPaymentSuccess");

  const message = document.getElementById("cardPaymentMessage");

  const payButton = document.getElementById("payByCardBtn");

  const placeOrderButton = document.getElementById("placeOrderBtn");

  const validation = validateCardDetails(
    cardholderName?.value,
    cardNumber?.value,
    cardExpiry?.value,
    cardCvv?.value,
  );

  if (!validation.valid) {
    cardPaymentVerified = false;

    currentCardLast4 = "";

    if (success) {
      success.hidden = true;
    }

    if (message) {
      message.textContent = validation.message;

      message.className = "card-payment-message error";
    }

    if (placeOrderButton) {
      placeOrderButton.disabled = true;
    }

    return;
  }

  /* =====================================================
     PAYMENT SUCCESS
  ====================================================== */

  cardPaymentVerified = true;

  const cardDigits = String(cardNumber?.value || "").replace(/\D/g, "");

  currentCardLast4 = cardDigits.slice(-4);

  if (message) {
    message.textContent = "Card information verified successfully.";

    message.className = "card-payment-message";
  }

  if (success) {
    success.hidden = false;

    success.textContent = "Payment Successful";
  }

  if (payButton) {
    payButton.disabled = true;

    payButton.innerHTML = `
      <i data-lucide="check-circle"></i>
      Payment Successful
    `;
  }

  if (placeOrderButton) {
    placeOrderButton.disabled = false;
  }

  refreshIcons();
}

/* =========================================================
   CARD VALIDATION
========================================================= */

function validateCardDetails(name, number, expiry, cvv) {
  const cardholder = String(name || "").trim();

  if (!cardholder || cardholder.length < 2) {
    return {
      valid: false,
      message: "Please enter the cardholder name.",
    };
  }

  const digits = String(number || "").replace(/\D/g, "");

  if (digits.length !== 16) {
    return {
      valid: false,
      message: "Please enter a valid 16-digit card number.",
    };
  }

  if (!passesLuhn(digits)) {
    return {
      valid: false,
      message: "Please enter a valid card number.",
    };
  }

  const expiryMatch = String(expiry || "").match(/^(\d{2})\/(\d{2})$/);

  if (!expiryMatch) {
    return {
      valid: false,
      message: "Please enter the expiry date as MM/YY.",
    };
  }

  const month = Number(expiryMatch[1]);

  const year = 2000 + Number(expiryMatch[2]);

  if (month < 1 || month > 12) {
    return {
      valid: false,
      message: "Please enter a valid expiry month.",
    };
  }

  /*
    Last day of selected expiry month.
  */

  const expiryDate = new Date(year, month, 0, 23, 59, 59, 999);

  const now = new Date();

  if (expiryDate < now) {
    return {
      valid: false,
      message: "This card is expired.",
    };
  }

  if (!/^\d{3,4}$/.test(String(cvv || ""))) {
    return {
      valid: false,
      message: "Please enter a valid 3 or 4 digit CVV.",
    };
  }

  return {
    valid: true,
    message: "Card information is valid.",
  };
}

/* =========================================================
   LUHN CHECK
========================================================= */

function passesLuhn(number) {
  let sum = 0;

  let shouldDouble = false;

  for (let i = number.length - 1; i >= 0; i--) {
    let digit = Number(number[i]);

    if (shouldDouble) {
      digit *= 2;

      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;

    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

/* =========================================================
   RENDER CHECKOUT
========================================================= */

function renderCheckout() {
  const itemsContainer = document.getElementById("checkoutOrderItems");

  if (!itemsContainer) {
    return;
  }

  const cart = readStorage("eveBeautyCart", []);

  if (!Array.isArray(cart) || cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="empty-checkout">
        <i data-lucide="shopping-cart"></i>

        <p>Your cart is empty.</p>
      </div>
    `;

    updateCheckoutTotals(0, 0);

    refreshIcons();

    return;
  }

  itemsContainer.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item) => {
    const quantity = Number(item.quantity) || 1;

    const price =
      Number(item.price ?? item.salePrice ?? item.productPrice ?? 0) || 0;

    const itemTotal = price * quantity;

    subtotal += itemTotal;

    const productName = getProductName(item);

    const productImage = getProductImage(item);

    const itemElement = document.createElement("div");

    itemElement.className = "checkout-order-item";

    itemElement.innerHTML = `
      <div class="checkout-order-item-image">
        ${
          productImage
            ? `
              <img
                src="${escapeHTML(productImage)}"
                alt="${escapeHTML(productName)}"
              >
            `
            : `
              <i data-lucide="image"></i>
            `
        }
      </div>

      <div class="checkout-order-item-info">
        <h3>
          ${escapeHTML(productName)}
        </h3>

        <p>
          Qty: ${quantity}
        </p>
      </div>

      <strong>
        ${formatCurrency(itemTotal)}
      </strong>
    `;

    itemsContainer.appendChild(itemElement);
  });

  const shipping = getCartShipping();

  updateCheckoutTotals(subtotal, shipping);

  fillCheckoutUserData();

  fillCheckoutDefaultAddress();

  refreshIcons();
}

/* =========================================================
   CHECKOUT TOTALS
========================================================= */

function updateCheckoutTotals(subtotal, shipping) {
  const total = subtotal + shipping;

  const subtotalElement = document.getElementById("checkoutSubtotal");

  const shippingElement = document.getElementById("checkoutShipping");

  const totalElement = document.getElementById("checkoutTotal");

  if (subtotalElement) {
    subtotalElement.textContent = formatCurrency(subtotal);
  }

  if (shippingElement) {
    shippingElement.textContent = formatCurrency(shipping);
  }

  if (totalElement) {
    totalElement.textContent = formatCurrency(total);
  }
}

/* =========================================================
   CHECKOUT USER DATA
========================================================= */

function fillCheckoutUserData() {
  const user = getCurrentUser();

  if (!user) {
    return;
  }

  const firstName = document.getElementById("checkoutFirstName");

  const lastName = document.getElementById("checkoutLastName");

  const email = document.getElementById("checkoutEmail");

  const phone = document.getElementById("checkoutPhone");

  const fullName = user.name || user.fullName || user.username || "";

  const nameParts = String(fullName).trim().split(/\s+/).filter(Boolean);

  if (firstName && !firstName.value) {
    firstName.value = user.firstName || user.firstname || nameParts[0] || "";
  }

  if (lastName && !lastName.value) {
    lastName.value =
      user.lastName || user.lastname || nameParts.slice(1).join(" ") || "";
  }

  if (email && !email.value) {
    email.value = user.email || user.emailAddress || "";
  }

  if (phone && !phone.value) {
    phone.value = user.phone || user.phoneNumber || "";
  }
}

/* =========================================================
   CHECKOUT DEFAULT ADDRESS
========================================================= */

function fillCheckoutDefaultAddress() {
  const addresses = readStorage("eveBeautyAddresses", []);

  if (!Array.isArray(addresses) || addresses.length === 0) {
    return;
  }

  const defaultAddress =
    addresses.find((address) => address.default === true) || addresses[0];

  if (!defaultAddress) {
    return;
  }

  const addressInput = document.getElementById("checkoutAddress");

  const cityInput = document.getElementById("checkoutCity");

  if (addressInput && !addressInput.value) {
    addressInput.value = defaultAddress.address || "";
  }

  if (cityInput && !cityInput.value) {
    cityInput.value = defaultAddress.city || "";
  }

  const phoneInput = document.getElementById("checkoutPhone");

  if (phoneInput && !phoneInput.value) {
    phoneInput.value = defaultAddress.phone || "";
  }
}

/* =========================================================
   PLACE ORDER
========================================================= */

function handleCheckoutSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;

  const cart = readStorage("eveBeautyCart", []);

  if (!Array.isArray(cart) || cart.length === 0) {
    alert("Your cart is empty.");

    openPage("cart");

    return;
  }

  const formData = new FormData(form);

  const paymentMethod = formData.get("paymentMethod");

  if (!paymentMethod) {
    alert("Please select a payment method.");

    return;
  }

  /* =====================================================
     CARD MUST BE PAID FIRST
  ====================================================== */

  if (paymentMethod === "card" && !cardPaymentVerified) {
    alert(
      "Please enter valid card information and complete the card payment first.",
    );

    const cardFields = document.getElementById("cardPaymentFields");

    cardFields?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    return;
  }

  let orders = readStorage("eveBeautyOrders", []);

  if (!Array.isArray(orders)) {
    orders = [];
  }

  const subtotal = cart.reduce((total, item) => {
    const price =
      Number(item.price ?? item.salePrice ?? item.productPrice ?? 0) || 0;

    const quantity = Number(item.quantity) || 1;

    return total + price * quantity;
  }, 0);

  const shipping = getCartShipping();

  const total = subtotal + shipping;

  const now = new Date();

  const timestamp = now.getTime();

  const orderNumber = `EVB-${timestamp}`;

  /* =====================================================
     PAYMENT DATA
  ====================================================== */

  let paymentStatus = "Pending";

  let cardLast4 = null;

  let paymentVerifiedAt = null;

  if (paymentMethod === "card") {
    paymentStatus = "Paid";

    cardLast4 = currentCardLast4 || null;

    paymentVerifiedAt = now.toISOString();
  }

  /* =====================================================
     ORDER OBJECT
  ====================================================== */

  const order = {
    id: `order_${timestamp}`,

    orderNumber,

    items: cart.map((item) => ({
      ...item,

      quantity: Number(item.quantity) || 1,

      price:
        Number(item.price ?? item.salePrice ?? item.productPrice ?? 0) || 0,
    })),

    subtotal,

    shipping,

    total,

    status: "Processing",

    paymentMethod,

    paymentStatus,

    paymentVerifiedAt,

    /*
      Only the last 4 digits are saved.
      Full card number and CVV are NEVER saved.
    */

    cardLast4,

    customer: {
      firstName: String(formData.get("firstName") || "").trim(),

      lastName: String(formData.get("lastName") || "").trim(),

      email: String(formData.get("email") || "").trim(),

      phone: String(formData.get("phone") || "").trim(),

      address: String(formData.get("address") || "").trim(),

      city: String(formData.get("city") || "").trim(),

      country: String(formData.get("country") || "").trim(),
    },

    createdAt: now.toISOString(),
  };

  /* =====================================================
     SAVE ORDER TO LOCAL STORAGE
  ====================================================== */

  orders.push(order);

  const saved = writeStorage("eveBeautyOrders", orders);

  if (!saved) {
    return;
  }

  /* =====================================================
     CLEAR CART
  ====================================================== */

  writeStorage("eveBeautyCart", []);

  /* =====================================================
     RESET CARD PAYMENT STATE
  ====================================================== */

  cardPaymentVerified = false;

  currentCardLast4 = "";

  /* =====================================================
     SYNC
  ====================================================== */

  window.dispatchEvent(new Event("eveBeautyCartChanged"));

  window.dispatchEvent(new Event("eveBeautyOrderChanged"));

  /* =====================================================
     SUCCESS
  ====================================================== */

  alert(`Order placed successfully!\n\nOrder Number: ${orderNumber}`);

  openPage("orders");
}

/* =========================================================
   ADDRESSES
========================================================= */

function initializeAddresses() {
  document
    .getElementById("addAddressButton")
    ?.addEventListener("click", () => openAddressModal());

  document
    .getElementById("emptyAddAddress")
    ?.addEventListener("click", () => openAddressModal());

  document
    .getElementById("closeAddressModal")
    ?.addEventListener("click", closeAddressModal);

  document
    .getElementById("cancelAddress")
    ?.addEventListener("click", closeAddressModal);

  document
    .getElementById("addressForm")
    ?.addEventListener("submit", saveAddress);
}

function renderAddresses() {
  const grid = document.getElementById("addressesGrid");

  const empty = document.getElementById("addressesEmpty");

  if (!grid) {
    return;
  }

  const addresses = readStorage("eveBeautyAddresses", []);

  grid.innerHTML = "";

  if (!Array.isArray(addresses) || addresses.length === 0) {
    if (empty) {
      empty.style.display = "flex";
    }

    return;
  }

  if (empty) {
    empty.style.display = "none";
  }

  addresses.forEach((address) => {
    const card = document.createElement("article");

    card.className = "address-card";

    if (address.default) {
      card.classList.add("default-address");
    }

    card.innerHTML = `
        ${address.default ? `<span class="default-label">Default</span>` : ""}

        <h3>
          ${escapeHTML(address.name)}
        </h3>

        <p>
          ${escapeHTML(address.phone)}
          <br>
          ${escapeHTML(address.city)}
          <br>
          ${escapeHTML(address.address)}
        </p>

        <div class="address-actions">

          <button
            type="button"
            data-edit-address="${escapeHTML(address.id)}"
          >
            Edit
          </button>

          <button
            type="button"
            data-delete-address="${escapeHTML(address.id)}"
          >
            Delete
          </button>

          ${
            !address.default
              ? `
                <button
                  type="button"
                  data-default-address="${escapeHTML(address.id)}"
                >
                  Default
                </button>
              `
              : ""
          }

        </div>
      `;

    card
      .querySelector("[data-edit-address]")
      ?.addEventListener("click", () => openAddressModal(address));

    card
      .querySelector("[data-delete-address]")
      ?.addEventListener("click", () => deleteAddress(address.id));

    card
      .querySelector("[data-default-address]")
      ?.addEventListener("click", () => setDefaultAddress(address.id));

    grid.appendChild(card);
  });
}

function openAddressModal(address = null) {
  const modal = document.getElementById("addressModal");

  if (!modal) {
    return;
  }

  modal.classList.add("open");

  setText("addressModalTitle", address ? "Edit Address" : "Add Address");

  const id = document.getElementById("addressId");

  const name = document.getElementById("addressName");

  const phone = document.getElementById("addressPhone");

  const city = document.getElementById("addressCity");

  const text = document.getElementById("addressText");

  const defaultInput = document.getElementById("addressDefault");

  if (id) {
    id.value = address?.id || "";
  }

  if (name) {
    name.value = address?.name || "";
  }

  if (phone) {
    phone.value = address?.phone || "";
  }

  if (city) {
    city.value = address?.city || "";
  }

  if (text) {
    text.value = address?.address || "";
  }

  if (defaultInput) {
    defaultInput.checked = Boolean(address?.default);
  }
}

function closeAddressModal() {
  const modal = document.getElementById("addressModal");

  modal?.classList.remove("open");
}

function saveAddress(event) {
  event.preventDefault();

  let addresses = readStorage("eveBeautyAddresses", []);

  const id =
    document.getElementById("addressId").value || Date.now().toString();

  const address = {
    id,

    name: document.getElementById("addressName").value.trim(),

    phone: document.getElementById("addressPhone").value.trim(),

    city: document.getElementById("addressCity").value.trim(),

    address: document.getElementById("addressText").value.trim(),

    default: document.getElementById("addressDefault").checked,
  };

  if (address.default) {
    addresses.forEach((item) => {
      item.default = false;
    });
  }

  const existingIndex = addresses.findIndex(
    (item) => String(item.id) === String(id),
  );

  if (existingIndex >= 0) {
    addresses[existingIndex] = address;
  } else {
    addresses.push(address);
  }

  writeStorage("eveBeautyAddresses", addresses);

  closeAddressModal();

  renderAddresses();

  updateStatistics();
}

function deleteAddress(id) {
  if (!confirm("Delete this address?")) {
    return;
  }

  let addresses = readStorage("eveBeautyAddresses", []);

  addresses = addresses.filter((item) => String(item.id) !== String(id));

  writeStorage("eveBeautyAddresses", addresses);

  renderAddresses();

  updateStatistics();
}

function setDefaultAddress(id) {
  const addresses = readStorage("eveBeautyAddresses", []);

  addresses.forEach((item) => {
    item.default = String(item.id) === String(id);
  });

  writeStorage("eveBeautyAddresses", addresses);

  renderAddresses();
}

/* =========================================================
   SETTINGS
========================================================= */

function initializeSettings() {
  document
    .getElementById("profileForm")
    ?.addEventListener("submit", saveProfile);

  document
    .getElementById("profileImageInput")
    ?.addEventListener("change", handleProfileImage);

  document
    .getElementById("removeProfileImage")
    ?.addEventListener("click", removeProfileImage);
}

function loadSettings() {
  const user = getCurrentUser();

  const nameInput = document.getElementById("settingsName");

  const emailInput = document.getElementById("settingsEmail");

  if (nameInput) {
    nameInput.value = user.name || user.fullName || user.username || "";
  }

  if (emailInput) {
    emailInput.value = user.email || user.emailAddress || "";
  }

  renderSettingsPhoto();
}

function saveProfile(event) {
  event.preventDefault();

  const user = getCurrentUser();

  user.name = document.getElementById("settingsName").value.trim();

  user.email = document.getElementById("settingsEmail").value.trim();

  saveUser(user);

  initializeUser();

  renderSettingsPhoto();

  alert("Profile updated successfully.");
}

/* =========================================================
   PROFILE IMAGE
========================================================= */

function handleProfileImage(event) {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    alert("Please select an image.");

    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const user = getCurrentUser();

    const imageKey = getProfileImageStorageKey(user);

    localStorage.setItem(imageKey, reader.result);

    initializeUser();

    renderSettingsPhoto();

    window.dispatchEvent(new Event("eveBeautyUserChanged"));
  };

  reader.readAsDataURL(file);
}

function renderSettingsPhoto() {
  const preview = document.getElementById("settingsPhotoPreview");

  if (!preview) {
    return;
  }

  const user = getCurrentUser();

  const initial = String(user.name || user.fullName || user.username || "U")
    .trim()
    .charAt(0)
    .toUpperCase();

  const imageKey = getProfileImageStorageKey(user);

  const image = localStorage.getItem(imageKey);

  if (image) {
    preview.textContent = "";

    preview.style.backgroundImage = `url("${image}")`;

    preview.style.backgroundSize = "cover";

    preview.style.backgroundPosition = "center";

    preview.style.backgroundRepeat = "no-repeat";
  } else {
    preview.style.backgroundImage = "none";

    preview.style.backgroundSize = "";

    preview.style.backgroundPosition = "";

    preview.style.backgroundRepeat = "";

    preview.textContent = initial || "U";
  }
}

function removeProfileImage() {
  const user = getCurrentUser();

  const imageKey = getProfileImageStorageKey(user);

  localStorage.removeItem(imageKey);

  initializeUser();

  renderSettingsPhoto();

  window.dispatchEvent(new Event("eveBeautyUserChanged"));
}

/* =========================================================
   RECENTLY VIEWED
========================================================= */

function renderRecentlyViewed() {
  const container = document.getElementById("recentlyViewed");

  const empty = document.getElementById("recentlyViewedEmpty");

  if (!container) {
    return;
  }

  const products = readStorage("eveBeautyRecentlyViewed", []);

  container.innerHTML = "";

  if (!Array.isArray(products) || products.length === 0) {
    if (empty) {
      empty.style.display = "block";
    }

    return;
  }

  if (empty) {
    empty.style.display = "none";
  }

  products.slice(0, 4).forEach((product) => {
    const button = document.createElement("button");

    button.className = "viewed-product";

    const image = getProductImage(product);

    const name = getProductName(product);

    const price = Number(product.price || product.salePrice || 0);

    button.innerHTML = `
          <div class="viewed-product-image">

            ${
              image
                ? `
                  <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(name)}"
                  >
                `
                : `
                  <i data-lucide="sparkles"></i>
                `
            }

          </div>

          <span class="viewed-product-name">
            ${escapeHTML(name)}
          </span>

          <span class="viewed-product-price">
            ${formatCurrency(price)}
          </span>
        `;

    button.addEventListener("click", () => {
      window.location.href = "shop.html";
    });

    container.appendChild(button);
  });

  refreshIcons();
}

/* =========================================================
   SEARCH
========================================================= */

function initializeSearch() {
  const input = document.getElementById("dashboardSearch");

  input?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }

    const value = input.value.trim();

    if (!value) {
      window.location.href = "shop.html";

      return;
    }

    const search = encodeURIComponent(value);

    window.location.href = `shop.html?search=${search}`;
  });
}

/* =========================================================
   NOTIFICATIONS
========================================================= */

function initializeNotifications() {
  const button = document.getElementById("notificationButton");

  const panel = document.getElementById("notificationPanel");

  const close = document.getElementById("closeNotifications");

  button?.addEventListener("click", () => {
    panel?.classList.toggle("open");
  });

  close?.addEventListener("click", () => {
    panel?.classList.remove("open");
  });
}

/* =========================================================
   LOGOUT
========================================================= */

function initializeLogout() {
  const logoutButton = document.getElementById("logoutButton");

  if (!logoutButton) {
    return;
  }

  logoutButton.addEventListener("click", () => {
    if (!confirm("Are you sure you want to logout?")) {
      return;
    }

    localStorage.removeItem("eveBeautyCurrentUser");

    localStorage.removeItem("eveBeautyLoggedIn");

    localStorage.removeItem("eveBeautyUser");

    window.dispatchEvent(new Event("eveBeautyUserChanged"));

    window.location.href = "index.html";
  });
}

/* =========================================================
   HELPERS
========================================================= */

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = String(value);
  }
}

function formatCount(value) {
  const number = Number(value) || 0;

  return number > 99 ? "99+" : String(number);
}

function formatCurrency(value) {
  const number = Number(value) || 0;

  return "$" + number.toFixed(2);
}

function getProductId(product) {
  return String(
    product?.id || product?.productId || product?._id || product?.sku || "",
  );
}

function getProductName(product) {
  if (!product) {
    return "Beauty Product";
  }

  if (product.product && typeof product.product === "object") {
    return getProductName(product.product);
  }

  return (
    product.name || product.productName || product.title || "Beauty Product"
  );
}

function getProductImage(product) {
  if (!product) {
    return "";
  }

  if (product.product && typeof product.product === "object") {
    return getProductImage(product.product);
  }

  return (
    product.image ||
    product.imageUrl ||
    product.img ||
    product.thumbnail ||
    product.thumbnailUrl ||
    ""
  );
}

function getFirstOrderItem(order) {
  if (!order) {
    return {};
  }

  const arrays = [
    order.items,
    order.products,
    order.orderItems,
    order.cartItems,
    order.lineItems,
  ];

  for (const list of arrays) {
    if (Array.isArray(list) && list.length) {
      return list[0];
    }
  }

  if (order.product) {
    return {
      product: order.product,

      quantity: order.quantity || 1,
    };
  }

  return {};
}

function getOrderTotal(order) {
  const direct =
    order.total ?? order.grandTotal ?? order.orderTotal ?? order.amount;

  if (direct !== undefined && direct !== null) {
    return Number(String(direct).replace(/[^0-9.-]/g, "")) || 0;
  }

  const items = order.items || order.products || [];

  if (!Array.isArray(items)) {
    return 0;
  }

  return items.reduce((total, item) => {
    const price = Number(
      item.price || item.salePrice || item.productPrice || 0,
    );

    const quantity = Number(item.quantity) || 1;

    return total + price * quantity;
  }, 0);
}

function getOrderDate(order) {
  const value =
    order.date ||
    order.orderDate ||
    order.createdAt ||
    order.createdDate ||
    order.timestamp;

  if (!value) {
    return "Date unavailable";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function compareOrders(a, b) {
  const dateA = new Date(
    a?.createdAt || a?.date || a?.orderDate || 0,
  ).getTime();

  const dateB = new Date(
    b?.createdAt || b?.date || b?.orderDate || 0,
  ).getTime();

  return dateB - dateA;
}

function getStatusClass(status) {
  const value = String(status).toLowerCase();

  if (value.includes("deliver")) {
    return "status-delivered";
  }

  if (value.includes("ship")) {
    return "status-shipped";
  }

  if (value.includes("cancel")) {
    return "status-cancelled";
  }

  if (value.includes("process")) {
    return "status-processing";
  }

  return "status-pending";
}

function capitalizeWords(value) {
  return String(value)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function createOrderRow(order) {
  const row = document.createElement("div");

  row.className = "order-row";

  const item = getFirstOrderItem(order);

  const product = item?.product || item || {};

  const image = getProductImage(product);

  const name = getProductName(product);

  const status = capitalizeWords(
    order.status || order.orderStatus || "Processing",
  );

  const orderNumber = order.orderNumber || order.orderId || order.id || "Order";

  const quantity = Number(item.quantity) || 1;

  const paymentStatus = order.paymentStatus || "Pending";

  row.innerHTML = `
    <div class="order-product-image">

      ${
        image
          ? `
            <img
              src="${escapeHTML(image)}"
              alt="${escapeHTML(name)}"
            >
          `
          : `
            <i data-lucide="package"></i>
          `
      }

    </div>

    <div class="order-information">

      <span class="order-number">
        #${escapeHTML(String(orderNumber))}
      </span>

      <div class="order-meta">

        ${getOrderDate(order)}

        <span>•</span>

        ${quantity}

        ${quantity === 1 ? "item" : "items"}

      </div>

      <div class="order-product-name">
        ${escapeHTML(name)}
      </div>

      <div class="order-meta">
        Payment:
        ${escapeHTML(capitalizeWords(paymentStatus))}
      </div>

    </div>

    <span
      class="order-status ${getStatusClass(status)}"
    >
      ${escapeHTML(status)}
    </span>

    <strong class="order-total">
      ${formatCurrency(getOrderTotal(order))}
    </strong>

    <span class="order-arrow">
      <i data-lucide="chevron-right"></i>
    </span>
  `;

  return row;
}

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   LUCIDE
========================================================= */

function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

/* =========================================================
   CROSS-SCRIPT USER SYNC
========================================================= */

window.addEventListener("eveBeautyUserChanged", () => {
  initializeUser();

  updateStatistics();

  if (
    document.getElementById("page-settings")?.classList.contains("active-page")
  ) {
    loadSettings();
  }

  renderSettingsPhoto();

  refreshIcons();
});

/* =========================================================
   CROSS-SCRIPT CART SYNC
========================================================= */

window.addEventListener("eveBeautyCartChanged", () => {
  updateStatistics();

  if (document.getElementById("page-cart")?.classList.contains("active-page")) {
    renderCart();
  }

  if (
    document.getElementById("page-checkout")?.classList.contains("active-page")
  ) {
    renderCheckout();
  }
});

/* =========================================================
   CROSS-SCRIPT WISHLIST SYNC
========================================================= */

window.addEventListener("eveBeautyWishlistChanged", () => {
  updateStatistics();

  if (
    document.getElementById("page-wishlist")?.classList.contains("active-page")
  ) {
    renderWishlist();
  }
});

/* =========================================================
   CROSS-SCRIPT ORDER SYNC
========================================================= */

window.addEventListener("eveBeautyOrderChanged", () => {
  updateStatistics();

  if (
    document.getElementById("page-orders")?.classList.contains("active-page")
  ) {
    renderOrdersPage();
  }

  if (
    document.getElementById("page-dashboard")?.classList.contains("active-page")
  ) {
    renderRecentOrders();
  }

  refreshIcons();
});
