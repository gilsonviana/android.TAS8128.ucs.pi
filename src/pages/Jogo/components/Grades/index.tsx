import { useJogo } from "@/contexts/jogo";
import { GradeDificil } from "@/pages/Jogo/components/Grades/GradeDificil";
import { GradeFacil } from "@/pages/Jogo/components/Grades/GradeFacil";
import { GradeMedio } from "@/pages/Jogo/components/Grades/GradeMedio";
import type { NiveisDificuldadeType } from "@/types";

const GRADES_POR_NIVEL: Record<NiveisDificuldadeType, React.FC> = {
  1: GradeFacil,
  2: GradeMedio,
  3: GradeDificil,
};

export const GradeAtual: React.FC = () => {
  const { nivel } = useJogo();
  const Grade = GRADES_POR_NIVEL[nivel];
  return <Grade />;
};
