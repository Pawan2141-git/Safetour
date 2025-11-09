import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Features from './components/Features';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserDashboard from './components/Auth/UserDashboard';
import AdminDashboard from './components/Admin/Dashboard';
import UserProfileTailwind from './components/UserProfileTailwind';
import './App.css';
import './components/Auth/Dashboard.css';
// Use the cleaned admin stylesheet temporarily while the original Admin.css is repaired
import './components/Admin/Admin.clean.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/features"
            element={
              <>
                <Navbar />
                <Features />
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <About />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Navbar />
                <Register />
                <Footer />
              </>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <>
                <Navbar />
                <UserDashboard />
                <Footer />
              </>
            }
          />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/profile" element={<UserProfileTailwind />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;