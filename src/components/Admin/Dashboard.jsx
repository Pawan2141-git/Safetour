import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState } from 'react';

import { FaHome, FaMapMarkerAlt, FaUsers, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';import { FaHome, FaMapMarkerAlt, FaUsers, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

import './Dashboard.css';

import { useNavigate } from 'react-router-dom';import { FaHome, FaMapMarkerAlt, FaUsers, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {

  const navigate = useNavigate();import './Dashboard.css';

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [currentTime, setCurrentTime] = useState(new Date());import { useNavigate } from 'react-router-dom';import { FaHome, FaMapMarkerAlt, FaUsers, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

  const [selectedMenu, setSelectedMenu] = useState('dashboard');

const Dashboard = () => {

  useEffect(() => {

    const timer = setInterval(() => {  const [isSidebarOpen, setIsSidebarOpen] = useState(true);import './Dashboard.css';

      setCurrentTime(new Date());

    }, 1000);  const [currentTime, setCurrentTime] = useState(new Date());

    return () => clearInterval(timer);

  }, []);  const [selectedMenu, setSelectedMenu] = useState('dashboard');import { useNavigate } from 'react-router-dom';import { FaHome, FaMapMarkerAlt, FaUsers, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';



  const handleMenuClick = (menu) => {  const navigate = useNavigate();

    setSelectedMenu(menu);

  };const Dashboard = () => {



  const toggleSidebar = () => {  useEffect(() => {

    setIsSidebarOpen(!isSidebarOpen);

  };    const timer = setInterval(() => {  const [isSidebarOpen, setIsSidebarOpen] = useState(true);import './Admin.css';



  const handleLogout = () => {      setCurrentTime(new Date());

    navigate('/login');

  };    }, 1000);  const [currentTime, setCurrentTime] = useState(new Date());



  const stats = [    return () => clearInterval(timer);

    { title: 'Active Tours', value: '24', trend: 'up', percentage: '12%' },

    { title: 'Total Users', value: '1,284', trend: 'up', percentage: '8%' },  }, []);  const [selectedMenu, setSelectedMenu] = useState('dashboard');import './Admin.css';import { FaHome, FaMapMarkerAlt, FaUsers, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

    { title: 'Safety Alerts', value: '3', trend: 'down', percentage: '5%' },

    { title: 'Tour Guides', value: '45', trend: 'up', percentage: '15%' }

  ];

  const stats = [  const navigate = useNavigate();

  return (

    <div className="admin-container">    { title: 'Active Tours', value: '24', trend: 'up', percentage: '12%' },

      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>

        <div className="sidebar-header">    { title: 'Total Users', value: '1,284', trend: 'up', percentage: '8%' },const Dashboard = () => {

          <h2>SafeTour Admin</h2>

        </div>    { title: 'Safety Alerts', value: '3', trend: 'down', percentage: '5%' },

        <nav>

          <button     { title: 'Tour Guides', value: '45', trend: 'up', percentage: '15%' }  useEffect(() => {

            className={`nav-item ${selectedMenu === 'dashboard' ? 'active' : ''}`}

            onClick={() => handleMenuClick('dashboard')}  ];

          >

            <FaHome className="icon" />    const timer = setInterval(() => {  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

            <span>Dashboard</span>

          </button>  const handleMenuClick = (menu) => {

          <button 

            className={`nav-item ${selectedMenu === 'tours' ? 'active' : ''}`}    setSelectedMenu(menu);      setCurrentTime(new Date());

            onClick={() => handleMenuClick('tours')}

          >  };

            <FaMapMarkerAlt className="icon" />

            <span>Tours</span>    }, 1000);  const [currentTime, setCurrentTime] = useState(new Date());

          </button>

          <button   const toggleSidebar = () => {

            className={`nav-item ${selectedMenu === 'users' ? 'active' : ''}`}

            onClick={() => handleMenuClick('users')}    setIsSidebarOpen(!isSidebarOpen);

          >

            <FaUsers className="icon" />  };

            <span>Users</span>

          </button>    return () => clearInterval(timer);  const [selectedMenu, setSelectedMenu] = useState('dashboard');const Dashboard = () => {import './Admin.css';import { useNavigate } from 'react-router-dom';import { motion } from 'framer-motion';

          <button 

            className={`nav-item ${selectedMenu === 'alerts' ? 'active' : ''}`}  const handleLogout = () => {

            onClick={() => handleMenuClick('alerts')}

          >    navigate('/login');  }, []);

            <FaBell className="icon" />

            <span>Alerts</span>  };

          </button>

          <button   const navigate = useNavigate();

            className={`nav-item ${selectedMenu === 'settings' ? 'active' : ''}`}

            onClick={() => handleMenuClick('settings')}  return (

          >

            <FaCog className="icon" />    <div className="admin-container">  const stats = [

            <span>Settings</span>

          </button>      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>

        </nav>

      </aside>        <div className="sidebar-header">    { title: 'Active Tours', value: '24', trend: 'up', percentage: '12%' },  const [isSidebarOpen, setIsSidebarOpen] = useState(true);



      <main className="admin-main">          <h2>SafeTour Admin</h2>

        <div className="admin-topbar">

          <button onClick={toggleSidebar} className="toggle-sidebar">        </div>    { title: 'Total Users', value: '1,284', trend: 'up', percentage: '8%' },

            ☰

          </button>        <nav>

          <div className="user-info">

            <span className="time">{currentTime.toLocaleTimeString()}</span>          <button     { title: 'Safety Alerts', value: '3', trend: 'down', percentage: '5%' },  useEffect(() => {

            <span className="user">Admin User</span>

            <button className="logout-btn" onClick={handleLogout}>            className={`nav-item ${selectedMenu === 'dashboard' ? 'active' : ''}`}

              <FaSignOutAlt />

              <span>Logout</span>            onClick={() => handleMenuClick('dashboard')}    { title: 'Tour Guides', value: '45', trend: 'up', percentage: '15%' }

            </button>

          </div>          >

        </div>

            <FaHome className="icon" />  ];    const timer = setInterval(() => {  const [currentTime, setCurrentTime] = useState(new Date());

        <div className="stats-grid">

          {stats.map((stat, index) => (            Dashboard

            <div key={index} className="stat-card">

              <h3>{stat.title}</h3>          </button>

              <div className="stat-value">{stat.value}</div>

              <div className={`stat-trend ${stat.trend}`}>          <button 

                {stat.trend === 'up' ? '↑' : '↓'} {stat.percentage}

              </div>            className={`nav-item ${selectedMenu === 'tours' ? 'active' : ''}`}  const reports = [      setCurrentTime(new Date());

            </div>

          ))}            onClick={() => handleMenuClick('tours')}

        </div>

          >    {

        <section className="map-section">

          <h2>Active Tours</h2>            <FaMapMarkerAlt className="icon" />

          <div className="map-container">

            Map will be integrated here            Tours      id: 1,    }, 1000);  const [selectedMenu, setSelectedMenu] = useState('dashboard');

          </div>

        </section>          </button>

      </main>

    </div>          <button       location: 'Mount Everest Base Camp',

  );

};            className={`nav-item ${selectedMenu === 'users' ? 'active' : ''}`}



export default Dashboard;            onClick={() => handleMenuClick('users')}      status: 'safe',

          >

            <FaUsers className="icon" />      date: '2024-02-10',

            Users

          </button>      alerts: 0    return () => clearInterval(timer);const Dashboard = () => {import './Admin.css';import { useNavigate, Link } from 'react-router-dom';

          <button 

            className={`nav-item ${selectedMenu === 'alerts' ? 'active' : ''}`}    },

            onClick={() => handleMenuClick('alerts')}

          >    {  }, []);

            <FaBell className="icon" />

            Alerts      id: 2,

          </button>

          <button       location: 'Sahara Desert Trek',  useEffect(() => {

            className={`nav-item ${selectedMenu === 'settings' ? 'active' : ''}`}

            onClick={() => handleMenuClick('settings')}      status: 'warning',

          >

            <FaCog className="icon" />      date: '2024-02-10',  const stats = [

            Settings

          </button>      alerts: 2

        </nav>

      </aside>    },    { title: 'Active Tours', value: '24', trend: 'up', percentage: '12%' },    const timer = setInterval(() => {  const [isSidebarOpen, setIsSidebarOpen] = useState(true);



      <main className="admin-main">    {

        <div className="admin-topbar">

          <button onClick={toggleSidebar} className="toggle-sidebar">      id: 3,    { title: 'Total Users', value: '1,284', trend: 'up', percentage: '8%' },

            ☰

          </button>      location: 'Amazon Rainforest',

          <div className="user-info">

            <span>{currentTime.toLocaleTimeString()}</span>      status: 'alert',    { title: 'Safety Alerts', value: '3', trend: 'down', percentage: '5%' },      setCurrentTime(new Date());

            <span>Admin User</span>

            <button className="logout-btn" onClick={handleLogout}>      date: '2024-02-10',

              <FaSignOutAlt /> Logout

            </button>      alerts: 5    { title: 'Tour Guides', value: '45', trend: 'up', percentage: '15%' }

          </div>

        </div>    }



        <div className="stats-grid">  ];  ];    }, 1000);import LeafletMapView from '../Map/LeafletMapView';

          {stats.map((stat, index) => (

            <div key={index} className="stat-card">

              <h3>{stat.title}</h3>

              <div className="stat-value">{stat.value}</div>  const handleMenuClick = (menu) => {

              <div className={`stat-trend ${stat.trend}`}>

                {stat.trend === 'up' ? '↑' : '↓'} {stat.percentage}    setSelectedMenu(menu);

              </div>

            </div>  };  const reports = [

          ))}

        </div>



        <section className="reports-section">  const toggleSidebar = () => {    {

          <h2>Active Tours</h2>

          <div className="map-container">    setIsSidebarOpen(!isSidebarOpen);

            Map will be integrated here

          </div>  };      id: 1,    return () => clearInterval(timer);  const stats = [

        </section>

      </main>

    </div>

  );  const handleLogout = () => {      location: 'Mount Everest Base Camp',

};

    navigate('/login');

export default Dashboard;
  };      status: 'safe',  }, []);



  return (      date: '2024-02-10',

    <div className="admin-container">

      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>      alerts: 0    { title: 'Active Tours', value: '24', trend: 'up', percentage: '12%' },

        <div className="sidebar-header">

          <h2>SafeTour Admin</h2>    },

        </div>

            {  const stats = [

        <nav>

          <button       id: 2,

            className={`nav-item ${selectedMenu === 'dashboard' ? 'active' : ''}`}

            onClick={() => handleMenuClick('dashboard')}      location: 'Sahara Desert Trek',    { title: 'Active Tours', value: '24', trend: 'up', percentage: '12%' },    { title: 'Total Users', value: '1,284', trend: 'up', percentage: '8%' },

          >

            <FaHome className="icon" />      status: 'warning',

            Dashboard

          </button>      date: '2024-02-10',    { title: 'Total Users', value: '1,284', trend: 'up', percentage: '8%' },

          <button 

            className={`nav-item ${selectedMenu === 'tours' ? 'active' : ''}`}      alerts: 2

            onClick={() => handleMenuClick('tours')}

          >    },    { title: 'Safety Alerts', value: '3', trend: 'down', percentage: '5%' },    { title: 'Safety Alerts', value: '3', trend: 'down', percentage: '5%' },  const [sidebarOpen, setSidebarOpen] = useState(true);import GeoFencingZones from './GeoFencingZones';

            <FaMapMarkerAlt className="icon" />

            Tours    {

          </button>

          <button       id: 3,    { title: 'Tour Guides', value: '45', trend: 'up', percentage: '15%' }

            className={`nav-item ${selectedMenu === 'users' ? 'active' : ''}`}

            onClick={() => handleMenuClick('users')}      location: 'Amazon Rainforest',

          >

            <FaUsers className="icon" />      status: 'alert',  ];    { title: 'Tour Guides', value: '45', trend: 'up', percentage: '15%' }

            Users

          </button>      date: '2024-02-10',

          <button 

            className={`nav-item ${selectedMenu === 'alerts' ? 'active' : ''}`}      alerts: 5

            onClick={() => handleMenuClick('alerts')}

          >    }

            <FaBell className="icon" />

            Alerts  ];  const reports = [  ];  const [selectedMenu, setSelectedMenu] = useState('dashboard');import Analytics from './Analytics';

          </button>

          <button 

            className={`nav-item ${selectedMenu === 'settings' ? 'active' : ''}`}

            onClick={() => handleMenuClick('settings')}  const handleMenuClick = (menu) => {    {

          >

            <FaCog className="icon" />    setSelectedMenu(menu);

            Settings

          </button>  };      id: 1,

        </nav>

      </aside>



      <main className="admin-main">  const toggleSidebar = () => {      location: 'Mount Everest Base Camp',

        <div className="admin-topbar">

          <button onClick={toggleSidebar} className="toggle-sidebar">    setIsSidebarOpen(!isSidebarOpen);

            ☰

          </button>  };      status: 'safe',  const reports = [  const navigate = useNavigate();import SystemSettings from './SystemSettings';

          <div className="user-info">

            <span>{currentTime.toLocaleTimeString()}</span>

            <span>Admin User</span>

            <button className="logout-btn" onClick={handleLogout}>  const handleLogout = () => {      date: '2024-02-10',

              <FaSignOutAlt /> Logout

            </button>    navigate('/login');

          </div>

        </div>  };      alerts: 0    {



        <div className="stats-grid">

          {stats.map((stat, index) => (

            <div key={index} className="stat-card">  return (    },

              <h3>{stat.title}</h3>

              <div className="stat-value">{stat.value}</div>    <div className="admin-container">

              <div className={`stat-trend ${stat.trend}`}>

                {stat.trend === 'up' ? '↑' : '↓'} {stat.percentage}      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>    {      id: 1,

              </div>

            </div>        <div className="sidebar-header">

          ))}

        </div>          <h2>SafeTour Admin</h2>      id: 2,



        <section className="reports-section">        </div>

          <h2>Active Tours</h2>

          <table className="reports-table">              location: 'Sahara Desert Trek',      location: 'Mount Everest Base Camp',

            <thead>

              <tr>        <nav>

                <th>Location</th>

                <th>Status</th>          <button       status: 'warning',

                <th>Date</th>

                <th>Alerts</th>            className={`nav-item ${selectedMenu === 'dashboard' ? 'active' : ''}`}

                <th>Actions</th>

              </tr>            onClick={() => handleMenuClick('dashboard')}      date: '2024-02-10',      status: 'safe',  const handleLogout = () => {const Dashboard = ({ darkMode, toggleDarkMode }) => {

            </thead>

            <tbody>          >

              {reports.map(report => (

                <tr key={report.id}>            <FaHome className="icon" />      alerts: 2

                  <td>{report.location}</td>

                  <td>            Dashboard

                    <span className={`status-badge ${report.status}`}>

                      {report.status.toUpperCase()}          </button>    },      date: '2024-02-10',

                    </span>

                  </td>          <button 

                  <td>{report.date}</td>

                  <td>{report.alerts}</td>            className={`nav-item ${selectedMenu === 'tours' ? 'active' : ''}`}    {

                  <td>

                    <div className="action-buttons">            onClick={() => handleMenuClick('tours')}

                      <button className="view-btn">View</button>

                      <button className="respond-btn">Respond</button>          >      id: 3,      alerts: 0    // Add logout logic here  const navigate = useNavigate();

                    </div>

                  </td>            <FaMapMarkerAlt className="icon" />

                </tr>

              ))}            Tours      location: 'Amazon Rainforest',

            </tbody>

          </table>          </button>

        </section>

          <button       status: 'alert',    },

        <section className="map-section">

          <h2>Tour Locations</h2>            className={`nav-item ${selectedMenu === 'users' ? 'active' : ''}`}

          <div className="map-container">

            Map will be integrated here            onClick={() => handleMenuClick('users')}      date: '2024-02-10',

          </div>

        </section>          >

      </main>

    </div>            <FaUsers className="icon" />      alerts: 5    {    navigate('/login');  const [activeTab, setActiveTab] = useState('overview');

  );

};            Users



export default Dashboard;          </button>    }

          <button 

            className={`nav-item ${selectedMenu === 'alerts' ? 'active' : ''}`}  ];      id: 2,

            onClick={() => handleMenuClick('alerts')}

          >

            <FaBell className="icon" />

            Alerts  const handleMenuClick = (menu) => {      location: 'Sahara Desert Trek',  };  const [sidebarOpen, setSidebarOpen] = useState(false);

          </button>

          <button     setSelectedMenu(menu);

            className={`nav-item ${selectedMenu === 'settings' ? 'active' : ''}`}

            onClick={() => handleMenuClick('settings')}  };      status: 'warning',

          >

            <FaCog className="icon" />

            Settings

          </button>  const toggleSidebar = () => {      date: '2024-02-10',

        </nav>

      </aside>    setIsSidebarOpen(!isSidebarOpen);



      <main className="admin-main">  };      alerts: 2

        <div className="admin-topbar">

          <button onClick={toggleSidebar} className="toggle-sidebar">

            ☰

          </button>  const handleLogout = () => {    },  const mockReports = [  const handleLogout = () => {

          <div className="user-info">

            <span>{currentTime.toLocaleTimeString()}</span>    // Add logout logic here

            <span>Admin User</span>

            <button className="logout-btn" onClick={handleLogout}>    console.log('Logging out...');    {

              <FaSignOutAlt /> Logout

            </button>  };

          </div>

        </div>      id: 3,    { id: 1, touristName: 'John Doe', location: 'Mountain Trail A', status: 'Alert', timestamp: '2 mins ago' },    // Here you would normally clear the admin's session/token



        <div className="stats-grid">  return (

          {stats.map((stat, index) => (

            <div key={index} className="stat-card">    <div className="admin-container">      location: 'Amazon Rainforest',

              <h3>{stat.title}</h3>

              <div className="stat-value">{stat.value}</div>      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>

              <div className={`stat-trend ${stat.trend}`}>

                {stat.trend === 'up' ? '↑' : '↓'} {stat.percentage}        <div className="sidebar-header">      status: 'alert',    { id: 2, touristName: 'Jane Smith', location: 'Beach Zone B', status: 'Safe', timestamp: '5 mins ago' },    navigate('/login');

              </div>

            </div>          <h2>SafeTour Admin</h2>

          ))}

        </div>        </div>      date: '2024-02-10',



        <section className="reports-section">        

          <h2>Active Tours</h2>

          <table className="reports-table">        <nav>      alerts: 5    { id: 3, touristName: 'Mike Johnson', location: 'City Center', status: 'Warning', timestamp: '10 mins ago' },  };

            <thead>

              <tr>          <button 

                <th>Location</th>

                <th>Status</th>            className={`nav-item ${selectedMenu === 'dashboard' ? 'active' : ''}`}    }

                <th>Date</th>

                <th>Alerts</th>            onClick={() => handleMenuClick('dashboard')}

                <th>Actions</th>

              </tr>          >  ];    { id: 4, touristName: 'Sarah Wilson', location: 'Historic District', status: 'Safe', timestamp: '15 mins ago' },

            </thead>

            <tbody>            <FaHome className="icon" />

              {reports.map(report => (

                <tr key={report.id}>            Dashboard

                  <td>{report.location}</td>

                  <td>          </button>

                    <span className={`status-badge ${report.status}`}>

                      {report.status.toUpperCase()}          <button   const toggleSidebar = () => {  ];  // Mock data for dashboard

                    </span>

                  </td>            className={`nav-item ${selectedMenu === 'tours' ? 'active' : ''}`}

                  <td>{report.date}</td>

                  <td>{report.alerts}</td>            onClick={() => handleMenuClick('tours')}    setIsSidebarOpen(!isSidebarOpen);

                  <td>

                    <div className="action-buttons">          >

                      <button className="view-btn">View</button>

                      <button className="respond-btn">Respond</button>            <FaMapMarkerAlt className="icon" />  };  const stats = {

                    </div>

                  </td>            Tours

                </tr>

              ))}          </button>

            </tbody>

          </table>          <button 

        </section>

            className={`nav-item ${selectedMenu === 'users' ? 'active' : ''}`}  return (  return (    totalUsers: 1247,

        <section className="map-section">

          <h2>Tour Locations</h2>            onClick={() => handleMenuClick('users')}

          <div className="map-container">

            Map will be integrated here          >    <div className="admin-container">

          </div>

        </section>            <FaUsers className="icon" />

      </main>

    </div>            Users      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>    <div className="admin-container">    activeAlerts: 8,

  );

};          </button>



export default Dashboard;          <button         <div className="sidebar-header">

            className={`nav-item ${selectedMenu === 'alerts' ? 'active' : ''}`}

            onClick={() => handleMenuClick('alerts')}          <h2>SafeTour Admin</h2>      {/* Sidebar */}    resolvedIncidents: 124,

          >

            <FaBell className="icon" />        </div>

            Alerts

          </button>              <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>    systemUptime: 98.7

          <button 

            className={`nav-item ${selectedMenu === 'settings' ? 'active' : ''}`}        <nav>

            onClick={() => handleMenuClick('settings')}

          >          <button className="nav-item active">        <div className="sidebar-header">  };

            <FaCog className="icon" />

            Settings            <FaHome className="icon" />

          </button>

        </nav>            Dashboard          <img src="/logo.png" alt="SafeTour Logo" className="logo" />

      </aside>

          </button>

      <main className="admin-main">

        <div className="admin-topbar">          <button className="nav-item">          <h2>SafeTour Admin</h2>  const recentAlerts = [

          <button onClick={toggleSidebar} className="toggle-sidebar">

            ☰            <FaMapMarkerAlt className="icon" />

          </button>

          <div className="user-info">            Tours        </div>    { id: 1, user: 'John Doe', location: 'Central Park', time: '2 mins ago', status: 'Active' },

            <span>{currentTime.toLocaleTimeString()}</span>

            <span>Admin User</span>          </button>

            <button className="logout-btn" onClick={handleLogout}>

              <FaSignOutAlt /> Logout          <button className="nav-item">        <nav className="sidebar-nav">    { id: 2, user: 'Jane Smith', location: 'Times Square', time: '15 mins ago', status: 'Resolved' },

            </button>

          </div>            <FaUsers className="icon" />

        </div>

            Users          {[    { id: 3, user: 'Robert Johnson', location: 'Brooklyn Bridge', time: '32 mins ago', status: 'Active' },

        <div className="stats-grid">

          {stats.map((stat, index) => (          </button>

            <div key={index} className="stat-card">

              <h3>{stat.title}</h3>          <button className="nav-item">            { id: 'dashboard', icon: '📊', label: 'Dashboard' },    { id: 4, user: 'Emily Davis', location: 'Empire State Building', time: '1 hour ago', status: 'Resolved' }

              <div className="stat-value">{stat.value}</div>

              <div className={`stat-trend ${stat.trend}`}>            <FaBell className="icon" />

                {stat.trend === 'up' ? '↑' : '↓'} {stat.percentage}

              </div>            Alerts            { id: 'alerts', icon: '🚨', label: 'Tourist Alerts' },  ];

            </div>

          ))}          </button>

        </div>

          <button className="nav-item">            { id: 'reports', icon: '📝', label: 'Incident Reports' },

        <section className="reports-section">

          <h2>Active Tours</h2>            <FaCog className="icon" />

          <table className="reports-table">

            <thead>            Settings            { id: 'map', icon: '🗺️', label: 'Map Monitoring' },  const users = [

              <tr>

                <th>Location</th>          </button>

                <th>Status</th>

                <th>Date</th>        </nav>            { id: 'settings', icon: '⚙️', label: 'Settings' },    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', lastLogin: '2 hours ago' },

                <th>Alerts</th>

                <th>Actions</th>      </aside>

              </tr>

            </thead>          ].map((item) => (    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', lastLogin: '5 hours ago' },

            <tbody>

              {reports.map(report => (      <main className="admin-main">

                <tr key={report.id}>

                  <td>{report.location}</td>        <div className="admin-topbar">            <button    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', status: 'Inactive', lastLogin: '1 day ago' },

                  <td>

                    <span className={`status-badge ${report.status}`}>          <button onClick={toggleSidebar} className="toggle-sidebar">

                      {report.status.toUpperCase()}

                    </span>            ☰              key={item.id}    { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'Active', lastLogin: '30 mins ago' }

                  </td>

                  <td>{report.date}</td>          </button>

                  <td>{report.alerts}</td>

                  <td>          <div className="user-info">              className={`nav-item ${selectedMenu === item.id ? 'active' : ''}`}  ];

                    <div className="action-buttons">

                      <button className="view-btn">View</button>            <span>Admin User</span>

                      <button className="respond-btn">Respond</button>

                    </div>            <button className="logout-btn">              onClick={() => setSelectedMenu(item.id)}

                  </td>

                </tr>              <FaSignOutAlt /> Logout

              ))}

            </tbody>            </button>            >  return (

          </table>

        </section>          </div>



        <section className="map-section">        </div>              <span className="icon">{item.icon}</span>    <div className="admin-container">

          <h2>Tour Locations</h2>

          <div className="map-container">

            Map will be integrated here

          </div>        <div className="stats-grid">              <span className="label">{item.label}</span>      {/* Sidebar */}

        </section>

      </main>          {stats.map((stat, index) => (

    </div>

  );            <div key={index} className="stat-card">            </button>      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''} bg-white dark:bg-gray-800 shadow-xl`}>

};

              <h3>{stat.title}</h3>

export default Dashboard;
              <div className="stat-value">{stat.value}</div>          ))}        <div className="sidebar-header p-6 border-b border-gray-200 dark:border-gray-700">

              <div className={`stat-trend ${stat.trend}`}>

                {stat.trend === 'up' ? '↑' : '↓'} {stat.percentage}        </nav>          <div className="flex items-center space-x-3">

              </div>

            </div>      </div>            <i className="fas fa-shield-alt text-2xl text-blue-600 dark:text-blue-400"></i>

          ))}

        </div>            <h2 className="text-xl font-bold text-gray-800 dark:text-white">SafeTour Admin</h2>



        <section className="reports-section">      {/* Main Content */}          </div>

          <h2>Active Tours</h2>

          <table className="reports-table">      <div className="admin-main">          <button 

            <thead>

              <tr>        {/* Top Navigation */}            className="sidebar-toggle text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" 

                <th>Location</th>

                <th>Status</th>        <div className="admin-topbar">            onClick={() => setSidebarOpen(!sidebarOpen)}

                <th>Date</th>

                <th>Alerts</th>          <button          >

                <th>Actions</th>

              </tr>            className="toggle-sidebar"            <i className="fas fa-times"></i>

            </thead>

            <tbody>            onClick={() => setSidebarOpen(!sidebarOpen)}          </button>

              {reports.map(report => (

                <tr key={report.id}>          >        </div>

                  <td>{report.location}</td>

                  <td>            ☰        <ul className="sidebar-menu p-4 space-y-2">

                    <span className={`status-badge ${report.status}`}>

                      {report.status.toUpperCase()}          </button>          <li 

                    </span>

                  </td>          <div className="topbar-right">            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 

                  <td>{report.date}</td>

                  <td>{report.alerts}</td>            <div className="user-info">              ${activeTab === 'overview' 

                  <td>

                    <div className="action-buttons">              <span className="user-name">Admin User</span>                ? 'bg-blue-500 text-white shadow-md' 

                      <button className="view-btn">View</button>

                      <button className="respond-btn">Respond</button>              <button className="logout-btn" onClick={handleLogout}>                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`} 

                    </div>

                  </td>                Logout            onClick={() => setActiveTab('overview')}

                </tr>

              ))}              </button>          >

            </tbody>

          </table>            </div>            <i className="fas fa-home text-lg"></i>

        </section>

          </div>            <span className="font-medium">Dashboard</span>

        <section className="map-section">

          <h2>Tour Locations</h2>        </div>          </li>

          <div className="map-container">

            Map will be integrated here          <li 

          </div>

        </section>        {/* Content Area */}            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 

      </main>

    </div>        <div className="admin-content">              ${activeTab === 'users' 

  );

};          {/* Stats Cards */}                ? 'bg-blue-500 text-white shadow-md' 



export default Dashboard;          <div className="stats-grid">                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}

            {[            onClick={() => setActiveTab('users')}

              { label: 'Active Tourists', value: '1,234', trend: '+5%' },          >

              { label: 'Safety Alerts', value: '23', trend: '-2%' },            <i className="fas fa-users text-lg"></i>

              { label: 'Safe Zones', value: '45', trend: '0%' },            <span className="font-medium">User Management</span>

              { label: 'Response Time', value: '2.3m', trend: '-30s' },          </li>

            ].map((stat, index) => (          <li 

              <div key={index} className="stat-card">            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 

                <h3>{stat.label}</h3>              ${activeTab === 'alerts' 

                <div className="stat-value">{stat.value}</div>                ? 'bg-blue-500 text-white shadow-md' 

                <div className={`stat-trend ${stat.trend.startsWith('+') ? 'up' : 'down'}`}>                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}

                  {stat.trend}            onClick={() => setActiveTab('alerts')}

                </div>          >

              </div>            <i className="fas fa-bell text-lg"></i>

            ))}            <span className="font-medium">Alerts & Incidents</span>

          </div>          </li>

          <li 

          {/* Reports Table */}            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 

          <div className="reports-section">              ${activeTab === 'zones' 

            <h2>Recent Reports</h2>                ? 'bg-blue-500 text-white shadow-md' 

            <div className="reports-table-container">                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}

              <table className="reports-table">            onClick={() => setActiveTab('zones')}

                <thead>          >

                  <tr>            <i className="fas fa-map-marked-alt text-lg"></i>

                    <th>Tourist Name</th>            <span className="font-medium">Geo-Fencing Zones</span>

                    <th>Location</th>          </li>

                    <th>Status</th>          <li 

                    <th>Time</th>            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 

                    <th>Actions</th>              ${activeTab === 'analytics' 

                  </tr>                ? 'bg-blue-500 text-white shadow-md' 

                </thead>                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}

                <tbody>            onClick={() => setActiveTab('analytics')}

                  {mockReports.map((report) => (          >

                    <tr key={report.id}>            <i className="fas fa-chart-bar text-lg"></i>

                      <td>{report.touristName}</td>            <span className="font-medium">Analytics</span>

                      <td>{report.location}</td>          </li>

                      <td>          <li 

                        <span className={`status-badge ${report.status.toLowerCase()}`}>            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 

                          {report.status}              ${activeTab === 'settings' 

                        </span>                ? 'bg-blue-500 text-white shadow-md' 

                      </td>                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}

                      <td>{report.timestamp}</td>            onClick={() => setActiveTab('settings')}

                      <td>          >

                        <div className="action-buttons">            <i className="fas fa-cog text-lg"></i>

                          <button className="view-btn">View</button>            <span className="font-medium">System Settings</span>

                          <button className="respond-btn">Respond</button>          </li>

                        </div>        </ul>

                      </td>      </div>

                    </tr>

                  ))}      {/* Main Content */}

                </tbody>      <div className="admin-main flex flex-col flex-1 overflow-hidden">

              </table>        {/* Top Bar */}

            </div>        <div className="admin-topbar bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">

          </div>          <div className="flex items-center justify-between">

            <div className="flex items-center space-x-4">

          {/* Map Section */}              <button 

          <div className="map-section">                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none" 

            <h2>Live Map</h2>                onClick={() => setSidebarOpen(!sidebarOpen)}

            <div className="map-container">              >

              {/* Map component will be integrated here */}                <i className="fas fa-bars text-xl"></i>

              <div className="map-placeholder">              </button>

                Interactive Map Loading...              <div className="hidden md:flex items-center space-x-2">

              </div>                <span className="text-sm text-gray-500 dark:text-gray-400">

            </div>                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

          </div>                </span>

        </div>              </div>

      </div>            </div>

    </div>            <div className="flex items-center space-x-4">

  );              <div className="relative">

};                <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">

                  <i className="fas fa-bell text-xl"></i>

export default Dashboard;                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-200">
          <div className="container mx-auto">
            {activeTab === 'overview' && (
              <>
                {/* Welcome Section */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    Welcome back, Admin!
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Here's what's happening with your tourist safety system today.
                  </p>
                </motion.div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-white/20 rounded-full p-3">
                        <i className="fas fa-users text-white text-xl"></i>
                      </div>
                      <span className="text-xs font-medium text-blue-100 bg-white/20 px-2 py-1 rounded-full">
                        Last 24h
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</h2>
                      <p className="text-blue-100 text-sm">Total Users</p>
                    </div>
                    <div className="mt-4 flex items-center text-blue-100 text-sm">
                      <i className="fas fa-arrow-up mr-1"></i>
                      <span>12% increase</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg p-6 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-white/20 rounded-full p-3">
                        <i className="fas fa-exclamation-triangle text-white text-xl"></i>
                      </div>
                      <span className="text-xs font-medium text-red-100 bg-white/20 px-2 py-1 rounded-full">
                        Active Now
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-white">{stats.activeAlerts}</h2>
                      <p className="text-red-100 text-sm">Active Alerts</p>
                    </div>
                    <div className="mt-4 flex items-center text-red-100 text-sm">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      <span>Requires attention</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-white/20 rounded-full p-3">
                        <i className="fas fa-check-circle text-white text-xl"></i>
                      </div>
                      <span className="text-xs font-medium text-green-100 bg-white/20 px-2 py-1 rounded-full">
                        Today
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-white">{stats.resolvedIncidents}</h2>
                      <p className="text-green-100 text-sm">Resolved Incidents</p>
                    </div>
                    <div className="mt-4 flex items-center text-green-100 text-sm">
                      <i className="fas fa-chart-line mr-1"></i>
                      <span>15% improvement</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-white/20 rounded-full p-3">
                        <i className="fas fa-server text-white text-xl"></i>
                      </div>
                      <span className="text-xs font-medium text-purple-100 bg-white/20 px-2 py-1 rounded-full">
                        System
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-white">{stats.systemUptime}%</h2>
                      <p className="text-purple-100 text-sm">System Uptime</p>
                    </div>
                    <div className="mt-4 flex items-center text-purple-100 text-sm">
                      <i className="fas fa-signal mr-1"></i>
                      <span>Excellent performance</span>
                    </div>
                  </motion.div>
                </div>

                {/* Map and Analytics Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Live Tourist Tracking</h2>
                      <LeafletMapView />
                      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                        <p>🟢 Safe | 🟡 Warning | 🔴 Danger</p>
                        <p className="mt-2">Real-time tracking updates every 5 seconds. Geo-fencing alerts are enabled.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200 mb-6">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Safety Statistics</h2>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-base font-medium text-blue-700 dark:text-blue-300">Safe Tourists</span>
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">75%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '75%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-base font-medium text-yellow-700 dark:text-yellow-300">Warning Zones</span>
                            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">15%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-yellow-500 h-2.5 rounded-full" style={{width: '15%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-base font-medium text-red-700 dark:text-red-300">Danger Areas</span>
                            <span className="text-sm font-medium text-red-700 dark:text-red-300">10%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-red-600 h-2.5 rounded-full" style={{width: '10%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Incidents</h2>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Medical Emergency</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">2 minutes ago</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-3 h-3 bg-orange-500 rounded-full mt-2"></div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Theft Reported</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">15 minutes ago</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Accident</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">1 hour ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User List */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Active Users</h2>
                    <Link to="#" className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      Manage Users
                    </Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th>Last Login</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              <span className={`status ${user.status.toLowerCase()}`}>
                                {user.status}
                              </span>
                            </td>
                            <td>{user.lastLogin}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Alerts */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Alerts</h2>
                    <Link to="#" className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      View All
                    </Link>
                  </div>
                  <div className="alerts-table">
                    <table>
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Location</th>
                          <th>Time</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentAlerts.map(alert => (
                          <tr key={alert.id}>
                            <td>{alert.user}</td>
                            <td>{alert.location}</td>
                            <td>{alert.time}</td>
                            <td>
                              <span className={`status ${alert.status.toLowerCase()}`}>
                                {alert.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'zones' && <GeoFencingZones />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'settings' && <SystemSettings />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
