import { GRADE_LAYOUT } from "@/constants/grade";
import type { Tijolo } from "@/contexts/jogoFisica";

/**
 * Gera todas as AABBs da grade de uma vez, na mesma ordem row-major usada pelo
 * render em `Grade`, para que os índices coincidam com os passados a `Tijolo`.
 *
 * `larguraGrade` é a largura medida do container da grade (já incluindo o
 * `paddingHorizontal`), e não a largura da área de jogo.
 */
export const construirTijolos = (
  linhas: readonly number[],
  larguraGrade: number,
): Tijolo[] => {
  const tijolos: Tijolo[] = [];

  linhas.forEach((colunas, linha) => {
    const largura =
      (larguraGrade - GRADE_LAYOUT.PADDING_HORIZONTAL * 2) / colunas;
    const y =
      GRADE_LAYOUT.PADDING_TOP +
      linha * (GRADE_LAYOUT.ALTURA_TIJOLO + GRADE_LAYOUT.MARGIN_BOTTOM);

    for (let coluna = 0; coluna < colunas; coluna++) {
      tijolos.push({
        x: GRADE_LAYOUT.PADDING_HORIZONTAL + coluna * largura,
        y,
        largura,
        altura: GRADE_LAYOUT.ALTURA_TIJOLO,
        visivel: true,
      });
    }
  });

  return tijolos;
};
