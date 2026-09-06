import { GRADE_LAYOUT } from "@/constants/grade";
import { useJogoFisica } from "@/contexts/jogoFisica";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

type TijoloProps = {
  indice: number;
};

export const Tijolo: React.FC<TijoloProps> = ({ indice }) => {
  const { Colors } = useTheme();
  const { tijolos } = useJogoFisica();

  // Só desenha se a física já conhece este tijolo, para que o visual nunca
  // mostre um tijolo sem colisor.
  const estiloAnimado = useAnimatedStyle(() => ({
    opacity: tijolos.value[indice]?.visivel ? 1 : 0,
  }));

  return (
    <Animated.View
      style={[styles.container, estiloAnimado, { backgroundColor: Colors.text }]}
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
