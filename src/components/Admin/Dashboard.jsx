import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaHome, FaMapMarkerAlt, FaUsers, FaBell, FaCog, FaSignOutAlt, FaBars, FaChartLine, FaCheckCircle, FaEdit, FaTrash, FaEye, FaPlus, FaSearch, FaDownload, FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa';
import './Admin.clean.css';

// Fix Leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Map resizer component
const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (map) {
        map.invalidateSize();
        map.setView(map.getCenter(), map.getZoom());
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Settings state (persisted to localStorage)
  const [settings, setSettings] = useState(() => {
    // Get dark mode from global theme setting
    const globalTheme = localStorage.getItem('theme');
    const isDarkMode = globalTheme === 'dark';
    
    try {
      const raw = localStorage.getItem('admin:settings');
      return raw
        ? { ...JSON.parse(raw), darkMode: isDarkMode }
        : { 
            maintenanceMode: false, 
            emailNotifications: true, 
            smsNotifications: false, 
            defaultTourRadius: 5, 
            admins: [{ id: 1, name: 'Admin User', email: 'admin@example.com' }],
            darkMode: isDarkMode,
            accentColor: '#3b82f6',
            soundAlerts: true,
            geoFenceSensitivity: 'medium',
            mapZoom: 12,
            mapStyle: 'street',
            aiDetection: true,
            aiSensitivity: 'medium',
            autoIncidentReport: false
          };
    } catch (e) {
      return { 
        maintenanceMode: false, 
        emailNotifications: true, 
        smsNotifications: false, 
        defaultTourRadius: 5, 
        admins: [{ id: 1, name: 'Admin User', email: 'admin@example.com' }],
        darkMode: isDarkMode,
        accentColor: '#3b82f6',
        soundAlerts: true,
        geoFenceSensitivity: 'medium',
        mapZoom: 12,
        mapStyle: 'street',
        aiDetection: true,
        aiSensitivity: 'medium',
        autoIncidentReport: false
      };
    }
  });

  const saveSettings = (patch) => {
    setSettings(prev => {
      const next = typeof patch === 'function' ? patch(prev) : { ...prev, ...patch };
      try { localStorage.setItem('admin:settings', JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };

  const addAdmin = (name, email) => {
    if (!name || !email) return;
    saveSettings(prev => ({ ...prev, admins: [...prev.admins, { id: Date.now(), name, email }] }));
  };

  const removeAdmin = (id) => saveSettings(prev => ({ ...prev, admins: prev.admins.filter(a => a.id !== id) }));

  // Inline component for adding an admin (keeps everything in this file)
  const AddAdminInline = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    return (
      <div style={{display:'flex',gap:8,marginTop:6}}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" style={{flex:1,padding:6}} />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{flex:1,padding:6}} />
        <button onClick={()=>{ if(name && email){ onAdd(name,email); setName(''); setEmail(''); } }} style={{padding:'6px 10px',borderRadius:6,background:'#0366d6',color:'#fff',border:'none'}}>Add</button>
      </div>
    );
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    // TODO: hook real logout logic here
    console.log('logout');
  };

  // Tour management state
  const [tours, setTours] = useState([
    { id: 1, touristName: 'Raj Kumar', destination: 'Mumbai, India', startDate: '2024-01-15', endDate: '2024-01-22', geoFence: 5, status: 'safe', contact: '+919876543210' },
    { id: 2, touristName: 'Priya Sharma', destination: 'Jaipur, India', startDate: '2024-01-18', endDate: '2024-01-25', geoFence: 8, status: 'caution', contact: '+919876543211' },
    { id: 3, touristName: 'Amit Patel', destination: 'Goa, India', startDate: '2024-01-20', endDate: '2024-01-27', geoFence: 10, status: 'safe', contact: '+919876543212' },
    { id: 4, touristName: 'Neha Singh', destination: 'Bangalore, India', startDate: '2024-01-12', endDate: '2024-01-19', geoFence: 6, status: 'danger', contact: '+919876543213' },
    { id: 5, touristName: 'Vikram Reddy', destination: 'Kerala, India', startDate: '2024-01-22', endDate: '2024-01-30', geoFence: 7, status: 'safe', contact: '+919876543214' },
  ]);
  const [incidents, setIncidents] = useState([
    { id: 1, touristName: 'Neha Singh', location: 'MG Road, Bangalore', time: '10 mins ago', type: 'Geo-fence Breach', status: 'Pending' },
    { id: 2, touristName: 'Priya Sharma', location: 'Hawa Mahal, Jaipur', time: '2 hours ago', type: 'Medical Alert', status: 'Resolved' },
    { id: 3, touristName: 'Raj Kumar', location: 'Gateway of India, Mumbai', time: '1 day ago', type: 'Theft Report', status: 'Resolved' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTour, setEditingTour] = useState(null);

  // Alerts management state
  const [alerts, setAlerts] = useState([
    { id: 1, user: 'John Doe', location: 'Central Park, NY', coords: '40.7829°N, 73.9654°W', time: '2 mins ago', type: 'Geo-Fence Breach', severity: 'high', status: 'Active', description: 'User left designated safe zone' },
    { id: 2, user: 'Jane Smith', location: 'Times Square, NY', coords: '40.7580°N, 73.9855°W', time: '15 mins ago', type: 'SOS Alert', severity: 'critical', status: 'Resolved', description: 'Emergency button pressed' },
    { id: 3, user: 'David Brown', location: 'Westminster, London', coords: '51.4994°N, 0.1270°W', time: '1 hour ago', type: 'Suspicious Activity', severity: 'medium', status: 'Active', description: 'AI detected unusual movement pattern' },
    { id: 4, user: 'Bob Smith', location: 'Shibuya, Tokyo', coords: '35.6595°N, 139.7004°E', time: '3 hours ago', type: 'Medical Emergency', severity: 'critical', status: 'Active', description: 'Health monitoring alert triggered' },
    { id: 5, user: 'Alice Johnson', location: 'Eiffel Tower, Paris', coords: '48.8584°N, 2.2945°E', time: '1 day ago', type: 'Theft Report', severity: 'medium', status: 'Resolved', description: 'User reported stolen belongings' },
  ]);
  const [alertSearchTerm, setAlertSearchTerm] = useState('');
  const [alertFilterType, setAlertFilterType] = useState('all');
  const [alertFilterStatus, setAlertFilterStatus] = useState('all');
  const [viewingAlert, setViewingAlert] = useState(null);

  const alertStats = {
    totalAlerts: alerts.length,
    activeAlerts: alerts.filter(a => a.status === 'Active').length,
    criticalAlerts: alerts.filter(a => a.severity === 'critical' && a.status === 'Active').length,
    resolvedToday: alerts.filter(a => a.status === 'Resolved' && a.time.includes('hour')).length,
  };

  // Enhanced stats with count-up animation
  const [animatedStats, setAnimatedStats] = useState({
    activeTourists: 0,
    activeAlerts: 0,
    incidentsResolved: 0,
    safeZones: 0,
    avgResponseTime: 0,
    totalSOSCalls: 0,
    aiDetectionsToday: 0,
    totalUsers: 0
  });

  // User management state
  const [users, setUsers] = useState([
    { id: 1, name: 'Raj Kumar', email: 'raj@example.com', phone: '+919876543210', role: 'Tourist', status: 'Active', lastLogin: '2 hours ago', joined: '2023-05-12', location: 'Mumbai, India', coords: [19.0760, 72.8777], currentTour: 'Goa Beach Trip' },
    { id: 2, name: 'Priya Sharma', email: 'priya@example.com', phone: '+919876543211', role: 'Tourist', status: 'Active', lastLogin: '5 hours ago', joined: '2023-08-20', location: 'Jaipur, India', coords: [26.9124, 75.7873], currentTour: 'Rajasthan Heritage' },
    { id: 3, name: 'Amit Patel', email: 'amit@example.com', phone: '+919876543212', role: 'Volunteer', status: 'Inactive', lastLogin: '1 day ago', joined: '2023-03-15', location: 'Bangalore, India', coords: [12.9716, 77.5946], currentTour: null },
    { id: 4, name: 'Neha Singh', email: 'neha@example.com', phone: '+919876543213', role: 'Tourist', status: 'Suspended', lastLogin: '3 days ago', joined: '2023-11-01', location: 'Delhi, India', coords: [28.6139, 77.2090], currentTour: null },
    { id: 5, name: 'Vikram Reddy', email: 'vikram@example.com', phone: '+919876543214', role: 'Tourist', status: 'Active', lastLogin: '1 hour ago', joined: '2024-01-05', location: 'Kerala, India', coords: [10.8505, 76.2711], currentTour: 'Backwaters Tour' },
  ]);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userFilterStatus, setUserFilterStatus] = useState('all');
  const [viewingUser, setViewingUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const mapRef = useRef(null);
  const [userActivities] = useState([
    { id: 1, date: '2024-01-20', user: 'John Doe', action: 'Login', location: 'New York' },
    { id: 2, date: '2024-01-20', user: 'Jane Smith', action: 'Started Tour', location: 'Tokyo' },
    { id: 3, date: '2024-01-19', user: 'Michael Brown', action: 'Incident Reported', location: 'London' },
  ]);

  const targetStats = {
    activeTourists: 128,
    activeAlerts: alertStats.activeAlerts,
    incidentsResolved: 56,
    safeZones: 12,
    avgResponseTime: 2.3,
    totalSOSCalls: 19,
    aiDetectionsToday: 7,
    totalUsers: users.length,
    systemUptime: 98.7,
    resolvedIncidents: 124
  };

  // Count-up animation effect
  useEffect(() => {
    if (activeTab === 'overview') {
      const duration = 1500;
      const steps = 60;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedStats({
          activeTourists: Math.floor(targetStats.activeTourists * progress),
          activeAlerts: Math.floor(targetStats.activeAlerts * progress),
          incidentsResolved: Math.floor(targetStats.incidentsResolved * progress),
          safeZones: Math.floor(targetStats.safeZones * progress),
          avgResponseTime: (targetStats.avgResponseTime * progress).toFixed(1),
          totalSOSCalls: Math.floor(targetStats.totalSOSCalls * progress),
          aiDetectionsToday: Math.floor(targetStats.aiDetectionsToday * progress),
          totalUsers: Math.floor(targetStats.totalUsers * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedStats({
            activeTourists: targetStats.activeTourists,
            activeAlerts: targetStats.activeAlerts,
            incidentsResolved: targetStats.incidentsResolved,
            safeZones: targetStats.safeZones,
            avgResponseTime: targetStats.avgResponseTime,
            totalSOSCalls: targetStats.totalSOSCalls,
            aiDetectionsToday: targetStats.aiDetectionsToday,
            totalUsers: targetStats.totalUsers
          });
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [activeTab, targetStats.activeAlerts, targetStats.totalUsers]);

  const stats = {
    totalUsers: users.length,
    activeAlerts: alertStats.activeAlerts,
    resolvedIncidents: 124,
    systemUptime: 98.7,
  };

  const userStats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'Active').length,
    suspendedUsers: users.filter(u => u.status === 'Suspended').length,
    newSignups: users.filter(u => new Date(u.joined) > new Date(Date.now() - 86400000)).length,
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) || u.email.toLowerCase().includes(userSearchTerm.toLowerCase());
    const matchesFilter = userFilterStatus === 'all' || u.status === userFilterStatus;
    return matchesSearch && matchesFilter;
  });

  const suspendUser = (id) => {
    if (window.confirm('Are you sure you want to suspend this user?')) {
      setUsers(users.map(u => u.id === id ? { ...u, status: 'Suspended' } : u));
    }
  };

  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const exportUsersToCSV = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Role', 'Status', 'Last Login', 'Joined'],
      ...users.map(u => [u.name, u.email, u.phone, u.role, u.status, u.lastLogin, u.joined])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
  };

  const tourStats = {
    totalActiveTours: tours.length,
    safeTours: tours.filter(t => t.status === 'safe').length,
    alertedTours: tours.filter(t => t.status === 'caution').length,
    incidentReports: incidents.filter(i => i.status === 'Pending').length,
  };

  const filteredTours = tours.filter(t => {
    const matchesSearch = t.touristName.toLowerCase().includes(searchTerm.toLowerCase()) || t.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const deleteTour = (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      setTours(tours.filter(t => t.id !== id));
    }
  };

  const exportToCSV = () => {
    const csv = [
      ['Tourist Name', 'Destination', 'Start Date', 'End Date', 'Geo-Fence (km)', 'Status', 'Contact'],
      ...tours.map(t => [t.touristName, t.destination, t.startDate, t.endDate, t.geoFence, t.status, t.contact])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tours.csv';
    a.click();
  };



  const filteredAlerts = alerts.filter(a => {
    const matchesSearch = a.user.toLowerCase().includes(alertSearchTerm.toLowerCase()) || a.location.toLowerCase().includes(alertSearchTerm.toLowerCase());
    const matchesType = alertFilterType === 'all' || a.type === alertFilterType;
    const matchesStatus = alertFilterStatus === 'all' || a.status === alertFilterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const resolveAlert = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
    if (settings.soundAlerts) {
      // Play success sound (mock)
      console.log('🔔 Alert resolved sound');
    }
  };

  const deleteAlert = (id) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      setAlerts(alerts.filter(a => a.id !== id));
    }
  };

  // Respect global theme
  useEffect(() => {
    const globalTheme = localStorage.getItem('theme');
    if (globalTheme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', settings.accentColor);
    // Apply accent color to nav items
    const style = document.createElement('style');
    style.id = 'accent-color-style';
    style.innerHTML = `
      .nav-item.active {
        background: ${settings.accentColor}22 !important;
        color: ${settings.accentColor} !important;
        box-shadow: 0 0 8px ${settings.accentColor}33 !important;
      }
      .btn-primary {
        background: linear-gradient(90deg, ${settings.accentColor}, ${settings.accentColor}dd) !important;
      }
    `;
    const existingStyle = document.getElementById('accent-color-style');
    if (existingStyle) existingStyle.remove();
    document.head.appendChild(style);
  }, [settings.accentColor]);

  useEffect(() => {
    if (settings.soundAlerts && alertStats.activeAlerts > 0) {
      console.log('🔔 Sound alerts enabled - Active alerts:', alertStats.activeAlerts);
    }
  }, [settings.soundAlerts, alertStats.activeAlerts]);

  return (
    <div className="admin-container" style={{background:'#0a0a0f',color:'#0f1724',position:'relative'}}>
      {/* Stars background */}
      <div className="stars-container">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>SafeTour Admin</h2>
        </div>

        <nav>
          <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <FaHome className="icon" />
            <span>Dashboard</span>
          </button>

          <button className={`nav-item ${activeTab === 'tours' ? 'active' : ''}`} onClick={() => setActiveTab('tours')}>
            <FaMapMarkerAlt className="icon" />
            <span>Tours</span>
          </button>

          <button className={`nav-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            <FaUsers className="icon" />
            <span>Users</span>
          </button>

          <button className={`nav-item ${activeTab === 'alerts' ? 'active' : ''}`} onClick={() => setActiveTab('alerts')}>
            <FaBell className="icon" />
            <span>Alerts</span>
          </button>

          <button className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <FaCog className="icon" />
            <span>Settings</span>
          </button>
        </nav>
      </aside>

      {/* Main area */}
      <main className="admin-main">
        <div className="admin-topbar">
          <button onClick={() => setSidebarOpen(s => !s)} className="toggle-sidebar">
            <FaBars />
          </button>

          <div className="user-info">
            <span className="time">{currentTime.toLocaleTimeString()}</span>
            <span className="user">Admin User</span>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <h2 style={{margin:0}}>📊 Dashboard Overview</h2>
              <button onClick={()=>window.location.reload()} style={{padding:'8px 16px',background:`linear-gradient(135deg,${settings.accentColor},${settings.accentColor}dd)`,color:'#fff',border:'none',borderRadius:8,cursor:'pointer',display:'flex',alignItems:'center',gap:6}}>
                <FaCog /> Refresh Stats
              </button>
            </div>
            <div className="stats-grid">
              <motion.div className="stat-card blue" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0}}>
                <div className="stat-card-header">
                  <span className="stat-icon">👥</span>
                  <span className="stat-trend">↑ 12%</span>
                </div>
                <div className="stat-card-body">
                  <div className="stat-value">{animatedStats.activeTourists}</div>
                  <div className="stat-label">Active Tourists</div>
                  <div className="stat-desc">Currently traveling</div>
                </div>
              </motion.div>

              <motion.div className="stat-card orange" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.1}}>
                <div className="stat-card-header">
                  <motion.span className="stat-icon" animate={{scale:[1,1.1,1]}} transition={{repeat:Infinity,duration:2}}>⚠️</motion.span>
                  <span className="stat-trend">↓ 5%</span>
                </div>
                <div className="stat-card-body">
                  <div className="stat-value">{animatedStats.activeAlerts}</div>
                  <div className="stat-label">Active Alerts</div>
                  <div className="stat-desc">Needs attention</div>
                </div>
              </motion.div>

              <motion.div className="stat-card green" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.2}}>
                <div className="stat-card-header">
                  <span className="stat-icon">✅</span>
                  <span className="stat-trend">↑ 8%</span>
                </div>
                <div className="stat-card-body">
                  <div className="stat-value">{animatedStats.incidentsResolved}</div>
                  <div className="stat-label">Incidents Resolved</div>
                  <div className="stat-desc">This month</div>
                </div>
              </motion.div>

              <motion.div className="stat-card cyan" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.3}}>
                <div className="stat-card-header">
                  <span className="stat-icon">🗺️</span>
                </div>
                <div className="stat-card-body">
                  <div className="stat-value">{animatedStats.safeZones}</div>
                  <div className="stat-label">Safe Zones</div>
                  <div className="stat-desc">Monitored areas</div>
                </div>
              </motion.div>

              <motion.div className="stat-card purple" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.4}}>
                <div className="stat-card-header">
                  <span className="stat-icon">⏱️</span>
                </div>
                <div className="stat-card-body">
                  <div className="stat-value">{animatedStats.avgResponseTime} min</div>
                  <div className="stat-label">Avg Response Time</div>
                  <div className="stat-desc">Emergency response</div>
                </div>
              </motion.div>

              <motion.div className="stat-card red" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.5}}>
                <div className="stat-card-header">
                  <span className="stat-icon">🚨</span>
                  <span className="stat-trend">↑ 3</span>
                </div>
                <div className="stat-card-body">
                  <div className="stat-value">{animatedStats.totalSOSCalls}</div>
                  <div className="stat-label">Total SOS Calls</div>
                  <div className="stat-desc">Emergency requests</div>
                </div>
              </motion.div>

              <motion.div className="stat-card cyan" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.6}}>
                <div className="stat-card-header">
                  <span className="stat-icon">🤖</span>
                </div>
                <div className="stat-card-body">
                  <div className="stat-value">{animatedStats.aiDetectionsToday}</div>
                  <div className="stat-label">AI Detections Today</div>
                  <div className="stat-desc">Anomalies detected</div>
                </div>
              </motion.div>

              <motion.div className="stat-card blue" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.7}}>
                <div className="stat-card-header">
                  <span className="stat-icon">👤</span>
                </div>
                <div className="stat-card-body">
                  <div className="stat-value">{animatedStats.totalUsers}</div>
                  <div className="stat-label">Total Users</div>
                  <div className="stat-desc">Registered accounts</div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'tours' && (
          <section className="reports-section">
            <h2>Tour Management</h2>
            
            {/* Tour Stats Cards */}
            <div className="stats-grid" style={{marginBottom:20}}>
              <motion.div className="stat-card green">
                <div className="stat-card-header"><span className="stat-icon">🌍</span></div>
                <div className="stat-card-body">
                  <div className="stat-value">{tourStats.totalActiveTours}</div>
                  <div className="stat-label">Total Active Tours</div>
                </div>
              </motion.div>
              <motion.div className="stat-card blue">
                <div className="stat-card-header"><span className="stat-icon">✅</span></div>
                <div className="stat-card-body">
                  <div className="stat-value">{tourStats.safeTours}</div>
                  <div className="stat-label">Safe Tours</div>
                </div>
              </motion.div>
              <motion.div className="stat-card orange">
                <div className="stat-card-header"><span className="stat-icon">⚠️</span></div>
                <div className="stat-card-body">
                  <div className="stat-value">{tourStats.alertedTours}</div>
                  <div className="stat-label">Alerted Tours</div>
                </div>
              </motion.div>
              <motion.div className="stat-card red">
                <div className="stat-card-header"><span className="stat-icon">🚨</span></div>
                <div className="stat-card-body">
                  <div className="stat-value">{tourStats.incidentReports}</div>
                  <div className="stat-label">Incident Reports</div>
                </div>
              </motion.div>
            </div>

            {/* Search & Filter Bar */}
            <div style={{display:'flex',gap:12,marginBottom:20,flexWrap:'wrap'}}>
              <div style={{flex:1,minWidth:200,position:'relative'}}>
                <FaSearch style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#94a3b8'}} />
                <input
                  type="text"
                  placeholder="Search by tourist name or destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{width:'100%',padding:'10px 10px 10px 40px',border:'1px solid rgba(0,229,255,0.2)',borderRadius:8,fontSize:14,background:'#0f1724',color:'#fff'}}
                />
              </div>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{padding:'10px 16px',border:'1px solid rgba(0,229,255,0.2)',borderRadius:8,fontSize:14,background:'#0f1724',color:'#fff'}}>
                <option value="all">All Status</option>
                <option value="safe">Safe</option>
                <option value="caution">Caution</option>
                <option value="danger">Danger</option>
              </select>
              <button onClick={exportToCSV} className="btn" style={{background:'#10b981',color:'#fff',display:'flex',alignItems:'center',gap:6}}>
                <FaDownload /> Export CSV
              </button>
              <button onClick={() => setShowAddModal(true)} className="btn btn-primary" style={{display:'flex',alignItems:'center',gap:6}}>
                <FaPlus /> Add Tour
              </button>
            </div>

            {/* Tours Table */}
            <div style={{background:'#0f1724',borderRadius:12,overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',border:'1px solid rgba(0,229,255,0.15)'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead style={{background:'linear-gradient(135deg,#1a1f3a,#0f1724)',borderBottom:'2px solid rgba(0,229,255,0.2)'}}>
                  <tr>
                    <th style={{padding:12,textAlign:'left',fontWeight:600,color:'#e2e8f0'}}>Tourist Name</th>
                    <th style={{padding:12,textAlign:'left',fontWeight:600,color:'#e2e8f0'}}>Destination</th>
                    <th style={{padding:12,textAlign:'left',fontWeight:600,color:'#e2e8f0'}}>Start Date</th>
                    <th style={{padding:12,textAlign:'left',fontWeight:600,color:'#e2e8f0'}}>End Date</th>
                    <th style={{padding:12,textAlign:'left',fontWeight:600,color:'#e2e8f0'}}>Geo-Fence</th>
                    <th style={{padding:12,textAlign:'left',fontWeight:600,color:'#e2e8f0'}}>Status</th>
                    <th style={{padding:12,textAlign:'left',fontWeight:600,color:'#e2e8f0'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTours.map((tour, idx) => (
                    <motion.tr
                      key={tour.id}
                      initial={{opacity:0,y:20}}
                      animate={{opacity:1,y:0}}
                      transition={{delay:idx*0.05}}
                      style={{borderBottom:'1px solid rgba(0,229,255,0.08)'}}
                    >
                      <td style={{padding:12,fontWeight:600,color:'#e2e8f0'}}>{tour.touristName}</td>
                      <td style={{padding:12,color:'#94a3b8'}}>{tour.destination}</td>
                      <td style={{padding:12,color:'#94a3b8',fontSize:13}}>{tour.startDate}</td>
                      <td style={{padding:12,color:'#94a3b8',fontSize:13}}>{tour.endDate}</td>
                      <td style={{padding:12,color:'#94a3b8'}}>{tour.geoFence} km</td>
                      <td style={{padding:12}}>
                        <span style={{
                          padding:'4px 12px',
                          borderRadius:12,
                          fontSize:12,
                          fontWeight:600,
                          background: tour.status === 'safe' ? '#d1fae5' : tour.status === 'caution' ? '#fef3c7' : '#fee2e2',
                          color: tour.status === 'safe' ? '#065f46' : tour.status === 'caution' ? '#92400e' : '#991b1b'
                        }}>
                          {tour.status === 'safe' ? '🟢 Safe' : tour.status === 'caution' ? '🟡 Caution' : '🔴 Danger'}
                        </span>
                      </td>
                      <td style={{padding:12}}>
                        <div style={{display:'flex',gap:6}}>
                          <button onClick={() => alert(`View tour details for ${tour.touristName}`)} style={{padding:'6px 10px',border:'1px solid rgba(0,229,255,0.2)',borderRadius:6,background:'#1a1f3a',color:'#fff',cursor:'pointer',display:'flex',alignItems:'center',gap:4}}>
                            <FaEye size={12} /> View
                          </button>
                          <button onClick={() => setEditingTour(tour)} style={{padding:'6px 10px',border:'1px solid rgba(0,229,255,0.2)',borderRadius:6,background:'#1a1f3a',color:'#fff',cursor:'pointer',display:'flex',alignItems:'center',gap:4}}>
                            <FaEdit size={12} /> Edit
                          </button>
                          <button onClick={() => deleteTour(tour.id)} style={{padding:'6px 10px',border:'1px solid #fee2e2',borderRadius:6,background:'#fef2f2',color:'#dc2626',cursor:'pointer'}}>
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Map Visualization */}
            <div style={{marginTop:20,background:'#1a1f3a',padding:20,borderRadius:12,boxShadow:'0 2px 8px rgba(0,0,0,0.06)',border:'1px solid rgba(0,229,255,0.15)'}}>
              <h3 style={{marginBottom:12,display:'flex',alignItems:'center',gap:8,color:'#fff'}}>
                <FaMapMarkerAlt style={{color:'#00e5ff'}} /> Live Geo-Fence Overview
              </h3>
              <div style={{height:400,borderRadius:8,overflow:'hidden'}}>
                <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{height:'100%',width:'100%'}}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  {filteredTours.map(tour => {
                    const coords = tour.destination.includes('Mumbai') ? [19.0760, 72.8777] :
                                   tour.destination.includes('Jaipur') ? [26.9124, 75.7873] :
                                   tour.destination.includes('Goa') ? [15.2993, 74.1240] :
                                   tour.destination.includes('Bangalore') ? [12.9716, 77.5946] :
                                   tour.destination.includes('Kerala') ? [10.8505, 76.2711] :
                                   tour.destination.includes('Delhi') ? [28.6139, 77.2090] : [20.5937, 78.9629];
                    return (
                      <React.Fragment key={tour.id}>
                        <Marker position={coords}>
                          <Popup>
                            <div style={{padding:8}}>
                              <strong>{tour.touristName}</strong><br/>
                              {tour.destination}<br/>
                              <span style={{fontSize:11,color:tour.status==='safe'?'#10b981':tour.status==='caution'?'#f59e0b':'#ef4444'}}>
                                {tour.status.toUpperCase()}
                              </span>
                            </div>
                          </Popup>
                        </Marker>
                        <Circle
                          center={coords}
                          radius={tour.geoFence * 1000}
                          pathOptions={{
                            color: tour.status==='safe'?'#10b981':tour.status==='caution'?'#f59e0b':'#ef4444',
                            fillColor: tour.status==='safe'?'#10b981':tour.status==='caution'?'#f59e0b':'#ef4444',
                            fillOpacity: 0.1
                          }}
                        />
                      </React.Fragment>
                    );
                  })}
                </MapContainer>
              </div>
            </div>

            {/* Incident Log Section */}
            <div style={{marginTop:20,background:'#1a1f3a',padding:20,borderRadius:12,boxShadow:'0 2px 8px rgba(0,0,0,0.06)',border:'1px solid rgba(0,229,255,0.15)'}}>
              <h3 style={{marginBottom:12,display:'flex',alignItems:'center',gap:8,color:'#fff'}}>
                <FaExclamationTriangle style={{color:'#f59e0b'}} /> Incident Log
              </h3>
              <div style={{display:'grid',gap:12}}>
                {incidents.map(inc => (
                  <motion.div
                    key={inc.id}
                    whileHover={{scale:1.01}}
                    style={{
                      padding:16,
                      borderRadius:8,
                      border:'1px solid rgba(0,229,255,0.2)',
                      background: inc.status === 'Pending' ? '#1e293b' : '#0f1724',
                      display:'flex',
                      justifyContent:'space-between',
                      alignItems:'center'
                    }}
                  >
                    <div>
                      <div style={{fontWeight:700,marginBottom:4,color:'#fff'}}>{inc.touristName}</div>
                      <div style={{fontSize:13,color:'#94a3b8',marginBottom:2}}>📍 {inc.location}</div>
                      <div style={{fontSize:12,color:'#94a3b8'}}>Type: {inc.type}</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{
                        padding:'4px 12px',
                        borderRadius:12,
                        fontSize:12,
                        fontWeight:600,
                        background: inc.status === 'Pending' ? '#fef3c7' : '#d1fae5',
                        color: inc.status === 'Pending' ? '#92400e' : '#065f46',
                        marginBottom:4
                      }}>
                        {inc.status === 'Pending' && '⚠️ '}{inc.status}
                      </div>
                      <div style={{fontSize:12,color:'#94a3b8'}}>{inc.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Add/Edit Tour Modal */}
            {(showAddModal || editingTour) && (
              <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
                <motion.div
                  initial={{scale:0.9,opacity:0}}
                  animate={{scale:1,opacity:1}}
                  style={{background:'#fff',padding:30,borderRadius:16,width:'90%',maxWidth:500,boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}}
                >
                  <h3 style={{marginBottom:20}}>{editingTour ? 'Edit Tour' : 'Add New Tour'}</h3>
                  <div style={{display:'grid',gap:12}}>
                    <input type="text" placeholder="Tourist Name" defaultValue={editingTour?.touristName} style={{padding:10,border:'1px solid #e2e8f0',borderRadius:8}} />
                    <input type="text" placeholder="Destination" defaultValue={editingTour?.destination} style={{padding:10,border:'1px solid #e2e8f0',borderRadius:8}} />
                    <input type="date" placeholder="Start Date" defaultValue={editingTour?.startDate} style={{padding:10,border:'1px solid #e2e8f0',borderRadius:8}} />
                    <input type="date" placeholder="End Date" defaultValue={editingTour?.endDate} style={{padding:10,border:'1px solid #e2e8f0',borderRadius:8}} />
                    <input type="text" placeholder="Contact Info" defaultValue={editingTour?.contact} style={{padding:10,border:'1px solid #e2e8f0',borderRadius:8}} />
                    <input type="number" placeholder="Geo-Fence Radius (km)" defaultValue={editingTour?.geoFence} style={{padding:10,border:'1px solid #e2e8f0',borderRadius:8}} />
                    <select defaultValue={editingTour?.status || 'safe'} style={{padding:10,border:'1px solid #e2e8f0',borderRadius:8}}>
                      <option value="safe">Safe</option>
                      <option value="caution">Caution</option>
                      <option value="danger">Danger</option>
                    </select>
                  </div>
                  <div style={{display:'flex',gap:12,marginTop:20}}>
                    <button onClick={() => { setShowAddModal(false); setEditingTour(null); alert('Tour saved (mock)'); }} className="btn btn-primary" style={{flex:1}}>Save</button>
                    <button onClick={() => { setShowAddModal(false); setEditingTour(null); }} className="btn btn-outline" style={{flex:1}}>Cancel</button>
                  </div>
                </motion.div>
              </div>
            )}
          </section>
        )}

        {activeTab === 'users' && (
          <section className="reports-section">
            <h2>User Management</h2>

            {/* User Stats Cards */}
            <div className="stats-grid" style={{marginBottom:20}}>
              <motion.div className="stat-card blue">
                <div className="stat-card-header"><span className="stat-icon">👤</span></div>
                <div className="stat-card-body">
                  <div className="stat-value">{userStats.totalUsers}</div>
                  <div className="stat-label">Total Users</div>
                </div>
              </motion.div>
              <motion.div className="stat-card green">
                <div className="stat-card-header"><span className="stat-icon">🟢</span></div>
                <div className="stat-card-body">
                  <div className="stat-value">{userStats.activeUsers}</div>
                  <div className="stat-label">Active Users</div>
                </div>
              </motion.div>
              <motion.div className="stat-card red">
                <div className="stat-card-header"><span className="stat-icon">🔴</span></div>
                <div className="stat-card-body">
                  <div className="stat-value">{userStats.suspendedUsers}</div>
                  <div className="stat-label">Suspended Users</div>
                </div>
              </motion.div>
              <motion.div className="stat-card purple">
                <div className="stat-card-header"><span className="stat-icon">🕓</span></div>
                <div className="stat-card-body">
                  <div className="stat-value">{userStats.newSignups}</div>
                  <div className="stat-label">New Signups (Today)</div>
                </div>
              </motion.div>
            </div>

            {/* Search & Filter Bar */}
            <div style={{display:'flex',gap:12,marginBottom:20,flexWrap:'wrap'}}>
              <div style={{flex:1,minWidth:200,position:'relative'}}>
                <FaSearch style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#94a3b8'}} />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  style={{width:'100%',padding:'10px 10px 10px 40px',border:'1px solid rgba(0,229,255,0.2)',borderRadius:8,fontSize:14,background:'#0f1724',color:'#fff'}}
                />
              </div>
              <select value={userFilterStatus} onChange={(e) => setUserFilterStatus(e.target.value)} style={{padding:'10px 16px',border:'1px solid rgba(0,229,255,0.2)',borderRadius:8,fontSize:14,background:'#0f1724',color:'#fff'}}>
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
              <button onClick={exportUsersToCSV} className="btn" style={{background:'#10b981',color:'#fff',display:'flex',alignItems:'center',gap:6}}>
                <FaDownload /> Export CSV
              </button>
              <button onClick={() => setShowAddUserModal(true)} className="btn btn-primary" style={{display:'flex',alignItems:'center',gap:6}}>
                <FaPlus /> Add User
              </button>
            </div>

            {/* Users Table */}
            <div style={{background:'#0f1724',borderRadius:12,overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',border:'1px solid rgba(0,229,255,0.15)'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead style={{background:'linear-gradient(135deg,#1a1f3a,#0f1724)',borderBottom:'2px solid rgba(0,229,255,0.2)'}}>
                  <tr>
                    <th style={{padding:12,textAlign:'left',fontWeight:600,color:'#e2e8f0'}}>Name</th>
                    <th style={{padding:12,textAlign:'left',fontWeight:600,color:'#e2e8f0'}}>Email</th>
                    <th style={{padding:12,textAlign:'left',fontWeight:600,color:'#e2e8f0'}}>Role</th>
                    <th style={{padding:12,textAlign:'left',fontWeight:600,color:'#e2e8f0'}}>Status</th>
                    <th style={{padding:12,textAlign:'left',fontWeight:600,color:'#e2e8f0'}}>Last Active</th>
                    <th style={{padding:12,textAlign:'left',fontWeight:600,color:'#e2e8f0'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, idx) => (
                    <motion.tr
                      key={u.id}
                      initial={{opacity:0,x:-20}}
                      animate={{opacity:1,x:0}}
                      transition={{delay:idx*0.05}}
                      style={{borderBottom:'1px solid rgba(0,229,255,0.08)'}}
                    >
                      <td style={{padding:12}}>
                        <div style={{display:'flex',alignItems:'center',gap:10}}>
                          <div style={{width:36,height:36,borderRadius:8,background:'linear-gradient(135deg,#06b6d4,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:13}}>
                            {u.name.split(' ').map(n=>n[0]).slice(0,2).join('')}
                          </div>
                          <div>
                            <div style={{fontWeight:600,color:'#e2e8f0'}}>{u.name}</div>
                            <div style={{fontSize:11,color:'#94a3b8',display:'flex',alignItems:'center',gap:4}}>
                              {u.status === 'Active' && '🟢'}
                              {u.status === 'Inactive' && '🟡'}
                              {u.status === 'Suspended' && '🔴'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{padding:12,color:'#94a3b8',fontSize:13}}>{u.email}</td>
                      <td style={{padding:12}}>
                        <span style={{padding:'4px 10px',borderRadius:8,fontSize:12,background:'#f1f5f9',color:'#475569',fontWeight:500}}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{padding:12}}>
                        <span style={{
                          padding:'4px 12px',
                          borderRadius:12,
                          fontSize:12,
                          fontWeight:600,
                          background: u.status === 'Active' ? '#d1fae5' : u.status === 'Inactive' ? '#fef3c7' : '#fee2e2',
                          color: u.status === 'Active' ? '#065f46' : u.status === 'Inactive' ? '#92400e' : '#991b1b'
                        }}>
                          {u.status}
                        </span>
                      </td>
                      <td style={{padding:12,color:'#94a3b8',fontSize:13}}>{u.lastLogin}</td>
                      <td style={{padding:12}}>
                        <div style={{display:'flex',gap:6}}>
                          <button onClick={() => setViewingUser(u)} style={{padding:'6px 10px',border:'1px solid rgba(0,229,255,0.2)',borderRadius:6,background:'#1a1f3a',color:'#fff',cursor:'pointer',display:'flex',alignItems:'center',gap:4}}>
                            <FaEye size={12} /> View
                          </button>
                          <button onClick={() => setEditingUser(u)} style={{padding:'6px 10px',border:'1px solid rgba(0,229,255,0.2)',borderRadius:6,background:'#1a1f3a',color:'#fff',cursor:'pointer',display:'flex',alignItems:'center',gap:4}}>
                            <FaEdit size={12} /> Edit
                          </button>
                          {u.status !== 'Suspended' && (
                            <button onClick={() => suspendUser(u.id)} style={{padding:'6px 10px',border:'1px solid #fef3c7',borderRadius:6,background:'#fefce8',color:'#92400e',cursor:'pointer',fontSize:12}}>
                              🚫 Suspend
                            </button>
                          )}
                          <button onClick={() => deleteUser(u.id)} style={{padding:'6px 10px',border:'1px solid #fee2e2',borderRadius:6,background:'#fef2f2',color:'#dc2626',cursor:'pointer'}}>
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* User Activity Logs */}
            <div style={{marginTop:20,background:'#1a1f3a',padding:20,borderRadius:12,boxShadow:'0 2px 8px rgba(0,0,0,0.06)',border:'1px solid rgba(0,229,255,0.15)'}}>
              <h3 style={{marginBottom:12,display:'flex',alignItems:'center',gap:8,color:'#fff'}}>
                <FaChartLine style={{color:'#8b5cf6'}} /> Recent User Activity
              </h3>
              <div style={{overflowX:'auto'}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead style={{background:'linear-gradient(135deg,#0f1724,#1a1f3a)'}}>
                    <tr>
                      <th style={{padding:10,textAlign:'left',fontSize:13,fontWeight:600,color:'#e2e8f0'}}>Date</th>
                      <th style={{padding:10,textAlign:'left',fontSize:13,fontWeight:600,color:'#e2e8f0'}}>User</th>
                      <th style={{padding:10,textAlign:'left',fontSize:13,fontWeight:600,color:'#e2e8f0'}}>Action</th>
                      <th style={{padding:10,textAlign:'left',fontSize:13,fontWeight:600,color:'#e2e8f0'}}>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userActivities.map(act => (
                      <tr key={act.id} style={{borderBottom:'1px solid rgba(0,229,255,0.08)'}}>
                        <td style={{padding:10,fontSize:13,color:'#94a3b8'}}>{act.date}</td>
                        <td style={{padding:10,fontSize:13,fontWeight:600,color:'#e2e8f0'}}>{act.user}</td>
                        <td style={{padding:10,fontSize:13,color:'#94a3b8'}}>{act.action}</td>
                        <td style={{padding:10,fontSize:13,color:'#94a3b8'}}>📍 {act.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* View User Profile Modal */}
            {viewingUser && (
              <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}} onClick={() => setViewingUser(null)}>
                <motion.div
                  initial={{scale:0.9,opacity:0,y:20}}
                  animate={{scale:1,opacity:1,y:0}}
                  onClick={(e) => e.stopPropagation()}
                  style={{background:'#fff',padding:30,borderRadius:16,width:'90%',maxWidth:600,boxShadow:'0 20px 60px rgba(0,0,0,0.3)',border:'2px solid #3b82f6',maxHeight:'90vh',overflowY:'auto'}}
                >
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
                    <h3 style={{margin:0}}>User Profile</h3>
                    <button onClick={() => setViewingUser(null)} style={{background:'transparent',border:'none',fontSize:20,cursor:'pointer',color:'#94a3b8'}}>×</button>
                  </div>
                  <div style={{display:'grid',gap:16}}>
                    <div style={{display:'flex',alignItems:'center',gap:12}}>
                      <div style={{width:60,height:60,borderRadius:12,background:'linear-gradient(135deg,#06b6d4,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:20}}>
                        {viewingUser.name.split(' ').map(n=>n[0]).slice(0,2).join('')}
                      </div>
                      <div>
                        <div style={{fontSize:18,fontWeight:700}}>{viewingUser.name}</div>
                        <div style={{fontSize:13,color:'#64748b'}}>{viewingUser.role}</div>
                      </div>
                    </div>
                    <div style={{display:'grid',gap:10,padding:16,background:'#f8fafc',borderRadius:8}}>
                      <div><strong>📧 Email:</strong> {viewingUser.email}</div>
                      <div><strong>📱 Phone:</strong> {viewingUser.phone}</div>
                      <div><strong>📍 Location:</strong> {viewingUser.location}</div>
                      <div><strong>🧭 Current Tour:</strong> {viewingUser.currentTour || 'None'}</div>
                      <div><strong>⚙️ Status:</strong> <span style={{padding:'2px 8px',borderRadius:8,fontSize:12,background:viewingUser.status==='Active'?'#d1fae5':'#fee2e2',color:viewingUser.status==='Active'?'#065f46':'#991b1b'}}>{viewingUser.status}</span></div>
                      <div><strong>📅 Joined:</strong> {viewingUser.joined}</div>
                      <div><strong>🕓 Last Login:</strong> {viewingUser.lastLogin}</div>
                    </div>
                    <div style={{marginTop:16,marginBottom:16}}>
                      <h4 style={{fontSize:14,fontWeight:600,marginBottom:8,color:'#475569'}}>🗺️ Location Map</h4>
                      <div style={{height:300,borderRadius:12,overflow:'hidden',boxShadow:'0 4px 12px rgba(0,0,0,0.1)',border:'2px solid #3b82f6'}}>
                        <MapContainer 
                          key={`user-map-${viewingUser.id}`}
                          center={viewingUser.coords || [20.5937, 78.9629]} 
                          zoom={12} 
                          style={{height:'100%',width:'100%',borderRadius:12}} 
                          scrollWheelZoom={true}
                          zoomControl={true}
                        >
                          <TileLayer 
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                            attribution='&copy; OpenStreetMap'
                          />
                          <MapResizer />
                          {viewingUser.coords && (
                            <Marker position={viewingUser.coords}>
                              <Popup>
                                <div style={{padding:8,minWidth:150}}>
                                  <strong style={{fontSize:14,display:'block',marginBottom:4}}>{viewingUser.name}</strong>
                                  <span style={{fontSize:12,color:'#64748b',display:'block'}}>📍 {viewingUser.location}</span>
                                  {viewingUser.currentTour && (
                                    <span style={{fontSize:11,color:'#3b82f6',display:'block',marginTop:4}}>🌍 {viewingUser.currentTour}</span>
                                  )}
                                </div>
                              </Popup>
                            </Marker>
                          )}
                        </MapContainer>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setViewingUser(null)} className="btn btn-primary" style={{width:'100%',marginTop:16}}>Close</button>
                </motion.div>
              </div>
            )}

            {/* Add/Edit User Modal */}
            {(showAddUserModal || editingUser) && (
              <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
                <motion.div
                  initial={{scale:0.9,opacity:0}}
                  animate={{scale:1,opacity:1}}
                  style={{background:'#fff',padding:30,borderRadius:16,width:'90%',maxWidth:500,boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}}
                >
                  <h3 style={{marginBottom:20}}>{editingUser ? 'Edit User' : 'Add New User'}</h3>
                  <div style={{display:'grid',gap:12}}>
                    <input type="text" placeholder="Full Name" defaultValue={editingUser?.name} style={{padding:10,border:'1px solid #e2e8f0',borderRadius:8}} />
                    <input type="email" placeholder="Email" defaultValue={editingUser?.email} style={{padding:10,border:'1px solid #e2e8f0',borderRadius:8}} />
                    <input type="tel" placeholder="Phone" defaultValue={editingUser?.phone} style={{padding:10,border:'1px solid #e2e8f0',borderRadius:8}} />
                    <input type="password" placeholder="Password" style={{padding:10,border:'1px solid #e2e8f0',borderRadius:8}} />
                    <select defaultValue={editingUser?.role || 'Tourist'} style={{padding:10,border:'1px solid #e2e8f0',borderRadius:8}}>
                      <option value="Tourist">Tourist</option>
                      <option value="Volunteer">Volunteer</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <select defaultValue={editingUser?.status || 'Active'} style={{padding:10,border:'1px solid #e2e8f0',borderRadius:8}}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                  <div style={{display:'flex',gap:12,marginTop:20}}>
                    <button onClick={() => { setShowAddUserModal(false); setEditingUser(null); alert('User saved (mock)'); }} className="btn btn-primary" style={{flex:1}}>Save</button>
                    <button onClick={() => { setShowAddUserModal(false); setEditingUser(null); }} className="btn btn-outline" style={{flex:1}}>Cancel</button>
                  </div>
                </motion.div>
              </div>
            )}
          </section>
        )}

        {activeTab === 'alerts' && (
          <section className="reports-section">
            <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
              <motion.div animate={{scale:[1,1.1,1]}} transition={{repeat:Infinity,duration:2}}>
                <FaBell style={{fontSize:28,color:'#ef4444'}} />
              </motion.div>
              <h2 style={{margin:0}}>Live Alerts Dashboard</h2>
            </motion.div>

            {/* Alert Stats Cards */}
            <div className="stats-grid" style={{marginBottom:20}}>
              <motion.div className="stat-card orange">
                <div className="stat-card-header"><span className="stat-icon">🔔</span></div>
                <div className="stat-card-body">
                  <div className="stat-value">{alertStats.totalAlerts}</div>
                  <div className="stat-label">Total Alerts</div>
                </div>
              </motion.div>
              <motion.div className="stat-card red" animate={{boxShadow:['0 4px 12px rgba(239,68,68,0.3)','0 4px 20px rgba(239,68,68,0.6)','0 4px 12px rgba(239,68,68,0.3)']}} transition={{repeat:Infinity,duration:2}}>
                <div className="stat-card-header"><motion.span className="stat-icon" animate={{scale:[1,1.1,1]}} transition={{repeat:Infinity,duration:2}}>⚠️</motion.span></div>
                <div className="stat-card-body">
                  <div className="stat-value">{alertStats.activeAlerts}</div>
                  <div className="stat-label">Active Alerts</div>
                </div>
              </motion.div>
              <motion.div className="stat-card red">
                <div className="stat-card-header"><span className="stat-icon">🚨</span></div>
                <div className="stat-card-body">
                  <div className="stat-value">{alertStats.criticalAlerts}</div>
                  <div className="stat-label">Critical Alerts</div>
                </div>
              </motion.div>
              <motion.div className="stat-card green">
                <div className="stat-card-header"><span className="stat-icon">✅</span></div>
                <div className="stat-card-body">
                  <div className="stat-value">{alertStats.resolvedToday}</div>
                  <div className="stat-label">Resolved Today</div>
                </div>
              </motion.div>
            </div>

            {/* Search & Filter Bar */}
            <div style={{display:'flex',gap:12,marginBottom:20,flexWrap:'wrap'}}>
              <div style={{flex:1,minWidth:200,position:'relative'}}>
                <FaSearch style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#94a3b8'}} />
                <input
                  type="text"
                  placeholder="Search by user or location..."
                  value={alertSearchTerm}
                  onChange={(e) => setAlertSearchTerm(e.target.value)}
                  style={{width:'100%',padding:'10px 10px 10px 40px',border:'1px solid rgba(0,229,255,0.2)',borderRadius:8,fontSize:14,background:'#0f1724',color:'#fff'}}
                />
              </div>
              <select value={alertFilterType} onChange={(e) => setAlertFilterType(e.target.value)} style={{padding:'10px 16px',border:'1px solid rgba(0,229,255,0.2)',borderRadius:8,fontSize:14,background:'#0f1724',color:'#fff'}}>
                <option value="all">All Types</option>
                <option value="Geo-Fence Breach">Geo-Fence Breach</option>
                <option value="SOS Alert">SOS Alert</option>
                <option value="Suspicious Activity">Suspicious Activity</option>
                <option value="Medical Emergency">Medical Emergency</option>
                <option value="Theft Report">Theft Report</option>
              </select>
              <select value={alertFilterStatus} onChange={(e) => setAlertFilterStatus(e.target.value)} style={{padding:'10px 16px',border:'1px solid rgba(0,229,255,0.2)',borderRadius:8,fontSize:14,background:'#0f1724',color:'#fff'}}>
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            {/* Alerts Grid */}
            <div style={{display:'grid',gap:16}}>
              {filteredAlerts.map((alert, idx) => (
                <motion.div
                  key={alert.id}
                  initial={{opacity:0,x:-20}}
                  animate={{opacity:1,x:0}}
                  transition={{delay:idx*0.05}}
                  whileHover={{scale:1.01,boxShadow:'0 8px 24px rgba(0,0,0,0.12)'}}
                  style={{
                    background: alert.status === 'Active' ? (alert.severity === 'critical' ? 'linear-gradient(135deg,#fee2e2,#fef2f2)' : '#fffbeb') : '#f0fdf4',
                    padding:20,
                    borderRadius:12,
                    border: alert.status === 'Active' ? (alert.severity === 'critical' ? '2px solid #ef4444' : '1px solid #f59e0b') : '1px solid #10b981',
                    boxShadow:'0 2px 8px rgba(0,0,0,0.06)',
                    position:'relative',
                    overflow:'hidden'
                  }}
                >
                  {alert.status === 'Active' && alert.severity === 'critical' && (
                    <motion.div
                      animate={{opacity:[0.3,0.6,0.3]}}
                      transition={{repeat:Infinity,duration:1.5}}
                      style={{position:'absolute',top:0,left:0,right:0,height:4,background:'#ef4444'}}
                    />
                  )}
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'start',gap:16}}>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                        <div style={{
                          width:40,
                          height:40,
                          borderRadius:10,
                          background: alert.severity === 'critical' ? 'linear-gradient(135deg,#ef4444,#dc2626)' : alert.severity === 'high' ? 'linear-gradient(135deg,#f59e0b,#d97706)' : 'linear-gradient(135deg,#3b82f6,#2563eb)',
                          display:'flex',
                          alignItems:'center',
                          justifyContent:'center',
                          color:'#fff',
                          fontSize:18
                        }}>
                          {alert.type === 'SOS Alert' && '🆘'}
                          {alert.type === 'Geo-Fence Breach' && '🚧'}
                          {alert.type === 'Suspicious Activity' && '👁️'}
                          {alert.type === 'Medical Emergency' && '🏥'}
                          {alert.type === 'Theft Report' && '🚨'}
                        </div>
                        <div>
                          <div style={{fontSize:16,fontWeight:700,color:'#0f172a'}}>{alert.type}</div>
                          <div style={{fontSize:13,color:'#64748b'}}>{alert.user}</div>
                        </div>
                      </div>
                      <div style={{marginBottom:8}}>
                        <div style={{fontSize:14,color:'#475569',marginBottom:4}}>{alert.description}</div>
                        <div style={{fontSize:13,color:'#94a3b8',display:'flex',alignItems:'center',gap:8}}>
                          <span>📍 {alert.location}</span>
                          <span style={{fontSize:11}}>({alert.coords})</span>
                        </div>
                      </div>
                      <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
                        <span style={{
                          padding:'4px 10px',
                          borderRadius:8,
                          fontSize:11,
                          fontWeight:600,
                          background: alert.severity === 'critical' ? '#fee2e2' : alert.severity === 'high' ? '#fef3c7' : '#dbeafe',
                          color: alert.severity === 'critical' ? '#991b1b' : alert.severity === 'high' ? '#92400e' : '#1e40af'
                        }}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span style={{
                          padding:'4px 10px',
                          borderRadius:8,
                          fontSize:11,
                          fontWeight:600,
                          background: alert.status === 'Active' ? '#fee2e2' : '#d1fae5',
                          color: alert.status === 'Active' ? '#991b1b' : '#065f46'
                        }}>
                          {alert.status}
                        </span>
                        <span style={{fontSize:12,color:'#94a3b8'}}>🕐 {alert.time}</span>
                      </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:8,minWidth:120}}>
                      <button onClick={() => setViewingAlert(alert)} style={{padding:'8px 12px',border:'1px solid rgba(0,229,255,0.2)',borderRadius:8,background:'#1a1f3a',color:'#fff',cursor:'pointer',fontSize:13,display:'flex',alignItems:'center',gap:6,justifyContent:'center'}}>
                        <FaEye size={12} /> View Details
                      </button>
                      {alert.status === 'Active' && (
                        <motion.button
                          whileHover={{scale:1.05}}
                          whileTap={{scale:0.95}}
                          onClick={() => resolveAlert(alert.id)}
                          style={{padding:'8px 12px',border:'none',borderRadius:8,background:'linear-gradient(135deg,#10b981,#059669)',color:'#fff',cursor:'pointer',fontSize:13,fontWeight:600}}
                        >
                          ✓ Resolve
                        </motion.button>
                      )}
                      <button onClick={() => deleteAlert(alert.id)} style={{padding:'8px 12px',border:'1px solid #fee2e2',borderRadius:8,background:'#fef2f2',color:'#dc2626',cursor:'pointer',fontSize:13}}>
                        <FaTrash size={11} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Mini Map */}
                  <div style={{marginTop:12,height:200,borderRadius:8,overflow:'hidden',border:'1px solid #e2e8f0'}}>
                    <MapContainer 
                      key={`alert-map-${alert.id}`}
                      center={(() => {
                        const coords = alert.coords.split(',').map(c => parseFloat(c.replace(/[°NSEW]/g, '')));
                        return alert.coords.includes('W') ? [coords[0], -coords[1]] : coords;
                      })()} 
                      zoom={13} 
                      style={{height:'100%',width:'100%'}} 
                      scrollWheelZoom={false}
                      zoomControl={false}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marker position={(() => {
                        const coords = alert.coords.split(',').map(c => parseFloat(c.replace(/[°NSEW]/g, '')));
                        return alert.coords.includes('W') ? [coords[0], -coords[1]] : coords;
                      })()}>
                        <Popup><strong>{alert.user}</strong><br/>{alert.location}</Popup>
                      </Marker>
                      <Circle 
                        center={(() => {
                          const coords = alert.coords.split(',').map(c => parseFloat(c.replace(/[°NSEW]/g, '')));
                          return alert.coords.includes('W') ? [coords[0], -coords[1]] : coords;
                        })()} 
                        radius={500} 
                        pathOptions={{color:alert.severity==='critical'?'#ef4444':'#f59e0b',fillColor:alert.severity==='critical'?'#ef4444':'#f59e0b',fillOpacity:0.2}}
                      />
                    </MapContainer>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View Alert Details Modal */}
            {viewingAlert && (
              <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}} onClick={() => setViewingAlert(null)}>
                <motion.div
                  initial={{scale:0.9,opacity:0,y:20}}
                  animate={{scale:1,opacity:1,y:0}}
                  onClick={(e) => e.stopPropagation()}
                  style={{background:'#fff',padding:30,borderRadius:16,width:'90%',maxWidth:600,boxShadow:'0 20px 60px rgba(0,0,0,0.3)',border:'2px solid #ef4444'}}
                >
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
                    <h3 style={{margin:0,display:'flex',alignItems:'center',gap:10}}>
                      <FaExclamationTriangle style={{color:'#ef4444'}} /> Alert Details
                    </h3>
                    <button onClick={() => setViewingAlert(null)} style={{background:'transparent',border:'none',fontSize:20,cursor:'pointer',color:'#94a3b8'}}>×</button>
                  </div>
                  <div style={{display:'grid',gap:16}}>
                    <div style={{padding:16,background:'#f8fafc',borderRadius:8}}>
                      <div style={{display:'grid',gap:12}}>
                        <div><strong>🔔 Alert Type:</strong> {viewingAlert.type}</div>
                        <div><strong>👤 User:</strong> {viewingAlert.user}</div>
                        <div><strong>📍 Location:</strong> {viewingAlert.location}</div>
                        <div><strong>🌐 Coordinates:</strong> {viewingAlert.coords}</div>
                        <div><strong>⏰ Time:</strong> {viewingAlert.time}</div>
                        <div><strong>📝 Description:</strong> {viewingAlert.description}</div>
                        <div><strong>⚠️ Severity:</strong> <span style={{padding:'2px 8px',borderRadius:8,fontSize:12,background:viewingAlert.severity==='critical'?'#fee2e2':'#fef3c7',color:viewingAlert.severity==='critical'?'#991b1b':'#92400e'}}>{viewingAlert.severity.toUpperCase()}</span></div>
                        <div><strong>📊 Status:</strong> <span style={{padding:'2px 8px',borderRadius:8,fontSize:12,background:viewingAlert.status==='Active'?'#fee2e2':'#d1fae5',color:viewingAlert.status==='Active'?'#991b1b':'#065f46'}}>{viewingAlert.status}</span></div>
                      </div>
                    </div>
                    <div style={{height:300,borderRadius:12,overflow:'hidden',border:'2px solid #ef4444'}}>
                      <MapContainer 
                        key={`alert-detail-map-${viewingAlert.id}`}
                        center={(() => {
                          const coords = viewingAlert.coords.split(',').map(c => parseFloat(c.replace(/[°NSEW]/g, '')));
                          return viewingAlert.coords.includes('W') ? [coords[0], -coords[1]] : coords;
                        })()} 
                        zoom={14} 
                        style={{height:'100%',width:'100%'}} 
                        scrollWheelZoom={true}
                        zoomControl={true}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
                        <MapResizer />
                        <Marker position={(() => {
                          const coords = viewingAlert.coords.split(',').map(c => parseFloat(c.replace(/[°NSEW]/g, '')));
                          return viewingAlert.coords.includes('W') ? [coords[0], -coords[1]] : coords;
                        })()}>
                          <Popup>
                            <div style={{padding:8}}>
                              <strong>{viewingAlert.user}</strong><br/>
                              {viewingAlert.location}<br/>
                              <span style={{fontSize:11,color:viewingAlert.severity==='critical'?'#ef4444':'#f59e0b'}}>
                                {viewingAlert.type}
                              </span>
                            </div>
                          </Popup>
                        </Marker>
                        <Circle 
                          center={(() => {
                            const coords = viewingAlert.coords.split(',').map(c => parseFloat(c.replace(/[°NSEW]/g, '')));
                            return viewingAlert.coords.includes('W') ? [coords[0], -coords[1]] : coords;
                          })()} 
                          radius={800} 
                          pathOptions={{color:viewingAlert.severity==='critical'?'#ef4444':'#f59e0b',fillColor:viewingAlert.severity==='critical'?'#ef4444':'#f59e0b',fillOpacity:0.15}}
                        />
                      </MapContainer>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:12,marginTop:20}}>
                    {viewingAlert.status === 'Active' && (
                      <button onClick={() => { resolveAlert(viewingAlert.id); setViewingAlert(null); }} className="btn" style={{flex:1,background:'#10b981',color:'#fff'}}>✓ Resolve Alert</button>
                    )}
                    <button onClick={() => setViewingAlert(null)} className="btn btn-outline" style={{flex:1}}>Close</button>
                  </div>
                </motion.div>
              </div>
            )}
          </section>
        )}

        {activeTab === 'settings' && (
          <section className="reports-section">
            <h2>⚙️ System Settings</h2>
            
            {/* Appearance Settings */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="panel-card" style={{marginBottom:16}}>
              <div className="card-header">
                <div>
                  <div className="card-title">🎨 Appearance & Theme</div>
                  <div className="card-sub">Customize dashboard look and feel</div>
                </div>
              </div>
              <div className="card-body" style={{display:'grid',gap:16}}>
                <div>
                  <div style={{fontWeight:600,marginBottom:8}}>Accent Color</div>
                  <div style={{display:'flex',gap:8}}>
                    {['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899'].map(color=>(
                      <motion.div key={color} whileHover={{scale:1.1}} whileTap={{scale:0.95}} onClick={()=>saveSettings({accentColor:color})} style={{width:40,height:40,borderRadius:8,background:color,cursor:'pointer',border:settings.accentColor===color?'3px solid #0f172a':'none'}} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Notification Settings */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="panel-card" style={{marginBottom:16}}>
              <div className="card-header">
                <div>
                  <div className="card-title">🔔 Notification Preferences</div>
                  <div className="card-sub">Manage alert and notification settings</div>
                </div>
              </div>
              <div className="card-body" style={{display:'grid',gap:16}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:600}}>Sound Alerts</div>
                    <div style={{fontSize:12,color:'#64748b'}}>Play sound on new alerts</div>
                  </div>
                  <label style={{position:'relative',display:'inline-block',width:50,height:24}}>
                    <input type="checkbox" checked={settings.soundAlerts} onChange={(e)=>saveSettings({soundAlerts:e.target.checked})} style={{opacity:0,width:0,height:0}} />
                    <span style={{position:'absolute',cursor:'pointer',top:0,left:0,right:0,bottom:0,background:settings.soundAlerts?'#3b82f6':'#cbd5e1',borderRadius:24,transition:'0.3s'}}>
                      <span style={{position:'absolute',height:18,width:18,left:settings.soundAlerts?26:3,bottom:3,background:'#fff',borderRadius:'50%',transition:'0.3s'}} />
                    </span>
                  </label>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:600}}>Email Notifications</div>
                    <div style={{fontSize:12,color:'#64748b'}}>Receive alerts via email</div>
                  </div>
                  <label style={{position:'relative',display:'inline-block',width:50,height:24}}>
                    <input type="checkbox" checked={settings.emailNotifications} onChange={(e)=>saveSettings({emailNotifications:e.target.checked})} style={{opacity:0,width:0,height:0}} />
                    <span style={{position:'absolute',cursor:'pointer',top:0,left:0,right:0,bottom:0,background:settings.emailNotifications?'#3b82f6':'#cbd5e1',borderRadius:24,transition:'0.3s'}}>
                      <span style={{position:'absolute',height:18,width:18,left:settings.emailNotifications?26:3,bottom:3,background:'#fff',borderRadius:'50%',transition:'0.3s'}} />
                    </span>
                  </label>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:600}}>SMS Notifications</div>
                    <div style={{fontSize:12,color:'#64748b'}}>Receive alerts via SMS</div>
                  </div>
                  <label style={{position:'relative',display:'inline-block',width:50,height:24}}>
                    <input type="checkbox" checked={settings.smsNotifications} onChange={(e)=>saveSettings({smsNotifications:e.target.checked})} style={{opacity:0,width:0,height:0}} />
                    <span style={{position:'absolute',cursor:'pointer',top:0,left:0,right:0,bottom:0,background:settings.smsNotifications?'#3b82f6':'#cbd5e1',borderRadius:24,transition:'0.3s'}}>
                      <span style={{position:'absolute',height:18,width:18,left:settings.smsNotifications?26:3,bottom:3,background:'#fff',borderRadius:'50%',transition:'0.3s'}} />
                    </span>
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Map & Geo-Fence Settings */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="panel-card" style={{marginBottom:16}}>
              <div className="card-header">
                <div>
                  <div className="card-title">🌍 Map & Geo-Fence Settings</div>
                  <div className="card-sub">Configure map and location tracking</div>
                </div>
              </div>
              <div className="card-body" style={{display:'grid',gap:16}}>
                <div>
                  <div style={{fontWeight:600,marginBottom:8}}>Default Geo-Fence Radius</div>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <input type="range" min="1" max="20" value={settings.defaultTourRadius} onChange={(e)=>saveSettings({defaultTourRadius:Number(e.target.value)})} style={{flex:1}} />
                    <span style={{minWidth:60,padding:'6px 12px',background:'#f1f5f9',borderRadius:8,fontWeight:600}}>{settings.defaultTourRadius} km</span>
                  </div>
                </div>
                <div>
                  <div style={{fontWeight:600,marginBottom:8}}>Geo-Fence Sensitivity</div>
                  <select value={settings.geoFenceSensitivity} onChange={(e)=>saveSettings({geoFenceSensitivity:e.target.value})} style={{width:'100%',padding:10,border:'1px solid #e2e8f0',borderRadius:8}}>
                    <option value="low">Low - Less frequent alerts</option>
                    <option value="medium">Medium - Balanced</option>
                    <option value="high">High - More sensitive</option>
                  </select>
                </div>
                <div>
                  <div style={{fontWeight:600,marginBottom:8}}>Map Style</div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
                    {['street','satellite','night'].map(style=>(
                      <motion.div key={style} whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={()=>saveSettings({mapStyle:style})} style={{padding:12,borderRadius:8,border:settings.mapStyle===style?'2px solid #3b82f6':'1px solid rgba(0,229,255,0.2)',background:settings.mapStyle===style?'#1e40af':'#0f1724',color:'#fff',cursor:'pointer',textAlign:'center',fontWeight:settings.mapStyle===style?600:400,textTransform:'capitalize'}}>{style}</motion.div>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{fontWeight:600,marginBottom:8}}>Default Map Zoom Level</div>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <input type="range" min="8" max="18" value={settings.mapZoom} onChange={(e)=>saveSettings({mapZoom:Number(e.target.value)})} style={{flex:1}} />
                    <span style={{minWidth:40,padding:'6px 12px',background:'#f1f5f9',borderRadius:8,fontWeight:600}}>{settings.mapZoom}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI & Detection Settings */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="panel-card" style={{marginBottom:16}}>
              <div className="card-header">
                <div>
                  <div className="card-title">🤖 AI & Detection Settings</div>
                  <div className="card-sub">Configure AI-powered threat detection</div>
                </div>
              </div>
              <div className="card-body" style={{display:'grid',gap:16}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:600}}>AI Threat Detection</div>
                    <div style={{fontSize:12,color:'#64748b'}}>Enable AI-powered anomaly detection</div>
                  </div>
                  <label style={{position:'relative',display:'inline-block',width:50,height:24}}>
                    <input type="checkbox" checked={settings.aiDetection} onChange={(e)=>saveSettings({aiDetection:e.target.checked})} style={{opacity:0,width:0,height:0}} />
                    <span style={{position:'absolute',cursor:'pointer',top:0,left:0,right:0,bottom:0,background:settings.aiDetection?'#3b82f6':'#cbd5e1',borderRadius:24,transition:'0.3s'}}>
                      <span style={{position:'absolute',height:18,width:18,left:settings.aiDetection?26:3,bottom:3,background:'#fff',borderRadius:'50%',transition:'0.3s'}} />
                    </span>
                  </label>
                </div>
                <div>
                  <div style={{fontWeight:600,marginBottom:8}}>AI Sensitivity Level</div>
                  <select value={settings.aiSensitivity} onChange={(e)=>saveSettings({aiSensitivity:e.target.value})} style={{width:'100%',padding:10,border:'1px solid #e2e8f0',borderRadius:8}} disabled={!settings.aiDetection}>
                    <option value="low">Low - Fewer false positives</option>
                    <option value="medium">Medium - Balanced detection</option>
                    <option value="high">High - Maximum sensitivity</option>
                  </select>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:600}}>Auto Incident Report</div>
                    <div style={{fontSize:12,color:'#64748b'}}>Automatically create reports for AI detections</div>
                  </div>
                  <label style={{position:'relative',display:'inline-block',width:50,height:24}}>
                    <input type="checkbox" checked={settings.autoIncidentReport} onChange={(e)=>saveSettings({autoIncidentReport:e.target.checked})} style={{opacity:0,width:0,height:0}} disabled={!settings.aiDetection} />
                    <span style={{position:'absolute',cursor:'pointer',top:0,left:0,right:0,bottom:0,background:settings.autoIncidentReport&&settings.aiDetection?'#3b82f6':'#cbd5e1',borderRadius:24,transition:'0.3s',opacity:settings.aiDetection?1:0.5}}>
                      <span style={{position:'absolute',height:18,width:18,left:settings.autoIncidentReport?26:3,bottom:3,background:'#fff',borderRadius:'50%',transition:'0.3s'}} />
                    </span>
                  </label>
                </div>
              </div>
            </motion.div>

            {/* System Settings */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4}} className="panel-card" style={{marginBottom:16}}>
              <div className="card-header">
                <div>
                  <div className="card-title">🔧 System Settings</div>
                  <div className="card-sub">General system configuration</div>
                </div>
              </div>
              <div className="card-body" style={{display:'grid',gap:16}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:600}}>Maintenance Mode</div>
                    <div style={{fontSize:12,color:'#64748b'}}>Temporarily disable user-facing features</div>
                  </div>
                  <label style={{position:'relative',display:'inline-block',width:50,height:24}}>
                    <input type="checkbox" checked={settings.maintenanceMode} onChange={(e)=>saveSettings({maintenanceMode:e.target.checked})} style={{opacity:0,width:0,height:0}} />
                    <span style={{position:'absolute',cursor:'pointer',top:0,left:0,right:0,bottom:0,background:settings.maintenanceMode?'#ef4444':'#cbd5e1',borderRadius:24,transition:'0.3s'}}>
                      <span style={{position:'absolute',height:18,width:18,left:settings.maintenanceMode?26:3,bottom:3,background:'#fff',borderRadius:'50%',transition:'0.3s'}} />
                    </span>
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Admin Users */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.5}} className="panel-card" style={{marginBottom:16}}>
              <div className="card-header">
                <div>
                  <div className="card-title">👥 Admin Users</div>
                  <div className="card-sub">Manage administrator accounts</div>
                </div>
              </div>
              <div className="card-body">
                <div className="admin-list">
                  {settings.admins.map(a=> (
                    <div key={a.id} className="admin-item">
                      <div className="admin-meta">
                        <div style={{fontWeight:700}}>{a.name}</div>
                        <div style={{fontSize:12,color:'#64748b'}}>{a.email}</div>
                      </div>
                      <div>
                        <button onClick={()=>removeAdmin(a.id)} className="btn btn-danger">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{marginTop:8}}>
                  <AddAdminInline onAdd={(name,email)=>addAdmin(name,email)} />
                </div>
              </div>
            </motion.div>

            {/* Save/Reset Buttons */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.6}} style={{display:'flex',gap:12}}>
              <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={()=>{alert('Settings saved successfully!');}} className="btn btn-primary" style={{flex:1,padding:12,fontSize:16,fontWeight:600}}>💾 Save All Settings</motion.button>
              <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={()=>{if(window.confirm('Reset all settings to default?')){localStorage.removeItem('admin:settings'); window.location.reload();}}} className="btn btn-outline" style={{padding:12}}>🔄 Reset to Default</motion.button>
            </motion.div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;


