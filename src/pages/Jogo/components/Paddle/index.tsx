import { PADDLE_FACIL } from "@/constants/grade";
import { useJogoFisica } from "@/contexts/jogoFisica";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

export const Paddle: React.FC = () => {
  const { paddleX, areaLargura } = useJogoFisica();

  const pan = Gesture.Pan()
    .onChange((e) => {
      "worklet";
      const meiaLargura = PADDLE_FACIL.LARGURA / 2;
      const novoX = paddleX.value + e.changeX;
      paddleX.value = Math.min(
        Math.max(novoX, meiaLargura),
        areaLargura.value - meiaLargura
      );
    });

  const estiloAnimado = useAnimatedStyle(() => ({
    left: paddleX.value - PADDLE_FACIL.LARGURA / 2,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.container, estiloAnimado]} />
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    borderWidth: 1,
    width: PADDLE_FACIL.LARGURA,
    height: PADDLE_FACIL.ALTURA,
    borderRadius: 16,
  },
});
