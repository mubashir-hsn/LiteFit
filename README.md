# 🛍️ LiteFit – Modern E-Commerce Clothing Website

LiteFit is a **modern, full-stack MERN e-commerce platform** designed for selling men's, women's, and kids' clothing online.\
It provides users with a sleek shopping experience, secure payments via **Stripe**, personalized product recommendations, and a beautiful responsive UI built with **React + Tailwind CSS**.

---

## 🚀 Tech Stack

### **Frontend**

- ⚛️ React 18
- 🎨 Tailwind CSS + DaisyUI
- 🌈 AOS (Animate On Scroll)
- 🍩 SweetAlert2 for Notifications
- 📊 Chart.js & React-Chartjs-2 (Admin Dashboard)
- 🗒 React Router DOM for Navigation
- 💳 Stripe Payment Integration
- 🍪 js-cookie for JWT Management
- 🔥 React Hot Toast for Feedback
- 🔾 HeroIcons, Remix Icons, React Icons

### **Backend**

- 🟢 Node.js + Express.js
- 🍃 MongoDB + Mongoose
- 🔒 JWT Authentication
- ☁️ Cloudinary for Image Uploads
- ✉️ Nodemailer for Email Notifications
- 🔒 BcryptJS for Password Hashing
- 🧳 Stripe API for Secure Payments
- 🌍 CORS & Cookie Parser Integration

---

## 🧩 Features

✅ **User Authentication & Authorization** (JWT-based)\
✅ **Add to Cart, Wishlist, and Checkout System**\
✅ **Stripe Payment Gateway Integration**\
✅ **Order Management System**\
✅ **Admin Dashboard for Analytics** (using Chart.js)\
✅ **User Dashboard for Orders & Payments**\
✅ **Product Filtering** (by Category, Brand, Price, and Color)\
✅ **Cloudinary Image Management**\
✅ **Responsive UI for All Devices**\
✅ **SweetAlert & Toast Notifications**\
✅ **Email Notifications (Order & Registration)**\
✅ **Modern Animations using AOS**

---

## 📂 Project Structure

```
LiteFit/
│
├── frontend/             # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/              # Node.js + Express Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── config/
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/mubashir-hsn/litefit.git
cd litefit
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder and add:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Run the backend:

```bash
npm start
```

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## 💳 Stripe Payment Integration

LiteFit uses **Stripe** for secure and smooth online payments.\
Make sure to create a [Stripe account](https://stripe.com) and use your API keys in the `.env` file.

---

## 👨‍💳 User Dashboard

The **User Dashboard** allows customers to:

- 🔑 View personal profile and saved addresses.
- 📦 View all **placed orders** with order details.
- 💳 View **payment history** and Stripe transaction status.
- 🔄 Track the **current order status** (Pending, Shipped, Delivered).
- 🌟 Manage password, profile info, and preferences.

---

## 📈 Admin Dashboard (Future Scope)

- Add, Edit, Delete Products
- View Orders and Sales Statistics
- Manage Users and Roles
- Track Daily/Monthly Revenue using Chart.js

---

## 👨‍💻 Author

**Mubashar Hassan**\
📧 [Email](mailto\:mubazi80@example.com)\
💼 [LinkedIn](https://linkedin.com/in/mubashir-hsn)\
🐙 [GitHub](https://github.com/mubashir-hsn)

---

## 📝 License

This project is licensed under the **MIT License** – feel free to use and modify for personal or educational purposes.

---

## ⭐ Support

If you like this project, don’t forget to **star ⭐ the repository** and share it with your friends!

---


npm run dev
