import Order from "./order.model.js";
import dotenv from 'dotenv';
import Stripe from 'stripe';
import Product from "../products/model/products.model.js";
import mongoose from "mongoose";
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount, shippingAddress, paymentMethod } = req.body;

    if (!userId || !products || !totalAmount || !shippingAddress) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Default Payment Status for COD Orders
    let paymentStatus = "Pending";
    if (paymentMethod === "COD") {
      paymentStatus = "Completed";
    }

    const order = new Order({
      userId,
      products,
      totalAmount,
      shippingAddress,
      paymentStatus,
      orderStatus: "Pending",
    });

    const savedOrder = await order.save();
    // Decrease stock
    for (let product of products) {
      await Product.findByIdAndUpdate(product.productId, {
        $inc: { stock: -product.quantity }
      });
    }
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};
// Get orders for a specific user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).populate("products.productId", "name price image");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

export const getSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.find({ orderId });
    res.status(200).json(order);
  } catch (error) {
    console.log("Error to fetch single order", error)
    res.status(500).json({ message: "Failed to fetch order", error });
  }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.productId", "name price quantity image").sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    // Create the update object dynamically
    const updateData = { orderStatus };
    if (orderStatus === "Delivered") {
      updateData.paymentStatus = "Completed";
    }

    // Update the order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error });
  }
};

// delete order
export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  try {

    const deleteOrder = await Order.findByIdAndDelete(orderId);
    if (!deleteOrder) {
      return res.status(401).send({ message: "Order not found." })
    }

    res.status(200).send({ message: "order deleted successfully." })

  } catch (error) {
    console.log("Error while delete order.", error)
    res.status(500).send({ message: "Order not deleted.Please try again later." })
  }
}

// 📩 Create  Stripe Session
export const createCheckoutPayment = async (req, res) => {
  try {
    const { userId, products, totalAmount, shippingAddress } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Products array is required" });
    }


    const lineItems = products.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name || "Unnamed Product",
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart-checkout/cancel`,
      metadata: {
        userId: userId.toString(),
        totalAmount: totalAmount.toString(),
        shippingAddress: JSON.stringify(shippingAddress),
        productIds: products.map((item) => item._id).join(","), // Store IDs only
        products: JSON.stringify(products), // Store full product details as a string
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Error creating Stripe session" });
  }
};

// 📩 Stripe Webhook to Handle Payment Events
export const webHook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { userId, totalAmount, shippingAddress, products } = session.metadata;

    try {
      const parsedProducts = JSON.parse(products); // Convert products back to an array

      const newOrder = new Order({
        userId,
        products: parsedProducts,
        totalAmount,
        shippingAddress: JSON.parse(shippingAddress),
        paymentStatus: "Completed",
        orderStatus: "Pending",
      });

      await newOrder.save();
      console.log("Order created successfully after payment.");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  }

  res.status(200).json({ received: true });
};

// ✅ Confirm Payment and Create Order
export const confirmPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session || session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    const { userId, totalAmount, shippingAddress, products } = session.metadata;

    const parsedProducts = JSON.parse(products); // Convert products back to an array

    const newOrder = new Order({
      userId,
      products: parsedProducts, // Store actual product details
      totalAmount,
      shippingAddress: JSON.parse(shippingAddress),
      paymentStatus: "Completed",
      orderStatus: "Pending",
    });

    await newOrder.save();

    // Decrease stock
    for (let product of parsedProducts) {
      await Product.findByIdAndUpdate(product.productId, {
        $inc: { stock: -product.quantity }
      });
    }

    res.status(200).json(newOrder);
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
