const express = require("express");

const router = express.Router();

const {
  getRiwayat,
} = require("../controllers/riwayatController");

router.get("/:userId", getRiwayat);

module.exports = router;