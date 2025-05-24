// src/screens/SimulacaoDetalheScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useApi } from '../hooks/useApi';
import Header from '../components/Header';
import { PieChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

export default function SimulacaoDetalheScreen() {
  const route = useRoute<RouteProp<any, any>>();
  const { tipoCarteira, objetivoId } = route.params;
  const { simularRentabilidade } = useApi();
  const [simulacao, setSimulacao] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const res = await simularRentabilidade(tipoCarteira, objetivoId);
      setSimulacao(res.data);
    };
    load();
  }, []);

  const dados = simulacao?.objetivo;
  const percentuais = simulacao?.percentuais;
  const ativos = simulacao?.ativos;

  const chartData = percentuais
    ? [
        { name: 'Renda Fixa', population: percentuais.rendaFixa, color: '#00ff99', legendFontColor: '#fff', legendFontSize: 12 },
        { name: 'Ações', population: percentuais.acoes, color: '#3399ff', legendFontColor: '#fff', legendFontSize: 12 },
        { name: 'FIIs', population: percentuais.fiis, color: '#ffcc00', legendFontColor: '#fff', legendFontSize: 12 },
        { name: 'Cripto', population: percentuais.cripto, color: '#ff6666', legendFontColor: '#fff', legendFontSize: 12 },
      ]
    : [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Header email="" />

      <View style={styles.box}>
        <Text style={styles.title}>Dados da Simulação</Text>
        <Text style={styles.text}>Investimento inicial: R$ {dados?.valorInicial?.toFixed(2)}</Text>
        <Text style={styles.text}>Investimento mensal: R$ {dados?.aporteMensal?.toFixed(2)}</Text>
        <Text style={styles.text}>Rentabilidade anual: --%</Text>
        <Text style={styles.text}>Prazo: {dados?.prazo}</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>Carteira Recomendada</Text>
        <PieChart
          data={chartData}
          width={width - 32}
          height={180}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="16"
          chartConfig={{ color: () => '#fff' }}
        />
      </View>

      {ativos && Object.entries(ativos).map(([categoria, lista]: [string, any]) => (
        <View key={categoria} style={styles.carteiraBox}>
          <Text style={styles.categoria}>{categoria.toUpperCase()}</Text>
          {lista.map((ativo: any, idx: number) => (
            <View key={idx} style={styles.ativoItem}>
              <View style={styles.ativoBox} />
              <View>
                <Text style={styles.ativoNome}>{ativo.nomeAtivo}</Text>
                <Text style={styles.ativoValor}>R$ {ativo.precoUnitario?.toFixed(2)}</Text>
                <Text style={styles.ativoQtd}>{ativo.quantidadeCotas} cotas</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scrollContent: { padding: 16, paddingBottom: 80 },
  box: { backgroundColor: '#1e1e1e', borderRadius: 10, padding: 16, marginBottom: 16 },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  text: { color: '#ccc', marginBottom: 4 },
  carteiraBox: { marginBottom: 16 },
  categoria: { color: '#00ff99', marginBottom: 6, fontWeight: 'bold' },
  ativoItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  ativoBox: { width: 40, height: 40, backgroundColor: '#ccc', borderRadius: 8, marginRight: 12 },
  ativoNome: { color: '#fff' },
  ativoValor: { color: '#aaa', fontSize: 12 },
  ativoQtd: { color: '#aaa', fontSize: 12 },
});
