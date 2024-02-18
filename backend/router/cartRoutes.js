const { order } = require("../controllers/cartController");

const router = require("express").Router();

router.post("/:productId", order);

module.exports = router;
