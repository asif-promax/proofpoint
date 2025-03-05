const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    // const token = jwt.sign(
    //   {
    //     userId: user._id,
    //     userName: user.name,
    //     userEmail: user.email,
    //     userNumber: user.number,
    //     role: user.role,
    //   },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "7d" }
    // );

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
      return res.status(400).json({ msg: "invalid" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "invalid" });
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
    const role = user.role;
    return res.status(201).json({ msg: "login successfull", token ,role});
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
};
