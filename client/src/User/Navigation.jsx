import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaUserEdit,
  FaSignOutAlt,
} from "react-icons/fa";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current location

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/"); // Redirect to login page
  };

  return (
    <>
      <div className="sticky top-0 w-full bg-white z-50 py-1 shadow">
        <div className="mx-auto px-4">
          <div className="flex h-12 justify-between items-center">
            {/* Logo */}
            <h1
              className="font-bold text-3xl ps-6"
              style={{ fontFamily: "'Sofia', sans-serif" }}
            >
              ProofPoint
            </h1>

            {/* Hamburger Menu Icon (For Mobile) */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-2xl absolute end-4 top-3 focus:outline-none"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center md:gap-5 lg:gap-10">
              <Link to="/landing">
                <p
                  className={`px-3 py-1 rounded-lg ${
                    isActive("/landing")
                      ? "bg-blue-400 text-white"
                      : "hover:text-blue-400 "
                  } cursor-pointer  transition duration-300`}
                >
                  Home
                </p>
              </Link>
              <Link to="/landing/complaint">
                <p
                  className={`px-3 py-1 rounded-lg cursor-pointer transition duration-300 ${
                    isActive("/landing/complaint")
                      ? "bg-blue-400 text-white"
                      : "hover:text-blue-400"
                  }`}
                >
                  My complaints
                </p>
              </Link>
              <Link to="/landing/about">
                <p
                  className={`px-3 py-1 rounded-lg cursor-pointer transition duration-300 ${
                    isActive("/landing/about")
                      ? "bg-blue-400 text-white"
                      : "hover:text-blue-400"
                  }`}
                >
                  About
                </p>
              </Link>
              <Link to="/landing/form">
                <button
                  className={`hidden text-sm md:inline-block rounded-lg px-3 py-1.5 text-center ${
                    isActive("/landing/form")
                      ? "bg-blue-500 text-white"
                      : "bg-gradient-to-r  from-blue-500 to-purple-500"
                  } hover:text-white transition duration-300`}
                >
                  Complaint registration
                </button>
              </Link>
            </div>

            <div className="hidden lg:block">
              {/* Profile Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg shadow hover:bg-gray-100 transition"
              >
                <FaUser className="text-md text-blue-500" />
                Profile
                <span className="text-xs">▼</span>
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <ul className="py-1">
                    {/* Edit Profile */}
                    <li>
                      <Link
                        to="/landing/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white transition"
                        onClick={() => setIsOpen(false)}
                      >
                        <FaUserEdit className="mr-2" />
                        Edit Profile
                      </Link>
                    </li>

                    {/* Log Out */}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-white transition"
                      >
                        <FaSignOutAlt className="mr-2" />
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation (Dropdown Menu) */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4">
              <div className="flex flex-col items-center gap-1">
                <Link to="/landing" className="w-full" onClick={toggleMenu}>
                  <p
                    className={`text-center w-full py-1 rounded-2xl ${
                      isActive("/landing")
                        ? "bg-blue-400 text-white"
                        : " border-blue-400"
                    } cursor-pointer hover:bg-blue-400 hover:text-white transition duration-300`}
                  >
                    Home
                  </p>
                </Link>
                <Link
                  to="/landing/complaint"
                  className="w-full"
                  onClick={toggleMenu}
                >
                  <p
                    className={`rounded-2xl cursor-pointer py-1 block w-full text-center transition duration-300 ${
                      isActive("/landing/complaint")
                        ? "bg-blue-400 text-white"
                        : "hover:bg-blue-400 hover:text-white"
                    }`}
                  >
                    My complaints
                  </p>
                </Link>
                <Link
                  to="/landing/about"
                  className="w-full"
                  onClick={toggleMenu}
                >
                  <p
                    className={`rounded-2xl cursor-pointer py-1 block w-full text-center transition duration-300 ${
                      isActive("/landing/about")
                        ? "bg-blue-400 text-white"
                        : "hover:bg-blue-400 hover:text-white"
                    }`}
                  >
                    About
                  </p>
                </Link>
                <div className="w-full">
                  {/* Profile Button */}
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full rounded-2xl flex items-center justify-center gap-2 py-1.5 text-sm font-medium hover:bg-gray-100 transition"
                  >
                    <FaUser className="text-md text-blue-500" />
                    Profile
                    <span className="text-xs">▼</span>
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div className=" mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <ul className="py-1">
                        {/* Edit Profile */}
                        <li>
                          <Link
                            to="/landing/profile"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white transition"
                            onClick={() => setIsOpen(false)}
                          >
                            <FaUserEdit className="mr-2" />
                            Edit Profile
                          </Link>
                        </li>

                        {/* Log Out */}
                        <li>
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-white transition"
                          >
                            <FaSignOutAlt className="mr-2" />
                            Log Out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <Link to="/landing/form" onClick={toggleMenu}>
                  <button
                    className={`rounded-lg px-3.5 py-2 text-center ${
                      isActive("/landing/form") ? "bg-blue-500" : "bg-blue-400"
                    } text-white hover:bg-blue-500 transition duration-300`}
                  >
                    Complaint registration
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
