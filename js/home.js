/* Eve Beauty - JavaScript Codes */

function initHomePage() {
  /* =========================
     Cart Section
  ========================= */
  let cartCount = 0;

  const cartCounter = document.getElementById("cartCount");

  const cartAlert = document.getElementById("cartAlert");

  const addCartButtons = document.querySelectorAll(".add-cart");

  addCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      cartCount++;

      if (cartCounter) {
        cartCounter.textContent = cartCount;
      }

      showCartAlert();
    });
  });

  function showCartAlert() {
    if (!cartAlert) return;

    cartAlert.classList.add("show");

    setTimeout(() => {
      cartAlert.classList.remove("show");
    }, 2800);
  }

  /* =========================
     Product Slider Section
  ========================= */
  const productsGrid = document.getElementById("productsGrid");

  const productNext = document.querySelector(".product-next");

  const productPrev = document.querySelector(".product-prev");

  productNext?.addEventListener("click", () => {
    productsGrid?.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  });

  productPrev?.addEventListener("click", () => {
    productsGrid?.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  });

  /* =========================
     Collection Slider Section
  ========================= */
  const collectionGrid = document.querySelector(".collection-grid");

  const collectionNext = document.querySelector(".collection-next");

  const collectionPrev = document.querySelector(".collection-prev");

  collectionNext?.addEventListener("click", () => {
    collectionGrid?.scrollBy({
      left: 380,
      behavior: "smooth",
    });
  });

  collectionPrev?.addEventListener("click", () => {
    collectionGrid?.scrollBy({
      left: -380,
      behavior: "smooth",
    });
  });

  /* =========================
     Newsletter Section
  ========================= */
  const newsletterForm = document.getElementById("newsletterForm");

  const emailInput = document.getElementById("emailInput");

  const newsletterMessage = document.getElementById("newsletterMessage");

  newsletterForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!emailInput || !newsletterMessage) {
      return;
    }

    const email = emailInput.value.trim();

    if (!email) {
      newsletterMessage.textContent = "Please enter your email.";
      return;
    }

    newsletterMessage.textContent = "Thank you! You are now subscribed.";

    emailInput.value = "";
  });

  /* =========================
     Image Error Handling
  ========================= */
  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-error");
    });
  });
}
