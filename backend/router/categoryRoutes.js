const {
  activate,
  inActive,
  getCagetories,
  addCategory,
} = require("../controllers/categoryController");

const router = require("express").Router();

router.post("/addcategory", addCategory);
router.put("/status/active/:id", activate);
router.put("/status/inactive/:id", inActive);
router.get("/category", getCagetories);

module.exports = router;
