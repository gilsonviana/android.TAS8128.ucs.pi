import { GRADE_LAYOUT } from "@/constants/grade";
import { useJogoFisica } from "@/contexts/jogoFisica";
import { useTheme } from "@/hooks/use-theme";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        if (areaLargura.value > 0) {
          const brickWidth =
            (areaLargura.value - GRADE_LAYOUT.PADDING_HORIZONTAL * 2) /
            colunasNaLinha;
          const x =
            GRADE_LAYOUT.PADDING_HORIZONTAL + coluna * brickWidth;
          const y =
            GRADE_LAYOUT.PADDING_TOP +
            linha * (GRADE_LAYOUT.ALTURA_TIJOLO + GRADE_LAYOUT.MARGIN_BOTTOM);

          const atual = tijolos.value;
          const copia = [...atual];
          copia[indice] = {
            x,
            y,
            largura: brickWidth,
            altura: GRADE_LAYOUT.ALTURA_TIJOLO,
            visivel: true,
          };
          tijolos.value = copia;
        }
      } catch {
        // Silent fail
      }
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [indice, linha, coluna, colunasNaLinha, tijolos, areaLargura]);

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
