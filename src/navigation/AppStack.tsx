import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import FailureScreen from '../screens/FailureScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
  Failure: { errorMessage: string; goBackTo: keyof AppStackParamList };
  ResetPassword: { email: string; token: string };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home"
        options={{ headerShown: false }}
      >
        {props => <HomeScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Profile" options={{ title: 'Perfil', headerStyle: { backgroundColor: '#000' }, headerTintColor: { color: '#fff' } }}>
        {props => <ProfileScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen 
        name="Failure" 
        component={FailureScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ResetPassword" 
        component={ResetPasswordScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
