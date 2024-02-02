const {
  addProduct,
  updateProduct,
  activate,
  inActive,
  oneProduct,
  products,
  activeProducts,
} = require("../controllers/productController");

const router = require("express").Router();

router.post("/addproduct", addProduct);
router.put("/updateproduct/:id", updateProduct);
router.put("/status/activate/:id", activate);
router.put("/status/inactivate/:id", inActive);
router.get("/oneproduct/:id", oneProduct);
router.get('/products',products)
router.get("/activeproducts",activeProducts)


module.exports = router;
