import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../DashboardComponents/SideBar/Sidebar'
const DashboardLayout = () => {
  return (
    <div className='flex relative flex-col lg:flex-row gap-5 w-full'>
        <div className='lg:w-[20%] h-5 lg:h-[100vh] lg:fixed md:bg-white'>
           <Sidebar/>
        </div>
       <div className='mt-8 lg:mt-0 md:w-full lg:absolute lg:right-0 lg:w-[80%]'>
           <Outlet/>
        </div>
    </div>
  )
}

export default DashboardLayout