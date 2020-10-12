import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'https://proffy-app-server.herokuapp.com/',
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
