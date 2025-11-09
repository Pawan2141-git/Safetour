import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Shield, MapPin, Bell, Radio, Phone, Mail, Users, TrendingUp } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      {/* Animated Navbar */}
      <motion.nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-container">
          <div className="nav-logo">SafeTour</div>
          <div className="nav-links">
            <a onClick={() => scrollToSection('hero')}>Home</a>
            <a onClick={() => scrollToSection('about')}>About</a>
            <a onClick={() => scrollToSection('features')}>Features</a>
            <a onClick={() => scrollToSection('insights')}>Insights</a>
            <a onClick={() => scrollToSection('contact')}>Contact</a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Shader Background */}
      <section id="hero" className="hero-section">
        <div className="shader-bg"></div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            AI-Powered Safety for Smarter Tourism
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Monitor, Protect & Respond — Anywhere You Travel
          </motion.p>
          <motion.button 
            className="cta-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <motion.div 
          className="section-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About SafeTour</h2>
          <p className="section-desc">
            SafeTour is an intelligent tourist safety monitoring system that leverages AI and geo-fencing 
            technology to ensure traveler security in real-time.
          </p>
          <div className="about-grid">
            {[
              { icon: Shield, title: 'Secure', desc: 'End-to-end encrypted protection' },
              { icon: Radio, title: 'Real-Time', desc: 'Instant monitoring & alerts' },
              { icon: Users, title: 'Community', desc: 'Connected safety network' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="about-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <item.icon className="about-icon" />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <motion.div 
          className="section-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Key Features</h2>
          <div className="features-grid">
            {[
              { icon: Bell, title: 'AI Alerts', desc: 'Smart notifications for potential threats and safety concerns' },
              { icon: MapPin, title: 'Geo-Fencing', desc: 'Virtual boundaries with automatic zone monitoring' },
              { icon: Radio, title: 'Real-Time Tracking', desc: 'Live location tracking for tourists and guides' },
              { icon: Phone, title: 'Emergency Help', desc: 'One-tap SOS with instant response coordination' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                className="feature-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <div className="feature-icon-wrapper">
                  <feature.icon className="feature-icon" />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Tour Insights Section */}
      <section id="insights" className="insights-section">
        <motion.div 
          className="section-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Tour Insights</h2>
          <div className="insights-grid">
            {[
              { value: '50K+', label: 'Active Users', icon: Users },
              { value: '99.9%', label: 'Uptime', icon: TrendingUp },
              { value: '24/7', label: 'Monitoring', icon: Radio },
              { value: '<2min', label: 'Response Time', icon: Phone }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                className="insight-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <stat.icon className="insight-icon" />
                <div className="insight-value">{stat.value}</div>
                <div className="insight-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <motion.div 
          className="section-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Request a Demo</h2>
          <motion.form 
            className="contact-form"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Organization" />
            </div>
            <div className="form-group">
              <textarea placeholder="Message" rows="4"></textarea>
            </div>
            <motion.button 
              type="submit" 
              className="submit-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Request
            </motion.button>
          </motion.form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 SafeTour. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
