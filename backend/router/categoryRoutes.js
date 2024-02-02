const {
  activate,
  inActive,
  getCagetories,
  addCategory,
  updateCategory,
  oneCategory,
  activeCategories,
} = require("../controllers/categoryController");

const router = require("express").Router();

router.post("/addcategory", addCategory);
router.put("/status/active/:id", activate);
router.put("/status/inactive/:id", inActive);
router.get("/category", getCagetories);
router.put("/updatecategory/:id", updateCategory);
router.get("/onecategory/:id", oneCategory);
router.get("/activecategories", activeCategories);

module.exports = router;
