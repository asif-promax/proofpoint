import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    role: "user", // Default role is 'user'
  });
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    console.log("Registering with password:", formData.password);
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        formData
      );

      if (response.status === 201) {
        toast.success("Registration successful! Redirecting...", {
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/"); // Redirect to login page
        }, 2000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Registration failed. Try again."
      );
      console.error(error.response?.data || "Error during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-indigo-500 to-blue-900">
      <div className="w-full max-w-3xl bg-white flex flex-col sm:flex-row shadow-lg rounded-lg">
        <ToastContainer position="top-center" autoClose={2000} />

        {/* Left Side */}
        <div className="p-8 space-y-5 flex flex-col justify-center text-center sm:w-3/6 bg-gradient-to-t from-blue-900 to-blue-700 text-white">
          <h1
            className="text-3xl font-bold"
            style={{ fontFamily: "'Sofia', sans-serif" }}
          >
            Join Proofpoint
          </h1>
          <p className="text-xs">
            Sign up to start reporting issues seamlessly. Provide substantial
            proof with photos and track your complaints efficiently.
          </p>
          <p className="text-xs">version 2 . 0 . 0</p>
        </div>

        {/* Right Side - Register Form */}
        <div className="sm:w-3/6 py-3 px-7 flex flex-col justify-center">
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
              <label className="text-xs font-semibold block">
                Phone Number
              </label>
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

            {/* Submit Button */}
            <div className="space-y-1">
              <button
                type="submit"
                className="text-white bg-blue-600 w-full py-2 rounded-lg flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></span>
                ) : (
                  "Register"
                )}
              </button>

              <p className="text-center text-xs">
                Already have an account?{" "}
                <Link to="/" className="text-blue-500 underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
