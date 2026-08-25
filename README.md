# Bem-vindo ao Quebra Tijolo do Projeto Integrador TAS8128 👋

🎓 [UCS](https://www.ucs.br/site) | 👤 [Fernando Pimmel](https://github.com/FernandUCS) | 👤 [Fernando Flores](https://github.com/FFCCunha) |👤 [Gilson Viana](https://github.com/gilsonviana) |👤 [Isaac Linck](https://github.com/IsaacLCordova) | 👤 [Lucas Trentin](https://github.com/luctrentin)

## Introdução

O Quebra Tijolo é um jogo arcade no estilo Brick Breaker. Ele segue regras básicas onde o objetivo é quebrar todos tijolos acima da plataforma.

- [Lógica para geração de níveis](docs/GERADOR_NIVEIS.md)
- [Design das telas (Wireframes)](docs/WIREFRAMES.md)

## Escolhas

Foi escolhido a plataforma _React Native_ utilizando a ferramenta Expo SDK 57 que proporciona um ambiente avançado de teste e desenvolvimento em _JavaScript_, possibilitando com facilidade gerar código nativo tanto para Android como iOS. 
O arquivo instalável poderá ser gerado a partir da [linha de comando](#instalação), bem como baixado dentro do [próprio repositório](#).

Maiores detalhes sobre o ambiente de desenvolvimento podem ser encontrados em [AMBIENTE.md](docs/AMBIENTE.md).

## Instalação

Após clonar o [repositório](https://github.com/gilsonviana/android.TAS8128.ucs.pi) em seu computador, entre na pasta do projeto e siga os seguintes passos:

1. Instalar dependencias

   ```bash
   npm install
   ```

2. Iniciar o jogo

   ```bash
   npx expo start
   ```

```
💡 DICA: Caso deseje executar o jogo no emulador Android, siga o passos [aqui](https://docs.expo.dev/workflow/android-studio-emulator/).
```

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
