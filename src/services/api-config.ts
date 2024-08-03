import axios from 'axios';
const API_ENDPOINT = import.meta.env.VITE_REACT_APP_API_ENDPOINT
console.log("api load root: ", API_ENDPOINT)
const api = axios.create({
  baseURL: API_ENDPOINT
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      const response = await axios.post('http://localhost:8000/users/token/refresh/', { refresh: refreshToken });
      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access);
        api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
