/* =========================================================
   EVE BEAUTY — PROFILE PAGE

   Login source of truth:
   eveBeautyCurrentUser
========================================================= */

(() => {
  "use strict";

  const CURRENT_USER_KEY = "eveBeautyCurrentUser";

  const PROFILE_IMAGE_KEY = "eveBeautyProfileImage";

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const image = document.getElementById("profilePageImage");

  const imageInput = document.getElementById("profileImageInput");

  const nameTitle = document.getElementById("profilePageName");

  const emailTitle = document.getElementById("profilePageEmail");

  const nameInput = document.getElementById("profilePageNameInput");

  const emailInput = document.getElementById("profilePageEmailInput");

  const form = document.getElementById("profileForm");

  const message = document.getElementById("profileMessage");

  /* =======================================================
     GET CURRENT USER
  ======================================================= */

  function getUser() {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);

      const user = raw ? JSON.parse(raw) : null;

      return user && typeof user === "object" ? user : null;
    } catch {
      return null;
    }
  }

  /* =======================================================
     DEFAULT AVATAR
  ======================================================= */

  function defaultAvatar(name) {
    const letter =
      String(name || "U")
        .trim()
        .charAt(0)
        .toUpperCase() || "U";

    const svg = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="240"
        height="240"
        viewBox="0 0 240 240"
      >
        <rect
          width="240"
          height="240"
          rx="120"
          fill="#ead1d5"
        />

        <text
          x="120"
          y="151"
          text-anchor="middle"
          font-family="Arial,sans-serif"
          font-size="92"
          font-weight="600"
          fill="#7f2639"
        >
          ${letter}
        </text>
      </svg>
    `;

    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  /* =======================================================
     MESSAGE
  ======================================================= */

  function showMessage(text, type = "") {
    if (!message) {
      return;
    }

    message.textContent = text;

    message.className = type;
  }

  /* =======================================================
     RENDER USER
  ======================================================= */

  function render(user) {
    const name = user.name || user.fullName || user.username || "Beauty User";

    const email = user.email || "";

    const savedImage = localStorage.getItem(PROFILE_IMAGE_KEY);

    if (nameTitle) {
      nameTitle.textContent = name;
    }

    if (emailTitle) {
      emailTitle.textContent = email;
    }

    if (nameInput) {
      nameInput.value = name;
    }

    if (emailInput) {
      emailInput.value = email;
    }

    if (image) {
      image.src = savedImage || defaultAvatar(name);

      image.alt = `${name}'s profile`;
    }
  }

  /* =======================================================
     CHECK LOGIN
  ======================================================= */

  const user = getUser();

  if (!user) {
    window.location.replace("login.html");

    return;
  }

  /* =======================================================
     INITIAL RENDER
  ======================================================= */

  render(user);

  /* =======================================================
     PROFILE PHOTO
  ======================================================= */

  imageInput?.addEventListener("change", () => {
    const file = imageInput.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      showMessage("Please select an image.", "error");

      imageInput.value = "";

      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;

      if (typeof result !== "string") {
        return;
      }

      localStorage.setItem(PROFILE_IMAGE_KEY, result);

      if (image) {
        image.src = result;
      }

      showMessage("Profile photo updated successfully.", "success");

      window.dispatchEvent(new Event("eveBeautyUserChanged"));
    };

    reader.readAsDataURL(file);
  });

  /* =======================================================
     SAVE PROFILE
  ======================================================= */

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput?.value.trim() || "";

    const email = emailInput?.value.trim().toLowerCase() || "";

    /* VALIDATION */

    if (!name || !email) {
      showMessage("Please fill in all fields.", "error");

      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMessage("Please enter a valid email address.", "error");

      return;
    }

    /* GET CURRENT USER */

    const current = getUser();

    if (!current) {
      window.location.replace("login.html");

      return;
    }

    /* UPDATE USER */

    const updatedUser = {
      ...current,

      name,

      email,

      updatedAt: new Date().toISOString(),
    };

    /* SAVE CURRENT USER */

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    /* =====================================================
         UPDATE USERS DATABASE
      ===================================================== */

    try {
      const users = JSON.parse(localStorage.getItem("eveBeautyUsers") || "[]");

      if (Array.isArray(users) && current.id) {
        const index = users.findIndex((item) => item?.id === current.id);

        if (index !== -1) {
          users[index] = {
            ...users[index],

            name,

            email,

            updatedAt: updatedUser.updatedAt,
          };

          localStorage.setItem("eveBeautyUsers", JSON.stringify(users));
        }
      }
    } catch (error) {
      console.warn("Could not update users database:", error);
    }

    /* UPDATE PAGE */

    render(updatedUser);

    showMessage("Profile saved successfully.", "success");

    window.dispatchEvent(new Event("eveBeautyUserChanged"));
  });
})();
