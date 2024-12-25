import axios from 'axios';

export const fetchLocationCoords = async (locationName) => {
    console.log(locationName);
    return await axios.get(`http://localhost:3000/location`, {
        params: { locationName },
    });
};

export const fetchWeather = async (lat, long) => {
    return await axios.get(`http://localhost:3000/weather`, {
        params: {lat, long},
    });
};

export const fetchHeatWaveReport = async(lat, long) => {
    return await axios.get(`http://localhost:3000/elevation`, {
        params: {lat, long},
    });
};