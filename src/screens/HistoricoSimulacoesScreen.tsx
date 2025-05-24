// src/screens/HistoricoSimulacoesScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { useApi } from '../hooks/useApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
//@ts-ignore
import Icon from 'react-native-vector-icons/Feather';
import BottomNavbar from '../components/BottomNavbar';
import { useNavigation } from '@react-navigation/native'; 

const { width } = Dimensions.get('window');


export default function HistoricoSimulacoesScreen() {
  const { buscarHistoricoObjetivos } = useApi();
  const [email, setEmail] = useState('');
  const [historico, setHistorico] = useState<any[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    const load = async () => {
      const savedEmail = await AsyncStorage.getItem('email');
      if (savedEmail) setEmail(savedEmail);

      const res = await buscarHistoricoObjetivos();
      setHistorico(res.data);
    };
    load();
  }, []);

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.info}>Objetivo: {item.objetivo}</Text>
        <Text style={styles.info}>Prazo: {item.prazo}</Text>
        <Text style={styles.info}>Valor Inicial: R$ {item.valorInicial?.toFixed(2)}</Text>
        <Text style={styles.info}>Aporte mensal: R$ {item.aporteMensal?.toFixed(2)}</Text>
        <Text style={styles.info}>Tipo de Liquidez: {item.liquidez}</Text>
      </View>
  
      <TouchableOpacity
        style={styles.iconBox}
        onPress={() =>
          navigation.navigate('SimulacaoDetalhe', {
            tipoCarteira: 'agressiva',
            objetivoId: item.id || index + 1
          })
        }
      >
        <Icon name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header email={email} />
      <Text style={styles.title}>Histórico de Simulações</Text>
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={historico}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  data: { color: '#ccc', marginBottom: 6 },
  info: { color: '#fff', fontSize: 13, marginBottom: 2 },
  iconBox: {
    paddingLeft: 12,
    justifyContent: 'center',
  },
});
