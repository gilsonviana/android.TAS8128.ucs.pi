# Ambiente de Desenvolvimento

## Ambiente escolhido

O desenvolvimento foi feito utilizando **Visual Studio Code** como editor de código, em conjunto com o **Expo SDK 57**, que permite testar o aplicativo em tempo real através do app **Expo Go** ou de um emulador Android/iOS, sem a necessidade de compilar o projeto a cada alteração.

## Tecnologias e linguagens

- **JavaScript / TypeScript**: linguagens utilizadas para a programação da lógica do jogo e das telas.
- **React Native**: framework utilizado para construir a interface do aplicativo de forma nativa para Android e iOS a partir de um único código.
- **Expo**: conjunto de ferramentas sobre o React Native que facilita a criação, o teste e a geração do aplicativo final.
- **Expo Router**: utilizado para a navegação entre as telas do jogo.
- **React Native Game Engine**: biblioteca utilizada para controlar a lógica e a física do jogo (movimento da bola, colisões, etc).

## Geração do arquivo APK

O arquivo instalável (APK) do jogo é gerado utilizando o serviço **EAS Build**, da própria Expo. O processo consiste em:

1. Instalar a ferramenta de linha de comando do EAS:

   ```bash
   npm install -g eas-cli
   ```

2. Fazer login com uma conta Expo:

   ```bash
   eas login
   ```

3. Executar o comando de build para Android:

   ```bash
   eas build --platform android --profile preview
   ```

Esse comando compila o projeto nos servidores da Expo e gera um arquivo `.apk`, que pode ser baixado e instalado diretamente em um aparelho Android para testes, sem a necessidade de publicá-lo em uma loja de aplicativos.
