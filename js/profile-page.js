/* =========================================================
   EVE BEAUTY
   PROFILE PAGE
   ========================================================= */

/* =========================================================
   ELEMENTS
   ========================================================= */

const profilePageImage = document.getElementById("profilePageImage");

const profileImageInput = document.getElementById("profileImageInput");

const profilePageName = document.getElementById("profilePageName");

const profilePageEmail = document.getElementById("profilePageEmail");

const profilePageNameInput = document.getElementById("profilePageNameInput");

const profilePageEmailInput = document.getElementById("profilePageEmailInput");

const profileForm = document.getElementById("profileForm");

const profileMessage = document.getElementById("profileMessage");

/* =========================================================
   CHECK LOGIN
   ========================================================= */

const isLoggedIn = localStorage.getItem("eveBeautyLoggedIn") === "true";

if (!isLoggedIn) {
  window.location.href = "login.html";
}

/* =========================================================
   LOAD USER
   ========================================================= */

const savedUser = localStorage.getItem("eveBeautyUser");

if (savedUser) {
  try {
    const user = JSON.parse(savedUser);

    /* Name */

    profilePageName.textContent = user.name || "Beauty User";

    profilePageNameInput.value = user.name || "";

    /* Email */

    profilePageEmail.textContent = user.email || "";

    profilePageEmailInput.value = user.email || "";
  } catch (error) {
    console.error("Could not load user.");
  }
}

/* =========================================================
   LOAD PROFILE IMAGE
   ========================================================= */

const savedProfileImage = localStorage.getItem("eveBeautyProfileImage");

if (savedProfileImage) {
  profilePageImage.src = savedProfileImage;
} else {
  /*
    Default image only if
    user has not selected one.
  */

  profilePageImage.src = "images/default-profile.png";
}

/* =========================================================
   CHANGE PROFILE PHOTO
   ========================================================= */

if (profileImageInput) {
  profileImageInput.addEventListener("change", function () {
    const file = profileImageInput.files[0];

    if (!file) {
      return;
    }

    /* Only images */

    if (!file.type.startsWith("image/")) {
      profileMessage.textContent = "Please select an image.";

      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      const imageData = event.target.result;

      /*
          Save image to localStorage.
        */

      localStorage.setItem("eveBeautyProfileImage", imageData);

      /*
          Show immediately.
        */

      profilePageImage.src = imageData;

      profileMessage.textContent = "Profile photo updated successfully.";
    };

    reader.readAsDataURL(file);
  });
}

/* =========================================================
   SAVE PROFILE
   ========================================================= */

if (profileForm) {
  profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = profilePageNameInput.value.trim();

    const email = profilePageEmailInput.value.trim().toLowerCase();

    if (!name || !email) {
      profileMessage.textContent = "Please fill in all fields.";

      return;
    }

    /* Get old account */

    const savedAccount = localStorage.getItem("eveBeautyAccount");

    let account = {};

    if (savedAccount) {
      try {
        account = JSON.parse(savedAccount);
      } catch (error) {
        account = {};
      }
    }

    /*
        Update account
      */

    account.name = name;

    account.email = email;

    /*
        Save account
      */

    localStorage.setItem("eveBeautyAccount", JSON.stringify(account));

    /*
        Update current user
      */

    const user = {
      name: name,

      email: email,
    };

    localStorage.setItem("eveBeautyUser", JSON.stringify(user));

    /*
        Update page
      */

    profilePageName.textContent = name;

    profilePageEmail.textContent = email;

    profileMessage.textContent = "Profile saved successfully.";
  });
}
