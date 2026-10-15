/* =========================================================
   SCROLL ANIMATION — ABOUT PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* SELECT ELEMENTS */

  const elements = document.querySelectorAll(`
    .about-hero-content,
    .who-image,
    .who-content,
    .who-feature,
    .journey-content,
    .journey-stat,
    .team-heading,
    .team-card,
    .values-title,
    .values-text,
    .values-signature,
    .eve-reviews,
    .reviews-showcase,
    .review-card-main,
    .review-card-small,
    #leave-review
  `);

  /* CREATE ANIMATION STYLES */

  const style = document.createElement("style");

  style.textContent = `
    .about-page .scroll-reveal {
      opacity: 0;
      transform: translateY(40px);
      transition:
        opacity 0.8s ease,
        transform 0.8s ease;
    }

    .about-page .scroll-reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
      .about-page .scroll-reveal {
        opacity: 1;
        transform: none;
        transition: none;
      }
    }
  `;

  document.head.appendChild(style);

  /* OBSERVE ELEMENTS DURING SCROLL */

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px",
    },
  );

  /* APPLY SCROLL ANIMATION */

  elements.forEach(function (element, index) {
    element.classList.add("scroll-reveal");

    if (
      element.classList.contains("who-feature") ||
      element.classList.contains("journey-stat") ||
      element.classList.contains("team-card") ||
      element.classList.contains("review-card-small")
    ) {
      element.style.transitionDelay = `${(index % 4) * 100}ms`;
    }

    observer.observe(element);
  });

  console.log(
    "About scroll animation initialized:",
    elements.length,
    "elements",
  );

  /* =========================================================
     EVE BEAUTY — CUSTOMER FEEDBACK & REVIEWS
     js/about.js
  ========================================================= */

  /* =======================================================
     1. ELEMENTS
  ======================================================= */

  const section = document.querySelector(".eve-reviews");

  if (!section) return;

  const showcase = section.querySelector(".reviews-showcase");
  const mainCard = section.querySelector(".review-card-main");

  const smallCards = Array.from(section.querySelectorAll(".review-card-small"));

  const reviewForm = section.querySelector("#eve-review-form");
  const reviewMessage = section.querySelector("#review-form-message");
  const ratingInput = section.querySelector("#review-rating");

  const ratingButtons = Array.from(
    section.querySelectorAll(".review-star-picker [data-rating]"),
  );

  const shareButton = section.querySelector(".reviews-cta");
  const reviewFormWrap = section.querySelector("#leave-review");

  if (!showcase || !mainCard || smallCards.length < 2) return;

  /* =======================================================
     2. LOGIN CHECK
  ======================================================= */

  function getCurrentUser() {
    try {
      const stored = localStorage.getItem("eveBeautyCurrentUser");

      if (!stored) return null;

      const user = JSON.parse(stored);

      if (!user || !user.id) return null;

      return user;
    } catch (error) {
      console.error("Error reading current user:", error);
      return null;
    }
  }

  function requireLogin() {
    if (getCurrentUser()) {
      return true;
    }

    localStorage.setItem("eveBeautyLoginRedirect", "about.html");

    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "warning",
        title: "Sign in required",
        text: "Please sign in to share your beauty experience.",
        confirmButtonText: "Sign in",
        background: "#fffaf8",
        color: "#493539",
        iconColor: "#b98289",
        confirmButtonColor: "#a7797d",
        buttonsStyling: true,
        showCloseButton: true,
        allowOutsideClick: false,
        customClass: {
          popup: "eve-review-swal",
          title: "eve-review-swal-title",
          htmlContainer: "eve-review-swal-text",
          confirmButton: "eve-review-swal-button",
          closeButton: "eve-review-swal-close",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "login.html";
        }
      });
    } else {
      alert("Please sign in first to submit a review.");
      window.location.href = "login.html";
    }

    return false;
  }

  /* =======================================================
     3. INITIAL REVIEWS
  ======================================================= */

  const reviews = [
    {
      name: "Sara M.",
      initial: "S",
      review:
        "EVE Beauty has completely changed my skincare routine. The products feel luxurious, and I love the attention to quality.",
      rating: 5,
      date: "Happy Customer",
      product: "Skincare Collection",
      verified: true,
    },
    {
      name: "Neda R.",
      initial: "N",
      review:
        "Beautiful packaging, thoughtful details, and a lovely experience!",
      rating: 5,
      date: "Verified feedback",
      product: "Beauty Collection",
      verified: true,
    },
    {
      name: "Lina K.",
      initial: "L",
      review:
        "I love the elegant feel of the products. EVE Beauty is a beautiful addition to my routine.",
      rating: 5,
      date: "Verified feedback",
      product: "Beauty Collection",
      verified: true,
    },
  ];

  let currentIndex = 0;

  /* =======================================================
     4. HELPERS
  ======================================================= */

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };

      return entities[character];
    });
  }

  function renderStars(rating) {
    return Array.from({ length: 5 }, (_, index) => {
      return index < rating ? "★" : "☆";
    }).join("");
  }

  function getReview(index) {
    return reviews[(index + reviews.length) % reviews.length];
  }

  /* =======================================================
     5. MAIN REVIEW CARD
  ======================================================= */

  function renderMainCard(review) {
    mainCard.innerHTML = `
      <div class="review-card-top">
        <span class="review-quote-mark">“</span>

        <span class="review-verified">
          <i data-lucide="badge-check"></i>
          ${review.verified ? "Verified Customer" : "Customer Review"}
        </span>
      </div>

      <div class="review-stars" aria-label="${review.rating} out of 5 stars">
        ${renderStars(review.rating)}
      </div>

      <blockquote class="review-quote">
        “${escapeHTML(review.review)}”
      </blockquote>

      <div class="review-customer">
        <div class="review-avatar review-avatar-sara">
          ${escapeHTML(review.initial)}
        </div>

        <div class="review-customer-info">
          <h3>${escapeHTML(review.name)}</h3>
          <p>${review.verified ? "Happy Customer" : "Customer Review"}</p>
        </div>

        <span class="review-date">
          ${escapeHTML(review.date)}
        </span>
      </div>

      <div class="review-product">
        <span class="product-mini-icon">
          <i data-lucide="droplets"></i>
        </span>

        <span>${escapeHTML(review.product)}</span>

        <i data-lucide="arrow-up-right"></i>
      </div>
    `;
  }

  /* =======================================================
     6. SMALL REVIEW CARDS
  ======================================================= */

  function renderSmallCard(card, review) {
    card.innerHTML = `
      <div class="small-review-header">
        <div class="review-avatar">
          ${escapeHTML(review.initial)}
        </div>

        <div>
          <h3>${escapeHTML(review.name)}</h3>

          <div class="review-stars"
               aria-label="${review.rating} out of 5 stars">
            ${renderStars(review.rating)}
          </div>
        </div>
      </div>

      <p>“${escapeHTML(review.review)}”</p>

      <span class="small-review-date">
        ${escapeHTML(review.date)}
      </span>
    `;
  }

  /* =======================================================
     7. CAROUSEL CONTROLS
  ======================================================= */

  const navigation = document.createElement("div");

  navigation.className = "reviews-carousel-navigation";

  navigation.innerHTML = `
    <button
      type="button"
      class="reviews-prev"
      aria-label="Previous review"
    >
      <i data-lucide="arrow-left"></i>
    </button>

    <button
      type="button"
      class="reviews-next"
      aria-label="Next review"
    >
      <i data-lucide="arrow-right"></i>
    </button>
  `;

  showcase.appendChild(navigation);

  const previousButton = navigation.querySelector(".reviews-prev");
  const nextButton = navigation.querySelector(".reviews-next");

  /* =======================================================
     8. DISPLAY REVIEWS
  ======================================================= */

  function renderReviews() {
    const mainReview = getReview(currentIndex);

    renderMainCard(mainReview);

    smallCards.forEach((card, index) => {
      const review = getReview(currentIndex + index + 1);

      renderSmallCard(card, review);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }

    /* KEEP ANIMATION ON DYNAMIC REVIEW CARDS */

    [mainCard, ...smallCards].forEach((card, index) => {
      card.classList.add("scroll-reveal");
      card.style.transitionDelay = `${index * 100}ms`;

      observer.observe(card);
    });
  }

  function showNextReview() {
    currentIndex = (currentIndex + 1) % reviews.length;
    renderReviews();
  }

  function showPreviousReview() {
    currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    renderReviews();
  }

  nextButton.addEventListener("click", showNextReview);
  previousButton.addEventListener("click", showPreviousReview);

  /* =======================================================
     9. SHARE REVIEW BUTTON
  ======================================================= */

  if (shareButton && reviewFormWrap) {
    shareButton.addEventListener("click", (event) => {
      event.preventDefault();

      if (!requireLogin()) return;

      reviewFormWrap.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  /* =======================================================
     10. STAR RATING PICKER
  ======================================================= */

  let selectedRating = Number(ratingInput?.value) || 5;

  function updateRating(rating) {
    selectedRating = rating;

    if (ratingInput) {
      ratingInput.value = String(rating);
    }

    ratingButtons.forEach((button) => {
      const value = Number(button.dataset.rating);
      const selected = value <= rating;

      button.classList.toggle("is-active", selected);

      button.setAttribute("aria-pressed", String(value === rating));
    });
  }

  ratingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const rating = Number(button.dataset.rating);

      if (rating >= 1 && rating <= 5) {
        updateRating(rating);
      }
    });

    button.addEventListener("mouseenter", () => {
      const rating = Number(button.dataset.rating);

      ratingButtons.forEach((star) => {
        star.classList.toggle(
          "is-active",
          Number(star.dataset.rating) <= rating,
        );
      });
    });
  });

  const starPicker = section.querySelector(".review-star-picker");

  if (starPicker) {
    starPicker.addEventListener("mouseleave", () => {
      updateRating(selectedRating);
    });
  }

  updateRating(selectedRating);

  /* =======================================================
     11. SUBMIT A NEW REVIEW
  ======================================================= */

  if (reviewForm) {
    reviewForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Require login before submitting a review.
      if (!requireLogin()) return;

      if (!reviewForm.reportValidity()) return;

      const formData = new FormData(reviewForm);

      const name = String(formData.get("customerName") || "").trim();

      const email = String(formData.get("customerEmail") || "").trim();

      const message = String(formData.get("reviewMessage") || "").trim();

      const rating = Number(formData.get("rating"));

      if (
        !name ||
        !email ||
        !message ||
        !Number.isInteger(rating) ||
        rating < 1 ||
        rating > 5
      ) {
        if (reviewMessage) {
          reviewMessage.textContent =
            "Please complete all fields and select a rating.";
        }

        return;
      }

      const newReview = {
        name: name,
        initial: name.charAt(0).toUpperCase(),
        review: message,
        rating: rating,
        date: "Just submitted",
        product: "Beauty Collection",
        verified: false,
      };

      // Add the new review to the beginning.
      reviews.unshift(newReview);

      // Display the newly submitted review.
      currentIndex = 0;
      renderReviews();

      if (reviewMessage) {
        reviewMessage.textContent =
          "Thank you! Your review is now displayed in the review cards.";
      }

      reviewForm.reset();
      updateRating(5);
    });
  }

  /* =======================================================
     12. INITIALIZE
  ======================================================= */

  renderReviews();
});
