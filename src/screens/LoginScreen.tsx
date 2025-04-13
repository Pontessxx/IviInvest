// src/screens/LoginScreen.tsx
import React, { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import StyledEmailInput from '../components/StyledEmailInput';
import StyledPasswordInput from '../components/StyledPasswordInput';

// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';

type RootStackParamList = {
  Login: undefined;
  Cadastrar: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

// responsividade, pega a width e a altura do dispositivo
const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }: Props) => {
  //variavel para verificar se o input de senha está visível ou não
  const [secure, setSecure] = useState(true);

  //variaveis para tratar os inputs de username e senha
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Parte preta com logo */}
      <View style={styles.logoArea}>
        <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Área branca com inputs estilo do input e a linha abaixo dele */}
      <View style={styles.formArea}>

        <StyledEmailInput
          placeholder="Insira seu e-mail"
          value={username}
          onChangeText={setUsername}
        />

        <StyledPasswordInput
          placeholder="Insira sua senha"
          value={password}
          onChangeText={setPassword}
        />

        {/* Links para telas */}
        <View style={styles.linkRow}>
          <TouchableOpacity style={styles.linkWithIcon}>
            <Text style={styles.linkText}>esqueci minha senha</Text>
            <Icon name="long-arrow-right" size={width * 0.035} color="#f4c100" style={styles.arrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cadastrarContainer} onPress={() => navigation.navigate('Cadastrar')}          >
            <Text style={styles.cadastrarTexto}>cadastrar</Text>
            <View style={styles.cadastrarLinha} />
          </TouchableOpacity>
        </View>

        {/* Botão Continuar => verifica os inputs e depois passará para o home */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
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