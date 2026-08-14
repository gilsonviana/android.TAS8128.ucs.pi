import { getPaddleConfig } from "@/constants/grade";
import { useJogo } from "@/contexts/jogo";
import { useJogoFisica } from "@/contexts/jogoFisica";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useFrameCallback,
} from "react-native-reanimated";

const PADDLE_SPEED = 600;

export const Paddle: React.FC = () => {
  const { Colors } = useTheme();
  const { nivel } = useJogo();
  const { paddleX, areaLargura, paddleMovement } = useJogoFisica();
  const paddleConfig = getPaddleConfig(nivel);

  useFrameCallback(() => {
    "worklet";
    const meiaLargura = paddleConfig.LARGURA / 2;
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
    left: paddleX.value - paddleConfig.LARGURA / 2,
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        estiloAnimado,
        {
          backgroundColor: Colors.text,
          width: paddleConfig.LARGURA,
          height: paddleConfig.ALTURA,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    borderWidth: 1,
    borderRadius: 16,
  },
});
