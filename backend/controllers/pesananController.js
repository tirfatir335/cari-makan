const db = require("../config/db");

// Total Pesanan
const getTotalPesanan = (req, res) => {
  const sql = "SELECT COUNT(DISTINCT id) AS total FROM pesanan";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Server Error",
      });
    }

    res.json(result[0]);
  });
};

module.exports = {
  getTotalPesanan,
};