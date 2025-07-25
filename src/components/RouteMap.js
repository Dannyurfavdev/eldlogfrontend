import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';

// Optional: Create custom icons
const fuelIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
  iconSize: [25, 25],
});

const restIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 25],
});

const RouteMap = ({ pickupCoords, dropoffCoords, fuelStops }) => {
    console.log("Pickup:", pickupCoords);
    console.log("Dropoff:", dropoffCoords);
  if (!pickupCoords || !dropoffCoords) return null;

  const routeLine = [pickupCoords, dropoffCoords];

  return (
    <MapContainer center={pickupCoords} zoom={6} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={pickupCoords}>
        <Popup>Pickup Location</Popup>
      </Marker>

      <Marker position={dropoffCoords}>
        <Popup>Dropoff Location</Popup>
      </Marker>

      {fuelStops && fuelStops.map((coord, idx) => (
        <Marker key={idx} position={coord} icon={fuelIcon}>
          <Popup>Fuel Stop #{idx + 1}</Popup>
        </Marker>
      ))}

      <Polyline positions={routeLine} color="blue" />
    </MapContainer>
  );
};

export default RouteMap;
