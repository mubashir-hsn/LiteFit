import { useEffect, useState } from "react";
import { useAuth } from "../../../contextApi/AuthProvider.jsx";
import GetAllOrders from "../../../contextApi/GetAllOrders";

const PaymentHistory = () => {
  const [orders, loading] = GetAllOrders();
  const [filterOrder, setFilterOrder] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser?.user?.role === "user") {
      const filtered = orders?.filter((order) => order?.userId === authUser?.user?._id);
      setFilterOrder(filtered || []);
    } else {
      setFilterOrder(orders || []);
    }
  }, [orders, authUser]);

  return (
    <>

      <div className="mx-auto bg-white p-6 ">
        <h2 className="text-2xl font-semibold font-[Lora] py-3 border-b-2 border-slate-100">Total Payments</h2>

        {
          loading ? (
            // Skeleton Loader
            <div className="flex flex-wrap gap-5 mt-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="w-full md:1/2 lg:w-[30%] p-4 bg-gray-200 rounded-md animate-pulse h-52"></div>
              ))}
            </div>
          ) : (
            <div className="">
              <p className="text-lg font-medium pr-2 mt-4">
                Total Spent: <span className="bg-red-400 text-sm text-white px-2 py-1 rounded">$
                  {filterOrder.reduce((total, order) => total + order.totalAmount, 0).toFixed(2)}
                </span>
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                {filterOrder.length > 0 ? (
                  filterOrder.map((order, index) => (
                    <div key={order._id} className="bg-gray-100 text-sm p-5 rounded-lg mb-4 space-y-2">
                      <h3 className="font-semibold">Order #{index + 1}</h3>
                      <p>Order ID: {order._id}</p>
                      <p>Order Total: ${order.totalAmount.toFixed(2)}</p>
                      <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
                      <p>
                        Status:
                        <span className={`px-2 py-1 rounded ml-2 text-white ${order.paymentStatus.toLowerCase() === "completed" ? "bg-green-400" :
                          order.paymentStatus.toLowerCase() === "pending" ? "bg-yellow-400" : "bg-red-400"
                          }`}>
                          {order.paymentStatus}
                        </span>
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No payment history found.</p>
                )}
              </div>
            </div>
          )
        }
      </div>

    </>
  );
};

export default PaymentHistory;
