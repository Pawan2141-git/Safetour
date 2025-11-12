// routes/guides.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// create guide request (user may be anonymous or logged in)
router.post('/', async (req, res) => {
  try {
    const { token } = req.headers.authorization ? { token: req.headers.authorization.split(' ')[1] } : { token: null };
    let userId = null;
    if (token) {
      try {
        const jwt = require('jsonwebtoken');
        userId = jwt.verify(token, process.env.JWT_SECRET || 'verysecret').id;
      } catch (e) {
        userId = null;
      }
    }

    const { name, email, phone, destination, startDate, endDate, groupSize, language, specialRequests } = req.body;
    const [result] = await pool.query(
      `INSERT INTO guide_requests (user_id, name, email, phone, destination, start_date, end_date, group_size, language, special_requests)
       VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [userId, name, email, phone, destination, startDate || null, endDate || null, groupSize || 1, language || 'English', specialRequests || null]
    );
    const [rows] = await pool.query('SELECT * FROM guide_requests WHERE id = ?', [result.insertId]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// list guide requests (admin)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT g.*, u.name as requester_name FROM guide_requests g LEFT JOIN users u ON u.id = g.user_id ORDER BY g.created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
