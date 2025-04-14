import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import StyledEmailInput from '../components/StyledEmailInput';
import StyledPasswordInput from '../components/StyledPasswordInput';
import YellowButton from '../components/YellowButton';

const { width, height } = Dimensions.get('window');

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = () => {
    console.log('Resetando senha para:', email, token, newPassword);
    // adicionar logica para resetar a senha
  };

  return (
    <View style={styles.container}>
        {/* Icone de cadeado */}
        <Icon name="lock" size={width * 0.15} color="#FFCD00" style={styles.lockIcon} />

        {/* Título */}
        <Text style={styles.title}>Esqueci a senha</Text>

        {/* Descrição */}
        <Text style={styles.description}>
            Insira seu e-mail cadastrado e enviaremos um código para redefinir sua senha.
        </Text>

        {/* Campos */}
        <StyledEmailInput
            label="E-mail"
            placeholder="Insira o E-mail"
            value={email}
            onChangeText={setEmail}
        />

        <StyledEmailInput
            label="Token"
            placeholder="Insira o Token"
            value={token}
            onChangeText={setToken}
        />

        <StyledPasswordInput
            label="Nova Senha"
            placeholder="Nova senha"
            value={newPassword}
            onChangeText={setNewPassword}
        />

        <YellowButton title="Recadastrar Senha" onPress={handleResetPassword} />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      paddingHorizontal: width * 0.06,
      paddingTop: height * 0.05,
      paddingBottom: height * 0.04,
      justifyContent: 'space-between',
    },
  
    content: {
      // bloco superior
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
    },
  
    description: {
      textAlign: 'center',
      fontSize: width * 0.035,
      color: '#555',
      marginBottom: height * 0.03,
      paddingHorizontal: width * 0.05,
    },
  });
  
  

export default ResetPasswordScreen;