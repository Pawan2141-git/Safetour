import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you would normally clear the user's session/token
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Welcome to SafeTour</h2>
          <p>You are successfully logged in as a user.</p>
          <div className="dashboard-features">
            <div className="feature-item">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Location Tracking</h3>
              <p>Real-time location monitoring for your safety</p>
            </div>
            <div className="feature-item">
              <i className="fas fa-bell"></i>
              <h3>Alerts & Notifications</h3>
              <p>Instant safety alerts and notifications</p>
            </div>
            <div className="feature-item">
              <i className="fas fa-shield-alt"></i>
              <h3>Geo-Fencing</h3>
              <p>Virtual boundaries for safe zones</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;