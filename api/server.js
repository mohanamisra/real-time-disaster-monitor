const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

app.get('/location', async (req, res) => {
    const { locationName } = req.query;
    if (!locationName) {
        return res.status(400).json({ error: 'Location name is required.' });
    }

    try {
        const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${locationName},IN&limit=5&appid=${process.env.OPENWEATHER_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch location data' });
    }
});

app.get('/weather', async (req, res) => {
    const { lat, long } = req.query;
    if (!lat || !long) {
        return res.status(400).json({ error: 'Latitude and Longitude are required.' });
    }
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.get('/elevation', async (req, res) => {
    const { lat, long } = req.query;
    if (!lat || !long) {
        return res.status(400).json({ error: 'Latitude and Longitude are required.' });
    }
    try {
        const response = await axios.get(`https://api.opentopodata.org/v1/srtm90m?locations=${lat},${long}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch elevation data' });
    }
});

// Export the server as a serverless function handler
module.exports = app;
