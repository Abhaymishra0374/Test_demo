import React from 'react';
import myimg1 from "../assets/Abhay pic.png";
const About = () => {
  return (
    <section id="about" className="py-5" style={{ backgroundColor: '#ffffff' }}>
      <div className="container py-5">
        
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-2">About Me</h2>
          <div className="mx-auto bg-primary" style={{ height: '4px', width: '60px', borderRadius: '2px' }}></div>
        </div>

        <div className="row align-items-center">
          
          {/* Left Column: Image Area */}
          <div className="col-lg-5 mb-5 mb-lg-0 d-flex justify-content-center">
            <div className="position-relative" style={{ maxWidth: '400px', width: '100%' }}>
              {/* Yahan apni ek aur photo ya setup/coding ki photo daal sakte ho */}
              <img 
                src={myimg1} 
                alt="About Abhay" 
                className="img-fluid rounded shadow-lg border" 
                style={{ minHeight: '400px', objectFit: 'cover', backgroundColor: '#e9ecef', width: '100%' }}
              />
            </div>
          </div>

          {/* Right Column: Bio and Details */}
          <div className="col-lg-7 px-lg-5">
            <h3 className="fw-bold mb-3 text-dark">I'm Abhay Mishra, a Full Stack Web Developer.</h3>
            
            <p className="text-muted" style={{ lineHeight: '1.8' }}>
              I am currently a 3rd-year BTech student in Computer Science and Engineering, based in Lucknow. I am deeply passionate about building scalable, user-centric web applications and constantly exploring modern development technologies.
            </p>
            
            <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
              My focus lies in bridging the gap between clean, intuitive front-end designs and robust, modular back-end architectures. Whether it is crafting responsive layouts or managing databases, I love turning complex problems into elegant digital solutions.
            </p>
            
            {/* Quick Details List */}
            <div className="row mb-4">
              <div className="col-sm-6">
                <ul className="list-unstyled text-muted">
                  <li className="mb-3"><strong className="text-dark me-2">Degree:</strong> BTech CSE (2nd Year)</li>
                  <li className="mb-3"><strong className="text-dark me-2">City:</strong> Lucknow, UP</li>
                </ul>
              </div>
              <div className="col-sm-6">
                <ul className="list-unstyled text-muted">
                  <li className="mb-3"><strong className="text-dark me-2">Email:</strong> <a href="mailto:Abhilko0374@gmail.com" className="text-decoration-none text-muted">Abhilko0374@gmail.com</a></li>
                  <li className="mb-3"><strong className="text-dark me-2">Freelance:</strong> Available</li>
                </ul>
              </div>
            </div>

            <a href="#contact" className="btn btn-primary px-4 py-2 mt-2">Let's Talk</a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;