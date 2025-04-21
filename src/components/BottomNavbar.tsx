// src/components/BottomNavbar.tsx
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
//@ts-ignore
import Icon from 'react-native-vector-icons/Entypo';

const BottomNavbar = () => {
  return (
    <View style={styles.bottomNav}>
      <View style={styles.navItem}>
        <Icon name="home" size={24} color="#FFF" />
        <Text style={styles.navText}>Início</Text>
      </View>
      <View style={styles.navItem}>
        <Icon name="wallet" size={24} color="#FFF" />
        <Text style={styles.navText}>Carteiras</Text>
      </View>
      <View style={styles.navItem}>
        <Icon name="chat" size={24} color="#FFF" />
        <Text style={styles.navText}>Ivi</Text>
      </View>
      <View style={styles.navItem}>
        <Icon name="cog" size={24} color="#FFF" />
        <Text style={styles.navText}>Menu</Text>
      </View>
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
