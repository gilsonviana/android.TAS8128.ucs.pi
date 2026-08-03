import { PADDLE_FACIL } from "@/constants/grade";
import { useJogoFisica } from "@/contexts/jogoFisica";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useFrameCallback,
} from "react-native-reanimated";

const PADDLE_SPEED = 600;

export const Paddle: React.FC = () => {
  const { paddleX, areaLargura, paddleMovement } = useJogoFisica();

  useFrameCallback(() => {
    "worklet";
    const meiaLargura = PADDLE_FACIL.LARGURA / 2;
    const dt = 1 / 60;
    const distance = PADDLE_SPEED * dt;

    if (paddleMovement.isMovingLeft.value) {
      paddleX.value = Math.max(paddleX.value - distance, meiaLargura);
    }
    if (paddleMovement.isMovingRight.value) {
      paddleX.value = Math.min(
        paddleX.value + distance,
        areaLargura.value - meiaLargura,
      );
    }
  });

  const estiloAnimado = useAnimatedStyle(() => ({
    left: paddleX.value - PADDLE_FACIL.LARGURA / 2,
  }));

  return <Animated.View style={[styles.container, estiloAnimado]} />;
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
