// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import FailureScreen from './screens/FailureScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }
        }/>
        <Stack.Screen 
          name="Cadastro" 
          component={RegisterScreen}  
          options={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor:{
              color: '#fff',
            }
        }}
        />
        <Stack.Screen 
            name="EsqueciSenha" 
            component={ForgotPasswordScreen} 
            options={{
              title: 'Esqueci a senha',
              headerStyle: {
                backgroundColor: '#000',
              },
              headerTintColor:{
                color: '#fff',
              }
            }}
        />

        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, animation: 'slide_from_right'}} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false, animation: 'slide_from_right'}} />
        <Stack.Screen name="Failure" component={FailureScreen} options={{ headerShown: false, animation: 'slide_from_right'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
