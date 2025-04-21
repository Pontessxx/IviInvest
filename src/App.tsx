import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <PaperProvider>
      <NavigationContainer>
        {isAuthenticated ? (
          <AppStack />
        ) : (
          <AuthStack onLoginSuccess={() => setIsAuthenticated(true)} />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
