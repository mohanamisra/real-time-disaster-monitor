import axios from 'axios';

export const fetchLocationCoords = async (locationName) => {
    return await axios.get(`/api/location`, { params: { locationName } });
};

export const fetchWeather = async (lat, long) => {
    return await axios.get(`/api/weather`, { params: { lat, long } });
};

export const fetchHeatWaveReport = async (lat, long) => {
    return await axios.get(`/api/elevation`, { params: { lat, long } });
};
