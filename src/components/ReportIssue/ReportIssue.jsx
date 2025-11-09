import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './ReportIssue.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position ? <Marker position={position} /> : null;
};

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    incidentType: '',
    description: '',
    location: '',
  });
  const [position, setPosition] = useState([20.5937, 78.9629]);
  const [photo, setPhoto] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setFormData({ name: '', email: '', incidentType: '', description: '', location: '' });
      setPhoto(null);
      setPosition([20.5937, 78.9629]);
    }, 3000);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="report-container">
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="report-wrapper"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="report-header"
        >
          <span className="header-icon">⚠️</span>
          <h1 className="header-title">Report Safety Issue</h1>
          <p className="header-subtitle">Help us keep travelers safe by reporting incidents</p>
        </motion.div>

        <div className="features-grid">
          <div className="feature-card-new">
            <div className="feature-icon-new">🚨</div>
            <h3>Quick Response</h3>
            <p>Immediate alert to authorities and emergency services</p>
          </div>
          <div className="feature-card-new">
            <div className="feature-icon-new">📸</div>
            <h3>Photo Evidence</h3>
            <p>Upload photos to support your incident report</p>
          </div>
          <div className="feature-card-new">
            <div className="feature-icon-new">📍</div>
            <h3>Location Tracking</h3>
            <p>Precise location marking for faster assistance</p>
          </div>
        </div>

        <div className="report-content">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="report-form"
          >
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Incident Type</label>
              <select
                required
                value={formData.incidentType}
                onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
                className="form-select"
              >
                <option value="">Select incident type</option>
                <option value="theft">🚨 Theft</option>
                <option value="medical">🏥 Medical Emergency</option>
                <option value="harassment">⚠️ Harassment</option>
                <option value="accident">🚗 Accident</option>
                <option value="suspicious">👁️ Suspicious Activity</option>
                <option value="other">📋 Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Location Details</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="form-input"
                placeholder="Street address or landmark"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-textarea"
                placeholder="Describe the incident in detail..."
                rows="4"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Upload Photo (Optional)</label>
              <div className="upload-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="upload-input"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="upload-label">
                  <span className="upload-icon">📤</span>
                  <span>{photo ? 'Photo Selected' : 'Choose Photo'}</span>
                </label>
                {photo && (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={photo}
                    alt="Preview"
                    className="photo-preview"
                  />
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="submit-btn"
            >
              <span className="btn-icon">📨</span>
              Submit Report
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="map-section"
          >
            <div className="map-header">
              <span className="map-icon">📍</span>
              <h3 className="map-title">Mark Location on Map</h3>
            </div>
            <div className="map-container">
              <MapContainer center={position} zoom={5} className="leaflet-map">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker position={position} setPosition={setPosition} />
              </MapContainer>
            </div>
            <p className="map-hint">Click on the map to mark the incident location</p>
          </motion.div>
        </div>
      </motion.div>

      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="toast"
        >
          <span className="toast-icon">✅</span>
          <div>
            <p className="toast-title">Report Submitted!</p>
            <p className="toast-message">We'll review your report shortly</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ReportIssue;
