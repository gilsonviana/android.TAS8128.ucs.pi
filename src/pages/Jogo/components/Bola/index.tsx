import {
  getBolaConfig,
  getPaddleConfig,
  getTotalTijolos,
} from "@/constants/grade";
import { useJogo } from "@/contexts/jogo";
import { useJogoFisica } from "@/contexts/jogoFisica";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useFrameCallback,
} from "react-native-reanimated";

export const Bola: React.FC = () => {
  const { Colors } = useTheme();
  const { estado, finalizaJogo, ganhaJogo, nivel } = useJogo();
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
  const bolaConfig = getBolaConfig(nivel);
  const paddleConfig = getPaddleConfig(nivel);
  const totalTijolos = getTotalTijolos(nivel);

  useFrameCallback((frameInfo) => {
    "worklet";
    const dt = (frameInfo.timeSincePreviousFrame ?? 16) / 1000;
    const raio = bolaConfig.RAIO;
    const anteriorX = bolaX.value;
    const anteriorY = bolaY.value;

    let novoX = anteriorX + velocidadeX.value * dt;
    let novoY = anteriorY + velocidadeY.value * dt;
    let vx = velocidadeX.value;
    let vy = velocidadeY.value;

    if (areaLargura.value === 0 || areaAltura.value === 0) {
      return;
    }

    const tijolosIniciais = tijolos.value;
    if (
      tijolosIniciais.length < totalTijolos ||
      tijolosIniciais.some((t) => !t)
    ) {
      return;
    }

    if (
      estado === "gameover" ||
      estado === "ganhou" ||
      (vx === 0 && vy === 0)
    ) {
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

    const paddleY = areaAltura.value - paddleConfig.ALTURA;
    const dentroPaddleX =
      novoX + raio > paddleX.value - paddleConfig.LARGURA / 2 &&
      novoX - raio < paddleX.value + paddleConfig.LARGURA / 2;

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
      vx = 0;
      vy = 0;
      runOnJS(finalizaJogo)();
    }

    const tijolosAtual = tijolos.value;
    for (let i = 0; i < tijolosAtual.length; i++) {
      const t = tijolosAtual[i];
      if (!t || !t.visivel) continue;

      const limiteEsquerdo = t.x - raio;
      const limiteDireito = t.x + t.largura + raio;
      const limiteSuperior = t.y - raio;
      const limiteInferior = t.y + t.altura + raio;
      const deslocamentoX = novoX - anteriorX;
      const deslocamentoY = novoY - anteriorY;
      const sobrepoe =
        novoX >= limiteEsquerdo &&
        novoX <= limiteDireito &&
        novoY >= limiteSuperior &&
        novoY <= limiteInferior;

      let entradaX = -Infinity;
      let saidaX = Infinity;
      let entradaY = -Infinity;
      let saidaY = Infinity;

      if (deslocamentoX === 0) {
        if (anteriorX < limiteEsquerdo || anteriorX > limiteDireito) {
          continue;
        }
      } else {
        const tempo1 = (limiteEsquerdo - anteriorX) / deslocamentoX;
        const tempo2 = (limiteDireito - anteriorX) / deslocamentoX;
        entradaX = Math.min(tempo1, tempo2);
        saidaX = Math.max(tempo1, tempo2);
      }

      if (deslocamentoY === 0) {
        if (anteriorY < limiteSuperior || anteriorY > limiteInferior) {
          continue;
        }
      } else {
        const tempo1 = (limiteSuperior - anteriorY) / deslocamentoY;
        const tempo2 = (limiteInferior - anteriorY) / deslocamentoY;
        entradaY = Math.min(tempo1, tempo2);
        saidaY = Math.max(tempo1, tempo2);
      }

      const tempoEntrada = Math.max(entradaX, entradaY);
      const tempoSaida = Math.min(saidaX, saidaY);
      const colide =
        sobrepoe ||
        (tempoEntrada <= tempoSaida && tempoEntrada <= 1 && tempoSaida >= 0);

      if (colide) {
        const copia = [...tijolosAtual];
        copia[i] = { ...t, visivel: false };
        tijolos.value = copia;

        let restam = false;
        for (let j = 0; j < totalTijolos; j++) {
          const tijolo = copia[j];
          if (!tijolo || tijolo.visivel) {
            restam = true;
            break;
          }
        }
        if (!restam) {
          vx = 0;
          vy = 0;
          runOnJS(ganhaJogo)();
        }

        if (!sobrepoe) {
          novoX = anteriorX + deslocamentoX * tempoEntrada;
          novoY = anteriorY + deslocamentoY * tempoEntrada;
        }

        if (entradaX > entradaY) {
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
    left: bolaX.value - bolaConfig.RAIO,
    top: bolaY.value - bolaConfig.RAIO,
  }));

  return (
    <Animated.View
      style={[
        styles.bola,
        estiloAnimado,
        {
          backgroundColor: Colors.text,
          width: bolaConfig.RAIO * 2,
          height: bolaConfig.RAIO * 2,
          borderRadius: bolaConfig.RAIO,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  bola: {
    position: "absolute",
    backgroundColor: "black",
  },
});
