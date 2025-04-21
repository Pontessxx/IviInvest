import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import FailureScreen from '../screens/FailureScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

export type AppStackParamList = {
  Home: { email: string };
  Failure: { errorMessage: string; goBackTo: keyof AppStackParamList };
  ResetPassword: { email: string; token: string };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack({ email }: { email: string }) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home"
        options={{ headerShown: false }}
      >
        {props => <HomeScreen {...props} email={email} />}
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
