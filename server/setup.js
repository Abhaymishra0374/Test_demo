/**
 * setup.js — Run this ONCE to initialize the database.
 *
 * Usage:  node setup.js
 */

require('dotenv').config();
const mysql  = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function setup() {
  // Connect without specifying a database first (to create it)
  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST     || 'localhost',
    port:     parseInt(process.env.DB_PORT) || 3306,
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  const DB = process.env.DB_NAME || 'portfolio_db';
  console.log(`\n📦  Setting up database: ${DB}\n`);

  /* ── 1. Create database ── */
  await conn.execute(`CREATE DATABASE IF NOT EXISTS \`${DB}\``);
  await conn.execute(`USE \`${DB}\``);
  console.log(`✅  Database '${DB}' ready`);

  /* ── 2. Create projects table ── */
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS projects (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      title       VARCHAR(255)      NOT NULL,
      description TEXT,
      image       MEDIUMTEXT,
      tags        VARCHAR(500)      DEFAULT '',
      demo_url    VARCHAR(500)      DEFAULT '',
      code_url    VARCHAR(500)      DEFAULT '',
      sort_order  INT               DEFAULT 0,
      created_at  TIMESTAMP         DEFAULT CURRENT_TIMESTAMP,
      updated_at  TIMESTAMP         DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  console.log('✅  Table: projects');

  /* ── 3. Create admin table ── */
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS admin (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      username      VARCHAR(100)  NOT NULL UNIQUE,
      password_hash VARCHAR(255)  NOT NULL,
      created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  console.log('✅  Table: admin');

  /* ── 4. Seed admin account ── */
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.warn('\n⚠️   ADMIN_USERNAME or ADMIN_PASSWORD not set in .env — skipping admin creation.');
  } else {
    const [existing] = await conn.execute(
      'SELECT id FROM admin WHERE username = ?', [username]
    );
    if (existing.length > 0) {
      console.log(`ℹ️   Admin '${username}' already exists — skipping.`);
    } else {
      const hash = await bcrypt.hash(password, 12);
      await conn.execute(
        'INSERT INTO admin (username, password_hash) VALUES (?, ?)', [username, hash]
      );
      console.log(`✅  Admin account '${username}' created`);
    }
  }

  /* ── 5. Seed sample projects if table is empty ── */
  const [count] = await conn.execute('SELECT COUNT(*) AS cnt FROM projects');
  if (count[0].cnt === 0) {
    const samples = [
      ['Waste-to-Wealth System', 'An eco-friendly platform incentivizing waste disposal. Users earn digital reward points for dumping waste, redeemable for real cash.', 'React, Node.js, Bootstrap', '#', '#', 1],
      ['Life OS Dashboard', 'A full-stack personal dashboard with a cinematic dark theme. Handles modular data tracking, task management, and daily workflows.', 'FastAPI, MySQL, Vanilla JS', '#', '#', 2],
      ['Amazon E-Commerce Clone', 'A fully responsive front-end replica of Amazon, featuring dynamic product grids, navigation, and a functional cart UI.', 'HTML5, CSS3, JavaScript', '#', '#', 3],
    ];
    for (const [title, desc, tags, demo, code, order] of samples) {
      await conn.execute(
        `INSERT INTO projects (title, description, image, tags, demo_url, code_url, sort_order) VALUES (?, ?, '', ?, ?, ?, ?)`,
        [title, desc, tags, demo, code, order]
      );
    }
    console.log('✅  Sample projects seeded (3 entries)');
  } else {
    console.log(`ℹ️   Projects table already has ${count[0].cnt} row(s) — skipping seed.`);
  }

  await conn.end();
  console.log('\n🎉  Setup complete! Start the server with:');
  console.log('    npm run dev\n');
}

setup().catch(err => {
  console.error('\n❌  Setup failed:', err.message);
  process.exit(1);
});
