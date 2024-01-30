const {
  newBrand,
  allBrands,
  activate,
  inActive,
  updateBrand,
  oneBrand,
} = require("../controllers/brandController");

const router = require("express").Router();

router.post("/newbrand", newBrand);
router.get("/brands", allBrands);
router.put("/status/active/:id", activate);
router.put("/status/inactive/:id", inActive);
router.put("/updatebrand/:id", updateBrand);
router.get("/onebrand/:id", oneBrand);

module.exports = router;
