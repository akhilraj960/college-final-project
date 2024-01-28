const {
  newBrand,
  allBrands,
  activate,
  inActive,
} = require("../controllers/brandController");

const router = require("express").Router();

router.post("/newbrand", newBrand);
router.get("/brands", allBrands);
router.put("/status/active/:id", activate);
router.put("/status/inactive/:id", inActive);

module.exports = router;
