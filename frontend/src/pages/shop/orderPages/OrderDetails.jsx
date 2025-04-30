import React from "react";
import { Link, useParams } from "react-router-dom";
import GetAllOrders from "../../../contextApi/GetAllOrders.jsx";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orders, loading] = GetAllOrders();

  const order = orders.find((order) => order._id === orderId); // Find the specific order
  console.log(order)
  return (
    <>
      {
        loading && <div>
          {/* // Skeleton Loader */}
          <div className="flex flex-col md:flex-row gap-5 mt-5">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="w-full md:w-1/2 h-44 md:h-80 p-4 bg-slate-200 rounded-md animate-pulse "></div>
            ))}
          </div>
        </div>
      }

      {!loading && order && (
        <div className="p-5 pt-10 w-full min-h-screen bg-slate-50">
          <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
            {/* Order Details Box */}
            <div className="w-full lg:w-1/2 bg-primary-light rounded-lg shadow-lg p-7">
              <div className="w-full border-b border-gray-500 mb-4">
                <h1 className="text-2xl uppercase font-semibold font-[Lora] text-gray-800">
                  Order Details
                </h1>
              </div>

              <div className="w-full p-4 rounded-lg">
                {/* Header */}
                <div className="flex items-center justify-between font-semibold border-b border-slate-500 pb-3 text-lg">
                  <p>Products</p>
                  <p>Total</p>
                </div>

                {/* Product List */}
                <div className="flex flex-col gap-3 mt-3">
                  {order?.products.map((item, index) => (
                    <div
                      key={item?._id}
                      className="flex justify-between items-center p-2 rounded-lg hover:bg-primary-light transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">{index + 1}.</span>
                        <div>
                          {/* Product Name & Quantity */}
                          <p className="font-medium text-gray-800">{item?.productId?.name} <span className="text-gray-500">(x{item?.quantity})</span></p>

                          {/* Sizes */}
                          <p className="text-sm text-gray-600 font-medium">
                            Size: <span className="uppercase">{item?.sizes?.join(", ")}</span>
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <span className="text-gray-900 font-semibold">${(item?.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Total Amount */}
                <div className="flex items-center justify-between text-lg font-medium border-t border-slate-500 pt-3 mt-3">
                  <p>Total</p>
                  <p className="text-primary font-semibold">${order?.totalAmount.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-red-50 rounded p-5 mt-3 shadow-md">
                <div>
                  <h2 className="text-xl font-semibold capitalize text-indigo-500 mb-5 font-[Lora]">
                    Payment {order?.paymentStatus}
                  </h2>
                  <Link
                    to={`/track-order/${order?._id}`}
                    className="w-full px-3 py-2 cursor-pointer font-medium bg-white text-primary hover:text-indigo-500 rounded transition duration-300"
                  >
                    Track Order
                  </Link>
                </div>

              </div>
            </div>

            {/* Shipping Details Box */}
            <div className="w-full lg:w-1/2 bg-indigo-200 space-y-3 text-white rounded-lg shadow-lg p-7">
              <div className="w-full border-b border-gray-500 mb-4">
                <h1 className="text-2xl text-black font-semibold uppercase font-[Lora]">
                  Shipping Details
                </h1>
              </div>
              <div className="px-5">
                <div className="flex items-center justify-between">
                   
                   <div className="space-y-4">
                      <p className="font-medium text-slate-800">Full Name:</p>
                      <p className="font-medium text-slate-800">Email:</p>
                      <p className="font-medium text-slate-800">Phone:</p>
                      <p className="font-medium text-slate-800">Address:</p>
                      <p className="font-medium text-slate-800">City:</p>
                      <p className="font-medium text-slate-800">Country:</p>
                      <p className="font-medium text-slate-800">Postal Code:</p>
                      <p className="font-medium text-slate-800">Order Note:</p>

                   </div>

                   <div className=" space-y-4">
                      <p className="text-slate-600 font-medium">{order?.shippingAddress.fullName}</p>
                      <p className="text-slate-600 font-medium">{order?.shippingAddress.email}</p>
                      <p className="text-slate-600 font-medium">{order?.shippingAddress.phone}</p>
                      <p className="text-slate-600 font-medium">{order?.shippingAddress.address}</p>
                      <p className="text-slate-600 font-medium">{order?.shippingAddress.city}</p>
                      <p className="text-slate-600 font-medium">{order?.shippingAddress.country}</p>
                      <p className="text-slate-600 font-medium">{order?.shippingAddress.postalCode}</p>
                      <p className="text-slate-600 font-medium">{order?.shippingAddress.ordernote}</p>

                   </div>
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
