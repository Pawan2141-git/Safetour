import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Animated gradient background */}
      <div className="gradient-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      {/* Stars background */}
      <div className="stars-container">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hero-badge"
          >
            <span className="badge-icon">🛡️</span>
            <span>AI-Powered Safety Platform</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-title"
          >
            Smart Tourist Safety
            <br />
            <span className="gradient-text">Monitoring System</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-subtitle"
          >
            Protecting travelers with AI-powered geo-fencing, real-time incident response,
            <br />and intelligent threat detection for safer journeys worldwide.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="cta-buttons"
          >
            <Link to="/login" className="btn-primary-new">
              Get Started
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/features" className="btn-secondary-new">
              View Features
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hero-stats"
          >
            <div className="stat-item">
              <div className="stat-number">10M+</div>
              <div className="stat-label">Travelers Protected</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Countries Covered</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">99.7%</div>
              <div className="stat-label">Detection Accuracy</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="features-grid"
      >
        <motion.div 
          className="feature-card-new"
          whileHover={{ y: -10, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="feature-icon-new">
            <i className="fas fa-shield-alt"></i>
          </div>
          <h3>AI Protection</h3>
          <p>Advanced AI algorithms monitor tourist safety in real-time with predictive threat detection</p>
        </motion.div>
        
        <motion.div 
          className="feature-card-new"
          whileHover={{ y: -10, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="feature-icon-new">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <h3>Geo-Fencing</h3>
          <p>Smart virtual boundaries that keep tourists in safe zones with automatic alerts</p>
        </motion.div>
        
        <motion.div 
          className="feature-card-new"
          whileHover={{ y: -10, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="feature-icon-new">
            <i className="fas fa-bell"></i>
          </div>
          <h3>Instant Alerts</h3>
          <p>Real-time notifications for potential safety risks delivered instantly to your device</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;