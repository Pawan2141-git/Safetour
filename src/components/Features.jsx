import React from 'react';
import { motion } from 'framer-motion';
import './Features.css';

const Features = () => {
  const features = [
    {
      id: 1,
      title: "AI-Powered Monitoring",
      description: "Advanced artificial intelligence continuously monitors tourist locations and behaviors to detect potential safety risks.",
      icon: "fas fa-brain"
    },
    {
      id: 2,
      title: "Geo-Fencing Technology",
      description: "Virtual boundaries that alert tourists and authorities when approaching restricted or dangerous areas.",
      icon: "fas fa-draw-polygon"
    },
    {
      id: 3,
      title: "Real-Time Incident Response",
      description: "Immediate alerts and response protocols when safety incidents are detected.",
      icon: "fas fa-bolt"
    },
    {
      id: 4,
      title: "Emergency SOS System",
      description: "One-touch emergency alerts that instantly connect tourists with local authorities.",
      icon: "fas fa-exclamation-triangle"
    },
    {
      id: 5,
      title: "Location Tracking",
      description: "Precise location monitoring with privacy controls and opt-out options.",
      icon: "fas fa-location-arrow"
    },
    {
      id: 6,
      title: "Multilingual Support",
      description: "Safety alerts and assistance available in multiple languages for international tourists.",
      icon: "fas fa-language"
    }
  ];

  return (
    <div className="features-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="features-header"
      >
        <h1>Advanced Safety Features</h1>
        <p>Our cutting-edge technology ensures tourist safety like never before</p>
      </motion.div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="feature-card"
          >
            <div className="feature-icon">
              <i className={feature.icon}></i>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="tech-specs"
      >
        <h2>Technical Specifications</h2>
        <div className="specs-grid">
          <div className="spec-item">
            <h4>Response Time</h4>
            <p>Under 2 seconds</p>
          </div>
          <div className="spec-item">
            <h4>Accuracy</h4>
            <p>Within 2 meters</p>
          </div>
          <div className="spec-item">
            <h4>Coverage</h4>
            <p>Global GPS support</p>
          </div>
          <div className="spec-item">
            <h4>Battery Life</h4>
            <p>7+ days standby</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Features;