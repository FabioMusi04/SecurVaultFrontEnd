import axios from 'axios';


// Set the base URL from the process.env
axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

// Add a request interceptor to attach the JWT token to each request
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('SecurVaultToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axios;