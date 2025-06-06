const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();
const nodemailer = require("nodemailer");

exports.register = async (req, res) => {
  try {
    const { name, number, email, password, role } = req.body;
    console.log("Received password for registration:", password); // Add this
    if (!name || !email || !password || !number) {
      return res.status(400).json({ message: "data not found" });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ msg: "alredy exist" });
    }

    const user = new User({ name, number, email, password, role });
    await user.save();
    console.log("Saved user with hashed password:", user.password); // Add this

    return res.status(201).json({ message: "registered succesfull" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "data not found" });
    }
    console.log("Login attempt with email:", email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(400).json({ msg: "invalid " });
    }
    console.log("Stored Password (hashed):", user.password);
    console.log("Typed Password (plain):", password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        userNumber: user.number,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const role = user.role;
    return res.status(201).json({ msg: "login successfull", token, role });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please enter your email" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.otpExpiration = Date.now() + 10 * 60 * 1000; // 10 minutes expiration
    await user.save();

    console.log("Generated OTP:", otp, "for email:", email); // Debugging

    // Email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset OTP",
      html: `<p>Your OTP for password reset is:</p>
             <h2>${otp}</h2>
             <p>This OTP is valid for 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP email sent to:", user.email); // Debugging
    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// In controller/authcontrol.js
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }

    const user = await User.findOne({
      email,
      resetOtp: otp,
      otpExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = newPassword
    console.log("New hashed password:", user.password); // Debugging

    // Clear OTP fields
    user.resetOtp = undefined;
    user.otpExpiration = undefined;
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};