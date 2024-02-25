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

const adminOrder = (req, res) => {
  Order.aggregate([
    {
      $match: {
        status: {
          $ne: "delivered",
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
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
      $unwind: "$user",
    },
    {
      $unwind: "$product",
    },
  ]).then((data) => {
    res.status(200).json({ data, success: true });
  });
};

const statusProcess = (req, res) => {
  const { id } = req.params;

  Order.findByIdAndUpdate(id, { status: "processing" }).then((data) => {
    res.status(200).json({ message: "Processing", success: true });
  });
};

const statusShipping = (req, res) => {
  const { id } = req.params;

  Order.findByIdAndUpdate(id, { status: "shipping" }).then((data) => {
    res.status(200).json({ message: "Shipping", success: true });
  });
};

const statusDelivered = (req, res) => {
  const { id } = req.params;

  Order.findByIdAndUpdate(id, { status: "delievered" }).then((data) => {
    res.status(200).json({ message: "Delivered", success: true });
  });
};

module.exports = {
  order,
  adminOrder,
  statusProcess,
  statusShipping,
  statusDelivered,
};
