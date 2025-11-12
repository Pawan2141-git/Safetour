// routes/contacts.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const [result] = await pool.query('INSERT INTO contacts (name, email, subject, message) VALUES (?,?,?,?)', [name, email, subject, message]);
    const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', [result.insertId]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
