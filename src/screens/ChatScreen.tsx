import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Dimensions, ScrollView,
  KeyboardAvoidingView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import BottomNavbar from '../components/BottomNavbar';
import { useApi } from '../hooks/useApi';

const { width, height } = Dimensions.get('window');

export default function ChatScreen() {
  const [mensagens, setMensagens] = useState<string[]>([
    'Olá, sou a IVI, sua assistente virtual de investimentos.'
  ]);
  const [input, setInput] = useState('');
  const [email, setEmail] = useState('');

  const { chatLivre } = useApi();

  useEffect(() => {
    AsyncStorage.getItem('email').then(value => {
      if (value) setEmail(value);
    });
  }, []);

  async function handleSend() {
    const texto = input.trim();
    if (!texto) return;

    setMensagens(prev => [...prev, texto]);
    setInput('');

    try {
      const resposta = await chatLivre(texto);
      setMensagens(prev => [...prev, resposta]);
    } catch (e) {
      console.warn('Erro ao chamar IA:', e);
      setMensagens(prev => [...prev, 'Erro ao obter resposta da IVI.']);
    }
  }

  return (
    <View style={styles.container}>
      <Header email={email} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {mensagens.map((msg, i) => (
          <View
            key={i}
            style={[
              styles.bubble,
              i === 0 || i % 2 === 0 ? styles.iviBubble : styles.userBubble
            ]}
          >
            <Text style={styles.bubbleText}>{msg}</Text>
          </View>
        ))}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Escreva sua dúvida..."
            placeholderTextColor="#888"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  scrollContent: { padding: 16, paddingBottom: 100 },
  bubble: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  iviBubble: {
    backgroundColor: '#333',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#0f0',
    alignSelf: 'flex-end',
  },
  bubbleText: { color: '#fff' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#1e1e1e',
  },
  input: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#fff',
    height: 44,
  },
  sendButton: { marginLeft: 8, padding: 8 },
  sendText: { color: '#0f0', fontSize: 24 },
});
