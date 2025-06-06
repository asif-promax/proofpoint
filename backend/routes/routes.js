const express = require("express");
const { register, login, forgotPassword, resetPassword } = require("../controllers/authcontrol");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword); // Removed :token since we're not using it

module.exports = router;