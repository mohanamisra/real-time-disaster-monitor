import express from "express";
import cors from "cors";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();
app.use(cors());

const BASE_URL = "https://api.reliefweb.int/v1";

// Fetch all disasters
app.get("/api/disasters", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/disasters?appname=iammohanamisra&profile=list&preset=latest&slim=1&query%5Bvalue%5D=country.id%3A119&query%5Boperator%5D=AND`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch ongoing disasters
app.get("/api/disasters/ongoing", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/disasters?appname=rwint-user-0&profile=list&preset=latest&slim=1&query%5Bvalue%5D=country.id%3A119+AND+status%3Acurrent&query%5Boperator%5D=AND`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch disaster reports
app.get("/api/disasters/:id/reports", async (req, res) => {
    const disasterID = req.params.id;
    try {
        const response = await axios.get(`${BASE_URL}/reports?appname=rwint-user-0&profile=list&preset=latest&slim=1&query%5Bvalue%5D=country.id%3A119+AND+disaster.id%3A${disasterID}&query%5Boperator%5D=AND`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch jobs
app.get("/api/jobs", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/jobs?appname=rwint-user-0&profile=list&preset=latest&slim=1&query%5Bvalue%5D=country.id%3A119&query%5Boperator%5D=AND`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch specific report content (scraping with Cheerio)
app.get("/api/reports", async (req, res) => {
    const url = req.query.url;
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const report = $("div.rw-report__content").text();
        res.json({ report });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
