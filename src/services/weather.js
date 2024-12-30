import axios from 'axios';

const BASE_URL = 'https://real-time-disaster-monitoring-backend.onrender.com';

export const fetchLocationCoords = async (locationName) => {
    console.log(locationName);
    return await axios.get(`${BASE_URL}/location`, {
        params: { locationName },
    });
};

export const fetchWeather = async (lat, long) => {
    return await axios.get(`${BASE_URL}/weather`, {
        params: { lat, long },
    });
};

export const fetchHeatWaveReport = async (lat, long) => {
    return await axios.get(`${BASE_URL}/elevation`, {
        params: { lat, long },
    });
};
