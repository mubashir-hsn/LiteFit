import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import avatar from '../assets/avatar.png';
import { CounterContext } from '../contextApi/CounterContext.jsx';
import { useAuth } from '../contextApi/AuthProvider.jsx';
import Logout from './Logout.jsx';

const Navbar = () => {
  const {authUser} = useAuth();
  const value = useContext(CounterContext);
  const [isSticky, setIsSticky] = useState(false);
  const [isProfileOpen, setisProfileOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);

  
  const handleProfile = () => {
    setisProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const adminDropDown = [
    { label: "Dashboard", path: '/admin/dashboard', icon: "ri-dashboard-fill" },
    { label: "Manage Items", path: '/admin/dashboard/manage-products', icon: "ri-file-list-fill" },
    { label: "All Orders", path: '/admin/dashboard/all-orders', icon: "ri-file-list-3-fill" },
    { label: "Add Product", path: '/admin/dashboard/add-product', icon: "ri-add-box-fill" },
  ];
  const userDropDown = [
    { label: "Dashboard", path: '/user/dashboard', icon: "ri-dashboard-fill" },
    { label: "Profile", path: '/user/profile', icon: "ri-profile-fill" },
    { label: "Your Orders", path: '/user/dashboard/orders', icon: "ri-file-list-3-fill" },
  ];

  const dropDownMenu = authUser?.user?.role === "admin" ? [...adminDropDown] : [...userDropDown];

  return (
    <header className={`w-full bg-white ${isSticky ? 'sticky w-full top-0 z-50 shadow-md' : ''}`}>
      <nav className=" bg-white flex justify-between items-center">
        <div>
          {/* For medium and smaller screens */}
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[2] mt-3 w-52 p-2 shadow-md"
            >
              <li className="link no-underline">
                <NavLink to={'/'}>Home</NavLink>
              </li>
              <li className="link no-underline">
                <NavLink to={'/shop/men'}>Men</NavLink>
              </li>
              <li className="link no-underline">
                <NavLink to={'/shop/women'}>Women</NavLink>
              </li>
              <li className="link no-underline">
              <NavLink
                to="/blog"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Blogs
              </NavLink>
            </li>
              <li className="link no-underline">
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                About Us
              </NavLink>
            </li>
              <li className="link no-underline">
                <NavLink to={'/contact'}>Contact</NavLink>
              </li>
            </ul>
          </div>

          {/* For large screens */}
          <ul className="hidden bg-white lg:flex flex-1 nav__links">
            <li className="link no-underline">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'text-primary' : '')}
              >
                Home
              </NavLink>
            </li>
            <li
              className="link relative no-underline"
              onMouseEnter={() => setIsShopDropdownOpen(true)}
              onMouseLeave={() => setIsShopDropdownOpen(false)}
            >
              <Link to={'/shop/men'} className="cursor-pointer font-medium">
                Shop
              </Link>
              {isShopDropdownOpen && (
                <ul
                  className="absolute py-3 top-6 left-0 w-36 z-10 bg-white shadow-md rounded-md"
                  onMouseEnter={() => setIsShopDropdownOpen(true)}
                  onMouseLeave={() => setIsShopDropdownOpen(false)}
                >
                  <li className="py-2 px-4 hover:bg-gray-100">
                    <NavLink to="/shop/men">Men</NavLink>
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100">
                    <NavLink to="/shop/women">Women</NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li className="link no-underline">
              <NavLink
                to="/blog"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Blogs
              </NavLink>
            </li>
            <li className="link no-underline">
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                About Us
              </NavLink>
            </li>
            <li className="link no-underline">
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Navbar Center - Logo */}
        <div className="nav__logo">
          <Link to={'/'} className="hover:bg-transparent lg:mr-28">
            LiteFit<span className="text-3xl">.</span>
          </Link>
        </div>

        {/* Navbar End - Icons */}
        <div className="flex items-center gap-4">
          <span>
            <Link to="/search" className="no-underline hover:text-primary">
              <i className="ri-search-line"></i>
            </Link>
          </span>
          <span>
            <Link to="/shop/cart" className="hover:text-primary">
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">{value.count}</sup>
            </Link>
          </span>
          {authUser ? (
            <Link to={'#'}>
              <div className="flex flex-col items-center px-3 gap-1 relative" onClick={handleProfile}>
                <img
                  src={authUser?.user?.profileImage || avatar}
                  alt="User"
                  className="size-6 rounded-full cursor-pointer"
                />
                <span className="text-sm font-medium">{authUser?.user?.username}</span>
                {isProfileOpen && (
                  <div className="absolute right-0 top-10 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-2">
                      {dropDownMenu.map((menu, index) => (
                        <li key={index}>
                          <Link className="dropdown-items hover:text-primary" to={menu?.path}>
                            <i className={`${menu?.icon} text-lg pr-2`}></i>
                            {menu?.label}
                          </Link>
                        </li>
                      ))}
                      <li className="dropdown-items">
                        <Logout />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </Link>
          ) : (
            <Link to={'/login'}>
              <button className="hover:text-primary">
                <i className="ri-user-line"></i>
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
