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
router.put("/statusshipping/:id", statusShipping);
router.put("/statusdelivered/:id", statusDelivered);

module.exports = router;
 