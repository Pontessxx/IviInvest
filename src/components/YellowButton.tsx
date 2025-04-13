// src/components/YellowButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, GestureResponderEvent } from 'react-native';

const { width, height } = Dimensions.get('window');

interface YellowButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: object;
}

const YellowButton = ({ title, onPress, style }: YellowButtonProps) =>{
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFCD00',
    paddingVertical: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
});

export default YellowButton;