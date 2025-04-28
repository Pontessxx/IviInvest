import Header from '../components/Header';
import BottomNavbar from '../components/BottomNavbar';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ChatScreen = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [formData, setFormData] = useState({
    objetivo: '',
    prazo: '',
    valorInicial: '',
    aporteMensal: '',
    patrimonioAtual: '',
    liquidez: '',
    setoresEvitar: [],
  });

  const [mensagens, setMensagens] = useState<string[]>([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      const savedEmail = await AsyncStorage.getItem('email');
      if (savedEmail) setEmail(savedEmail);
    };
    fetchEmail();
  }, []);
  
  const handleEnviarFormulario = () => {
    console.log('Dados enviados:', formData);

    setMensagens([
      `Olá! Simulei 2 carteiras para seu perfil ${formData.objetivo} em ${formData.prazo}.`
    ]);

    setFormularioEnviado(true);
  };

  return (
    <View style={styles.container}>
      <Header email={email} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!formularioEnviado ? (
          <View style={styles.formulario}>
            <Text style={styles.label}>Objetivo</Text>
            <TextInput
              style={styles.input}
              value={formData.objetivo}
              onChangeText={(text) => setFormData({ ...formData, objetivo: text })}
            />

            <Text style={styles.label}>Prazo</Text>
            <TextInput
              style={styles.input}
              value={formData.prazo}
              onChangeText={(text) => setFormData({ ...formData, prazo: text })}
            />

            <Text style={styles.label}>Valor Inicial (R$)</Text>
            <TextInput
              style={styles.input}
              value={formData.valorInicial}
              onChangeText={(text) => setFormData({ ...formData, valorInicial: text })}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Aporte Mensal (R$)</Text>
            <TextInput
              style={styles.input}
              value={formData.aporteMensal}
              onChangeText={(text) => setFormData({ ...formData, aporteMensal: text })}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Patrimônio Atual (R$)</Text>
            <TextInput
              style={styles.input}
              value={formData.patrimonioAtual}
              onChangeText={(text) => setFormData({ ...formData, patrimonioAtual: text })}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Tipo de Liquidez</Text>
            <TextInput
              style={styles.input}
              value={formData.liquidez}
              onChangeText={(text) => setFormData({ ...formData, liquidez: text })}
            />

            <TouchableOpacity style={styles.button} onPress={handleEnviarFormulario}>
              <Text style={styles.buttonText}>Fazer Simulação</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.chat}>
            {mensagens.map((mensagem, index) => (
              <View key={index} style={styles.mensagemIvi}>
                <Text style={{ color: '#fff' }}>{mensagem}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    paddingHorizontal: width * 0.05,
    paddingBottom: 20,
  },
  formulario: {
    marginTop: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#2c2c2c',
    color: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    borderColor: '#fff',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  chat: {
    marginTop: 20,
  },
  mensagemIvi: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
});

export default ChatScreen;
