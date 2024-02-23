const { updateUser } = require("../controllers/userController");

const router = require("express").Router();


router.put('/update',updateUser)


module.exports = router;
