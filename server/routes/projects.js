const express    = require('express');
const db         = require('../db');
const verifyToken = require('../middleware/auth');

const router = express.Router();

/* ─────────────────────────────────────────────────
   GET /api/projects  — Public: returns all projects
   ───────────────────────────────────────────────── */
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT id, title, short_description AS description, description AS full_description,
              cover_image AS image, demo_url, repo_url AS code_url, display_order AS sort_order,
              featured, created_at
       FROM projects ORDER BY display_order ASC, created_at DESC`
    );
    return res.json(rows);
  } catch (err) {
    console.error('[PROJECTS] GET error:', err);
    return res.status(500).json({ error: 'Failed to fetch projects.' });
  }
});

/* ─────────────────────────────────────────────────
   POST /api/projects  — Admin: add a new project
   ───────────────────────────────────────────────── */
router.post('/', verifyToken, async (req, res) => {
  const { title, description, image, demo_url, code_url, sort_order, featured } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Project title is required.' });
  }

  // Generate slug from title
  const slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();

  try {
    const [result] = await db.execute(
      `INSERT INTO projects (title, slug, short_description, cover_image, demo_url, repo_url, display_order, featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title.trim(),
        slug,
        description || '',
        image || '',
        demo_url || '',
        code_url || '',
        sort_order || 0,
        featured ? 1 : 0,
      ]
    );

    const [newRow] = await db.execute(
      `SELECT id, title, short_description AS description, cover_image AS image,
              demo_url, repo_url AS code_url, display_order AS sort_order, featured, created_at
       FROM projects WHERE id = ?`,
      [result.insertId]
    );

    return res.status(201).json(newRow[0]);
  } catch (err) {
    console.error('[PROJECTS] POST error:', err);
    return res.status(500).json({ error: 'Failed to create project.' });
  }
});

/* ─────────────────────────────────────────────────
   PUT /api/projects/:id  — Admin: update a project
   ───────────────────────────────────────────────── */
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, image, demo_url, code_url, sort_order, featured } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Project title is required.' });
  }

  try {
    const [existing] = await db.execute('SELECT id FROM projects WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    const imageValue = (image && image.length > 0) ? image : undefined;

    if (imageValue !== undefined) {
      await db.execute(
        `UPDATE projects SET title=?, short_description=?, cover_image=?, demo_url=?, repo_url=?, display_order=?, featured=?
         WHERE id = ?`,
        [title.trim(), description || '', imageValue, demo_url || '', code_url || '', sort_order || 0, featured ? 1 : 0, id]
      );
    } else {
      await db.execute(
        `UPDATE projects SET title=?, short_description=?, demo_url=?, repo_url=?, display_order=?, featured=?
         WHERE id = ?`,
        [title.trim(), description || '', demo_url || '', code_url || '', sort_order || 0, featured ? 1 : 0, id]
      );
    }

    const [updated] = await db.execute(
      `SELECT id, title, short_description AS description, cover_image AS image,
              demo_url, repo_url AS code_url, display_order AS sort_order, featured, created_at
       FROM projects WHERE id = ?`,
      [id]
    );
    return res.json(updated[0]);
  } catch (err) {
    console.error('[PROJECTS] PUT error:', err);
    return res.status(500).json({ error: 'Failed to update project.' });
  }
});

/* ─────────────────────────────────────────────────
   DELETE /api/projects/:id  — Admin: remove project
   ───────────────────────────────────────────────── */
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const [existing] = await db.execute('SELECT id FROM projects WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    await db.execute('DELETE FROM projects WHERE id = ?', [id]);
    return res.json({ message: 'Project deleted successfully.' });
  } catch (err) {
    console.error('[PROJECTS] DELETE error:', err);
    return res.status(500).json({ error: 'Failed to delete project.' });
  }
});

module.exports = router;
