import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CheckIn.css';

const CheckIn = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkIns, setCheckIns] = useState([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('safetour:checkins');
    if (saved) setCheckIns(JSON.parse(saved));
  }, []);

  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        () => {
          alert('Unable to get location');
          setLoading(false);
        }
      );
    }
  };

  const handleCheckIn = () => {
    if (!location) {
      alert('Please get your location first');
      return;
    }

    const newCheckIn = {
      id: Date.now(),
      lat: location.lat,
      lng: location.lng,
      note: note,
      timestamp: new Date().toLocaleString(),
      address: `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
    };

    const updated = [newCheckIn, ...checkIns];
    setCheckIns(updated);
    localStorage.setItem('safetour:checkins', JSON.stringify(updated));
    setNote('');
    alert('Check-in successful!');
  };

  return (
    <div className="checkin-container">
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>

      <div className="checkin-hero">
        <h1>📍 Check-In</h1>
        <p>Share your location with friends and family</p>
      </div>

      <div className="checkin-content">
        <motion.div className="checkin-card" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
          <h2>Current Location</h2>
          
          <button onClick={getCurrentLocation} className="location-btn" disabled={loading}>
            {loading ? '🔄 Getting Location...' : '📍 Get My Location'}
          </button>

          {location && (
            <div className="location-info">
              <p>✅ Location captured</p>
              <p className="coords">Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}</p>
            </div>
          )}

          <div className="form-group">
            <label>Add a note (optional)</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g., At the hotel, safe and sound" rows="3"></textarea>
          </div>

          <button onClick={handleCheckIn} className="checkin-btn" disabled={!location}>
            ✓ Check-In Now
          </button>
        </motion.div>

        <motion.div className="checkin-history" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}>
          <h2>Recent Check-Ins</h2>
          {checkIns.length === 0 ? (
            <p className="empty">No check-ins yet</p>
          ) : (
            <div className="checkin-list">
              {checkIns.map((c) => (
                <div key={c.id} className="checkin-item">
                  <div className="checkin-icon">📍</div>
                  <div className="checkin-details">
                    <div className="checkin-time">{c.timestamp}</div>
                    <div className="checkin-address">{c.address}</div>
                    {c.note && <div className="checkin-note">{c.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CheckIn;
