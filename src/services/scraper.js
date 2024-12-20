import axios from "axios";

const url = "https://reliefweb.int/node/4115495";

axios(url)
.then(response => {
    const html = response.data;
    console.log(html);
})
.catch(console.error);