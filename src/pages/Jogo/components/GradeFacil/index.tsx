import { GRADE_FACIL } from "@/constants/grade";
import { Tijolo } from "@/pages/Jogo/components/Tijolo";
import { View } from "react-native";

export const GradeFacil: React.FC = () => {
  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: "red",
      }}
    >
      {Object.values(GRADE_FACIL).map((value, i) => (
        <View
          key={`${value}_${i}`}
          style={{
            flexDirection: "row",
          }}
        >
          {Array.from({ length: value }).map((_, j) => (
            <Tijolo key={`${i}_ ${j}`} />
          ))}
        </View>
      ))}
    </View>
  );
};
