import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const OtpVerification = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const { type } = useParams()


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code) {
      return toast.error("OTP is required.");
    }

    const data = { code };
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/verifyemail`, data);

      if (res.data) {
        toast.success(
          type === "verifyemail"
            ? "Email verified.Now you can login."
            : "Email verified.Now you can change password."
        );
        localStorage.setItem("userId" , res.data.user.userId)
        // Navigate to the appropriate component
        if (type === "verifyemail") {
          navigate("/login", { replace: true });
        } else if (type === "forgotpassword") {
          navigate("/auth/change-password", { replace: true });
        }

      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md py-7 px-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl mb-5 font-semibold text-center italic font-[Lora] text-primary">OTP Verification</h3>
        <div className="text-center text-green-600 py-5 my-4 bg-green-100">
          We've sent a verification code to your email.
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="my-2">
            <label htmlFor="otpInput" className="block text-lg text-gray-800 font-medium mb-2">
              Enter Code:
            </label>
            <input
              type="text"
              id="otpInput"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-3 border-none bg-slate-100 rounded-lg outline-none"
            />
          </div>
          <button
            type="submit"
            className="btn w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
