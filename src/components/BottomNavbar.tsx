// src/components/BottomNavbar.tsx
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
//@ts-ignore
import Icon from 'react-native-vector-icons/Entypo';
import { AppStackParamList } from '../navigation/AppStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const BottomNavbar = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.replace('Home')}>
        <Icon name="home" size={24} color="#FFF" />
        <Text style={styles.navText}>Início</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="wallet" size={24} color="#FFF" />
        <Text style={styles.navText}>Carteiras</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.replace('Chat')}>
        <Icon name="chat" size={24} color="#FFF" />
        <Text style={styles.navText}>Ivi</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="cog" size={24} color="#FFF" />
        <Text style={styles.navText}>Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1E1E1E',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 4,
  },
});

export default BottomNavbar;
