import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-5" style={{ backgroundColor: '#ffffff' }}>
      <div className="container py-5">
        
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-2">Get In Touch</h2>
          <div className="mx-auto bg-primary" style={{ height: '4px', width: '60px', borderRadius: '2px' }}></div>
        </div>

        <div className="row g-5">
          
          {/* Contact Details */}
          <div className="col-lg-5">
            <h4 className="fw-bold mb-4">Contact Information</h4>
            <p className="text-muted mb-4">
              Feel free to reach out for collaborations, project inquiries, or just to say hello!
            </p>
            
            <div className="d-flex align-items-center mb-4">
              <i className="bi bi-envelope-fill text-primary fs-3 me-3"></i>
              <div>
                <h6 className="mb-0 fw-bold">Email</h6>
                <p className="text-muted mb-0">abhilko0374@gmail.com</p>
              </div>
              
            </div>


            <div className="d-flex align-items-center mb-4">
              <i className="bi bi-geo-alt-fill text-primary fs-3 me-3"></i>
              <div>
                <h6 className="mb-0 fw-bold">Contact No.</h6>
                <p className="text-muted mb-0">8176989900</p>
              </div>
            </div>


            <div className="d-flex align-items-center mb-4">
              <i className="bi bi-geo-alt-fill text-primary fs-3 me-3"></i>
              <div>
                <h6 className="mb-0 fw-bold">Location</h6>
                <p className="text-muted mb-0">Lucknow, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm p-4 rounded-4">
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted small">Name</label>
                    <input type="text" className="form-control rounded-2" placeholder="Your Name" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted small">Email</label>
                    <input type="email" className="form-control rounded-2" placeholder="Your Email" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted small">Subject</label>
                  <input type="text" className="form-control rounded-2" placeholder="Subject" />
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted small">Message</label>
                  <textarea className="form-control rounded-2" rows="4" placeholder="Your Message"></textarea>
                </div>
                <button type="button" className="btn btn-primary px-4 py-2 w-100 rounded-2">Send Message</button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;