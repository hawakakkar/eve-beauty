/* =========================================================
   EVE BEAUTY — DASHBOARD

   Single Page Dashboard

   USER SYSTEM
   ---------------------------------------------------------
   New system:
   eveBeautyCurrentUser

   Backward compatibility:
   eveBeautyUser
   eveBeautyLoggedIn

   PROFILE IMAGE:
   eveBeautyProfileImage
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

  refreshIcons();
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
  localStorage.setItem(key, JSON.stringify(value));
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

function openPage(page) {
  if (!page) {
    return;
  }

  document.querySelectorAll(".dashboard-page").forEach((section) => {
    section.classList.remove("active-page");
  });

  const target = document.getElementById(`page-${page}`);

  if (!target) {
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

  if (page === "shop") {
    renderShop();
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
  /* =======================================================
     NEW LOGIN SYSTEM
  ======================================================= */

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

  /* =======================================================
     OLD LOGIN SYSTEM
     BACKWARD COMPATIBILITY
  ======================================================= */

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

  /* =======================================================
     DEFAULT
  ======================================================= */

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

  /* =======================================================
     NEW SYSTEM
  ======================================================= */

  localStorage.setItem("eveBeautyCurrentUser", data);

  /* =======================================================
     OLD SYSTEM
     Keep compatibility
  ======================================================= */

  localStorage.setItem("eveBeautyUser", data);

  localStorage.setItem("eveBeautyLoggedIn", "true");

  /* =======================================================
     Notify shared components
  ======================================================= */

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
   DASHBOARD PROFILE IMAGE
========================================================= */

function updateDashboardProfileImage() {
  const image = localStorage.getItem("eveBeautyProfileImage");

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

  /* =======================================================
     NO IMAGE
  ======================================================= */

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

/* =========================================================
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

  const wrapper = document.createElement("div");

  wrapper.className = "dashboard-card order-page-card";

  wrapper.style.padding = "18px";

  wrapper.innerHTML = `
    <div style="
      display:flex;
      align-items:center;
      gap:15px;
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

      <div style="flex:1">

        <strong>
          #${escapeHTML(String(order.orderNumber || order.id || "Order"))}
        </strong>

        <div class="order-meta">
          ${getOrderDate(order)}
          •
          ${escapeHTML(name)}
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
                class="primary-button"
                data-action="cart"
                data-id="${escapeHTML(getProductId(product))}"
              >
                Add to Cart
              </button>

              <button
                class="remove-button"
                data-action="remove-wishlist"
                data-id="${escapeHTML(getProductId(product))}"
              >
                Remove
              </button>
            `
            : `
              <button
                class="primary-button"
                data-action="cart"
                data-id="${escapeHTML(getProductId(product))}"
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

  wishlist = wishlist.filter((item) => getProductId(item) !== String(id));

  writeStorage("eveBeautyWishlist", wishlist);

  updateStatistics();

  renderWishlist();

  window.dispatchEvent(new Event("eveBeautyWishlistChanged"));
}

function addToWishlist(product) {
  let wishlist = readStorage("eveBeautyWishlist", []);

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

  alert("Product added to cart.");
}

function renderCart() {
  const container = document.getElementById("cartPageList");

  const empty = document.getElementById("cartEmpty");

  if (!container) {
    return;
  }

  const cart = readStorage("eveBeautyCart", []);

  container.innerHTML = "";

  if (!Array.isArray(cart) || cart.length === 0) {
    if (empty) {
      empty.style.display = "flex";
    }

    return;
  }

  if (empty) {
    empty.style.display = "none";
  }

  cart.forEach((item) => {
    const row = document.createElement("div");

    row.className = "cart-row";

    const image = getProductImage(item);

    const name = getProductName(item);

    const price = Number(item.price || 0);

    const quantity = Number(item.quantity) || 1;

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

      <div>
        <h3>
          ${escapeHTML(name)}
        </h3>

        <p>
          ${formatCurrency(price)}
        </p>
      </div>

      <div class="quantity-control">

        <button
          data-cart-action="minus"
        >
          −
        </button>

        <span>
          ${quantity}
        </span>

        <button
          data-cart-action="plus"
        >
          +
        </button>

      </div>

      <strong>
        ${formatCurrency(price * quantity)}
      </strong>
    `;

    row.querySelectorAll("[data-cart-action]").forEach((button) => {
      button.addEventListener("click", () => {
        changeCartQuantity(getProductId(item), button.dataset.cartAction);
      });
    });

    container.appendChild(row);
  });

  refreshIcons();
}

function changeCartQuantity(id, action) {
  const cart = readStorage("eveBeautyCart", []);

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

  if (quantity <= 0) {
    const index = cart.indexOf(item);

    cart.splice(index, 1);
  } else {
    item.quantity = quantity;
  }

  writeStorage("eveBeautyCart", cart);

  updateStatistics();

  renderCart();

  window.dispatchEvent(new Event("eveBeautyCartChanged"));
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
          data-edit-address="${escapeHTML(address.id)}"
        >
          Edit
        </button>

        <button
          data-delete-address="${escapeHTML(address.id)}"
        >
          Delete
        </button>

        ${
          !address.default
            ? `
              <button
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
    localStorage.setItem("eveBeautyProfileImage", reader.result);

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

  const image = localStorage.getItem("eveBeautyProfileImage");

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
  localStorage.removeItem("eveBeautyProfileImage");

  initializeUser();

  renderSettingsPhoto();

  window.dispatchEvent(new Event("eveBeautyUserChanged"));
}

/* =========================================================
   SHOP
========================================================= */

function renderShop() {
  const container = document.getElementById("shopProducts");

  if (!container) {
    return;
  }

  const products = readStorage("eveBeautyProducts", []);

  container.innerHTML = "";

  if (!Array.isArray(products) || products.length === 0) {
    container.innerHTML = `
      <div
        class="empty-page"
        style="grid-column:1/-1"
      >

        <i data-lucide="shopping-bag"></i>

        <h2>
          No products available
        </h2>

        <p>
          Add products to
          eveBeautyProducts
          in localStorage.
        </p>

      </div>
    `;

    refreshIcons();

    return;
  }

  products.forEach((product) => {
    container.appendChild(createProductCard(product));
  });

  refreshIcons();
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

    const price = Number(product.price || 0);

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

    button.addEventListener("click", () => openPage("shop"));

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
      return;
    }

    openPage("shop");

    setTimeout(() => {
      filterShopProducts(value);
    }, 50);
  });
}

function filterShopProducts(search) {
  const products = readStorage("eveBeautyProducts", []);

  const filtered = products.filter((product) => {
    const name = getProductName(product).toLowerCase();

    return name.includes(search.toLowerCase());
  });

  const container = document.getElementById("shopProducts");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  filtered.forEach((product) => {
    container.appendChild(createProductCard(product));
  });

  if (!filtered.length) {
    container.innerHTML = `
      <div
        class="empty-page"
        style="grid-column:1/-1"
      >

        <i data-lucide="search-x"></i>

        <h2>
          No products found
        </h2>

        <p>
          No products match
          "${escapeHTML(search)}".
        </p>

      </div>
    `;
  }

  refreshIcons();
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

    /* ===================================================
         NEW LOGIN SYSTEM
      =================================================== */

    localStorage.removeItem("eveBeautyCurrentUser");

    /* ===================================================
         OLD LOGIN SYSTEM
         Clean old session
      =================================================== */

    localStorage.removeItem("eveBeautyLoggedIn");

    localStorage.removeItem("eveBeautyUser");

    /* ===================================================
         Notify shared components
      =================================================== */

    window.dispatchEvent(new Event("eveBeautyUserChanged"));

    /* ===================================================
         HOME
      =================================================== */

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
   CROSS-SCRIPT CART / WISHLIST SYNC
========================================================= */

window.addEventListener("eveBeautyCartChanged", () => {
  updateStatistics();
});

window.addEventListener("eveBeautyWishlistChanged", () => {
  updateStatistics();
});
