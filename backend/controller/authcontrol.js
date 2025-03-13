const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();
const nodemailer = require("nodemailer");

exports.register = async (req, res) => {
  try {
    const { name, number, email, password, role } = req.body;
    if (!name || !email || !password || !number) {
      return res.status(400).json({ message: "data not found" });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ msg: "alredy exist" });
    }

    const user = new User({ name, number, email, password, role });
    await user.save();

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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "invalid " });
    }
    console.log("Stored Password:", user.password);
    console.log("Typed Password:", password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Manual Comparison Result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ msg: "password don't match" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        userNumber: user.number,
        // role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    if (!token) {
      return res.json({ msg: "Token not found" });
    }
    const role = user.role;
    return res.status(201).json({ msg: "login successfull", token, role });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Forgot Password
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

    // Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Verify transporter before sending mail
    transporter.verify((err, success) => {
      if (err) {
        console.error("Nodemailer Error:", err);
      } else {
        console.log("Nodemailer is ready to send emails");
      }
    });

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset. Click the link below to reset your password.</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>This link is valid for 1 hour.</p>`,
    });

    return res
      .status(200)
      .json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    console.log("New Password Before Hashing:", newPassword);

    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    console.log("hashed password after saving", user.password);

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
