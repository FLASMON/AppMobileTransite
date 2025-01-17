import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost/MA_transit/' : 'https://matransit.dna.mg/';


const axiosConfig = axios.create({
    baseURL: baseUrl,
});

export default axiosConfig;