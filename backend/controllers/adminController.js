const User = require("../models/User");

const allUsers = async (req, res) => {
  const users = await User.find().select("-password");

  if (!users) {
    return res.status(404).json({ message: "Users not found", success: false });
  }

  return res.json({ users, success: true });
};

module.exports = { allUsers };
