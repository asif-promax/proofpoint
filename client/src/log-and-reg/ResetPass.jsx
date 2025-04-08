import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ResetPass = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      toast.error("OTP must be a 6-digit number");
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      toast.success(response.data.message);
      console.log("Password reset successful for:", email);

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
      console.error("Reset Password Error:", error.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-center" autoClose={1500} />
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 my-2"
            value={email || ""}
            disabled
          />
          <label className="block text-sm font-semibold">OTP</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 my-2"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.trim())}
            required
          />
          <label className="block text-sm font-semibold">New Password</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 my-2"
            placeholder="Enter new password (min 8 chars)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;