import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'user' // default to user
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { name, email, password, confirmPassword, userType } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  try {
    const resp = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData) // ensure contains name,email,password,phone
    });
    const data = await resp.json();
    if (!resp.ok) {
      setError(data.message || 'Registration failed');
      setLoading(false);
      return;
    }
    localStorage.setItem('safetour:token', data.token);
    localStorage.setItem('safetour:user', JSON.stringify(data.user));
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
          <h2>Create Account</h2>
          <p>Sign up for a SafeTour account</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="userType">Register As</label>
            <select
              name="userType"
              value={userType}
              onChange={onChange}
              className="form-control"
            >
              <option value="user">User</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="form-control"
              placeholder="Enter your full name"
              required
            />
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
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              className="form-control"
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="form-group">
            <label className="checkbox-container">
              <input type="checkbox" required />
              <span className="checkmark"></span>
              I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary auth-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;