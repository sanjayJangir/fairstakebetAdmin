import axios from 'axios';

const api = axios.create({
  //baseURL: import.meta.env.DEV ? 'http://localhost:8000' : 'https://api.fairstakebet.com',
  baseURL: import.meta.env.DEV ? 'http://localhost:8000' : 'https://api.fairstakebet.com', // adjust this to your backend URL
  headers: {
    'Content-Type': 'application/json',
  }
});

// Fix: Use consistent token name 'admin_token'
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token'); // Changed from 'adminToken'
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token'); // Changed from 'adminToken'
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export { api };


