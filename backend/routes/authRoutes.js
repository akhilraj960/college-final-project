const Admin = require("../models/Admin");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    const { name, email, password, cPassword } = req.body;

    // Validation
    if (!name || !email || !password || !cPassword) {
      return res.status(400).send("All fields are required");
    }

    // Password confirmation check
    if (password !== cPassword) {
      return res.status(400).send("Passwords do not match");
    }

    // Create a new user instance
    const newUser = new User({ name, email, password });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with a success message or token, depending on your requirements
    res.status(201).send(savedUser);
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const userLogin = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    // Compare the provided password with the stored password (plaintext in this case)
    if (password !== user.password) {
      return res.status(401).send("Invalid credentials");
    }

    console.log(user);

    const userData = {
      _id: user._id,
      name: user.name,
      email,
      role: user.role,
      phone: user.phone,
      addresses: user.addresses,
    };

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with the token or any additional user data
    res.status(200).json({ token, userData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const AdminLogin = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    // Find the user by email
    const user = await Admin.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    // Compare the provided password with the stored password (plaintext in this case)
    if (password !== user.password) {
      return res.status(401).send("Invalid credentials");
    }

    // console.log(user)

    const userData = {
      _id: user._id,
      name: user.name,
      email,
      role: user.role,
      phone: user.phone,
      addresses: user.addresses,
    };

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    // Respond with the token or any additional user data
    res.status(200).json({ token, userData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getStatus = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const matches = authHeader && authHeader.match(/Bearer\s(\S+)/);
    const token = matches ? matches[1] : null;

    if (!token) {
      return res.json({ success: false, message: "Login again" });
    }

    jwt.verify(token, "JWT_SECRET", (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: "Invalid token" });
      }

      const { userId, username } = decoded;

      return res.json({
        success: true,
        message: "Token is valid",
        user: { userId, username },
      });
    });
  } catch (error) {
    console.error("Error in getStatus:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = getStatus;

module.exports = { userRegister, userLogin };
