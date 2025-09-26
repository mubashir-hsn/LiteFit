import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import axios from 'axios';
import AllOrders from '../Admin/DashboardComponents/Pages/AllOrders';

const User = () => {
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState({});
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/orders/user-info/${id}`,
          { withCredentials: true }
        );
        setUserInfo(response.data?.data);
        setPurchasedItems(response.data?.data?.purchasedItems || []);
      } catch (error) {
        console.log('Error while getting user info:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading.....</div>;

  return (
    <div className="w-full">
      {/* Profile Section */}
      <div className="md:w-[90%] w-full mx-auto flex flex-col md:flex-row justify-start items-center border-b border-slate-200 lg:pl-10 p-6 mt-5 gap-6">
        <div className="w-28 h-28 shadow-md flex items-center justify-center rounded-full border-2 border-slate-700">
          <img src={avatar} className="w-24 h-24 rounded-full" alt="avatar" />
        </div>
        <div>
          <h1 className="text-xl md:text-3xl font-medium font-[Lora] md:pb-4 italic">
            {userInfo?.fullName}
          </h1>
          <p>
            <span className="font-medium">Email: </span> {userInfo?.email}
          </p>
        </div>
      </div>

      <div className='w-full md:w-[95%] mx-auto mt-10'>
         <AllOrders/>
      </div>

      {/* Total Spent */}

      <div className='w-[90%] bg-pink-100 mt-5 text-lg mx-auto flex justify-between items-center px-5 py-3 rounded-md border-2 border-pink-200'>
        <h2 className='font-semibold'>Total Spent:</h2>
        <p className='font-medium text-primary'>${userInfo?.totalSpent || 0}</p>
      </div>

      {/* Purchased Items Section */}
      <div className="md:w-[95%] w-full mx-auto my-6 px-4 overflow-x-auto">
        <h2 className="text-2xl font-semibold font-[Lora] py-3 border-b-2 border-slate-100">Purchased Items</h2>

        {purchasedItems.length > 0 ? (
          
          <table className="w-full mt-8 border bg-white border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-primary text-gray-50 text-sm sm:text-base font-[Lora]">
                <th className="px-4 py-3 border">No</th>
                <th className="px-4 py-3 border">Products</th>
                <th className="px-4 py-3 border">Category</th>
                <th className="px-4 py-3 border">Quantity</th>
                <th className="px-4 py-3 border">Price</th>
                <th className="px-4 py-3 border">Date</th>
              </tr>
            </thead>
            <tbody className='text-sm'>
              {purchasedItems?.map((item, index) => (
                <tr key={item?._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border text-center font-semibold">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-12 h-10 object-cover rounded-sm border"
                        src={item?.image}
                        alt={'img'}
                      />
                      <span className="font-medium text-gray-800">
                        {item?.productName}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border text-center text-gray-600">
                    {item?.category}
                  </td>
                  <td className="px-4 py-2 border text-center">{item?.quantity}</td>
                  <td className="px-4 py-2 border text-center">
                    ${item?.totalPrice}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {item?.orderDate}
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        
        ) : (
          <p className="text-gray-600 italic">No purchased items yet.</p>
        )}
      </div>

      
    </div>
  );
};

export default User;
