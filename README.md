# Trendly

Trendly is a modern **e-commerce** website designed for seamless online shopping experiences. Built with **Next.js**, **TypeScript**, **Wix Headless CDS**, and **Tailwind CSS**, Trendly offers a scalable, modular, and efficient platform for businesses to sell their products online.

---

## Features
- **User Authentication**: Secure login and registration.
- **Product Catalog**: Browse and purchase products effortlessly.
- **Shopping Cart & Checkout**: Add items to the cart and complete secure transactions.
- **Responsive UI**: Optimized for all devices with Tailwind CSS.
- **Order Management**: Track and manage customer orders.
- **Backend Powered by Wix Headless CDS**: Ensuring a seamless integration with Wix's cloud data services.

---

## Technologies Used
### Frontend:
- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**

### Backend:
- **Wix Headless CDS** (Cloud Data Services)
- **Node.js**

### Database:
- **Wix Data Collections**

### Authentication:
- **NextAuth.js**
- **OAuth / JWT**

---

## Prerequisites
Ensure you have the following installed before proceeding:
- **Node.js** (v16 or higher)
- **Wix Headless API Access**
- **NPM** or **Yarn**

---

## Installation

### 1. Clone the Repository:
```bash
git clone https://github.com/Amplejohnny/trendly.git
cd trendly
```

### 2. Install Dependencies:
```bash
npm install
```

### 3. Set Up Environment Variables:
#### Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_WIX_CLIENT_ID=YOUR_NEXT_PUBLIC_WIX_CLIENT_ID
FEATURED_PRODUCTS_FEATURED_CATEGORY_ID=YOUR_FEATURED_PRODUCTS_FEATURED_CATEGORY_ID
FEATURED_PRODUCTS_NEW_CATEGORY_ID=YOUR_FEATURED_PRODUCTS_NEW_CATEGORY_ID
NEXT_PUBLIC_WIX_APP_ID=YOUR_NEXT_PUBLIC_WIX_APP_ID
NEXT_PUBLIC_FERA_ID=YOUR_NEXT_PUBLIC_FERA_ID
NEXT_PRIVATE_FERA_ID=YOUR_NEXT_PRIVATE_FERA_ID
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Run the Development Server:
```bash
npm run dev
```

### 5. Open the App:
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Directory Structure
```
└── trendly/
    ├── README.md
    ├── package.json
    ├── tsconfig.json
    ├── .eslintrc.json
    ├── .hintrc
    ├── public/
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── api/
    │   │   │   ├── auth/
    │   │   │   ├── products/
    │   │   │   ├── cart/
    │   │   │   ├── checkout/
    │   │   │   ├── orders/
    │   │   │   └── webhooks/
    │   ├── components/
    │   │   ├── Navbar.tsx
    │   │   ├── Footer.tsx
    │   │   ├── ProductCard.tsx
    │   │   ├── ShoppingCart.tsx
    │   │   ├── OrderSummary.tsx
    │   │   └── ui/
    │   ├── lib/
    │   │   ├── utils.ts
    │   │   ├── auth.ts
    │   │   ├── api.ts
    │   ├── config/
    │   │   ├── settings.ts
    │   ├── db/
    │   │   ├── index.ts
    │   └── validators/
    │       ├── order-validator.ts
```

---

## Contributing
Contributions are welcome! Follow these steps:
1. **Fork** the repository.
2. **Create a new branch**: `git checkout -b feature/YourFeatureName`
3. **Commit your changes**: `git commit -m 'Add some feature'`
4. **Push to the branch**: `git push origin feature/YourFeatureName`
5. **Open a pull request**

---

## License
This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## Contact
For any questions or feedback, feel free to reach out:

- **amplejohnny** - workatdeveloper@gmail.com
- **GitHub**: [Amplejohnny](https://github.com/Amplejohnny)
