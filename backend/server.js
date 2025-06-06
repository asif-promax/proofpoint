const express = require("express");
const { connectDB } = require("./config/db");
require("dotenv").config();
const routes = require("./routes/routes");
const authRoutes = require("./controllers/authRoutes");
const cors = require("cors");
const complaintControls = require("./controllers/complaintControls");
const complaintForm = require("./controllers/complaintRoutes");
const complaintAdmin = require("./controllers/complaintAdmin");
const updateUsers = require("./controllers/updateUser");
const dashboard=require("./controllers/dashboard")

const app = express();

connectDB();
app.use(express.json());
app.use(cors());

app.use("/auth", routes);
app.use("/users", authRoutes);
app.use("/complaint", complaintControls);
app.use("/complaintForm", complaintForm);
app.use("/allcomplaints", complaintAdmin);
app.use("/updateUsers", updateUsers);
app.use("/dashboard",dashboard)

const PORT = process.env.PORT || 5002;
console.log(PORT);

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Not Loaded");

app.listen(PORT, () => console.log("server is running"));