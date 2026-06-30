const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  checkout,
  getTotalPesanan,
  getPendapatan,
  getSemuaPesanan,
  updateStatus,
} = require("../controllers/checkoutController");

router.post(
  "/",
  upload.single("bukti_transfer"),
  checkout
);

router.get("/total", getTotalPesanan);

router.get("/pendapatan", getPendapatan);

router.get("/", getSemuaPesanan);

router.put(
  "/status/:id",
  updateStatus
);

module.exports = router;