import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ position }) => {
  return (
    // <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    //   <TileLayer
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    //   />
    //   <Marker position={position}>
    //     <Popup>{`Location ${position[0]}, ${position[1]}`}</Popup>
    //   </Marker>
    // </MapContainer>
    <MapContainer
      className='markercluster-map'
      center={[51.0, 19.0]}
      zoom={4}
      maxZoom={18}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};
export default Map;
