import React from 'react';
import { useMap, MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapRefresher = ({ lat, lng }) => {
  const map = useMap();
  map.setView({ lat, lng });

  return null;
};

const LocationMap = ({ lat = 54.7197784, lng = 25.2606072 }) => {
  const position = [lat, lng];
  return (
    <MapContainer
      style={{ width: '100%', height: '50vh' }}
      center={position}
      zoom={12}
      scrollWheelZoom={false}
    >
      <MapRefresher lat={lat} lng={lng} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={position}>
        <Popup>{`Location ${position[0]}, ${position[1]}`}</Popup>
      </Marker>
    </MapContainer>
  );
};
export default LocationMap;
