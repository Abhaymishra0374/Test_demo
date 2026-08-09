import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * AdminLogin — Hidden modal triggered by the parent.
 * Activate by clicking the footer "©" text 5 times.
 */
export default function AdminLogin({ onClose }) {
  const { login, logout, isAdmin, username } = useAuth();

  const [form,    setForm]    = useState({ username: '', password: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.username, form.password);
      setSuccess(true);
      setTimeout(onClose, 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    logout();
    onClose();
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '40px 36px',
        width: '100%', maxWidth: '400px',
        boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
        animation: 'fadeInUp 0.3s ease both',
        position: 'relative',
      }}>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            width: '34px', height: '34px', borderRadius: '50%',
            border: '1px solid var(--border)', background: 'transparent',
            color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <i className="bi bi-x-lg"></i>
        </button>

        {/* Icon */}
        <div style={{
          width: '56px', height: '56px', borderRadius: '14px',
          background: 'rgba(200,245,61,0.1)',
          border: '1px solid rgba(200,245,61,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '24px',
        }}>
          <i className="bi bi-shield-lock-fill"></i>
        </div>

        {/* Already logged in view */}
        {isAdmin ? (
          <>
            <h3 style={{ color: 'var(--white)', fontWeight: 800, marginBottom: '8px' }}>
              Admin Active
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '28px' }}>
              Logged in as <span style={{ color: 'var(--accent)', fontWeight: 700 }}>@{username}</span>.
              Edit controls are now visible in the Projects section.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={onClose}
                className="btn-accent"
                style={{ flex: 1, justifyContent: 'center', padding: '12px' }}
              >
                <i className="bi bi-pencil-fill"></i> Go to Projects
              </button>
              <button
                onClick={handleLogout}
                style={{
                  flex: 1, padding: '12px', borderRadius: '8px',
                  border: '1.5px solid var(--border)', background: 'transparent',
                  color: 'var(--text-muted)', fontFamily: 'Outfit, sans-serif',
                  fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem',
                }}
              >
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            </div>
          </>
        ) : (
          /* Login form */
          <>
            <h3 style={{ color: 'var(--white)', fontWeight: 800, fontSize: '1.3rem', marginBottom: '6px' }}>
              Admin Login
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '28px' }}>
              Only authorized access — your session ends when you close the tab.
            </p>

            {success && (
              <div style={{
                padding: '12px 16px', borderRadius: '8px', marginBottom: '20px',
                background: 'rgba(200,245,61,0.1)', border: '1px solid rgba(200,245,61,0.3)',
                color: 'var(--accent)', fontSize: '0.88rem', display: 'flex', gap: '8px',
              }}>
                <i className="bi bi-check-circle-fill"></i>
                Login successful! Opening edit mode…
              </div>
            )}

            {error && (
              <div style={{
                padding: '12px 16px', borderRadius: '8px', marginBottom: '20px',
                background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)',
                color: '#f87171', fontSize: '0.88rem', display: 'flex', gap: '8px',
              }}>
                <i className="bi bi-exclamation-triangle-fill"></i> {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Username</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="admin username"
                  autoComplete="username"
                  value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                  disabled={loading}
                  required
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  disabled={loading}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-accent"
                style={{
                  width: '100%', justifyContent: 'center',
                  padding: '14px', fontSize: '0.95rem',
                  opacity: loading ? 0.7 : 1,
                }}
                disabled={loading}
              >
                {loading
                  ? <><i className="bi bi-arrow-repeat" style={{ animation: 'spin 1s linear infinite' }}></i> Verifying…</>
                  : <><i className="bi bi-shield-lock-fill"></i> Login as Admin</>
                }
              </button>
            </form>

            <p style={{ color: 'var(--text-dim)', fontSize: '0.72rem', textAlign: 'center', marginTop: '20px' }}>
              🔒 Session expires when tab is closed
            </p>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.72rem', fontWeight: 700,
  letterSpacing: '1.5px', textTransform: 'uppercase',
  color: 'var(--text-muted)', marginBottom: '8px',
};
