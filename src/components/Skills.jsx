import React from 'react';

const skillGroups = [
  {
    icon: 'bi-layout-text-window-reverse',
    title: 'Frontend',
    bars: [
      { name: 'HTML5, CSS3 & JS', pct: 90 },
      { name: 'React.js',          pct: 80 },
      { name: 'Bootstrap 5',       pct: 85 },
    ],
  },
  {
    icon: 'bi-server',
    title: 'Backend',
    bars: [
      { name: 'Python / FastAPI', pct: 85 },
      { name: 'Node.js',          pct: 70 },
      { name: 'MySQL',            pct: 80 },
    ],
  },
  {
    icon: 'bi-tools',
    title: 'Tools & Platforms',
    tags: ['Git / GitHub', 'Firebase', 'Render', 'PythonAnywhere', 'VS Code', 'Vite'],
    desc: 'Platforms and tools I use daily to build, deploy, and manage projects.',
  },
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-inner">

        <div className="text-center" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="section-label">What I Know</span>
          <h2 className="section-title">My Technical Skills</h2>
          <div className="section-divider center"></div>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, gi) => (
            <div
              className="skill-card anim-fadeup"
              key={gi}
              style={{ animationDelay: `${gi * 0.15}s` }}
            >
              <div className="skill-card-icon">
                <i className={`bi ${group.icon}`}></i>
              </div>
              <h3 className="skill-card-title">{group.title}</h3>

              {group.bars && group.bars.map((bar, bi) => (
                <div className="skill-bar-wrap" key={bi}>
                  <div className="skill-bar-header">
                    <span className="skill-bar-name">{bar.name}</span>
                    <span className="skill-bar-pct">{bar.pct}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${bar.pct}%`, animationDelay: `${bi * 0.1 + 0.3}s` }}
                    ></div>
                  </div>
                </div>
              ))}

              {group.tags && (
                <>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px', lineHeight: 1.7 }}>
                    {group.desc}
                  </p>
                  <div className="skill-tags">
                    {group.tags.map((tag, ti) => (
                      <span className="skill-tag" key={ti}>{tag}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;