/* EVE BEAUTY — CONTACT PAGE */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     ELEMENTS
  ======================================================= */

  const form = document.getElementById("contactForm");
  const submitButton = document.getElementById("contactSubmit");

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");
  const consent = document.getElementById("consent");

  const characterCount = document.getElementById("characterCount");

  const toast = document.getElementById("contactToast");
  const toastMessage = document.getElementById("toastMessage");

  let toastTimer;

  /*  GLOBAL THEME EVENT
     If another page/script changes the theme, this page
     can react to the same localStorage value. */

  window.addEventListener("storage", (event) => {
    if (event.key !== "eveBeautyTheme") {
      return;
    }

    if (event.newValue === "dark") {
      document.documentElement.classList.add("dark-mode");
      document.body.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.body.classList.remove("dark-mode");
    }
  });

  /* TOAST */

  function showToast(text) {
    toastMessage.textContent = text;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  }

  /* ERROR HELPERS */

  function setError(input, errorId, messageText) {
    const errorElement = document.getElementById(errorId);

    input.classList.add("invalid");

    if (errorElement) {
      errorElement.textContent = messageText;
    }
  }
  /*WHEN THE USER ENTER THE CORRECT FORM OF CONTENT THE ERROR WILL ERASE*/
  function clearError(input, errorId) {
    const errorElement = document.getElementById(errorId);

    input.classList.remove("invalid");

    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  /* VALIDATION FORM */

  function validateName(input, errorId, label) {
    const value = input.value.trim();

    if (!value) {
      setError(input, errorId, `${label} is required.`);

      return false;
    }

    if (value.length < 2) {
      setError(input, errorId, `${label} must contain at least 2 characters.`);

      return false;
    }

    clearError(input, errorId);

    return true;
  }

  function validateEmail() {
    const value = email.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      setError(email, "emailError", "Email address is required.");

      return false;
    }

    if (!emailPattern.test(value)) {
      setError(email, "emailError", "Please enter a valid email address.");

      return false;
    }

    clearError(email, "emailError");

    return true;
  }

  function validateSubject() {
    if (!subject.value) {
      setError(subject, "subjectError", "Please select a subject.");

      return false;
    }

    clearError(subject, "subjectError");

    return true;
  }

  function validateMessage() {
    const value = message.value.trim();

    if (!value) {
      setError(message, "messageError", "Please enter your message.");

      return false;
    }

    if (value.length < 10) {
      setError(
        message,
        "messageError",
        "Message must contain at least 10 characters.",
      );

      return false;
    }

    clearError(message, "messageError");

    return true;
  }

  function validateConsent() {
    const errorElement = document.getElementById("consentError");

    if (!consent.checked) {
      if (errorElement) {
        errorElement.textContent = "Please confirm before sending.";
      }

      return false;
    }

    if (errorElement) {
      errorElement.textContent = "";
    }

    return true;
  }

  /* CHARACTER COUNTER */

  function updateCharacterCount() {
    const currentLength = message.value.length;

    characterCount.textContent = `${currentLength} / 1000`;
  }

  message.addEventListener("input", updateCharacterCount);

  /* LIVE VALIDATION*/

  firstName.addEventListener("blur", () => {
    validateName(firstName, "firstNameError", "First name");
  });

  lastName.addEventListener("blur", () => {
    validateName(lastName, "lastNameError", "Last name");
  });

  email.addEventListener("blur", validateEmail);

  subject.addEventListener("change", validateSubject);

  message.addEventListener("blur", validateMessage);

  consent.addEventListener("change", validateConsent);

  /* = FORM SUBMIT */

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const validFirstName = validateName(
      firstName,
      "firstNameError",
      "First name",
    );

    const validLastName = validateName(lastName, "lastNameError", "Last name");

    const validEmail = validateEmail();

    const validSubject = validateSubject();

    const validMessage = validateMessage();

    const validConsent = validateConsent();

    const isValid =
      validFirstName &&
      validLastName &&
      validEmail &&
      validSubject &&
      validMessage &&
      validConsent;

    if (!isValid) {
      showToast("Please check the highlighted fields.");

      return;
    }

    /* LOADING*/

    submitButton.disabled = true;

    submitButton.classList.add("loading");

    /*
      Small delay to give the user visual feedback.

    */

    await new Promise((resolve) => {
      setTimeout(resolve, 900);
    });

    /* SAVE MESSAGE LOCALLY */

    const savedMessages = JSON.parse(
      localStorage.getItem("eveBeautyContactMessages") || "[]",
    );

    const newMessage = {
      id: Date.now(),

      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),

      email: email.value.trim(),

      subject: subject.value,

      message: message.value.trim(),

      createdAt: new Date().toISOString(),
    };

    savedMessages.push(newMessage);

    localStorage.setItem(
      "eveBeautyContactMessages",
      JSON.stringify(savedMessages),
    );

    /* SUCCESS*/

    form.reset();

    updateCharacterCount();

    submitButton.disabled = false;

    submitButton.classList.remove("loading");

    showToast("Thank you! Your message has been received.");
  });

  /* PREVENT ACCIDENTAL DOUBLE SUBMIT */

  window.addEventListener("beforeunload", () => {
    submitButton.disabled = false;
  });

  /* =======================================================
     FAQ
     -------------------------------------------------------
     Allows only one FAQ item to stay open at a time.
  ======================================================= */

  const faqItems = document.querySelectorAll(".faq-list details");

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) {
        return;
      }

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.removeAttribute("open");
        }
      });
    });
  });
  setupContactScrollAnimations();

  /* INITIAL STATE*/

  updateCharacterCount();
});

/* =======================================================
     EVE BEAUTY — CONTACT PAGE SCROLL REVEAL
     Animates page sections and their individual elements.
  ======================================================= */

if (!document.getElementById("contact-scroll-reveal-style")) {
  const style = document.createElement("style");

  style.id = "contact-scroll-reveal-style";

  style.textContent = `
      .contact-scroll-reveal {
        opacity: 0;
        transform: translateY(24px);

        transition:
          opacity 0.65s ease,
          transform 0.65s ease;

        will-change: opacity, transform;
      }

      .contact-scroll-reveal.contact-reveal-visible {
        opacity: 1;
        transform: translateY(0);
      }

      @media (prefers-reduced-motion: reduce) {
        .contact-scroll-reveal,
        .contact-scroll-reveal.contact-reveal-visible {
          opacity: 1;
          transform: none;
          transition: none;
          will-change: auto;
        }
      }
    `;

  document.head.appendChild(style);
}

const contactRevealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("contact-reveal-visible");
            } else {
              entry.target.classList.remove("contact-reveal-visible");
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -30px 0px",
        },
      )
    : null;

function setupContactScrollAnimations(root = document) {
  const revealSelectors = [
    /* Page structure */
    "header",
    "main",
    "footer",

    /* Contact page sections */
    ".contact-hero",
    ".contact-section",
    ".contact-container",
    ".contact-content",
    ".contact-info",
    ".contact-details",
    ".contact-form-container",
    ".contact-form-wrapper",

    /* Common headings and text */
    ".section-title",
    ".section-heading",
    ".section-subtitle",
    ".section-description",
    ".contact-title",
    ".contact-subtitle",
    ".contact-description",

    /* Hero content */
    ".hero-content",
    ".hero-title",
    ".hero-description",
    ".hero-image",
    ".hero-buttons",

    /* Contact information and cards */
    ".contact-card",
    ".contact-info-card",
    ".contact-method",
    ".contact-item",
    ".contact-icon",
    ".contact-address",
    ".contact-email",
    ".contact-phone",

    /* Contact form */
    "#contactForm",
    "#contactForm label",
    "#contactForm input",
    "#contactForm select",
    "#contactForm textarea",
    "#contactForm button",
    "#firstName",
    "#lastName",
    "#email",
    "#subject",
    "#message",
    "#consent",
    "#characterCount",
    "#contactSubmit",

    /* FAQ */
    ".faq-section",
    ".faq-container",
    ".faq-list",
    ".faq-list details",
    ".faq-list summary",
    ".faq-list details p",
    ".faq-item",
    ".faq-question",
    ".faq-answer",

    /* Other common page elements */
    ".feature-card",
    ".feature-item",
    ".category-card",
    ".contact-banner",
    ".contact-map",
    ".social-links",
    ".social-link",

    /* Direct children of common grids */
    ".contact-grid > *",
    ".contact-cards > *",
    ".contact-details > *",
    ".faq-grid > *",
    ".features-grid > *",

    /* Buttons and links */
    "a.contact-button",
    "button.contact-button",
  ];

  const elements = root.querySelectorAll(revealSelectors.join(", "));

  elements.forEach((element, index) => {
    if (element.classList.contains("contact-scroll-reveal")) {
      return;
    }

    element.classList.add("contact-scroll-reveal");

    element.style.transitionDelay = `${(index % 4) * 70}ms`;

    if (contactRevealObserver) {
      contactRevealObserver.observe(element);
    } else {
      element.classList.add("contact-reveal-visible");
    }
  });
}

/* Initialize animations for the existing page */
setupContactScrollAnimations();
