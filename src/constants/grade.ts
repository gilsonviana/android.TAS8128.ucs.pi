export const PADDLE_FACIL = {
  LARGURA: 180,
  ALTURA: 16,
};

export const PADDLE_MEDIO = {
  LARGURA: 140,
  ALTURA: 16,
};

export const PADDLE_DIFICIL = {
  LARGURA: 100,
  ALTURA: 16,
};

export const BOLA_FACIL = {
  RAIO: 8,
  VELOCIDADE_INICIAL: 200,
};

export const BOLA_MEDIO = {
  RAIO: 8,
  VELOCIDADE_INICIAL: 280,
};

export const BOLA_DIFICIL = {
  RAIO: 7,
  VELOCIDADE_INICIAL: 360,
};

export const GRADE_LAYOUT = {
  PADDING_TOP: 16,
  PADDING_HORIZONTAL: 8,
  MARGIN_BOTTOM: 4,
  ALTURA_TIJOLO: 32,
} as const;

export const GRADE_FACIL = [7, 7, 7, 7] as const;

export const GRADE_MEDIO = [8, 8, 8, 8, 8, 8] as const;

export const GRADE_DIFICIL = [9, 9, 9, 9, 9, 9, 9, 9] as const;

export const getPaddleConfig = (nivel: number) => {
  switch (nivel) {
    case 2:
      return PADDLE_MEDIO;
    case 3:
      return PADDLE_DIFICIL;
    default:
      return PADDLE_FACIL;
  }
};

export const getBolaConfig = (nivel: number) => {
  switch (nivel) {
    case 2:
      return BOLA_MEDIO;
    case 3:
      return BOLA_DIFICIL;
    default:
      return BOLA_FACIL;
  }
};

export const getTotalTijolos = (nivel: number) => {
  switch (nivel) {
    case 2:
      return GRADE_MEDIO.reduce((total, colunas) => total + colunas, 0);
    case 3:
      return GRADE_DIFICIL.reduce((total, colunas) => total + colunas, 0);
    default:
      return GRADE_FACIL.reduce((total, colunas) => total + colunas, 0);
  }
};
