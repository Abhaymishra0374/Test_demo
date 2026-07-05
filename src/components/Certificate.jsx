import React from 'react';
import img2 from '../assets/Byte Battle.png'
const Certificates = () => {
  return (
    <section id="certificates" className="py-5" style={{ backgroundColor: '#ffffff' }}>
      <div className="container py-5">
        
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-2">Certificates & Awards</h2>
          <div className="mx-auto bg-primary" style={{ height: '4px', width: '60px', borderRadius: '2px' }}></div>
        </div>

        <div className="row g-4">
          
          {/* Certificate 1: Kho Kho Zonals */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              <img 
                src="" 
                alt="Zonals Kho Kho" 
                className="card-img-top" 
                style={{ height: '220px', objectFit: 'cover', backgroundColor: '#e9ecef' }} 
              />
              <div className="card-body p-4">
                <h5 className="fw-bold text-dark mb-2">Zonal Participation</h5>
                <p className="text-muted small mb-0">Kho Kho Zonals Participation</p>
              </div>
            </div>
          </div>

          {/* Certificate 2: DAV Gold Medal */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              <img 
                src="" 
                alt="DAV Gold Medal" 
                className="card-img-top" 
                style={{ height: '220px', objectFit: 'cover', backgroundColor: '#e9ecef' }} 
              />
              <div className="card-body p-4">
                <h5 className="fw-bold text-dark mb-2">Gold Medal</h5>
                <p className="text-muted small mb-0">DAV College Sports Fest - Kho Kho</p>
              </div>
            </div>
          </div>

          {/* Certificate 3: Byte Battle */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              <img 
                src={img2}
                alt="Byte Battle" 
                className="card-img-top" 
                style={{ height: '220px', objectFit: 'cover', backgroundColor: '#e9ecef' }} 
              />
              <div className="card-body p-4">
                <h5 className="fw-bold text-dark mb-2">BYTE Battle</h5>
                <p className="text-muted small mb-0">Certificate of Participation</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Certificates;