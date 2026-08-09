import React from 'react';
import myimg1 from '../assets/Abhay pic.png';

const details = [
  { label: 'Degree',   value: 'BTech CSE (3rd Year)' },
  { label: 'City',     value: 'Lucknow, UP' },
  { label: 'Email',    value: 'Abhilko0374@gmail.com', isEmail: true },
  { label: 'Status',   value: 'Available for Freelance' },
];

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-inner">

        {/* Left: Image */}
        <div className="about-img-wrap anim-fadel">
          <div className="about-img-frame">
            <img src={myimg1} alt="Abhay Mishra" />
          </div>
          <div className="about-exp-badge">
            <div className="num">3+</div>
            <div className="lbl">Years of<br />Passion</div>
          </div>
        </div>

        {/* Right: Text */}
        <div className="anim-fadeup">
          <span className="section-label">Get to Know Me</span>
          <h2 className="section-title">
            I'm Abhay Mishra,<br />
            <span style={{ color: 'var(--accent)' }}>Full Stack Developer</span>
          </h2>
          <div className="section-divider"></div>

          <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '16px' }}>
            I am currently a 3rd-year BTech student in Computer Science &amp; Engineering,
            based in Lucknow. I'm deeply passionate about building scalable,
            user-centric web applications and constantly exploring modern
            development technologies.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '32px' }}>
            My focus lies in bridging the gap between clean, intuitive front-end
            designs and robust, modular back-end architectures. Whether it's
            crafting responsive layouts or managing databases, I love turning
            complex problems into elegant digital solutions.
          </p>

          {/* Detail grid */}
          <div className="about-details">
            {details.map((d, i) => (
              <div className="about-detail-item" key={i}>
                <div className="lbl">{d.label}</div>
                <div className="val">
                  {d.isEmail
                    ? <a href={`mailto:${d.value}`}>{d.value}</a>
                    : d.value
                  }
                </div>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn-accent" style={{ textDecoration: 'none' }}>
            <i className="bi bi-chat-dots-fill"></i> Let's Talk
          </a>
        </div>

      </div>
    </section>
  );
};

export default About;