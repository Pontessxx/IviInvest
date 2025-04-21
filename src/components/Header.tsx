import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Header = ({ email }: { email: string }) => {
  const navigation = useNavigation();

  const firstChar = email?.[0]?.toUpperCase() || '?';

  const handleGoToProfile = () => {
    navigation.navigate('Profile' as never); // ajustamos isso no AppStack
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.avatarButton} onPress={handleGoToProfile}>
        <Text style={styles.avatarText}>{firstChar}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nameContainer} onPress={handleGoToProfile}>
        <Text style={styles.nameText}>Perfil</Text>
        <Icon name="arrow-right" size={14} color="#FFF" style={{ marginLeft: 6 }} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.bellButton}>
        <Icon name="bell" size={22} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1c1c1c',
    paddingHorizontal: width * 0.05,
    paddingTop: 16,
    paddingBottom: 12,
    elevation: 5,
    zIndex: 10,
    marginBottom: 10,
  },
  avatarButton: {
    backgroundColor: '#2C2C2C',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 15,
  },
  nameText: {
    color: '#FFF',
    fontSize: 16,
  },
  bellButton: {
    padding: 8,
  },
});

export default Header;
