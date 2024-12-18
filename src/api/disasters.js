import axios from 'axios';

const BASE_URL = "https://api.reliefweb.int/v1";

export const fetchDisasters = async() => {
    return await axios
        .get(`${BASE_URL}/disasters?appname=iammohanamisra&profile=list&preset=latest&slim=1&query%5Bvalue%5D=country.id%3A119&query%5Boperator%5D=AND`);
}

export default {
    fetchDisasters,
}