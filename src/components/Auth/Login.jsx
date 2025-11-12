import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'user' // default to user
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password, userType } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // inside Login.jsx: import useNavigate at top already present
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const resp = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
     });
    const data = await resp.json();
    if (!resp.ok) {
      setError(data.message || 'Login failed');
      setLoading(false);
      return;
    }
    // save token + user in localStorage for frontend usage
    localStorage.setItem('safetour:token', data.token);
    localStorage.setItem('safetour:user', JSON.stringify(data.user));
    // navigate to home or profile
    navigate('/');
  } catch (err) {
    console.error(err);
    setError('Server error');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-container">
      <div className="gradient-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      <div className="stars-container">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="star" style={{left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${2 + Math.random() * 2}s`}} />
        ))}
      </div>
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to your SafeTour account</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="userType">Login As</label>
            <select
              name="userType"
              value={userType}
              onChange={onChange}
              className="form-control"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <div className="remember-forgot">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary auth-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;