const express = require("express");
const { register, login } = require("../controller/authcontrol");
// const { authMiddleware} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protect admin routes
// router.get("/admin/dashboard", authMiddleware, adminMiddleware, (req, res) => {
//   res.json({ message: "Welcome Admin" });
// });

module.exports = router;
