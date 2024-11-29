// controllers/authController.js
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { comparePassword, hashPassword } = require('../helpers/hashHelpers')

// Fungsi Register
const register = async (req, res) => {
  const { username, password, nama } = req.body;
  try {
    const hashedPassword = hashPassword(password);
    const newUser = await pool.query(
      "INSERT INTO users (username, password, nama) VALUES ($1, $2, $3) RETURNING *",
      [username, hashedPassword, nama]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fungsi Login
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (user.rows.length === 0) return res.status(400).json({ message: "Invalid credentials" });

    const validPassword = comparePassword(password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
