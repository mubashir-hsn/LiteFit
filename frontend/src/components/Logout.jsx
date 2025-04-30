import React from 'react'
import { useAuth } from '../contextApi/AuthProvider.jsx'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
const Logout = () => {
    const {authUser, updateAuthUser} = useAuth()
    const handleLogout = ()=>{
        try {
            updateAuthUser({
                ...authUser,
                user: null
            })
            Cookies.remove('jwt')
            localStorage.removeItem('Litefit-Users');
            toast.success("User logout successfully.");
            setTimeout(() => {window.location.reload()},1000);
        } catch (error) {
            toast.error("Error" + error.message)
        }
    }
  return (
    <div><Link to={'/'} onClick={handleLogout} className='hover:text-primary'><i className="ri-logout-box-r-fill text-lg pr-2"></i>Logout</Link></div>
  )
}

export default Logout