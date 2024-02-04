const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const User = require("../models/User");

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required", success: false });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(200)
        .json({ message: "Invalid credentials", success: false });
    }

    const isPassword = bcrypt.compareSync(password, user.password);

    if (!isPassword) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.addresses,
    };

    const token = jwt.sign(
      { _id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res
      .status(200)
      .json({ token, userData, message: "Login Success", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const userRegister = async (req, res) => {
  try {
    const { name, email, password, cPassword } = req.body;

    if (!name || !email || !password || !cPassword) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    if (password !== cPassword) {
      return res
        .status(400)
        .json({ message: "Password not match", success: false });
    }

    const hashPassword = await bcrypt.hashSync(password, 10);

    if (!hashPassword) {
      return res
        .status()
        .json({ message: "Error Occured In HashPassword", success: false });
    }

    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "User Registration successfully completed",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All Fields are required", success: false });
    }

    const admin = await Admin.findOne({ email });
    console.log(admin);

    if (!admin) {
      return res.json({ message: "Invalid credentials", success: false });
    }

    const isPassword = bcrypt.compareSync(password, admin.password);

    console.log(isPassword);

    if (!isPassword) {
      return res.json({ message: "Invalid email or password", success: false });
    }

    const adminData = {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };

    const token = jwt.sign(
      { _id: admin._id, name: admin.name, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res
      .status(200)
      .json({ message: "Login success", success: true, token, adminData });
  } catch (error) {
    console.log(error);
  }
};

const getStatus = async (req, res) => {
  console.log("status")
  try {
    const authHeader = req.headers.authorization;
    const matches = authHeader && authHeader.match(/Bearer\s(\S+)/);
    const token = matches ? matches[1] : null;

    if (!token) {
      return res.json({ success: false, message: "Login again" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: "Login again", err });
      }

      const { name, role } = decoded;

      console.log(name);

      return res.json({
        name: name,
        role: role,
        success: true,
      });
    });
  } catch (error) {
    console.error("Error in getStatus:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { userLogin, userRegister, adminLogin, getStatus };
