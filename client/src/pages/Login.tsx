import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import api from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const isMobile = window.innerWidth < 768;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignup) {
        await api.signup(form);
      } else {
        await api.login(form.email, form.password);
      }
      navigate('/');
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #ffffff 100%)',
      }}
    >
      {/* Left Side - Branding */}
      <div
        style={{
          flex: isMobile ? 'none' : 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #166534 0%, #15803d 50%, #16a34a 100%)',
          padding: isMobile ? '40px 24px' : '60px',
          color: '#ffffff',
          minHeight: isMobile ? 'auto' : '100vh',
        }}
      >
        <div
          style={{
            width: isMobile ? '60px' : '80px',
            height: isMobile ? '60px' : '80px',
            background: '#ffffff',
            borderRadius: isMobile ? '16px' : '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <img
            src="/lasu-logo.png"
            alt="AICustomerSupport logo"
            style={{
              width: isMobile ? '60px' : '80px',
              height: isMobile ? '60px' : '80px',
              borderRadius: isMobile ? '16px' : '20px',
              objectFit: 'contain',
              background: '#ffffff',
              marginBottom: '24px',
            }}
          />
        </div>
        <h1 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 800, margin: 0, letterSpacing: '-1px' }}>
          AICustomerSupport
        </h1>
        <p style={{ fontSize: isMobile ? '14px' : '18px', opacity: 0.85, marginTop: '8px' }}>
          Intelligent Customer Support
        </p>
        {!isMobile && (
          <div style={{ marginTop: '40px', textAlign: 'center', maxWidth: '320px' }}>
            <p style={{ fontSize: '15px', opacity: 0.9, lineHeight: '1.7' }}>
              AI-powered multilingual chatbot for seamless customer support across 10+ languages.
            </p>
          </div>
        )}
        <div
          style={{
            display: 'flex',
            gap: isMobile ? '24px' : '32px',
            marginTop: isMobile ? '24px' : '48px',
          }}
        >
          {[
            { label: '10+', desc: 'Languages' },
            { label: '94%', desc: 'Satisfaction' },
            { label: '24/7', desc: 'Support' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 700, margin: 0 }}>{stat.label}</p>
              <p style={{ fontSize: '12px', opacity: 0.7, margin: '4px 0 0' }}>{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Form */}
      <div
        style={{
          flex: isMobile ? 'none' : 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '32px 24px' : '60px',
          background: '#ffffff',
        }}
      >
        <div style={{ width: '100%', maxWidth: '360px' }}>
          <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: 700, color: '#1f2937', margin: '0 0 8px' }}>
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '32px' }}>
            {isSignup ? 'Sign up to get started' : 'Sign in to your account'}
          </p>

          {error && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                fontSize: '13px',
                marginBottom: '20px',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {isSignup && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                    First Name
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #e5e7eb',
                      background: '#f9fafb',
                    }}
                  >
                    <User size={16} color="#9ca3af" />
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      required={isSignup}
                      style={{
                        flex: 1,
                        border: 'none',
                        background: 'transparent',
                        fontSize: '14px',
                        color: '#374151',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                    Last Name
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #e5e7eb',
                      background: '#f9fafb',
                    }}
                  >
                    <User size={16} color="#9ca3af" />
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      required={isSignup}
                      style={{
                        flex: 1,
                        border: 'none',
                        background: 'transparent',
                        fontSize: '14px',
                        color: '#374151',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                Email
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #e5e7eb',
                  background: '#f9fafb',
                }}
              >
                <Mail size={16} color="#9ca3af" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    color: '#374151',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                Password
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #e5e7eb',
                  background: '#f9fafb',
                }}
              >
                <Lock size={16} color="#9ca3af" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    color: '#374151',
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={16} color="#9ca3af" /> : <Eye size={16} color="#9ca3af" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px 24px',
                borderRadius: '10px',
                border: 'none',
                background: loading ? '#9ca3af' : 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '8px',
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setError('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#6b7280',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>

          {!isSignup && (
            <div
              style={{
                marginTop: '32px',
                padding: '16px',
                borderRadius: '10px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
              }}
            >
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#166534', margin: '0 0 8px' }}>
                Demo Credentials:
              </p>
              <p style={{ fontSize: '12px', color: '#15803d', margin: 0 }}>
                Email: admin@aicustomersupport.com
              </p>
              <p style={{ fontSize: '12px', color: '#15803d', margin: '2px 0 0' }}>
                Password: admin123
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
