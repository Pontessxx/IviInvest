// src/hooks/useApi.ts
import { useCallback } from 'react';
import { registerUser, loginUser } from '../services/api';

export function useApi() {
  const cadastrar = useCallback(async (email: string, senha: string) => {
    return await registerUser(email, senha);
  }, []);

  const logar = useCallback(async (email: string, senha: string) => {
    return await loginUser(email, senha);
  }, []);

  return { cadastrar, logar };
}
