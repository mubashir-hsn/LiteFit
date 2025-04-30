import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const formType = queryParams.get("type") || "verifyemail"; // Default to 'verifyemail'
  const from = location?.state?.from?.pathname || `/user/otp/${formType}`;

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Email is required.");
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/verifyexistedemail`, { email });

      if (res.data) {
        toast.success("Email Verification code sent!");
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold font-[Lora] italic text-primary text-center pb-5">
          {formType === "verifyemail" ? "Email Verification" : "Forgot Password"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {formType === "forgotpassword" && (
              <label
                htmlFor="emailInput"
                className="block text-[16px] mb-3 pt-4 pb-6"
              >
                Fear not. We’ll email you instructions to reset your password.
              </label>
            )}
            <input
              type="email"
              id="emailInput"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-100 outline-none border-none rounded-lg "
            />
          </div>
          <button
            type="submit"
            className={`w-full text-center mt-5 ${
              isSubmitting
                ? "bg-primary py-3 rounded text-white opacity-70 cursor-not-allowed"
                : "btn"
            }`}
          >
            {isSubmitting
              ? formType === "verifyemail"
                ? "Sending..."
                : "Loading..."
              : formType === "verifyemail"
              ? "Send"
              : "Reset Password"}
          </button>
        </form>
        <p className="text-center mt-3">
          Have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>{" "}
          here.
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
