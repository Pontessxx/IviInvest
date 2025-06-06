import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import FailureScreen from '../screens/FailureScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';
import FormularioScreen from '../screens/FormularioScreen';
import HistoricoSimulacoesScreen from '../screens/HistoricoSimulacoesScreen';
import SimulacaoDetalheScreen from '../screens/SimulacaoDetalheScreen';
import SimulacaoCarteiraScreen from '../screens/SimulacaoCarteiraScreen';

export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
  Formulario: undefined;
  SimulacaoCarteira: { percentuais: any, ativos: any };
  HistoricoSimulacoes: undefined;
  SimulacaoDetalhe: { tipoCarteira: 'conservadora' | 'agressiva'; objetivoId: number };
  Chat: undefined;
  DeleteAccount: undefined;
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
      <Stack.Screen name="Chat" options={{ headerShown: false }}>
        {props => <ChatScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen 
        name="DeleteAccount" 
        component={DeleteAccountScreen} 
        options={{ title: 'Deletar Conta', headerStyle: { backgroundColor: '#000' }, headerTintColor: { color: '#fff' } }}
      />
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
       <Stack.Screen 
        name="Formulario" 
        component={FormularioScreen} 
        options={{ headerShown: false }}
      />
       <Stack.Screen 
        name="HistoricoSimulacoes" 
        component={HistoricoSimulacoesScreen} 
        options={{ headerShown: false }}
      />
       <Stack.Screen 
        name="SimulacaoDetalhe" 
        component={SimulacaoDetalheScreen} 
        options={{ headerShown: false }}
      />
       <Stack.Screen 
        name="SimulacaoCarteira" 
        component={SimulacaoCarteiraScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
