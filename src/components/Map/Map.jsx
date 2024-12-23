import React, {useEffect, useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {fetchNearbyHospitals} from "../../services/nearby.js";
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

const landslideIcon = new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const Map = () => {
    const indiaPosition = [22.3511148, 78.6677428];
    const zoomLevel = 5;
    const [hospitalCount, setHospitalCount] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null); // Store the location of the selected marker


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

    const landslideLocations = [
        [30.2850, 78.9822],
        [30.3826, 78.4738],
        [10.5276, 76.2144],
        [33.3716, 74.3152],
        [10.7867, 76.6548],
        [33.7620, 74.3118],
        [11.0510, 76.0711],
        [27.3051, 88.3628],
        [27.3084, 88.6724],
        [11.2588, 75.7804],
        [24.7828, 93.8859],
        [12.3375, 75.8069],
        [11.7032, 76.0834],
        [32.7266, 74.8570],
        [9.9816, 76.2999],
        [31.7087, 76.9320],
        [32.9160, 75.1416],
        [9.8584, 76.9528],
        [30.4554, 79.8745],
        [27.3032, 88.2072],
        [30.7306, 78.4437],
        [24.7821, 92.8577],
        [30.1466, 78.7767],
        [9.5916, 76.5222],
        [31.6862, 76.5213],
        [11.8745, 75.3704],
        [33.8716, 74.8946],
        [8.5241, 76.9366],
        [30.3165, 78.0322],
        [22.0797, 82.1409],
        [25.7573, 90.2245],
        [32.5534, 76.1258],
        [9.2648, 76.7870],
        [25.3682, 91.7539],
        [27.0416, 88.2664],
        [11.0168, 76.9558],
        [30.9084, 77.0999],
        [23.7307, 92.7173],
        [22.8890, 92.7455],
        [25.9411, 91.2891],
        [10.3624, 77.9695],
        [32.3863, 75.5173],
        [8.0844, 77.5495],
        [12.4996, 74.9869],
        [22.5321, 92.8991],
        [31.6510, 78.4752],
        [24.6809, 92.5648],
        [8.8932, 76.6141],
        [26.1639, 90.6253],
        [29.8404, 79.7694],
        [27.8236, 88.5565],
        [33.7311, 75.1487],
        [13.0033, 76.1004],
        [12.8438, 75.2479],
        [26.1861, 93.5813],
        [28.0682, 96.1527],
        [31.9592, 77.1089],
        [34.1990, 74.3499],
        [10.0079, 77.4735],
        [24.2252, 92.6778],
        [31.1050, 77.1640],
        [32.1015, 76.2731],
        [24.3460, 93.7000],
        [25.5672, 90.5258],
        [29.3361, 80.0910],
        [25.5625, 91.2891],
        [25.9321, 92.0665],
        [29.3924, 79.4534],
        [25.5488, 92.3814],
        [31.4685, 76.2708]
    ]


    const handleMarkerClick = async (latitude, longitude) => {
        try {
            const count = await fetchNearbyHospitals(latitude, longitude);
            setHospitalCount(count);
            setSelectedLocation([latitude, longitude]);
        } catch (error) {
            alert('Error fetching count of nearby hospitals', error);
        }
    };

    return (
        <MapContainer center={indiaPosition} zoom={zoomLevel} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {earthquakeLocations.map((location, i) => (
                <Marker
                    position={location}
                    icon={earthquakeIcon}
                    key={i}
                    eventHandlers={{
                        click: ()=>{handleMarkerClick(location[0], location[1])}
                    }}
                >
                    <Popup>
                        <div style={{background: 'white'}}>
                            Earthquake Zone Classification: {location[2]}<br/>
                            {selectedLocation && selectedLocation[0] === location[0] && selectedLocation[1] === location[1] && hospitalCount ? (
                                <div className="location-info">
                                    <span>{hospitalCount} hospital(s) nearby. Enter the location on the map to find out more.</span>
                                </div>
                            ) : (
                                <span>Loading nearby hospitals...</span>
                            )}
                        </div>
                    </Popup>
                </Marker>
            ))}
            {cycloneLocations.map((location, i) => (
                <Marker position={location} icon={cycloneIcon} key={i}
                        eventHandlers={{
                            click: ()=>{handleMarkerClick(location[0], location[1])}
                        }}
                >
                    <Popup>
                        <div style={{background: 'white'}}>
                            Cyclone Risk: {location[2] === 2 ? <span>High</span>:<span>Very High</span>}<br/>
                            {selectedLocation && selectedLocation[0] === location[0] && selectedLocation[1] === location[1] && hospitalCount ? (
                                <div className="location-info">
                                    <span>{hospitalCount} hospital(s) nearby. Enter the location on the map to find out more.</span>
                                </div>
                            ) : (
                                <span>Loading nearby hospitals...</span>
                            )}
                        </div>
                    </Popup>
                </Marker>
            ))}
            {landslideLocations.map((location, i) => (
                <Marker position={location} icon={landslideIcon} key={i}
                        eventHandlers={{
                            click: ()=>{handleMarkerClick(location[0], location[1])}
                        }}
                >
                    <Popup>
                        <div style={{background: 'white'}}>
                            Landslide Prone Zone<br/>
                            {selectedLocation && selectedLocation[0] === location[0] && selectedLocation[1] === location[1] && hospitalCount ? (
                                <div className="location-info">
                                    <span>{hospitalCount} hospital(s) nearby. Enter the location on the map to find out more.</span>
                                </div>
                            ) : (
                                <span>Loading nearby hospitals...</span>
                            )}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
