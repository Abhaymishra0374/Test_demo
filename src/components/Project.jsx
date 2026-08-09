import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import imgWaste from '../assets/Waste management.webp';
import imgLife  from '../assets/Life Os.webp';
import imgAmz   from '../assets/amazon.jpg';

// Map DB title → local asset fallback image
const ASSET_FALLBACK = {
  'Waste-to-Wealth System':     imgWaste,
  'Life OS Dashboard':          imgLife,
  'Amazon E-Commerce Clone':    imgAmz,
};

/* ── Tag color pool ── */
const TAG_COLORS = ['#c8f53d','#4ade80','#38bdf8','#f472b6','#fb923c','#a78bfa','#facc15','#34d399'];
function tagColor(tag) {
  let h = 0;
  for (let i = 0; i < tag.length; i++) h = tag.charCodeAt(i) + ((h << 5) - h);
  return TAG_COLORS[Math.abs(h) % TAG_COLORS.length];
}
const parseTags = str => (str || '').split(',').map(t => t.trim()).filter(Boolean);

const BLANK = { title: '', description: '', image: '', tags: '', demo_url: '', code_url: '' };

export default function Projects() {
  const { isAdmin, authFetch, API } = useAuth();

  const [projects,   setProjects]   = useState([]);
  const [fetching,   setFetching]   = useState(true);
  const [fetchErr,   setFetchErr]   = useState('');
  const [editMode,   setEditMode]   = useState(false);
  const [modalOpen,  setModalOpen]  = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form,       setForm]       = useState(BLANK);
  const [imgPreview, setImgPreview] = useState('');
  const [deleteId,   setDeleteId]   = useState(null);
  const [saving,     setSaving]     = useState(false);
  const [saveErr,    setSaveErr]    = useState('');
  const fileRef = useRef();

  /* ── Fetch projects from DB ── */
  async function fetchProjects() {
    setFetching(true);
    setFetchErr('');
    try {
      const res  = await fetch(`${API}/projects`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load projects');
      setProjects(data);
    } catch (err) {
      setFetchErr(err.message);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => { fetchProjects(); }, []);

  // Hide edit mode when admin logs out
  useEffect(() => { if (!isAdmin) setEditMode(false); }, [isAdmin]);

  /* ── Open ADD modal ── */
  function openAdd() {
    setEditTarget(null);
    setForm(BLANK);
    setImgPreview('');
    setSaveErr('');
    setModalOpen(true);
  }

  /* ── Open EDIT modal ── */
  function openEdit(p) {
    setEditTarget(p.id);
    setForm({
      title:       p.title        || '',
      description: p.description  || '',
      image:       '',            // don't re-upload unless changed
      tags:        p.tags         || '',
      demo_url:    p.demo_url     || '',
      code_url:    p.code_url     || '',
    });
    // Show current image as preview
    const preview = p.image || ASSET_FALLBACK[p.title] || '';
    setImgPreview(typeof preview === 'string' ? preview : '');
    setSaveErr('');
    setModalOpen(true);
  }

  /* ── Handle image upload (convert to base64) ── */
  function handleImg(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setImgPreview(ev.target.result);
      setForm(f => ({ ...f, image: ev.target.result }));
    };
    reader.readAsDataURL(file);
  }

  /* ── Save project (create or update) ── */
  async function handleSave() {
    if (!form.title.trim()) return;
    setSaving(true);
    setSaveErr('');
    try {
      const payload = { ...form };
      // Don't send empty image string on edit (keeps existing image in DB)
      if (editTarget && !payload.image) delete payload.image;

      const url    = editTarget ? `${API}/projects/${editTarget}` : `${API}/projects`;
      const method = editTarget ? 'PUT' : 'POST';

      const res  = await authFetch(url, { method, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');

      await fetchProjects();
      setModalOpen(false);
    } catch (err) {
      setSaveErr(err.message);
    } finally {
      setSaving(false);
    }
  }

  /* ── Delete project ── */
  async function doDelete() {
    try {
      const res  = await authFetch(`${API}/projects/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      setProjects(prev => prev.filter(p => p.id !== deleteId));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleteId(null);
    }
  }

  /* ── Resolve image source ── */
  function imgSrc(p) {
    if (p.image && p.image.length > 10) return p.image;         // base64 from DB
    return ASSET_FALLBACK[p.title] || '';                        // local fallback
  }

  /* ── Render ── */
  return (
    <>
      <section id="projects" className="projects-section">
        <div className="projects-inner">

          {/* Header */}
          <div className="projects-header">
            <div>
              <span className="section-label">My Work</span>
              <h2 className="section-title">Featured Projects</h2>
              <div className="section-divider" style={{ marginBottom: 0 }}></div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Admin: Edit mode toggle */}
              {isAdmin && (
                <button
                  onClick={() => setEditMode(m => !m)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '9px 20px', borderRadius: '8px', border: '1.5px solid',
                    borderColor: editMode ? 'var(--accent)' : 'var(--border)',
                    background:  editMode ? 'rgba(200,245,61,0.08)' : 'transparent',
                    color:       editMode ? 'var(--accent)' : 'var(--text-muted)',
                    fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem',
                    fontWeight: 600, cursor: 'pointer', transition: 'all 0.25s',
                  }}
                >
                  <i className={`bi ${editMode ? 'bi-pencil-fill' : 'bi-pencil'}`}></i>
                  {editMode ? 'Editing On' : 'Edit Mode'}
                </button>
              )}

              {/* Admin: Add button */}
              {isAdmin && editMode && (
                <button onClick={openAdd} className="btn-accent">
                  <i className="bi bi-plus-lg"></i> Add Project
                </button>
              )}

              <a
                href="https://github.com/Abhaymishra0374"
                target="_blank" rel="noreferrer"
                className="btn-outline"
                style={{ textDecoration: 'none' }}
              >
                <i className="bi bi-github"></i> View All
              </a>
            </div>
          </div>

          {/* Loading state */}
          {fetching && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <i className="bi bi-arrow-repeat" style={{ fontSize: '2rem', color: 'var(--accent)', animation: 'spin 1s linear infinite', display: 'block', marginBottom: '12px' }}></i>
              Loading projects…
            </div>
          )}

          {/* Fetch error */}
          {fetchErr && !fetching && (
            <div style={{
              padding: '20px', borderRadius: '12px', marginBottom: '24px',
              background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)',
              color: '#f87171', fontSize: '0.9rem', display: 'flex', gap: '12px', alignItems: 'center',
            }}>
              <i className="bi bi-wifi-off" style={{ fontSize: '1.4rem' }}></i>
              <div>
                <strong>Could not connect to server.</strong><br />
                <span style={{ fontSize: '0.82rem', opacity: 0.8 }}>Make sure the backend is running on port 5000. <code style={{ color: 'var(--accent)' }}>cd server && npm run dev</code></span>
              </div>
              <button onClick={fetchProjects} style={{ marginLeft: 'auto', background: 'none', border: '1px solid #f87171', color: '#f87171', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Outfit' }}>
                Retry
              </button>
            </div>
          )}

          {/* Projects Grid */}
          {!fetching && (
            <div className="projects-grid">
              {projects.map((p, i) => (
                <div
                  className="project-card anim-fadeup"
                  key={p.id}
                  style={{ animationDelay: `${i * 0.1}s`, position: 'relative' }}
                >
                  {/* Edit / Delete Controls — only for admin in edit mode */}
                  {isAdmin && editMode && (
                    <div style={{
                      position: 'absolute', top: '10px', right: '10px',
                      display: 'flex', gap: '6px', zIndex: 10,
                    }}>
                      <button onClick={() => openEdit(p)} title="Edit" style={iconBtnStyle('#38bdf8')}>
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button onClick={() => setDeleteId(p.id)} title="Delete" style={iconBtnStyle('#f87171')}>
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  )}

                  {/* Image */}
                  <div className="project-img-wrap">
                    {imgSrc(p)
                      ? <img src={imgSrc(p)} alt={p.title} />
                      : (
                        <div style={{
                          height: '200px', display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'center',
                          background: 'var(--surface-3)', color: 'var(--text-dim)',
                        }}>
                          <i className="bi bi-image" style={{ fontSize: '2.5rem', color: 'var(--accent)', opacity: 0.35 }}></i>
                          <span style={{ fontSize: '0.72rem', marginTop: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>No Screenshot</span>
                        </div>
                      )
                    }
                    {/* Demo/Code overlay — public view */}
                    {!editMode && (
                      <div className="project-overlay">
                        {p.demo_url && p.demo_url !== '#' && (
                          <a href={p.demo_url} target="_blank" rel="noreferrer" className="btn-accent" style={{ textDecoration: 'none' }}>
                            <i className="bi bi-box-arrow-up-right"></i> Demo
                          </a>
                        )}
                        {p.code_url && p.code_url !== '#' && (
                          <a href={p.code_url} target="_blank" rel="noreferrer" className="btn-outline" style={{ textDecoration: 'none' }}>
                            <i className="bi bi-github"></i> Code
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="project-body">
                    <h3 className="project-title">{p.title}</h3>
                    <p className="project-desc">{p.description || 'No description added yet.'}</p>
                    <div className="project-tags">
                      {parseTags(p.tags).map((t, ti) => (
                        <span
                          className="project-tag" key={ti}
                          style={{ borderColor: tagColor(t) + '55', color: tagColor(t) }}
                        >{t}</span>
                      ))}
                    </div>
                    {/* Link row in edit mode */}
                    {editMode && (
                      <div style={{ marginTop: '14px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {p.demo_url && p.demo_url !== '#' && (
                          <a href={p.demo_url} target="_blank" rel="noreferrer"
                            style={{ fontSize: '0.75rem', color: 'var(--accent)', textDecoration: 'none' }}>
                            <i className="bi bi-box-arrow-up-right me-1"></i>Demo
                          </a>
                        )}
                        {p.code_url && p.code_url !== '#' && (
                          <a href={p.code_url} target="_blank" rel="noreferrer"
                            style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
                            <i className="bi bi-github me-1"></i>Code
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Add card (edit mode only) */}
              {isAdmin && editMode && (
                <button
                  onClick={openAdd}
                  style={{
                    background: 'var(--surface-2)',
                    border: '2px dashed var(--border)',
                    borderRadius: '14px', minHeight: '320px',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: '14px', cursor: 'pointer', transition: 'all 0.25s',
                    color: 'var(--text-dim)', fontFamily: 'Outfit, sans-serif',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)';  e.currentTarget.style.color='var(--text-dim)'; }}
                >
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    border: '2px dashed currentColor',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                  }}>
                    <i className="bi bi-plus-lg"></i>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Add New Project
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════
          ADD / EDIT MODAL
          ══════════════════════════════ */}
      {modalOpen && (
        <div style={overlayStyle} onClick={e => e.target === e.currentTarget && setModalOpen(false)}>
          <div style={modalStyle}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
              <div>
                <h3 style={{ color: 'var(--white)', fontWeight: 800, fontSize: '1.25rem', margin: 0 }}>
                  {editTarget ? '✏️ Edit Project' : '➕ Add New Project'}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '4px 0 0' }}>
                  Changes are saved to MySQL and visible to all visitors.
                </p>
              </div>
              <button onClick={() => setModalOpen(false)} style={closeBtnStyle}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {saveErr && (
              <div style={{
                padding: '12px 16px', borderRadius: '8px', marginBottom: '20px',
                background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)',
                color: '#f87171', fontSize: '0.85rem', display: 'flex', gap: '8px', alignItems: 'center',
              }}>
                <i className="bi bi-exclamation-triangle-fill"></i> {saveErr}
              </div>
            )}

            {/* Screenshot Upload */}
            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Project Screenshot</label>
              <div
                onClick={() => fileRef.current.click()}
                style={{
                  height: '170px', border: '2px dashed var(--border)',
                  borderRadius: '12px', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  overflow: 'hidden', background: 'var(--surface-3)', transition: 'border-color 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                {imgPreview ? (
                  <>
                    <img src={imgPreview} alt="preview"
                      style={{ width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset:0 }} />
                    <div style={{
                      position:'absolute', inset:0, background:'rgba(0,0,0,0.55)',
                      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'6px',
                    }}>
                      <i className="bi bi-arrow-repeat" style={{ color:'var(--accent)', fontSize:'1.4rem' }}></i>
                      <span style={{ color:'var(--white)', fontSize:'0.8rem', fontWeight:600 }}>Click to change</span>
                    </div>
                  </>
                ) : (
                  <>
                    <i className="bi bi-cloud-arrow-up" style={{ color:'var(--accent)', fontSize:'2rem' }}></i>
                    <span style={{ color:'var(--text-muted)', fontSize:'0.85rem', marginTop:'8px' }}>Upload screenshot</span>
                    <span style={{ color:'var(--text-dim)', fontSize:'0.72rem' }}>JPG, PNG, WEBP — stored in MySQL</span>
                  </>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleImg} />
            </div>

            {/* Title */}
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Project Title *</label>
              <input type="text" className="form-input" placeholder="My Awesome Project"
                value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>

            {/* Description */}
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Description</label>
              <textarea className="form-textarea" rows={3} style={{ minHeight: '85px' }}
                placeholder="What does this project do? What was your role?"
                value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>

            {/* Tags */}
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Tech Stack (comma-separated)</label>
              <input type="text" className="form-input" placeholder="React, Node.js, MongoDB"
                value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} />
              {form.tags && (
                <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginTop:'8px' }}>
                  {parseTags(form.tags).map((t, i) => (
                    <span key={i} style={{
                      padding:'4px 10px', borderRadius:'4px', fontSize:'0.73rem', fontWeight:600,
                      background: tagColor(t) + '22', color: tagColor(t), border: `1px solid ${tagColor(t)}44`,
                    }}>{t}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Links */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'24px' }}>
              <div>
                <label style={labelStyle}><i className="bi bi-box-arrow-up-right" style={{ color:'var(--accent)', marginRight:'6px' }}></i>Demo URL</label>
                <input type="url" className="form-input" placeholder="https://myproject.vercel.app"
                  value={form.demo_url} onChange={e => setForm(f => ({ ...f, demo_url: e.target.value }))} />
              </div>
              <div>
                <label style={labelStyle}><i className="bi bi-github" style={{ color:'var(--text-muted)', marginRight:'6px' }}></i>GitHub URL</label>
                <input type="url" className="form-input" placeholder="https://github.com/you/repo"
                  value={form.code_url} onChange={e => setForm(f => ({ ...f, code_url: e.target.value }))} />
              </div>
            </div>

            {/* Actions */}
            <div style={{ display:'flex', gap:'12px' }}>
              <button
                onClick={handleSave}
                className="btn-accent"
                disabled={!form.title.trim() || saving}
                style={{ flex:1, justifyContent:'center', padding:'13px', opacity: saving ? 0.7 : 1 }}
              >
                {saving
                  ? <><i className="bi bi-arrow-repeat" style={{ animation:'spin 1s linear infinite' }}></i> Saving…</>
                  : <><i className={`bi ${editTarget ? 'bi-check-lg' : 'bi-plus-lg'}`}></i> {editTarget ? 'Save Changes' : 'Add Project'}</>
                }
              </button>
              <button onClick={() => setModalOpen(false)} className="btn-outline" style={{ padding:'13px 22px' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════
          DELETE CONFIRM MODAL
          ══════════════════════════════ */}
      {deleteId !== null && (
        <div style={overlayStyle} onClick={e => e.target === e.currentTarget && setDeleteId(null)}>
          <div style={{ ...modalStyle, maxWidth:'400px' }}>
            <div style={{ textAlign:'center', padding:'8px 0 20px' }}>
              <div style={{
                width:'60px', height:'60px', borderRadius:'50%',
                background:'rgba(248,113,113,0.12)',
                display:'flex', alignItems:'center', justifyContent:'center',
                margin:'0 auto 18px', fontSize:'1.6rem', color:'#f87171',
              }}>
                <i className="bi bi-trash-fill"></i>
              </div>
              <h3 style={{ color:'var(--white)', fontWeight:800, marginBottom:'8px' }}>Delete Project?</h3>
              <p style={{ color:'var(--text-muted)', fontSize:'0.88rem' }}>
                This will permanently remove the project from the database.
              </p>
            </div>
            <div style={{ display:'flex', gap:'12px' }}>
              <button
                onClick={doDelete}
                style={{
                  flex:1, padding:'13px', borderRadius:'8px', border:'none',
                  background:'#f87171', color:'#000', fontFamily:'Outfit, sans-serif',
                  fontSize:'0.9rem', fontWeight:700, cursor:'pointer',
                }}
              >
                <i className="bi bi-trash-fill me-1"></i> Delete
              </button>
              <button onClick={() => setDeleteId(null)} className="btn-outline" style={{ flex:1, justifyContent:'center', padding:'13px' }}>
                Keep It
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </>
  );
}

const overlayStyle = {
  position:'fixed', inset:0, zIndex:9999,
  background:'rgba(0,0,0,0.8)', backdropFilter:'blur(10px)',
  display:'flex', alignItems:'center', justifyContent:'center', padding:'20px',
};
const modalStyle = {
  background:'var(--surface-2)', border:'1px solid var(--border)',
  borderRadius:'20px', padding:'36px',
  width:'100%', maxWidth:'560px', maxHeight:'90vh', overflowY:'auto',
  boxShadow:'0 40px 100px rgba(0,0,0,0.7)', animation:'fadeInUp 0.3s ease both',
};
const labelStyle = {
  display:'block', fontSize:'0.72rem', fontWeight:700,
  letterSpacing:'1.5px', textTransform:'uppercase',
  color:'var(--text-muted)', marginBottom:'8px',
};
const closeBtnStyle = {
  width:'34px', height:'34px', borderRadius:'50%', flexShrink:0,
  border:'1px solid var(--border)', background:'transparent',
  color:'var(--text-muted)', cursor:'pointer', fontSize:'0.85rem',
  display:'flex', alignItems:'center', justifyContent:'center',
};
function iconBtnStyle(color) {
  return {
    width:'32px', height:'32px', borderRadius:'8px',
    border:`1px solid ${color}44`, background:`${color}18`, color,
    display:'flex', alignItems:'center', justifyContent:'center',
    fontSize:'0.82rem', cursor:'pointer', backdropFilter:'blur(4px)',
  };
}