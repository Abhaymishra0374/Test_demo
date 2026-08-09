require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const db      = require('./db');

const authRoutes     = require('./routes/auth');
const projectRoutes  = require('./routes/projects');

const app  = express();
const PORT = process.env.PORT || 5000;

/* ── Middleware ── */
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    // Add your production domain here when deploying:
    // 'https://yourportfolio.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));   // allow large base64 images
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* ── Routes ── */
app.use('/api/auth',     authRoutes);
app.use('/api/projects', projectRoutes);

/* ── Health check ── */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

/* ── 404 handler ── */
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

/* ── Global error handler ── */
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  res.status(500).json({ error: 'Internal server error.' });
});

/* ── Start ── */
async function start() {
  try {
    // Verify DB connection
    await db.execute('SELECT 1');
    console.log('✅  MySQL connected successfully');
  } catch (err) {
    console.error('❌  MySQL connection failed:', err.message);
    console.error('    → Make sure MySQL is running and .env credentials are correct.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`🚀  Portfolio server running on http://localhost:${PORT}`);
    console.log(`    API base: http://localhost:${PORT}/api`);
  });
}

start();
