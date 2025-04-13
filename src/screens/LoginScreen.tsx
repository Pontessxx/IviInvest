// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

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
            <Text style={styles.olho}>👁️</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  logoArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 120, height: 120 },

  formArea: {
    backgroundColor: '#f5f5f5',
    padding: 24,
    borderTopWidth: 2,
    borderColor: '#f4c100',
  },

  input: {
    backgroundColor: '#ddd',
    color: '#333',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },

  olho: {
    fontSize: 16,
    color: '#333',
    padding: 4,
  },

  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  linkText: {
    color: '#000',
  },

  linkTextBold: {
    color: '#f4c100',
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#f4c100',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
