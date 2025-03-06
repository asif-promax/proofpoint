import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AdminControl = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    role: "user", // Default role is 'user'
  });

  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation Function
  const validateForm = () => {
    const { number, password } = formData;

    // Phone number validation: must be exactly 10 digits and numeric
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(number)) {
      toast.error("Phone number must be exactly 10 digits.");
      return false;
    }

    // Password validation: minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 digit, 1 special char
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters, include an uppercase letter, lowercase letter, number, and special character."
      );
      return false;
    }

    return true;
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        formData
      );

      if (response.status === 201) {
        toast.success("Registration successful! Redirecting...", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Registration failed. Try again."
      );
      console.error(error.response?.data || "Error during registration");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-indigo-500 to-blue-900">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="bg-white shadow-lg rounded-lg sm:w-2/6 py-3 px-7 flex flex-col justify-center">
        <h1 className="text-4xl pb-4 text-center font-extrabold bg-gradient-to-br from-blue-900 to-blue-300 bg-clip-text text-transparent">
          <span className="text-xs font-normal block text-black">
            Create an account
          </span>
          Proofpoint
        </h1>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-xs font-semibold block">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border-gray-300 border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-xs font-semibold block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-gray-300 border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div className="space-y-1">
            <label className="text-xs font-semibold block">Phone Number</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="border-gray-300 border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-xs font-semibold block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border-gray-300 border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Optional Admin Registration */}
          <div className="space-y-1">
            <label className="text-xs font-semibold block">Register as</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border-gray-300 border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>{" "}
              {/* Only allow for manual approval */}
            </select>
          </div>

          {/* Submit Button */}
          <div className="space-y-1">
            <button
              type="submit"
              className="text-white text-center bg-blue-600 w-full py-2 rounded-lg"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminControl;
