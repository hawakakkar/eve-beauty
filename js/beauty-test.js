/* EVE BEAUTY
   BEAUTY TEST
   Makeup + Skincare + Haircare */

document.addEventListener("DOMContentLoaded", () => {
  /*  CONFIG OF FILE */

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

  /* ELEMENTS*/

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

  /* QUIZ DATA */

  const quizData = {
    /* MAKEUP */

    makeup: [
      {
        question: "What kind of foundation finish do you usually prefer?",
        image: "assets/images/foundations.jpg",
        options: [
          { text: "Dewy and glowing", score: "fresh" },
          { text: "Natural and balanced", score: "natural" },
          { text: "Matte and polished", score: "glam" },
          { text: "Lightweight and skin-like", score: "soft" },
        ],
      },

      {
        question: "How would you describe your everyday makeup?",
        image: "assets/images/everyday-makeup.jpg",
        options: [
          { text: "Very minimal", score: "natural" },
          { text: "Fresh with a little color", score: "fresh" },
          { text: "Soft and feminine", score: "soft" },
          { text: "Full and defined", score: "glam" },
        ],
      },

      {
        question: "Which lip look do you usually choose?",
        image: "assets/images/lip.jpg",
        options: [
          { text: "Nude and natural", score: "natural" },
          { text: "Glossy and juicy", score: "fresh" },
          { text: "Soft pink or rose", score: "soft" },
          { text: "Bold and defined", score: "glam" },
        ],
      },

      {
        question: "What do you want your makeup to achieve?",
        image: "assets/images/achieve.jpg",
        options: [
          { text: "Look like myself, just fresher", score: "natural" },
          { text: "A healthy glowing look", score: "fresh" },
          { text: "Elegant and polished", score: "soft" },
          { text: "Noticeable and glamorous", score: "glam" },
        ],
      },

      {
        question: "How much time do you normally spend on makeup?",
        image: "assets/images/makeup-spend.jpg",
        options: [
          { text: "Under 10 minutes", score: "natural" },
          { text: "10–20 minutes", score: "fresh" },
          { text: "20–30 minutes", score: "soft" },
          { text: "30+ minutes", score: "glam" },
        ],
      },

      {
        question: "Which eye makeup style feels most like you?",
        image: "assets/images/eye.jpg",
        options: [
          { text: "Soft and barely there", score: "natural" },
          { text: "Bright and fresh", score: "fresh" },
          { text: "Soft shimmer", score: "soft" },
          { text: "Smoky and dramatic", score: "glam" },
        ],
      },

      {
        question: "What kind of blush do you prefer?",
        image: "assets/images/blush.jpg",
        options: [
          { text: "Very subtle", score: "natural" },
          { text: "Fresh pink glow", score: "fresh" },
          { text: "Soft rosy color", score: "soft" },
          { text: "Strong sculpted blush", score: "glam" },
        ],
      },

      {
        question: "Which makeup result would make you happiest?",
        image: "assets/images/makeup-happy.jpg",
        options: [
          { text: "Natural and effortless", score: "natural" },
          { text: "Fresh and radiant", score: "fresh" },
          { text: "Elegant and soft", score: "soft" },
          { text: "Bold and confident", score: "glam" },
        ],
      },
    ],

    /* =====================================================
       SKINCARE
    ===================================================== */

    skincare: [
      {
        question: "How does your skin usually feel after cleansing?",
        image: "assets/images/skin-cleansing.jpg",
        options: [
          { text: "Tight and sometimes flaky", score: "dry" },
          { text: "Clean but oily again quickly", score: "oily" },
          {
            text: "Oily in some areas and dry in others",
            score: "combination",
          },
          { text: "Comfortable and balanced", score: "normal" },
        ],
      },

      {
        question: "How does your skin look by midday?",
        image: "assets/images/middy.jpg",
        options: [
          { text: "Dry or dull", score: "dry" },
          { text: "Shiny", score: "oily" },
          { text: "Shiny around my T-zone", score: "combination" },
          { text: "Mostly balanced", score: "normal" },
        ],
      },

      {
        question: "How often do you experience dry patches?",
        image: "assets/images/dry-pitches.jpg",
        options: [
          { text: "Very often", score: "dry" },
          { text: "Almost never", score: "oily" },
          { text: "Sometimes", score: "combination" },
          { text: "Rarely", score: "normal" },
        ],
      },

      {
        question: "How does your skin react to new products?",
        image: "assets/images/new-product.jpg",
        options: [
          { text: "It can feel irritated easily", score: "dry" },
          { text: "It may become oily or break out", score: "oily" },
          { text: "It depends on the product", score: "combination" },
          { text: "Usually fine", score: "normal" },
        ],
      },

      {
        question: "What is your biggest skincare concern?",
        image: "assets/images/skin-concern.jpg",
        options: [
          { text: "Hydration", score: "dry" },
          { text: "Oil and shine", score: "oily" },
          { text: "Balancing different areas", score: "combination" },
          { text: "Maintaining healthy skin", score: "normal" },
        ],
      },

      {
        question: "What kind of moisturizer do you usually like?",
        image: "assets/images/moisturizer-kind.jpg",
        options: [
          { text: "Rich and nourishing", score: "dry" },
          { text: "Lightweight and oil-free", score: "oily" },
          { text: "Balanced and lightweight", score: "combination" },
          { text: "Comfortable everyday cream", score: "normal" },
        ],
      },

      {
        question: "How often does your skin feel tight?",
        image: "assets/images/skin-tight.jpg",
        options: [
          { text: "Often", score: "dry" },
          { text: "Rarely", score: "oily" },
          { text: "Only on some areas", score: "combination" },
          { text: "Almost never", score: "normal" },
        ],
      },

      {
        question: "Which description sounds most like your skin?",
        image: "assets/images/skin-description.jpg",
        options: [
          { text: "Soft but needs more moisture", score: "dry" },
          { text: "Shiny and prone to congestion", score: "oily" },
          {
            text: "Different zones need different care",
            score: "combination",
          },
          { text: "Balanced and easy to maintain", score: "normal" },
        ],
      },
    ],

    /* =====================================================
       HAIRCARE
    ===================================================== */

    haircare: [
      {
        question: "How would you describe your natural hair pattern?",
        image: "assets/images/natural-hair.jpg",
        options: [
          { text: "Straight", score: "straight" },
          { text: "Wavy", score: "wavy" },
          { text: "Curly", score: "curly" },
          { text: "Coily", score: "coily" },
        ],
      },

      {
        question: "What is your biggest hair concern?",
        image: "assets/images/hair-concern.jpg",
        options: [
          { text: "Flatness", score: "straight" },
          { text: "Frizz", score: "wavy" },
          { text: "Dry curls", score: "curly" },
          { text: "Deep dryness", score: "coily" },
        ],
      },

      {
        question: "How does your hair usually feel after washing?",
        image: "assets/images/washing.jpg",
        options: [
          { text: "Smooth and light", score: "straight" },
          { text: "Soft but slightly frizzy", score: "wavy" },
          { text: "Dry and needs moisture", score: "curly" },
          { text: "Very dry and thirsty", score: "coily" },
        ],
      },

      {
        question: "How much volume does your hair naturally have?",
        image: "assets/images/volume.jpg",
        options: [
          { text: "Low", score: "straight" },
          { text: "Medium", score: "wavy" },
          { text: "High", score: "curly" },
          { text: "Very high", score: "coily" },
        ],
      },

      {
        question: "How often do you deal with frizz?",
        image: "assets/images/frizz-hair.jpg",
        options: [
          { text: "Rarely", score: "straight" },
          { text: "Sometimes", score: "wavy" },
          { text: "Often", score: "curly" },
          { text: "Very often", score: "coily" },
        ],
      },

      {
        question: "Which hair finish do you want most?",
        image: "assets/images/finish.jpg",
        options: [
          { text: "Smooth and sleek", score: "straight" },
          { text: "Defined waves", score: "wavy" },
          { text: "Defined curls", score: "curly" },
          { text: "Soft and deeply moisturized", score: "coily" },
        ],
      },

      {
        question: "How often do you use heat styling?",
        image: "assets/images/heat-style.jpg",
        options: [
          { text: "Often", score: "straight" },
          { text: "Sometimes", score: "wavy" },
          { text: "Rarely", score: "curly" },
          { text: "Almost never", score: "coily" },
        ],
      },

      {
        question: "What result do you want most?",
        image: "assets/images/hair-result.jpg",
        options: [
          { text: "Smooth and shiny hair", score: "straight" },
          { text: "Soft, defined and frizz-free hair", score: "wavy" },
          { text: "Stronger and healthier curls", score: "curly" },
          { text: "Maximum moisture and definition", score: "coily" },
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

  /* STORAGE */
  /* CURRENT USER */

  function getCurrentUser() {
    try {
      const stored = localStorage.getItem("eveBeautyCurrentUser");

      if (!stored) return null;

      const user = JSON.parse(stored);

      if (!user || !user.id) return null;

      return user;
    } catch (error) {
      console.warn("Could not read current user:", error);
      return null;
    }
  }

  /* Use the same user identifier and key format as components.js. */

  function getStorageUserIdentifier(user) {
    if (!user) return null;

    if (typeof window.getEveBeautyUserIdentifier === "function") {
      return window.getEveBeautyUserIdentifier(user);
    }

    const identifier =
      user.id ||
      user.userId ||
      user.email ||
      user.username ||
      user.name ||
      user.fullName ||
      "guest";

    return String(identifier).toLowerCase().replace(/\s+/g, "_");
  }

  function getUserStorageKey(key, user = getCurrentUser()) {
    if (!user) return key;

    const userId = getStorageUserIdentifier(user);

    if (!userId) return key;

    return `${key}_${encodeURIComponent(userId)}`;
  }

  function getStoredItems(key) {
    try {
      const user = getCurrentUser();

      if (!user) {
        const publicItems = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(publicItems) ? publicItems : [];
      }

      const userKey = getUserStorageKey(key, user);
      const userValue = localStorage.getItem(userKey);

      if (userValue !== null) {
        const items = JSON.parse(userValue);
        return Array.isArray(items) ? items : [];
      }

      // Restore the current user's cart only if its saved owner matches.
      if (key === "eveBeautyCart") {
        const currentUserCart = JSON.parse(
          localStorage.getItem("eveBeautyCartCurrentUser") || "null",
        );

        const userIdentifier = getStorageUserIdentifier(user);

        if (
          currentUserCart &&
          Array.isArray(currentUserCart.items) &&
          (String(currentUserCart.userId) === String(userIdentifier) ||
            String(currentUserCart.userId) === String(user.id))
        ) {
          return currentUserCart.items;
        }
      }

      return [];
    } catch (error) {
      console.warn(`Could not load ${key}:`, error);
      return [];
    }
  }

  function saveStoredItems(key, items) {
    try {
      const user = getCurrentUser();
      const storageKey = getUserStorageKey(key, user);
      const itemsJSON = JSON.stringify(items);

      localStorage.setItem(storageKey, itemsJSON);

      // Keep the public mirror for compatibility with older page scripts.
      localStorage.setItem(key, itemsJSON);

      if (key === "eveBeautyCart" && user) {
        localStorage.setItem(
          "eveBeautyCartCurrentUser",
          JSON.stringify({
            userId: getStorageUserIdentifier(user),
            items: items,
            updatedAt: new Date().toISOString(),
          }),
        );
      }

      return true;
    } catch (error) {
      console.warn(`Could not save ${key}:`, error);
      return false;
    }
  }

  /*START TEST */
  /*IF THE BUTTON EXIST EXECUTE THIS CONDITION OTHERWISE IGNORE THIS LINE AND DONT SHOW */

  startAllTest?.addEventListener("click", () => {
    resetQuiz();

    quizStarted = true;
    /*QUIZ START FROM FIRST SECTION*/
    currentSectionIndex = 0;

    currentQuestionIndex = 0;

    showQuiz();
  });

  /* CATEGORY BUTTONS*/

  document.querySelectorAll("[data-start-section]").forEach((button) => {
    button.addEventListener("click", () => {
      resetQuiz();

      quizStarted = true;
      /*THIS READ THW FEAUTURES OF button.dataset.startSection AND STORE IT IN SECTION*/
      const section = button.dataset.startSection;
      /*THIS SECTION FIND THE LOCATION OF CHOOSEN IN THE SECTION ARRAYS*/
      currentSectionIndex = sections.indexOf(section);

      if (currentSectionIndex < 0) {
        currentSectionIndex = 0;
      }

      currentQuestionIndex = 0;

      showQuiz();
    });
  });

  /* 
     SHOW QUIZ*/

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

  /* CURRENT SECTION*/

  function getCurrentSection() {
    return sections[currentSectionIndex];
  }

  /* CURRENT QUESTION */

  function getCurrentQuestion() {
    const section = getCurrentSection();

    return quizData[section][currentQuestionIndex];
  }

  /* RENDER QUESTION*/

  function renderQuestion() {
    const section = getCurrentSection();

    const question = getCurrentQuestion();

    const sectionQuestions = quizData[section];

    const sectionName = section.charAt(0).toUpperCase() + section.slice(1);
    /*THIS DISPLAY THE NAME OF SECTION IN WINDOW*/

    quizCategoryLabel.textContent = sectionName;
    /*THIS DISPLAY THE CURRENT QUESTION AND LENGTH OF EACH QUESRTION8*/

    quizQuestionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${sectionQuestions.length}`;

    /*
     * Overall progress
     */
    /*THIS ADD THE LENGTH OF ALL THREE SECTIONS*/
    const totalQuestions =
      quizData.makeup.length +
      quizData.skincare.length +
      quizData.haircare.length;
    /*THIS CALCULATE THE LENGTH OF QUESTIOND*/
    const previousQuestions = currentSectionIndex * 8;

    const currentOverall = previousQuestions + currentQuestionIndex + 1;
    /*THIS SHOW THE GROWTH OF PERCENT AND DO ROWN OFF*/
    const progress = Math.round((currentOverall / totalQuestions) * 100);

    quizProgressText.textContent = `${progress}%`;

    quizProgressBar.style.width = `${progress}%`;

    /*DISPLAY THE Question text
     */

    quizQuestion.textContent = question.question;

    /*
     * Question image
     */

    quizQuestionImage.src = question.image;

    quizQuestionImage.alt = `${sectionName} question`;

    /*ANSWERS Options
     */
    /*BY THIS THE PERVIOUSE OPTION ANSWER WILL CLEAR*/
    quizOptions.innerHTML = "";
    /*THIS CHECK TJAT ARE THE USER ALREADY ANSWRED IN THESE QUESTIONS OR NO*/

    const existingAnswer = answers[section][currentQuestionIndex];

    question.options.forEach((option, index) => {
      const button = document.createElement("button");

      button.type = "button";

      button.className = "quiz-option";

      if (existingAnswer && existingAnswer.score === option.score) {
        button.classList.add("selected");
      }
      /*THIS SHOW THE LETTER OF A,BAD...*/
      const marker = document.createElement("span");

      marker.className = "quiz-option-marker";
      /*THIS METHOD CHANGE THE NUMBER CODE INTO TEXT*/
      marker.textContent = String.fromCharCode(65 + index);
      /*THIS SHOW THE TEXT OF OPTION*/
      const text = document.createElement("span");
      /*THIS PUT THE LINE OF CURRENTLY OPTION*/
      text.textContent = option.text;

      button.appendChild(marker);

      button.appendChild(text);
      /*THIS CHOOSEN LINE WILL AS*/
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

    setupBeautyTestScrollAnimations(quizScreen);
  }

  /* 
     NEXT
     */

  quizNextButton?.addEventListener("click", () => {
    const section = getCurrentSection();

    const questionCount = quizData[section].length;

    /*
      Require answer
     */

    if (!answers[section][currentQuestionIndex]) {
      showQuizMessage("Please choose an answer first.");

      return;
    }

    /*
     Next question
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

  /* BACK*/

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

  /* STEP INDICATORS*/

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

  /* CALCULATE PROFILE */

  function calculateProfile(section) {
    const sectionAnswers = answers[section];
    /*THIS MAKE AN EMPTY OBJECT UNTILL LENGTH OF EACH SCORE STORE IN IT*/
    const scores = {};

    sectionAnswers.forEach((answer) => {
      if (!answer) {
        return;
      }
      /*INCREASE THE COUNT  OF OCCURANCED FOR EACH ANSWERS SVORE*/
      scores[answer.score] = (scores[answer.score] || 0) + 1;
    });
    /*THIS CHANGE THE OBJECT SCORE INTO KEY AND VALUE ARRAY */
    const entries = Object.entries(scores);

    if (!entries.length) {
      return Object.keys(profiles[section])[0];
    }
    /*HERE IT ORGANIZE THE VALUE FROM MORE TO THE LESS*/
    entries.sort((a, b) => b[1] - a[1]);
    /*THE KEY RETURN FIRST PAIR*/
    return entries[0][0];
  }

  /*SHOW RESULTS */

  function showResults() {
    const makeupProfile = calculateProfile("makeup");

    const skinProfile = calculateProfile("skincare");

    const hairProfile = calculateProfile("haircare");

    const makeup = profiles.makeup[makeupProfile];

    const skin = profiles.skincare[skinProfile];

    const hair = profiles.haircare[hairProfile];

    /* Result text
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

    /*Screen
     */

    quizScreen?.classList.remove("active");

    landingScreen?.classList.remove("active");

    resultsScreen?.classList.add("active");

    refreshIcons();

    setupBeautyTestScrollAnimations(container);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* RENDER PRODUCTS */
  /*THIS RECOMEND US THE PRODUCT WE NEED ACCORDING OUR TEST*/
  function renderRecommendations(containerId, productIds) {
    const container = document.getElementById(containerId);

    if (!container) {
      return;
    }
    /*THIS WILL ERASE THE PERVIOUSE CONTENT*/
    container.innerHTML = "";

    productIds.forEach((id) => {
      const product = products[id];

      if (!product) {
        return;
      }
      /*HERE document.createElement("article") CREATE NEW ELEMENT FOR HTML*/
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

    /* Add / Remove from Cart buttons */

    container.querySelectorAll("[data-add-recommended]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = Number(button.dataset.addRecommended);

        const cart = getCart();

        const exists = cart.some((item) => Number(item.id) === id);

        if (exists) {
          const updatedCart = cart.filter((item) => Number(item.id) !== id);

          if (saveStoredItems("eveBeautyCart", updatedCart)) {
            updateCartCount(updatedCart);
            updateProductCartButton(button, id);

            window.dispatchEvent(
              new CustomEvent("eveBeautyCartUpdated", {
                detail: {
                  cart: updatedCart,
                  quantity: getCartQuantity(updatedCart),
                  total: getCartTotal(updatedCart),
                },
              }),
            );

            window.dispatchEvent(new CustomEvent("eveBeautyCartChanged"));

            if (typeof window.updateNavbarCounts === "function") {
              window.updateNavbarCounts();
            }

            if (typeof window.renderCartDropdown === "function") {
              window.renderCartDropdown();
            }

            showToast("Product removed from cart.");
          }

          return;
        }

        const added = addProductToCart(id);

        if (added) {
          updateProductCartButton(button, id);
        }
      });
    });

    /* Wishlist buttons*/

    container.querySelectorAll("[data-wishlist-product]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = Number(button.dataset.wishlistProduct);

        toggleWishlist(id);

        updateWishlistButton(button, id);
      });
    });

    /*Set cart button states*/
    /*WHEN WE TAKE THE TEST AGAIN THE PRODUCT THAT ADDED IN CART DONT DISAPPEAR*/

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

    const userCartKey = getUserStorageKey("eveBeautyCart", currentUser);

    let cart = getStoredItems("eveBeautyCart");

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

    if (!saveStoredItems("eveBeautyCart", cart)) {
      return false;
    }

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

    window.dispatchEvent(new CustomEvent("eveBeautyCartChanged"));

    if (typeof window.updateNavbarCounts === "function") {
      window.updateNavbarCounts();
    }

    if (typeof window.renderCartDropdown === "function") {
      window.renderCartDropdown();
    }

    showToast("Product added to cart.");

    return true;
  }

  /* =======================================================
     CART HELPERS
  ======================================================= */

  function getCart() {
    return getStoredItems("eveBeautyCart");
  }

  /*THIS ANALYZE THE ALL PRODUCTS OF CART AND ADD THEIR NUMBERS OF ORDER */
  function getCartQuantity(cart) {
    return cart.reduce((total, item) => total + Number(item.quantity || 0), 0);
  }
  /*THIS FUNCTION MULTIPLY THE PRICE OF EACH PRODUCT TO ITS  QUANTITY AND FINALLY ADD THE ALL TOTALS*/
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

  /* WISHLIST*/

  function getWishlist() {
    return getStoredItems("eveBeautyWishlist");
  }

  function saveWishlist(wishlist) {
    const saved = saveStoredItems("eveBeautyWishlist", wishlist);

    if (!saved) {
      return false;
    }

    updateWishlistCount(wishlist.length);

    window.dispatchEvent(new CustomEvent("eveBeautyWishlistUpdated"));

    window.dispatchEvent(new CustomEvent("eveBeautyWishlistChanged"));

    if (typeof window.updateNavbarCounts === "function") {
      window.updateNavbarCounts();
    }

    if (typeof window.renderWishlistDropdown === "function") {
      window.renderWishlistDropdown();
    }

    return true;
  }

  function toggleWishlist(productId) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      localStorage.setItem("eveBeautyLoginRedirect", "beauty-test.html");

      alert("Please sign in first to add products to your wishlist.");

      window.location.href = "login.html";

      return;
    }

    const product = products[productId];

    if (!product) {
      return;
    }

    let wishlist = getWishlist();

    const index = wishlist.findIndex(
      (item) => Number(item.id) === Number(productId),
    );

    if (index >= 0) {
      /*THIS METHOD REMOVE THE PRODUCT*/
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
  }

  function updateWishlistButton(button, productId) {
    const wishlist = getWishlist();

    const exists = wishlist.some(
      (item) => Number(item.id) === Number(productId),
    );

    button.classList.toggle("active", exists);

    button.setAttribute(
      "aria-label",
      exists ? "Remove from wishlist" : "Add to wishlist",
    );

    button.setAttribute("aria-pressed", exists ? "true" : "false");

    const icon = button.querySelector("i");

    if (icon) {
      icon.setAttribute("data-lucide", "heart");
      icon.style.fill = exists ? "currentColor" : "none";
    }

    refreshIcons();
  }

  function updateWishlistCount(count) {
    const element = document.getElementById("favoritelistCount");

    if (element) {
      element.textContent = count > 99 ? "99+" : String(count);
    }
  }

  /* USER CAN RETAKE THE TEST*/

  retakeQuizButton?.addEventListener("click", () => {
    resetQuiz();

    currentSectionIndex = 0;

    currentQuestionIndex = 0;

    quizStarted = true;

    showQuiz();
  });

  /* VIEW ALL CATEGORY */

  document.querySelectorAll("[data-view-category]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.viewCategory;

      window.location.href = `shop.html?category=${encodeURIComponent(category)}`;
    });
  });

  /* SHOP RECOMMENDATIONS */

  shopRecommendedButton?.addEventListener("click", () => {
    window.location.href = "shop.html";
  });

  /* HOME*/

  resultHomeButton?.addEventListener("click", () => {
    window.location.href = "beauty-test.html";
  });

  /* NAVBAR CART / WISHLIST */

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

  /* RESET */

  function resetQuiz() {
    answers = {
      makeup: [],
      skincare: [],
      haircare: [],
    };

    currentSectionIndex = 0;

    currentQuestionIndex = 0;
  }

  /*TOAST*/

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

  /* QUIZ MESSAGE*/

  function showQuizMessage(message) {
    showToast(message);
  }

  /* ICONS*/

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
     INITIAL */

  updateCartCount(getCart());

  updateWishlistCount(getWishlist().length);

  refreshIcons();

  console.log("EVE Beauty Test ready.");
});

/* =======================================================
     BEAUTY TEST - FULL PAGE SCROLL REVEAL ANIMATIONS
  ======================================================= */

if (!document.getElementById("beauty-test-scroll-style")) {
  const style = document.createElement("style");

  style.id = "beauty-test-scroll-style";

  style.textContent = `
      .beauty-test-scroll-reveal {
        opacity: 0;
        transform: translateY(28px);

        transition:
          opacity 0.65s ease,
          transform 0.65s ease;
      }

      .beauty-test-scroll-reveal.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      @media (prefers-reduced-motion: reduce) {
        .beauty-test-scroll-reveal,
        .beauty-test-scroll-reveal.is-visible {
          opacity: 1;
          transform: none;
          transition: none;
        }
      }
    `;

  document.head.appendChild(style);
}

const beautyTestScrollObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
            } else {
              entry.target.classList.remove("is-visible");
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -25px 0px",
        },
      )
    : null;

function setupBeautyTestScrollAnimations(root = document) {
  const revealSelectors = [
    /* Main page sections */
    "header",
    "main",
    "footer",
    "section",
    ".container",
    ".section",

    /* Landing screen */
    "#landingScreen > *",
    "#landingScreen h1",
    "#landingScreen h2",
    "#landingScreen h3",
    "#landingScreen p",
    "#landingScreen img",
    "#landingScreen button",
    "#landingScreen a",
    "#startAllTest",

    /* General headings and content */
    "h1",
    "h2",
    "h3",
    "h4",
    "p",
    ".section-title",
    ".section-heading",
    ".section-description",
    ".hero",
    ".hero-content",
    ".hero-image",
    ".hero-title",
    ".hero-description",
    ".hero-buttons",
    ".feature",
    ".feature-card",
    ".category-card",
    ".category-item",
    ".category-grid",
    ".categories-grid",

    /* Quiz screen */
    "#quizScreen h1",
    "#quizScreen h2",
    "#quizScreen h3",
    "#quizScreen p",
    "#quizCategoryLabel",
    "#quizQuestionNumber",
    "#quizProgressText",
    "#quizProgressBar",
    "#quizQuestion",
    "#quizQuestionImage",
    "#quizOptions",
    ".quiz-option",
    ".quiz-option-marker",
    "[data-step-indicator]",
    "#quizBackButton",
    "#quizNextButton",

    /* Results screen */
    "#resultsScreen h1",
    "#resultsScreen h2",
    "#resultsScreen h3",
    "#resultsScreen p",
    "#resultsScreen img",
    "#resultMakeup",
    "#resultMakeupDescription",
    "#resultSkin",
    "#resultSkinDescription",
    "#resultHair",
    "#resultHairDescription",
    "#shopRecommendedButton",
    "#resultHomeButton",
    "#retakeQuizButton",

    /* Recommended products */
    "#makeupRecommendations > *",
    "#skincareRecommendations > *",
    "#haircareRecommendations > *",
    ".recommendation-product",
    ".product-image-wrap",
    ".product-content",
    ".product-brand",
    ".product-name",
    ".product-rating",
    ".product-price",
    ".product-add-button",
    ".product-heart",

    /* Common images and buttons */
    "img",
    "button",
    "[data-start-section]",
    "[data-view-category]",
  ];

  const elements = root.querySelectorAll(revealSelectors.join(", "));

  elements.forEach((element, index) => {
    if (element.classList.contains("beauty-test-scroll-reveal")) {
      return;
    }

    element.classList.add("beauty-test-scroll-reveal");

    element.style.transitionDelay = `${(index % 4) * 70}ms`;

    if (beautyTestScrollObserver) {
      beautyTestScrollObserver.observe(element);
    } else {
      element.classList.add("is-visible");
    }
  });
}

/* Initialize animations for existing page elements */
setupBeautyTestScrollAnimations();
