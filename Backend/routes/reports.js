// routes/reports.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// create report
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, latitude, longitude, severity } = req.body;
    const [result] = await pool.query(
      `INSERT INTO reports (user_id, title, description, latitude, longitude, severity) VALUES (?,?,?,?,?,?)`,
      [userId, title || null, description || null, latitude || null, longitude || null, severity || 'low']
    );
    const [rows] = await pool.query('SELECT * FROM reports WHERE id = ?', [result.insertId]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// list reports (admin or all public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT r.*, u.name as reporter_name, u.email as reporter_email FROM reports r LEFT JOIN users u ON u.id = r.user_id ORDER BY r.created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
