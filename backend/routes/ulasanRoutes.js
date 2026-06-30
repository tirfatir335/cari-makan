const express = require("express");
const router = express.Router();

const {
  tambahUlasan,
  getUlasan,
  getRatingMakanan,
} = require("../controllers/ulasanController");

router.post("/", tambahUlasan);
router.get("/:id", getUlasan);
router.get("/rating/:id", getRatingMakanan);
module.exports = router;