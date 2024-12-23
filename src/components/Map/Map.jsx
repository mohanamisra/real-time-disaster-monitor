import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import './Map.css';

const Map = () => {
    const indiaPosition = [22.3511148, 78.6677428];
    const zoomLevel = 5;

    return (
        <MapContainer center={indiaPosition} zoom={zoomLevel} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/*<Marker position={position}>*/}
            {/*    <Popup>*/}
            {/*        A pretty popup. <br /> Easily customizable.*/}
            {/*    </Popup>*/}
            {/*</Marker>*/}
        </MapContainer>
    );
};

export default Map;
