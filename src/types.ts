export const NiveisDificuldade = {
  1: "Fácil",
  2: "Médio",
  3: "Difícil",
} as const;

export type NiveisDificuldadeType = keyof typeof NiveisDificuldade;

export type Niveis = "facil" | "medio" | "dificil";
export type NiveisMapa = Record<Niveis, string>;
