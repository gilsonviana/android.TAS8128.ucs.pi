import { useJogoFisica } from "@/contexts/jogoFisica";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  measure,
  useAnimatedRef,
  useAnimatedStyle,
} from "react-native-reanimated";

const ALTURA_TIJOLO = 32;

type TijoloProps = {
  indice: number;
};

export const Tijolo: React.FC<TijoloProps> = ({ indice }) => {
  const { tijolos } = useJogoFisica();
  const ref = useAnimatedRef<Animated.View>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        const medida = measure(ref);
        if (medida) {
          const atual = tijolos.value;
          const copia = [...atual];
          copia[indice] = {
            x: medida.x,
            y: medida.y,
            largura: medida.width,
            altura: medida.height,
            visivel: true,
          };
          tijolos.value = copia;
        }
      } catch (e) {}
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [indice, tijolos]);

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
