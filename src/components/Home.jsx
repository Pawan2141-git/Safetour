import React from 'react';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Animated background elements */}
      <div className="animated-background">
        <motion.div 
          className="floating-element element-1"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="floating-element element-2"
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="floating-element element-3"
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, 20, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main content */}
      <div className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-title"
          >
            Smart Tourist Safety Monitoring
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-subtitle"
          >
            Protecting travelers with AI-powered geo-fencing and real-time incident response
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="cta-buttons"
          >
            <button className="btn primary">Get Started</button>
            <button className="btn secondary">Learn More</button>
          </motion.div>
        </motion.div>
      </div>

      {/* Features section preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="features-preview"
      >
        <div className="feature-card">
          <motion.div 
            className="feature-icon"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <i className="fas fa-shield-alt"></i>
          </motion.div>
          <h3>AI Protection</h3>
          <p>Advanced AI algorithms monitor tourist safety in real-time</p>
        </div>
        <div className="feature-card">
          <motion.div 
            className="feature-icon"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <i className="fas fa-map-marker-alt"></i>
          </motion.div>
          <h3>Geo-Fencing</h3>
          <p>Virtual boundaries to keep tourists in safe zones</p>
        </div>
        <div className="feature-card">
          <motion.div 
            className="feature-icon"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <i className="fas fa-bell"></i>
          </motion.div>
          <h3>Instant Alerts</h3>
          <p>Real-time notifications for potential safety risks</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;