// src/hooks/useApi.ts
import { useCallback } from 'react';
import {
  registerUser,
  loginUser,
  redefinirSenha,
  send2FACode,
  verify2FA,
  deleteAccount,
} from '../services/api';

export function useApi() {
  const cadastrar = useCallback(async (email: string, senha: string) => {
    return await registerUser(email, senha);
  }, []);

  const logar = useCallback(async (email: string, senha: string) => {
    return await loginUser(email, senha);
  }, []);

  const redefinir = useCallback(async (email: string, token: string, novaSenha: string) => {
    return await redefinirSenha(email, token, novaSenha);
  }, []);

  const enviarCodigo2FA = useCallback(async (email: string) => {
    return await send2FACode(email);
  }, []);

  const verificarCodigo2FA = useCallback(async (email: string, token: string) => {
    return await verify2FA(email, token);
  }, []);

  const deletarConta = useCallback(async () => {
    return await deleteAccount();
  }, []);

  return {
    logar,
    cadastrar,
    redefinir,
    enviarCodigo2FA,
    verificarCodigo2FA,
    deletarConta,   
  };
}
