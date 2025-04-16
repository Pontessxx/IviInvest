// src/screens/FailureScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Failure: { errorMessage: string; goBackTo: keyof RootStackParamList };
  Login: undefined;
  Cadastro: undefined;
  EsqueciSenha: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Failure'>;

const { width, height } = Dimensions.get('window');

export default function FailureScreen({ route, navigation }: Props) {
  const { errorMessage, goBackTo } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(goBackTo);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="times" size={width * 0.1} color="#fff" />
      </View>
      <Text style={styles.title}>Algo deu errado</Text>
      <Text style={styles.subtitle}>{errorMessage}</Text>
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
    backgroundColor: '#ff5e5e',
    borderRadius: width * 0.15,
    width: width * 0.18,
    height: width * 0.18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.03,
    borderWidth: 2,
    borderColor: '#cc0000',
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
