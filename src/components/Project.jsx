import React from 'react';
import imgWaste from '../assets/Waste management.webp';
import imgLife  from '../assets/Life Os.webp';
import imgAmz   from '../assets/amazon.jpg';

const projects = [
  {
    title:       'Waste-to-Wealth System',
    description: 'An eco-friendly platform incentivizing waste disposal. Users earn digital reward points for dumping waste, redeemable for real cash.',
    image:       imgWaste,
    tags:        ['React', 'Node.js', 'Bootstrap'],
    demo_url:    '#',   // TODO: add live link
    code_url:    '#',   // TODO: add GitHub repo link
  },
  {
    title:       'Life OS Dashboard',
    description: 'A full-stack personal dashboard with a cinematic dark theme. Handles modular data tracking, task management, and daily workflows.',
    image:       imgLife,
    tags:        ['FastAPI', 'MySQL', 'Vanilla JS'],
    demo_url:    '#',   // TODO: add live link
    code_url:    '#',   // TODO: add GitHub repo link
  },
  {
    title:       'Amazon E-Commerce Clone',
    description: 'A fully responsive front-end replica of Amazon, featuring dynamic product grids, navigation, and a functional cart UI.',
    image:       imgAmz,
    tags:        ['HTML5', 'CSS3', 'JavaScript'],
    demo_url:    '#',   // TODO: add live link
    code_url:    'https://github.com/Abhaymishra0374',
  },
];

/* ── Tag color pool ── */
const TAG_COLORS = ['#c8f53d','#4ade80','#38bdf8','#f472b6','#fb923c','#a78bfa','#facc15','#34d399'];
function tagColor(tag) {
  let h = 0;
  for (let i = 0; i < tag.length; i++) h = tag.charCodeAt(i) + ((h << 5) - h);
  return TAG_COLORS[Math.abs(h) % TAG_COLORS.length];
}

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-inner">

        {/* Header */}
        <div className="projects-header">
          <div>
            <span className="section-label">My Work</span>
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-divider" style={{ marginBottom: 0 }}></div>
          </div>

          <a
            href="https://github.com/Abhaymishra0374"
            target="_blank" rel="noreferrer"
            className="btn-outline"
            style={{ textDecoration: 'none' }}
          >
            <i className="bi bi-github"></i> View All
          </a>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div
              className="project-card anim-fadeup"
              key={i}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Image */}
              <div className="project-img-wrap">
                {p.image
                  ? <img src={p.image} alt={p.title} />
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

                {/* Demo / Code overlay */}
                <div className="project-overlay">
                  <a
                    href={p.demo_url || '#'}
                    target={p.demo_url && p.demo_url !== '#' ? '_blank' : '_self'}
                    rel="noreferrer"
                    className="btn-accent"
                    style={{ textDecoration: 'none', opacity: p.demo_url && p.demo_url !== '#' ? 1 : 0.5, cursor: p.demo_url && p.demo_url !== '#' ? 'pointer' : 'default' }}
                    onClick={e => { if (!p.demo_url || p.demo_url === '#') e.preventDefault(); }}
                    title={p.demo_url && p.demo_url !== '#' ? 'Live Demo' : 'Coming soon'}
                  >
                    <i className="bi bi-box-arrow-up-right"></i> Demo
                  </a>
                  <a
                    href={p.code_url || '#'}
                    target={p.code_url && p.code_url !== '#' ? '_blank' : '_self'}
                    rel="noreferrer"
                    className="btn-outline"
                    style={{ textDecoration: 'none', opacity: p.code_url && p.code_url !== '#' ? 1 : 0.5, cursor: p.code_url && p.code_url !== '#' ? 'pointer' : 'default' }}
                    onClick={e => { if (!p.code_url || p.code_url === '#') e.preventDefault(); }}
                    title={p.code_url && p.code_url !== '#' ? 'View Code' : 'Coming soon'}
                  >
                    <i className="bi bi-github"></i> Code
                  </a>
                </div>
              </div>

              {/* Card Body */}
              <div className="project-body">
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>
                <div className="project-tags">
                  {p.tags.map((t, ti) => (
                    <span
                      className="project-tag" key={ti}
                      style={{ borderColor: tagColor(t) + '55', color: tagColor(t) }}
                    >{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}