// src/screens/SimulacaoCarteiraScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
//@ts-ignore
import Icon from 'react-native-vector-icons/Feather';
import Header from '../components/Header';
import { useApi } from '../hooks/useApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../navigation/AppStack';

const { width } = Dimensions.get('window');

export default function SimulacaoCarteiraScreen() {
  const { selecionarCarteira } = useApi();
  const route = useRoute<RouteProp<AppStackParamList, 'SimulacaoCarteira'>>();
  const { percentuais, ativos } = route.params;

  const [email, setEmail] = useState('');
  const [perfilSelecionado, setPerfilSelecionado] = useState<'conservadora' | 'agressiva'>('conservadora');

  useEffect(() => {
    const fetchEmail = async () => {
      const savedEmail = await AsyncStorage.getItem('email');
      if (savedEmail) setEmail(savedEmail);
    };
    fetchEmail();
  }, []);

  const data = percentuais?.[perfilSelecionado];
  const lista = ativos?.[perfilSelecionado];

  const chartData = data
    ? [
        { name: 'Renda Fixa', population: data.rendaFixa || 0, color: '#00ff99', legendFontColor: '#fff', legendFontSize: 12 },
        { name: 'Ações', population: data.acoes || 0, color: '#3399ff', legendFontColor: '#fff', legendFontSize: 12 },
        { name: 'FIIs', population: data.fiis || 0, color: '#ffcc00', legendFontColor: '#fff', legendFontSize: 12 },
        { name: 'Cripto', population: data.cripto || 0, color: '#ff6666', legendFontColor: '#fff', legendFontSize: 12 },
      ]
    : [];

  const handleSalvar = async () => {
    const indice = perfilSelecionado === 'conservadora' ? 0 : 1;
    try {
      await selecionarCarteira(indice);
      Alert.alert('Sucesso', 'Carteira selecionada com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao selecionar carteira.');
    }
  };

  return (
    <View style={styles.container}>
      <Header email={email} />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={[styles.switchBtn, perfilSelecionado === 'conservadora' && styles.switchAtivo]}
            onPress={() => setPerfilSelecionado('conservadora')}
          >
            <Text style={styles.switchText}>Conservadora</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.switchBtn, perfilSelecionado === 'agressiva' && styles.switchAtivo]}
            onPress={() => setPerfilSelecionado('agressiva')}
          >
            <Text style={styles.switchText}>Agressiva</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Carteira {perfilSelecionado.toUpperCase()}:</Text>

        {chartData.length > 0 && (
          <PieChart
            data={chartData}
            width={width - 40}
            height={200}
            chartConfig={{ color: () => `#fff` }}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft={'16'}
            center={[0, 0]}
            hasLegend={true}
          />
        )}

        <View style={styles.listaContainer}>
          <Text style={styles.subTitle}>Ativos sugeridos:</Text>
          {lista && Object.entries(lista).map(([categoria, nomes]: [string, string[]]) => (
            <View key={categoria} style={styles.ativoCategoria}>
              <Text style={styles.categoriaTitulo}>{categoria.toUpperCase()}</Text>
              {nomes.map((nome, idx) => (
                <View key={idx} style={styles.ativoBox}>
                  <Text style={styles.ativoNome}>{nome}</Text>
                  <Icon name="arrow-right-circle" size={18} color="#ccc" />
                </View>
              ))}
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.salvarBtn} onPress={handleSalvar}>
          <Text style={styles.salvarText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scroll: { padding: 16, paddingBottom: 80 },
  switchContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  switchBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#00ff99',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  switchAtivo: {
    backgroundColor: '#00ff99',
  },
  switchText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: { color: '#fff', fontSize: 16, marginBottom: 12, textAlign: 'center' },
  subTitle: { color: '#ccc', fontSize: 14, marginBottom: 8 },
  listaContainer: { marginTop: 24 },
  ativoCategoria: { marginBottom: 16 },
  categoriaTitulo: { color: '#00ff99', marginBottom: 8, fontWeight: 'bold' },
  ativoBox: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ativoNome: { color: '#fff', fontSize: 14 },
  salvarBtn: {
    marginTop: 24,
    backgroundColor: '#00ff99',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  salvarText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
});
