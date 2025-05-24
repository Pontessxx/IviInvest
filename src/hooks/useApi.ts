// src/hooks/useApi.ts
import { useCallback } from 'react';
import {
  registerUser,
  loginUser,
  redefinirSenha,
  send2FACode,
  verify2FA,
  deleteAccount,
  chatLivre,
  salvarObjetivo,
  buscarUltimoObjetivo,
  buscarHistoricoObjetivos,
  gerarCarteiraPercentual,
  selecionarCarteira,
  gerarAtivosCarteira,
  buscarCarteiraSelecionada,
  getPerfilInvestidor,
  updatePerfilInvestidor,
  gerarTokenRecuperacao
} from '../services/api';
import { simularRentabilidade as simularRentabilidadeApi } from '../services/api';

export function useApi() {
  // Auth
  const cadastrar = useCallback((email: string, senha: string) => registerUser(email, senha), []);
  const logar = useCallback((email: string, senha: string) => loginUser(email, senha), []);
  const deletarConta = useCallback(() => deleteAccount(), []);

  // 2FA
  const enviarCodigo2FA = useCallback((email: string) => send2FACode(email), []);
  const verificarCodigo2FA = useCallback((email: string, token: string) => verify2FA(email, token), []);

  // Recuperação de senha
  const solicitarTokenRecuperacao = useCallback((email: string) => gerarTokenRecuperacao(email), []);
  const redefinir = useCallback((email: string, token: string, novaSenha: string) =>
    redefinirSenha(email, token, novaSenha), []);

  // Perfil investidor
  const getPerfil = useCallback(() => getPerfilInvestidor(), []);
  const atualizarPerfil = useCallback((perfil: string) => updatePerfilInvestidor(perfil), []);

  // Objetivo
  const salvarObjetivoFn = useCallback((dados: {
    objetivo: string;
    prazo: number;
    valorInicial: number;
    aporteMensal: number;
    patrimonioAtual: number;
    liquidez: string;
    setoresEvitar: string[];
  }) => salvarObjetivo(dados), []);

  const buscarObjetivoAtual = useCallback(() => buscarUltimoObjetivo(), []);
  const buscarHistoricoObjetivosFn = useCallback(() => buscarHistoricoObjetivos(), []);

  // Carteira
  const gerarPercentuais = useCallback(() => gerarCarteiraPercentual(), []);
  const selecionarCarteiraFn = useCallback((indice: number) => selecionarCarteira(indice), []);
  const gerarAtivos = useCallback(() => gerarAtivosCarteira(), []);
  const buscarCarteiraSelecionadaFn = useCallback(() => buscarCarteiraSelecionada(), []);
  const simularRentabilidade = useCallback(
    (tipoCarteira: string, objetivoId: number) =>
      simularRentabilidadeApi(tipoCarteira, objetivoId),
    []
  );

  // Chat
  const chatLivreFn = useCallback(async (question: string) => {
    const res = await chatLivre(question);
    return res.data.resposta;
  }, []);

  return {
    logar,
    cadastrar,
    redefinir,
    solicitarTokenRecuperacao,
    enviarCodigo2FA,
    verificarCodigo2FA,
    deletarConta,
    chatLivre: chatLivreFn,
    salvarObjetivo: salvarObjetivoFn,
    buscarObjetivoAtual,
    buscarHistoricoObjetivos: buscarHistoricoObjetivosFn,
    gerarPercentuais,
    selecionarCarteira: selecionarCarteiraFn,
    gerarAtivos,
    buscarCarteiraSelecionada: buscarCarteiraSelecionadaFn,
    simularRentabilidade,
    getPerfil,
    atualizarPerfil,
  };
}
