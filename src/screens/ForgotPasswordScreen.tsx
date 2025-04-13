import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import StyledEmailInput from '../components/StyledEmailInput';

// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const ForgotPasswordScreen =() =>{
  const [email, setEmail] = useState('');

  const handleSendToken = () => {
    console.log('Token enviado para:', email);
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