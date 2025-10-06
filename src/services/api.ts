// src/services/api.ts
import { API_URL } from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: API_URL,
  timeout: 40000,
});

export const apiHealthConn = axios.create({
  baseURL: API_URL,
  timeout: 3000,
});

// Health check
export const apiHealthCheck = async () => apiHealthConn.get('/api/v1/health');

// Auth
export const registerUser = async (email: string, senha: string) => api.post('/api/v1/auth/register', { email, senha });
export const loginUser = async (email: string, senha: string) => api.post('/api/v1/auth/login', { email, senha });
export const deleteAccount = async () => api.delete('/api/v1/auth');

// 2FA
export const send2FACode = async (email: string) => api.post('/api/v1/auth/2fa/send', { email });
export const verify2FA = async (email: string, token: string) => api.post('/api/v1/auth/2fa/verify', { email, token });

// Recuperação de senha
export const gerarTokenRecuperacao = async (email: string) => api.post('/api/v1/recover/token', { email });
export const redefinirSenha = async (email: string, token: string, novaSenha: string) =>
  api.put('/api/v1/recover/password', { email, token, novaSenha });

// Perfil investidor
export const getPerfilInvestidor = async () => api.get('/api/v1/auth/perfil');
export const updatePerfilInvestidor = async (perfil: string) => api.put('/api/v1/auth/perfil', { perfilInvestidor: perfil });

// Objetivos
export const salvarObjetivo = async (dados: {
  objetivo: string;
  prazo: number;
  valorInicial: number;
  aporteMensal: number;
  patrimonioAtual: number;
  liquidez: string;
  setoresEvitar: string[];
}) => api.post('/api/v1/objetivos', dados);

export const buscarUltimoObjetivo = async () => api.get('/api/v1/objetivos');
export const buscarHistoricoObjetivos = async () => api.get('/api/v1/objetivos/historico');

// Carteiras
export const gerarCarteiraPercentual = async () => api.post('/api/v1/carteiras/percentuais/gerar');
export const selecionarCarteira = async (indice: number) => api.post('/api/v1/carteiras/selecionar', { indice });
export const gerarAtivosCarteira = async () => api.post('/api/v1/carteiras/ativos/gerar');
export const buscarCarteiraSelecionada = async () => api.get('/api/v1/carteiras/selecionada');
export const simularRentabilidade = async (tipoCarteira: string, objetivoId: number) => {
  return await api.get('/api/v1/carteiras/simulacao', {
    params: { tipoCarteira, objetivoId },
  });
};

// Chat IA
export const chatLivre = async (question: string) => api.post('/api/v1/carteiras/chat', { question });

// Interceptor
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
