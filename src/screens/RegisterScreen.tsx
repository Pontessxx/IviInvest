import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import StyledEmailInput from '../components/StyledEmailInput';
import StyledPasswordInput from '../components/StyledPasswordInput';
import YellowButton from '../components/YellowButton';

import { useApi } from '../hooks/useApi';
import { goToFailure } from '../utils/navigationHelpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiHealthCheck } from '../services/api';
import { useAuth } from '../context/AuthContext';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  EsqueciSenha: undefined;
  Home: undefined;
  ResetPassword: undefined;
  Failure: { errorMessage: string; goBackTo: keyof RootStackParamList };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

const { width, height } = Dimensions.get('window');

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const { cadastrar } = useApi();

  const handleRegister = async () => {
    const sanitizedEmail = email.trim();
    const sanitizedSenha = senha.trim();
    const sanitizedConfirmar = confirmarSenha.trim();
  
    if (!sanitizedEmail || !sanitizedSenha || !sanitizedConfirmar) {
      goToFailure(navigation, 'Preencha todos os campos.', 'Cadastro');
      return;
    }
  
    const emailValido = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(sanitizedEmail);
    if (!emailValido) {
      goToFailure(navigation, 'Insira um e-mail válido.', 'Cadastro');
      return;
    }
  
    const senhaValida = /^[a-zA-Z0-9]{6,}$/.test(sanitizedSenha);
    if (!senhaValida) {
      goToFailure(navigation, 'A senha deve conter pelo menos 6 letras e não pode conter caracteres especiais.', 'Cadastro');
      return;
    }
  
    if (sanitizedSenha !== sanitizedConfirmar) {
      goToFailure(navigation, 'As senhas não coincidem', 'Cadastro');
      return;
    }
  
    setLoading(true);
  
    try {
      await apiHealthCheck();
      const response = await cadastrar(sanitizedEmail, sanitizedSenha);
  
      if (response.status === 200 || response.status === 201) {
        const { token, email } = response.data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('email', email);
        await login(token);
      } else {
        goToFailure(navigation, 'Não foi possível realizar o cadastro.', 'Cadastro');
      }
  
    } catch (error: any) {
      if (error.response?.data?.message) {
        goToFailure(navigation, error.response.data.message, 'Cadastro');
      } else if (error.message === 'Network Error') {
        goToFailure(navigation, 'Erro de conexão com o servidor.', 'Cadastro');
      } else {
        goToFailure(navigation, 'Erro inesperado ao cadastrar.', 'Cadastro');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>
      <Text style={styles.description}>
        Crie sua conta para acessar a plataforma e gerenciar seus investimentos com segurança.
      </Text>

  
      <View style={styles.formArea}>
        <StyledEmailInput
          label="Insira o E-mail"
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
  
        <StyledPasswordInput
          label="Senha"
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
        />
  
        <StyledPasswordInput
          label="Insira novamente a senha"
          placeholder="Confirme sua senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
      </View>
  
      <YellowButton title="Cadastrar" onPress={handleRegister} loading={loading}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.05,
    paddingBottom: height * 0.03,
    justifyContent: 'space-between', // empurra o botão pra baixo
  },

  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },

  formArea: {
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: height * 0.04,
  },

  description: {
    textAlign: 'center',
    fontSize: width * 0.035,
    color: '#555',
    marginTop: height * 0.015,
    paddingHorizontal: width * 0.05,
  },
  
});
