import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetAllProducts from '../../../contextApi/GetAllProducts.jsx';
import GetAllOrders from '../../../contextApi/GetAllOrders.jsx';
import BarChart from './BarChart.jsx';
import GetAllUsers from '../../../contextApi/GetAllUsers.jsx';
import {useAuth} from '../../../contextApi/AuthProvider.jsx'
import GetReviews from '../../../contextApi/GetReviews.jsx';

const Dashboard = () => {
  const {authUser} = useAuth();
  const [products] = GetAllProducts(); 
  const [orders] = GetAllOrders();
  const [users] = GetAllUsers();
  const [filteredReviews] = GetReviews();
  const userOders = orders.filter((order)=> order?.userId === authUser?.user?._id)
  const [totalPayment, setTotalPayment] = useState(0)
  // for admin
  const revneu = orders?.reduce((total , item)=> total + item?.totalAmount , 0)

  // for user
  const payment = userOders?.reduce((total , item)=> total + item?.totalAmount , 0)
  
  useEffect(()=>{
    if (authUser?.user?.role === 'admin') {
      setTotalPayment(revneu)
    }else{
      setTotalPayment(payment)
    }
  },[payment,revneu,authUser])

  const formattedPayment = totalPayment >= 1_000_000
  ? (totalPayment / 1_000_000).toFixed(1) + 'M'
  : totalPayment >= 1_000
  ? (totalPayment / 1_000).toFixed(1) + 'K'
  : totalPayment.toFixed(2);


   const admin = [
    {key: 'Total Products' , value : products?.length , link : `/admin/dashboard/manage-products` , bg: '#ffe5d9'},
    {key: 'Total Orders' , value : orders?.length , link : `/admin/dashboard/all-orders` , bg: '#fdf8d9'},
    {key: 'Total Reveneu' , value : "$" + formattedPayment , link : `/admin/dashboard/all-payments` , bg: '#fff1cc'},
    {key: 'Total Customers' , value : users?.length , link : `/admin/dashboard/all-users` , bg: '#ffecd6'},
   ]
   const user = [
     {key: 'Total Payments' , value : '$' + formattedPayment , link : `/user/dashboard/payments` , bg: '#ffe5d9'},
     {key: 'Total Orders' , value : userOders?.length , link : `/user/dashboard/orders` , bg: '#fdf8d9'},
     {key: 'Total Reviews' , value : filteredReviews?.length , link : `/user/dashboard/reviews` , bg: '#fff1cc'},
   ]

   const boxeData = authUser?.user?.role === 'admin' ? [...admin] : [...user]; 
  return (
    <div>
      {/* Main Content */}
      <div className="w-full p-5">
        <div className=" flex justify-center items-center flex-wrap gap-5">

          {
            boxeData.map((data,index)=>(
              <div key={index} className="text-center">
            <Link to={data?.link} className="no-underline">
              <div className={`${authUser?.user?.role === 'admin' ? "w-52" : "w-72"} text-slate-700 h-44 p-5 flex justify-center items-center shadow-md rounded-xl`} style={{ backgroundColor: data?.bg }}>
                <div className="font-semibold">
                  <h3 className="text-lg">{data?.key}</h3>
                  <p className="text-xl text-red-400">{data?.value}</p>
                </div>
              </div>
            </Link>
          </div>
            ))
          }

        </div>

        <div className="p-5 mt-5 shadow-sm bg-white rounded">
          <BarChart/>
        </div>
      </div>

    </div>
  )
}

export default Dashboard