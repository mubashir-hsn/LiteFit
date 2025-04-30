import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmiting, setISubmiting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/user/otp/verifyemail';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !username) {
      toast.error("All fields are required.")
      return 
    }
    else if (password.length < 8) {
       setMessage("Password must be atleast 8 characters long.")
       return   
      }
    else{
      const data = {
        username,
        email,
        password
      }
      setISubmiting(true);
      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/register`, data)
        if (res.data) {
          toast.success('Verify your email.')
          navigate(from, { replace: true })
        }
      } catch (err) {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
      finally {
        setISubmiting(false)
      }
    }

  }
  return (
    <section className='w-screen h-screen flex flex-col items-center justify-center'>
      <div className='max-w-sm bg-white mx-auto border shadow space-y-5 p-5'>
        <h2 className='text-2xl pl-5 md:py-3 font-semibold italic font-[Lora] text-primary'>Register Here!</h2>
        <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
          <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" placeholder='Username' required className='w-full px-5 py-3 rounded bg-slate-100 focus:outline-none' />
          <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder='Email Address' required className='w-full mt-5 px-5 py-3 rounded bg-slate-100 focus:outline-none' />
          <input onChange={(e) => setPassword(e.target.value)} type="Password" name="Password" id="Password" placeholder='Password' required className='w-full mt-5 px-5 py-3 rounded bg-slate-100 focus:outline-none' />
          {
            message && <p className='text-red-500 mt-2 text-sm'>{message}</p>
          }
          <button className={`w-full text-center mt-5  ${isSubmiting ? "bg-primary py-3 rounded text-white opacity-70 cursor-not-allowed" : "btn"}`}>
            {
              isSubmiting ? 'Loading....' : 'Register'
            }
          </button>
        </form>
        <p className='text-center italic'>Already have an account? <Link to={'/login'} className='text-indigo-500 underline hover:text-primary'>Login</Link>.</p>
      </div>
        <div className='flex gap-1 mt-5 md:mt-8'>
          <span>Didn't receive instructions?</span>
          <Link to={'/auth?type=verifyemail'} className='text-blue-600 underline hover:text-primary'>verify email</Link>.
        </div>
      <div className='absolute top-3 md:top-5 left-4 md:left-10'>
        <Link to={'/'} className='btn'>Back</Link>
      </div>
    </section>
  )
}

export default Register