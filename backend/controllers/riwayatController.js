const db = require("../config/db");

exports.getRiwayat = (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT
      rp.id,
      rp.tanggal,
      rp.metode_pembayaran,
      rp.total_harga,
      rp.status,
      dp.makanan_id,
      dp.nama_makanan,
      dp.qty,
      dp.subtotal
    FROM riwayat_pesanan rp
    JOIN detail_pesanan dp
      ON rp.id = dp.pesanan_id
    WHERE rp.user_id = ?
    ORDER BY rp.id DESC
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};