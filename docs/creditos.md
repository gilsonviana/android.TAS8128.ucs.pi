# Funcionalidade: Créditos

Tela que exibe os créditos do projeto **Quebra Tijolo** — a equipe, a
disciplina e a instituição — acessível por uma aba própria na barra inferior.

## Objetivo

Atender ao requisito de apresentar os autores do trabalho dentro do próprio
aplicativo, de forma legível e navegável, funcionando em Android, iOS e Web.

## Arquivos

| Arquivo | Responsabilidade |
| --- | --- |
| `src/app/credits.tsx` | Tela (rota `/credits`) que monta o layout dos créditos. |
| `src/components/credit-row.tsx` | Componente reutilizável que exibe um integrante (inicial, nome e papel). |
| `src/constants/credits.ts` | Dados da equipe e do projeto, separados da interface. |
| `src/components/app-tabs.tsx` | Registro da aba **Créditos** na navegação nativa (Android/iOS). |
| `src/components/app-tabs.web.tsx` | Registro da aba **Créditos** na navegação Web. |

## Como funciona

O Expo Router usa **roteamento baseado em arquivos**: criar
`src/app/credits.tsx` já cria a rota `/credits`. A aba que aponta para essa
rota é declarada em dois lugares porque a navegação tem implementações
distintas por plataforma:

- **Nativo** (`app-tabs.tsx`): usa `NativeTabs`. O ícone é definido com
  `sf="person.2.fill"` (SF Symbols no iOS) e `md="group"` (Material Icons no
  Android) — combinação válida da API do SDK 57, sem necessidade de imagem.
- **Web** (`app-tabs.web.tsx`): usa a barra de abas customizada com um
  `TabTrigger` apontando para `href="/credits"`.

A tela lê os dados de `constants/credits.ts` e renderiza um `CreditRow` para
cada integrante. Manter os dados fora do componente permite alterar a equipe
sem tocar no layout. Integrantes com usuário do GitHub têm o nome exibido como
link (aberto em navegador in-app no mobile via `expo-web-browser`).

O layout segue as convenções do projeto: `ThemedView`/`ThemedText` para
suporte a tema claro/escuro, escala de espaçamento `Spacing`, largura máxima
`MaxContentWidth` e `SafeAreaView`/insets para respeitar áreas seguras.

## Como testar

```bash
npm install
npx expo start
```

Abra o app e toque na aba **Créditos**. Na Web (`w` no terminal), a aba aparece
na barra superior. Verifique se todos os integrantes são listados e se os links
do GitHub e do repositório abrem corretamente.
