const User = require("../models/User");

const getAllUsers = (req, res) => {
  const users = User.find().then((data) => {
    console.log(data);

    res.json(users);
  });
};

module.exports = { getAllUsers };
