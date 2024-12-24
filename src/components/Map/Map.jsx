import React, {useEffect, useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {fetchNearbyHospitals} from "../../services/nearby.js";
import {earthquakeLocations, cycloneLocations, landslideLocations} from "../../services/data.js";
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
        <MapContainer scrollWheelZoom={false} center={indiaPosition} zoom={zoomLevel} style={{ height: '100%', width: '100%' }}>
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
