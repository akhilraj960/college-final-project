const {
  userLogin,
  userRegister,
  adminLogin,
  getStatus,
  profile,
} = require("../controllers/authController");

const router = require("express").Router();

router.post("/login", userLogin);
router.post("/register", userRegister);
router.post("/adminlogin", adminLogin);
router.get("/getstatus", getStatus);
router.get("/profile", profile);

module.exports = router;
