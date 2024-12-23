import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import './Map.css';

// Custom Icon
const earthquakeIcon = new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
    shadowSize: [41, 41], // Size of the shadow
});

const Map = () => {
    const indiaPosition = [22.3511148, 78.6677428];
    const zoomLevel = 5;

    const earthquakeLocations = [
        [29.5892, 79.6467, 4],
        [30.3752, 76.7821, 4],
        [31.6340, 74.8723, 4],
        [27.5705, 81.5977, 4],
        [25.4657, 85.9914, 4],
        [28.4070, 77.8498, 4],
        [30.7333, 76.7794, 4],
        [27.0416, 88.2664, 4],
        [30.3165, 78.0322, 4],
        [28.6139, 77.2088, 4],
        [27.3314, 88.6138, 4],
        [26.7606, 83.3732, 4],
        [30.9010, 75.8573, 4],
        [31.7087, 76.9320, 4],
        [25.3708, 86.4734, 4],
        [28.8386, 78.7733, 4],
        [29.3924, 79.4534, 4],
        [25.5941, 85.1376, 4],
        [28.6249, 79.8075, 4],
        [29.8543, 77.8880, 4],
        [31.1050, 77.1640, 4],
        [23.2420, 69.6669, 5],
        [26.1542, 85.8918, 5],
        [26.1158, 91.7086, 5],
        [24.8108, 93.9386, 5],
        [26.7509, 94.2037, 5],
        [25.6751, 94.1086, 5],
        [27.8602, 95.6274, 5],
        [34.0837, 74.7973, 5],
        [26.6528, 92.7926, 5]
    ];

    const cycloneLocations = [
        
    ]

    return (
        <MapContainer center={indiaPosition} zoom={zoomLevel} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {earthquakeLocations.map((location, i) => (
                <Marker position={location} icon={earthquakeIcon} key={i}>
                    <Popup>
                        <div style={{background: 'white'}}>
                            Earthquake Zone Classification: {location[2]}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
