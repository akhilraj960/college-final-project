const router = require("express").Router();
const { allUsers } = require("../controllers/adminController");

router.get("/users", allUsers);

module.exports = router;
