import { GRADE_LAYOUT } from "@/constants/grade";
import { Tijolo } from "@/pages/Jogo/components/Tijolo";
import { View } from "react-native";

type GradeProps = {
  linhas: readonly number[];
};

export const Grade: React.FC<GradeProps> = ({ linhas }) => {
  let indice = 0;

  return (
    <View
      style={{
        paddingTop: GRADE_LAYOUT.PADDING_TOP,
        paddingHorizontal: GRADE_LAYOUT.PADDING_HORIZONTAL,
      }}
    >
      {linhas.map((colunas, i) => (
        <View
          key={i}
          style={{
            flexDirection: "row",
            marginBottom: GRADE_LAYOUT.MARGIN_BOTTOM,
          }}
        >
          {Array.from({ length: colunas }).map((_, j) => {
            const tijoloIndice = indice++;
            return (
              <Tijolo
                key={j}
                indice={tijoloIndice}
                linha={i}
                coluna={j}
                colunasNaLinha={colunas}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};
