const db = require("../config/db");

// ================= GET ALL =================
const getMakanan = (req, res) => {
  db.query(
    "SELECT * FROM makanan",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};

// ================= TAMBAH =================
const tambahMakanan = (req, res) => {
  const {
  nama,
  harga,
  kategori,
  deskripsi,
  bahan,
  langkah_pembuatan,
} = req.body;

const gambar =
  req.file?.filename || "";

  const sql = `
    INSERT INTO makanan
    (
      nama,
      harga,
      kategori,
      deskripsi,
      bahan,
      langkah_pembuatan,
      gambar
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      nama,
      harga,
      kategori,
      deskripsi,
      bahan,
      langkah_pembuatan,
      gambar,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Makanan berhasil ditambahkan",
      });
    }
  );
};

// ================= HAPUS =================
const hapusMakanan = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM makanan WHERE id=?",
    [id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Makanan berhasil dihapus",
      });
    }
  );
};

// ================= UPDATE =================
const updateMakanan = (req, res) => {
  const {
    nama,
    harga,
    kategori,
    deskripsi,
    bahan,
    langkah_pembuatan,
  } = req.body;

  let gambar = null;

  if (req.file) {
    gambar = req.file.filename;
  }

  const sql = `
    UPDATE makanan
    SET
      nama=?,
      harga=?,
      kategori=?,
      deskripsi=?,
      bahan=?,
      langkah_pembuatan=?,
      gambar=COALESCE(?, gambar)
    WHERE id=?
  `;

  db.query(
    sql,
    [
      nama,
      harga,
      kategori,
      deskripsi,
      bahan,
      langkah_pembuatan,
      gambar,
      req.params.id,
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Makanan berhasil diupdate",
      });
    }
  );
};

const getMakananById = (req, res) => {
  db.query(
    "SELECT * FROM makanan WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);
    }
  );
};
module.exports = {
  getMakanan,
  tambahMakanan,
  hapusMakanan,
  updateMakanan,
  getMakananById,
};