🛍️ Clothing E-Commerce Website (MERN Stack)
A full-featured clothing e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring both Admin and User panels, complete authentication & authorization, email verification, Stripe-based checkout system, and real-time stock management.

🚀 Key Features
🔐 User & Admin Authentication (JWT-based)

✅ Email Verification during signup

🧑‍💼 Admin Dashboard to manage products, users, and orders

🛒 User Panel to browse, add to cart, and place orders

💳 Secure Stripe Payment Integration

📦 Stock Checkout System (auto-updates inventory on order)

🔁 Order Management System

📧 Email Notifications for verification and orders

🧰 Responsive UI using Tailwind CSS (or Bootstrap if used)

🛠️ Tech Stack
Frontend: React.js

Backend: Node.js + Express.js

Database: MongoDB

Authentication: JWT + Cookies

Email Service: Nodemailer

Payments: Stripe API

📦 Setup Instructions
bash
Copy
Edit
# Clone the repository
git clone https://github.com/mubashir-hsn/LiteFit.git

# Navigate to the project
cd clothing-mern-website

# Install dependencies for client and server
cd client && npm install
cd ../server && npm install

# Configure environment variables in `.env` files

# Run the app
npm run dev
