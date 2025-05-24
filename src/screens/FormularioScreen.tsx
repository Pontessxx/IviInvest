import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions} from 'react-native';
import FormularioObjetivo from '../components/FormularioObjetivo';

import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavbar from '../components/BottomNavbar';

const { width } = Dimensions.get('window');

const FormularioScreen = () => {

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

      {/* Formulário */}
      <View style={styles.formContainer}>
        <FormularioObjetivo onSucesso={() => console.log('Objetivo salvo!')} />
      </View>

      
     <BottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  header: {
    padding: 16,
    paddingTop: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a'
  },
  perfilContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  avatarText: {
    color: '#000',
    fontWeight: 'bold'
  },
  perfilText: {
    color: '#fff',
    fontSize: 16
  },
  formContainer: {
    flex: 1,
    margin: 16,
    backgroundColor: '#121212',
    borderRadius: 10,
    padding: 16,
  }
});

export default FormularioScreen;
