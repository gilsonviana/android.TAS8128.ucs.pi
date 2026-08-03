import { BOLA_FACIL, PADDLE_FACIL } from "@/constants/grade";
import { useJogoFisica } from "@/contexts/jogoFisica";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useFrameCallback,
} from "react-native-reanimated";

export const Bola: React.FC = () => {
  const {
    bolaX,
    bolaY,
    velocidadeX,
    velocidadeY,
    paddleX,
    areaLargura,
    areaAltura,
    tijolos,
  } = useJogoFisica();

  useFrameCallback((frameInfo) => {
    "worklet";
    const dt = (frameInfo.timeSincePreviousFrame ?? 16) / 1000;
    const raio = BOLA_FACIL.RAIO;

    let novoX = bolaX.value + velocidadeX.value * dt;
    let novoY = bolaY.value + velocidadeY.value * dt;
    let vx = velocidadeX.value;
    let vy = velocidadeY.value;

    if (areaLargura.value === 0 || areaAltura.value === 0) {
      return;
    }

    if (novoX - raio < 0) {
      novoX = raio;
      vx = -vx;
    } else if (novoX + raio > areaLargura.value) {
      novoX = areaLargura.value - raio;
      vx = -vx;
    }

    if (novoY - raio < 0) {
      novoY = raio;
      vy = -vy;
    }

    const paddleY = areaAltura.value - PADDLE_FACIL.ALTURA;
    const dentroPaddleX =
      novoX + raio > paddleX.value - PADDLE_FACIL.LARGURA / 2 &&
      novoX - raio < paddleX.value + PADDLE_FACIL.LARGURA / 2;

    if (
      vy > 0 &&
      novoY + raio >= paddleY &&
      novoY - raio <= paddleY &&
      dentroPaddleX
    ) {
      novoY = paddleY - raio;
      vy = -vy;
    }

    if (novoY - raio > areaAltura.value) {
      novoX = areaLargura.value / 2;
      novoY = areaAltura.value - PADDLE_FACIL.ALTURA - BOLA_FACIL.RAIO * 2 - 40;
      vx = BOLA_FACIL.VELOCIDADE_INICIAL * 0.6;
      vy = -BOLA_FACIL.VELOCIDADE_INICIAL;
    }

    const tijolosAtual = tijolos.value;
    for (let i = 0; i < tijolosAtual.length; i++) {
      const t = tijolosAtual[i];
      if (!t || !t.visivel) continue;

      const colide =
        novoX + raio > t.x &&
        novoX - raio < t.x + t.largura &&
        novoY + raio > t.y &&
        novoY - raio < t.y + t.altura;

      if (colide) {
        const copia = [...tijolosAtual];
        copia[i] = { ...t, visivel: false };
        tijolos.value = copia;

        const overlapX = Math.min(
          novoX + raio - t.x,
          t.x + t.largura - (novoX - raio),
        );
        const overlapY = Math.min(
          novoY + raio - t.y,
          t.y + t.altura - (novoY - raio),
        );

        if (overlapX < overlapY) {
          vx = -vx;
        } else {
          vy = -vy;
        }
        break;
      }
    }

    bolaX.value = novoX;
    bolaY.value = novoY;
    velocidadeX.value = vx;
    velocidadeY.value = vy;
  });

  const estiloAnimado = useAnimatedStyle(() => ({
    left: bolaX.value - BOLA_FACIL.RAIO,
    top: bolaY.value - BOLA_FACIL.RAIO,
  }));

  return <Animated.View style={[styles.bola, estiloAnimado]} />;
};

const styles = StyleSheet.create({
  bola: {
    position: "absolute",
    width: BOLA_FACIL.RAIO * 2,
    height: BOLA_FACIL.RAIO * 2,
    borderRadius: BOLA_FACIL.RAIO,
    backgroundColor: "black",
  },
});
