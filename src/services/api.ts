import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = getToken();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
