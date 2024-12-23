import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import './Map.css';

const earthquakeIcon = new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const cycloneIcon = new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
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
        [14.4426, 79.9865, 1],
        [17.3213, 82.0407, 1],
        [16.6100, 80.7214, 1],
        [21.4934, 86.9135, 1],
        [20.5035, 86.4199, 1],
        [20.2549, 86.1706, 1],
        [21.0574, 86.4963, 1],
        [16.7344, 82.2153, 1],
        [22.1367, 88.5565, 1],
        [22.4257, 87.3199, 1],
        [18.2949, 83.8938, 2],
        [16.3067, 80.4365, 2],
        [17.6868, 83.2185, 2],
        [16.9174, 81.3399, 2],
        [15.3485, 79.5603, 2],
        [18.1067, 83.3956, 2],
        [20.7181, 70.9858, 2],
        [21.5222, 70.4579, 2],
        [23.7337, 69.8597, 2],
        [10.57, 72.64, 2],
        [19.3871, 85.0523, 2],
        [19.8135, 85.8312, 2],
        [20.1863, 85.6223, 2],
        [10.9254, 79.8380, 2],
        [10.3833, 78.8001, 2],
        [11.7480, 79.7714, 2],
        [12.8372, 79.7042, 2],
        [10.7661, 79.6344, 2],
        [10.7672, 79.8449, 2],
        [13.0843, 80.2705, 2],
        [9.3639, 78.8395, 2],
        [8.7642, 78.1348, 2],
        [8.7150, 77.7656, 2]
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
            {cycloneLocations.map((location, i) => (
                <Marker position={location} icon={cycloneIcon} key={i}>
                    <Popup>
                        <div style={{background: 'white'}}>
                            Cyclone Risk: {location[2] === 2 ? <span>High</span>:<span>Very High</span>}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
