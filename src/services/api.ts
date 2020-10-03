import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.5:3333',
});

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = localStorage.getItem('@proffy/user') 
    || sessionStorage.getItem('@proffy/user');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
