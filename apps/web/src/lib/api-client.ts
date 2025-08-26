import axios from 'axios';
import { toast } from 'sonner';
import { getEnvVar } from './env';

export const apiClient = axios.create({
  baseURL: getEnvVar('API_URL')
});

apiClient.interceptors.request.use(function (config) {
  if (!config.url) {
    return config;
  }

  const url = new URL(config.url, getEnvVar('API_URL'));
  if (url.pathname !== '/login') {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    toast.error(message);

    return Promise.reject(new Error(message));
  }
);
