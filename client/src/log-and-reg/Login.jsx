import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      console.log(response);
      console.log(password);
      
      

      if (response.status === 201) {
        const { token } = response.data;
        const {role} =response.data

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        
          if (role === "admin") {
            navigate("/admin"); // Redirect admin to admin dashboard
          } else {
            navigate("/landing"); // Redirect user to user dashboard
          }
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error(error.response?.data || "Login Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-indigo-500 to-blue-900">
      <div className="w-full max-w-3xl bg-white flex flex-col sm:flex-row shadow-lg rounded-lg">
        <ToastContainer position="top-center" autoClose={1500} />

        {/* Left Side */}
        <div className="p-8 space-y-5 flex flex-col justify-center text-center sm:w-3/6 bg-gradient-to-t from-blue-900 to-blue-700 text-white">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Sofia', sans-serif" }}>
            Proofpoint
          </h1>
          <p className="text-xs">
            Experience a seamless way to report issues with our user-friendly platform. Upload photos and videos to provide substantial proof for your complaints and track their status effortlessly.
          </p>
          <p className="text-xs">version  2 . 0 . 0</p>
        </div>

        {/* Right Side - Login Form */}
        <div className="sm:w-3/6 py-8 px-8 flex flex-col justify-center">
          <h1 className="text-4xl pb-4 text-center font-extrabold bg-gradient-to-br from-blue-900 to-blue-300 bg-clip-text text-transparent">
            <span className="text-xs font-normal block text-black">Welcome to</span>
            Proofpoint
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold block">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300 border rounded-lg placeholder:text-sm px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold block">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-300 border rounded-lg placeholder:text-sm px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-blue-500 text-sm">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="space-y-3">
              <button type="submit" className="text-white text-center bg-blue-600 w-full py-2 rounded-lg">
                Login
              </button>

              <p className="text-center text-xs">
                Don't have an account?{" "}
                <Link to="/reg" className="text-blue-500 underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
