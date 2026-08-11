import React from 'react';
import myimg from '../assets/Abhay Passport pic.png';

const stats = [
  { number: '2', suffix: '+', label: 'Years Coding' },
  { number: '5', suffix: '+', label: 'Projects Built' },
  { number: '3', suffix: '+', label: 'Tech Stacks' },
  { number: '1', suffix: '',  label: 'Award Won' },
];

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      {/* Background glows */}
      <div className="hero-bg-glow"></div>
      <div className="hero-bg-glow-2"></div>

      <div className="hero-inner">

        {/* ── Left: Text ── */}
        <div>
          <p className="hero-greeting anim-fadeup">Hello, I'm</p>

          <h1 className="hero-name anim-fadeup delay-1">
            Abhay<br />Mishra
          </h1>

          <p className="hero-role anim-fadeup delay-2">
            Full Stack Web Developer
          </p>

          <p className="hero-desc anim-fadeup delay-3">
            I design and develop modern, scalable and user-friendly web
            applications using the latest web technologies — bridging clean
            front-end designs with robust back-end architectures.
          </p>

          <div className="hero-cta anim-fadeup delay-4">
            <a href="#contact" className="btn-accent" style={{ textDecoration: 'none' }}>
              <i className="bi bi-send-fill"></i> Hire Me
            </a>
            <a href="/Abhay CV.png" target="_blank" rel="noreferrer" className="btn-outline" style={{ textDecoration: 'none' }}>
              <i className="bi bi-download"></i> Download CV
            </a>
          </div>

          {/* Stats bar */}
          <div className="hero-stats anim-fadeup delay-5">
            {stats.map((s, i) => (
              <div className="hero-stat" key={i}>
                <div className="hero-stat-number">
                  {s.number}
                  <span>{s.suffix}</span>
                </div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Image ── */}
        <div className="hero-image-wrap anim-fadel delay-2">
          <div className="hero-image-bg"></div>
          <div className="hero-img-frame">
            <img src={myimg} alt="Abhay Mishra — Full Stack Developer" />
          </div>
          <div className="hero-badge">
            <i className="bi bi-circle-fill" style={{ fontSize: '0.5rem', verticalAlign: 'middle', marginRight: '6px', color: '#00ff88' }}></i>
            Available for Work
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;