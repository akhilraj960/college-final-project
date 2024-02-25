const {
  order,
  adminOrder,
  statusProcess,
  statusShipping,
  statusDelivered,
} = require("../controllers/orderController");

const router = require("express").Router();

router.post("/:id", order);
router.get("/orders", adminOrder);

router.put("/statusprocess/:id", statusProcess);
router.put("/status/shipping/:id", statusShipping);
router.put("/status/delivered/:id", statusDelivered);

module.exports = router;
