import { GRADE_FACIL } from "@/constants/grade";
import { Tijolo } from "@/pages/Jogo/components/Tijolo";
import { View } from "react-native";

export const GradeFacil: React.FC = () => {
  let indice = 0;

  return (
    <View style={{ paddingTop: 16, paddingHorizontal: 8 }}>
      {Object.values(GRADE_FACIL).map((value, i) => (
        <View
          key={`${value}_${i}`}
          style={{
            flexDirection: "row",
            marginBottom: 4,
          }}
        >
          {Array.from({ length: value }).map((_, j) => {
            const tijoloIndice = indice++;
            return <Tijolo key={`${i}_${j}`} indice={tijoloIndice} />;
          })}
        </View>
      ))}
    </View>
  );
};
