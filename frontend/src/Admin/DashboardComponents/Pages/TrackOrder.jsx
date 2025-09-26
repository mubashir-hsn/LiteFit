import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetAllOrders from "../../../contextApi/GetAllOrders.jsx";

const steps = [
    { status: "pending", label: "Pending", icon: "ri-time-line" },
    { status: "processing", label: "Processing", icon: "ri-loader-line" },
    { status: "shipped", label: "Shipped", icon: "ri-truck-line" },
    { status: "delivered", label: "Delivered", icon: "ri-check-line" },
];

const TrackOrder = () => {
    const { orderId } = useParams();
    const [orders, loading] = GetAllOrders();
    const [order, setOrder] = useState(null);
    useEffect(() => {
        const foundOrder = orders.find((o) => o._id === orderId);
        if (foundOrder) setOrder(foundOrder);
    }, [orders, orderId]);

    if (loading) return <div className="text-center text-lg font-semibold py-10">Loading order details...</div>;
    if (!order) return <div className="text-center text-red-500 text-lg font-semibold py-10">Order not found!</div>;

    const orderStatus = order?.orderStatus?.toLowerCase();
    const currentIndex = steps.findIndex((s) => s.status === orderStatus);
    const orderDate = new Date(order?.createdAt).toLocaleString();

    const allStepsCompleted = orderStatus === "delivered";

    return (
        <div className="w-full bg-slate-50 py-5">
            <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10" data-aos='fade-up'>
                <h2 className="text-2xl font-semibold capitalize text-primary mb-2 font-[Lora]">
                    Payment {order?.paymentStatus}
                </h2>
                <p className="text-gray-700 text-sm">
                    Order ID: <span className="font-medium">{orderId}</span>
                </p>
                <p className="text-gray-700 text-sm">
                    Status: <span className="font-medium capitalize">{order?.orderStatus}</span>
                </p>

                <div className="mt-8 py-10">
                    <ul className="steps w-full">
                        {steps.map((step, index) => {
                            let isCompleted = false;
                            let isCurrent = false;

                            if (allStepsCompleted) {
                                isCompleted = true; 
                            } else if (currentIndex !== -1) {  // Only check if orderStatus is found
                                isCompleted = index < currentIndex;
                                isCurrent = index === currentIndex;
                            } 
                            return (
                                <li
                                    key={index}
                                    className={`step flex flex-col items-center ${isCompleted ? "step-success" : ""}`}
                                >
                                    <div className={`w-12 h-12 flex items-center justify-center mt-5 rounded-full 
                    ${allStepsCompleted ? "bg-green-500 text-white" : isCurrent ? "bg-red-500 text-white" : isCompleted ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                                        <i className={`${step.icon} text-2xl`}></i>
                                    </div>
                                    <p className={`mt-2 font-medium ${allStepsCompleted ? "text-green-500" : isCurrent ? "text-red-500" : isCompleted ? "text-green-500" : "text-gray-400"}`}>
                                        {step.label}
                                    </p>
                                    <p className="text-xs text-gray-500">{orderDate}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="mt-6 bg-primary-light p-6 rounded-lg space-y-2" data-aos='zoom-in-down'>
                    <h3 className="text-xl font-medium text-primary font-[Lora]">Customer Information</h3>
                    <p className="text-gray-600"><strong>Name:</strong> {order?.shippingAddress?.fullName}</p>
                    <p className="text-gray-600"><strong>Email:</strong> {order?.shippingAddress?.email}</p>
                    <p className="text-gray-600"><strong>Shipping Address:</strong> {order?.shippingAddress?.address}</p>
                    <p className="text-gray-600"><strong>Order Date:</strong> {orderDate}</p>
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;