const { newBrand, allBrands } = require("../controllers/brandController");

const router = require("express").Router();

router.post("/newbrand", newBrand);
router.get("/brands", allBrands);

module.exports = router;
