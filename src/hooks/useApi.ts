// src/hooks/useApi.ts
import { useCallback } from 'react';
import { registerUser, loginUser, redefinirSenha } from '../services/api';

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

  return { cadastrar, logar, redefinir };
}
