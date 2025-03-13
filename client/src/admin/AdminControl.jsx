import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AdminControl = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState({}); // State for validation errors

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Live validation on input change
    validateInput(e.target.name, e.target.value);
  };

  // Validation Function
  const validateInput = (field, value) => {
    let errorMessages = { ...errors };

    if (field === "number") {
      const phoneRegex = /^[0-9]{10}$/;
      errorMessages.number = phoneRegex.test(value)
        ? ""
        : "Phone number must be exactly 10 digits.";
    }

    if (field === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      errorMessages.password = passwordRegex.test(value)
        ? ""
        : "Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
    }

    setErrors(errorMessages);
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.number || errors.password) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-700 to-blue-900">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
        <h1 className="text-3xl text-center font-extrabold bg-gradient-to-br from-blue-900 to-blue-400 bg-clip-text text-transparent">
          ProofPoint
        </h1>
        <p className="text-center text-gray-600 text-sm mb-4">Create an account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="text-sm font-semibold block">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border-gray-300 border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="text-sm font-semibold block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-gray-300 border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@mail.com"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="text-sm font-semibold block">Phone Number</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 ${
                errors.number ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Phone number"
              required
            />
            {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="text-sm font-semibold block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="••••••••"
              required
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Role Selection */}
          <div>
            <label className="text-sm font-semibold block">Register as</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border-gray-300 border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-600 to-blue-400 w-full py-2 rounded-lg text-lg font-semibold hover:opacity-90 transition"
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
