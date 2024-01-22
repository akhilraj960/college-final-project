const {
  addProduct,
  updateProduct,
} = require("../controllers/productController");

const router = require("express").Router();

router.post("/addproduct", addProduct);
router.put("/updateproduct/:id", updateProduct);

module.exports = router;
