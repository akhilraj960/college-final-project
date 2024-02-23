const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
const order = (req, res) => {
  const { id } = req.params;

  console.log(id);

  const authHeader = req.headers.authorization;
  const matches = authHeader && authHeader.match(/Bearer\s(\S+)/);
  const token = matches ? matches[1] : null;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ success: false, message: "Login again", err });
    }

    const { _id } = decoded;

    const newOrder = new Order({
      user: _id,
      product: id,
    });

    newOrder.save().then((data) => {
      if (data) {
        res.status(201).json({ message: "Order Success", success: true });
      } else {
        res.status(200).json({ message: "Order failed", success: false });
      }
    });
  });
};

module.exports = { order };
