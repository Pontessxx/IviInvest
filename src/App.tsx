import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider, useAuth } from './context/AuthContext';
import Toast from 'react-native-toast-message';

function Routes() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AppStack /> : <AuthStack />;
}

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
        <Toast />
      </PaperProvider>
    </AuthProvider>
  );
}
