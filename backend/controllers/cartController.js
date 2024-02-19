const Cart = require("../models/Cart");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");

const addCart = (req, res) => {
  const { id } = req.params;
  const authHeader = req.headers.authorization;
  const matches = authHeader && authHeader.match(/Bearer\s(\S+)/);
  const token = matches ? matches[1] : null;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ success: false, message: "Login again", err });
    }

    const { _id } = decoded;

    const newCart = new Cart({
      user: _id,
      product: id,
    });

    newCart.save().then((data) => {
      if (data) {
        res.status(200).json({ message: "Added To Cart", success: true });
      }
    });
  });
};

const CartItems = (req, res) => {
  const { id } = req.params;
  const authHeader = req.headers.authorization;
  const matches = authHeader && authHeader.match(/Bearer\s(\S+)/);
  const token = matches ? matches[1] : null;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ success: false, message: "Login again", err });
    }

    const { _id } = decoded;
  });
};

module.exports = {
  addCart,
  CartItems,
};
