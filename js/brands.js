document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     BRAND DATA
  ========================================================= */

  const brands = [
    {
      id: "lumiere",
      name: "LUMIÈRE",
      searchNames: ["lumiere", "lumière"],
      tagline: "Radiance in every detail",
      image: "assets/images/brand-lumiere.jpg",

      description:
        "LUMIÈRE focuses on radiant skincare and elegant beauty rituals designed to leave skin looking fresh, hydrated and luminous.",

      benefits: ["Radiant skin", "Deep hydration", "Gentle formulas"],

      products: ["Radiance Serum", "Hydra Cream", "Glow SPF 50"],

      createdBy: "LUMIÈRE Beauty Laboratory",

      productDetails: [
        {
          name: "Radiance Serum",
          image: "assets/images/product-radiance-serum.jpg",
          description:
            "A lightweight serum created to support a brighter, smoother and more luminous-looking complexion.",
        },
        {
          name: "Hydra Cream",
          image: "assets/images/product-hydra-cream.jpg",
          description:
            "A nourishing daily moisturizer designed to keep skin soft, comfortable and deeply hydrated.",
        },
        {
          name: "Glow SPF 50",
          image: "assets/images/product-glow-spf-50.jpg",
          description:
            "A daily SPF formula combining lightweight hydration with high sun protection for a fresh finish.",
        },
      ],
    },

    {
      id: "eve",
      name: "EVE BEAUTY",
      searchNames: ["eve", "eve beauty"],
      tagline: "Pure. Natural. You.",
      image: "assets/images/brand-eve.jpg",

      description:
        "EVE Beauty combines modern beauty essentials with a soft, natural approach to skincare, makeup and everyday beauty.",

      benefits: ["Everyday beauty", "Natural finish", "Skin-friendly"],

      products: [
        "Cica Repair Cream",
        "Vitamin C Glow Serum",
        "Rose Milk Cleanser",
      ],

      createdBy: "EVE Beauty Studio",

      productDetails: [
        {
          name: "Cica Repair Cream",
          image: "assets/images/product-cicapair-cream.jpg",
          description:
            "A comforting cream designed to support the skin barrier while leaving skin soft and balanced.",
        },
        {
          name: "Vitamin C Glow Serum",
          image: "assets/images/product-vitamin-c-glow-serum.jpg",
          description:
            "A brightening serum designed to give skin a fresher, more radiant and even-looking appearance.",
        },
        {
          name: "Rose Milk Cleanser",
          image: "assets/images/product-rose-milk-cleanser.jpg",
          description:
            "A gentle milky cleanser that removes daily impurities while maintaining a soft skin feel.",
        },
      ],
    },

    {
      id: "caudalie",
      name: "CAUDALIE",
      searchNames: ["caudalie"],
      tagline: "Nature's power for your skin",
      image: "assets/images/brand-caudalie.jpg",

      description:
        "Caudalie is known for combining grape-derived ingredients with skincare research to create products focused on hydration and skin radiance.",

      benefits: ["Antioxidant care", "Skin radiance", "Hydration"],

      products: ["Vinoperfect Serum", "Beauty Elixir", "Premier Cru Cream"],

      createdBy: "Mathilde and Bertrand Thomas",

      productDetails: [
        {
          name: "Vinoperfect Serum",
          image: "assets/images/product-vinoperfect-serum.jpg",
          description:
            "A signature brightening serum designed to improve the appearance of dark spots and boost radiance.",
        },
        {
          name: "Beauty Elixir",
          image: "assets/images/product-beauty-elixir.jpg",
          description:
            "A refreshing facial mist designed to instantly refresh the skin and give it a luminous appearance.",
        },
        {
          name: "Premier Cru Cream",
          image: "assets/images/product-premier-cru-cream.jpg",
          description:
            "A rich anti-aging cream created to nourish skin and support a smoother, more radiant appearance.",
        },
      ],
    },

    {
      id: "laroche",
      name: "LA ROCHE-POSAY",
      searchNames: ["la roche-posay", "laroche", "la roche posay"],
      tagline: "Better skin. A healthier life.",
      image: "assets/images/brand-la-roche-posay.jpg",

      description:
        "La Roche-Posay develops dermatological skincare with a focus on sensitive and reactive skin.",

      benefits: ["Sensitive skin", "Barrier support", "Dermatological care"],

      products: ["Cicaplast Baume", "Effaclar Duo", "Anthelios SPF"],

      createdBy: "La Roche-Posay Dermatological Laboratories",

      productDetails: [
        {
          name: "Cicaplast Baume",
          image: "assets/images/product-cicaplast-baume.jpg",
          description:
            "A soothing multi-purpose balm designed to comfort dry and sensitive skin and support the skin barrier.",
        },
        {
          name: "Effaclar Duo",
          image: "assets/images/product-effaclar-duo.jpg",
          description:
            "A lightweight treatment designed for blemish-prone skin and a smoother-looking complexion.",
        },
        {
          name: "Anthelios SPF",
          image: "assets/images/product-anthelios-spf.jpg",
          description:
            "A daily sunscreen designed to provide high UVA and UVB protection with a comfortable finish.",
        },
      ],
    },

    {
      id: "kerastase",
      name: "KÉRASTASE",
      searchNames: ["kerastase", "kérastase"],
      tagline: "Healthy hair. More confidence.",
      image: "assets/images/brand-kerastase.jpg",

      description:
        "Kérastase specializes in premium haircare designed around different hair types, concerns and professional beauty routines.",

      benefits: ["Hair nourishment", "Strength", "Smoothness"],

      products: ["Elixir Ultime", "Nutritive Shampoo", "Genesis Serum"],

      createdBy: "Kérastase Research & Innovation",

      productDetails: [
        {
          name: "Elixir Ultime",
          image: "assets/images/product-elixir-ultime.jpg",
          description:
            "A lightweight hair oil designed to add shine, smoothness and a polished finish to the hair.",
        },
        {
          name: "Nutritive Shampoo",
          image: "assets/images/product-nutritive-shampoo.jpg",
          description:
            "A nourishing shampoo designed for dry hair that needs softness, comfort and manageability.",
        },
        {
          name: "Genesis Serum",
          image: "assets/images/product-genesis-serum.jpg",
          description:
            "A scalp and hair serum designed as part of a routine focused on stronger-looking hair.",
        },
      ],
    },

    {
      id: "maybelline",
      name: "MAYBELLINE",
      searchNames: ["maybelline", "maybelline new york"],
      tagline: "Make it happen",
      image: "assets/images/brand-maybelline.jpg",

      description:
        "Maybelline offers accessible makeup across complexion, eyes and lips with products designed for everyday beauty looks.",

      benefits: ["Everyday makeup", "Bold looks", "Affordable beauty"],

      products: [
        "Lash Sensational",
        "Fit Me Foundation",
        "SuperStay Lip Color",
      ],

      createdBy: "Maybelline New York",

      productDetails: [
        {
          name: "Lash Sensational",
          image: "assets/images/product-lash-sensational.jpg",
          description:
            "A mascara designed to build fuller-looking lashes while separating and defining individual lashes.",
        },
        {
          name: "Fit Me Foundation",
          image: "assets/images/product-fit-me-foundation.jpg",
          description:
            "An everyday foundation designed to provide natural-looking coverage with a comfortable finish.",
        },
        {
          name: "SuperStay Lip Color",
          image: "assets/images/product-superstay-lip-color.jpg",
          description:
            "A long-wearing lip color designed to deliver bold color with lasting wear throughout the day.",
        },
      ],
    },

    {
      id: "dior",
      name: "DIOR",
      searchNames: ["dior"],
      tagline: "Beauty beyond time.",
      image: "assets/images/brand-dior.jpg",

      description:
        "Dior brings together luxury fragrance, makeup and skincare with a strong emphasis on sophisticated beauty presentation.",

      benefits: ["Luxury beauty", "Elegant formulas", "Signature fragrance"],

      products: ["Miss Dior", "Dior Addict", "Capture Totale"],

      createdBy: "Christian Dior Beauty",

      productDetails: [
        {
          name: "Miss Dior",
          image: "assets/images/product-miss-dior.jpg",
          description:
            "A signature Dior fragrance built around a feminine floral character and an elegant, sophisticated presentation.",
        },
        {
          name: "Dior Addict",
          image: "assets/images/product-dior-addict.jpg",
          description:
            "A statement beauty collection known for expressive color, shine and a distinctive Dior aesthetic.",
        },
        {
          name: "Capture Totale",
          image: "assets/images/product-capture-totale.jpg",
          description:
            "A premium skincare collection focused on a smoother, firmer and more radiant-looking complexion.",
        },
      ],
    },

    {
      id: "chanel",
      name: "CHANEL",
      searchNames: ["chanel"],
      tagline: "Timeless elegance",
      image: "assets/images/brand-chanel.jpg",

      description:
        "CHANEL offers luxury fragrance, makeup and skincare built around its distinctive aesthetic and long-established beauty collections.",

      benefits: ["Luxury beauty", "Signature scents", "Elegant makeup"],

      products: ["Coco Mademoiselle", "N°5", "Les Beiges"],

      createdBy: "CHANEL Beauty",

      productDetails: [
        {
          name: "Coco Mademoiselle",
          image: "assets/images/product-coco-mademoiselle.jpg",
          description:
            "A modern Chanel fragrance with a sophisticated character designed around fresh citrus and elegant floral notes.",
        },
        {
          name: "N°5",
          image: "assets/images/product-n5.jpg",
          description:
            "An iconic Chanel fragrance known for its distinctive floral-aldehydic character and timeless identity.",
        },
        {
          name: "Les Beiges",
          image: "assets/images/product-les-beiges.jpg",
          description:
            "A natural-looking makeup collection designed to create fresh, effortless and luminous beauty looks.",
        },
      ],
    },
  ];

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const searchForm = document.getElementById("brandSearchForm");
  const searchInput = document.getElementById("brandSearchInput");

  const brandResult = document.getElementById("brandResult");

  const brandResultInner = brandResult
    ? brandResult.querySelector(".brand-result-inner")
    : null;

  /* =========================================================
     FIND BRAND
  ========================================================= */

  function findBrand(value) {
    const search = value.trim().toLowerCase();

    if (!search) {
      return null;
    }

    return brands.find((brand) => {
      if (brand.name.toLowerCase().includes(search)) {
        return true;
      }

      return brand.searchNames.some((name) =>
        name.toLowerCase().includes(search),
      );
    });
  }

  /* =========================================================
     CREATE GET INFO MODAL STYLES
  ========================================================= */

  function createModalStyles() {
    if (document.getElementById("brand-modal-styles")) {
      return;
    }

    const style = document.createElement("style");

    style.id = "brand-modal-styles";

    style.textContent = `
      /* =====================================================
         GET INFO MODAL
      ===================================================== */

      #brandResult.brand-result {
        position: fixed !important;
        inset: 0 !important;

        width: 100% !important;
        height: 100% !important;

        display: flex !important;
        align-items: center !important;
        justify-content: center !important;

        padding: 25px !important;

        background: rgba(30, 20, 23, 0.55) !important;

        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);

        z-index: 999999 !important;

        border: none !important;

        overflow-y: auto !important;
      }

      #brandResult[hidden] {
        display: none !important;
      }

      #brandResult .brand-result-inner {
        position: relative !important;

        width: min(760px, 94vw) !important;
        max-height: 88vh !important;

        overflow-y: auto !important;

        margin: 0 !important;
        padding: 0 !important;

        border: 1px solid #e3d5d7 !important;
        border-radius: 20px !important;

        background: #fffafa !important;

        box-shadow:
          0 30px 80px rgba(45, 25, 30, 0.25),
          0 5px 20px rgba(45, 25, 30, 0.12) !important;

        animation: brandModalOpen 0.28s ease both;
      }

      .brand-modal-close {
        position: absolute;

        top: 14px;
        right: 14px;

        width: 36px;
        height: 36px;

        display: grid;
        place-items: center;

        border: 1px solid rgba(255,255,255,0.7);
        border-radius: 50%;

        background: rgba(255,255,255,0.92);

        color: #5e5053;

        font-size: 23px;
        line-height: 1;

        cursor: pointer;

        z-index: 5;

        transition: 0.2s ease;
      }

      .brand-modal-close:hover {
        background: #aa8386;
        color: #fff;

        transform: rotate(90deg);
      }

      .brand-modal-image {
        width: 100%;
        height: 245px;

        overflow: hidden;

        background: #f4e7e8;

        border-radius: 20px 20px 0 0;
      }

      .brand-modal-image img {
        width: 100%;
        height: 100%;

        display: block;

        object-fit: cover;
      }

      .brand-modal-content {
        padding: 28px 30px 30px;
      }

      .brand-modal-label {
        display: block;

        margin-bottom: 7px;

        color: #aa8386;

        font-size: 9px;
        font-weight: 600;

        letter-spacing: 2px;
        text-transform: uppercase;
      }

      .brand-modal-content h2 {
        margin: 0;

        color: #30272a;

        font-family: "Cormorant Garamond", Georgia, serif;

        font-size: clamp(34px, 5vw, 48px);
        font-weight: 500;

        line-height: 1;
      }

      .brand-modal-tagline {
        margin: 7px 0 0;

        color: #aa8386;

        font-family: "Cormorant Garamond", Georgia, serif;

        font-size: 18px;
        font-style: italic;
      }

      .brand-modal-description {
        margin: 18px 0 0;

        color: #6d6062;

        font-size: 12px;
        line-height: 1.8;
      }

      .brand-modal-info {
        display: grid;

        grid-template-columns: repeat(2, 1fr);

        gap: 12px;

        margin-top: 23px;
      }

      .brand-modal-box {
        padding: 16px;

        border: 1px solid #eadfe0;
        border-radius: 12px;

        background: #fff;
      }

      .brand-modal-box.products-box {
        grid-column: 1 / -1;
      }

      .brand-modal-box-label {
        display: block;

        margin-bottom: 9px;

        color: #aa8386;

        font-size: 8px;
        font-weight: 600;

        letter-spacing: 1.5px;
      }

      .brand-modal-box ul {
        display: flex;
        flex-wrap: wrap;

        gap: 7px;

        margin: 0;
        padding: 0;

        list-style: none;
      }

      .brand-modal-box li {
        padding: 6px 10px;

        border-radius: 20px;

        background: #f8eeee;

        color: #705d60;

        font-size: 10px;
      }

      @keyframes brandModalOpen {
        from {
          opacity: 0;
          transform: scale(0.94) translateY(12px);
        }

        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      @media (max-width: 600px) {
        #brandResult.brand-result {
          padding: 15px !important;
        }

        #brandResult .brand-result-inner {
          width: 100% !important;
          max-height: 92vh !important;

          border-radius: 17px !important;
        }

        .brand-modal-image {
          height: 190px;

          border-radius: 17px 17px 0 0;
        }

        .brand-modal-content {
          padding: 23px 19px 22px;
        }

        .brand-modal-info {
          grid-template-columns: 1fr;
        }

        .brand-modal-box.products-box {
          grid-column: auto;
        }
      }

      body.dark-mode #brandResult.brand-result {
        background: rgba(5, 4, 5, 0.72) !important;
      }

      body.dark-mode #brandResult .brand-result-inner {
        background: #21191c !important;
        border-color: #443336 !important;

        box-shadow:
          0 30px 80px rgba(0, 0, 0, 0.55),
          0 5px 20px rgba(0, 0, 0, 0.35) !important;
      }

      body.dark-mode .brand-modal-image {
        background: #2a2023;
      }

      body.dark-mode .brand-modal-close {
        background: rgba(40, 31, 34, 0.95);
        border-color: #554347;
        color: #eadfe1;
      }

      body.dark-mode .brand-modal-close:hover {
        background: #aa8386;
        color: #fff;
      }

      body.dark-mode .brand-modal-content h2 {
        color: #f4e8ea;
      }

      body.dark-mode .brand-modal-description {
        color: #c1afb3;
      }

      body.dark-mode .brand-modal-box {
        background: #171315;
        border-color: #443336;
      }

      body.dark-mode .brand-modal-box li {
        background: #302528;
        color: #d5c4c7;
      }


      /* =====================================================
         EXPLORE BRAND MODAL
      ===================================================== */

      #exploreBrandModal {
        position: fixed;

        inset: 0;

        width: 100%;
        height: 100%;

        display: flex;

        align-items: center;
        justify-content: center;

        padding: 25px;

        background: rgba(30, 20, 23, 0.58);

        backdrop-filter: blur(7px);
        -webkit-backdrop-filter: blur(7px);

        z-index: 1000000;

        overflow-y: auto;

        animation: exploreOverlayIn 0.25s ease both;
      }

      #exploreBrandModal[hidden] {
        display: none;
      }

      .explore-modal-inner {
        position: relative;

        width: min(1000px, 95vw);

        max-height: 90vh;

        overflow-y: auto;

        border: 1px solid #e5d6d8;

        border-radius: 24px;

        background: #fffafa;

        box-shadow:
          0 35px 100px rgba(43, 28, 32, 0.28),
          0 10px 30px rgba(43, 28, 32, 0.13);

        animation: exploreModalOpen 0.38s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .explore-modal-close {
        position: absolute;

        top: 16px;
        right: 16px;

        z-index: 20;

        width: 40px;
        height: 40px;

        display: grid;
        place-items: center;

        border: 1px solid rgba(170, 131, 134, 0.3);

        border-radius: 50%;

        background: rgba(255,255,255,0.94);

        color: #65575a;

        font-size: 22px;

        cursor: pointer;

        transition: 0.25s ease;
      }

      .explore-modal-close:hover {
        background: #aa8386;
        color: #fff;

        transform: rotate(90deg);
      }

      .explore-modal-top {
        display: grid;

        grid-template-columns: 38% 62%;

        min-height: 330px;
      }

      .explore-brand-image {
        min-height: 330px;

        overflow: hidden;

        background: #f3e4e5;

        border-radius: 24px 0 0 0;
      }

      .explore-brand-image img {
        width: 100%;
        height: 100%;

        display: block;

        object-fit: cover;

        transition: transform 0.7s ease;
      }

      .explore-modal-inner:hover .explore-brand-image img {
        transform: scale(1.025);
      }

      .explore-brand-intro {
        display: flex;

        flex-direction: column;

        justify-content: center;

        padding: 45px;
      }

      .explore-brand-label {
        color: #aa8386;

        font-size: 9px;

        font-weight: 600;

        letter-spacing: 2.5px;

        text-transform: uppercase;
      }

      .explore-brand-intro h2 {
        margin-top: 8px;

        color: #30272a;

        font-family: "Cormorant Garamond", Georgia, serif;

        font-size: clamp(45px, 6vw, 65px);

        font-weight: 500;

        line-height: 0.9;
      }

      .explore-brand-tagline {
        margin-top: 10px;

        color: #aa8386;

        font-family: "Cormorant Garamond", Georgia, serif;

        font-size: 19px;

        font-style: italic;
      }

      .explore-brand-description {
        max-width: 510px;

        margin-top: 20px;

        color: #716467;

        font-size: 12px;

        line-height: 1.85;
      }

      /* =====================================================
         CREATED BY
      ===================================================== */

      .explore-created {
        display: flex;

        align-items: center;

        gap: 13px;

        margin-top: 25px;

        padding-top: 17px;

        border-top: 1px solid #eadfe0;
      }

      .explore-created-icon {
        width: 35px;
        height: 35px;

        display: grid;
        place-items: center;

        flex-shrink: 0;

        border: 1px solid #dcbfc2;

        border-radius: 50%;

        color: #aa8386;

        font-size: 15px;
      }

      .explore-created-label {
        display: block;

        color: #aa8386;

        font-size: 7px;

        font-weight: 600;

        letter-spacing: 1.6px;

        text-transform: uppercase;
      }

      .explore-created-name {
        display: block;

        margin-top: 2px;

        color: #413437;

        font-family: "Cormorant Garamond", Georgia, serif;

        font-size: 17px;

        line-height: 1.1;
      }

      /* =====================================================
         POPULAR PRODUCTS
      ===================================================== */

      .explore-products {
        padding: 35px 42px 42px;

        border-top: 1px solid #e8dcdd;

        background: #fcf7f7;
      }

      .explore-products-header {
        display: flex;

        align-items: flex-end;

        justify-content: space-between;

        gap: 20px;

        margin-bottom: 20px;
      }

      .explore-products-label {
        color: #aa8386;

        font-size: 9px;

        font-weight: 600;

        letter-spacing: 2px;

        text-transform: uppercase;
      }

      .explore-products-title {
        margin-top: 5px;

        color: #30272a;

        font-family: "Cormorant Garamond", Georgia, serif;

        font-size: 32px;

        font-weight: 500;

        line-height: 1;
      }

      .explore-products-note {
        color: #88797c;

        font-size: 9px;
      }

      .explore-product-grid {
        display: grid;

        grid-template-columns: repeat(3, 1fr);

        gap: 14px;
      }

      .explore-product-card {
        overflow: hidden;

        border: 1px solid #e8dcdd;

        border-radius: 15px;

        background: #fff;

        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease,
          border-color 0.3s ease;
      }

      .explore-product-card:hover {
        transform: translateY(-5px);

        border-color: #d6babc;

        box-shadow: 0 14px 30px rgba(83, 50, 55, 0.1);
      }

      .explore-product-image {
        width: 100%;

        height: 180px;

        overflow: hidden;

        background: #f4e8e9;
      }

      .explore-product-image img {
        width: 100%;
        height: 100%;

        display: block;

        object-fit: cover;

        transition: transform 0.55s ease;
      }

      .explore-product-card:hover .explore-product-image img {
        transform: scale(1.06);
      }

      .explore-product-content {
        padding: 16px;
      }

      .explore-product-number {
        color: #aa8386;

        font-size: 8px;

        font-weight: 600;

        letter-spacing: 1.5px;
      }

      .explore-product-content h4 {
        margin-top: 5px;

        color: #30272a;

        font-family: "Cormorant Garamond", Georgia, serif;

        font-size: 21px;

        font-weight: 500;

        line-height: 1.1;
      }

      .explore-product-content p {
        margin-top: 8px;

        color: #776a6d;

        font-size: 9px;

        line-height: 1.7;
      }

      /* =====================================================
         EXPLORE ANIMATIONS
      ===================================================== */

      @keyframes exploreOverlayIn {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }

      @keyframes exploreModalOpen {
        from {
          opacity: 0;
          transform: translateY(20px) scale(0.97);
        }

        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      /* =====================================================
         EXPLORE DARK MODE
      ===================================================== */

      body.dark-mode #exploreBrandModal {
        background: rgba(5, 4, 5, 0.75);
      }

      body.dark-mode .explore-modal-inner {
        background: #21191c;

        border-color: #443336;

        box-shadow:
          0 35px 100px rgba(0,0,0,0.58),
          0 10px 30px rgba(0,0,0,0.35);
      }

      body.dark-mode .explore-modal-close {
        background: #302326;

        border-color: #554246;

        color: #eadcdf;
      }

      body.dark-mode .explore-modal-close:hover {
        background: #aa8386;
        color: #fff;
      }

      body.dark-mode .explore-brand-image {
        background: #302326;
      }

      body.dark-mode .explore-brand-intro h2 {
        color: #f4e8ea;
      }

      body.dark-mode .explore-brand-description {
        color: #c1afb3;
      }

      body.dark-mode .explore-created {
        border-color: #443336;
      }

      body.dark-mode .explore-created-icon {
        border-color: #665054;
        color: #cf9ca1;
      }

      body.dark-mode .explore-created-name {
        color: #eadfe1;
      }

      body.dark-mode .explore-products {
        background: #1b1618;

        border-color: #443336;
      }

      body.dark-mode .explore-products-title {
        color: #f4e8ea;
      }

      body.dark-mode .explore-products-note {
        color: #a99a9e;
      }

      body.dark-mode .explore-product-card {
        background: #251c1f;

        border-color: #443336;
      }

      body.dark-mode .explore-product-card:hover {
        border-color: #665054;

        box-shadow: 0 14px 30px rgba(0,0,0,0.22);
      }

      body.dark-mode .explore-product-image {
        background: #302326;
      }

      body.dark-mode .explore-product-content h4 {
        color: #f4e8ea;
      }

      body.dark-mode .explore-product-content p {
        color: #bcaeb1;
      }

      /* =====================================================
         MOBILE EXPLORE
      ===================================================== */

      @media (max-width: 750px) {

        #exploreBrandModal {
          padding: 12px;
        }

        .explore-modal-inner {
          width: 100%;

          max-height: 94vh;

          border-radius: 19px;
        }

        .explore-modal-top {
          grid-template-columns: 1fr;

          min-height: auto;
        }

        .explore-brand-image {
          height: 220px;

          min-height: 220px;

          border-radius: 19px 19px 0 0;
        }

        .explore-brand-intro {
          padding: 27px 22px 30px;
        }

        .explore-brand-intro h2 {
          font-size: 43px;
        }

        .explore-products {
          padding: 28px 18px 25px;
        }

        .explore-products-header {
          display: block;
        }

        .explore-products-note {
          display: block;

          margin-top: 7px;
        }

        .explore-product-grid {
          grid-template-columns: 1fr;
        }

        .explore-product-image {
          height: 210px;
        }
      }

      @media (max-width: 430px) {

        #exploreBrandModal {
          padding: 8px;
        }

        .explore-modal-inner {
          border-radius: 16px;
        }

        .explore-brand-image {
          height: 180px;

          min-height: 180px;

          border-radius: 16px 16px 0 0;
        }

        .explore-brand-intro {
          padding: 23px 18px 25px;
        }

        .explore-brand-intro h2 {
          font-size: 37px;
        }

        .explore-brand-description {
          font-size: 11px;
        }

        .explore-products {
          padding: 25px 15px 20px;
        }

        .explore-product-image {
          height: 190px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /* =========================================================
     SHOW GET INFO MODAL
  ========================================================= */

  function showBrandInfo(brand) {
    if (!brandResult || !brandResultInner) {
      console.error("brandResult or brandResultInner not found.");
      return;
    }

    closeExploreBrand();

    brandResultInner.innerHTML = `
      <button
        type="button"
        class="brand-modal-close"
        aria-label="Close brand information"
      >
        ×
      </button>

      <div class="brand-modal-image">
        <img
          src="${escapeHTML(brand.image)}"
          alt="${escapeHTML(brand.name)}"
          onerror="this.style.display='none';"
        />
      </div>

      <div class="brand-modal-content">

        <span class="brand-modal-label">
          BRAND INFORMATION
        </span>

        <h2>
          ${escapeHTML(brand.name)}
        </h2>

        <p class="brand-modal-tagline">
          ${escapeHTML(brand.tagline)}
        </p>

        <p class="brand-modal-description">
          ${escapeHTML(brand.description)}
        </p>

        <div class="brand-modal-info">

          <div class="brand-modal-box">

            <span class="brand-modal-box-label">
              KEY BENEFITS
            </span>

            <ul>
              ${brand.benefits
                .map((benefit) => `<li>${escapeHTML(benefit)}</li>`)
                .join("")}
            </ul>

          </div>

          <div class="brand-modal-box">

            <span class="brand-modal-box-label">
              BEST FOR
            </span>

            <ul>
              ${brand.benefits
                .slice(0, 3)
                .map((benefit) => `<li>${escapeHTML(benefit)}</li>`)
                .join("")}
            </ul>

          </div>

          <div class="brand-modal-box products-box">

            <span class="brand-modal-box-label">
              POPULAR PRODUCTS
            </span>

            <ul>
              ${brand.products
                .map((product) => `<li>${escapeHTML(product)}</li>`)
                .join("")}
            </ul>

          </div>

        </div>

      </div>
    `;

    brandResult.hidden = false;

    brandResult.classList.add("show");

    document.body.style.overflow = "hidden";

    const closeButton = brandResult.querySelector(".brand-modal-close");

    if (closeButton) {
      closeButton.addEventListener("click", closeBrandInfo);
    }

    brandResult.addEventListener("click", handleModalBackgroundClick);

    document.addEventListener("keydown", handleEscapeKey);
  }

  /* =========================================================
     SHOW EXPLORE BRAND MODAL
  ========================================================= */

  function showExploreBrand(brand) {
    closeBrandInfo();

    let modal = document.getElementById("exploreBrandModal");

    if (!modal) {
      modal = document.createElement("div");

      modal.id = "exploreBrandModal";

      document.body.appendChild(modal);
    }

    const productDetails =
      brand.productDetails && brand.productDetails.length
        ? brand.productDetails
        : brand.products.map((product, index) => ({
            name: product,
            image: brand.image,
            description:
              "A signature product from this brand's beauty collection.",
          }));

    modal.innerHTML = `
      <div class="explore-modal-inner">

        <button
          type="button"
          class="explore-modal-close"
          aria-label="Close explore brand"
        >
          ×
        </button>

        <div class="explore-modal-top">

          <div class="explore-brand-image">

            <img
              src="${escapeHTML(brand.image)}"
              alt="${escapeHTML(brand.name)}"
              onerror="this.style.display='none';"
            />

          </div>

          <div class="explore-brand-intro">

            <span class="explore-brand-label">
              DISCOVER THE BRAND
            </span>

            <h2>
              ${escapeHTML(brand.name)}
            </h2>

            <p class="explore-brand-tagline">
              ${escapeHTML(brand.tagline)}
            </p>

            <p class="explore-brand-description">
              ${escapeHTML(brand.description)}
            </p>

            <div class="explore-created">

              <div class="explore-created-icon">
                ✦
              </div>

              <div>
                <span class="explore-created-label">
                  CREATED BY
                </span>

                <span class="explore-created-name">
                  ${escapeHTML(brand.createdBy || brand.name)}
                </span>
              </div>

            </div>

          </div>

        </div>

        <section class="explore-products">

          <div class="explore-products-header">

            <div>
              <span class="explore-products-label">
                SIGNATURE COLLECTION
              </span>

              <h3 class="explore-products-title">
                Popular Products
              </h3>
            </div>

            <span class="explore-products-note">
              Three products worth discovering
            </span>

          </div>

          <div class="explore-product-grid">

            ${productDetails
              .slice(0, 3)
              .map(
                (product, index) => `
                  <article class="explore-product-card">

                    <div class="explore-product-image">

                      <img
                        src="${escapeHTML(product.image)}"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy"
                        onerror="
                          this.onerror=null;
                          this.src='${escapeHTML(brand.image)}';
                        "
                      />

                    </div>

                    <div class="explore-product-content">

                      <span class="explore-product-number">
                        0${index + 1}
                      </span>

                      <h4>
                        ${escapeHTML(product.name)}
                      </h4>

                      <p>
                        ${escapeHTML(product.description)}
                      </p>

                    </div>

                  </article>
                `,
              )
              .join("")}

          </div>

        </section>

      </div>
    `;

    modal.hidden = false;

    document.body.style.overflow = "hidden";

    const closeButton = modal.querySelector(".explore-modal-close");

    if (closeButton) {
      closeButton.addEventListener("click", closeExploreBrand);
    }

    modal.addEventListener("click", handleExploreBackgroundClick);

    document.addEventListener("keydown", handleExploreEscapeKey);
  }

  /* =========================================================
     CLOSE EXPLORE BRAND
  ========================================================= */

  function closeExploreBrand() {
    const modal = document.getElementById("exploreBrandModal");

    if (!modal) return;

    modal.hidden = true;

    document.body.style.overflow = "";

    modal.removeEventListener("click", handleExploreBackgroundClick);

    document.removeEventListener("keydown", handleExploreEscapeKey);
  }

  /* =========================================================
     EXPLORE BACKGROUND CLICK
  ========================================================= */

  function handleExploreBackgroundClick(event) {
    if (event.target.id === "exploreBrandModal") {
      closeExploreBrand();
    }
  }

  /* =========================================================
     EXPLORE ESC
  ========================================================= */

  function handleExploreEscapeKey(event) {
    if (event.key === "Escape") {
      closeExploreBrand();
    }
  }

  /* =========================================================
     CLOSE GET INFO
  ========================================================= */

  function closeBrandInfo() {
    if (!brandResult) return;

    brandResult.classList.remove("show");

    brandResult.hidden = true;

    document.body.style.overflow = "";

    brandResult.removeEventListener("click", handleModalBackgroundClick);

    document.removeEventListener("keydown", handleEscapeKey);
  }

  /* =========================================================
     GET INFO BACKGROUND CLICK
  ========================================================= */

  function handleModalBackgroundClick(event) {
    if (event.target === brandResult) {
      closeBrandInfo();
    }
  }

  /* =========================================================
     GET INFO ESC
  ========================================================= */

  function handleEscapeKey(event) {
    if (event.key === "Escape") {
      closeBrandInfo();
    }
  }

  /* =========================================================
     NOT FOUND
  ========================================================= */

  function showNotFound(value) {
    if (!brandResult || !brandResultInner) return;

    closeExploreBrand();

    brandResultInner.innerHTML = `
      <button
        type="button"
        class="brand-modal-close"
        aria-label="Close"
      >
        ×
      </button>

      <div class="brand-modal-content">

        <span class="brand-modal-label">
          BRAND INFORMATION
        </span>

        <h2>
          Brand Not Found
        </h2>

        <p class="brand-modal-description">
          We couldn't find information for
          "<strong>${escapeHTML(value)}</strong>".
          Please try another brand such as
          Dior, Chanel, Caudalie or LUMIÈRE.
        </p>

      </div>
    `;

    brandResult.hidden = false;

    brandResult.classList.add("show");

    document.body.style.overflow = "hidden";

    const closeButton = brandResult.querySelector(".brand-modal-close");

    if (closeButton) {
      closeButton.addEventListener("click", closeBrandInfo);
    }

    brandResult.addEventListener("click", handleModalBackgroundClick);

    document.addEventListener("keydown", handleEscapeKey);
  }

  /* =========================================================
     SEARCH FORM
  ========================================================= */

  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const value = searchInput ? searchInput.value.trim() : "";

      if (!value) {
        if (searchInput) {
          searchInput.focus();
        }

        return;
      }

      const brand = findBrand(value);

      if (brand) {
        showBrandInfo(brand);
      } else {
        showNotFound(value);
      }
    });
  }

  /* =========================================================
     EXPLORE BRAND BUTTONS
  ========================================================= */

  const exploreButtons = document.querySelectorAll(".brand-explore");

  exploreButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const brandName = button.dataset.brand || "";

      const brand = findBrand(brandName);

      if (brand) {
        showExploreBrand(brand);
      }
    });
  });

  /* =========================================================
     ENTER KEY
  ========================================================= */

  if (searchInput && searchForm) {
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        searchForm.requestSubmit();
      }
    });
  }

  /* =========================================================
     ESCAPE HTML
  ========================================================= */

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* =========================================================
     INITIALIZE STYLES
  ========================================================= */

  createModalStyles();

  /* =========================================================
     INITIAL STATE
  ========================================================= */

  if (brandResult) {
    brandResult.hidden = true;
  }
});
