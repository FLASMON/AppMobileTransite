import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost/MA_TRANSIT/' : 'http://localhost/MA_TRANSIT/';


const axiosConfig = axios.create({
    baseURL: baseUrl,
});

export default axiosConfig;