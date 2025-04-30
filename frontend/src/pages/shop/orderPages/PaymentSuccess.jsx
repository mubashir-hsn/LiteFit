import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const navigate = useNavigate();

    useEffect(() => {
        const confirmOrder = async () => {
            if (!sessionId) return;

            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/orders/confirm-payment`, { sessionId });
                if (response.status === 200) {
                    setTimeout(() => {window.location.reload()},500);
                     // clear the cart
                    sessionStorage.removeItem('cart');
                    toast.success("Payment successful!");
                    navigate(`/shop/cart-checkout/${response?.data?._id}`)
                }
            } catch (error) {
                console.error("Error confirming payment:", error);
                toast.error("Error confirming payment. Please contact support.");
                navigate('/cart-checkout/cancel')
            }
        };

        confirmOrder();
    }, [sessionId, navigate]);

    return (
        <div className="container mx-auto text-center py-10">
            <h1 className="text-2xl font-bold text-red-600">Processing Order.....</h1>
        </div>
    );
};

export default PaymentSuccess;
