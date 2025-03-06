const express = require("express");
const { connectDB } = require("./connect/db");
require("dotenv").config();
const routes = require("./routes/routes");
const authRoutes = require("./controller/authRoutes");
const cors = require("cors");
const complaintControls = require("./controller/complaintControls");
const complaintForm = require("./controller/complaintRoutes");
const complaintAdmin = require("./controller/complaintAdmin");
const updateUsers = require("./controller/updateUser");
const dashboard=require("./controller/dashboard")

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

app.listen(PORT, () => console.log("server is running"));
