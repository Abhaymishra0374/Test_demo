import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLogin from './AdminLogin';

const contactInfo = [
  { icon: 'bi-envelope-fill',  label: 'Email',    value: 'abhilko0374@gmail.com' },
  { icon: 'bi-telephone-fill', label: 'Phone',    value: '8176989900' },
  { icon: 'bi-geo-alt-fill',   label: 'Location', value: 'Lucknow, Uttar Pradesh, India' },
];

const Contact = () => {
  const { isAdmin, logout } = useAuth();

  // Secret click counter to open admin login (click "©" 5 times)
  const [clickCount, setClickCount] = useState(0);
  const [loginOpen,  setLoginOpen]  = useState(false);

  function handleCopyClick() {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 5) {
      setClickCount(0);
      setLoginOpen(true);
    }
    // Reset counter after 3 seconds of inactivity
    setTimeout(() => setClickCount(c => (c > 0 ? c - 1 : 0)), 3000);
  }

  return (
    <>
      <section id="contact" className="contact-section">
        <div className="contact-inner">

          {/* Left: Info */}
          <div className="anim-fadel">
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title">Let's Work Together</h2>
            <div className="section-divider"></div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '8px' }}>
              Feel free to reach out for collaborations, project inquiries,
              or just to say hello! I'm always open to discussing new projects
              and creative ideas.
            </p>

            <div className="contact-info-list">
              {contactInfo.map((item, i) => (
                <div className="contact-info-item" key={i}>
                  <div className="contact-info-icon">
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <div className="contact-info-text">
                    <div className="lbl">{item.label}</div>
                    <div className="val">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-card anim-fadeup delay-2">
            <h3 style={{ color: 'var(--white)', fontWeight: 700, marginBottom: '28px', fontSize: '1.25rem' }}>
              Send Me a Message
            </h3>
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" type="text" className="form-input" placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" type="email" className="form-input" placeholder="Your Email" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>
                <input id="contact-subject" type="text" className="form-input" placeholder="Project Inquiry / Collaboration" />
              </div>
              <div className="form-group">
                <label htmlFor="contact-msg">Message</label>
                <textarea id="contact-msg" className="form-textarea" placeholder="Tell me about your project..."></textarea>
              </div>
              <button type="button" className="btn-accent" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                <i className="bi bi-send-fill"></i> Send Message
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer-band">
        <p className="footer-copy">
          {/* Hidden admin trigger — click "©" 5 times quickly */}
          <span
            onClick={handleCopyClick}
            title={isAdmin ? 'Admin active — click to manage' : ''}
            style={{
              cursor: 'default',
              userSelect: 'none',
              color: isAdmin ? 'var(--accent)' : 'inherit',
              position: 'relative',
            }}
          >©</span>
          {' '}2024 <span>Abhay Mishra</span>. Crafted with passion.

          {/* Admin status indicator (subtle) */}
          {isAdmin && (
            <span
              onClick={() => setLoginOpen(true)}
              style={{
                marginLeft: '12px', fontSize: '0.7rem', fontWeight: 700,
                background: 'rgba(200,245,61,0.15)', color: 'var(--accent)',
                border: '1px solid rgba(200,245,61,0.3)',
                padding: '3px 10px', borderRadius: '999px',
                cursor: 'pointer', letterSpacing: '1px', textTransform: 'uppercase',
              }}
              title="Click to manage admin session"
            >
              <i className="bi bi-shield-lock-fill me-1" style={{ fontSize: '0.65rem' }}></i>
              Admin
            </span>
          )}
        </p>

        <div className="footer-socials">
          <a href="https://github.com/Abhaymishra0374" target="_blank" rel="noreferrer" className="footer-social" aria-label="GitHub">
            <i className="bi bi-github"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social" aria-label="LinkedIn">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="mailto:abhilko0374@gmail.com" className="footer-social" aria-label="Email">
            <i className="bi bi-envelope-fill"></i>
          </a>
        </div>
      </footer>

      {/* Admin Login Modal */}
      {loginOpen && <AdminLogin onClose={() => setLoginOpen(false)} />}
    </>
  );
};

export default Contact;