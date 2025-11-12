// routes/auth.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'verysecret';

// register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'name, email and password required' });
    }
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length) return res.status(409).json({ message: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password_hash, phone) VALUES (?, ?, ?, ?)',
      [name, email, hash, phone || null]
    );
    const user = { id: result.insertId, name, email, phone };
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const [rows] = await pool.query('SELECT id, name, email, password_hash, phone, user_type FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email, userType: user.user_type }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user.id, name: user.name, email: user.email, phone: user.phone, user_type: user.user_type }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;