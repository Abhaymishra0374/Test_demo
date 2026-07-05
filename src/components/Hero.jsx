import React from 'react';
import myimg from "../assets/Abhay Passport pic.png"// Yahan apni photo import karo (jaise agar assets me profile.jpg hai)
// import profileImg from '../assets/profile.jpg'; 

const Hero = () => {
  return (
    <section id="home" className="d-flex align-items-center" style={{ backgroundColor: '#f8f9fa', minHeight: '85vh' }}>
      <div className="container py-5">
        <div className="row align-items-center flex-column-reverse flex-md-row">
          
          {/* Left Text Column */}
          <div className="col-md-6 mt-5 mt-md-0 text-center text-md-start">
            <p className="text-primary fw-bold mb-2" style={{ letterSpacing: '1px', fontSize: '0.9rem' }}>
              HELLO, I'M
            </p>
            <h1 className="display-4 fw-bold text-dark mb-2">
              Abhay Mishra
            </h1>
            <h3 className="fs-4 text-secondary mb-4">
              Full Stack Web Developer
            </h3>
            <p className="text-muted mb-4 pe-md-5" style={{ lineHeight: '1.8' }}>
              I design and develop modern, responsive and user-friendly web applications using the latest web technologies.
            </p>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="#contact" className="btn btn-primary px-4 py-2">Hire Me</a>
              <a href="#resume" className="btn btn-outline-dark px-4 py-2">Download CV</a>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="col-md-6 d-flex justify-content-center justify-content-md-end mb-4 mb-md-0">
            <div style={{ width: '400px', height: '400px', maxWidth: '100%' }}>
              <img 
                src={myimg}
                alt="Profile" 
                className="img-fluid rounded-circle shadow-lg border border-4 border-white"
                style={{ width: '100%', height: '100%', objectFit: 'cover',
                  objectPosition: 'top'
                 }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;