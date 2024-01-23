const {
  addProduct,
  updateProduct,
  activate,
  inActive,
} = require("../controllers/productController");

const router = require("express").Router();

router.post("/addproduct", addProduct);
router.put("/updateproduct/:id", updateProduct);
router.put("/status/activate/:id", activate);
router.put("/status/inactivate/:id", inActive);

module.exports = router;
