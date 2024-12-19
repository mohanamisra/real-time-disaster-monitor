import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const Map = () => {
    const position = [51.505, -0.09];

    return (
            <MapContainer center={position} zoom={13} style={{height:'100%', width:'100%'}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>
                        A pretty popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
    );
};

export default Map;
