/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Logout from '../../../components/Logout';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Menu icon
import { useAuth } from '../../../contextApi/AuthProvider';
import {
  RiDashboardLine,
  RiUserLine,
  RiProductHuntLine,
  RiShoppingBag3Line,
  RiChat3Line,
  RiShoppingBag2Line,
} from 'react-icons/ri';
import { GoHome } from "react-icons/go";
import { LuCircleDollarSign } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";

const Sidebar = () => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const { authUser } = useAuth();

  const admin = [
    { link: "/admin/dashboard", icon: RiDashboardLine, label: "Dashboard" },
    { link: "/admin/dashboard/add-product", icon: RiProductHuntLine, label: "Add Product" },
    { link: "/admin/dashboard/add-category", icon: BiCategory, label: "Add Category" },
    { link: "/admin/dashboard/add-blog", icon: IoMdAddCircleOutline, label: "Create Blog" },
    { link: "/admin/dashboard/manage-products", icon: RiShoppingBag3Line, label: "Manage Products" },
    { link: "/admin/dashboard/all-orders", icon: RiShoppingBag2Line, label: "Orders" },
    { link: "/admin/dashboard/all-payments", icon: LuCircleDollarSign, label: "Payments" },
    { link: "/admin/dashboard/all-reviews", icon: RiChat3Line, label: "Comments" },
  ]
  const user = [
    { link: "/user/dashboard", icon: RiDashboardLine, label: "Dashboard" },
    { link: "/user/dashboard/orders", icon: RiShoppingBag2Line, label: "Orders" },
    { link: "/user/dashboard/payments", icon: LuCircleDollarSign, label: "Payments" },
    { link: "/user/dashboard/reviews", icon: RiChat3Line, label: "Comments" },
  ]

  const LinkData = authUser?.user?.role === 'admin' ? [...admin] : [...user];

  const toggleUserInfo = () => setShowUserInfo(!showUserInfo);

  return (
    <div className="h-[100vh] bg-[#fff9f5]">
      {/* Menu Icon for Small and Medium Devices */}
      <button
        className="lg:hidden fixed top-2 left-3 z-20 p-3 bg-white rounded-md"
        onClick={toggleUserInfo}
      >
        <FaBars size={24} className="text-gray-700" />
      </button>

      {/* Sidebar */}
      <div
        className={` bg-white md:bg-[#fff9f5] fixed h-[100vh] z-20 px-10 flex flex-col pt-4 rounded transition-transform ${showUserInfo ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:static`}
        style={{ top: '4rem' }}
      >
        {/* profile Info user || admin */}

        <Link to="/user/profile" className="no-underline">
          <div className="flex items-center text-center my-5 gap-3 py-2 border-b">
            <img
              src={authUser?.user?.profileImg?.url || '/avatar.jpeg'}
              alt="User"
              className="rounded-full object-cover"
              style={{ height: '30px', width: '30px' }}
            />
            <h4 className="font-medium text-dark text-lg">
              {authUser?.user?.username || 'User Name'}
            </h4>
          </div>
        </Link>

        {/* Sidebar Links */}

        <div className="flex flex-col w-full text-sm text-slate-700 font-medium mt-1">

          {
            LinkData.map((data, index) => (
              <Link
                key={index}
                to={data?.link}
                className="flex items-center gap-2 w-full py-3 border-b no-underline hover:text-red-600"
              >
                {data?.icon && <data.icon size={20} />}{data?.label}
              </Link>
            ))
          }

          <Link
            to="/"
            className="flex items-center gap-2 w-full py-3 border-b no-underline hover:text-red-600"
          >
            <GoHome size={20} /> Shop
          </Link>

          <Link
            to="/logout"
            className="flex items-center gap-2 w-full py-3 border-b no-underline"
          >
            <Logout />
          </Link>
        </div>

      </div>

      {/* Overlay for Small Devices */}
      {showUserInfo && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-5 lg:hidden"
          onClick={toggleUserInfo}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
