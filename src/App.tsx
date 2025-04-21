import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  return (
    <PaperProvider>
      <NavigationContainer>
        {isAuthenticated ? <AppStack email={userEmail}/> : <AuthStack onLoginSuccess={(email:string) => {setUserEmail(email); setIsAuthenticated(true)}} />}
      </NavigationContainer>
    </PaperProvider>
  );
}