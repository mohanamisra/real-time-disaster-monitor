import axios from "axios";
import * as cheerio from "cheerio";

export const fetchReports = async (url) => {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const report = $("div.rw-report__content").text();
        return report; // Return the report content
    } catch (error) {
        console.error("Error scraping the report:", error);
        throw error;
    }
};
