/* =========================================================
   EVE BEAUTY
   BEAUTY TEST
   Makeup + Skincare + Haircare
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     DARK MODE
  ======================================================= */

  const DARK_MODE_KEY = "eveBeautyDarkMode";

  function applyDarkMode(enabled) {
    document.body.classList.toggle("dark-mode", enabled);

    localStorage.setItem(DARK_MODE_KEY, enabled ? "true" : "false");
  }

  function initializeDarkMode() {
    const savedDarkMode = localStorage.getItem(DARK_MODE_KEY);

    const systemDarkMode = window.matchMedia?.(
      "(prefers-color-scheme: dark)",
    ).matches;

    const enabled =
      savedDarkMode === "true" ||
      (savedDarkMode === null && systemDarkMode === true);

    applyDarkMode(enabled);
  }

  initializeDarkMode();

  /* =======================================================
     DARK MODE TOGGLE BUTTON
  ======================================================= */

  function createDarkModeToggle() {
    if (document.getElementById("darkModeToggle")) {
      return;
    }

    const button = document.createElement("button");

    button.type = "button";
    button.id = "darkModeToggle";
    button.setAttribute("aria-label", "Toggle dark mode");
    button.innerHTML = `
      <i data-lucide="moon"></i>
    `;

    Object.assign(button.style, {
      position: "fixed",
      right: "22px",
      bottom: "22px",
      width: "46px",
      height: "46px",
      border: "1px solid rgba(170,131,134,.35)",
      borderRadius: "50%",
      background: "var(--dark-toggle-bg, #fff)",
      color: "var(--dark-toggle-color, #aa8386)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: "999998",
      boxShadow: "0 8px 25px rgba(0,0,0,.12)",
      transition: "all .25s ease",
    });

    button.addEventListener("click", () => {
      const enabled = !document.body.classList.contains("dark-mode");

      applyDarkMode(enabled);

      button.innerHTML = `
        <i data-lucide="${enabled ? "sun" : "moon"}"></i>
      `;

      refreshIcons();
    });

    document.body.appendChild(button);

    refreshIcons();
  }

  /* =======================================================
     CONFIG
  ======================================================= */

  const PRIMARY_COLOR = "#aa8386";

  const sections = ["makeup", "skincare", "haircare"];

  let currentSectionIndex = 0;

  let currentQuestionIndex = 0;

  let quizStarted = false;

  let answers = {
    makeup: [],
    skincare: [],
    haircare: [],
  };

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const landingScreen = document.getElementById("landingScreen");

  const quizScreen = document.getElementById("quizScreen");

  const resultsScreen = document.getElementById("resultsScreen");

  const startAllTest = document.getElementById("startAllTest");

  const quizCategoryLabel = document.getElementById("quizCategoryLabel");

  const quizQuestionNumber = document.getElementById("quizQuestionNumber");

  const quizProgressText = document.getElementById("quizProgressText");

  const quizProgressBar = document.getElementById("quizProgressBar");

  const quizQuestion = document.getElementById("quizQuestion");

  const quizOptions = document.getElementById("quizOptions");

  const quizQuestionImage = document.getElementById("quizQuestionImage");

  const quizBackButton = document.getElementById("quizBackButton");

  const quizNextButton = document.getElementById("quizNextButton");

  const retakeQuizButton = document.getElementById("retakeQuizButton");

  const shopRecommendedButton = document.getElementById(
    "shopRecommendedButton",
  );

  const resultHomeButton = document.getElementById("resultHomeButton");

  /* =======================================================
     QUIZ DATA
  ======================================================= */

  const quizData = {
    /* =====================================================
       MAKEUP
    ===================================================== */

    makeup: [
      {
        question: "What kind of foundation finish do you usually prefer?",

        image: "assets/images/product-2.jpg",

        options: [
          {
            text: "Dewy and glowing",
            score: "fresh",
          },
          {
            text: "Natural and balanced",
            score: "natural",
          },
          {
            text: "Matte and polished",
            score: "glam",
          },
          {
            text: "Lightweight and skin-like",
            score: "soft",
          },
        ],
      },

      {
        question: "How would you describe your everyday makeup?",

        image: "assets/images/product-3.jpg",

        options: [
          {
            text: "Very minimal",
            score: "natural",
          },
          {
            text: "Fresh with a little color",
            score: "fresh",
          },
          {
            text: "Soft and feminine",
            score: "soft",
          },
          {
            text: "Full and defined",
            score: "glam",
          },
        ],
      },

      {
        question: "Which lip look do you usually choose?",

        image: "assets/images/product-7.jpg",

        options: [
          {
            text: "Nude and natural",
            score: "natural",
          },
          {
            text: "Glossy and juicy",
            score: "fresh",
          },
          {
            text: "Soft pink or rose",
            score: "soft",
          },
          {
            text: "Bold and defined",
            score: "glam",
          },
        ],
      },

      {
        question: "What do you want your makeup to achieve?",

        image: "assets/images/product-10.jpg",

        options: [
          {
            text: "Look like myself, just fresher",
            score: "natural",
          },
          {
            text: "A healthy glowing look",
            score: "fresh",
          },
          {
            text: "Elegant and polished",
            score: "soft",
          },
          {
            text: "Noticeable and glamorous",
            score: "glam",
          },
        ],
      },

      {
        question: "How much time do you normally spend on makeup?",

        image: "assets/images/product-5.jpg",

        options: [
          {
            text: "Under 10 minutes",
            score: "natural",
          },
          {
            text: "10–20 minutes",
            score: "fresh",
          },
          {
            text: "20–30 minutes",
            score: "soft",
          },
          {
            text: "30+ minutes",
            score: "glam",
          },
        ],
      },

      {
        question: "Which eye makeup style feels most like you?",

        image: "assets/images/product-1.jpg",

        options: [
          {
            text: "Soft and barely there",
            score: "natural",
          },
          {
            text: "Bright and fresh",
            score: "fresh",
          },
          {
            text: "Soft shimmer",
            score: "soft",
          },
          {
            text: "Smoky and dramatic",
            score: "glam",
          },
        ],
      },

      {
        question: "What kind of blush do you prefer?",

        image: "assets/images/product-4.jpg",

        options: [
          {
            text: "Very subtle",
            score: "natural",
          },
          {
            text: "Fresh pink glow",
            score: "fresh",
          },
          {
            text: "Soft rosy color",
            score: "soft",
          },
          {
            text: "Strong sculpted blush",
            score: "glam",
          },
        ],
      },

      {
        question: "Which makeup result would make you happiest?",

        image: "assets/images/product-6.jpg",

        options: [
          {
            text: "Natural and effortless",
            score: "natural",
          },
          {
            text: "Fresh and radiant",
            score: "fresh",
          },
          {
            text: "Elegant and soft",
            score: "soft",
          },
          {
            text: "Bold and confident",
            score: "glam",
          },
        ],
      },
    ],

    /* =====================================================
       SKINCARE
    ===================================================== */

    skincare: [
      {
        question: "How does your skin usually feel after cleansing?",

        image: "assets/images/product-13.jpg",

        options: [
          {
            text: "Tight and sometimes flaky",
            score: "dry",
          },
          {
            text: "Clean but oily again quickly",
            score: "oily",
          },
          {
            text: "Oily in some areas and dry in others",
            score: "combination",
          },
          {
            text: "Comfortable and balanced",
            score: "normal",
          },
        ],
      },

      {
        question: "How does your skin look by midday?",

        image: "assets/images/product-15.jpg",

        options: [
          {
            text: "Dry or dull",
            score: "dry",
          },
          {
            text: "Shiny",
            score: "oily",
          },
          {
            text: "Shiny around my T-zone",
            score: "combination",
          },
          {
            text: "Mostly balanced",
            score: "normal",
          },
        ],
      },

      {
        question: "How often do you experience dry patches?",

        image: "assets/images/product-11.jpg",

        options: [
          {
            text: "Very often",
            score: "dry",
          },
          {
            text: "Almost never",
            score: "oily",
          },
          {
            text: "Sometimes",
            score: "combination",
          },
          {
            text: "Rarely",
            score: "normal",
          },
        ],
      },

      {
        question: "How does your skin react to new products?",

        image: "assets/images/product-18.jpg",

        options: [
          {
            text: "It can feel irritated easily",
            score: "dry",
          },
          {
            text: "It may become oily or break out",
            score: "oily",
          },
          {
            text: "It depends on the product",
            score: "combination",
          },
          {
            text: "Usually fine",
            score: "normal",
          },
        ],
      },

      {
        question: "What is your biggest skincare concern?",

        image: "assets/images/product-12.jpg",

        options: [
          {
            text: "Hydration",
            score: "dry",
          },
          {
            text: "Oil and shine",
            score: "oily",
          },
          {
            text: "Balancing different areas",
            score: "combination",
          },
          {
            text: "Maintaining healthy skin",
            score: "normal",
          },
        ],
      },

      {
        question: "What kind of moisturizer do you usually like?",

        image: "assets/images/product-11.jpg",

        options: [
          {
            text: "Rich and nourishing",
            score: "dry",
          },
          {
            text: "Lightweight and oil-free",
            score: "oily",
          },
          {
            text: "Balanced and lightweight",
            score: "combination",
          },
          {
            text: "Comfortable everyday cream",
            score: "normal",
          },
        ],
      },

      {
        question: "How often does your skin feel tight?",

        image: "assets/images/product-14.jpg",

        options: [
          {
            text: "Often",
            score: "dry",
          },
          {
            text: "Rarely",
            score: "oily",
          },
          {
            text: "Only on some areas",
            score: "combination",
          },
          {
            text: "Almost never",
            score: "normal",
          },
        ],
      },

      {
        question: "Which description sounds most like your skin?",

        image: "assets/images/product-20.jpg",

        options: [
          {
            text: "Soft but needs more moisture",
            score: "dry",
          },
          {
            text: "Shiny and prone to congestion",
            score: "oily",
          },
          {
            text: "Different zones need different care",
            score: "combination",
          },
          {
            text: "Balanced and easy to maintain",
            score: "normal",
          },
        ],
      },
    ],

    /* =====================================================
       HAIRCARE
    ===================================================== */

    haircare: [
      {
        question: "How would you describe your natural hair pattern?",

        image: "assets/images/product-22.jpg",

        options: [
          {
            text: "Straight",
            score: "straight",
          },
          {
            text: "Wavy",
            score: "wavy",
          },
          {
            text: "Curly",
            score: "curly",
          },
          {
            text: "Coily",
            score: "coily",
          },
        ],
      },

      {
        question: "What is your biggest hair concern?",

        image: "assets/images/product-21.jpg",

        options: [
          {
            text: "Flatness",
            score: "straight",
          },
          {
            text: "Frizz",
            score: "wavy",
          },
          {
            text: "Dry curls",
            score: "curly",
          },
          {
            text: "Deep dryness",
            score: "coily",
          },
        ],
      },

      {
        question: "How does your hair usually feel after washing?",

        image: "assets/images/product-23.jpg",

        options: [
          {
            text: "Smooth and light",
            score: "straight",
          },
          {
            text: "Soft but slightly frizzy",
            score: "wavy",
          },
          {
            text: "Dry and needs moisture",
            score: "curly",
          },
          {
            text: "Very dry and thirsty",
            score: "coily",
          },
        ],
      },

      {
        question: "How much volume does your hair naturally have?",

        image: "assets/images/product-24.jpg",

        options: [
          {
            text: "Low",
            score: "straight",
          },
          {
            text: "Medium",
            score: "wavy",
          },
          {
            text: "High",
            score: "curly",
          },
          {
            text: "Very high",
            score: "coily",
          },
        ],
      },

      {
        question: "How often do you deal with frizz?",

        image: "assets/images/product-26.jpg",

        options: [
          {
            text: "Rarely",
            score: "straight",
          },
          {
            text: "Sometimes",
            score: "wavy",
          },
          {
            text: "Often",
            score: "curly",
          },
          {
            text: "Very often",
            score: "coily",
          },
        ],
      },

      {
        question: "Which hair finish do you want most?",

        image: "assets/images/product-28.jpg",

        options: [
          {
            text: "Smooth and sleek",
            score: "straight",
          },
          {
            text: "Defined waves",
            score: "wavy",
          },
          {
            text: "Defined curls",
            score: "curly",
          },
          {
            text: "Soft and deeply moisturized",
            score: "coily",
          },
        ],
      },

      {
        question: "How often do you use heat styling?",

        image: "assets/images/product-27.jpg",

        options: [
          {
            text: "Often",
            score: "straight",
          },
          {
            text: "Sometimes",
            score: "wavy",
          },
          {
            text: "Rarely",
            score: "curly",
          },
          {
            text: "Almost never",
            score: "coily",
          },
        ],
      },

      {
        question: "What result do you want most?",

        image: "assets/images/product-29.jpg",

        options: [
          {
            text: "Smooth and shiny hair",
            score: "straight",
          },
          {
            text: "Soft, defined and frizz-free hair",
            score: "wavy",
          },
          {
            text: "Stronger and healthier curls",
            score: "curly",
          },
          {
            text: "Maximum moisture and definition",
            score: "coily",
          },
        ],
      },
    ],
  };

  /* =======================================================
     PRODUCT DATA
     Matches products already used by shop.js
  ======================================================= */

  const products = {
    1: {
      id: 1,
      name: "Rose Glow Eyeshadow Palette",
      brand: "EVE Beauty",
      price: 29.99,
      rating: 4.8,
      reviews: 124,
      image: "assets/images/product-1.jpg",
      category: "Makeup",
    },

    2: {
      id: 2,
      name: "Long Lasting Foundation",
      brand: "EVE Beauty",
      price: 24.99,
      rating: 4.7,
      reviews: 87,
      image: "assets/images/product-2.jpg",
      category: "Makeup",
    },

    3: {
      id: 3,
      name: "Matte Lipstick",
      brand: "EVE Beauty",
      price: 16.99,
      rating: 4.8,
      reviews: 98,
      image: "assets/images/product-3.jpg",
      category: "Makeup",
    },

    4: {
      id: 4,
      name: "Soft Blush Powder",
      brand: "Maybelline",
      price: 18.99,
      rating: 4.7,
      reviews: 91,
      image: "assets/images/product-4.jpg",
      category: "Makeup",
    },

    5: {
      id: 5,
      name: "Volume Mascara",
      brand: "L'Oréal",
      price: 17.99,
      rating: 4.7,
      reviews: 105,
      image: "assets/images/product-5.jpg",
      category: "Makeup",
    },

    6: {
      id: 6,
      name: "Hydrating Concealer",
      brand: "Estée Lauder",
      price: 27.99,
      rating: 4.8,
      reviews: 88,
      image: "assets/images/product-6.jpg",
      category: "Makeup",
    },

    7: {
      id: 7,
      name: "Nude Lip Gloss",
      brand: "EVE Beauty",
      price: 14.99,
      rating: 4.6,
      reviews: 72,
      image: "assets/images/product-7.jpg",
      category: "Makeup",
    },

    10: {
      id: 10,
      name: "Natural Glow Highlighter",
      brand: "EVE Beauty",
      price: 22.99,
      rating: 4.8,
      reviews: 102,
      image: "assets/images/product-10.jpg",
      category: "Makeup",
    },

    11: {
      id: 11,
      name: "Hydrating Face Cream",
      brand: "EVE Beauty",
      price: 19.99,
      rating: 4.9,
      reviews: 156,
      image: "assets/images/product-11.jpg",
      category: "Skincare",
    },

    12: {
      id: 12,
      name: "Vitamin C Serum",
      brand: "EVE Beauty",
      price: 22.99,
      rating: 4.8,
      reviews: 73,
      image: "assets/images/product-12.jpg",
      category: "Skincare",
    },

    13: {
      id: 13,
      name: "Gentle Face Cleanser",
      brand: "L'Oréal",
      price: 15.99,
      rating: 4.6,
      reviews: 69,
      image: "assets/images/product-13.jpg",
      category: "Skincare",
    },

    14: {
      id: 14,
      name: "Rose Water Toner",
      brand: "EVE Beauty",
      price: 17.99,
      rating: 4.7,
      reviews: 88,
      image: "assets/images/product-14.jpg",
      category: "Skincare",
    },

    15: {
      id: 15,
      name: "Daily SPF 50",
      brand: "Estée Lauder",
      price: 25.99,
      rating: 4.9,
      reviews: 142,
      image: "assets/images/product-15.jpg",
      category: "Skincare",
    },

    16: {
      id: 16,
      name: "Night Repair Cream",
      brand: "EVE Beauty",
      price: 28.99,
      rating: 4.8,
      reviews: 118,
      image: "assets/images/product-16.jpg",
      category: "Skincare",
    },

    17: {
      id: 17,
      name: "Purifying Clay Mask",
      brand: "Maybelline",
      price: 18.99,
      rating: 4.5,
      reviews: 65,
      image: "assets/images/product-17.jpg",
      category: "Skincare",
    },

    18: {
      id: 18,
      name: "Eye Repair Serum",
      brand: "Estée Lauder",
      price: 31.99,
      rating: 4.9,
      reviews: 127,
      image: "assets/images/product-18.jpg",
      category: "Skincare",
    },

    19: {
      id: 19,
      name: "Soft Body Lotion",
      brand: "EVE Beauty",
      price: 21.99,
      rating: 4.7,
      reviews: 80,
      image: "assets/images/product-19.jpg",
      category: "Skincare",
    },

    20: {
      id: 20,
      name: "Refreshing Face Mist",
      brand: "L'Oréal",
      price: 14.99,
      rating: 4.6,
      reviews: 62,
      image: "assets/images/product-20.jpg",
      category: "Skincare",
    },

    21: {
      id: 21,
      name: "Repairing Hair Mask",
      brand: "EVE Beauty",
      price: 18.99,
      rating: 4.8,
      reviews: 92,
      image: "assets/images/product-21.jpg",
      category: "Haircare",
    },

    22: {
      id: 22,
      name: "Silky Hair Shampoo",
      brand: "L'Oréal",
      price: 16.99,
      rating: 4.7,
      reviews: 101,
      image: "assets/images/product-22.jpg",
      category: "Haircare",
    },

    23: {
      id: 23,
      name: "Nourishing Hair Oil",
      brand: "EVE Beauty",
      price: 23.99,
      rating: 4.8,
      reviews: 87,
      image: "assets/images/product-23.jpg",
      category: "Haircare",
    },

    24: {
      id: 24,
      name: "Volume Conditioner",
      brand: "Maybelline",
      price: 15.99,
      rating: 4.6,
      reviews: 74,
      image: "assets/images/product-24.jpg",
      category: "Haircare",
    },

    25: {
      id: 25,
      name: "Scalp Care Treatment",
      brand: "Estée Lauder",
      price: 27.99,
      rating: 4.8,
      reviews: 91,
      image: "assets/images/product-25.jpg",
      category: "Haircare",
    },

    26: {
      id: 26,
      name: "Smooth Hair Serum",
      brand: "EVE Beauty",
      price: 20.99,
      rating: 4.7,
      reviews: 82,
      image: "assets/images/product-26.jpg",
      category: "Haircare",
    },

    27: {
      id: 27,
      name: "Deep Repair Conditioner",
      brand: "L'Oréal",
      price: 18.99,
      rating: 4.8,
      reviews: 94,
      image: "assets/images/product-27.jpg",
      category: "Haircare",
    },

    28: {
      id: 28,
      name: "Gloss Hair Spray",
      brand: "Maybelline",
      price: 17.99,
      rating: 4.6,
      reviews: 63,
      image: "assets/images/product-28.jpg",
      category: "Haircare",
    },

    29: {
      id: 29,
      name: "Keratin Hair Treatment",
      brand: "Estée Lauder",
      price: 32.99,
      rating: 4.9,
      reviews: 106,
      image: "assets/images/product-29.jpg",
      category: "Haircare",
    },

    30: {
      id: 30,
      name: "Daily Hair Mist",
      brand: "EVE Beauty",
      price: 14.99,
      rating: 4.5,
      reviews: 57,
      image: "assets/images/product-30.jpg",
      category: "Haircare",
    },
  };

  /* =======================================================
     PROFILE DESCRIPTIONS
  ======================================================= */

  const profiles = {
    makeup: {
      natural: {
        title: "Natural & Effortless",
        description:
          "You prefer a fresh, natural look with lightweight coverage and effortless everyday definition.",
        products: [2, 7, 4, 10],
      },

      fresh: {
        title: "Fresh & Radiant",
        description:
          "Your ideal makeup is fresh, glowing and youthful with soft color and radiant finishes.",
        products: [10, 7, 4, 6],
      },

      soft: {
        title: "Soft & Elegant",
        description:
          "You enjoy polished feminine makeup with soft color, subtle definition and elegant finishes.",
        products: [1, 4, 5, 3],
      },

      glam: {
        title: "Defined Glam",
        description:
          "You love confident, defined makeup with stronger eyes, lips and polished finishes.",
        products: [1, 5, 3, 10],
      },
    },

    skincare: {
      dry: {
        title: "Dry Skin",
        description:
          "Your skin benefits from hydration, nourishment and moisture-focused products.",
        products: [11, 14, 16, 19],
      },

      oily: {
        title: "Oily Skin",
        description:
          "Your skin benefits from lightweight hydration, oil control and gentle balancing care.",
        products: [15, 17, 20, 13],
      },

      combination: {
        title: "Combination Skin",
        description:
          "Your skin needs balance between hydration and lightweight care across different areas.",
        products: [13, 20, 12, 15],
      },

      normal: {
        title: "Normal Skin",
        description:
          "Your skin is naturally balanced and benefits from simple, consistent everyday care.",
        products: [12, 14, 18, 11],
      },
    },

    haircare: {
      straight: {
        title: "Straight Hair",
        description:
          "Your hair benefits from lightweight smoothing, shine and volume-supporting products.",
        products: [22, 24, 28, 30],
      },

      wavy: {
        title: "Wavy Hair",
        description:
          "Your waves benefit from moisture, soft definition and frizz-control without heaviness.",
        products: [26, 22, 24, 28],
      },

      curly: {
        title: "Curly Hair",
        description:
          "Your curls benefit from moisture, repair and definition-focused haircare.",
        products: [21, 23, 27, 29],
      },

      coily: {
        title: "Coily Hair",
        description:
          "Your hair benefits from rich moisture, deep repair and products that support definition.",
        products: [21, 23, 27, 29],
      },
    },
  };

  /* =======================================================
     START TEST
  ======================================================= */

  startAllTest?.addEventListener("click", () => {
    resetQuiz();

    quizStarted = true;

    currentSectionIndex = 0;

    currentQuestionIndex = 0;

    showQuiz();
  });

  /* =======================================================
     CATEGORY BUTTONS
  ======================================================= */

  document.querySelectorAll("[data-start-section]").forEach((button) => {
    button.addEventListener("click", () => {
      resetQuiz();

      quizStarted = true;

      const section = button.dataset.startSection;

      currentSectionIndex = sections.indexOf(section);

      if (currentSectionIndex < 0) {
        currentSectionIndex = 0;
      }

      currentQuestionIndex = 0;

      showQuiz();
    });
  });

  /* =======================================================
     SHOW QUIZ
  ======================================================= */

  function showQuiz() {
    landingScreen?.classList.remove("active");

    resultsScreen?.classList.remove("active");

    quizScreen?.classList.add("active");

    renderQuestion();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =======================================================
     CURRENT SECTION
  ======================================================= */

  function getCurrentSection() {
    return sections[currentSectionIndex];
  }

  /* =======================================================
     CURRENT QUESTION
  ======================================================= */

  function getCurrentQuestion() {
    const section = getCurrentSection();

    return quizData[section][currentQuestionIndex];
  }

  /* =======================================================
     RENDER QUESTION
  ======================================================= */

  function renderQuestion() {
    const section = getCurrentSection();

    const question = getCurrentQuestion();

    const sectionQuestions = quizData[section];

    const sectionName = section.charAt(0).toUpperCase() + section.slice(1);

    quizCategoryLabel.textContent = sectionName;

    quizQuestionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${sectionQuestions.length}`;

    /*
     * Overall progress
     */

    const totalQuestions =
      quizData.makeup.length +
      quizData.skincare.length +
      quizData.haircare.length;

    const previousQuestions = currentSectionIndex * 8;

    const currentOverall = previousQuestions + currentQuestionIndex + 1;

    const progress = Math.round((currentOverall / totalQuestions) * 100);

    quizProgressText.textContent = `${progress}%`;

    quizProgressBar.style.width = `${progress}%`;

    /*
     * Question text
     */

    quizQuestion.textContent = question.question;

    /*
     * Question image
     */

    quizQuestionImage.src = question.image;

    quizQuestionImage.alt = `${sectionName} question`;

    /*
     * Options
     */

    quizOptions.innerHTML = "";

    const existingAnswer = answers[section][currentQuestionIndex];

    question.options.forEach((option, index) => {
      const button = document.createElement("button");

      button.type = "button";

      button.className = "quiz-option";

      if (existingAnswer && existingAnswer.score === option.score) {
        button.classList.add("selected");
      }

      const marker = document.createElement("span");

      marker.className = "quiz-option-marker";

      marker.textContent = String.fromCharCode(65 + index);

      const text = document.createElement("span");

      text.textContent = option.text;

      button.appendChild(marker);

      button.appendChild(text);

      button.addEventListener("click", () => {
        answers[section][currentQuestionIndex] = option;

        document.querySelectorAll(".quiz-option").forEach((item) => {
          item.classList.remove("selected");
        });

        button.classList.add("selected");
      });

      quizOptions.appendChild(button);
    });

    /*
     * Back button
     */

    quizBackButton.disabled =
      currentSectionIndex === 0 && currentQuestionIndex === 0;

    /*
     * Last question
     */

    const isLastQuestion = currentQuestionIndex === sectionQuestions.length - 1;

    if (isLastQuestion && currentSectionIndex === sections.length - 1) {
      quizNextButton.innerHTML = `
        See My Results
        <i data-lucide="sparkles"></i>
      `;
    } else if (isLastQuestion) {
      quizNextButton.innerHTML = `
        Next Section
        <i data-lucide="arrow-right"></i>
      `;
    } else {
      quizNextButton.innerHTML = `
        Next
        <i data-lucide="arrow-right"></i>
      `;
    }

    updateStepIndicators();

    refreshIcons();
  }

  /* =======================================================
     NEXT
  ======================================================= */

  quizNextButton?.addEventListener("click", () => {
    const section = getCurrentSection();

    const questionCount = quizData[section].length;

    /*
     * Require answer
     */

    if (!answers[section][currentQuestionIndex]) {
      showQuizMessage("Please choose an answer first.");

      return;
    }

    /*
     * Next question
     */

    if (currentQuestionIndex < questionCount - 1) {
      currentQuestionIndex++;

      renderQuestion();

      return;
    }

    /*
     * Next section
     */

    if (currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;

      currentQuestionIndex = 0;

      renderQuestion();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    /*
     * Results
     */

    showResults();
  });

  /* =======================================================
     BACK
  ======================================================= */

  quizBackButton?.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;

      renderQuestion();

      return;
    }

    if (currentSectionIndex > 0) {
      currentSectionIndex--;

      currentQuestionIndex = quizData[getCurrentSection()].length - 1;

      renderQuestion();
    }
  });

  /* =======================================================
     STEP INDICATORS
  ======================================================= */

  function updateStepIndicators() {
    document.querySelectorAll("[data-step-indicator]").forEach((step) => {
      const name = step.dataset.stepIndicator;

      const index = sections.indexOf(name);

      step.classList.remove("active", "completed");

      if (index < currentSectionIndex) {
        step.classList.add("completed");
      }

      if (index === currentSectionIndex) {
        step.classList.add("active");
      }
    });
  }

  /* =======================================================
     CALCULATE PROFILE
  ======================================================= */

  function calculateProfile(section) {
    const sectionAnswers = answers[section];

    const scores = {};

    sectionAnswers.forEach((answer) => {
      if (!answer) {
        return;
      }

      scores[answer.score] = (scores[answer.score] || 0) + 1;
    });

    const entries = Object.entries(scores);

    if (!entries.length) {
      return Object.keys(profiles[section])[0];
    }

    entries.sort((a, b) => b[1] - a[1]);

    return entries[0][0];
  }

  /* =======================================================
     SHOW RESULTS
  ======================================================= */

  function showResults() {
    const makeupProfile = calculateProfile("makeup");

    const skinProfile = calculateProfile("skincare");

    const hairProfile = calculateProfile("haircare");

    const makeup = profiles.makeup[makeupProfile];

    const skin = profiles.skincare[skinProfile];

    const hair = profiles.haircare[hairProfile];

    /*
     * Result text
     */

    document.getElementById("resultMakeup").textContent = makeup.title;

    document.getElementById("resultMakeupDescription").textContent =
      makeup.description;

    document.getElementById("resultSkin").textContent = skin.title;

    document.getElementById("resultSkinDescription").textContent =
      skin.description;

    document.getElementById("resultHair").textContent = hair.title;

    document.getElementById("resultHairDescription").textContent =
      hair.description;

    /*
     * Save profile
     */

    const beautyProfile = {
      makeup: makeupProfile,
      skincare: skinProfile,
      haircare: hairProfile,

      makeupTitle: makeup.title,
      skinTitle: skin.title,
      hairTitle: hair.title,

      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "eveBeautyBeautyProfile",
      JSON.stringify(beautyProfile),
    );

    /*
     * Recommendations
     */

    renderRecommendations("makeupRecommendations", makeup.products);

    renderRecommendations("skincareRecommendations", skin.products);

    renderRecommendations("haircareRecommendations", hair.products);

    /*
     * Screen
     */

    quizScreen?.classList.remove("active");

    landingScreen?.classList.remove("active");

    resultsScreen?.classList.add("active");

    refreshIcons();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =======================================================
     RENDER PRODUCTS
  ======================================================= */

  function renderRecommendations(containerId, productIds) {
    const container = document.getElementById(containerId);

    if (!container) {
      return;
    }

    container.innerHTML = "";

    productIds.forEach((id) => {
      const product = products[id];

      if (!product) {
        return;
      }

      const card = document.createElement("article");

      card.className = "recommendation-product";

      card.innerHTML = `

          <div class="product-image-wrap">

            <img
              src="${product.image}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
            />

            <button
              type="button"
              class="product-heart"
              data-wishlist-product="${product.id}"
              aria-label="Add to wishlist"
            >
              <i data-lucide="heart"></i>
            </button>

          </div>


          <div class="product-content">

            <span class="product-brand">
              ${escapeHTML(product.brand)}
            </span>

            <h4 class="product-name">
              ${escapeHTML(product.name)}
            </h4>

            <div class="product-rating">

              <strong>
                ★ ${product.rating}
              </strong>

              <span>
                (${product.reviews})
              </span>

            </div>

            <div class="product-price">
              $${product.price.toFixed(2)}
            </div>

            <button
              type="button"
              class="product-add-button"
              data-add-recommended="${product.id}"
            >
              Add to Cart
            </button>

          </div>

        `;

      container.appendChild(card);
    });

    /*
     * Add to cart buttons
     */

    container.querySelectorAll("[data-add-recommended]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = Number(button.dataset.addRecommended);

        addProductToCart(id);

        updateProductCartButton(button, id);
      });
    });

    /*
     * Wishlist buttons
     */

    container.querySelectorAll("[data-wishlist-product]").forEach((button) => {
      const id = Number(button.dataset.wishlistProduct);

      updateWishlistButton(button, id);

      button.addEventListener("click", () => {
        toggleWishlist(id);

        updateWishlistButton(button, id);
      });
    });

    /*
     * Set cart button states
     */

    container.querySelectorAll("[data-add-recommended]").forEach((button) => {
      const id = Number(button.dataset.addRecommended);

      updateProductCartButton(button, id);
    });

    refreshIcons();
  }

  /* =======================================================
     ADD TO CART
     Compatible with existing shop.js storage
  ======================================================= */

  function addProductToCart(productId) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      localStorage.setItem("eveBeautyLoginRedirect", "beauty-test.html");

      alert("Please sign in first to add products to your cart.");

      window.location.href = "login.html";

      return false;
    }

    const product = products[productId];

    if (!product) {
      return false;
    }

    const userCartKey = `eveBeautyCart_${currentUser.id}`;

    let cart = [];

    try {
      cart = JSON.parse(localStorage.getItem(userCartKey)) || [];
    } catch (error) {
      cart = [];
    }

    if (!Array.isArray(cart)) {
      cart = [];
    }

    const existingItem = cart.find(
      (item) => Number(item.id) === Number(productId),
    );

    if (existingItem) {
      existingItem.quantity = Number(existingItem.quantity || 1) + 1;

      existingItem.updatedAt = new Date().toISOString();
    } else {
      cart.push({
        id: product.id,

        name: product.name,

        brand: product.brand,

        category: product.category,

        type: product.category === "Makeup" ? "Face" : "Face",

        skin: "Normal",

        price: product.price,

        rating: product.rating,

        reviews: product.reviews,

        image: product.image,

        quantity: 1,

        addedAt: new Date().toISOString(),

        updatedAt: new Date().toISOString(),
      });
    }

    localStorage.setItem(userCartKey, JSON.stringify(cart));

    localStorage.setItem("eveBeautyCart", JSON.stringify(cart));

    localStorage.setItem(
      "eveBeautyCartCurrentUser",
      JSON.stringify({
        userId: currentUser.id,

        items: cart,

        updatedAt: new Date().toISOString(),
      }),
    );

    /*
     * Update navbar count
     */

    updateCartCount(cart);

    /*
     * Notify existing site scripts
     */

    window.dispatchEvent(
      new CustomEvent("eveBeautyCartUpdated", {
        detail: {
          cart: cart,
          quantity: getCartQuantity(cart),
          total: getCartTotal(cart),
        },
      }),
    );

    showToast("Product added to cart.");

    return true;
  }

  /* =======================================================
     CART HELPERS
  ======================================================= */

  function getCurrentUser() {
    try {
      const stored = localStorage.getItem("eveBeautyCurrentUser");

      if (!stored) {
        return null;
      }

      const user = JSON.parse(stored);

      if (!user || !user.id) {
        return null;
      }

      return user;
    } catch (error) {
      return null;
    }
  }

  function getCart() {
    const user = getCurrentUser();

    if (!user) {
      return [];
    }

    try {
      return JSON.parse(localStorage.getItem(`eveBeautyCart_${user.id}`)) || [];
    } catch (error) {
      return [];
    }
  }

  function getCartQuantity(cart) {
    return cart.reduce((total, item) => total + Number(item.quantity || 0), 0);
  }

  function getCartTotal(cart) {
    return cart.reduce(
      (total, item) =>
        total + Number(item.price || 0) * Number(item.quantity || 0),
      0,
    );
  }

  function updateCartCount(cart) {
    const quantity = getCartQuantity(cart);

    const count = document.getElementById("cartCount");

    if (count) {
      count.textContent = quantity > 99 ? "99+" : String(quantity);
    }
  }

  function updateProductCartButton(button, productId) {
    const cart = getCart();

    const exists = cart.some((item) => Number(item.id) === Number(productId));

    if (exists) {
      button.textContent = "Added to Cart";

      button.classList.add("in-cart");
    } else {
      button.textContent = "Add to Cart";

      button.classList.remove("in-cart");
    }
  }

  /* =======================================================
     WISHLIST
  ======================================================= */

  function getWishlist() {
    try {
      const stored = localStorage.getItem("eveBeautyWishlist");

      const wishlist = JSON.parse(stored) || [];

      return Array.isArray(wishlist) ? wishlist : [];
    } catch (error) {
      return [];
    }
  }

  function saveWishlist(wishlist) {
    localStorage.setItem("eveBeautyWishlist", JSON.stringify(wishlist));

    updateWishlistCount(wishlist.length);
  }

  function toggleWishlist(productId) {
    const product = products[productId];

    if (!product) {
      return;
    }

    let wishlist = getWishlist();

    const index = wishlist.findIndex(
      (item) => Number(item.id) === Number(productId),
    );

    if (index >= 0) {
      wishlist.splice(index, 1);

      showToast("Removed from wishlist.");
    } else {
      wishlist.push({
        id: product.id,

        name: product.name,

        brand: product.brand,

        category: product.category,

        price: product.price,

        rating: product.rating,

        reviews: product.reviews,

        image: product.image,

        addedAt: new Date().toISOString(),
      });

      showToast("Added to wishlist.");
    }

    saveWishlist(wishlist);

    window.dispatchEvent(new CustomEvent("eveBeautyWishlistUpdated"));
  }

  function updateWishlistButton(button, productId) {
    const wishlist = getWishlist();

    const exists = wishlist.some(
      (item) => Number(item.id) === Number(productId),
    );

    button.classList.toggle("active", exists);

    const icon = button.querySelector("i");

    if (icon) {
      icon.setAttribute("data-lucide", exists ? "heart" : "heart");
    }
  }

  function updateWishlistCount(count) {
    const element = document.getElementById("favoritelistCount");

    if (element) {
      element.textContent = count > 99 ? "99+" : String(count);
    }
  }

  /* =======================================================
     RETAKE
  ======================================================= */

  retakeQuizButton?.addEventListener("click", () => {
    resetQuiz();

    currentSectionIndex = 0;

    currentQuestionIndex = 0;

    quizStarted = true;

    showQuiz();
  });

  /* =======================================================
     VIEW ALL CATEGORY
  ======================================================= */

  document.querySelectorAll("[data-view-category]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.viewCategory;

      window.location.href = `shop.html?category=${encodeURIComponent(category)}`;
    });
  });

  /* =======================================================
     SHOP RECOMMENDATIONS
  ======================================================= */

  shopRecommendedButton?.addEventListener("click", () => {
    window.location.href = "shop.html";
  });

  /* =======================================================
     HOME
  ======================================================= */

  resultHomeButton?.addEventListener("click", () => {
    window.location.href = "beauty-test.html";
  });

  /* =======================================================
     NAVBAR CART / WISHLIST
  ======================================================= */

  document.addEventListener("click", (event) => {
    const cartButton = event.target.closest("#cartButton");

    const wishlistButton = event.target.closest("#favoritelistButton");

    if (cartButton) {
      event.preventDefault();

      window.location.href = "shop.html";

      return;
    }

    if (wishlistButton) {
      event.preventDefault();

      window.location.href = "wishlist.html";
    }
  });

  /* =======================================================
     RESET
  ======================================================= */

  function resetQuiz() {
    answers = {
      makeup: [],
      skincare: [],
      haircare: [],
    };

    currentSectionIndex = 0;

    currentQuestionIndex = 0;
  }

  /* =======================================================
     TOAST
  ======================================================= */

  function showToast(message) {
    let toast = document.getElementById("beautyTestToast");

    if (!toast) {
      toast = document.createElement("div");

      toast.id = "beautyTestToast";

      Object.assign(toast.style, {
        position: "fixed",
        right: "22px",
        bottom: "22px",
        zIndex: "999999",
        background: PRIMARY_COLOR,
        color: "#fff",
        padding: "11px 17px",
        borderRadius: "7px",
        fontSize: "12px",
        boxShadow: "0 10px 30px rgba(80,50,55,.18)",
        opacity: "0",
        transform: "translateY(15px)",
        transition: "all .25s ease",
        pointerEvents: "none",
      });

      document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.style.opacity = "1";

    toast.style.transform = "translateY(0)";

    clearTimeout(window.beautyTestToastTimer);

    window.beautyTestToastTimer = setTimeout(() => {
      toast.style.opacity = "0";

      toast.style.transform = "translateY(15px)";
    }, 2200);
  }

  /* =======================================================
     QUIZ MESSAGE
  ======================================================= */

  function showQuizMessage(message) {
    showToast(message);
  }

  /* =======================================================
     ICONS
  ======================================================= */

  function refreshIcons() {
    if (
      typeof lucide !== "undefined" &&
      typeof lucide.createIcons === "function"
    ) {
      lucide.createIcons();
    }
  }

  /* =======================================================
     ESCAPE HTML
  ======================================================= */

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* =======================================================
     INITIAL
  ======================================================= */

  updateCartCount(getCart());

  updateWishlistCount(getWishlist().length);

  refreshIcons();

  console.log("EVE Beauty Test ready.");
});
