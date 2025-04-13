import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

interface Props {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const StyledPasswordInput = ({ label, value, onChangeText, placeholder }: Props) => {
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.passwordContainer, styles.inputUnderline]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secure}
          placeholderTextColor="#BBBBBBFF"
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Icon name={secure ? 'eye-slash' : 'eye'} size={width * 0.05} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: height * 0.025,
  },
  label: {
    fontSize: width * 0.035,
    color: '#000',
    marginBottom: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7E7E7FF',
    borderRadius: 8,
    paddingHorizontal: width * 0.04,
  },
  inputUnderline: {
    borderBottomWidth: width * 0.003,
    borderColor: '#000',
    borderRadius: 0,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: height * 0.015,
    color: '#000',
    fontSize: width * 0.04,
  },
});

export default StyledPasswordInput;
