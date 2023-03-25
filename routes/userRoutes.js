const express = require("express");
const router = express.Router();
const {
  registerNewuser,
  loginUser,
  getCurrentUser,
} = require("../controllers/usersController");
const vailidateJWTToken = require("../middleware/vailidateToken");

router.post("/register", registerNewuser);
router.post("/login", loginUser);
router.get("/current", vailidateJWTToken ,getCurrentUser);

module.exports = router;

