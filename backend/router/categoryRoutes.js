const { activate, inActive } = require("../controllers/categoryController");

const router = require("express").Router();

router.put("/status/active/:id", activate);
router.put("/status/inactive/:id", inActive);

module.exports = router;
