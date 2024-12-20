import express from 'express';
import cors from 'cors';
import { fetchReports } from './scraper.js'; // Adjust the path if needed

const app = express();
const port = 3000;
app.use(cors());

app.get('/fetch-report', async (req, res) => {
    const url = req.query.url; // URL sent as a query parameter
    if (!url) {
        return res.status(400).send({ error: 'URL parameter is required' });
    }

    try {
        const report = await fetchReports(url);
        res.send({ report });
    } catch (error) {
        console.error("Error fetching report:", error);
        res.status(500).send({ error: 'Failed to fetch the report' });
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
