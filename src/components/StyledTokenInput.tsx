import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface Props extends TextInputProps {
  label?: string;
}

const StyledTokenInput = ({ label, ...props }: Props) => {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...props}
        style={[styles.input, styles.inputUnderline, props.style]}
        placeholderTextColor="#BBBBBBFF"
      />
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
  input: {
    backgroundColor: '#E7E7E7FF',
    color: '#333',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    fontSize: width * 0.04,
  },
  inputUnderline: {
    borderBottomWidth: width * 0.003,
    borderColor: '#000',
    borderRadius: 0,
  },
});

export default StyledTokenInput;
