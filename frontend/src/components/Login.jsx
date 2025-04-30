import axios from 'axios';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contextApi/AuthProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { updateAuthUser} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All fields are required.")
    }
    else {
      const data = {
        email,
        password
      }
      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/login`, data)
        if (res.data) {
          toast.success('User logged in successfully.')
          localStorage.setItem('Litefit-Users', JSON.stringify(res.data.user))
          updateAuthUser(res.data)
          navigate(from, { replace: true })
        }
      } catch (err) {
        if (err.response) {
          setMessage(err.response.data.message);
        }
      }
    }
  }
  return (
    <section className='w-screen h-screen flex flex-col items-center justify-center'>
      <div className='max-w-sm bg-white mx-auto border shadow space-y-5 p-8'>
        <h2 className='text-2xl pl-5 md:py-3 font-semibold italic font-[Lora] text-primary'>Login Here!</h2>
        <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
          <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder='Email Address' required className='w-full px-5 py-3 rounded bg-slate-100 focus:outline-none' />
          <input onChange={(e) => setPassword(e.target.value)} type="Password" name="Password" id="Password" placeholder='Password' required className='w-full mt-5 px-5 py-3 rounded bg-slate-100 focus:outline-none' />
          {
            message && <p className='px-3 text-red-500 mt-2 text-sm'>{message}</p>
          }
          <button className='w-full mt-5 btn'>Login</button>
        </form>
        <p className='text-center italic'>Don't have an account? <Link to={'/register'} className='text-indigo-500 px-1 underline hover:text-primary'>Register</Link> here.</p>
      </div>
      <div className='mt-5 md:-ml-20 flex flex-col text-sm md:mt-8 space-y-2 transition-all duration-300'>
        <Link to={'/auth?type=verifyemail'} className='text-blue-600 hover:underline'>
          Didn't receive confirmation instructions?
        </Link>
        <Link to={'/auth?type=forgotpassword'} className='text-blue-600 hover:underline'>
          Forgot your password?
        </Link>
      </div>

      <div className='absolute top-3 md:top-5 left-4 md:left-10'>
        <Link to={'/'} className='btn'>Back</Link>
      </div>
    </section>
  )
}

export default Login