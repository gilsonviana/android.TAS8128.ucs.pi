/**
 * Dados dos créditos do projeto.
 *
 * Mantemos os dados separados da interface (a tela em `src/app/credits.tsx`)
 * para que a lista de integrantes possa ser alterada sem mexer no layout.
 */

export type TeamMember = {
  /** Nome completo do integrante. */
  name: string;
  /** Papel/responsabilidade no projeto. */
  role: string;
  /** Usuário do GitHub (opcional). Quando presente, o nome vira um link. */
  github?: string;
};

/** Informações institucionais e do projeto. */
export const ProjectInfo = {
  game: 'Quebra Tijolo',
  course: 'Projeto Integrador — TAS8128',
  institution: 'Universidade de Caxias do Sul (UCS)',
  repositoryUrl: 'https://github.com/gilsonviana/android.TAS8128.ucs.pi',
} as const;

/** Integrantes da equipe (ordem alfabética pelo primeiro nome). */
export const TeamMembers: TeamMember[] = [
  { name: 'Fernando Flores', role: 'Desenvolvimento' },
  { name: 'Fernando Pimmel', role: 'Desenvolvimento' },
  { name: 'Gilson Viana', role: 'Coordenação e desenvolvimento', github: 'gilsonviana' },
  { name: 'Isaac Linck', role: 'Desenvolvimento' },
  { name: 'Lucas Trentin', role: 'Desenvolvimento', github: 'luctrentin' },
];
