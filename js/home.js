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
