import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LeafletMapView from './Map/LeafletMapView';
import './UserProfileTailwind.css';

export default function UserProfileTailwind() {
  const navigate = useNavigate();
  // Load user from localStorage (simulates logged-in user); fallback to mock
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('safetour:user');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { id:1, name:'Asha Verma', email:'asha.verma@example.com', phone:'+91 98765 43210', avatar:null, joined:'2024-08-12' };
  });

  const [trip, setTrip] = useState({ from:'Delhi', to:'Agra', depart:'2025-11-12 08:00', notes:'Visiting Taj Mahal' });
  const [fences, setFences] = useState([{ id:1, name:'Hotel Zone', radius:0.5, status:'inside' },{ id:2, name:'Museum Area', radius:0.8, status:'outside' }]);
  const [alerts, setAlerts] = useState([{ id:1, title:'Suspicious crowd nearby', time:'10 mins ago', location:'Market Rd', severity:'warning' }]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: user.name, email: user.email, phone: user.phone });
  const fileRef = useRef(null);

  useEffect(()=>{
    // persist user to localStorage for demo
    try{ localStorage.setItem('safetour:user', JSON.stringify(user)); }catch(e){}
  },[user]);

  const onUpload = async (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setUser(u => ({ ...u, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleFile = (e) => onUpload(e.target.files?.[0]);

  const triggerUpload = () => fileRef.current?.click();

  const sos = () => {
    // demo animation + mock API call
    setAlerts(prev=>[{ id: Date.now(), title:'SOS triggered', time:'Just now', location:'Current location', severity:'critical' }, ...prev]);
    alert('SOS sent — mock');
  };

  const openEditModal = () => {
    setEditForm({ name: user.name, email: user.email, phone: user.phone });
    setIsEditing(true);
  };

  const closeEditModal = () => setIsEditing(false);

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    setUser({ ...user, ...editForm });
    setIsEditing(false);
  };

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          const shareText = `${user.name} is sharing their location: ${locationUrl}`;
          
          // Try native share API first
          if (navigator.share) {
            navigator.share({
              title: 'My Location - SafeTour',
              text: shareText,
              url: locationUrl
            }).catch(() => {
              // Fallback to clipboard
              copyToClipboard(locationUrl);
            });
          } else {
            // Fallback to clipboard
            copyToClipboard(locationUrl);
          }
        },
        () => {
          alert('Unable to access location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Location link copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy location.');
    });
  };

  return (
    <div className="min-h-screen relative bg-slate-900 text-slate-100">
      {/* Gradient animated shapes */}
      <div className="profile-bg" aria-hidden>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left column - profile */}
          <aside className="col-span-1">
            <motion.div whileHover={{ scale:1.02 }} className="glass p-6 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-teal-300 to-blue-400 flex items-center justify-center text-slate-900 font-bold text-2xl">
                  {user.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover"/> : user.name.split(' ').map(n=>n[0]).slice(0,2).join('')}
                </div>
                <div>
                  <div className="text-xl font-semibold">{user.name}</div>
                  <div className="text-sm text-slate-300">{user.email}</div>
                  <div className="text-sm text-slate-300">{user.phone}</div>
                </div>
              </div>

              <div className="mt-4">
                <button className="btn-primary w-full" onClick={triggerUpload}>Upload Photo</button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              </div>

              <div className="mt-4 text-sm text-slate-400">Joined {user.joined}</div>
              <div className="mt-4 flex gap-3">
                <button className="btn" onClick={openEditModal}>Edit Profile</button>
                <button className="btn border" onClick={shareLocation}>Share Location</button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.15 }} className="glass mt-6 p-4 rounded-2xl">
              <h4 className="text-white font-semibold mb-2">Trip Details</h4>
              <div className="text-sm text-slate-300">From <span className="font-medium text-slate-100">{trip.from}</span></div>
              <div className="text-sm text-slate-300">To <span className="font-medium text-slate-100">{trip.to}</span></div>
              <div className="text-sm text-slate-300">Depart <span className="font-medium text-slate-100">{trip.depart}</span></div>
              <p className="mt-2 text-slate-400 text-sm">{trip.notes}</p>
            </motion.div>

            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.25 }} className="glass mt-6 p-4 rounded-2xl">
              <h4 className="text-white font-semibold mb-2">Geo-Fencing</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {fences.map(f=> (
                  <li key={f.id} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{f.name}</div>
                      <div className="text-xs text-slate-400">Radius {f.radius} km</div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${f.status==='inside' ? 'bg-emerald-600/30 text-emerald-200' : 'bg-yellow-600/20 text-yellow-200'}`}>{f.status}</div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </aside>

          {/* Main column */}
          <main className="col-span-2 flex flex-col gap-6">
            <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} className="glass p-6 rounded-2xl flex flex-col lg:flex-row gap-6">

              <div className="flex-1">
                <h3 className="text-xl font-semibold">Location Preview</h3>
                <div className="mt-3 h-72 rounded-lg overflow-hidden">
                  <LeafletMapView />
                </div>
              </div>

              <div className="w-full lg:w-80">
                <h3 className="text-xl font-semibold">Emergency</h3>
                <p className="text-sm text-slate-300 mt-2">Press SOS to notify nearby responders and contacts.</p>
                <motion.button whileTap={{ scale:0.98 }} onClick={sos} className="mt-6 w-full bg-rose-500 hover:bg-rose-400 text-white font-bold py-3 rounded-xl shadow-lg">SOS</motion.button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="glass p-4 rounded-2xl col-span-2">
                <h4 className="text-white font-semibold mb-2">Safety Alerts</h4>
                {alerts.length===0 ? <div className="text-slate-400">No alerts</div> : (
                  <ul className="space-y-3">
                    {alerts.map(a=> (
                      <li key={a.id} className="p-3 rounded-md bg-slate-800/40 flex justify-between items-start">
                        <div>
                          <div className="font-medium">{a.title}</div>
                          <div className="text-xs text-slate-400">{a.time} • {a.location}</div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${a.severity==='warning' ? 'bg-yellow-500/20 text-yellow-200' : 'bg-slate-600/30 text-slate-200'}`}>{a.severity}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="glass p-4 rounded-2xl">
                <h4 className="text-white font-semibold mb-2">Quick Actions</h4>
                <div className="flex flex-col gap-3">
                  <button className="btn" onClick={() => navigate('/request-guide')}>Request Guide</button>
                  <button className="btn" onClick={() => navigate('/checkin')}>Check-in</button>
                  <button className="btn" onClick={() => navigate('/report-issue')}>Report Issue</button>
                </div>
              </div>
            </motion.div>
          </main>

        </motion.div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={closeEditModal}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="glass p-6 rounded-2xl max-w-md w-full mx-4" 
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-semibold mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={editForm.name} 
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={editForm.email} 
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Phone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={editForm.phone} 
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={saveProfile} className="btn-primary flex-1">Save Changes</button>
              <button onClick={closeEditModal} className="btn flex-1">Cancel</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
