// src/components/StyledPasswordInput.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const StyledPasswordInput = ({ value, onChangeText, placeholder }: any) => {
  const [secure, setSecure] = useState(true);

  return (
    <View style={[styles.passwordContainer, styles.inputUnderline]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secure}
        placeholderTextColor="#333"
        style={styles.passwordInput}
      />
      <TouchableOpacity onPress={() => setSecure(!secure)}>
        <Icon name={secure ? 'eye-slash' : 'eye'} size={width * 0.05} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7E7E7FF',
    borderRadius: 8,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.02,
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