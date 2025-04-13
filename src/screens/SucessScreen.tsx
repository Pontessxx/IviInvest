import React from 'react';

import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined; // substitua pelo nome real da próxima tela
  Success: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Success'>;

const { width, height } = Dimensions.get('window');

const SuccessScreen = ({ navigation }: Props) => {

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="check" size={width * 0.1} color="#fff" />
      </View>
      <Text style={styles.title}>Sucesso</Text>
      <Text style={styles.subtitle}>Login realizado com sucesso!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.06,
  },

  iconContainer: {
    backgroundColor: '#4FD689',
    borderRadius: width * 0.15,
    width: width * 0.18,
    height: width * 0.18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.03,
    borderWidth: 2,
    borderColor: '#00B86B',
  },

  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: height * 0.01,
  },

  subtitle: {
    fontSize: width * 0.035,
    color: '#333',
    textAlign: 'center',
  },
});
export default SuccessScreen;