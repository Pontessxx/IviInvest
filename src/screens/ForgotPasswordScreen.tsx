import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import StyledEmailInput from '../components/StyledEmailInput';
import { gerarTokenRecuperacao } from '../services/api';

// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  ForgotPassword: undefined;
  ResetPassword: { email: string; token: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;


const { width, height } = Dimensions.get('window');

const ForgotPasswordScreen = ({ navigation }: Props) =>{
  const [email, setEmail] = useState('');

  const handleSendToken = async () => {
    try {
      if (!email) {
        Alert.alert('Por favor, insira um e-mail válido');
        return;
      }

      const response = await gerarTokenRecuperacao(email);
      const token = response.data.token;

      Alert.alert(
        'Token gerado',
        `Seu token: ${token}`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('ResetPassword', { email, token })
          }
        ]
      );

    } catch (error: any) {
      if (error.response?.data?.message) {
        Alert.alert(`Erro: ${error.response.data.message}`);
      } else {
        Alert.alert('Erro ao gerar token. Verifique sua conexão ou tente novamente.');
      }
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
        <TouchableOpacity style={styles.button} onPress={handleSendToken}>
            <Text style={styles.buttonText}>Enviar token</Text>
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