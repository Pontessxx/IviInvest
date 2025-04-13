// src/components/StyledEmailInput.tsx
import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const StyledEmailInput = (props: TextInputProps) => {
  return (
    <TextInput
      {...props}
      style={[styles.input, styles.inputUnderline, props.style]}
      placeholderTextColor="#333"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#E7E7E7FF',
    color: '#333',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    fontSize: width * 0.04,
    marginBottom: height * 0.02,
  },
  inputUnderline: {
    borderBottomWidth: width * 0.003,
    borderColor: '#000',
    borderRadius: 0,
  },
});

export default StyledEmailInput;