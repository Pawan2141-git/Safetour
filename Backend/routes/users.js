// routes/users.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth'); // above

// get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query('SELECT id, name, email, phone, avatar, user_type, created_at FROM users WHERE id = ?', [userId]);
    if (!rows.length) return res.status(404).json({ message: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
