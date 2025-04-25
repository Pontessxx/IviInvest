// src/screens/Verify2FAScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Alert } from 'react-native';
import YellowButton from '../components/YellowButton';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyledEmailInput from '../components/StyledEmailInput';
import { useApi } from '../hooks/useApi';

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
      <Text style={styles.title}>Digite o código enviado ao seu e-mail</Text>

      <StyledEmailInput
        label="E-mail"
        placeholder="Insira seu e-mail"
        value={email}
        editable={false}
      />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="000000"
        maxLength={6}
        onChangeText={setCode}
        value={code}
      />

      <YellowButton title="Verificar" onPress={handleVerify} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: width * 0.045,
    marginBottom: height * 0.03,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});
