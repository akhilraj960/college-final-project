const User = require("../models/User");
const jwt = require("jsonwebtoken");
const updateUser = (req, res) => {
  const { phone, address1, address2, city, zipcode } = req.body;

  const authHeader = req.headers.authorization;
  const matches = authHeader && authHeader.match(/Bearer\s(\S+)/);
  const token = matches ? matches[1] : null;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ success: false, message: "Login again", err });
    }

    const { _id } = decoded;

    const updateObj = {};
    if (phone) updateObj.phone = phone;
    if (address1 || address2 || city || zipcode) {
      updateObj.address = {};
      if (address1) updateObj.address.address1 = address1;
      if (address2) updateObj.address.address2 = address2;
      if (zipcode) updateObj.address.zipcode = zipcode;
      if (city) updateObj.address.city = city;
    }

    User.findByIdAndUpdate(_id, updateObj)
      .select("-password")
      .then((data) => {
        res.status(200).json({ data, message: "Order Placed", success: true });
      });
  });
};

module.exports = { updateUser };
