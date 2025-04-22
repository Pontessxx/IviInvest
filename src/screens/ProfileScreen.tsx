
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Switch, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import { getPerfilInvestidor, updatePerfilInvestidor } from '../services/api';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [email, setEmail] = useState('');
  const [perfil, setPerfil] = useState('');
  const perfis = ['Agressivo', 'Moderado', 'Conservador'];

  const toggleSwitch = async () => {
    const novoEstado = !notificationsEnabled;
    setNotificationsEnabled(novoEstado);
    await AsyncStorage.setItem('notificationsEnabled', novoEstado.toString());
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const savedEmail = await AsyncStorage.getItem('email');
      if (savedEmail) setEmail(savedEmail);
  
      const savedPerfil = await AsyncStorage.getItem('perfilInvestidor');
      if (savedPerfil) {
        setPerfil(savedPerfil);
      } else {
        try {
          const response = await getPerfilInvestidor();
          const perfilApi = response.data?.perfilInvestidor || '';
          setPerfil(perfilApi);
          await AsyncStorage.setItem('perfilInvestidor', perfilApi);
        } catch (error) {
          console.error('Erro ao buscar perfil:', error);
        }
      }
  
      const savedNotificacao = await AsyncStorage.getItem('notificationsEnabled');
      if (savedNotificacao !== null) {
        setNotificationsEnabled(savedNotificacao === 'true');
      }
    };
  
    fetchData();
  }, []);

  const handlePerfilChange = async (novoPerfil: string) => {
    setPerfil(novoPerfil);
    try {
      await updatePerfilInvestidor(novoPerfil);
      await AsyncStorage.setItem('perfilInvestidor', novoPerfil); // ← SALVA NO STORAGE
      Alert.alert('Sucesso', 'Perfil de investidor atualizado!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
    }
  };

  const firstChar = email?.[0]?.toUpperCase() || '?';

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstChar}</Text>
        </View>
        <View>
          <Text style={styles.username}>{email || 'Username'}</Text>
          <Text style={styles.userLevel}>Perfil <Text style={styles.agressivo}>{perfil}</Text></Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Perfil de Investidor</Text>
        <View style={styles.dropdown}>
        <Picker
          selectedValue={perfil}
          onValueChange={handlePerfilChange}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Selecione um perfil" value="" enabled={false} />
          {perfis.map(item => (
            <Picker.Item key={item} label={item} value={item} color="#000" />
          ))}
        </Picker>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Configuração</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Icon name="bell" size={18} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.settingText}>Notificação</Text>
          </View>
          <Switch value={notificationsEnabled} onValueChange={toggleSwitch} />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Icon name="info-circle" size={18} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.settingText}>Termos e Condições</Text>
          </View>
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Icon name="info-circle" size={18} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.settingText}>Seus Dados e Privacidades</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <View style={styles.buttonContent}>
          <Icon name="times" size={20} color="#f44" style={styles.buttonIcon} />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton}>
        <View style={styles.buttonContent}>
          <Icon name="trash" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.deleteText}>Excluir Perfil e dados</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.04,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  avatar: {
    backgroundColor: '#FFCD00',
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width * 0.04,
  },
  avatarText: {
    fontSize: width * 0.06,
    color: '#000',
    fontWeight: 'bold',
  },
  username: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#fff',
  },
  userLevel: {
    fontSize: width * 0.035,
    color: '#ccc',
    marginTop: 2,
  },
  agressivo: {
    color: '#FFCD00',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: width * 0.04,
    marginBottom: height * 0.025,
  },
  cardTitle: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: height * 0.015,
  },
  dropdown: {
    backgroundColor: '#333',
    borderRadius: 8,
  },
  picker: {
    color: '#fff',
    height: 55,
    width: '100%',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.015,
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    color: '#fff',
    fontSize: width * 0.037,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonIcon: {
    marginRight: 10,
  },
  logoutButton: {
    borderColor: '#f44',
    borderWidth: 1.5,
    paddingVertical: height * 0.015,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  logoutText: {
    color: '#f44',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  deleteButton: {
    backgroundColor: '#f44',
    paddingVertical: height * 0.017,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
});
