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
            {/* ...resto do conteúdo... */}
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
});
  

export default HomeScreen;