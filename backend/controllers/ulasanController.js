const db = require("../config/db");

// Tambah ulasan
exports.tambahUlasan = (req, res) => {
  const {
    user_id,
    makanan_id,
    rating,
    komentar,
  } = req.body;

  const sql = `
    INSERT INTO ulasan
    (
      user_id,
      makanan_id,
      rating,
      komentar
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      user_id,
      makanan_id,
      rating,
      komentar,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Ulasan berhasil ditambahkan",
      });
    }
  );
};

// Ambil ulasan makanan
exports.getUlasan = (req, res) => {
  const sql = `
    SELECT
      u.nama,
      ul.rating,
      ul.komentar,
      ul.created_at
    FROM ulasan ul
    JOIN users u
      ON ul.user_id = u.id
    WHERE ul.makanan_id = ?
    ORDER BY ul.id DESC
  `;

  db.query(
    sql,
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};

// Ambil rata-rata rating makanan
exports.getRatingMakanan = (req, res) => {
  const sql = `
    SELECT
      ROUND(AVG(rating),1) AS rata_rata,
      COUNT(*) AS total_ulasan
    FROM ulasan
    WHERE makanan_id = ?
  `;

  db.query(
    sql,
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);
    }
  );
};