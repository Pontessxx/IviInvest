import Header from '../components/Header';
import BottomNavbar from '../components/BottomNavbar';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView  } from 'react-native';

const { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const HomeScreen = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      const savedEmail = await AsyncStorage.getItem('email');
      if (savedEmail) setEmail(savedEmail);
    };
    fetchEmail();
  }, []);
  
  return (
    <View style={styles.container}>
      <Header email={email}/>
      <View style={styles.content}>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <Text style={styles.msginitial}>Olá {email}, seja bem-vindo(a)!</Text>
            <View style={styles.card}>
            <Text style={styles.cardTitle}>📊 Gráfico de Crescimento</Text>
            <View style={styles.chartContainer}>
              <View style={[styles.bar, { height: 40 }]} />
              <View style={[styles.bar, { height: 70 }]} />
              <View style={[styles.bar, { height: 100 }]} />
              <View style={[styles.bar, { height: 60 }]} />
              <View style={[styles.bar, { height: 90 }]} />
            </View>
            <Text style={styles.cardSubtitle}>Simulação de tendência semanal</Text>
          </View>

          {/* === Card 2 - Taxa Selic Decorativa === */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>💰 Taxa Selic Atual</Text>
            <Text style={styles.selicValue}>10.75%</Text>
            <Text style={styles.cardSubtitle}>Atualizado automaticamente</Text>
          </View>
          </ScrollView>
      </View>
      <BottomNavbar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: 0,
  },
  msginitial: {
    color: '#4f4f4f',
    fontSize: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    color: '#FFD60A',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardSubtitle: {
    color: '#888',
    fontSize: 14,
    marginTop: 8,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    marginTop: 10,
  },
  bar: {
    width: 20,
    backgroundColor: '#FFD60A',
    borderRadius: 4,
  },
  selicValue: {
    color: '#00FF88',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});
  

export default HomeScreen;