const jwt = require("jsonwebtoken");


exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token properly
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);  // Debugging
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Invalid Token:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};


// exports.adminMiddleware = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Access denied. Admins only." });
//   }
//   next();
// };
