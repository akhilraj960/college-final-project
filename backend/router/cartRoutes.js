const {
  addCart,
  CartItems,
  deleteOneItem,
} = require("../controllers/cartController");

const router = require("express").Router();

router.post("/:id", addCart);
router.get("/cartitems", CartItems);
router.delete("/delete/:id", deleteOneItem);

module.exports = router;
