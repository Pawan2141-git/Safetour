import React, { useState } from 'react';
import './RequestGuide.css';

const RequestGuide = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    startDate: '',
    endDate: '',
    groupSize: '1',
    language: 'English',
    specialRequests: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const resp = await fetch('http://localhost:5000/api/guides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('safetour:token') ? `Bearer ${localStorage.getItem('safetour:token')}` : '' },
      body: JSON.stringify(formData) // ensure formData has name,email,phone,destination,startDate,endDate,groupSize,language,specialRequests
    });
    const data = await resp.json();
    if (!resp.ok) { alert(data.message || 'Failed'); return; }
    alert('Guide request submitted!');
  } catch(err) {
    console.error(err);
    alert('Server error');
  }
};


  return (
    <div className="request-guide-container">
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>

      <div className="request-guide-hero">
        <h1>🗺️ Request a Tour Guide</h1>
        <p>Get a professional local guide for your next adventure</p>
      </div>

      <div className="request-guide-content">
        <div className="guide-info">
          <h2>Why Choose Our Guides?</h2>
          <div className="guide-benefits">
            <div className="benefit-card">
              <span className="benefit-icon">✅</span>
              <h3>Verified Professionals</h3>
              <p>All guides are background-checked and certified</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🌍</span>
              <h3>Local Expertise</h3>
              <p>Deep knowledge of local culture and hidden gems</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🛡️</span>
              <h3>Safety First</h3>
              <p>Trained in emergency response and first aid</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">💬</span>
              <h3>Multiple Languages</h3>
              <p>Guides available in various languages</p>
            </div>
          </div>
        </div>

        <form className="request-guide-form" onSubmit={handleSubmit}>
          <h2>Request Form</h2>
          
          <div className="form-group">
            <label>Full Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Destination *</label>
            <input type="text" name="destination" value={formData.destination} onChange={handleChange} placeholder="e.g., Jaipur, Rajasthan" required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date *</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>End Date *</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Group Size *</label>
              <select name="groupSize" value={formData.groupSize} onChange={handleChange}>
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3-5">3-5 People</option>
                <option value="6-10">6-10 People</option>
                <option value="10+">10+ People</option>
              </select>
            </div>
            <div className="form-group">
              <label>Preferred Language *</label>
              <select name="language" value={formData.language} onChange={handleChange}>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Special Requests</label>
            <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows="4" placeholder="Any specific requirements or preferences..."></textarea>
          </div>

          <button type="submit" className="submit-btn">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default RequestGuide;
