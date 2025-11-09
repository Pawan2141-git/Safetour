import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    const animate = () => {
      time += 0.01;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      
      for (let y = 0; y < canvas.height; y += 4) {
        for (let x = 0; x < canvas.width; x += 4) {
          const i = (y * canvas.width + x) * 4;
          const wave = Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 + time);
          imageData.data[i] = 20 + wave * 30;
          imageData.data[i + 1] = 100 + wave * 50;
          imageData.data[i + 2] = 200 + wave * 55;
          imageData.data[i + 3] = 255;
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(animate);
    };
    
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="landing-page">
      <canvas ref={canvasRef} className="shader-canvas" />
      
      {/* Hero Section */}
      <section className="hero-section-landing">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-content-landing"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hero-title-landing"
          >
            SafeTour
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hero-tagline"
          >
            AI-Powered Safety for Smarter Tourism
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hero-subtext"
          >
            Monitor, Protect & Respond — Anywhere You Travel
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Link to="/login" className="cta-button">
              Get Started
              <span className="arrow">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="about-section-landing">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-container"
        >
          <h2 className="section-title">About SafeTour</h2>
          <p className="section-description">
            SafeTour is a cutting-edge tourist safety monitoring system that leverages AI and geo-fencing technology to ensure travelers stay safe wherever they go.
          </p>
          <div className="about-grid">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="about-card"
            >
              <div className="icon-box">🛡️</div>
              <h3>AI-Powered</h3>
              <p>Advanced algorithms detect threats in real-time</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="about-card"
            >
              <div className="icon-box">🌍</div>
              <h3>Global Coverage</h3>
              <p>Protection across 50+ countries worldwide</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="about-card"
            >
              <div className="icon-box">⚡</div>
              <h3>Instant Response</h3>
              <p>Emergency alerts within seconds</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section-landing">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-container"
        >
          <h2 className="section-title">Key Features</h2>
          <div className="features-grid">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="feature-card-landing"
            >
              <div className="feature-icon">🚨</div>
              <h3>AI Alerts</h3>
              <p>Smart notifications for potential dangers and suspicious activities in your area</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="feature-card-landing"
            >
              <div className="feature-icon">📍</div>
              <h3>Geo-Fencing</h3>
              <p>Virtual boundaries that keep you within safe zones with automatic alerts</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="feature-card-landing"
            >
              <div className="feature-icon">🗺️</div>
              <h3>Real-Time Tracking</h3>
              <p>Live location monitoring with route history and safety checkpoints</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="feature-card-landing"
            >
              <div className="feature-icon">🆘</div>
              <h3>Emergency Help</h3>
              <p>One-tap SOS button connects you instantly to local emergency services</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Tour Insights Section */}
      <section className="insights-section-landing">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-container"
        >
          <h2 className="section-title">Tour Insights</h2>
          <div className="insights-grid">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="insight-card"
            >
              <div className="insight-number">10M+</div>
              <div className="insight-label">Travelers Protected</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="insight-card"
            >
              <div className="insight-number">50+</div>
              <div className="insight-label">Countries Covered</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="insight-card"
            >
              <div className="insight-number">99.7%</div>
              <div className="insight-label">Detection Accuracy</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="insight-card"
            >
              <div className="insight-number">24/7</div>
              <div className="insight-label">Monitoring</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="contact-section-landing">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-container"
        >
          <h2 className="section-title">Request a Demo</h2>
          <motion.form
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="contact-form-landing"
          >
            <div className="form-group-landing">
              <input type="text" placeholder="Your Name" className="form-input-landing" />
            </div>
            <div className="form-group-landing">
              <input type="email" placeholder="Your Email" className="form-input-landing" />
            </div>
            <div className="form-group-landing">
              <input type="text" placeholder="Organization" className="form-input-landing" />
            </div>
            <div className="form-group-landing">
              <textarea placeholder="Message" rows="4" className="form-input-landing"></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="submit-button"
            >
              Request Demo
            </motion.button>
          </motion.form>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
