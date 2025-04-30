import React, { useEffect, useState } from "react";
import GetAllOrders from "../../../contextApi/GetAllOrders";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contextApi/AuthProvider.jsx";
import axios from "axios";
import toast from 'react-hot-toast';

const AllOrders = () => {
  const [orders, loading] = GetAllOrders();
  const [filterOrder, setFilterOrder] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    const setOrder = () => {
      if (authUser?.user?.role === "user") {
        const filtered = orders?.filter(
          (order) => order?.userId === authUser?.user?._id
        );
        setFilterOrder(filtered || []);
      } else {
        setFilterOrder(orders || []);
      }
    };
    if (orders) setOrder();
  }, [orders, authUser]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/orders/update-status/${orderId}`, {
        orderStatus: newStatus,
      }, { withCredentials: true });

      if (response.status === 200) {
        setFilterOrder((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/orders/delete-order/${orderId}`, {
        withCredentials: true,
      });
      toast.success('Order deleted successfully.');
      setFilterOrder((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Error while deleting order:', error);
      toast.error('Error occurred while deleting the order. Please try again.');
    }
  };


  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold font-[Lora] py-3 border-b-2 border-slate-100">
        All Orders
      </h2>

      {loading ? (
        // Skeleton Loader
        <div className="flex flex-wrap gap-5 mt-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="w-full p-4 bg-gray-200 rounded-md animate-pulse h-20"></div>
          ))}
        </div>

      ) : filterOrder.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No orders found.</div>
      ) : (
        <div className="w-full overflow-x-auto mt-5">
          <table className="min-w-full w-auto bg-slate-50 border-collapse shadow-md table table-xs">
            <thead className="bg-red-500 font-[Lora] text-lg text-white">
              <tr className="w-full">
                <th className="py-2 px-3 text-left">S.No</th>
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Customer</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-8 text-center">Action</th>
                {authUser?.user?.role === "user" && <th className="py-3 px-8 text-center">Track Order</th>}
              </tr>
            </thead>
            <tbody className="text-sm w-full">
              {filterOrder.map((order, index) => (
                <tr key={order._id} className="border-t hover:bg-gray-100 w-full">
                  <td className="py-2 px-3 font-medium">{index + 1}.</td>
                  <td className="py-2 px-6">{order._id}</td>
                  <td className="py-2 px-6">{order.shippingAddress.fullName}</td>
                  <td className="py-2 px-6">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-center">
                    {authUser?.user?.role === "admin" ? (
                      <select
                        className="px-3 py-1 rounded text-sm border"
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${order.orderStatus.toLowerCase() === "delivered"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                          }`}
                      >
                        {order.orderStatus}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Link
                      title="view order"
                      to={`/order/order-details/${order?._id}`}
                      className="w-full py-2 md:px-3 cursor-pointer text-black md:text-white md:bg-indigo-500 md:hover:bg-indigo-700  rounded transition duration-300"
                    >
                      <i className="ri-eye-fill text-lg md:text-sm"></i>
                    </Link>
                    {
                      authUser?.user?.role === 'admin' && <button
                        title="delete order"
                        onClick={() => handleDelete(order?._id)}
                        className="md:px-3 py-2 ml-2 text-primary md:text-white md:bg-red-500 rounded md:hover:bg-red-600"
                      >
                        <i className="ri-delete-bin-6-fill text-lg md:text-sm"></i>
                      </button>
                    }
                  </td>
                  {authUser?.user?.role === "user" && (
                    <td className="py-4 px-6 text-center">
                      <Link
                        to={`/track-order/${order?._id}`}
                        className="w-full px-3 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                      >
                        <i className="ri-external-link-line text-lg"></i>
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
