// src/components/YellowButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, GestureResponderEvent, ViewStyle } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

interface YellowButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  loading?: boolean;
}

const YellowButton = ({ title, onPress, style, loading = false }: YellowButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={MD2Colors.black} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

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