import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="about-header"
      >
        <h1>About SafeTour</h1>
        <p>Revolutionizing tourist safety with smart technology</p>
      </motion.div>

      <div className="about-content">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="about-text"
        >
          <h2>Our Mission</h2>
          <p>
            SafeTour was founded with a single purpose: to make travel safer for everyone. 
            We believe that everyone deserves to explore the world without compromising their safety.
          </p>
          <p>
            Our team of experts in AI, geospatial technology, and tourism safety have developed 
            a revolutionary system that proactively protects tourists while respecting their 
            privacy and freedom.
          </p>
          
          <h2>How It Works</h2>
          <p>
            Using advanced AI algorithms and geo-fencing technology, SafeTour creates a protective 
            digital layer around tourists. Our system monitors environmental factors, crowd density, 
            weather conditions, and known safety risks to provide real-time protection.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="about-stats"
        >
          <div className="stat-card">
            <h3>99.7%</h3>
            <p>Detection Accuracy</p>
          </div>
          <div className="stat-card">
            <h3>24/7</h3>
            <p>Monitoring Coverage</p>
          </div>
          <div className="stat-card">
            <h3>50+</h3>
            <p>Countries Protected</p>
          </div>
          <div className="stat-card">
            <h3>10M+</h3>
            <p>Travelers Served</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="team-section"
      >
        <h2>Our Leadership Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">
              <i className="fas fa-user"></i>
            </div>
            <h3>Alex Johnson</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <div className="member-avatar">
              <i className="fas fa-user"></i>
            </div>
            <h3>Sarah Chen</h3>
            <p>CTO</p>
          </div>
          <div className="team-member">
            <div className="member-avatar">
              <i className="fas fa-user"></i>
            </div>
            <h3>Michael Rodriguez</h3>
            <p>Head of Security</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;