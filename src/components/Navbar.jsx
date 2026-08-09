import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#home',         label: 'Home' },
    { href: '#about',        label: 'About' },
    { href: '#skills',       label: 'Skills' },
    { href: '#projects',     label: 'Projects' },
    { href: '#certificates', label: 'Certificates' },
    { href: '#contact',      label: 'Contact' },
  ];

  return (
    <nav
      className="navbar-dark-custom"
      style={{ boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none' }}
    >
      <a className="navbar-logo" href="#home">
        AM<span>.</span>
      </a>

      {/* Desktop links */}
      <ul className="navbar-links" id="nav-links">
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          </li>
        ))}
      </ul>

      <a href="#contact" className="btn-accent navbar-hire" style={{ textDecoration: 'none' }}>
        Hire Me
      </a>

      {/* Hamburger */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'var(--surface)', borderBottom: '1px solid var(--border)',
          zIndex: 999,
        }}>
          {links.map(l => (
            <a
              key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '14px 5%',
                color: 'var(--text-muted)', textDecoration: 'none',
                fontSize: '0.9rem', fontWeight: 500, letterSpacing: '1px',
                textTransform: 'uppercase', borderBottom: '1px solid var(--border)',
                transition: 'color 0.2s',
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;