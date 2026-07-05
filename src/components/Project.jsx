import React from 'react';
import img from "../assets/Waste management.webp"
import img1 from "../assets/Life Os.webp"
import img2 from "../assets/amazon.jpg"
const Projects = () => {
  return (
    <section id="projects" className="py-5" style={{ backgroundColor: '#ffffff' }}>
      <div className="container py-5">
        
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-2">Featured Projects</h2>
          <div className="mx-auto bg-primary" style={{ height: '4px', width: '60px', borderRadius: '2px' }}></div>
        </div>

        <div className="row g-4">
          
          {/* Project Card 1: Waste Management */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              <img 
                src={img}
                alt="Waste Management System" 
                className="card-img-top" 
                style={{ height: '200px', objectFit: 'cover', backgroundColor: '#e9ecef' }} 
              />
              <div className="card-body p-4 d-flex flex-column">
                <h5 className="fw-bold mb-3 text-dark">Waste-to-Wealth System</h5>
                <p className="text-muted small mb-4" style={{ lineHeight: '1.6' }}>
                  An eco-friendly platform incentivizing waste disposal. Users earn digital reward points directly in their accounts for dumping waste, which can be seamlessly redeemed for real cash.
                </p>
                <div className="d-flex flex-wrap gap-2 mb-4 mt-auto">
                  {/* Tum apne hisaab se tech stack update kar lena */}
                  <span className="badge bg-light text-dark border">React</span>
                  <span className="badge bg-light text-dark border">Node.js</span>
                  <span className="badge bg-light text-dark border">Bootstrap</span>
                </div>
                <div className="d-flex gap-2">
                  <a href="#" className="btn btn-outline-primary btn-sm flex-grow-1">Live Demo</a>
                  <a href="#" className="btn btn-dark btn-sm flex-grow-1">GitHub</a>
                </div>
              </div>
            </div>
          </div>

          {/* Project Card 2: Life OS */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              <img 
                src={img1}
                alt="Life OS Dashboard" 
                className="card-img-top" 
                style={{ height: '200px', objectFit: 'cover', backgroundColor: '#e9ecef' }} 
              />
              <div className="card-body p-4 d-flex flex-column">
                <h5 className="fw-bold mb-3 text-dark">Life OS Dashboard</h5>
                <p className="text-muted small mb-4" style={{ lineHeight: '1.6' }}>
                  A full-stack personal dashboard featuring a highly customized cinematic dark theme. Built to handle modular data tracking, task management, and daily workflows seamlessly.
                </p>
                <div className="d-flex flex-wrap gap-2 mb-4 mt-auto">
                  <span className="badge bg-light text-dark border">FastAPI</span>
                  <span className="badge bg-light text-dark border">MySQL</span>
                  <span className="badge bg-light text-dark border">Modular JS/CSS</span>
                </div>
                <div className="d-flex gap-2">
                  <a href="#" className="btn btn-outline-primary btn-sm flex-grow-1">Live Demo</a>
                  <a href="#" className="btn btn-dark btn-sm flex-grow-1">GitHub</a>
                </div>
              </div>
            </div>
          </div>

          {/* Project Card 3: Amazon Clone */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              <img 
                src={img2} 
                alt="Amazon Clone" 
                className="card-img-top" 
                style={{ height: '200px', objectFit: 'cover', backgroundColor: '#e9ecef' }} 
              />
              <div className="card-body p-4 d-flex flex-column">
                <h5 className="fw-bold mb-3 text-dark">Amazon E-Commerce Clone</h5>
                <p className="text-muted small mb-4" style={{ lineHeight: '1.6' }}>
                  A fully responsive front-end replica of the Amazon platform. Features dynamic product grids, smooth navigation, and a functional cart UI layout to simulate a premium shopping experience.
                </p>
                <div className="d-flex flex-wrap gap-2 mb-4 mt-auto">
                  <span className="badge bg-light text-dark border">HTML5</span>
                  <span className="badge bg-light text-dark border">CSS3</span>
                  <span className="badge bg-light text-dark border">JavaScript</span>
                </div>
                <div className="d-flex gap-2">
                  <a href="#" className="btn btn-outline-primary btn-sm flex-grow-1">Live Demo</a>
                  <a href="#" className="btn btn-dark btn-sm flex-grow-1">GitHub</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;