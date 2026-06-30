const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getTotalUser,
  getUsers,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/total-user", getTotalUser);
router.get("/users", getUsers);

module.exports = router;