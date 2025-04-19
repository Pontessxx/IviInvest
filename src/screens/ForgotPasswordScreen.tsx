import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import StyledEmailInput from '../components/StyledEmailInput';
import { apiHealthCheck, gerarTokenRecuperacao } from '../services/api';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  ForgotPassword: undefined;
  ResetPassword: { email: string; };
};

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;


const { width, height } = Dimensions.get('window');

const ForgotPasswordScreen = ({ navigation }: Props) =>{
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSendToken = async () => {
    if (!email) {
      Alert.alert('Por favor, insira um e-mail válido');
      return;
    }
  
    setLoading(true);
  
    try {
      // 1️⃣ Verifica a conexão antes de continuar
      await apiHealthCheck();
    } catch (err) {
      setLoading(false);
      console.error('Servidor offline:', err);
      Alert.alert('Erro de conexão', 'Servidor indisponível. Verifique sua conexão ou tente novamente mais tarde.');
      return;
    }
  
    try {
      // 2️⃣ Gera token se servidor está ok
      const response = await gerarTokenRecuperacao(email);
      const mensagemBackend = response.data?.message || 'Verifique seu e-mail';
  
      Alert.alert(
        'Verifique seu e-mail',
        mensagemBackend,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('ResetPassword', { email })
          }
        ]
      );
    } catch (error: any) {
      console.error('Erro ao gerar token:', error);
      Alert.alert(
        'Erro',
        error.response?.data?.message || 'Ocorreu um erro ao tentar enviar o e-mail. Tente novamente mais tarde.'
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
        {/* Ícone cadeado */}
        <Icon name="lock" size={width * 0.15} color="#FFCD00" style={styles.lockIcon} />

        {/* Título */}
        <Text style={styles.title}>Esqueci a senha</Text>
        <Text style={styles.description}>
            Insira seu e-mail cadastrado e enviaremos um código para redefinir sua senha.
        </Text>


        {/* Input */}
        <StyledEmailInput
            placeholder="Insira o E-mail"
            value={email}
            onChangeText={setEmail}
        />

        {/* Botão */}
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleSendToken}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator animating={true} color="#000" />
        ) : (
          <Text style={styles.buttonText}>Enviar token</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.08,
  },

  lockIcon: {
    alignSelf: 'center',
    marginBottom: height * 0.025,
  },

  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: width * 0.045,
    color: '#000',
    marginBottom: height * 0.04,
  },

  button: {
    backgroundColor: '#4FD689',
    paddingVertical: height * 0.018,
    borderRadius: 8,
    alignSelf: 'center',
    width: width * 0.45,
    marginTop: height * 0.02,
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: width * 0.04,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    fontSize: width * 0.035,
    color: '#555',
    marginBottom: height * 0.03,
    paddingHorizontal: width * 0.05,
  },  
});

export default ForgotPasswordScreen;