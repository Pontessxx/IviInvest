import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import Icon from 'react-native-vector-icons/Feather';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../context/AuthContext';

const DeleteAccountScreen = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [understandConsequences, setUnderstandConsequences] = useState(false);
  const { deletarConta } = useApi();
  const { logout } = useAuth();

  const [email, setEmail] = useState('');
  const firstChar = email?.[0]?.toUpperCase() || '?';

  useEffect(() => {
    const fetchEmail = async () => {
      const savedEmail = await AsyncStorage.getItem('email');
      if (savedEmail) setEmail(savedEmail);
    };
    fetchEmail();
  }, []);

  const handleDeleteAccount = async () => {
    if (!confirmDelete || !understandConsequences) {
      Alert.alert('Atenção', 'Você deve confirmar todas as opções para excluir o perfil.');
      return;
    }
  
    try {
      await deletarConta();
      Alert.alert('Perfil excluído', 'Seu perfil e todos os dados foram removidos.');
  
      await deletarConta();
      await AsyncStorage.clear();
      logout();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar excluir seu perfil.');
    }
  };

  return (
    <View style={styles.container}>

      {/* Avatar e username */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstChar}</Text>
        </View>
        <Text style={styles.username}>{email}</Text>
      </View>

      {/* Informações de exclusão */}
      <Text style={styles.title}>Excluir perfil</Text>
      <Text style={styles.description}>
        Estamos tristes em ver você partir. Antes de prosseguir com a exclusão do seu perfil, por favor,
        leia as informações abaixo e marque as opções que se aplicam.
      </Text>

      <View style={styles.bulletList}>
        <Text style={styles.bulletText}>• A exclusão do perfil é permanente e não pode ser desfeita.</Text>
        <Text style={styles.bulletText}>• Todos os seus dados serão removidos.</Text>
        <Text style={styles.bulletText}>• Você não poderá recuperar seu perfil ou informações associadas.</Text>
      </View>

      {/* Checkboxes */}
      <TouchableOpacity style={styles.checkbox} onPress={() => setConfirmDelete(!confirmDelete)}>
        <Icon name={confirmDelete ? "check-square" : "square"} size={24} color="#FFF" />
        <Text style={styles.checkboxText}>Confirmo que desejo excluir meu perfil permanentemente.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkbox} onPress={() => setUnderstandConsequences(!understandConsequences)}>
        <Icon name={understandConsequences ? "check-square" : "square"} size={24} color="#FFF" />
        <Text style={styles.checkboxText}>Entendo que todos os meus dados serão removidos e não poderão ser recuperados.</Text>
      </TouchableOpacity>

      {/* Botão vermelho */}
      <TouchableOpacity
        style={[styles.deleteButton, !(confirmDelete && understandConsequences) && { backgroundColor: '#555' }]}
        onPress={handleDeleteAccount}
        disabled={!(confirmDelete && understandConsequences)}
      >
        <Icon name="trash-2" size={20} color="#FFF" />
        <Text style={styles.deleteButtonText}>Excluir Perfil e dados</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  username: {
    marginTop: 10,
    color: '#FFF',
    fontSize: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: '#AAA',
    marginBottom: 15,
  },
  bulletList: {
    marginBottom: 20,
  },
  bulletText: {
    color: '#FFF',
    marginBottom: 5,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    color: '#FFF',
    marginLeft: 10,
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default DeleteAccountScreen;
