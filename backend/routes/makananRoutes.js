const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  getMakanan,
  tambahMakanan,
  hapusMakanan,
  updateMakanan,
  getMakananById,
} = require("../controllers/makananController");

router.get("/", getMakanan);

router.post("/", upload.single("gambar"), tambahMakanan);

router.get("/:id", getMakananById);

router.put(
  "/:id",
  upload.single("gambar"),
  updateMakanan
);

router.delete("/:id", hapusMakanan);

module.exports = router;