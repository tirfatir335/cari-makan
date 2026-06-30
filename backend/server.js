require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

const makananRoutes = require("./routes/makananRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const riwayatRoutes = require("./routes/riwayatRoutes");
const authRoutes = require("./routes/authRoutes");
const ulasanRoutes = require("./routes/ulasanRoutes");

app.use("/api/makanan", makananRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/riwayat", riwayatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ulasan", ulasanRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `Server berjalan di port ${process.env.PORT}`
  );
});