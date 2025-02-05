import axios from 'axios';

export const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost/MA_TRANSIT/' : 'https://matransit.dna.mg/';


const axiosConfig = axios.create({
    baseURL: baseUrl,
});

export default axiosConfig;