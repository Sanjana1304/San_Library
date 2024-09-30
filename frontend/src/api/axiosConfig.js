import axios from 'axios';

const api = axios.create({
    baseURL: 'https://san-library.onrender.com/',
    withCredentials: true, // Include cookies in requests
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;