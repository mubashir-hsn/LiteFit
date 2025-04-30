import React from 'react'
import { useAuth } from '../../contextApi/AuthProvider'
import avatar from '../../assets/avatar.png'
import AllOrders from '../../Admin/DashboardComponents/Pages/AllOrders';
const UserProfile = () => {
  const { authUser } = useAuth();
  return (
    <div className='w-full'>
      <div className='md:w-[90%] w-full mx-auto flex flex-col md:flex-row justify-start items-center border-b border-slate-200 lg:pl-10 p-6 mt-5 gap-6'>
        <div className='w-28 h-28 shadow-md flex items-center justify-center rounded-full border-2 border-slate-700'>
          <img src={avatar} className='w-24 h-24 rounded-full' alt="" />
        </div>
        <div>
          <h1 className='text-xl md:text-3xl font-medium font-[Lora] md:pb-4 italic'>{authUser?.user?.username}</h1>
          <p><span className=' font-medium'>Role: </span> {authUser?.user?.role}</p>
          <p><span className=' font-medium'>Email: </span> {authUser?.user?.email}</p>
        </div>
      </div>
      <div className='w-full md:w-[95%] mx-auto mt-10'>
         <AllOrders/>
      </div>
    </div>
  )
}

export default UserProfile