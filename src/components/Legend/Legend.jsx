import React from 'react';

const Legend = () => (
    <div className="map-legend">
        <div className="legend-item">
            <img src="https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-orange.png" alt="Earthquake Icon" />
            <span>Earthquake-Prone Zone</span>
        </div>
        <div className="legend-item">
            <img src="https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-blue.png" alt="Cyclone Icon" />
            <span>Cyclone-Prone Zone</span>
        </div>
        <div className="legend-item">
            <img src="https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-green.png" alt="Landslide Icon" />
            <span>Landslide-Prone Zone</span>
        </div>
    </div>
);

export default Legend;