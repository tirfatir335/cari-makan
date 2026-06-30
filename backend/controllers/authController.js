const db = require("../config/db");

// ================= REGISTER =================
const register = (req, res) => {
  const { nama, email, password } = req.body;

  const sql =
    "INSERT INTO users (nama,email,password,role) VALUES (?,?,?,'user')";

  db.query(sql, [nama, email, password], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Email sudah digunakan",
      });
    }

    res.json({
      message: "Registrasi berhasil",
    });
  });
};

// ================= LOGIN =================
const login = (req, res) => {
  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }

    if (result.length === 0) {
      return res.json({
        success: false,
        message: "Email atau Password salah",
      });
    }

    const user = result[0];

    res.json({
      success: true,
      message: "Login berhasil",
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
      },
    });
  });
};

// ================= TOTAL USER =================
const getTotalUser = (req, res) => {
  const sql = "SELECT COUNT(*) AS total FROM users";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Server Error",
      });
    }

    res.json(result[0]);
  });
};

// ================= DAFTAR USER =================
const getUsers = (req, res) => {

  const sql =
    "SELECT id, nama, email, role FROM users ORDER BY id ASC";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Server Error",
      });
    }

    res.json(result);

  });

};

module.exports = {
  register,
  login,
  getTotalUser,
  getUsers,
};