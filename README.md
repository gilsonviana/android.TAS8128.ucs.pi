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

O arquivo instalável (APK) do jogo pode ser gerado localmente através do Gradle. O processo consiste em:

1. Preparar o projeto nativo:

   ```bash
   npx expo prebuild --platform android --clean
   ```

2. Compilar o APK debug:

   ```bash
   cd android && ./gradlew assembleDebug
   ```

   O arquivo gerado estará em: `android/app/build/outputs/apk/debug/app-debug.apk`

3. Para um APK de release:

   ```bash
   cd android && ./gradlew assembleRelease
   ```

   O arquivo gerado estará em: `android/app/build/outputs/apk/release/app-release.apk`

O APK pode ser instalado diretamente em um aparelho Android ou emulador para testes.
