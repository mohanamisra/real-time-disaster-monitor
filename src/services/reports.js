import axios from "axios";
import * as cheerio from "cheerio";

export const fetchReports = async(url) => {
    await axios.get(url)
        .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const report = $("div.rw-report__content").text()
        console.log(report);
    })
        .catch(console.error);
}

// const url = "https://reliefweb.int/node/4115495";
//
// axios(url)
// .then(response => {
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const report = $("div.rw-report__content").text()
//     console.log(report);
// })
// .catch(console.error);