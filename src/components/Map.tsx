'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function RecenterMap({ coords }: { coords: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [coords, map]);
  return null;
}

const Map = ({ source, destination }: { source: string, destination: string }) => {
  const [sourceCoords, setSourceCoords] = useState<[number, number] | null>(null);
  const [destCoords, setDestCoords] = useState<[number, number] | null>(null);
  const [route, setRoute] = useState<[number, number][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoute = async () => {
      setLoading(true);
      try {
        // 1. Geocode source and destination
        const [sRes, dRes] = await Promise.all([
          fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(source || 'London')}`),
          fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`)
        ]);
        const sData = await sRes.json();
        const dData = await dRes.json();

        if (sData.length > 0 && dData.length > 0) {
          const sLat = parseFloat(sData[0].lat);
          const sLon = parseFloat(sData[0].lon);
          const dLat = parseFloat(dData[0].lat);
          const dLon = parseFloat(dData[0].lon);
          
          setSourceCoords([sLat, sLon]);
          setDestCoords([dLat, dLon]);

          // 2. Try to get road-traced route from OSRM
          const osrmRes = await fetch(`https://router.project-osrm.org/route/v1/driving/${sLon},${sLat};${dLon},${dLat}?overview=full&geometries=geojson`);
          const osrmData = await osrmRes.json();

          if (osrmData.routes && osrmData.routes.length > 0) {
            // OSRM returns [lon, lat], Leaflet needs [lat, lon]
            const tracedPath = osrmData.routes[0].geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
            setRoute(tracedPath);
          } else {
            // Fallback to a curved path for flights/long distance
            setRoute([[sLat, sLon], [dLat, dLon]]);
          }
        }
      } catch (err) {
        console.error('Routing error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoute();
  }, [source, destination]);

  if (loading) return <div className="map-placeholder">Tracing optimal route...</div>;
  if (!sourceCoords || !destCoords) return <div className="map-placeholder">Unable to trace route</div>;

  return (
    <div className="map-wrapper">
      <MapContainer center={sourceCoords} zoom={3} style={{ height: '400px', width: '100%' }}>
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={sourceCoords} icon={icon}><Popup>From: {source}</Popup></Marker>
        <Marker position={destCoords} icon={icon}><Popup>To: {destination}</Popup></Marker>
        
        {route.length > 0 && (
          <Polyline 
            positions={route} 
            color="var(--clr-primary)" 
            weight={5} 
            opacity={0.7}
            lineJoin="round"
          />
        )}
        
        <RecenterMap coords={[sourceCoords, destCoords, ...route]} />
      </MapContainer>

      <style jsx>{`
        .map-wrapper { height: 400px; border-radius: 16px; overflow: hidden; box-shadow: inset 0 0 10px rgba(0,0,0,0.1); }
        .map-placeholder { height: 400px; display: flex; align-items: center; justify-content: center; background: var(--clr-surface-card); border-radius: 16px; color: var(--clr-mute); font-weight: 600; }
      `}</style>
    </div>
  );
};

export default Map;
