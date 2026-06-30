const db = require("../config/db");

// ================= CHECKOUT =================
exports.checkout = (req, res) => {

  const user_id = req.body.user_id;
  const total = req.body.total;
  const metode = req.body.metode;
  const bank = req.body.bank;
  const alamat = req.body.alamat;
  const catatan = req.body.catatan;

  const items = JSON.parse(req.body.items);

  const buktiTransfer = req.file
    ? req.file.filename
    : null;

  const sqlPesanan = `
    INSERT INTO riwayat_pesanan
    (
      user_id,
      metode_pembayaran,
      bank,
      alamat,
      catatan,
      bukti_transfer,
      total_harga
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sqlPesanan,
    [
      user_id,
      metode,
      bank,
      alamat,
      catatan,
      buktiTransfer,
      total,
    ],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      const pesananId = result.insertId;

      const detail = items.map((item) => [
        pesananId,
        item.id,
        item.nama,
        item.harga,
        item.qty,
        item.harga * item.qty,
      ]);

      const sqlDetail = `
        INSERT INTO detail_pesanan
        (
          pesanan_id,
          makanan_id,
          nama_makanan,
          harga,
          qty,
          subtotal
        )
        VALUES ?
      `;

      db.query(
        sqlDetail,
        [detail],
        (err2) => {

          if (err2) {
            return res.status(500).json(err2);
          }

          res.json({
            success: true,
            message: "Checkout berhasil",
          });

        }
      );

    }
  );

};

// ================= TOTAL PESANAN =================
exports.getTotalPesanan = (req, res) => {

  const sql =
    "SELECT COUNT(*) AS total FROM riwayat_pesanan";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Server Error",
      });
    }

    res.json(result[0]);

  });

};

// ================= TOTAL PENDAPATAN =================
exports.getPendapatan = (req, res) => {

  const sql =
    "SELECT SUM(total_harga) AS total FROM riwayat_pesanan";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Server Error",
      });
    }

    res.json({
      total: result[0].total || 0,
    });

  });

};

// ================= DAFTAR PESANAN =================
exports.getSemuaPesanan = (req, res) => {

  const sql = `
    SELECT
      rp.id,
      u.nama,
      rp.tanggal,
      rp.metode_pembayaran,
      rp.bank,
      rp.alamat,
      rp.catatan,
      rp.bukti_transfer,
      rp.total_harga,
      rp.status,

      GROUP_CONCAT(
        CONCAT(dp.nama_makanan,' x',dp.qty)
        SEPARATOR ', '
      ) AS makanan

    FROM riwayat_pesanan rp

    JOIN users u
      ON rp.user_id = u.id

    JOIN detail_pesanan dp
      ON rp.id = dp.pesanan_id

    WHERE rp.status IS NULL
    OR rp.status != 'Selesai'

    GROUP BY rp.id

    ORDER BY rp.id DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

// ================= UPDATE STATUS =================
exports.updateStatus = (req, res) => {

  const id = req.params.id;
  const { status } = req.body;

  const sql = `
    UPDATE riwayat_pesanan
    SET status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [status, id],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Status berhasil diupdate",
      });

    }
  );

};