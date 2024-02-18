const Order = require("../models/Order");

const order = (req, res) => {
  const { userId, productId } = req.params;

  console.log(req.headers.authorization);

  const newOrder = new Order({
    user: userId,
    product: productId,
  });

  newOrder
    .save()
    .then((data) => {
      console.log(data);
      res.status(200).json({ message: "Order Successfull", success: true });
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal Error", success: false });
      console.log(error);
    });
};

module.exports = {
  order,
};
