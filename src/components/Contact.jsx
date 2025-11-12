import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const resp = await fetch('http://localhost:5000/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    });
    const data = await resp.json();
    if (!resp.ok) { alert(data.message || 'Failed'); return; }
    alert('Message sent! We will contact you soon.');
  } catch (err) {
    console.error(err);
    alert('Server error');
  }
};


  return (
    <div className="contact-container">
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
        className="contact-header"
      >
        <h1>Contact Us</h1>
        <p>Have questions? We're here to help</p>
      </motion.div>

      <div className="contact-content">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="contact-info"
        >
          <h2>Get In Touch</h2>
          <p>
            We'd love to hear from you. Reach out to us for any inquiries about 
            our services, partnerships, or support.
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Location</h3>
                <p>Mumbai, India</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>info@safetour.com</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <div className="social-links">
            <a href="https://twitter.com/safetour" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://facebook.com/safetour" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
            <a href="https://linkedin.com/company/safetour" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            <a href="https://instagram.com/safetour" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="contact-form"
        >
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;