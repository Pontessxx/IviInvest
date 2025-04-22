import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import FailureScreen from '../screens/FailureScreen';

type AuthStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    EsqueciSenha: undefined;
    ResetPassword: { email: string; token: string };
  };  
const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
      <Stack.Screen
        name="Cadastro"
        options={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
        component={RegisterScreen}
      />
      <Stack.Screen
        name="EsqueciSenha"
        component={ForgotPasswordScreen}
        options={{
          title: 'Esqueci a senha',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ headerShown: false, animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Failure"
        component={FailureScreen}
        options={{ headerShown: false, animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}
