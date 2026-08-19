import { GRADE_LAYOUT } from "@/constants/grade";
import { useJogoFisica } from "@/contexts/jogoFisica";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
} from "react-native-reanimated";

type TijoloProps = {
  indice: number;
  linha: number;
  coluna: number;
  colunasNaLinha: number;
};

export const Tijolo: React.FC<TijoloProps> = ({
  indice,
  linha,
  coluna,
  colunasNaLinha,
}) => {
  const { Colors } = useTheme();
  const { tijolos, areaLargura } = useJogoFisica();

  useAnimatedReaction(
    () => areaLargura.value,
    (largura, largest) => {
      if (largura > 0 && largura !== largest) {
        const brickWidth =
          (largura - GRADE_LAYOUT.PADDING_HORIZONTAL * 2) / colunasNaLinha;
        const x = GRADE_LAYOUT.PADDING_HORIZONTAL + coluna * brickWidth;
        const y =
          GRADE_LAYOUT.PADDING_TOP +
          linha * (GRADE_LAYOUT.ALTURA_TIJOLO + GRADE_LAYOUT.MARGIN_BOTTOM);

        const copia = [...tijolos.value];
        copia[indice] = {
          x,
          y,
          largura: brickWidth,
          altura: GRADE_LAYOUT.ALTURA_TIJOLO,
          visivel: true,
        };
        tijolos.value = copia;
      }
    },
    [indice, linha, coluna, colunasNaLinha],
  );

  const estiloAnimado = useAnimatedStyle(() => ({
    opacity: tijolos.value[indice]?.visivel === false ? 0 : 1,
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        estiloAnimado,
        { backgroundColor: Colors.text },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: GRADE_LAYOUT.ALTURA_TIJOLO,
    flex: 1,
    borderWidth: 1,
  },
});
