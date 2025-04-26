// src/screens/Verify2FAScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Alert } from 'react-native';
import YellowButton from '../components/YellowButton';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyledEmailInput from '../components/StyledEmailInput';
import StyledTokenInput from '../components/StyledTokenInput';
import { useApi } from '../hooks/useApi';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');

export default function Verify2FAScreen() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const { verificarCodigo2FA } = useApi();

  useEffect(() => {
    AsyncStorage.getItem('email').then(value => {
      if (value) setEmail(value);
    });
  }, []);

  const handleVerify = async () => {
    if (!code || !email) return;
    setLoading(true);

    try {
      const response = await verificarCodigo2FA(email, code);
      const { token } = response.data;

      if (token) {
        await AsyncStorage.setItem('token', token);
        await login(token); // autenticado no contexto
      } else {
        Alert.alert('Erro', 'Token inválido ou expirado');
      }
    } catch (err) {
      console.error('Erro na verificação 2FA:', err);
      Alert.alert('Erro', 'Falha ao verificar token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Parte preta com ícone e mensagem */}
      <View style={styles.logoArea}>
        <Text style={styles.headerTitle}>2FA</Text>
        <Icon name="envelope" size={40} color="#fff" style={{ marginVertical: 12 }} />
        <Text style={styles.successMessage}>Seu código foi enviado com sucesso</Text>
      </View>

      {/* Parte branca com inputs */}
      <View style={styles.formArea}>
        <StyledEmailInput
          label="E-mail"
          placeholder="Insira seu e-mail"
          value={email}
          editable={false}
        />

        <StyledTokenInput
          label="Token"
          placeholder="123456"
          keyboardType="numeric"
          maxLength={6}
          value={code}
          onChangeText={setCode}
        />

        <YellowButton title="Verificar" onPress={handleVerify} loading={loading} />
      </View>
    </View>
  );
}
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
  headerTitle: {
    color: '#fff',
    fontSize: width * 0.06,
    fontWeight: 'bold',
  },
  successMessage: {
    color: '#fff',
    fontSize: width * 0.035,
    textAlign: 'center',
  },
  formArea: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.04,
    borderTopWidth: 2,
    borderColor: '#f4c100',
  },
});