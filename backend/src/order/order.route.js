import express from 'express'
import { confirmPayment, createCheckoutPayment, createOrder, deleteOrder, getAllOrders, getSingleOrder, getUserOrders, getUserProfileWithOrders, updateOrderStatus, webHook } from './order.controller.js';
import verifyToken from '../jwt/verifyToken.js';
import { verifyAdmin } from '../jwt/VerifyAdmin.js';

const router = express.Router();

// Create an order
router.post("/create-order", verifyToken ,createOrder);

// Get orders for a specific user
router.get("/user-orders/:userId", verifyToken,getUserOrders);

// Get ordered products for a specific user
router.get("/user-info/:userId",getUserProfileWithOrders);

// Get single order details
router.get("/order/:orderId", verifyToken,getSingleOrder);

// Get all orders (Admin)
router.get("/all-orders", verifyToken ,getAllOrders);

// Update order status
router.patch("/update-status/:orderId",verifyToken,verifyAdmin, updateOrderStatus);

// delete order
router.delete('/delete-order/:orderId',verifyToken , verifyAdmin , deleteOrder)

// stripe payment route
router.post("/create-checkout-session", createCheckoutPayment);

// stripe webhook route
router.post("/webhook", express.raw({ type: "application/json" }), webHook);

// confirm payment route
router.post("/confirm-payment", confirmPayment);


export default router