const Cart = require("../models/Cart");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token", error: err.message });
    }

    const { _id } = decoded;

    await Cart.aggregate([
      {
        $match: {
          user: {
            $eq: new mongoose.Types.ObjectId(_id),
          },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          product: 1,
        },
      },
    ]).then((response) => {
      res.status(200).json({ response, success: true });
    });
  });
};

const deleteOneItem = (req, res) => {
  const { id } = req.params;

  console.log(id);

  Cart.findByIdAndDelete(id)
    .then((response) => {
      if (!response) {
        return res
          .status(200)
          .json({ success: false, message: "Item not found" });
      }
      console.log("Item deleted:", response);
      res.status(200).json({
        success: true,
        message: "Item deleted successfully",
        deletedItem: response,
      });
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while deleting item",
        error,
      });
    });
};
 
module.exports = {
  addCart,
  CartItems,
  deleteOneItem,
};
