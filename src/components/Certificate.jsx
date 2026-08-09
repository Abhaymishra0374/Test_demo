import React from 'react';
import imgByteBattle from '../assets/Byte Battle.png';

const certs = [
  {
    title: 'Zonal Participation',
    sub:   'Kho Kho Zonals — University Level',
    img:   null,
    icon:  'bi-trophy-fill',
  },
  {
    title: 'Gold Medal',
    sub:   'DAV College Sports Fest — Kho Kho',
    img:   null,
    icon:  'bi-award-fill',
  },
  {
    title: 'BYTE Battle',
    sub:   'Certificate of Participation — Coding Contest',
    img:   imgByteBattle,
    icon:  'bi-patch-check-fill',
  },
];

const Certificates = () => {
  return (
    <section id="certificates" className="certs-section">
      <div className="certs-inner">

        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="section-label">Achievements</span>
          <h2 className="section-title">Certificates &amp; Awards</h2>
          <div className="section-divider center"></div>
        </div>

        <div className="certs-grid">
          {certs.map((c, i) => (
            <div
              className="cert-card anim-fadeup"
              key={i}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="cert-img-wrap">
                {c.img
                  ? <img src={c.img} alt={c.title} />
                  : (
                    <div className="cert-img-placeholder">
                      <i className={`bi ${c.icon}`} style={{ color: 'var(--accent)', fontSize: '3rem' }}></i>
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        Achievement
                      </span>
                    </div>
                  )
                }
              </div>
              <div className="cert-body">
                <div className="cert-icon">
                  <i className={`bi ${c.icon}`}></i>
                </div>
                <h3 className="cert-title">{c.title}</h3>
                <p className="cert-sub">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certificates;