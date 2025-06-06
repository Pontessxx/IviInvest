// src/screens/LoginScreen.tsx
import React, { useState } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import StyledEmailInput from '../components/StyledEmailInput';
import StyledPasswordInput from '../components/StyledPasswordInput';
import YellowButton from '../components/YellowButton';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import { goToFailure } from '../utils/navigationHelpers';

import { useApi } from '../hooks/useApi';
import { apiHealthCheck } from '../services/api';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  EsqueciSenha: undefined;
  Home: undefined;
  ResetPassword: undefined;
  Failure: { errorMessage: string; goBackTo: keyof RootStackParamList };
};


type Props = NativeStackScreenProps<any> & {
  route: any;
  navigation: any;
};


// responsividade, pega a width e a altura do dispositivo
const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }: Props) => {
  //variavel para verificar se o input de senha está visível ou não
  const [secure, setSecure] = useState(true);

  //variaveis para tratar os inputs de username e senha
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { logar, enviarCodigo2FA } = useApi();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) return;

    const emailValido = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username.trim());
    if (!emailValido) {
      goToFailure(navigation, 'Insira um e-mail válido.', 'Login');
      return;
    }
  
    setLoading(true);
  
    try {
      // Tenta fazer o health check antes de tudo
      await apiHealthCheck();
    } catch (err) {
      setLoading(false);
      console.error('Servidor offline:', err);
      goToFailure(navigation, 'Servidor indisponível. Verifique sua conexão ou tente mais tarde.', 'Login');
      return;
    }
  
    try {
      const emailLowerCase = username.trim().toLowerCase();
      console.log('Tentando logar com:', emailLowerCase, password);
      const response = await logar(emailLowerCase, password);
      
      const { email } = response.data || {};

      if (email) {
        await AsyncStorage.setItem('email', email);

        // ✅ Envia o código de 2FA por e-mail
        await enviarCodigo2FA(email);

        // ✅ Navega para a verificação
        navigation.replace('Verify2FA');

        } else {
          goToFailure(navigation, 'Login ou senha inválidos', 'Login');
        }
      } catch (error: any) {
        if (error.response?.data?.message) {
          goToFailure(navigation, error.response.data.message, 'Login');
        } else {
          goToFailure(navigation, 'Erro ao processar login. Tente novamente mais tarde.', 'Login');
        }
      } finally {
        setLoading(false);
      }
  };
  

  return (
    <View style={styles.container}>
      {/* Parte preta com logo */}
      <View style={styles.logoArea}>
        <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Área branca com inputs estilo do input e a linha abaixo dele */}
      <View style={styles.formArea}>

        <StyledEmailInput
          label="E-mail"
          placeholder="Insira seu e-mail"
          value={username}
          onChangeText={setUsername}
        />

        <StyledPasswordInput
          label="Senha"
          placeholder="Insira sua senha"
          value={password}
          onChangeText={setPassword}
        />

        {/* Links para telas */}
        <View style={styles.linkRow}>

          <TouchableOpacity style={styles.linkWithIcon} onPress={() => navigation.navigate('EsqueciSenha')}>
            <Text style={styles.linkText}>esqueci minha senha</Text>
            <Icon name="long-arrow-right" size={width * 0.035} color="#f4c100" style={styles.arrow} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.cadastrarContainer} onPress={() => navigation.navigate('Cadastro')}          >
            <Text style={styles.cadastrarTexto}>cadastrar</Text>
            <View style={styles.cadastrarLinha} />
          </TouchableOpacity>

        </View>

        <YellowButton title="Entrar" onPress={handleLogin} loading={loading} />
      </View>
    </View>
  );
}


//Estilos da tela de login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  logoArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: width * 0.25,
    height: width * 0.25,
  },

  formArea: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.04,
    borderTopWidth: 2,
    borderColor: '#f4c100',
  },

  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.025,
  },
  
  linkWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  arrow: {
    marginLeft: width * 0.015,
  },

  linkText: {
    color: '#000',
    fontSize: width * 0.035,
  },

  cadastrarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  cadastrarTexto: {
    color: '#000',
    fontSize: width * 0.035,
    fontWeight: 'bold',
  },
  
  cadastrarLinha: {
    height: 2,
    backgroundColor: '#FFCD00',
    width: '100%',
    marginTop: 2,
  },
  

  button: {
    backgroundColor: '#FFCD00',
    paddingVertical: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
});

export default LoginScreen;