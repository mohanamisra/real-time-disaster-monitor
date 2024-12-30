import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
import { fetchReports } from './scraper.js'; // Adjust the path if needed
//
const app = express();
// const port = 3000;
app.use(cors());
//
// app.get('/fetch-report', async (req, res) => {
//     const url = req.query.url; // URL sent as a query parameter
//     if (!url) {
//         return res.status(400).send({ error: 'URL parameter is required' });
//     }
//
//     try {
//         const report = await fetchReports(url);
//         res.send({ report });
//     } catch (error) {
//         console.error("Error fetching report:", error);
//         res.status(500).send({ error: 'Failed to fetch the report' });
//     }
// });
//
// app.listen(port, () => {
//     console.log(`App listening at http://localhost:${port}`);
// });

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

app.get('/weather', async(req, res) => {
    const { lat, long } = req.query;
    if(!lat || !long) {
        return res.status(400).json({error: 'Latitude and Longitude are required.'});
    }
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`);
        res.json(response.data);
    } catch(error) {
        console.error(error.response.data);
    }
})

app.get('/elevation', async (req, res) => {
    const { lat, long } = req.query;
    if(!lat || !long) {
        return res.status(400).json({error: 'Latitude and Longitude are required.'});
    }
    try {
        const response = await axios.get(`https://api.opentopodata.org/v1/srtm90m?locations=${lat},${long}`);
        res.json(response.data);
    }catch(error) {
        console.error(error.response.data);
    }
})

app.listen(3000, () => console.log('Server running on port 3000'));
