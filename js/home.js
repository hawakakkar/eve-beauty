/*Eve Beauty - JavaScript Codes*/
document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  /*Theme Section*/
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("eve-theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("eve-theme", isDark ? "dark" : "light");
  });
});

/*Search Section*/
const searchButton = document.getElementById("searchButton");
const searchOverlay = document.getElementById("searchOverlay");
const closesearch = document.getElementById("close-search");
const searchInput = document.getElementById("searchInput");
const searchSubmit = document.getElementById("searchSubmit");
const searchMessage = document.getElementById("searchMessage");
function openSearch() {
  searchOverlay.classList.add("active");
  setTimeout(() => {
    searchInput?.focus();
  }, 200);
}

function closeSearchBox() {
  searchOverlay.classList.remove("active");
}

searchButton?.addEventListener("click", openSearch);
closeSearch?.addEventListener("click", closeSearchBox);
searchOverlay?.addEventListener("click", (event) => {
  if (event.target === searchOverlay) {
    closeSearchBox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSearchBox();
  }
});

function performSearch() {
  const value = searchInput.value.trim();

  if (!value) {
    searchMessage.textContent = "Please enter a product name.";

    return;
  }

  searchMessage.textContent = `Searching for "${value}"...`;
}

searchSubmit?.addEventListener("click", performSearch);

searchInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
});

/*Dropdown Section Code*/

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".dropdown-toggle");

  toggle?.addEventListener("click", (event) => {
    event.preventDefault();

    dropdowns.forEach((item) => {
      if (item !== dropdown) {
        item.classList.remove("open");
      }
    });

    dropdown.classList.toggle("open");
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".dropdown")) {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("open");
    });
  }
});

/*Mobile Menu Section*/
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobilMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");

mobileMenuButton?.addEventListener("click", () => {
  mobilMenu.classList.add("active");
});

mobileClose?.addEventListener("click", () => {
  mobilMenu.classList.remove("active");
});

mobilMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobilMenu.classList.remove("active");
  });
});

/*  whishlist Section*/
let favoritelistCount = 0;
const favoritelistCounter = document.getElementById("favoritelistCount");
const favoritelistButtons = document.querySelectorAll(".favoritelist");
favoritelistButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const active = button.classList.toggle("active");

    if (active) {
      favoritelistCount++;
    } else {
      favoritelistCount--;
    }
    favoritelistCounter.textContent = favoritelistCount;
  });
});

/*Cart Section*/
let cartCount = 0;
const cartCounter = document.getElementById("cartCount");
const cartAlert = document.getElementById("cartAlert");
const addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cartCount++;
    cartCounter.textContent = cartCount;

    showCartAlert();
  });
});

function showCartAlert() {
  cartAlert.classList.add("show");

  setTimeout(() => {
    cartAlert.classList.remove("show");
  }, 2800);
}

/*Product Slider Section*/
const productsGrid = document.getElementById("productsGrid");
const productNext = document.querySelector(".product-next");
const productPrev = document.querySelector(".product-prev");

productNext?.addEventListener("click", () => {
  productsGrid.scrollBy({
    left: 320,
    behavior: "smooth",
  });
});

productPrev?.addEventListener("click", () => {
  productsGrid.scrollBy({
    left: -320,
    behavior: "smooth",
  });
});

/*Collection Slider Section*/
const collectionGrid = document.querySelector(".collection-grid");

const collectionNext = document.querySelector(".collection-next");

const collectionPrev = document.querySelector(".collection-prev");

collectionNext?.addEventListener("click", () => {
  collectionGrid.scrollBy({
    left: 380,
    behavior: "smooth",
  });
});

collectionPrev?.addEventListener("click", () => {
  collectionGrid.scrollBy({
    left: -380,
    behavior: "smooth",
  });
});

/*Newsletter Section*/
const newsletterForm = document.getElementById("newsletterForm");

const emailInput = document.getElementById("emailInput");

const newsletterMessage = document.getElementById("newsletterMessage");

newsletterForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();

  if (!email) {
    newsletterMessage.textContent = "Please enter your email.";
    return;
  }

  newsletterMessage.textContent = "Thank you! You are now subscribed.";
  emailInput.value = "";
});

/*Account Button Section*/
const accountButton = document.getElementById("accountButton");
accountButton?.addEventListener("click", () => {
  alert("Welcome to Eve Beauty. Account feature comming soon.");
});

/*Cart Button*/
const cartButton = document.getElementById("cartButton");

cartButton?.addEventListener("click", () => {
  if (cartCount === 0) {
    alert("Your Shopping bag is empty.");
  } else {
    alert(`You have ${cartCount} item(s) in your shopping bag.`);
  }
});

/* Favoritelist Button*/

const favoritelistButton = document.getElementById("favoritelistButton");
favoritelistButton?.addEventListener("click", () => {
  if (favoritelistCount === 0) {
    alert("Your favoritelist is empty.");
  } else {
    alert(`You have ${favoritelistCount} item(s) is in your favoritelist.`);
  }
});

/*Image Error Handeling Section*/
const images = document.querySelectorAll("img");

images.forEach((image) => {
  image.addEventListener("error", () => {
    image.classList.add("image-error");
  });
});
