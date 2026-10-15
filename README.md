EVE BEAUTY

1. Project Overview

EVE BEAUTY is a beauty and cosmetics e-commerce website developed to provide users with an interactive and user-friendly online shopping experience. The website allows users to explore beauty products, discover brands, view trending items, manage their shopping cart and wishlist, and access personalized beauty-related features.

2. Project Objectives

- Create an attractive and user-friendly beauty shopping website.
- Organize beauty products into clear categories and sections.
- Provide interactive product browsing and shopping features.
- Allow users to manage their shopping cart and wishlist.
- Provide user authentication through login and signup pages.
- Improve usability through responsive layouts and interactive components.

3. Technologies Used

- HTML5: Defines the structure and content of the website.
- CSS3: Handles styling, layouts, responsive design, and animations.
- JavaScript: Implements page interactions, product management, filtering, modals, and other dynamic features.
- LocalStorage: Stores cart, wishlist, and other supported browser-side data.
- SweetAlert2: Displays interactive alert and confirmation dialogs where integrated.
- Lucide Icons / Font Awesome: Provides icons where included in the project.

4. Project Structure
   Eve-Beauty/
   ├── assets/
   ├── components/
   │ ├── footer.html
   │ └── navbar.html
   ├── css/
   ├── images/
   ├── js/
   ├── about.html
   ├── beauty-test.html
   ├── best-sellers.html
   ├── brands.html
   ├── contact.html
   ├── index.html
   ├── login.html
   ├── myproducts.html
   ├── new-arrivals.html
   ├── shop.html
   ├── signup.html
   ├── trending.html
   └── README.md
5. Website Pages

- Home (index.html): Introduces the website and provides navigation to its main sections.
- About (about.html): Presents information about the website and its purpose.
- Beauty Test (beauty-test.html): Provides a beauty-related test or interactive experience.
- Best Sellers (best-sellers.html): Highlights popular products and includes product interactions and a gallery.
- Brands (brands.html): Displays brand information and product details.
- Contact (contact.html): Provides the contact page and its related interface.
- Login (login.html): Allows existing users to sign in.
- My Products (myproducts.html): Provides a page for users to access their selected or saved products.
- New Arrivals (new-arrivals.html): Presents newly added products.
- Shop (shop.html): Provides product browsing, filtering, sorting, and shopping functionality.
- Signup (signup.html): Allows new users to register.
- Trending (trending.html): Highlights trending products and related product information.

6. CSS Files

The css/ directory contains stylesheets for individual pages and shared website components, including:

- about.css
- beauty-test.css
- best-sellers.css
- brands.css
- contact.css
- footer.css
- home.css
- login-signup.css
- myproducts.css
- navbar.css
- new-arrivals.css
- shop.css
- trending.css

These files organize the website’s visual design, page layouts, product cards, forms, modals, animations, and responsive behavior.

7. JavaScript Files

The js/ directory contains scripts responsible for page-specific functionality:

- about.js
- beauty-test.js
- best-sellers.js
- brands.js
- components.js
- contact.js
- home.js
- login.js
- myproducts.js
- new-arrivals.js
- shop.js
- signup.js
- trending.js

Each script manages the interactions and behavior associated with its corresponding page or shared component.

8. Main Features

- Product browsing and category-based organization.
- Product filtering and sorting where implemented.
- Best Sellers, New Arrivals, and Trending sections.
- Brand information and product details.
- Shopping cart and wishlist management.
- Login and signup interfaces.
- Product galleries and modal windows.
- Toast messages and interactive notifications.
- Shared navigation and footer components.
- Scroll animations and responsive styling where implemented.

9. Data Storage

The website uses browser LocalStorage for supported client-side data, including shopping cart and wishlist information. Some data is stored using user-specific keys to separate information between accounts.

LocalStorage is browser-based storage and is not a replacement for a secure server-side database or authentication system.

10. How to Run the Project

1. Download or clone the project repository.
1. Open the Eve-Beauty project folder in Visual Studio Code.
1. Open index.html using a local development server, such as the Live Server extension.
1. Navigate through the website using the navigation menu.
1. Test the available shopping, account, and product features.

1. Project Limitations

Some features may depend on browser storage and client-side JavaScript. Features that require a backend, such as persistent account management, payment processing, and server-side order handling, require additional implementation if they are not already connected to a backend service.

12. Future Improvements

- Integrate a backend database and secure authentication.
- Add a checkout and payment system.
- Improve product search and filtering.
- Add order history and order tracking.
- Improve accessibility and responsive behavior.
- Add automated testing and error handling.

13. License

This project is intended for educational and portfolio purposes unless a separate license specifies otherwise.
