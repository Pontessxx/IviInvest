import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import StyledEmailInput from '../components/StyledEmailInput';
import StyledPasswordInput from '../components/StyledPasswordInput';
import YellowButton from '../components/YellowButton';

import { useApi } from '../hooks/useApi';
import { goToFailure } from '../utils/navigationHelpers';
import RNRsa from 'react-native-rsa-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiHealthCheck } from '../services/api';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  EsqueciSenha: undefined;
  Home: undefined;
  ResetPassword: undefined;
  Failure: { errorMessage: string; goBackTo: keyof RootStackParamList };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'> & {
  onLoginSuccess: (email: string) => void;
};

const { width, height } = Dimensions.get('window');

export default function RegisterScreen({ navigation, onLoginSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  // Hook para chamar a API de cadastro
  const { cadastrar } = useApi();

  const handleRegister = async () => {
    if (!email || !senha || !confirmarSenha) {
      goToFailure(navigation, 'Preencha todos os campos.', 'Cadastro');
      return;
    }

    if (senha !== confirmarSenha) {
      goToFailure(navigation, 'As senhas não coincidem', 'Cadastro');
      return;
    }

    setLoading(true);

    try {
      await apiHealthCheck();
    } catch (err) {
      console.error('Servidor offline:', err);
      setLoading(false);
      goToFailure(navigation, 'Servidor indisponível. Verifique sua conexão ou tente mais tarde.', 'Cadastro');
      return;
    }

    try {
      const response = await cadastrar(email, senha);

      if (response.status === 200 || response.status === 201) {
        const { token, email } = response.data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('email', email);
        onLoginSuccess();
      } else {
        goToFailure(navigation, 'Não foi possível realizar o cadastro.', 'Cadastro');
      }

    } catch (error: any) {
      if (error.response?.data?.message) {
        const { message } = error.response.data;
        console.error('Erro ao cadastrar:', message);
        goToFailure(navigation, message, 'Cadastro');
      } else if (error.message === 'Network Error') {
        console.error('Erro de rede:', error);
        goToFailure(navigation, 'Erro de conexão com o servidor.', 'Cadastro');
      } else {
        console.error('Erro inesperado:', error);
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
