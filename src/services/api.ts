// src/services/api.ts
import axios from 'axios';

export const BASE_URL = '';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const apiHealthCheck = async () => {
  return await api.get('/api/auth');
};

export const registerUser = async (email: string, senha: string) => {
  return await api.post('/api/auth/register', { email, senha });
};

export const loginUser = async (email: string, senha: string) => {
  return await api.post('/api/auth/login', { email, senha });
};

export default api;
