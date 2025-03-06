import React from "react";
import { motion } from "framer-motion";
import { SiGmail, SiInstagram } from "react-icons/si";
import { FaFacebookSquare, FaRegHandshake } from "react-icons/fa";
import { FaXTwitter, FaRoad, FaTrash, FaMusic } from "react-icons/fa6";
import { Link } from "react-router-dom";
import first from "../images/first.png";
import second from "../images/second.jpg";

const LandingPage = () => {
  const categories = [
    { name: "Waste Dumping", icon: <FaTrash className="w-8 h-8" /> },
    { name: "Public Nuisance", icon: <FaRegHandshake className="w-8 h-8" /> },
    { name: "Traffic Violation", icon: <FaRoad className="w-8 h-8" /> },
    { name: "Noise Pollution", icon: <FaMusic className="w-8 h-8" /> },
  ];

  const steps = [
    { title: "Register Complaint", text: "Click the register button" },
    { title: "Submit Details", text: "Fill form & upload evidence" },
    { title: "Track Progress", text: "Monitor complaint status" },
  ];

  const testimonials = [
    { name: "Jorge", text: "This platform transformed how we address community issues!", role: "Community Leader" },
    { name: "Aami", text: "Finally a transparent system for civic complaints!", role: "Local Business Owner" },
    { name: "Raj", text: "Quick resolution and easy tracking system", role: "Student" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-8"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Empower Your Community
            </h1>
            <p className="text-xl text-gray ">
              Transform civic engagement with our AI-powered complaint resolution platform.
              Document issues effectively with multimedia evidence and real-time tracking.
            </p>
            <Link to="form">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Report an Issue Now
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:w-1/2 relative"
          >
            <img 
              src={first} 
              alt="Community Empowerment" 
              className="rounded-2xl  bo border-white " 
            />
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-8 -right-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border"
            >
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">✓</span>
                </div>
                <div>
                  <p className="font-bold text-gray-100">1k+ Resolved</p>
                  <p className="text-sm text-gray-300">Issues This Month</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Common Issues</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="text-blue-500 dark:text-purple-400 mb-4">
                  {category.icon}
                </div>
                <h3 className="text-2xl text-gray-200 font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {`Report ${category.name.toLowerCase()} issues with multimedia evidence`}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple Reporting Process</h2>
          <p className="text-gray-600  text-xl">Three steps to make your voice heard</p>
        </div>
        
        <div className="relative flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="absolute h-1 w-full bg-gray-400 top-1/2 hidden md:block" />
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10 dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full md:w-80"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center">
                {index + 1}
              </div>
              <h3 className="text-2xl text-gray-200 font-semibold mb-4 text-center">{step.title}</h3>
              <p className=" text-gray-400 text-center">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 dark:bg-gray-700 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-200 text-center mb-12">Community Voices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white  p-8 rounded-2xl shadow-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">ProofPoint</h3>
              <p className="text-gray-400">Empowering communities through transparent governance</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition">Report Issue</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Track Complaint</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Community Guidelines</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">API Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <FaFacebookSquare className="text-2xl cursor-pointer hover:text-blue-400 transition" />
                <FaXTwitter className="text-2xl cursor-pointer hover:text-blue-400 transition" />
                <SiInstagram className="text-2xl cursor-pointer hover:text-pink-500 transition" />
                <SiGmail className="text-2xl cursor-pointer hover:text-red-500 transition" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 ProofPoint. All rights reserved. Building better communities together.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;