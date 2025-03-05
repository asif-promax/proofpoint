import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Outlet, Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Hook to get current location

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="sticky top-0 w-full bg-white z-50 py-1 shadow">
        <div className="mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <h1
              className="font-bold text-3xl ps-6"
              style={{ fontFamily: "'Sofia', sans-serif" }}
            >
              ProofPoint
            </h1>

            {/* Hamburger Menu Icon (For Mobile) */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-2xl absolute end-4 top-3 focus:outline-none"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center md:gap-10 lg:gap-20">
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

            {/* Complaint Registration Button */}
            <Link to="/landing/profile">
              <p
                className={`px-3 hidden md:inline-block py-1 rounded-lg cursor-pointer transition duration-300 ${
                  isActive("/landing/profile")
                    ? "bg-blue-400 text-white"
                    : "hover:text-blue-400"
                }`}
              >
                Profile
              </p>
            </Link>
          </div>

          {/* Mobile Navigation (Dropdown Menu) */}
          {isMenuOpen && (
            <div className="md:hidden mt-4">
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
                <Link to="/landing/profile"className="w-full" onClick={toggleMenu}>
                  <p className="rounded-2xl cursor-pointer py-1 hover:bg-blue-400 hover:text-white text-center transition duration-300">
                    Profile
                  </p>
                </Link>
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
