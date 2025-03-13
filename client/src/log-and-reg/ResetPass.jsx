import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ResetPass = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  console.log("token in resetfrontend",token);
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/reset-password", {
        token,
        newPassword,
      });
      toast.success(response.data.message);
      console.log(response.data.message);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-center" autoClose={1500} />
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <label className="block text-sm font-semibold">New Password</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 my-2"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
