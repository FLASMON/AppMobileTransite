import axios from 'axios';
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost/MA_TRANSIT/' : 'http://localhost/MA_TRANSIT/';


const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
