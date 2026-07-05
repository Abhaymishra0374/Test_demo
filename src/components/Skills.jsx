import React from 'react';

const Skills = () => {
  return (
    <section id="skills" className="py-5" style={{ backgroundColor: '#f4f7f6' }}>
      <div className="container py-5">
        
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-2">My Skills</h2>
          <div className="mx-auto bg-primary" style={{ height: '4px', width: '60px', borderRadius: '2px' }}></div>
        </div>

        <div className="row g-4">
          
          {/* Frontend Skills Card */}
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 rounded-4">
              <h4 className="fw-bold mb-4 text-primary">Frontend</h4>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-semibold">HTML5, CSS3 & JS</span>
                  <span className="text-muted small">90%</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div className="progress-bar bg-primary" role="progressbar" style={{ width: '90%' }}></div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-semibold">React.js</span>
                  <span className="text-muted small">80%</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div className="progress-bar bg-primary" role="progressbar" style={{ width: '80%' }}></div>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-semibold">Bootstrap 5</span>
                  <span className="text-muted small">85%</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div className="progress-bar bg-primary" role="progressbar" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Backend Skills Card */}
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 rounded-4">
              <h4 className="fw-bold mb-4 text-primary">Backend</h4>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-semibold">Python / FastAPI</span>
                  <span className="text-muted small">85%</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div className="progress-bar bg-primary" role="progressbar" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-semibold">Node.js</span>
                  <span className="text-muted small">70%</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div className="progress-bar bg-primary" role="progressbar" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-semibold">MySQL</span>
                  <span className="text-muted small">80%</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div className="progress-bar bg-primary" role="progressbar" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Tools & Platforms Card */}
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 rounded-4">
              <h4 className="fw-bold mb-4 text-primary">Tools & Platforms</h4>
              <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
                Platforms and development tools I use regularly to build, deploy, and manage my projects.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-light text-dark border px-3 py-2">Git / GitHub</span>
                <span className="badge bg-light text-dark border px-3 py-2">Firebase</span>
                <span className="badge bg-light text-dark border px-3 py-2">Render</span>
                <span className="badge bg-light text-dark border px-3 py-2">PythonAnywhere</span>
                <span className="badge bg-light text-dark border px-3 py-2">VS Code</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;