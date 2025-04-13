// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

// responsividade, pega a width e a altura do dispositivo
const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
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

      {/* Área branca com inputs */}
      <View style={styles.formArea}>
        <TextInput
          placeholder="Insira o Username"
          style={styles.input}
          placeholderTextColor="#333"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Senha"
            secureTextEntry={secure}
            style={styles.passwordInput}
            placeholderTextColor="#333"
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Icon name={secure ? 'eye-slash' : 'eye'} size={width * 0.05} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Links para telas */}
        <View style={styles.linkRow}>
          <TouchableOpacity>
            <Text style={styles.linkText}>esqueci minha senha →</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.linkTextBold}>cadastrar</Text>
          </TouchableOpacity>
        </View>

        {/* Botão Continuar => verifica os inputs e depois passará para o home */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continuar</Text>
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

  input: {
    backgroundColor: '#ddd',
    color: '#333',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    borderRadius: 8,
    fontSize: width * 0.04,
    marginBottom: height * 0.02,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.02,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: height * 0.015,
    color: '#000',
    fontSize: width * 0.04,
  },

  eye: {
    padding: 4,
  },

  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.025,
  },

  linkText: {
    color: '#000',
    fontSize: width * 0.035,
  },

  linkTextBold: {
    color: '#f4c100',
    fontWeight: 'bold',
    fontSize: width * 0.035,
  },

  button: {
    backgroundColor: '#f4c100',
    paddingVertical: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
});
