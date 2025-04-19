
# Getting Started

## Step 1: Start Metro
Primeiro passo: inicie o node

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

Faça a build do projeto:

```sh
# Using npm
npx react-native build-android
```
### Android

```sh
# Using npm
npx react-native run-android

# OR using Yarn
yarn android
```

## Pegando os logs 
```sh
    npx react-native log-android
```
assim consigo pegar os consoles.log do app

## Rodando o App
```sh
npx react-native run-android
```

## Step 3:

Para garantir que rode o backend terá que realizar o clone do projeto :
*[link-github-bem-aqui]()*

### adicione a variavel de ambiente no backend:

Crie um arquivo chamado *.env* dentro da pasta `./Iviinvest` e adicione as seguintes variaveis
```
JWT_SECRET=estaChaveTemQueTer64Caracteres
EMAIL_GMAIL=SeuEmail@Email.com
EMAIL_SENHA_APP=senhadoappemail
```

### Verifique se o seu ip

Vá até o CMD e digite
```cmd
ipconfig
```
retornará o ip da sua maquina visto a internet que esteja conectado, lembre-se que caso esteja conectado com cabo coloque o ip da coneção a cabo, caso esteja wifi coloque o ip da placa wifi

###