import React, { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
const OrderSuccess = () => {
    const {orderId} = useParams();

    useEffect(()=>{
      window.scrollTo(0,0)
    },[])
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-md w-full">
        <CheckCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2 font-[Lora]">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6 text-sm py-4">
          Thank you for your purchase! Your order has been placed and is being
          processed. You can view your order details or continue shopping below.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
            className="bg-red-500 text-sm  border-2 border-red-500 text-white px-3 py-3 font-medium uppercase hover:bg-white hover:text-red-500 duration-300 transition w-full sm:w-auto"
            to={'/shop/men'}
          >
            Continue Shopping
          </Link>
          <Link
            className="bg-white border-2 border-indigo-500 text-indigo-600 transition-all duration-300 text-sm px-3 py-3 font-medium uppercase hover:bg-indigo-500 hover:text-white w-full sm:w-auto"
            to={`/order/order-details/${orderId}`}
          >
            View Order Details
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
