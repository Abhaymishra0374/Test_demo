const express  = require('express');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const db       = require('../db');
require('dotenv').config();

const router = express.Router();

// POST /api/auth/login
// Accepts { username, password } where username can be email OR name
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    // Allow login by email OR name
    const [rows] = await db.execute(
      'SELECT * FROM admins WHERE email = ? OR name = ?',
      [username.trim(), username.trim()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const admin = rows[0];
    const passwordMatch = await bcrypt.compare(password, admin.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Issue JWT — 8-hour expiry
    const token = jwt.sign(
      { id: admin.id, username: admin.name || admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({
      message: 'Login successful.',
      token,
      expiresIn: 8 * 60 * 60,
    });

  } catch (err) {
    console.error('[AUTH] Login error:', err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// POST /api/auth/verify  — lightweight token check from frontend
router.post('/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ valid: true, username: decoded.username });
  } catch (_) {
    return res.status(401).json({ valid: false });
  }
});

module.exports = router;
