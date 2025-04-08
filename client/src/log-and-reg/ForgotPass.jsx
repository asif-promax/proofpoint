import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/forgot-password", { email });
      toast.success(response.data.message);
      console.log("OTP sent for email:", email);

      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
      console.error("Forgot Password Error:", error.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-center" auto Pgclose={1500} />
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 my-2"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())} // Trim whitespace
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Get OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;