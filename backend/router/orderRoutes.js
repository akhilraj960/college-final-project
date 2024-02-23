const { order } = require("../controllers/orderController");

const router = require("express").Router();

router.post("/:id", order);

module.exports = router;
