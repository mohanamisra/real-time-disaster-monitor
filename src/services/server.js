import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { fetchReports } from './scraper.js'; // Adjust the path if needed
//
// const app = express();
// const port = 3000;
// app.use(cors());
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

const app = express();

app.use(cors());

app.get('/elevation', async (req, res) => {
    try {
        const response = await axios.get(
            'https://api.opentopodata.org/v1/srtm30m?locations=57.688709,11.976404'
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));