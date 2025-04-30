import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/login";
  const userId = localStorage.getItem('userId');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword ) {
       toast.error("All fields are required.");
       return
      }
    else if (password.length < 8) {
       toast.error("Password must be atleast 8 characters long.");
       return
      }
    else if(password!==confirmPassword){
       toast.error("Password and confirm password will be same.")
       return
      }
    else{

        const data = { userId , password };
        try {
          const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/changepassword`, data , {withCredentials:true});
    
          if (res.data) {
            toast.success("Password change successfully. Now you can login.");
            localStorage.removeItem('userId');
            navigate(from, { replace: true });
          }
        } catch (err) {
          if (err.response) {
            toast.error("Error: " + err.response.data.message);
          } else {
            toast.error("Something went wrong.");
          }
        }
    }
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md py-7 px-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl mb-5 font-semibold text-center italic font-[Lora] text-primary">Reset Password</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="my-2 space-y-4">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-none bg-slate-100 rounded-lg outline-none"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border-none bg-slate-100 rounded-lg outline-none"
            />
          </div>
          <button
            type="submit"
            className="btn w-full"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
