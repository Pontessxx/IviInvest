// src/services/api.ts
import {API_URL} from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
});

export const apiHealthConn = axios.create({
  baseURL: API_URL,
  timeout: 3000, // bem mais curto só pra testar conexão
});

export const apiHealthCheck = async () => {
  return await apiHealthConn.get('/api/health');
};

export const registerUser = async (email: string, senha: string) => {
  return await api.post('/api/auth/register', { email, senha });
};

export const loginUser = async (email: string, senha: string) => {
  return await api.post('/api/auth/login', { email, senha });
};

export const gerarTokenRecuperacao = async (email: string) => {
  return await api.get(`/api/recover/token/${email}`);
};

export const redefinirSenha = async (email: string, token: string, novaSenha: string) => {
  return await api.put('/api/recover/password', {
    email,
    token,
    novaSenha,
  });
};

// Interceptor para adicionar o token automaticamente
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


// Buscar o perfil atual do usuário
export const getPerfilInvestidor = async () => {
  return await api.get('/api/auth/perfil');
};

// Atualizar o perfil de investidor
export const updatePerfilInvestidor = async (perfil: string) => {
  return await api.put('/api/auth/perfil', { perfilInvestidor: perfil });
};

export default api;
