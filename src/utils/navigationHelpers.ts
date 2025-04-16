import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  EsqueciSenha: undefined;
  Home: undefined;
  ResetPassword: undefined;
  Failure: { errorMessage: string; goBackTo: keyof RootStackParamList };
};


// leva para a pagina de falha
export const goToFailure = (
  navigation: NavigationProp<RootStackParamList>,
  errorMessage: string,
  goBackTo: keyof RootStackParamList
) => {
  navigation.navigate('Failure', {
    errorMessage,
    goBackTo,
  });
};
