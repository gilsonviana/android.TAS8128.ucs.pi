# Blocos (Tijolos) — Como a Grade é Gerada

## Ideia geral

A grade **não é gerada aleatoriamente**. Ela é uma matriz fixa e pré-definida:
um array onde cada posição representa uma linha, e o número nessa posição diz
quantas colunas (tijolos) aquela linha tem.

```ts
// src/constants/grade.ts
GRADE_FACIL = [7, 7, 7, 7]; // 4 linhas × 7 colunas
GRADE_MEDIO = [8, 8, 8, 8, 8, 8]; // 6 linhas × 8 colunas
GRADE_DIFICIL = [9, 9, 9, 9, 9, 9, 9, 9]; // 8 linhas × 9 colunas
```

Quanto mais difícil o nível, mais linhas e mais colunas por linha — ou seja,
mais tijolos para destruir.

## O que muda por nível de dificuldade

| Nível   | Linhas × Colunas | Paddle (largura) | Bola (raio / velocidade) |
| ------- | ---------------- | ---------------- | ------------------------ |
| Fácil   | 4 × 7            | 180              | 8 / 200                  |
| Médio   | 6 × 8            | 140              | 8 / 280                  |
| Difícil | 8 × 9            | 100              | 7 / 360                  |

Mais linhas/colunas, paddle menor e bola mais rápida = jogo mais difícil.

## Resumo

A "grade" é apenas um layout fixo (array de números) que define quantos
tijolos existem por linha. Não há geração procedural nem aleatoriedade: a
dificuldade é controlada trocando qual array fixo é usado, junto com o
tamanho do paddle e a velocidade da bola.
