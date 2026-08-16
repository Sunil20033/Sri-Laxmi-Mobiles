# 📱 Sri Laxmi Mobiles

A full-stack e-commerce website developed for **Sri Laxmi Mobiles**.  
The application provides a complete online shopping experience for customers along with an admin panel for managing products, orders, offers, repair requests, and other store operations.

---

## 🌐 Live Application

### Customer Website
https://sri-laxmi-mobiles.vercel.app

### Backend API
https://sri-laxmi-mobiles-backend.onrender.com

### GitHub Repository
https://github.com/Sunil20033/Sri-Laxmi-Mobiles

---

# 🚀 Project Overview

Sri Laxmi Mobiles is a full-stack mobile store e-commerce application designed to allow customers to browse mobile phones and accessories, view offers, manage their cart and wishlist, place orders, submit repair requests, and provide product reviews.

The application also provides an administrator panel where store administrators can manage products, orders, offers, and repair requests.

The application is deployed using:

- **Vercel** – Frontend hosting
- **Render** – Spring Boot backend hosting
- **Railway** – Production MySQL database
- **GitHub** – Source code and deployment repository

---

# 🛠️ Technology Stack

## Frontend

- React
- JavaScript
- HTML5
- CSS3
- Bootstrap
- Axios

## Backend

- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- REST APIs
- Maven
- BCrypt
- CORS

## Database

- MySQL
- Railway MySQL

## Deployment

- Vercel
- Render
- Railway
- GitHub

---

# ✨ Features

## 👤 Customer Features

### 🏠 Homepage
- Store branding
- Product categories
- Featured products
- Special offers
- Navigation
- Search functionality

### 📱 Product Management for Customers

Customers can:

- Browse smartphones
- Browse accessories
- Browse products by category
- Search for products
- View product details
- View product prices
- View discounts
- View stock availability
- View product images

### 🛒 Shopping Cart

Customers can:

- Add products to cart
- View cart items
- Update cart items
- Remove products from cart
- Proceed to checkout

### ❤️ Wishlist

Customers can:

- Add products to wishlist
- Remove products from wishlist
- View saved products

### 👤 Customer Authentication

Customers can:

- Register an account
- Login
- Logout
- Access their account-related information

Passwords are securely stored using BCrypt hashing.

### 📦 Orders

Customers can:

- Place orders
- Review checkout details
- View their orders
- View individual order details

### ⭐ Reviews

Customers can:

- Submit product reviews
- View product reviews

### 🔧 Repair Services

Customers can:

- Submit mobile repair requests
- Provide repair details
- Track repair request status

### 🎁 Offers

Customers can:

- View available offers
- Browse products associated with offers

### 📱 Responsive Design

The website is designed and tested for:

- Desktop
- Laptop
- Tablet
- Mobile devices

---

# 🔐 Admin Features

The application includes an administrator panel for managing the store.

## 📦 Product Management

Admin can:

- Add new products
- Update products
- Delete products
- Manage product names
- Manage brands
- Manage categories
- Manage selling prices
- Manage original prices
- Manage discounts
- Manage product badges
- Manage stock availability
- Manage product image URLs

### Dynamic Product Management

Products added through the admin panel are stored directly in the production Railway MySQL database.

No manual SQL import is required for future products.

The flow is:

```text
Admin adds product
       ↓
Spring Boot REST API
       ↓
Railway MySQL
       ↓
Customer API request
       ↓
Product appears on website
