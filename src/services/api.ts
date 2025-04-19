// src/services/api.ts
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://192.168.15.6:8080',
  timeout: 20000,
});

export const apiHealthConn = axios.create({
  baseURL: 'http://192.168.15.6:8080',
  timeout: 3000, // bem mais curto só pra testar conexão
});

export const apiHealthCheck = async () => {
  return await apiHealthConn.get('/api/auth');
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


export default api;
