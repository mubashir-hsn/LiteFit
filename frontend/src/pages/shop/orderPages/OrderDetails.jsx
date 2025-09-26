import React from "react";
import { FaShippingFast } from "react-icons/fa";
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
          <div className="flex flex-col gap-4 mt-6 w-[90%] mx-auto">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="w-full h-20 md:h-80 p-4 bg-slate-200 rounded animate-pulse "></div>
            ))}
          </div>
        </div>
      }

      {!loading && order && (
        <div className="p-5 pt-8 w-full min-h-screen bg-slate-50">
          <div className="flex flex-col space-y-6 lg:space-y-0">
            {/* Order Details Box */}

            <div className="w-full p-7">
              {/* Heading */}
              <div className="w-full border-b-2 border-gray-300" data-aos='fade-left' >
                <h1 className="text-2xl uppercase font-semibold font-[Lora] text-gray-800">
                  Order Details
                </h1>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto" data-aos='zoom-in-up'>
                <table className="w-full mt-8 border bg-white border-gray-300 rounded-lg shadow-sm">
                  <thead>
                    <tr className="bg-primary text-gray-50 text-sm sm:text-base font-[Lora]">
                      <th className="px-4 py-3 border">No</th>
                      <th className="px-4 py-3 border">Products</th>
                      <th className="px-4 py-3 border">Sizes</th>
                      <th className="px-4 py-3 border">Quantity</th>
                      <th className="px-4 py-3 border">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.products.map((item, index) => (
                      <tr key={item?._id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-2 border text-center font-semibold">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 border">
                          <div className="flex items-center gap-3">
                            <img
                              className="w-14 h-12 object-cover rounded-sm border"
                              src={item?.productId?.image}
                              alt={item?.productId?.name}
                            />
                            <span className="font-medium text-gray-800">
                              {item?.productId?.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-2 border text-center uppercase text-gray-600">
                          {item?.sizes?.join(", ") || "-"}
                        </td>
                        <td className="px-4 py-2 border text-center">{item?.quantity}</td>
                        <td className="px-4 py-2 border text-center font-semibold">
                          ${(item?.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}

                    {/* Total Row */}
                    <tr className="bg-white font-semibold">
                      <td colSpan="4" className="px-4 py-3 border text-right">
                        Total
                      </td>
                      <td className="px-4 py-3 border text-center text-primary">
                        ${order?.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Payment Status Table */}
              <div className="overflow-x-auto mt-10" data-aos='zoom-in-down'>
                {/* Heading */}
                <div className="w-full border-b-2 border-gray-300 mb-4">
                  <h1 className="text-2xl uppercase font-semibold font-[Lora] text-gray-800">
                    Payment & Shipping Details
                  </h1>
                </div>
                <table className="w-full mt-8 bg-white border border-gray-300 rounded-lg shadow-sm">
                  <thead>
                    <tr className="bg-primary text-gray-50 text-sm sm:text-base font-[Lora]">
                      <th className="px-4 py-3 border">Payment Status</th>
                      <th className="px-4 py-3 border">Track Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white hover:bg-gray-50 transition">
                      <td className={`px-4 py-3 text-center font-medium border ${order?.paymentStatus === 'Completed' ? ' text-green-500' : ' text-red-500'}`}>
                        {order?.paymentStatus === 'Completed' ? 'Paid' : 'Pending'}
                      </td>
                      <td className="px-4 py-3 border text-center">
                        <Link
                          to={`/track-order/${order?._id}`}
                          className="inline-flex items-center justify-center p-2 text-primary hover:text-indigo-500 transform hover:scale-110 transition duration-300 ease-in-out"
                          title="Track Order"
                        >
                          <FaShippingFast size={22} />
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Shipping Details Box */}
           
            <div className="w-full lg:w-[95%] mx-auto bg-white mt-10" data-aos='zoom-in-up'>
              {/* Heading */}
              <div className="bg-primary text-white px-6 py-3">
                <h1 className="text-xl font-semibold uppercase font-[Lora]">
                  Shipping Details
                </h1>
              </div>

              {/* Details */}
              <div>
                {[
                  { label: "Full Name", value: order?.shippingAddress.fullName },
                  { label: "Email", value: order?.shippingAddress.email },
                  { label: "Phone", value: order?.shippingAddress.phone },
                  { label: "Address", value: order?.shippingAddress.address },
                  { label: "City", value: order?.shippingAddress.city },
                  { label: "Country", value: order?.shippingAddress.country },
                  { label: "Postal Code", value: order?.shippingAddress.postalCode },
                  { label: "Order Note", value: order?.shippingAddress.ordernote || "N/A" }
                ].map((item, i) => (
                  <div key={i} className="flex w-full">
                    {/* Label */}
                    <div className="w-1/3 md:pl-8 border border-gray-200 px-3 py-3 font-semibold text-gray-700">
                      {item.label}
                    </div>
                    {/* Value */}
                    <div className="w-2/3 md:pl-5 border border-gray-200 font-medium px-3 py-3 text-gray-500">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>



          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
