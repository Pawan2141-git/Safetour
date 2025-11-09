import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock data for user locations
const mockUserLocations = [
  { id: 1, name: 'John Doe', longitude: 77.2090, latitude: 28.6139, status: 'safe' },
  { id: 2, name: 'Jane Smith', longitude: 77.2290, latitude: 28.6339, status: 'warning' },
  { id: 3, name: 'Robert Johnson', longitude: 77.2490, latitude: 28.6539, status: 'danger' },
  { id: 4, name: 'Emily Davis', longitude: 77.2690, latitude: 28.6739, status: 'safe' },
  { id: 5, name: 'Michael Brown', longitude: 77.1890, latitude: 28.5939, status: 'safe' }
];

// Mock data for incident markers
const mockIncidents = [
  { id: 1, longitude: 77.2190, latitude: 28.6239, type: 'medical', description: 'Medical emergency' },
  { id: 2, longitude: 77.2390, latitude: 28.6439, type: 'theft', description: 'Reported theft' },
  { id: 3, longitude: 77.2590, latitude: 28.6639, type: 'accident', description: 'Minor accident' }
];

// Define geo-fencing zones (safe areas)
const geoFences = [
  { id: 1, center: [28.6139, 77.2090], radius: 2000, name: 'Central Park Safe Zone' },
  { id: 2, center: [28.6339, 77.2290], radius: 1500, name: 'Museum District Safe Zone' }
];

// Function to get marker color based on status
const getMarkerColor = (status) => {
  switch (status) {
    case 'safe':
      return '#4CAF50';
    case 'warning':
      return '#FFC107';
    case 'danger':
      return '#F44336';
    default:
      return '#2196F3';
  }
};

// Function to get incident marker color based on type
const getIncidentColor = (type) => {
  switch (type) {
    case 'medical':
      return '#F44336';
    case 'theft':
      return '#FF9800';
    case 'accident':
      return '#9C27B0';
    default:
      return '#2196F3';
  }
};

// Function to create custom marker icon
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

// Function to create incident marker icon
const createIncidentIcon = (color) => {
  return L.divIcon({
    className: 'incident-marker',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

// Create a wrapper component for the map to ensure proper React context
const MapWrapper = () => {
  const [userLocations, setUserLocations] = useState(mockUserLocations);
  const [currentUserLocation, setCurrentUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]);
  const mapRef = useRef();

  // Function to check if user is inside a geo-fence
  const isInsideGeoFence = (userLocation, fence) => {
    const earthRadius = 6371000; // meters
    const dLat = (fence.center[0] - userLocation.latitude) * Math.PI / 180;
    const dLon = (fence.center[1] - userLocation.longitude) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(userLocation.latitude * Math.PI / 180) * Math.cos(fence.center[0] * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = earthRadius * c;
    return distance <= fence.radius;
  };

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentUserLocation({ latitude, longitude });
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.log('Location access denied, using default location');
        }
      );
    }
  }, []);

  // Function to simulate real-time tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setUserLocations(prevLocations => 
        prevLocations.map(location => {
          // Randomly move users slightly
          const newLongitude = location.longitude + (Math.random() - 0.5) * 0.01;
          const newLatitude = location.latitude + (Math.random() - 0.5) * 0.01;
          
          // Check geo-fencing alerts
          let newStatus = location.status;
          let isInSafeZone = false;
          
          for (const fence of geoFences) {
            if (isInsideGeoFence({longitude: newLongitude, latitude: newLatitude}, fence)) {
              isInSafeZone = true;
              break;
            }
          }
          
          if (!isInSafeZone && location.status !== 'danger') {
            newStatus = 'warning'; // Outside safe zone
          } else if (isInSafeZone && location.status === 'warning') {
            newStatus = 'safe'; // Back in safe zone
          }
          
          return {
            ...location,
            longitude: newLongitude,
            latitude: newLatitude,
            status: newStatus
          };
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={mapCenter}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      
      {/* Geo-fencing circles */}
      {geoFences.map(fence => (
        <Circle
          key={fence.id}
          center={fence.center}
          radius={fence.radius}
          fillColor="rgba(76, 175, 80, 0.2)"
          color="#4CAF50"
          weight={2}
        >
          <Popup>{fence.name}</Popup>
        </Circle>
      ))}
      
      {/* Current user location marker */}
      {currentUserLocation && (
        <Marker
          position={[currentUserLocation.latitude, currentUserLocation.longitude]}
          icon={createCustomIcon('#2196F3')}
        >
          <Popup>
            <div className="popup-content">
              <h3>Your Location</h3>
              <p>Status: <span className="status safe">Active</span></p>
              <p>Location: {currentUserLocation.latitude.toFixed(4)}, {currentUserLocation.longitude.toFixed(4)}</p>
            </div>
          </Popup>
        </Marker>
      )}
      
      {/* Geo-fence circle around user */}
      {currentUserLocation && (
        <Circle
          center={[currentUserLocation.latitude, currentUserLocation.longitude]}
          radius={500}
          fillColor="rgba(33, 150, 243, 0.1)"
          color="#2196F3"
          weight={2}
        >
          <Popup>Your Safe Zone (500m radius)</Popup>
        </Circle>
      )}
      
      {/* Incident markers */}
      {mockIncidents.map(incident => (
        <Marker
          key={incident.id}
          position={[incident.latitude, incident.longitude]}
          icon={createIncidentIcon(getIncidentColor(incident.type))}
        >
          <Popup>
            <div className="popup-content">
              <h3>Incident Report</h3>
              <p>Type: <span className={`incident ${incident.type}`}>{incident.type}</span></p>
              <p>Description: {incident.description}</p>
              <p>Location: {incident.latitude.toFixed(4)}, {incident.longitude.toFixed(4)}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

const LeafletMapView = () => {
  return (
    <div style={{ height: '500px', width: '100%', borderRadius: '1rem', overflow: 'hidden' }}>
      <MapWrapper />
    </div>
  );
};

export default LeafletMapView;