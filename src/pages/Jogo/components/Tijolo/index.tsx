import { useJogoFisica } from "@/contexts/jogoFisica";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  measure,
} from "react-native-reanimated";

const ALTURA_TIJOLO = 32;
const PADDING_HORIZONTAL = 8;
const MARGIN_BOTTOM = 4;
const BRICKS_PER_ROW = 7;

type TijoloProps = {
  indice: number;
};

export const Tijolo: React.FC<TijoloProps> = ({ indice }) => {
  const { tijolos, areaLargura } = useJogoFisica();
  const ref = useAnimatedRef<Animated.View>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        // Calculate brick position based on grid layout
        if (areaLargura.value > 0) {
          const brickWidth = (areaLargura.value - PADDING_HORIZONTAL * 2) / BRICKS_PER_ROW;
          const rowIndex = Math.floor(indice / BRICKS_PER_ROW);
          const colIndex = indice % BRICKS_PER_ROW;

          const x = PADDING_HORIZONTAL + colIndex * brickWidth;
          const y = PADDING_HORIZONTAL + rowIndex * (ALTURA_TIJOLO + MARGIN_BOTTOM);

          const atual = tijolos.value;
          const copia = [...atual];
          copia[indice] = {
            x,
            y,
            largura: brickWidth,
            altura: ALTURA_TIJOLO,
            visivel: true,
          };
          tijolos.value = copia;
        }
      } catch (e) {
        // Silent fail
      }
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [indice, tijolos, areaLargura]);

  const estiloAnimado = useAnimatedStyle(() => ({
    opacity: tijolos.value[indice]?.visivel === false ? 0 : 1,
  }));

  return (
    <Animated.View
      ref={ref}
      style={[styles.container, estiloAnimado]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: ALTURA_TIJOLO,
    flex: 1,
    borderWidth: 1,
    borderColor: "blue",
  },
});
