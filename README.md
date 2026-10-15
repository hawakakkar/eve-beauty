EVE BEAUTY

1. Project Overview

EVE BEAUTY is a beauty and cosmetics e-commerce website developed to provide users with an interactive and user-friendly online shopping experience. The website allows users to explore beauty products, discover brands, view trending items, manage their shopping cart and wishlist, and access personalized beauty-related features.

The website also includes a user dashboard where users can manage their profile information, saved addresses, shopping cart, wishlist, and orders. Its checkout interface supports different payment methods, including card payment (demo) and Cash on Delivery (COD).

2. Project Objectives

- Create an attractive and user-friendly beauty shopping website.
- Organize beauty products into clear categories and sections.
- Provide interactive product browsing and shopping features.
- Allow users to manage their shopping cart and wishlist.
- Provide login and signup interfaces.
- Implement a checkout process with different payment methods.
- Allow users to place orders and view their order history.
- Provide profile and address management features.
- Improve usability through responsive layouts and interactive components.

3. Technologies Used

- HTML5: Defines the structure and content of the website.
- CSS3: Handles styling, layouts, responsive design, and animations.
- Vanilla JavaScript: Implements page interactions, product management, filtering, modals, checkout, order processing, and other dynamic features.
- LocalStorage: Stores supported browser-side data, including cart, wishlist, profile information, addresses, and orders.
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
- Login (login.html): Allows existing users to access the login interface.
- My Products (myproducts.html): Provides a personalized dashboard for managing shopping cart items, wishlist products, profile information, saved addresses, checkout, and orders.
- New Arrivals (new-arrivals.html): Presents newly added products.
- Shop (shop.html): Provides product browsing, filtering, sorting, and shopping functionality.
- Signup (signup.html): Allows new users to register through the signup interface.
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

The js/ directory contains scripts responsible for page-specific functionality and shared components:

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

These scripts manage website interactions, product information, cart and wishlist operations, interface updates, checkout functionality, and other page-specific behaviors.

8. Main Features

Product Browsing

- Browse beauty and cosmetic products.
- Explore product categories and brand information.
- Discover Best Sellers, New Arrivals, and Trending products.
- Use product filtering and sorting where implemented.
- View product details, galleries, and modal windows.

Shopping Cart and Wishlist

- Add products to the shopping cart.
- Save products to the wishlist.
- View selected products with their images, names, prices, and quantities where supported.
- Manage cart and wishlist items through the website interface.
- Access saved shopping information from the relevant navigation and dashboard sections.

User Account and Dashboard

- Access login and signup interfaces.
- View and manage supported profile information.
- Add, edit, and delete saved addresses.
- Select a default address where supported.
- View shopping cart items, wishlist products, and order information.
- Access account-related actions, including logout where implemented.

Checkout and Payment Methods

- Proceed to checkout from the My Products dashboard.
- Enter customer and delivery information, including name, email, phone number, address, city, and country.
- Select an available payment method.
- Review the order information before completing the checkout process.

The available payment methods include:

- Card Payment: A demonstration payment flow with client-side validation of card details. It simulates successful payment processing and is not connected to a real bank or payment gateway.
- Cash on Delivery (COD): Allows customers to place an order with payment pending until the payment is collected.

Order Management

- Generate an order record after a successful checkout.
- Store an order number, product details, quantities, prices, customer information, and payment method.
- Record the order’s payment status.
- View recent orders and order history through the dashboard.
- Display relevant order information, including order date, total amount, order status, payment method, and payment status where available.
- Clear the shopping cart after a successfully completed order.

Interface and User Experience

- Display toast messages, alerts, and confirmation dialogs where implemented.
- Use shared navigation and footer components.
- Provide interactive forms and modal windows.
- Support responsive layouts and scroll animations where implemented.

Responsive Design

EVE BEAUTY features a responsive design that adapts to different screen sizes and devices, including desktop computers, laptops, tablets, and mobile phones.

- Responsive layouts for different screen sizes.
- Flexible product grids and product cards.
- Adaptive navigation and page sections.
- Mobile-friendly forms, buttons, and interactive components.
- Optimized layouts to provide a consistent shopping experience across devices.

9. Data Storage

The website uses browser LocalStorage to store supported client-side information, including:

- Shopping cart items.
- Wishlist products.
- User profile information.
- Saved delivery addresses.
- Order records and order history.

Some stored information uses user-specific keys to help separate data between accounts within the browser.

Important: LocalStorage is browser-based storage. It is not a secure server-side database, and data stored this way may be lost when browser storage is cleared or may not be available on another device. The current client-side implementation does not replace a production backend or secure authentication system.

10. How to Run the Project

1. Download or clone the project repository.
1. Open the Eve-Beauty project folder in Visual Studio Code.
1. Open index.html using a local development server, such as the Live Server extension.
1. Navigate through the website using the navigation menu.
1. Explore the product pages, cart, wishlist, account interfaces, checkout, payment options, and order history.

1. Project Limitations

- The website primarily uses client-side HTML, CSS, JavaScript, and LocalStorage.
- Card payment is a demonstration flow and does not process real financial transactions.
- Cash on Delivery records the selected payment method, with payment remaining pending until collected.
- User and order information is stored in browser storage rather than a centralized server database.
- Orders and account data are not automatically synchronized across different devices or browsers.
- Production use would require secure server-side authentication, database storage, payment gateway integration, and server-side order processing.
- Actual delivery tracking and live shipment updates are not included unless integrated separately.

12. Future Improvements

- Integrate a backend database and secure authentication.
- Connect card payments to a secure payment gateway.
- Implement server-side order processing and order management.
- Add real-time order tracking and delivery updates.
- Add automated testing and more comprehensive error handling.

13. License

This project is intended for educational and portfolio purposes unless a separate license specifies otherwise.
