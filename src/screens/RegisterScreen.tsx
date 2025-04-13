import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import StyledEmailInput from '../components/StyledEmailInput';
import StyledPasswordInput from '../components/StyledPasswordInput';
import YellowButton from '../components/YellowButton';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

const { width, height } = Dimensions.get('window');

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>
      <Text style={styles.description}>
        Crie sua conta para acessar a plataforma e gerenciar seus investimentos com segurança.
      </Text>

  
      <View style={styles.formArea}>
        <StyledEmailInput
          label="Insira o E-mail"
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
  
        <StyledPasswordInput
          label="Senha"
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
        />
  
        <StyledPasswordInput
          label="Insira novamente a senha"
          placeholder="Confirme sua senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
      </View>
  
      <YellowButton title="Cadastrar" onPress={() => console.log('BTN - CADASTRAR')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.05,
    paddingBottom: height * 0.03,
    justifyContent: 'space-between', // empurra o botão pra baixo
  },

  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },

  formArea: {
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: height * 0.04,
  },

  description: {
    textAlign: 'center',
    fontSize: width * 0.035,
    color: '#555',
    marginTop: height * 0.015,
    paddingHorizontal: width * 0.05,
  },
  
});
