const { addCart, CartItems } = require("../controllers/cartController");

const router = require("express").Router();

router.post("/:id", addCart);
router.get('/cartitems',CartItems)

module.exports = router;
